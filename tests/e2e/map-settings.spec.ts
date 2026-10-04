import {test,expect,type Page} from '@playwright/test';
import {mkdir} from 'node:fs/promises';

const inspect=(page:Page)=>page.evaluate(()=>(window as any).worldTiles.inspect());
const settle=(page:Page)=>page.evaluate(async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);});
async function openMap(page:Page){
  await page.emulateMedia({reducedMotion:'reduce'});await page.bringToFront();
  await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
}

test('settings control the actual renderer, save preferences and restore defaults',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await openMap(page);const initial=await inspect(page);
  const panel=page.getByRole('dialog',{name:'Settings',exact:true});await expect(panel).not.toBeVisible();
  await page.locator('.tile-canvas').focus();await page.keyboard.press('h');await expect(panel).toBeVisible();
  await expect(panel.getByRole('tab',{name:'Performance',exact:true})).toBeFocused();
  await expect(panel.locator('[data-stat="fps"]')).toHaveText('Paused');
  await expect(panel.locator('[data-stat="size"]')).toHaveText(`${initial.post.resolution[0]} × ${initial.post.resolution[1]}`);
  await page.keyboard.press('ArrowLeft');await expect(panel.getByRole('tab',{name:'Effects',exact:true})).toHaveAttribute('aria-selected','true');
  const clouds=panel.getByRole('switch',{name:'Clouds',exact:true});await expect(clouds).toBeChecked();
  await clouds.uncheck();await settle(page);
  expect(await page.evaluate(()=>(window as any).worldTiles.clouds.mesh.visible)).toBe(false);
  await panel.getByRole('slider',{name:'Bloom',exact:true}).focus();await page.keyboard.press('Home');
  expect(await page.evaluate(()=>(window as any).worldTiles.post.output.uniforms.uBloom.value)).toBe(0);
  await panel.getByRole('tab',{name:'Performance',exact:true}).click();
  await panel.getByRole('slider',{name:'Render scale',exact:true}).focus();await page.keyboard.press('Home');await settle(page);
  const low=await inspect(page);expect(low.post.resolution).toEqual(initial.post.resolution.map((n:number)=>Math.floor(n*.5)));expect(low.zoom).toBe(initial.zoom);
  await panel.getByRole('combobox',{name:'Anti-aliasing',exact:true}).selectOption('0');await settle(page);expect((await inspect(page)).post.samples).toBe(0);
  await panel.getByRole('combobox',{name:'Anti-aliasing',exact:true}).selectOption('2');await settle(page);expect((await inspect(page)).post.samples).toBe(2);
  await panel.getByRole('switch',{name:'Shadows',exact:true}).uncheck();await settle(page);
  expect(await page.evaluate(()=>{const w=(window as any).worldTiles;return {enabled:w.renderer.shadowMap.enabled,casts:w.lighting.sun.castShadow,updated:w.inspect().shadows.updated};})).toEqual({enabled:false,casts:false,updated:false});
  await panel.getByRole('switch',{name:'Water reflections',exact:true}).uncheck();await settle(page);
  const capture=()=>page.evaluate(()=>{const w=(window as any).worldTiles;w.ocean.markDirty();return w.ocean.capture(w.renderer,w.scene,w.camera);});
  // The seabed and submerged whale still render with reflections disabled.
  const without=await capture();expect(without.passes).toBe(2);expect((await inspect(page)).waterSurface.reflections).toBe(false);
  await panel.getByRole('switch',{name:'Water reflections',exact:true}).check();await settle(page);
  const withReflection=await capture();expect(withReflection.passes).toBe(3);expect(withReflection.drawCalls).toBeGreaterThan(without.drawCalls);
  // Persisted-off reflections must also work before a reflection target has
  // ever been populated, and turning MSAA off/on must not leak target textures.
  await panel.getByRole('switch',{name:'Water reflections',exact:true}).uncheck();await settle(page);
  await panel.getByRole('tab',{name:'Ocean',exact:true}).click();
  const waveEnergy=()=>page.evaluate(()=>{
    const w=(window as any).worldTiles,target=w.ocean.spectrum.target,raw=new Uint16Array(target.width*target.height*4);w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,raw);
    let energy=0;for(let i=2;i<raw.length;i+=4){const v=raw[i],e=(v>>10)&31,m=v&1023;energy+=Math.abs(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);}return energy;
  });
  const energy=await waveEnergy();await panel.getByRole('slider',{name:'Wave strength',exact:true}).focus();await page.keyboard.press('Home');await settle(page);
  expect(await waveEnergy()).toBeCloseTo(energy*.25,0);expect((await inspect(page)).time).toBe(0);
  await panel.getByRole('slider',{name:'Clarity',exact:true}).focus();await page.keyboard.press('End');
  expect(await page.evaluate(()=>(window as any).worldTiles.ocean.material.uniforms.uClarity.value)).toBe(1.5);
  await panel.getByRole('tab',{name:'Shore',exact:true}).click();await panel.getByRole('slider',{name:'Sea foam',exact:true}).focus();await page.keyboard.press('Home');
  expect(await page.evaluate(()=>(window as any).worldTiles.ocean.material.uniforms.uFoam.value)).toBe(0);
  await panel.getByRole('tab',{name:'Lighting',exact:true}).click();await panel.getByRole('slider',{name:'Exposure',exact:true}).focus();await page.keyboard.press('End');
  expect(await page.evaluate(()=>(window as any).worldTiles.renderer.toneMappingExposure)).toBeCloseTo(2**1.5);
  await panel.getByRole('tab',{name:'Camera',exact:true}).click();await panel.getByRole('switch',{name:'World cards',exact:true}).uncheck();await expect(page.locator('.world-label').first()).not.toBeVisible();
  const saved=(await inspect(page)).settings;await page.reload();await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});await settle(page);
  expect((await inspect(page)).settings).toEqual(saved);expect((await inspect(page)).post.samples).toBe(2);expect((await inspect(page)).post.resolution).toEqual(low.post.resolution);
  expect(await page.evaluate(()=>(window as any).worldTiles.clouds.mesh.visible)).toBe(false);
  await page.getByRole('button',{name:'Open settings',exact:true}).click();await panel.getByRole('button',{name:'Reset',exact:true}).click();await settle(page);
  const restored=await inspect(page);expect(restored.settings).toEqual(initial.settings);expect(restored.post.resolution).toEqual(initial.post.resolution);expect(restored.post.samples).toBe(4);
  expect(await page.evaluate(()=>(window as any).worldTiles.clouds.mesh.visible)).toBe(true);
  // The second AO history target is allocated lazily on the next moving frame.
  expect(restored.textures).toBeLessThanOrEqual(initial.textures);
  await expect(page.locator('.world-label').first()).toBeVisible();
  // The panel is non-modal: motion continues while controls are visible.
  await page.locator('.tile-canvas').focus();await page.keyboard.press('Space');await expect.poll(async()=>(await inspect(page)).time).toBeGreaterThan(.2);
  expect((await inspect(page)).textures).toBe(initial.textures);
  await expect(panel.locator('[data-stat="fps"]')).toHaveText(/\d+ fps/);await expect(panel.locator('[data-stat="cpu"]')).toHaveText(/\d+\.\d{2} ms/);
  await mkdir('.context/map-settings',{recursive:true});await page.screenshot({path:'.context/map-settings/desktop.png'});
  await panel.getByRole('tab',{name:'Effects',exact:true}).click();await expect(clouds).toBeChecked();
  await page.screenshot({path:'.context/map-settings/clouds.png'});
  await page.keyboard.press('Escape');await expect(panel).not.toBeVisible();await expect(page.getByRole('button',{name:'Open settings',exact:true})).toBeFocused();
  expect(errors).toEqual([]);
});

