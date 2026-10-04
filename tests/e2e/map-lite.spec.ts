import {test,expect,type Page} from '@playwright/test';
import {mkdir} from 'node:fs/promises';

// The moving Quadra adds one sun-shadow draw; its visible draw replaces the
// former separate window mesh, so the city still costs three visible draws.
// Four FFT cascades add 18 small, batched full-screen passes to the former
// 121-draw frame. A small, separate near-surface whale capture adds one draw.
// Cloud volumes add one instanced draw to the main view and its reflection.
// They are excluded from the submerged-bed capture.
// Measure the animated overview with all four independent terrain hosts and
// the clipped coastal apron. A tile close-up culls draws and is not the peak.
const FULL_FRAME_DRAW_BUDGET=154;
const FULL_FRAME_TRIANGLE_BUDGET=1_400_000;
const SCENE_DRAW_BUDGET=40;
const DETAIL_TRIANGLE_BUDGET=400_000;
const OVERVIEW_TRIANGLE_BUDGET=320_000;

async function toggleMotion(page:Page){
  await page.locator('.tile-canvas').focus();
  await page.keyboard.press('Space');
}

test('four native map tiles share a compact scene and bounded camera',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});
  const errors:string[]=[],requests:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>requests.push(r.url()));
  await page.bringToFront();
  await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const inspect=()=>page.evaluate(()=>(window as any).worldTiles.inspect());
  await expect.poll(async()=>(await inspect()).drawCalls).toBeLessThanOrEqual(SCENE_DRAW_BUDGET);
  await toggleMotion(page);
  const initial=await inspect();
  expect(initial.tiles.map((t:any)=>t.id).sort()).toEqual(['lagoon','punk','sakura','tidewater']);
  expect(initial.tiles.every((t:any)=>t.radius===9&&t.lod==='tile')).toBe(true);
  expect(initial.zoom).toBe(1);expect(initial.zoomLimits[1]).toBeGreaterThan(1);
  expect(initial.triangles).toBeLessThan(DETAIL_TRIANGLE_BUDGET);
  expect(initial.totalFrameTriangles).toBeLessThan(FULL_FRAME_TRIANGLE_BUDGET);
  expect(initial.tiles.reduce((n:number,t:any)=>n+t.component.drawCalls,0)).toBeLessThanOrEqual(12);
  expect(initial.tiles.reduce((n:number,t:any)=>n+t.component.triangles,0)).toBeLessThan(96_000);
  const district=initial.tiles.find((t:any)=>t.id==='punk');
  expect(district.component.drawCalls).toBe(3);expect(district.component.textures).toBe(2);
  expect(district.component.textureBytes).toBeLessThan(2*1024*1024);
  expect(district.component.bytes).toBeLessThan(768*1024);
  const interiors=await page.evaluate(()=>{
    const w=(window as any).worldTiles,t=w.tiles.find((t:any)=>t.definition.id==='punk'),glass=t.near.root.children.find((m:any)=>m.userData.role==='structure');
    return {version:glass.material.userData.fenestraVersion,draws:t.near.root.children.length,shader:glass.material.customProgramCacheKey(),roof:w.camera.position.clone().set(t.host.root.position.x,3.21+t.manifest.bounds.height,t.host.root.position.z-3.8).project(w.camera).toArray()};
  });
  expect(interiors.version).toBe('0.3.0');expect(interiors.shader).toContain('fenestra');expect(interiors.draws).toBe(3);
  expect(Math.abs(interiors.roof[1])).toBeLessThan(.97);
  expect(initial.water).toBe('tidewater-spectral-map');expect(initial.boosters).toBe(6);
  expect(initial.clouds).toEqual({banks:6,drawCalls:1,triangles:72,textures:1});
  expect(initial.post.aoResolution[0]).toBeLessThanOrEqual(800);expect(initial.post.aoResolution[1]).toBeLessThanOrEqual(600);
  expect(initial.post.bloomResolution[0]).toBeLessThanOrEqual(480);expect(initial.post.bloomResolution[1]).toBeLessThanOrEqual(320);
  expect(initial.shadows.water).toBe(true);
  // Reuse Tidewater's tiny SVG icon module; never load a walking-world scene,
  // its extraction code or full-size world assets into this map.
  expect(requests.filter(url=>/world-assets|world-sources|extract\.js/.test(url)).every(url=>/\/world-sources\/tidewater\/src\/ui\/icons\.js(?:\?|$)/.test(url))).toBe(true);
  expect(requests.filter(url=>/\.glb(?:\?|$)/.test(url))).toHaveLength(10);
  expect(requests.some(url=>/tidewater\.glb/.test(url))).toBe(true);
  expect(requests.some(url=>/forest\/landmark\.glb/.test(url))).toBe(true);
  expect(requests.some(url=>/map-unification|map-originals|water-wave-[ab]/.test(url))).toBe(false);
  await expect(page.locator('.tile-canvas canvas')).toHaveCount(1);
  await mkdir('.context/map-lite',{recursive:true});
  await page.screenshot({path:'.context/map-lite/preview.png'});
  const labels=await page.locator('.world-label').evaluateAll(labels=>labels.map(l=>l.getAttribute('style')));
  const reflected=await page.evaluate(()=>(window as any).worldTiles.ocean.material.uniforms.uReflectionMatrix.value.toArray());
  await page.locator('.tile-canvas').focus();await page.keyboard.press('ArrowRight');
  await expect.poll(()=>page.locator('.world-label').evaluateAll(labels=>labels.map(l=>l.getAttribute('style')))).not.toEqual(labels);
  await expect.poll(()=>page.evaluate(()=>(window as any).worldTiles.ocean.material.uniforms.uReflectionMatrix.value.toArray())).not.toEqual(reflected);
  const labelError=await page.evaluate(()=>{
    const w=(window as any).worldTiles,canvas=document.querySelector('.tile-canvas') as HTMLElement,tile=w.tiles.find((t:any)=>t.definition.id==='punk');
    const p=w.camera.position.clone().set(10.3,2.7+w.hover.offset,-8.7).project(w.camera);
    return Math.hypot(parseFloat(tile.label.style.left)-(p.x*.5+.5)*canvas.clientWidth,parseFloat(tile.label.style.top)-(-p.y*.5+.5)*canvas.clientHeight);
  });
  expect(labelError).toBeLessThan(.05);
  await page.locator('[data-reset]').click();
  for(const id of ['lagoon','tidewater','sakura','punk']){
    await page.locator('[data-reset]').click();
    await page.locator(`[data-map-tile="${id}"]`).click();
    await expect.poll(async()=>(await inspect()).selected).toBe(id);
    const state=await inspect();expect(state.zoom).toBe(state.zoomLimits[1]);
    expect(await page.evaluate(()=>(window as any).worldTiles.tiles.every((t:any)=>t.host.slot.children.length===1))).toBe(true);
    await expect(page.locator(`[data-world-details="${id}"]`)).toBeVisible();await page.keyboard.press('Escape');
  }
  await page.mouse.move(700,500);await page.mouse.wheel(0,-5000);
  await expect.poll(async()=>(await inspect()).zoom).toBe(initial.zoomLimits[1]);
  for(let i=0;i<4;i++)await page.mouse.wheel(0,5000);
  await expect.poll(async()=>(await inspect()).zoom).toBe(1);
  expect((await inspect()).selected).toBe('all');
  await expect(page.locator('.world-switch,.budget,[data-edges],[data-motion],.component-caption,.credit')).toHaveCount(0);
  const paused=(await inspect()).time;await page.waitForTimeout(150);expect((await inspect()).time).toBe(paused);
  // Trees, water and neon all advance on this one clock, and pause together.
  await toggleMotion(page);await expect.poll(async()=>(await inspect()).time).toBeGreaterThan(paused+.1);
  await toggleMotion(page);
  const programs=await page.evaluate(()=>{
    const roles:string[]=[];for(const t of (window as any).worldTiles.tiles)t.host.slot.traverse((o:any)=>{if(o.isMesh)roles.push(o.material.customProgramCacheKey());});return roles;
  });
  expect(programs.some((p:string)=>p.includes('threetopia-native-neon-v3'))).toBe(true);
  expect(programs.some((p:string)=>p.includes('punk-fenestra-0.3.0-native-facades-v3'))).toBe(true);
  expect(programs.filter((p:string)=>p.includes('threetopia-native-boat-v2'))).toHaveLength(2);
  await expect(page.getByRole('link',{name:'Threetopia home'}).locator('svg use')).toHaveAttribute('href','/brand-mark.svg#mark');
  await expect(page.getByRole('navigation',{name:'Map controls'}).getByRole('button')).toHaveCount(3);
  expect(errors).toEqual([]);
});

