import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';

// Read-only camera regression. Selection now deliberately locks zoom and pan.
// --live checks the deployed creator app with a mocked session; all writes blocked.
const live=process.argv.includes('--live'),origin=live?'https://creators.threetopia.com':'http://127.0.0.1:55020';
const out='.context/tile-camera-lock',suffix=live?'-live':'';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:false}),checks=[],errors=[];
function near(a,b,label,tolerance=1e-6){assert.ok(Math.abs(a-b)<tolerance,`${label}: ${a} != ${b}`);}
function sameView(a,b,label){
 for(const key of ['position','target','quaternion','offset'])a[key].forEach((v,i)=>near(v,b[key][i],label+': '+key));
 near(a.height,b.height,label+': height');
}
try{
 const context=await browser.newContext({viewport:{width:1700,height:1150},deviceScaleFactor:1,hasTouch:true,acceptDownloads:true});
 await context.addInitScript(()=>{
  const NativeWorker=window.Worker;window.terrainJobs=0;
  window.Worker=class extends NativeWorker{postMessage(data,...args){if(data.id)window.terrainJobs++;return super.postMessage(data,...args);}};
 });
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 await page.route(origin+'/api/**',route=>{
  if(route.request().method()!=='GET')return route.fulfill({status:403,json:{message:'Read-only browser check'}});
  if(new URL(route.request().url()).pathname==='/api/me')return route.fulfill({json:{creator:{handle:'tile-review',displayName:'Tile review',email:'review@example.test'}}});
  return route.continue();
 });
 await page.goto(origin+'/tiles');
 await page.frameLocator('iframe').locator('.tile-canvas[data-ready=true]').waitFor({timeout:90000});
 const frame=page.frames().find(f=>f.url().includes('/map-preview/')),inspector=page.locator('#tile-inspector'),canvas=frame.locator('canvas').first(),host=frame.locator('.tile-canvas');
 await frame.waitForFunction(()=>{const g=window.worldTiles?.scene.getObjectByName('Creator registry tiles');return g&&!g.userData.preparing&&g.children.some(c=>c.name==='Available tile');});
 const tick=()=>frame.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 const state=()=>frame.evaluate(()=>{
  const w=window.worldTiles,g=w.scene.getObjectByName('Creator registry tiles'),c=w.camera,v=c.view;
  c.updateMatrixWorld();const p=w.controls.target.clone().project(c);
  return {selection:g.userData.selection,host:g.getObjectByName('Selected creator tile')?.uuid,jobs:window.terrainJobs,locked:w.inspect().registryCameraLocked,
   zoom:c.zoom,height:(c.top-c.bottom)/c.zoom,position:c.position.toArray(),target:w.controls.target.toArray(),quaternion:c.quaternion.toArray(),offset:v?.enabled?[v.offsetX/v.fullWidth,v.offsetY/v.fullHeight]:[0,0],
   screenCenter:[(p.x+1)*w.renderer.domElement.clientWidth/2,(1-p.y)*w.renderer.domElement.clientHeight/2],radius:c.position.distanceTo(w.controls.target),
   pan:w.controls.enablePan,dolly:w.controls.enableZoom,rotate:w.controls.enableRotate};
 });
 async function settled(){
  await frame.waitForFunction(()=>{const w=window.worldTiles,g=w.scene.getObjectByName('Creator registry tiles');return g.userData.focused&&!g.userData.preparing&&g.getObjectByName('Selected creator tile')&&w.inspect().registryCameraLocked;},{},{timeout:60000});
  await expect(inspector).toHaveCSS('opacity','1');await expect(inspector.getByRole('button',{name:'Reserve',exact:true})).toBeEnabled();await tick();
 }
 async function pick(){
  const point=await frame.evaluate(()=>{
   const w=window.worldTiles,g=w.scene.getObjectByName('Creator registry tiles'),canvas=w.renderer.domElement;w.camera.updateMatrixWorld();
   return g.children.filter(o=>o.name==='Available tile').map(o=>{const p=o.position.clone().project(w.camera);return {q:o.userData.q,r:o.userData.r,x:(p.x+1)*canvas.clientWidth/2,y:(1-p.y)*canvas.clientHeight/2};})
    .filter(p=>p.x>50&&p.x<canvas.clientWidth-80&&p.y>90&&p.y<canvas.clientHeight-130).sort((a,b)=>(Math.abs(a.q+1)+Math.abs(a.r))-(Math.abs(b.q+1)+Math.abs(b.r)))[0];
  });
  assert.ok(point,'A free tile must be visible');await canvas.click({position:{x:point.x,y:point.y}});await settled();return point;
 }
 async function bounds(label){
  const points=await frame.evaluate(()=>{
   const w=window.worldTiles,t=w.scene.getObjectByName('Selected creator tile'),c=w.renderer.domElement;w.camera.updateMatrixWorld();t.updateMatrixWorld();
   return Array.from({length:12},(_,i)=>{const a=Math.PI/6+(i%6)*Math.PI/3,p=t.localToWorld(w.camera.position.clone().set(9*Math.cos(a),i<6?0:2.8,9*Math.sin(a))).project(w.camera);return {x:(p.x+1)*c.clientWidth/2,y:(1-p.y)*c.clientHeight/2};});
  });
  const rect=await canvas.boundingBox(),panel=await inspector.boundingBox(),mobile=panel.width>=rect.width-1;
  for(const p of points){assert.ok(p.x>=-.5&&p.x<=(mobile?rect.width:panel.x-rect.x)+.5,label+': fits width');assert.ok(p.y>=-.5&&p.y<=(mobile?panel.y-rect.y:rect.height)+.5,label+': fits height');}
 }
 async function drag(button='left',dx=100,dy=20){
  const rect=await canvas.boundingBox(),p=await state(),x=rect.x+p.screenCenter[0],y=rect.y+p.screenCenter[1];
  await page.mouse.move(x,y);await page.mouse.down({button});await page.mouse.move(x+dx,y+dy,{steps:10});await page.mouse.up({button});await tick();
 }
 async function cancel(saved,escape=false){
  if(escape){await host.focus();await page.keyboard.press('Escape');}else await inspector.getByRole('button',{name:'Cancel',exact:true}).click();
  await expect(inspector).not.toBeVisible();
  await frame.waitForFunction(()=>{const w=window.worldTiles,g=w.scene.getObjectByName('Creator registry tiles');return !g.userData.preparing&&!g.userData.selection&&!w.inspect().registryCameraLocked;});
  await tick();const restored=await state();sameView(restored,saved,escape?'Escape restores view':'Cancel restores view');assert.equal(restored.dolly,true);assert.equal(restored.pan,restored.zoom>1.02);assert.deepEqual(restored.offset,[0,0]);
 }

 // Start from a customized view, so restoration is stronger than a reset-to-overview check.
 await frame.getByRole('button',{name:'Zoom in',exact:true}).click();await host.focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await drag('right',24,12);
 const previous=await state(),coordinate=await pick(),locked=await state();
 near(locked.target[0],Math.sqrt(3)*9*(coordinate.q+coordinate.r/2),'tile center x');near(locked.target[1],1.4,'tile center y');near(locked.target[2],13.5*coordinate.r,'tile center z');
 assert.equal(locked.pan,false);assert.equal(locked.dolly,false);assert.equal(locked.rotate,true);await bounds('initial selection');
 await expect(frame.locator('.map-controls')).not.toBeVisible();
 for(const selector of ['[data-in]','[data-out]','[data-reset]'])await expect(frame.locator(selector)).toBeDisabled();
 await canvas.hover({position:{x:locked.screenCenter[0],y:locked.screenCenter[1]}});await page.mouse.wheel(0,5000);await page.mouse.wheel(0,-5000);await tick();
 await host.focus();for(const key of ['+','-','0'])await page.keyboard.press(key);await drag('right',80,35);sameView(await state(),locked,'Zoom and pan ignored');
 checks.push('Selection locks wheel, zoom/reset shortcuts, controls and pan around the actual tile center');

 await drag('left',130,-35);const orbited=await state();assert.ok(Math.abs(orbited.position[0]-locked.position[0])>1);near(orbited.height,locked.height,'orbit scale');near(orbited.radius,locked.radius,'orbit radius');assert.deepEqual(orbited.target,locked.target);
 for(let i=0;i<42;i++){
  await host.focus();await page.keyboard.press('ArrowRight');const s=await state();near(s.height,locked.height,'full orbit fixed scale');near(s.radius,locked.radius,'full orbit radius');
  s.screenCenter.forEach((v,j)=>near(v,locked.screenCenter[j],'full orbit fixed screen center'));assert.deepEqual(s.target,locked.target);await bounds('full orbit');
 }
 assert.equal((await state()).jobs,locked.jobs,'Camera actions start no terrain work');checks.push('Mouse and keyboard orbit stay centered and fully framed for a complete revolution without zoom changes or terrain jobs');

 const beforeSettings=await state();await frame.getByRole('button',{name:'Open settings',exact:true}).click();
 const settings=frame.getByRole('dialog',{name:'Settings',exact:true});await settings.getByRole('tab',{name:'Camera',exact:true}).click();
 await expect(settings.getByRole('slider',{name:'Zoom',exact:true})).toBeDisabled();
 for(const button of await settings.locator('[data-settings-action="view"]').all())await expect(button).toBeDisabled();
 await tick();sameView(await state(),beforeSettings,'Opening settings');
 await settings.getByRole('tab',{name:'Performance',exact:true}).click();await settings.getByRole('combobox',{name:'Pixel ratio',exact:true}).selectOption('1');await tick();sameView(await state(),beforeSettings,'Changing render quality');
 await settings.getByRole('button',{name:'Close settings',exact:true}).click();await expect(inspector).toHaveCSS('opacity','1');sameView(await state(),beforeSettings,'Closing settings');checks.push('Camera settings cannot bypass the lock; opening panels keeps the camera pose');

 const river=inspector.locator('[data-tile-variant="sakura-river"]');
 if(await river.count()){
  await river.click();await settled();await frame.waitForFunction(()=>window.worldTiles.scene.getObjectByName('Selected creator tile').userData.contract.variant==='sakura-river');sameView(await state(),beforeSettings,'Variant selection');
  await inspector.getByRole('button',{name:'Rotate clockwise',exact:true}).click();await settled();sameView(await state(),beforeSettings,'Tile rotation');checks.push('Changing terrain and rotating the tile preserve the camera');
 }
 await page.screenshot({path:`${out}/desktop${suffix}.png`});

 if(!live){
  const beforeVideo=await state();await frame.getByRole('button',{name:'Record video',exact:true}).click();
  await frame.getByRole('button',{name:'Start recording',exact:false}).click();
  await expect.poll(()=>frame.evaluate(()=>window.worldTiles.video.inspect().duration),{timeout:15000}).toBeGreaterThan(.35);
  const downloaded=page.waitForEvent('download',{timeout:90000});await frame.locator('.video-take button').click();
  await (await downloaded).saveAs(`${out}/locked-selection.mp4`);
  await frame.getByRole('button',{name:'Close video recorder',exact:true}).click();await settled();sameView(await state(),beforeVideo,'Video export restores view');checks.push('Actual MP4 export succeeds and restores the locked camera');
 }
 await cancel(previous);checks.push('Cancel restores the exact previous position, orientation, target and scale');
 const restored=await state();await frame.getByRole('button',{name:'Zoom in',exact:true}).click();assert.ok((await state()).zoom>restored.zoom);await drag('right',40,10);assert.notDeepEqual((await state()).target,restored.target);checks.push('Normal zoom and pan work again after Cancel');

 await frame.getByRole('button',{name:'Show all worlds',exact:true}).click();
 for(const viewport of [{width:430,height:932},{width:375,height:812}]){
  await page.setViewportSize(viewport);await page.waitForTimeout(250);
  const mobilePrevious=await state();await pick();await bounds('mobile selection');
  const mobileLocked=await state(),rect=await canvas.boundingBox(),x=rect.x+mobileLocked.screenCenter[0],y=rect.y+mobileLocked.screenCenter[1];
  const cdp=await context.newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-25,y,id:1},{x:x+25,y,id:2}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-65,y:y+25,id:1},{x:x+95,y:y+25,id:2}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await tick();sameView(await state(),mobileLocked,'Pinch and two-finger pan ignored');
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+50,y:y+15,id:1}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await tick();
  const afterTouch=await state();assert.notDeepEqual(afterTouch.position,mobileLocked.position);assert.deepEqual(afterTouch.target,mobileLocked.target);near(afterTouch.height,mobileLocked.height,'touch orbit scale');await bounds('touch orbit');
  await page.screenshot({path:`${out}/mobile-${viewport.width}${suffix}.png`});await cdp.detach();await cancel(mobilePrevious,true);
 }
 checks.push('430px and 375px mobile: pinch/pan locked, touch orbit works, tile fits above drawer, Escape restores view');
 assert.deepEqual(errors,[]);await writeFile(`${out}/review${suffix}.json`,JSON.stringify({origin,checks,errors},null,2));console.log({origin,checks,errors});
}finally{await browser.close();}
