import * as T from 'three';
import {glslCore} from 'three-fenestra';
import {validateLandmarkMetrics} from '../../../packages/world-map/tile-slot.js';
import type {loadLandmark} from '../../../packages/world-map/landmark.js';
import {surfaceNoise} from './materials';

type Asset=Awaited<ReturnType<typeof loadLandmark>>;
export interface PunkInteriors {
  package:'three-fenestra';version:string;panes?:number;mode?:'native-facades';
  textures:Array<{url:string;size:number;bytes:number}>;
}

/** The public Fenestra GLSL API supports merged facades. Each original pane
 * carries its own local room frame inside the budgeted GLB: no overlay, extra
 * meshes, instances, transparent surfaces or per-window draw calls. */
export async function installPunkMaterials(assets:Asset[],manifest:PunkInteriors,base:URL,signal:AbortSignal){
  const loaded=await Promise.allSettled(manifest.textures.map(async spec=>{
    const response=await fetch(new URL(spec.url,base),{signal});if(!response.ok)throw Error('Could not load Punk interiors.');
    const data=await response.arrayBuffer();if(data.byteLength!==spec.bytes)throw Error('Punk interior asset size changed.');
    const bitmap=await createImageBitmap(new Blob([data],{type:'image/webp'}),{imageOrientation:'flipY'});
    if(bitmap.width!==spec.size||bitmap.height!==spec.size||spec.size>512){bitmap.close();throw Error('Punk interior atlas exceeds its budget.');}
    const texture=new T.Texture(bitmap);texture.flipY=false;texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;texture.needsUpdate=true;
    return {texture,bitmap,bytes:data.byteLength};
  }));
  const textures=loaded.flatMap(r=>r.status==='fulfilled'?[r.value]:[]);
  const dispose=()=>textures.forEach(t=>{t.texture.dispose();t.bitmap.close();});
  if(signal.aborted||loaded.some(r=>r.status==='rejected')){dispose();throw Error('Could not load Punk interiors.');}
  const [rooms,overlay]=textures;
  try{
    for(const asset of assets){
      // Count the two shared atlases as part of every LOD, including their
      // encoded bytes and decoded mip chains, before mounting the component.
      asset.metrics.bytes+=textures.reduce((n,t)=>n+t.bytes,0);
      asset.metrics.textures+=textures.length;
      asset.metrics.textureBytes+=textures.reduce((n,t)=>n+t.bitmap.width*t.bitmap.height*4*4/3,0);
      const errors=validateLandmarkMetrics(asset.metrics,asset.lod);if(errors.length)throw Error(errors.join(' '));
      asset.root.traverse(object=>{
        const mesh=object as T.Mesh;if(!mesh.isMesh)return;
        if(mesh.userData.role==='structure'&&manifest.mode==='native-facades'){
          installNativeFacades(mesh,rooms.texture,overlay.texture);return;
        }
        if(mesh.userData.role==='structure'){
          const material=mesh.material as T.MeshStandardMaterial;
          material.roughness=.82;material.metalness=.1;material.envMapIntensity=.8;
          material.onBeforeCompile=shader=>{
            shader.vertexShader='varying vec3 vDistrictPosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvDistrictPosition=position;');
            shader.fragmentShader='varying vec3 vDistrictPosition;\n'+surfaceNoise+shader.fragmentShader;
            shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
              float wear=mapNoise(vDistrictPosition.xy*14.)*.5+mapNoise(vDistrictPosition.zy*14.)*.5;
              diffuseColor.rgb*=.9+.16*wear;
            `);
          };
          material.customProgramCacheKey=()=> 'punk-procedural-concrete-v1';
        }
        if(mesh.userData.role!=='windows')return;
        const material=new T.MeshStandardMaterial({color:'#344a58',metalness:.2,roughness:.22,envMapIntensity:1});
        material.name='three-fenestra 0.3.0 / merged window interiors';
        material.userData.fenestraVersion=manifest.version;
        material.onBeforeCompile=shader=>{
          shader.uniforms.uRooms={value:rooms.texture};shader.uniforms.uCurtains={value:overlay.texture};
          shader.vertexShader=`
            attribute vec3 _im_center;attribute vec3 _im_size;
            varying vec2 vRoomXY;varying vec3 vRoomCamera;varying vec3 vRoomId;
          `+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
            vec3 roomNormal=normalize(mat3(modelMatrix)*normal);
            vec3 roomRight=normalize(cross(vec3(0.,1.,0.),roomNormal));
            vec3 roomCentre=(modelMatrix*vec4(_im_center,1.)).xyz;
            float roomScale=length(modelMatrix[0].xyz);
            vec2 roomSize=_im_size.xy*roomScale;
            vec3 roomDelta=(modelMatrix*vec4(position,1.)).xyz-roomCentre;
            vRoomXY=vec2(dot(roomDelta,roomRight),roomDelta.y)/roomSize;
            // An orthographic map has parallel view rays. The same room frame
            // works in perspective if this material is reused by a preview.
            vec3 eye=cameraPosition-roomCentre;
            if(isOrthographic)eye=roomDelta+vec3(viewMatrix[0][2],viewMatrix[1][2],viewMatrix[2][2])*1000.;
            vRoomCamera=vec3(dot(eye,roomRight)/roomSize.x,eye.y/roomSize.y,dot(eye,roomNormal)/max(roomSize.x,roomSize.y));
            vRoomId=_im_center;
          `);
          shader.fragmentShader=`
            uniform sampler2D uRooms;uniform sampler2D uCurtains;
            varying vec2 vRoomXY;varying vec3 vRoomCamera;varying vec3 vRoomId;
          `+glslCore+shader.fragmentShader;
          shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
            vec2 roomUV=imRoomBoxUV(vRoomCamera,vRoomXY,.7,.65);
            vec3 roomPhoto=texture2D(uRooms,imAtlasUV(roomUV,vRoomId,4.,4.,1.17)).rgb;
            vec4 curtain=texture2D(uCurtains,imAtlasUV(vRoomXY+.5,vRoomId,4.,4.,7.91));
            diffuseColor.rgb=mix(vec3(.015,.025,.032),curtain.rgb,curtain.a*.78);
            vec3 roomGlow=imWindowEmissive(vRoomId,.64,vec3(1.55,1.04,.57),vec3(.36,1.15,1.6),.3,vec2(.36,.38),vec3(.08,.14,.18));
          `).replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
            totalEmissiveRadiance+=roomPhoto*roomGlow*(1.-curtain.a*.8);
          `);
        };
        material.customProgramCacheKey=()=> 'punk-fenestra-0.3.0-merged-v1';
        (mesh.material as T.Material).dispose();mesh.material=material;
        mesh.castShadow=false;mesh.receiveShadow=true;
      });
    }
  }catch(error){dispose();throw error;}
  return dispose;
}

