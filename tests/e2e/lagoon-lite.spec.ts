import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import {LANDMARK_BUDGET} from '../../packages/world-map/tile-slot.js';

test('Lagoon lite composes a real 3D landmark, enforces zoom and changes detail',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  const downloaded:string[]=[];page.on('request',r=>downloaded.push(r.url()));
  await page.goto('/map/lagoon-lite/');
  await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true');
  await page.locator('[data-motion]').click();
  const inspect=()=>page.evaluate(()=>(window as any).lagoonLite.inspect());
  const initial=await inspect();expect(initial.component.triangles).toBeLessThanOrEqual(LANDMARK_BUDGET.tile.triangles);expect(initial.component.drawCalls).toBe(2);
  expect(initial.drawCalls).toBe(5);expect(initial.component.textures).toBe(1);expect(initial.component.textureBytes).toBe(512**2*4*4/3);expect(initial.zoomLimits).toEqual([1,1]);
  expect(downloaded.some(url=>/world-assets|world-sources|\.webp/.test(url))).toBe(false);
  expect(downloaded.filter(url=>/water-wave-[ab]\.png/.test(url))).toHaveLength(2);
  expect(await page.evaluate(()=>(window as any).lagoonLite.tile.water.geometry.attributes.position.count/3)).toBeGreaterThan(1000);
  await mkdir('.context/lagoon-lite',{recursive:true});
  await page.screenshot({path:'.context/lagoon-lite/preview.png'});
  const canvas=page.locator('canvas');const before=await canvas.screenshot();
  await page.locator('.tile-canvas').focus();await page.keyboard.press('ArrowRight');
  await expect.poll(async()=>Buffer.compare(before,await canvas.screenshot())).not.toBe(0);
  await page.locator('[data-reset]').click();
  await page.locator('[data-view="slot"]').click();await expect(page.locator('.slot-label')).toBeVisible();
  await expect.poll(async()=>(await inspect()).mode).toBe('slot');
  await page.screenshot({path:'.context/lagoon-lite/slot.png'});
  await page.locator('[data-view="component"]').click();
  expect(await page.evaluate(()=>(window as any).lagoonLite.tile.terrain.visible)).toBe(false);
  expect(await page.evaluate(()=>(window as any).lagoonLite.tile.water.visible)).toBe(false);
  await page.locator('[data-view="tile"]').click();await page.locator('[data-neighbours]').click();
  await expect.poll(async()=>(await inspect()).lod).toBe('overview');
  const overview=await inspect();expect(overview.component.triangles).toBeLessThanOrEqual(LANDMARK_BUDGET.overview.triangles);
  expect(overview.component.textures).toBe(1);expect(overview.component.textureBytes).toBe(256**2*4*4/3);
  // A paused frame that invalidates lighting also contains the one-off shadow pass.
  await expect.poll(async()=>(await inspect()).drawCalls).toBeGreaterThanOrEqual(11);expect((await inspect()).drawCalls).toBeLessThanOrEqual(20);
  await page.screenshot({path:'.context/lagoon-lite/neighbours.png'});
  for(let i=0;i<7;i++)await page.locator('[data-in]').click({force:true});
  await expect.poll(async()=>(await inspect()).lod).toBe('tile');
  const zoomed=await inspect();expect(zoomed.zoom).toBe(zoomed.zoomLimits[1]);
  const time=zoomed.time;await page.waitForTimeout(200);expect((await inspect()).time).toBe(time);
  // Isolate the host water: it moves on the shared clock and is stable paused.
  await page.locator('[data-view="slot"]').click();
  const still=await canvas.screenshot();await page.waitForTimeout(120);expect(Buffer.compare(still,await canvas.screenshot())).toBe(0);
  await page.locator('[data-motion]').click();
  await expect.poll(async()=>Buffer.compare(still,await canvas.screenshot())).not.toBe(0);
  await page.locator('[data-motion]').click();await page.locator('[data-view="tile"]').click();
  await page.locator('[data-reset]').click();
  await page.locator('[data-neighbours]').click();
  await expect.poll(async()=>(await inspect()).drawCalls).toBeLessThanOrEqual(8);
  expect(errors).toEqual([]);
});

test('Lagoon lite fits mobile and starts with reduced motion',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/map/lagoon-lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true');
  const state=await page.evaluate(()=>(window as any).lagoonLite.inspect());expect(state.motion).toBe(false);expect(state.time).toBe(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
  await page.locator('[data-view="slot"]').click();await expect(page.locator('.slot-label')).toBeVisible();
  await page.locator('[data-view="tile"]').click();
  await page.screenshot({path:'.context/lagoon-lite/mobile.png'});
  await page.getByText('Budget ·',{exact:true}).click();await expect(page.locator('.budget-panel')).toBeVisible();
  await expect(page.locator('.budget-panel a')).toHaveAttribute('href','/docs/#map-slots');
});
