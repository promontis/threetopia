import {chromium} from '@playwright/test';
import {mkdir,writeFile,readFile,mkdtemp,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const base=process.env.MAP_CAPTURE_URL??'http://127.0.0.1:55010';
await mkdir('.context/lagoon-compact',{recursive:true});
const staging=await mkdtemp('.context/lagoon-compact/capture-');
const inputs=['src/tiles/lagoon/layout.ts','src/tiles/lagoon/scene.js','src/tiles/lagoon/capture.js','src/explore/package-loader.ts','src/explore/materials.js','public/world-assets/lagoon/scene.json'];
async function revision(){const hash=createHash('sha256');for(const path of inputs){hash.update(path);hash.update(await readFile(path));}return hash.digest('hex');}
const sourceRevision=await revision();
const browser=await chromium.launch({channel:'chrome',headless:false});
try {
  const page=await browser.newPage({viewport:{width:1800,height:1800},deviceScaleFactor:1});
  page.on('pageerror',error=>console.error(error.message));
  await page.goto(base+'/scripts/atlas/lagoon.html');await page.waitForFunction(()=>!!window.lagoonCapture,{timeout:180000});
  const metadata=await page.evaluate(()=>window.lagoonCapture.metadata());let placement;
  for(const pass of ['all','terrain','vegetation','waterfall','connections']) {
    placement=await page.evaluate(pass=>window.lagoonCapture.render(pass),pass);
    const png=`${staging}/${pass}.png`,webp=`${staging}/${pass}.webp`;
    await page.locator('canvas').screenshot({path:png,omitBackground:true,timeout:90000});
    const pixels=Number(execFileSync('python3',['-c',"from PIL import Image\nimport sys\nim=Image.open(sys.argv[1]).convert('RGBA')\nprint(sum(1 for a in im.getchannel('A').getdata() if a>20))\nim.save(sys.argv[2],'WEBP',quality=94,method=6)",png,webp],{encoding:'utf8'}).trim());
    if(pixels<100)throw Error(`Empty ${pass} capture`);console.log(`${pass}: ${pixels} visible pixels`);
  }
  if(sourceRevision!==await revision())throw Error('Source changed during capture; no preview published.');
  const src=name=>`/map/lagoon/renders/${name}.webp`;
  const data={version:1,kind:'compact-tile-proposal',...metadata,capture:{revision:sourceRevision,inputs},terrain:{src:src('terrain'),...placement},components:[{id:'vegetation',src:src('vegetation'),...placement,effect:{kind:'foliage',isolated:true,speed:.4}},{id:'waterfall',src:src('waterfall'),...placement,effect:{kind:'waterfall',isolated:true,speed:.6}}],neighbours:{src:src('connections'),...placement}};
  await mkdir('public/map/lagoon/renders',{recursive:true});
  for(const pass of ['all','terrain','vegetation','waterfall','connections'])await copyFile(`${staging}/${pass}.webp`,`public/map/lagoon/renders/${pass}.webp`);
  await writeFile('public/map/lagoon/tile.json',JSON.stringify(data,null,2)+'\n');
  console.log('Compact Lagoon captured at radius',data.radius);
} finally {await browser.close();}