/** Fenestra and physical surface types share the native architecture's draw.
 * The authored glass mask confines interiors to the original window faces. */
function installNativeFacades(mesh:T.Mesh,rooms:T.Texture,curtains:T.Texture){
  const material=mesh.material as T.MeshStandardMaterial;
  material.envMapIntensity=1.05;material.userData.fenestraVersion='0.3.0';
  material.onBeforeCompile=shader=>{
    shader.uniforms.uRooms={value:rooms};shader.uniforms.uCurtains={value:curtains};
    shader.vertexShader=`attribute vec3 _surface;varying vec3 vSurface;varying vec3 vDistrictPosition;
      varying vec2 vFacadeXY;varying vec3 vFacadeCamera;varying vec3 vFacadePlane;
      `+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      vSurface=_surface;vDistrictPosition=position;
      vec3 right=normalize(vec3(normal.z,0.,-normal.x)+vec3(.00001,0.,0.));
      vFacadeXY=vec2(dot(position,right),position.y);
      vFacadePlane=vec3(normal.x,normal.z,dot(position,normal));
      vec3 roomNormal=normalize(mat3(modelMatrix)*normal),roomRight=normalize(mat3(modelMatrix)*right);
      vec3 eye=cameraPosition-(modelMatrix*vec4(position,1.)).xyz;
      if(isOrthographic)eye=vec3(viewMatrix[0][2],viewMatrix[1][2],viewMatrix[2][2])*1000.;
      vFacadeCamera=vec3(dot(eye,roomRight),eye.y,dot(eye,roomNormal))/length(modelMatrix[0].xyz);
    `);
    shader.fragmentShader=`uniform sampler2D uRooms;uniform sampler2D uCurtains;
      varying vec3 vSurface;varying vec3 vDistrictPosition;varying vec2 vFacadeXY;varying vec3 vFacadeCamera;varying vec3 vFacadePlane;
      `+surfaceNoise+glslCore+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      float wear=mapNoise(vDistrictPosition.xy*18.)*.5+mapNoise(vDistrictPosition.zy*18.)*.5;
      diffuseColor.rgb*=.88+.22*wear;
      vec3 roomLight=vec3(0.);
      if(vSurface.x>.5){
        vec2 cellSize=vSurface.x>1.5?vec2(.21,.25):vec2(.23,.30);
        vec2 cell=floor(vFacadeXY/cellSize),xy=fract(vFacadeXY/cellSize)-.5;
        // A window must keep one room, curtain and light colour throughout
        // its pane. Hashing interpolated position selected a different atlas
        // cell at every pixel, creating shards and unstable bright fragments.
        vec3 plane=floor(vFacadePlane*1024.+.5);
        vec3 id=vec3(cell,dot(plane,vec3(.031,.071,.013)));
        // The varying eye is relative to the fragment; Fenestra expects the
        // eye relative to the window centre, including orthographic views.
        vec3 roomCamera=vFacadeCamera/vec3(cellSize,max(cellSize.x,cellSize.y))+vec3(xy,0.);
        vec2 roomUV=imRoomBoxUV(roomCamera,xy,.7,.65);
        vec3 room=texture2D(uRooms,imAtlasUV(roomUV,id,4.,4.,1.17)).rgb;
        vec4 curtain=texture2D(uCurtains,imAtlasUV(xy+.5,id,4.,4.,7.91));
        vec2 border=1.-smoothstep(vec2(.38,.36),vec2(.44,.44),abs(xy));
        float pane=border.x*border.y;
        diffuseColor.rgb=mix(vec3(.01,.015,.021),curtain.rgb*.25,pane*curtain.a);
        roomLight=room*imWindowEmissive(id,.57,vec3(1.3,.65,.22),vec3(.12,.85,1.25),.25,vec2(.36,.38),vec3(.02,.04,.06))*(1.-curtain.a*.85)*pane;
      }
    `).replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
      roughnessFactor=vSurface.y;
    `).replace('#include <metalnessmap_fragment>',`#include <metalnessmap_fragment>
      metalnessFactor=vSurface.z;
    `).replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
      totalEmissiveRadiance+=roomLight;
    `);
  };
  material.customProgramCacheKey=()=> 'punk-fenestra-0.3.0-native-facades-v3';
}
