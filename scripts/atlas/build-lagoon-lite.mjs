// Reduce the four native treehouses and connecting bridges as one map component.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three-world';
import {mergeGeometries,mergeVertices} from 'three-world/addons/utils/BufferGeometryUtils.js';
import {MeshoptSimplifier as simplify,MeshoptEncoder as encoder} from 'meshoptimizer';
import {writeLandmarkGLB} from './landmark-glb.mjs';
import {joinBoardFaces} from './lagoon-board-lod.mjs';
import {validateLandmarkMetrics} from '../../packages/world-map/tile-slot.js';
const root=new URL('../../',import.meta.url),sourceFile=new URL('.context/lagoon-lite/source-village.json',root);
const source=JSON.parse(await readFile(sourceFile,'utf8'));if(source.version!==3)throw Error('Extract the original connected village first.');
if(!source.ground||source.trees.length!==4||source.bridges.length!==3)throw Error('The four native trees, three bridges and terrain are required.');
await Promise.all([simplify.ready,encoder.ready]);
const output=new URL('public/map/lagoon-lite/',root);await mkdir(output,{recursive:true});
const hash=x=>createHash('sha256').update(x).digest('hex');
function decode(base64,Type=Float32Array){const b=Buffer.from(base64,'base64');return new Type(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));}
const geometries=source.meshes.map(record=>{
  const g=new T.BufferGeometry();for(const [name,key] of [['position','positions'],['normal','normals'],['color','colors']])g.setAttribute(name,new T.BufferAttribute(decode(record[key]),3));
  const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,Math.max(0,p.getY(i)));
  const raw=decode(record.indices,Uint32Array),indices=[];
  for(let i=0;i<raw.length;i+=3)if(Math.max(p.getY(raw[i]),p.getY(raw[i+1]),p.getY(raw[i+2]))>.015)indices.push(raw[i],raw[i+1],raw[i+2]);
  g.setIndex(indices);return {...record,g:mergeVertices(g,1e-5)};
});
const targets={plank:2700,beam:1500,dark:300,thatch:750,thatchUnder:80,bark:80,sail:300,cloth:160,rug:20,stone:120,wicker:24,leaf:80,rope:1000,metal:150,window:150,straw:0};
function boardSurfaces(record,far){
  if(!record.name.includes(':plank'))return null;
  const g=record.g.clone(),p=g.attributes.position.array,indices=g.index.array;
  const parents=simplify.generatePositionRemap(p,3),find=i=>{while(parents[i]!==i){parents[i]=parents[parents[i]];i=parents[i];}return i;};
  for(let i=0;i<indices.length;i+=3)for(let k=1;k<3;k++)parents[find(indices[i+k])]=find(indices[i]);
  const components=new Map();for(let i=0;i<indices.length;i+=3){const key=find(indices[i]);if(!components.has(key))components.set(key,[]);components.get(key).push(indices[i],indices[i+1],indices[i+2]);}
  const kept=[],faces=[],rest=[];let boards=0,error=0;
  for(const component of components.values()){
    // The pinned native mesher emits each bevelled board as 20 triangles,
    // starting with its two broad front-face triangles. Use EVERY board's
    // actual front face before joining neighbours; never prune deck planks.
    if(component.length===60){const face=component.slice(0,6);kept.push(...face);faces.push(face);boards++;}else rest.push(...component);
  }
  const result=joinBoardFaces(g,faces,far?6:2);
  kept.length=0;
  if(rest.length){
    const attributes=new Float32Array(p.length*2),n=g.attributes.normal.array,c=g.attributes.color.array;
    for(let i=0;i<p.length/3;i++){attributes.set(n.subarray(i*3,i*3+3),i*6);attributes.set(c.subarray(i*3,i*3+3),i*6+3);}
    const result=simplify.simplifyWithAttributes(Uint32Array.from(rest),p,3,attributes,6,[.08,.08,.08,.25,.25,.25],null,Math.min(rest.length,(far?30:100)*3),.5,['Sparse','Permissive','Prune']);kept.push(...result[0]);error=result[1];
  }
  g.setIndex(kept);const geometry=result?mergeGeometries([result.g,g]):g;
  return {g:geometry,report:{name:record.name,source:record.triangles,triangles:geometry.index.count/3,sourceBoards:boards,preservedBoards:boards-(result?.joined??0),joinedBoards:result?.joined??0,boardFaces:result?.groups??boards,error}};
}
function reduce(record,far){
  const boards=boardSurfaces(record,far);if(boards)return boards;
  const g=record.g.clone(),p=g.attributes.position.array,n=g.attributes.normal.array,c=g.attributes.color.array;
  const kind=record.name.split(':')[1]?.split('@')[0],interior=record.name.includes('@in');
  // Enclosed furniture and interior roof lining are subpixel in the overview.
  // Floor boards were handled above, so decks remain complete at both LODs.
  if(far&&interior)return null;
  const treeTargets={origin:1300,nest:600,perch:450,canopy:1150};
  const nativeTree=source.trees.find(t=>record.name===`tree-${t.id}-bark-near`);
  let target=nativeTree?treeTargets[nativeTree.id]:Math.round((targets[kind]??50)*.34);
  if(record.name.startsWith('connections.west:'))target=kind==='rope'?550:kind==='beam'?250:100;
  if(interior)target=Math.min(target,kind==='beam'?60:30);
  if(far)target=Math.max(target?8:0,Math.round(target*.24));
  if(!target)return null;
  const indices=Uint32Array.from(g.index.array),attributes=new Float32Array(p.length*2);
  for(let i=0;i<p.length/3;i++){attributes.set(n.subarray(i*3,i*3+3),i*6);attributes.set(c.subarray(i*3,i*3+3),i*6+3);}
  // Attribute-aware edge collapses retain the native normals and surface colours.
  const [count,error]=simplify.simplifyWithUpdate(indices,p,3,attributes,6,[.08,.08,.08,.25,.25,.25],null,Math.min(indices.length,target*3),.5,['Permissive','Prune']);
  for(let i=0;i<p.length/3;i++){
    p[i*3+1]=Math.max(0,p[i*3+1]);
    const normal=new T.Vector3(...attributes.subarray(i*6,i*6+3)).normalize();normal.toArray(n,i*3);
    for(let k=0;k<3;k++)c[i*3+k]=Math.min(1,Math.max(0,attributes[i*6+3+k]));
  }
  g.setIndex(new T.BufferAttribute(indices.slice(0,count),1));
  return {g,report:{name:record.name,source:record.triangles,triangles:count/3,error}};
}
const totalLeaves=source.leaves.reduce((n,l)=>n+l.count,0);
function treeFoliage(leaves,far,full=false){
  const matrices=decode(leaves.matrices),clumps=decode(leaves.clumps),info=decode(leaves.info),card=decode(leaves.positions),normal=decode(leaves.normals),uv=decode(leaves.uv);
  const world=new T.Matrix4().fromArray(leaves.worldMatrix),worldNormal=new T.Matrix3().getNormalMatrix(world),origin=new T.Vector3(...source.root);
  const count=full?leaves.count:Math.round((far?600:4000)*leaves.count/totalLeaves),grow=full?1:Math.min(far?10.6:5.8,Math.sqrt(leaves.count/count));
  // Use the source's own randomized LOD order and coverage compensation. Keep
  // the native blade atlas, transforms, clump normals, AO and tint per instance.
  const vertices=full?[0,1,2,3,4,5,6,7,8]:[0,2,6,8],faces=full?Array.from(decode(leaves.indices,Uint32Array)):[0,1,2,1,3,2];
  const positions=[],normals=[],colors=[],uvs=[],indices=[],m=new T.Matrix4();
  for(let i=0;i<count;i++){
    m.fromArray(matrices,i*16);const rotation=new T.Matrix3().setFromMatrix4(m),clump=new T.Vector3(...clumps.subarray(i*4,i*4+3));
    const crown=clump.clone().multiply(new T.Vector3(1,1.7,1)).add(new T.Vector3(0,.5,0)).normalize();
    const tint=info[i*4+3],variant=info[i*4+1],ao=info[i*4+2],base=positions.length/3;
    for(const v of vertices){
      const original=new T.Vector3(...card.subarray(v*3,v*3+3));
      const point=original.clone().multiplyScalar(grow).applyMatrix4(m),spherical=original.clone().applyMatrix4(m).sub(clump).add(new T.Vector3(0,.25,0)).normalize();
      const geoN=new T.Vector3(...normal.subarray(v*3,v*3+3)).applyMatrix3(rotation).normalize();
      const bent=geoN.clone().multiplyScalar((geoN.dot(spherical)>=0?1:-1)*.2).addScaledVector(spherical,.5).addScaledVector(crown,.42).normalize();
      point.applyMatrix4(world).sub(origin);bent.applyNormalMatrix(worldNormal);
      positions.push(point.x,Math.max(0,point.y),point.z);normals.push(bent.x,bent.y,bent.z);
      const outer=Math.min(1,Math.max(0,spherical.dot(crown)*.5+.5)),occlusion=.6+.4*ao*(.8+.2*outer),shade=(.94+.1*(tint*2-1)**2)*occlusion;
      colors.push((.84+.32*tint)*shade,(.92+.18*tint)*shade,.82*shade);
      uvs.push(uv[v*2]*.5+(variant%2)*.5,uv[v*2+1]*.5+Math.floor(variant/2)*.5);
    }
    for(const v of faces)indices.push(base+v);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));g.setIndex(indices);return g;
}
function foliage(far,full=false){return mergeGeometries(source.leaves.map(l=>treeFoliage(l,far,full)));}
const levels=[];
for(const far of [false,true]){
  const reduced=geometries.map(g=>reduce(g,far)).filter(Boolean);
  levels.push({far,meshes:[{name:'Native village treehouses and bridges',g:mergeGeometries(reduced.map(r=>r.g))},{name:'Native village leaves',g:foliage(far)}],parts:reduced.map(r=>r.report)});
}
let radius=0,maxY=0;
for(const {meshes} of levels)for(const {g} of meshes){const p=g.attributes.position;for(const i of g.index.array){radius=Math.max(radius,Math.hypot(p.getX(i),p.getZ(i)));maxY=Math.max(maxY,p.getY(i));}}
const scale=Math.min(7.15/radius,14.7/maxY),lods=[],assets=[],sourceTriangles=source.counts.structure+source.counts.leaves;
function compact(mesh){
  const g=mesh.g,indices=Uint32Array.from(g.index.array),[remap,count]=encoder.reorderMesh(indices,true,true);
  for(const key of Object.keys(g.attributes)){
    const original=g.attributes[key],values=new Float32Array(count*original.itemSize);
    for(let i=0;i<remap.length;i++)if(remap[i]!==0xffffffff)for(let k=0;k<original.itemSize;k++)values[remap[i]*original.itemSize+k]=original.array[i*original.itemSize+k];
    g.setAttribute(key,new T.BufferAttribute(values,original.itemSize));
  }
  g.setIndex(new T.BufferAttribute(indices,1));
}
function removeOverlaps(g){
  // Edge collapses can flatten opposite faces onto one another. Check the
  // actual exported precision, not just vertex IDs (normals/colours split them).
  const p=g.attributes.position,indices=g.index.array,seen=new Set(),kept=[];
  for(let i=0;i<p.array.length;i++)p.array[i]=Math.round(p.array[i]*1024)/1024;
  const a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3(),ab=new T.Vector3(),ac=new T.Vector3();
  let duplicate=0,degenerate=0,ground=0;
  for(let i=0;i<indices.length;i+=3){
    const ids=[indices[i],indices[i+1],indices[i+2]];
    a.fromBufferAttribute(p,ids[0]);b.fromBufferAttribute(p,ids[1]);c.fromBufferAttribute(p,ids[2]);
    if(Math.max(a.y,b.y,c.y)===0){ground++;continue;}
    if(ab.subVectors(b,a).cross(ac.subVectors(c,a)).lengthSq()<1e-16){degenerate++;continue;}
    const key=[a,b,c].map(v=>v.toArray().join(',')).sort().join(';');
    if(seen.has(key)){duplicate++;continue;}seen.add(key);kept.push(...ids);
  }
  g.setIndex(kept);return {duplicate,degenerate,ground};
}
for(const level of levels){
  let triangles=0;const cleanup=[];for(const mesh of level.meshes){mesh.g.scale(scale,scale,scale);cleanup.push({name:mesh.name,...removeOverlaps(mesh.g)});triangles+=mesh.g.index.count/3;compact(mesh);}
  const atlas=Buffer.from(level.far?source.atlas256:source.atlas512,'base64'),bytes=writeLandmarkGLB(level.meshes,atlas),url=level.far?'village-overview.glb':'village.glb',lod=level.far?'overview':'tile',textureSize=level.far?256:512;
  const errors=validateLandmarkMetrics({triangles,drawCalls:2,bytes:bytes.length,radius:radius*scale,minY:0,maxY:maxY*scale,textures:1,textureBytes:Math.ceil(textureSize**2*4*4/3),forbiddenNodes:0},lod);
  if(errors.length){console.table(level.parts.map(p=>({name:p.name,triangles:p.triangles,boards:p.boardFaces,joined:p.joinedBoards})));throw Error(`${url} (${triangles} triangles, ${bytes.length} bytes) exceeds the shared component budget: ${errors.join(' ')}`);}
  assets.push({url,bytes});
  lods.push({level:lod,url,triangles,drawCalls:2,bytes:bytes.length,textureSize,sha256:hash(bytes),reduction:1-triangles/sourceTriangles,cleanup,parts:level.parts});
  console.log(`${url}: ${triangles} triangles, ${Math.round(bytes.length/1024)} KiB, ${(100*(1-triangles/sourceTriangles)).toFixed(1)}% fewer triangles than the source.`);
}
// Validate BOTH levels before replacing any asset used by the live preview.
for(const {url,bytes} of assets)await writeFile(new URL(url,output),bytes);
const ground={version:1,kind:'sampled-tile-surface',source:{world:'lagoon',revision:source.revision,origin:source.root,scale},size:source.ground.size,step:source.ground.step*scale,x0:source.ground.x0*scale,z0:source.ground.z0*scale,
  heights:source.ground.heights.map(y=>Math.round((y-source.root[1])*scale*10000)/10000),waterLevel:(source.ground.waterLevel-source.root[1])*scale,waveScale:scale,waves:['water-wave-a.png','water-wave-b.png'],
  adaptations:[`Native terrain heights sampled at ${source.ground.step} source metres`,'All four treehouses, three bridges, terrain and water use the same origin and uniform scale','Only the outer 1.5 map metres blend into the shared desert edge']};