test('mobile overview uses reduced assets and fits both zoom bounds',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();
  await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const inspect=()=>page.evaluate(()=>(window as any).worldTiles.inspect());
  await expect.poll(async()=>(await inspect()).tiles.every((t:any)=>t.lod==='overview')).toBe(true);
  expect((await inspect()).motion).toBe(false);expect((await inspect()).time).toBe(0);
  expect((await inspect()).tiles.reduce((n:number,t:any)=>n+t.component.triangles,0)).toBeLessThan(48_000);
  expect((await inspect()).triangles).toBeLessThan(OVERVIEW_TRIANGLE_BUDGET);
  expect((await inspect()).shadows.resolution).toBe(2048);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
  await page.screenshot({path:'.context/map-lite/mobile.png'});
  await page.locator('[data-map-tile="sakura"]').click();
  await expect.poll(async()=>(await inspect()).tiles.every((t:any)=>t.lod==='tile')).toBe(true);
  const close=await inspect();expect(close.zoom).toBe(close.zoomLimits[1]);
  await page.getByRole('button',{name:'Close creator details'}).click();
  await page.screenshot({path:'.context/map-lite/mobile-tile.png'});
  await page.locator('[data-reset]').click();await expect.poll(async()=>(await inspect()).zoom).toBe(1);
  await expect.poll(async()=>(await inspect()).tiles.every((t:any)=>t.lod==='overview')).toBe(true);
  expect(errors).toEqual([]);
});

