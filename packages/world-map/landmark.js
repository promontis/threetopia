import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {ShaderChunk} from 'three';
import {LANDMARK_BUDGET,validateLandmarkMetrics} from './tile-slot.js';
import {measureLandmark} from './desert-tile.js';

/** One self-contained asset per slot, measured before it enters the scene. */
export async function loadLandmark(url,lod='tile',{signal}={}){
  const budget=LANDMARK_BUDGET[lod];if(!budget)throw Error('Unknown map detail level.');
  const response=await fetch(url,{signal});if(!response.ok)throw Error(`Cannot load map component (${response.status}).`);
  const reader=response.body.getReader(),chunks=[];let length=0;
  try{
    while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;
      if(length>budget.bytes)throw Error(`Component exceeds ${budget.bytes} bytes for ${lod}.`);chunks.push(value);}
  }catch(error){await reader.cancel();throw error;}finally{reader.releaseLock();}
  const data=new Uint8Array(length);let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.byteLength;}
  const header=new DataView(data.buffer);
  if(length<20||header.getUint32(0,true)!==0x46546c67||header.getUint32(4,true)!==2||header.getUint32(8,true)!==length||header.getUint32(16,true)!==0x4e4f534a)throw Error('A map component must be a self-contained GLB 2.0.');
  const json=JSON.parse(new TextDecoder().decode(data.subarray(20,20+header.getUint32(12,true))));
  if((json.buffers??[]).some(b=>b.uri)||(json.images??[]).some(i=>i.uri))throw Error('Bundle every buffer and texture into the GLB.');
  if((json.buffers??[]).reduce((sum,b)=>sum+b.byteLength,0)>8*1024*1024)throw Error('Decoded component buffers exceed 8 MiB.');
  if(json.animations?.length||json.skins?.length||json.cameras?.length||json.extensions?.KHR_lights_punctual)throw Error('The host owns animation, lights and cameras. Supply static geometry.');
  if((json.meshes??[]).some(m=>m.primitives.some(p=>(p.mode!==undefined&&p.mode!==4)||p.targets)))throw Error('Use triangle meshes without morph targets.');
  if((json.materials??[]).some(m=>m.alphaMode&&!['OPAQUE','MASK'].includes(m.alphaMode)))throw Error('Map landmarks use opaque or alpha-cutout materials, without blending.');
  const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder),gltf=await loader.parseAsync(data.buffer,new URL('.',url).href);
  if(signal?.aborted){disposeLandmark(gltf.scene);throw new DOMException('Map load cancelled.','AbortError');}
  const metrics=measureLandmark(gltf.scene,length),errors=validateLandmarkMetrics(metrics,lod);
  if(errors.length){disposeLandmark(gltf.scene);throw Error(errors.join('\n'));}
  gltf.scene.traverse(object=>{if(object.isMesh){object.castShadow=true;object.receiveShadow=true;for(const material of [].concat(object.material))if(material.alphaTest>0)material.alphaToCoverage=true;}});
  return {root:gltf.scene,metrics,lod,dispose:()=>disposeLandmark(gltf.scene)};
}

/** Wind remains a tiny, host-owned deformation within the reserved margin. */
export function addLandmarkWind(root,time){
  root.traverse(object=>{
    if(!object.isMesh||object.userData.role!=='foliage')return;
    for(const material of [].concat(object.material)){
      material.onBeforeCompile=shader=>{
        shader.uniforms.uMapTime=time;
        shader.vertexShader='uniform float uMapTime;\n'+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
          float sway = sin(uMapTime * 1.05 + position.x * .72 + position.z * .53);
          transformed.x += sway * .045;
          transformed.z += sin(uMapTime * .8 + position.y * 1.1) * .025;
        `);
        // Native foliage uses bent volume normals on both sides of each card.
        shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_begin>',ShaderChunk.normal_fragment_begin.replace('gl_FrontFacing ? 1.0 : - 1.0','1.0'));
      };
      material.customProgramCacheKey=()=> 'threetopia-landmark-wind-v2';
    }
  });
}
export function disposeLandmark(root){
  const geometries=new Set(),materials=new Set(),textures=new Set();
  root.traverse(object=>{if(!object.isMesh)return;geometries.add(object.geometry);for(const material of [].concat(object.material)){materials.add(material);for(const value of Object.values(material))if(value?.isTexture)textures.add(value);}});
  textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());root.removeFromParent();
}
