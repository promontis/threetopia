import {test,expect,type Page} from '@playwright/test';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {Input,BufferSource,Mp4InputFormat,EncodedPacketSink} from 'mediabunny';

const out='.context/map-video',inspect=(page:Page)=>page.evaluate(()=>(window as any).worldTiles.inspect());
async function openMap(page:Page){
  await page.addInitScript(()=>{
    (window as any).shareRequests=0;
    navigator.mediaDevices.getDisplayMedia=async()=>{(window as any).shareRequests++;throw Error('Offline export must not request screen sharing.');};
  });
  await page.emulateMedia({reducedMotion:'reduce'});await page.bringToFront();await page.goto('/map/lite/');
  await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:20_000});
}

test('renders HTML cards, logo and controls in the original smooth offline MP4 workflow',async({page})=>{
  test.setTimeout(180_000);await page.setViewportSize({width:1280,height:800});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await openMap(page);
  await page.getByRole('button',{name:'Record video',exact:true}).click();
  await expect(page.getByLabel('Include interface',{exact:true})).toBeChecked();
  await expect(page.getByLabel('Video size',{exact:true})).toBeVisible();
  await page.getByLabel('Camera smoothing',{exact:true}).selectOption('cinematic');
  await page.getByRole('button',{name:'Start recording'}).click();
  await expect(page.locator('.video-take')).toBeVisible();
  await expect.poll(async()=>(await inspect(page)).video.duration).toBeGreaterThan(.3);
  expect((await inspect(page)).video.encodedFrames).toBe(0);
  const reference=async(selectors:string[])=>{
    const boxes=await Promise.all(selectors.map(selector=>page.locator(selector).boundingBox()));
    const image=(await page.screenshot({scale:'css'})).toString('base64'),time=(await inspect(page)).video.duration;
    const viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight}));
    return {boxes:boxes as Array<{x:number;y:number;width:number;height:number}>,image,time,...viewport};
  };
  const overview=await reference(['.map-preview-notice','.map-brand','.map-controls','.north','.map-settings-trigger','.map-video-trigger','[data-map-tile="tidewater"]']);
  await expect.poll(async()=>(await inspect(page)).video.duration).toBeGreaterThan(overview.time+.8);
  await page.getByRole('button',{name:'View details for Tidewater',exact:true}).click();
  const card=page.getByRole('dialog',{name:'Tidewater',exact:true});await expect(card).toBeVisible();
  await expect.poll(()=>card.locator('.creator-preview img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  // Let the camera smoothing settle before comparing a stationary reference.
  const shown=(await inspect(page)).video.duration;
  await expect.poll(async()=>(await inspect(page)).video.duration).toBeGreaterThan(shown+.7);
  const details=await reference(['[data-world-details="tidewater"]']);
  await expect.poll(async()=>(await inspect(page)).video.duration).toBeGreaterThan(details.time+.7);
  await page.keyboard.press('Escape');await expect(card).not.toBeVisible();expect((await inspect(page)).video.phase).toBe('recording');
  await page.locator('[data-reset]').click();
  const closed=(await inspect(page)).video.duration;
  await expect.poll(async()=>(await inspect(page)).video.duration).toBeGreaterThan(closed+.7);
  const after=await reference(['.map-brand','[data-map-tile="tidewater"]']);
  await expect.poll(async()=>(await inspect(page)).video.duration).toBeGreaterThan(after.time+.2);
  const downloaded=page.waitForEvent('download');await page.keyboard.press('r');
  await expect(page.getByRole('dialog',{name:'Rendering your video'})).toBeVisible();
  const download=await downloaded;await mkdir(out,{recursive:true});await download.saveAs(`${out}/map-interface-offline.mp4`);
  await expect(page.locator('.video-message')).toContainText('60 fps');
  const state=await inspect(page);expect(state.video.phase).toBe('idle');expect(state.motion).toBe(false);
  expect(await page.evaluate(()=>(window as any).shareRequests)).toBe(0);
  const input=new Input({source:new BufferSource(await readFile(`${out}/map-interface-offline.mp4`)),formats:[new Mp4InputFormat()]});
  try{
    const track=(await input.getPrimaryVideoTrack())!;expect(await track.getDisplayWidth()).toBe(1280);expect(await track.getDisplayHeight()).toBe(800);
    const stats=await track.computePacketStats();expect(stats.packetCount).toBe(state.video.frames);expect(stats.averagePacketRate).toBeCloseTo(60,2);
    expect(await input.getPrimaryAudioTrack()).toBeNull();
    const timestamps:number[]=[];for await(const packet of new EncodedPacketSink(track).packets())timestamps.push(packet.timestamp);
    timestamps.sort((a,b)=>a-b);for(let i=1;i<timestamps.length;i++)expect(timestamps[i]-timestamps[i-1]).toBeCloseTo(1/60,5);
  }finally{input.dispose();}
  // Decode the exported MP4 and compare UI regions to the real DOM. This catches
  // missing text, avatars, logo symbols, misplaced labels and lost dialog events.
  const decoded=await page.evaluate(async references=>{
    const video=document.createElement('video');video.muted=true;video.preload='auto';video.src=(document.querySelector('.video-download') as HTMLAnchorElement).href;
    await new Promise<void>((resolve,reject)=>{video.onloadeddata=()=>resolve();video.onerror=()=>reject(new Error('MP4 decode failed'));});
    const canvas=document.createElement('canvas');const ctx=canvas.getContext('2d')!;
    const results=[];
    for(const reference of references){
      await new Promise<void>(resolve=>{video.onseeked=()=>resolve();video.currentTime=reference.time+.05;});
      canvas.width=reference.width;canvas.height=reference.height;ctx.drawImage(video,0,0,canvas.width,canvas.height);
      const actual=ctx.getImageData(0,0,canvas.width,canvas.height).data,image=canvas.toDataURL();
      const expected=new Image();expected.src=`data:image/png;base64,${reference.image}`;await expected.decode();ctx.drawImage(expected,0,0);
      const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
      const errors=reference.boxes.map(box=>{
        let total=0,count=0;
        for(let y=Math.ceil(box.y);y<Math.floor(box.y+box.height);y+=2)for(let x=Math.ceil(box.x);x<Math.floor(box.x+box.width);x+=2){
          const i=(y*canvas.width+x)*4;for(let c=0;c<3;c++){total+=Math.abs(actual[i+c]-pixels[i+c]);count++;}
        }
        return total/count;
      });results.push({errors,image});
    }
    video.removeAttribute('src');video.load();return results;
  },[overview,details,after]);
  for(let i=0;i<decoded.length;i++){
    await writeFile(`${out}/offline-${['overview','details','after'][i]}-frame.png`,Buffer.from(decoded[i].image.split(',')[1],'base64'));
    await writeFile(`${out}/offline-${['overview','details','after'][i]}-reference.png`,Buffer.from([overview,details,after][i].image,'base64'));
  }
  await writeFile(`${out}/offline-ui-comparison.json`,JSON.stringify(decoded.map(d=>d.errors)));
  for(const frame of decoded)for(const error of frame.errors)expect(error).toBeLessThan(14);
  expect(errors).toEqual([]);
});

