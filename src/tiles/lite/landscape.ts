import * as T from 'three';
import {centre,MAP_SCALE} from '../../../packages/platform/tiles.js';
import {hexDistance} from '../../../packages/platform/tile-terrain.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import type {SampledTileSurface} from '../../../packages/world-map/tile-slot.js';
import {deformMapMesh,shadeMapFoliage,disposeMapDeformations,surfaceNoise} from './materials';
import {PUNK_ACCESS} from './layout';
import {createWaterBathymetry} from './water-bathymetry';

import {createLandscapeSampler,BOUNDS,noise,random,riverX,smooth,mix} from '../../../packages/platform/authored-landscape.js';
export {createLandscapeSampler,BOUNDS,noise,random,riverX,smooth,mix};
export {createTerrain} from './tiled-terrain';
export interface LandscapeSampler {heightAt:(x:number,z:number)=>number;pathAt:(x:number,z:number)=>number;grassAt:(x:number,z:number)=>number}

export async function createCoastalNature(sampler:LandscapeSampler,time:{value:number},sun:T.Vector3){
  const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const [asset,forest]=await Promise.all([loader.loadAsync('/map/lite/environment/tidewater.glb'),loader.loadAsync('/map/lite/forest/landmark.glb')]);
  const root=new T.Group();root.name='Native Tidewater coastline';
  const originals=new Map<string,T.Mesh>();asset.scene.traverse(o=>{if((o as T.Mesh).isMesh)originals.set(o.name,o as T.Mesh);});
  const rand=random(921),dummy=new T.Object3D(),color=new T.Color(),rocks:Array<{x:number;z:number;s:number;y:number;submerged?:boolean}>=[];
  // Dense little outcrops interspersed with open sand; avoid a uniform rock fence.
  for(let i=0;i<15500&&rocks.length<150;i++){
    const x=BOUNDS.x+rand()*BOUNDS.width,z=BOUNDS.z+rand()*BOUNDS.depth,y=sampler.heightAt(x,z),p=sampler.pathAt(x,z);
    const inLagoon=Math.hypot(x,z)<5.7,harbor=x>10&&z>-5;
    if(y<-.62||y>.4||p>.2||inLagoon||harbor||noise(x*.45,z*.45)<.47||(z<-4&&z>-23&&Math.abs(x-riverX(z))<2.3))continue;
    const s=.23+rand()**2*.85;rocks.push({x,z,s,y:y+s*.28});
  }
  // Original Tidewater fracture meshes below the surface, sharing the six
  // existing rock batches. A separate seed preserves the established coast.
  const reefRandom=random(617);
  for(let i=0,placed=0;i<3000&&placed<24;i++){
    const x=-20+reefRandom()*46,z=-25+reefRandom()*38,y=sampler.heightAt(x,z);
    if(y>-.65||y<-3.8||Math.hypot(x,z)<5.8||(z<-4&&z>-23&&Math.abs(x-riverX(z))<2.8))continue;
    const s=Math.min(.7+reefRandom()*1.0,-y*.63);
    rocks.push({x,z,s,y:y+s*.12,submerged:true});placed++;
  }
  for(let variant=0;variant<6;variant++){
    const template=originals.get(`rock-${variant}`)!,entries=rocks.filter((_,i)=>i%6===variant),m=new T.MeshStandardMaterial({vertexColors:true,roughness:.9,flatShading:true});
    m.onBeforeCompile=shader=>{
      shader.vertexShader='varying vec3 vRock;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvRock=(modelMatrix*instanceMatrix*vec4(position,1.)).xyz;');
      shader.fragmentShader='varying vec3 vRock;\n'+surfaceNoise+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        float wet=1.-smoothstep(-.06,.26,vRock.y);
        diffuseColor.rgb*=mix(vec3(.91,.88,.81),vec3(.67,.74,.72),wet)*(.89+.18*mapNoise(vRock.xz*8.+vRock.y));
      `).replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
        normal=mapRelief(normal,-vViewPosition,mapNoise(vRock.xz*11.+vRock.y)*.008);
      `).replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>\nroughnessFactor=mix(.36,.91,smoothstep(-.06,.26,vRock.y));`);
    };
    const instances=new T.InstancedMesh(template.geometry,m,entries.length);instances.name=`Tidewater fractured rocks ${variant}`;
    entries.forEach((v,i)=>{const r=v.submerged?reefRandom:rand;dummy.position.set(v.x,v.y,v.z);dummy.rotation.set(r()*.4,r()*Math.PI*2,r()*.3);dummy.scale.set(v.s,v.s*(.8+r()*.4),v.s);dummy.updateMatrix();instances.setMatrixAt(i,dummy.matrix);color.setScalar(v.submerged?.47+r()*.18:.85+r()*.25);instances.setColorAt(i,color);});
    instances.castShadow=instances.receiveShadow=true;root.add(instances);
  }
  for(const [name,count] of [['palm',36],['young-palm',58],['fern',90]] as const){
    const template=originals.get(name)!,m=new T.MeshStandardMaterial({vertexColors:true,roughness:.88,side:T.DoubleSide});
    const mesh=new T.InstancedMesh(template.geometry,m,count);mesh.name=`Tidewater ${name}`;
    deformMapMesh(mesh,time,'threetopia-coastal-plant-v2',`
      vPlantUv=uv;vLeaf=step(color.r*1.3,color.g);
      transformed.x+=sin(uMapTime*1.1+instanceMatrix[3].x*.5+position.y*.2)*pow(max(position.y,0.)/10.,2.)*.22;
    `,'varying vec2 vPlantUv;varying float vLeaf;',`
      if(vLeaf>.5&&abs(vPlantUv.y)>.13){float tooth=fract(vPlantUv.x*45.+abs(vPlantUv.y)*.65);if(tooth>.80&&fwidth(vPlantUv.x)*45.<.4)discard;}
    `);
    shadeMapFoliage(m,sun,'vLeaf');
    let placed=0;
    for(let tries=0;tries<10000&&placed<count;tries++){
      const x=-17+rand()*40,z=-23+rand()*32,y=sampler.heightAt(x,z);
      if(y<.39||sampler.pathAt(x,z)>.18||sampler.grassAt(x,z)<.19||Math.hypot(x+5.29,z+16.1)<1.9||Math.hypot(x,z)<6.25||Math.hypot(x-7.79,z+13.5)<7.1)continue;
      if((name==='palm'||name==='young-palm')&&(z<-8||(x<-5&&z<-3)))continue;
      const s=name==='palm'?.17+rand()*.105:name==='fern'?.18+rand()*.22:.20+rand()*.26;
      dummy.position.set(x,y-.03,z);dummy.rotation.set(0,rand()*Math.PI*2,0);dummy.scale.setScalar(s);dummy.updateMatrix();mesh.setMatrixAt(placed++,dummy.matrix);
    }
    mesh.count=placed;mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);
  }
  // Keep the established forest layout independent of the removed grass scatter.
  const forestRandom=random(-2038370654);
  const forestPoints:Array<[number,number,number,number,number]>=[];
  for(let tries=0;tries<10000&&forestPoints.length<32;tries++){
    const x=-17+forestRandom()*14,z=-22+forestRandom()*10,y=sampler.heightAt(x,z);
    if(y<.65||Math.abs(x-riverX(z))<2.35||Math.hypot(x+5.29,z+16.1)<2.7||sampler.pathAt(x,z)>.2||forestPoints.some(p=>Math.hypot(x-p[0],z-p[2])<1.25))continue;
    forestPoints.push([x,y-.12,z,.67+forestRandom()*.4,forestRandom()*Math.PI*2]);
  }
  forest.scene.traverse(o=>{
    if(!(o as T.Mesh).isMesh)return;const template=o as T.Mesh,m=(template.material as T.MeshStandardMaterial).clone();m.envMapIntensity=1;
    const mesh=new T.InstancedMesh(template.geometry,m,forestPoints.length);mesh.name=`Native Sakura pine ${o.userData.role}`;
    deformMapMesh(mesh,time,'threetopia-coastal-pine-v2','transformed.x+=sin(uMapTime*.9+instanceMatrix[3].x*.8)*pow(max(position.y,0.)/4.,2.)*.055;');
    if(o.userData.role==='foliage'){m.alphaToCoverage=true;m.color.multiplyScalar(2.05);shadeMapFoliage(m,sun);}
    // Bark and leaf cards must use the same instance transform. Drawing a new
    // random yaw per material separates crowns from their branches.
    forestPoints.forEach(([x,y,z,s,yaw],i)=>{dummy.position.set(x,y,z);dummy.rotation.set(0,yaw,0);dummy.scale.setScalar(s);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);});
    mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);
  });
  // Clear the teleport approach after the deterministic scatter has finished, so
  // a local landing edit does not reshuffle trees and rocks across the island.
  const instance=new T.Matrix4(),at=new T.Vector3();
  root.traverse(o=>{
    const mesh=o as T.InstancedMesh;if(!mesh.isInstancedMesh)return;
    const clearance=mesh.name.includes('palm')?2.1:mesh.name.includes('pine')?1.8:1.25;
    let kept=0;
    for(let i=0;i<mesh.count;i++){
      mesh.getMatrixAt(i,instance);at.setFromMatrixPosition(instance);
      if(Math.hypot(at.x-PUNK_ACCESS.shore.x,at.z-PUNK_ACCESS.shore.z)<clearance)continue;
      if(i!==kept){mesh.setMatrixAt(kept,instance);if(mesh.instanceColor){mesh.getColorAt(i,color);mesh.setColorAt(kept,color);}}kept++;
    }
    mesh.count=kept;mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
  });
  // Keep authored scatter in its own territory when a new host replaces the
  // old coast apron. Store originals so Cancel restores the exact placement.
  const scatter:Array<{mesh:T.InstancedMesh;matrices:Float32Array;colors?:Float32Array;count:number}>=[];
  root.traverse(o=>{const mesh=o as T.InstancedMesh;if(mesh.isInstancedMesh)scatter.push({mesh,matrices:new Float32Array(mesh.instanceMatrix.array),colors:mesh.instanceColor?new Float32Array(mesh.instanceColor.array):undefined,count:mesh.count});});
  function setTiles(contracts:any[]){const centers=contracts.map(t=>centre(t.q,t.r,MAP_SCALE));
    for(const {mesh,matrices,colors,count} of scatter){let kept=0;for(let i=0;i<count;i++){
      const x=matrices[i*16+12],z=matrices[i*16+14];if(centers.some(c=>hexDistance(x-c.x,z-c.z)<.15))continue;
      mesh.instanceMatrix.array.set(matrices.subarray(i*16,i*16+16),kept*16);if(colors&&mesh.instanceColor)mesh.instanceColor.array.set(colors.subarray(i*3,i*3+3),kept*3);kept++;
    }mesh.count=kept;mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere();}
  }
  return {root,setTiles,dispose(){disposeMapDeformations(root);const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures=new Set<T.Texture>();root.traverse(o=>{if((o as T.Mesh).isMesh){geometries.add((o as T.Mesh).geometry);materials.add((o as T.Mesh).material as T.Material);}});for(const mesh of originals.values()){geometries.add(mesh.geometry);for(const m of [].concat(mesh.material as any))materials.add(m);}forest.scene.traverse(o=>{if((o as T.Mesh).isMesh)materials.add((o as T.Mesh).material as T.Material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>{const t=(m as T.MeshStandardMaterial).map;if(t)textures.add(t);m.dispose();});textures.forEach(t=>t.dispose());}};
}
