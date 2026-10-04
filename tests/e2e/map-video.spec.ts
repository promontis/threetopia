import {test,expect,type Page} from '@playwright/test';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {Input,BufferSource,Mp4InputFormat,EncodedPacketSink} from 'mediabunny';

const out='.context/map-video';
const inspect=(page:Page)=>page.evaluate(()=>(window as any).worldTiles.inspect());
async function openMap(page:Page){
  await page.addInitScript(()=>{localStorage.setItem('threetopia.map.video.v1',JSON.stringify({includeUI:false}));});
  await page.bringToFront();await page.goto('/map/lite/');
  await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:20_000});
}

test('records an animated camera take and downloads a real, evenly timed 1080p MP4',async({page})=>{
  test.setTimeout(180_000);
  await page.setViewportSize({width:1280,height:800});
  const errors:string[]=[],requests:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  await openMap(page);
  expect(requests.some(url=>url.includes('mediabunny'))).toBe(false);
  await page.getByRole('button',{name:'Open settings',exact:true}).click();
  await page.getByRole('combobox',{name:'Pixel ratio',exact:true}).selectOption('2');
  expect(await page.evaluate(()=>(window as any).worldTiles.renderer.getPixelRatio())).toBe(2);
  await page.getByRole('button',{name:'Close settings',exact:true}).click();
  await page.getByRole('button',{name:'Record video',exact:true}).click();
  await page.getByLabel('Video size',{exact:true}).selectOption('1080p');
  await page.getByLabel('Camera smoothing',{exact:true}).selectOption('cinematic');
  await page.getByRole('button',{name:'Start recording'}).click();
  await expect(page.locator('.video-take')).toBeVisible();
  const time=(await inspect(page)).time;
  await expect.poll(async()=>(await inspect(page)).time).toBeGreaterThan(time+.3);
  await page.keyboard.press('ArrowRight');await page.keyboard.press('+');
  await page.waitForTimeout(250);await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(250);await page.keyboard.press('Space');
  const live=await page.evaluate(()=>{
    const w=(window as any).worldTiles;return {position:w.camera.position.toArray(),target:w.controls.target.toArray(),zoom:w.camera.zoom,time:w.inspect().time,width:w.renderer.domElement.width,height:w.renderer.domElement.height};
  });
  const downloadEvent=page.waitForEvent('download');await page.keyboard.press('r');
  await expect(page.getByRole('dialog',{name:'Rendering your video'})).toBeVisible();
  const download=await downloadEvent;await mkdir(out,{recursive:true});await download.saveAs(`${out}/map-1080p.mp4`);
  expect(download.suggestedFilename()).toMatch(/^threetopia-map-.*\.mp4$/);
  await expect(page.locator('.video-message')).toContainText('Video ready');
  const state=await inspect(page);expect(state.video.encodedFrames).toBe(state.video.frames);expect(state.video.phase).toBe('idle');expect(state.motion).toBe(false);expect(state.time).toBe(live.time);
  const restored=await page.evaluate(()=>{
    const w=(window as any).worldTiles;return {position:w.camera.position.toArray(),target:w.controls.target.toArray(),zoom:w.camera.zoom,time:w.inspect().time,width:w.renderer.domElement.width,height:w.renderer.domElement.height};
  });
  for(let i=0;i<3;i++)expect(restored.position[i]).toBeCloseTo(live.position[i]);
  expect(restored.target).toEqual(live.target);expect(restored.zoom).toBe(live.zoom);expect(restored.width).toBe(live.width);expect(restored.height).toBe(live.height);
  expect(await page.evaluate(()=>(window as any).worldTiles.renderer.getPixelRatio())).toBe(2);
  const input=new Input({source:new BufferSource(await readFile(`${out}/map-1080p.mp4`)),formats:[new Mp4InputFormat()]});
  try{
    const track=(await input.getPrimaryVideoTrack())!;
    expect(await track.getDisplayWidth()).toBe(1920);expect(await track.getDisplayHeight()).toBe(1080);expect(await track.getCodec()).toBe('avc');
    const stats=await track.computePacketStats();expect(stats.packetCount).toBe(state.video.frames);expect(stats.averagePacketRate).toBeCloseTo(60,2);
    const timestamps:number[]=[];for await(const packet of new EncodedPacketSink(track).packets())timestamps.push(packet.timestamp);
    timestamps.sort((a,b)=>a-b);for(let i=1;i<timestamps.length;i++)expect(timestamps[i]-timestamps[i-1]).toBeCloseTo(1/60,5);
    await writeFile(`${out}/metadata.json`,JSON.stringify({width:await track.getDisplayWidth(),height:await track.getDisplayHeight(),codec:await track.getCodec(),...stats},null,2));
  }finally{input.dispose();}
  // Decode the actual exported file in a video element; metadata alone cannot
  // detect black/blank captures or an accidentally frozen camera path.
  const decoded=await page.evaluate(async()=>{
    const video=document.createElement('video');video.muted=true;video.preload='auto';video.src=(document.querySelector('.video-download') as HTMLAnchorElement).href;
    await new Promise<void>((resolve,reject)=>{video.onloadeddata=()=>resolve();video.onerror=()=>reject(new Error('MP4 could not be decoded'));});
    const canvas=document.createElement('canvas');canvas.width=720;canvas.height=405;const ctx=canvas.getContext('2d')!;
    const draw=()=>{ctx.drawImage(video,0,0,720,405);return new Uint8Array(ctx.getImageData(0,0,720,405).data);};
    const first=draw(),image=canvas.toDataURL('image/png');
    await new Promise<void>(resolve=>{video.onseeked=()=>resolve();video.currentTime=Math.max(.1,video.duration-.1);});
    const last=draw();let bright=0,difference=0;
    for(let i=0;i<first.length;i+=4){if(Math.max(first[i],first[i+1],first[i+2])>40)bright++;difference+=Math.abs(first[i]-last[i])+Math.abs(first[i+1]-last[i+1])+Math.abs(first[i+2]-last[i+2]);}
    video.removeAttribute('src');video.load();
    return {bright:bright/(720*405),difference:difference/(720*405*3),image};
  });
  expect(decoded.bright).toBeGreaterThan(.8);expect(decoded.difference).toBeGreaterThan(3);
  await writeFile(`${out}/export-frame.png`,Buffer.from(decoded.image.split(',')[1],'base64'));
  await page.screenshot({path:`${out}/recorder-desktop.png`});
  await page.getByRole('button',{name:'Close video recorder'}).click();
  await page.keyboard.press('h');await expect(page.locator('#map-settings')).toBeVisible();
  expect(errors).toEqual([]);
});

