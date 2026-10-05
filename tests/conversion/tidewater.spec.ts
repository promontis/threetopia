import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';

test('Tidewater packages render, animate, pause and survive replacement in two independent scenes',async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:1050});
  await page.goto('/');await expect(page.locator('#coast')).toHaveAttribute('data-ready','true');await expect(page.locator('#garden')).toHaveAttribute('data-ready','true');
  const before=await page.evaluate(()=>{
    const study=(window as any).tidewaterStudy;study.seek(0);
    return study.views.map((v:any)=>({positions:Array.from(v.gulls.object.geometry.attributes.position.array),draws:v.renderer.info.render.calls,triangles:v.renderer.info.render.triangles,geometries:v.renderer.info.memory.geometries}));
  });
  const moved=await page.evaluate(()=>{
    const study=(window as any).tidewaterStudy;study.seek(4);
    return study.views.map((v:any)=>Array.from(v.gulls.object.geometry.attributes.position.array));
  });
  expect(moved[0]).not.toEqual(before[0].positions);expect(moved[1]).not.toEqual(before[1].positions);
  await page.waitForTimeout(150);
  expect(await page.evaluate(()=>Array.from((window as any).tidewaterStudy.views[0].gulls.object.geometry.attributes.position.array))).toEqual(moved[0]);
  for(let i=0;i<3;i++)await page.getByRole('button',{name:'Another garden'}).click();
  const after=await page.evaluate(()=>{
    const study=(window as any).tidewaterStudy;study.seek(4);
    return study.views.map((v:any)=>({positions:Array.from(v.gulls.object.geometry.attributes.position.array),draws:v.renderer.info.render.calls,triangles:v.renderer.info.render.triangles,geometries:v.renderer.info.memory.geometries}));
  });
  expect(after[0].positions).toEqual(moved[0]);expect(after[1].geometries).toBe(before[1].geometries);
  for(const view of after){expect(view.draws).toBeGreaterThan(0);expect(view.draws).toBeLessThan(20);expect(view.triangles).toBeLessThan(6000);}
  // Read a fresh render target to prove actual visible pixels, not just a successful API call.
  const rendered=await page.evaluate(async()=>{
    return (window as any).tidewaterStudy.views.map((v:any)=>{
      v.renderer.render(v.scene,v.camera);const gl=v.renderer.getContext(),pixels=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);
      gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
      const colors=new Set();for(let i=0;i<pixels.length;i+=4)colors.add(`${pixels[i]},${pixels[i+1]},${pixels[i+2]}`);return colors.size;
    });
  });
  expect(rendered.every((n:number)=>n>100)).toBe(true);expect(errors).toEqual([]);
  await mkdir('.context',{recursive:true});await page.screenshot({path:'.context/tidewater-reuse.png',fullPage:true});
});

test('the reuse study fits a narrow viewport and keeps its controls accessible',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await expect(page.locator('#garden')).toHaveAttribute('data-ready','true');await expect(page.getByRole('button',{name:'Play motion'})).toHaveAttribute('aria-pressed','false');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
  await page.getByRole('button',{name:'Play motion'}).click();await expect(page.getByRole('button',{name:'Pause motion'})).toHaveAttribute('aria-pressed','true');
});