test('clicking map tiles opens the matching creator, while dragging and ocean clicks do not',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const screenPoint=(point:readonly number[])=>page.evaluate(point=>{
    const w=(window as any).worldTiles,p=w.camera.position.clone().set(...point).project(w.camera),rect=w.renderer.domElement.getBoundingClientRect();
    return {x:rect.left+(p.x*.5+.5)*rect.width,y:rect.top+(-p.y*.5+.5)*rect.height};
  },point);
  await mkdir('.context/map-selection',{recursive:true});
  for(const [id,point,title,url] of [
    ['lagoon',[-.4,1,-.86],'Lagoon Tree Village','https://lagoon-tree-village-creatures.netlify.app/'],
    ['sakura',[-5.3,2.2,-16.1],'Sakura River Valley','https://valley.mengto.here.now/'],
    ['punk',[7.8,3.4,-10.5],'Punk','https://www.threejspunk.com/'],
    ['tidewater',[16.5,.7,.6],'Tidewater','https://dgreenheck.github.io/tidewater/'],
  ] as const){
    await page.locator('[data-reset]').click();
    const p=await screenPoint(point);await page.mouse.click(p.x,p.y);
    const dialog=page.getByRole('dialog',{name:title,exact:true});await expect(dialog).toBeVisible();
    expect(await page.evaluate(()=>(window as any).worldTiles.inspect().selected)).toBe(id);
    await expect(dialog.locator('.creator-links a').first()).toHaveAttribute('href',url);
    await expect(dialog.locator('.creator-profile')).toHaveAttribute('href',/^https:\/\/x\.com\//);
    await expect(dialog.getByRole('button',{name:'Close creator details'})).toBeFocused();
    await expect.poll(()=>dialog.locator('.creator-preview img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    if(id==='tidewater')await page.screenshot({path:'.context/map-selection/tidewater.png'});
    await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(page.locator('.tile-canvas')).toBeFocused();
  }
  await page.locator('[data-reset]').click();
  const p=await screenPoint([0,1,0]);await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+70,p.y+25,{steps:8});await page.mouse.move(p.x,p.y,{steps:8});await page.mouse.up();
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await page.mouse.click(12,500);await expect(page.locator('dialog[open]')).toHaveCount(0);
  const label=page.getByRole('button',{name:'View details for Lagoon Tree Village'});await label.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog',{name:'Lagoon Tree Village',exact:true})).toBeVisible();await expect(label).toHaveAttribute('aria-expanded','true');
  await page.keyboard.press('Escape');await expect(label).toBeFocused();await expect(label).toHaveAttribute('aria-expanded','false');
  // Detail cards suspend drawing, then restore the existing motion preference.
  await toggleMotion(page);
  const initial=await page.evaluate(()=>(window as any).worldTiles.inspect().time);
  await expect.poll(()=>page.evaluate(()=>(window as any).worldTiles.inspect().time)).toBeGreaterThan(initial);
  await page.locator('[data-reset]').click();
  await page.locator('[data-map-tile="punk"]').click();
  const paused=await page.evaluate(()=>(window as any).worldTiles.inspect().time);await page.waitForTimeout(120);
  expect(await page.evaluate(()=>(window as any).worldTiles.inspect().time)).toBe(paused);
  await page.mouse.click(12,500);await expect(page.locator('dialog[open]')).toHaveCount(0);
  await expect.poll(()=>page.evaluate(()=>(window as any).worldTiles.inspect().time)).toBeGreaterThan(paused);
  expect(errors).toEqual([]);
});

test('map details support touch selection and fit a small screen',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'}),page=await context.newPage();
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  try{
    await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
    const p=await page.evaluate(()=>{const w=(window as any).worldTiles,p=w.camera.position.clone().set(16.5,.7,.6).project(w.camera);return {x:(p.x*.5+.5)*innerWidth,y:(-p.y*.5+.5)*innerHeight};});
    await page.touchscreen.tap(p.x,p.y);
    const dialog=page.getByRole('dialog',{name:'Tidewater',exact:true});await expect(dialog).toBeVisible();
    await expect.poll(()=>dialog.locator('.creator-preview img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    const bounds=await dialog.boundingBox();expect(bounds!.x).toBeGreaterThanOrEqual(0);expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(390);expect(bounds!.y+bounds!.height).toBeLessThanOrEqual(844);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
    await mkdir('.context/map-selection',{recursive:true});await page.screenshot({path:'.context/map-selection/mobile.png'});
    await dialog.getByRole('button',{name:'Close creator details'}).tap();await expect(dialog).not.toBeVisible();
    expect(await page.evaluate(()=>(window as any).worldTiles.inspect().motion)).toBe(false);
    await page.locator('[data-reset]').tap();await page.getByRole('button',{name:'View details for Punk',exact:true}).tap();await expect(page.getByRole('dialog',{name:'Punk',exact:true})).toBeVisible();
    expect(errors).toEqual([]);
  }finally{await context.close();}
});

test('Sakura boat travels safely, keeps its pose across LODs and pauses with the map',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const clearance=await page.evaluate(async()=>{
    const threeURL=performance.getEntriesByType('resource').find(e=>/\/(?:three\/build\/three\.module|deps\/three)\.js(?:\?|$)/.test(e.name))!.name,bvhURL='/node_modules/three-mesh-bvh/src/index.js';
    const {Vector3,Ray,DoubleSide}=await import(threeURL),{MeshBVH}=await import(bvhURL);
    const w=(window as any).worldTiles,tile=w.tiles.find((t:any)=>t.definition.id==='sakura');
    const clock=w.ocean.material.uniforms.uTime,saved=clock.value,ray=new Ray(new Vector3(),new Vector3(0,1,0));
    const results=[];
    // Check the actual vertices of both shipped GLBs along the whole journey,
    // including the bow, canopy and simplified bridge, with maximum water bob.
    for(const lod of ['near','far']){
      const root=tile[lod].root,boat=root.getObjectByName('Native_sakura_boat');
      const bvh=new MeshBVH(root.getObjectByName('Native_sakura_structure').geometry);
      const vertices=boat.geometry.attributes.position,p=new Vector3();
      let bank=Infinity,bridge=Infinity,underBridge=0;
      for(let i=0;i<720;i++){
        clock.value=tile.riverboat.duration*i/720;tile.riverboat.update();boat.updateMatrix();
        for(let j=0;j<vertices.count;j++){
          p.fromBufferAttribute(vertices,j).applyMatrix4(boat.matrix);
          const x=p.x+tile.host.root.position.x,z=p.z+tile.host.root.position.z;
          bank=Math.min(bank,p.y-.034-w.sampler.heightAt(x,z));
          if(z<-12.7||z>-11.7)continue;
          ray.origin.set(p.x,.025,p.z);const hit=bvh.raycastFirst(ray,DoubleSide);
          if(hit){bridge=Math.min(bridge,hit.point.y-p.y-.034);underBridge++;}
        }
      }
      results.push({lod,bank,bridge,underBridge});
    }
    clock.value=saved;tile.riverboat.update();return results;
  });
  for(const lod of clearance){expect(lod.bank).toBeGreaterThan(.2);expect(lod.bridge).toBeGreaterThan(.1);expect(lod.underBridge).toBeGreaterThan(1000);}
  const pose=()=>page.evaluate(()=>{
    const w=(window as any).worldTiles,t=w.tiles.find((t:any)=>t.definition.id==='sakura');
    return {time:w.inspect().time,lod:t.lod,position:t.riverboat.position.toArray(),
      matrices:['near','far'].map(lod=>{const boat=t[lod].root.getObjectByName('Native_sakura_boat');boat.updateMatrix();return boat.matrix.toArray();})};
  });
  const initial=await pose();expect(initial.lod).toBe('overview');
  await toggleMotion(page);await expect.poll(async()=>(await pose()).time).toBeGreaterThan(initial.time+.3);await toggleMotion(page);
  const moved=await pose();expect(moved.position).not.toEqual(initial.position);expect(moved.matrices[0]).toEqual(moved.matrices[1]);
  await page.waitForTimeout(150);expect(await pose()).toEqual(moved);
  await page.locator('[data-map-tile="sakura"]').click();await page.getByRole('dialog',{name:'Sakura River Valley',exact:true}).getByRole('button',{name:'Close creator details'}).click();
  const near=await pose();expect(near.lod).toBe('tile');expect(near.position).toEqual(moved.position);expect(near.matrices).toEqual(moved.matrices);
  // The click target follows the moved canopy, not the boat's old GLB bounds.
  const point=await page.evaluate(()=>{
    const w=(window as any).worldTiles,t=w.tiles.find((t:any)=>t.definition.id==='sakura');
    const scale=t.near.root.getObjectByName('Native_sakura_boat').scale.x;
    const p=t.riverboat.position.clone().addScaledVector(t.riverboat.forward,-.55*scale);p.y=.65*scale;p.project(w.camera);
    const r=w.renderer.domElement.getBoundingClientRect();return {x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};
  });
  await page.mouse.click(point.x,point.y);await expect(page.getByRole('dialog',{name:'Sakura River Valley',exact:true})).toBeVisible();
  expect(errors).toEqual([]);
});

test('Sakura keeps its original wooden floor dry through bobbing, turns and both detail levels',async({page})=>{
  await page.setViewportSize({width:1100,height:800});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const result=await page.evaluate(async()=>{
    const url=performance.getEntriesByType('resource').find(e=>/\/(?:three\/build\/three\.module|deps\/three)\.js(?:\?|$)/.test(e.name))!.name;
    const bvhURL='/node_modules/three-mesh-bvh/src/index.js',T=await import(url),{MeshBVH}=await import(bvhURL);
    const w=(window as any).worldTiles,tile=w.tiles.find((t:any)=>t.definition.id==='sakura'),clock=w.ocean.material.uniforms.uTime;
    const savedTime=clock.value,savedTarget=w.renderer.getRenderTarget(),savedAsset=tile.host.slot.children[0];
    const target=new T.WebGLRenderTarget(320,512,{type:T.HalfFloatType}),camera=new T.OrthographicCamera(-.55,.55,1.1,-1.1,.1,20);
    camera.up.set(0,0,-1);
    const ray=new T.Ray(new T.Vector3(),new T.Vector3(0,-1,0)),samples=[],p=new T.Vector3(),rotation=new T.Quaternion();
    const read=()=>{const data=new Uint16Array(320*512*4);w.renderer.setRenderTarget(target);w.renderer.render(w.scene,camera);w.renderer.readRenderTargetPixels(target,0,0,320,512,data);return data;};
    const pixel=(image:Uint16Array,local:any,boat:any)=>{const at=local.clone().applyMatrix4(boat.matrixWorld).project(camera),x=Math.floor((at.x*.5+.5)*320),y=Math.floor((at.y*.5+.5)*512);return Array.from(image.slice((y*320+x)*4,(y*320+x)*4+3));};
    const changed=(a:number[],b:number[])=>a.some((v,i)=>Math.abs(v-b[i])>4);
    try{
      for(const lod of ['near','far']){
        const asset=tile[lod],boat=asset.root.getObjectByName('Native_sakura_boat'),mask=boat.getObjectByName('Sakura hull water exclusion');
        tile.host.mount(asset.root,asset.metrics,lod==='near'?'tile':'overview');
        const bvh=new MeshBVH(boat.geometry),waterline=boat.userData.waterline;
        for(const t of [0,3.3,18,tile.riverboat.duration*.35,tile.riverboat.duration*.8]){
          clock.value=t;tile.riverboat.update();w.scene.updateMatrixWorld(true);
          const centre=p.set(-1.5,waterline,4.3).applyMatrix4(boat.matrixWorld);
          camera.up.set(0,0,-1).applyQuaternion(boat.getWorldQuaternion(rotation));
          camera.position.copy(centre).add(new T.Vector3(0,8,0));camera.lookAt(centre);camera.updateMatrixWorld();
          w.ocean.markDirty();w.ocean.capture(w.renderer,w.scene,camera);
          const wet=read();w.ocean.mesh.visible=false;const dry=read();
          mask.visible=false;const noMask=read();mask.visible=true;w.ocean.mesh.visible=true;
          const interior=[];
          for(const z of [3.48,3.6,3.72,4.61,4.78]){
            ray.origin.set(-1.5,waterline+.045,z);const floor=bvh.raycastFirst(ray,T.DoubleSide);
            const local=new T.Vector3(-1.5,waterline,z);
            interior.push({floor:!!floor,leak:changed(pixel(wet,local,boat),pixel(dry,local,boat)),colourChanged:changed(pixel(dry,local,boat),pixel(noMask,local,boat))});
          }
          const outside=new T.Vector3(-1.05,waterline,4.3);
          samples.push({lod,t,interior,riverVisible:changed(pixel(wet,outside,boat),pixel(dry,outside,boat)),maskRestored:mask.visible});
        }
      }
    }finally{
      clock.value=savedTime;tile.riverboat.update();const asset=savedAsset===tile.near.root?tile.near:tile.far;tile.host.mount(asset.root,asset.metrics,asset===tile.near?'tile':'overview');w.ocean.mesh.visible=true;w.ocean.markDirty();target.dispose();w.renderer.setRenderTarget(savedTarget);
    }
    return samples;
  });
  for(const sample of result){
    expect(sample.interior.every(p=>p.floor),`${sample.lod} retains the submerged hull floor`).toBe(true);
    expect(sample.interior.some(p=>p.leak),`${sample.lod} water inside hull at ${sample.t}s`).toBe(false);
    expect(sample.interior.some(p=>p.colourChanged),'the mask must not paint over the native interior').toBe(false);
    expect(sample.riverVisible).toBe(true);expect(sample.maskRestored).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('Punk drifts and boosts on its road, keeps both LODs aligned and pauses with the map',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const clearance=await page.evaluate(async()=>{
    const threeURL=performance.getEntriesByType('resource').find(e=>/\/(?:three\/build\/three\.module|deps\/three)\.js(?:\?|$)/.test(e.name))!.name;
    const {Vector3,Ray,DoubleSide}=await import(threeURL),bvhURL='/node_modules/three-mesh-bvh/src/index.js',{MeshBVH}=await import(bvhURL);
    const w=(window as any).worldTiles,t=w.tiles.find((t:any)=>t.definition.id==='punk'),clock=w.ocean.material.uniforms.uTime,saved=clock.value;
    const ray=new Ray(new Vector3(),new Vector3(0,-1,0)),results=[];
    for(const lod of ['near','far']){
      const root=t[lod].root,bvh=new MeshBVH(root.children.find((m:any)=>m.userData.role==='structure').geometry);
      const car=root.children.find((m:any)=>m.userData.role==='car'),vertices=car.geometry.attributes.position,effects=car.geometry.attributes._effect,p=new Vector3();
      let highest=-Infinity,lowest=Infinity,missing=0,drift=0,boost=0;
      // The actual car footprint, including its sideways drift, must stay on
      // asphalt below the roofline. Tall sign overhangs are intentionally safe.
      for(let i=0;i<360;i++){
        clock.value=t.car.duration*i/360;t.car.update();car.updateMatrix();
        drift=Math.max(drift,Math.abs(t.car.pose.drift));boost=Math.max(boost,t.car.boost.value);
        for(let j=0;j<vertices.count;j++){
          if(effects.getX(j)>0)continue;
          p.fromBufferAttribute(vertices,j).applyMatrix4(car.matrix);ray.origin.set(p.x,.7,p.z);
          const hit=bvh.raycastFirst(ray,DoubleSide);
          if(hit){highest=Math.max(highest,hit.point.y);lowest=Math.min(lowest,hit.point.y);}else missing++;
        }
      }
      results.push({lod,highest,lowest,missing,drift,boost,shader:car.material.customProgramCacheKey(),shadow:car.customDepthMaterial.customProgramCacheKey()});
    }
    clock.value=saved;t.car.update();return results;
  });
  for(const lod of clearance){
    expect(lod.missing).toBe(0);expect(lod.lowest).toBeGreaterThan(.06);expect(lod.highest).toBeLessThan(.09);
    expect(lod.drift).toBeGreaterThan(.3);expect(lod.boost).toBeGreaterThan(.98);
    expect(lod.shader).toContain('punk-quadra-drift-boost-v2');expect(lod.shadow).toContain('punk-quadra-drift-boost-v2');
  }
  const pose=()=>page.evaluate(()=>{
    const w=(window as any).worldTiles,t=w.tiles.find((t:any)=>t.definition.id==='punk');
    return {time:w.inspect().time,lod:t.lod,position:t.car.position.toArray(),boost:t.car.boost.value,
      matrices:['near','far'].map(lod=>{const car=t[lod].root.children.find((m:any)=>m.userData.role==='car');car.updateMatrix();return car.matrix.toArray();})};
  });
  const initial=await pose();expect(initial.lod).toBe('overview');
  await toggleMotion(page);await expect.poll(async()=>(await pose()).time).toBeGreaterThan(initial.time+.3);await toggleMotion(page);
  const moved=await pose();expect(moved.position).not.toEqual(initial.position);expect(moved.matrices[0]).toEqual(moved.matrices[1]);
  await page.waitForTimeout(150);expect(await pose()).toEqual(moved);
  await page.locator('[data-map-tile="punk"]').click();await page.getByRole('dialog',{name:'Punk',exact:true}).getByRole('button',{name:'Close creator details'}).click();
  const near=await pose();expect(near.lod).toBe('tile');expect(near.position).toEqual(moved.position);expect(near.matrices).toEqual(moved.matrices);
  expect(errors).toEqual([]);
});

test('Punk has three descending blue rings per thruster, floating independently on the shared clock',async({page})=>{
  await page.setViewportSize({width:1280,height:900});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const result=await page.evaluate(async()=>{
    const threeURL=performance.getEntriesByType('resource').find(e=>/\/(?:three\/build\/three\.module|deps\/three)\.js(?:\?|$)/.test(e.name))!.name;
    const {Scene,OrthographicCamera,WebGLRenderTarget,HalfFloatType,Color}=await import(threeURL);
    const w=(window as any).worldTiles,rings=w.hover.rings,renderer=w.renderer,clock=w.ocean.material.uniforms.uTime;
    const savedTime=clock.value,savedTarget=renderer.getRenderTarget(),savedColour=renderer.getClearColor(new Color()),savedAlpha=renderer.getClearAlpha();
    // Isolate one actual three-ring stack and read its rendered silhouette
    // side-on. This checks visible size, separation, colour and displacement,
    // rather than reproducing the vertex animation formula in the test.
    const sample=rings.clone(),geometry=rings.geometry.clone();sample.geometry=geometry;
    const attributes=geometry.attributes,indices=geometry.index.array;
    const end=indices.findIndex((i:number)=>attributes.aEngine.getX(i)!==0);geometry.setDrawRange(0,end);
    const x=Math.cos(Math.PI/6)*6.22,z=Math.sin(Math.PI/6)*6.22*.8-1.2;
    const scene=new Scene(),camera=new OrthographicCamera(-.9,.9,1.2,-1.2,.1,10);scene.add(sample);
    camera.position.set(x,1.48,z+4);camera.lookAt(x,1.48,z);
    const target=new WebGLRenderTarget(240,320,{type:HalfFloatType});
    const read=()=>{
      renderer.setRenderTarget(target);renderer.setClearColor(0,1);renderer.clear();renderer.render(scene,camera);
      const raw=new Uint16Array(240*320*4);renderer.readRenderTargetPixels(target,0,0,240,320,raw);
      return Array.from(raw,(v:number)=>{const e=(v>>10)&31,m=v&1023;return ((v&32768)?-1:1)*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);});
    };
    const bands=(pixels:number[])=>{
      const strips:{y:number;width:number;rows:number}[]=[];let current:typeof strips[number]|undefined;
      for(let y=0;y<320;y++){
        let left=240,right=-1;
        for(let x=0;x<240;x++){const i=(y*240+x)*4;if(pixels[i+2]>.5&&pixels[i+2]>pixels[i+1]*1.5&&pixels[i+1]>pixels[i]*3){left=Math.min(left,x);right=Math.max(right,x);}}
        if(right<left){current=undefined;continue;}
        if(!current){current={y:0,width:0,rows:0};strips.push(current);}
        current.y+=y;current.rows++;current.width=Math.max(current.width,right-left+1);
      }
      return strips.map(s=>({...s,y:s.y/s.rows})).reverse();
    };
    try{
      const initial=read();await new Promise(resolve=>setTimeout(resolve,120));const paused=read();
      clock.value+=1.3;const moved=read();
      let peakBlue=0;for(let i=2;i<initial.length;i+=4)peakBlue=Math.max(peakBlue,initial[i]);
      const pairs=new Set<string>();for(let i=0;i<attributes.position.count;i++)pairs.add(`${attributes.aEngine.getX(i)}:${attributes.aRing.getX(i)}`);
      return {initial:bands(initial),moved:bands(moved),peakBlue,stacks:pairs.size,
        pausedChange:initial.reduce((n:number,v:number,i:number)=>n+Math.abs(v-paused[i]),0)/initial.length,
        finite:[...initial,...moved].every(Number.isFinite),triangles:rings.geometry.index.count/3,clipping:rings.material.clipping};
    }finally{
      clock.value=savedTime;renderer.setRenderTarget(savedTarget);renderer.setClearColor(savedColour,savedAlpha);geometry.dispose();target.dispose();
    }
  });
  expect(result.stacks).toBe(18);expect(result.initial).toHaveLength(3);expect(result.moved).toHaveLength(3);
  expect(result.initial[0].width).toBeGreaterThan(result.initial[1].width);expect(result.initial[1].width).toBeGreaterThan(result.initial[2].width);
  expect(result.initial[2].width/result.initial[0].width).toBeGreaterThan(.65);
  for(let i=0;i<2;i++)expect(result.initial[i].y-result.initial[i+1].y).toBeGreaterThan(50);
  const shifts=result.moved.map((ring:any,i:number)=>ring.y-result.initial[i].y);
  expect(Math.abs(shifts[0])).toBeGreaterThan(2);expect(Math.max(...shifts)-Math.min(...shifts)).toBeGreaterThan(5);
  expect(result.peakBlue).toBeGreaterThan(2);expect(result.finite).toBe(true);expect(result.pausedChange).toBe(0);
  expect(result.triangles).toBeLessThan(8000);expect(result.clipping).toBe(true);expect(errors).toEqual([]);
});

test('water waves focus sunlight, animate together and stay idle when paused',async({page})=>{
  await page.setViewportSize({width:1280,height:900});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const result=await page.evaluate(async()=>{
    const w=(window as any).worldTiles,water=w.ocean;
    const settle=async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);};
    await settle();
    const read=(target:any,attachment=0)=>{
      const raw=new Uint16Array(target.width*target.height*4);w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,raw,undefined,attachment);
      return Array.from(raw,v=>{const e=(v>>10)&31,m=v&1023;return ((v&32768)?-1:1)*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);});
    };
    const before=read(water.spectrum.target),ripples=read(water.spectrum.target,2),light=read(water.caustics.target),intensity=light.filter((_:number,i:number)=>i%4===0);
    const idle=water.capture(w.renderer,w.scene,w.camera),paused=read(water.spectrum.target),pausedRipples=read(water.spectrum.target,2);
    water.material.uniforms.uTime.value+=.6;w.controls.dispatchEvent({type:'change'});await settle();
    const after=read(water.spectrum.target),nextRipples=read(water.spectrum.target,2),nextLight=read(water.caustics.target);
    const delta=(a:number[],b:number[])=>a.reduce((sum,v,i)=>sum+Math.abs(v-b[i]),0)/a.length;
    // Independent spectra must not accidentally sample the same attachment:
    // that brings back the repeated, scaled ripple pattern on the whole sea.
    let cross=0,swellEnergy=0,rippleEnergy=0;
    for(let i=0;i<before.length;i+=4){cross+=before[i]*ripples[i];swellEnergy+=before[i]**2;rippleEnergy+=ripples[i]**2;}
    const readBed=()=>{
      const target=water.refraction,raw=new Uint16Array(target.width*target.height*4),samples=[];
      w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,raw);
      for(let i=0;i<raw.length;i+=64){const v=raw[i],e=(v>>10)&31,m=v&1023;samples.push(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);}
      return samples;
    };
    const cloudBed=readBed();
    w.clouds.mesh.visible=false;water.markDirty();w.controls.dispatchEvent({type:'change'});await settle();
    const cloudBedLeak=delta(cloudBed,readBed());
    w.clouds.mesh.visible=true;water.markDirty();w.controls.dispatchEvent({type:'change'});await settle();
    // Orbiting used to hide entire strips of seabed behind the near bank.
    // Isolate the bed: the near-surface whale deliberately shifts within this
    // capture along the refracted view ray so its fins line up with its back.
    w.wildlife.whale.visible=false;water.markDirty();w.controls.dispatchEvent({type:'change'});await settle();
    const bedBefore=readBed();
    w.camera.position.sub(w.controls.target).applyAxisAngle(w.camera.up,Math.PI).add(w.controls.target);w.controls.update();await settle();
    const bedAfter=readBed();
    w.wildlife.whale.visible=true;water.markDirty();w.controls.dispatchEvent({type:'change'});await settle();
    return {finite:[...before,...ripples,...light,...after,...nextRipples,...nextLight].every(Number.isFinite),correlation:cross/Math.sqrt(swellEnergy*rippleEnergy),
      cloudBedLeak,bedDrift:delta(bedBefore,bedAfter),bedSignal:bedBefore.reduce((n,v)=>n+v,0)/bedBefore.length,
      idlePasses:idle.passes,idleChange:delta(before,paused)+delta(ripples,pausedRipples),waveChange:delta(before,after),rippleChange:delta(ripples,nextRipples),lightChange:delta(light,nextLight),
      meanLight:intensity.reduce((n:number,v:number)=>n+v,0)/intensity.length,maxLight:Math.max(...intensity),
      budget:water.inspect(),triangles:w.inspect().totalFrameTriangles,draws:w.inspect().totalFrameDrawCalls};
  });
  expect(result.finite).toBe(true);expect(result.idlePasses).toBe(0);expect(result.idleChange).toBe(0);
  expect(result.waveChange).toBeGreaterThan(.005);expect(result.rippleChange).toBeGreaterThan(.005);expect(result.lightChange).toBeGreaterThan(.01);
  expect(Math.abs(result.correlation)).toBeLessThan(.2);expect(result.budget.bands).toBe(4);expect(result.budget.method).toBe('tidewater-fft');
  expect(result.bedSignal).toBeGreaterThan(.01);expect(result.bedDrift).toBeLessThan(.0001);
  expect(result.cloudBedLeak).toBeLessThan(.0001);
  expect(result.meanLight).toBeGreaterThan(.4);expect(result.meanLight).toBeLessThan(1.3);expect(result.maxLight).toBeGreaterThan(1.2);
  expect(result.budget.resolution).toEqual([256,256]);expect(result.budget.causticsResolution).toEqual([256,256]);
  expect(result.budget.refractionResolution[0]).toBeLessThanOrEqual(1440);expect(result.budget.refractionResolution[1]).toBeLessThanOrEqual(1000);
  expect(result.draws).toBeLessThanOrEqual(FULL_FRAME_DRAW_BUDGET);expect(result.triangles).toBeLessThan(FULL_FRAME_TRIANGLE_BUDGET);
  expect(errors).toEqual([]);
});

