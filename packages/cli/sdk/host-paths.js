import * as T from 'three';
import {designFootprint,segment,smooth} from './wang-v4.js';
/** A compact exact route mask, baked off-thread. The route is shaded into the
 * ground itself, eliminating floating ribbons, sawtooth joints and z-fighting. */
export function bakeHostPaths(tile,size=256){
 const bins=new Map(),cell=24,lines=designFootprint(tile).routes,entries=[];
 for(const line of lines)for(let i=1;i<line.length;i++){
  const a=line[i-1],b=line[i],entry={a,b};entries.push(entry);
  for(let y=Math.floor((Math.min(a[2],b[2])-15)/cell);y<=Math.floor((Math.max(a[2],b[2])+15)/cell);y++)for(let x=Math.floor((Math.min(a[0],b[0])-15)/cell);x<=Math.floor((Math.max(a[0],b[0])+15)/cell);x++){
   const key=x+':'+y,bucket=bins.get(key)||[];bucket.push(entry);bins.set(key,bucket);
  }
 }
 const bytes=new Uint8Array(size*size);
 for(let j=0;j<size;j++)for(let i=0;i<size;i++){
  const x=(i+.5)/size*600-300,z=(j+.5)/size*600-300,bucket=bins.get(Math.floor(x/cell)+':'+Math.floor(z/cell));let d=Infinity;
  if(bucket)for(const s of bucket)d=Math.min(d,segment(x,z,s.a,s.b).d);
  bytes[j*size+i]=Math.round(255*(1-smooth((d-7.5)/5)));
 }
 return {bytes,size};
}
export function pathTexture({bytes,size}){
 const texture=new T.DataTexture(bytes,size,size,T.RedFormat,T.UnsignedByteType);texture.generateMipmaps=true;texture.minFilter=T.LinearMipmapLinearFilter;texture.magFilter=T.LinearFilter;texture.needsUpdate=true;return texture;
}
export function applyHostPaths(material,texture,{finish='natural',pathColor='#c8b792',sand='#d4c4a0'}={}){
 const previous=material.onBeforeCompile;material.hostPathTexture=texture;
 material.userData.hostSurface={kind:'terrain',finish,pathColor,sand};
 material.onBeforeCompile=shader=>{
  previous(shader);shader.uniforms.uHostPaths={value:texture};shader.uniforms.uHostPathColor={value:new T.Color(pathColor)};
  shader.vertexShader='varying vec2 vHostPathUv;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvHostPathUv=position.xz*uTerrainScale/18.+.5;');
  shader.fragmentShader='varying vec2 vHostPathUv;uniform sampler2D uHostPaths;uniform vec3 uHostPathColor;\n'+shader.fragmentShader;
  const paved=finish==='paved'?`vec2 pave=vHostPathUv*vec2(110.,110.);vec2 f=fract(pave);vec2 aa=max(fwidth(pave),vec2(.01));vec2 joint=smoothstep(vec2(.016),vec2(.016)+aa,min(f,1.-f));diffuseColor.rgb*=.92+.08*min(joint.x,joint.y);`:'';
  shader.fragmentShader=shader.fragmentShader.replace('float grain=mapNoise(vGround.xz*35.);',`float hostPath=texture2D(uHostPaths,vHostPathUv).r*smoothstep(.29,.62,vGround.y);diffuseColor.rgb=mix(diffuseColor.rgb,uHostPathColor,hostPath*.86);${paved}\nfloat grain=mapNoise(vGround.xz*35.);`);
 };
 material.customProgramCacheKey=()=>`threetopia-host-ground-4-${finish}`;
}
