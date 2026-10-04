import * as T from 'three';

// r186's five-tap PCF becomes visibly grainy with a wide sun penumbra. Keep its
// hardware depth comparison and Vogel distribution, with twelve filtered taps.
// Expand the chunk per material; do not mutate Three's global ShaderChunk table.
const filtered=T.ShaderChunk.shadowmap_pars_fragment
  .replace('float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;','float phi = 0.0;')
  .replace(/shadow = \([\s\S]*?\) \* 0\.2;/,`
  shadow=0.0;
  for(int tap=0;tap<12;tap++){
    shadow+=texture(shadowMap,vec3(shadowCoord.xy+vogelDiskSample(tap,12,phi)*radius,shadowCoord.z));
  }
  shadow/=12.0;
`);

export function softenMapShadows(root:T.Object3D){
  root.traverse(o=>{
    if(!(o as T.Mesh).isMesh)return;
    const mesh=o as T.Mesh;
    for(const m of Array.isArray(mesh.material)?mesh.material:[mesh.material]){
      if(m.userData.mapShadowFilter)continue;m.userData.mapShadowFilter=true;
      const previous=m.onBeforeCompile.bind(m),key=m.customProgramCacheKey();
      m.onBeforeCompile=(shader,renderer)=>{previous(shader,renderer);shader.fragmentShader=shader.fragmentShader.replace('#include <shadowmap_pars_fragment>',filtered);};
      m.customProgramCacheKey=()=>key+'-soft-shadow-v2';m.needsUpdate=true;
    }
  });
}

/** Count shadow work separately even when it runs before the main colour pass. */
export function trackMapShadowDraws(root:T.Object3D,cost:{drawCalls:number;triangles:number}){
  root.traverse(o=>{
    const mesh=o as T.Mesh;if(!mesh.isMesh||mesh.userData.trackMapShadowDraws)return;mesh.userData.trackMapShadowDraws=true;
    const before=mesh.onBeforeShadow,after=mesh.onAfterShadow;let calls=0,triangles=0;
    mesh.onBeforeShadow=function(...args){before.apply(this,args);calls=args[0].info.render.calls;triangles=args[0].info.render.triangles;};
    mesh.onAfterShadow=function(...args){cost.drawCalls+=args[0].info.render.calls-calls;cost.triangles+=args[0].info.render.triangles-triangles;after.apply(this,args);};
  });
}
