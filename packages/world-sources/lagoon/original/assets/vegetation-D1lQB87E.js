import{$r as e,A as t,Dr as n,E as r,Hn as i,Ja as a,Lt as o,Qi as s,Rn as c,Rt as l,U as u,V as d,_r as f,an as p,ar as m,do as h,ea as g,fa as _,ft as v,in as y,io as b,j as x,jr as S,mr as C,no as w,or as T,qt as E,ro as D,sr as O,ta as k,zi as A}from"./three.core-DtjtRha-.js";import{n as j}from"./three.module-CA589J5f.js";import{a as M,n as N,r as P,s as F,t as I}from"./noise-RmOKhMMB.js";import{n as L}from"./index-BjH0GYGf.js";var R=12,z=class{constructor(e,t,n,r={}){this.farRadius=r.farRadius??1/0,this.hf=e.hf,this.layout=e.layout,this.near=t,this.far=n,this.step=e.hf.GRID_STEP,this.canopies=[],this.occ=null,this.noise=new I(4471)}setCanopies(e){this.canopies=e}async compute(e,t=0,n=.3){let{hf:r}=this,i=performance.now(),a=async r=>{performance.now()-i>16&&(e.progress(t+(n-t)*r,`Surveying the oasis`),await e.yieldFrame(),i=performance.now())},o=e.registry?.get(`terrain`)?.heightGrid;if(o&&o.grid&&o.nx>1&&o.nz>1)this.step=o.step,this.li0=Math.round(o.x0/o.step),this.lj0=Math.round(o.z0/o.step),this.lw=o.nx,this.lh=o.nz,this.lat=o.grid;else{let e=r.TERRAIN_LOD?.[0],t=this.step,n=e?{minX:e.x0,minZ:e.z0,maxX:e.x1,maxZ:e.z1}:this.near;this.li0=Math.round(n.minX/t),this.lj0=Math.round(n.minZ/t),this.lw=Math.round((n.maxX-n.minX)/t)+1,this.lh=Math.round((n.maxZ-n.minZ)/t)+1;let i=this.lat=new Float32Array(this.lw*this.lh),o=e&&typeof r.latticeHeight==`function`;for(let e=0;e<this.lh;e++){let n=this.lj0+e;for(let a=0;a<this.lw;a++){let s=this.li0+a;i[e*this.lw+a]=o?r.latticeHeight(0,s,n):r.heightAt(s*t,n*t)}e&7||await a(.45*e/this.lh)}}this.nearG=await this._envGrid(this.near,1,(e,t)=>this.groundHeight(e,t),e=>a(.45+.4*e));let s=this.near,c=(this.farRadius+12)**2,l=(e,t)=>e>s.minX+8&&e<s.maxX-8&&t>s.minZ+8&&t<s.maxZ-8||e*e+t*t>c;this.farG=await this._envGrid(this.far,4,(e,t)=>r.heightAt(e,t),e=>a(.85+.15*e),l)}async _envGrid(e,t,n,r,i=null){let{hf:a}=this,o=Math.round((e.maxX-e.minX)/t)+1,s=Math.round((e.maxZ-e.minZ)/t)+1,c=o*s,l={minX:e.minX,minZ:e.minZ,cs:t,gw:o,gh:s,h:new Float32Array(c),w:new Float32Array(c),path:new Float32Array(c),slope:new Float32Array(c),shade:new Float32Array(c),moist:new Float32Array(c),island:new Uint8Array(c)},u=this.layout.WATERFALLS,d=this.layout.ISLANDS,f=new Uint8Array(c);for(let c=0;c<s;c++){let u=e.minZ+c*t;for(let r=0;r<o;r++){let s=e.minX+r*t,p=c*o+r;if(i&&i(s,u)){l.w[p]=999;continue}f[p]=1,l.h[p]=n(s,u);let m=a.lagoonSDF(s,u),h=1e9;for(let e=0;e<d.length;e++){let t=d[e],n=s-t.x,r=u-t.z,i=Math.sqrt(n*n+r*r)-t.r*1.2;i<h&&(h=i)}if(h>0&&m>-h){l.w[p]=m;continue}let g=a.islandSDF(s,u);l.w[p]=Math.max(m,-g),l.island[p]=+(g<0)}c&3||await r(.5*c/s)}l.path.fill(R);let p=[];for(let e of this.layout.TRAILS)p.push([e.path,e.width*.5]);for(let e of this.layout.BOARDWALKS)p.push([e.path,e.width*.5]);for(let[n,r]of p)for(let i=0;i<n.length-1;i++){let a=n[i][0],c=n[i][1],u=n[i+1][0]-a,d=n[i+1][1]-c,p=u*u+d*d,m=R+r,h=Math.max(0,Math.floor((Math.min(a,a+u)-m-e.minX)/t)),g=Math.min(o-1,Math.ceil((Math.max(a,a+u)+m-e.minX)/t)),_=Math.max(0,Math.floor((Math.min(c,c+d)-m-e.minZ)/t)),v=Math.min(s-1,Math.ceil((Math.max(c,c+d)+m-e.minZ)/t));for(let n=_;n<=v;n++){let i=e.minZ+n*t;for(let s=h;s<=g;s++){let m=n*o+s;if(!f[m])continue;let h=e.minX+s*t,g=p>0?((h-a)*u+(i-c)*d)/p:0;g=g<0?0:g>1?1:g;let _=Math.hypot(a+u*g-h,c+d*g-i)-r;_<l.path[m]&&(l.path[m]=_)}}}await r(.6);for(let e=0;e<s;e++)for(let n=0;n<o;n++){let r=e*o+n,i=Math.max(0,n-1),a=Math.min(o-1,n+1),c=Math.max(0,e-1),u=Math.min(s-1,e+1),d=(l.h[e*o+a]-l.h[e*o+i])/((a-i)*t||1),f=(l.h[u*o+n]-l.h[c*o+n])/((u-c)*t||1);l.slope[r]=Math.atan(Math.hypot(d,f))*57.2958}let m=new Float32Array(c).fill(1);for(let n of this.canopies){let r=1.05*n.r,i=Math.max(0,Math.floor((n.x-r-e.minX)/t)),a=Math.min(o-1,Math.ceil((n.x+r-e.minX)/t)),c=Math.max(0,Math.floor((n.z-r-e.minZ)/t)),l=Math.min(s-1,Math.ceil((n.z+r-e.minZ)/t));for(let s=c;s<=l;s++){let c=e.minZ+s*t-n.z;for(let l=i;l<=a;l++){let i=e.minX+l*t-n.x,a=Math.sqrt(i*i+c*c);a>=r||(m[s*o+l]*=1-n.k*(1-F(.5*n.r,r,a)))}}}for(let n=0;n<s;n++){let i=e.minZ+n*t;for(let r=0;r<o;r++){let a=n*o+r;if(!f[a])continue;let s=1-m[a];l.shade[a]=s,l.moist[a]=this._moisture(e.minX+r*t,i,l.w[a],l.h[a],s,l.island[a],u)}n&7||await r(.6+.4*n/s)}return l}_moisture(e,t,n,r,i,a,o){if(n<0)return 1;let s=this.hf,c=Math.exp(-n/5.5),l=.56*(1-F(6,30,n)),u=i*.85,d=0,f=0,p=r>4?s.cliffMask(e,t):0;for(let n=0;n<o.length;n++){let r=o[n];if(p>.2){let n=s.distToPolyline(e,t,r.stream);d=Math.max(d,.9*p*Math.exp(-(n*n)/30))}let i=e-r.pool[0],a=t-r.pool[2];f=Math.max(f,.65*Math.exp(-(i*i+a*a)/225))}let m=Math.max(c,l,u,d,f);return m+=.12*this.noise.noise2(e*.045,t*.045),a&&(m=Math.max(m,.88)),N(m,0,1)}groundHeight(e,t){let n=this.step,r=e/n,i=t/n,a=Math.floor(r),o=Math.floor(i),s=a-this.li0,c=o-this.lj0;if(s<0||c<0||s>=this.lw-1||c>=this.lh-1)return this.hf.groundHeight(e,t);let l=r-a,u=i-o,d=c*this.lw+s,f=this.lat,p=f[d],m=f[d+1],h=f[d+this.lw],g=f[d+this.lw+1];return l+u<=1?p+(m-p)*l+(h-p)*u:g+(h-g)*(1-l)+(m-g)*(1-u)}inNear(e,t){let n=this.near;return e>=n.minX&&t>=n.minZ&&e<=n.maxX&&t<=n.maxZ}inFar(e,t){let n=this.far;return e>=n.minX&&t>=n.minZ&&e<=n.maxX&&t<=n.maxZ}env(e,t,n){let r=this.inNear(e,t)?this.nearG:this.inFar(e,t)?this.farG:null;if(!r)return!1;let i=(e-r.minX)/r.cs,a=(t-r.minZ)/r.cs,o=Math.min(r.gw-2,Math.max(0,Math.floor(i))),s=Math.min(r.gh-2,Math.max(0,Math.floor(a))),c=N(i-o,0,1),l=N(a-s,0,1),u=s*r.gw+o,d=u+r.gw,f=(1-c)*(1-l),p=c*(1-l),m=(1-c)*l,h=c*l;return n.h=r.h[u]*f+r.h[u+1]*p+r.h[d]*m+r.h[d+1]*h,n.w=r.w[u]*f+r.w[u+1]*p+r.w[d]*m+r.w[d+1]*h,n.path=r.path[u]*f+r.path[u+1]*p+r.path[d]*m+r.path[d+1]*h,n.slope=r.slope[u]*f+r.slope[u+1]*p+r.slope[d]*m+r.slope[d+1]*h,n.shade=r.shade[u]*f+r.shade[u+1]*p+r.shade[d]*m+r.shade[d+1]*h,n.moist=r.moist[u]*f+r.moist[u+1]*p+r.moist[d]*m+r.moist[d+1]*h,n.island=(c<.5?l<.5?r.island[u]:r.island[d]:l<.5?r.island[u+1]:r.island[d+1])===1,n.depth=Math.max(0,-n.h),n.occ=this.occ?this.occ.distAt(e,t):99,n.near=r===this.nearG,!0}moistureAt(e,t){let n=this.inNear(e,t)?this.nearG:this.inFar(e,t)?this.farG:null;if(!n)return 0;let r=N(Math.round((e-n.minX)/n.cs),0,n.gw-1),i=N(Math.round((t-n.minZ)/n.cs),0,n.gh-1);return n.moist[i*n.gw+r]}},ee=500,B=.12,V=3,te=6,ne=`
#include <common>
#include <batching_pars_vertex>
varying vec3 vProbeWorld;
void main() {
  #include <batching_vertex>
  vec4 wp = vec4(position, 1.0);
  #ifdef USE_BATCHING
    wp = batchingMatrix * wp;
  #endif
  #ifdef USE_INSTANCING
    wp = instanceMatrix * wp;
  #endif
  wp = modelMatrix * wp;
  vProbeWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,re=`
uniform sampler2D tGround;
uniform vec4 uGround;      // world x0, z0, step, unused
uniform vec2 uGroundSize;  // texels
uniform float uSlab;       // 1 = slab pass
varying vec3 vProbeWorld;
float probeGround(vec2 xz) {
  vec2 g = (xz - uGround.xy) / uGround.z;
  vec2 i = clamp(floor(g), vec2(0.0), uGroundSize - 2.0);
  vec2 f = clamp(g - i, 0.0, 1.0);
  ivec2 ii = ivec2(i);
  float h00 = texelFetch(tGround, ii, 0).r;
  float h10 = texelFetch(tGround, ii + ivec2(1, 0), 0).r;
  float h01 = texelFetch(tGround, ii + ivec2(0, 1), 0).r;
  float h11 = texelFetch(tGround, ii + ivec2(1, 1), 0).r;
  return mix(mix(h00, h10, f.x), mix(h01, h11, f.x), f.y);
}
void main() {
  if (uSlab > 0.5) {
    float rel = vProbeWorld.y - probeGround(vProbeWorld.xz);
    if (rel < ${B.toFixed(3)} || rel > ${V.toFixed(3)}) discard;
  }
  gl_FragColor = vec4(vProbeWorld.y + ${ee.toFixed(1)}, 0.0, 0.0, 1.0);
}`;function ie(e,t,n=0){if(!(!e||n>2)){if(e.isObject3D){t.add(e);return}if(Array.isArray(e)){for(let r of e)ie(r,t,n+1);return}if(typeof e==`object`&&!(e instanceof Map)&&!ArrayBuffer.isView(e))for(let r of Object.keys(e)){let i=e[r];i&&typeof i==`object`&&ie(i,t,n+1)}}}var ae=/terrain|ground|sky|water|ocean|lagoon-surface|dune|collision/i;function oe(e,t){let{scene:n,registry:r}=e,i=new Set;for(let e of[`terrain`,`water`,`sky`,`lighting`,`waterfalls`,`ambient`,`vegetation`])ie(r.get(e),i);let a=new _;n.traverse(e=>{if(!e.visible||e===n)return;let r=i.has(e);if(!r&&(e.isPoints||e.isLine||e.isSprite)&&(r=!0),!r&&e.isMesh){let t=Array.isArray(e.material)?e.material[0]:e.material;!t||t.transparent||t.alphaTest>0||t.alphaToCoverage||t.isShaderMaterial||t.isRawShaderMaterial||t.alphaMap||e.geometry?.isInstancedBufferGeometry&&!e.isInstancedMesh||ae.test(e.name||``)||ae.test(t.name||``)?r=!0:e.geometry&&!e.isInstancedMesh&&!e.isBatchedMesh&&(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),a.copy(e.geometry.boundingSphere).applyMatrix4(e.matrixWorld),a.radius>900&&(r=!0))}t(e,r)})}function se(e){let t=e.geometry?.attributes??{},n=e.geometry?.morphAttributes?.position?.length??0;return[+!!e.isInstancedMesh,+!!e.instanceColor,+!!e.isBatchedMesh,+!!e._colorsTexture,+!!t.uv1,+!!t.uv2,+!!t.uv3,n,+!!e.isSkinnedMesh].join(``)}function ce(){let e={tGround:{value:null},uGround:{value:new b(0,0,1,0)},uGroundSize:{value:new w(2,2)},uSlab:{value:0}},t=new k({uniforms:e,vertexShader:ne,fragmentShader:re,side:2});return t.userData.noPatch=!0,{mat:t,uniforms:e,ready:Promise.resolve()}}function le(e,t){return e.layers.set(t.OPAQUE),e.layers.enable(t.NO_REFLECT),e}function ue(e){let{renderer:t,scene:r,LAYERS:i}=e,a=ce(),{mat:o}=a,s=Promise.resolve();if(t.compileAsync&&t.capabilities.isWebGL2){let c=new Map,u=[],d=new h(4,4,{type:l,depthBuffer:!1}),f=le(new n(-1,1,1,-1,1,400),i),p=t.getRenderTarget(),m=[];try{oe(e,(e,t)=>{if(t){e.visible=!1,u.push(e);return}if(!e.isMesh||e.children.length)return;let n=se(e);c.has(n)||c.set(n,e)}),t.setRenderTarget(d);for(let e of c.values()){let n=e.material;e.material=o;try{m.push(t.compileAsync(e,f,r))}finally{e.material=n}}}catch(e){console.warn(`[lagoon] vegetation probe precompile:`,e)}finally{t.setRenderTarget(p);for(let e of u)e.visible=!0}a.variants=c.size,s=Promise.all(m).catch(()=>null).finally(()=>d.dispose())}return a.ready=s,a}var de=1,fe=Math.SQRT2;function pe(e,t,n){let r=n*t;for(let i=0;i<t;i++){let a=r+i,o=e[a];if(o===0)continue;let s;i>0&&(s=e[a-1]+de)<o&&(o=s),n>0&&((s=e[a-t]+de)<o&&(o=s),i>0&&(s=e[a-t-1]+fe)<o&&(o=s),i<t-1&&(s=e[a-t+1]+fe)<o&&(o=s)),e[a]=o}}function me(e,t,n,r){let i=r*t;for(let a=t-1;a>=0;a--){let o=i+a,s=e[o];if(s===0)continue;let c;a<t-1&&(c=e[o+1]+de)<s&&(s=c),r<n-1&&((c=e[o+t]+de)<s&&(s=c),a<t-1&&(c=e[o+t+1]+fe)<s&&(s=c),a>0&&(c=e[o+t-1]+fe)<s&&(s=c)),e[o]=s}}function he(e,t,n,r,i,a,o,s,c,l){let u=i.maxZ-(c+.5)*a,d=(s-1-c)*o,f=0;for(let s=0;s<o;s++){let p=(c*o+s)*4,m=e[p],h=t[p]>1;if(!h&&m>1){let e=m-ee-r.groundHeight(i.minX+(s+.5)*a,u);h=e>B&&e<te}n[d+s]=h?0:l,h&&f++}return f}function ge(t,r,i,a=.25,o=null){let{renderer:s,scene:c,LAYERS:d}=t,p=performance.now(),m={};if(!s.capabilities.isWebGL2)return null;let g=Math.round((i.maxX-i.minX)/a),_=Math.round((i.maxZ-i.minZ)/a),y=[];try{oe(t,(e,t)=>{t&&(e.visible=!1,y.push(e))})}catch(e){for(let e of y)e.visible=!0;throw e}let b=new v(r.lat,r.lw,r.lh,A,l);b.minFilter=b.magFilter=f,b.generateMipmaps=!1,b.needsUpdate=!0;let x=o??ce();x.variants&&(m.variants=x.variants);let{uniforms:S,mat:C}=x;S.tGround.value=b,S.uGround.value.set(r.li0*r.step,r.lj0*r.step,r.step,0),S.uGroundSize.value.set(r.lw,r.lh);let w=new h(g,_,{type:l,format:e,depthBuffer:!0,minFilter:f,magFilter:f,generateMipmaps:!1}),T=(i.minX+i.maxX)/2,E=(i.minZ+i.maxZ)/2,D=(i.maxX-i.minX)/2,O=(i.maxZ-i.minZ)/2,k=new n(-D,D,O,-O,1,400);k.position.set(T,200,E),k.up.set(0,0,-1),k.lookAt(T,0,E),le(k,d),k.updateMatrixWorld(!0),k.updateProjectionMatrix();let j=s.getRenderTarget(),M=s.getClearColor(new u),N=s.getClearAlpha(),P=c.overrideMaterial,F=c.background,I=s.shadowMap.needsUpdate,L=new Float32Array(g*_*4),R=new Float32Array(g*_*4),z=!0;try{c.overrideMaterial=C,c.background=null,s.shadowMap.needsUpdate=!1,s.setRenderTarget(w),s.setClearColor(0,0),m.setup=Math.round(performance.now()-p);for(let e=0;e<2;e++){S.uSlab.value=e,s.clear(!0,!0,!1);let t=performance.now(),n=s.info.programs?.length??0;s.render(c,k),e===0&&(m.newPrograms=(s.info.programs?.length??0)-n);let r=performance.now();s.readRenderTargetPixels(w,0,0,g,_,e===0?L:R),m[`render`+e]=Math.round(r-t),m[`read`+e]=Math.round(performance.now()-r)}}catch(e){console.warn(`[lagoon] vegetation probe failed:`,e),z=!1}finally{c.overrideMaterial=P,c.background=F,s.shadowMap.needsUpdate=I,s.setRenderTarget(j),s.setClearColor(M,N);for(let e of y)e.visible=!0;w.dispose(),C.dispose(),b.dispose()}if(!z)return null;let ee=performance.now(),B=1e6,V=new Float32Array(g*_),te=0;for(let e=0;e<_;e++)te+=he(L,R,V,r,i,a,g,_,e,B);for(let e=0;e<_;e++)pe(V,g,e);for(let e=_-1;e>=0;e--)me(V,g,_,e);let ne=i.minX,re=i.minZ;return m.field=Math.round(performance.now()-ee),{W:g,H:_,res:a,minX:ne,minZ:re,dist:V,INF:B,times:m,occupiedFraction:te/(g*_),distAt(e,t){let n=Math.floor((e-ne)/a),r=Math.floor((t-re)/a);if(n<0||r<0||n>=g||r>=_)return 99;let i=V[r*g+n];return i>=B?99:Math.max(0,i*a-a*.5)}}}var H={COLS:4,ROWS:3,GREEN_A:0,GREEN_B:1,DRY_A:2,DRY_B:3,SEAGRASS:4,FLOWER_WARM:5,FLOWER_COOL:6,SEDGE:7,CATTAIL:8,REED:9,RUSH:10,TALL:11},U={COLS:4,ROWS:5,ELEPHANT:0,BANANA:1,FERN:2,SHRUB_A:3,SHRUB_B:4,BOUGAIN:5,OLEANDER:6,SCRUB:7,REED:8,CATTAIL:9,PAPYRUS:10,AGAVE:11,ALOE:12,BARK:13,STEM:14,BANANA_DRY:15,MAIDENHAIR:16,TAMARISK:17};function W(e,t=0,n=0,r=1,i=1,a=[0,0,0,0]){let o=e%4,s=Math.floor(e/4),c=U.ROWS;return a[0]=(o+t)/4,a[1]=(s+n)/c,a[2]=(o+r)/4,a[3]=(s+i)/c,a}var _e=e=>`
uniform int uOne;
const float PX = ${(1/e).toFixed(7)};
const vec2 NPER = vec2(1024.0);
float aaEdge(float e) { return clamp(e / PX + 0.5, 0.0, 1.0); }
float h1(float a, float b) { return bk_hash12(vec2(a, b)); }
vec2 h2(float a, float b) { return bk_hash22(vec2(a, b)); }
float vn(vec2 p) { return bk_vnoise(p, NPER); }
float fbm3(vec2 p) { return vn(p) * 0.5 + vn(p * 2.03 + 7.1) * 0.3 + vn(p * 4.11 + 3.3) * 0.2; }
float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
  return length(pa - ba * t);
}
float lineMask(float phase, float w) { float f = fract(phase); return 1.0 - smoothstep(w * 0.5, w, min(f, 1.0 - f)); }
float segT(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  return clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
}
`,ve=e=>_e(e)+`
// Paint one tapered, bent blade (painter's order: later blades on top).
// dk  depth shade (back of the clump darker, self-shadowed .. 1 front)
// tw  twist (0..1): the blade turns edge-on along its length and shows its
//     paler, bluish underside where it has turned over
// dt  dry-tip fraction (sun-bleached, dead tip); pale sheath at the base
void blade2(vec2 l, float bx, float h, float lean, float w0, float taperPow,
            vec3 cBase, vec3 cMid, vec3 cTip, float seed, float dk, float tw, float dt,
            inout vec3 col, inout float a) {
  float t = l.y / h;
  if (t <= 0.0 || t >= 1.0) return;
  float cx = bx + lean * t * t;
  float sl = 2.0 * lean * t / h;
  float tw1 = cos(t * (3.0 + 5.0 * h1(seed, 4.0)) + seed * 2.3);
  float hw = 0.5 * w0 * pow(max(1.0 - t, 1e-4), taperPow) * mix(1.0, 0.3 + 0.7 * abs(tw1), tw);
  float d = abs(l.x - cx) / sqrt(1.0 + sl * sl);
  float m = aaEdge(hw - d);
  if (m <= 0.0) return;
  float across = clamp((l.x - cx) / max(hw, 1e-4), -1.0, 1.0);
  vec3 c = t < 0.5 ? mix(cBase, cMid, t * 2.0) : mix(cMid, cTip, (t - 0.5) * 2.0);
  if (tw > 0.0 && tw1 < 0.0) c = mix(c, c * vec3(1.2, 1.22, 1.32) + vec3(0.012, 0.016, 0.014), tw * 0.75);
  if (dt > 0.001) c = mix(c, vec3(0.5, 0.42, 0.26) * (0.85 + 0.3 * h1(seed, 8.0)), smoothstep(1.0 - max(dt, 0.02), 1.0 - max(dt, 0.02) * 0.4, t));
  c = mix(c, vec3(0.3, 0.3, 0.17), (1.0 - smoothstep(0.02, 0.12, t)) * 0.28);
  c *= 0.8 + 0.2 * (1.0 - across * across);
  c *= 1.0 + 0.12 * (1.0 - smoothstep(0.0, 0.22, abs(across)));
  c *= 0.93 + 0.07 * cos(across * 12.566);
  c *= 0.88 + 0.24 * vn(vec2(across * 2.0 + seed * 13.0, t * 70.0));
  c *= dk;
  col = mix(col, c, m);
  a = max(a, m);
}