test('settings fit a small touch screen and do not escape the map camera bounds',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'}),page=await context.newPage();
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  try{
    await openMap(page);await page.getByRole('button',{name:'Open settings',exact:true}).tap();
    const panel=page.getByRole('dialog',{name:'Settings',exact:true}),box=await panel.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.x+box!.width).toBeLessThanOrEqual(390);expect(box!.y+box!.height).toBeLessThanOrEqual(844);
    expect(await panel.evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);
    for(const name of ['Ocean','Shore','Lighting','Camera','Effects','Performance']){
      const tab=panel.getByRole('tab',{name,exact:true});await tab.tap();await expect(tab).toHaveAttribute('aria-selected','true');
      const b=await tab.boundingBox();expect(b!.x).toBeGreaterThanOrEqual(box!.x);expect(b!.x+b!.width).toBeLessThanOrEqual(box!.x+box!.width);
    }
    await mkdir('.context/map-settings',{recursive:true});await page.screenshot({path:'.context/map-settings/mobile.png'});
    await panel.getByRole('tab',{name:'Camera',exact:true}).tap();const zoom=panel.getByRole('slider',{name:'Zoom',exact:true});
    await zoom.focus();await page.keyboard.press('End');await settle(page);const close=await inspect(page);expect(close.zoom).toBe(close.zoomLimits[1]);
    await page.keyboard.press('Home');await settle(page);expect((await inspect(page)).zoom).toBe(1);
    await panel.getByRole('button',{name:'Close settings',exact:true}).tap();await expect(panel).not.toBeVisible();
    expect((await inspect(page)).motion).toBe(false);expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);expect(errors).toEqual([]);
  }finally{await context.close();}
});

