import * as THREE from 'three/webgpu';
import { capturedMaterial, type CapturedMaterialSource } from './materials.js';
import { fetchBytes, sampleHeightfield, edgeWeight, type Heightfield } from './heightfield.ts';
import { sourceWeight, type WorldHeight } from './hex-world.ts';
import type { RegionDefinition } from './config.ts';
const typed={Float32Array,Uint32Array,Uint16Array,Uint8Array,Int32Array,Int16Array,Int8Array};
interface PackedArray {
  type:keyof typeof typed; buffer:number; offset:number; length:number;
  decode?:{min:number[];scale:number[]};
}
interface PackedAttribute extends PackedArray {
  itemSize:number; normalized?:boolean; float16?:boolean; instanced?:boolean; meshPerAttribute?:number;
}
interface CaptureManifest {
  buffers:string[];
  images:{file:string}[];
  textures:{image:number;flipY:boolean;colorSpace:THREE.ColorSpace;wrapS:THREE.Wrapping;wrapT:THREE.Wrapping;repeat:number[];offset:number[];center:number[];rotation:number;channel:number}[];
  materials:CapturedMaterialSource[];
  geometries:{name:string;instanced:boolean;instanceCount:number;attributes:Record<string,PackedAttribute>;index?:PackedArray;groups:{start:number;count:number;materialIndex:number}[];drawRange:{start:number;count:number|null};bounds:number[]}[];
  meshes:{name:string;geometry:number;materials:number[];matrix:number[];center:number[];castShadow:boolean;instances?:{count:number;matrix:PackedArray;color?:PackedArray}}[];
  terrainAtlas:{file:string}; heightfield:PackedArray & Omit<Heightfield,'data'>;
  collision?:number;
}
export interface CapturedPackage {
  group:THREE.Group; field:Heightfield; atlas:THREE.Texture;
  collider:THREE.BufferGeometry|null; meshes:THREE.Mesh[]; manifest:any;
}
export async function loadCapturedPackage(region:RegionDefinition,progress:(message:string)=>void):Promise<CapturedPackage> {
  const base=`/world-assets/${region.id}/`;
  const response=await fetch(base+'scene.json');if(!response.ok)throw new Error(`${region.title}: missing scene package`);
  const manifest:CaptureManifest=await response.json();progress(`Unpacking ${region.title}`);
  const buffers=await Promise.all(manifest.buffers.map(file=>fetchBytes(base+file)));
  const decoded=new Map<string,any>();
  const array=(info:PackedArray):any=>{
    const key=info.buffer+':'+info.offset+':'+info.length+':'+info.type+':'+JSON.stringify(info.decode);
    if(decoded.has(key))return decoded.get(key);
    const raw=new typed[info.type](buffers[info.buffer],info.offset,info.length);
    if(!info.decode){decoded.set(key,raw);return raw;}
    const out=new Float32Array(info.length),{min,scale}=info.decode;
    for(let i=0;i<out.length;i++)out[i]=raw[i]*scale[i%scale.length]+min[i%min.length];
    decoded.set(key,out);return out;
  };
  const loader=new THREE.TextureLoader();
  const images=await Promise.all(manifest.images.map(async (info)=>{const tex=await loader.loadAsync(base+info.file);return tex.image;}));
  const textures=manifest.textures.map(info=>{
    const t=new THREE.Texture(images[info.image]);t.flipY=info.flipY;t.colorSpace=info.colorSpace;t.wrapS=info.wrapS;t.wrapT=info.wrapT;
    t.repeat.fromArray(info.repeat);t.offset.fromArray(info.offset);t.center.fromArray(info.center);t.rotation=info.rotation;t.channel=info.channel;t.anisotropy=4;t.needsUpdate=true;return t;
  });
  const materials=manifest.materials.map(source=>capturedMaterial(source,textures,region.id,region.origin));
  const geos=manifest.geometries.map(info=>{
    const g=info.instanced?new THREE.InstancedBufferGeometry():new THREE.BufferGeometry();
    for(const [key,data] of Object.entries(info.attributes)) {
      const A=data.instanced?THREE.InstancedBufferAttribute:data.float16?THREE.Float16BufferAttribute:THREE.BufferAttribute;
      const attr=new A(array(data),data.itemSize,data.normalized,data.meshPerAttribute);g.setAttribute(key,attr);
    }
    if(info.index)g.setIndex(new THREE.BufferAttribute(array(info.index),1));
    for(const item of info.groups)g.addGroup(item.start,item.count,item.materialIndex);
    if(info.instanced)(g as THREE.InstancedBufferGeometry).instanceCount=info.instanceCount;
    g.setDrawRange(info.drawRange.start,info.drawRange.count??Infinity);
    g.boundingBox=new THREE.Box3(new THREE.Vector3().fromArray(info.bounds),new THREE.Vector3().fromArray(info.bounds,3));g.computeBoundingSphere();g.name=info.name;return g;
  });
  const group=new THREE.Group();group.name=region.title;group.position.fromArray(region.origin);
  const meshes:THREE.Mesh[]=[];
  for(const info of manifest.meshes) {
    const geometry=geos[info.geometry];const material=info.materials.length===1?materials[info.materials[0]]:info.materials.map(i=>materials[i]);
    const mesh=info.instances?new THREE.InstancedMesh(geometry,material,info.instances.count):new THREE.Mesh(geometry,material);
    if(info.instances) {
      (mesh as THREE.InstancedMesh).instanceMatrix=new THREE.InstancedBufferAttribute(array(info.instances.matrix),16);
      if(info.instances.color)(mesh as THREE.InstancedMesh).instanceColor=new THREE.InstancedBufferAttribute(array(info.instances.color),3);
      if(region.id==='lagoon'&&/tree-.*-leaves/.test(info.name)){
        const matrices=(mesh as THREE.InstancedMesh).instanceMatrix.array,centres=new Float32Array(info.instances.count*3);
        for(let i=0;i<info.instances.count;i++)centres.set([matrices[i*16+12],matrices[i*16+13],matrices[i*16+14]],i*3);
        geometry.setAttribute('aLeafCentre',new THREE.InstancedBufferAttribute(centres,3));
      }
    }
    mesh.name=info.name;mesh.matrix.fromArray(info.matrix);mesh.matrix.decompose(mesh.position,mesh.quaternion,mesh.scale);mesh.updateMatrix();mesh.matrixAutoUpdate=false;
    mesh.castShadow=info.castShadow;mesh.receiveShadow=true;
    mesh.userData.worldCenter=new THREE.Vector3().fromArray(info.center).add(group.position);
    mesh.userData.sourceShadow=info.castShadow;
    mesh.userData.drawDistance=/grass|flowers|reeds/.test(info.name)?110:/veg-|palm/.test(info.name)?220:460;
    if(geometry instanceof THREE.InstancedBufferGeometry)mesh.frustumCulled=false;
    if(info.instances)(mesh as THREE.InstancedMesh).computeBoundingSphere();
    group.add(mesh);meshes.push(mesh);
  }
  group.updateMatrixWorld(true);
  const atlas=await loader.loadAsync(base+manifest.terrainAtlas.file);atlas.colorSpace=THREE.SRGBColorSpace;atlas.flipY=false;atlas.anisotropy=4;
  return {group,meshes,manifest,atlas,field:{...manifest.heightfield,data:array(manifest.heightfield)},collider:manifest.collision===undefined?null:geos[manifest.collision]};
}

