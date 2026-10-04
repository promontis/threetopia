import * as T from 'three';
import {createTerrainMaterial} from './terrain-material.js';
import {surfaceNoise} from './terrain-noise.js';
const hostTime={value:0};
export const setHostTime=time=>{hostTime.value=time;};
function deform(material,kind,scale){
 if(!['leaves','engine'].includes(kind))return material;
 material.onBeforeCompile=shader=>{
  shader.uniforms.uHostTime=hostTime;shader.uniforms.uHostScale={value:scale};
  shader.vertexShader='uniform float uHostTime;uniform float uHostScale;\n'+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
   vec3 hp=position*uHostScale;
   ${kind==='leaves'?'transformed.x+=sin(uHostTime*1.15+hp.z*.67)*smoothstep(.45,2.9,hp.y)*.018/uHostScale;transformed.z+=cos(uHostTime*.81+hp.x*.5)*smoothstep(.5,3.1,hp.y)*.012/uHostScale;':'transformed.y+=sin(uHostTime*1.7+hp.y*3.2+hp.x*.3)*.055/uHostScale;'}
  `);
 };
 material.customProgramCacheKey=()=>`host-motion-1-${kind}`;return material;
}
export function createHostDepthMaterial(kind,scale=1){return kind==='leaves'?deform(new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking}),kind,scale):undefined;}
/** Small shared material library; no unique texture or WebGL context per tile. */
export function createHostMaterial(kind,scale=1,sand='#d4c4a0'){
 if(kind==='terrain')return createTerrainMaterial(scale,sand);
 const m=new T.MeshStandardMaterial({vertexColors:true,roughness:kind==='metal'?.64:.91,metalness:kind==='metal'?.28:0,side:kind==='leaves'?T.DoubleSide:T.FrontSide,flatShading:kind==='stone'});
 m.userData.hostSurface={kind,scale,sand};
 if(kind==='neon'||kind==='engine'){m.emissive.set('#0e95cb');m.emissiveIntensity=1.7;m.toneMapped=false;return deform(m,kind,scale);}
 if(kind==='leaves'||kind==='flowers')return deform(m,kind,scale);
 m.onBeforeCompile=shader=>{
  shader.uniforms.uHostScale={value:scale};
  shader.vertexShader='varying vec3 vHostPoint;uniform float uHostScale;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvHostPoint=position*uHostScale;');
  shader.fragmentShader='varying vec3 vHostPoint;\n'+surfaceNoise+shader.fragmentShader;
  let detail='float fleck=mapNoise(vHostPoint.xz*26.);diffuseColor.rgb*=.93+fleck*.12;';
  if(kind==='stone')detail+='float strata=mapNoise(vec2(vHostPoint.x*.55+vHostPoint.z*.31,vHostPoint.y*8.));diffuseColor.rgb*=.87+strata*.23;';
  if(kind==='paving')detail+='vec2 p=vHostPoint.xz*3.0;vec2 f=fract(p);vec2 aa=max(fwidth(p),vec2(.006));vec2 seam=smoothstep(vec2(.015),vec2(.015)+aa,min(f,1.-f));diffuseColor.rgb*=.86+.14*min(seam.x,seam.y);';
  if(kind==='wood')detail+='float grain=mapNoise(vec2(vHostPoint.x*5.,vHostPoint.z*45.));diffuseColor.rgb*=.86+.26*grain;';
  if(kind==='metal')detail+='vec2 p=vHostPoint.xz*1.65;vec2 f=fract(p);vec2 aa=max(fwidth(p),vec2(.003));vec2 seam=smoothstep(vec2(.008),vec2(.008)+aa,min(f,1.-f));diffuseColor.rgb*=.80+.20*min(seam.x,seam.y);';
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n'+detail);
 };
 m.customProgramCacheKey=()=>`host-kit-1-${kind}`;
 return m;
}
