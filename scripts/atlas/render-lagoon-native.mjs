import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from '@playwright/test';

const root=fileURLToPath(new URL('../../',import.meta.url));
const original=resolve(root,'packages/world-sources/lagoon/original');
const out=resolve(root,'.context/lagoon-native');
const live=process.argv.includes('--live');
const bake=process.argv.includes('--bake');
const icon=process.argv.includes('--extract-icon');
await mkdir(out,{recursive:true});
const server=createServer(async(req,res)=>{
  try {
    const requestURL=new URL(req.url,'http://localhost');
    const path=requestURL.pathname;
    if(path==='/favicon.ico'){res.writeHead(204).end();return;}
    if(live&&path==='/'&&!requestURL.searchParams.has('capture')) {
      for(const [key,value] of Object.entries({capture:'',q:'ultra',view:'aerial',freeze:'10',palmsforce:'0'}))if(!requestURL.searchParams.has(key))requestURL.searchParams.set(key,value);
      res.writeHead(302,{location:'/'+requestURL.search}).end();return;
    }
    const helpers={'/__native-view.js':'lagoon-native-view.js','/__native-live.js':'lagoon-native-live.js','/__native-bake.js':'lagoon-native-bake.js','/__native-landmark.js':'lagoon-native-landmark.js'};
    const helper=Object.hasOwn(helpers,path)?helpers[path]:null;
    const file=helper ? resolve(root,'scripts/atlas',helper) : resolve(original,'.'+(path==='/'?'/index.html':path));
    if(!helper&&!file.startsWith(original+'/')) {res.writeHead(403).end();return;}
    let body=await readFile(file);
    if(live&&(path==='/'||path==='/index.html')) {
      body=body.toString().replace('</head>','<style>body > :not(#app):not([data-lagoon-review-ui]){display:none!important}</style></head>')
        .replace('</body>','<script type="module" src="/__native-live.js"></script></body>');
    }
    res.writeHead(200,{'content-type':{'.html':'text/html','.js':'text/javascript','.css':'text/css'}[extname(file)]??'application/octet-stream','cache-control':'no-store'}).end(body);
  }catch{res.writeHead(404).end();}
});
await new Promise((done,reject)=>{server.once('error',reject);server.listen(live?Number(process.env.LAGOON_REVIEW_PORT??55012):0,'127.0.0.1',done);});
const url=`http://127.0.0.1:${server.address().port}/?capture&q=ultra&view=aerial&freeze=10&palmsforce=0`;
console.log(live?`Live Lagoon: http://127.0.0.1:${server.address().port}/`:url);
if(live) {
  console.log('Drag to rotate, scroll to zoom. Ctrl+C stops the local preview.');
}else if(process.argv.includes('--serve')) {
  console.log('Read-only native source server. Run prepareLagoonReview() from /__native-view.js after __lagoon.ready.');
}else{
  const browser=await chromium.launch({channel:'chrome',headless:false});
  try {
    const page=await browser.newPage({viewport:{width:bake?2400:2000,height:bake?1800:1500},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
    await page.route('https://fonts.googleapis.com/**',route=>route.fulfill({status:200,contentType:'text/css',body:''}));
    await page.goto(url);
    await page.waitForFunction(()=>window.__lagoon?.ready,undefined,{timeout:240000});
    if(icon) {
      const data=await page.evaluate(async()=>{
        const {extractVillageSource}=await import('/__native-landmark.js');return extractVillageSource();
      });
      if(errors.length||data.errors.length)throw Error(JSON.stringify({errors,sourceErrors:data.errors}));
      const directory=resolve(root,'.context/lagoon-lite');await mkdir(directory,{recursive:true});
      await writeFile(resolve(directory,'source-village.json'),JSON.stringify(data));
      console.log(`Extracted original village: ${data.trees.length} trees, ${data.bridges.length} bridges, ${data.counts.structure} structure triangles, ${data.counts.leaves} leaf triangles, ${data.meshes.length} meshes.`);
    } else if(process.argv.includes('--extract-clusters')) {
      const data=await page.evaluate(async()=>{
        const q=window.__lagoon;q.engine.stop();
        const T=(await import('/assets/three.module-CA589J5f.js')).i;
        const tree=q.registry.get('trees').trees.find(t=>t.id==='canopy');
        const mesh=tree.meshes.bark.children[1],g=mesh.geometry;
        const leaves=tree.meshes.leaves,clumps=leaves.geometry.attributes.aClump;
        const matrix=new T.Matrix4(),v=new T.Vector3(),groups=new Map();
        leaves.updateMatrixWorld(true);
        for(let i=0;i<leaves.userData.total;i++) {
          const center=[clumps.getX(i),clumps.getY(i),clumps.getZ(i)];
          const key=center.map(n=>n.toFixed(3)).join(',');
          let c=groups.get(key);if(!c){c={center,n:0,radius:0};groups.set(key,c);}
          leaves.getMatrixAt(i,matrix);v.setFromMatrixPosition(matrix);
          c.radius=Math.max(c.radius,v.distanceTo(new T.Vector3(...center)));c.n++;
        }
        return {version:1,source:'Lagoon / The Canopy',revision:'index-BjH0GYGf',
          sourceObjects:['tree-canopy-bark-far','tree-canopy-leaves','arch:canopy'],
          root:[tree.x,tree.groundY,tree.z],
          bark:{positions:Array.from(g.attributes.position.array),indices:Array.from(g.index.array),colors:Array.from(g.attributes.color.array)},
          clumps:[...groups.values()],sourceLeafCards:leaves.userData.total,
          errors:q.errors};
      });
      if(errors.length||data.errors.length)throw Error(JSON.stringify({errors,sourceErrors:data.errors}));
      const directory=resolve(root,'.context/lagoon-lite');await mkdir(directory,{recursive:true});
      await writeFile(resolve(directory,'source.json'),JSON.stringify(data));
      console.log(`Extracted Canopy: ${data.bark.indices.length/3} bark triangles, ${data.clumps.length} leaf clusters.`);
    } else {
    console.log('Native scene ready; preparing compact coast.');
    const report=await page.evaluate(async()=>{
      const {prepareLagoonReview}=await import('/__native-view.js');
      return prepareLagoonReview();
    });
    if(errors.length||report.errors.length)throw Error(JSON.stringify({errors,sourceErrors:report.errors}));
    if(report.untouchedTreeRoots.some(t=>Math.abs(t.heightChange)>.01))throw Error('Coast changes a hero tree foundation');
    if(bake) {
      const frames=resolve(root,'.context/lagoon-bake');
      await mkdir(frames,{recursive:true});
      const manifest=await page.evaluate(async()=>{
        const {prepareBake}=await import('/__native-bake.js');
        return prepareBake();
      });
      await page.locator('#app canvas').screenshot({path:resolve(frames,'beauty.png'),timeout:90000});
      for(const id of ['island',...manifest.components.map(c=>c.id)]) {
        console.log(`Baking matte: ${id}`);
        await page.evaluate(id=>window.lagoonBake.mask(id),id);
        await page.locator('#app canvas').screenshot({path:resolve(frames,`${id}.png`),timeout:90000});
      }
      if(errors.length)throw Error(JSON.stringify(errors));
      await writeFile(resolve(frames,'capture.json'),JSON.stringify({...manifest,native:report,errors},null,2)+'\n');
      console.log(`Baked native layers into ${frames}`);
    } else await page.locator('#app canvas').screenshot({path:resolve(out,'lagoon.png'),timeout:90000});
    await writeFile(resolve(out,'report.json'),JSON.stringify({...report,url,errors},null,2)+'\n');
    if(!bake)console.log(`Saved ${out}/lagoon.png`);
    }
  }finally{await browser.close();server.close();}
}
