import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.MAP_SOURCE_URL??'http://127.0.0.1:5190';
const ids=process.argv.slice(2).length?process.argv.slice(2):['tidewater','sakura','punk'];
await mkdir('.context/map-lite',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:false});
try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/scripts/atlas/landmarks.html');await page.waitForFunction(()=>window.extractMapLandmark);
  for(const id of ids){
    const source=await page.evaluate(id=>window.extractMapLandmark(id),id);if(errors.length)throw Error(errors.join('\n'));
    await writeFile(`.context/map-lite/${id}-source.json`,JSON.stringify(source));
    console.log(`${id}: ${source.meshes.length} meshes, ${source.meshes.reduce((n,m)=>n+m.triangles,0)} native triangles`);
  }
}finally{await browser.close();}
