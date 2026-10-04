import * as T from 'three';
import {BUILTIN_TILES} from '../../../packages/platform/builtin-tiles.js';
import {centre,MAP_SCALE} from '../../../packages/platform/tiles.js';
import {disposeObject} from '../../../packages/platform/render.js';
import {createTerrainMaterial,setTerrainWaterDetail} from '../../../packages/platform/terrain-material.js';
import {createHostLoader} from '../../creators/host-loader';
import {LatestWorker} from '../../creators/latest-worker';
import type {WaterBake} from '../../creators/registry-water-bake';
/** Every original world has an independently owned host mesh. The ocean apron
 * has exact holes at their boundaries, so there is no hidden island under them. */
export async function createTerrain(){
 const mesh=new T.Group();mesh.name='Original host tiles and coastal apron';
 const loader=createHostLoader(),worker=new Worker(new URL('../../creators/registry-water.worker.ts',import.meta.url),{type:'module'}),water=new LatestWorker<any[],WaterBake>(worker);
 worker.postMessage({surface:true});const bakePromise=water.run([]);void bakePromise.catch(()=>{});
 const hosts=new Map<string,T.Group>();
 try{
  for(const contract of BUILTIN_TILES){const host=await loader.load(contract,{map:true});if(!host)throw Error('Original terrain was interrupted.');const c=centre(contract.q,contract.r,MAP_SCALE);host.position.set(c.x,0,c.z);hosts.set(contract.builtin,host);mesh.add(host);}
  const bake=await bakePromise;if(!bake)throw Error('Coastline was interrupted.');
  const depth=new T.DataTexture(bake.data,bake.size,bake.size,T.RGBAFormat,T.FloatType);depth.minFilter=depth.magFilter=T.LinearFilter;depth.needsUpdate=true;
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(bake.position,3));geometry.setAttribute('normal',new T.BufferAttribute(bake.normal,3));geometry.setAttribute('color',new T.BufferAttribute(bake.color,3));
  const background=new T.Mesh(geometry,createTerrainMaterial());background.name='Original coastal apron';background.receiveShadow=true;mesh.add(background);
  return {mesh,hosts,background,depth,bounds:bake.bounds,setWaterDetail:setTerrainWaterDetail,setOverview(_low:boolean){},dispose(){for(const host of hosts.values())disposeObject(host);disposeObject(mesh);depth.dispose();setTerrainWaterDetail(null);}};
 }catch(error){for(const host of hosts.values())disposeObject(host);throw error;}
 finally{loader.dispose();water.dispose();}
}
