import {insideTile,makeTerrain,edgeHeight,hexCorners} from './index.js';
export const SCENE_MAP_BUDGET=Object.freeze({bytes:65536,assetBytes:64*1024*1024,triangles:2000000,landmarks:32});
const finite3=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
const localGLB=p=>typeof p==='string'&&/^[\w./-]+\.glb$/.test(p)&&!p.startsWith('/')&&!p.split('/').includes('..');
export function validateSceneMap(map){
  if(!map||typeof map!=='object')return ['A scene map is required.'];
  const errors=[],add=(ok,message)=>{if(!ok)errors.push(message);};
  add(map.version===3&&map.kind==='scene-tile','Use version 3, kind scene-tile.');
  add(map.units==='metres'&&map.origin==='tile-centre'&&map.radius===400,'Use metres, Y up, tile-centre origin and a 400 m radius.');
  add(new TextEncoder().encode(JSON.stringify(map)).length<=SCENE_MAP_BUDGET.bytes,'Scene map metadata exceeds 64 KiB.');
  const source=map.source;
  add(source?.kind==='gltf'?localGLB(source.url):source?.kind==='runtime'&&/^[a-z][a-z0-9-]{1,63}$/.test(source.id),'source must reference a local .glb or a registered runtime adapter.');
  add(Number.isFinite(map.bounds?.minY)&&Number.isFinite(map.bounds?.maxY)&&map.bounds.minY>=-500&&map.bounds.maxY<=500&&map.bounds.minY<map.bounds.maxY,'Declare finite bounds.minY / maxY within -500…500 metres.');
  add(Array.isArray(map.omit)&&map.omit.length<=64&&map.omit.every(s=>typeof s==='string'&&s.length>0&&s.length<=80),'omit must contain up to 64 exact node names for invisible small detail.');
  add(Array.isArray(map.landmarks)&&map.landmarks.length<=SCENE_MAP_BUDGET.landmarks,'At most 32 landmarks are allowed.');
  const ids=new Set();
  if(Array.isArray(map.landmarks))for(const p of map.landmarks){add(p&&/^[a-z][a-z0-9-]{1,63}$/.test(p.id)&&!ids.has(p.id)&&typeof p.label==='string'&&p.label.length>0&&p.label.length<=64&&finite3(p.position)&&insideTile(p.position[0],p.position[2])&&p.position[1]>=map.bounds?.minY&&p.position[1]<=map.bounds?.maxY,'Landmarks need unique IDs, labels and positions inside the tile bounds.');ids.add(p?.id);}
  return errors;
}
export function defineSceneMap(map){const errors=validateSceneMap(map);if(errors.length)throw Error(errors.join('\n'));return map;}
export function starterSceneMap(){return{version:3,kind:'scene-tile',units:'metres',origin:'tile-centre',radius:400,source:{kind:'gltf',url:'assets/world.glb'},bounds:{minY:-12,maxY:100},omit:[],landmarks:[{id:'arrival',label:'Arrival',kind:'spawn',position:[0,3,0]}]};}

/** A real example terrain mesh, also declared as world.scene. No map-only artwork. */
export function starterSceneGLB(edges=Array(6).fill('open-sea')){
  const corners=hexCorners();
  const terrain=makeTerrain((x,z)=>{let best=Infinity,side=0,t=0;for(let i=0;i<6;i++){const a=corners[i],b=corners[(i+1)%6],dx=b[0]-a[0],dz=b[1]-a[1],u=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz))),d=Math.hypot(x-a[0]-u*dx,z-a[1]-u*dz);if(d<best){best=d;side=i;t=u;}}const u=Math.min(1,best/50),blend=u*u*(3-2*u);return edgeHeight(edges[side],t)*(1-blend)+3*blend;},()=>[.4,.55,.3],16);
  const positions=new Float32Array(terrain.positions),indices=new Uint32Array(terrain.indices),bin=new Uint8Array(positions.byteLength+indices.byteLength);bin.set(new Uint8Array(positions.buffer));bin.set(new Uint8Array(indices.buffer),positions.byteLength);
  const gltf={asset:{version:'2.0',generator:'Threetopia actual-scene starter'},scene:0,scenes:[{nodes:[0]}],nodes:[{name:'Landscape',mesh:0}],meshes:[{primitives:[{attributes:{POSITION:0},indices:1,material:0}]}],materials:[{pbrMetallicRoughness:{baseColorFactor:[.4,.55,.3,1],metallicFactor:0,roughnessFactor:1},doubleSided:true}],buffers:[{byteLength:bin.byteLength}],bufferViews:[{buffer:0,byteOffset:0,byteLength:positions.byteLength,target:34962},{buffer:0,byteOffset:positions.byteLength,byteLength:indices.byteLength,target:34963}],accessors:[{bufferView:0,componentType:5126,count:positions.length/3,type:'VEC3',min:[-Math.sqrt(3)*200,-12,-400],max:[Math.sqrt(3)*200,3,400]},{bufferView:1,componentType:5125,count:indices.length,type:'SCALAR'}]};
  const json=new TextEncoder().encode(JSON.stringify(gltf)),length=Math.ceil(json.length/4)*4,result=new Uint8Array(28+length+bin.length),view=new DataView(result.buffer);
  view.setUint32(0,0x46546c67,true);view.setUint32(4,2,true);view.setUint32(8,result.length,true);view.setUint32(12,length,true);view.setUint32(16,0x4e4f534a,true);result.fill(32,20,20+length);result.set(json,20);view.setUint32(20+length,bin.length,true);view.setUint32(24+length,0x004e4942,true);result.set(bin,28+length);return result;
}