test('can cancel interface preparation, retain export preferences, and start again',async({page})=>{
  await page.setViewportSize({width:390,height:844});await openMap(page);
  await page.getByRole('button',{name:'Record video',exact:true}).click();
  await page.getByLabel('Video size',{exact:true}).selectOption('2160p');
  await page.getByLabel('Camera smoothing',{exact:true}).selectOption('cinematic');
  await page.getByRole('button',{name:'Start recording'}).click();await page.waitForTimeout(250);
  await page.keyboard.press('r');await expect(page.getByRole('dialog',{name:'Rendering your video'})).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.locator('.video-message')).toContainText('Export cancelled');
  expect((await inspect(page)).video.phase).toBe('idle');expect(await page.evaluate(()=>(window as any).worldTiles.controls.enabled)).toBe(true);
  await expect(page.getByLabel('Video size',{exact:true})).toHaveValue('2160p');
  await page.getByLabel('Include interface',{exact:true}).uncheck();
  await page.reload();await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:20_000});
  expect((await inspect(page)).video).toMatchObject({size:'2160p',smoothing:'cinematic',includeUI:false});
  await page.getByRole('button',{name:'Record video',exact:true}).click();
  await page.getByLabel('Include interface',{exact:true}).check();await page.getByLabel('Video size',{exact:true}).selectOption('window');
  await page.getByRole('button',{name:'Start recording'}).click();await page.waitForTimeout(250);
  const downloaded=page.waitForEvent('download');await page.keyboard.press('r');await downloaded;
  await expect(page.locator('.video-message')).toContainText('390 × 844 · 60 fps');
  expect(await page.evaluate(()=>(window as any).shareRequests)).toBe(0);
});

