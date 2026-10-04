import * as T from 'three';
import {FullScreenQuad} from 'three/addons/postprocessing/Pass.js';
import {makeOceanSpectrum,OCEAN_FFT_SIZE as N,OCEAN_LENGTHS,OCEAN_PERIODS,OCEAN_SCALE,OCEAN_GAINS} from './ocean-spectrum-data';

/** Tidewater's four packed complex fields, ported from workgroup compute to
 * WebGL2 butterfly passes. Four cascades share each pass, so cost is bounded
 * independently of screen resolution. The source scene is never loaded. */
export function createWaterSpectrum(time:{value:number}){
  const strength={value:1},cascades=4,stages=Math.log2(N);
  const h0=new T.DataTexture(makeOceanSpectrum(),N,N*cascades,T.RGBAFormat,T.FloatType);h0.needsUpdate=true;h0.name='Tidewater JONSWAP complex seed';
  const ping=Array.from({length:2},()=>new T.WebGLRenderTarget(N,N*cascades,{count:2,type:T.FloatType,depthBuffer:false,minFilter:T.NearestFilter,magFilter:T.NearestFilter}));
  const makeOutput=()=>new T.WebGLRenderTarget(N,N,{count:4,type:T.HalfFloatType,depthBuffer:false,generateMipmaps:true,minFilter:T.LinearMipmapLinearFilter,wrapS:T.RepeatWrapping,wrapT:T.RepeatWrapping});
  const target=makeOutput(),displacement=makeOutput();
  for(let i=0;i<4;i++){target.textures[i].name=`Ocean FFT derivatives ${i}`;displacement.textures[i].name=`Ocean FFT displacement ${i}`;}
  const vertexShader='void main(){gl_Position=vec4(position.xy,0.,1.);}';
  const shader=(name:string,uniforms:T.ShaderMaterialParameters['uniforms'],fragmentShader:string)=>new T.ShaderMaterial({name,uniforms,vertexShader,fragmentShader,glslVersion:T.GLSL3,depthTest:false,depthWrite:false});
  const evolve=shader('Tidewater evolve four ocean spectra',{uSeed:{value:h0},uTime:time},`
    uniform sampler2D uSeed;uniform float uTime;
    layout(location=0) out vec4 A;layout(location=1) out vec4 B;
    int reverseBits(int x){int r=0;for(int b=0;b<${stages};b++){r=(r<<1)|(x&1);x>>=1;}return r;}
    void main(){
      ivec2 pixel=ivec2(gl_FragCoord.xy);int cascade=pixel.y/${N};
      ivec2 kpos=ivec2(reverseBits(pixel.x),reverseBits(pixel.y%${N}));
      vec4 seed=texelFetch(uSeed,ivec2(kpos.x,kpos.y+cascade*${N}),0);
      float periods[4]=float[4](${OCEAN_LENGTHS.map(v=>v.toFixed(1)).join(',')});
      vec2 k=vec2(kpos-ivec2(${N/2}))*6.28318530718/periods[cascade];float len=length(k),ik=1./max(len,1e-6);
      float phase=sqrt(9.81*len*tanh(min(len*500.,20.)))*uTime*.75,cs=cos(phase),sn=sin(phase);
      float hr=seed.x*cs-seed.y*sn+seed.z*cs+seed.w*sn,hi=seed.x*sn+seed.y*cs-seed.z*sn+seed.w*cs;
      vec2 f=k*ik;
      vec2 c0=vec2(-f.x*hi-f.y*hr,f.x*hr-f.y*hi);
      float q=-k.x*k.y*ik;vec2 c1=vec2(hr-q*hi,hi+q*hr);
      vec2 c2=vec2(-k.x*hi-k.y*hr,k.x*hr-k.y*hi);
      vec2 ab=-k*k*ik;vec2 c3=vec2(ab.x*hr-ab.y*hi,ab.x*hi+ab.y*hr);
      A=vec4(c0,c1);B=vec4(c2,c3);
    }`);
  const butterfly=shader('Tidewater inverse FFT butterfly',{uA:{value:ping[0].textures[0]},uB:{value:ping[0].textures[1]},uAxis:{value:0},uHalf:{value:1}},`
    uniform sampler2D uA;uniform sampler2D uB;uniform int uAxis;uniform int uHalf;
    layout(location=0) out vec4 A;layout(location=1) out vec4 B;
    vec4 mul(vec4 v,vec2 w){return vec4(v.x*w.x-v.y*w.y,v.x*w.y+v.y*w.x,v.z*w.x-v.w*w.y,v.z*w.y+v.w*w.x);}
    void main(){
      ivec2 p=ivec2(gl_FragCoord.xy);int index=uAxis==0?p.x:p.y%${N},block=uHalf*2,pos=index%uHalf,start=index/block*block+pos;
      ivec2 a=p,b=p;if(uAxis==0){a.x=start;b.x=start+uHalf;}else{a.y=p.y/${N}*${N}+start;b.y=a.y+uHalf;}
      float angle=3.14159265359*float(pos)/float(uHalf);vec2 w=vec2(cos(angle),sin(angle));
      float sign=index%block<uHalf?1.:-1.;
      A=texelFetch(uA,a,0)+sign*mul(texelFetch(uA,b,0),w);B=texelFetch(uB,a,0)+sign*mul(texelFetch(uB,b,0),w);
    }`);
  const resolve=shader('Tidewater choppy displacement and derivatives',{uA:{value:ping[0].textures[0]},uB:{value:ping[0].textures[1]},uStrength:strength,uDisplacement:{value:0}},`
    uniform sampler2D uA;uniform sampler2D uB;uniform float uStrength;uniform int uDisplacement;
    layout(location=0) out vec4 c0;layout(location=1) out vec4 c1;layout(location=2) out vec4 c2;layout(location=3) out vec4 c3;
    vec4 field(ivec2 pixel,int cascade){
      ivec2 p=pixel+ivec2(0,cascade*${N});float sign=(pixel.x+pixel.y)%2==0?1.:-1.;
      float gains[4]=float[4](${OCEAN_GAINS.map(v=>v.toFixed(2)).join(',')});
      vec4 a=texelFetch(uA,p,0)*sign*uStrength*gains[cascade],b=texelFetch(uB,p,0)*sign*uStrength*gains[cascade];float chop=.9;
      if(uDisplacement==0)return vec4(b.xy,b.zw*chop);
      float J=(1.+chop*b.z)*(1.+chop*b.w)-pow(chop*a.w,2.);
      return vec4(vec3(a.x*chop,a.z,a.y*chop)*${OCEAN_SCALE},1.-J);
    }
    void main(){ivec2 p=ivec2(gl_FragCoord.xy);c0=field(p,0);c1=field(p,1);c2=field(p,2);c3=field(p,3);}`);
  const quad=new FullScreenQuad(evolve);let lastTime=NaN,lastStrength=NaN;
  function draw(renderer:T.WebGLRenderer,material:T.ShaderMaterial,out:T.WebGLRenderTarget){quad.material=material;renderer.setRenderTarget(out);quad.render(renderer);}
  return {target,displacement,ripples:target.textures[2],strength,
    update(renderer:T.WebGLRenderer){
      if(lastTime===time.value&&lastStrength===strength.value)return 0;
      const previous=renderer.getRenderTarget();let source=0;
      try{
        draw(renderer,evolve,ping[source]);
        for(let axis=0;axis<2;axis++)for(let stage=0;stage<stages;stage++){
          const u=butterfly.uniforms;u.uA.value=ping[source].textures[0];u.uB.value=ping[source].textures[1];u.uAxis.value=axis;u.uHalf.value=2**stage;
          source=1-source;draw(renderer,butterfly,ping[source]);
        }
        resolve.uniforms.uA.value=ping[source].textures[0];resolve.uniforms.uB.value=ping[source].textures[1];
        resolve.uniforms.uDisplacement.value=0;draw(renderer,resolve,target);resolve.uniforms.uDisplacement.value=1;draw(renderer,resolve,displacement);
        lastTime=time.value;lastStrength=strength.value;
      }finally{renderer.setRenderTarget(previous);}
      return 1+2*stages+2;
    },
    inspect:()=>({method:'tidewater-fft',resolution:[N,N],bands:4,periods:OCEAN_PERIODS,modes:N*N*4,passes:1+2*stages+2,
      bytes:N*N*4*(16+16*4+8*2*4/3)}),
    dispose(){h0.dispose();ping.forEach(p=>p.dispose());target.dispose();displacement.dispose();evolve.dispose();butterfly.dispose();resolve.dispose();quad.dispose();},
  };
}
