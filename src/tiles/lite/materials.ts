import * as T from 'three';

type Shader=Parameters<T.Material['onBeforeCompile']>[0];
const materials=(mesh:T.Mesh)=>Array.isArray(mesh.material)?mesh.material:[mesh.material];
export const MAP_BOAT_BOB='transformed.y+=sin(uMapTime*1.4)*.026+sin(uMapTime*.85+position.z)*.008;';

/** Colour and shadow passes share exactly the same deformation and cutout. */
export function deformMapMesh(mesh:T.Mesh,time:{value:number},key:string,code:string,declarations='',cutout=''){
  const apply=(shader:Shader)=>{
    shader.uniforms.uMapTime=time;
    shader.vertexShader=`uniform float uMapTime;\n${declarations}\n`+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>\n${code}`);
    if(cutout)shader.fragmentShader=declarations+'\n'+shader.fragmentShader.replace('#include <alphatest_fragment>',`#include <alphatest_fragment>\n${cutout}`);
  };
  for(const material of materials(mesh)){
    const previous=material.onBeforeCompile.bind(material);
    material.onBeforeCompile=(shader,renderer)=>{previous(shader,renderer);apply(shader);};
    material.customProgramCacheKey=()=>key;
  }
  const depth=new T.MeshDepthMaterial({depthPacking:T.BasicDepthPacking});
  depth.vertexColors=!!mesh.geometry.attributes.color;
  depth.onBeforeCompile=apply;depth.customProgramCacheKey=()=>`${key}-depth`;
  mesh.customDepthMaterial=depth;
}

/** Native foliage cards carry canopy/volume normals, not two opaque surfaces.
 * A small shadowed backlight term approximates thin-leaf transmission. */
export function shadeMapFoliage(material:T.MeshStandardMaterial,sun:T.Vector3,mask='1.'){
  material.roughness=.83;material.envMapIntensity=1;material.shadowSide=T.DoubleSide;
  const previous=material.onBeforeCompile.bind(material),key=material.customProgramCacheKey();
  material.onBeforeCompile=(shader,renderer)=>{
    previous(shader,renderer);shader.uniforms.uLeafSun={value:sun};
    shader.fragmentShader='uniform vec3 uLeafSun;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_begin>',T.ShaderChunk.normal_fragment_begin.replace('gl_FrontFacing ? 1.0 : - 1.0','1.0'));
    shader.fragmentShader=shader.fragmentShader.replace('#include <lights_fragment_end>',`#include <lights_fragment_end>
      vec3 leafSun=normalize(mat3(viewMatrix)*uLeafSun);
      float leafWrap=pow(clamp((dot(-normal,leafSun)+.45)/1.45,0.,1.),1.2);
      float leafShadow=1.;
      #if defined(USE_SHADOWMAP) && NUM_DIR_LIGHT_SHADOWS > 0
        DirectionalLightShadow ls=directionalLightShadows[0];
        leafShadow=getShadow(directionalShadowMap[0],ls.shadowMapSize,ls.shadowIntensity,ls.shadowBias,ls.shadowRadius,vDirectionalShadowCoord[0]);
      #endif
      reflectedLight.directDiffuse+=diffuseColor.rgb*vec3(1.,.94,.72)*leafWrap*.42*leafShadow*(${mask});
    `);
  };
  material.customProgramCacheKey=()=>key+'-leaf-light-v1';
}

export function animateMapLandmark(root:T.Object3D,time:{value:number},sun:T.Vector3){
  root.traverse(o=>{
    if(!(o as T.Mesh).isMesh)return;const mesh=o as T.Mesh,role=o.userData.role;
    if(role==='foliage'){
      deformMapMesh(mesh,time,'threetopia-landmark-wind-v3',`
        transformed.x+=sin(uMapTime*1.05+position.x*.72+position.z*.53)*.045;
        transformed.z+=sin(uMapTime*.8+position.y*1.1)*.025;
      `);
      for(const m of materials(mesh))shadeMapFoliage(m as T.MeshStandardMaterial,sun);
    }else if(role==='boat'){
      deformMapMesh(mesh,time,'threetopia-native-boat-v2',MAP_BOAT_BOB);
      for(const m of materials(mesh)){const s=m as T.MeshStandardMaterial;s.roughness=.63;s.envMapIntensity=.9;}
    }else if(role==='lights'){
      mesh.castShadow=false;mesh.receiveShadow=false;
      const screens=mesh.geometry.hasAttribute('_screen');
      for(const material of materials(mesh)){
        material.onBeforeCompile=shader=>{
          shader.uniforms.uMapTime=time;
          shader.vertexShader='varying vec3 vMapLamp;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvMapLamp=position;');
          shader.fragmentShader='uniform float uMapTime;varying vec3 vMapLamp;\n'+shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb *= 3.6*(.86+.14*sin(uMapTime*1.6+vMapLamp.x*1.3+vMapLamp.y*2.1));');
          if(screens){
            shader.vertexShader='attribute vec3 _screen;varying float vScreen;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvScreen=_screen.x;');
            shader.fragmentShader='varying float vScreen;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
              if(vScreen>2.5){
                // Native video panels become a calm, opaque cyan display.
                // Their actual panel geometry stays intact in both map LODs.
                float scan=smoothstep(.68,.82,fract(vMapLamp.y*12.-uMapTime*.055));
                float row=smoothstep(.85,.94,fract(vMapLamp.y*2.8));
                diffuseColor.rgb=mix(vec3(.009,.024,.04),vec3(.07,.30,.43),scan*.25+row*.6);
              }
            `);
          }
        };
        material.customProgramCacheKey=()=>screens?'threetopia-native-neon-v3':'threetopia-native-neon-v2';
      }
    }
  });
}

export function disposeMapDeformations(root:T.Object3D){
  const all=new Set<T.Material>();root.traverse(o=>{const m=(o as T.Mesh).customDepthMaterial;if(m)all.add(m);});all.forEach(m=>m.dispose());
}

// Fine surface relief is evaluated in world space so it stays registered while
// orbiting. No additional texture downloads or creator draw calls are needed.
export const surfaceNoise=`
  float mapHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float mapNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mapHash(i),mapHash(i+vec2(1.,0.)),f.x),mix(mapHash(i+vec2(0.,1.)),mapHash(i+vec2(1.,1.)),f.x),f.y);}
  vec3 mapRelief(vec3 n,vec3 p,float height){vec3 px=dFdx(p),py=dFdy(p),a=cross(py,n),b=cross(n,px);float det=dot(px,a);return normalize(abs(det)*n-sign(det)*(dFdx(height)*a+dFdy(height)*b));}
`;