test('open sea keeps its blue colour through a full orbit toward the reflected sun',async({page})=>{
  await page.setViewportSize({width:1000,height:720});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const samples=await page.evaluate(async()=>{
    const w=(window as any).worldTiles,water=w.ocean,radius=w.camera.position.distanceTo(w.controls.target);
    // Isolate ocean radiance from clouds, labels and bright buildings. Sample
    // world-space open sea, beyond all four islands, instead of a fixed crop.
    const visibility=w.scene.children.map((root:any)=>[root,root.visible]);
    for(const [root] of visibility)if(root!==water.mesh&&!root.isLight)root.visible=false;
    const original={position:w.camera.position.clone(),time:water.material.uniforms.uTime.value};
    water.material.uniforms.uTime.value=30;
    const half=(v:number)=>{const e=(v>>10)&31,m=v&1023;return ((v&32768)?-1:1)*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);};
    const result=[];
    try{
      for(const polar of [.64,.96,1.12])for(let i=0;i<8;i++){
        const angle=i*Math.PI/4;
        w.camera.position.set(Math.sin(angle)*Math.sin(polar)*radius,Math.cos(polar)*radius,Math.cos(angle)*Math.sin(polar)*radius).add(w.controls.target);
        w.controls.update();water.markDirty();w.controls.dispatchEvent({type:'change'});
        for(let frame=0;frame<3;frame++)await new Promise(requestAnimationFrame);
        const target=w.post.target,pixels=new Uint16Array(target.width*target.height*4);
        w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,pixels);
        const point=w.camera.position.clone(),direction=w.camera.getWorldDirection(point.clone());
        let total=0,blue=0,washedOut=0,peak=0;
        for(let y=0;y<target.height;y+=8)for(let x=0;x<target.width;x+=8){
          point.set((x+.5)/target.width*2-1,(y+.5)/target.height*2-1,-1).unproject(w.camera);
          point.addScaledVector(direction,-point.y/direction.y);
          if(Math.hypot(point.x-3.6,point.z+7.2)<28)continue;
          const offset=(y*target.width+x)*4,r=half(pixels[offset]),g=half(pixels[offset+1]),b=half(pixels[offset+2]);
          if(r+g+b<.02)continue;
          total++;if(b>r*1.8&&b>g*1.12)blue++;
          if(Math.min(r,g,b)/Math.max(r,g,b)>.65&&Math.max(r,g,b)>.3)washedOut++;
          peak=Math.max(peak,r,g,b);
        }
        result.push({angle,polar,total,blue:blue/total,washedOut:washedOut/total,peak});
      }
    }finally{
      for(const [root,visible] of visibility)root.visible=visible;
      w.camera.position.copy(original.position);water.material.uniforms.uTime.value=original.time;
      w.controls.update();water.markDirty();w.controls.dispatchEvent({type:'change'});
    }
    return result;
  });
  expect(samples).toHaveLength(24);
  for(const pose of samples){
    const angle=`azimuth ${pose.angle.toFixed(2)}, polar ${pose.polar.toFixed(2)}`;
    expect(pose.total,angle).toBeGreaterThan(250);
    expect(pose.blue,angle).toBeGreaterThan(.78);
    expect(pose.washedOut,angle).toBeLessThan(.035);
    expect(pose.peak,angle).toBeLessThan(.8);
  }
  expect(errors).toEqual([]);
});