// thin stem
void stemLine(vec2 l, float bx, float h, float lean, float w, vec3 c0, vec3 c1, inout vec3 col, inout float a) {
  float t = l.y / h;
  if (t <= 0.0 || t >= 1.0) return;
  float cx = bx + lean * t * t;
  float m = aaEdge(w * 0.5 - abs(l.x - cx));
  if (m <= 0.0) return;
  col = mix(col, mix(c0, c1, t), m);
  a = max(a, m);
}

// straight tapered strip p0 -> p1 (a leaf folded over at its kink, a fallen blade)
void strip(vec2 l, vec2 p0, vec2 p1, float w, vec3 c0, vec3 c1, float seed, inout vec3 col, inout float a) {
  float t = segT(l, p0, p1);
  float hw = 0.5 * w * (1.0 - 0.9 * t * t);
  float d = segDist(l, p0, p1);
  float m = aaEdge(hw - d);
  if (m <= 0.0) return;
  vec3 c = mix(c0, c1, t) * (0.86 + 0.26 * vn(vec2(d * 300.0 + seed, t * 40.0)));
  col = mix(col, c, m);
  a = max(a, m);
}

// seed head on the last 'len' of a stem of height h: a spindle of small
// spikelets around a thin rachis (dens 0..1 packing), not a solid plume
void panicle(vec2 l, float bx, float h, float lean, float len, float wid, vec3 c, float seed, float dens, inout vec3 col, inout float a) {
  float t0 = 1.0 - len / h;
  float t = l.y / h;
  if (t <= t0 || t >= 1.0) return;
  float cx = bx + lean * t * t;
  float u = (t - t0) / (1.0 - t0);
  float hw = wid * pow(max(sin(3.14159 * u), 1e-4), 0.8) * (0.75 + 0.25 * u);
  float dx = abs(l.x - cx);
  if (dx > hw + PX * 2.0) return;
  float n = vn(vec2((l.x - cx) / max(wid, 1e-4) * 3.0, u * len * 240.0) + seed * 7.0);
  float g = smoothstep(1.0 - dens, 1.08 - dens * 0.6, n + 0.3 * (1.0 - dx / max(hw, 1e-4)));
  float m = max(aaEdge(hw - dx) * g, aaEdge(0.0022 - dx));
  if (m <= 0.0) return;
  col = mix(col, c * (0.78 + 0.4 * n), m);
  a = max(a, m);
}

// composite flower head (ray florets round a disc) seen tilted: sq squashes it
// vertically (0.35 nearly edge-on .. 1 facing the viewer)
void composite(vec2 l, vec2 c, float R, float sq, float rays, vec3 cRay, vec3 cDisc, float seed, inout vec3 col, inout float a) {
  vec2 q = (l - c) / vec2(1.0, sq);
  float r = length(q);
  if (r > R * 1.1) return;
  float ang = atan(q.y, q.x + 1e-6) + seed * 6.2831;
  float pr = R * (0.36 + 0.64 * pow(abs(cos(ang * rays * 0.5)), 0.3));
  float m = aaEdge((pr - r) * sq);
  if (m <= 0.0) return;
  float disc = 1.0 - smoothstep(R * 0.28, R * 0.36, r);
  vec3 rc = cRay * (0.75 + 0.32 * (r / R)) * (0.9 + 0.2 * vn(q * 600.0));
  rc *= 1.0 - 0.18 * step(q.y, 0.0) * (1.0 - sq);
  vec3 dc = cDisc * (0.7 + 0.45 * vn(q * 900.0 + seed));
  col = mix(col, mix(rc, dc, disc), m);
  a = max(a, m);
}

// five-petal cup flower (mallow / flax), tilted
void cupFlower(vec2 l, vec2 c, float R, float sq, vec3 cp, float seed, inout vec3 col, inout float a) {
  vec2 q = (l - c) / vec2(1.0, sq);
  float r = length(q);
  if (r > R * 1.1) return;
  float ang = atan(q.y, q.x + 1e-6) + seed * 6.2831;
  float pr = R * (0.6 + 0.4 * pow(abs(cos(ang * 2.5)), 0.6));
  float m = aaEdge((pr - r) * sq);
  if (m <= 0.0) return;
  float vein = lineMask(ang * 3.183, 0.08) * smoothstep(0.2, 0.6, r / R);
  vec3 pc = cp * (0.68 + 0.45 * (r / R)) * (1.0 - 0.25 * vein);
  pc = mix(pc, vec3(0.85, 0.82, 0.7), 1.0 - smoothstep(R * 0.12, R * 0.22, r));
  col = mix(col, pc, m);
  a = max(a, m);
}

// a small cluster of tiny florets (heliotrope / verbena-like)
void florets(vec2 l, vec2 c, float R, vec3 cp, float seed, inout vec3 col, inout float a) {
  for (int k = 0; k < 7; k++) {
    float fk = float(k);
    vec2 o = (h2(fk, seed + 31.0) - 0.5) * R * 1.7;
    vec2 q = l - c - o;
    float r = length(q);
    float rr = R * 0.34;
    if (r > rr * 1.2) continue;
    float ang = atan(q.y, q.x + 1e-6) + fk;
    float pr = rr * (0.6 + 0.4 * abs(cos(ang * 2.5)));
    float m = aaEdge(pr - r);
    if (m <= 0.0) continue;
    vec3 pc = cp * (0.72 + 0.4 * r / rr);
    pc = mix(pc, vec3(0.85, 0.8, 0.6), 1.0 - smoothstep(rr * 0.1, rr * 0.25, r));
    col = mix(col, pc, m);
    a = max(a, m);
  }
}

// green bunch grass: dead thatch behind, live blades back-to-front (darker at
// the back: self-shadowing inside the clump), some twisted, a few dry-tipped
vec4 tileGreen(vec2 l, float seed, float broad) {
  vec3 col = vec3(0.08, 0.14, 0.03);
  float a = 0.0;
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi + 700.0, seed), r2 = h2(fi + 757.0, seed);
    float bx = 0.5 + (r1.x - 0.5) * 0.6;
    float h = mix(0.16, 0.46, r1.y);
    float lean = clamp((bx - 0.5) * 1.6 + (r2.x - 0.5) * 0.7, 0.05 - bx, 0.95 - bx);
    vec3 dc = mix(vec3(0.19, 0.15, 0.085), vec3(0.33, 0.27, 0.16), r2.y);
    blade2(l, bx, h, lean, mix(0.014, 0.024, r2.y), 0.6, dc * 0.6, dc, dc * 1.15, fi + seed + 40.0, 0.7, 0.0, 0.0, col, a);
  }
  for (int i = 0; i < 38; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, seed), r2 = h2(fi + 57.0, seed + 3.1), r3 = h2(fi + 91.0, seed + 5.7);
    float bx = 0.5 + (r1.x - 0.5) * 0.62;
    float h = mix(0.38, 0.97, r1.y * r1.y * 0.4 + r1.y * 0.6);
    float lean = clamp((bx - 0.5) * 1.1 + (r2.x - 0.5) * 0.45, 0.05 - bx, 0.95 - bx);
    float w0 = mix(0.016, 0.034, r2.y) * (1.0 + broad * 0.6);
    float v = r3.x;
    vec3 cb = vec3(0.03, 0.055, 0.014);
    vec3 cm = mix(vec3(0.075, 0.15, 0.028), vec3(0.115, 0.185, 0.04), v);
    vec3 ct = mix(vec3(0.17, 0.25, 0.055), vec3(0.27, 0.29, 0.1), v * v);
    float dt = r3.y > 0.8 ? 0.25 + 0.3 * h1(fi, seed + 9.0) : 0.0;
    float tw = h1(fi, seed + 17.0) > 0.6 ? 0.8 : 0.0;
    blade2(l, bx, h, lean, w0, 0.55, cb, cm, ct, fi + seed, 0.62 + 0.38 * fi / 38.0, tw, dt, col, a);
  }
  if (broad > 0.75) {
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      vec2 r1 = h2(fi + 201.0, seed);
      float bx = 0.3 + 0.4 * r1.x, h = mix(0.8, 0.98, r1.y), lean = (bx - 0.5) * 0.4;
      stemLine(l, bx, h, lean, 0.006, vec3(0.08, 0.13, 0.03), vec3(0.2, 0.22, 0.08), col, a);
      panicle(l, bx, h, lean, 0.17, 0.02, vec3(0.24, 0.23, 0.1), fi + seed, 0.62, col, a);
    }
  }
  return vec4(col, a);
}

// golden dry bunchgrass: grey weathered dead blades, straw blades with a few
// still-green ones, thin tan seed panicles
vec4 tileDry(vec2 l, float seed, float bunch) {
  vec3 col = vec3(0.4, 0.3, 0.14);
  float a = 0.0;
  for (int i = 0; i < 10; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi + 800.0, seed), r2 = h2(fi + 857.0, seed);
    float bx = 0.5 + (r1.x - 0.5) * 0.55;
    float h = mix(0.15, 0.45, r1.y);
    float lean = clamp((bx - 0.5) * 2.0 + (r2.x - 0.5) * 0.8, 0.05 - bx, 0.95 - bx);
    vec3 dc = mix(vec3(0.2, 0.18, 0.14), vec3(0.36, 0.33, 0.27), r2.y);
    blade2(l, bx, h, lean, mix(0.01, 0.02, r2.y), 0.7, dc * 0.55, dc, dc * 1.1, fi + seed + 60.0, 0.72, 0.0, 0.0, col, a);
  }
  int nb = bunch > 0.5 ? 44 : 34;
  for (int i = 0; i < 44; i++) {
    if (i >= nb) break;
    float fi = float(i);
    vec2 r1 = h2(fi, seed), r2 = h2(fi + 57.0, seed + 3.1), r3 = h2(fi + 91.0, seed + 5.7);
    float spread = bunch > 0.5 ? 0.42 : 0.6;
    float bx = 0.5 + (r1.x - 0.5) * spread;
    float h = mix(0.35, 0.95, r1.y);
    float lean = (bx - 0.5) * (bunch > 0.5 ? 1.9 : 1.2) + (r2.x - 0.5) * 0.5;
    lean = clamp(lean, 0.04 - bx, 0.96 - bx);
    float w0 = mix(0.011, 0.026, r2.y);
    float v = r3.x;
    vec3 cb = vec3(0.13, 0.1, 0.05);
    vec3 cm = mix(vec3(0.42, 0.33, 0.17), vec3(0.52, 0.45, 0.27), v);
    vec3 ct = mix(vec3(0.6, 0.53, 0.37), vec3(0.67, 0.62, 0.5), v);
    if (r3.y > 0.84) { cm = mix(cm, vec3(0.2, 0.24, 0.1), 0.6); cb = vec3(0.05, 0.07, 0.025); }
    if (r3.y < 0.22) { cm = mix(cm, vec3(0.32, 0.3, 0.26), 0.65); ct = mix(ct, vec3(0.47, 0.45, 0.41), 0.65); }
    blade2(l, bx, h, lean, w0, 0.7, cb, cm, ct, fi + seed, 0.66 + 0.34 * fi / float(nb), h1(fi, seed + 13.0) > 0.7 ? 0.7 : 0.0, 0.0, col, a);
  }
  int ns = bunch > 0.5 ? 4 : 8;
  for (int i = 0; i < 8; i++) {
    if (i >= ns) break;
    float fi = float(i);
    vec2 r1 = h2(fi + 301.0, seed);
    float bx = 0.28 + 0.44 * r1.x, h = mix(0.78, 0.98, r1.y), lean = (bx - 0.5) * 0.7;
    stemLine(l, bx, h, lean, 0.0045, vec3(0.3, 0.23, 0.12), vec3(0.56, 0.5, 0.36), col, a);
    panicle(l, bx, h, lean, bunch > 0.5 ? 0.12 : 0.22, bunch > 0.5 ? 0.014 : 0.022, vec3(0.6, 0.55, 0.44), fi + seed, bunch > 0.5 ? 0.7 : 0.5, col, a);
  }
  return vec4(col, a);
}

// thin olive ribbons (the grass shader also renders them at partial coverage
// so they read as translucent tufts over the sand, not dark blobs)
vec4 tileSeagrass(vec2 l) {
  vec3 col = vec3(0.09, 0.12, 0.035);
  float a = 0.0;
  for (int i = 0; i < 14; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, 41.0), r2 = h2(fi + 7.0, 43.0);
    float bx = 0.5 + (r1.x - 0.5) * 0.7;
    float h = mix(0.55, 0.97, r1.y);
    float lean = (r2.x - 0.5) * 0.35;
    lean = clamp(lean, 0.08 - bx, 0.92 - bx);
    float t = l.y / h;
    if (t <= 0.0 || t >= 1.0) continue;
    float cx = bx + lean * t * t + 0.025 * sin(t * 7.0 + fi * 2.1) * t;
    float t4 = t * t * t * t;
    float hw = mix(0.017, 0.027, r2.y) * (1.0 - t4 * t4);
    float m = aaEdge(hw - abs(l.x - cx));
    if (m <= 0.0) continue;
    float across = (l.x - cx) / max(hw, 1e-4);
    vec3 c = mix(vec3(0.07, 0.1, 0.03), mix(vec3(0.14, 0.18, 0.05), vec3(0.23, 0.22, 0.085), t), smoothstep(0.0, 0.3, t));
    c *= 0.85 + 0.15 * (1.0 - across * across);
    float epi = smoothstep(0.62, 0.8, vn(l * vec2(90.0, 50.0) + fi));
    c = mix(c, vec3(0.3, 0.27, 0.16), epi * t * 0.6);
    col = mix(col, c, m);
    a = max(a, m);
  }
  return vec4(col, a);
}

// wildflower patch: narrow grey-green basal leaves, thin stems, small flower
// heads seen in perspective (tilted ellipses), buds and a spent head or two.
// warm: yellow composites (Senecio / desert-marigold-like) + white chamomile;
// cool: pink mallow cups + purple floret clusters
vec4 tileFlowers(vec2 l, float seed, float cool) {
  vec3 col = vec3(0.07, 0.12, 0.03);
  float a = 0.0;
  for (int i = 0; i < 24; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, seed), r2 = h2(fi + 57.0, seed + 3.1);
    float bx = 0.5 + (r1.x - 0.5) * 0.7;
    float lean = clamp((bx - 0.5) * 1.5 + (r2.x - 0.5) * 0.4, 0.05 - bx, 0.95 - bx);
    vec3 lc = mix(vec3(0.055, 0.09, 0.03), vec3(0.11, 0.15, 0.06), r2.y);
    blade2(l, bx, mix(0.12, 0.42, r1.y), lean, mix(0.02, 0.034, r2.y), 0.6, lc * 0.45, lc, lc * 1.15, fi + seed, 0.62 + 0.38 * fi / 24.0, 0.5, r2.x > 0.85 ? 0.3 : 0.0, col, a);
  }
  for (int i = 0; i < 18; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi + 400.0, seed), r2 = h2(fi + 450.0, seed);
    float bx = 0.18 + 0.64 * r1.x;
    float h = mix(0.34, 0.86, r1.y);
    float lean = clamp((bx - 0.5) * 0.5 + (r2.x - 0.5) * 0.3, 0.1 - bx, 0.9 - bx);
    stemLine(l, bx, h, lean, 0.005, vec3(0.05, 0.09, 0.025), vec3(0.09, 0.13, 0.04), col, a);
    vec2 hc = vec2(bx + lean, h);
    float sq = mix(0.38, 0.95, r2.y);
    float R = mix(0.026, 0.04, h1(fi, seed + 3.0));
    float kind = h1(fi, seed + 6.0);
    if (fi > 14.5) {
      float bm = aaEdge(R * 0.35 - length((l - hc) * vec2(1.0, 0.8)));
      vec3 bc = fi > 16.5 ? vec3(0.22, 0.16, 0.07) : vec3(0.14, 0.17, 0.05);
      col = mix(col, bc, bm); a = max(a, bm);
    } else if (cool > 0.5) {
      if (kind < 0.55) cupFlower(l, hc, R * 1.15, sq, mix(vec3(0.6, 0.2, 0.4), vec3(0.72, 0.38, 0.58), r2.x), fi, col, a);
      else florets(l, hc, R * 1.1, mix(vec3(0.3, 0.17, 0.5), vec3(0.42, 0.3, 0.66), r2.x), fi, col, a);
    } else {
      if (kind < 0.6) composite(l, hc, R, sq, 13.0, vec3(0.86, 0.58, 0.04), vec3(0.62, 0.32, 0.02), fi, col, a);
      else composite(l, hc, R * 0.9, sq, 17.0, vec3(0.82, 0.81, 0.74), vec3(0.78, 0.56, 0.05), fi, col, a);
    }
  }
  return vec4(col, a);
}

vec4 tileSedge(vec2 l) {
  vec3 col = vec3(0.2, 0.19, 0.1);
  float a = 0.0;
  for (int i = 0; i < 42; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, 71.0), r2 = h2(fi + 57.0, 73.0), r3 = h2(fi + 13.0, 79.0);
    float bx = 0.5 + (r1.x - 0.5) * 0.5;
    float h = mix(0.35, 0.96, r1.y);
    float lean = clamp((bx - 0.5) * 1.5 + (r2.x - 0.5) * 0.25, 0.05 - bx, 0.95 - bx);
    vec3 cm = mix(vec3(0.12, 0.14, 0.06), vec3(0.3, 0.26, 0.13), r3.x);
    blade2(l, bx, h, lean, mix(0.01, 0.018, r2.y), 0.8, vec3(0.05, 0.05, 0.02), cm, mix(cm, vec3(0.5, 0.42, 0.25), 0.6), fi, 0.66 + 0.34 * fi / 42.0, 0.0, 0.0, col, a);
  }
  return vec4(col, a);
}

// cattail (Typha) stand: dead leaves at the foot, long strap leaves (a few
// folded over at a kink), brown flower spikes with the thin male spike above
vec4 tileCattails(vec2 l) {
  vec3 col = vec3(0.06, 0.1, 0.028);
  float a = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi + 900.0, 81.0);
    float bx = 0.3 + 0.4 * r1.x, dir = r1.x > 0.5 ? 1.0 : -1.0;
    strip(l, vec2(bx, 0.01), vec2(clamp(bx + dir * mix(0.15, 0.3, r1.y), 0.04, 0.96), mix(0.12, 0.3, r1.y)), 0.022,
      vec3(0.2, 0.15, 0.08), vec3(0.3, 0.24, 0.14), fi, col, a);
  }
  for (int i = 0; i < 32; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, 81.0), r2 = h2(fi + 57.0, 83.0), r3 = h2(fi + 91.0, 87.0);
    float bx = 0.5 + (r1.x - 0.5) * 0.52;
    float h = mix(0.42, 0.98, pow(r1.y, 0.7));
    float lean = clamp((bx - 0.5) * 0.5 + (r2.x - 0.5) * 0.35, 0.04 - bx, 0.96 - bx);
    float w0 = mix(0.017, 0.028, r2.y);
    float dk = 0.6 + 0.4 * fi / 32.0;
    vec3 cm = mix(vec3(0.055, 0.1, 0.03), vec3(0.1, 0.155, 0.055), r3.x);
    vec3 ct = r3.x > 0.82 ? vec3(0.34, 0.28, 0.13) : cm * 1.25;
    float fold = step(0.8, r3.y);
    float hh = fold > 0.5 ? h * mix(0.55, 0.75, h1(fi, 5.0)) : h;
    blade2(l, bx, hh, lean, w0, fold > 0.5 ? 0.12 : 0.3, cm * 0.5, cm, fold > 0.5 ? cm : ct, fi, dk, 0.45, fold > 0.5 ? 0.0 : 0.25, col, a);
    if (fold > 0.5) {
      vec2 k0 = vec2(bx + lean, hh - 0.004);
      float dir = bx + lean > 0.5 ? 1.0 : -1.0;
      vec2 k1 = vec2(clamp(k0.x + dir * mix(0.1, 0.2, h1(fi, 7.0)), 0.04, 0.96), max(0.05, k0.y - mix(0.14, 0.3, h1(fi, 8.0))));
      strip(l, k0, k1, w0 * 0.8, cm * dk, mix(cm, vec3(0.3, 0.26, 0.12), 0.35) * dk, fi, col, a);
    }
  }
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi + 301.0, 81.0);
    float bx = 0.26 + 0.48 * r1.x, h = mix(0.86, 0.99, r1.y), lean = (r1.x - 0.5) * 0.08;
    stemLine(l, bx, h, lean, 0.008, vec3(0.07, 0.11, 0.035), vec3(0.12, 0.15, 0.06), col, a);
    float t = l.y / h;
    float cx = bx + lean * t * t;
    float u = (t - 0.68) / 0.15;
    if (u > 0.0 && u < 1.0) {
      float hw = 0.017 * (1.0 - pow(max(abs(u * 2.0 - 1.0), 1e-4), 6.0));
      float m = aaEdge(hw - abs(l.x - cx));
      vec3 hc = mix(vec3(0.07, 0.038, 0.017), vec3(0.16, 0.095, 0.048), vn(l * vec2(220.0, 70.0)));
      col = mix(col, hc * (0.72 + 0.38 * (1.0 - abs(l.x - cx) / max(hw, 1e-4))), m);
      a = max(a, m);
    }
    float u2 = (t - 0.85) / 0.1;
    if (u2 > 0.0 && u2 < 1.0) {
      float m = aaEdge(0.006 * (1.0 - u2 * 0.5) - abs(l.x - cx));
      col = mix(col, vec3(0.3, 0.24, 0.12) * (0.8 + 0.4 * vn(l * 300.0)), m);
      a = max(a, m);
    }
  }
  return vec4(col, a);
}

// common reed (Phragmites-like): spreading leaves + soft purple-brown panicles
vec4 tilePlumedReed(vec2 l) {
  vec3 col = vec3(0.12, 0.13, 0.05);
  float a = 0.0;
  for (int i = 0; i < 30; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, 93.0), r2 = h2(fi + 57.0, 95.0), r3 = h2(fi + 91.0, 97.0);
    float bx = 0.5 + (r1.x - 0.5) * 0.66;
    float h = mix(0.35, 0.85, r1.y);
    float lean = clamp((bx - 0.5) * 1.3 + (r2.x - 0.5) * 0.6, 0.04 - bx, 0.96 - bx);
    vec3 cm = mix(vec3(0.08, 0.13, 0.03), vec3(0.17, 0.2, 0.06), r3.x);
    blade2(l, bx, h, lean, mix(0.022, 0.04, r2.y), 0.6, cm * 0.45, cm, mix(cm, vec3(0.4, 0.34, 0.18), 0.45), fi, 0.62 + 0.38 * fi / 30.0, 0.6, r3.y > 0.7 ? 0.3 : 0.0, col, a);
  }
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi + 401.0, 91.0);
    float bx = 0.2 + 0.6 * r1.x, h = mix(0.84, 0.99, r1.y), lean = (r1.x - 0.5) * 0.18;
    stemLine(l, bx, h, lean, 0.008, vec3(0.1, 0.12, 0.045), vec3(0.3, 0.26, 0.14), col, a);
    panicle(l, bx, h, lean, 0.2, 0.045, vec3(0.32, 0.22, 0.17), fi + 3.0, 0.62, col, a);
  }
  return vec4(col, a);
}

// rushes (Juncus): very dense thin round stems, brown flower tufts near the top
vec4 tileRush(vec2 l) {
  vec3 col = vec3(0.05, 0.09, 0.025);
  float a = 0.0;
  for (int i = 0; i < 64; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, 111.0), r2 = h2(fi + 57.0, 113.0), r3 = h2(fi + 91.0, 117.0);
    float bx = 0.5 + (r1.x - 0.5) * 0.46;
    float h = mix(0.45, 0.97, r1.y);
    float lean = clamp((bx - 0.5) * 0.9 + (r2.x - 0.5) * 0.18, 0.04 - bx, 0.96 - bx);
    vec3 cm = mix(vec3(0.035, 0.075, 0.02), vec3(0.08, 0.14, 0.035), r3.x);
    vec3 ct = r3.y > 0.7 ? vec3(0.3, 0.22, 0.1) : cm * 1.2;
    blade2(l, bx, h, lean, mix(0.011, 0.018, r2.y), 0.12, cm * 0.5, cm, ct, fi, 0.62 + 0.38 * fi / 64.0, 0.0, 0.0, col, a);
    if (r3.y > 0.85) {
      vec2 c = vec2(bx + lean * 0.64 + 0.008, h * 0.8);
      float m = aaEdge(0.012 - length((l - c) * vec2(1.0, 0.6))) * smoothstep(0.3, 0.6, vn(l * 400.0));
      col = mix(col, vec3(0.22, 0.14, 0.07), m); a = max(a, m);
    }
  }
  return vec4(col, a);
}

