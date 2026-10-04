import * as T from 'three';
import {FullScreenQuad} from 'three/addons/postprocessing/Pass.js';
import {GTAOShader,generateMagicSquareNoise} from 'three/addons/shaders/GTAOShader.js';
import {PoissonDenoiseShader,generatePdSamplePointInitializer} from 'three/addons/shaders/PoissonDenoiseShader.js';

const vertexShader='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}';
const shader=(name:string,uniforms:T.ShaderMaterialParameters['uniforms'],fragmentShader:string)=>new T.ShaderMaterial({name,uniforms,vertexShader,fragmentShader,depthTest:false,depthWrite:false});

/** Uses the real colour-pass depth, including leaf cutouts and wind. No second
 * geometry/normal pass. AO and glow have fixed pixel caps, independent of DPR. */
export function createMapPostProcessing(renderer:T.WebGLRenderer,camera:T.OrthographicCamera){
  const depth=new T.DepthTexture(1,1,T.UnsignedIntType);
  const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthTexture:depth,samples:4});
  target.texture.name='Linear HDR island';
  const rt=(name:string)=>{const t=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:false});t.texture.name=name;return t;};
  const ao=rt('Contact occlusion'),denoised=rt('Bilateral contact occlusion'),bright=rt('Neon highlights'),blurA=rt('Neon horizontal glow'),blurB=rt('Neon soft glow');
  const histories=[rt('Stable contact shadow A'),rt('Stable contact shadow B')];
  const noise=generateMagicSquareNoise();
  const gtao=new T.ShaderMaterial({name:'Island GTAO',defines:{...GTAOShader.defines,PERSPECTIVE_CAMERA:0,NORMAL_VECTOR_TYPE:0,SAMPLES:12},uniforms:T.UniformsUtils.clone(GTAOShader.uniforms),vertexShader:GTAOShader.vertexShader,
    // The map is orthographic: every eye ray has the same direction.
    fragmentShader:GTAOShader.fragmentShader.replace('normalize(-viewPos.xyz)','vec3(0.,0.,1.)'),depthTest:false,depthWrite:false});
  const gu=gtao.uniforms;gu.tDepth.value=depth;gu.tNoise.value=noise;gu.radius.value=1;gu.thickness.value=1.3;gu.distanceFallOff.value=.8;gu.scale.value=2.4;
  const denoise=new T.ShaderMaterial({name:'Island AO denoise',defines:{...PoissonDenoiseShader.defines,NORMAL_VECTOR_TYPE:0,SAMPLES:8,SAMPLE_VECTORS:generatePdSamplePointInitializer(8,2,1)},uniforms:T.UniformsUtils.clone(PoissonDenoiseShader.uniforms),vertexShader:PoissonDenoiseShader.vertexShader,fragmentShader:PoissonDenoiseShader.fragmentShader,depthTest:false,depthWrite:false});
  const du=denoise.uniforms;du.tDiffuse.value=ao.texture;du.tDepth.value=depth;du.tNoise.value=noise;du.radius.value=4;du.lumaPhi.value=5;du.depthPhi.value=.45;du.normalPhi.value=3;
  const temporal=shader('Reprojected contact shadows',{
    tCurrent:{value:denoised.texture},tHistory:{value:histories[0].texture},tDepth:{value:depth},
    uInverseProjection:{value:new T.Matrix4()},uWorld:{value:new T.Matrix4()},uPreviousViewProjection:{value:new T.Matrix4()},
    uTexel:{value:new T.Vector2()},uValid:{value:0},uDepthRange:{value:camera.far-camera.near}
  },`
    varying vec2 vUv;uniform sampler2D tCurrent;uniform sampler2D tHistory;uniform sampler2D tDepth;
    uniform mat4 uInverseProjection;uniform mat4 uWorld;uniform mat4 uPreviousViewProjection;
    uniform vec2 uTexel;uniform float uValid;uniform float uDepthRange;
    void main(){
      float depth=texture2D(tDepth,vUv).r,ao=texture2D(tCurrent,vUv).r;
      vec4 view=uInverseProjection*vec4(vec3(vUv,depth)*2.-1.,1.);
      vec4 previous=uPreviousViewProjection*uWorld*vec4(view.xyz/view.w,1.);
      vec3 projected=previous.xyz/previous.w*.5+.5;
      vec4 history=texture2D(tHistory,projected.xy);
      float oldDepth=history.g+history.b/1024.;
      bool inside=all(greaterThan(projected.xy,vec2(0.)))&&all(lessThan(projected.xy,vec2(1.)));
      // Reject disocclusion and clamp the history to this frame's neighbourhood:
      // no dark trails behind moving leaves, boats or an orbiting camera.
      float lo=ao,hi=ao;
      for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
        float a=texture2D(tCurrent,vUv+vec2(float(x),float(y))*uTexel).r;lo=min(lo,a);hi=max(hi,a);
      }
      if(uValid>.5&&inside&&abs(oldDepth-projected.z)*uDepthRange<.09)
        ao=mix(ao,clamp(history.r,lo,hi),.78);
      // Split depth across two half-float channels; one channel loses too much
      // precision at the orthographic camera's 100+ metre viewing distance.
      float coarse=floor(depth*1024.)/1024.;
      gl_FragColor=vec4(ao,coarse,fract(depth*1024.),1.);
    }
  `);
  const extract=shader('HDR neon extraction',{tScene:{value:target.texture},uTexel:{value:new T.Vector2()}},`
    varying vec2 vUv;uniform sampler2D tScene;uniform vec2 uTexel;
    vec3 highlight(vec2 uv){vec3 c=texture2D(tScene,uv).rgb;float peak=max(c.r,max(c.g,c.b));return c*smoothstep(1.35,2.5,peak);}
    void main(){vec3 c=highlight(vUv+uTexel*vec2(-.5,-.5))+highlight(vUv+uTexel*vec2(.5,-.5))+highlight(vUv+uTexel*vec2(-.5,.5))+highlight(vUv+uTexel*vec2(.5,.5));gl_FragColor=vec4(c*.25,1.);}
  `);
  const blur=shader('Small separable neon bloom',{tInput:{value:bright.texture},uStep:{value:new T.Vector2()}},`
    varying vec2 vUv;uniform sampler2D tInput;uniform vec2 uStep;
    void main(){vec3 c=texture2D(tInput,vUv).rgb*.227027;
      c+=(texture2D(tInput,vUv+uStep*1.384615).rgb+texture2D(tInput,vUv-uStep*1.384615).rgb)*.316216;
      c+=(texture2D(tInput,vUv+uStep*3.230769).rgb+texture2D(tInput,vUv-uStep*3.230769).rgb)*.070270;
      gl_FragColor=vec4(c,1.);}
  `);
  const output=shader('Island display transform',{tScene:{value:target.texture},tAO:{value:denoised.texture},tGlow:{value:blurB.texture},uAO:{value:.75},uBloom:{value:.12}},`
    #include <common>
    #include <dithering_pars_fragment>
    varying vec2 vUv;uniform sampler2D tScene;uniform sampler2D tAO;uniform sampler2D tGlow;uniform float uAO;uniform float uBloom;
    void main(){vec3 c=texture2D(tScene,vUv).rgb;float ao=texture2D(tAO,vUv).r;
      // Keep luminous windows and engines clear of the contact-darkening pass.
      float emissive=smoothstep(1.35,2.5,max(c.r,max(c.g,c.b)));
      c*=mix(1.,ao,uAO*(1.-emissive));c+=texture2D(tGlow,vUv).rgb*uBloom;
      gl_FragColor=vec4(c,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      #include <dithering_fragment>
    }
  `);
  output.dithering=true;
  const quad=new FullScreenQuad(output),clearColor=new T.Color();
  let width=1,height=1,historyIndex=0,historyValid=false;
  function draw(material:T.ShaderMaterial,destination:T.WebGLRenderTarget|null){quad.material=material;renderer.setRenderTarget(destination);quad.render(renderer);}
  return {target,ao,denoised,gtao,output,get stableAO(){return histories[historyIndex];},
    setSamples(samples:number){
      if(target.samples===samples)return;
      target.samples=samples;target.dispose();historyValid=false;
    },
    resize(w:number,h:number){
      width=w;height=h;target.setSize(w,h);
      const scale=Math.min(.5,800/w,600/h),aw=Math.max(1,Math.round(w*scale)),ah=Math.max(1,Math.round(h*scale));
      ao.setSize(aw,ah);denoised.setSize(aw,ah);gu.resolution.value.set(aw,ah);du.resolution.value.set(aw,ah);
      histories.forEach(t=>t.setSize(aw,ah));temporal.uniforms.uTexel.value.set(1/aw,1/ah);historyValid=false;
      const bs=Math.min(.25,480/w,320/h),bw=Math.max(1,Math.round(w*bs)),bh=Math.max(1,Math.round(h*bs));
      bright.setSize(bw,bh);blurA.setSize(bw,bh);blurB.setSize(bw,bh);extract.uniforms.uTexel.value.set(1/bw,1/bh);
    },
    render(){
      renderer.getClearColor(clearColor);const alpha=renderer.getClearAlpha();renderer.setClearColor(0xffffff,1);
      gu.cameraNear.value=camera.near;gu.cameraFar.value=camera.far;gu.cameraProjectionMatrix.value.copy(camera.projectionMatrix);gu.cameraProjectionMatrixInverse.value.copy(camera.projectionMatrixInverse);gu.cameraWorldMatrix.value.copy(camera.matrixWorld);
      du.cameraProjectionMatrixInverse.value.copy(camera.projectionMatrixInverse);
      draw(gtao,ao);draw(denoise,denoised);
      const tu=temporal.uniforms;tu.uInverseProjection.value.copy(camera.projectionMatrixInverse);tu.uWorld.value.copy(camera.matrixWorld);tu.uValid.value=Number(historyValid);
      tu.tHistory.value=histories[historyIndex].texture;historyIndex=1-historyIndex;
      draw(temporal,histories[historyIndex]);output.uniforms.tAO.value=histories[historyIndex].texture;
      tu.uPreviousViewProjection.value.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);historyValid=true;
      renderer.setClearColor(clearColor,alpha);
      draw(extract,bright);blur.uniforms.tInput.value=bright.texture;blur.uniforms.uStep.value.set(1.5/bright.width,0);draw(blur,blurA);
      blur.uniforms.tInput.value=blurA.texture;blur.uniforms.uStep.value.set(0,1.5/bright.height);draw(blur,blurB);draw(output,null);
    },
    inspect:()=>({passes:7,resolution:[width,height],aoResolution:[ao.width,ao.height],bloomResolution:[bright.width,bright.height],samples:target.samples,temporalAO:historyValid}),
    dispose(){depth.dispose();[target,ao,denoised,bright,blurA,blurB,...histories].forEach(t=>t.dispose());[gtao,denoise,temporal,extract,blur,output].forEach(m=>m.dispose());noise.dispose();quad.dispose();}
  };
}