test('manual DPR renders full Retina resolution, persists and restores Auto on reset',async({browser})=>{
  const context=await browser.newContext({viewport:{width:1920,height:1080},deviceScaleFactor:2,reducedMotion:'reduce'}),page=await context.newPage();
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  const resolution=()=>page.evaluate(()=>{
    const w=(window as any).worldTiles,c=w.renderer.domElement;
    return {dpr:w.renderer.getPixelRatio(),size:[c.width,c.height],post:w.inspect().post.resolution};
  });
  try{
    await openMap(page);const initial=await inspect(page);
    expect((await resolution()).dpr).toBeCloseTo(1.00635,5);
    await page.getByRole('button',{name:'Open settings',exact:true}).click();
    const panel=page.getByRole('dialog',{name:'Settings',exact:true}),ratio=panel.getByRole('combobox',{name:'Pixel ratio',exact:true});
    await expect(ratio).toHaveValue('0');await ratio.selectOption('2');await settle(page);
    expect(await resolution()).toEqual({dpr:2,size:[3840,2160],post:[3840,2160]});
    await expect(panel.locator('[data-stat="dpr"]')).toHaveText('2.00');
    await expect(panel.locator('[data-stat="size"]')).toHaveText('3840 × 2160');
    expect((await inspect(page)).zoom).toBe(initial.zoom);
    await panel.getByRole('slider',{name:'Render scale',exact:true}).focus();await page.keyboard.press('Home');await settle(page);
    expect(await resolution()).toEqual({dpr:1,size:[1920,1080],post:[1920,1080]});
    await expect(panel.locator('[data-stat="dpr"]')).toHaveText('1.00');
    await page.keyboard.press('End');await settle(page);
    await page.reload();await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:20000});
    expect(await resolution()).toEqual({dpr:2,size:[3840,2160],post:[3840,2160]});
    await page.getByRole('button',{name:'Open settings',exact:true}).click();await expect(ratio).toHaveValue('2');
    for(const [dpr,size] of [[1.5,[2880,1620]],[1,[1920,1080]]] as const){
      await ratio.selectOption(String(dpr));await settle(page);expect(await resolution()).toEqual({dpr,size,post:size});
    }
    await page.setViewportSize({width:1440,height:900});await ratio.selectOption('2');await settle(page);
    expect(await resolution()).toEqual({dpr:2,size:[2880,1800],post:[2880,1800]});
    await mkdir('.context/map-settings',{recursive:true});await page.screenshot({path:'.context/map-settings/dpr2.png',scale:'css'});
    await panel.getByRole('button',{name:'Reset',exact:true}).click();await settle(page);await expect(ratio).toHaveValue('0');
    expect((await resolution()).dpr).toBeCloseTo(1.27294,5);expect((await inspect(page)).settings).toEqual(initial.settings);
    expect(errors).toEqual([]);
  }finally{await context.close();}
});