`,ye=[`tileGreen(l, 11.0, 0.0)`,`tileGreen(l, 23.0, 1.0)`,`tileDry(l, 31.0, 0.0)`,`tileDry(l, 37.0, 1.0)`,`tileSeagrass(l)`,`tileFlowers(l, 51.0, 0.0)`,`tileFlowers(l, 57.0, 1.0)`,`tileSedge(l)`,`tileCattails(l)`,`tilePlumedReed(l)`,`tileRush(l)`,`tileGreen(l, 67.0, 0.5)`],be=e=>`
vec4 bake(vec2 l) {
  l.y /= 0.985;               // keep blades off the tile top edge (mip bleed)
  vec4 c = ${e};
  if (l.y >= 1.0) c.a = 0.0;
  return vec4(max(c.rgb, vec3(0.0)), c.a);
}`,xe=e=>_e(e)+`
// thin: 1 = thin leaf blade (transmits light), lower where tissue is thick
// (veins, midribs, stems, succulent leaves, bark): baked into ORM blue and
// read by the leaf shader's translucency term
struct Surf { vec3 col; float a; float h; float rough; float ao; float thin; };
Surf sBg(vec3 bg, float rough) { Surf s; s.col = bg; s.a = 0.0; s.h = 0.0; s.rough = rough; s.ao = 1.0; s.thin = 1.0; return s; }


// 0 --- elephant ear (Alocasia / Colocasia)
Surf tElephant(vec2 l) {
  Surf s = sBg(vec3(0.04, 0.09, 0.025), 0.45);
  float y = l.y, dx = l.x - 0.5, ax = abs(dx);
  // sagittate-cordate outline: ovate-deltoid blade with an acuminate tip, two
  // rounded basal lobes below the (peltate) petiole junction J = (0.5, 0.26),
  // a narrow V sinus between them, gently wavy margin
  float sn = clamp((y - 0.2) / 0.77, 0.0, 1.0);
  float hw = 0.46 * pow(max(sin(3.14159 * (0.5 + 0.5 * pow(max(sn, 1e-4), 0.8))), 1e-4), 0.6);
  float eMain = y >= 0.2 ? hw - ax : -1.0;
  vec2 lq = (vec2(ax, y) - vec2(0.24, 0.22)) / vec2(0.22, 0.2);
  float e = max(eMain, (1.0 - length(lq)) * 0.2);
  e += 0.006 * sin(y * 47.0 + ax * 9.0) * smoothstep(0.1, 0.3, ax + y * 0.3);
  if (y < 0.26) e = min(e, ax - (0.26 - y) * 0.5);
  e = min(e, min(y - 0.012, 0.975 - y));
  s.a = aaEdge(e);
  float mid = y > 0.25 ? 1.0 - smoothstep(0.003, 0.01, ax) : 0.0;
  float basal = 1.0 - smoothstep(0.003, 0.009, min(segDist(l, vec2(0.5, 0.26), vec2(0.2, 0.06)), segDist(l, vec2(0.5, 0.26), vec2(0.8, 0.06))));
  float ph = abs(y - 0.26) * 11.5 - ax * 7.0 + ax * ax * 5.0;
  float lat = lineMask(ph, 0.09) * smoothstep(0.012, 0.03, ax) * smoothstep(0.0, 0.05, e);
  // Colocasia (taro): deep matte blue-green lamina with a faint waxy bloom,
  // primary veins only a little paler (they are sunken, the tissue between
  // them bulges: "quilted"), a fine reticulate network between the laterals,
  // a slightly purplish eye where the petiole joins, a thin pale rim and the
  // odd brown margin scorch / tear on older leaves
  float lat2 = lineMask(ph * 3.0 + 0.5, 0.07) * smoothstep(0.02, 0.05, ax) * smoothstep(0.0, 0.03, e);
  vec3 wv = bk_worley(l, vec2(38.0));
  float net = 1.0 - smoothstep(0.02, 0.1, wv.y - wv.x);
  float vein = max(mid, max(basal, lat * 0.75));
  float mott = fbm3(l * 14.0);
  float mott2 = fbm3(l * 3.5 + 11.0);
  vec3 c = vec3(0.036, 0.078, 0.022) * (0.86 + 0.28 * mott) * (0.9 + 0.2 * mott2);
  c = mix(c, vec3(0.05, 0.095, 0.03), (1.0 - smoothstep(0.0, 0.35, ax)) * 0.3);
  c = mix(c, c * vec3(1.05, 1.08, 1.35) + vec3(0.006, 0.008, 0.012), 0.35 * smoothstep(0.35, 0.7, mott2));  // bloom
  c = mix(c, vec3(0.085, 0.13, 0.05), vein * 0.5);
  c = mix(c, c * 1.15, max(lat2 * 0.35, net * 0.18));
  float eye = 1.0 - smoothstep(0.015, 0.06, length((l - vec2(0.5, 0.26)) * vec2(1.0, 1.3)));
  c = mix(c, vec3(0.09, 0.05, 0.06), eye * 0.6);
  float rim = 1.0 - smoothstep(0.0, 0.006, e);
  c = mix(c, vec3(0.09, 0.12, 0.045), rim * 0.5);
  float scorch = smoothstep(0.62, 0.8, fbm3(l * 9.0 + 3.0)) * (1.0 - smoothstep(0.0, 0.05, e));
  c = mix(c, vec3(0.16, 0.1, 0.045), scorch * 0.85);
  c = mix(c, vec3(0.07, 0.1, 0.03), smoothstep(0.86, 0.97, y) * 0.2);
  s.col = c;
  float bulge = 1.0 - lineMask(ph, 0.9) ;
  s.h = 0.55 - 0.4 * vein - 0.1 * lat2 - 0.05 * net + 0.14 * bulge + 0.18 * (1.0 - smoothstep(0.0, 0.45, ax));
  s.thin = (1.0 - 0.75 * vein) * (1.0 - 0.5 * scorch);
  s.rough = 0.62 - 0.1 * vein + 0.08 * mott + 0.2 * scorch;
  s.ao = 1.0 - 0.14 * vein - 0.2 * (1.0 - smoothstep(0.0, 0.12, length(l - vec2(0.5, 0.26))));
  return s;
}

// 1 / 15 --- banana leaf (fresh / dry)
Surf tBanana(vec2 l, float dry) {
  Surf s = sBg(mix(vec3(0.09, 0.19, 0.04), vec3(0.26, 0.17, 0.08), dry), mix(0.5, 0.8, dry));
  float y = l.y, dx = l.x - 0.5, ax = abs(dx);
  float sn = clamp((y - 0.02) / 0.96, 0.0, 1.0);
  float hw = 0.43 * pow(max(sin(3.14159 * sn), 1e-5), 0.3) * (1.0 - 0.15 * sn);
  float e = hw - ax;
  float vc = (y + ax * 0.33) * 23.0;
  float tn = h1(floor(vc), 3.0 + dry * 11.0);
  float td = max(0.0, tn - (0.62 - dry * 0.3)) * 1.6 * hw;
  float gap = min(fract(vc), 1.0 - fract(vc)) / 23.0 - 0.0022;
  if (ax > hw - td) e = min(e, gap);
  e = min(e, min(y - 0.02, 0.98 - y));
  s.a = aaEdge(e);
  float mid = 1.0 - smoothstep(0.012, 0.022, ax);
  float str = vn(vec2(4.0, (y + ax * 0.33) * 260.0));
  float mott = fbm3(l * vec2(6.0, 18.0));
  vec3 fresh = mix(vec3(0.075, 0.18, 0.03), vec3(0.13, 0.22, 0.04), smoothstep(0.1, 0.42, ax) * 0.6 + mott * 0.3);
  vec3 dead = mix(vec3(0.2, 0.12, 0.05), vec3(0.36, 0.26, 0.12), mott) * (0.8 + 0.3 * str);
  vec3 c = mix(fresh, dead, dry);
  float necro = (1.0 - smoothstep(0.0, 0.012, e)) * (1.0 - dry);
  c = mix(c, vec3(0.3, 0.22, 0.09), necro * 0.8);
  c *= 0.9 + 0.14 * str;
  c = mix(c, mix(vec3(0.24, 0.29, 0.08), vec3(0.4, 0.3, 0.14), dry), mid * 0.85);
  s.col = c;
  s.h = 0.4 + 0.5 * mid + 0.12 * str;
  s.thin = (1.0 - 0.8 * mid) * mix(1.0, 0.6, dry) * (0.85 + 0.15 * str);
  s.rough = mix(0.46, 0.82, dry) + 0.06 * str;
  s.ao = 1.0 - 0.15 * (1.0 - smoothstep(0.0, 0.03, abs(ax - 0.022)));
  return s;
}

// 2 --- fern frond (pinnate)
Surf tFern(vec2 l) {
  Surf s = sBg(vec3(0.05, 0.12, 0.025), 0.6);
  float y = l.y;
  float rx = 0.5 + 0.012 * sin(y * 4.0);
  float dx = l.x - rx, ax = abs(dx);
  float side = dx >= 0.0 ? 1.0 : -1.0;
  float ta = 0.62;
  float sp = 0.036;
  float off = side > 0.0 ? 0.0 : sp * 0.5;
  float yl = y - ax * ta - off;
  float k = floor(yl / sp + 0.5);
  float yb = k * sp + off;
  float dv = (yl - k * sp) / 1.18;
  float yn = clamp((yb - 0.02) / 0.95, 0.0, 1.0);
  float L = 0.44 * pow(max(sin(3.14159 * pow(max(yn, 1e-4), 0.8)), 1e-4), 0.7) * (1.0 - 0.3 * yn);
  float u = ax / max(L, 1e-3);
  float hwp = sp * 0.46 * (1.0 - u * u) * (0.55 + 0.45 * pow(abs(sin(u * 3.14159 * 6.5 + k * 0.7)), 0.6));
  float e = min(hwp - abs(dv), (1.0 - u) * L);
  if (yb < 0.02 || yb > 0.95) e = -1.0;
  float rach = 0.007 * (1.0 - 0.6 * y) - ax;
  if (y > 0.985 || y < 0.01) rach = -1.0;
  float ef = max(e, rach);
  s.a = aaEdge(ef);
  float n = fbm3(l * 20.0);
  vec3 c = mix(vec3(0.055, 0.12, 0.016), vec3(0.11, 0.19, 0.028), u * 0.6 + 0.25 * n);
  c = mix(c, vec3(0.13, 0.22, 0.05), smoothstep(0.7, 0.98, y) * 0.55);
  c *= 0.88 + 0.24 * h1(k, side + 3.0);                    // pinna-to-pinna variation
  float pv = 1.0 - smoothstep(0.0, 0.25, abs(dv) / max(hwp, 1e-4));
  c *= 0.85 + 0.2 * pv;
  if (rach > e) c = vec3(0.07, 0.08, 0.03);
  s.col = c;
  s.h = rach > e ? 0.8 : 0.35 + 0.35 * pv;
  s.thin = rach > e ? 0.2 : 0.9;
  s.rough = 0.58 + 0.08 * n;
  s.ao = 0.85 + 0.15 * pv;
  return s;
}

// One leaf blade (painter's order: later leaves on top). p = petiole point,
// d = unit direction, shape 0 elliptic, 1 lanceolate, 2 ovate (widest low).
// Midrib, pinnate lateral veins, convex blade shading, darker margin, and a
// few blemished / yellowing leaves so the mass never reads as one flat green.
void leafPaint(inout Surf s, vec2 l, vec2 p, vec2 d, float len, float ratio, float shape,
               vec3 c0, vec3 c1, float rough, float seed) {
  vec2 q = l - p;
  float t = dot(q, d) / len;
  if (t <= 0.0 || t >= 1.0) return;
  float ac = dot(q, vec2(-d.y, d.x));
  float ts = shape < 0.5 ? t : (shape < 1.5 ? pow(t, 0.85) : pow(t, 0.62));
  float prof = pow(max(sin(3.14159 * ts), 1e-4), shape < 1.5 ? 0.8 : 0.66);
  float hw = len * ratio * prof * (1.0 + 0.06 * sin(t * 23.0 + seed));
  float bend = len * 0.07 * sin(3.14159 * t) * (h1(seed, 3.0) - 0.5) * 2.0;
  float acb = ac - bend;
  float e = hw - abs(acb);
  float m = aaEdge(e);
  if (m <= 0.0) return;
  float acn = clamp(acb / max(hw, 1e-4), -1.0, 1.0);
  float v = h1(seed, 1.0);
  vec3 c = mix(c0, c1, v);
  c *= acn > 0.0 ? 1.06 : 0.92;                                   // the two halves catch light differently
  float mid = 1.0 - smoothstep(0.0, 0.1, abs(acn));
  float lat = lineMask(t * 8.0 - abs(acn) * 2.4 + seed * 0.37, 0.14) * smoothstep(0.1, 0.25, abs(acn)) * (1.0 - smoothstep(0.7, 0.92, abs(acn)));
  c *= 0.82 + 0.26 * (1.0 - acn * acn);
  c = mix(c, c * 1.6 + vec3(0.015, 0.02, 0.0), mid * 0.75);
  c = mix(c, c * 1.22, lat * 0.4);
  c *= 0.9 + 0.2 * vn(q * 90.0 + seed * 3.0);
  c *= 1.0 - 0.28 * (1.0 - smoothstep(0.0, 0.0045, e));          // darker rim
  float blem = h1(seed, 7.0);
  if (blem > 0.94) c = mix(c, vec3(0.24, 0.19, 0.06), smoothstep(0.6, 0.85, vn(q * 55.0 + seed)) * 0.45);
  if (blem < 0.03) c = mix(c, vec3(0.22, 0.2, 0.05), 0.55);     // an old yellowing leaf
  s.col = mix(s.col, c, m);
  s.a = max(s.a, m);
  s.h = mix(s.h, 0.55 + 0.3 * (1.0 - acn * acn) - 0.28 * mid - 0.08 * lat, m);
  s.thin = mix(s.thin, 1.0 - 0.7 * mid - 0.25 * lat, m);
  s.rough = mix(s.rough, rough + 0.1 * mid + 0.08 * (1.0 - smoothstep(0.0, 0.01, e)), m);
  s.ao = mix(s.ao, 0.8 + 0.2 * t, m);
}

// papery bougainvillea bract (heart-ovate, pointed, with fine veins)
void bractPaint(inout Surf s, vec2 l, vec2 p, vec2 d, float len, vec3 c0, float seed) {
  vec2 q = l - p;
  float t = dot(q, d) / len;
  if (t <= 0.0 || t >= 1.0) return;
  float ac = dot(q, vec2(-d.y, d.x));
  float hw = len * 0.42 * pow(max(sin(3.14159 * pow(t, 0.55)), 1e-4), 0.6);
  float e = hw - abs(ac);
  float m = aaEdge(e);
  if (m <= 0.0) return;
  float acn = ac / max(hw, 1e-4);
  float vein = lineMask(t * 5.0 - abs(acn) * 1.6, 0.1) * 0.25 + (1.0 - smoothstep(0.0, 0.08, abs(acn))) * 0.3;
  vec3 c = c0 * (0.75 + 0.4 * t) * (0.9 + 0.2 * h1(seed, 2.0)) * (1.0 - vein * 0.35);
  c *= 1.0 - 0.2 * (1.0 - smoothstep(0.0, 0.004, e));
  s.col = mix(s.col, c, m);
  s.a = max(s.a, m);
  s.h = mix(s.h, 0.6 + 0.2 * (1.0 - acn * acn) - 0.15 * vein, m);
  s.rough = mix(s.rough, 0.62, m);
  s.ao = mix(s.ao, 0.9, m);
}

// 5-petal pinwheel flower (oleander), centre c, radius R
void pinwheel(inout Surf s, vec2 l, vec2 c, float R, vec3 cp, float seed) {
  vec2 q = l - c;
  float r = length(q);
  if (r > R * 1.15) return;
  float an = atan(q.y, q.x + 1e-6) + seed * 6.2831;
  float w = an * 2.5 + 0.45 * sin(an * 5.0 + 1.0);
  float pr = R * (0.42 + 0.58 * pow(abs(cos(w)), 0.55));
  float m = aaEdge(pr - r);
  if (m <= 0.0) return;
  float rr = r / R;
  vec3 c2 = cp * (0.78 + 0.32 * rr) * (0.92 + 0.12 * vn(q * 500.0));
  c2 = mix(c2, cp * vec3(0.8, 0.55, 0.65), (1.0 - smoothstep(0.12, 0.3, rr)) * 0.8);   // deeper throat
  c2 = mix(c2, vec3(0.75, 0.62, 0.45), 1.0 - smoothstep(0.04, 0.1, rr));              // corona
  s.col = mix(s.col, c2, m);
  s.a = max(s.a, m);
  s.h = mix(s.h, 0.75 - 0.35 * rr, m);
  s.rough = mix(s.rough, 0.6, m);
  s.ao = mix(s.ao, 0.92 + 0.08 * rr, m);
}

// 3 / 4 / 5 / 6 --- leafy sprig: one twig tip with its leaves, growing up from
// the bottom centre of the tile (the plant builders attach it there).
// kind 0 glossy elliptic (A: Ficus / Pittosporum-like), 1 olive lanceolate (B:
// olive / Pluchea-like), 2 bougainvillea (ovate + magenta bracts), 3 oleander
// (narrow leaves in whorls of three + pink pinwheel flowers)
Surf tSprig(vec2 l, float seed, float kind) {
  Surf s = sBg(kind > 0.5 && kind < 1.5 ? vec3(0.08, 0.095, 0.05) : vec3(0.03, 0.065, 0.018), 0.5);
  int nL = 12; float ratio = 0.3, shape = 0.0, lenB = 0.27, lenT = 0.16, ang = 0.7, rough = 0.4; vec3 c0 = vec3(0.03, 0.07, 0.015), c1 = vec3(0.07, 0.13, 0.03);
  if (kind < 0.5)      { nL = 10; ratio = 0.36; shape = 0.0; lenB = 0.22; lenT = 0.13; ang = 0.95; rough = 0.3;  c0 = vec3(0.03, 0.07, 0.015); c1 = vec3(0.075, 0.14, 0.028); }
  else if (kind < 1.5) { nL = 14; ratio = 0.13; shape = 1.0; lenB = 0.24; lenT = 0.13; ang = 0.72; rough = 0.58; c0 = vec3(0.065, 0.085, 0.042); c1 = vec3(0.13, 0.15, 0.08); }
  else if (kind < 2.5) { nL = 8;  ratio = 0.4;  shape = 2.0; lenB = 0.2;  lenT = 0.12; ang = 0.95; rough = 0.42; c0 = vec3(0.035, 0.08, 0.018); c1 = vec3(0.08, 0.145, 0.03); }
  else                 { nL = 12; ratio = 0.12; shape = 1.0; lenB = 0.3;  lenT = 0.16; ang = 0.62; rough = 0.36; c0 = vec3(0.028, 0.062, 0.02); c1 = vec3(0.06, 0.11, 0.04); }
  float fn = float(nL);
  // three twigs: two side shoots fork off the main one (painted first, main on top)
  for (int j = 0; j < 3; j++) {
    float fj = float(j);
    float sd = seed + fj * 13.0;
    float sb = (h1(sd, 11.0) - 0.5) * 0.3;
    vec2 b; float a, lt, lk;
    if (j == 0)      { b = vec2(0.5, 0.2 + 0.05 * h1(sd, 2.0)); a = -0.62 - 0.12 * h1(sd, 3.0); lt = 0.5; lk = 0.8; }
    else if (j == 1) { b = vec2(0.5, 0.33 + 0.05 * h1(sd, 2.0)); a = 0.58 + 0.12 * h1(sd, 3.0); lt = 0.48; lk = 0.8; }
    else             { b = vec2(0.5, 0.0); a = (h1(sd, 3.0) - 0.5) * 0.12; lt = 0.84; lk = 1.0; }
    float ca = cos(a), sa = sin(a);
    // twig frame: along = (-sin a, cos a), across = (cos a, sin a)
    vec2 dA = vec2(-sa, ca), dX = vec2(ca, sa);
    vec2 q = l - b;
    float ty = dot(q, dA), tx = dot(q, dX);
    if (ty > 0.0 && ty < lt) {
      float sw = mix(j == 2 ? 0.011 : 0.006, 0.003, ty / lt);
      float m = aaEdge(sw - abs(tx - sb * ty * ty));
      if (m > 0.0) {
        vec3 sc = kind > 0.5 && kind < 1.5 ? vec3(0.11, 0.1, 0.07) : vec3(0.06, 0.08, 0.028);
        sc = mix(vec3(0.09, 0.065, 0.045), sc, smoothstep(0.1, 0.5, l.y));
        s.col = mix(s.col, sc * (0.8 + 0.4 * vn(l * vec2(90.0, 300.0))), m);
        s.a = max(s.a, m); s.h = mix(s.h, 0.75, m); s.rough = mix(s.rough, 0.72, m); s.thin = mix(s.thin, 0.1, m);
      }
    }
    int nj = j == 2 ? nL : nL - 3;
    for (int i = 0; i < 14; i++) {
      if (i >= nj) break;
      float fi = float(i);
      float tt = fi / float(nj);
      float y = mix(j == 2 ? 0.16 : 0.1, lt - 0.03, tt) + (h1(fi, sd) - 0.5) * 0.02;
      vec2 pl = vec2(sb * y * y, y);
      vec2 p = b + dX * pl.x + dA * pl.y;
      vec2 tl = normalize(vec2(2.0 * sb * y, 1.0));
      vec2 tg = dX * tl.x + dA * tl.y;
      float side;
      if (kind > 2.5) { float k3 = mod(fi, 3.0); side = k3 < 0.5 ? 1.0 : (k3 < 1.5 ? -1.0 : 0.22 * (h1(fi, sd + 9.0) - 0.5)); }
      else if (kind > 0.5 && kind < 1.5) side = mod(floor(fi * 0.5), 2.0) < 0.5 ? (mod(fi, 2.0) < 0.5 ? 1.0 : -1.0) : (mod(fi, 2.0) < 0.5 ? -1.0 : 1.0);
      else side = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
      float ra = side * (ang + (h1(fi, sd + 2.0) - 0.5) * 0.4);
      vec2 d = vec2(tg.x * cos(ra) - tg.y * sin(ra), tg.x * sin(ra) + tg.y * cos(ra));
      float len = mix(lenB, lenT, tt) * lk * (0.85 + 0.3 * h1(fi, sd + 5.0));
      leafPaint(s, l, p, d, len, ratio, shape, c0, c1, rough, fi * 1.7 + sd * 7.0);
    }
    vec2 tip = b + dX * (sb * lt * lt) + dA * lt;
    vec2 tl = normalize(vec2(2.0 * sb * lt, 1.0));
    leafPaint(s, l, tip, dX * tl.x + dA * tl.y, lenT * lk * 0.95, ratio, shape, c0, c1, rough, sd * 3.0 + 99.0);
    if (kind > 1.5 && kind < 2.5) {
      // bougainvillea: a bract cluster at each twig tip
      vec2 cc = tip + (dX * tl.x + dA * tl.y) * 0.035;
      for (int k = 0; k < 3; k++) {
        float fk = float(k);
        float ba = fk * 2.094 + h1(fj, seed + 21.0) * 6.28;
        bractPaint(s, l, cc, vec2(cos(ba), sin(ba)), mix(0.06, 0.08, h1(fk + fj * 3.0, seed)), mix(vec3(0.5, 0.025, 0.2), vec3(0.66, 0.05, 0.32), h1(fj, seed + 4.0)), fk + fj * 5.0);
      }
      float fm = aaEdge(0.008 - length(l - cc));
      s.col = mix(s.col, vec3(0.8, 0.78, 0.62), fm); s.a = max(s.a, fm);
    }
    if (kind > 2.5 && j != 0) {
      // oleander: terminal cyme of pinwheel flowers + buds
      for (int k = 0; k < 5; k++) {
        float fk = float(k);
        vec2 r2 = h2(fk + 600.0 + fj * 17.0, seed);
        vec2 fc = tip + dX * (r2.x - 0.5) * 0.16 + dA * ((r2.y - 0.5) * 0.09 + 0.01);
        if (fk > 3.5) {
          float bm = aaEdge(0.011 - length((l - fc) * vec2(1.0, 0.55)));
          s.col = mix(s.col, vec3(0.62, 0.22, 0.3), bm); s.a = max(s.a, bm); s.h = mix(s.h, 0.7, bm);
        } else {
          vec3 cp = h1(fk + fj, seed + 8.0) > 0.25 ? vec3(0.85, 0.36, 0.48) : vec3(0.86, 0.8, 0.74);
          pinwheel(s, l, fc, mix(0.042, 0.056, r2.x), cp, fk + fj * 7.0 + seed);
        }
      }
    }
  }
  s.a *= aaEdge(min(min(l.x, 1.0 - l.x), min(l.y, 1.0 - l.y)) - 0.012);
  return s;
}

