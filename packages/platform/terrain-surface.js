import * as T from 'three';
import {hostHeight,tileFootprint} from './wang.js';
import {authoredSample,authoredLandscape} from './builtin-tiles.js';
import {centre,MAP_SCALE} from './legacy-tiles.js';
import {noise,smooth,mix} from './authored-landscape.js';
const palettes={dunes:['#aa9b6c','#d4c4a0'],oasis:['#7e9057','#d4c4a0'],pine:['#57724b','#d4c4a0'],highland:['#718066','#c7c0a8'],volcanic:['#5c6b58','#7d8280'],basalt:['#677360','#9d9e8c'],canyon:['#957557','#cbb294'],tundra:['#9eaea0','#c3c8b9'],scifi:['#334c59','#829b9d'],urban:['#87918a','#bbb9a4'],industrial:['#657570','#979c90']};
const distance=(x,z,a,b)=>{const dx=b[0]-a[0],dz=b[2]-a[2],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[2])*dz)/(dx*dx+dz*dz||1)));return Math.hypot(x-a[0]-t*dx,z-a[2]-t*dz);};
export function createTileSurface(tile){
 const c=centre(tile.q,tile.r,MAP_SCALE),palette=(tile.builtin?null:palettes[tile.recipe.family])||['#668447','#d4c4a0'];
 const sand=new T.Color(palette[1]),grass=new T.Color(palette[0]),wet=new T.Color('#9da589'),rock=new T.Color('#a6a397');
 const routes=tile.builtin?[]:tileFootprint(tile).routes;
 const pathAt=(x,z)=>{if(tile.builtin)return authoredSample(tile,x,z).path;let d=Infinity;for(const line of routes)for(let i=1;i<line.length;i++)d=Math.min(d,distance(x,z,line[i-1],line[i]));return 1-smooth(8,23,d);};
 function colorAt(x,z,y=hostHeight(tile,x,z),slope=0){
  const wx=c.x+x*MAP_SCALE,wz=c.z+z*MAP_SCALE,ym=y*MAP_SCALE,p=pathAt(x,z);
  const g=(1-p)*mix(.57,1,noise(wx*.31,wz*.31))*(tile.builtin?1-.35*(1-smooth(6.2,8.1,Math.hypot(wx,wz))):1);
  return sand.clone().lerp(grass,smooth(.15,.68,g)).lerp(rock,smooth(.8,1.8,slope)*.45).multiplyScalar(.93+.13*noise(wx*1.4,wz*1.4));
 }
 return {pathAt,colorAt,sand:palette[1],heightAt:(x,z)=>hostHeight(tile,x,z)};
}
export function backgroundColor(x,z,y){const s=authoredLandscape,g=(1-s.pathAt(x,z))*mix(.57,1,noise(x*.31,z*.31));return new T.Color('#d4c4a0').lerp(new T.Color('#668447'),smooth(.15,.68,g)).multiplyScalar(.93+.13*noise(x*1.4,z*1.4));}