test('Tidewater wildlife swims and flies on the shared clock within the full-frame budget',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  await page.locator('[data-map-tile="tidewater"]').click();await page.keyboard.press('Escape');
  const result=await page.evaluate(async()=>{
    const w=(window as any).worldTiles,a=w.wildlife,clock=w.ocean.material.uniforms.uTime;
    const settle=async()=>{w.controls.dispatchEvent({type:'change'});await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);};
    const positions=(mesh:any)=>Array.from(mesh.geometry.attributes.position.array) as number[];
    const initial={whale:positions(a.whale),gulls:positions(a.gulls),position:a.whale.position.toArray()};
    const diff=(a:number[],b:number[])=>Math.max(...a.map((v,i)=>Math.abs(v-b[i])));
    const read=()=>{const target=w.post.target,raw=new Uint16Array(target.width*target.height*4);w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,raw);return raw;};
    await settle();const visible=read();a.root.visible=false;await settle();const hidden=read();a.root.visible=true;await settle();
    let renderedPixels=0;for(let i=0;i<visible.length;i+=4)if(Math.abs(visible[i]-hidden[i])+Math.abs(visible[i+1]-hidden[i+1])>150)renderedPixels++;
    clock.value=4;await settle();
    const moved={body:diff(initial.whale,positions(a.whale)),wings:diff(initial.gulls,positions(a.gulls)),route:diff(initial.position,a.whale.position.toArray())};
    const paused={body:positions(a.whale),wings:positions(a.gulls),position:a.whale.position.toArray()};
    await new Promise(resolve=>setTimeout(resolve,120));await settle();
    const pauseChange=diff(paused.body,positions(a.whale))+diff(paused.wings,positions(a.gulls))+diff(paused.position,a.whale.position.toArray());
    const samples=[];
    for(let t=0;t<96;t+=3){clock.value=t;await settle();samples.push(w.inspect());}
    return {renderedPixels,moved,pauseChange,stats:a.inspect(),skin:[a.whale.material.map.image.width,a.whale.material.map.image.height],
      restored:a.whale.layers.mask===1&&a.whale.visible&&a.whale.material.colorWrite&&a.whale.material.depthWrite&&a.gulls.visible&&w.renderer.clippingPlanes.length===0,
      maxDraws:Math.max(...samples.map(s=>s.totalFrameDrawCalls)),maxTriangles:Math.max(...samples.map(s=>s.totalFrameTriangles)),
      allShadows:samples.every(s=>s.shadows.updated)};
  });
  expect(result.stats.gulls).toBe(7);expect(result.stats.whales).toBe(1);expect(result.stats.triangles).toBeLessThan(3200);
  expect(result.skin).toEqual([1024,512]);expect(result.renderedPixels).toBeGreaterThan(100);
  expect(result.moved.body).toBeGreaterThan(.2);expect(result.moved.wings).toBeGreaterThan(.5);expect(result.moved.route).toBeGreaterThan(.3);
  expect(result.pauseChange).toBe(0);expect(result.restored).toBe(true);expect(result.allShadows).toBe(true);
  expect(result.maxDraws).toBeLessThanOrEqual(FULL_FRAME_DRAW_BUDGET);expect(result.maxTriangles).toBeLessThan(FULL_FRAME_TRIANGLE_BUDGET);
  expect(errors).toEqual([]);
});