// 7 --- desert scrub twigs with tiny grey-olive leaves
Surf tScrub(vec2 l) {
  Surf s = sBg(vec3(0.15, 0.14, 0.1), 0.8);
  for (int i = 0; i < 11; i++) {
    float fi = float(i);
    vec2 r1 = h2(fi, 91.0), r2 = h2(fi + 31.0, 93.0);
    vec2 a0 = vec2(0.5 + (r1.x - 0.5) * 0.1, 0.03);
    float ang = mix(0.35, 2.8, (fi + r1.y * 0.6) / 11.0);
    vec2 m0 = a0 + vec2(cos(ang), sin(ang)) * 0.25 + vec2(0.0, 0.1);
    vec2 b0 = m0 + vec2(cos(ang + (r2.x - 0.5)), sin(ang + (r2.x - 0.5))) * mix(0.18, 0.3, r2.y);
    b0 = clamp(b0, vec2(0.04), vec2(0.96));
    float d1 = segDist(l, a0, m0), d2 = segDist(l, m0, b0);
    float wt = mix(0.006, 0.0025, clamp(l.y * 1.4, 0.0, 1.0));
    float m = aaEdge(wt - min(d1, d2));
    if (m > 0.0) { s.col = mix(s.col, vec3(0.12, 0.1, 0.085) * (0.8 + 0.4 * vn(l * 300.0)), m); s.a = max(s.a, m); s.h = mix(s.h, 0.7, m); s.rough = mix(s.rough, 0.85, m); s.thin = mix(s.thin, 0.1, m); }
    for (int j = 0; j < 7; j++) {
      float fj = float(j);
      vec2 rj = h2(fi * 7.0 + fj, 97.0);
      float tt = 0.25 + 0.75 * (fj + rj.x * 0.5) / 7.0;
      vec2 p = tt < 0.5 ? mix(a0, m0, tt * 2.0) : mix(m0, b0, tt * 2.0 - 1.0);
      vec2 dir = normalize(tt < 0.5 ? m0 - a0 : b0 - m0);
      float sgn = mod(fj, 2.0) < 0.5 ? 1.0 : -1.0;
      float la = sgn * mix(0.5, 1.1, rj.y);
      vec2 ld = vec2(dir.x * cos(la) - dir.y * sin(la), dir.x * sin(la) + dir.y * cos(la));
      vec2 q = l - p;
      float t = dot(q, ld) / 0.045;
      if (t <= 0.0 || t >= 1.0) continue;
      float ac = dot(q, vec2(-ld.y, ld.x));
      float hw = 0.045 * 0.28 * pow(max(sin(3.14159 * t), 1e-4), 0.8);
      float lm = aaEdge(hw - abs(ac));
      if (lm <= 0.0) continue;
      vec3 lc = rj.x > 0.72 ? vec3(0.36, 0.3, 0.17) : mix(vec3(0.13, 0.15, 0.08), vec3(0.22, 0.23, 0.14), rj.y);
      s.col = mix(s.col, lc, lm); s.a = max(s.a, lm); s.h = mix(s.h, 0.55, lm); s.rough = mix(s.rough, 0.75, lm);
    }
  }
  return s;
}

// 8 --- reed leaf strips (4 colour variants side by side)
Surf tReed(vec2 l) {
  float k = floor(l.x * 4.0), u = fract(l.x * 4.0);
  Surf s = sBg(vec3(0.1, 0.16, 0.05), 0.55);
  float e = min(u - 0.07, 0.93 - u) * 0.25;
  e = min(e, min(l.y - 0.01, 0.99 - l.y));
  s.a = aaEdge(e);
  vec3 b, t;
  if (k < 0.5) { b = vec3(0.035, 0.08, 0.02); t = vec3(0.09, 0.16, 0.04); }
  else if (k < 1.5) { b = vec3(0.06, 0.11, 0.028); t = vec3(0.2, 0.22, 0.07); }
  else if (k < 2.5) { b = vec3(0.04, 0.09, 0.045); t = vec3(0.09, 0.15, 0.08); }
  else { b = vec3(0.3, 0.23, 0.11); t = vec3(0.52, 0.42, 0.24); }
  float vein = vn(vec2(u * 26.0 + k * 7.0, l.y * 2.0)) * 0.6 + vn(vec2(u * 70.0, l.y * 5.0)) * 0.4;
  float across = u * 2.0 - 1.0;
  vec3 c = mix(b, t, smoothstep(0.05, 1.0, l.y));
  c *= (0.86 + 0.2 * vein) * (0.85 + 0.15 * (1.0 - across * across));
  c = mix(c, c * 1.35, (1.0 - smoothstep(0.0, 0.12, abs(across))) * 0.5);
  if (k > 0.5 && k < 1.5) c = mix(c, vec3(0.4, 0.3, 0.14), smoothstep(0.86, 0.97, l.y));
  if (k > 2.5) c = mix(c, vec3(0.22, 0.15, 0.08), smoothstep(0.9, 0.99, l.y));
  s.col = c;
  s.h = 0.5 + 0.25 * (1.0 - across * across) + 0.12 * vein - 0.15 * (1.0 - smoothstep(0.0, 0.1, abs(across)));
  s.thin = 0.85 - 0.4 * (1.0 - smoothstep(0.0, 0.1, abs(across))) - (k > 2.5 ? 0.3 : 0.0);
  s.rough = 0.5 + 0.1 * vein;
  return s;
}

// 9 --- cattail head (left) | green stem (right), opaque
Surf tCattail(vec2 l) {
  Surf s = sBg(vec3(0.1, 0.06, 0.03), 0.9);
  s.a = 1.0;
  s.thin = l.x < 0.5 ? 0.0 : 0.3;
  if (l.x < 0.5) {
    float n = fbm3(l * vec2(90.0, 30.0));
    float f = vn(l * vec2(400.0, 160.0));
    s.col = mix(vec3(0.075, 0.04, 0.018), vec3(0.16, 0.095, 0.045), n) * (0.85 + 0.3 * f);
    s.h = 0.5 + 0.3 * f;
    s.rough = 0.92;
  } else {
    float st = vn(vec2(l.x * 120.0, l.y * 3.0));
    s.col = mix(vec3(0.07, 0.12, 0.03), vec3(0.12, 0.17, 0.05), st) ;
    s.h = 0.5 + 0.2 * st;
    s.rough = 0.5;
  }
  return s;
}

// 10 --- papyrus umbel segment: a fan of fine thread-like rays springing
// from the bottom centre (the culm top), each arching outward and ending in a
// small tuft of bracts and brownish spikelets; short bracts at the base. The
// plant builder sets a dozen of these around each culm top as a 3D burst.
Surf tPapyrus(vec2 l) {
  Surf s = sBg(vec3(0.12, 0.19, 0.05), 0.55);
  vec2 o = vec2(0.5, 0.02);
  for (int i = 0; i < 22; i++) {
    float fi = float(i);
    float ang = mix(-0.62, 0.62, (fi + 0.5 * h1(fi, 3.0)) / 22.0);
    float len = mix(0.78, 0.95, h1(fi, 9.0));
    float bend = (ang > 0.0 ? 1.0 : -1.0) * mix(0.03, 0.09, h1(fi, 4.0));
    vec2 d = vec2(sin(ang), cos(ang));
    vec2 q = l - o;
    float t = dot(q, d) / len;
    if (t <= 0.0 || t >= 1.0) continue;
    float ac = dot(q, vec2(d.y, -d.x)) - bend * t * t;
    float w = mix(0.0042, 0.0022, t);
    float m = aaEdge(w - abs(ac));
    if (m > 0.0) {
      vec3 c = mix(vec3(0.1, 0.17, 0.04), vec3(0.17, 0.24, 0.06), t) * (0.85 + 0.3 * h1(fi, 5.0));
      s.col = mix(s.col, c, m); s.a = max(s.a, m); s.h = mix(s.h, 0.7, m);
    }
    // tip tuft: 3 tiny bracts + spikelets
    vec2 tip = o + d * len * 0.93 + vec2(d.y, -d.x) * bend * 0.86;
    for (int k = 0; k < 3; k++) {
      float fk = float(k);
      float ba = ang + (fk - 1.0) * 0.55 + (h1(fi + fk, 7.0) - 0.5) * 0.3;
      vec2 bd = vec2(sin(ba), cos(ba));
      vec2 bq = l - tip;
      float bt = dot(bq, bd) / 0.05;
      if (bt <= 0.0 || bt >= 1.0) continue;
      float bw = 0.006 * sin(3.14159 * bt);
      float bm = aaEdge(bw - abs(dot(bq, vec2(bd.y, -bd.x))));
      if (bm <= 0.0) continue;
      vec3 bc = h1(fi + fk, 11.0) > 0.6 ? vec3(0.26, 0.2, 0.08) : vec3(0.15, 0.22, 0.06);
      s.col = mix(s.col, bc, bm); s.a = max(s.a, bm); s.h = mix(s.h, 0.65, bm);
    }
  }
  // basal bracts
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float ang = (fi / 4.0 - 0.5) * 1.3;
    vec2 d = vec2(sin(ang), cos(ang));
    vec2 q = l - o;
    float t = dot(q, d) / 0.17;
    if (t <= 0.0 || t >= 1.0) continue;
    float w = 0.012 * pow(max(sin(3.14159 * pow(t, 0.6)), 1e-4), 0.8);
    float m = aaEdge(w - abs(dot(q, vec2(d.y, -d.x))));
    if (m <= 0.0) continue;
    s.col = mix(s.col, vec3(0.2, 0.18, 0.07), m); s.a = max(s.a, m); s.h = mix(s.h, 0.6, m);
  }
  s.a *= aaEdge(min(min(l.x, 1.0 - l.x), 1.0 - l.y) - 0.012);
  return s;
}

// 11 / 12 --- agave (glaucous, teeth, terminal spine) / aloe (spotted, red margin)
Surf tSucculent(vec2 l, float aloe) {
  Surf s = sBg(aloe > 0.5 ? vec3(0.09, 0.15, 0.05) : vec3(0.12, 0.18, 0.15), 0.5);
  float u = l.x, v = l.y;
  float margin = min(u, 1.0 - u);
  float body = margin - 0.075;
  float tv = fract(v * (aloe > 0.5 ? 26.0 : 16.0));
  float th = (aloe > 0.5 ? 0.035 : 0.06) * max(0.0, 1.0 - tv / 0.4) * step(v, 0.9) * step(0.05, v);
  float tooth = body + th;
  float e = max(body, tooth);
  float tipw = 0.5 - 0.46 * smoothstep(0.86, 0.995, v);
  e = min(e, tipw - abs(u - 0.5));
  e = min(e, min(v - 0.004, 0.996 - v));
  s.a = aaEdge(e);
  float across = u * 2.0 - 1.0;
  float str = vn(vec2(u * 40.0, v * 3.0));
  vec3 c;
  if (aloe > 0.5) {
    c = mix(vec3(0.07, 0.13, 0.035), vec3(0.12, 0.17, 0.05), str);
    vec3 w = bk_worley(vec2(u * 1.0, v * 2.0), vec2(9.0, 22.0));
    float spot = 1.0 - smoothstep(0.12, 0.2, w.x);
    c = mix(c, vec3(0.42, 0.45, 0.32), spot * step(0.4, w.z) * 0.85);
    c = mix(c, vec3(0.3, 0.07, 0.03), smoothstep(-0.005, 0.03, -body) * 0.9);
    c = mix(c, vec3(0.28, 0.12, 0.05), smoothstep(0.7, 1.0, v) * 0.35);
  } else {
    c = mix(vec3(0.1, 0.16, 0.13), vec3(0.17, 0.23, 0.19), str * 0.7 + 0.3 * fbm3(l * vec2(4.0, 12.0)));
    float bud = lineMask((abs(across) * 0.6 + v) * 5.0, 0.05) * smoothstep(0.1, 0.4, v) * 0.25;
    c = mix(c, vec3(0.26, 0.3, 0.26), bud);
    c = mix(c, vec3(0.2, 0.2, 0.1), smoothstep(-0.01, 0.025, -body + 0.035) * 0.4);
    c = mix(c, vec3(0.12, 0.06, 0.03), smoothstep(0.0, 0.02, -body));
    c = mix(c, vec3(0.1, 0.05, 0.025), smoothstep(0.88, 0.97, v));
  }
  s.col = c;
  s.h = 0.4 + 0.35 * (1.0 - across * across) + 0.08 * str;
  s.thin = 0.3 + 0.25 * across * across;
  s.rough = aloe > 0.5 ? 0.42 : 0.55;
  s.ao = 0.85 + 0.15 * (1.0 - across * across);
  return s;
}

Surf tBark(vec2 l) {
  Surf s = sBg(vec3(0.11, 0.085, 0.06), 0.85);
  s.a = 1.0;
  s.thin = 0.0;
  float f = fbm3(l * vec2(8.0, 40.0));
  float fis = 1.0 - smoothstep(0.0, 0.25, abs(vn(vec2(l.x * 22.0, l.y * 3.0)) - 0.5));
  s.col = vec3(0.12, 0.09, 0.066) * (0.7 + 0.5 * f) * (1.0 - 0.45 * fis);
  s.h = 0.6 * f - 0.4 * fis + 0.4;
  s.ao = 1.0 - 0.35 * fis;
  return s;
}

// 14 --- left half: green stem / culm / petiole; right half: banana
// pseudostem (overlapping leaf sheaths: long fibres, sheath margins running
// diagonally up, dark blotches, dry brown sheath strips peeling off low down)
Surf tStem(vec2 l) {
  Surf s = sBg(vec3(0.09, 0.15, 0.04), 0.5);
  s.a = 1.0;
  s.thin = 0.25;
  if (l.x < 0.5) {
    float st = vn(vec2(l.x * 120.0, l.y * 4.0));
    float sp = smoothstep(0.7, 0.85, vn(l * vec2(80.0, 120.0)));
    s.col = mix(vec3(0.075, 0.13, 0.035), vec3(0.13, 0.19, 0.055), st) * (1.0 - 0.25 * sp);
    s.h = 0.5 + 0.2 * st;
  } else {
    float u = (l.x - 0.5) * 2.0;
    float fib = vn(vec2(u * 48.0, l.y * 3.0)) * 0.6 + vn(vec2(u * 96.0 + 3.0, l.y * 6.0)) * 0.4;
    float sheath = fract(u * 3.0 + l.y * 1.4 + 0.3 * vn(vec2(u * 6.0, l.y * 3.0)));
    float edge = smoothstep(0.9, 0.97, sheath);
    float blot = smoothstep(0.58, 0.72, fbm3(l * vec2(10.0, 7.0)));
    float dry = smoothstep(0.55, 0.75, vn(vec2(u * 9.0, l.y * 2.0)) + (1.0 - l.y) * 0.45 - 0.3);
    vec3 g = mix(vec3(0.085, 0.14, 0.04), vec3(0.16, 0.2, 0.065), fib * 0.7 + 0.3 * sheath);
    g = mix(g, vec3(0.08, 0.05, 0.035), blot * 0.55);
    g = mix(g, g * 0.6, edge);
    vec3 d = mix(vec3(0.24, 0.17, 0.09), vec3(0.4, 0.31, 0.18), fib);
    s.col = mix(g, d, dry);
    s.h = 0.45 + 0.25 * fib - 0.25 * edge + 0.1 * dry;
    s.rough = mix(0.5, 0.85, dry);
    s.ao = 1.0 - 0.3 * edge;
  }
  return s;
}

// 16 --- maidenhair fern frond (Adiantum capillus-veneris, the fern of desert
// springs, seeps and waterfall spray): a black, wiry, glossy rachis with
// alternate pinnae on hair-thin stalks, each carrying fan-shaped (cuneate)
// pinnules with a lobed outer margin and radiating forked veins; fertile
// pinnules have brown sori under the rolled lobe tips. Widest low, tapering
// to a terminal pinnule; painted square (the builder maps it 1:1).
void fanPinnule(inout Surf s, vec2 l, vec2 c, vec2 d, float R, float seed) {
  vec2 q = l - c;
  float r = length(q);
  if (r > R * 1.12) return;
  float al = dot(q, d), ac = dot(q, vec2(-d.y, d.x));
  float ang = atan(ac, al + 1e-6);
  float hf = 1.15 + 0.2 * h1(seed, 1.0);
  float lobes = 2.0 + floor(h1(seed, 2.0) * 3.0);
  float lob = abs(sin((ang / hf * 0.5 + 0.5) * 3.14159 * lobes));
  float rm = R * (0.74 + 0.26 * sqrt(lob));
  float e = min(rm - r, (hf - abs(ang)) * r * 0.9);
  float m = aaEdge(e);
  if (m <= 0.0) return;
  float rr = r / R;
  float vein = lineMask(ang * 6.0 / hf + seed * 0.37, 0.2) * smoothstep(0.2, 0.45, rr);
  vec3 c0 = mix(vec3(0.075, 0.16, 0.028), vec3(0.12, 0.215, 0.04), h1(seed, 5.0));
  vec3 col = c0 * (0.78 + 0.32 * rr) * (1.0 - 0.12 * vein);
  float fert = step(0.5, h1(seed, 9.0));
  col = mix(col, vec3(0.15, 0.095, 0.04), fert * smoothstep(0.84, 0.97, r / max(rm, 1e-4)) * smoothstep(0.45, 0.9, lob));
  col *= 1.0 - 0.2 * (1.0 - smoothstep(0.0, 0.003, e));
  s.col = mix(s.col, col, m);
  s.a = max(s.a, m);
  s.h = mix(s.h, 0.45 + 0.3 * (1.0 - rr * rr) - 0.08 * vein, m);
  s.thin = mix(s.thin, 1.0 - 0.2 * vein, m);
  s.rough = mix(s.rough, 0.52, m);
  s.ao = mix(s.ao, 0.8 + 0.2 * rr, m);
}
void wire(inout Surf s, vec2 l, vec2 a, vec2 b, float w) {
  float m = aaEdge(w - segDist(l, a, b));
  if (m <= 0.0) return;
  s.col = mix(s.col, vec3(0.03, 0.022, 0.018) * (0.8 + 0.4 * vn(l * 500.0)), m);
  s.a = max(s.a, m); s.h = mix(s.h, 0.8, m); s.rough = mix(s.rough, 0.3, m); s.thin = mix(s.thin, 0.05, m); s.ao = mix(s.ao, 0.9, m);
}
Surf tMaidenhair(vec2 l) {
  Surf s = sBg(vec3(0.05, 0.08, 0.025), 0.5);
  // rachis
  for (int k = 0; k < 6; k++) {
    float y0 = float(k) / 6.0 * 0.92, y1 = float(k + 1) / 6.0 * 0.92;
    wire(s, l, vec2(0.5 + 0.02 * sin(y0 * 3.0), y0), vec2(0.5 + 0.02 * sin(y1 * 3.0), y1), mix(0.0045, 0.002, y0));
  }
  // pinnae: stalks first, then their pinnules on top
  for (int k = 0; k < 11; k++) {
    float fk = float(k);
    float side = mod(fk, 2.0) < 0.5 ? 1.0 : -1.0;
    float y0 = 0.06 + fk * 0.076;
    float tn = y0 / 0.9;
    float len = mix(0.36, 0.06, pow(tn, 0.75)) * (0.85 + 0.3 * h1(fk, 17.0));
    vec2 b = vec2(0.5 + 0.02 * sin(y0 * 3.0), y0);
    float a = side * mix(1.05, 0.6, tn);
    vec2 d = vec2(sin(a), cos(a));
    vec2 e1 = b + d * len * 0.55 + vec2(0.0, -0.012);
    vec2 e2 = b + d * len + vec2(0.0, -0.035 * len / 0.36);
    wire(s, l, b, e1, 0.0022);
    wire(s, l, e1, e2, 0.0016);
    int np = int(mix(7.0, 1.0, tn) + 0.5);
    float R0 = mix(0.052, 0.038, tn);
    for (int j = 0; j < 7; j++) {
      if (j >= np) break;
      float fj = float(j);
      float t = (fj + 0.7) / (float(np) + 0.4);
      vec2 p = t < 0.55 ? mix(b, e1, t / 0.55) : mix(e1, e2, (t - 0.55) / 0.45);
      vec2 dd = normalize(t < 0.55 ? e1 - b : e2 - e1);
      float ps = mod(fj + fk, 2.0) < 0.5 ? 1.0 : -1.0;
      vec2 pd = normalize(dd * 0.55 + vec2(-dd.y, dd.x) * ps + vec2(0.0, -0.25));
      float R = R0 * (0.8 + 0.4 * h1(fk * 7.0 + fj, 3.0));
      wire(s, l, p, p + pd * R * 0.2, 0.0012);
      fanPinnule(s, l, p + pd * R * 0.16, pd, R, fk * 13.0 + fj * 3.0);
    }
    fanPinnule(s, l, e2, normalize(e2 - e1 + vec2(0.0, 0.01)), R0 * 0.95, fk * 5.0 + 91.0);
  }
  fanPinnule(s, l, vec2(0.5 + 0.02 * sin(2.76), 0.92), vec2(0.0, 1.0), 0.045, 77.0);
  s.a *= aaEdge(min(min(l.x, 1.0 - l.x), min(l.y, 1.0 - l.y)) - 0.01);
  return s;
}

