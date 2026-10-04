import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import * as T from 'three';
import {MeshBVH} from 'three-mesh-bvh';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {mergeGeometries,mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
import {MeshoptDecoder,MeshoptSimplifier,MeshoptEncoder} from 'meshoptimizer';
import {writeLandmarkGLB} from './landmark-glb.mjs';
import {validateLandmarkMetrics} from '../../packages/world-map/tile-slot.js';
import {createPunkRoad,PUNK_ROAD_WIDTH,PUNK_ROAD_Y,PUNK_CAR_SCALE} from '../../src/tiles/lite/punk-route.ts';

// Only compact derivatives ship to the map. These pinned inputs are the
// actual building/sign kit and rigged Quadra from Threejs-Punk Drive.
const source='packages/world-sources/punk/map-assets',output='public/map/lite/punk';
const sha=data=>createHash('sha256').update(data).digest('hex');
const kitBytes=await readFile(`${source}/kit.glb`),metaBytes=await readFile(`${source}/kit.json`),meta=JSON.parse(metaBytes);
const carBytes=await readFile(`${source}/quadra_rig.glb`),car=JSON.parse(await readFile('.context/map-lite/punk-car-source.json'));
await Promise.all([MeshoptDecoder.ready,MeshoptSimplifier.ready,MeshoptEncoder.ready]);
if(sha(kitBytes)!=='f38336e874dd7f301dee458cf7039058e6ccc64fdd1776233b9205c472fe18f9'||sha(carBytes)!=='6025577fe9f82c7de7c5fca916ab2db264b2d2fd976c2e444114c48134fdef22')throw Error('Punk source assets changed; review the new models before rebuilding.');
const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const kit=await loader.parseAsync(kitBytes.buffer.slice(kitBytes.byteOffset,kitBytes.byteOffset+kitBytes.byteLength),'');
kit.scene.updateMatrixWorld(true);
await mkdir(output,{recursive:true});
execFileSync('python3',['scripts/atlas/resize-fenestra-atlases.py'],{stdio:'inherit'});

await copyFile('node_modules/three-fenestra/LICENSE',`${output}/FENESTRA-LICENSE.txt`);
const textureAssets=[];
for(const [name,size] of [['rooms',512],['overlay',256]]){
  const data=await readFile(`${output}/${name}.webp`);textureAssets.push({url:`${name}.webp`,size,bytes:data.length,sha256:sha(data)});
}
const extraBytes=textureAssets.reduce((n,a)=>n+a.bytes,0),textureBytes=(512**2+256**2)*4*4/3;
const buildings=[
  {id:'west-tower',node:'bld_12',x:-2.65,z:-3.2,scale:.22,yaw:0},
  {id:'central-spire',node:'twr_02',x:0,z:-3.9,scale:.074,yaw:0},
  {id:'east-tower',node:'bld_00',x:2.6,z:-3.2,scale:.22,yaw:0},
  {id:'west-market',node:'bld_17',x:-2.6,z:.25,scale:.20,yaw:0},
  {id:'east-arcade',node:'bld_01',x:2.4,z:.4,scale:.18,yaw:0},
];
const signs=[
  {node:'sign_01',x:-3.63,y:2.55,z:1.20,scale:.22,yaw:Math.PI/2},
  {node:'sign_22',x:-1.67,y:1.15,z:1.3,scale:.27,yaw:Math.PI/2},
  {node:'sign_09',x:-2.55,y:.73,z:1.30,scale:.34,yaw:0},
  {node:'sign_19',x:3.39,y:2.20,z:1.16,scale:.33,yaw:Math.PI/2},
  {node:'sign_17',x:2.44,y:1.05,z:1.2,scale:.43,yaw:0},
  {node:'sign_20',x:1.45,y:3.10,z:-2.20,scale:.32,yaw:Math.PI/2},
  {node:'sign_12',x:2.70,y:2.07,z:-2.21,scale:.38,yaw:0},
  {node:'sign_00',x:-3.63,y:4.05,z:-2.16,scale:.34,yaw:Math.PI/2},
  {node:'sign_14',x:-2.52,y:1.4,z:-2.14,scale:.30,yaw:0},
];
const decode=(s,Type=Float32Array)=>{const b=Buffer.from(s,'base64');return new Type(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
const constant=(g,name,values)=>{const a=new Float32Array(g.attributes.position.count*3);for(let i=0;i<a.length;i+=3)a.set(values,i);g.setAttribute(name,new T.BufferAttribute(a,3));return g;};
function geometry(p,n,c,surface,emission){
  const g=new T.BufferGeometry();
  for(const [name,values] of [['position',p],['normal',n],['color',c],['surface',surface],['emission',emission]])g.setAttribute(name,new T.Float32BufferAttribute(values,3));
  return mergeVertices(g,1e-5);
}
// Remove only enclosed plaster before simplification. Sample both sides and
// several points/directions: a centre-only visibility test opens holes in roofs.
// Glass and emissive panels never serve as occluders and are never removed.
function exteriorParts(parts){
  const merged=mergeGeometries(parts.filter(r=>r.role==='structure'&&r.g.attributes.surface.getX(0)<.5).map(r=>r.g)),bvh=new MeshBVH(merged),a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3(),n=new T.Vector3(),p=new T.Vector3(),ray=new T.Ray();
  const offsets=[new T.Vector3(),new T.Vector3(.6,.6,.6),new T.Vector3(-.6,.6,-.6),new T.Vector3(.6,-.6,-.6),new T.Vector3(-.6,-.6,.6)];
  for(const part of parts){if(part.role!=='structure'||part.g.attributes.surface.getX(0)>.5)continue;
    const g=part.g,ix=g.index.array,kept=[];
    for(let i=0;i<ix.length;i+=3){
      a.fromBufferAttribute(g.attributes.position,ix[i]);b.fromBufferAttribute(g.attributes.position,ix[i+1]);c.fromBufferAttribute(g.attributes.position,ix[i+2]);p.copy(a).add(b).add(c).multiplyScalar(1/3);n.copy(b).sub(a).cross(c.clone().sub(a)).normalize();
      ray.origin.copy(p).addScaledVector(n,.0015);
      const samples=[p,a.clone().lerp(p,.1),b.clone().lerp(p,.1),c.clone().lerp(p,.1)];const visible=samples.some(at=>[1,-1].some(sign=>{ray.origin.copy(at).addScaledVector(n,.0015*sign);return offsets.some(offset=>{ray.direction.copy(n).multiplyScalar(sign).add(offset).normalize();return !bvh.raycastFirst(ray,T.DoubleSide,.0001,100);});}));
      if(visible)kept.push(ix[i],ix[i+1],ix[i+2]);
    }
    g.setIndex(kept);
  }
  merged.dispose();return parts.filter(p=>p.g.index.count>0);
}

function nativeParts(spec,far){
  const item=[...meta.buildings,...meta.towers,...meta.signs].find(b=>b.name===spec.node);
  const mesh=kit.scene.getObjectByName(item.lods[spec.node.startsWith('sign_')?(far?2:1):0].node),g=mesh.geometry,p=g.attributes.position,n=g.attributes.normal,mat=g.attributes._matid;
  const transform=new T.Matrix4().compose(new T.Vector3(spec.x,spec.y??.065,spec.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),spec.yaw),new T.Vector3().setScalar(spec.scale)).multiply(mesh.matrixWorld);
  const normalMatrix=new T.Matrix3().getNormalMatrix(transform),point=new T.Vector3(),normal=new T.Vector3(),buckets=new Map();
  for(let i=0;i<g.index.count;i+=3){
    const ids=[0,1,2].map(k=>g.index.getX(i+k)),pal=meta.palette[Math.round(mat.getX(ids[0]))];
    // Fenestra supplies the hidden rooms behind the original glass panes.
    if(pal.name.startsWith('room'))continue;
    // The kit's white "light" faces on buildings are lit windows, not neon
    // signs. Give them the same stable room shader as the original glass.
    const window=pal.kind===4?2:['window','old window','light'].includes(pal.name)&&!spec.node.startsWith('sign_')?1:0;
    const role=window?'structure':(pal.kind>=2&&pal.kind!==4)||pal.name==='light'?'lights':'structure';
    const key=pal.name;let b=buckets.get(key);if(!b){b={p:[],n:[],c:[],s:[],e:[],role};buckets.set(key,b);}
    // Native black plaster is texture-backed. Bake its dark graphite mean;
    // retain the source palette for metal, glass, neon tubes and sign housings.
    const color=role==='lights'?pal.emissive.map(v=>Math.min(1,v)):pal.texture?[.013,.017,.023]:pal.color.map(v=>Math.min(.24,Math.max(.007,v)));
    for(const id of ids){
      normal.fromBufferAttribute(n,id).applyNormalMatrix(normalMatrix);
      point.fromBufferAttribute(p,id).applyMatrix4(transform);
      // Decimated plaster may bridge a coplanar opening. Separate the pane
      // by three export quantization steps so it cannot fight that wall.
      if(window||pal.kind===3)point.addScaledVector(normal,3/1024);
      point.y=Math.max(.006,point.y);point.toArray(b.p,b.p.length);
      normal.toArray(b.n,b.n.length);
      b.c.push(...color);b.s.push(pal.kind===3?3:window,window?.22:Math.max(.4,pal.roughness*.83),window?.32:Math.min(.6,pal.metalness));b.e.push(0,0,0);
    }
  }
  const parts=[...buckets].map(([name,b])=>({name:`${spec.node} / ${name}`,role:b.role,g:geometry(b.p,b.n,b.c,b.s,b.e)}));
  if(spec.node.startsWith('bld_'))exteriorParts(parts);
  const windows=parts.filter(p=>p.g.attributes.surface.getX(0)>.5);
  if(windows.length){
    // Window reveals form closed tunnels, not topological borders. Pin the
    // surrounding plaster too, or simplification can seal an intact pane.
    const boundary=new MeshBVH(mergeGeometries(windows.map(w=>w.g)));
    for(const part of parts)if(part.role==='structure'||part.g.attributes.surface.getX(0)===3)part.boundary=boundary;
  }
  return parts;
}
function solid(g,color,surface=[0,.7,.2],role='structure'){
  g.deleteAttribute('uv');constant(g,'color',new T.Color(color).toArray());constant(g,'surface',surface);constant(g,'emission',[0,0,0]);return {name:'Street and pavement',role,g};
}
function street(){
  const records=[],curve=createPunkRoad(),a=new T.Vector3(),b=new T.Vector3(),positions=[],normals=[],indices=[];
  // The same curve is the rendered road and the car's centreline.
  for(let i=0;i<=256;i++){
    curve.getPointAt(i/256,a);curve.getTangentAt(i/256,b);
    for(const side of [-1,1]){positions.push(a.x+b.z*side*PUNK_ROAD_WIDTH/2,PUNK_ROAD_Y,a.z-b.x*side*PUNK_ROAD_WIDTH/2);normals.push(0,1,0);}
    if(i<256){const j=i*2;indices.push(j,j+2,j+1,j+1,j+2,j+3);}
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.setIndex(indices);records.push(solid(g,'#111820',[0,.27,.35]));
  const box=(w,h,d,x,y,z,color,role='structure')=>records.push(solid(new T.BoxGeometry(w,h,d).translate(x,y,z),color,[0,.65,.2],role));
  box(.98,.035,6.55,0,.047,-.7,'#111820');box(8.3,.033,.80,0,.048,-1.25,'#111820');
  for(let i=0;i<40;i++){
    curve.getPointAt(i/40,a);curve.getTangentAt(i/40,b);
    records.push(solid(new T.BoxGeometry(.035,.008,.24).rotateY(Math.atan2(b.x,b.z)).translate(a.x,.071,a.z),'#968561'));
  }
  for(const x of [-.45,.45])for(let z=-4.5;z<2.2;z+=.85)box(.023,.009,.45,x,.071,z,'#849093');
  for(const z of [-2.15,1.60])for(let x=-.34;x<.4;x+=.15)box(.078,.01,.32,x,.074,z,'#acb2ad');
  for(const b of buildings){const m=[...meta.buildings,...meta.towers].find(n=>n.name===b.node);box(m.width*b.scale+.15,.035,m.depth*b.scale+.15,b.x,.03,b.z,'#323b42');}
  // The western teleport bay retains an open approach outside the road.
  for(const x of [-5.35,5.35])for(const z of [-2.1,-.3]){box(.055,.65,.055,x,.33,z,'#323e48');box(.22,.04,.09,x,.66,z,'#4faeac','lights');}
  return records;
}
function carParts(){
  const records=car.meshes.map(r=>{
    const g=new T.BufferGeometry();for(const [name,key] of [['position','positions'],['normal','normals'],['color','colors'],['emission','emissions']])g.setAttribute(name,new T.BufferAttribute(decode(r[key]),3));
    g.setIndex(new T.BufferAttribute(decode(r.indices,Uint32Array),1));g.scale(PUNK_CAR_SCALE,PUNK_CAR_SCALE,PUNK_CAR_SCALE);
    constant(g,'surface',[0,.36,.45]);constant(g,'wheel',r.wheel?r.wheel.position.map(v=>v*PUNK_CAR_SCALE):[0,0,0]);
    constant(g,'drive',r.wheel?[r.wheel.radius*PUNK_CAR_SCALE,Number(r.wheel.front),0]:[0,0,0]);
    constant(g,'effect',[0,0,0]);
    return {name:`Quadra / ${r.name}`,role:'car',g:mergeVertices(g,1e-5)};
  });
  // A pair of tiny exhaust flames shares the car draw. The host collapses
  // them at the nozzles when boost is off; no transparent particles or lights.
  for(const side of [-.17,.17])for(const inner of [false,true]){
    const length=inner?.28:.52,g=new T.ConeGeometry(inner?.031:.055,length,6).rotateX(-Math.PI/2).translate(side,.13,-.535-length/2);
    g.deleteAttribute('uv');constant(g,'color',[.03,.08,.12]);constant(g,'surface',[0,.4,0]);
    constant(g,'emission',inner?[1,.82,.38]:[.03,.35,1]);constant(g,'wheel',[0,0,0]);constant(g,'drive',[0,0,0]);constant(g,'effect',[1,side,0]);
    records.push({name:'Quadra boost exhaust',role:'car',g});
  }
  return records;
}
/** Lock window outlines while allowing redundant collinear border vertices
 * to collapse. Locking every facade edge would exceed the overview budget. */
function windowCorners(positions,indices){
  const edges=new Map(),neighbours=Array.from({length:positions.length/3},()=>[]),locks=new Uint8Array(positions.length/3);
  for(let i=0;i<indices.length;i+=3)for(let k=0;k<3;k++){
    const a=indices[i+k],b=indices[i+(k+1)%3],key=a<b?`${a},${b}`:`${b},${a}`,edge=edges.get(key);
    if(edge)edge.count++;else edges.set(key,{a,b,count:1});
  }
  for(const {a,b,count} of edges.values())if(count===1){neighbours[a].push(b);neighbours[b].push(a);}
  const centre=new T.Vector3(),a=new T.Vector3(),b=new T.Vector3();
  for(let i=0;i<neighbours.length;i++){
    const adjacent=neighbours[i];if(!adjacent.length)continue;
    if(adjacent.length!==2){locks[i]=1;continue;}
    centre.fromArray(positions,i*3);
    a.fromArray(positions,adjacent[0]*3).sub(centre).normalize();
    b.fromArray(positions,adjacent[1]*3).sub(centre).normalize();
    if(a.dot(b)>-.999)locks[i]=1;
  }
  return locks;
}
function reduce(g,target,preserveFacade=false,error=.08,boundary,far=false){
  if(g.attributes.surface.getX(0)===3||g.index.count/3<=target)return g.clone();
  g=g.clone();
  // Architecture must retain its authored planes and corners. Updating vertex
  // positions folds repeated floors into diagonal spikes at map-scale budgets.
  if(preserveFacade){
    g.deleteAttribute('normal');g=mergeVertices(g,1e-5);
    const p=g.attributes.position.array,ix=Uint32Array.from(g.index.array);
    const flags=g.attributes.surface.getX(0)>.5?['Permissive','ErrorAbsolute']:['Permissive','Prune','ErrorAbsolute'];
    const locks=windowCorners(p,ix),point=new T.Vector3();
    if(boundary)for(let i=0;i<locks.length;i++){
      point.fromArray(p,i*3);
      if(boundary.closestPointToPoint(point,{},0,.022))locks[i]=1;
    }
    const [indices]=boundary
      ?MeshoptSimplifier.simplifyWithAttributes(ix,p,3,p,3,[0,0,0],locks,target*3,error,flags)
      :MeshoptSimplifier.simplify(ix,p,3,target*3,error,flags);
    g.setIndex(new T.BufferAttribute(indices,1));
    // Source bevel normals no longer describe the reduced flat wall faces.
    // Rebuild hard normals so a planar facade cannot shade like crumpled foil.
    const flat=g.toNonIndexed();flat.computeVertexNormals();return mergeVertices(flat,1e-5);
  }
  const p=g.attributes.position.array,n=g.attributes.normal.array,c=g.attributes.color.array,e=g.attributes.emission.array,attrs=new Float32Array(p.length*3),ix=Uint32Array.from(g.index.array);
  for(let i=0;i<p.length/3;i++){attrs.set(n.subarray(i*3,i*3+3),i*9);attrs.set(c.subarray(i*3,i*3+3),i*9+3);attrs.set(e.subarray(i*3,i*3+3),i*9+6);}
  const [count]=MeshoptSimplifier.simplifyWithUpdate(ix,p,3,attrs,9,[.2,.2,.2,.55,.55,.55,1,1,1],null,target*3,far?.6:.12,['Permissive','Prune']);
  const normal=new T.Vector3();for(let i=0;i<p.length/3;i++){normal.fromArray(attrs,i*9).normalize().toArray(n,i*3);for(let k=0;k<3;k++){c[i*3+k]=Math.max(0,Math.min(1,attrs[i*9+3+k]));e[i*3+k]=Math.max(0,Math.min(1,attrs[i*9+6+k]));}}
  g.setIndex(new T.BufferAttribute(ix.slice(0,count),1));return g;
}
function clean(g){
  const p=g.attributes.position,ix=g.index.array,seen=new Set(),kept=[],a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();
  for(let i=0;i<p.array.length;i++)p.array[i]=Math.round((i%3===1?Math.max(0,p.array[i]):p.array[i])*1024)/1024;
  for(let i=0;i<ix.length;i+=3){const ids=[ix[i],ix[i+1],ix[i+2]];a.fromBufferAttribute(p,ids[0]);b.fromBufferAttribute(p,ids[1]);c.fromBufferAttribute(p,ids[2]);const key=[a,b,c].map(v=>v.toArray().join(',')).sort().join(';');if(seen.has(key)||Math.max(a.y,b.y,c.y)<=0||b.clone().sub(a).cross(c.clone().sub(a)).lengthSq()<1e-16)continue;seen.add(key);kept.push(...ids);}
  const indices=Uint32Array.from(kept),[remap,count]=MeshoptEncoder.reorderMesh(indices,true,true);
  for(const [name,attr] of Object.entries(g.attributes)){const values=new Float32Array(count*attr.itemSize);for(let i=0;i<remap.length;i++)if(remap[i]!==0xffffffff)for(let k=0;k<attr.itemSize;k++)values[remap[i]*attr.itemSize+k]=attr.array[i*attr.itemSize+k];g.setAttribute(name,new T.BufferAttribute(values,attr.itemSize));}
  g.setIndex(new T.BufferAttribute(indices,1));return g;
}
const carRecords=carParts(),lods=[],bounds=new T.Box3();let radius=0;
for(const far of [false,true]){
  const records=[...buildings.flatMap(b=>nativeParts(b,far)),...signs.flatMap(s=>nativeParts(s,far)),...street(),...carRecords],meshes=[];
  for(const role of ['structure','lights','car']){
    const selected=records.filter(r=>r.role===role),budget={structure:far?7000:13300,lights:far?1800:4800,car:far?700:2100}[role];
    const weight=selected.reduce((n,r)=>n+Math.sqrt(r.g.index.count/3),0);
    const parts=selected.map(r=>reduce(r.g,Math.max(8,Math.floor((budget-selected.length*8)*Math.sqrt(r.g.index.count/3)/weight)+8),role!=='car',far?.14:.035,r.boundary,far));
    const g=clean(mergeGeometries(parts));parts.forEach(g=>g.dispose());
    meshes.push({name:`Native Punk Drive / ${role}`,role,g,attributes:role==='car'?{emission:'_EMISSION',wheel:'_WHEEL',drive:'_DRIVE',effect:'_EFFECT'}:role==='structure'?{surface:'_SURFACE'}:role==='lights'?{surface:'_SCREEN'}:{}});
  }
  const materials=[
    {name:'Punk graphite, wet streets and native glass',pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],roughnessFactor:.74,metallicFactor:.25}},
    {name:'Original Punk neon signs',pbrMetallicRoughness:{baseColorFactor:[1,1,1,1]},extensions:{KHR_materials_unlit:{}}},
    {name:'Native Quadra paint, glass and tires',pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],roughnessFactor:.36,metallicFactor:.45}},
  ];
  const data=writeLandmarkGLB(meshes,null,{materials,generator:'Threetopia / native Threejs-Punk Drive kit and Quadra'}),triangles=meshes.reduce((n,m)=>n+m.g.index.count/3,0);
  for(const {g} of meshes){g.computeBoundingBox();bounds.union(g.boundingBox);const p=g.attributes.position;for(const i of g.index.array)radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));}
  const level=far?'overview':'tile',url=far?'overview.glb':'landmark.glb',errors=validateLandmarkMetrics({triangles,drawCalls:meshes.length,bytes:data.length+extraBytes,radius,minY:bounds.min.y,maxY:bounds.max.y,textures:2,textureBytes,forbiddenNodes:0},level);
  if(errors.length)throw Error(`${level}: ${errors.join(' ')} (${triangles} triangles / ${data.length+extraBytes} bytes; bounds ${JSON.stringify(bounds)})`);
  await writeFile(`${output}/${url}`,data);
  lods.push({level,url,triangles,drawCalls:meshes.length,bytes:data.length,totalBytes:data.length+extraBytes,sha256:sha(data),parts:meshes.map(m=>({role:m.role,triangles:m.g.index.count/3}))});
  console.log(`${level}: ${triangles} triangles, ${Math.round((data.length+extraBytes)/1024)} KiB including rooms, ${meshes.length} draws including the moving car`);
}
const sourceTriangles=[...buildings,...signs].reduce((n,spec)=>n+[...meta.buildings,...meta.towers,...meta.signs].find(item=>item.name===spec.node).lods[0].tris,car.meshes.reduce((n,mesh)=>n+mesh.triangles,0));
const manifest={version:1,kind:'map-landmark',id:'punk',title:'Punk',world:{id:'punk',title:'Threejs-Punk Drive',creator:'Anderson Mancini',contributors:['Sunag'],url:'https://www.threejspunk.com/'},
  source:{world:'punk',creator:'Anderson Mancini · Sunag',url:'https://www.threejspunk.com/',revision:sha(kitBytes),selection:'Five original black city buildings, nine original neon signs and the rigged Quadra Turbo-R',triangles:sourceTriangles,origin:[0,0,0],scale:1,objects:[...buildings,...signs].map(b=>b.node).concat('QuadraRig')},
  adaptations:['Original map kit landmarks uniformly miniaturized and composed around a shared road','Dark native material palette retained; black plaster mean and car texture colours baked into vertices','Hidden room meshes replaced by three-fenestra interiors on original glass and lit window faces','Original panes and adjoining reveals pinned at both LODs; no pruning of windows; glass and display panels separated from plaster by 3/1024 map metres','Enclosed plaster omitted conservatively; original display panels retained with host cyan scanlines','Original neon geometry merged; no sign image overlays or video decoders','Quadra body and four wheel groups reduced into one host-animated draw','Three measured draws at both LODs, including car and neon'],
  anchor:'ground-centre',units:'map-metres',surface:null,bounds:{radius,height:bounds.max.y},lods,buildings,signs,
  driving:{car:'Quadra Turbo-R',scale:PUNK_CAR_SCALE,forward:car.rig.forward,wheelbase:car.rig.wheelbase*PUNK_CAR_SCALE,wheels:car.rig.wheels},
  interiors:{package:'three-fenestra',version:'0.3.0',mode:'native-facades',url:'https://github.com/codedgar/three-fenestra',textureBytes,textures:textureAssets},
  sourceHashes:{kit:sha(kitBytes),metadata:sha(metaBytes),car:sha(carBytes),builder:sha(await readFile(new URL(import.meta.url))),extractor:sha(await readFile('src/tiles/lite/extract.js')),writer:sha(await readFile('scripts/atlas/landmark-glb.mjs'))}};
await writeFile(`${output}/component.json`,JSON.stringify(manifest,null,2)+'\n');