test('water receives real shadows and native crowns remain attached to their branches',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const result=await page.evaluate(async()=>{
    const w=(window as any).worldTiles;
    const bark=w.scene.getObjectByName('Native Sakura pine structure'),leaves=w.scene.getObjectByName('Native Sakura pine foliage');
    const transformsMatch=bark.count===leaves.count&&Array.from(bark.instanceMatrix.array).every((v,i)=>v===leaves.instanceMatrix.array[i]);
    const half=(v:number)=>{const sign=(v&0x8000)?-1:1,e=(v>>10)&31,m=v&1023;return sign*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);};
    const sample=(target:any)=>{const pixels=new Uint16Array(target.width*target.height*4);w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,pixels);return pixels;};
    const ao=sample(w.post.denoised);let contact=0,open=0;
    for(let i=0;i<ao.length;i+=4){const a=half(ao[i]);if(a<.8)contact++;if(a>.98)open++;}
    const before=sample(w.post.target);
    w.ocean.mesh.receiveShadow=false;w.controls.dispatchEvent({type:'change'});
    await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);
    const after=sample(w.post.target);
    let shadowedWater=0;
    // Only the ocean's shadow reception changes, so compare its actual visible
    // pixels. Projecting a sparse grid at y=0 misses horizontally displaced
    // FFT crests and can land on an occluder instead of the water behind it.
    for(let i=0;i<before.length;i+=4){
      const a=half(before[i])+half(before[i+1])+half(before[i+2]),b=half(after[i])+half(after[i+1])+half(after[i+2]);
      if(b>a*1.12+.015)shadowedWater++;
    }
    w.ocean.mesh.receiveShadow=true;w.controls.dispatchEvent({type:'change'});
    const sun=w.lighting.sun.position.clone().sub(w.lighting.sun.target.position).normalize();
    return {transformsMatch,contact,open,shadowedWater,sunMatches:1-sun.dot(w.ocean.material.uniforms.uSun.value)};
  });
  expect(result.transformsMatch).toBe(true);expect(result.sunMatches).toBeLessThan(1e-8);
  expect(result.contact).toBeGreaterThan(100);expect(result.open).toBeGreaterThan(1000);
  expect(result.shadowedWater).toBeGreaterThan(200);
  // Include shadow-map, reflection/refraction and post-processing draws in the
  // worst-frame budget, not just the visible scene's triangle count.
  await toggleMotion(page);
  const frames=await page.evaluate(async()=>{const samples=[];for(let i=0;i<40;i++){await new Promise(requestAnimationFrame);samples.push((window as any).worldTiles.inspect());}return samples;});
  expect(frames.some(s=>s.shadows.updated)).toBe(true);
  expect(frames.every((s,i)=>i===0||s.time===frames[i-1].time||s.shadows.updated)).toBe(true);
  expect(Math.max(...frames.map(s=>s.totalFrameTriangles))).toBeLessThan(FULL_FRAME_TRIANGLE_BUDGET);
  expect(Math.max(...frames.map(s=>s.totalFrameDrawCalls))).toBeLessThanOrEqual(FULL_FRAME_DRAW_BUDGET);
  await toggleMotion(page);
  expect(errors).toEqual([]);
});

