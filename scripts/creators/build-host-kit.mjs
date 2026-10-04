import {readFile,writeFile} from 'node:fs/promises';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptSimplifier,MeshoptDecoder} from 'meshoptimizer';
await MeshoptSimplifier.ready;
const bytes=await readFile('public/map/lite/environment/tidewater.glb');
const gltf=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
const meshes={};
gltf.scene.traverse(mesh=>{
 if(!mesh.isMesh)return;const g=mesh.geometry,p=g.attributes.position,n=g.attributes.normal,c=g.attributes.color;
 const values=a=>Array.from({length:a.count*3},(_,i)=>+a.getComponent(Math.floor(i/3),i%3).toFixed(5));
 const positions=new Float32Array(values(p));
 const save=(name,index)=>meshes[name]={p:Array.from(positions),n:values(n),c:values(c),i:Array.from(index)};
 save(mesh.name,g.index.array);
 if(mesh.name.startsWith('rock-')){const [index]=MeshoptSimplifier.simplify(new Uint32Array(g.index.array),positions,3,240,.08);save(mesh.name+'-small',index);}
});
// Reuse the native lobster boat, preserving its baked material colours.
const source=JSON.parse(await readFile('.context/map-lite/tidewater-source.json','utf8'));
const decode=(s,Type=Float32Array)=>{const b=Buffer.from(s,'base64');return new Type(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
const boat={p:[],n:[],c:[],i:[]};
for(const m of source.meshes.filter(m=>m.name.startsWith('boat-'))){
 const p=decode(m.positions),n=decode(m.normals),c=decode(m.colors),idx=decode(m.indices,Uint32Array),attributes=new Float32Array(p.length*2);
 for(let i=0;i<p.length/3;i++){attributes.set(n.subarray(i*3,i*3+3),i*6);attributes.set(c.subarray(i*3,i*3+3),i*6+3);}
 const target=m.name==='boat-hull'?600:m.name==='boat-gelcoat'?400:m.name==='boat-fittings'?620:m.name==='boat-wood'?320:Math.min(100,m.triangles);
 const [count]=MeshoptSimplifier.simplifyWithUpdate(idx,p,3,attributes,6,[.1,.1,.1,.4,.4,.4],null,target*3,.24,['Permissive','Prune']),remap=new Map();
 for(const index of idx.slice(0,count)){
  if(!remap.has(index)){remap.set(index,boat.p.length/3);boat.p.push(+(p[index*3]-5.5).toFixed(5),+p[index*3+1].toFixed(5),+(p[index*3+2]-2.7).toFixed(5));boat.n.push(...attributes.slice(index*6,index*6+3));boat.c.push(...attributes.slice(index*6+3,index*6+6));}
  boat.i.push(remap.get(index));
 }
}
meshes['lobster-boat']=boat;
const kit={source:'Native Tidewater rock, palm, fern and lobster boat geometry; Dan Greenheck, MIT. See HOST-ASSETS-LICENSE.md.',meshes};
await writeFile('packages/platform/host-kit.json',JSON.stringify(kit));
console.log(Object.fromEntries(Object.entries(meshes).map(([name,g])=>[name,g.i.length/3])));
