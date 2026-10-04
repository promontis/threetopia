import * as THREE from 'three/webgpu';
import { TerrainData } from '@threetopia/source-tidewater/world/TerrainData.js';
import { Noise2D } from '@threetopia/source-tidewater/util/Noise.js';
import { Village } from '@threetopia/source-tidewater/world/Village.js';
import { Vegetation } from '@threetopia/source-tidewater/world/Vegetation.js';
import { Colliders } from '@threetopia/source-tidewater/world/Colliders.js';
import {LodLevel} from '@threetopia/source-tidewater/world/vegetation/InstanceLOD.js';
import {uCamPos} from '@threetopia/source-tidewater/world/vegetation/VegNodes.js';
import {uCanopyNear} from '@threetopia/source-tidewater/world/vegetation/VegMaterials.js';
import { G } from '@threetopia/source-tidewater/core/Globals.js';
import { loadCityModel } from '@threetopia/source-punk/world/city/loadCity.js';
import { loadBillboards } from '@threetopia/source-punk/world/billboards/loadBillboards.js';
import { applyBillboardMaterials } from '@threetopia/source-punk/world/billboards/applyBillboardMaterials.js';
import { loadQuadraCar } from '@threetopia/source-punk/world/car/loadCar.js';
import { createGround } from '@threetopia/source-punk/world/ground/createGround.js';
import { createCollisionHeight } from '@threetopia/source-punk/world/weather/createCollisionHeight.js';
import { createCollisionRain } from '@threetopia/source-punk/world/weather/createCollisionRain.js';
import { fetchBytes } from './heightfield.ts';
const nextFrame=()=>new Promise(resolve=>setTimeout(resolve,0));

