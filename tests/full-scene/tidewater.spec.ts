import {test, expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';

test('complete Tidewater retains its rendering, original controls, simulation, gameplay and audio', async ({page}) => {
  const errors:string[] = [], external:string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type()==='error'&&!message.text().includes('Failed to load resource'))errors.push(message.text()); });
  page.on('request', request => { if (/^https?:/.test(request.url()) && !request.url().startsWith('http://127.0.0.1:55198/')) external.push(request.url()); });
  await page.goto('/');
  await expect(page.locator('#preview')).toHaveAttribute('data-ready', 'true', {timeout:300_000});
  const frame = page.frames().find(frame => frame !== page.mainFrame())!;
  const original = await frame.evaluate(() => (window as any).__threetopiaRuntime.inspect());
  expect(Object.values(original.features)).toEqual(Array(15).fill(true));
  expect(original.whaleReady).toBe(true); expect(original.debrisReady).toBe(true); expect(original.renderer.webgpu).toBe(true);
  expect(original.audioFiles).toBe(32);
  await frame.getByRole('button', {name:'Click to explore'}).click();
  await expect.poll(() => frame.evaluate(() => (window as any).__app.audio.ctx?.state)).toBe('running');
  // Decode every bundled recording; lazy features must not hide a missing asset.
  const sounds = await frame.evaluate(async () => {
    const audio = (window as any).__app.audio;
    const names = ['surf_far','wind','palms','crickets','pier_lap','under_reef','boat_engine','boat_lap','boat_rush','birds_dawn','whale_song','step_sand','step_wetsand','surf_crash','surf_wash','surf_backwash','step_wood','step_water','step_grass','step_rock','swim','uw_swim','submerge','emerge','splash','hull_slap','gull','bird_forest','bird_dove','tern','whale_blow','big_splash'];
    names.forEach(name => audio._want(name)); await Promise.all(audio._loading.values());
    return names.map(name => ({name, duration:audio._buffers.get(name)?.duration || 0}));
  });
  expect(sounds.every(sound => sound.duration > 0)).toBe(true);
  const start = await frame.evaluate(() => (window as any).__app.player.position.toArray());
  await page.keyboard.down('KeyW');
  await expect.poll(() => frame.evaluate(start => (window as any).__app.player.position.distanceTo(new (window as any).__THREE.Vector3(...start)), start), {timeout:10_000}).toBeGreaterThan(1);
  await page.keyboard.up('KeyW');
  await page.keyboard.press('KeyH'); await expect(frame.locator('.tw-root')).toHaveAttribute('data-panel','open');
  await page.keyboard.press('KeyH'); await expect(frame.locator('.tw-root')).toHaveAttribute('data-panel','closed');
  await page.keyboard.press('KeyL'); await expect.poll(() => frame.evaluate(() => (window as any).__app.localLights.flashlight.on)).toBe(true);
  await page.keyboard.press('KeyT'); await expect.poll(() => frame.evaluate(() => (window as any).__app.settings.timeSpeed)).toBeGreaterThan(0);
  // Place the test actor at the real boarding point, then use the real E/W/V controls.
  await frame.evaluate(() => { const a = (window as any).__app; a.player.position.copy(a.boatCtl.toWorld(a.boat.boardPoint,new (window as any).__THREE.Vector3())); a.player.velocity.set(0,0,0); });
  await page.keyboard.press('KeyE'); await expect.poll(() => frame.evaluate(() => (window as any).__app.player.mode)).toBe('boat');
  const camera = await frame.evaluate(() => (window as any).__app.player.camMode);
  await page.keyboard.press('KeyV'); await expect.poll(() => frame.evaluate(() => (window as any).__app.player.camMode)).not.toBe(camera);
  await page.keyboard.down('KeyW'); await expect.poll(() => frame.evaluate(() => Math.abs((window as any).__app.boatCtl.speed)), {timeout:15_000}).toBeGreaterThan(.1); await page.keyboard.up('KeyW');
  await page.keyboard.press('KeyE'); await expect.poll(() => frame.evaluate(() => (window as any).__app.player.mode)).not.toBe('boat');
  // A submerged position must engage the original swimming and underwater systems.
  await frame.evaluate(() => { const a = (window as any).__app; a.player.position.set(80,-2,130); a.player.mode='walk'; a.player.velocity.set(0,0,0); a.player.waterMean=null; });
  await expect.poll(() => frame.evaluate(() => (window as any).__app.player.mode)).toBe('swim');
  await page.keyboard.down('KeyC');
  await expect.poll(() => frame.evaluate(() => (window as any).__threetopiaRuntime.inspect().underwater),{timeout:10_000}).toBe(1);
  await page.keyboard.up('KeyC');
  await frame.evaluate(() => { const a=(window as any).__app;a.settings.timeOfDay=23;a.settings.timeSpeed=0;a.updateSun(); });
  await expect.poll(() => frame.evaluate(() => (window as any).__threetopiaRuntime.inspect().night)).toBeGreaterThan(.99);
  await frame.evaluate(() => { const a=(window as any).__app;a.settings.timeOfDay=16.2;a.updateSun();(window as any).__threetopiaRuntime.reset(); });
  await page.keyboard.press('Escape');
  const motion = await frame.evaluate(async () => {
    const w = window as any, app = w.__app, runtime = w.__threetopiaRuntime;
    const start = runtime.inspect().time, whale = app.whale.brain.position.toArray();
    await new Promise(resolve => setTimeout(resolve,500));
    const advanced = runtime.inspect().time; runtime.pause();
    const frozen = runtime.inspect().time; await new Promise(resolve => setTimeout(resolve,200));
    const paused = runtime.inspect().time, audioPaused = app.audio.ctx.state;
    runtime.resume();
    return {start,advanced,frozen,paused,audioPaused,whaleMoved:app.whale.brain.position.distanceTo(new w.__THREE.Vector3(...whale))};
  });
  expect(motion.advanced).toBeGreaterThan(motion.start); expect(motion.paused).toBe(motion.frozen); expect(motion.whaleMoved).toBeGreaterThan(0);
  expect(motion.audioPaused).toBe('suspended');
  await expect.poll(() => frame.evaluate(() => (window as any).__app.audio.ctx.state)).toBe('running');
  const isolated = await frame.evaluate(() => { try { void parent.document.body; return false; } catch { return true; } });
  expect(isolated).toBe(true); expect(external).toEqual([]); expect(errors).toEqual([]);
  await page.screenshot({path:'.context/tidewater-full-scene.png'});
  await writeFile('.context/tidewater-full/acceptance.json', JSON.stringify({original,sounds,motion,isolated,external,errors},null,2));
  await frame.evaluate(async () => { await (window as any).__threetopiaRuntime.dispose(); });
  expect(await frame.evaluate(() => (window as any).__threetopiaRuntime.inspect().disposed)).toBe(true);
});
