/** Bake only source heights and small authored symbols. Never load playable assets in the atlas. */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import * as THREE from 'three';
import {makeTerrain,defineMap,insideTile,hexCenter} from '../../packages/world-map/index.js';
import type {MapRepresentation,Point} from '../../packages/world-map/index.js';
import {REGIONS} from '../../src/explore/config.ts';
import {WorldHeight,tileAt} from '../../src/explore/hex-world.ts';
import {sampleHeightfield} from '../../src/explore/heightfield.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const height=new WorldHeight(),captures=new Map();
for(const id of ['lagoon','sakura']){
  const manifest=read(`public/world-assets/${id}/scene.json`),buffers=manifest.buffers.map((f:string)=>gunzipSync(readFileSync(`public/world-assets/${id}/${f}`)));
  const unpack=(a:any)=>{const b=buffers[a.buffer],ctors={Uint16Array,Uint32Array,Float32Array},C=ctors[a.type as keyof typeof ctors],raw=new C(b.buffer,b.byteOffset+a.offset,a.length);return a.decode?Float32Array.from(raw,(n,i)=>n*a.decode.scale[i%a.decode.scale.length]+a.decode.min[i%a.decode.min.length]):raw;};
  height.fields.set(id,{...manifest.heightfield,data:unpack(manifest.heightfield)});captures.set(id,{manifest,unpack});
}
const tide=read('public/world-assets/tidewater/terrain.json'),bytes=gunzipSync(readFileSync('public/world-assets/tidewater/heights.bin.gz'));
const tidefield={data:new Float32Array(bytes.buffer,bytes.byteOffset,bytes.length/4),nx:tide.res,nz:tide.res,step:tide.texel,bounds:[tide.origin+.5,tide.origin+.5,1024,1024] as [number,number,number,number]};
height.tidewater={heightAt:(x:number,z:number)=>sampleHeightfield(tidefield,x,z)};height.buildTrails();
const rgb=(s:string)=>new THREE.Color(s).toArray();
const registry={version:1,tiles:REGIONS.map(r=>({id:r.id,title:r.title,short:r.short,creator:r.creator,q:r.tile.q,r:r.tile.r,edges:r.tile.edges,color:r.color,description:r.description,map:`/atlas/maps/${r.id}.json`}))};
mkdirSync('public/atlas/maps',{recursive:true});
for(const region of REGIONS){
  const c=hexCenter(region.tile.q,region.tile.r),local=(x:number,z:number):[number,number]=>[x+region.origin[0]-c.x,z+region.origin[2]-c.z];
  const ground=(x:number,z:number)=>height.base(x+c.x,z+c.z),colour=(x:number,y:number,z:number)=>{
    const neutral=rgb('#85966b'),land=rgb(region.id==='punk'?'#7a8492':region.id==='sakura'?'#819972':region.id==='tidewater'?'#6d9061':'#829956');
    const weights=height.weights(x+c.x,z+c.z),w=weights[REGIONS.indexOf(region)],mix=neutral.map((v,i)=>v*(1-w)+land[i]*w);
    const sand=rgb('#d1c09a'),v=Math.max(0,Math.min(1,(y-.15)/1.9)),shade=.94+.06*Math.sin(x*.038+z*.09);
    return mix.map((n,i)=>(n*v+sand[i]*(1-v))*shade);
  };
  const map:MapRepresentation={version:1,units:'metres',origin:'tile-centre',radius:400,palette:{land:region.color,sand:'#d1c09a'},terrain:makeTerrain(ground,colour,24),distant:makeTerrain(ground,colour,8),props:[],landmarks:[],paths:[]};
  const prop=(kind:any,x:number,z:number,scale:Point,color:string,rotation=0)=>{[x,z]=local(x,z);if(!insideTile(x,z,20)||ground(x,z)<.2)return;map.props.push({kind,position:[+x.toFixed(2),+ground(x,z).toFixed(2),+z.toFixed(2)],scale,color,rotation});};
  const mark=(id:string,label:string,kind:any,x:number,z:number)=>{[x,z]=local(x,z);map.landmarks.push({id,label,kind,position:[+x.toFixed(2),+Math.max(2,ground(x,z)).toFixed(2),+z.toFixed(2)]});};
  if(region.id==='lagoon'){
    const {manifest}=captures.get('lagoon');
    for(const m of manifest.meshes){const [x,y,z]=m.center;if(m.name.endsWith('-leaves'))prop('tree',x,z,[28,Math.max(28,y*2),28],'#587a46');if(m.name.endsWith(':thatch'))prop('house',x,z,[13,18,13],'#d8bd8a');}
    mark('tree-village','Tree village','village',-40,4);mark('arrival','Arrival beach','spawn',-57,27.5);mark('canopy','Canopy walk','nature',31,-12);
  } else if(region.id==='sakura'){
    const {manifest,unpack}=captures.get('sakura');
    for(const m of manifest.meshes){if(m.name==='foliage-sakura')prop('tree',m.center[0],m.center[2],[32,30,32],'#d893aa');
      if(m.name==='forest'&&m.instances){const matrix=unpack(m.instances.matrix);for(let i=0;i<m.instances.count;i+=9){const x=matrix[i*16+12],z=matrix[i*16+14];if(x>region.bounds[0]+10&&x<region.bounds[2]-10&&z>region.bounds[1]+10&&z<region.bounds[3]-10)prop('pine',x,z,[14,25,14],'#526f54');}}
    }
    prop('bridge',2,-10,[45,5,9],'#a8564d');prop('house',45,-195,[24,19,24],'#e3cda0');
    mark('red-bridge','Red bridge','bridge',2,-10);mark('river-temple','River temple','village',45,-195);mark('blossom-grove','Blossom grove','nature',10,-120);
  }else if(region.id==='tidewater'){
    // Building coordinates come directly from the pinned Village layout.
    const layout=readFileSync('packages/world-sources/tidewater/src/world/Village.js','utf8');
    for(const m of layout.matchAll(/name: '(?:[A-N]|S[123])', (?:harbor: true, )?x: ([\d. -]+), z: ([\d. -]+), yaw: ([\d. -]+), w: ([\d.]+), d: ([\d.]+)/g))prop('house',Number(m[1].replace(/ /g,'')),Number(m[2].replace(/ /g,'')),[+m[4]*1.8,12,+m[5]*1.8],['#e3cb99','#b1ced0','#d19b88'][map.props.length%3],Number(m[3].replace(/ /g,'')));
    for(let x=-180;x<190;x+=30)for(let z=-225;z<-95;z+=28){const j=Math.sin(x*7+z*2)*10;prop('tree',x+j,z-j,[18,22+Math.abs(j),18],'#567954');}
    const [x,z]=local(55,-12);map.props.push({kind:'bridge',position:[x,2.3,z],scale:[7,2,108],color:'#bb9b71'});
    mark('fishing-pier','Fishing pier','harbour',55,30);mark('fishing-village','Fishing village','village',40,-118);mark('reef','The reef','nature',-78,58);
  }else{
    const glb=readFileSync('public/world-assets/punk/models/cyberpunk_compressed.glb'),gltf=JSON.parse(glb.subarray(20,20+glb.readUInt32LE(12)).toString());
    const box=new THREE.Box3(),matrix=new THREE.Matrix4();
    for(const node of gltf.nodes){if(node.mesh===undefined)continue;box.makeEmpty();for(const primitive of gltf.meshes[node.mesh].primitives){const a=gltf.accessors[primitive.attributes.POSITION];if(a.min&&a.max)box.union(new THREE.Box3(new THREE.Vector3(...a.min).divideScalar(a.normalized?32767:1),new THREE.Vector3(...a.max).divideScalar(a.normalized?32767:1)));}
      matrix.compose(new THREE.Vector3(...(node.translation??[0,0,0])),new THREE.Quaternion(...(node.rotation??[0,0,0,1])),new THREE.Vector3(...(node.scale??[1,1,1])));box.applyMatrix4(matrix);const size=box.getSize(new THREE.Vector3()),p=box.getCenter(new THREE.Vector3());
      if(size.y>10&&size.x>4&&size.z>4&&size.x<100&&size.z<100&&size.y<160)prop('tower',p.x,p.z,[Math.min(75,size.x),Math.min(115,size.y),Math.min(75,size.z)],['#6e758e','#8792a3','#aa949d'][map.props.length%3]);
    }
    // Generalised skyline symbols within the actual merged city's footprint.
    // The source combines many buildings into material batches, so these are
    // deliberately authored landmarks rather than false per-building exports.
    for(let x=-225;x<140;x+=42)for(const z of [-65,-20,86]){
      const h=35+Math.abs(Math.sin(x*.71+z))*70;
      prop('tower',x,z,[22,Math.round(h),25],['#7d87a2','#9e99af','#9ca9ae'][map.props.length%3]);
    }
    mark('neon-streets','Neon streets','city',-138,34);mark('city-skyline','City skyline','city',-70,-65);
  }
  for(const trail of height.trails.values()){
    let points:Point[]=[];
    const flush=()=>{if(points.length>1)map.paths.push({color:'#dfc69b',width:3,points});points=[];};
    const point=(p:any):Point=>[+(p.x-c.x).toFixed(3),+p.y.toFixed(3),+(p.z-c.z).toFixed(3)];
    trail.route.forEach((p,i)=>{
      const inside=tileAt(p.x,p.z)?.region.id===region.id,previous=trail.route[i-1];
      if(previous){const wasInside=tileAt(previous.x,previous.z)?.region.id===region.id;if(wasInside!==inside){
        let lo=0,hi=1;for(let j=0;j<32;j++){const t=(lo+hi)/2,x=previous.x+(p.x-previous.x)*t,z=previous.z+(p.z-previous.z)*t;if((tileAt(x,z)?.region.id===region.id)===wasInside)lo=t;else hi=t;}
        const t=(lo+hi)/2,crossing={x:previous.x+(p.x-previous.x)*t,y:previous.y+(p.y-previous.y)*t,z:previous.z+(p.z-previous.z)*t};
        points.push(point(crossing));if(!inside)flush();
      }}
      if(inside&&(i%8===0||i===trail.route.length-1))points.push(point(p));
    });flush();
  }
  defineMap(map);writeFileSync(`public/atlas/maps/${region.id}.json`,JSON.stringify(map));
  const world={version:1,id:region.id,title:region.title,tile:{q:region.tile.q,r:region.tile.r},edges:region.tile.edges,map:`${region.id}.json`};writeFileSync(`public/atlas/maps/${region.id}.world.json`,JSON.stringify(world,null,2));
  console.log(`${region.id}: ${(JSON.stringify(map).length/1024).toFixed(1)} KiB, ${map.terrain.indices.length/3} terrain triangles, ${map.props.length} symbols`);
}
writeFileSync('public/atlas/registry.json',JSON.stringify(registry,null,2));
