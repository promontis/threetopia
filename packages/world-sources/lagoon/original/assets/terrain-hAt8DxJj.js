import{$r as e,A as t,Dr as n,Hn as r,Ja as i,Ni as a,Qi as o,Rn as s,Rt as c,V as l,Wi as u,Yt as d,_r as f,ar as p,do as m,dt as h,ea as g,ft as _,io as v,j as y,jr as b,lo as x,mr as S,mt as C,no as w,or as T,qt as E,ta as D,zi as O}from"./three.core-DtjtRha-.js";import{t as k}from"./noise-RmOKhMMB.js";import{a as A,i as j,n as M,o as N,r as P,t as F}from"./farfield-C_pc_rD2.js";import{n as I,s as L}from"./index-BjH0GYGf.js";var R=Math.PI*2;function z(e,t){let n=e.TERRAIN_LOD[t],r=n.step,i=Math.round(n.x0/r)-1,a=Math.round(n.x1/r)+1,o=Math.round(n.z0/r)-1,s=Math.round(n.z1/r)+1,c=[1e9,-1e9,1e9,-1e9];if(t>0){let n=e.TERRAIN_LOD[t-1];c=[Math.round(n.x0/r)+2,Math.round(n.x1/r)-2,Math.round(n.z0/r)+2,Math.round(n.z1/r)-2]}let l=a-i+1,u=s-o+1;return{k:t,step:r,i0:i,j0:o,i1:a,j1:s,nx:l,nz:u,hole:c,hRaw:new Float32Array(l*u),hPos:null,left:0}}function B(e,t){let{s:n,i0:r,nx:i,j0:a,j1:o,hole:s}=t,[c,l,u,d]=s,f=new Float32Array((o-a+1)*i),p=e.heightAt;for(let e=a;e<=o;e++){let t=e>u&&e<d,o=e*n,s=(e-a)*i;for(let e=0;e<i;e++){let i=r+e;f[s+e]=t&&i>c&&i<l?NaN:p(i*n,o)}}return f}var V=class e{static create(t){if(typeof Worker>`u`||t<1)return null;try{return new e(t)}catch(e){return console.warn(`[lagoon] terrain sample workers unavailable:`,e),null}}constructor(e){this.workers=[],this.idle=[],this.queue=[],this.pending=new Map,this.broken=!1,this.nextId=1,this.created=performance.now(),this.firstMessage=0;for(let t=0;t<e;t++){let e=new Worker(new URL(`/assets/sampleWorker-BEkEW8OT.js`,``+import.meta.url),{type:`module`});e.onmessage=t=>{this.firstMessage||=performance.now();let n=this.pending.get(t.data.id);this.pending.delete(t.data.id),this.idle.push(e),n?.resolve(t.data.data),this.pump()};let t=e=>{if(!this.broken){this.broken=!0,console.warn(`[lagoon] terrain sample worker failed, sampling on the main thread:`,e?.message||e);for(let t of this.pending.values())t.reject(e);this.pending.clear();for(let t of this.queue)t.reject(e);this.queue=[]}};e.onerror=e=>{e.preventDefault?.(),t(e)},e.onmessageerror=t,this.workers.push(e),this.idle.push(e)}}run(e){return this.broken?Promise.reject(Error(`pool broken`)):new Promise((t,n)=>{this.queue.push({job:e,resolve:t,reject:n}),this.pump()})}pump(){for(;!this.broken&&this.idle.length&&this.queue.length;){let e=this.idle.pop(),t=this.queue.shift(),n=this.nextId++;this.pending.set(n,t),e.postMessage({id:n,...t.job})}}takeLocal(){return this.broken?null:this.queue.shift()||null}terminate(){for(let e of this.workers)e.terminate();this.workers=[]}};function ee(e,t){let n=e.TERRAIN_LOD,{k:r,step:i,i0:a,j0:o,nx:s,hRaw:c}=t,l=c.slice();if(r<n.length-1){let e=n[r],t=Math.round(e.x0/i),u=Math.round(e.x1/i),d=Math.round(e.z0/i),f=Math.round(e.z1/i),p=(e,t)=>(t-o)*s+(e-a);for(let e=d+1;e<f;e+=2)l[p(t,e)]=.5*(c[p(t,e-1)]+c[p(t,e+1)]),l[p(u,e)]=.5*(c[p(u,e-1)]+c[p(u,e+1)]);for(let e=t+1;e<u;e+=2)l[p(e,d)]=.5*(c[p(e-1,d)]+c[p(e+1,d)]),l[p(e,f)]=.5*(c[p(e-1,f)]+c[p(e+1,f)])}t.hPos=l}function te(e,t,n){let r=e.TERRAIN_LOD.map((t,n)=>z(e,n)),i=[];for(let e of r){let t=Math.max(2,Math.ceil(9e3/e.nx));for(let n=e.j0;n<=e.j1;n+=t)i.push({k:e.k,s:e.step,i0:e.i0,nx:e.nx,j0:n,j1:Math.min(e.j1,n+t-1),hole:e.hole}),e.left++}let a=r.map(e=>new Promise(t=>{e.resolve=t})),o={workers:0,fallbackJobs:0,firstResultMs:0,level0Ms:0,sampleMs:0},s=performance.now(),c=0,l=(t,a)=>{let l=r[t.k];l.hRaw.set(a,(t.j0-l.j0)*l.nx),c++,n?.(c/i.length),--l.left===0&&(ee(e,l),l.k===0&&(o.level0Ms=Math.round(performance.now()-s)),l.resolve(l))},u=typeof navigator<`u`&&navigator.hardwareConcurrency||4,d=Math.min(8,Math.max(2,u-4)),f=V.create(d),p;return f?(o.workers=d,p=Promise.all(i.map(t=>f.run(t).then(e=>l(t,e),()=>{o.fallbackJobs++,l(t,B(e,t))}))).then(()=>{o.firstResultMs=f.firstMessage?Math.round(f.firstMessage-s):-1,f.terminate()}),(async()=>{for(await null,o.mainJobs=0;;){let n=f.queue[0];if(!n||n.job.k!==0)break;let r=f.takeLocal();if(!r)break;r.resolve(B(e,r.job)),o.mainJobs++,await t()}})()):p=(async()=>{let n=performance.now();for(let r of i)o.fallbackJobs++,l(r,B(e,r)),performance.now()-n>24&&(await t(),n=performance.now())})(),p=p.then(()=>{o.sampleMs=Math.round(performance.now()-s)}),{levels:r,ready:a,all:p,stats:o}}var H=class{constructor(e){this.a=new Float32Array(e),this.n=0}push3(e,t,n){if(this.n+3>this.a.length){let e=new Float32Array(this.a.length*2);e.set(this.a),this.a=e}let r=this.a,i=this.n;r[i]=e,r[i+1]=t,r[i+2]=n,this.n=i+3}},ne=class{constructor(e){this.a=new Uint32Array(e),this.n=0}ensure(e){if(this.n+e>this.a.length){let t=new Uint32Array(Math.max(this.a.length*2,this.n+e));t.set(this.a),this.a=t}}},re=class{constructor(){this.byLevel=new Map,this.gen=0}get(e){let t=this.byLevel.get(e.k);if(!t){let n=e.nx*e.nz*2;t={idx:new Int32Array(n),gen:new Int32Array(n)},this.byLevel.set(e.k,t)}return t}},U=class{constructor(e,t=4096){this.maps=e,this.gen=++e.gen,this.pos=new H(t*3),this.nrm=new H(t*3),this.idx=new ne(t*6)}vert(e,t,n,r=0){let i=this.maps.get(e),a=(n-e.j0)*e.nx+(t-e.i0),o=r?a+e.nx*e.nz:a;if(i.gen[o]===this.gen)return i.idx[o];let s=e.step,c=e.nx,l=e.hRaw,u=l[a],d=l[a-1],f=l[a+1],p=l[a-c],m=l[a+c],h=f!==f,g=d!==d,_=m!==m,v=p!==p,y=(h?u:f)-(g?u:d),b=(_?u:m)-(v?u:p),x=h||g?s:2*s,S=_||v?s:2*s,C=-y/x,w=-b/S,T=1/Math.sqrt(C*C+1+w*w),E=this.pos.n/3;return this.pos.push3(t*s,e.hPos[a]-r,n*s),this.nrm.push3(C*T,T,w*T),i.gen[o]=this.gen,i.idx[o]=E,E}cell(e,t,n){let r=this.vert(e,t,n),i=this.vert(e,t+1,n),a=this.vert(e,t,n+1),o=this.vert(e,t+1,n+1),s=this.idx;s.ensure(6);let c=s.a,l=s.n;c[l]=r,c[l+1]=a,c[l+2]=i,c[l+3]=i,c[l+4]=a,c[l+5]=o,s.n=l+6}skirt(e,t,n,r,i,a){let o=this.vert(e,t,n),s=this.vert(e,r,i),c=this.vert(e,t,n,a),l=this.vert(e,r,i,a),u=this.idx;u.ensure(12);let d=u.a,f=u.n;d[f]=o,d[f+1]=c,d[f+2]=s,d[f+3]=s,d[f+4]=c,d[f+5]=l,d[f+6]=o,d[f+7]=s,d[f+8]=c,d[f+9]=s,d[f+10]=l,d[f+11]=c,u.n=f+12}empty(){return this.idx.n===0}build(e){let n=new y,r=this.pos.n/3;n.setAttribute(`position`,new t(this.pos.a.slice(0,this.pos.n),3)),n.setAttribute(`normal`,new t(this.nrm.a.slice(0,this.nrm.n),3));let i=this.idx.a.subarray(0,this.idx.n);return n.setIndex(r>65535?new t(i.slice(),1):new t(Uint16Array.from(i),1)),n.computeBoundingBox(),n.computeBoundingSphere(),n.name=e,this.pos=this.nrm=this.idx=null,n}};function ie(e,t){let n=e[0],r=Math.round(n.x0/n.step),i=Math.round(n.x1/n.step),a=Math.round(n.z0/n.step),o=Math.round(n.z1/n.step),s=i-r+1,c=o-a+1,l=new Float32Array(s*c);for(let e=0;e<c;e++){let n=(e+a-t.j0)*t.nx+(r-t.i0);l.set(t.hPos.subarray(n,n+s),e*s)}return{grid:l,nx:s,nz:c,x0:n.x0,z0:n.z0,step:n.step}}function ae(e,{yieldFrame:t,progress:n,tilesX:r=4,tilesZ:i=4,sectors:a=12}={}){let o=e.TERRAIN_LOD,s=performance.now(),c=te(e,t,e=>n?.(e*.8)),l=c.levels,u=new re,d=0,f=c.ready[0].then(e=>ie(o,e)),p=null,m=()=>p||=(async()=>{let e=await c.ready[0],n=[],a=o[0],s=a.step,l=Math.round(a.x0/s),f=Math.round(a.x1/s),p=Math.round(a.z0/s),m=Math.round(a.z1/s),h=Math.ceil((f-l)/r),g=Math.ceil((m-p)/i),_=.3,v=performance.now();for(let a=0;a<i;a++)for(let i=0;i<r;i++){let r=l+i*h,o=Math.min(f,r+h),s=p+a*g,c=Math.min(m,s+g),y=new U(u,(o-r+2)*(c-s+2)+1024);for(let t=s;t<c;t++)for(let n=r;n<o;n++)y.cell(e,n,t);if(s===p)for(let t=r;t<o;t++)y.skirt(e,t,p,t+1,p,_);if(c===m)for(let t=r;t<o;t++)y.skirt(e,t+1,m,t,m,_);if(r===l)for(let t=s;t<c;t++)y.skirt(e,l,t+1,l,t,_);if(o===f)for(let t=s;t<c;t++)y.skirt(e,f,t,f,t+1,_);n.push({geometry:y.build(`terrain-L0-${i}-${a}`),group:`near`,level:0});let b=performance.now();b-v>24&&(d+=b-v,await t(),v=performance.now())}return d+=performance.now()-v,n})();return{level0:f,nearChunks:m,finish:async()=>{let e=await m();await c.all;let r=performance.now(),i=e.slice(),p=[{name:`mid`,levels:[1,2,3],sectors:a},{name:`far`,levels:[4,5],sectors:a},{name:`horizon`,levels:o.map((e,t)=>t).filter(e=>e>=6),sectors:a}];for(let e of p){let n=e.levels.map(t=>{let n=o[t],r=o[t-1],i=n.step,a=Math.round(n.x0/i),s=Math.round(n.x1/i),c=Math.round(n.z0/i),l=Math.round(n.z1/i),u=Math.round(r.x0/i),d=Math.round(r.x1/i),f=Math.round(r.z0/i),p=Math.round(r.z1/i),m=s-a,h=new Uint8Array(m*(l-c)).fill(255),g=new Int32Array(e.sectors);for(let t=c;t<l;t++){let n=t>=f&&t<p,r=(t+.5)*i;for(let o=a;o<s;o++){if(n&&o>=u&&o<d)continue;let s=Math.atan2(r,(o+.5)*i)+Math.PI,l=Math.min(e.sectors-1,Math.floor(s/R*e.sectors));h[(t-c)*m+(o-a)]=l,g[l]++}}return{k:t,ci0:a,ci1:s,cj0:c,cj1:l,W:m,sec:h,counts:g,depth:t===o.length-1?40:.25+.1*i}});for(let t=0;t<e.sectors;t++){let r=0;for(let e of n)r+=e.counts[t]*1.2;if(r===0)continue;let a=new U(u,Math.ceil(r)+1024);for(let e of n){if(!e.counts[t])continue;let n=l[e.k],{ci0:r,ci1:i,cj0:o,cj1:s,W:c,sec:u,depth:d}=e;for(let e=o;e<s;e++){let l=(e-o)*c;for(let c=r;c<i;c++)u[l+c-r]===t&&(a.cell(n,c,e),e===o&&a.skirt(n,c,o,c+1,o,d),e===s-1&&a.skirt(n,c+1,s,c,s,d),c===r&&a.skirt(n,r,e+1,r,e,d),c===i-1&&a.skirt(n,i,e,i,e+1,d))}}a.empty()||i.push({geometry:a.build(`terrain-${e.name}-${t}`),group:e.name,level:e.levels[0]})}d+=performance.now()-r,await t(),r=performance.now()}n?.(1);let h={...c.stats,assembleMs:Math.round(d),totalMs:Math.round(performance.now()-s)};return{chunks:i,level0:await f,samples:l,stats:h}},samples:l}}function W(e,t,n,r){let i=e[t],a=n-i.i0,o=r-i.j0;return a<0||o<0||a>=i.nx||o>=i.nz?NaN:i.hRaw[o*i.nx+a]}var G=e=>{let t=Number(e).toPrecision(9);return t.includes(`.`)||t.includes(`e`)?t:t+`.0`},oe=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[1,0],[-1,0],[0,1],[0,-1],[0,1],[0,-1]];function se(){let e=[L.N,L.N2,A,N],t=new Float32Array(66049*e.length*2);e.forEach((e,n)=>{for(let r=0;r<257;r++){let i=e.perm[r],a=(n*257+r)*257*2;for(let n=0;n<257;n++,a+=2){let r=oe[e.permMod12[n+i]];t[a]=r[0],t[a+1]=r[1]}}});let n=new _(t,257,257*e.length,a,c);return n.minFilter=n.magFilter=f,n.generateMipmaps=!1,n.needsUpdate=!0,n.name=`terrain.twinGrad`,n}function K(e,t){return e.TRAILS.filter(e=>e.path.some(([n,r])=>n-e.width*2-1<t.x0||n+e.width*2+1>t.x1||r-e.width*2-1<t.z0||r+e.width*2+1>t.z1))}function ce(e,t,n){let r=K(t,n),i=[],a=[];for(let e of r){a.push(new v(i.length,e.path.length-1,e.width*.5,e.width*2));for(let t=0;t<e.path.length-1;t++)i.push(new v(e.path[t][0],e.path[t][1],e.path[t+1][0],e.path[t+1][1]))}return i.length||(i.push(new v),a.push(new v(0,0,1,1))),{tPerm:{value:e},uTwZero:{value:0},uButteA:{value:F.map(e=>new v(e.x,e.z,e.r,e.h))},uButteB:{value:F.map((e,t)=>new v(e.e,Math.cos(e.rot),Math.sin(e.rot),t))},uButteN:{value:F.length},uTrSeg:{value:i},uTrInfo:{value:a},uTrN:{value:r.length}}}function le(e,t){let{LAGOON_LOBES:n,CLIFF:r,WATER_Y:i}=e,a=Math.max(1,K(e,t).reduce((e,t)=>e+t.path.length-1,0)),o=Math.max(1,K(e,t).length),s=n.map(e=>`  { vec2 q = (p - vec2(${G(e.x)}, ${G(e.z)})) / vec2(${G(e.rx)}, ${G(e.rz)}); float ql = length(q);
    d = tw_smin(d, (ql - 1.0) * ${G(Math.min(e.rx,e.rz))} * (0.75 + 0.25 * min(1.0, ql)), 9.0); }`).join(`
`),c=r.bulges.map(e=>`  { float u = (x - ${G(e.x)}) / ${G(e.width)}; z += ${G(e.amount)} * exp(-u * u); }`).join(`
`);return`
uniform highp sampler2D tPerm;   // gradient table (see makePermTexture)
uniform int uTwZero;             // 0: keeps loop trip counts opaque to the compiler
vec2 tw_g(ivec2 c, int row) { return texelFetch(tPerm, ivec2(c.x, row * 257 + c.y), 0).rg; }
float tw_noise(vec2 v, int row) {
  const float F2 = 0.3660254037844386;
  const float G2 = 0.21132486540518713;
  float s = (v.x + v.y) * F2;
  vec2 fij = floor(v + s);
  float t = (fij.x + fij.y) * G2;
  vec2 x0 = v - (fij - t);
  ivec2 o1 = x0.x > x0.y ? ivec2(1, 0) : ivec2(0, 1);
  vec2 x1 = x0 - vec2(o1) + G2;
  vec2 x2 = x0 - 1.0 + 2.0 * G2;
  ivec2 ij = ivec2(fij) & 255;
  vec3 w = max(0.5 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
  w *= w; w *= w;
  vec3 gd = vec3(dot(tw_g(ij, row), x0), dot(tw_g(ij + o1, row), x1), dot(tw_g(ij + 1, row), x2));
  return 70.0 * dot(w, gd);
}
float tw_fbm(vec2 v, int oct, int row) {
  float sum = 0.0, amp = 1.0, fr = 1.0, norm = 0.0;
  for (int o = uTwZero; o < oct; o++) { sum += amp * tw_noise(v * fr, row); norm += amp; amp *= 0.5; fr *= 2.0; }
  return sum / norm;
}
float tw_ridged(vec2 v, int oct, int row) {
  float sum = 0.0, amp = 0.5, fr = 1.0, prev = 1.0;
  for (int o = uTwZero; o < oct; o++) { float n = 1.0 - abs(tw_noise(v * fr, row)); n *= n; sum += n * amp * prev; prev = n; amp *= 0.5; fr *= 2.0; }
  return sum;
}
float tw_smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float tw_seg(vec2 p, vec2 a, vec2 b) {
  vec2 v = b - a; float l2 = dot(v, v);
  float t = l2 > 0.0 ? clamp(dot(p - a, v) / l2, 0.0, 1.0) : 0.0;
  return length(a + v * t - p);
}
// ---- batched noise: every noise term that depends only on p is evaluated in
// ONE loop (one compiled copy of the noise code instead of sixteen)
const int TW_NA = 16;
vec2 twIn[TW_NA];
int twRow[TW_NA];
float twN[TW_NA];
void tw_batch(vec2 p) {
  float s2 = p.x * ${G(j[0])} + p.y * ${G(j[1])}, c2 = -p.x * ${G(j[1])} + p.y * ${G(j[0])};
  float s1 = p.x * ${G(P[0])} + p.y * ${G(P[1])}, c1 = -p.x * ${G(P[1])} + p.y * ${G(P[0])};
  float r = max(length(p), 1e-3);
  float ca = p.x / r, sa = p.y / r;
  twIn[0] = p * 0.03;                                      twRow[0] = 0;  // lagoon wiggle
  twIn[1] = p * 0.09 + vec2(17.0, 0.0);                    twRow[1] = 0;
  twIn[2] = p * 0.055;                                     twRow[2] = 0;  // beach undulation
  twIn[3] = vec2(c2 * 0.0011 + 11.3, s2 * 0.0007);         twRow[3] = 2;  // megadune phase
  twIn[4] = vec2(c2 * 0.0043 - 3.1, s2 * 0.002 + 5.5);     twRow[4] = 2;
  twIn[5] = vec2(c1 * 0.0062, s1 * 0.0031);                twRow[5] = 2;  // dune phase
  twIn[6] = vec2(c1 * 0.021 + 5.3, s1 * 0.011 + 1.7);      twRow[6] = 2;
  twIn[7] = p * 0.0023 + vec2(40.0, 0.0);                  twRow[7] = 2;  // swell
  twIn[8] = vec2(p.x * 0.05, 3.3);                         twRow[8] = 0;  // cliff face line
  twIn[9] = vec2(p.y * 0.011, 4.1);                        twRow[9] = 0;  // escarpment flanks
  twIn[10] = vec2(p.y * 0.011, 8.7);                       twRow[10] = 0;
  twIn[11] = vec2(p.x * 0.006, 2.2);                       twRow[11] = 0; // plateau north edge
  twIn[12] = vec2(ca * 1.1 + 3.1, sa * 1.1);               twRow[12] = 3; // mountain edge
  twIn[13] = vec2(ca * 3.3, sa * 3.3 + 7.0);               twRow[13] = 3;
  twIn[14] = vec2(p.x * 0.0003 + 1.7, p.y * 0.0003 - 4.2); twRow[14] = 3; // mountain warp
  twIn[15] = vec2(p.x * 0.0003 - 6.1, p.y * 0.0003 + 2.9); twRow[15] = 3;
  for (int i = uTwZero; i < TW_NA; i++) twN[i] = tw_noise(twIn[i], twRow[i]);
}
float tw_lagoonSDF(vec2 p) {
  float d = 1e9;
${s}
  d += twN[0] * 2.6 + twN[1] * 0.9;
  return d;
}
float tw_cliffFaceZ(float x) {
  float z = ${G(r.baseZ)};
${c}
  return z + twN[8] * 2.2;
}
float tw_cliffMask(vec2 p, float fz) {
  float x = p.x, zz = p.y;
  float across = 1.0 - smoothstep(fz - ${G(r.faceWidth)}, fz, zz);
  if (across <= 0.0) return 0.0;
  float nz = max(0.0, -zz - 60.0);
  float wx = ${G(r.westFadeX-26)} + 10.0 * twN[9] - 0.45 * nz;
  float ex = ${G(r.eastFadeX+22)} + 8.0 * twN[10] + 0.35 * nz;
  float along = smoothstep(wx - 40.0, wx + 10.0, x) * (1.0 - smoothstep(ex - 10.0, ex + 40.0, x));
  float north = 1.0 - smoothstep(260.0, 380.0, -zz + 50.0 * twN[11]);
  return across * along * north;
}
float tw_duneProfile(float fr, float a) {
  if (fr < a) { float t = fr / a; return t * t * (3.0 - 2.0 * t); }
  float t = (fr - a) / (1.0 - a);
  return (1.0 - t) * (1.0 - 0.15 * t);
}
float tw_duneBrink(float H, float lambda) { return 1.0 - min(0.45, max(0.03, H / (0.6 * lambda))); }
// the noise-driven part of duneRelief() (independent of the shore distance)
struct TwDune { float f2; float amp2; float f1; float amp1; float swell; };
TwDune tw_duneNoise(vec2 p) {
  TwDune D;
  float s2 = p.x * ${G(j[0])} + p.y * ${G(j[1])}, c2 = -p.x * ${G(j[1])} + p.y * ${G(j[0])};
  float s1 = p.x * ${G(P[0])} + p.y * ${G(P[1])}, c1 = -p.x * ${G(P[1])} + p.y * ${G(P[0])};
  float ph2 = s2 / ${G(M.lambda2)} + twN[3] * 0.55 + twN[4] * 0.12;
  float ph1 = s1 / ${G(M.lambda1)} + twN[5] * 0.6 + twN[6] * 0.15;
  float k2 = floor(ph2), k1 = floor(ph1);
  D.f2 = ph2 - k2;
  D.f1 = ph1 - k1;
  // the two amplitude terms depend on the dune index: a second, 2-term batch
  vec2 inB[2];
  inB[0] = vec2(c2 * 0.0019 + k2 * 2.37, k2 * 0.61 + 3.3);
  inB[1] = vec2(c1 * 0.008 + k1 * 3.17, k1 * 0.71 + 0.4);
  float nB[2];
  for (int i = uTwZero; i < 2; i++) nB[i] = tw_noise(inB[i], 2);
  D.amp2 = clamp(0.62 + 0.55 * nB[0], 0.08, 1.0);
  D.amp1 = clamp(0.5 + 0.7 * nB[1], 0.12, 1.0);
  D.swell = twN[7] * 0.5 + 0.5;
  return D;
}
float tw_dunes(TwDune D, float d) {
  float a1 = smoothstep(55.0, 300.0, d) * 5.2 + smoothstep(300.0, 900.0, d) * 3.0;
  float a2 = smoothstep(140.0, 760.0, d) * 27.0;
  if (a1 + a2 < 0.005) return 0.0;
  float b2 = tw_duneBrink(a2 * D.amp2, ${G(M.lambda2)});
  float H2 = D.amp2 * tw_duneProfile(D.f2, b2);
  float g2 = D.f2 < b2 ? 1.0 - smoothstep(b2 - 0.1, b2, D.f2) : smoothstep(0.96, 1.0, D.f2);
  float H1 = D.amp1 * tw_duneProfile(D.f1, tw_duneBrink(a1 * D.amp1, ${G(M.lambda1)}));
  return a1 * H1 * (0.35 + 0.65 * g2) + a2 * H2 + (a1 + a2 * 0.3) * 0.35 * D.swell;
}
uniform vec4 uButteA[${F.length}]; // x, z, r, h
uniform vec4 uButteB[${F.length}]; // e, cos(rot), sin(rot), index
uniform int uButteN;
float tw_buttes(vec2 p) {
  float h = 0.0;
  for (int i = uTwZero; i < uButteN; i++) {
    vec4 A = uButteA[i], B = uButteB[i];
    float R = A.z, H = A.w, E = B.x, fi = B.w;
    vec2 dd = p - A.xy;
    float reach = R * E * 1.25 + 0.56 * H;
    if (dot(dd, dd) > reach * reach) continue;
    float u = (dd.x * B.y + dd.y * B.z) / E, v = -dd.x * B.z + dd.y * B.y;
    float q = sqrt(u * u + v * v) + 1e-6;
    float rr = R * (1.0 + 0.16 * tw_noise(vec2(u / q * 1.6 + fi * 5.1, v / q * 1.6), 3) + 0.07 * tw_noise(vec2(p.x * 0.02, p.y * 0.02 + fi), 3));
    float e = q - rr;
    float tw = 0.56 * H, cw = 0.14 * H;
    float hb;
    if (e >= tw) hb = 0.0;
    else if (e >= 0.0) { float uu = 1.0 - e / tw; hb = 0.35 * H * uu * sqrt(uu); }
    else if (e > -cw) {
      float vv = -e / cw;
      float st = vv * 5.0, sfi = floor(st), sfr = st - sfi;
      float stepped = (sfi + smoothstep(0.55, 1.0, sfr)) / 5.0;
      hb = H * (0.35 + 0.65 * sqrt(0.5 * vv + 0.5 * stepped));
    } else {
      float cc = clamp(q / rr, 0.0, 1.0);
      hb = H * (0.94 + 0.06 * sqrt(1.0 - cc * cc) + 0.035 * tw_noise(vec2(p.x * 0.012 + fi, p.y * 0.012), 3));
    }
    h = max(h, hb);
  }
  return h;
}
float tw_mountains(vec2 p, float r) {
  float edge = 1650.0 + 480.0 * twN[12] + 180.0 * twN[13];
  float m = smoothstep(edge - 500.0, edge + 1100.0, r);
  if (m <= 0.0) return 0.0;
  float wx = p.x + 480.0 * twN[14];
  float wz = p.y + 480.0 * twN[15];
  float B = max(0.0, tw_fbm(vec2(wx, wz) * 0.00035, 3, 3) * 1.5 + 0.25);
  float R = tw_ridged(vec2(wx * 0.0007 + 3.3, wz * 0.0007), 5, 3);
  float D = tw_fbm(vec2(wx * 0.003 + 7.7, wz * 0.003), 4, 3);
  return m * (B * 200.0 + B * B * 110.0 * (0.4 + R) + B * D * 30.0 + 25.0);
}
uniform vec4 uTrSeg[${a}];  // trail segments a.xy, b.xy
uniform vec4 uTrInfo[${o}];  // first segment, segment count, width/2, width*2
uniform int uTrN;
float tw_trails(vec2 p) {
  float dh = 0.0;
  for (int t = uTwZero; t < uTrN; t++) {
    vec4 I = uTrInfo[t];
    int s0 = int(I.x + 0.5), s1 = s0 + int(I.y + 0.5);
    float dt = 1e9;
    for (int s = s0; s < s1; s++) dt = min(dt, tw_seg(p, uTrSeg[s].xy, uTrSeg[s].zw));
    if (dt < I.w) dh += (1.0 - smoothstep(I.z, I.w, dt)) * 0.06;
  }
  return dh;
}
// heightAt() outside the level-0 rectangle
float twinHeight(vec2 p) {
  tw_batch(p);
  float d = tw_lagoonSDF(p);
  float base = ${G(i)} + 2.1 * (1.0 - exp(-d / 13.0)) + max(0.0, d - 22.0) * 0.028;
  float h = base;
  h += twN[2] * 0.14 * smoothstep(2.0, 20.0, d);
  TwDune D = tw_duneNoise(p);
  h += tw_dunes(D, d);
  if (d > 250.0) h = max(h, base + tw_buttes(p));
  float fz = tw_cliffFaceZ(p.x);
  float cm = tw_cliffMask(p, fz);
  if (cm > 0.0) {
    float top = ${G(r.height)} + tw_fbm(p * 0.03, 3, 0) * 2.2;
    float rimDist = fz - p.y;
    float sand = smoothstep(35.0, 140.0, rimDist);
    float dunesP = sand > 0.0 ? tw_dunes(D, max(d, 60.0 + rimDist * 1.6)) : 0.0;
    h = mix(h, max(h, ${G(i)} + top + dunesP * sand), cm);
    h += cm * tw_ridged(p * 0.05, 3, 1) * 1.6 * (1.0 - 0.8 * sand);
  }
  float r = length(p);
  if (r > 900.0) h += tw_mountains(p, r);
  if (d > 0.5 && r < 260.0) h -= tw_trails(p);
  return h;
}
`}var q=new k(3119),J=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,Y=class{constructor(e){this.r=e,this.cam=new n(-1,1,1,-1,0,1),this.mesh=new p(new b(2,2)),this.mesh.frustumCulled=!1}draw(e,t,n=0,r=1){let i=this.r,a=i.getRenderTarget(),o=i.autoClear;i.autoClear=!1,this.mesh.material=e;let s=t.height;for(let e=0;e<r;e++){let a=Math.floor(e*s/r),o=Math.floor((e+1)*s/r);t.scissor.set(0,a,t.width,o-a),t.scissorTest=r>1,i.setRenderTarget(t,n),i.render(this.mesh,this.cam)}t.scissorTest=!1,t.scissor.set(0,0,t.width,t.height),i.setRenderTarget(a),i.autoClear=o}dispose(){this.mesh.geometry.dispose()}},ue={x0:-128,z0:-104,x1:200,z1:160,step:.5};function X(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}async function de(t,n){let{hf:a,layout:o,yieldFrame:c}=t,u=ue,d=Math.round((u.x1-u.x0)/u.step),f=Math.round((u.z1-u.z0)/u.step),p=new Float32Array(d*f*4),m=new Float32Array(d*f*4),g=e=>u.x0+(e+.5)*u.step,_=e=>u.z0+(e+.5)*u.step,y=e=>Math.floor((e-u.x0)/u.step-.5),b=e=>Math.floor((e-u.z0)/u.step-.5),x=(e,t,n,r,i)=>{let a=Math.max(0,y(e)),o=Math.min(d-1,y(n)+1),s=Math.max(0,b(t)),c=Math.min(f-1,b(r)+1);for(let e=s;e<=c;e++)for(let t=a;t<=o;t++)i(t,e,g(t),_(e),e*d+t)},S=(e,t,n,r,i,a)=>{let o=i-n,s=a-r,c=o*o+s*s,l=c>0?((e-n)*o+(t-r)*s)/c:0;l=Math.min(1,Math.max(0,l));let u=n+o*l-e,d=r+s*l-t;return Math.sqrt(u*u+d*d)};for(let e of o.TRAILS){let t=e.width;for(let n=0;n<e.path.length-1;n++){let[r,i]=e.path[n],[a,o]=e.path[n+1],s=t*1.4+1;x(Math.min(r,a)-s,Math.min(i,o)-s,Math.max(r,a)+s,Math.max(i,o)+s,(e,n,s,c,l)=>{let u=S(s,c,r,i,a,o),d=1-X(t*.36,t*.66,u);d>p[l*4]&&(p[l*4]=d)})}}await c();let C=[...o.HERO_TREES,...o.EXTRA_TREES];for(let e of C){let t=e.crown*.8,n=t*1.3;x(e.x-n,e.z-n,e.x+n,e.z+n,(n,r,i,a,o)=>{let s=i-e.x,c=a-e.z,l=Math.hypot(s,c)+1e-6,u=t*(1+.22*q.noise2(s/l*1.7+e.seed,c/l*1.7)+.08*q.noise2(i*.15,a*.15)),d=1-X(u*.25,u,l);d>p[o*4+1]&&(p[o*4+1]=d)})}let w=n,T=(e,t)=>{let n=(e-w.x0)/w.step,r=(t-w.z0)/w.step,i=Math.min(w.nx-2,Math.max(0,Math.floor(n))),a=Math.min(w.nz-2,Math.max(0,Math.floor(r))),o=Math.min(1,Math.max(0,n-i)),s=Math.min(1,Math.max(0,r-a)),c=w.grid[a*w.nx+i],l=w.grid[a*w.nx+i+1],u=w.grid[(a+1)*w.nx+i],d=w.grid[(a+1)*w.nx+i+1];return(c*(1-o)+l*o)*(1-s)+(u*(1-o)+d*o)*s},E=(e,t)=>e>w.x0+.5&&e<w.x0+(w.nx-1)*w.step-.5&&t>w.z0+.5&&t<w.z0+(w.nz-1)*w.step-.5,D=null,O=0,k=0,A=0;{let e=(u.x0+.5*u.step-w.x0)/w.step,t=(u.z0+.5*u.step-w.z0)/w.step;if(u.step===w.step&&w.step===.5&&e-Math.floor(e)===.5&&t-Math.floor(t)===.5){O=w.nx-1,D=new Float32Array(O*(w.nz-1));for(let e=0;e<w.nz-1;e++){let t=e*w.nx,n=t+w.nx,r=e*O;for(let e=0;e<O;e++)D[r+e]=.25*(w.grid[t+e]+w.grid[t+e+1]+w.grid[n+e]+w.grid[n+e+1])}k=Math.floor(e),A=Math.floor(t)}}let j=new Float64Array(d);for(let e=0;e<d;e++)j[e]=g(e);let M=0;for(;M<f&&_(M)<-18;)M++;let N=new Float64Array(M);for(let e=0;e<M;e++)N[e]=_(e);let P=a.cliffMaskGrid(j,N),F=a.cliffMaskGrid(j,N.map(e=>e-7)),I=a.cliffMaskGrid(j,N.map(e=>e+38)),L=performance.now();for(let e=0;e<f;e++){let t=_(e);for(let n=0;n<d;n++){let r=g(n);if(!E(r,t))continue;let i=e*d+n,a,o,s;if(D){let t=(e+A)*O+(n+k);s=D[t],a=D[t+1]-D[t-1],o=D[t+O]-D[t-O]}else{let e=.5;a=(T(r+e,t)-T(r-e,t))/(2*e),o=(T(r,t+e)-T(r,t-e))/(2*e),s=T(r,t)}let c=Math.sqrt(a*a+o*o),l=X(.62,.95,c)*(s>-.4?1:.45);if(p[i*4+2]=l,e<M){let a=e*d+n,o=P[a],l=F[a];p[i*4+3]=Math.max(+(o>.02),X(.2,.7,l));let u=X(.15,.8,l)*(1-X(.1,.5,o))*(s>-.2?1:.6),f=1-X(.3,.9,I[a]),h=X(.6,.95,o)*f*(.45+.25*q.noise2(r*.05,t*.05));m[i*4+1]=Math.max(0,h),m[i*4+2]=u,m[i*4+3]=X(.02,.12,o)*(1-X(.9,.99,o))*X(.25,.55,c)}}performance.now()-L>24&&(await c(),L=performance.now())}for(let e of o.ISLANDS){let t=e.r*1.35;x(e.x-t,e.z-t,e.x+t,e.z+t,(t,n,r,i,o)=>{let s=a.islandSDF(r,i);if(s>3||s<-e.r)return;let c=-s,l=Math.exp(-(((c-.08*e.r)/(.16*e.r))**2))*e.rocky*(.75+.35*q.noise2(r*.3,i*.3)),u=(1-X(.3,2.2,s))*X(-.5,.2,s),d=Math.max(l,u*.6*e.rocky);d>p[o*4+2]&&(p[o*4+2]=Math.max(p[o*4+2],d))})}await c();for(let e of o.WATERFALLS){for(let t=0;t<e.stream.length-1;t++){let[n,r]=e.stream[t],[i,a]=e.stream[t+1];x(Math.min(n,i)-4,Math.min(r,a)-4,Math.max(n,i)+4,Math.max(r,a)+4,(e,t,o,s,c)=>{let l=1-X(1.2,3.4,S(o,s,n,r,i,a));l>m[c*4]&&(m[c*4]=l),l>.3&&(p[c*4+3]=1)})}let t=(e.plungeR||4)*2.2;x(e.pool[0]-t,e.pool[2]-t-6,e.pool[0]+t,e.pool[2]+t,(n,r,i,a,o)=>{let s=Math.hypot(i-e.pool[0],(a-e.pool[2])*.8),c=(1-X(t*.35,t,s))*.9;c>m[o*4]&&(m[o*4]=c)})}let R=new Uint8ClampedArray(d*f*8),z=d*f*4;for(let e=0;e<z;e++)R[e]=p[e]*255,R[z+e]=m[e]*255;let B=new Uint8Array(R.buffer),V=new h(B,d,f,2);return V.format=e,V.type=i,V.minFilter=r,V.magFilter=s,V.generateMipmaps=!0,V.wrapS=V.wrapT=l,V.needsUpdate=!0,V.name=`terrain.ctrl`,{texture:V,bounds:new v(u.x0,u.z0,u.x1-u.x0,u.z1-u.z0)}}function fe(e){let t=e.step;return new v(e.x0-t/2,e.z0-t/2,e.nx*t,e.nz*t)}function pe(e){let t=e.nx*e.nz,n=new Uint16Array(t);for(let r=0;r<t;r++)n[r]=C.toHalfFloat(e.grid[r]);let r=new _(n,e.nx,e.nz,O,d);r.minFilter=r.magFilter=s,r.wrapS=r.wrapT=l,r.generateMipmaps=!1,r.needsUpdate=!0,r.name=`terrain.height`;let i=fe(e);return{texture:r,bounds:[i.x,i.y,i.z,i.w]}}var Z=[{half:512,size:2048},{half:1536,size:2048},{half:8192,size:2048}],me=e=>e&&e.textureSize<1024?1024:2048,he=[.8,3,16],ge=`
uniform sampler2D tNear;
uniform vec4 uNearB;
uniform vec4 uOutB;
uniform vec4 uL0;
float heightAny(vec2 p) {
  float h;
  if (p.x >= uL0.x && p.x <= uL0.z && p.y >= uL0.y && p.y <= uL0.w) h = textureLod(tNear, (p - uNearB.xy) / uNearB.zw, 0.0).r;
  else h = twinHeight(p);
  return h;
}
void main() {
  vec2 p = uOutB.xy + vUv * uOutB.zw;
  gl_FragColor = vec4(heightAny(p), 0.0, 0.0, 1.0);
}`,_e=`
precision highp float;
precision highp int;
varying vec2 vUv;
uniform highp sampler2DArray tH;   // height pyramid: layer 0 near, 1 mid, 2 far
uniform vec4 uHB[3];               // bounds (minX, minZ, sizeX, sizeZ) per layer
uniform vec4 uOutB;
uniform float uTexel;
uniform vec2 uSunXZ;
uniform float uSunTan;
uniform float uSunTanW;  // refracted (underwater) sun slope
uniform float uWaterY;
uniform float uAOScale;
uniform float uMaxH;  // highest terrain in the world: rays above it are unoccluded
uniform int uMarch;   // loop bounds are uniforms so the D3D compiler never unrolls them
uniform int uAODirs;
uniform int uAOSteps;
// finest layer containing p: one branch-free fetch (keeps the D3D compile fast)
float Hs(vec2 p) {
  float m = max(abs(p.x), abs(p.y));
  int l = m < uHB[0].z * 0.5 - 2.0 ? 0 : (m < uHB[1].z * 0.5 - 6.0 ? 1 : 2);
  vec4 b = uHB[l];
  return textureLod(tH, vec3((p - b.xy) / b.zw, float(l)), 0.0).r;
}
void main() {
  vec2 p = uOutB.xy + vUv * uOutB.zw;
  float e = uTexel;
  float h0 = Hs(p);
  float hx = Hs(p + vec2(e, 0.0)) - Hs(p - vec2(e, 0.0));
  float hz = Hs(p + vec2(0.0, e)) - Hs(p - vec2(0.0, e));
  vec3 n = normalize(vec3(-hx / (2.0 * e), 1.0, -hz / (2.0 * e)));
  // soft sun visibility: march toward the sun over the height pyramid
  float vis = 1.0;
  float hr = h0 + 0.04 + e * 0.35;
  // below the water the ray climbs along the refracted direction until it exits
  float tExit = hr < uWaterY ? (uWaterY - hr) / uSunTanW : 0.0;
  float t = e * 1.2;
  for (int i = 0; i < uMarch; i++) {
    vec2 q = p + uSunXZ * t;
    float rayH = t < tExit ? hr + t * uSunTanW : max(hr, uWaterY) + (t - tExit) * uSunTan;
    float dh = rayH - Hs(q);
    vis = min(vis, 60.0 * dh / t);   // ~1 deg penumbra: sun disk + a little haze
    if (vis <= 0.0 || t > 6000.0 || rayH > uMaxH) break;
    t += max(e * 0.8, t * 0.05);
  }
  vis = clamp(vis, 0.0, 1.0);
  vis = vis * vis * (3.0 - 2.0 * vis);
  // horizon-based ambient occlusion
  float occ = 0.0;
  for (int d = 0; d < uAODirs; d++) {
    float a = float(d) * 6.2831853 / float(uAODirs) + 0.39;
    vec2 dir = vec2(cos(a), sin(a));
    float hmax = 0.0;
    float r = uAOScale;
    for (int s = 0; s < uAOSteps; s++) {
      float dh = Hs(p + dir * r) - h0;
      hmax = max(hmax, dh / r);
      r *= 3.0;
    }
    occ += hmax / sqrt(1.0 + hmax * hmax); // sin of horizon elevation
  }
  float ao = clamp(1.0 - occ / float(uAODirs) * 1.1, 0.0, 1.0);
  gl_FragColor = vec4(n.x * 0.5 + 0.5, n.z * 0.5 + 0.5, vis, ao);
}`;function ve(e,t){let n=t/Math.hypot(t,e.y),r=Math.min(.999,n/1.333);return Math.sqrt(1-r*r)/r}var ye=class{constructor(e){this.ctx=e;let{renderer:t,layout:n,hf:r,G:i}=e;this.renderer=t,this.floatLinear=t.extensions.has(`OES_texture_float_linear`),this.hType=this.floatLinear?c:d,this.quad=new Y(t),this.perm=se();let a=r.TERRAIN_LOD[0];this.twin=le(n,a),this.twinU=ce(this.perm,n,a),this.hMat=new D({uniforms:{...this.twinU,tNear:{value:null},uNearB:{value:new v},uL0:{value:new v(a.x0,a.z0,a.x1,a.z1)},uOutB:{value:new v}},vertexShader:J,fragmentShader:`precision highp float;\nprecision highp int;\nvarying vec2 vUv;\n${this.twin}\n${ge}`,depthTest:!1,depthWrite:!1});let o=i.uSunDir.value,s=Math.max(1e-4,Math.hypot(o.x,o.z));this.dMat=new D({uniforms:{tH:{value:null},uHB:{value:Z.map(e=>new v(-e.half,-e.half,2*e.half,2*e.half))},uOutB:{value:new v},uTexel:{value:1},uSunXZ:{value:new w(o.x/s,o.z/s)},uSunTan:{value:o.y/s},uSunTanW:{value:ve(o,s)},uWaterY:{value:e.layout.WATER_Y},uAOScale:{value:1},uMaxH:{value:1e3},uMarch:{value:170},uAODirs:{value:6},uAOSteps:{value:4}},vertexShader:J,fragmentShader:_e,depthTest:!1,depthWrite:!1}),this.copyMat=Se(),this.macroMat=Te()}copySurfaceArrays(e){return Ce(this.ctx,e,this.copyMat)}bakeMacro(){return Ee(this.renderer,this.macroMat)}compile(){let e=this.renderer;this.parallel=!!e.extensions.get(`KHR_parallel_shader_compile`);let t=new g;for(let e of[this.hMat,this.dMat,this.copyMat,this.macroMat]){let n=new p(this.quad.mesh.geometry,e);n.frustumCulled=!1,t.add(n)}let n=new m(1,1,{depthBuffer:!1}),r=e.getRenderTarget();e.setRenderTarget(n);let i;try{i=e.compileAsync?e.compileAsync(t,this.quad.cam):(e.compile(t,this.quad.cam),Promise.resolve())}finally{e.setRenderTarget(r)}return i.then(()=>n.dispose(),e=>{throw n.dispose(),e})}run(t,{debug:n=!1}={}){let{renderer:a,quad:o,hMat:u,dMat:d,hType:p,floatLinear:m}=this,h={},g=performance.now(),y=a.getContext(),b=e=>{n&&y.finish();let t=performance.now();h[e]=Math.round(t-g),g=t},S=new _(t.grid,t.nx,t.nz,O,c);S.minFilter=S.magFilter=m?s:f,S.wrapS=S.wrapT=l,S.generateMipmaps=!1,S.needsUpdate=!0,u.uniforms.tNear.value=S,u.uniforms.uNearB.value.copy(fe(t));let C=m?s:f,w=me(this.ctx.quality),T=new x(w,w,Z.length,{type:p,format:O,depthBuffer:!1,stencilBuffer:!1,minFilter:C,magFilter:C,generateMipmaps:!1,wrapS:l,wrapT:l});Z.forEach((e,t)=>{u.uniforms.uOutB.value.set(-e.half,-e.half,2*e.half,2*e.half),o.draw(u,T,t,2)}),b(`heights`);let E=null;n&&(E=be(a,o,this.twinU,this.twin,this.ctx.hf));let D=d.uniforms;D.tH.value=T.texture;let k=new x(w,w,Z.length,{type:i,format:e,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!0,minFilter:r,magFilter:s,wrapS:l,wrapT:l,anisotropy:Math.min(8,a.capabilities.getMaxAnisotropy())});Z.forEach((e,t)=>{D.uOutB.value.set(-e.half,-e.half,2*e.half,2*e.half),D.uTexel.value=2*e.half/w,D.uAOScale.value=he[t],o.draw(d,k,t,8)}),k.texture.name=`terrain.far`,b(`data`),T.dispose(),u.dispose(),d.dispose(),S.dispose(),this.perm.dispose(),o.dispose();let A=Z.map(e=>new v(-e.half,-e.half,2*e.half,2*e.half));return{target:k,texture:k.texture,bounds:A,twinErr:E,times:h}}};function be(t,n,r,i,a){let o=[];for(let e=0;e<32;e++)for(let t=0;t<32;t++){let n=(t*.6180339+e*.37)*Math.PI*2,r=130+(t*32+e)*97.13%5200;o.push([Math.cos(n)*r,Math.sin(n)*r])}let s=new Float32Array(4096);o.forEach(([e,t],n)=>{s[n*4]=e,s[n*4+1]=t});let l=new _(s,32,32,e,c);l.minFilter=l.magFilter=f,l.needsUpdate=!0;let u=new D({uniforms:{...r,tPts:{value:l}},vertexShader:J,fragmentShader:`precision highp float; precision highp int; varying vec2 vUv; uniform sampler2D tPts;\n${i}\nvoid main(){ vec2 p = textureLod(tPts, vUv, 0.0).xy; gl_FragColor = vec4(twinHeight(p), 0.0, 0.0, 1.0); }`,depthTest:!1,depthWrite:!1}),d=new m(32,32,{type:c,format:e,depthBuffer:!1});n.draw(u,d);let p=new Float32Array(4096);t.readRenderTargetPixels(d,0,0,32,32,p);let h=0,g=null,v=0;return o.forEach(([e,t],n)=>{let r=Math.abs(p[n*4]-a.heightAt(e,t));v+=r,r>h&&(h=r,g=[e.toFixed(1),t.toFixed(1),p[n*4].toFixed(3),a.heightAt(e,t).toFixed(3)])}),d.dispose(),u.dispose(),l.dispose(),{maxErr:h,meanErr:v/o.length,worst:g}}var xe=`
      precision highp float; varying vec2 vUv;
      uniform sampler2D tA; uniform sampler2D tB; uniform float uHasH; uniform float uMode;
      void main() {
        if (uMode < 0.5) {
          vec3 c = textureLod(tA, vUv, 0.0).rgb;
          float h = uHasH > 0.5 ? textureLod(tB, vUv, 0.0).r : clamp(dot(c, vec3(0.3, 0.59, 0.11)) * 1.8, 0.0, 1.0);
          gl_FragColor = vec4(c, h);
        } else {
          vec2 n = textureLod(tA, vUv, 0.0).rg;
          vec4 orm = textureLod(tB, vUv, 0.0);
          gl_FragColor = vec4(n, orm.g, orm.r);
        }
      }`;function Se(){return new D({uniforms:{tA:{value:null},tB:{value:null},uHasH:{value:0},uMode:{value:0}},vertexShader:J,fragmentShader:xe,depthTest:!1,depthWrite:!1})}function Ce(t,n,a=null){let{renderer:c,tex:l,quality:d}=t,f=Math.min(1024,d.textureSize),p=new Y(c),m=Math.min(d.anisotropy,c.capabilities.getMaxAnisotropy()),h=t=>new x(f,f,n.length,{type:i,format:e,depthBuffer:!1,stencilBuffer:!1,colorSpace:t?o:``,generateMipmaps:!0,minFilter:r,magFilter:s,wrapS:u,wrapT:u,anisotropy:m}),g=h(!0),_=h(!1),v=a||Se();return n.forEach((e,t)=>{let n=l.get(e);v.uniforms.uMode.value=0,v.uniforms.tA.value=n.map,v.uniforms.tB.value=n.heightMap||n.map,v.uniforms.uHasH.value=+!!n.heightMap,p.draw(v,g,t),v.uniforms.uMode.value=1,v.uniforms.tA.value=n.normalMap,v.uniforms.tB.value=n.ormMap,p.draw(v,_,t)}),v.dispose(),p.dispose(),g.texture.name=`terrain.albedoArray`,_.texture.name=`terrain.normalArray`,{albedo:g.texture,normal:_.texture,sizes:n.map(e=>l.get(e).worldSize),targets:[g,_]}}var we=`
    vec4 bake(vec2 uv) {
      float a = bk_fbm(uv, vec2(3.0), 6) * 0.5 + 0.5;
      float b = bk_fbm(uv + 0.37, vec2(7.0), 5) * 0.5 + 0.5;
      vec3 w = bk_worley(uv, vec2(11.0));
      float c = smoothstep(0.0, 0.9, w.x);
      float d = bk_fbm(uv + 0.71, vec2(19.0), 4) * 0.5 + 0.5;
      return vec4(a, b, c, d);
    }`;function Te(){return new D({vertexShader:J,fragmentShader:`precision highp float;
varying vec2 vUv;
${I}
${we}
void main(){ gl_FragColor = bake(vUv); }`,depthTest:!1,depthWrite:!1})}function Ee(t,n){let a=new m(512,512,{type:i,format:e,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!0,minFilter:r,magFilter:s,wrapS:u,wrapT:u,anisotropy:Math.min(4,t.capabilities.getMaxAnisotropy())}),o=new Y(t);return o.draw(n,a),o.dispose(),n.dispose(),a.texture.name=`terrain.macro`,a.texture}var De=[`sand`,`sandWet`,`rock`,`cliff`,`soil`,`leafLitter`],Oe=`
varying vec3 vTW;
varying vec3 vTN;
`,ke=`
vTW = (modelMatrix * vec4(transformed, 1.0)).xyz;
vTN = normalize(mat3(modelMatrix) * objectNormal);
`,Ae=`
varying vec3 vTW;
varying vec3 vTN;
uniform highp sampler2DArray tTerrAlb;
uniform highp sampler2DArray tTerrNrm;
uniform highp sampler2DArray tTerrFar;
uniform highp sampler2DArray tTerrCtrl;
uniform sampler2D tTerrMacro;
uniform vec4 uCtrlB;
uniform vec4 uFarB0;
uniform vec4 uFarB1;
uniform vec4 uFarB2;
uniform vec4 uL0Rect;
uniform float uLayerSize[6];
uniform vec2 uDuneWind;
uniform float uTerrDebug;
uniform float uFarReady;   // 0 until the GPU bake has run: neutral normals / light
uniform sampler2D tVegCover; // vegetation cover: R green, G dry grass, B understory, A moisture
uniform vec4 uVegB;          // its bounds (minX, minZ, sizeX, sizeZ)
uniform float uVegReady;     // 0 until the vegetation module has built
uniform float uGrassFar;     // grass-card draw distance (quality): cover tints the ground beyond it
uniform float uFaceDress;    // 1: dress the escarpment face like the rock slabs (?terrainface=0 for A/B)
uniform float uGlint;        // quartz glint strength (0 disables; ?terrglint=0 for A/B)

// world-space gradients for explicit-LOD sampling inside branches
vec3 gTdPx; vec3 gTdPy;

vec4 tSampA(float layer, vec2 uv, vec2 gx, vec2 gy) { return textureGrad(tTerrAlb, vec3(uv, layer), gx, gy); }
vec4 tSampN(float layer, vec2 uv, vec2 gx, vec2 gy) { return textureGrad(tTerrNrm, vec3(uv, layer), gx, gy); }
vec3 tUnpackN(vec4 t) { vec2 xy = t.rg * 2.0 - 1.0; return vec3(xy, sqrt(max(1.0 - dot(xy, xy), 0.0))); }

// top-projected (uv = world xz) sample of layer L at world size S, rotated by r
struct TSurf { vec3 alb; float h; vec3 tn; float rough; float ao; };
TSurf tTop(float L, vec2 p, float S, mat2 r, vec2 off) {
  vec2 uv = r * p / S + off;
  vec2 gx = r * gTdPx.xz / S, gy = r * gTdPy.xz / S;
  vec4 a = tSampA(L, uv, gx, gy);
  vec4 n = tSampN(L, uv, gx, gy);
  TSurf s;
  s.alb = a.rgb; s.h = a.a;
  vec3 tn = tUnpackN(n);
  // rotate the tangent-space xy back into world orientation
  tn.xy = tn.xy * r;
  s.tn = tn; s.rough = n.b; s.ao = n.a;
  return s;
}
// whiteout-blend a top-projected tangent normal onto world normal N
vec3 tApplyTop(vec3 N, vec3 tn, float k) {
  return normalize(vec3(tn.x * k + N.x, abs(tn.z) * N.y, tn.y * k + N.z));
}
// triplanar sample (albedo+height, world normal perturbation, rough, ao)
TSurf tTri(float L, vec3 p, vec3 N, float S, float nk) {
  vec3 w = abs(N); w = w * w; w = w * w; w /= (w.x + w.y + w.z);
  vec3 sg = sign(N + 1e-5);
  TSurf s; s.alb = vec3(0.0); s.h = 0.0; s.rough = 0.0; s.ao = 0.0;
  vec3 nsum = vec3(0.0);
  if (w.x > 0.02) {
    vec2 uv = vec2(p.z * sg.x, p.y) / S; vec2 gx = vec2(gTdPx.z * sg.x, gTdPx.y) / S, gy = vec2(gTdPy.z * sg.x, gTdPy.y) / S;
    vec4 a = tSampA(L, uv, gx, gy); vec4 n = tSampN(L, uv, gx, gy);
    vec3 tn = tUnpackN(n); tn.xy *= nk;
    vec3 wn = vec3(abs(tn.z) * N.x, tn.y + N.y, tn.x * sg.x + N.z);
    s.alb += a.rgb * w.x; s.h += a.a * w.x; s.rough += n.b * w.x; s.ao += n.a * w.x; nsum += wn * w.x;
  }
  if (w.y > 0.02) {
    vec2 uv = vec2(p.x, p.z * sg.y) / S; vec2 gx = vec2(gTdPx.x, gTdPx.z * sg.y) / S, gy = vec2(gTdPy.x, gTdPy.z * sg.y) / S;
    vec4 a = tSampA(L, uv, gx, gy); vec4 n = tSampN(L, uv, gx, gy);
    vec3 tn = tUnpackN(n); tn.xy *= nk;
    vec3 wn = vec3(tn.x + N.x, abs(tn.z) * N.y, tn.y * sg.y + N.z);
    s.alb += a.rgb * w.y; s.h += a.a * w.y; s.rough += n.b * w.y; s.ao += n.a * w.y; nsum += wn * w.y;
  }
  if (w.z > 0.02) {
    vec2 uv = vec2(-p.x * sg.z, p.y) / S; vec2 gx = vec2(-gTdPx.x * sg.z, gTdPx.y) / S, gy = vec2(-gTdPy.x * sg.z, gTdPy.y) / S;
    vec4 a = tSampA(L, uv, gx, gy); vec4 n = tSampN(L, uv, gx, gy);
    vec3 tn = tUnpackN(n); tn.xy *= nk;
    vec3 wn = vec3(-tn.x * sg.z + N.x, tn.y + N.y, abs(tn.z) * N.z);
    s.alb += a.rgb * w.z; s.h += a.a * w.z; s.rough += n.b * w.z; s.ao += n.a * w.z; nsum += wn * w.z;
  }
  float ws = (w.x > 0.02 ? w.x : 0.0) + (w.y > 0.02 ? w.y : 0.0) + (w.z > 0.02 ? w.z : 0.0);
  float iw = 1.0 / max(ws, 1e-4);
  s.alb *= iw; s.h *= iw; s.rough *= iw; s.ao *= iw;
  s.tn = normalize(nsum); // world-space normal
  return s;
}

vec4 tFarSample(vec2 p) {
  vec2 a = abs(p);
  float m = max(a.x, a.y);
  vec4 s0 = texture(tTerrFar, vec3((p - uFarB0.xy) / uFarB0.zw, 0.0));
  vec4 s1 = texture(tTerrFar, vec3((p - uFarB1.xy) / uFarB1.zw, 1.0));
  vec4 s2 = texture(tTerrFar, vec3((p - uFarB2.xy) / uFarB2.zw, 2.0));
  vec4 r = mix(s0, s1, smoothstep(uFarB0.z * 0.5 - 70.0, uFarB0.z * 0.5 - 8.0, m));
  return mix(r, s2, smoothstep(uFarB1.z * 0.5 - 160.0, uFarB1.z * 0.5 - 16.0, m));
}

// ---- procedural desert pavement: Voronoi pebbles (integer hash, no sin)
vec3 tHash32(vec2 p) {
  uvec3 v = uvec3(uint(int(p.x) + 32768), uint(int(p.y) + 32768), uint(int(p.x) * 7 + int(p.y) * 13 + 99));
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return vec3(v) * (1.0 / 4294967295.0);
}
// p in cell units; cover = fraction of cells holding a pebble.
// returns vec4(dome 0..1, pebble id hash, d(dome)/dp.x, d(dome)/dp.y)
vec4 tPebble(vec2 p, float cover) {
  vec2 i = floor(p), f = fract(p);
  float best = 8.0; vec2 bestR = vec2(0.0); vec3 bestH = vec3(0.0);
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec3 h = tHash32(i + g);
    vec2 r = g + 0.2 + 0.6 * h.xy - f;
    float d = dot(r, r);
    if (d < best) { best = d; bestR = r; bestH = h; }
  }
  // flattened, elongated stones: per-stone rotation, aspect and a lumpy outline
  // (round discs of one size read as polka dots)
  float ang = bestH.x * 6.2831853;
  vec2 cs = vec2(cos(ang), sin(ang));
  float asp = 0.55 + 0.45 * fract(bestH.y * 5.3);
  vec2 e = vec2(dot(bestR, cs), dot(bestR, vec2(-cs.y, cs.x)) / asp);
  float th = atan(e.y, e.x + 1e-6);
  float rad = (0.2 + 0.25 * bestH.z) * (1.0 + 0.13 * sin(3.0 * th + bestH.y * 17.0) + 0.06 * sin(5.0 * th + bestH.x * 11.0));
  float q2 = dot(e, e) / (rad * rad);
  float on = step(fract(bestH.z * 7.31), cover);
  float dome = on * sqrt(max(1.0 - q2, 0.0));
  vec2 ge = vec2(e.x, e.y / asp) / (rad * rad * max(dome, 0.08));
  vec2 grad = dome > 0.08 ? on * (cs * ge.x + vec2(-cs.y, cs.x) * ge.y) : vec2(0.0);
  return vec4(dome, bestH.z, grad);
}
vec3 tPebbleColor(float id) {
  // mostly dark desert-varnished stones, some rust sandstone, few pale ones
  vec3 c = id < 0.45 ? vec3(0.2, 0.14, 0.09)
         : id < 0.72 ? vec3(0.42, 0.25, 0.14)
         : id < 0.92 ? vec3(0.36, 0.33, 0.3)
         : vec3(0.58, 0.5, 0.4);
  return c * (0.85 + 0.3 * fract(id * 13.7));
}

// Small flat fragments (coarse grains, shell grit, reed / twig bits) around a
// Voronoi feature point. p in cell units; cover = fraction of occupied cells;
// radius r0..r1 (cell units); elong = most elongated aspect (1 = round).
// returns vec4(coverage 0..1 with a soft rim, id hash, dome 0..1, aspect)
vec4 tChip(vec2 p, float cover, float r0, float r1, float elong) {
  vec2 i = floor(p), f = fract(p);
  float best = 8.0; vec2 bestR = vec2(0.0); vec3 bestH = vec3(0.0);
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec3 h = tHash32(i + g + 71.0);
    vec2 r = g + 0.25 + 0.5 * h.xy - f;
    float d = dot(r, r);
    if (d < best) { best = d; bestR = r; bestH = h; }
  }
  float ang = bestH.x * 6.2831853 + bestH.z * 3.1;
  vec2 cs = vec2(cos(ang), sin(ang));
  float asp = mix(elong, 1.0, fract(bestH.y * 5.3 + bestH.z * 1.7));
  vec2 e = vec2(dot(bestR, cs), dot(bestR, vec2(-cs.y, cs.x)) / asp);
  float th = atan(e.y, e.x + 1e-6);
  float rad = mix(r0, r1, fract(bestH.z * 3.7)) * (1.0 + 0.16 * sin(3.0 * th + bestH.y * 23.0) + 0.08 * sin(5.0 * th + bestH.x * 13.0));
  float q = length(e) / max(rad, 1e-3);
  float on = step(fract(bestH.z * 7.31 + bestH.x * 0.37), cover);
  return vec4(on * (1.0 - smoothstep(0.7, 1.0, q)), fract(bestH.y * 13.1 + bestH.x * 3.3), on * sqrt(max(1.0 - q * q, 0.0)), asp);
}

// 2D value noise with analytic gradient: vec3(value 0..1, d/dx, d/dy) (p in cells)
vec3 tNoiseD2(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f), du = 6.0 * f * (1.0 - f);
  float a = tHash32(i).x, b = tHash32(i + vec2(1.0, 0.0)).x;
  float c = tHash32(i + vec2(0.0, 1.0)).x, d = tHash32(i + vec2(1.0, 1.0)).x;
  float k = a - b - c + d;
  return vec3(a + (b - a) * u.x + (c - a) * u.y + k * u.x * u.y,
              du * vec2((b - a) + k * u.y, (c - a) + k * u.x));
}

// Quartz glints. Loose sand grains carry tiny mirror-like facets; one flashes
// when its facet bisects the sun and the eye. A facet is far smaller than a pixel
// but reflects the sun's disk, so a glint saturates its pixel whatever the
// distance: what changes with distance is how many grains share a pixel. Each
// grain cell (size doubling with the pixel footprint, two levels blended) holds a
// hidden threshold; the chance per cell grows mildly with the grains it holds and
// with the facet distribution toward the half vector. The distribution of loose
// grains is broad, so glints crowd looking toward the sun (forward scatter) and
// are rare with the sun behind the viewer. Returns the glint weight (0..~1.7).
float tGlint(vec2 p, vec3 N, vec3 V, vec3 L, float pix, float dens) {
  vec3 H = normalize(L + V);
  float c = clamp(dot(N, H), 1e-3, 1.0);
  float t2 = (1.0 - c * c) / (c * c);
  float D = exp(-t2 / 0.42);
  float lev = max(log2(max(pix, 1e-5) / 0.0022), 0.0);
  float l0 = floor(lev), lf = lev - l0;
  float g = 0.0;
  for (int k = 0; k < 2; k++) {
    float lv = l0 + float(k);
    float cs = 0.0022 * exp2(lv);
    vec3 h = tHash32(floor(p / cs) + vec2(lv * 157.0 + 11.0, lv * 311.0 + 5.0));
    float prob = dens * D * (1.0 + 0.35 * min(lv, 3.0));
    float on = step(h.x, prob);
    g += on * (0.35 + 1.3 * h.y * h.y) * (k == 0 ? 1.0 - lf : lf);
  }
  return g;
}

// Sand ripple helper: returns the world-xz gradient of a UNIT-height ripple
// (multiply by the ripple height in metres) and a footprint fade (0 when the
// ripple would alias). Call in uniform control flow (uses derivatives).
// Dry-sand wind ripples come from the sand texture itself.
// Wave (oscillation) ripples under water: symmetric sine.
// .xy = gradient of the unit-height ripple, .z = ripple height (-1..1)
vec3 tRippleWave(vec2 p, vec2 dir, float lambda, float warp, out float fade) {
  float ph = dot(p, dir) / lambda + warp;
  float fw = length(vec2(dFdx(ph), dFdy(ph)));
  fade = 1.0 - smoothstep(0.16, 0.42, fw);
  float a = 6.2831853 * ph;
  return vec3(dir * cos(a) * 6.2831853 / lambda, sin(a));
}
`,je=`
vec3 tP = vTW;
gTdPx = dFdx(tP); gTdPy = dFdy(tP);
vec3 tNg = normalize(vTN);
float tDist = length(tP - cameraPosition);
float tR = length(tP.xz);
float tHW = tP.y - uWaterLevel;
// metres per pixel on the ground
float tPix = max(length(gTdPx.xz), length(gTdPy.xz));

// ---- baked far data: normal (outside level 0), sun visibility, AO
vec4 tFD = mix(vec4(0.5, 0.5, 1.0, 1.0), tFarSample(tP.xz), uFarReady);
vec3 tNf = vec3(tFD.r * 2.0 - 1.0, 0.0, tFD.g * 2.0 - 1.0);
tNf.y = sqrt(max(1.0 - tNf.x * tNf.x - tNf.z * tNf.z, 0.02));
float tEdge = min(min(tP.x - uL0Rect.x, uL0Rect.z - tP.x), min(tP.z - uL0Rect.y, uL0Rect.w - tP.z));
float tFarW = (1.0 - smoothstep(-1.0, 3.0, tEdge)) * uFarReady;
vec3 tN0 = normalize(mix(tNg, tNf, tFarW));
float tSunVis = tFD.b;
float tBakedAO = tFD.a;
float tSteep = 1.0 - tN0.y;

// ---- controls
vec2 tCuv = (tP.xz - uCtrlB.xy) / uCtrlB.zw;
float tInC = step(0.0, tCuv.x) * step(tCuv.x, 1.0) * step(0.0, tCuv.y) * step(tCuv.y, 1.0);
vec4 tC0 = texture(tTerrCtrl, vec3(tCuv, 0.0)) * tInC;
vec4 tC1 = texture(tTerrCtrl, vec3(tCuv, 1.0)) * tInC;

// ---- macro variation (tileable noise at three world scales)
vec4 tM1 = texture(tTerrMacro, tP.xz * (1.0 / 397.0));
vec4 tM2 = texture(tTerrMacro, tP.xz * (1.0 / 71.0) + vec2(0.37, 0.11));
vec4 tM3 = texture(tTerrMacro, tP.xz * (1.0 / 13.3) + vec2(0.61, 0.73));

float tNearK = 1.0 - smoothstep(30.0, 90.0, tDist);   // fine detail scale
float tMidK = 1.0 - smoothstep(180.0, 520.0, tDist);  // large-scale tone
const mat2 tRot1 = mat2(0.8, -0.6, 0.6, 0.8);         // texture u along the dune wind
const mat2 tRot2 = mat2(-0.28, 0.96, -0.96, -0.28);

// ---- oasis ground cover (vegetation module's cover map, 1 m/texel)
// R green grass / reeds, G dry grass, B understory, A habitat moisture
vec2 tVuv = (tP.xz - uVegB.xy) / uVegB.zw;
float tInV = uVegReady * step(0.0, tVuv.x) * step(tVuv.x, 1.0) * step(0.0, tVuv.y) * step(tVuv.y, 1.0);
vec4 tVeg = texture(tVegCover, tVuv) * tInV;

// dune slip faces (facing downwind): looser, smoother sand
vec2 tDownhill = tN0.xz;
float tLee = smoothstep(0.08, 0.3, dot(tDownhill, uDuneWind)) * smoothstep(0.1, 0.3, length(tDownhill));

// wind shelter: under tree crowns and in dense cover the wind cannot build
// ripples; the sand there is softly lumpy (settled, bioturbated) instead
float tShelter = 0.0;
// beside the trails: ripples broken up in patches, sand scuffed and kicked
float tDisturb = 0.0;
#if TERR_Q >= 1
tShelter = clamp(max(tC0.g * 1.35 - 0.12, (tVeg.r * 1.1 + tVeg.b * 0.9 + tVeg.g * 0.35) * 1.3 - 0.18), 0.0, 1.0);
tDisturb = smoothstep(0.02, 0.22, tC0.r) * (1.0 - smoothstep(0.45, 0.75, tC0.r))
         * smoothstep(0.38, 0.62, tM3.b * 0.55 + tM2.a * 0.3 + tM3.r * 0.25);
#endif

// ---- SAND. Macro tone first (shared by dry, wet and submerged sand)
vec4 tSandAvg = textureLod(tTerrAlb, vec3(0.5, 0.5, 0.0), 14.0);
vec3 tMacro = vec3(1.0);
if (tMidK > 0.0) {
  // heavily filtered large-scale sample: tone only, its ripples are averaged away
  float SB = uLayerSize[0] * 5.3;
  vec2 uvB = tRot2 * tP.xz / SB + vec2(0.21, 0.63);
  vec4 bA = textureGrad(tTerrAlb, vec3(uvB, 0.0), tRot2 * gTdPx.xz / SB * 14.0, tRot2 * gTdPy.xz / SB * 14.0);
  tMacro *= mix(vec3(1.0), bA.rgb / max(tSandAvg.rgb, vec3(0.02)), tMidK * 0.9);
}
float tVar = (tM1.r - 0.5) * 0.9 + (tM2.g - 0.5) * 0.55 + (tM3.a - 0.5) * 0.3;
tMacro *= 1.0 + 0.16 * tVar;
// wind streaks: noise stretched along the dune-forming wind
vec2 tWindUv = vec2(dot(tP.xz, uDuneWind) / 460.0, dot(tP.xz, vec2(-uDuneWind.y, uDuneWind.x)) / 41.0);
float tStreak = texture(tTerrMacro, tWindUv + vec2(0.13, 0.57)).a;
tMacro *= 1.0 + 0.09 * (tStreak - 0.5) * smoothstep(60.0, 160.0, tR);
// warmer, more iron-stained sand away from the oasis (desert dune sand carries
// hematite coatings; the oasis beach is washed paler quartz)
float tRed = clamp(smoothstep(90.0, 1400.0, tR) * 0.75 + (tM1.g - 0.5) * 0.5, 0.0, 0.9);
tMacro *= mix(vec3(1.0), vec3(1.06, 0.95, 0.83), tRed);
tMacro *= 1.0 + 0.05 * tLee;
// quartz sand is a little warmer and less grey than the raw set: a touch more
// saturation (never orange) so sunlit sand reads cream-peach, not white
tMacro *= vec3(1.0, 0.975, 0.935);
vec3 tSandBase = tSandAvg.rgb * tMacro;

// near detail: the sand texture carries baked wind ripples along its u axis, so it
// is projected with u along the dune wind. Trails, slip faces, sheltered ground and
// the damp band lose most of the ripple relief.
vec3 tSandCol = tSandBase;
float tSandH = 0.5;
vec3 tSandTn = vec3(0.0, 0.0, 1.0);
float tSandRough = 0.9;
float tSandAO = 1.0;
float tFlat = clamp(max(max(smoothstep(0.25, 0.6, tC0.r), tLee * 0.8), 1.0 - smoothstep(0.25, 0.7, tHW)), 0.0, 1.0);
tFlat = max(tFlat, max(tShelter * 0.88, tDisturb * 0.72));
if (tNearK > 0.0) {
  TSurf sa = tTop(0.0, tP.xz, uLayerSize[0], tRot1, vec2(0.0));
  vec3 detail = sa.alb / max(tSandAvg.rgb, vec3(0.02));
  detail = mix(detail, mix(vec3(1.0), detail, 0.4), tFlat);
  tSandCol *= mix(vec3(1.0), detail, tNearK);
  tSandH = mix(0.5, mix(sa.h, 0.5, tFlat * 0.7), tNearK);
  tSandTn = normalize(mix(vec3(0.0, 0.0, 1.0), vec3(sa.tn.xy * (1.0 - tFlat * 0.85), sa.tn.z), tNearK));
  tSandRough = mix(0.9, sa.rough, tNearK);
  tSandAO = mix(1.0, sa.ao, tNearK);
#if TERR_Q >= 1
  // settled / scuffed sand: soft lumps (sheltered) or kicked hummocks (beside the
  // trails) from analytic-gradient noise, faded before it could alias
  float lumpK = max(tShelter * 0.8, tDisturb) * tNearK;
  if (lumpK > 0.01) {
    // (constant periods: a spatially varying scale times absolute coordinates
    // would draw contour-like bands wherever the mask changes)
    const float P1 = 0.34;
    float A1 = mix(0.009, 0.016, tDisturb);
    vec3 n1 = tNoiseD2(tP.xz / P1 + vec2(7.1, 3.9));
    vec2 lg = n1.yz * (A1 / P1) * (1.0 - smoothstep(P1 * 0.2, P1 * 0.45, tPix));
  #if TERR_Q >= 3
    float P2 = 0.11;
    vec3 n2 = tNoiseD2(tRot2 * tP.xz / P2 + vec2(1.3, 8.2));
    lg += (n2.yz * tRot2) * (mix(0.003, 0.005, tDisturb) / P2) * (1.0 - smoothstep(P2 * 0.2, P2 * 0.45, tPix));
    tSandCol *= 1.0 + (n2.x - 0.5) * 0.05 * lumpK;
  #endif
    tSandTn = normalize(vec3(tSandTn.xy - lg * lumpK * 1.4, tSandTn.z));
    // kicked sand turns up the paler, drier grains from below the crust
    tSandCol *= 1.0 + (n1.x - 0.5) * 0.06 * lumpK;
  }
#endif
#if TERR_Q >= 2
  // resolved coarse grains / tiny lithic chips (2-7 mm): sparse, a few more near
  // trails and under trees; only while a 12 mm cell spans more than ~1.5 pixels
  float gRes = (1.0 - smoothstep(0.35, 0.75, tPix / 0.012)) * tNearK;
  if (gRes > 0.01) {
    float gCov = 0.045 + 0.05 * max(tDisturb, tShelter) + 0.03 * smoothstep(0.55, 0.8, tM3.g);
    vec4 ch = tChip(tP.xz / 0.012 + vec2(3.7, 1.9), gCov, 0.14, 0.3, 0.45);
    float cid = ch.y;
    vec3 cc = cid < 0.38 ? tSandCol * vec3(0.42, 0.38, 0.35)          // dark lithic / heavy mineral
            : cid < 0.62 ? tSandCol * vec3(0.93, 0.74, 0.58)          // iron-stained quartz
            : cid < 0.84 ? tSandCol * vec3(1.12, 1.1, 1.06)           // clear / milky quartz
                         : tSandCol * vec3(0.72, 0.72, 0.74);         // grey chert
    float cw = ch.x * gRes * (1.0 - tFlat * 0.3);
    tSandCol = mix(tSandCol, cc, cw * 0.85);
    tSandH = mix(tSandH, 0.62, cw * 0.5);
    tSandAO = mix(tSandAO, tSandAO * mix(0.8, 1.0, ch.z), cw);
  }
#endif
}

vec3 tAlb = tSandCol;
float tH = tSandH;
vec3 tNW = tApplyTop(tN0, tSandTn, 1.0);
#if TERR_Q >= 1
// broad swells (1-4 m, a few cm high): wind-worked, settled sand is never a plane.
// Under the raking golden-hour sun a 1-2 deg tilt changes the light by 10-20 %, so
// these carry the mid-distance beach and open-desert texture where the ripple
// texture has minified away. Constant periods (see the lumps above); each octave
// fades before it can alias; skipped on dune slip faces (smooth avalanche sand).
{
  float uK = (1.0 - tLee * 0.8) * (1.0 - smoothstep(110.0, 190.0, tDist));
  if (uK > 0.01) {
    const float U1 = 3.7, U2 = 1.25;
    vec3 u1 = tNoiseD2(tRot2 * tP.xz / U1 + vec2(4.3, 7.7));
    vec3 u2 = tNoiseD2(tRot1 * tP.xz / U2 + vec2(2.1, 5.9));
    float a1 = 0.05 * (0.55 + 0.9 * tM2.b) * (1.0 - smoothstep(U1 * 0.15, U1 * 0.4, tPix));
    float a2 = 0.016 * (0.5 + 1.0 * tM3.r) * (1.0 - smoothstep(U2 * 0.15, U2 * 0.4, tPix));
    vec2 ug = (u1.yz * tRot2) * (a1 / U1) + (u2.yz * tRot1) * (a2 / U2);
    tNW = normalize(tNW - vec3(ug.x, 0.0, ug.y) * uK);
    // crests dry out paler, hollows keep finer, slightly darker grains
    tAlb *= 1.0 + ((u1.x - 0.5) * 0.05 + (u2.x - 0.5) * 0.025) * uK;
  }
}
#endif
float tRough = tSandRough;
float tTexAO = tSandAO;
float tRockBlend = 0.0;
float tLitW = 0.0;
float tPaveW = 0.0;

// wave-ripple phase (uniform control flow: uses derivatives)
float tRipFadeW, tRipFadeF;
// (constant directions: a spatially varying direction times absolute coordinates
// would shift the phase by many cycles and draw contour-like bands)
vec3 tRipLW = tRippleWave(tP.xz, uDuneWind, 0.42, (tM3.g - 0.5) * 3.0 + (tM2.r - 0.5) * 7.0, tRipFadeW);
vec2 tRipW = tRipLW.xy; float tRipHW = tRipLW.z;
// finer crossing train for the shallows (~16 cm wave ripples)
vec3 tRipLF = tRippleWave(tP.xz, vec2(0.5, 0.8660254), 0.16, (tM3.a - 0.5) * 4.0 + (tM2.g - 0.5) * 9.0, tRipFadeF);
vec2 tRipF = tRipLF.xy; float tRipHF = tRipLF.z;

// ---- TRAILS: packed, slightly darker sand, trampled micro-relief, no ripples
float tTrail = smoothstep(0.3, 0.7, tC0.r + (tM3.b - 0.5) * 0.16 + (tM2.a - 0.5) * 0.1 + (tSandH - 0.5) * 0.45 * tNearK);
if (tTrail > 0.0) {
  vec3 tn = tSandTn;
  float trample = 0.0;
  if (tNearK > 0.0) {
    TSurf fp = tTop(0.0, tP.xz, 0.55, tRot2, vec2(0.41, 0.17));
    tn = normalize(vec3(fp.tn.xy * 1.0 * tNearK + tSandTn.xy * 0.4, fp.tn.z));
    trample = (fp.h - 0.5) * tNearK;
  }
  tAlb = mix(tAlb, tAlb * vec3(0.87, 0.84, 0.8) * (1.0 + 0.16 * trample), tTrail);
  tNW = normalize(mix(tNW, tApplyTop(tN0, tn, 1.0), tTrail));
  tRough = mix(tRough, 0.8, tTrail);
}

// ---- DESERT PAVEMENT / TALUS: procedural embedded stones (Voronoi), tone at distance
// open-desert gravel patches (reg) between dunes, never on the village beaches
float tReg = smoothstep(0.58, 0.78, tM1.b * 0.55 + tM2.r * 0.45 + (tM3.g - 0.5) * 0.15)
           * smoothstep(110.0, 220.0, tR) * (1.0 - tLee) * smoothstep(0.9, 0.97, tN0.y);
// pavement / reg only on flat, stable ground (never on dune slip faces or ramps);
// talus stones at the cliff foot lie on any slope
float tFlatGround = smoothstep(0.975, 0.995, tN0.y) * (1.0 - tLee);
float tPave = max(tC1.g, tReg * 0.5) * tFlatGround;
float tTalus = tC1.b;
float tGravel = max(tPave, tTalus);
if (tGravel > 0.01) {
  float cover = clamp(tPave * 1.2 + tTalus * 0.9 + (tM3.r - 0.5) * 0.35, 0.0, 0.9);
  // stones gather in clusters and lags (wind removes the sand between them)
  float clump = texture(tTerrMacro, tP.xz * (1.0 / 3.1) + vec2(0.31, 0.83)).g;
  cover = clamp(cover * (0.4 + 1.2 * smoothstep(0.3, 0.72, clump)), 0.0, 0.9);
  vec3 pavTone = mix(tAlb, vec3(0.3, 0.22, 0.15), 0.5);   // what the stones average to far away
  vec3 pc = pavTone; vec3 pn = vec3(0.0); float pAO = 1.0; float pw = cover * 0.7;
  // stones are resolved while a 7 cm cell spans more than ~2 pixels
  float fw = max(length(gTdPx.xz), length(gTdPy.xz)) / 0.07;
  float res = 1.0 - smoothstep(0.25, 0.6, fw);
  if (res > 0.0) {
    vec4 pb = tPebble(tP.xz / 0.07, cover * (1.0 - 0.4 * tTalus));
    vec4 st = tPebble(tP.xz / 0.26 + 17.3, cover * (0.25 + 0.6 * tTalus));  // larger stones (talus)
    float useSt = step(pb.x, st.x * 1.2);
    vec4 k = useSt > 0.5 ? st : pb;
    float isP = smoothstep(0.0, 0.22, k.x);                         // soft, half-buried contact
    vec3 col = tPebbleColor(k.y) * mix(0.7, 1.0, sqrt(k.x));     // darker toward the contact
    col = mix(col, tAlb * 0.9, 0.3 * (1.0 - smoothstep(0.1, 0.6, k.x)));  // sand dusting the rims
    vec3 between = tAlb * mix(0.8, 1.0, 1.0 - cover);              // shaded sand between stones
    pc = mix(pavTone, mix(between, col, isP), res);
    // flattened embedded domes
    pn = vec3(k.z, 0.0, k.w) * 0.32 * (0.3 + 0.2 * k.y) * isP * res;
    pAO = mix(1.0, mix(0.72, 1.0, k.x), isP * res);
    pw = mix(pw, 1.0, res) * smoothstep(0.02, 0.2, tGravel);
  }
  tAlb = mix(tAlb, pc, pw);
  tNW = normalize(tNW - pn * pw);
  tRough = mix(tRough, 0.72, pw * 0.6);
  tTexAO = mix(tTexAO, pAO, pw);
  tPaveW = pw;
}

// ---- ROCK / CLIFF: steep slopes, island rims, escarpment, buttes, mountains
float tBase = 2.0 + 0.028 * max(tR - 60.0, 0.0);
float tAltRock = smoothstep(42.0, 78.0, tP.y - tBase);
// above the angle of repose (dune slip faces stop at ~35 deg, N.y ~0.82)
float tRockSlope = smoothstep(0.27, 0.38, tSteep + (tM2.r - 0.5) * 0.06);
float tRockW = max(max(tRockSlope, tC0.b), tAltRock * smoothstep(0.03, 0.12, tSteep));
// escarpment face (cliffMask ~0.05-0.95): baked inside the control area, slope +
// height band outside it. It shows between the rock slabs and behind the falls,
// so it is dressed like the slabs (cliff set, beds, mottling, iron, varnish).
float tFace = uFaceDress * (tInC > 0.5 ? tC1.a
  : smoothstep(0.3, 0.45, tSteep) * step(24.0, -tP.z) * smoothstep(1.0, 3.0, tP.y)
    * (1.0 - smoothstep(15.0, 19.0, tP.y)) * (1.0 - smoothstep(170.0, 230.0, abs(tP.x))));
tRockW = clamp(max(tRockW, tFace), 0.0, 1.0);
if (tRockW > 0.01) {
  float cliffSel = max(max(tC0.a, 1.0 - tInC), tFace);
  cliffSel = max(cliffSel, smoothstep(5.0, 8.0, tP.y) * step(20.0, -tP.z));
  float S = cliffSel > 0.5 ? uLayerSize[3] : uLayerSize[2];
  float Lr = cliffSel > 0.5 ? 3.0 : 2.0;
  float faceK = tFace * tMidK;
  vec3 rAlb; float rH; vec3 rN; float rRough; float rAO;
  if (tMidK > 0.0) {
    TSurf rk = tTri(Lr, tP, tN0, S, 1.1 + 0.6 * tFace);
    rAlb = rk.alb; rH = rk.h; rN = rk.tn; rRough = rk.rough; rAO = rk.ao;
    if (tNearK < 1.0) {
      // large-scale sample, heavily filtered (x6 gradients): tone variation only, so
      // the texture's cracks do not repeat as stripes across distant faces
      vec3 dPx = gTdPx, dPy = gTdPy;
      gTdPx *= 6.0; gTdPy *= 6.0;
      TSurf rk2 = tTri(Lr, tP + vec3(3.7, 1.3, 5.1), tN0, S * 4.35, 1.0);
      gTdPx = dPx; gTdPy = dPy;
      float k = 1.0 - tNearK;
      rAlb = mix(rAlb, rAlb * rk2.alb / max(textureLod(tTerrAlb, vec3(0.5, 0.5, Lr), 14.0).rgb, vec3(0.02)), k * 0.7);
      rN = normalize(mix(rN, rk2.tn, k * 0.3));
    }
    // escarpment face up close: the cliff normal map again at ~1/3 scale (the
    // slabs do the same), so the face is as knobbly as the rock around it
    float nearF = faceK * (1.0 - smoothstep(10.0, 20.0, tDist));
    if (nearF > 0.01) {
      vec3 dPx = gTdPx, dPy = gTdPy;
      gTdPx *= 3.1; gTdPy *= 3.1;
      TSurf rd = tTri(3.0, tP * 3.1 + vec3(0.7, 0.2, 1.9), tN0, S, 1.3);
      gTdPx = dPx; gTdPy = dPy;
      rN = normalize(rN + (rd.tn - tN0) * 1.1 * nearF);
      rAO = mix(rAO, min(rAO, rd.ao), nearF * 0.6);
    }
    rAlb = mix(textureLod(tTerrAlb, vec3(0.5, 0.5, Lr), 14.0).rgb, rAlb, tMidK);
    rN = normalize(mix(tN0, rN, tMidK));
  } else {
    rAlb = textureLod(tTerrAlb, vec3(0.5, 0.5, Lr), 14.0).rgb; rH = 0.5; rN = tN0; rRough = 0.85; rAO = 1.0;
  }
  // sandstone strata: warm ochre / rust / pale bands following warped horizontal layers
  float warpY = tP.y + (tM2.r - 0.5) * 3.0 + (tM1.b - 0.5) * 14.0;
  float band = fract(warpY / (cliffSel > 0.5 ? 1.9 : 1.1));
  float band2 = fract(warpY / 9.7 + 0.3);
  vec3 strata = mix(vec3(1.04, 0.98, 0.92), vec3(0.9, 0.78, 0.68), smoothstep(0.3, 0.7, band));
  strata *= mix(vec3(1.0), vec3(1.06, 0.93, 0.82), smoothstep(0.6, 0.9, band2));
  strata = mix(vec3(1.0), strata, cliffSel * 0.6 + 0.15);
  if (faceK > 0.01) {
    // the slabs' bedding: discrete ~0.5 m beds of pale / rust sandstone with
    // darker laminae at the bed joints
    float bc = warpY * 1.9 + (tM3.g - 0.5) * 1.6;
    float bid = floor(bc), bf = fract(bc);
    float bh = tHash32(vec2(bid + 512.0, 37.0)).x;
    vec3 bedCol = mix(vec3(1.08, 1.0, 0.9), vec3(0.86, 0.72, 0.6), bh);
    float bedEdge = smoothstep(0.0, 0.07, bf) * (1.0 - smoothstep(0.9, 1.0, bf));
    strata = mix(strata, bedCol * mix(0.84, 1.0, bedEdge), faceK * 0.85);
    // beds weather into rounded ledges with recessed joints (like the slabs'
    // steps): tilt the normal along the face's up tangent by the bed profile slope
    float ledge = smoothstep(0.0, 0.18, bf) * (1.0 - smoothstep(0.7, 1.0, bf));
    float dLedge = (bf < 0.18 ? 1.0 / 0.18 : (bf > 0.7 ? -1.0 / 0.3 : 0.0)) * 1.9;
    vec3 upT = vec3(0.0, 1.0, 0.0) - tN0 * tN0.y;
    float upL = length(upT);
    if (upL > 0.2) rN = normalize(rN - upT / upL * dLedge * 0.035 * faceK * (1.0 - smoothstep(25.0, 60.0, tDist)));
    rAO *= mix(1.0, mix(0.6, 1.0, ledge), faceK);
  }
  // mountains / buttes read warmer and more rust-coloured
  strata *= mix(vec3(1.0), vec3(1.04, 0.93, 0.82), tAltRock * 0.7);
  rAlb = mix(rAlb, vec3(dot(rAlb, vec3(0.3, 0.55, 0.15))) * vec3(1.05, 0.99, 0.93), 0.18);
  rAlb *= strata;
  if (faceK > 0.01) {
    // mottling, iron staining and dirt in the crevices, as on the slabs
    float mot = tM3.a * 0.55 + tM2.b * 0.25 + (rH - 0.5) * 0.4 + 0.1;
    rAlb *= mix(1.0, 0.82 + 0.36 * clamp(mot, 0.0, 1.0), faceK);
    float iron = smoothstep(0.56, 0.8, tM2.g * 0.6 + tM3.r * 0.4);
    rAlb = mix(rAlb, rAlb * vec3(1.05, 0.76, 0.58), iron * 0.5 * faceK);
    rAlb *= mix(1.0, mix(0.66, 1.0, clamp(rAO, 0.0, 1.0)), faceK);
    // a touch less pink: toward the slabs' ochre
    rAlb *= mix(vec3(1.0), vec3(1.03, 0.97, 0.84), faceK);
  }
  // distant rock: slightly desaturated so ranges read as weathered, dusty stone
  rAlb = mix(rAlb, vec3(dot(rAlb, vec3(0.3, 0.55, 0.15))) * vec3(1.06, 0.98, 0.9), 0.3 * (1.0 - tMidK));
  // desert varnish: darker streaks down steep faces (dark brown on the escarpment)
  float streak = smoothstep(0.55, 0.85, tM3.a + (tM2.b - 0.5) * 0.6) * smoothstep(0.4, 0.7, tSteep);
  rAlb *= mix(vec3(1.0 - 0.14 * streak), mix(vec3(1.0), vec3(0.45, 0.35, 0.29), streak * 0.4), tFace);
  // height-based blend: rock pokes through sand from its high points
  float bw = clamp((rH - tH) * 1.4 + (tRockW * 2.0 - 1.0) * 1.6 + 0.5, 0.0, 1.0);
  bw = smoothstep(0.0, 1.0, bw) * smoothstep(0.0, 0.25, tRockW);
  tAlb = mix(tAlb, rAlb, bw);
  tNW = normalize(mix(tNW, rN, bw));
  tRough = mix(tRough, mix(rRough, 0.78, 0.3), bw);
  tTexAO = mix(tTexAO, rAO, bw);
  tH = mix(tH, rH, bw);
  tRockBlend = bw;
}

// ---- oasis ground cover: soften the 1 m texels and make the cover edge ragged
tVeg.rgb *= smoothstep(0.0, 0.35, tVeg.rgb + (tM3.b - 0.5) * 0.25 + (tSandH - 0.5) * 0.3 * tNearK);
float tLush = clamp(tVeg.r * 1.1 + tVeg.b * 0.9, 0.0, 1.0);
float tGround = smoothstep(0.02, 0.25, tHW) * (1.0 - smoothstep(0.2, 0.36, tSteep)) * (1.0 - tRockBlend * 0.85);
// organic soil + litter wherever plants grow densely (merged with the crown litter)
float tOrg = smoothstep(0.12, 0.7, tLush) * tGround;

// ---- LITTER / SOIL under tree crowns and dense vegetation
float tLit = max(tC0.g, tOrg * 0.8);
if (tLit > 0.01) {
  TSurf so = tTop(4.0, tP.xz, uLayerSize[4], tRot1, vec2(0.3, 0.1));
  TSurf li = tTop(5.0, tP.xz, uLayerSize[5], tRot2, vec2(0.7, 0.2));
  float patchK = smoothstep(0.35, 0.75, tM3.g * 0.55 + tM2.b * 0.35 + tLit * 0.6 - 0.2);
  // dry, sun-bleached leaves: desaturated toward grey-brown, soil shows between
  vec3 leaf = mix(li.alb, vec3(dot(li.alb, vec3(0.3, 0.55, 0.15))) * vec3(0.95, 0.84, 0.7), 0.5) * 0.82;
  // under grass / reeds the ground is darker, moist earth with fewer leaves
  float leafAmt = 0.75 * mix(1.0, 0.55, smoothstep(0.3, 0.8, tVeg.r) * (1.0 - tC0.g));
  vec3 c = mix(so.alb, leaf, leafAmt * smoothstep(0.4, 0.7, li.h * 0.7 + tM3.r * 0.45));
  // beyond the detail range fade to the layers' mean colour (hides the 2 m tiling)
  vec3 litMean = mix(textureLod(tTerrAlb, vec3(0.5, 0.5, 4.0), 14.0).rgb, textureLod(tTerrAlb, vec3(0.5, 0.5, 5.0), 14.0).rgb * 0.8, 0.55);
  c = mix(litMean * (0.9 + 0.2 * tM3.g), c, max(tNearK, 0.25 * tMidK));
  float hl = max(so.h, li.h);
  float w = clamp(tLit * 1.1 * patchK + (hl - tH) * 0.6 * tLit, 0.0, 0.88);
  w = max(w, tOrg * 0.7);                       // dense cover: the soil is continuous
  w *= smoothstep(0.02, 0.2, tHW);              // not under water
  w *= 1.0 - smoothstep(0.2, 0.36, tSteep);     // does not stay on steep rock
  tAlb = mix(tAlb, c, w);
  tNW = normalize(mix(tNW, tApplyTop(tN0, mix(so.tn, li.tn, 0.6), 0.65), w));
  tRough = mix(tRough, 0.92, w);
  tTexAO = mix(tTexAO, min(so.ao, li.ao), w);
  tH = mix(tH, hl, w);
  tLitW = w;
}

// beyond the grass-card range the cover itself tints the ground, so distant and
// elevated views still read as a green oasis (what the culled cards average to)
vec3 tDbgV = vec3(0.0);
if (tInV > 0.0) {
  float farK = smoothstep(uGrassFar * 0.5, uGrassFar * 1.05, tDist) * tGround;
  if (farK > 0.0) {
    // wider footprint (the cover is 1 m splats): 5 taps ~1.6 m apart
    vec2 o = 1.6 / uVegB.zw;
    vec4 vb = textureLod(tVegCover, tVuv, 0.0) * 0.36
            + (textureLod(tVegCover, tVuv + vec2(o.x, 0.0), 0.0) + textureLod(tVegCover, tVuv - vec2(o.x, 0.0), 0.0)
             + textureLod(tVegCover, tVuv + vec2(0.0, o.y), 0.0) + textureLod(tVegCover, tVuv - vec2(0.0, o.y), 0.0)) * 0.16;
    float ragged = (tM3.b - 0.5) * 0.12 + (tM2.a - 0.5) * 0.08;
    float gw = smoothstep(0.03, 0.4, vb.r + ragged) * 0.8 * farK;
    float sw = smoothstep(0.03, 0.45, vb.b + ragged) * 0.7 * farK;
    float dw = smoothstep(0.05, 0.6, vb.g + ragged) * 0.3 * farK;
    vec3 grassTone = vec3(0.1, 0.13, 0.045) * (0.8 + 0.4 * tM3.g);
    vec3 shrubTone = vec3(0.07, 0.085, 0.04) * (0.85 + 0.3 * tM2.b);
    vec3 strawTone = vec3(0.4, 0.32, 0.19) * (0.9 + 0.2 * tM3.a);
    tAlb = mix(tAlb, strawTone, dw);
    tAlb = mix(tAlb, grassTone, gw);
    tAlb = mix(tAlb, shrubTone, sw);
    tRough = mix(tRough, 0.95, max(max(gw, sw), dw));
    tDbgV = vec3(farK, vb.a, max(gw, sw));
    // moist oasis ground: darker, a little olive (sparse sprouts, algae crust)
    tAlb = mix(tAlb, tAlb * vec3(0.74, 0.76, 0.62), smoothstep(0.1, 0.7, vb.a) * 0.65 * farK * (1.0 - tLitW));
  }
  // moist oasis ground is a little darker than the open desert
  tAlb *= 1.0 - 0.1 * tVeg.a * tGround * (1.0 - tLitW);
}

// ---- WATERLINE: dry -> damp (capillary fringe) -> wet glossy band -> submerged
// clean rippled sand. Damp sand darkens steadily toward the water (dry quartz sand
// ~0.45 albedo, damp ~0.3, saturated ~0.25 plus a specular water film).
float tWetTop = 0.24 + (tM3.b - 0.5) * 0.14 + (tM2.g - 0.5) * 0.1;
float tWet = 1.0 - smoothstep(tWetTop * 0.55, tWetTop, tHW);
float tDamp = 1.0 - smoothstep(tWetTop, tWetTop + 0.55, tHW);
tWet = max(tWet, tC1.r * 0.85);   // stream beds, waterfall spray
if (tDamp > 0.0 || tWet > 0.0) {
  // the wet-sand texture: ripples washed flat, swash lines, fine grain
  vec3 wetDetail = vec3(1.0);
  vec3 wetTn = vec3(0.0, 0.0, 1.0);
  if (tNearK > 0.0) {
    TSurf sw = tTop(1.0, tP.xz, uLayerSize[1], tRot1, vec2(0.37, 0.19));
    vec3 wAvg = textureLod(tTerrAlb, vec3(0.5, 0.5, 1.0), 14.0).rgb;
    // soft-knee contrast: swash lines, grain and washed ripples keep their
    // relative tone, but no isolated grit or pinhole can pop out as a dot
    vec3 dr = sw.alb / max(wAvg, vec3(0.02)) - 1.0;
    wetDetail = mix(vec3(1.0), 1.0 + 0.14 * tanh(dr / 0.14), tNearK);
    wetTn = normalize(mix(vec3(0.0, 0.0, 1.0), vec3(sw.tn.xy * 0.8, sw.tn.z), tNearK));
  }
  float other = max(tRockBlend, tLitW);
  float dampK = tDamp * tDamp * (1.0 - tWet);
  vec3 dampC = tAlb * vec3(0.74, 0.72, 0.7);
  vec3 wetSand = tSandBase * vec3(0.55, 0.53, 0.5) * wetDetail;
  vec3 wetOther = tAlb * vec3(0.62, 0.6, 0.58);
  tAlb = mix(tAlb, dampC, dampK);
  float wSand = tWet * (1.0 - other);
  tAlb = mix(tAlb, wetSand, wSand);
  tAlb = mix(tAlb, wetOther, tWet * other);
  tNW = normalize(mix(tNW, tApplyTop(tN0, wetTn, 0.8), wSand));
  // a thin, mirror-smooth film right at the water's edge, glossy wet band, then
  // the damp fringe loses its sheen as it dries upward
  float film = 1.0 - smoothstep(0.0, 0.07, abs(tHW - 0.012));
  tRough = mix(tRough, mix(0.28, 0.08, film), tWet);
  tRough = mix(tRough, tRough * 0.8, dampK);
  if (tHW < 0.0) {
    // submerged: clean pale fine sand (the water absorbs toward turquoise) with soft
    // symmetric wave ripples -- a long train plus a finer, crossing one in the
    // shallows; heavier dark grains settle in the troughs. Rock stays rock.
    float sub = smoothstep(0.0, 0.45, -tHW);
    float keep = smoothstep(0.3, 0.7, tRockBlend);
    float dFade = 1.0 - smoothstep(40.0, 60.0, tDist);
    float aLong = tRipFadeW * smoothstep(0.1, 0.8, -tHW) * dFade;
    float aFine = tRipFadeF * (1.0 - smoothstep(0.6, 1.8, -tHW)) * smoothstep(0.02, 0.15, -tHW) * dFade;
    float shade = 1.0 - 0.05 * tRipHW * aLong - 0.04 * tRipHF * aFine;
    vec3 clean = tSandBase * vec3(1.03, 1.03, 1.0) * mix(vec3(1.0), wetDetail, 0.6) * shade;
    tAlb = mix(tAlb, mix(clean, tAlb, keep), sub);
    tRough = mix(tRough, 0.55, sub);
    tNW = normalize(mix(tNW, tApplyTop(tN0, wetTn, 0.6), sub * (1.0 - keep)));
    vec2 rg = tRipW * (0.009 * aLong) + tRipF * (0.0035 * aFine);
    tNW = normalize(tNW - vec3(rg.x, 0.0, rg.y) * sub * (1.0 - keep));
  }
}

#if TERR_Q >= 1
// ---- STRAND LINE: shell grit, reed and twig bits, dried algae left at the top of
// the swash; patchy, a little organic staining under it. Resolved while a 14 mm
// cell spans more than ~1.5 pixels, its mean tone beyond.
{
  float tsd = (tHW - tWetTop * 1.02) / 0.03;
  float strand = exp(-tsd * tsd) * smoothstep(0.35, 0.62, tM3.r * 0.5 + tM2.b * 0.3 + tM3.g * 0.2)
               * (1.0 - tRockBlend) * (1.0 - tLitW) * (1.0 - smoothstep(0.15, 0.3, tSteep)) * tInC;
  if (strand > 0.01) {
    tAlb *= 1.0 - 0.12 * strand;                               // organic stain
    float sRes = (1.0 - smoothstep(0.35, 0.75, tPix / 0.014)) * tNearK;
    if (sRes > 0.01) {
      vec4 ch = tChip(tP.xz / 0.014 + vec2(9.1, 4.4), 0.55 * strand, 0.18, 0.42, 0.18);
      float id = ch.y;
      vec3 cc = id < 0.34 ? vec3(0.66, 0.62, 0.55)          // bleached shell grit
              : id < 0.6  ? vec3(0.1, 0.075, 0.05)          // dried algae / charred organic bits
              : id < 0.85 ? vec3(0.36, 0.29, 0.18)          // reed and twig pieces
                          : vec3(0.52, 0.44, 0.34);         // pale stems
      cc *= 0.85 + 0.3 * fract(id * 17.3);
      float cw = ch.x * sRes;
      tAlb = mix(tAlb, cc, cw * 0.9);
      tRough = mix(tRough, id < 0.34 ? 0.55 : 0.8, cw);
      tTexAO = mix(tTexAO, tTexAO * mix(0.75, 1.0, ch.z), cw);
      tNW = normalize(mix(tNW, tN0, cw * 0.5));
    }
  }
}
#endif

// quartz glint weight (dry / damp open sand, above the water, near the viewer)
float tGlintK = 0.0;
#if TERR_Q >= 1
  #if TERR_Q >= 4
  const float tGlintFar = 34.0;
  #elif TERR_Q >= 3
  const float tGlintFar = 26.0;
  #else
  const float tGlintFar = 16.0;
  #endif
tGlintK = uGlint * (1.0 - tRockBlend) * (1.0 - tLitW) * (1.0 - tPaveW) * (1.0 - tWet)
        * smoothstep(0.02, 0.12, tHW) * (1.0 - smoothstep(tGlintFar * 0.55, tGlintFar, tDist)) * (1.0 - tTrail * 0.5);
#endif

if (uTerrDebug > 0.5) { tAlb = vec3(tSunVis); }
if (uTerrDebug > 1.5) { tAlb = tNW * 0.5 + 0.5; }
if (uTerrDebug > 2.5) { tAlb = vec3(tBakedAO); }
if (uTerrDebug > 3.5) { tAlb = tVeg.rgb * 0.8 + vec3(0.0, 0.0, 0.05) * tInV; }
if (uTerrDebug > 4.5) { tAlb = vec3(tFace, tRockBlend, tLitW) * 0.8; }
if (uTerrDebug > 5.5) { tAlb = vec3(tVeg.a * 0.8); }
if (uTerrDebug > 6.5) { tAlb = tDbgV * 0.8; }
if (uTerrDebug > 7.5) { tAlb = vec3(tShelter, tDisturb, tGlintK) * 0.8; }
if (uTerrDebug > 8.5) { tAlb = tTop(uTerrDebug > 9.5 ? 5.0 : 4.0, tP.xz, 2.0, tRot1, vec2(0.0)).alb; }
if (uTerrDebug > 10.5) { TSurf dbr = tTri(uTerrDebug > 11.5 ? 3.0 : 2.0, tP, tN0, uTerrDebug > 11.5 ? uLayerSize[3] : uLayerSize[2], 1.1); tAlb = uTerrDebug > 12.5 ? dbr.alb : dbr.tn * 0.5 + 0.5; }
diffuseColor.rgb = max(tAlb, vec3(0.0));
`,Me=`
#include <lights_fragment_end>
reflectedLight.directDiffuse *= tSunVis;
reflectedLight.directSpecular *= tSunVis;
#if TERR_Q >= 1
if (tGlintK > 0.001) {
  float gNoL = dot(tNW, uSunDir);
  if (gNoL > 0.02) {
    vec3 gE = uSunColor * uSunIntensity;
    vec3 gUnsh = gE * gNoL * diffuseColor.rgb * RECIPROCAL_PI;
    float gLit = clamp(dot(reflectedLight.directDiffuse, vec3(0.3, 0.59, 0.11)) / max(dot(gUnsh, vec3(0.3, 0.59, 0.11)), 1e-5), 0.0, 1.0);
    if (gLit > 0.01) {
      vec3 gV = normalize(cameraPosition - vTW);
    #if TERR_Q >= 3
      const float gDens = 1.2e-3;
    #else
      const float gDens = 0.7e-3;
    #endif
      float g = tGlint(vTW.xz, tNW, gV, uSunDir, tPix, gDens);
      reflectedLight.directSpecular += gE * (0.55 * g * gLit * tGlintK);
    }
  }
}
#endif
`,Q=null;function Ne(){if(Q)return Q;let e=new Uint8Array([128,128,255,255,128,128,255,255,128,128,255,255]);return Q=new h(e,1,1,3),Q.needsUpdate=!0,Q}var $=null;function Pe(){return $||($=new _(new Uint8Array([0,0,0,0]),1,1,e),$.needsUpdate=!0,$)}function Fe(e,t){let{G:n}=e,r=Math.max(0,Math.min(4,e.quality?.rank??2)),i={tTerrAlb:{value:t.albedoArray},tTerrNrm:{value:t.normalArray},tTerrFar:{value:t.farTexture||Ne()},tTerrCtrl:{value:t.ctrlTexture},tTerrMacro:{value:t.macroTexture},uCtrlB:{value:t.ctrlBounds},uFarB0:{value:t.farBounds[0]},uFarB1:{value:t.farBounds[1]},uFarB2:{value:t.farBounds[2]},uL0Rect:{value:t.l0Rect},uLayerSize:{value:t.layerSizes},uDuneWind:{value:new w(.8,.6)},uTerrDebug:{value:t.debug||0},uFarReady:{value:+!!t.farTexture},tVegCover:{value:Pe()},uVegB:{value:new v(-128,-96,256,192)},uVegReady:{value:0},uGrassFar:{value:e.quality?.grassDistance??95},uFaceDress:{value:t.faceDress??1},uGlint:{value:t.glint??1}};return{make:e=>{let t=new S({color:16777215,roughness:1,metalness:0});return t.name=e,t.defines={TERR_Q:r},t.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+Oe).replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+ke),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+Ae).replace(`#include <map_fragment>`,je).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = clamp(tRough, 0.04, 1.0);`).replace(`#include <metalnessmap_fragment>`,`float metalnessFactor = 0.0;`).replace(`#include <normal_fragment_maps>`,`normal = normalize((viewMatrix * vec4(tNW, 0.0)).xyz);`).replace(`#include <lights_fragment_end>`,Me).replace(`#include <aomap_fragment>`,`#include <aomap_fragment>
{ float tAOF = clamp(tBakedAO * mix(1.0, tTexAO, 0.8), 0.0, 1.0); reflectedLight.indirectDiffuse *= tAOF; reflectedLight.indirectSpecular *= mix(1.0, tAOF, 0.7); }`)},t.customProgramCacheKey=()=>`terrain-splat-v3`,t},uniforms:i}}async function Ie(e){let{scene:t,hf:n,params:r,patchMaterial:i,progress:a,yieldFrame:o,LAYERS:s}=e,c={start:performance.now()},l=new ye(e),u=0,d=l.compile().then(()=>{u=Math.round(performance.now()-c.start)}),f=ae(n,{yieldFrame:o,progress:e=>a(e*.72,`Shaping dunes and cliffs`)}),m=await f.level0;c.level0=performance.now();let h=f.nearChunks(),g=await de(e,m),_=pe(m);await h,c.ctrl=performance.now();let{chunks:y,samples:b,stats:x}=await f.finish();c.lattice=performance.now();let S=Le(n,b,s);c.cpu=performance.now(),a(.85,`Baking desert light`);let C=null;await d.catch(e=>{C=e}),c.compiled=performance.now();let w=l.copySurfaceArrays(De),T=l.bakeMacro();c.arrays=performance.now();let D=n.TERRAIN_LOD[0],{make:O,uniforms:k}=Fe(e,{albedoArray:w.albedo,normalArray:w.normal,layerSizes:w.sizes,farTexture:null,farBounds:Z.map(e=>new v(-e.half,-e.half,2*e.half,2*e.half)),ctrlTexture:g.texture,ctrlBounds:g.bounds,macroTexture:T,l0Rect:new v(D.x0,D.z0,D.x1,D.z1),debug:r.num(`terraindebug`,0),faceDress:r.num(`terrainface`,1),glint:r.num(`terrglint`,1)}),A=O(`terrain`);i(A);let j=O(`terrain-far`);i(j);let M=new E;M.name=`terrain`;let N=[];for(let e of y){let t=e.group===`far`||e.group===`horizon`,n=new p(e.geometry,t?j:A);n.name=e.geometry.name,n.receiveShadow=!t,n.castShadow=!1,n.matrixAutoUpdate=!1,n.updateMatrix(),M.add(n),N.push(n)}M.add(S),t.add(M);let P=y.reduce((e,t)=>e+t.geometry.index.count/3,0),F={groundHeight:n.groundHeight,heightAt:n.heightAt,meshes:N,heightTexture:_.texture,heightBounds:_.bounds,heightGrid:m,farTexture:null,farBounds:Z.map(e=>[-e.half,-e.half,2*e.half,2*e.half]),farReady:!1,uniforms:k,update:null},I=()=>{let e=performance.now(),t=l.run(m,{debug:r.has(`debugterrain`)});k.tTerrFar.value=t.texture,k.uFarReady.value=1,F.farTexture=t.texture,F.farReady=!0,console.log(`[lagoon] terrain far bake: programs ready at ${u} ms (parallel compile ${l.parallel?`on`:`off`}), bake ${Math.round(performance.now()-e)} ms ${JSON.stringify(t.times)}`),t.twinErr&&console.log(`[lagoon] terrain twin error: max ${t.twinErr.maxErr.toFixed(4)} m, mean ${t.twinErr.meanErr.toFixed(5)} m, worst ${JSON.stringify(t.twinErr.worst)}`)};if(C)console.error(`[lagoon] terrain far bake programs failed:`,C);else try{I()}catch(e){console.error(`[lagoon] terrain far bake failed:`,e)}let L=0;return F.update=()=>{if(k.uVegReady.value>.5||L>600)return;L++;let t=e.registry.get(`vegetation`),n=e.tex.extraTex?.(`vegetationCover`)||t?.cover?.texture||(t?.cover?.isTexture?t.cover:null);if(!n)return;let r=t?.cover?.bounds;Array.isArray(r)&&r.length===4&&k.uVegB.value.set(r[0],r[1],r[2],r[3]),k.tVegCover.value=n,k.uVegReady.value=1},F.order=-20,console.log(`[lagoon] terrain: ${y.length} chunks, ${(P/1e3).toFixed(0)}k tris; level 0 in ${Math.round(c.level0-c.start)} ms, level-0 tiles + ctrl ${Math.round(c.ctrl-c.level0)} ms, rings in ${Math.round(c.lattice-c.start)} ms (sampling ${x.sampleMs} ms on ${x.workers||`no`} workers, first band ${x.firstResultMs} ms${x.fallbackJobs&&x.workers?`, ${x.fallbackJobs} bands on main`:``}; assembly ${x.assembleMs} ms), proxy ${Math.round(c.cpu-c.lattice)} ms, waited ${Math.round(c.compiled-c.cpu)} ms, arrays ${Math.round(c.arrays-c.compiled)} ms, total ${Math.round(performance.now()-c.start)} ms`),F}function Le(e,n,r){let i=new Float32Array(45537),a=e.TERRAIN_LOD[0].step,o=e.TERRAIN_LOD[1].step;for(let t=0;t<43;t++)for(let r=0;r<353;r++){let s=-176+r*1,c=-64+t*1,l=W(n,0,Math.round(s/a),Math.round(c/a));l!==l&&(l=W(n,1,Math.round(s/o),Math.round(c/o))),l!==l&&(l=e.heightAt(s,c));let u=(t*353+r)*3;i[u]=s,i[u+1]=l-.5,i[u+2]=c}let s=new Uint32Array(88704),c=0;for(let e=0;e<42;e++)for(let t=0;t<352;t++){let n=e*353+t,r=n+1,i=n+353,a=i+1;s[c++]=n,s[c++]=i,s[c++]=r,s[c++]=r,s[c++]=i,s[c++]=a}let l=new y;l.setAttribute(`position`,new t(i,3)),l.setIndex(new t(s,1)),l.computeBoundingSphere();let u=new T({colorWrite:!1,depthWrite:!1,depthFunc:0,side:2});u.userData.noPatch=!0;let d=new p(l,u);return d.name=`terrain-cliff-shadow-proxy`,d.castShadow=!0,d.receiveShadow=!1,d.matrixAutoUpdate=!1,d.layers.set(r.NO_REFLECT),d}export{Ie as build};