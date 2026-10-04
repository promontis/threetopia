import * as T from 'three';
import {createTerrainMaterial} from '../../packages/platform/terrain-material.js';
import {BOUNDS} from '../tiles/lite/landscape';
import {LatestWorker} from './latest-worker';
import type {WaterBake} from './registry-water-bake';
/** The visible host and its water are committed together. Keep the previous
 * scene drawing while a worker prepares the next exact-resolution depth field. */
export function registryWater(world:any){
 const original=world.ocean.material.uniforms.uGround.value;
 const worker=new Worker(new URL('./registry-water.worker.ts',import.meta.url),{type:'module'});
 worker.postMessage({surface:world.landscapeSurface});
 const jobs=new LatestWorker<any[],WaterBake>(worker);
 type Prepared={texture:T.DataTexture;shelf:T.Mesh;bounds:WaterBake['bounds']};
 const cache=new Map<string,Prepared>();let current:Prepared|undefined,disposed=false,revision=0;
 const release=(entry:Prepared)=>{entry.texture.dispose();entry.shelf.geometry.dispose();(entry.shelf.material as T.Material).dispose();entry.shelf.removeFromParent();};
 function trim(){for(const [key,value]of cache){if(cache.size<=4)break;if(value!==current){cache.delete(key);release(value);}}}
 return {async prepare(contracts:any[]){
  const ticket=++revision; jobs.cancel();
  const signature=JSON.stringify(contracts.map(t=>[t.version,t.q,t.r,t.variant,t.rotation,t.legacyEdges]));
  let next=cache.get(signature);
  if(contracts.length&&!next){
   const bake=await jobs.run(contracts);if(!bake||disposed||ticket!==revision)return null;
   const texture=new T.DataTexture(bake.data,bake.size,bake.size,T.RGBAFormat,T.FloatType);texture.name='Island depth and shore-distance field';texture.minFilter=texture.magFilter=T.LinearFilter;texture.needsUpdate=true;
   const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(bake.position,3));geometry.setAttribute('normal',new T.BufferAttribute(bake.normal,3));geometry.setAttribute('color',new T.BufferAttribute(bake.color,3));
   const shelf=new T.Mesh(geometry,createTerrainMaterial());shelf.name='Shared coastal apron';shelf.receiveShadow=true;
   next={texture,shelf,bounds:bake.bounds};cache.set(signature,next);
  }
  if(next){cache.delete(signature);cache.set(signature,next);}
  return ()=>{if(disposed||ticket!==revision)return false;if(current!==next){current?.shelf.removeFromParent();current=next;if(world.terrain)world.terrain.background.visible=!next;if(next)world.scene.add(next.shelf);world.ocean.setTerrainDepth(next?.texture||original,next?.bounds||world.terrain?.bounds||BOUNDS);}trim();return true;};
 },dispose(){disposed=true;revision++;jobs.dispose();if(world.terrain)world.terrain.background.visible=true;world.ocean.setTerrainDepth(original,world.terrain?.bounds||BOUNDS);for(const value of cache.values())release(value);cache.clear();}};
}