// 17 --- tamarisk spray (Tamarix, the salt cedar of Saharan oases and wadis):
// slender red-brown twigs with drooping, feathery branchlets clothed in tiny
// grey-green scale leaves (they read as soft segmented cords, a little salt
// crust on them), pink flower racemes at some tips. Grows up from the bottom
// centre like the other sprigs.
float cordDist(vec2 l, vec2 b, vec2 d, float len, float dr, out float tt) {
  // quadratic drooping curve p(t) = b + d len t - (0, dr t^2), 4 segments
  float best = 1e3; tt = 0.0;
  vec2 p0 = b;
  for (int k = 1; k <= 4; k++) {
    float t1 = float(k) * 0.25;
    vec2 p1 = b + d * len * t1 - vec2(0.0, dr * t1 * t1);
    float dd = segDist(l, p0, p1);
    if (dd < best) { best = dd; tt = t1 - 0.25 + 0.25 * segT(l, p0, p1); }
    p0 = p1;
  }
  return best;
}
Surf tTamarisk(vec2 l) {
  Surf s = sBg(vec3(0.09, 0.11, 0.09), 0.72);
  vec2 top = vec2(0.52, 0.96);
  // main twig
  {
    float m = aaEdge(mix(0.007, 0.0025, l.y) - segDist(l, vec2(0.5, 0.0), top));
    if (m > 0.0) { s.col = mix(s.col, vec3(0.13, 0.06, 0.04) * (0.8 + 0.4 * vn(l * 300.0)), m); s.a = max(s.a, m); s.h = mix(s.h, 0.75, m); s.rough = mix(s.rough, 0.6, m); s.thin = mix(s.thin, 0.1, m); }
  }
  for (int i = 0; i < 14; i++) {
    float fi = float(i);
    float side = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
    float y0 = 0.06 + fi * 0.064;
    vec2 b = mix(vec2(0.5, 0.0), top, y0);
    float a = side * mix(0.95, 0.35, y0) + (h1(fi, 3.0) - 0.5) * 0.3;
    vec2 d = vec2(sin(a), cos(a));
    float len = mix(0.44, 0.18, y0) * (0.85 + 0.3 * h1(fi, 5.0));
    float dr = len * mix(0.55, 0.25, y0);
    float tt;
    float dist = cordDist(l, b, d, len, dr, tt);
    // feathery cord: tapered, ragged with scale leaves
    float w = mix(0.014, 0.006, tt);
    float sc = vn(vec2(tt * len * 420.0, (dist / max(w, 1e-4)) * 2.0) + fi * 7.0);
    float m = aaEdge(w * (0.75 + 0.45 * sc) - dist) * step(0.0, tt);
    // side branchlets (second order), short and drooping
    for (int j = 0; j < 7; j++) {
      float fj = float(j);
      float t0 = 0.12 + fj * 0.12;
      vec2 bp = b + d * len * t0 - vec2(0.0, dr * t0 * t0);
      float ss = mod(fj, 2.0) < 0.5 ? 1.0 : -1.0;
      float a2 = a + ss * 0.7;
      vec2 d2 = vec2(sin(a2), cos(a2));
      float t2;
      float d2d = cordDist(l, bp, d2, len * 0.36 * (1.0 - 0.4 * t0), len * 0.2, t2);
      float w2 = mix(0.009, 0.004, t2);
      float sc2 = vn(vec2(t2 * 180.0, fj * 5.0 + fi));
      m = max(m, aaEdge(w2 * (0.75 + 0.45 * sc2) - d2d));
    }
    if (m <= 0.0) continue;
    vec3 c = mix(vec3(0.075, 0.1, 0.075), vec3(0.13, 0.155, 0.12), h1(fi, 8.0)) * (0.82 + 0.3 * sc);
    c = mix(c, vec3(0.3, 0.3, 0.27), smoothstep(0.78, 0.92, vn(l * 260.0 + fi)) * 0.35);   // salt crust
    // flower raceme at a third of the tips
    float fl = step(0.62, h1(fi, 11.0)) * smoothstep(0.62, 0.72, tt);
    c = mix(c, mix(vec3(0.55, 0.28, 0.34), vec3(0.68, 0.42, 0.48), sc), fl * step(0.35, sc));
    s.col = mix(s.col, c, m);
    s.a = max(s.a, m);
    s.h = mix(s.h, 0.5 + 0.3 * sc, m);
    s.rough = mix(s.rough, 0.66, m);
    s.thin = mix(s.thin, 0.5, m);
    s.ao = mix(s.ao, 0.78 + 0.22 * sc, m);
  }
  s.a *= aaEdge(min(min(l.x, 1.0 - l.x), min(l.y, 1.0 - l.y)) - 0.01);
  return s;
}

`,Se=[`tElephant(l)`,`tBanana(l, 0.0)`,`tFern(l)`,`tSprig(l, 13.0, 0.0)`,`tSprig(l, 17.0, 1.0)`,`tSprig(l, 29.0, 2.0)`,`tSprig(l, 33.0, 3.0)`,`tScrub(l)`,`tReed(l)`,`tCattail(l)`,`tPapyrus(l)`,`tSucculent(l, 0.0)`,`tSucculent(l, 1.0)`,`tBark(l)`,`tStem(l)`,`tBanana(l, 1.0)`,`tMaidenhair(l)`,`tTamarisk(l)`],Ce=e=>`
vec4 bake(vec2 l) {
  Surf s = ${e};
  return vec4(max(s.col, vec3(0.0)), s.a);
}`,we=e=>`
vec4 bake(vec2 l) {
  Surf s = ${e};
  return vec4(clamp(s.ao, 0.0, 1.0), clamp(s.rough, 0.04, 1.0), clamp(s.thin, 0.0, 1.0), clamp(s.h, 0.0, 1.0));
}`,Te=(e,t)=>`
uniform sampler2D tOrm;
vec4 bake(vec2 uv) {
  float px = ${(1/e).toFixed(8)}, py = ${(1/t).toFixed(8)};
  float hL = textureLod(tOrm, uv - vec2(px, 0.0), 0.0).a;
  float hR = textureLod(tOrm, uv + vec2(px, 0.0), 0.0).a;
  float hD = textureLod(tOrm, uv - vec2(0.0, py), 0.0).a;
  float hU = textureLod(tOrm, uv + vec2(0.0, py), 0.0).a;
  vec3 n = normalize(vec3((hL - hR) * 1.65, (hD - hU) * 1.65, 1.0));
  return vec4(n * 0.5 + 0.5, 1.0);
}`,Ee=/for \(int (\w+) = 0; \1 < (\d+); \1\+\+\)/g;function De(e){return e.replace(Ee,(e,t,n)=>`for (int ${t} = 0; ${t} < ${n} * uOne; ${t}++)`)}var Oe=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;function ke(t,n,r,o,l,u){let f=new h(n,r,{type:a,format:e,colorSpace:o?s:``,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!0,minFilter:i,magFilter:c,wrapS:d,wrapT:d,anisotropy:Math.min(l??8,t.capabilities.getMaxAnisotropy())});return f.texture.name=u,f}async function Ae(e,t){let r=new S(2,2),i=new n(-1,1,1,-1,0,1),a=new g,o=t.map(e=>{let t=new m(r,new k({uniforms:{uOne:{value:1}},vertexShader:Oe,fragmentShader:`precision highp float;
varying vec2 vUv;
`+L+`
`+De(e.glsl)+`
void main(){ gl_FragColor = bake(vUv); }`,depthTest:!1,depthWrite:!1}));return t.frustumCulled=!1,a.add(t),t}),s=e.getRenderTarget();e.setRenderTarget(t[0].rt);try{if(e.compileAsync){let t=e.compileAsync(a,i);e.setRenderTarget(s),await t}}catch(e){console.warn(`[lagoon] vegetation atlas compileAsync:`,e)}e.setRenderTarget(s),s=e.getRenderTarget();for(let n=0;n<t.length;n++){let r=t[n];r.rt.viewport.set(r.x,r.y,r.size,r.size),r.rt.scissor.set(r.x,r.y,r.size,r.size),r.rt.scissorTest=!0,e.setRenderTarget(r.rt),e.render(o[n],i)}for(let e of t)e.rt.scissorTest=!1,e.rt.viewport.set(0,0,e.rt.width,e.rt.height),e.rt.scissor.set(0,0,e.rt.width,e.rt.height);e.setRenderTarget(s);for(let e of o)e.material.dispose();r.dispose()}async function je(e){let t=e.quality,n=t.cinematic?768:Math.max(256,Math.min(512,(t.textureSize|0)/2||512)),r=t.anisotropy??8,i=e.renderer,a=performance.now(),o=ke(i,n*4,n*3,!0,r,`veg.grass.map`),s=n*4,c=n*U.ROWS,l=ke(i,s,c,!0,r,`veg.leaf.map`),u=ke(i,s,c,!1,r,`veg.leaf.orm`),f=ve(n),p=xe(n),m=[];for(let e=0;e<12;e++)m.push({rt:o,x:e%4*n,y:Math.floor(e/4)*n,size:n,glsl:f+be(ye[e])});for(let e=0;e<Se.length;e++){let t=e%4*n,r=Math.floor(e/4)*n;m.push({rt:l,x:t,y:r,size:n,glsl:p+Ce(Se[e])}),m.push({rt:u,x:t,y:r,size:n,glsl:p+we(Se[e])})}await Ae(i,m);let h=performance.now(),g=e.tex.bake(Te(s,c),{width:s,height:c,anisotropy:r,wrap:d,uniforms:{tOrm:{value:u.texture}},name:`veg.leaf.normal`});return e.tex.register(`vegGrassAtlas`,o.texture),e.tex.register(`vegLeafAtlas`,l.texture),e.tex.register(`vegLeafAtlasNormal`,g),e.tex.register(`vegLeafAtlasOrm`,u.texture),{grass:{map:o.texture,width:n*4,height:n*3},leaf:{map:l.texture,normalMap:g,ormMap:u.texture,size:s,width:s,height:c},times:{tiles:Math.round(h-a),normal:Math.round(performance.now()-h),programs:m.length}}}var Me=.7,Ne=`
uniform float uTime;
uniform vec2 uWindDir;
uniform float uWindStrength;
uniform float uWaterLevel;
`,Pe=`
{
  float vegPh = aVeg.y * 6.2831;
  vec2 vegWd = uWindDir;
  float vegFront = dot(transformed.xz, vegWd);
  float vegSide = dot(transformed.xz, vec2(-vegWd.y, vegWd.x));
  float vegGust = 0.5 + 0.5 * sin(uTime * 0.55 - vegFront * 0.07) * sin(uTime * 0.23 - vegFront * 0.021 + 1.3);
  float vegWarp = 1.6 * sin(vegSide * 0.21 + 0.7) + 1.1 * sin(vegSide * 0.067 - vegFront * 0.05 + 2.1);
  float vegRoll = 0.5 + 0.5 * sin(vegFront * 0.9 - uTime * 2.4 + vegWarp);
  vegRoll *= vegRoll;
  float vegS = (sin(uTime * 1.25 + vegPh) * 0.4 + sin(uTime * 2.6 + vegPh * 1.7) * 0.15 + 0.3 + vegGust * 0.8 + vegRoll * 0.55 * (0.35 + vegGust)) * uWindStrength;
  vec3 vegDisp = vec3(vegWd.x, 0.0, vegWd.y) * (vegS * aVeg.x * ${Me.toFixed(2)});
  vegDisp.xz += vec2(sin(uTime * 1.9 + vegPh * 2.3), cos(uTime * 1.6 + vegPh * 1.9)) * (aVeg.x * 0.05 * uWindStrength);
  float vegFl = sin(uTime * 8.5 + vegPh * 5.0 + transformed.x * 2.7 + transformed.z * 1.9) * aVeg.z * (0.025 + 0.06 * uWindStrength * vegGust);
  vegDisp += normalize(normal + vec3(0.0, 1e-4, 0.0)) * vegFl;
  vegDisp.y -= dot(vegDisp.xz, vegDisp.xz) * 0.4;
  transformed += vegDisp;
}
`;function Fe(e){return`
#ifdef USE_MAP
  {
    vec2 vegDx = dFdx(${e} * uVegAtlasSize);
    vec2 vegDy = dFdy(${e} * uVegAtlasSize);
    float vegLod = 0.5 * log2(max(max(dot(vegDx, vegDx), dot(vegDy, vegDy)), 1e-8));
    diffuseColor.a *= 1.0 + max(vegLod, 0.0) * 0.26;
  }
#endif
`}function Ie(e){let t=j.lights_physical_pars_fragment,n=`vec3 irradiance = dotNL * directLight.color;`;return!t||!t.includes(n)?e:e.replace(`#include <lights_physical_pars_fragment>`,t.replace(n,`vec3 irradiance = dotNL * directLight.color;
  {
    float vegBack = saturate( dot( - geometryNormal, directLight.direction ) );
    float vegFwd = saturate( dot( - geometryViewDir, directLight.direction ) );
    float vegF4 = vegFwd * vegFwd; vegF4 *= vegF4;
    vec3 vegLit = max( directLight.color, uSunColor * ( uSunIntensity * uVegTransFloor ) );
    float vegT = uVegTrans * vegThin * mix( 1.0, vegBack, uVegBackW ) * ( 0.4 + 1.25 * vegF4 );
    vec3 vegTc = material.diffuseColor * mix( vec3( 1.06, 1.16, 0.62 ), vec3( 1.1, 1.0, 0.78 ), vegDryT );
    reflectedLight.directDiffuse += vegLit * vegTc * vegT;
  }`))}function Le(e,t){let{G:n}=e,r=(e.quality.msaa|0)>0,i=new C({map:t.map,roughness:.8,metalness:0,alphaTest:.5,alphaToCoverage:r,side:2,envMapIntensity:.8});i.name=`vegGrass`;let a={uVegAtlasSize:{value:new w(t.width,t.height)},uVegTrans:{value:.1},uVegBackW:{value:.5},uVegTransFloor:{value:.1},uVegAmbT:{value:.15},uVegGrassDist:{value:e.quality.grassDistance}};return i.userData.vegUniforms=a,i.onBeforeCompile=e=>{Object.assign(e.uniforms,a),e.uniforms.uTime=n.uTime,e.uniforms.uWindDir=n.uWindDir,e.uniforms.uWindStrength=n.uWindStrength,e.uniforms.uWaterLevel=n.uWaterLevel;let t=e.vertexShader;t=t.replace(`#include <common>`,`#include <common>
${Ne}
uniform float uVegGrassDist;
attribute vec4 iPos;
attribute vec4 iShape;
attribute vec4 iColor;
attribute vec2 aLean;
varying vec3 vVegTint;
varying float vVegV;
varying float vVegFade;
varying float vVegSea;
`),t=t.replace(`#include <beginnormal_vertex>`,`
  float vegCy = cos(iPos.w), vegSy = sin(iPos.w);
  float vegV = position.y;
  float vegD = distance(cameraPosition.xz, iPos.xz);
  float vegPh = dot(iPos.xz, vec2(0.371, 0.529));
  float vegWet = step(iPos.y + iShape.y * 0.7, uWaterLevel); // per tuft: submerged tufts surge, emergent ones take the wind
  float vegBend = 0.0;
  vec2 vegW;
  if (vegWet > 0.5) {
    // underwater: slow surge back and forth
    vegW = vec2(sin(uTime * 0.7 + vegPh), cos(uTime * 0.55 + vegPh * 1.3)) * (0.18 * vegV * vegV * iShape.y);
  } else {
    vec2 vegWd = uWindDir;
    float vegFront = dot(iPos.xz, vegWd);
    float vegSide = dot(iPos.xz, vec2(-vegWd.y, vegWd.x));
    // slow gust fronts (~90 m, travelling downwind)
    float vegGust = 0.5 + 0.5 * sin(uTime * 0.55 - vegFront * 0.07) * sin(uTime * 0.23 - vegFront * 0.021 + 1.3);
    // rolling waves (~7 m, ~2.7 m/s), their fronts warped across the wind
    float vegWarp = 1.6 * sin(vegSide * 0.21 + 0.7) + 1.1 * sin(vegSide * 0.067 - vegFront * 0.05 + 2.1);
    float vegRoll = 0.5 + 0.5 * sin(vegFront * 0.9 - uTime * 2.4 + vegWarp);
    vegRoll *= vegRoll;
    // stem stiffness: cattail / reed / rush stands (tiles 8-10) are stiff
    // culms that lean less and sway slower than soft grass blades; tall
    // wet-meadow grass (11) sits between
    float vegTl = iShape.w;
    float vegStiff = (vegTl > 7.5 && vegTl < 10.5) ? 0.55 : (vegTl > 10.5 ? 0.8 : 1.0);
    vegBend = (0.25 + 0.8 * vegGust + 0.75 * vegRoll * (0.35 + vegGust) + 0.12 * sin(uTime * 1.8 * vegStiff + vegPh)) * uWindStrength * vegStiff;
    vegW = vegWd * (vegBend * vegV * vegV * iShape.y * 0.55);
    // blade flutter (faster on the soft blades, a slow nod on stiff culms)
    float vegFq = mix(0.55, 1.0, vegStiff);
    vegW += vec2(sin(uTime * 5.3 * vegFq + vegPh * 3.1 + position.x * 4.0), cos(uTime * 4.6 * vegFq + vegPh * 2.3 + position.z * 4.0)) * (0.03 * vegV * iShape.y * (0.4 + uWindStrength) * vegStiff);
  }
  vec3 objectNormal = vec3(normal.x * vegCy - normal.z * vegSy, normal.y, normal.x * vegSy + normal.z * vegCy);
  objectNormal = normalize(objectNormal + vec3(uWindDir.x, 0.0, uWindDir.y) * (vegBend * vegV * 1.1));
`),t=t.replace(`#include <begin_vertex>`,`
  float vegCut = iColor.w;
  vVegFade = 1.0 - smoothstep(vegCut * 0.8, vegCut, vegD);
  float vegGrow = mix(1.0, 1.5, smoothstep(uVegGrassDist * 0.3, uVegGrassDist, vegD));
  vec2 vegL = position.xz * (iShape.x * vegGrow) + aLean * (iShape.z * iShape.y * vegV * vegV);
  vec2 vegR = vec2(vegL.x * vegCy - vegL.y * vegSy, vegL.x * vegSy + vegL.y * vegCy);
  float vegH = iShape.y * vegV * mix(0.55, 1.0, vVegFade);
  vec3 transformed = vec3(iPos.x + vegR.x + vegW.x,
                          iPos.y + vegH - dot(vegW, vegW) * 0.5 / max(iShape.y, 0.1),
                          iPos.z + vegR.y + vegW.y);
  vVegTint = iColor.rgb;
  vVegV = vegV;
  vVegSea = 1.0 - step(0.5, abs(iShape.w - ${H.SEAGRASS.toFixed(1)}));
`),t=t.replace(`#include <uv_vertex>`,`#include <uv_vertex>
#ifdef USE_MAP
  {
    float vegTile = iShape.w;
    vec2 vegCell = vec2(mod(vegTile, 4.0), floor(vegTile / 4.0 + 0.001));
    vMapUv = (vegCell + vec2(0.01 + uv.x * 0.98, uv.y * 0.985)) / vec2(4.0, 3.0);
  }
#endif
`),e.vertexShader=t;let r=e.fragmentShader;r=r.replace(`#include <common>`,`#include <common>
uniform vec2 uVegAtlasSize;
uniform float uVegTrans;
uniform float uVegBackW;
uniform float uVegTransFloor;
uniform float uVegAmbT;
float vegThin = 1.0;
float vegDryT = 0.0;
varying vec3 vVegTint;
varying float vVegV;
varying float vVegFade;
varying float vVegSea;
`),r=r.replace(`#include <map_fragment>`,`#include <map_fragment>
  diffuseColor.rgb *= vVegTint;
  diffuseColor.rgb *= mix(mix(0.5, 0.72, vVegSea), 1.0, smoothstep(0.0, 0.5, vVegV));
  // green blades are waxy (glossier), straw is matte
  float vegDry = smoothstep(-0.05, 0.3, (diffuseColor.r - 0.8 * diffuseColor.g) / max(diffuseColor.g, 1e-3));
  vegDryT = vegDry;
