import {centre,MAP_SCALE,corners} from './legacy-tiles.js';
import {hostHeight} from './wang.js';
import {BUILTIN_TILES,authoredLandscape} from './builtin-tiles.js';
import {noise,smooth} from './authored-landscape.js';
export const hexDistance=(x,z)=>Math.max(Math.abs(x),Math.abs(x)*.5+Math.abs(z)*Math.sqrt(3)/2)-Math.sqrt(3)*4.5;
const cs=corners(9);
/** Tile ownership is exclusive. A new river replaces terrain in its footprint;
 * it is never max-composited over the old island's land or submerged apron. */
export function createTerrainField(contracts,cache=new Map()){
 const tiles=[...BUILTIN_TILES,...contracts],hosts=tiles.map(tile=>{
  const c=centre(tile.q,tile.r,MAP_SCALE),key=JSON.stringify([tile.version,tile.q,tile.r,tile.variant,tile.rotation,tile.legacyEdges]),n=97,step=18/(n-1);let grid=cache.get(key);
  if(!grid){grid=new Float32Array(n*n);for(let j=0;j<n;j++)for(let i=0;i<n;i++)grid[j*n+i]=hostHeight(tile,(-9+i*step)/MAP_SCALE,(-9+j*step)/MAP_SCALE,{paths:false})*MAP_SCALE;cache.set(key,grid);}
  const sample=(x,z)=>{const gx=(x+9)/step,gz=(z+9)/step,ix=Math.max(0,Math.min(n-2,Math.floor(gx))),iz=Math.max(0,Math.min(n-2,Math.floor(gz))),u=gx-ix,v=gz-iz;return (grid[iz*n+ix]*(1-u)+grid[iz*n+ix+1]*u)*(1-v)+(grid[(iz+1)*n+ix]*(1-u)+grid[(iz+1)*n+ix+1]*u)*v;};
  return {tile,c,sample};
 });
 if(cache.size>40)cache.clear();
 function heightAt(x,z){
  for(let i=hosts.length-1;i>=0;i--){const h=hosts[i],px=x-h.c.x,pz=z-h.c.z;if(hexDistance(px,pz)<=.000001)return h.sample(px,pz);}
  let y=authoredLandscape.heightAt(x,z);
  for(const h of hosts){if(h.tile.builtin)continue;const px=x-h.c.x,pz=z-h.c.z,sd=hexDistance(px,pz);if(sd>4.3)continue;
   let nearest=Infinity,bx=0,bz=0;
   for(let i=0;i<6;i++){const a=cs[i],b=cs[(i+1)%6],dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((px-a[0])*dx+(pz-a[1])*dz)/(dx*dx+dz*dz))),xx=a[0]+dx*t,zz=a[1]+dz*t,d=Math.hypot(px-xx,pz-zz);if(d<nearest){nearest=d;bx=xx;bz=zz;}}
   const edge=h.sample(bx,bz);
   if(h.tile.version>=4&&(h.tile.recipe.floating||['canal','docks','boulevard'].includes(h.tile.recipe.kind))){const bed=edge<-.05?edge:-1.6,blend=smooth(0,4.3,nearest);y=bed*(1-blend)+Math.min(y,-3.6)*blend;continue;}
   const width=2.1+noise(x*.7,z*.7)*1.2,t=smooth(0,width,nearest),apron=edge*(1-t)-3.6*t;
   const outer=smooth(width,4.3,nearest);y=Math.max(y,apron*(1-outer)-10*outer);
  }
  return y;
 }
 return {hosts,heightAt};
}
/** Remove the inside of a convex hex from a surface triangle. Only boundary
 * cells need this operation; cells fully inside a host never make a seabed face. */
export function subtractHex(polygon,c){
 let inside=polygon,out=[];
 for(let i=0;i<6&&inside.length;i++){
  const a=[cs[i][0]+c.x,cs[i][1]+c.z],b=[cs[(i+1)%6][0]+c.x,cs[(i+1)%6][1]+c.z];
  const side=p=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]);
  const clip=(keepInside)=>{const result=[];for(let j=0;j<inside.length;j++){const p=inside[j],q=inside[(j+1)%inside.length],sp=side(p),sq=side(q),ip=keepInside?sp>=-1e-9:sp<=1e-9,iq=keepInside?sq>=-1e-9:sq<=1e-9;if(ip)result.push(p);if(ip!==iq){const t=sp/(sp-sq);result.push([p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t]);}}return result;};
  const outside=clip(false);if(outside.length>=3)out.push(outside);inside=clip(true);
 }
 return out;
}