test('keeps mobile creator content clipped and scrollable in a 4K export',async({page})=>{
  test.setTimeout(180_000);await page.setViewportSize({width:390,height:520});await openMap(page);
  await page.getByRole('button',{name:'Record video',exact:true}).click();await page.getByLabel('Video size',{exact:true}).selectOption('2160p');
  await page.getByRole('button',{name:'Start recording'}).click();
  await page.getByRole('button',{name:'View details for Punk',exact:true}).click();
  const card=page.getByRole('dialog',{name:'Punk',exact:true});await expect(card).toBeVisible();
  await card.hover();await page.mouse.wheel(0,700);
  await expect.poll(()=>card.evaluate(el=>el.scrollTop)).toBeGreaterThan(50);
  await page.waitForTimeout(250);
  const time=(await inspect(page)).video.duration,reference=(await card.screenshot()).toString('base64');
  const box=(await card.boundingBox())!;await page.waitForTimeout(200);
  const downloaded=page.waitForEvent('download');await page.keyboard.press('r');await card.waitFor({state:'hidden'});
  const download=await downloaded;await mkdir(out,{recursive:true});await download.saveAs(`${out}/map-interface-4k.mp4`);
  await expect(page.locator('.video-message')).toContainText('3840 × 2160 · 60 fps');
  const decoded=await page.evaluate(async({time,reference,box})=>{
    const video=document.createElement('video');video.muted=true;video.src=(document.querySelector('.video-download') as HTMLAnchorElement).href;
    await new Promise<void>((resolve,reject)=>{video.onloadeddata=()=>resolve();video.onerror=()=>reject(Error('MP4 decode failed'));});
    await new Promise<void>(resolve=>{video.onseeked=()=>resolve();video.currentTime=time;});
    const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d')!;
    canvas.width=1920;canvas.height=1080;ctx.drawImage(video,0,0,1920,1080);const image=canvas.toDataURL();
    const scale=Math.min(video.videoWidth/390,video.videoHeight/520),w=box.width*scale,h=box.height*scale;
    canvas.width=Math.ceil(box.width);canvas.height=Math.ceil(box.height);
    ctx.drawImage(video,(video.videoWidth-w)/2,(video.videoHeight-h)/2,w,h,0,0,canvas.width,canvas.height);
    const actual=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    const expected=new Image();expected.src=`data:image/png;base64,${reference}`;await expected.decode();ctx.drawImage(expected,0,0);
    const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let total=0,count=0;
    // Ignore the glass shadow and native scrollbar at the edges.
    for(let y=24;y<canvas.height-24;y+=2)for(let x=24;x<canvas.width-24;x+=2){
      const i=(y*canvas.width+x)*4;for(let c=0;c<3;c++){total+=Math.abs(actual[i+c]-pixels[i+c]);count++;}
    }
    const width=video.videoWidth,height=video.videoHeight;video.removeAttribute('src');video.load();return {image,error:total/count,width,height};
  },{time,reference,box});
  await writeFile(`${out}/offline-mobile-4k-frame.png`,Buffer.from(decoded.image.split(',')[1],'base64'));
  await writeFile(`${out}/offline-mobile-dialog-reference.png`,Buffer.from(reference,'base64'));
  expect([decoded.width,decoded.height]).toEqual([3840,2160]);expect(decoded.error).toBeLessThan(14);
  expect((await inspect(page)).video.phase).toBe('idle');expect(await page.evaluate(()=>(window as any).shareRequests)).toBe(0);
});
