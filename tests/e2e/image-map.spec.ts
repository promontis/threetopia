/// <reference types="@webgpu/types" />
import {test,expect,type Page} from '@playwright/test';
const stats=async(page:Page)=>JSON.parse((await page.locator('[data-atlas-page]').getAttribute('data-atlas-stats'))!);
async function openMap(page:Page){
  await page.goto('/map/');
  await expect.poll(async()=>(await stats(page))?.loadedTiles,{timeout:90_000}).toBe(4);
  await expect(page.locator('[data-atlas-status]')).toBeEmpty();
}

test('the captured map loads one scene and no playable-world assets',async({page})=>{
  const requests:string[]=[],errors:string[]=[];page.on('request',r=>requests.push(r.url()));page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await openMap(page);await expect(page.locator('canvas')).toHaveCount(1);await expect(page.locator('.image-map-marker--world')).toHaveCount(4);
  for(const id of ['lagoon','sakura','tidewater','punk'])expect(requests.some(u=>u.includes('/map/renders/'+id+'-terrain.webp'))).toBe(true);
  expect(requests.some(u=>u.includes('/map/assets/')||u.includes('map-ocean.webp'))).toBe(false);
  expect(requests.some(u=>/world-assets|scene-runtime|explore\/player|explore\/collision|PortalScene/.test(u))).toBe(false);
  await expect(page.locator('.image-map img, .image-map-camera')).toHaveCount(0);
  await expect(page.locator('canvas[data-map-pass=composition]')).toHaveCount(1);
  await page.getByRole('button',{name:'Layers',exact:true}).click();await page.getByRole('checkbox',{name:'Whole tile · Punk',exact:true}).uncheck();
  await expect(page.locator('.image-map-marker--world').filter({hasText:'Punk'})).toBeHidden();await expect(page.locator('.image-map-marker--world').filter({hasText:'Lagoon'})).toBeVisible();
  expect(errors).toEqual([]);
});

test('buttons, wheel and keyboard stop at full-tile and all-world limits; creator slots do not expand them',async({page})=>{
  await openMap(page);const initial=await stats(page);await expect(page.getByRole('button',{name:'Zoom out',exact:true})).toBeDisabled();
  await page.getByRole('button',{name:'Explore Sakura',exact:true}).click();await page.getByRole('button',{name:'Close place details'}).click();
  await expect(page.getByRole('button',{name:'Zoom in',exact:true})).toBeDisabled();expect((await stats(page)).span).toBe(initial.minSpan);
  const map=page.locator('.image-map');await map.focus();for(let i=0;i<8;i++)await page.keyboard.press('+');expect((await stats(page)).span).toBe(initial.minSpan);
  await page.mouse.move(600,350);for(let i=0;i<15;i++)await page.mouse.wheel(0,800);await expect.poll(async()=>(await stats(page)).span).toBe(initial.maxSpan);
  await map.focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowDown');expect((await stats(page)).center).toEqual(initial.center);
  await page.getByRole('button',{name:'Build here',exact:false}).click();expect((await stats(page)).maxSpan).toBe(initial.maxSpan);
  await page.locator('[data-atlas-build-panel]').getByRole('button',{name:'Plan a world at tile 1,-1',exact:true}).click();await expect(page).toHaveURL(/tile=1,-1/);await expect(page.getByRole('heading',{name:'Tile 1, -1'})).toBeVisible();
});

test('portrait viewport and reduced motion retain bounded navigation and a frozen scene',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await openMap(page);
  const root=page.locator('.image-map');await expect(root).toHaveAttribute('data-motion','false');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.getByRole('button',{name:'Explore Tidewater',exact:true}).click();await page.getByRole('button',{name:'Close place details'}).click();
  expect((await stats(page)).atMin).toBe(true);await page.waitForTimeout(100);const frame=await root.getAttribute('data-frames');await page.waitForTimeout(200);expect(await root.getAttribute('data-frames')).toBe(frame);
  await page.setViewportSize({width:844,height:390});await expect.poll(async()=>(await stats(page)).atMin).toBe(true);await expect(page.locator('canvas')).toHaveCount(1);
});

test('pause and resume keep the renderer and source assets alive',async({page})=>{
  await openMap(page);const root=page.locator('.image-map');await expect.poll(async()=>Number(await root.getAttribute('data-frames'))).toBeGreaterThan(2);
  await page.getByRole('button',{name:'Pause map animations'}).click();await page.waitForTimeout(100);const frozen=Number(await root.getAttribute('data-frames'));
  await page.waitForTimeout(200);expect(Number(await root.getAttribute('data-frames'))).toBe(frozen);
  await page.getByRole('button',{name:'Play map animations'}).click();await expect.poll(async()=>Number(await root.getAttribute('data-frames'))).toBeGreaterThan(frozen+2);await expect(page.locator('canvas')).toHaveCount(1);
});

test('a device without WebGL gets an actionable loading error',async({page})=>{
  await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:any,...args:any[]){return /webgl/.test(type)?null:original.apply(this,[type,...args] as any);} as any;});await page.goto('/map/');
  await expect(page.locator('[data-atlas-status]')).toContainText('needs WebGL');await expect(page.locator('canvas')).toHaveCount(0);
});


test('art and anchored effects retain the same scene coordinates through pan, zoom and resize',async({page})=>{
  await openMap(page);
  await page.evaluate(async()=>{
    const modulePath='/packages/world-map/image-renderer.js';const {ImageAtlasRenderer}=await import(modulePath);
    const registry=await fetch('/atlas/registry.json').then(r=>r.json());
    const host=document.createElement('div');host.style.cssText='position:fixed;inset:0;z-index:50';document.body.append(host);
    const view=new ImageAtlasRenderer(host,registry);view.setOptions({motion:false});await view.ready;
    (window as any).alignmentView=view;
  });
  const check=async()=>{
    await page.waitForTimeout(100);
    const result=await page.evaluate(()=>{
      const view=(window as any).alignmentView,layout=view.getLayout();let error=0,checked=0;
      for(const tile of layout){
        const data=view.maps.get(tile.id),terrain=tile.layers.find((l:any)=>l.id==='terrain');
        for(const layer of data.components){
          const actual=tile.layers.find((l:any)=>l.id===layer.id),base=data.terrain;
          if(layer.effect?.isolated&&!actual.visible)throw Error('Captured source component missing from the minimap');
          const dx=layer.position[0]-base.position[0],dy=layer.position[1]-base.position[1];
          const scale=view.height/view.view.span;
          error=Math.max(error,Math.abs(actual.pixel[0]-terrain.pixel[0]-dx*scale),Math.abs(actual.pixel[1]-terrain.pixel[1]-dy*scale));
          if(actual.parent!==tile.id)throw Error('Effect detached from its tile');checked++;
        }
      }
      return {error,checked,canvases:view.root.querySelectorAll('canvas').length,artImages:view.root.querySelectorAll('img').length};
    });
    expect(result.checked).toBeGreaterThanOrEqual(5);expect(result.error).toBeLessThan(.0001);expect(result.canvases).toBe(1);expect(result.artImages).toBe(0);
  };
  await check();
  await page.evaluate(()=>{const v=(window as any).alignmentView;v.focus(692.820323,0);v.zoom(.2,540,280);});await check();
  await page.locator('.image-map').last().focus();await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowDown');await check();
  await page.setViewportSize({width:390,height:844});await check();
  await page.evaluate(()=>{const v=(window as any).alignmentView;v.fit();v.setMode('mini');});await check();
  await page.evaluate(()=>{const v=(window as any).alignmentView;v.setMode('overview');v.dispose();});
});
