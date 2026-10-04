import * as T from 'three';
import {RIPPLE_PERIOD} from './water-spectrum';

/** Reduced photon-splat caustics from Tidewater's Caustics.js (MIT), based on
 * Evan Wallace's WebGL Water. Refract sunlight through the animated wave
 * normals and measure the concentration on the bed. One draw, 64² cells,
 * nine periodic copies, one 256² target; no painted caustic animation. */
export function createWaterCaustics(waves:T.Texture,sun:T.Vector3){
  const target=new T.WebGLRenderTarget(256,256,{type:T.HalfFloatType,depthBuffer:false,generateMipmaps:true,minFilter:T.LinearMipmapLinearFilter,wrapS:T.RepeatWrapping,wrapT:T.RepeatWrapping});
  target.texture.name='Refracted sun caustics';target.texture.anisotropy=4;
  const base=new T.PlaneGeometry(1,1,64,64);base.translate(.5,.5,0.);
  const geometry=new T.InstancedBufferGeometry();geometry.index=base.index;geometry.setAttribute('position',base.getAttribute('position'));
  const copies:number[]=[];for(let y=-1;y<=1;y++)for(let x=-1;x<=1;x++)copies.push(x,y);
  geometry.setAttribute('aTile',new T.InstancedBufferAttribute(new Float32Array(copies),2));geometry.instanceCount=9;
  const material=new T.ShaderMaterial({name:'Tidewater map photon caustics',uniforms:{uWaves:{value:waves},uSun:{value:sun}},
    transparent:true,forceSinglePass:true,blending:T.CustomBlending,blendEquation:T.AddEquation,blendSrc:T.OneFactor,blendDst:T.OneFactor,depthTest:false,depthWrite:false,side:T.DoubleSide,
    vertexShader:`uniform sampler2D uWaves;uniform vec3 uSun;attribute vec2 aTile;varying vec2 vOld;varying vec2 vNew;
      void main(){
        // Filter wavelengths below the photon grid spacing, too. Otherwise
        // the low-resolution splats alias even when the surface is filtered.
        vec2 uv=position.xy;vec2 slope=textureLod(uWaves,uv,1.5).rg;
        vec3 n=normalize(vec3(-slope.x,1.,-slope.y));
        vec3 ray=refract(-uSun,n,1./1.333),flatRay=refract(-uSun,vec3(0.,1.,0.),1./1.333);
        vec2 offset=(ray.xz/max(-ray.y,.15)-flatRay.xz/max(-flatRay.y,.15))*2.4;
        vOld=uv*${RIPPLE_PERIOD};vNew=vOld+offset;
        gl_Position=vec4((vNew/${RIPPLE_PERIOD}+aTile)*2.-1.,0.,1.);
      }`,
    fragmentShader:`varying vec2 vOld;varying vec2 vNew;
      void main(){
        vec2 a=dFdx(vOld),b=dFdy(vOld),c=dFdx(vNew),d=dFdy(vNew);
        float source=abs(a.x*b.y-a.y*b.x),focused=abs(c.x*d.y-c.y*d.x);
        float energy=source/max(focused+source/7.,1e-9);
        gl_FragColor=vec4(vec3(energy),1.);
      }`
  });
  const scene=new T.Scene(),camera=new T.OrthographicCamera(),mesh=new T.Mesh(geometry,material);mesh.frustumCulled=false;scene.add(mesh);
  const clear=new T.Color();
  return {target,update(renderer:T.WebGLRenderer){
    const previous=renderer.getRenderTarget(),alpha=renderer.getClearAlpha();renderer.getClearColor(clear);
    renderer.setRenderTarget(target);renderer.setClearColor(0,0);renderer.render(scene,camera);renderer.setRenderTarget(previous);renderer.setClearColor(clear,alpha);
  },dispose(){target.dispose();geometry.dispose();base.dispose();material.dispose();}};
}