await writeFile(new URL('village-ground.json',output),JSON.stringify(ground)+'\n');
await writeFile(new URL('water-wave-a.png',output),Buffer.from(source.ground.waveA,'base64'));
await writeFile(new URL('water-wave-b.png',output),Buffer.from(source.ground.waveB,'base64'));
if(process.argv.includes('--reference')){
  const meshes=[{name:'Original village structure',g:mergeGeometries(geometries.map(r=>r.g))},{name:'Original village leaves',g:foliage(false,true)}];
  for(const mesh of meshes){mesh.g.scale(scale,scale,scale);compact(mesh);}
  const bytes=writeLandmarkGLB(meshes,Buffer.from(source.atlas512,'base64'));await writeFile(new URL('.context/lagoon-lite/village-reference.glb',root),bytes);
  console.log('Saved original geometry reference for local visual comparison.');
}
const toMap=p=>p.map((v,i)=>(v-source.root[i])*scale);
const manifest={version:1,kind:'map-landmark',id:'lagoon-village',title:'Lagoon Tree Village',source:{world:'lagoon',component:'connected-village',revision:source.revision,creator:'cryptomanavan',url:'https://lagoon-tree-village-creatures.netlify.app/',objects:source.sourceObjects,triangles:sourceTriangles,leafCards:totalLeaves,
    trees:source.trees.map(t=>({id:t.id,position:[t.x,t.groundY,t.z],mapPosition:toMap([t.x,t.groundY,t.z])})),bridges:source.bridges.map(b=>({...b,mapA:toMap(b.a),mapB:toMap(b.b)}))},
  adaptations:['The four distinct native treehouses and three native bridges retain their original relative positions under one uniform transform','Original structure meshes decimated with native normals and sampled native material colours','All source board front faces contribute to the decks; adjacent coplanar boards merge in pairs at tile detail and groups of up to six in overview, removing subpixel gaps, thickness and bevels','Original leaf-card transforms, atlas, clump normals, AO and tint retained; native randomized LOD density reduced with coverage compensation','Small roof straw fringes omitted; enclosed interior details omitted in overview; geometry below the source water level clipped','Duplicate, degenerate and coplanar ground faces removed after export quantization to prevent z-fighting'],
  anchor:'ground-centre',units:'map-metres',surface:'village-ground.json',bounds:{radius:radius*scale,height:maxY*scale},lods,
  sourceHashes:{'source-village.json':hash(JSON.stringify(source)),'build-lagoon-lite.mjs':hash(await readFile(new URL(import.meta.url))),'lagoon-board-lod.mjs':hash(await readFile(new URL('./lagoon-board-lod.mjs',import.meta.url))),'landmark-glb.mjs':hash(await readFile(new URL('./landmark-glb.mjs',import.meta.url)))}};
await writeFile(new URL('component.json',output),JSON.stringify(manifest,null,2)+'\n');