/** Original far-forest cards were placed on a much larger standalone mountain range.
 * Clip them to this package's footprint and move edge vegetation with the shared ground. */
export function fitCapturedPlants(pack:CapturedPackage,region:RegionDefinition,height:WorldHeight) {
  const instance=new THREE.Matrix4(),combined=new THREE.Matrix4(),point=new THREE.Vector3();
  for(const mesh of pack.meshes) {
    // Three's marker also accepts captured meshes made by another package revision.
    if(!(mesh as THREE.InstancedMesh).isInstancedMesh||!/^forest|^grass|^reeds|^flowers|^rock$|^cliffs$|^pebbles$|^ferns$|^roots$/.test(mesh.name))continue;
    const object=mesh as THREE.InstancedMesh;
    object.instanceMatrix=object.instanceMatrix.clone() as THREE.InstancedBufferAttribute;if(object.instanceColor)object.instanceColor=object.instanceColor.clone() as THREE.InstancedBufferAttribute;
    const inverse=object.matrix.clone().invert(),tint=new THREE.Color();let count=0;
    for(let i=0;i<object.count;i++) {
      object.getMatrixAt(i,instance);combined.multiplyMatrices(object.matrix,instance);point.setFromMatrixPosition(combined);
      const x=point.x,z=point.z,wx=x+region.origin[0],wz=z+region.origin[2];
      if(edgeWeight(region.bounds,x,z,35)<=0)continue;
      if(object.name==='forest'&&sourceWeight(region,x,z)<(Math.sin(x*12.9898+z*78.233)*43758.5453%1+1)%1)continue;
      if(object.name==='forest'&&height.nearest(wx,wz).distance<6)continue;
      combined.elements[13]+=height.base(wx,wz)-sampleHeightfield(pack.field,x,z)-region.origin[1];
      instance.multiplyMatrices(inverse,combined);object.setMatrixAt(count,instance);
      if(object.instanceColor){object.getColorAt(i,tint);object.setColorAt(count,tint);}count++;
    }
    object.count=count;object.instanceMatrix.needsUpdate=true;if(object.instanceColor)object.instanceColor.needsUpdate=true;
    object.computeBoundingSphere();
  }
}
