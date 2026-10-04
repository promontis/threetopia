import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three-world';
import {mergeGeometries,mergeVertices} from 'three-world/addons/utils/BufferGeometryUtils.js';
import {MeshoptSimplifier as simplify,MeshoptEncoder as encoder} from 'meshoptimizer';
import {writeLandmarkGLB} from './landmark-glb.mjs';
import {validateLandmarkMetrics} from '../../packages/world-map/tile-slot.js';
await Promise.all([simplify.ready,encoder.ready]);
const ids=process.argv.slice(2).length?process.argv.slice(2):['tidewater','sakura','punk'];
// Punk's current component comes from the pinned procedural-building kit.
// Keep this older batch entry point from restoring the retired source icon.
if(ids.includes('punk'))await import('./build-punk-city.mjs');
const hash=x=>createHash('sha256').update(x).digest('hex');
const decode=(s,Type=Float32Array)=>{const b=Buffer.from(s,'base64');return new Type(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
function geometry(record,lift=0){
  const g=new T.BufferGeometry();for(const [key,source,size]of [['position','positions',3],['normal','normals',3],['color','colors',3],['uv','uv',2]])if(record[source])g.setAttribute(key,new T.BufferAttribute(decode(record[source]),size));
  const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,Math.max(0,p.getY(i)+lift));g.setIndex(new T.BufferAttribute(decode(record.indices,Uint32Array),1));return mergeVertices(g,1e-5);
}
// A horizontal section of the original closed hull, below its gunwales. This
// small invisible cap stops the shared river from drawing inside the boat.
function hullSection(g,y){
  const p=g.attributes.position,idx=g.index.array,points=new Map();
  for(let i=0;i<idx.length;i+=3)for(let k=0;k<3;k++){
    const a=idx[i+k],b=idx[i+(k+1)%3],ay=p.getY(a),by=p.getY(b);
    if((ay<y)===(by<y))continue;
    const t=(y-ay)/(by-ay),point=[T.MathUtils.lerp(p.getX(a),p.getX(b),t),T.MathUtils.lerp(p.getZ(a),p.getZ(b),t)].map(v=>Math.round(v*1e6)/1e6);
    points.set(point.join(','),point);
  }
  const sorted=[...points.values()].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const half=points=>{const out=[];for(const p of points){while(out.length>=2&&cross(out.at(-2),out.at(-1),p)<=1e-8)out.pop();out.push(p);}return out.slice(0,-1);};
  const outline=[...half(sorted),...half([...sorted].reverse())];if(outline.length<3)throw Error('Missing closed boat hull section.');
  return {y,outline};
}
function area(g){const p=g.attributes.position,i=g.index.array,a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();let area=0;for(let j=0;j<i.length;j+=3){a.fromBufferAttribute(p,i[j]);b.fromBufferAttribute(p,i[j+1]);c.fromBufferAttribute(p,i[j+2]);area+=b.sub(a).cross(c.sub(a)).length()/2;}return area;}
function reduce(g,target,prune=true){
  g=g.clone();const p=g.attributes.position.array,n=g.attributes.normal.array,c=g.attributes.color.array,attributes=new Float32Array(p.length*2),indices=Uint32Array.from(g.index.array);
  for(let i=0;i<p.length/3;i++){attributes.set(n.subarray(i*3,i*3+3),i*6);attributes.set(c.subarray(i*3,i*3+3),i*6+3);}
  const [count]=simplify.simplifyWithUpdate(indices,p,3,attributes,6,[.1,.1,.1,.35,.35,.35],null,Math.min(indices.length,target*3),.35,prune?['Permissive','Prune']:['Permissive']);
  const normal=new T.Vector3();for(let i=0;i<p.length/3;i++){p[i*3+1]=Math.max(0,p[i*3+1]);normal.fromArray(attributes,i*6).normalize().toArray(n,i*3);for(let k=0;k<3;k++)c[i*3+k]=Math.max(0,Math.min(1,attributes[i*6+3+k]));}
  g.setIndex(new T.BufferAttribute(indices.slice(0,count),1));return g;
}
function foliage(g,target){
  const p=g.attributes.position.array,idx=g.index.array,parents=simplify.generatePositionRemap(p,3),find=i=>{while(parents[i]!==i){parents[i]=parents[parents[i]];i=parents[i];}return i;};
  for(let i=0;i<idx.length;i+=3)for(let k=1;k<3;k++)parents[find(idx[i+k])]=find(idx[i]);
  const components=new Map();for(let i=0;i<idx.length;i+=3){const key=find(idx[i]);if(!components.has(key))components.set(key,[]);components.get(key).push(idx[i],idx[i+1],idx[i+2]);}
  const shuffled=[...components.values()].map((face,i)=>({face,rank:((Math.sin(i*127.1+19.3)*43758.5453)%1+1)%1})).sort((a,b)=>a.rank-b.rank),kept=[];
  for(const {face} of shuffled)if(kept.length+face.length<=target*3)kept.push(...face);
  const grow=Math.min(3.4,Math.sqrt(idx.length/kept.length)),selected=new Set(kept),positions=Float32Array.from(p);
  for(const {face}of shuffled){if(!selected.has(face[0]))continue;const unique=[...new Set(face)],centre=new T.Vector3();for(const id of unique)centre.add(new T.Vector3().fromArray(p,id*3));centre.divideScalar(unique.length);for(const id of unique)new T.Vector3().fromArray(p,id*3).sub(centre).multiplyScalar(grow).add(centre).toArray(positions,id*3);}
  const out=g.clone();out.setAttribute('position',new T.BufferAttribute(positions,3));out.setIndex(kept);return out;
}
function clean(g,scale){
  g.scale(scale,scale,scale);const p=g.attributes.position;for(let i=0;i<p.array.length;i++)p.array[i]=Math.round(p.array[i]*1024)/1024;
  const indices=g.index.array,seen=new Set(),kept=[],a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();
  for(let j=0;j<indices.length;j+=3){const ids=[indices[j],indices[j+1],indices[j+2]];a.fromBufferAttribute(p,ids[0]);b.fromBufferAttribute(p,ids[1]);c.fromBufferAttribute(p,ids[2]);if(Math.max(a.y,b.y,c.y)===0||b.clone().sub(a).cross(c.clone().sub(a)).lengthSq()<1e-16)continue;const key=[a,b,c].map(v=>v.toArray().join(',')).sort().join(';');if(seen.has(key))continue;seen.add(key);kept.push(...ids);}
  const final=Uint32Array.from(kept),[remap,count]=encoder.reorderMesh(final,true,true);
  for(const [key,attribute]of Object.entries(g.attributes)){const values=new Float32Array(count*attribute.itemSize);for(let i=0;i<remap.length;i++)if(remap[i]!==0xffffffff)for(let k=0;k<attribute.itemSize;k++)values[remap[i]*attribute.itemSize+k]=attribute.array[i*attribute.itemSize+k];g.setAttribute(key,new T.BufferAttribute(values,attribute.itemSize));}g.setIndex(new T.BufferAttribute(final,1));return g;
}
for(const id of ids.filter(id=>id!=='punk')){
  const raw=await readFile(`.context/map-lite/${id}-source.json`),source=JSON.parse(raw);
  // Keep the asset's required nonnegative bounds without flattening/removing
  // the hull bottom. The host restores this authored waterline when mounting.
  let boatLift=0;
  if(id==='sakura')for(const m of source.meshes.filter(m=>m.role==='boat')){
    const p=decode(m.positions);for(let i=1;i<p.length;i+=3)boatLift=Math.max(boatLift,.002-p[i]);
  }
  const records=source.meshes.map(m=>({...m,g:geometry(m,m.role==='boat'?boatLift:0)}));
  const mask=boatLift?hullSection(records.find(r=>r.name==='hull').g,boatLift+.1):null;
  for(const r of records)r.weight=Math.sqrt(Math.max(1,area(r.g))*r.triangles);
  const roles=[...new Set(records.map(r=>r.role))],levels=[];
  for(const far of [false,true]){
    const total=source.triangleBudget?.[Number(far)]??(far?7600:22800),leafBudget=source.atlas512?(source.leafBudget?.[Number(far)]??(far?1900:7200)):0,lightBudget=roles.includes('lights')?(far?1100:3200):0;
    const meshes=[],parts=[];
    for(const role of roles){
      const selected=records.filter(r=>r.role===role),solidWeight=records.filter(r=>!['foliage','lights'].includes(r.role)).reduce((s,r)=>s+r.weight,0),weight=selected.reduce((s,r)=>s+r.weight,0);
      const budget=role==='foliage'?leafBudget:role==='lights'?lightBudget:Math.floor((total-leafBudget-lightBudget)*weight/solidWeight);
      // Spatial clustering keeps the skyline at overview distance. Pruning
      // disconnected material islands can otherwise delete whole buildings.
      if(id==='punk'&&far&&role==='structure'){
        const g=mergeGeometries(selected.map(r=>r.g)),[indices]=simplify.simplifySloppy(Uint32Array.from(g.index.array),g.attributes.position.array,3,null,budget*3,.05);
        g.setIndex(new T.BufferAttribute(indices,1));meshes.push({name:'Native punk structure',role,g});parts.push({name:'Original city / spatial overview',role,source:selected.reduce((n,r)=>n+r.triangles,0),triangles:indices.length/3});continue;
      }
      const geometries=selected.map(r=>{const target=Math.max(4,Math.floor(budget*r.weight/weight)),g=role==='foliage'?foliage(r.g,target):reduce(r.g,target,!(id==='punk'&&['Black Painted Plaster','Material.001','Material','Concrete','3232'].includes(r.material)));parts.push({name:r.name,role,source:r.triangles,triangles:g.index.count/3});return g;}).filter(g=>g.index.count);
      if(geometries.length)meshes.push({name:`Native ${id} ${role}`,role,g:mergeGeometries(geometries)});
    }
    levels.push({far,meshes,parts});
  }
  let radius=0,height=0;for(const level of levels)for(const {g}of level.meshes)for(const i of g.index.array){const p=g.attributes.position;radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));height=Math.max(height,p.getY(i));}
  const scale=Math.min(source.mapComposition?1:Infinity,7.15/radius,(id==='sakura'?9:14.7)/height),lods=[],assets=[];
  for(const level of levels){
    const materials=level.meshes.map(({role})=>({name:role,doubleSided:true,pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],metallicFactor:0,roughnessFactor:1,...(role==='foliage'?{baseColorTexture:{index:0}}:{})},...(role==='foliage'?{alphaMode:'MASK',alphaCutoff:.42}:{}),...(role==='lights'?{extensions:{KHR_materials_unlit:{}}}:{})}));
    for(const mesh of level.meshes){
      clean(mesh.g,scale);
      if(mesh.role==='boat'&&mask)mesh.extras={waterline:boatLift*scale,waterMask:{y:mask.y*scale,outline:mask.outline.map(p=>p.map(v=>v*scale))}};
    }
    const textureSize=source.atlas512?(level.far?256:512):0,atlas=textureSize?Buffer.from(source[`atlas${textureSize}`],'base64'):null;
    const bytes=writeLandmarkGLB(level.meshes,atlas,{materials,generator:`Threetopia / reduced native ${id}`}),triangles=level.meshes.reduce((n,m)=>n+m.g.index.count/3,0),lod=level.far?'overview':'tile',url=level.far?'overview.glb':'landmark.glb';
    const errors=validateLandmarkMetrics({triangles,drawCalls:level.meshes.length,bytes:bytes.length,radius:radius*scale,minY:0,maxY:height*scale,textures:Number(!!atlas),textureBytes:textureSize**2*4*4/3,forbiddenNodes:0},lod);
    if(errors.length)throw Error(`${id} ${lod} (${triangles} tri / ${bytes.length} bytes): ${errors.join(' ')}`);
    assets.push({url,bytes});lods.push({level:lod,url,triangles,drawCalls:level.meshes.length,bytes:bytes.length,textureSize,sha256:hash(bytes),parts:level.parts});
    console.log(`${id} ${lod}: ${triangles} triangles / ${(bytes.length/1024).toFixed(0)} KiB / ${level.meshes.length} draws`);
  }
  const output=`public/map/lite/${id}`;await mkdir(output,{recursive:true});
  for(const {url,bytes}of assets)await writeFile(`${output}/${url}`,bytes);
  if(source.ground){const s=source.ground;await writeFile(`${output}/surface.json`,JSON.stringify({version:1,kind:'sampled-tile-surface',source:{world:id,revision:source.revision,origin:source.root,scale},size:s.size,step:s.step*scale,x0:s.x0*scale,z0:s.z0*scale,heights:s.heights.map(h=>(h-source.root[1])*scale),waterLevel:(s.waterLevel-source.root[1])*scale,waveScale:scale,waves:['/map/lagoon-lite/water-wave-a.png','/map/lagoon-lite/water-wave-b.png']})+'\n');}
  await writeFile(`${output}/component.json`,JSON.stringify({version:1,kind:'map-landmark',id,title:source.title,source:{world:id,creator:source.creator,url:source.url,revision:source.revision,selection:source.selection,origin:source.root,scale,objects:source.meshes.map(m=>m.name),triangles:source.meshes.reduce((n,m)=>n+m.triangles,0)},adaptations:['Native geometry reduced and merged by material role',source.mapComposition?'Native landmark groups composed in map space':'All retained objects share one source origin and uniform scale','Native base colours sampled into vertex colours; source surface shaders omitted','Native leaf cards and cutout texture retained with reduced density where applicable','Hidden and subpixel details removed; duplicate and degenerate faces removed after quantization',...(source.adaptations??[])],anchor:'ground-centre',units:'map-metres',surface:source.ground?'surface.json':null,bounds:{radius:radius*scale,height:height*scale},lods,sourceHashes:{extraction:hash(raw),builder:hash(await readFile(new URL(import.meta.url))),extractor:hash(await readFile('src/tiles/lite/extract.js')),writer:hash(await readFile('scripts/atlas/landmark-glb.mjs'))}},null,2)+'\n');
}