export async function loadTidewater(region,progress) {
  const response=await fetch('/world-assets/tidewater/terrain.json');if(!response.ok)throw Error('Tidewater terrain unavailable');
  const data=await response.json();const terrain=Object.assign(Object.create(TerrainData.prototype),data);
  await Promise.all(Object.entries(data.arrays).map(async ([key,info])=>{const buffer=await fetchBytes('/world-assets/tidewater/'+info.file);terrain[key]=info.type==='Float32Array'?new Float32Array(buffer):new Uint8Array(buffer);}));
  terrain.noise=new Noise2D(7);terrain.noise2=new Noise2D(222);terrain.noise3=new Noise2D(934);terrain.pads=[];
  terrain._F={};terrain._out={};terrain.timings={};
  progress('Building the original Tidewater village');await nextFrame();
  const group=new THREE.Group();group.name=region.title;group.position.fromArray(region.origin);
  const colliders=new Colliders();const village=new Village({scene:group,terrain,colliders});
  progress('Growing Tidewater’s palms and forest');await nextFrame();
  const originalHeight=terrain.heightAt.bind(terrain),[x0,z0,x1,z1]=region.bounds;
  terrain.heightAt=(x,z)=>x<x0+12||x>x1-12||z<z0+12||z>z1-12?-90:originalHeight(x,z);
  const vegetation=new Vegetation({scene:group,terrain,village});terrain.heightAt=originalHeight;
  // The standalone demo writes motion vectors to its own MRT. Our shared renderer has one color target.
  group.traverse(o=>{if(o.material)for(const m of [].concat(o.material))m.mrtNode=null;});
  const localCamera=new THREE.PerspectiveCamera();let mapVegetation;
  return {group,terrain,colliders,village,vegetation,
    update(dt,camera,active) {
      village.update(dt);
      localCamera.copy(camera);localCamera.position.copy(camera.position).sub(group.position);localCamera.updateMatrixWorld();vegetation.update(dt,localCamera);
    },
    updateOverview(dt,camera,renderer){
      if(!mapVegetation){
        mapVegetation=new THREE.Group();mapVegetation.name='Tidewater source trees · overview LOD';group.add(mapVegetation);
        for(const type of [vegetation.palms,vegetation.canopy,...(vegetation.coastTypes??[])]){
          const parts=type.near.meshes.map(m=>({geometry:m.geometry.clone(),material:m.material,castShadow:m.castShadow,name:m.name+'-overview'}));
          const level=new LodLevel(parts,type.inst.count,new THREE.Vector3(0,1e6,1e6));level.fill(type.inst);
          for(const mesh of level.meshes){mesh.layers.set(3);mapVegetation.add(mesh);}
        }
        mapVegetation.visible=false;
      }
      if(!vegetation.leafAtlas.baked)vegetation.leafAtlas.bake(renderer);
      const visible=vegetation.group.visible,coastVisible=vegetation.coastGroup?.visible,oldCamera=uCamPos.value.clone(),near=uCanopyNear.value.clone();
      if(vegetation.coastGroup)vegetation.coastGroup.visible=false;
      vegetation.group.visible=false;mapVegetation.visible=true;
      uCamPos.value.copy(camera.position).sub(group.position);uCanopyNear.value.set(1e6,1e6);village.update(dt);
      return()=>{vegetation.group.visible=visible;if(vegetation.coastGroup)vegetation.coastGroup.visible=coastVisible;mapVegetation.visible=false;uCamPos.value.copy(oldCamera);uCanopyNear.value.copy(near);};
    },
    dispose(){village.dispose();vegetation.dispose();}
  };
}
export async function loadPunk(region,scene,renderer,camera,progress,{overview=false}={}) {
  progress('Unpacking the original Punk city');
  const [{city},billboards,quadra]=await Promise.all([loadCityModel(renderer),loadBillboards(renderer),loadQuadraCar(renderer)]);
  const group=new THREE.Group();group.name=region.title;group.position.fromArray(region.origin);group.add(city,billboards,quadra.car,quadra.collider);scene.add(group);group.updateMatrixWorld(true);
  const billboardMaterials=applyBillboardMaterials(billboards);
  const ground=createGround(scene,{size:400,y:region.origin[1]-5.4,fogNear:170,fogFar:330,reflectionStrength:.13});ground.mesh.position.x=region.origin[0];ground.mesh.position.z=region.origin[2];
  // Rain height queries only need city geometry, not displaced plants from other regions.
  const rainCollisionLayer=2;group.traverse(o=>o.layers.enable(rainCollisionLayer));ground.mesh.layers.enable(rainCollisionLayer);
  const height=overview?null:createCollisionHeight({scene,renderer,resolution:256});height?.collision.camera.layers.set(rainCollisionLayer);
  const rain=overview?null:await createCollisionRain({scene,renderer,collisionHeight:height,camera,count:1200});if(rain)camera.layers.enable(rain.layer);
  rain?.setEnabled(false);let rainEnabled=true,reflectionsEnabled=true;
  return {group,city,billboards,quadra,ground,rain,setEffects(rainValue,reflectionValue){rainEnabled=rainValue;reflectionsEnabled=reflectionValue;ground.setReflectionEnabled(reflectionValue);},
    update(dt,active){
      ground.mesh.visible=active;rain.setEnabled(active&&rainEnabled);ground.update(dt);
      billboardMaterials.billboard?.update?.(camera);
      if(active){
        // The original city passes assume a city-only render list. Keep distant source
        // vegetation out of both the height override and the street mirror pass.
        const hidden=scene.children.filter(o=>o.visible&&o!==group&&o!==ground.mesh&&o!==rain.group&&!o.isLight&&o.name!=='Shared sky');
        for(const o of hidden)o.visible=false;
        try{if(rainEnabled){height.update({camera,hideObjects:[rain.group]});rain.update(dt,camera);quadra.surfaceRain?.update?.(dt,camera);}if(reflectionsEnabled)ground.updateReflection(renderer,camera);}
        finally{for(const o of hidden)o.visible=true;}
      }
    },
    overview(dt,mapCamera){ground.setReflectionEnabled(false);ground.update(dt);billboardMaterials.billboard?.update?.(mapCamera);},
    pause(){rain?.setEnabled(false);const farCamera={position:new THREE.Vector3(1e6,0,1e6)};billboardMaterials.billboard?.update(farCamera);},
    dispose(){rain?.dispose();height?.dispose();ground.dispose();billboardMaterials.dispose();}
  };
}
export function updateSourceGlobals(dt,time,night) {G.time.value=time;G.dt.value=dt;G.night.value=night;}