test('tile details stay interactive during recording without pausing the take',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await openMap(page);await page.locator('.tile-canvas').focus();await page.keyboard.press('r');
  await expect(page.locator('.video-take')).toBeVisible();
  const point=await page.evaluate(()=>{
    const w=(window as any).worldTiles,p=w.camera.position.clone().set(-.4,1,-.86).project(w.camera),r=w.renderer.domElement.getBoundingClientRect();
    return {x:r.left+(p.x*.5+.5)*r.width,y:r.top+(-p.y*.5+.5)*r.height};
  });
  await page.mouse.click(point.x,point.y);
  const lagoon=page.getByRole('dialog',{name:'Lagoon Tree Village',exact:true});await expect(lagoon).toBeVisible();
  const during=await inspect(page);expect(during.selected).toBe('lagoon');expect(during.video.phase).toBe('recording');
  await expect.poll(async()=>(await inspect(page)).time).toBeGreaterThan(during.time+.15);
  expect((await inspect(page)).video.samples).toBeGreaterThan(during.video.samples);
  // Escape belongs to the details dialog first, not to the recorder behind it.
  await page.keyboard.press('Escape');await expect(lagoon).not.toBeVisible();
  expect((await inspect(page)).video.phase).toBe('recording');await expect(page.locator('.tile-canvas')).toBeFocused();
  await page.locator('[data-reset]').click();
  const card=page.getByRole('button',{name:'View details for Tidewater',exact:true});await card.click();
  const tidewater=page.getByRole('dialog',{name:'Tidewater',exact:true});await expect(tidewater).toBeVisible();
  await tidewater.getByRole('button',{name:'Close creator details'}).click();await expect(card).toBeFocused();
  await page.keyboard.press('Enter');await expect(tidewater).toBeVisible();
  expect((await inspect(page)).video.phase).toBe('recording');
  // Stopping with a card open must leave only the export modal, then restore
  // usable map controls if the export is cancelled.
  await page.keyboard.press('r');await expect(tidewater).not.toBeVisible();
  await expect(page.getByRole('dialog',{name:'Rendering your video'})).toBeVisible();
  await expect.poll(async()=>(await inspect(page)).video.encodedFrames).toBeGreaterThan(0);
  await page.getByRole('button',{name:'Cancel export'}).click();
  await expect(page.locator('.video-message')).toContainText('Export cancelled');
  const restored=await inspect(page);expect(restored.video.phase).toBe('idle');expect(restored.motion).toBe(true);expect(restored.details).toBeNull();
  await page.getByRole('button',{name:'Close video recorder'}).click();await card.click();await expect(tidewater).toBeVisible();
  await page.keyboard.press('Escape');expect(errors).toEqual([]);
});

