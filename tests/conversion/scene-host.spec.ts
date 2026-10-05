import {test,expect} from '@playwright/test';
import {resolve} from 'node:path';

test('scene capsules isolate state, consume only verified assets and release independently',async({page})=>{
  await page.goto('/@fs'+resolve('tests/conversion/scene-host.html'));
  await page.waitForFunction(() => typeof (window as any).sceneHostMount === 'function');
  await page.evaluate(async()=>{
    const mountScene=(window as any).sceneHostMount;
    const code=`globalThis.count=0;const button=document.createElement('button');button.textContent='0';button.onclick=()=>button.textContent=String(++globalThis.count);document.body.append(button);globalThis.__threetopiaRuntime={dispose(){button.remove();}};fetch('https://threetopia.invalid/assets/sample.txt').then(r=>r.text()).then(value=>__threetopiaHost.ready({features:{visual:value==='verified'}}));`;
    const data:Record<string,string>={'scene.js':code,'scene.css':'button{font:24px sans-serif}','sample.txt':'verified','coverage.json':'{}'};
    const files=await Promise.all(Object.entries(data).map(async([path,value])=>{const bytes=new TextEncoder().encode(value);const hash=await crypto.subtle.digest('SHA-256',bytes);return {path,bytes:bytes.length,sha256:Array.from(new Uint8Array(hash),n=>n.toString(16).padStart(2,'0')).join('')};}));
    const manifest={name:'@test/scoped',title:'Scoped scene',files,runtime:{format:'iframe-scene-v1',entry:'scene.js',style:'scene.css',assets:{'sample.txt':'sample.txt'},features:['visual'],coverage:'coverage.json'}};
    const controls=[];
    for(const id of ['scope-a','scope-b']){const root=document.createElement('div');root.id=id;root.style.height='120px';document.body.append(root);controls.push(await mountScene(root,{manifest,loadFile:async(path:string)=>new TextEncoder().encode(data[path])}));}
    (window as any).sceneHostTest={controls,manifest,data,mountScene};
  });
  await page.frameLocator('#scope-a iframe').getByRole('button',{name:'0',exact:true}).click();
  await expect(page.frameLocator('#scope-a iframe').getByRole('button')).toHaveText('1');
  await expect(page.frameLocator('#scope-b iframe').getByRole('button')).toHaveText('0');
  await page.evaluate(()=>(window as any).sceneHostTest.controls[0]());
  await expect(page.locator('#scope-a iframe')).toHaveCount(0);
  await page.frameLocator('#scope-b iframe').getByRole('button').click();
  await expect(page.frameLocator('#scope-b iframe').getByRole('button')).toHaveText('1');
  const corrupted=await page.evaluate(async()=>{
    const {mountScene,manifest,data}= (window as any).sceneHostTest;
    try{await mountScene(document.createElement('div'),{manifest,loadFile:async(path:string)=>new TextEncoder().encode(path==='scene.js'?'tampered':data[path])});return 'unexpected success';}catch(error){return (error as Error).message;}
  });
  expect(corrupted).toContain('Scene integrity check failed');
  await page.evaluate(()=>(window as any).sceneHostTest.controls[1]());
  await expect(page.locator('#scope-b iframe')).toHaveCount(0);
});
