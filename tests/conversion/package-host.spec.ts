import {test,expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';

for(const context of [false,true])test(`package ${context?'contextual':'direct'} scene exposes its own loader before readiness`,async({page})=>{
  const code=`const b=document.createElement('button');b.textContent='Finish starting';b.onclick=()=>__threetopiaHost.ready({features:{visual:true}});document.body.append(b);__threetopiaHost.progress(.5,'Preparing component');`;
  const files:Record<string,string>={'scene.js':code,'scene.css':'button{margin:50px;padding:20px}','coverage.json':'{}'};
  const manifest={name:'@tests/complete',version:'0.1.0',title:'Complete fixture',kind:'asset',files:Object.entries(files).map(([path,data])=>({path,bytes:Buffer.byteLength(data),sha256:createHash('sha256').update(data).digest('hex')})),runtime:{format:'iframe-scene-v1',entry:'scene.js',style:'scene.css',coverage:'coverage.json',features:['visual'],assets:{},previewTargets:['ocean']}};
  const visible=context?{name:'@tests/ocean',kind:'asset',preview:{format:'scene-reference-v1',package:manifest.name,version:'0.1.0',focus:'ocean'}}:manifest;
  await page.route('**/api/package-host-fixture',r=>r.fulfill({json:{package:{id:'fixture',kind:'asset'},versions:[{version:'0.1.0',state:'published',manifest:visible}]}}));
  await page.route('**/api/resolve?*',r=>r.fulfill({json:{state:'published',package:{id:'fixture'},manifest}}));
  await page.route('**/api/packages/fixture/versions/0.1.0/files?*',r=>r.fulfill({body:files[new URL(r.request().url()).searchParams.get('path')!]}));
  await page.goto('/@fs'+resolve('tests/conversion/package-host.html'));
  const button=page.frameLocator('#package iframe').getByRole('button',{name:'Finish starting'});
  await expect(button).toBeVisible();
  await expect(page.locator('.package-preview-status')).toBeHidden();
  await expect(page.locator('#package')).toHaveAttribute('data-preview-state','loading');
  await button.click();
  await expect(page.locator('#package')).toHaveAttribute('data-preview-state','ready');
});
