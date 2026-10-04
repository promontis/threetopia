import * as T from 'three';
import {createWaterBathymetry} from '../tiles/lite/water-bathymetry';
import {BOUNDS} from '../../packages/platform/authored-landscape.js';
import {createTerrainField,hexDistance,subtractHex} from '../../packages/platform/tile-terrain.js';
import {backgroundColor} from '../../packages/platform/terrain-surface.js';
import {designColor} from '../../packages/platform/render-v4.js';
import {rotate} from '../../packages/platform/wang-v4.js';
export interface WaterBake {bounds:{x:number;z:number;width:number;depth:number};data:Float32Array;size:number;position:Float32Array;normal:Float32Array;color:Float32Array}
/** One field drives the optical depth and the visible coast outside host tiles. */
export function createRegistryWaterBaker(_heightAt?:(x:number,z:number)=>number){
 const cache=new Map<string,Float32Array>();
 return (contracts:any[]):WaterBake=>{
  const {hosts,heightAt}=createTerrainField(contracts,cache);
  const x=Math.min(BOUNDS.x,...hosts.map(h=>h.c.x-13.5)),z=Math.min(BOUNDS.z,...hosts.map(h=>h.c.z-13.5));
  const bounds={x,z,width:Math.max(BOUNDS.x+BOUNDS.width,...hosts.map(h=>h.c.x+13.5))-x,depth:Math.max(BOUNDS.z+BOUNDS.depth,...hosts.map(h=>h.c.z+13.5))-z};
  const p:number[]=[],colors:number[]=[],normals:number[]=[],vertices=new Map<string,{y:number;color:number[];normal:number[]}>(),n=220,dx=bounds.width/n,dz=bounds.depth/n,margin=Math.hypot(dx,dz);
  const vertex=(v:number[])=>{const key=v.map(n=>n.toFixed(6)).join(',');let saved=vertices.get(key);if(!saved){const y=heightAt(v[0],v[1]),e=.12,normal=new T.Vector3(heightAt(v[0]-e,v[1])-heightAt(v[0]+e,v[1]),2*e,heightAt(v[0],v[1]-e)-heightAt(v[0],v[1]+e)).normalize().toArray();
   const host=hosts.filter(h=>h.tile.version>=4).map(h=>({h,d:hexDistance(v[0]-h.c.x,v[1]-h.c.z)})).sort((a,b)=>a.d-b.d)[0];
   let color=backgroundColor(v[0],v[1],y);if(host&&host.d<3.8){const local=rotate([(v[0]-host.h.c.x)/.03,(v[1]-host.h.c.z)/.03],-host.h.tile.rotation);color=designColor(host.h.tile,...local,y/.03);}
   saved={y,color:color.toArray(),normal};vertices.set(key,saved);}p.push(v[0],saved.y,v[1]);colors.push(...saved.color);normals.push(...saved.normal);};
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){
   const x=bounds.x+i*dx,z=bounds.z+j*dz,mx=x+dx*.5,mz=z+dz*.5;
   if(hosts.some(h=>hexDistance(mx-h.c.x,mz-h.c.z)<-margin))continue;
   const near=hosts.filter(h=>hexDistance(mx-h.c.x,mz-h.c.z)<margin);
   let polygons=[[[x,z],[x,z+dz],[x+dx,z]],[[x+dx,z],[x,z+dz],[x+dx,z+dz]]];
   for(const h of near)polygons=polygons.flatMap(p=>subtractHex(p,h.c));
   for(const poly of polygons)for(let k=1;k<poly.length-1;k++){vertex(poly[0]);vertex(poly[k]);vertex(poly[k+1]);}
  }
  
  const texture=createWaterBathymetry(heightAt,bounds),data=texture.image.data as Float32Array;
  const result={bounds,data,size:texture.image.width,position:new Float32Array(p),normal:new Float32Array(normals),color:new Float32Array(colors)};
  texture.dispose();return result;
 };
}