test('contact shadows stay stable through fine foliage motion',async({page})=>{
  await page.setViewportSize({width:1100,height:800});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:15_000});
  const result=await page.evaluate(async()=>{
    const w=(window as any).worldTiles,half=new Float32Array(65536);
    for(let v=0;v<65536;v++){const e=(v>>10)&31,m=v&1023;half[v]=((v&32768)?-1:1)*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);}
    const read=(target:any)=>{const raw=new Uint16Array(target.width*target.height*4);w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,raw);const out=[];for(let i=0;i<raw.length;i+=16)out.push(half[raw[i]]);return out;};
    const delta=(a:number[],b:number[])=>a.reduce((n,v,i)=>n+Math.abs(v-b[i]),0)/a.length;
    const settle=async()=>{await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);};
    let rawChange=0,stableChange=0,lastRaw:number[]=[],lastStable:number[]=[];
    for(let frame=0;frame<40;frame++){
      // A deterministic 60 Hz wind sequence, independent of test-machine speed.
      w.ocean.material.uniforms.uTime.value=frame/60;
      const host=document.querySelector('.tile-canvas') as HTMLElement;
      host.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}));
      host.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}));await settle();
      const raw=read(w.post.denoised),stable=read(w.post.stableAO);
      if(frame>12){rawChange+=delta(raw,lastRaw);stableChange+=delta(stable,lastStable);}
      lastRaw=raw;lastStable=stable;
    }
    // A resized/reset view must start from fresh AO, without a history trail.
    (document.querySelector('[data-reset]') as HTMLButtonElement).click();await settle();
    return {rawChange,stableChange,resetError:delta(read(w.post.denoised),read(w.post.stableAO))};
  });
  expect(result.rawChange).toBeGreaterThan(.001);
  expect(result.stableChange).toBeLessThan(result.rawChange*.85);
  expect(result.resetError).toBeLessThan(.0001);
  expect(errors).toEqual([]);
});
