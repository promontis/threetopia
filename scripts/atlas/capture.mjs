import {chromium} from '@playwright/test';
import {mkdir,readFile,writeFile,readdir,mkdtemp,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {projectScene} from '../../packages/world-map/scene-camera.js';
const base=process.env.MAP_CAPTURE_URL??'http://127.0.0.1:55010';
const ids=['lagoon','sakura','tidewater','punk'];
await mkdir('.context/map-capture',{recursive:true});
const staging=await mkdtemp('.context/map-capture/run-'),output=staging+'/renders';
await mkdir(output);await mkdir(staging+'/tiles');
async function files(root){
  const list=[];
  for(const entry of await readdir(root,{withFileTypes:true})){
    const path=root+'/'+entry.name;
    if(entry.isDirectory())list.push(...await files(path));else list.push(path);
  }
  return list;
}
const inputs=[...(await files('src/explore')).filter(f=>/\.(ts|js)$/.test(f)),
  ...(await files('packages/world-sources/tidewater/src')),...(await files('packages/world-sources/punk/src')),
  ...(await files('public/world-assets')),'packages/world-map/scene-camera.js'].sort();
async function sourceRevision(){const hash=createHash('sha256');for(const f of inputs){hash.update(f);hash.update(await readFile(f));}return hash.digest('hex');}
const revision=await sourceRevision();
const browser=await chromium.launch({channel:'chrome',headless:false});
try{
  const page=await browser.newPage({viewport:{width:1536,height:1600},deviceScaleFactor:1});
  page.on('pageerror',e=>console.error('Capture error:',e.message));
  await page.goto(base+'/scripts/atlas/capture.html');
  await page.waitForFunction(()=>!!window.worldCapture,{timeout:180000});
  for(const id of ids){
    const layers=[];let placement;
    for(const pass of ['all','terrain','vegetation','waterfalls','lights']){
      if(pass==='waterfalls'&&!['lagoon','sakura'].includes(id)||pass==='lights'&&id!=='punk'||pass==='vegetation'&&id==='punk')continue;
      placement=await page.evaluate(([id,pass])=>window.worldCapture.render(id,pass),[id,pass]);
      const png=`.context/map-capture/${id}-${pass}.png`;
      await page.locator('canvas').screenshot({path:png,omitBackground:true,timeout:90000});
      const file=`${id}-${pass}.webp`;
      const pixels=Number(execFileSync('python3',['-c',`from PIL import Image\nimport sys\nim=Image.open(sys.argv[1]).convert('RGBA')\nprint(sum(1 for a in im.getchannel('A').getdata() if a>20))\nim.save(sys.argv[2], 'WEBP', quality=92, method=6)`,png,`${output}/${file}`],{encoding:'utf8'}).trim());
      if(['all','terrain'].includes(pass)&&pixels<1000)throw Error(`${id}: empty ${pass} capture; no output published.`);
      if(pass!=='all'&&pass!=='terrain'&&pixels>20)layers.push({id:pass,label:{vegetation:'Source trees & plants',waterfalls:'Source waterfalls',lights:'City billboards'}[pass],src:`/map/renders/${file}`,...pick(placement),...(pass==='vegetation'?{effect:{kind:'foliage',speed:.4,isolated:true}}:pass==='waterfalls'?{effect:{kind:'waterfall',speed:.6,isolated:true}}:{effect:{kind:'light',speed:.5,isolated:true}})});
      console.log(`${id} / ${pass}: ${pixels.toLocaleString()} visible pixels`);
    }
    const source=JSON.parse(await readFile(`public/atlas/scenes/${id}.json`,'utf8'));
    const map={version:2,kind:'image-tile',origin:'tile-centre',radius:400,capture:{kind:'world-render',revision,source:source.source,camera:placement.camera},terrain:{src:`/map/renders/${id}-terrain.webp`,preview:`/map/renders/${id}-all.webp`,...pick(placement)},components:layers,landmarks:source.landmarks.map(l=>{const p=projectScene(...l.position);return {id:l.id,label:l.label,position:[p.x,p.y]};})};
    await writeFile(`${staging}/tiles/${id}.json`,JSON.stringify(map,null,2)+'\n');
  }
  console.log('Captured the walking world.',await page.evaluate(()=>window.worldCapture.stats()));
  if(await sourceRevision()!==revision)throw Error('The source scene changed during capture. Rerun before publishing.');
  await writeFile(`${output}/manifest.json`,JSON.stringify({version:1,kind:'world-render',revision,inputs,tiles:ids,camera:{yaw:-20,elevation:45},terrainSpacing:2},null,2)+'\n');
  // Publish only after every pass succeeded against the same source revision.
  await mkdir('public/map/renders',{recursive:true});
  for(const file of await readdir(output))await copyFile(output+'/'+file,'public/map/renders/'+file);
  for(const id of ids)await copyFile(`${staging}/tiles/${id}.json`,`public/map/tiles/${id}.json`);
}finally{await browser.close();}
function pick(p){return {position:p.position,size:p.size,anchor:p.anchor};}
