import{$r as e,A as t,Ar as n,E as r,Fr as i,Hn as a,Ht as o,Ja as s,Lt as c,Rn as l,V as u,Wi as d,Yt as f,ar as p,do as m,fa as h,ft as g,io as _,ir as v,j as y,kr as b,no as x,ro as S,ta as C}from"./three.core-DtjtRha-.js";import{n as w}from"./three.module-CA589J5f.js";import{a as T}from"./noise-RmOKhMMB.js";import{a as E,i as D,n as O,r as k}from"./surfaceShader-dsv9JGIz.js";function A(e,t,n,r,i,a,o){let s=T(e),c=new Set,l=[],u=0;for(;l.length<t&&u++<t*40;){let e=n*(r/n)**+s(),t=0;for(let e=0;e<30;e++){t=(s()*2-1)*Math.PI;let e=Math.max(0,Math.cos(t));if(s()<.08+.92*e**+a)break}let u=i*Math.PI/180+t,d=Math.round(e*Math.cos(u)),f=Math.round(e*Math.sin(u));if(d===0&&f===0)continue;let p=d+`,`+f,m=-d+`,`+-f;if(c.has(p)||c.has(m))continue;c.add(p);let h=Math.hypot(d,f)**+-o*(.55+.45*s());l.push({kx:d,ky:f,amp:h,ph:s()*Math.PI*2})}let d=0,f=0;for(let e of l){let t=2*Math.PI*Math.hypot(e.kx,e.ky)*e.amp;d+=t*t/2,f+=e.amp*e.amp/2}let p=Math.sqrt(d/2),m=Math.sqrt(f),h=[];for(let e of l){let t=(e.amp/p).toFixed(6);h.push(`  { float ph = 6.2831853 * dot(uv, vec2(${e.kx.toFixed(1)}, ${e.ky.toFixed(1)})) + ${e.ph.toFixed(4)};
    float c = cos(ph), s = sin(ph);
    h += ${t} * c;
    d += ${t} * 6.2831853 * vec2(${e.kx.toFixed(1)}, ${e.ky.toFixed(1)}) * (-s); }`)}let g=(1/(m/p)).toFixed(6);return`
vec4 bake(vec2 uv) {
  float h = 0.0;
  vec2 d = vec2(0.0);
${h.join(`
`)}
  h *= ${g};
  return vec4(0.5 + 0.125 * clamp(d, vec2(-4.0), vec2(4.0)), 0.5 + 0.125 * clamp(h, -4.0, 4.0), 1.0);
}`}function j(e,t){let n=t.waterDetail>=.9?512:256,r=Math.min(8,t.anisotropy),i=e.bake(A(1733,56,2,34,30,3,1.55),{size:n,anisotropy:r,name:`water.waveA`}),a=e.bake(A(9151,48,3,40,-70,1,1.35),{size:n,anisotropy:r,name:`water.waveB`});for(let e of[i,a])e.wrapS=e.wrapT=d;return{waveA:i,waveB:a}}var M=`
float foamCells(vec2 uv, float per) {
  vec3 w = bk_worley(uv, vec2(per));
  float edge = w.y - w.x;                          // distance to the cell border
  float walls = 1.0 - smoothstep(0.03, 0.34, edge); // thick bubble walls
  float film = (1.0 - smoothstep(0.1, 0.6, w.x)) * 0.25 * w.z; // thin film inside some cells
  return walls + film;
}
vec4 bake(vec2 uv) {
  // R: bubbly foam network at two scales, broken up by fbm
  float n = bk_fbm(uv, vec2(4.0), 5) * 0.5 + 0.5;
  float cells = foamCells(uv, 9.0) * 0.65 + foamCells(uv + 0.37, 21.0) * 0.5;
  float r = clamp(cells * smoothstep(0.25, 0.75, n) * 1.25, 0.0, 1.0);
  // G: streaks stretched along v (falling / flowing water)
  float s = 0.0;
  s += bk_fbm(uv * vec2(1.0, 1.0), vec2(24.0, 3.0), 4) * 0.6;
  s += bk_fbm(uv + 0.5, vec2(48.0, 5.0), 3) * 0.4;
  float g = smoothstep(-0.25, 0.55, s);
  // B: fine breakup noise
  float b = bk_fbm(uv, vec2(32.0), 4) * 0.5 + 0.5;
  // A: soft large-scale mask
  float a = bk_fbm(uv, vec2(3.0), 4) * 0.5 + 0.5;
  return vec4(r, g, b, a);
}`;function N(e,t){let n=t.waterDetail>=.9?512:256,r=e.bake(M,{size:n,anisotropy:Math.min(8,t.anisotropy),name:`water.foam`});return r.wrapS=r.wrapT=d,r}async function P(t,n=1.25){let{hf:r,G:i,layout:o}=t,c=i.uLagoonMaskBounds.value,d=Math.max(16,Math.round(c.z*n)),f=Math.max(16,Math.round(c.w*n)),p=new Uint8Array(d*f*4),m=c.z/d,h=c.w/f,_=o.WATERFALLS.map(e=>({x:e.pool[0],z:e.pool[2],r:(e.plungeR||4)*2.2})),v=performance.now();for(let e=0;e<f;e++){let n=c.y+(e+.5)*h;for(let t=0;t<d;t++){let i=c.x+(t+.5)*m,a=r.waterSDF(i,n),o=0;if(a<3){let e=r.heightAt(i,n);o=Math.max(0,-e),e<0&&a>-.5&&(a=Math.min(a,-.5-o))}else for(let e of _){let t=i-e.x,s=n-e.z;if(t*t+s*s<e.r*e.r){let e=r.heightAt(i,n);e<0&&(o=-e,a=-.5-o);break}}let s=1-F(0,6,a),l=I(.5-a/32),u=(e*d+t)*4;p[u]=Math.round(s*255),p[u+1]=Math.round(l*255),p[u+2]=Math.round(I(o/8)*255),p[u+3]=255}performance.now()-v>24&&(await t.yieldFrame(),v=performance.now(),t.progress?.(.1+e/f*.3,`Filling the lagoon`))}let y=new g(p,d,f,e,s);return y.colorSpace=``,y.wrapS=y.wrapT=u,y.magFilter=l,y.minFilter=a,y.generateMipmaps=!0,y.flipY=!1,y.name=`lagoonMask`,y.needsUpdate=!0,y}function F(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function I(e){return e<0?0:e>1?1:e}async function L(e,t={}){let{hf:n,layout:r}=e,i=t.step??1,a=t.margin??.45,o=r.WATER_Y,s=1e9,l=-1e9,u=1e9,d=-1e9;for(let e of r.LAGOON_LOBES)s=Math.min(s,e.x-e.rx-12),l=Math.max(l,e.x+e.rx+12),u=Math.min(u,e.z-e.rz-12),d=Math.max(d,e.z+e.rz+12);for(let e of r.WATERFALLS){let t=(e.plungeR||4)*2.5;s=Math.min(s,e.pool[0]-t),l=Math.max(l,e.pool[0]+t),u=Math.min(u,e.pool[2]-t),d=Math.max(d,e.pool[2]+t)}s=Math.floor(s/i)*i,u=Math.floor(u/i)*i;let f=Math.ceil((l-s)/i),p=Math.ceil((d-u)/i),m=new Float32Array((f+1)*(p+1)),h=performance.now();for(let t=0;t<=p;t++){for(let e=0;e<=f;e++)m[t*(f+1)+e]=n.heightAt(s+e*i,u+t*i);performance.now()-h>24&&(await e.yieldFrame(),h=performance.now(),e.progress?.(.4+t/p*.3,`Filling the lagoon`))}let g=new Uint8Array(f*p);for(let e=0;e<p;e++)for(let t=0;t<f;t++){let n=m[e*(f+1)+t],r=m[e*(f+1)+t+1],i=m[(e+1)*(f+1)+t],o=m[(e+1)*(f+1)+t+1];Math.min(n,r,i,o)<a&&(g[e*f+t]=1)}let _=g.slice();for(let e=0;e<p;e++)for(let t=0;t<f;t++)if(!g[e*f+t])for(let r=-1;r<=1&&!_[e*f+t];r++)for(let o=-1;o<=1;o++){let c=t+o,l=e+r;if(c>=0&&l>=0&&c<f&&l<p&&g[l*f+c]){let r=s+(t+.5)*i,o=u+(e+.5)*i;if(n.heightAt(r,o)<a+1.5){_[e*f+t]=1;break}}}let v=new Int32Array((f+1)*(p+1)).fill(-1),b=[],x=[],S=(e,t)=>{let n=t*(f+1)+e;return v[n]<0&&(v[n]=b.length/3,b.push(s+e*i,o,u+t*i)),v[n]};for(let e=0;e<p;e++)for(let t=0;t<f;t++){if(!_[e*f+t])continue;let n=S(t,e),r=S(t+1,e),i=S(t,e+1),a=S(t+1,e+1);x.push(n,i,r,r,i,a)}let C=new y;return C.setAttribute(`position`,new c(b,3)),C.setIndex(x),C.computeBoundingBox(),C.computeBoundingSphere(),C}var R=class{constructor(e,t={}){let{renderer:i,quality:s,layout:c,pipeline:d}=e;this.renderer=i,this.planeY=c.WATER_Y,this.scale=t.scale??s.reflectionScale??.5,this.clipBias=t.clipBias??0;let p=i.getDrawingBufferSize(new x),h=Math.max(2,Math.round(p.x*this.scale)),g=Math.max(2,Math.round(p.y*this.scale));this.target=new m(h,g,{type:f,depthBuffer:!0,generateMipmaps:!0,minFilter:a,magFilter:l,wrapS:u,wrapT:u}),this.target.texture.name=`water.reflection`,this.texture=this.target.texture,this.matrix=new v,this.valid={value:0},this.rect={value:new _(0,0,1,1)},this.stats={calls:0,triangles:0,rendered:!1,rectArea:1,farCulled:0},this.frames=0,this.camera=new b,this.camera.matrixAutoUpdate=!0,this.camera.layers.disableAll();for(let e of t.layers??[0])this.camera.layers.enable(e);this.bounds=t.bounds??null,this.cells=t.cells??null,this.useRect=t.useRect??!0,this.rectPad=t.rectPad??.12,this.farCull=t.farCull??0,this.sunDisk=t.sunDisk??null,this._n=new S(0,1,0),this._camPos=new S,this._view=new S,this._look=new S,this._target=new S,this._rot=new v,this._plane=new n,this._clip=new _,this._q=new _,this._frustum=new o,this._vp=new v,this._box=new r,this._sub=new v,this._c=new S,this._planePoint=new S(0,this.planeY,0),this._cand=null,this._candAge=0,this._hidden=[],d.onResize?.((e,t)=>{this.target.setSize(Math.max(2,Math.round(e*this.scale)),Math.max(2,Math.round(t*this.scale)))})}_waterRect(){let e=this.cells;if(!e)return[-1,-1,1,1];let t=this._vp.elements,n=this.planeY,r=this._box,i=this._frustum,a=2,o=2,s=-2,c=-2,l=!1;for(let u=0;u<e.length;u+=4){let d=e[u],f=e[u+1],p=e[u+2],m=e[u+3];if(r.min.set(d,n-.02,f),r.max.set(p,n+.02,m),!i.intersectsBox(r))continue;l=!0;let h=!1;for(let e=0;e<4;e++){let r=e&1?p:d,i=e&2?m:f,l=t[3]*r+t[7]*n+t[11]*i+t[15];if(l<=.05){h=!0;continue}let u=(t[0]*r+t[4]*n+t[8]*i+t[12])/l,g=(t[1]*r+t[5]*n+t[9]*i+t[13])/l;u<a&&(a=u),u>s&&(s=u),g<o&&(o=g),g>c&&(c=g)}if(h&&(a=-1,s=1,o=-1,c<-1&&(c=-1)),a<=-1&&s>=1&&o<=-1&&c>=1)break}return l?[a,o,s,c]:null}_collectCandidates(e){let t=[],n=this.camera.layers;e.traverse(e=>{(e.isMesh||e.isPoints||e.isLine)&&e.layers.test(n)&&t.push(e)}),this._cand=t,this._candAge=0}_farCull(e){if(this._hidden.length=0,this.stats.farCulled=0,!(this.farCull>0))return;(!this._cand||++this._candAge>240)&&this._collectCandidates(e);let t=this.camera.position,n=this.farCull,r=this._c;for(let e of this._cand){if(!e.visible||!e.frustumCulled||!e.parent)continue;let i=e.isInstancedMesh||e.isBatchedMesh?e.boundingSphere:e.geometry?.boundingSphere;if(!i)continue;r.copy(i.center).applyMatrix4(e.matrixWorld);let a=i.radius*e.matrixWorld.getMaxScaleOnAxis();r.distanceTo(t)-a>n&&(e.visible=!1,this._hidden.push(e))}this.stats.farCulled=this._hidden.length}render(e,t,n){if(this.stats.rendered=!1,this.frames++<1){this.valid.value=0;return}if(n.updateMatrixWorld(),this._camPos.setFromMatrixPosition(n.matrixWorld),this._camPos.y<=this.planeY+.02){this.valid.value=0;return}if(this._vp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(this._vp),this.bounds&&!this._frustum.intersectsBox(this.bounds)){this.valid.value=0;return}let r=this.useRect?this._waterRect():[-1,-1,1,1];if(!r){this.valid.value=0;return}let i=this.camera,a=this._n,o=this._planePoint;this._view.subVectors(o,this._camPos).reflect(a).negate().add(o),this._rot.extractRotation(n.matrixWorld),this._look.set(0,0,-1).applyMatrix4(this._rot).add(this._camPos),this._target.subVectors(o,this._look).reflect(a).negate().add(o),i.position.copy(this._view),i.up.set(0,1,0).applyMatrix4(this._rot).reflect(a),i.lookAt(this._target),i.near=n.near,i.far=n.far,i.fov=n.fov,i.aspect=n.aspect,i.updateMatrixWorld(),i.projectionMatrix.copy(n.projectionMatrix),this.matrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.matrix.multiply(i.projectionMatrix).multiply(i.matrixWorldInverse);let s=this.target.width,c=this.target.height,l=this.rectPad,u=Math.floor((Math.max(-1,r[0]-l)*.5+.5)*s),d=Math.ceil((Math.min(1,r[2]+l)*.5+.5)*s),f=Math.floor((Math.max(-1,r[1]-l)*.5+.5)*c),p=Math.ceil((Math.min(1,r[3]+l)*.5+.5)*c);if(u=Math.max(0,Math.min(s-2,u)),f=Math.max(0,Math.min(c-2,f)),d=Math.max(u+2,Math.min(s,d)),p=Math.max(f+2,Math.min(c,p)),(d-u)*(p-f)/(s*c)>.9&&(u=0,f=0,d=s,p=c),this.stats.rectArea=+((d-u)*(p-f)/(s*c)).toFixed(3),this.rect.value.set(u/s,f/c,d/s,p/c),u>0||f>0||d<s||p<c){let e=u/s*2-1,t=d/s*2-1,n=f/c*2-1,r=p/c*2-1,a=2/(t-e),o=2/(r-n),l=-(t+e)/(t-e),m=-(r+n)/(r-n);this._sub.set(a,0,0,l,0,o,0,m,0,0,1,0,0,0,0,1),i.projectionMatrix.premultiply(this._sub)}this._plane.setFromNormalAndCoplanarPoint(a,o),this._plane.applyMatrix4(i.matrixWorldInverse);let m=this._clip.set(this._plane.normal.x,this._plane.normal.y,this._plane.normal.z,this._plane.constant),h=i.projectionMatrix,g=h.elements,_=this._q;_.x=(Math.sign(m.x)+g[8])/g[0],_.y=(Math.sign(m.y)+g[9])/g[5],_.z=-1,_.w=(1+g[10])/g[14],m.multiplyScalar(2/m.dot(_)),g[2]=m.x,g[6]=m.y,g[10]=m.z+1-this.clipBias,g[14]=m.w,i.projectionMatrixInverse.copy(h).invert();let v=e.getRenderTarget(),y=t.matrixWorldAutoUpdate,b=e.shadowMap.needsUpdate;e.shadowMap.needsUpdate=!1,t.matrixWorldAutoUpdate=!0,this._farCull(t);let x=this.sunDisk,S=x?x.value:0;x&&(x.value=0);let C=e.info.render.calls,w=e.info.render.triangles;this.target.viewport.set(u,f,d-u,p-f),e.setRenderTarget(this.target),e.setClearColor(0,1),e.clear(!0,!0,!1),e.render(t,i),this.target.viewport.set(0,0,s,c),e.setRenderTarget(v),x&&(x.value=S);for(let e of this._hidden)e.visible=!0;this._hidden.length=0,t.matrixWorldAutoUpdate=y,e.shadowMap.needsUpdate=b,this.stats.calls=e.info.render.calls-C,this.stats.triangles=e.info.render.triangles-w,this.stats.rendered=!0,this.valid.value=1}dispose(){this.target.dispose()}},z=`
uniform float uTime;
uniform float uWaterLevel;
uniform vec2 uResolution;
uniform float uPBox;
uniform vec2 uPDrift;
attribute vec4 aRand;          // x size, y phase, z speed, w kind
varying vec3 vWp;
varying float vViewZ;
varying float vDist;
varying float vPs;
varying float vK;
varying float vKind;

void main() {
  float t = uTime;
  float sp = 0.6 + 0.8 * aRand.z;
  vec3 p = position * uPBox;
  // slow current, small eddies, flocs settle (~1-3 mm/s)
  p.xz += uPDrift * (t * sp);
  p += vec3(sin(t * 0.13 * sp + aRand.y * 6.283), 0.55 * sin(t * 0.11 * sp + aRand.y * 11.0),
            cos(t * 0.12 * sp + aRand.y * 4.0)) * 0.16;
  float floc = step(0.86, aRand.w);
  p.y -= t * mix(0.0003, 0.0022, floc * aRand.x);
  vec3 wp = cameraPosition + mod(p - cameraPosition + 0.5 * uPBox, uPBox) - 0.5 * uPBox;

  vec4 mv = modelViewMatrix * vec4(wp, 1.0);
  float dist = length(mv.xyz);
  // silt / mica flakes 0.8-2.2 mm, organic flocs 2.5-6 mm (energy conserving below 1 px)
  float worldSize = floc > 0.5 ? mix(0.0025, 0.006, aRand.x) : mix(0.0008, 0.0022, aRand.x * aRand.x);
  float px = worldSize * uResolution.y * projectionMatrix[1][1] * 0.5 / max(-mv.z, 0.05);
  // one-pixel points below that size: a 1 px square always covers exactly one pixel
  // centre, so a sub-pixel speck keeps its (area-scaled) energy without shimmering
  float ps = clamp(px, 1.0, 40.0);
  float energy = min(px / ps, 1.0); energy *= energy;
#ifdef P_DEBUG
  ps = 4.0; energy = 1.0;
#endif
  float fade = smoothstep(0.12, 0.4, dist) * (1.0 - smoothstep(uPBox * 0.3, uPBox * 0.48, dist));
  float under = step(wp.y, uWaterLevel - 0.03) * step(cameraPosition.y, uWaterLevel + 0.25);
  // platy flakes (a third of the silt) flash as they tumble
  float flake = step(aRand.w, 0.3);
  float s = max(sin(t * (0.9 + 2.2 * aRand.z) + aRand.y * 40.0), 0.0);
  float s2 = s * s; float s4 = s2 * s2;
  float glint = mix(1.0, 0.45 + 3.2 * s4 * s4, flake);
  vK = energy * fade * under * glint * (floc > 0.5 ? 0.55 : 0.85); // albedo: flocs darker
  vKind = floc;
  vWp = wp;
  vViewZ = -mv.z;
  vDist = dist;
  vPs = ps;
  gl_PointSize = vK > 1e-4 ? ps : 0.0;
  gl_Position = projectionMatrix * mv;
  if (vK <= 1e-4) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
}
`,B=`
#include <common>
#include <lagoon_common>
#include <lagoon_depth>
uniform vec3 uPSigma;          // extinction per metre (the underwater volume pass's)
uniform float uPAmount;        // submersion 0..1
uniform float uPGain;
varying vec3 vWp;
varying float vViewZ;
varying float vDist;
varying float vPs;
varying float vK;
varying float vKind;

float pHG(float c, float g) {  // Henyey-Greenstein, normalised so isotropic = 1
  float den = max(1.0 + g * g - 2.0 * g * c, 1e-3);
  return (1.0 - g * g) / (den * sqrt(den));
}

void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d) * 4.0;
  float prof = exp(-r2 * 2.5) * (1.0 - smoothstep(0.8, 1.0, r2));
  float a = mix(1.0, prof * 1.6, smoothstep(1.8, 4.0, vPs));
  // hidden behind the opaque scene (rocks, floor, piles)?
  vec2 suv = gl_FragCoord.xy / uResolution;
  float sceneZ = lagoonLinearDepth(texture2D(tSceneDepth, suv).r);
  float occ = smoothstep(-0.03, 0.03, sceneZ - vViewZ);
  if (occ * a * vK <= 0.0) discard;

  float depth = max(uWaterLevel - vWp.y, 0.0);
#ifdef P_LAGOON_LIGHT
  vec3 Lw, surf;
  vec3 Tsun = lagoonUnderwaterSun(vWp, Lw, surf);
  vec3 C = lagoonCausticLight(surf.xz, depth, 0.01);
  float sv = mix(0.1, 1.0, lagoonStaticShadowTap(surf));
#else
  float cosI = max(uSunDir.y, 0.02);
  float sinT = sqrt(max(1.0 - cosI * cosI, 0.0)) / 1.333;
  vec2 hd = uSunDir.xz / max(length(uSunDir.xz), 1e-5);
  vec3 Lw = vec3(hd.x * sinT, sqrt(max(1.0 - sinT * sinT, 1e-4)), hd.y * sinT);
  vec3 Tsun = 0.9 * exp(-uWaterAbsorb * depth / Lw.y);
  vec3 C = vec3(1.0);
  float sv = 1.0;
#endif
  vec3 V = normalize(vWp - cameraPosition);
  float mu = dot(Lw, V);                 // 1 = the speck is between the eye and the sun
  // mineral silt scatters strongly forward; flocs less so
  float ph = vKind > 0.5 ? 0.6 * pHG(mu, 0.7) + 0.4 * pHG(mu, 0.1)
                         : 0.7 * pHG(mu, 0.85) + 0.3 * pHG(mu, 0.25);
  ph = min(ph, 40.0);
  vec3 sun = uSunColor * uSunIntensity * Tsun * C * sv;
  vec3 sky = mix(uSkyHorizon, uSkyZenith, 0.55) * 1.6 * exp(-uWaterAbsorb * depth * 1.2);
  // radiance of a sphere-like speck: albedo x irradiance x phase / 4 pi (x uPGain:
  // the forward-scattered halo around each speck, which the eye reads as its size)
  vec3 L = (sun * ph * 0.0796 + sky * 0.25) * vK * uPGain;
  // attenuation over the speck's own distance (the volume pass ran before us)
  L *= exp(-uPSigma * vDist) * a * occ * uPAmount;
  gl_FragColor = vec4(max(L, vec3(0.0)), 1.0);
#ifdef P_DEBUG
  gl_FragColor = vec4(8.0 * occ, 0.0, 0.0, 1.0);
#endif
}
`;function V(e){let{THREE:n,G:r,pipeline:a,quality:o,scene:s,camera:c,renderer:l}=e,u=o?.waterDetail??1;if(e.params.get(`waterpart`)===`0`||u<.6||!a?.postPasses)return null;let d=o?.cinematic?3200:u>=.95?2400:u>=.8?1800:1200,f=2654435769,p=()=>{f=f+1831565813>>>0;let e=f;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},m=new Float32Array(d*3),g=new Float32Array(d*4);for(let e=0;e<d;e++)m[e*3]=p(),m[e*3+1]=p(),m[e*3+2]=p(),g[e*4]=p(),g[e*4+1]=p(),g[e*4+2]=p(),g[e*4+3]=p();let _=new y;_.setAttribute(`position`,new t(m,3)),_.setAttribute(`aRand`,new t(g,4)),_.boundingSphere=new h(new S,1e6);let v=w.lagoon_common??``,b=v.includes(`vec3 lagoonUnderwaterSun(`)&&v.includes(`vec3 lagoonCausticLight(`)&&v.includes(`float lagoonStaticShadowTap(`),T=new S(.43,.107,.092),E={value:0},D=r.uWindDir?.value??new x(1,0),O=new C({name:`lagoonParticulates`,uniforms:{...r,...a.uniforms,uPBox:{value:5},uPDrift:{value:new x(D.x,D.y).normalize().multiplyScalar(.018)},uPSigma:{value:T},uPAmount:E,uPGain:{value:4.5}},defines:{...b?{P_LAGOON_LIGHT:1}:{},...e.params.get(`waterpart`)===`debug`?{P_DEBUG:1}:{}},vertexShader:z,fragmentShader:B,transparent:!0,depthWrite:!1,depthTest:!1,blending:2});O.userData.noPatch=!0;let k=new i(_,O);k.name=`lagoon-particulates`,k.frustumCulled=!1,k.layers.set(6),k.renderOrder=20,s.add(k);let A=0;return a.postPasses.push((e,t,n)=>{let i=t.uniforms.uUnderwater?.value??0,a=t.underwater?.rt,o=(Number.isFinite(t._warm)?t._warm<1:!1)||A===0;if(!a||!(i>0)&&!o||i>0&&n!==a.texture)return;let l=t.underwater.settings,u=Number.isFinite(l?.scatterCoef)?l.scatterCoef:.035,d=r.uWaterAbsorb?.value;d&&T.set(d.x+u*.8,d.y+u,d.z+u*1.15),E.value=Math.max(i,0);let f=e.getRenderTarget(),p=e.autoClear,m=c.layers.mask;e.autoClear=!1,e.setRenderTarget(a),c.layers.set(6);try{e.render(s,c)}finally{c.layers.mask=m,e.autoClear=p,e.setRenderTarget(f)}A++}),{points:k,count:d,lagoonLight:b}}var H=5,U=8;function W(e,t,n){let r=e.layout.WATER_Y,i=e.camera,a=new Float32Array(16).fill(1e9),o=new Float32Array(32);return{update(s){let c=0,l=e.registry.get(`ambient`);if(!l){n.value=0;return}let u=i.position.x,d=i.position.z,f=l.birds,p=(e,t)=>(e-u)*(e-u)+(t-d)*(t-d)<=3600,m=(e,t,n)=>{let r=a[e*2],i=a[e*2+1],o=s>0?Math.hypot(t-r,n-i)/s:0;return a[e*2]=t,a[e*2+1]=n,.75+.6*Math.min(1,o<5?o/.1:0)},h=f?.waderFeet;if(h&&h.length){if(typeof h[0]==`number`)for(let e=0;e+1<h.length&&c<6;e+=3){let n=h[e],r=h[e+1],i=h[e+2]??1;i>.01&&p(n,r)&&t[c++].set(n,r,0,.7*Math.min(1.4,i))}else for(let e=0;e<h.length&&c<6;e++){let n=h[e];if(!n||n.down===!1)continue;let r=n.s??(typeof n.down==`number`?n.down:1);r>.01&&p(n.x,n.z)&&t[c++].set(n.x,n.z,0,.7*Math.min(1.4,r))}}else if(f?.waders?.length&&Number.isFinite(f.waders[0]?.x))for(let e=0;e<f.waders.length&&c<6;e++){let n=f.waders[e];if(n.inWater!==!1&&p(n.x,n.z)){if(Array.isArray(n.feet)&&n.feet.length)for(let e of n.feet)c<6&&e.down!==!1&&t[c++].set(e.x,e.z,0,.7*Math.min(1.4,e.s??1));else t[c].set(n.x,n.z,0,m(c,n.x,n.z)),c++}}else if(f?.mesh?.instanceMatrix&&f.waders){let e=f.mesh.instanceMatrix.array;for(let n=0;n<f.waders.length&&c<4;n++){let i=((f.fliers|0)+n)*16;if(i+14>=e.length)break;let a=e[i+12],o=e[i+13],s=e[i+14];o<r-.02&&o>r-.7&&p(a,s)&&(t[c].set(a,s,0,m(c,a,s)),c++)}}let g=l.critters;if(g?.mesh?.instanceMatrix&&g.leaves>0&&c<U){let e=g.mesh.instanceMatrix.array,n=(g.dragonflies?.length??0)+(g.butterflies?.length??0),i=U-c,a=0;for(let t=0;t<g.leaves;t++){let s=(n+t)*16;if(s+14>=e.length)break;let c=e[s+13];if(!(c>r-.004&&c<r+.022)||e[s]*e[s]+e[s+1]*e[s+1]+e[s+2]*e[s+2]<1e-4)continue;let l=e[s+12],f=e[s+14],p=(l-u)*(l-u)+(f-d)*(f-d);if(p>1225)continue;let m=Math.min(a,i-1);if(!(a>=i&&p>=o[m*4+2])){for(;m>0&&o[(m-1)*4+2]>p;)o[m*4]=o[(m-1)*4],o[m*4+1]=o[(m-1)*4+1],o[m*4+2]=o[(m-1)*4+2],m--;o[m*4]=l,o[m*4+1]=f,o[m*4+2]=p,a<i&&a++}}for(let e=0;e<a;e++)t[c++].set(o[e*4],o[e*4+1],1,1)}n.value=c}}}async function G(e){let{scene:t,pipeline:n,G:r,LAYERS:i,quality:a,tex:o,layout:s}=e;e.progress?.(.02,`Filling the lagoon`);let{waveA:c,waveB:l}=j(o,a),u=N(o,a);o.register(`waterFoam`,u),o.register(`waterWaveA`,c),o.register(`waterWaveB`,l);let d=await P(e,1);r.tLagoonMask.value=d,r.uCausticsStrength.value=.8;let f=await L(e,{step:1,margin:.45});e.progress?.(.8,`Filling the lagoon`);let m=f.boundingBox.clone();m.min.y=s.WATER_Y-.5,m.max.y=s.WATER_Y+.5;let h=new R(e,{layers:[i.OPAQUE,5],bounds:m,cells:K(f,12),useRect:e.params.get(`waterreflrect`)!==`0`,farCull:parseFloat(e.params.get(`waterreflfar`)??`300`)||0,sunDisk:e.registry.get(`sky`)?.uniforms?.uSunDiskRadiance??null});e.params.get(`waterrefl`)!==`0`&&n.preRender.push((e,t,n)=>h.render(e,t,n));let g=t.environment,v=D(g),y={tWEnv:{value:v?g:null},uWEnvIntensity:{value:1},uWAbsorb:r.uWaterAbsorb??{value:new S(.4,.072,.052)},uWScatter:{value:new S(.03,.05,.064)},uWInScatter:{value:.42},uWSunPathK:{value:1.35}},b={...r,...n.uniforms,...y,tWReflection:{value:h.texture},uWReflMatrix:{value:h.matrix},uWReflValid:h.valid,uWReflRect:h.rect,uWReflDist:{value:9},tWWaveA:{value:c},tWWaveB:{value:l},tWFoam:{value:u},uWWind:r.uWindDir,uWTile:{value:new S(13,5.3,1.9)},uWAmp:{value:new S(.019,.015,.015)},uWSpeed:{value:new S(.32,.21,.11)},uWRefr:{value:1},uWGlint:{value:1},uWFoam:{value:1},uWGust:{value:new _(150,1.3,.35,1.45)},uWCap:{value:new _(.47,.013,.07,0)},uWGlintP:{value:new _(.006,.02,30,0)},uWLap:{value:new _(.024,3.7,2.3,1)},uWReflTexH:{value:h.target.height},uWReflBlur:{value:e.params.get(`waterblur`)===`0`?0:1},uWDebug:{value:{refl:1,normal:2,depth:3,refr:4,gust:5,rough:6}[e.params.get(`waterdebug`)]??0},uWImpacts:{value:[new _,new _,new _,new _]},uWImpactsB:{value:[new _(1,0,0,0),new _(1,0,0,0),new _(1,0,0,0),new _(1,0,0,0)]},uWImpactCount:{value:0},uWRings:{value:Array.from({length:U},()=>new _)},uWRingCount:{value:0}},x=e.params.get(`waterrings`)===`0`?{update(){}}:W(e,b.uWRings.value,b.uWRingCount),w={WATER_Q:E(a)},T=new C({name:`lagoonWater`,uniforms:b,defines:v?{...v,...w}:{...w},vertexShader:k,fragmentShader:O,side:2,depthWrite:!0,depthTest:!0,transparent:!1});T.userData.noPatch=!0;let A=new p(f,T);A.name=`lagoon-surface`,A.layers.set(i.WATER),A.frustumCulled=!0,A.renderOrder=0,t.add(A);let M=null;try{M=V(e)}catch(e){console.warn(`[lagoon] water particulates skipped:`,e)}let F=[],I={mesh:A,material:T,reflection:h,uniforms:y,particulates:M,textures:{waveA:c,waveB:l,foam:u},mask:d,REFLECT_EXTRA_LAYER:5,get envDefines(){return D(t.environment)},setImpacts(e){let t=b.uWImpacts.value,n=b.uWImpactsB.value,r=Math.min(4,e.length);for(let i=0;i<r;i++){let r=e[i];if(t[i].set(r.x,r.z,r.r??3,r.strength??1),r.ax===void 0&&r.half===void 0){let e=F.find(e=>Math.abs(e[0]-r.x)<.01&&Math.abs(e[1]-r.z)<.01);if(e){n[i].set(e[2],e[3],e[4],0);continue}}let a=Math.hypot(r.ax??1,r.az??0)||1;n[i].set((r.ax??1)/a,(r.az??0)/a,Math.max(0,r.half??0),0),r.half>0&&F.length<16&&!F.some(e=>e[0]===r.x&&e[1]===r.z)&&F.push([r.x,r.z,n[i].x,n[i].y,n[i].z])}b.uWImpactCount.value=r},stats:h.stats,update(e){x.update(e),b.uWReflTexH.value=h.target.height;let n=t.environment;if(n&&n!==y.tWEnv.value){let e=D(n);if(e){let t=T.defines;(t.CUBEUV_TEXEL_HEIGHT!==e.CUBEUV_TEXEL_HEIGHT||t.ENVMAP_TYPE_CUBE_UV===void 0)&&(T.defines={...e,...w},T.needsUpdate=!0),y.tWEnv.value=n}}},order:20};return window.__lagoon&&(window.__lagoon.water={reflection:h.stats,api:I}),I}function K(e,t){let n=e.attributes.position.array,r=e.index.array,i=e.boundingBox,a=Math.max(1,Math.ceil((i.max.x-i.min.x)/t)),o=Math.max(1,Math.ceil((i.max.z-i.min.z)/t)),s=new Float32Array(a*o*4).fill(NaN);for(let e=0;e<r.length;e+=3)for(let c=0;c<3;c++){let l=r[e+c]*3,u=n[l],d=n[l+2],f=r[e]*3,p=Math.min(a-1,Math.floor((n[f]-i.min.x)/t)),m=(Math.min(o-1,Math.floor((n[f+2]-i.min.z)/t))*a+p)*4;Number.isNaN(s[m])?(s[m]=u,s[m+1]=d,s[m+2]=u,s[m+3]=d):(s[m]=Math.min(s[m],u),s[m+1]=Math.min(s[m+1],d),s[m+2]=Math.max(s[m+2],u),s[m+3]=Math.max(s[m+3],d))}let c=[];for(let e=0;e<s.length;e+=4)Number.isNaN(s[e])||c.push(s[e],s[e+1],s[e+2],s[e+3]);return new Float32Array(c)}export{H as REFLECT_EXTRA_LAYER,G as build};