test('cancels rendering, restores the resized map, and records again with reduced motion',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1000,height:720});await openMap(page);
  await page.locator('.tile-canvas').focus();await page.keyboard.press('r');
  // Leave enough export frames to resize and cancel before encoding finishes.
  await expect.poll(async()=>(await inspect(page)).video.samples).toBeGreaterThan(120);
  const before=await inspect(page);await page.keyboard.press('r');
  await expect(page.getByRole('dialog',{name:'Rendering your video'})).toBeVisible();
  await expect.poll(async()=>(await inspect(page)).video.encodedFrames).toBeGreaterThan(0);
  await page.setViewportSize({width:900,height:700});
  await page.getByRole('button',{name:'Cancel export'}).click();
  await expect(page.locator('.video-message')).toContainText('Export cancelled');
  expect((await inspect(page)).motion).toBe(false);expect((await inspect(page)).time).toBe(before.time);
  expect(await page.evaluate(()=>(window as any).worldTiles.controls.enabled)).toBe(true);
  expect(await page.locator('canvas').first().evaluate((c:HTMLCanvasElement)=>c.width/c.height)).toBeCloseTo(900/700,2);
  await page.getByRole('button',{name:'Close video recorder'}).click();await page.locator('.tile-canvas').focus();await page.keyboard.press('r');
  await expect(page.locator('.video-take')).toBeVisible();await page.waitForTimeout(200);await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog',{name:'Rendering your video'})).toBeVisible();await page.keyboard.press('Escape');
  await expect(page.locator('.video-message')).toContainText('Export cancelled');
  await expect(page.locator('.world-labels')).not.toHaveAttribute('inert','');
});

test('shows an encoder failure and returns to the usable map',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(()=>{VideoEncoder.isConfigSupported=async config=>({supported:false,config});});
  await openMap(page);await page.locator('.tile-canvas').focus();await page.keyboard.press('r');await page.waitForTimeout(220);await page.keyboard.press('r');
  await expect(page.locator('.video-message')).toContainText('cannot encode');
  expect((await inspect(page)).video.phase).toBe('idle');expect(await page.evaluate(()=>(window as any).worldTiles.controls.enabled)).toBe(true);
  await expect(page.locator('.video-start')).toBeEnabled();
});

test('mobile video controls fit and unsupported browsers get a clear explanation',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});
  await page.addInitScript(()=>{Object.defineProperty(window,'VideoEncoder',{value:undefined});});
  await openMap(page);await page.getByRole('button',{name:'Record video',exact:true}).click();
  await expect(page.locator('.video-message')).toContainText('WebCodecs');await expect(page.locator('.video-start')).toBeDisabled();
  const boxes=await page.locator('.map-video-trigger,.map-brand,.map-video-panel').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,bottom:r.bottom};}));
  expect(boxes.every(b=>b.left>=0&&b.right<=390&&b.bottom<=844)).toBe(true);
  const brand=await page.locator('.map-brand').boundingBox(),trigger=await page.locator('.map-video-trigger').boundingBox();expect(brand!.x+brand!.width).toBeLessThan(trigger!.x);
  await mkdir(out,{recursive:true});await page.screenshot({path:`${out}/recorder-mobile.png`});
  await page.getByRole('button',{name:'Close video recorder'}).click();await page.keyboard.press('h');await expect(page.locator('#map-settings')).toBeVisible();
});

test('exports both a portrait window and a 4K take, then enforces the two-minute limit',async({page})=>{
  test.setTimeout(120_000);await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});await openMap(page);
  await mkdir(out,{recursive:true});
  for(const size of ['window','2160p']){
    await page.getByRole('button',{name:'Record video',exact:true}).click();
    await page.getByLabel('Video size',{exact:true}).selectOption(size);
    await page.getByRole('button',{name:'Start recording'}).click();await page.waitForTimeout(180);
    const event=page.waitForEvent('download');await page.keyboard.press('r');
    const download=await event;const path=`${out}/map-${size}.mp4`;await download.saveAs(path);
    await expect(page.locator('.video-message')).toContainText('Video ready');
    const input=new Input({formats:[new Mp4InputFormat()],source:new BufferSource(await readFile(path))});
    try{
      const track=(await input.getPrimaryVideoTrack())!;
      expect([await track.getDisplayWidth(),await track.getDisplayHeight()]).toEqual(size==='window'?[390,844]:[3840,2160]);
      expect((await track.computePacketStats()).averagePacketRate).toBeCloseTo(60,2);
    }finally{input.dispose();}
    expect((await inspect(page)).motion).toBe(false);await page.getByRole('button',{name:'Close video recorder'}).click();
  }
  await page.locator('.tile-canvas').focus();await page.keyboard.press('r');
  await page.evaluate(()=>(window as any).worldTiles.video.sample(performance.now()+120_100));
  await expect(page.getByRole('dialog',{name:'Rendering your video'})).toBeVisible();
  expect((await inspect(page)).video.frames).toBe(7201);
  await page.keyboard.press('Escape');await expect(page.locator('.video-message')).toContainText('Export cancelled');
});