`),r=r.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
  roughnessFactor = mix(0.52, 0.84, vegDry);`),r=r.replace(`#include <alphatest_fragment>`,Fe(`vMapUv`)+`
  diffuseColor.a *= vVegFade;
#include <alphatest_fragment>
#ifdef ALPHA_TO_COVERAGE
  diffuseColor.a *= mix(1.0, 0.55, vVegSea);
#endif`),r=r.replace(`normal *= faceDirection;`,``),r=r.replace(`#include <aomap_fragment>`,`reflectedLight.indirectSpecular *= 0.45;
  reflectedLight.indirectDiffuse *= 1.0 + uVegAmbT;
#include <aomap_fragment>`),r=Ie(r),e.fragmentShader=r},i.customProgramCacheKey=()=>`vegGrass2`,e.patchMaterial(i),i}function Re(e,t){let{G:n}=e,r=(e.quality.msaa|0)>0;for(let e of[t.map,t.normalMap,t.ormMap])e.repeat.set(1,1),e.offset.set(0,0);let i=new C({map:t.map,normalMap:t.normalMap,roughnessMap:t.ormMap,aoMap:t.ormMap,aoMapIntensity:.8,roughness:1,metalness:0,alphaTest:.5,alphaToCoverage:r,side:2,envMapIntensity:.6});i.name=`vegLeaf`;let a={uVegAtlasSize:{value:new w(t.width??t.size,t.height??t.size)},uVegTrans:{value:.22},uVegBackW:{value:.9},uVegTransFloor:{value:.12},uVegAmbT:{value:.25}};i.userData.vegUniforms=a;let o=`#include <common>
${Ne}
attribute vec4 aTint;
attribute vec4 aVeg;
`;i.onBeforeCompile=e=>{Object.assign(e.uniforms,a),e.uniforms.uTime=n.uTime,e.uniforms.uWindDir=n.uWindDir,e.uniforms.uWindStrength=n.uWindStrength,e.uniforms.uWaterLevel=n.uWaterLevel;let t=e.vertexShader;t=t.replace(`#include <common>`,o+`
varying vec3 vVegTint;
varying float vVegFlip;
varying float vVegFade;
`),t=t.replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vVegTint = aTint.rgb * 2.0;
  vVegFlip = aTint.a;
  vVegFade = 1.0 - smoothstep(aVeg.w * 400.0 * 0.85, aVeg.w * 400.0, distance(cameraPosition, transformed));
`+Pe),e.vertexShader=t;let r=e.fragmentShader;r=r.replace(`#include <common>`,`#include <common>
uniform vec2 uVegAtlasSize;
uniform float uVegTrans;
uniform float uVegBackW;
uniform float uVegTransFloor;
uniform float uVegAmbT;
float vegThin = 1.0;
float vegDryT = 0.0;
varying vec3 vVegTint;
varying float vVegFlip;
varying float vVegFade;
`),r=r.replace(`#include <map_fragment>`,`#include <map_fragment>
  diffuseColor.rgb *= vVegTint;
  vegDryT = smoothstep(-0.05, 0.3, (diffuseColor.r - 0.8 * diffuseColor.g) / max(diffuseColor.g, 1e-3));
#ifdef USE_AOMAP
  vegThin = texture2D( aoMap, vAoMapUv ).b;   // leaf thinness (veins / stems transmit less)
#endif
`),r=r.replace(`#include <alphatest_fragment>`,Fe(`vMapUv`)+`
  diffuseColor.a *= vVegFade;
#include <alphatest_fragment>`),r=r.replace(`normal *= faceDirection;`,`normal *= mix(1.0, faceDirection, vVegFlip);`),r=r.replace(`tbn[0] *= faceDirection;`,`tbn[0] *= mix(1.0, faceDirection, vVegFlip);`),r=r.replace(`tbn[1] *= faceDirection;`,`tbn[1] *= mix(1.0, faceDirection, vVegFlip);`),r=r.replace(`#include <aomap_fragment>`,`reflectedLight.indirectSpecular *= 0.5;
  reflectedLight.indirectDiffuse *= 1.0 + uVegAmbT;
#include <aomap_fragment>`),r=Ie(r),e.fragmentShader=r},i.customProgramCacheKey=()=>`vegLeaf1`,e.patchMaterial(i);let s=new O;return s.name=`vegLeafDepth`,s.onBeforeCompile=e=>{e.uniforms.uTime=n.uTime,e.uniforms.uWindDir=n.uWindDir,e.uniforms.uWindStrength=n.uWindStrength,e.uniforms.uWaterLevel=n.uWaterLevel,e.uniforms.uVegAtlasSize=a.uVegAtlasSize,e.vertexShader=e.vertexShader.replace(`#include <common>`,o).replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+Pe),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform vec2 uVegAtlasSize;`).replace(`#include <alphatest_fragment>`,Fe(`vMapUv`)+`
#include <alphatest_fragment>`)},s.customProgramCacheKey=()=>`vegLeafDepth1`,{mat:i,depth:s}}function ze(){let e=[0,.3,.63,1],t=[0,.5,1],n=[],r=[],i=[],a=[],s=[];for(let o=0;o<5;o++){let c=o/5*Math.PI+(o%2?.17:-.11),l=Math.cos(c),u=Math.sin(c),d=-u,f=l,p=o%2?1:-1,m=.07*p,h=.11*p,g=n.length/3;for(let o=0;o<e.length;o++){let s=e[o],c=o===0?.36:o===1?.8:o===2?.96:1;for(let e=0;e<t.length;e++){let o=t[e],g=(o-.5)*c,_=h*(1-4*(o-.5)*(o-.5))*(.6+.4*s)*c,v=m*(.45+.55*c),y=l*g+d*(v+_),b=u*g+f*(v+_);n.push(y,s,b);let x=y,S=b,C=Math.hypot(x,S);C<.05?(x=d*p,S=f*p):(x/=C,S/=C);let w=[d*p,f*p],T=x*.55+w[0]*.2,E=.75+.25*s,D=S*.55+w[1]*.2,O=Math.hypot(T,E,D);r.push(T/O,E/O,D/O),i.push(o,s);let k=x*.7+w[0]*.3,A=S*.7+w[1]*.3,j=Math.hypot(k,A)||1;a.push(k/j,A/j)}}let _=t.length;for(let t=0;t<e.length-1;t++)for(let e=0;e<_-1;e++){let n=g+t*_+e,r=n+1,i=n+_,a=i+1;s.push(n,r,a,n,a,i)}}let c=new x;return c.setAttribute(`position`,new o(n,3)),c.setAttribute(`normal`,new o(r,3)),c.setAttribute(`uv`,new o(i,2)),c.setAttribute(`aLean`,new o(a,2)),c.setIndex(s),c}var Be=class{constructor(e=8192){this.nv=0,this.ni=0,this._alloc(e,e*2),this.tint=[1,1,1],this.flip=1,this.phase=0,this.cutoff=100}_alloc(e,t){let n=(e,t,n)=>{let r=new n(t);return e&&r.set(e.subarray(0,Math.min(e.length,t))),r};this.pos=n(this.pos,e*3,Float32Array),this.nrm=n(this.nrm,e*3,Int8Array),this.uv=n(this.uv,e*2,Float32Array),this.tnt=n(this.tnt,e*4,Uint8Array),this.veg=n(this.veg,e*4,Uint8Array),this.idx=n(this.idx,t,Uint32Array),this.capV=e,this.capI=t}ensure(e,t){(this.nv+e>this.capV||this.ni+t>this.capI)&&this._alloc(Math.max(this.capV*2,this.nv+e+1024),Math.max(this.capI*2,this.ni+t+2048))}vert(e,t,n,r,i,a,o,s,c,l){let u=this.nv++,d=u*3,f=u*2,p=u*4;this.pos[d]=e,this.pos[d+1]=t,this.pos[d+2]=n;let m=Math.hypot(r,i,a)||1;this.nrm[d]=Math.round(r/m*127),this.nrm[d+1]=Math.round(i/m*127),this.nrm[d+2]=Math.round(a/m*127),this.uv[f]=o,this.uv[f+1]=s;let h=this.tint;return this.tnt[p]=Math.min(255,Math.round(h[0]*127.5)),this.tnt[p+1]=Math.min(255,Math.round(h[1]*127.5)),this.tnt[p+2]=Math.min(255,Math.round(h[2]*127.5)),this.tnt[p+3]=this.flip?255:0,this.veg[p]=Math.max(0,Math.min(255,Math.round(c/Me*255))),this.veg[p+1]=Math.round((this.phase%1+1)%1*255),this.veg[p+2]=Math.max(0,Math.min(255,Math.round(l*255))),this.veg[p+3]=Math.max(1,Math.min(255,Math.round(this.cutoff/400*255))),u}tri(e,t,n){let r=this.ni;this.idx[r]=e,this.idx[r+1]=t,this.idx[r+2]=n,this.ni+=3}toGeometry(){let e=new x,n=this.nv,r=this.ni;e.setAttribute(`position`,new t(this.pos.slice(0,n*3),3)),e.setAttribute(`normal`,new t(this.nrm.slice(0,n*3),3,!0)),e.setAttribute(`uv`,new t(this.uv.slice(0,n*2),2)),e.setAttribute(`aTint`,new t(this.tnt.slice(0,n*4),4,!0)),e.setAttribute(`aVeg`,new t(this.veg.slice(0,n*4),4,!0));let i=n>65535?this.idx.slice(0,r):Uint16Array.from(this.idx.subarray(0,r));return e.setIndex(new t(i,1)),e}reset(){this.nv=0,this.ni=0}},G=Math.PI*2;function Ve(e,t,n){let r=e()*G,i=Math.min(t,t*.5*Math.sqrt(-2*Math.log(1-e()*.98)));return n[0]=Math.cos(r)*i,n[1]=Math.sin(r)*i,n[2]=i/t,n}var He=class{constructor(e=65536){this.n=0,this.a=new Float32Array(e*12)}push(e,t,n,r,i,a,o,s,c,l,u,d){if((this.n+1)*12>this.a.length){let e=new Float32Array(this.a.length*2);e.set(this.a),this.a=e}let f=this.n++*12,p=this.a;p[f]=e,p[f+1]=t,p[f+2]=n,p[f+3]=r,p[f+4]=i,p[f+5]=a,p[f+6]=o,p[f+7]=s,p[f+8]=c,p[f+9]=l,p[f+10]=u,p[f+11]=d}};async function K(e,t,n,r,i){let a=Math.floor(e.minX/t),o=Math.ceil(e.maxX/t),s=Math.floor(e.minZ/t),c=Math.ceil(e.maxZ/t);for(let e=s;e<c;e++){for(let i=a;i<o;i++)r((i+P(i,e,n))*t,(e+P(i,e,n+1))*t,P(i,e,n+2),P(i,e,n+3)*4294967296>>>0);i&&await i()}}async function Ue(e,t,n){let{layout:r}=e,{near:i,far:a,farRadius:o}=n,s=e.quality.grassDensity??1,c=e.quality.foliageDensity??1,l=e.quality.grassDistance??95,u=Math.min(390,e.quality.scatterDistance??320),d={},f={},p=[0,0,0],m=new He(65536),h=[],g=n.trunks||[],_=(n.extraBlockers||[]).slice();{let t=(e.layout.WATERFALLS||[]).map(e=>e.stream),n=e.hf.distToPolyline;_.push((e,r,i)=>{for(let a=0;a<t.length;a++)if(n(e,r,t[a])<1+i)return!0;return!1})}let v=n.anchors||[],y=(n.vistas||[]).map(e=>({...e,fx:Math.sin(e.yawDeg*Math.PI/180),fz:-Math.cos(e.yawDeg*Math.PI/180),cosH:Math.cos(e.half*Math.PI/180)}));function b(e,t,n){for(let r=0;r<y.length;r++){let i=y[r];if(n<=i.maxH)continue;let a=e-i.x,o=t-i.z,s=Math.hypot(a,o);if(s<i.r0||s<i.dist&&(a*i.fx+o*i.fz)/s>i.cosH)return!0}return!1}let x={occ:0,trunk:0,extra:0,ok:0};function S(e,t,n,r){let i=r.island;if(r.occ<n)return i&&x.occ++,!0;for(let r=0;r<g.length;r++){let a=g[r],o=e-a.x,s=t-a.z,c=a.r+n;if(o*o+s*s<c*c)return i&&x.trunk++,!0}for(let r=0;r<_.length;r++)if(_[r](e,t,n))return i&&x.extra++,!0;return i&&x.ok++,!1}function C(e,t,n){let r=1e9;for(let n=0;n<v.length;n++){let i=v[n],a=Math.hypot(e-i.x,t-i.z)-(i.r||0);a<r&&(r=a)}return 1-F(n*.4,n,r)}let w=(e,t)=>e.occ<90&&e.occ>t?1-F(t+.4,t+2.4,e.occ):0,T=(e,t)=>Math.tan(Math.min(e.slope,40)*.01745)*t*.4,E=.03,D=performance.now(),O=async(t,n)=>{performance.now()-D>16&&(e.progress(t,n),await e.yieldFrame(),D=performance.now())},k=()=>O(.5+.18*(h.length>0),`Sowing the oasis`),A=new I(101),j=new I(102);await K(i,1.15/Math.sqrt(s),1001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.h<.05||d.slope>34||d.path<.2)return;let a=Math.min(1,F(.3,.78,d.moist)+.5*w(d,.15)*F(.22,.5,d.moist));if(a<=0||(a*=F(.1,1.5,d.w),d.shade>.75&&(a*=.8),a*=Math.max(.6*w(d,.15),F(-.08,.18,A.fbm2(e*.06,n*.06,3)))*(.55+.45*F(-.2,.3,j.noise2(e*.2,n*.2))),a*=.3+.7*F(.25,1.6,d.path),r>a))return;let o=M(i),s=3+(o()*6|0),c=.7+o()*.6,u=.72+.6*o()*o()+.1*o();for(let r=0;r<s;r++){Ve(o,c,p);let r=e+p[0],i=n+p[1],a=p[2];if(!t.env(r,i,f)||f.h<.05||f.path<.2||f.slope>36||S(r,i,.12,f))continue;let s=o(),d=.1+.55*(1-F(.42,.68,f.moist)),h=s<d?o()<.5?H.DRY_A:H.DRY_B:s<d+(1-d)*.62?H.GREEN_A:H.GREEN_B,g=f.w<4.5&&o()<.45*(1-F(2,4.5,f.w));g&&(h=H.TALL);let _=(.32+o()*.5)*(.72+.45*f.moist)*(g?1.45:1)*(1-.45*a)*u,v=_*(g?.8+o()*.4:1+o()*.6);if(b(r,i,_))continue;let y=1-f.moist,x=.86+o()*.26,C=x*(.94+.3*y),w=x*(1+.04*o()),D=x*(.86-.2*y);if(h===H.DRY_A||h===H.DRY_B)C*=.86,w*=.9,D*=.8;else{let e=1-F(.38,.64,f.moist);C*=1+.2*e,w*=1-.07*e,D*=1+.12*e}let O=l*(.45+.55*Math.max(o(),(_-.3)/.6));if(!g&&o()<.06+.06*y){let e=.8+o()*.15;m.push(r,t.groundHeight(r,i)-E,i,o()*G,v*1.25,_*.6,.6+o()*.3,o()<.5?H.DRY_A:H.DRY_B,e*.84,e*.78,e*.66,O*.8);continue}m.push(r,t.groundHeight(r,i)-E-T(f,v),i,o()*G,v,_,.12+o()*.25,h,C,w,D,O)}},k),await O(.52,`Sowing grass`);let N=new I(201),P=new I(202);await K(a,1.9/Math.sqrt(s),2001,(e,n,r,i)=>{if(e*e+n*n>o*o||!t.env(e,n,d)||d.h<.1||d.slope>35||d.path<.3)return;let a=d.moist,s=F(.08,.3,a)*(1-F(.52,.8,a)),c=.1*F(10,28,d.w)*(1-F(60,240,d.w)),u=s*1.1+c+.3*w(d,.15)*(1-F(.62,.85,a));if(u<=.005||(u*=F(-.02,.28,N.fbm2(e*.035,n*.035,3))*(.3+.7*F(-.15,.35,P.noise2(e*.13,n*.13))),u*=F(.3,1.3,d.path),r>u))return;let h=M(i),g=h()<.33,_=g?5+(h()*6|0):1+(h()*3|0),v=g?1.2+h()*1:.6+h()*.7,y=.7+.65*h()*h()+.1*h();for(let r=0;r<_;r++){Ve(h,v,p);let r=e+p[0],i=n+p[1],a=p[2];if(!t.env(r,i,f)||f.h<.1||f.path<.3||f.slope>36||S(r,i,.12,f))continue;let o=F(14,40,f.w),s=Math.max(.2,(.28+h()*.45)*(g?1.3-.55*a:1-.4*a)*(1+.45*o)*y),c=s*(1+h()*.6)*(1+.25*o),u=h()<.55?H.DRY_A:H.DRY_B,d=.85+h()*.25,_=l*(.45+.55*Math.max(h(),(s-.28)/.45)),b=o*+(h()<.3);if(h()<.08){let e=.78+h()*.15;m.push(r,t.groundHeight(r,i)-E,i,h()*G,c*1.25,s*.55,.6+h()*.3,h()<.5?H.DRY_A:H.DRY_B,e*.86,e*.8,e*.68,_*.8);continue}m.push(r,t.groundHeight(r,i)-E-T(f,c),i,h()*G,c,s,.15+h()*.3,u,d*(1+.08*h())*(1-.2*b),d*(.95+.06*h())*(1-.06*b),d*(.82+.15*h())*(1+.04*b),_)}},k),await O(.55,`Sowing grass`);let L=new I(301);await K(i,1.3/Math.sqrt(s),3001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.depth<.35||d.depth>1.6||d.w>-1||d.slope>18||r>.2*F(.12,.45,L.fbm2(e*.08,n*.08,3)))return;let a=M(i),o=1+(a()*2.6|0);for(let r=0;r<o;r++){let r=a()*G,i=.45*Math.sqrt(a()),o=e+Math.cos(r)*i,s=n+Math.sin(r)*i;if(!t.env(o,s,f)||f.depth<.3||f.depth>1.7||S(o,s,.1,f))continue;let c=.12+a()*.18,u=.85+a()*.25;m.push(o,t.groundHeight(o,s)-.02,s,a()*G,c*1.15,c,.1+a()*.15,H.SEAGRASS,u*1.25,u*1.3,u*.95,l*(.25+.25*a()))}},k);let R=new I(401);await K(i,1.6/Math.sqrt(s),4001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.h<.15||d.slope>25||d.path<.25||d.moist<.33||d.w<1.5)return;let a=.05+.3*(1-F(1,4.5,d.path))*F(.35,.6,d.moist)+.35*C(e,n,14);if(a*=F(0,.45,R.fbm2(e*.11,n*.11,2)),r>a)return;let o=M(i),s=3+(o()*4|0),c=R.noise2(e*.02+40,n*.02)>-.1;for(let r=0;r<s;r++){let r=o()*G,i=.8*Math.sqrt(o()),a=e+Math.cos(r)*i,s=n+Math.sin(r)*i;if(!t.env(a,s,f)||f.h<.12||f.path<.2||S(a,s,.12,f))continue;let u=.26+o()*.24,d=.9+o()*.2;m.push(a,t.groundHeight(a,s)-E-T(f,u),s,o()*G,u*(1+o()*.3),u,.1+o()*.15,(c?o()<.8:o()<.2)?H.FLOWER_WARM:H.FLOWER_COOL,d,d,d,l*(.3+.25*o()))}},k);let z=new I(501);await K(i,1.8/Math.sqrt(s),5001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.h<.2||d.slope>30||d.path<.3)return;let a=.07*F(1.5,4,d.w)*(1-F(18,30,d.w));if(d.h>6&&d.moist>.35&&(a+=.45*F(.35,.7,d.moist)),a*=F(-.2,.4,z.noise2(e*.09,n*.09)),r>a)return;let o=M(i),s=1+(o()*2|0);for(let r=0;r<s;r++){let r=o()*G,i=.4*Math.sqrt(o()),a=e+Math.cos(r)*i,s=n+Math.sin(r)*i;if(!t.env(a,s,f)||f.h<.15||S(a,s,.1,f))continue;let c=.2+o()*.28,u=.9+o()*.2;m.push(a,t.groundHeight(a,s)-E-T(f,c),s,o()*G,c*1.1,c,.08+o()*.1,H.SEDGE,u,u,u*.95,l*(.35+.3*o()))}},k),await O(.58,`Planting the shore`);let ee={reeds:1,papyrus:1,banana:1,elephant:1,fern:.9,maidenhair:.8,shrub:1.3,tamarisk:1,agave:.8},B=(e,n,r,i,a,o,s,c,l,u)=>{b(n,r,(a||i)*(ee[e]||1))||h.push({type:e,x:n,y:t.groundHeight(n,r)-.02-T(u,Math.min(a||i,1))*.5,z:r,s:i,s2:a,seed:o,cutoff:Math.min(s,399),tint:c,kind:l})},V=(e,t)=>[(.9+e()*.2)*t[0],(.92+e()*.16)*t[1],(.88+e()*.2)*t[2]],te=new I(601),ne=new I(602);await K(i,1/Math.sqrt(c),6001,(e,n,r,i)=>{if(!t.env(e,n,d))return;let a=0;if(d.w>-2.4&&d.w<1.3&&d.depth<=.6&&d.slope<24&&d.path>.8?a=.8*F(0,.3,te.fbm2(e*.05,n*.05,3))*(1-.45*F(.5,1.3,d.w)):d.h>6&&d.moist>.6&&d.slope<26&&d.path>.8&&(a=.45*F(.6,.85,d.moist)),r>a)return;let o=M(i),s=ne.noise2(e*.03,n*.03)>.42,c=ne.noise2(e*.045+31,n*.045-17),p=c>.25?H.REED:c<-.3?H.RUSH:H.CATTAIL,h=2+(o()*4|0);for(let r=0;r<h;r++){let r=o()*G,i=.85*Math.sqrt(o()),a=e+Math.cos(r)*i,c=n+Math.sin(r)*i;if(!t.env(a,c,f)||f.depth>.65||f.path<.7||f.slope>26||S(a,c,.3,f))continue;if(s&&o()<.7){B(`papyrus`,a,c,1.6+o()*1.1,0,o()*4294967296>>>0,u*.55,V(o,[1,1,.95]),0,f);continue}let d=o()<.8?p:o()<.5?H.CATTAIL:H.RUSH,h=(d===H.RUSH?.8+o()*.6:1.15+o()*1)*(1-.25*F(.2,.6,f.depth)),g=.85+o()*.25;b(a,c,h)||(m.push(a,t.groundHeight(a,c)-.05,c,o()*G,h*(.42+o()*.2),h,.06+o()*.1,d,g,g*(1+.05*o()),g*.95,Math.min(u*.5,l*(1.1+.4*o()))),o()<.3&&B(`reeds`,a+(o()-.5)*.4,c+(o()-.5)*.4,1.2+o()*1,0,o()*4294967296>>>0,u*(.42+.18*o()),V(o,[1,1,1]),+(d===H.CATTAIL),f))}},k),await O(.6,`Planting the shore`);let re=new I(701);await K(i,2.1/Math.sqrt(c),7001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.h<.15||d.slope>30||d.path<.9)return;let a=.55*F(.25,.7,d.shade)*F(.6,.9,d.moist)+.4*w(d,.45)*F(.7,.92,d.moist)+.4*F(.72,.95,d.moist)*(1-F(2.5,8,d.w));if(a*=.45+.55*F(-.3,.3,re.noise2(e*.07,n*.07)),r>a)return;let o=M(i),s=1+(o()*3|0);for(let r=0;r<s;r++){let r=o()*G,i=1.4*Math.sqrt(o()),a=e+Math.cos(r)*i,s=n+Math.sin(r)*i;if(!t.env(a,s,f)||f.h<.12||f.path<.8||f.slope>32||S(a,s,.45,f))continue;let c=f.w<14&&o()<(f.shade<.6?.5:.25),l=c?1.6+o()*1:.85+o()*.8;B(c?`banana`:`elephant`,a,s,l,0,o()*4294967296>>>0,u*(.4+.1*l),V(o,[1,1,1]),0,f)}},k);let ie=new I(801);await K(i,1.3/Math.sqrt(c),8001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.h<.1||d.slope>42||d.path<.5)return;let a=.6*F(.2,.6,d.shade)*F(.55,.85,d.moist)+.5*w(d,.3)*F(.55,.85,d.moist);if(a*=.4+.6*F(-.3,.3,ie.noise2(e*.09,n*.09)),r>a)return;let o=M(i),s=1+(o()*3|0);for(let r=0;r<s;r++){let r=o()*G,i=.9*Math.sqrt(o()),a=e+Math.cos(r)*i,s=n+Math.sin(r)*i;if(!t.env(a,s,f)||f.h<.08||f.path<.45||f.slope>44||S(a,s,.3,f))continue;let c=.45+o()*.5;B(`fern`,a,s,c,0,o()*4294967296>>>0,u*(.2+.1*o()),V(o,[1.03,.92,1.06]),0,f)}},k),await O(.62,`Growing the understory`);let ae=new I(851),oe=(r.WATERFALLS||[]).map(e=>[e.pool[0],e.pool[2]]);for(let e=0;e<oe.length;e++){let[n,r]=oe[e];await K({minX:n-22,maxX:n+22,minZ:r-22,maxZ:r+22},.8/Math.sqrt(c),8501+e*17,(e,i,a,o)=>{let s=Math.hypot(e-n,i-r);if(s>22||!t.env(e,i,d)||d.h<.06||d.h>3.5||d.slope>58||d.path<.5)return;let c=(.8*w(d,.1)+.25*F(.3,.8,d.shade)*F(.6,.9,d.moist))*(1-F(8,22,s));if(c*=.45+.55*F(-.3,.3,ae.noise2(e*.22,i*.22)),a>c)return;let l=M(o),p=1+(l()*3|0);for(let n=0;n<p;n++){let r=l()*G,a=n?.35+.4*l():0,o=e+Math.cos(r)*a,s=i+Math.sin(r)*a;if(!t.env(o,s,f)||f.h<.12||f.path<.45||f.slope>60||t.groundHeight(o,s)<.1||S(o,s,.12,f))continue;let c=.34+l()*.36;B(`maidenhair`,o,s,c,0,l()*4294967296>>>0,u*(.14+.08*l()),V(l,[.84,.94,.86]),+(w(f,.1)>.45),f)}},k)}let se=new I(901);await K(i,2.6/Math.sqrt(c),9001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.h<.2||d.slope>32||d.path<1.1)return;let a=.42*F(.3,.75,d.moist)+.3*F(.12,.4,d.shade)*(1-F(.6,.92,d.shade))+.3*(1-F(3,10,d.w))*F(.6,.85,d.moist)+.25*w(d,.7);if(a*=.35+.65*F(-.25,.35,se.fbm2(e*.045,n*.045,2)),a*=F(.4,2,d.w),r>a)return;let o=M(i),s=1+ +(o()<.35);for(let r=0;r<s;r++){let i=o()*G,a=r?1.4+o()*.6:0,s=e+Math.cos(i)*a,c=n+Math.sin(i)*a;if(!t.env(s,c,f)||f.h<.18||f.path<1)continue;let l=.5+o()*.7;if(S(s,c,l*.8,f))continue;let d=l*(1.1+o()*.5),p=f.moist<.62?`B`:`A`;B(`shrub`,s,c,l,d,o()*4294967296>>>0,u*(.42+.25*l),V(o,[1,1,1]),p,f)}},k);for(let e=0;e<v.length;e++){let n=v[e];if(!n.flowers)continue;let r=M(7001+e*131),i=n.flowers,a=0;for(let e=0;e<40&&a<i;e++){let e=r()*G,i=(n.r||0)+2.5+r()*6.5,o=n.x+Math.cos(e)*i,s=n.z+Math.sin(e)*i;if(!t.env(o,s,f)||f.h<.2||f.path<1.2||f.slope>26||f.w<1.5)continue;let c=.6+r()*.55;S(o,s,c*.9,f)||(B(`shrub`,o,s,c,c*(1.2+r()*.4),r()*4294967296>>>0,u*.5,V(r,[1,1,1]),r()<.6?`bougain`:`oleander`,f),a++)}}await O(.64,`Growing the understory`);let ce=new I(951);await K(a,5.5/Math.sqrt(c),9501,(e,n,r,i)=>{if(e*e+n*n>28900||!t.env(e,n,d)||d.h<.25||d.slope>26||d.path<2.2||d.w<5)return;let a=d.moist,o=.4*F(.1,.28,a)*(1-F(.48,.7,a))+.04*F(18,35,d.w)*(1-F(55,120,d.w));if(o*=F(-.15,.35,ce.fbm2(e*.025,n*.025,2)),d.shade>.45&&(o*=.25),r>o)return;let s=M(i),c=1+ +(s()<.4)+ +(s()<.15);for(let r=0;r<c;r++){let i=s()*G,a=r?1.8+s()*1.6:0,o=e+Math.cos(i)*a,c=n+Math.sin(i)*a;if(!t.env(o,c,f)||f.h<.2||f.path<2||f.slope>28)continue;let l=(.9+s()*.9)*(r?.72:1);if(S(o,c,l*.6,f))continue;let d=l*(1.35+s()*.6),p=.9+s()*.2;B(`tamarisk`,o,c,l,d,s()*4294967296>>>0,u*(.5+.12*l),[p*(.94+.08*s()),p,p*(1.02+.08*s())],0,f)}},k);let le=new I(1001);await K(a,4/Math.sqrt(c),10001,(e,n,r,i)=>{if(e*e+n*n>o*o||!t.env(e,n,d)||d.h<.3||d.slope>32||d.path<1.2||d.moist>.5)return;let a=.13*F(9,20,d.w)*(1-.72*F(50,260,d.w));if(d.h>7&&(a+=.1),a*=F(-.35,.35,le.fbm2(e*.02,n*.02,3)),r>a)return;let s=M(i),c=1+ +(s()<.3);for(let r=0;r<c;r++){let i=s()*G,a=r?1.2+s()*1.2:0,o=e+Math.cos(i)*a,c=n+Math.sin(i)*a;if(!t.env(o,c,f)||f.h<.25||f.path<1.1)continue;let l=.3+s()*.6;if(S(o,c,l*.7,f))continue;let d=.85+s()*.25;B(`shrub`,o,c,l,l*(.8+s()*.4),s()*4294967296>>>0,u*(.3+.35*l),[d*(1+s()*.15),d,d*(.9+s()*.1)],`scrub`,f)}},k),await O(.66,`Growing the understory`);let ue=new I(1101);return await K(i,3.2/Math.sqrt(c),11001,(e,n,r,i)=>{if(!t.env(e,n,d)||d.h<.3||d.slope>35||d.path<1.1)return;let a=d.moist,o=.13*F(.08,.22,a)*(1-F(.5,.7,a))+.25*w(d,.55)*(1-F(.62,.82,a));if(o*=.4+.6*F(-.3,.3,ue.noise2(e*.05,n*.05)),r>o)return;let s=M(i),c=s()<.35,l=c?.25+s()*.25:.45+s()*.55,p=1+(s()*2.4|0);for(let r=0;r<p;r++){let i=s()*G,a=r?l*1.1+s()*.6:0,o=e+Math.cos(i)*a,d=n+Math.sin(i)*a;if(!t.env(o,d,f)||f.h<.25||f.path<1)continue;let p=r?l*(.35+s()*.3):l;if(S(o,d,p*.55,f))continue;let m=.9+s()*.2;B(`agave`,o,d,p,0,s()*4294967296>>>0,u*(.34+.22*p),[m,m,m],+!!c,f)}},k),await O(.68,`Growing the understory`),{grass:m,plants:h,islandRejects:x}}var q=Math.PI*2,J=Math.PI/180,Y={ELEPHANT:W(U.ELEPHANT),BANANA:W(U.BANANA),BANANA_DRY:W(U.BANANA_DRY),FERN:W(U.FERN),SHRUB_A:W(U.SHRUB_A),SHRUB_B:W(U.SHRUB_B),BOUGAIN:W(U.BOUGAIN),OLEANDER:W(U.OLEANDER),SCRUB:W(U.SCRUB),PAPYRUS:W(U.PAPYRUS),AGAVE:W(U.AGAVE),ALOE:W(U.ALOE),BARK:W(U.BARK,.03,.03,.97,.97),STEM:W(U.STEM,.03,.03,.47,.97),PSEUDO:W(U.STEM,.53,.03,.97,.97),HEAD:W(U.CATTAIL,.03,.03,.47,.97),CSTEM:W(U.CATTAIL,.53,.03,.97,.97),REED:[0,1,2,3].map(e=>W(U.REED,e/4,0,(e+1)/4,1)),MAIDENHAIR:W(U.MAIDENHAIR,.08,0,.92,1),TAMARISK:W(U.TAMARISK,.06,0,.94,1)};function We(e,t,n){let r=Math.min(1,Math.max(0,(t-e.baseY)/e.plantH));return Math.min(1,(e.swayK||0)*r**1.5+(e.leafFlex||0)*n*n)}function X(e,t,n,r,i){let a=i.nl,o=i.nw;e.ensure(a*o,(a-1)*(o-1)*6);let s=r[1]*n[2]-r[2]*n[1],c=r[2]*n[0]-r[0]*n[2],l=r[0]*n[1]-r[1]*n[0];c<0&&(s=-s,c=-c,l=-l);let u=i.upBias||0,d=i.sph||null,f=i.rect,p=i.curl||0,m=i.droop||0,h=i.fold||0,g=i.len,_=i.twist||0,v=i.cup||0,y=i.wave||0,b=i.waveK||3,x=i.wavePh||0,S=e.nv,C=r[0],w=r[1],T=r[2];for(let S=0;S<a;S++){let E=S/(a-1),D=Math.sin(Math.PI*E),O=Math.cos(Math.PI*E),k=t[0]+n[0]*g*E+s*p*D,A=t[1]+n[1]*g*E-m*E*E+c*p*D,j=t[2]+n[2]*g*E+l*p*D,M=n[0]*g+s*p*Math.PI*O,N=n[1]*g-2*m*E+c*p*Math.PI*O,P=n[2]*g+l*p*Math.PI*O;if(_!==0){let e=Math.hypot(M,N,P)||1,t=M/e,n=N/e,i=P/e,a=_*E,o=Math.cos(a),s=Math.sin(a),c=t*r[0]+n*r[1]+i*r[2];C=r[0]*o+(n*r[2]-i*r[1])*s+t*c*(1-o),w=r[1]*o+(i*r[0]-t*r[2])*s+n*c*(1-o),T=r[2]*o+(t*r[1]-n*r[0])*s+i*c*(1-o)}let F=w*P-T*N,I=T*M-C*P,L=C*N-w*M;F*s+I*c+L*l<0&&(F=-F,I=-I,L=-L);let R=Math.hypot(F,I,L)||1;F/=R,I/=R,L/=R;let z=.5*i.wid*(i.widthFn?i.widthFn(E):1);for(let t=0;t<o;t++){let n=o===1?0:t/(o-1)*2-1,r=Math.abs(n),a=h*r*z+v*n*n*z,s=h*Math.sign(n)+2*v*n;if(y!==0){let e=Math.sin(E*b*q+x+(n<0?2.1:0))*y*Math.min(1,4*E*(1-E)+.2);a+=e*z*r*Math.sqrt(r),s+=e*1.5*Math.sqrt(r)*Math.sign(n)}let c=k+C*n*z+F*a,l=A+w*n*z+I*a,p=j+T*n*z+L*a,m=F-C*s,g=I-w*s,_=L-T*s;if(m*=1-u,g=g*(1-u)+u,_*=1-u,d){let e=(c-d[0])*d[3],t=(l-d[1])*d[4],n=(p-d[2])*d[5],r=Math.hypot(e,t,n)||1,i=Math.hypot(m,g,_)||1;e/=r,t/=r,n/=r,m/=i,g/=i,_/=i,m*e+g*t+_*n<0&&(m=-m,g=-g,_=-_);let a=d[6];m=m*(1-a)+e*a,g=g*(1-a)+t*a,_=_*(1-a)+n*a}let S=f[0]+(f[2]-f[0])*(n*.5+.5),D=f[1]+(f[3]-f[1])*E;e.vert(c,l,p,m,g,_,S,D,We(i,l,E),(i.flutter||0)*E)}}for(let t=0;t<a-1;t++)for(let n=0;n<o-1;n++){let r=S+t*o+n,i=r+1,a=r+o,s=a+1;e.tri(r,a,i),e.tri(i,a,s)}}function Z(e,t,n,r,i,a){let o=t.length;e.ensure(o*(r+1),(o-1)*r*6);let s=e.nv;for(let s=0;s<o;s++){let c=t[Math.max(0,s-1)],l=t[Math.min(o-1,s+1)],u=l[0]-c[0],d=l[1]-c[1],f=l[2]-c[2],p=Math.hypot(u,d,f)||1;u/=p,d/=p,f/=p;let m=0,h=1;Math.abs(d)>.9&&(m=1,h=0);let g=d*0-f*h,_=f*m-u*0,v=u*h-d*m,y=Math.hypot(g,_,v)||1;g/=y,_/=y,v/=y;let b=d*v-f*_,x=f*g-u*v,S=u*_-d*g,C=t[s],w=n[s],T=i[1]+(i[3]-i[1])*(s/(o-1));for(let t=0;t<=r;t++){let n=t/r*q,o=Math.cos(n),s=Math.sin(n),c=g*o+b*s,l=_*o+x*s,u=v*o+S*s,d=C[1]+l*w;e.vert(C[0]+c*w,d,C[2]+u*w,c,l,u,i[0]+(i[2]-i[0])*(t/r),T,We(a,d,0),0)}}let c=r+1;for(let t=0;t<o-1;t++)for(let n=0;n<r;n++){let r=s+t*c+n,i=r+1,a=r+c,o=a+1;e.tri(r,i,a),e.tri(i,o,a)}}var Ge=[0,0,0];function Q(e,t){let n=-Math.sin(t),r=0,i=Math.cos(t),a=n*e[0]+r*e[1]+i*e[2];n-=e[0]*a,r-=e[1]*a,i-=e[2]*a;let o=Math.hypot(n,r,i)||1;return Ge[0]=n/o,Ge[1]=r/o,Ge[2]=i/o,Ge}function $(e,t,n){e.tint[0]=t[0]*n,e.tint[1]=t[1]*n,e.tint[2]=t[2]*n}function Ke(e,t,n,r,i,a,o){let s=4+Math.floor(a()*4),c=a()*q,l={baseY:n,plantH:i,swayK:.22};for(let u=0;u<s;u++){let d=c+u/s*q+(a()-.5)*.8,f=Math.cos(d),p=Math.sin(d),m=(56+a()*22)*J,h=i*(.5+a()*.32),g=[t+f*.04,n-.04,r+p*.04],_=[f*Math.cos(m),Math.sin(m),p*Math.cos(m)],v=[g[0]+_[0]*h*.5+f*h*.04,g[1]+_[1]*h*.5,g[2]+_[2]*h*.5+p*h*.04],y=[g[0]+_[0]*h+f*h*.1,g[1]+_[1]*h,g[2]+_[2]*h+p*h*.1];e.flip=1,$(e,o,.9+a()*.2),Z(e,[g,v,y],[.026*i,.019*i,.013*i],4,Y.STEM,l);let b=(16+a()*34)*J,x=[f*Math.cos(b),-Math.sin(b),p*Math.cos(b)],S=Q(x,d+(a()-.5)*.3),C=i*(.4+a()*.24),w=C*.92,T=[y[0]-x[0]*C*.26,y[1]-x[1]*C*.26,y[2]-x[2]*C*.26];$(e,o,.85+a()*.3),X(e,T,x,S.slice(),{len:C,wid:w,droop:C*(.14+a()*.16),curl:-C*.06,fold:.1,cup:.16+a()*.08,wave:.05+a()*.05,waveK:2+a()*1.5,wavePh:a()*q,twist:(a()-.5)*.5,nl:7,nw:5,rect:Y.ELEPHANT,baseY:n,plantH:i,swayK:.22,leafFlex:.12,flutter:.8,upBias:.12})}}function qe(e,t,n,r,i,a,o){let s=i*(.38+a()*.16),c=.08+i*.035,l=(a()-.5)*.08,u=(a()-.5)*.08,d=[t+l,n+s,r+u],f={baseY:n,plantH:i,swayK:.12};e.flip=1,e.tint[0]=o[0]*1.15,e.tint[1]=o[1]*1.05,e.tint[2]=o[2]*.8,e.tint[0]=o[0]*1.05,e.tint[1]=o[1],e.tint[2]=o[2]*.9,Z(e,[[t,n-.06,r],[t+l*.25,n+s*.3,r+u*.25],[t+l*.6,n+s*.65,r+u*.6],d],[c*1.35,c*1.08,c*.92,c*.8],8,Y.PSEUDO,f);let p=7+Math.floor(a()*4),m=a()*q;for(let t=0;t<p;t++){let r=t<2,l=m+t*2.39996+(a()-.5)*.4,u=Math.cos(l),p=Math.sin(l),h=r&&a()<.6,g=h,_=(g?-62-a()*20:r?-5+a()*20:28+a()*34)*J,v=i*(.62+a()*.38)*(g?Math.min(1,(s+.1)/(i*.8)):1),y=[u*Math.cos(_),Math.sin(_),p*Math.cos(_)],b=i*.13,x=[d[0]+y[0]*b,d[1]+y[1]*b,d[2]+y[2]*b];$(e,o,.95),Z(e,[d,x],[c*.35,c*.25],3,Y.STEM,f),$(e,o,.88+a()*.25),X(e,x,y,Q(y,l).slice(),{len:v,wid:v*(g?.3:.42),droop:v*(g?.05:r?1:.5+a()*.35),curl:g?v*.05:0,fold:g?.3:.08,twist:g?(a()-.5)*.8:0,nl:7,nw:3,rect:h?Y.BANANA_DRY:Y.BANANA,baseY:n,plantH:i,swayK:.3,leafFlex:.25,flutter:.75,upBias:.15})}}function Je(e,t,n,r,i,a,o){let s=6+Math.floor(a()*6),c=a()*q;e.flip=1;for(let l=0;l<s;l++){let u=c+l/s*q+(a()-.5)*.7,d=Math.cos(u),f=Math.sin(u),p=(30+a()*40)*J,m=i*(.8+a()*.35),h=[d*Math.cos(p),Math.sin(p),f*Math.cos(p)],g=[t+d*.03,n-.03,r+f*.03];$(e,o,.85+a()*.3),X(e,g,h,Q(h,u+(a()-.5)*.5).slice(),{len:m,wid:m*.34,droop:Math.min(m*(.32+a()*.36),.85*m*h[1]+.04),curl:0,fold:.12,nl:5,nw:3,rect:Y.FERN,baseY:n,plantH:i,swayK:.14,leafFlex:.16,flutter:.5,upBias:.25})}}function Ye(e,t,n,r,i,a,o,s,c,l=1){let u=c===`scrub`,d=a*.5,f=n+a*(u?.5:.52),p={baseY:n,plantH:a,swayK:u?.05:.1},m=o()*q,h=o()*q,g=.14+o()*.14,_=(e,t)=>1+g*Math.sin(3*e+m)*Math.cos(2.2*t+h),v=(e,a,o)=>{let s=Math.sqrt(Math.max(0,1-a*a)),c=o*_(e,a);return[t+Math.cos(e)*s*i*c,Math.max(n+.05,f+a*d*c),r+Math.sin(e)*s*i*c]};e.flip=1,$(e,s,u?.9:.72);let y=u?3:3+Math.floor(o()*3),b=[],x=(u?.018:.014)*Math.max(i,.5);for(let s=0;s<y;s++){let c=s/y*q+(o()-.5)*1.2,l=[t+(o()-.5)*.12*i,n-.04,r+(o()-.5)*.12*i],d=v(c,-.35+o()*.3,.3+o()*.15);Z(e,[l,[(l[0]+d[0])*.5+(o()-.5)*.06,(l[1]+d[1])*.5,(l[2]+d[2])*.5+(o()-.5)*.06],d],[x,x*.8,x*.62],3,Y.BARK,p);let f=u?2:3+Math.floor(o()*2);for(let t=0;t<f;t++){let t=c+(o()-.5)*(q/y)*1.5,n=Math.min(.95,-.25+1.15*o()),r=v(t,n,.72+o()*.14);u?Z(e,[d,r],[x*.5,x*.2],3,Y.BARK,p):Z(e,[d,[d[0]*.55+r[0]*.45,d[1]*.5+r[1]*.5+.04*a,d[2]*.55+r[2]*.45],r],[x*.55,x*.4,x*.18],3,Y.BARK,p),b.push([d,r,t,n])}}e.flip=0;let S=Math.sqrt(Math.min(1.6,Math.max(.3,l))),C=Math.max(8,Math.round((u?8+16*i:60+160*i*i)*S)),w=Math.min(1.3,Math.max(.88,1/S)),T=[t,f,r,1/Math.max(i,.2),1/Math.max(d,.2),1/Math.max(i,.2),u?.45:.6],E=c===`B`||u,D=[0,0,0];for(let l=0;l<C;l++){let m,h,g,_,y,x=l%3==2;if(x||!b.length){m=o()*q,h=-.8+1.6*o();let e=v(m,h,.3+.45*o());g=e[0],_=e[1],y=e[2]}else{let e=b[Math.floor(o()*b.length)],t=.3+.8*Math.sqrt(o()),n=.14*i*(.5+t);g=e[0][0]+(e[1][0]-e[0][0])*t+(o()-.5)*n,_=e[0][1]+(e[1][1]-e[0][1])*t+(o()-.5)*n,y=e[0][2]+(e[1][2]-e[0][2])*t+(o()-.5)*n,m=e[2],h=e[3]}let S=(u?.32+o()*.16:(.3+o()*.16)*Math.min(1.25,Math.max(.65,i)))*w*(x?1.45:1),C=g-t,O=(_-f)*(i/Math.max(d,.2)),k=y-r,A=Math.hypot(C,O,k)||1;C/=A,O/=A,k/=A;let j=C*.75+(o()-.5)*.5,M=O*.5+.5+(o()-.5)*.4,N=k*.75+(o()-.5)*.5,P=Math.hypot(j,M,N)||1,F=[j/P,M/P,N/P];D[0]=g-F[0]*S*.2,D[1]=Math.max(n+.02,_-F[1]*S*.2),D[2]=y-F[2]*S*.2;let I=Math.hypot((g-t)/i,(_-f)/Math.max(d,.2),(y-r)/i),L=I>.75&&O>-.2,R=Y.SHRUB_A,z=1,ee=1,B=1;c===`B`?R=Y.SHRUB_B:u?R=Y.SCRUB:c===`bougain`?R=L&&o()<.7?Y.BOUGAIN:Y.SHRUB_A:c===`oleander`&&(L&&o()<.6?R=Y.OLEANDER:(R=Y.SHRUB_B,z=.72,ee=.95,B=.8));let V=(.55+.45*Math.min(1,I*(.55+.45*(O*.5+.5))))*(.88+o()*.24);E&&o()<.06&&(z=1.85,ee=1.05,B=.7),e.tint[0]=s[0]*V*z,e.tint[1]=s[1]*V*ee,e.tint[2]=s[2]*V*B,X(e,D,F,Q(F,Math.atan2(k,C)+Math.PI*.5+(o()-.5)*1.3).slice(),{len:S,wid:S*.95,droop:S*(.08+.14*o()),curl:0,fold:.22,twist:(o()-.5)*.6,nl:2,nw:3,rect:R,baseY:n,plantH:a,swayK:p.swayK,leafFlex:u?.04:.12,flutter:u?.3:.6,sph:T})}e.flip=1}function Xe(e,t,n,r,i,a,o,s){let c=s?14+Math.floor(a()*9):16+Math.floor(a()*9),l=a()*q;e.flip=1;let u=e=>e<.3?.62+e*1.27:1-(e-.3)/.7*.94,d=e=>e<.2?.8+e:1-(e-.2)/.8*.92;for(let f=0;f<c;f++){let p=f/(c-1),m=l+f*2.39996,h=Math.cos(m),g=Math.sin(m),_=((s?22:15)+((s?72:80)-(s?22:15))*p**.8)*J,v=i*(1-.5*p)*(.9+a()*.2),y=[h*Math.cos(_),Math.sin(_),g*Math.cos(_)],b=i*.05*(1-p),x=[t+h*b,n-.04,r+g*b];$(e,o,.85+a()*.25+p*.1),X(e,x,y,Q(y,m).slice(),{len:v,wid:v*(s?.16:.27),droop:v*(s?.28:.1)*(1-p),curl:s?-v*.04:0,fold:s?.32:.3,nl:5,nw:3,rect:s?Y.ALOE:Y.AGAVE,widthFn:s?d:u,baseY:n,plantH:i,swayK:0,leafFlex:.015,flutter:0,upBias:.08})}}function Ze(e,t,n,r,i,a,o,s){let c=14+Math.floor(a()*9),l=.06+.1*a();e.flip=1;let u=e=>e<.78?1:1-(e-.78)/.22*.92;for(let s=0;s<c;s++){let s=a()*q,c=l*Math.sqrt(a()),d=t+Math.cos(s)*c,f=r+Math.sin(s)*c,p=(2+a()*20)*J,m=s+(a()-.5)*1.2,h=[Math.cos(m)*Math.sin(p),Math.cos(p),Math.sin(m)*Math.sin(p)],g=i*(.55+a()*.5),_=a()<.1?3:a()<.55?0:Math.floor(1+a()*2);$(e,o,.8+a()*.3);let v=a()<.12;X(e,[d,n-.05,f],h,Q(h,m+Math.PI*.5+(a()-.5)).slice(),{len:g,wid:.024+a()*.022,droop:g*(v?.7+a()*.3:.08+a()*.36),curl:0,fold:0,twist:(a()-.5)*3,nl:5,nw:2,rect:Y.REED[_],widthFn:u,baseY:n,plantH:i,swayK:.5,leafFlex:.28,flutter:.35,upBias:.3})}let d=s?Math.floor(a()*4):0;for(let s=0;s<d;s++){let s=a()*q,c=l*.6*Math.sqrt(a()),u=t+Math.cos(s)*c,d=r+Math.sin(s)*c,f=i*(.9+a()*.3),p=Math.cos(s)*f*.05*a(),m=Math.sin(s)*f*.05*a(),h=e=>[u+p*e*e,n-.05+f*e,d+m*e*e],g={baseY:n,plantH:i,swayK:.42};$(e,o,.95),Z(e,[h(0),h(.5),h(.74)],[.007,.006,.0055],3,Y.CSTEM,g),Z(e,[h(.74),h(.76),h(.84),h(.86)],[.012,.024,.024,.012],6,Y.HEAD,g),Z(e,[h(.86),h(1)],[.004,.0015],3,Y.CSTEM,g)}}function Qe(e,t,n,r,i,a,o){let s=5+Math.floor(a()*5);for(let c=0;c<s;c++){let s=a()*q,c=.22*Math.sqrt(a()),l=t+Math.cos(s)*c,u=r+Math.sin(s)*c,d=(3+a()*13)*J,f=i*(.75+a()*.3),p=Math.cos(s)*Math.sin(d),m=Math.sin(s)*Math.sin(d),h=e=>[l+p*f*e*(.6+.4*e),n-.05+f*e*Math.cos(d),u+m*f*e*(.6+.4*e)],g={baseY:n,plantH:i,swayK:.36};e.flip=1,$(e,o,.92+a()*.16);let _=h(1);Z(e,[h(0),h(.5),_],[.016,.012,.008],3,Y.STEM,g),e.flip=0;let v=(.26+a()*.14)*Math.min(1.2,Math.max(.8,i/2)),y=a()*q,b=[_[0],_[1]+v*.25,_[2],1/v,1/v,1/v,.5];for(let t=0;t<12;t++){let r=y+t*2.39996+(a()-.5)*.3,s=(72-t/11*80+(a()-.5)*14)*J,c=[Math.cos(r)*Math.cos(s)+p*.6,Math.sin(s),Math.sin(r)*Math.cos(s)+m*.6],l=Math.hypot(c[0],c[1],c[2]);c[0]/=l,c[1]/=l,c[2]/=l;let u=v*(.85+a()*.3);$(e,o,(.85+a()*.2)*(.8+.2*Math.max(0,c[1]))),X(e,_,c,Q(c,r+Math.PI*.5).slice(),{len:u,wid:u*.95,droop:u*(.18+.2*(1-Math.max(0,c[1]))),curl:0,fold:.18,nl:3,nw:2,rect:Y.PAPYRUS,baseY:n,plantH:i,swayK:.36,leafFlex:.08,flutter:.5,sph:b})}}e.flip=1}function $e(e,t,n,r,i,a,o,s){let c=10+Math.floor(a()*8),l=a()*q;e.flip=1;for(let u=0;u<c;u++){let d=l+u/c*q+(a()-.5)*.8,f=Math.cos(d),p=Math.sin(d),m=(s?34+a()*30:46+a()*34)*J,h=i*(.7+a()*.45),g=[f*Math.cos(m),Math.sin(m),p*Math.cos(m)],_=[t+f*.02,n-.02,r+p*.02],v=h*Math.sin(m);$(e,o,.85+a()*.3),X(e,_,g,Q(g,d+(a()-.5)*.6).slice(),{len:h,wid:h*.62,droop:Math.min(v*.8,h*((s?.5:.36)+a()*.2)),curl:0,fold:.05,cup:.1,twist:(a()-.5)*.7,nl:4,nw:3,rect:Y.MAIDENHAIR,baseY:n,plantH:i,swayK:.1,leafFlex:.2,flutter:1,upBias:.22})}}function et(e,t,n,r,i,a,o,s,c=1){let l={baseY:n,plantH:a,swayK:.1},u=5+Math.floor(o()*5),d=.02+.014*i,f=[];e.flip=1;let p=[s[0]*.9,s[1]*.66,s[2]*.58];for(let s=0;s<u;s++){let c=s/u*q+(o()-.5)*.9,m=Math.cos(c),h=Math.sin(c),g=(14+o()*30)*J,_=a*(.62+o()*.3),v=[t+m*.04*i,n-.06,r+h*.04*i],y=m*Math.sin(g),b=Math.cos(g),x=h*Math.sin(g),S=e=>[v[0]+(y*e+m*.22*e*e)*_,v[1]+b*_*e*(1-.1*e),v[2]+(x*e+h*.22*e*e)*_];$(e,p,.8+o()*.25),Z(e,[S(0),S(.35),S(.7),S(1)],[d,d*.75,d*.5,d*.25],4,Y.BARK,l),f.push([S(.18),S(1)]);let C=1+Math.floor(o()*3);for(let t=0;t<C;t++){let t=S(.35+.5*o()),n=c+(o()-.5)*1.6,r=(20+o()*45)*J,a=i*(.35+o()*.35),s=[t[0]+Math.cos(n)*Math.cos(r)*a,t[1]+Math.sin(r)*a,t[2]+Math.sin(n)*Math.cos(r)*a];Z(e,[t,s],[d*.4,d*.15],3,Y.BARK,l),f.push([t,s])}}e.flip=0;let m=Math.sqrt(Math.min(1.6,Math.max(.3,c))),h=Math.max(24,Math.round((60+90*i*i)*m)),g=Math.min(1.3,Math.max(.9,1/m)),_=[t,n+a*.55,r,1/Math.max(i,.3),1/Math.max(a*.5,.3),1/Math.max(i,.3),.55];for(let c=0;c<h;c++){let c=f[Math.floor(o()*f.length)],u=o()**.4,d=.18*i,p=c[0][0]+(c[1][0]-c[0][0])*u+(o()-.5)*d,m=Math.max(n+.12,c[0][1]+(c[1][1]-c[0][1])*u+(o()-.5)*d),h=c[0][2]+(c[1][2]-c[0][2])*u+(o()-.5)*d,v=p-t,y=h-r,b=Math.hypot(v,y)||1;v/=b,y/=b;let x=Math.min(1,(m-n)/a),S=v*.6+(o()-.5)*.7,C=.3+.5*o(),w=y*.6+(o()-.5)*.7,T=Math.hypot(S,C,w)||1,E=[S/T,C/T,w/T],D=(.34+o()*.3)*Math.min(1.6,Math.max(.6,i))*g,O=(1.3+.35*x)*(.9+o()*.2);e.tint[0]=s[0]*O,e.tint[1]=s[1]*O,e.tint[2]=s[2]*O*1.04,X(e,[p,m,h],E,Q(E,Math.atan2(y,v)+Math.PI*.5+(o()-.5)*1.2).slice(),{len:D,wid:D*.85,droop:D*(.4+.35*o()),curl:0,fold:.14,twist:(o()-.5)*.8,nl:3,nw:3,rect:Y.TAMARISK,baseY:n,plantH:a,swayK:l.swayK,leafFlex:.32,flutter:.45,sph:_})}e.flip=1}function tt(e,t,n){return Math.floor(e/n)+`,`+Math.floor(t/n)}function nt(e,t,n){let r=0,i=t;for(;r<i;){let t=r+i>>1;e[t]>n?r=t+1:i=t}return r}function rt(e,t,n,i,a,o){let{LAYERS:s}=e,c=t.a,l=new Map;for(let e=0;e<t.n;e++){let t=c[e*12],n=c[e*12+2],r=a(t,n)?o.near:o.far,i=r+`:`+tt(t,n,r),s=l.get(i);s||(s=[],l.set(i,s)),s.push(e)}let u=[],d=0,f=n.index.count/3;for(let[e,t]of l){t.sort((e,t)=>c[t*12+11]-c[e*12+11]);let a=t.length,o=new Float32Array(a*4),l=new Float32Array(a*4),h=new Float32Array(a*4),g=new Float32Array(a),v=1e9,b=1e9,x=1e9,S=-1e9,C=-1e9,w=-1e9,T=0;for(let e=0;e<a;e++){let n=t[e]*12;o.set(c.subarray(n,n+4),e*4),l.set(c.subarray(n+4,n+8),e*4),h.set(c.subarray(n+8,n+12),e*4),g[e]=c[n+11];let r=c[n],i=c[n+1],a=c[n+2],s=c[n+4],u=c[n+5];r<v&&(v=r),r>S&&(S=r),a<x&&(x=a),a>w&&(w=a),i<b&&(b=i),i+u>C&&(C=i+u),s>T&&(T=s)}let E=T*.9+.4,O=new p;O.index=n.index;for(let e of[`position`,`normal`,`uv`,`aLean`])O.setAttribute(e,n.getAttribute(e));O.setAttribute(`iPos`,new y(o,4)),O.setAttribute(`iShape`,new y(l,4)),O.setAttribute(`iColor`,new y(h,4)),O.instanceCount=a,O.boundingBox=new r(new D(v-E,b-.2,x-E),new D(S+E,C+.5,w+E)),O.boundingSphere=O.boundingBox.getBoundingSphere(new _);let k=new m(O,i);k.name=`veg-grass-`+e,k.castShadow=!1,k.receiveShadow=!0,k.layers.set(s.NO_REFLECT),k.matrixAutoUpdate=!1,k.updateMatrix(),u.push({mesh:k,geom:O,cuts:g,n:a,maxCut:g[0],minX:v-E,maxX:S+E,minZ:x-E,maxZ:w+E,mode:0}),d+=a*f}return{chunks:u,triangles:d}}var it=2.2,at=1.7,ot={wet:{reflect:!0,shadow:!0},big:{reflect:!1,shadow:!0},small:{reflect:!1,shadow:!1},all:{reflect:!0,shadow:!0}};function st(e){return e.type===`reeds`||e.type===`papyrus`?`wet`:e.type===`fern`||e.type===`maidenhair`||e.type===`agave`||e.type===`shrub`&&e.kind===`scrub`?`small`:`big`}async function ct(e,t,n,r,i,a,o=!0){let s=e.camera,c=1<<e.LAYERS.OPAQUE,l=1<<e.LAYERS.NO_REFLECT,u=new Map;for(let e of t){let t=o?st(e):`all`,n=a[t]??a,r=i(e.x,e.z)?n.near:n.far,s=t+`-`+r+`:`+tt(e.x,e.z,r),c=u.get(s);c||(c=[],u.set(s,c)),c.push(e)}let d=new Be(65536),f=e.quality.foliageDensity??1,p=[],h=0,g=0,v=performance.now();for(let[t,i]of u){i.sort((e,t)=>t.cutoff-e.cutoff),d.reset();let a=new Float32Array(i.length),o=new Uint32Array(i.length);for(let e=0;e<i.length;e++){let t=i[e],n=M(t.seed);switch(d.phase=n(),d.cutoff=t.cutoff,d.tint[0]=t.tint[0],d.tint[1]=t.tint[1],d.tint[2]=t.tint[2],d.flip=1,t.type){case`elephant`:Ke(d,t.x,t.y,t.z,t.s,n,t.tint);break;case`banana`:qe(d,t.x,t.y,t.z,t.s,n,t.tint);break;case`fern`:Je(d,t.x,t.y,t.z,t.s,n,t.tint);break;case`shrub`:Ye(d,t.x,t.y,t.z,t.s,t.s2,n,t.tint,t.kind,f);break;case`agave`:Xe(d,t.x,t.y,t.z,t.s,n,t.tint,t.kind===1);break;case`reeds`:Ze(d,t.x,t.y,t.z,t.s,n,t.tint,t.kind===1);break;case`papyrus`:Qe(d,t.x,t.y,t.z,t.s,n,t.tint);break;case`maidenhair`:$e(d,t.x,t.y,t.z,t.s,n,t.tint,t.kind===1);break;case`tamarisk`:et(d,t.x,t.y,t.z,t.s,t.s2,n,t.tint,f)}a[e]=t.cutoff,o[e]=d.ni}if(d.ni===0)continue;let y=d.toGeometry();y.computeBoundingBox(),y.boundingBox.expandByScalar(.8),y.boundingSphere=y.boundingBox.getBoundingSphere(new _);let b=ot[t.slice(0,t.indexOf(`-`))],x=new m(y,n);x.customDepthMaterial=r,x.name=`veg-plants-`+t,x.castShadow=b.shadow,x.receiveShadow=!0,x.layers.set(b.reflect?e.LAYERS.OPAQUE:e.LAYERS.NO_REFLECT),x.matrixAutoUpdate=!1,x.updateMatrix();let S=y.boundingBox,C={mesh:x,geom:y,cuts:a,idxEnd:o,n:i.length,maxCut:a[0],minX:S.min.x,maxX:S.max.x,minZ:S.min.z,maxZ:S.max.z,mode:1,kMain:i.length,kRefl:b.reflect?i.length:0,kShadow:b.shadow?i.length:0,L_OPAQUE:c,L_NOREF:l,reflect:b.reflect,shadow:b.shadow};x.onBeforeRender=(e,t,n)=>{let r=n===s?C.kMain:C.kRefl;y.drawRange.count=r>0?o[r-1]:0},x.onBeforeShadow=()=>{let e=C.kShadow;y.drawRange.count=e>0?o[e-1]:0},p.push(C),h+=d.ni/3,g+=d.nv,performance.now()-v>16&&(e.progress(.7+.25*p.length/u.size,`Growing plants`),await e.yieldFrame(),v=performance.now())}return{chunks:p,triangles:h,vertices:g}}function lt(e,t,n,r){let i=0;for(let a=0;a<e.length;a++){let o=e[a],s=0;if(!r){let e=Math.max(o.minX-t,0,t-o.maxX),r=Math.max(o.minZ-n,0,n-o.maxZ);s=Math.sqrt(e*e+r*r)}if(s>=o.maxCut){o.mesh.visible=!1;continue}let c=r?o.n:nt(o.cuts,o.n,s);if(c===0){o.mesh.visible=!1;continue}o.mesh.visible=!0,o.mode===0?o.geom.instanceCount=c:(o.kMain=c,o.reflect&&(o.kRefl=r?c:nt(o.cuts,o.n,s*it),o.mesh.layers.mask=o.kRefl>0?o.L_OPAQUE:o.L_NOREF),o.shadow&&(o.kShadow=r?c:nt(o.cuts,o.n,s*at),o.mesh.castShadow=o.kShadow>0),o.geom.drawRange.count=o.idxEnd[c-1]),i++}return i}function ut(t,n,r,i){let a=Math.round(i.maxX-i.minX),o=Math.round(i.maxZ-i.minZ),s=new Float32Array(a*o*3),l=(e,t,n,r,c)=>{let l=Math.max(0,Math.floor(e-i.minX-n)),u=Math.min(a-1,Math.floor(e-i.minX+n)),d=Math.max(0,Math.floor(t-i.minZ-n)),f=Math.min(o-1,Math.floor(t-i.minZ+n));for(let o=d;o<=f;o++)for(let d=l;d<=u;d++){let l=d+.5-(e-i.minX),u=o+.5-(t-i.minZ),f=1-Math.min(1,Math.sqrt(l*l+u*u)/(n+.5));f>0&&(s[(o*a+d)*3+r]+=c*f)}},u=n.a;for(let e=0;e<n.n;e++){let t=e*12,n=u[t+7];if(n===H.SEAGRASS)continue;let r=n===H.DRY_A||n===H.DRY_B||n===H.SEDGE;l(u[t],u[t+2],u[t+4]*.6,+!!r,.5*u[t+4])}for(let e of r){if(e.type===`shrub`&&e.kind===`scrub`){l(e.x,e.z,e.s,1,.4);continue}let t=e.type===`shrub`?e.s:e.type===`agave`?e.s*.7:Math.min(1.2,e.s*.5);l(e.x,e.z,t,e.type===`reeds`||e.type===`papyrus`?0:2,.8)}let f=new Uint8Array(a*o*4);for(let e=0;e<o;e++)for(let n=0;n<a;n++){let r=e*a+n;f[r*4]=Math.min(255,s[r*3]*255),f[r*4+1]=Math.min(255,s[r*3+1]*255),f[r*4+2]=Math.min(255,s[r*3+2]*255),f[r*4+3]=Math.round(t.moistureAt(i.minX+n+.5,i.minZ+e+.5)*255)}let p=new v(f,a,o,e);return p.minFilter=c,p.magFilter=c,p.wrapS=p.wrapT=d,p.needsUpdate=!0,p.name=`vegetationCover`,{texture:p,bounds:[i.minX,i.minZ,a,o]}}var dt={minX:-128,minZ:-96,maxX:128,maxZ:96},ft={minX:-320,minZ:-320,maxX:320,maxZ:320},pt=300;function mt(e,t){if(!e)return[];for(let n of t){let t=e[n];if(Array.isArray(t)&&t.length){let e=[];for(let n of t)Array.isArray(n)&&n.length>=3?e.push({x:n[0],z:n[2],r:n[3]}):n&&typeof n.x==`number`&&typeof n.z==`number`?e.push({x:n.x,z:n.z,r:n.r??n.radius,crown:n.crown??n.frondLength??n.fronds}):n&&n.position&&typeof n.position.x==`number`&&e.push({x:n.position.x,z:n.position.z});if(e.length)return e}}return[]}function ht(e){let{layout:t,registry:n}=e,r=n.get(`trees`)?.trees;if(Array.isArray(r)&&r.length)return r.map(e=>({x:e.x,z:e.z,hero:!!e.hero,crown:e.crownRadius??10,trunk:typeof e.trunkRadiusAt==`function`?e.trunkRadiusAt((e.groundY??0)+.4):1.5}));let i=[];for(let e of t.HERO_TREES)i.push({x:e.x,z:e.z,hero:!0,crown:e.crown,trunk:t.trunkRadiusAt(e,(e.groundY??0)+.4)});for(let e of t.EXTRA_TREES)i.push({x:e.x,z:e.z,hero:!1,crown:e.crown,trunk:e.r0*1.55});return i}function gt(e,t){let{registry:n}=e,r=[];for(let e of t)r.push({x:e.x,z:e.z,r:e.crown,k:e.hero?.92:.85});let i=n.get(`palms`)?.palms;if(Array.isArray(i)&&i.length&&typeof i[0].crownR==`number`)for(let t of i){let n=e.hf.waterSDF(t.x,t.z)>22&&e.hf.cliffMask(t.x,t.z)<.3;r.push({x:t.x,z:t.z,r:n?Math.max(5,t.crownR*1.3):t.crownR,k:n?.46:.22})}else for(let e of mt(n.get(`palms`),[`palms`,`positions`,`trunks`,`instances`,`list`]))r.push({x:e.x,z:e.z,r:typeof e.crown==`number`?e.crown:4.5,k:.22});return r}function _t(e){let{registry:t}=e,n=[];for(let e of[`rocks`,`architecture`]){let r=t.get(e),i=r?.blocked??r?.kit?.blocked;typeof i==`function`&&i.length>=2&&i.length<=3&&n.push((e,t,n)=>{try{return!!i.call(r,e,t,n)}catch{return!1}})}let r=mt(t.get(`palms`),[`palms`,`positions`,`trunks`,`instances`,`list`]);return r.length&&n.push((e,t,n)=>{for(let i=0;i<r.length;i++){let a=r[i],o=e-a.x,s=t-a.z,c=(typeof a.r==`number`&&a.r<2?a.r:.45)+n;if(o*o+s*s<c*c)return!0}return!1}),n}function vt(e){let{layout:t}=e,n=[];for(let e of t.GATHERINGS)n.push({x:e.x,z:e.z,r:3.5,flowers:3});let r=Object.fromEntries(t.BOARDWALKS.map(e=>[e.id,e]));if(r.originWalk){let e=r.originWalk.path[0];n.push({x:e[0],z:e[1],r:1.5,flowers:2})}if(r.drifterPier){let e=r.drifterPier.path.at(-1);n.push({x:e[0],z:e[1],r:1.5,flowers:2})}if(r.canopyWalk){let e=r.canopyWalk.path.at(-1);n.push({x:e[0],z:e[1],r:1.5,flowers:2})}for(let e of t.HERO_TREES)n.push({x:e.x,z:e.z,r:t.trunkRadiusAt(e,(e.groundY??0)+.5)+2.5,flowers:1});return n}async function yt(e){let t=performance.now(),{scene:n,camera:r}=e,i={},a=e=>{i[e]=Math.round(performance.now()-t)},o=e.params.has(`floraseq`),s=ht(e),c=new z(e,dt,ft,{farRadius:pt});c.setCanopies(gt(e,s)),await c.compute(e,0,.3),a(`site`),e.progress(.32,`Finding footholds`),await e.yieldFrame();let l=null,u=null;if(!o)try{u=ue(e),await u.ready}catch(e){console.warn(`[lagoon] vegetation probe prepare:`,e)}try{l=ge(e,c,dt,.25,u)}catch(e){console.warn(`[lagoon] vegetation probe error:`,e)}c.occ=l,a(`probe`),e.progress(.38,`Weaving leaves`),await e.yieldFrame();let d=await je(e),f=Le(e,d.grass),p=Re(e,d.leaf);a(`atlas`),e.progress(.45,`Sowing the oasis`);let{grass:m,plants:h,islandRejects:g}=await Ue(e,c,{near:dt,far:ft,farRadius:pt,anchors:vt(e),extraBlockers:_t(e),trunks:s.map(e=>({x:e.x,z:e.z,r:e.trunk+.15})),vistas:[{x:e.layout.PLAYER.spawn.x,z:e.layout.PLAYER.spawn.z,yawDeg:e.layout.PLAYER.spawn.yawDeg,half:32,dist:22,r0:2.5,maxH:.75}]});a(`scatter`);let _=ut(c,m,h,dt);e.tex.register(`vegetationCover`,_.texture);let v=(e,t)=>c.inNear(e,t),y=rt(e,m,ze(),f,v,{near:32,far:64}),b=+(e.params.get(`vegsmall`)||128),x=+(e.params.get(`vegbig`)||64),S=await ct(e,h,p.mat,p.depth,v,{near:64,far:128,big:{near:x,far:x*2},small:{near:b,far:b*2}},e.params.get(`veggroups`)!==`0`);a(`meshes`);let C=new E;C.name=`vegetation`;for(let e of y.chunks)C.add(e.mesh);for(let e of S.chunks)C.add(e.mesh);n.add(C),l&&e.params.has(`vegocc`)&&C.add(wt(e,l));let w=y.chunks.concat(S.chunks),T=e.params.has(`vegstats`)?Ct(w,r):null,D=0;function O(){T&&D>2&&D%12==0&&T.log(r),T?.reset(),lt(w,r.position.x,r.position.z,D<2),D++}lt(w,0,0,!0);let k={grass:m.n};for(let e of h){let t=e.type===`shrub`?`shrub_`+e.kind:e.type;k[t]=(k[t]||0)+1}let{reedPoints:A,flowerPoints:j}=bt(m,h),M={grassChunks:y.chunks.length,plantChunks:S.chunks.length,plantChunksByGroup:S.chunks.reduce((e,t)=>{let n=t.mesh.name.split(`-`)[2];return e[n]=(e[n]||0)+1,e},{}),reedPoints:A.length,flowerPoints:j.length,grassTriangles:y.triangles,plantTriangles:S.triangles,plantVertices:S.vertices,occupied:l?+l.occupiedFraction.toFixed(4):null,probe:l?.times,ms:Math.round(performance.now()-t),stages:i,bakes:d.times,islandRejects:g};return console.log(`[lagoon] vegetation: `+JSON.stringify({counts:k,stats:M})),e.params.has(`vegsample`)&&xt(e,m,h),window.__lagoon&&(window.__lagoon.vegetation={counts:k,stats:M}),e.progress(1,`Vegetation ready`),{update:O,order:5,root:C,stats:M,counts:{grass:m.n,plants:h.length,byType:k},moistureAt:(e,t)=>c.moistureAt(e,t),occupancy:l,cover:_,reedPoints:A,flowerPoints:j}}function bt(e,t){let n=1.5,r=()=>{let e=new Set,t=[];return{out:t,add(r,i){let a=Math.floor(r/n)*73856093^Math.floor(i/n)*19349663;e.has(a)||(e.add(a),t.push([+r.toFixed(2),+i.toFixed(2)]))}}},i=r(),a=r();for(let e of t)e.type===`reeds`||e.type===`papyrus`?i.add(e.x,e.z):e.type===`shrub`&&(e.kind===`bougain`||e.kind===`oleander`)&&a.add(e.x,e.z);let o=e.a;for(let t=0;t<e.n;t++){let e=o[t*12+7];e===H.CATTAIL||e===H.REED||e===H.RUSH?i.add(o[t*12],o[t*12+2]):(e===H.FLOWER_WARM||e===H.FLOWER_COOL)&&a.add(o[t*12],o[t*12+2])}return{reedPoints:i.out,flowerPoints:a.out}}function xt(e,t,n){let r=String(e.params.get(`vegsample`)||``).split(`;`);for(let i of r)St(e,t,n,i)}function St(e,t,n,r){let i=r.split(`,`).map(parseFloat),a=Number.isFinite(i[0])?i[0]:e.layout.PLAYER.spawn.x,o=Number.isFinite(i[1])?i[1]:e.layout.PLAYER.spawn.z;console.log(`[lagoon] vegsample @`+a+`,`+o);let s={};for(let e of n){let t=e.type===`shrub`?`shrub_`+e.kind:e.type;(s[t]||(s[t]=[])).push([+e.x.toFixed(1),+e.y.toFixed(2),+e.z.toFixed(1),+e.s.toFixed(2),Math.hypot(e.x-a,e.z-o)])}let c=t.a;for(let e=0;e<t.n;e++){let t=`grass`+c[e*12+7];(s[t]||(s[t]=[])).push([+c[e*12].toFixed(1),+c[e*12+1].toFixed(2),+c[e*12+2].toFixed(1),+c[e*12+5].toFixed(2),Math.hypot(c[e*12]-a,c[e*12+2]-o)])}for(let[e,t]of Object.entries(s))console.log(`[lagoon] vegsample `+e+`: `+JSON.stringify(t.sort((e,t)=>e[4]-t[4]).slice(0,4).map(e=>e.slice(0,4))))}function Ct(e,t){let n={main:0,refl:0,shadow:0,tMain:0,tRefl:0,tShadow:0},r={};for(let i of e){let e=i.mode===0?`grass`:i.mesh.name.split(`-`)[2],a=r[e]||(r[e]=[0,0,0]),o=()=>i.mode===0?i.geom.instanceCount*i.geom.index.count/3:i.geom.drawRange.count/3,s=i.mesh.onBeforeRender,c=i.mesh.onBeforeShadow;i.mesh.onBeforeRender=function(e,r,i,c,l,u){s.call(this,e,r,i,c,l,u),i===t?(n.main++,n.tMain+=o(),a[0]++,a[1]+=o()):(n.refl++,n.tRefl+=o())},i.mesh.onBeforeShadow=function(e,t,r,i,s,l,u){c.call(this,e,t,r,i,s,l,u),n.shadow++,n.tShadow+=o(),a[2]++}}let i=e=>(e/1e3).toFixed(0)+`k`;return{reset(){n.main=n.refl=n.shadow=n.tMain=n.tRefl=n.tShadow=0;for(let e of Object.values(r))e[0]=e[1]=e[2]=0},log(e){let t=e.position;console.log(`[lagoon] vegstats @`+[t.x,t.y,t.z].map(e=>e.toFixed(0)).join(`,`)+`: calls main `+n.main+` refl `+n.refl+` shadow `+n.shadow+` | tris main `+i(n.tMain)+` refl `+i(n.tRefl)+` shadow `+i(n.tShadow)+` | main/shadow by group `+Object.entries(r).map(([e,t])=>e+` `+t[0]+`/`+t[2]+` (`+i(t[1])+`)`).join(`, `))}}}function wt(t,n){let{W:r,H:i,dist:a,res:o,minX:s,minZ:c}=n,l=new Uint8Array(r*i*4);for(let e=0;e<r*i;e++){let t=a[e]*o;a[e]===0?(l[e*4]=255,l[e*4+3]=200):t<1&&(l[e*4]=255,l[e*4+1]=220,l[e*4+3]=90)}let u=new v(l,r,i,e);u.needsUpdate=!0;let d=new T({map:u,transparent:!0,depthTest:!1,depthWrite:!1});d.userData.noPatch=!0;let f=new S(r*o,i*o).rotateX(-Math.PI/2),p=f.attributes.uv;for(let e=0;e<p.count;e++)p.setY(e,1-p.getY(e));let h=new m(f,d);return h.position.set(s+r*o/2,2.5,c+i*o/2),h.layers.set(t.LAYERS.FX),h.renderOrder=999,h.frustumCulled=!1,h}export{yt as build};