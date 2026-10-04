import{$r as e,A as t,Dr as n,Dt as r,Fr as i,Hn as a,Ht as o,Ii as s,Ja as c,Lt as l,Qi as u,Rn as d,V as f,Wi as p,Yt as m,ar as h,do as g,ea as _,fa as v,in as y,io as b,ir as x,j as S,jr as C,mr as w,no as T,or as E,ro as D,sn as O,sr as k,ta as A}from"./three.core-DtjtRha-.js";import{a as j,r as M}from"./noise-RmOKhMMB.js";var N=Math.PI*2,P=(e,t,n)=>e<t?t:e>n?n:e,F=(e,t,n)=>e+(t-e)*n,I=(e,t,n)=>{let r=P((n-e)/(t-e),0,1);return r*r*(3-2*r)},ee=e=>e*e*e*(e*(e*6-15)+10),L=(e,t=0,n=0)=>M(e|0,t|0,n|0),R=(e,t=0,n=0)=>M(e|0,t|0,n|0)*2-1,z=class{constructor(e,t,n,r,i,a=1){this.hf=e,this.minX=t,this.minZ=n,this.step=a,this.nx=Math.ceil((r-t)/a)+1,this.nz=Math.ceil((i-n)/a)+1,this.h=new Float32Array(this.nx*this.nz)}async build(e){let{nx:t,nz:n,step:r,minX:i,minZ:a,h:o,hf:s}=this,c=performance.now();for(let l=0;l<n;l++){let n=a+l*r;for(let e=0;e<t;e++)o[l*t+e]=s.heightAt(i+e*r,n);performance.now()-c>14&&(await e(),c=performance.now())}return this}height(e,t){let n=(e-this.minX)/this.step,r=(t-this.minZ)/this.step;if(n<0||r<0||n>=this.nx-1||r>=this.nz-1)return this.hf.heightAt(e,t);let i=n|0,a=r|0,o=n-i,s=r-a,c=this.nx,l=this.h,u=a*c+i,d=l[u]+(l[u+1]-l[u])*o;return d+(l[u+c]+(l[u+c+1]-l[u+c])*o-d)*s}depth(e,t){let n=-this.height(e,t);return n>0?n:0}},B=class{constructor(e={}){this.pos=[],this.uv=[],this.col=[],this.idx=[],this.extra={};for(let t in e)this.extra[t]={size:e[t],data:[],cur:Array(e[t]).fill(0)};this.color=[1,1,1],this.uvFn=null,this.colorFn=null}set(e,...t){let n=this.extra[e];for(let e=0;e<n.size;e++)n.cur[e]=t[e]??0;return this}vertex(e,t,n,r,i){let a=this.pos.length/3;if(this.pos.push(e,t,n),r===void 0){let a=this.uvFn?this.uvFn(e,t,n):[0,0];r=a[0],i=a[1]}this.uv.push(r,i);let o=this.colorFn?this.colorFn(e,t,n):this.color;this.col.push(o[0],o[1],o[2]);for(let e in this.extra){let t=this.extra[e];for(let e=0;e<t.size;e++)t.data.push(t.cur[e])}return a}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,n,e,n,r)}sweep(e,t,n=[0,1,0],r=null,i=null){let a=[],o=new D,s=new D,c=new D,l=new D(...n);for(let n=0;n<e.length;n++){let u=e[Math.max(0,n-1)].c,d=e[Math.min(e.length-1,n+1)].c;e.length===1&&(u=r??e[0].c,d=i??e[0].c),o.set(d[0]-u[0],d[1]-u[1],d[2]-u[2]).normalize(),s.crossVectors(l,o),s.lengthSq()<1e-8&&s.set(1,0,0),s.normalize(),c.crossVectors(o,s).normalize();let f=e[n];a.push(this.pos.length/3);for(let e=0;e<t;e++){let n=e/t*N,r=Math.cos(n)*f.rx,i=Math.sin(n)*f.ry;this.vertex(f.c[0]+s.x*r+c.x*i,f.c[1]+s.y*r+c.y*i,f.c[2]+s.z*r+c.z*i)}}for(let n=0;n<e.length-1;n++)for(let e=0;e<t;e++){let r=(e+1)%t,i=a[n]+e,o=a[n]+r,s=a[n+1]+r,c=a[n+1]+e;this.quad(i,c,s,o)}if(r){let e=this.vertex(r[0],r[1],r[2]);for(let n=0;n<t;n++)this.tri(e,a[0]+n,a[0]+(n+1)%t)}if(i){let n=e.length-1,r=this.vertex(i[0],i[1],i[2]);for(let e=0;e<t;e++)this.tri(r,a[n]+(e+1)%t,a[n]+e)}}fan(e,t){let n=this.vertex(e[0],e[1],e[2]),r=t.map(e=>this.vertex(e[0],e[1],e[2]));for(let e=0;e<r.length-1;e++)this.tri(n,r[e],r[e+1])}build(){let e=new S;e.setAttribute(`position`,new l(this.pos,3)),e.setAttribute(`uv`,new l(this.uv,2)),e.setAttribute(`color`,new l(this.col,3));for(let t in this.extra)e.setAttribute(t,new l(this.extra[t].data,this.extra[t].size));return e.setIndex(this.idx),e.computeVertexNormals(),e.computeBoundingSphere(),e}};function te(e,t,n,r,i,a,o,s,c,l,u,d,f=d,p=d){let m=Math.hypot(a,o,s)||1;a/=m,o/=m,s/=m;let h=l*s-u*o,g=u*a-c*s,_=c*o-l*a;m=Math.hypot(h,g,_),m<1e-6&&(h=1,g=0,_=0,m=1),h/=m,g/=m,_/=m;let v=o*_-s*g,y=s*h-a*_,b=a*g-o*h,x=t*16;e[x]=h*d,e[x+1]=g*d,e[x+2]=_*d,e[x+3]=0,e[x+4]=v*f,e[x+5]=y*f,e[x+6]=b*f,e[x+7]=0,e[x+8]=a*p,e[x+9]=o*p,e[x+10]=s*p,e[x+11]=0,e[x+12]=n,e[x+13]=r,e[x+14]=i,e[x+15]=1}function V(e,t,n,r,i,a,o,s,c,l,u=l,d=l){let f=Math.hypot(a,o,s)||1;a/=f,o/=f,s/=f;let p=s,m=-a;f=Math.hypot(p,m),f<1e-6&&(p=1,m=0,f=1),p/=f,m/=f;let h=o*m,g=s*p-a*m,_=-o*p,v=Math.cos(c),y=Math.sin(c),b=h*v+p*y,x=g*v,S=_*v+m*y;te(e,t,n,r,i,a,o,s,b,x,S,l,u,d)}function H(e,t){let n=t*16;for(let t=0;t<16;t++)e[n+t]=0}function ne(e,t,n,r){let i=new w(n);return i.onBeforeCompile=t=>{t.uniforms.uTime=e.G.uTime;let n=t.vertexShader;n=n.replace(`#include <common>`,`#include <common>
uniform float uTime;
`+(r.vertexPars||``)),r.uv&&(n=n.replace(`#include <uv_vertex>`,`#include <uv_vertex>
`+r.uv)),r.color&&(n=n.replace(`#include <color_vertex>`,`#include <color_vertex>
`+r.color)),n=n.replace(`#include <beginnormal_vertex>`,`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
vec3 objectTangent = vec3( tangent.xyz );
#endif
vec3 ambPos = vec3( position );
{
`+r.deform+`
}
`),n=n.replace(`#include <begin_vertex>`,`vec3 transformed = ambPos;`),t.vertexShader=n;let i=t.fragmentShader;r.fragmentPars&&(i=i.replace(`#include <common>`,`#include <common>
`+r.fragmentPars)),r.afterMap&&(i=i.replace(`#include <map_fragment>`,`#include <map_fragment>
`+r.afterMap)),r.alphaTest&&(i=i.replace(`#include <alphatest_fragment>`,r.alphaTest)),r.afterRoughness&&(i=i.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
`+r.afterRoughness)),r.afterMetalness&&(i=i.replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
`+r.afterMetalness)),r.beforeOutput&&(i=i.replace(`#include <opaque_fragment>`,r.beforeOutput+`
#include <opaque_fragment>`)),t.fragmentShader=i},i.customProgramCacheKey=()=>`ambient-`+t,i.name=`ambient-`+t,e.patchMaterial(i),i}var U=`
vec3 ambRotX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 ambRotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 ambRotZ(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }
`,re=`
float ambBacklight(vec3 nView) {
  vec3 V = normalize(vViewPosition);
  vec3 L = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
  float b = max(dot(-V, L), 0.0);
  float b2 = b * b; float b4 = b2 * b2;
  float wrap = max(dot(-nView, L), 0.0) * 0.5 + max(dot(nView, L), 0.0) * 0.5;
  float lobe = (0.25 * b + 0.75 * b4) * (0.4 + 0.6 * wrap);
  if (lobe < 0.002) return 0.0;
  vec3 nW = normalize((vec4(nView, 0.0) * viewMatrix).xyz);
  nW *= dot(nW, uSunDir) < 0.0 ? -1.0 : 1.0;
  return lobe * lagoonSunShadow(vLagoonWorldPos, nW);
}
`;function W(e,t){let n=new y(e,t);return n.setUsage(r),n}var G=Math.PI*2,K=(e,t,n)=>e<t?t:e>n?n:e,q=(e,t,n)=>e+(t-e)*n,ie=(e,t,n)=>{let r=K((n-e)/(t-e),0,1);return r*r*(3-2*r)},J=(e,t=0,n=0)=>M(e|0,t|0,n|0),ae=(e,t)=>1-Math.exp(-e*t);function oe(e){let t=e.length,n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=Array(t-1),a=Array(t);for(let e=0;e<t-1;e++)i[e]=(r[e+1]-r[e])/(n[e+1]-n[e]);a[0]=i[0],a[t-1]=i[t-2];for(let e=1;e<t-1;e++)a[e]=i[e-1]*i[e]<=0?0:(i[e-1]+i[e])/2;for(let e=0;e<t-1;e++){if(i[e]===0){a[e]=0,a[e+1]=0;continue}let t=a[e]/i[e],n=a[e+1]/i[e],r=t*t+n*n;if(r>9){let o=3/Math.sqrt(r);a[e]=o*t*i[e],a[e+1]=o*n*i[e]}}return e=>{if(e<=n[0])return r[0];if(e>=n[t-1])return r[t-1];let i=0;for(;e>n[i+1];)i++;let o=n[i+1]-n[i],s=(e-n[i])/o,c=s*s,l=c*s;return(2*l-3*c+1)*r[i]+(l-2*c+s)*o*a[i]+(-2*l+3*c)*r[i+1]+(l-c)*o*a[i+1]}}var se=class{constructor(e={}){this.pos=[],this.uv=[],this.nrm=[],this.hasN=[],this.idx=[],this.extra={};for(let t in e)this.extra[t]={size:e[t],data:[],cur:Array(e[t]).fill(0)}}set(e,...t){let n=this.extra[e];for(let e=0;e<n.size;e++)n.cur[e]=t[e]??0;return this}vertex(e,t,n,r,i,a=null){let o=this.pos.length/3;this.pos.push(e,t,n),this.uv.push(r,i),a?(this.nrm.push(a[0],a[1],a[2]),this.hasN.push(1)):(this.nrm.push(0,0,0),this.hasN.push(0));for(let e in this.extra){let t=this.extra[e];for(let e=0;e<t.size;e++)t.data.push(t.cur[e])}return o}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,n,e,n,r)}get count(){return this.pos.length/3}build(){let e=new S;e.setAttribute(`position`,new l(this.pos,3)),e.setAttribute(`uv`,new l(this.uv,2));for(let t in this.extra)e.setAttribute(t,new l(this.extra[t].data,this.extra[t].size));e.setIndex(this.idx),e.computeVertexNormals();let t=e.attributes.normal.array;for(let e=0;e<this.hasN.length;e++)this.hasN[e]&&(t[e*3]=this.nrm[e*3],t[e*3+1]=this.nrm[e*3+1],t[e*3+2]=this.nrm[e*3+2]);return e.computeBoundingSphere(),e}};function ce(e,t,n,r,i,a,o,s,c,l,u,d){let f=Math.hypot(a,o,s)||1;a/=f,o/=f,s/=f;let p=s,m=-a;f=Math.hypot(p,m),f<1e-6&&(p=1,m=0,f=1),p/=f,m/=f;let h=o*m,g=s*p-a*m,_=-o*p,v=Math.cos(c),y=Math.sin(c),b=h*v+p*y,x=g*v,S=_*v+m*y,C=x*s-S*o,w=S*a-b*s,T=b*o-x*a;f=Math.hypot(C,w,T)||1,C/=f,w/=f,T/=f;let E=o*T-s*w,D=s*C-a*T,O=a*w-o*C,k=t*16;e[k]=C*l,e[k+1]=w*l,e[k+2]=T*l,e[k+3]=0,e[k+4]=E*u,e[k+5]=D*u,e[k+6]=O*u,e[k+7]=0,e[k+8]=a*d,e[k+9]=o*d,e[k+10]=s*d,e[k+11]=0,e[k+12]=n,e[k+13]=r,e[k+14]=i,e[k+15]=1}function le(e,t){let n=new y(e,t);return n.setUsage(r),n}var ue=[{id:`minnow`,name:`silver minnow`,blocks:[0],SL:.83,head:.22,top:[[0,.004],[.03,.018],[.08,.036],[.15,.052],[.22,.062],[.35,.072],[.5,.07],[.65,.056],[.8,.036],[.9,.025],[1,.027]],bot:[[0,-.004],[.03,-.018],[.08,-.034],[.15,-.05],[.22,-.062],[.35,-.08],[.5,-.08],[.62,-.066],[.75,-.045],[.88,-.026],[1,-.025]],width:[[0,.9],[.1,.7],[.22,.58],[.4,.5],[.7,.42],[.9,.38],[1,.32]],eye:{a:.09,y:.006,r:.021},snout:.05,mouth:{a:.05,y0:.004,dy:-.016,lips:.003},dorsal:{a0:.54,a1:.645,h:[[0,.085],[.25,.07],[.7,.036],[1,.022]],rake:30,rays:9,spines:0},anal:{a0:.62,a1:.8,h:[[0,.068],[.2,.056],[.6,.03],[1,.02]],rake:32,rays:18,spines:0},caudal:{type:`forked`,span:.088,fork:.5,rays:19},pectoral:{a:.235,yf:.24,len:.14,wid:.034,shape:`pointed`,rays:14},pelvic:{a:.47,len:.085,wid:.026,shape:`pointed`,rays:9},barbels:null,rings:30,sides:18,len:[.055,.08],cruise:2.4,burst:7.5,glideTau:.7,turn:5.5,burstCoast:[.82,1.18],avoid:[.15,.5],depth:{minWater:.45,surf:.18,floor:.12,prefBelow:[.25,1.3]},breath:2.2,pecRest:.55},{id:`pupfish`,name:`desert pupfish`,blocks:[1,2],SL:.8,head:.29,top:[[0,.028],[.05,.042],[.12,.056],[.25,.078],[.4,.104],[.52,.118],[.6,.116],[.72,.094],[.85,.07],[.93,.063],[1,.064]],bot:[[0,.006],[.03,-.02],[.08,-.05],[.15,-.078],[.25,-.1],[.35,-.11],[.46,-.114],[.58,-.106],[.72,-.082],[.85,-.062],[.93,-.056],[1,-.058]],width:[[0,1.05],[.1,.98],[.2,.86],[.35,.7],[.5,.6],[.8,.5],[1,.42]],eye:{a:.11,y:.02,r:.027},snout:.06,mouth:{a:.042,y0:.019,dy:-.022,lips:.004},dorsal:{a0:.56,a1:.745,h:[[0,.062],[.35,.084],[.7,.088],[1,.064]],rake:14,rays:11,spines:0},anal:{a0:.62,a1:.785,h:[[0,.064],[.4,.078],[.75,.074],[1,.05]],rake:12,rays:10,spines:0},caudal:{type:`rounded`,span:.118,fork:0,rays:16},pectoral:{a:.31,yf:.42,len:.125,wid:.05,shape:`rounded`,rays:15},pelvic:{a:.5,len:.05,wid:.02,shape:`rounded`,rays:6},barbels:null,rings:28,sides:16,len:[.036,.058],cruise:1.2,burst:8,glideTau:.35,turn:8,burstCoast:null,avoid:[.04,.15],depth:{minWater:.1,surf:.05,floor:.02,prefAbove:[.02,.16],maxWater:.9},breath:2.6,pecRest:.8},{id:`tilapia`,name:`tilapia`,blocks:[3,5],SL:.8,head:.34,top:[[0,.012],[.03,.04],[.08,.085],[.15,.13],[.24,.162],[.34,.176],[.46,.178],[.6,.162],[.74,.12],[.86,.078],[.93,.07],[1,.072]],bot:[[0,-.01],[.03,-.03],[.08,-.055],[.15,-.085],[.24,-.115],[.34,-.135],[.46,-.145],[.6,-.135],[.74,-.095],[.86,-.062],[.93,-.056],[1,-.06]],width:[[0,.8],[.1,.62],[.34,.48],[.5,.4],[.8,.36],[1,.3]],eye:{a:.13,y:.05,r:.025},snout:.1,mouth:{a:.085,y0:0,dy:-.012,lips:.009},dorsal:{a0:.3,a1:.93,h:[[0,.045],[.12,.072],[.58,.084],[.66,.11],[.82,.145],[.94,.13],[1,.05]],rake:[[0,22],[.6,26],[.75,42],[1,58]],rays:27,spines:15},anal:{a0:.7,a1:.92,h:[[0,.04],[.25,.07],[.45,.09],[.78,.12],[.93,.1],[1,.04]],rake:[[0,25],[.4,35],[1,55]],rays:13,spines:3},caudal:{type:`truncate`,span:.118,fork:0,rays:17},pectoral:{a:.36,yf:.4,len:.24,wid:.05,shape:`pointed`,rays:14},pelvic:{a:.385,len:.17,wid:.035,shape:`filament`,rays:6},barbels:null,rings:46,sides:30,len:[.17,.28],cruise:.9,burst:4,glideTau:1.3,turn:2.6,burstCoast:null,labriform:1.4,avoid:[.15,.6],depth:{minWater:.45,surf:.14,floor:.08,prefAbove:[.1,1.1]},breath:1.3,pecRest:.4},{id:`carp`,name:`common carp`,blocks:[4],SL:.8,head:.27,top:[[0,.01],[.03,.028],[.08,.056],[.16,.088],[.26,.115],[.4,.134],[.54,.13],[.68,.105],[.82,.066],[.92,.052],[1,.054]],bot:[[0,-.02],[.03,-.034],[.08,-.052],[.16,-.072],[.26,-.09],[.4,-.106],[.54,-.106],[.68,-.085],[.82,-.052],[.92,-.04],[1,-.044]],width:[[0,.8],[.1,.7],[.27,.62],[.45,.56],[.7,.48],[.9,.42],[1,.35]],eye:{a:.105,y:.034,r:.016},snout:.09,mouth:{a:.05,y0:-.006,dy:-.012,lips:.007},dorsal:{a0:.44,a1:.86,h:[[0,.105],[.1,.1],[.28,.058],[.6,.046],[1,.034]],rake:[[0,28],[.3,30],[1,38]],rays:20,spines:1},anal:{a0:.76,a1:.88,h:[[0,.1],[.25,.085],[.7,.045],[1,.03]],rake:30,rays:8,spines:1},caudal:{type:`forked`,span:.102,fork:.46,rays:19},pectoral:{a:.27,yf:.12,len:.13,wid:.04,shape:`pointed`,rays:16},pelvic:{a:.5,len:.1,wid:.032,shape:`rounded`,rays:9},barbels:[{a:.018,y:-.006,len:.02},{a:.042,y:-.019,len:.038}],rings:46,sides:30,len:[.42,.58],cruise:.5,burst:2.5,glideTau:2.2,turn:1.2,burstCoast:[.84,1.12],avoid:[.2,.7],depth:{minWater:1,surf:.3,floor:.06,prefAbove:[.08,.7]},breath:.8,pecRest:.45}],de=Object.fromEntries(ue.map((e,t)=>[e.id,t])),fe={body:{u0:.01,u1:.99,v0:.012,v1:.488},dorsal:{u0:.01,u1:.99,v0:.506,v1:.622},anal:{u0:.01,u1:.99,v0:.634,v1:.742},caudal:{u0:.01,u1:.99,v0:.754,v1:.87},pectoral:{u0:.012,u1:.39,v0:.882,v1:.992},pelvic:{u0:.412,u1:.738,v0:.882,v1:.992},eye:{cu:.8125,cv:.9375,r:.052},lips:{u0:.885,u1:.995,v0:.884,v1:.992}},pe=e=>Array.isArray(e)?oe(e):()=>e;function me(e,t,n=.85){if(!(t>0))return e;let r=e(t)-e(0);return i=>{let a=e(i);if(i>=t||i<=0)return a;let o=i/t,s=1-o;return a+n*r*Math.sqrt(o)*s*s}}function he(e){let t=me(oe(e.top),e.snout),n=me(oe(e.bot),e.snout),r=oe(e.width),i=e.SL,a=e=>.5-e*i,o=e=>Math.max(Math.sin(e),0)**.8*(1+.14*Math.cos(e));function s(e,i,s,c=[0,0,0]){let l=t(e),u=n(e),d=(l+u)/2,f=(l-u)/2;return c[0]=s*r(e)*f*o(i),c[1]=d-Math.cos(i)*f,c[2]=a(e),c}function c(e,r){let i=t(e),a=n(e),o=(i+a)/2,s=(i-a)/2;return Math.acos(K((o-r)/Math.max(s,1e-4),-1,1))}function l(e,r,i){let a=.001,o=s(e,r,i),c=s(e+a,r,i),l=s(e,r+a,i),u=c[0]-o[0],d=c[1]-o[1],f=c[2]-o[2],p=l[0]-o[0],m=l[1]-o[1],h=l[2]-o[2],g=d*h-f*m,_=f*p-u*h,v=u*m-d*p,y=Math.hypot(g,_,v)||1;g/=y,_/=y,v/=y;let b=(t(e)+n(e))/2;return g*o[0]+_*(o[1]-b)<0&&(g=-g,_=-_,v=-v),[g,_,v]}return{top:t,bot:n,wid:r,SL:i,zOf:a,point:s,thetaAt:c,normalAt:l}}function ge(e,t,n,r){let i=e.pos,a=e.idx,o=0;for(let e=t;e<n;e+=3){let t=a[e]*3,n=a[e+1]*3,s=a[e+2]*3,c=i[n]-i[t],l=i[n+1]-i[t+1],u=i[n+2]-i[t+2],d=i[s]-i[t],f=i[s+1]-i[t+1],p=i[s+2]-i[t+2],m=l*p-u*f,h=u*d-c*p,g=c*f-l*d,_=(i[t]+i[n]+i[s])/3,v=(i[t+1]+i[n+1]+i[s+1])/3,y=(i[t+2]+i[n+2]+i[s+2])/3,b=r(_,v,y);o+=m*(_-b[0])+h*(v-b[1])+g*(y-b[2])}if(o<0)for(let e=t;e<n;e+=3){let t=a[e+1];a[e+1]=a[e+2],a[e+2]=t}}function _e(e,t,n){let r=Math.cos(n),i=Math.sin(n),a=e[0]*t[0]+e[1]*t[1]+e[2]*t[2],o=t[1]*e[2]-t[2]*e[1],s=t[2]*e[0]-t[0]*e[2],c=t[0]*e[1]-t[1]*e[0];return[e[0]*r+o*i+t[0]*a*(1-r),e[1]*r+s*i+t[1]*a*(1-r),e[2]*r+c*i+t[2]*a*(1-r)]}var ve=e=>{let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]};function ye(e,t=1){let n=he(e),r=new se({aPart:4,aPivot:3,aAxis:3}),i=fe,a=(e,t,n)=>[e.u0+(e.u1-e.u0)*K(t,0,1),e.v0+(e.v1-e.v0)*K(n,0,1)],o=Math.max(12,Math.round(e.rings*t)),s=Math.max(10,Math.round(e.sides*t/2)*2),c=s/2,l=[];for(let e=0;e<o;e++){let t=e/(o-1);l.push(.006+.994*(.55*(.5-.5*Math.cos(Math.PI*t))+.45*t))}let u=l.map(e=>[e,1,1]).concat([[1.012,.62,.975],[1.026,.3,.945],[1.042,.08,.91]]),d=e.head,f=e.mouth||{a:.06,y0:0,dy:0},p=f.a*1.25,m=r.idx.length,h=[],g=[0,0,0];for(let[e,t,a]of u){let o=[],l=Math.min(e,1),u=(n.top(l)+n.bot(l))/2,m=e<p?n.thetaAt(e,f.y0+f.dy*Math.min(1,e/f.a)):0;for(let f=0;f<s;f++){let h=f<=c,_=Math.PI*(h?f:s-f)/c,v=f===0||f===c?0:h?1:-1;n.point(l,_,v===0?1:v,g),v===0&&(g[0]=0),e>1&&(g[0]*=t,g[1]=u+(g[1]-u)*a,g[2]=n.zOf(e));let y=0,b=ie(d-.085,d-.012,e)*(1-ie(d-.012,d+.01,e));b>0&&(y=b*Math.sin(_)**.6),e<p&&(y=-(1-e/p)*ie(0,.12*Math.PI,m-_)),r.set(`aPart`,0,v,0,y),o.push(r.vertex(g[0],g[1],g[2],i.body.u0+(i.body.u1-i.body.u0)*l,i.body.v0+(i.body.v1-i.body.v0)*(_/Math.PI)))}h.push(o)}let _=h.length;for(let e=0;e<_-1;e++)for(let t=0;t<s;t++){let n=(t+1)%s;r.quad(h[e][t],h[e][n],h[e+1][n],h[e+1][t])}r.set(`aPart`,0,0,0,0);let v=n.top(0),y=n.bot(0),b=r.vertex(0,(v+y)/2,.5,i.body.u0,(i.body.v0+i.body.v1)/2);for(let e=0;e<s;e++)r.tri(b,h[0][(e+1)%s],h[0][e]);let x=n.top(1),S=n.bot(1),C=[0,0,-1],w=r.vertex(0,(x+S)/2,n.zOf(1.05),i.body.u1,(i.body.v0+i.body.v1)/2,C),T=h[_-1].map(e=>{let t=r.pos,n=r.uv;return r.vertex(t[e*3],t[e*3+1],t[e*3+2],n[e*2],n[e*2+1],C)});for(let e=0;e<s;e++)r.tri(w,T[e],T[(e+1)%s]);ge(r,m,r.idx.length,(e,t,r)=>{let i=K((.5-r)/n.SL,0,1);return[0,(n.top(i)+n.bot(i))/2,r]});function E(e,o){let s=oe(e.h),c=pe(e.rake),l=e.spines>1?e.spines/e.rays:0,u=[];if(l>0)for(let t=0;t<e.spines;t++){let n=t/e.spines*l;u.push({t:n,k:1}),u.push({t:n+.5*l/e.spines,k:.8})}let d=Math.max(5,Math.round((e.rays-(e.spines>1?e.spines:0))*.6*t));for(let e=0;e<=d;e++)u.push({t:l+(1-l)*(e/d),k:1});let f=[];for(let t of u){let l=q(e.a0,e.a1,t.t),u=n.zOf(l),d=o?n.top(l):n.bot(l),p=.22*(n.top(l)-n.bot(l))*.5*n.wid(l)+.004,m=d+(o?-p:p),h=s(t.t)*t.k+p,g=c(t.t)*Math.PI/180,_=(o?1:-1)*Math.cos(g),v=-Math.sin(g),y=[];for(let e=0;e<=3;e++){let n=e/3,s=m+_*h*n,c=u+v*h*n,l=K((h*n-p)/Math.max(h-p,1e-4),0,1);r.set(`aPart`,1,0,l,0);let d=a(o?i.dorsal:i.anal,t.t,l);y.push(r.vertex(0,s,c,d[0],d[1]))}f.push(y)}for(let e=0;e<f.length-1;e++)for(let t=0;t<3;t++)r.quad(f[e][t],f[e+1][t],f[e+1][t+1],f[e][t+1])}E(e.dorsal,!0),E(e.anal,!1);{let o=e.caudal,s=n.zOf(1)+.014,c=(x+S)/2,l=(x-S)/2*.9,u=s- -.5,d=Math.max(10,Math.round(o.rays*.8*t)),f=[];for(let e=0;e<=d;e++){let t=-1+2*e/d,n=Math.abs(t),p,m;o.type===`forked`?(p=1-o.fork*(1-n)**1.15,n>.9&&(p-=.05*((n-.9)/.1)**2),m=c*.6+t*o.span*(1-.06*(1-n))):o.type===`truncate`?(p=.96+.04*(1-t*t)-.06*n**8,m=c*.6+t*o.span):(p=.7+.3*Math.cos(t*Math.PI*.5),m=c*.6+Math.sin(t*Math.PI*.5)*o.span*.95);let h=o.type===`rounded`?.6:.35,g=[];for(let e=0;e<=5;e++){let n=e/5,o=1-(1-n)*(1-n),d=q(c+t*l,m,q(n,o,h)),f=s-u*p*n;r.set(`aPart`,1,0,n,0);let _=a(i.caudal,(t+1)/2,n);g.push(r.vertex(0,d,f,_[0],_[1]))}f.push(g)}for(let e=0;e<d;e++)for(let t=0;t<5;t++)r.quad(f[e][t],f[e+1][t],f[e+1][t+1],f[e][t+1])}function D(a,o,s){let c=o===2?i.pectoral:i.pelvic,l=a.a,u,d,f,p;if(o===2){let t=n.bot(l)+a.yf*(n.top(l)-n.bot(l)),r=n.thetaAt(l,t);u=n.point(l,r,s);let i=n.normalAt(l,r,s);u=[u[0]-i[0]*.003,u[1]-i[1]*.003,u[2]-i[2]*.003],d=ve([0,1,e.id===`tilapia`?.22:.5]),f=ve([s*.06,-.2,-1]),p=e.pecRest}else{let e=.16*Math.PI;u=n.point(l,e,s),d=ve([0,.35,1]),f=ve([s*.05,-.28,-1]),p=.42}let m=_e(f,d,-s*p),h=Math.max(4,Math.round((o===2?6:4)*t)),g=o===2?.42:.3,_=ve([d[1]*m[2]-d[2]*m[1],d[2]*m[0]-d[0]*m[2],d[0]*m[1]-d[1]*m[0]]),v=[];for(let e=0;e<=h;e++){let t=e/h,n;n=a.shape===`pointed`?t<.12?.86+t*1.1:1-.62*((t-.12)/.88)**1.1:a.shape===`filament`?t<.1?1:.7-.28*((t-.1)/.9):.62+.38*Math.sin(Math.PI*(.15+.7*t)),n*=a.len;let i=_e(m,_,(t-.35)*g*-1),l=[u[0]+d[0]*(.5-t)*a.wid,u[1]+d[1]*(.5-t)*a.wid,u[2]+d[2]*(.5-t)*a.wid],f=[];for(let e=0;e<=4;e++){let m=e/4,h=.08*m*m*n,g=l[0]+i[0]*n*m,_=l[1]+i[1]*n*m-h,v=l[2]+i[2]*n*m;r.set(`aPart`,o,s,m,p),r.set(`aPivot`,u[0],u[1],u[2]),r.set(`aAxis`,d[0],d[1],d[2]),f.push(r.vertex(g,_,v,c.u0+(c.u1-c.u0)*(m*(n/a.len)),c.v0+(c.v1-c.v0)*t))}v.push(f)}for(let e=0;e<h;e++)for(let t=0;t<4;t++)r.quad(v[e][t],v[e+1][t],v[e+1][t+1],v[e][t+1]);r.set(`aPivot`,0,0,0),r.set(`aAxis`,0,0,0)}for(let t of[1,-1])D(e.pectoral,2,t),D(e.pelvic,3,t);for(let a of[1,-1]){let o=e.eye,s=n.thetaAt(o.a,o.y),c=n.point(o.a,s,a),l=n.normalAt(o.a,s,a);l=ve([l[0],l[1]*.7,l[2]+.12]);let u=[0,1,0],d=ve([u[1]*l[2]-u[2]*l[1],u[2]*l[0]-u[0]*l[2],u[0]*l[1]-u[1]*l[0]]),f=ve([l[1]*d[2]-l[2]*d[1],l[2]*d[0]-l[0]*d[2],l[0]*d[1]-l[1]*d[0]]),p=o.r,m=.34*p,h=.16*p,g=Math.max(10,Math.round(14*t)),_=r.idx.length;r.set(`aPart`,4,a,0,0);let v=r.vertex(c[0]+l[0]*(m-h),c[1]+l[1]*(m-h),c[2]+l[2]*(m-h),i.eye.cu,i.eye.cv),y=[];for(let e=1;e<=5;e++){let t=e<=4?e/4:1.12,n=e<=4?m*Math.sqrt(Math.max(0,1-t*t))-h:-h-.25*p,o=[];for(let e=0;e<g;e++){let s=e/g*Math.PI*2,u=Math.cos(s)*t*p,m=Math.sin(s)*t*p,h=c[0]+d[0]*u+f[0]*m+l[0]*n,_=c[1]+d[1]*u+f[1]*m+l[1]*n,v=c[2]+d[2]*u+f[2]*m+l[2]*n,y=Math.min(t,1.05);o.push(r.vertex(h,_,v,i.eye.cu+Math.cos(s)*y*i.eye.r*a,i.eye.cv+Math.sin(s)*y*i.eye.r))}y.push(o)}for(let e=0;e<g;e++)r.tri(v,y[0][e],y[0][(e+1)%g]);for(let e=0;e<y.length-1;e++)for(let t=0;t<g;t++){let n=(t+1)%g;r.quad(y[e][t],y[e+1][t],y[e+1][n],y[e][n])}let b=[c[0]-l[0]*p,c[1]-l[1]*p,c[2]-l[2]*p];ge(r,_,r.idx.length,()=>b)}if(e.barbels)for(let t of e.barbels)for(let e of[1,-1]){let a=n.thetaAt(t.a,t.y),o=n.point(t.a,a,e),s=ve([e*.3,-.82,t.a<.03?.25:-.45]),c=r.idx.length,l=[],u=[];for(let n=0;n<=5;n++){let a=n/5,c=t.len*a,d=[o[0]+s[0]*c,o[1]+s[1]*c-.25*c*a,o[2]+s[2]*c-.2*c*a];u.push(d);let f=q(.0032,.0012,a),p=[];for(let t=0;t<4;t++){let n=t/4*Math.PI*2;r.set(`aPart`,5,e,a,0),p.push(r.vertex(d[0]+Math.cos(n)*f,d[1],d[2]+Math.sin(n)*f,i.lips.u0+(i.lips.u1-i.lips.u0)*a,i.lips.v0+(i.lips.v1-i.lips.v0)*(t/4)))}l.push(p)}for(let e=0;e<5;e++)for(let t=0;t<4;t++){let n=(t+1)%4;r.quad(l[e][t],l[e+1][t],l[e+1][n],l[e][n])}ge(r,c,r.idx.length,(e,t,n)=>{let r=u[0],i=1e9;for(let a of u){let o=(a[0]-e)**2+(a[1]-t)**2+(a[2]-n)**2;o<i&&(i=o,r=a)}return r})}let O=r.build();return O.userData.fishShape=n,O}var Y=e=>Number.isInteger(e)?e.toFixed(1):String(+e.toFixed(5));function be(e,t){let n=`float ${e}(float t) {\n  if (t <= ${Y(t[0][0])}) return ${Y(t[0][1])};\n`;for(let e=1;e<t.length;e++){let[r,i]=t[e-1],[a,o]=t[e];n+=`  if (t <= ${Y(a)}) return mix(${Y(i)}, ${Y(o)}, (t - ${Y(r)}) / ${Y(Math.max(a-r,1e-4))});\n`}return n+`  return ${Y(t[t.length-1][1])};\n}\n`}function xe(){let e=``;return ue.forEach((t,n)=>{let r=he(t),i=r.thetaAt(t.eye.a,t.eye.y)/Math.PI;e+=`const float HL${n} = ${Y(t.head)};\n`,e+=`const vec2 EYE${n} = vec2(${Y(t.eye.a)}, ${Y(i)});\n`,e+=`const float EYER${n} = ${Y(t.eye.r)};\n`,e+=`const float DSP${n} = ${Y(t.dorsal.spines>1?t.dorsal.spines/t.dorsal.rays:t.dorsal.spines===1?.05:0)};\n`,e+=`const float ASP${n} = ${Y(t.anal.spines>1?t.anal.spines/t.anal.rays:t.anal.spines===1?.08:0)};\n`,e+=`const float DRAYS${n} = ${Y(t.dorsal.rays)}; const float ARAYS${n} = ${Y(t.anal.rays)}; const float CRAYS${n} = ${Y(t.caudal.rays)};\n`,e+=`const float PRAYS${n} = ${Y(t.pectoral.rays)}; const float VRAYS${n} = ${Y(t.pelvic.rays)};\n`;let a=t.mouth||{a:.05,y0:0,dy:0,lips:.004},o=r.top(0),s=r.bot(0),c=Math.min(Math.max(a.y0,s+.001),o-.001),l=[],u=[];for(let e=0;e<=8;e++){let t=Math.max(.002,e/8*a.a),n=c+a.dy*(e/8),i=r.thetaAt(t,n),o=Math.max((r.top(t)-r.bot(t))/2,1e-4);l.push([t,i/Math.PI]),u.push([t,a.lips/(Math.PI*o*Math.max(Math.sin(i),.35))])}e+=`const float RIC${n} = ${Y(a.a)};\n`,e+=be(`mouthUp${n}`,l),e+=be(`lipW${n}`,u)}),e}var X=fe;function Se(e){return`
#define BLK ${e}
uniform float uMode;
varying vec2 vUv;
const float PI = 3.14159265;

${xe()}

// ---- local noise (independent of the shared baker helpers)
float fh12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float fvn(vec2 x) {
  vec2 i = floor(x), fr = fract(x);
  vec2 u = fr * fr * (3.0 - 2.0 * fr);
  return mix(mix(fh12(i), fh12(i + vec2(1.0, 0.0)), u.x), mix(fh12(i + vec2(0.0, 1.0)), fh12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float ffbm(vec2 p) { return 0.5 * fvn(p) + 0.3 * fvn(p * 2.03 + 7.1) + 0.2 * fvn(p * 4.1 + 3.3); }
float band(float x, float c, float w) { float q = (x - c) / w; return exp(-q * q); }
float sstep(float e0, float e1, float x) { return smoothstep(e0, e1, x); }

struct Px { vec3 col; float a; float h; float rough; float metal; };
Px px(vec3 c, float a, float h, float r, float m) { Px o; o.col = c; o.a = a; o.h = h; o.rough = r; o.metal = m; return o; }

// imbricate scales. p.x toward the tail, p.y around (rows).
// returns (height 0..1, free-margin 0..1, per-scale random, radial distance 0..1)
vec4 scales(vec2 p) {
  float bestX = 1e9; vec2 bd = vec2(0.0); float bid = 0.0;
  float r0 = floor(p.y);
  for (int j = -1; j <= 1; j++) {
    float r = r0 + float(j);
    float off = 0.5 * mod(r, 2.0);
    float c0 = floor(p.x - off);
    for (int i = -1; i <= 1; i++) {
      vec2 c = vec2(c0 + float(i) + off, r + 0.5);
      // slight per-scale jitter so the lattice never reads as a printed net
      c += (vec2(fh12(c * 1.31 + 5.0), fh12(c * 2.17 + 9.0)) - 0.5) * vec2(0.08, 0.06);
      vec2 d = p - c;
      float dd = length(d * vec2(1.0, 0.92));
      if (dd < 0.8 && c.x < bestX) { bestX = c.x; bd = d; bid = fh12(floor(c * 4.0) * vec2(1.7, 3.1) + 11.0); }
    }
  }
  float dd = length(bd * vec2(1.0, 0.92)) / 0.8;
  // each scale emerges from under its anterior neighbour and rises gently to its
  // free margin (small step at the margin: overlapping, not terraced)
  float h = 0.38 + 0.26 * smoothstep(-0.5, 0.9, bd.x / 0.8);
  // each scale sits at its own slight tilt: neighbouring scales catch the light
  // differently (the glitter of a silvery flank)
  float ta = bid * 6.2831853;
  h += 0.12 * dot(bd, vec2(cos(ta), sin(ta)));
  h = mix(h, 0.4, smoothstep(0.86, 1.0, dd));
  // fine circuli (growth rings) on the exposed field
  h += 0.018 * sin(dd * 46.0) * smoothstep(0.25, 0.6, dd);
  float margin = smoothstep(0.62, 0.97, dd) * step(-0.2, bd.x);
  return vec4(clamp(h, 0.0, 1.0), margin, bid, dd);
}

// gill-cover (opercle) margin: curves forward toward the top and bottom
float opA(float up, float HL) { float q = 2.0 * up - 1.0; return HL - 0.055 * q * q; }
float opLine(float a, float up, float HL) {
  float ln = 1.0 - smoothstep(0.0012, 0.0045, abs(a - opA(up, HL)));
  return ln * smoothstep(0.06, 0.16, up) * (1.0 - smoothstep(0.8, 0.92, up));
}
// soft shadow just behind the gill-cover margin (the membrane edge overlaps the flank)
float opShade(float a, float up, float HL) {
  float d = a - opA(up, HL);
  return smoothstep(0.0, 0.004, d) * (1.0 - smoothstep(0.004, 0.02, d)) * smoothstep(0.06, 0.16, up) * (1.0 - smoothstep(0.8, 0.92, up));
}
float preLine(float a, float up, float HL) {
  float apr = HL - 0.07 - 0.03 * (up - 0.35);
  return (1.0 - smoothstep(0.001, 0.004, abs(a - apr))) * smoothstep(0.1, 0.25, up) * (1.0 - smoothstep(0.55, 0.7, up));
}
// scaled body behind the gill cover (1) vs head (0)
float bodyMask(float a, float up, float HL) { return smoothstep(-0.002, 0.006, a - opA(up, HL)); }
// dark rim of the orbit (upper half mostly)
float orbit(float a, float up, vec2 E, float r) {
  float d = length(vec2((a - E.x), (up - E.y) * 0.3));
  return (1.0 - smoothstep(r * 1.0, r * 1.7, d)) * smoothstep(-0.02, 0.04, up - E.y + 0.02);
}
// nostrils: two small dark pits in front of the eye
float nares(float a, float up, vec2 E, float r) {
  vec2 q = vec2(a - (E.x - 2.2 * r), (up - (E.y + 0.01)) * 0.3);
  return 1.0 - smoothstep(r * 0.18, r * 0.34, length(q));
}

// mouth: returns (cleft 0..1, lips 0..1)
vec2 mouthAt(float a, float up, float ric, float mu, float lw) {
  float inside = 1.0 - smoothstep(ric * 0.9, ric * 1.02, a);
  float d = abs(up - mu);
  float cleft = (1.0 - smoothstep(0.18 * lw, 0.45 * lw, d)) * inside;
  float lips = (1.0 - smoothstep(0.7 * lw, 1.25 * lw, d)) * (1.0 - smoothstep(ric * 0.95, ric * 1.15, a));
  return vec2(cleft, lips);
}

// pored lateral-line scales: a dotted line (one pore per scale)
float llPores(float up, float llUp, vec4 sc) {
  float on = 1.0 - smoothstep(0.012, 0.02, abs(up - llUp));
  return on * (1.0 - smoothstep(0.12, 0.3, sc.w));
}

// ============================================================ bodies
#if BLK == 0
// silver minnow (bleak-like): blue-green back, brilliant silver flanks, white belly
Px bodyMinnow(float a, float up) {
  float HL = HL0;
  float sm = bodyMask(a, up, HL);
  vec4 sc = scales(vec2((a - HL) / (1.0 - HL) * 46.0, up * 15.0));
  float n = ffbm(vec2(a * 30.0, up * 8.0));
  float tBack = smoothstep(0.7, 0.8, up + 0.015 * sin(a * 37.0) + 0.02 * (n - 0.5));
  vec3 belly = vec3(0.86, 0.86, 0.84), flank = vec3(0.84, 0.86, 0.88), back = vec3(0.05, 0.085, 0.085);
  vec3 c = mix(belly, flank, smoothstep(0.12, 0.3, up));
  // metallic blue-green sheen at the back/flank boundary
  c = mix(c, vec3(0.3, 0.46, 0.48), 0.55 * band(up, 0.7, 0.04));
  c = mix(c, back, tBack);
  c = mix(c, back * 0.7, smoothstep(0.93, 1.0, up));
  float metal = mix(0.72, 0.93, smoothstep(0.12, 0.3, up));
  metal = mix(metal, 0.62, band(up, 0.7, 0.04));
  metal = mix(metal, 0.12, tBack);
  float rough = mix(0.22, 0.14, smoothstep(0.1, 0.35, up));
  rough = mix(rough, 0.34, tBack);
  // scale glitter: per-scale reflectance, faintly darker pockets
  c *= mix(1.0, 0.94 + 0.12 * sc.z - 0.06 * sc.y, sm);
  metal = clamp(metal + sm * 0.06 * (sc.z - 0.5) * (1.0 - tBack), 0.0, 1.0);
  rough = clamp(rough + sm * 0.05 * (0.5 - sc.z), 0.05, 1.0);
  // back scales show dark pocket margins
  c *= 1.0 - sm * tBack * 0.3 * sc.y;
  // lateral line: curves down toward the belly (bleak), pored scales
  float s01 = clamp((a - HL) / (1.0 - HL), 0.0, 1.0);
  float llUp = 0.42 - 0.08 * sin(PI * s01) + 0.06 * smoothstep(0.75, 1.0, a);
  c *= 1.0 - 0.45 * sm * llPores(up, llUp, sc);
  // head: silver cheek and gill cover, dark crown, dusky snout tip
  float head = 1.0 - sm;
  vec3 hc = mix(vec3(0.8, 0.81, 0.8), vec3(0.3, 0.44, 0.45), 0.5 * band(up, 0.68, 0.05));
  hc = mix(hc, back, smoothstep(0.68, 0.8, up));
  hc *= 1.0 - 0.35 * (1.0 - smoothstep(0.0, 0.05, a)) * smoothstep(0.4, 0.7, up);
  c = mix(c, hc, head);
  metal = mix(metal, mix(0.9, 0.12, smoothstep(0.68, 0.8, up)), head);
  rough = mix(rough, mix(0.13, 0.34, smoothstep(0.68, 0.8, up)), head);
  // gill cover, preopercle, orbit, nostrils, mouth
  c *= 1.0 - 0.28 * opLine(a, up, HL) - 0.18 * opShade(a, up, HL);
  c *= 1.0 - 0.12 * preLine(a, up, HL);
  c *= 1.0 - 0.3 * orbit(a, up, EYE0, EYER0);
  c *= 1.0 - 0.5 * nares(a, up, EYE0, EYER0);
  vec2 mo = mouthAt(a, up, RIC0, mouthUp0(a), lipW0(a));
  c = mix(c, vec3(0.62, 0.6, 0.56), 0.5 * mo.y);
  c = mix(c, vec3(0.02, 0.02, 0.02), mo.x);
  metal *= 1.0 - 0.8 * max(mo.x, 0.6 * mo.y);
  float h = mix(0.5 + 0.02 * ffbm(vec2(a, up) * 90.0), sc.x, sm) + 0.2 * opLine(a, up, HL) - 0.25 * mo.x + 0.08 * mo.y;
  return px(c, 1.0, h, rough, metal);
}
#endif

#if BLK == 1 || BLK == 2
// desert pupfish (Aphanius): males silvery-blue with dark bars, females olive with blotches
Px bodyPupfish(float a, float up, bool male) {
  float HL = HL1;
  float sm = bodyMask(a, up, HL);
  vec4 sc = scales(vec2((a - HL * 0.6) / (1.0 - HL * 0.6) * 27.0, up * 11.0));
  float n = ffbm(vec2(a * 24.0, up * 9.0));
  float tBack = smoothstep(0.68, 0.86, up + 0.06 * (n - 0.5));
  vec3 c, back, belly;
  float metal, rough = 0.28;
  if (male) {
    back = vec3(0.075, 0.08, 0.06); belly = vec3(0.7, 0.7, 0.62);
    c = mix(belly, vec3(0.42, 0.5, 0.6), smoothstep(0.1, 0.34, up));
    c = mix(c, back, tBack);
    // 10-12 narrow dark vertical bars, irregular edges, fading toward the belly
    float x = (a - HL * 0.9) / (0.97 - HL * 0.9) * 11.0 + 0.3 * (ffbm(vec2(up * 7.0, a * 3.0)) - 0.5);
    float bar = (1.0 - smoothstep(0.12, 0.26, abs(fract(x) - 0.5))) * step(0.0, x) * step(x, 11.0);
    bar *= smoothstep(0.12, 0.32, up) * (1.0 - 0.4 * tBack);
    c = mix(c, vec3(0.05, 0.06, 0.08), 0.62 * bar);
    // pearly blue-white scale centres between the bars
    float spangle = smoothstep(0.45, 0.8, sc.z) * (1.0 - sc.w) * (1.0 - bar) * smoothstep(0.22, 0.4, up) * (1.0 - tBack) * sm;
    c = mix(c, vec3(0.62, 0.76, 0.92), 0.5 * spangle);
    metal = mix(0.4, 0.6, smoothstep(0.1, 0.4, up)) * (1.0 - 0.6 * bar);
    metal = mix(metal, 0.1, tBack);
  } else {
    back = vec3(0.12, 0.11, 0.07); belly = vec3(0.66, 0.62, 0.5);
    c = mix(belly, vec3(0.38, 0.35, 0.26), smoothstep(0.1, 0.36, up));
    c = mix(c, back, tBack);
    // a midlateral row of dark blotches + fine speckling above
    float x = (a - HL) / (1.0 - HL) * 9.0;
    float cy = 0.5 + 0.05 * sin(floor(x) * 2.1);
    float bl = 1.0 - smoothstep(0.16, 0.4, length(vec2(fract(x) - 0.5, (up - cy) * 4.0)));
    bl *= sm * step(0.0, x);
    float spots = smoothstep(0.7, 0.8, fvn(vec2(a * 70.0, up * 20.0))) * smoothstep(0.3, 0.6, up);
    c = mix(c, vec3(0.06, 0.055, 0.035), 0.7 * bl + 0.35 * spots);
    metal = mix(0.2, 0.32, smoothstep(0.1, 0.4, up));
    metal = mix(metal, 0.06, tBack);
  }
  c *= mix(1.0, 0.93 + 0.12 * sc.z - 0.08 * sc.y, sm);
  c *= 1.0 - 0.08 * (n - 0.5);
  // scaled crown and cheeks (small scales), smooth snout; pores on the head only
  float head = 1.0 - sm;
  vec3 hc = mix(male ? vec3(0.46, 0.52, 0.6) : vec3(0.42, 0.38, 0.28), belly, 1.0 - smoothstep(0.08, 0.26, up));
  hc = mix(hc, back, smoothstep(0.62, 0.82, up));
  c = mix(c, hc, head);
  metal = mix(metal, male ? 0.45 : 0.22, head * (1.0 - tBack));
  c *= 1.0 - 0.3 * opLine(a, up, HL) - 0.15 * opShade(a, up, HL);
  c *= 1.0 - 0.3 * orbit(a, up, EYE1, EYER1);
  c *= 1.0 - 0.5 * nares(a, up, EYE1, EYER1);
  vec2 mo = mouthAt(a, up, RIC1, mouthUp1(a), lipW1(a));
  c = mix(c, male ? vec3(0.5, 0.52, 0.52) : vec3(0.5, 0.45, 0.36), 0.5 * mo.y);
  c = mix(c, vec3(0.02), mo.x);
  metal *= 1.0 - 0.8 * max(mo.x, 0.6 * mo.y);
  float h = mix(0.5 + 0.03 * ffbm(vec2(a, up) * 80.0), sc.x, max(sm, 0.5 * smoothstep(0.1, 0.2, a))) + 0.2 * opLine(a, up, HL) - 0.25 * mo.x + 0.08 * mo.y;
  return px(c, 1.0, h, rough, metal);
}
#endif

#if BLK == 3 || BLK == 5
// tilapia: T. zillii (olive, faint bars, red throat, iridescent cheek) /
// O. aureus (metallic blue-grey, pale belly)
Px bodyTilapia(float a, float up, bool zillii) {
  float HL = HL2;
  float sm = bodyMask(a, up, HL);
  vec4 sc = scales(vec2((a - HL) / (1.0 - HL) * 31.0, up * 14.0));
  float n = ffbm(vec2(a * 18.0, up * 7.0));
  float tBack = smoothstep(0.72, 0.9, up + 0.05 * (n - 0.5));
  vec3 back, flank, belly;
  if (zillii) { back = vec3(0.06, 0.075, 0.045); flank = vec3(0.3, 0.32, 0.19); belly = vec3(0.66, 0.6, 0.42); }
  else { back = vec3(0.07, 0.09, 0.1); flank = vec3(0.4, 0.45, 0.48); belly = vec3(0.76, 0.76, 0.72); }
  vec3 c = mix(belly, flank, smoothstep(0.12, 0.38, up));
  c = mix(c, back, tBack);
  if (zillii) {
    // red-flushed throat and chest (redbelly tilapia)
    float red = (1.0 - smoothstep(0.12, 0.3, up)) * smoothstep(0.03, 0.12, a) * (1.0 - smoothstep(0.42, 0.66, a));
    c = mix(c, vec3(0.5, 0.16, 0.1), 0.75 * red);
  }
  // 6-7 faint vertical bars and a midlateral row of blotches
  float x = (a - HL) / (0.96 - HL) * 6.5 + 0.15 * (n - 0.5);
  float bar = (1.0 - smoothstep(0.18, 0.36, abs(fract(x) - 0.5))) * step(0.0, x) * smoothstep(0.25, 0.5, up);
  c *= 1.0 - (zillii ? 0.3 : 0.16) * bar;
  float blot = (1.0 - smoothstep(0.18, 0.4, length(vec2(fract(x + 0.5) - 0.5, (up - 0.56) * 3.2)))) * step(0.0, x);
  c *= 1.0 - (zillii ? 0.22 : 0.1) * blot * sm;
  // ctenoid scales: pale pearly centres, darker pocket margins
  float pearl = (1.0 - smoothstep(0.1, 0.55, sc.w)) * smoothstep(0.2, 0.45, up) * (1.0 - tBack);
  c = mix(c, zillii ? vec3(0.52, 0.58, 0.44) : vec3(0.62, 0.7, 0.74), sm * 0.3 * pearl * (0.6 + 0.4 * sc.z));
  c *= mix(1.0, 1.0 - 0.28 * sc.y, sm);
  c *= mix(1.0, 0.95 + 0.1 * sc.z, sm);
  float metal = mix(0.22, zillii ? 0.34 : 0.48, smoothstep(0.15, 0.45, up)) * (1.0 - tBack * 0.6);
  metal += sm * 0.1 * pearl;
  float rough = 0.3 - 0.06 * sm * pearl;
  // interrupted lateral line: upper arm high under the dorsal, lower arm mid-flank
  float llU = llPores(up, 0.79 - 0.03 * (a - HL), sc) * step(HL, a) * (1.0 - step(0.76, a));
  float llL = llPores(up, 0.52, sc) * step(0.7, a);
  c *= 1.0 - 0.45 * sm * (llU + llL);
  // head: scaled cheek with iridescent blue-green spots, dark opercular spot
  float head = 1.0 - sm;
  vec3 hc = mix(mix(belly, flank, smoothstep(0.1, 0.45, up)), back, smoothstep(0.66, 0.86, up));
  if (zillii) hc = mix(hc, vec3(0.45, 0.2, 0.12), 0.4 * (1.0 - smoothstep(0.1, 0.3, up)) * smoothstep(0.06, 0.2, a));
  vec4 ck = scales(vec2(a * 70.0, up * 24.0));
  float cheek = smoothstep(0.13, 0.19, a) * smoothstep(0.18, 0.28, up) * (1.0 - smoothstep(0.58, 0.66, up));
  hc *= 1.0 - 0.14 * cheek * ck.y;
  float irid = cheek * smoothstep(0.55, 0.7, fvn(vec2(a * 150.0, up * 42.0)));
  irid = max(irid, 0.6 * band(up, 0.34 + 1.2 * (a - 0.1), 0.02) * smoothstep(0.06, 0.1, a) * (1.0 - smoothstep(HL - 0.06, HL - 0.02, a)));
  hc = mix(hc, zillii ? vec3(0.1, 0.34, 0.3) : vec3(0.18, 0.34, 0.44), 0.6 * irid);
  float opSpot = 1.0 - smoothstep(0.012, 0.02, length(vec2(a - (HL - 0.028), (up - 0.64) * 0.55)));
  hc = mix(hc, vec3(0.012, 0.014, 0.014), (zillii ? 0.9 : 0.55) * opSpot);
  c = mix(c, hc, head);
  metal = mix(metal, 0.22 + 0.35 * irid, head * (1.0 - tBack));
  c *= 1.0 - 0.3 * opLine(a, up, HL) - 0.18 * opShade(a, up, HL);
  c *= 1.0 - 0.18 * preLine(a, up, HL);
  c *= 1.0 - 0.35 * orbit(a, up, EYE2, EYER2);
  c *= 1.0 - 0.55 * nares(a, up, EYE2, EYER2);
  // thick lips
  vec2 mo = mouthAt(a, up, RIC2, mouthUp2(a), lipW2(a));
  c = mix(c, zillii ? vec3(0.42, 0.34, 0.27) : vec3(0.44, 0.44, 0.45), 0.75 * mo.y);
  c = mix(c, vec3(0.02), mo.x);
  metal *= 1.0 - 0.8 * max(mo.x, mo.y);
  rough = mix(rough, 0.42, mo.y);
  float h = mix(0.5 + 0.18 * cheek * ck.x, sc.x, sm) + 0.2 * opLine(a, up, HL) - 0.3 * mo.x + 0.18 * mo.y;
  return px(c, 1.0, h, rough, metal);
}
#endif

#if BLK == 4
// wild common carp: olive-bronze back, brassy-golden flanks with reticulated
// scale pockets, yellow-cream belly
Px bodyCarp(float a, float up) {
  float HL = HL3;
  float sm = bodyMask(a, up, HL);
  vec4 sc = scales(vec2((a - HL) / (1.0 - HL) * 36.0, up * 12.0));
  float n = ffbm(vec2(a * 14.0, up * 6.0));
  float tBack = smoothstep(0.66, 0.9, up + 0.06 * (n - 0.5));
  vec3 belly = vec3(0.72, 0.64, 0.42), flank = vec3(0.5, 0.38, 0.16), back = vec3(0.08, 0.075, 0.035);
  vec3 c = mix(belly, flank, smoothstep(0.12, 0.42, up));
  c = mix(c, back, tBack);
  // reticulation: darker pigment in every scale pocket (strongest on the back)
  float ret = sc.y * smoothstep(0.15, 0.55, up);
  c *= mix(1.0, 1.0 - 0.32 * ret - 0.12 * ret * tBack, sm);
  // brassy scale centres, per-scale reflectance
  c = mix(c, c * vec3(1.18, 1.1, 0.9), sm * 0.35 * (1.0 - smoothstep(0.1, 0.6, sc.w)) * (1.0 - tBack));
  c *= mix(1.0, 0.93 + 0.12 * sc.z, sm);
  float metal = mix(0.3, 0.5, smoothstep(0.15, 0.5, up)) * (1.0 - 0.7 * tBack) * mix(1.0, 1.0 - 0.35 * sc.y, sm);
  float rough = 0.3 + 0.04 * sm * (sc.z - 0.5);
  float llUp = 0.47 + 0.03 * sin(PI * a);
  c *= 1.0 - 0.4 * sm * llPores(up, llUp, sc) * step(HL, a);
  // head: bronze-gold gill cover, olive crown, darker snout
  float head = 1.0 - sm;
  vec3 hc = mix(mix(belly, vec3(0.52, 0.4, 0.2), smoothstep(0.1, 0.4, up)), back, smoothstep(0.58, 0.84, up));
  hc *= 0.93 + 0.14 * ffbm(vec2(a * 60.0, up * 20.0));
  hc *= 1.0 - 0.2 * (1.0 - smoothstep(0.0, 0.06, a));
  // match the mean tone of the reticulated flank so the head never reads as a cap
  hc *= 1.0 - 0.12 * smoothstep(0.15, 0.55, up);
  c = mix(c, hc, head);
  metal = mix(metal, mix(0.42, 0.1, smoothstep(0.58, 0.84, up)), head);
  c *= 1.0 - 0.3 * opLine(a, up, HL) - 0.18 * opShade(a, up, HL);
  c *= 1.0 - 0.18 * preLine(a, up, HL);
  c *= 1.0 - 0.3 * orbit(a, up, EYE3, EYER3);
  c *= 1.0 - 0.55 * nares(a, up, EYE3, EYER3);
  // fleshy protrusible lips
  vec2 mo = mouthAt(a, up, RIC3, mouthUp3(a), lipW3(a));
  c = mix(c, vec3(0.5, 0.38, 0.26), 0.7 * mo.y);
  c = mix(c, vec3(0.03, 0.02, 0.015), mo.x);
  metal *= 1.0 - 0.85 * max(mo.x, mo.y);
  rough = mix(rough, 0.45, mo.y);
  float h = mix(0.5 + 0.03 * ffbm(vec2(a, up) * 70.0), sc.x, sm) + 0.2 * opLine(a, up, HL) - 0.3 * mo.x + 0.18 * mo.y;
  return px(c, 1.0, h, rough, metal);
}
#endif

// ============================================================ fins
// thin rays: t across the fin (ray index = t * n), s along the ray; soft rays
// branch in two beyond "split" and are segmented. Returns (ray 0..1, joint 0..1)
vec2 rays(float t, float s, float n, float split) {
  float rt = t * n;
  float r1 = 1.0 - smoothstep(0.035, 0.11, abs(fract(rt) - 0.5));
  // branches diverge gradually from the parent ray toward the margin
  float k = smoothstep(split - 0.1, split + 0.15, s);
  float off = 0.18 * k;
  float fr = fract(rt);
  float r2 = max(1.0 - smoothstep(0.025, 0.085, abs(fr - 0.5 - off)), 1.0 - smoothstep(0.025, 0.085, abs(fr - 0.5 + off)));
  float r = mix(r1, 0.9 * r2, k);
  float seg = smoothstep(0.86, 1.0, abs(sin(s * 44.0 + fh12(vec2(floor(rt), 3.0)) * 6.0))) * r;
  return vec2(r, seg);
}

// kind: 0 dorsal, 1 anal, 2 caudal, 3 pectoral, 4 pelvic
Px fin(int blk, int kind, float t, float s) {
  float n, sp = 0.0, membraneA = 0.6, split = 0.55;
  vec3 mem = vec3(0.3), rayC = vec3(0.3), edge = vec3(0.3), root = vec3(0.3);
  float edgeAmt = 0.0;
  int spc = blk == 0 ? 0 : (blk <= 2 ? 1 : (blk == 4 ? 3 : 2));
  if (kind == 0) n = spc == 0 ? DRAYS0 : spc == 1 ? DRAYS1 : spc == 2 ? DRAYS2 : DRAYS3;
  else if (kind == 1) n = spc == 0 ? ARAYS0 : spc == 1 ? ARAYS1 : spc == 2 ? ARAYS2 : ARAYS3;
  else if (kind == 2) n = spc == 0 ? CRAYS0 : spc == 1 ? CRAYS1 : spc == 2 ? CRAYS2 : CRAYS3;
  else if (kind == 3) n = spc == 0 ? PRAYS0 : spc == 1 ? PRAYS1 : spc == 2 ? PRAYS2 : PRAYS3;
  else n = spc == 0 ? VRAYS0 : spc == 1 ? VRAYS1 : spc == 2 ? VRAYS2 : VRAYS3;
  if (kind == 0) sp = spc == 0 ? DSP0 : spc == 1 ? DSP1 : spc == 2 ? DSP2 : DSP3;
  if (kind == 1) sp = spc == 0 ? ASP0 : spc == 1 ? ASP1 : spc == 2 ? ASP2 : ASP3;

  float spot = 0.0;
  vec3 spotC = vec3(0.62, 0.6, 0.5);
  float rayDark = 0.86; // ray colour = membrane * rayDark (rays are thicker, slightly darker)
  if (blk == 0) { // minnow: hyaline greyish fins, dusky dorsal / caudal
    mem = vec3(0.6, 0.62, 0.6); edge = vec3(0.16, 0.18, 0.18);
    membraneA = kind >= 3 || kind == 1 ? 0.42 : 0.55; edgeAmt = (kind == 0 || kind == 2) ? 0.45 : 0.1;
    if (kind == 0 || kind == 2) mem = vec3(0.42, 0.45, 0.45);
    if (kind == 1 || kind == 4) mem = vec3(0.7, 0.68, 0.6);
    root = kind == 0 ? vec3(0.06, 0.09, 0.09) : (kind == 2 ? vec3(0.5, 0.55, 0.56) : vec3(0.82, 0.82, 0.8));
  } else if (blk == 1) { // pupfish male: dark dorsal / anal with pale spots and light margin; banded yellow tail
    mem = vec3(0.1, 0.11, 0.12); edge = vec3(0.75, 0.72, 0.5); membraneA = 0.8; edgeAmt = 0.55;
    if (kind == 0 || kind == 1) { spot = 0.8 * smoothstep(0.66, 0.74, fvn(vec2(t * 44.0, s * 15.0))); spotC = vec3(0.6, 0.72, 0.85); }
    if (kind == 2) {
      mem = vec3(0.66, 0.54, 0.14);
      float b = 1.0 - smoothstep(0.12, 0.22, abs(fract(s * 2.6 + 0.35) - 0.5));
      mem = mix(mem, vec3(0.03, 0.03, 0.035), 0.88 * b * step(0.12, s));
      edge = vec3(0.02, 0.02, 0.025); edgeAmt = 0.75; membraneA = 0.72;
    }
    if (kind >= 3) { mem = vec3(0.62, 0.6, 0.48); membraneA = 0.38; edgeAmt = 0.0; }
    root = kind == 0 ? vec3(0.08, 0.085, 0.07) : (kind == 2 ? vec3(0.4, 0.46, 0.54) : vec3(0.62, 0.64, 0.6));
  } else if (blk == 2) { // pupfish female: clear, faintly spotted
    mem = vec3(0.55, 0.52, 0.42); edge = vec3(0.35, 0.32, 0.24); membraneA = 0.42; edgeAmt = 0.1;
    if (kind <= 2) { spot = 0.5 * smoothstep(0.68, 0.78, fvn(vec2(t * 30.0, s * 9.0))); spotC = vec3(0.12, 0.1, 0.06); }
    root = kind == 0 ? vec3(0.12, 0.11, 0.07) : (kind == 2 ? vec3(0.36, 0.33, 0.24) : vec3(0.6, 0.56, 0.45));
  } else if (blk == 3) { // Tilapia zillii
    mem = vec3(0.14, 0.15, 0.1); edge = vec3(0.62, 0.3, 0.08); membraneA = 0.82; edgeAmt = 0.5;
    if (kind <= 2) { spot = 0.8 * smoothstep(0.62, 0.72, fvn(vec2(t * (kind == 2 ? 24.0 : 50.0), s * 12.0))); spotC = vec3(0.62, 0.58, 0.34); }
    if (kind == 2) spot *= smoothstep(0.35, 0.6, t);
    if (kind == 3) { mem = vec3(0.6, 0.52, 0.36); membraneA = 0.36; edgeAmt = 0.0; spot = 0.0; }
    if (kind == 4) { mem = vec3(0.07, 0.07, 0.06); membraneA = 0.86; edgeAmt = 0.3; edge = vec3(0.5, 0.45, 0.4); spot = 0.0; }
    root = kind == 0 ? vec3(0.07, 0.085, 0.05) : (kind == 2 ? vec3(0.28, 0.3, 0.18) : (kind == 1 ? vec3(0.55, 0.5, 0.36) : vec3(0.3, 0.3, 0.2)));
  } else if (blk == 5) { // Oreochromis aureus: grey fins, broad pink-red margins
    mem = vec3(0.22, 0.24, 0.24); edge = vec3(0.62, 0.2, 0.16); membraneA = 0.74; edgeAmt = 0.7;
    if (kind == 2) { spot = 0.5 * smoothstep(0.6, 0.72, fvn(vec2(t * 40.0, s * 16.0))); spotC = vec3(0.4, 0.44, 0.44); }
    if (kind == 3) { mem = vec3(0.6, 0.56, 0.5); membraneA = 0.36; edgeAmt = 0.0; }
    if (kind == 4) { mem = vec3(0.18, 0.19, 0.19); edgeAmt = 0.2; }
    root = kind == 0 ? vec3(0.08, 0.1, 0.11) : (kind == 2 ? vec3(0.38, 0.42, 0.45) : (kind == 1 ? vec3(0.66, 0.66, 0.62) : vec3(0.4, 0.44, 0.46)));
  } else { // carp: dark olive dorsal / caudal, orange-red lower fins
    mem = vec3(0.16, 0.14, 0.09); edge = vec3(0.1, 0.09, 0.06); membraneA = 0.84; edgeAmt = 0.3;
    bool lower = kind == 1 || kind == 4 || (kind == 2 && t < 0.42);
    if (lower) { mem = vec3(0.46, 0.2, 0.08); edge = vec3(0.4, 0.12, 0.05); }
    if (kind == 2 && !lower) mem = mix(mem, vec3(0.3, 0.2, 0.1), 0.4 * (1.0 - smoothstep(0.42, 0.6, t)));
    if (kind == 3) { mem = vec3(0.36, 0.22, 0.1); membraneA = 0.72; }
    root = kind == 0 ? vec3(0.09, 0.08, 0.04) : (kind == 2 ? vec3(0.4, 0.3, 0.13) : (kind == 3 ? vec3(0.45, 0.34, 0.15) : vec3(0.66, 0.56, 0.36)));
  }
  bool spine = t < sp;
  vec2 rr = rays(t, s, n, spine ? 2.0 : split);
  float rayW = spine ? (1.0 - smoothstep(0.08, 0.24, abs(fract(t * n) - 0.5))) : rr.x;
  vec3 c = mix(mem, mem * rayDark + vec3(0.015), rayW);
  c *= 1.0 - 0.12 * rr.y;
  c = mix(c, spotC, 0.6 * spot * (1.0 - 0.6 * rayW));
  float em = smoothstep(0.74, 1.0, s) * edgeAmt;
  if (blk == 3 && kind == 0) em *= 0.4 + 0.6 * smoothstep(DSP2 - 0.08, DSP2 + 0.05, t);
  c = mix(c, edge, em);
  // tilapia mark: black spot ringed with yellow at the base of the soft dorsal (T. zillii)
  if (blk == 3 && kind == 0) {
    float d = length(vec2((t - 0.74) * 5.0, (s - 0.3) * 2.2));
    c = mix(c, vec3(0.62, 0.52, 0.14), 1.0 - smoothstep(0.34, 0.44, d));
    c = mix(c, vec3(0.006, 0.006, 0.007), 1.0 - smoothstep(0.23, 0.31, d));
  }
  // fleshy, body-coloured root (scaled sheath at the base)
  float rootK = 1.0 - smoothstep(0.02, 0.16, s);
  c = mix(c, root, rootK);
  float alpha = mix(membraneA, min(1.0, membraneA + 0.3), rayW);
  alpha = mix(alpha, 1.0, rootK);
  alpha *= 1.0 - 0.35 * smoothstep(0.9, 1.0, s);            // thin margin
  if (spine) alpha = max(alpha, 0.92 * rayW);
  float h = 0.45 + 0.1 * rayW + (spine ? 0.1 * rayW : 0.0) - 0.03 * rr.y;
  h = mix(h, 0.5, rootK);
  return px(c, alpha, h, spine ? 0.34 : 0.4, 0.0);
}

// ============================================================ eye, lips
Px eye(int blk, vec2 e) {
  float d = length(e);
  float ang = atan(e.y, e.x);
  vec3 iris;
  if (blk == 0) iris = vec3(0.86, 0.85, 0.8);        // silvery
  else if (blk == 1) iris = vec3(0.78, 0.68, 0.36);
  else if (blk == 2) iris = vec3(0.7, 0.6, 0.34);
  else if (blk == 3) iris = vec3(0.7, 0.42, 0.1);    // amber-red
  else if (blk == 5) iris = vec3(0.64, 0.54, 0.26);
  else iris = vec3(0.72, 0.52, 0.14);                // carp: gold
  // radial iris fibres + a darker inner ring
  iris *= 0.84 + 0.16 * sin(ang * 42.0 + 3.0 * fvn(vec2(ang * 6.0, d * 5.0)));
  iris *= 0.7 + 0.35 * smoothstep(0.5, 0.72, d);
  // dark band across the top of the iris (camouflage eye-line in many species)
  iris *= 1.0 - (blk == 0 ? 0.65 : 0.4) * smoothstep(0.35, 0.85, e.y) * smoothstep(0.3, 0.6, d);
  float pupil = 0.5;
  vec3 c = mix(vec3(0.003, 0.004, 0.006), iris, smoothstep(pupil - 0.03, pupil + 0.02, d));
  c = mix(c, vec3(0.04, 0.04, 0.035), smoothstep(0.9, 0.98, d));
  float metal = 0.35 * smoothstep(pupil, pupil + 0.08, d) * (1.0 - smoothstep(0.9, 0.98, d));
  return px(c, 1.0, 0.5, 0.04, metal);
}
Px lips(int blk, vec2 q) {
  vec3 c = blk == 4 ? vec3(0.5, 0.38, 0.24) : (blk == 3 ? vec3(0.42, 0.34, 0.27) : vec3(0.55, 0.52, 0.46));
  c *= 0.9 + 0.2 * fvn(q * 30.0);
  return px(c, 1.0, 0.5, 0.5, 0.0);
}

// ============================================================ dispatch
Px paintAt(vec2 L) {
  const int blk = BLK;
  Px o = px(vec3(0.0), 1.0, 0.5, 0.5, 0.0);
  if (L.y < ${Y((X.body.v1+X.dorsal.v0)/2)}) {
    float a = clamp((L.x - ${Y(X.body.u0)}) / ${Y(X.body.u1-X.body.u0)}, 0.0, 1.0);
    float up = clamp((L.y - ${Y(X.body.v0)}) / ${Y(X.body.v1-X.body.v0)}, 0.0, 1.0);
#if BLK == 0
    o = bodyMinnow(a, up);
#elif BLK == 1
    o = bodyPupfish(a, up, true);
#elif BLK == 2
    o = bodyPupfish(a, up, false);
#elif BLK == 3
    o = bodyTilapia(a, up, true);
#elif BLK == 5
    o = bodyTilapia(a, up, false);
#else
    o = bodyCarp(a, up);
#endif
    return o;
  }
  if (L.y < ${Y((X.caudal.v1+X.pectoral.v0)/2)}) {
    float t = clamp((L.x - ${Y(X.dorsal.u0)}) / ${Y(X.dorsal.u1-X.dorsal.u0)}, 0.0, 1.0);
    if (L.y < ${Y((X.dorsal.v1+X.anal.v0)/2)}) o = fin(blk, 0, t, clamp((L.y - ${Y(X.dorsal.v0)}) / ${Y(X.dorsal.v1-X.dorsal.v0)}, 0.0, 1.0));
    else if (L.y < ${Y((X.anal.v1+X.caudal.v0)/2)}) o = fin(blk, 1, t, clamp((L.y - ${Y(X.anal.v0)}) / ${Y(X.anal.v1-X.anal.v0)}, 0.0, 1.0));
    else o = fin(blk, 2, t, clamp((L.y - ${Y(X.caudal.v0)}) / ${Y(X.caudal.v1-X.caudal.v0)}, 0.0, 1.0));
    return o;
  }
  float c = clamp((L.y - ${Y(X.pectoral.v0)}) / ${Y(X.pectoral.v1-X.pectoral.v0)}, 0.0, 1.0);
  if (L.x < ${Y((X.pectoral.u1+X.pelvic.u0)/2)}) o = fin(blk, 3, c, clamp((L.x - ${Y(X.pectoral.u0)}) / ${Y(X.pectoral.u1-X.pectoral.u0)}, 0.0, 1.0));
  else if (L.x < ${Y((X.pelvic.u1+X.eye.cu-X.eye.r)/2)}) o = fin(blk, 4, c, clamp((L.x - ${Y(X.pelvic.u0)}) / ${Y(X.pelvic.u1-X.pelvic.u0)}, 0.0, 1.0));
  else if (L.x < ${Y(X.lips.u0-.005)}) o = eye(blk, (L - vec2(${Y(X.eye.cu)}, ${Y(X.eye.cv)})) / ${Y(X.eye.r)});
  else o = lips(blk, L);
  return o;
}

// mode 0: albedo + alpha (sRGB target); mode 1: height, roughness, metalness (half float)
void main() {
  Px c = paintAt(vUv);
  if (uMode < 0.5) gl_FragColor = vec4(max(c.col, vec3(0.0)), clamp(c.a, 0.0, 1.0));
  else gl_FragColor = vec4(c.h, clamp(c.rough, 0.02, 1.0), clamp(c.metal, 0.0, 1.0), 1.0);
}
`}var Ce=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,we=`
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uBump;
varying vec2 vUv;
void main() {
  vec4 c = texture2D(tSrc, vUv);
  float hx = texture2D(tSrc, vUv + vec2(uTexel.x, 0.0)).r - texture2D(tSrc, vUv - vec2(uTexel.x, 0.0)).r;
  float hy = texture2D(tSrc, vUv + vec2(0.0, uTexel.y)).r - texture2D(tSrc, vUv - vec2(0.0, uTexel.y)).r;
  vec3 n = normalize(vec3(-hx * uBump, -hy * uBump, 1.0));
  gl_FragColor = vec4(n.xy * 0.5 + 0.5, c.g, c.b);
}
`;async function Te(t,r){let i=t.renderer,o=Math.round(r*1.5),s=r/2,l=o/3,p=Math.min(t.quality.anisotropy??8,i.capabilities.getMaxAnisotropy()),v=(t,n,i=c)=>new g(r,o,{type:i,format:e,colorSpace:t?u:``,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:n,minFilter:n?a:d,magFilter:d,wrapS:f,wrapT:f,anisotropy:n?p:1}),y=v(!0,!0),b=v(!1,!1,m),x=v(!1,!0);y.texture.name=`ambient.fishAtlas`,x.texture.name=`ambient.fishData`;let S=new n(-1,1,1,-1,0,1),w=new C(2,2),E=[],D=new _;for(let e=0;e<6;e++){let t=new A({uniforms:{uMode:{value:0}},vertexShader:Ce,fragmentShader:`precision highp float;
`+Se(e),depthTest:!1,depthWrite:!1});t.userData.noPatch=!0,E.push(t);let n=new h(w,t);n.frustumCulled=!1,D.add(n)}let O=new A({uniforms:{tSrc:{value:b.texture},uTexel:{value:new T(1/r,1/o)},uBump:{value:r/2048*2.2}},vertexShader:Ce,fragmentShader:`precision highp float;
`+we,depthTest:!1,depthWrite:!1});O.userData.noPatch=!0;let k=new h(w,O);k.frustumCulled=!1,D.add(k);let j=i.getRenderTarget();i.setRenderTarget(b);try{i.compileAsync&&await i.compileAsync(D,S)}catch{}let M=i.autoClear;i.autoClear=!1;let N=new h(w,E[0]);N.frustumCulled=!1;let P=(e,t,n,r,a,o)=>{e.viewport.set(n,r,a,o),e.scissor.set(n,r,a,o),e.scissorTest=!0,N.material=t,i.setRenderTarget(e),i.render(N,S)};try{for(let e=0;e<6;e++){let t=e%2*s,n=Math.floor(e/2)*l;E[e].uniforms.uMode.value=0,P(y,E[e],t,n,s,l),E[e].uniforms.uMode.value=1,P(b,E[e],t,n,s,l)}P(x,O,0,0,r,o)}finally{for(let e of[y,b,x])e.viewport.set(0,0,r,o),e.scissor.set(0,0,r,o),e.scissorTest=!1;i.autoClear=M,i.setRenderTarget(j)}for(let e of E)e.dispose();return O.dispose(),w.dispose(),b.dispose(),{map:y.texture,data:x.texture}}var Ee=`
uniform float uTime;
attribute vec4 aSwim;
attribute vec4 aFinAnim;
attribute vec4 aPart;
attribute vec3 aPivot;
attribute vec3 aAxis;
varying float vFishPart;
varying float vFishFlex;
vec3 fishRot(vec3 v, vec3 ax, float ang) {
  float c = cos(ang), s = sin(ang);
  return v * c + cross(ax, v) * s + ax * dot(ax, v) * (1.0 - c);
}
`,De=`
vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
vec3 objectTangent = vec3( tangent.xyz );
#endif
vec3 fishPos = vec3( position );
{
  float part = aPart.x;
  vFishPart = part;
  vFishFlex = aPart.z;
  float zRef = fishPos.z;
  // --- breathing: gill covers flare, lower jaw drops (in counter-phase)
  float br = 0.5 + 0.5 * sin(aFinAnim.w);
  if (part < 0.5) {
    if (aPart.w > 0.0) fishPos.x *= 1.0 + 0.09 * aPart.w * br;
    else if (aPart.w < 0.0) fishPos.y += 0.0075 * aPart.w * (1.0 - br);
  }
  // --- paired fins: fold toward the body / scull about the base line
  if (part > 1.5 && part < 3.5) {
    float side = aPart.y;
    float pec = part < 2.5 ? 1.0 : 0.0;
    float scull = aFinAnim.y * sin(aFinAnim.x + (pec > 0.5 ? 0.0 : 1.4)) * (pec > 0.5 ? 1.0 : 0.35);
    float ang = side * (aPart.w * aFinAnim.z * (pec > 0.5 ? 0.92 : 0.7) - scull);
    vec3 rel = fishPos - aPivot;
    float rl = length(rel);
    rel = fishRot(rel, aAxis, ang);
    objectNormal = fishRot(objectNormal, aAxis, ang);
    // the flexible outer rays trail the stroke
    rel += objectNormal * (aPart.z * aPart.z * rl * 0.3 * aFinAnim.y * cos(aFinAnim.x));
    fishPos = aPivot + rel;
    zRef = aPivot.z;
  }
  // --- body wave (+ C-bend), evaluated at the section's station
  float xs = clamp(0.5 - zRef, 0.0, 1.0);
  float env = 0.2 - 0.8 * xs + 1.6 * xs * xs;
  const float K = 6.6;
  float ph = aSwim.x - K * xs;
  float sn = sin(ph), cs = cos(ph);
  float h = aSwim.y * env * sn;
  float dh = aSwim.y * ((-0.8 + 3.2 * xs) * sn - env * K * cs);
  float xr = xs - 0.36;
  h += 0.5 * aSwim.z * xr * xr;
  dh += aSwim.z * xr;
  // median-fin margins and the caudal trailing edge lag a quarter cycle
  if (part > 0.5 && part < 1.5) {
    float lag = aPart.z * aPart.z * aSwim.y * (0.45 * env + 0.1);
    h += lag * sin(ph - 1.3) ;
  }
  if (part > 4.5) { // barbels sway
    fishPos.x += aPart.z * aPart.z * 0.006 * sin(uTime * 2.3 + aFinAnim.w * 0.5);
    fishPos.z += aPart.z * 0.004 * sin(uTime * 1.7 + aFinAnim.w);
  }
  float ci = inversesqrt(1.0 + dh * dh);
  float si = dh * ci;
  float lx = fishPos.x, lz = fishPos.z - zRef;
  fishPos.x = h + ci * lx - si * lz;
  fishPos.z = zRef + si * lx + ci * lz;
  float nx = objectNormal.x, nz = objectNormal.z;
  objectNormal.x = ci * nx - si * nz;
  objectNormal.z = si * nx + ci * nz;
}
`,Oe=`
uniform sampler2D tFishData;
varying float vFishPart;
varying float vFishFlex;
vec3 fishPerturb(vec3 eyePos, vec3 N, vec3 mapN, vec2 uv, float faceDir) {
  vec3 q0 = dFdx(eyePos), q1 = dFdy(eyePos);
  vec2 st0 = dFdx(uv), st1 = dFdy(uv);
  vec3 q1perp = cross(q1, N), q0perp = cross(N, q0);
  vec3 T = q1perp * st0.x + q0perp * st1.x;
  vec3 B = q1perp * st0.y + q0perp * st1.y;
  float det = max(dot(T, T), dot(B, B));
  float sc = det == 0.0 ? 0.0 : faceDir * inversesqrt(det);
  return normalize(T * (mapN.x * sc) + B * (mapN.y * sc) + N * mapN.z);
}
`;function ke(e,t,n,{msaa:r}){let i=new w({map:t,roughness:.3,metalness:.3,side:2,envMapIntensity:.6,alphaToCoverage:r,alphaTest:r?0:.3,transparent:!1});return i.onBeforeCompile=t=>{t.uniforms.uTime=e.G.uTime,t.uniforms.tFishData={value:n};let r=t.vertexShader;r=r.replace(`#include <common>`,`#include <common>
`+Ee),r=r.replace(`#include <uv_vertex>`,`#include <uv_vertex>
      {
        float blk = aSwim.w;
        vec2 bo = vec2(mod(blk, 2.0) * 0.5, floor(blk / 2.0 + 0.01) / 3.0);
        vMapUv = bo + clamp(uv, vec2(0.002), vec2(0.998)) * vec2(0.5, 1.0 / 3.0);
      }`),r=r.replace(`#include <beginnormal_vertex>`,De),r=r.replace(`#include <begin_vertex>`,`vec3 transformed = fishPos;`),t.vertexShader=r;let i=t.fragmentShader;i=i.replace(`#include <common>`,`#include <common>
`+Oe),i=i.replace(`#include <map_fragment>`,`#include <map_fragment>
      vec4 fishD = texture2D(tFishData, vMapUv);
      float fishFin = (vFishPart > 0.5 && vFishPart < 3.5) ? 1.0 : 0.0;
      diffuseColor.a = mix(1.0, diffuseColor.a, fishFin);`),i=i.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
      roughnessFactor = fishD.b;`),i=i.replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
      metalnessFactor = fishD.a;`),i=i.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
      {
        vec3 fishN = vec3(fishD.xy * 2.0 - 1.0, 0.0);
        fishN.z = sqrt(max(1.0 - dot(fishN.xy, fishN.xy), 0.0));
        normal = fishPerturb(-vViewPosition, normal, fishN, vMapUv, faceDirection);
      }`),i=i.replace(`#include <lights_physical_fragment>`,`
      {
        float fishNV = clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
        float th = 1.0 - fishNV;
        vec3 film = 0.5 + 0.5 * cos(6.2831853 * (vec3(0.0, 0.33, 0.67) + th * 0.9 + 0.55));
        float irid = smoothstep(0.5, 0.85, metalnessFactor) * (1.0 - fishFin) * 0.14;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * (0.55 + 0.9 * film), irid);
      }
      #include <lights_physical_fragment>`),i=i.replace(`#include <opaque_fragment>`,`
      if (fishFin > 0.5) {
        vec3 V = normalize(vViewPosition);
        vec3 Lv = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
        float b = max(dot(-V, Lv), 0.0);
        float lobe = 0.15 + 0.85 * b * b * b;
        float dep = max(uWaterLevel - vLagoonWorldPos.y, 0.0);
        vec3 T = exp(-uWaterAbsorb * (dep * 1.4 + 0.3));
        outgoingLight += diffuseColor.rgb * uSunColor * uSunIntensity * T * lobe * (1.0 - diffuseColor.a * 0.6) * 0.035;
      }
      #include <opaque_fragment>`),t.fragmentShader=i},i.customProgramCacheKey=()=>`ambient-fish-v3`,i.name=`ambient-fish`,e.patchMaterial(i),i}var Ae=1e9,je=class{constructor(e,t,n=.5){this.ctx=e,this.grid=t,this.step=n,this.minX=t.minX,this.minZ=t.minZ;let r=t.minX+(t.nx-1)*t.step,i=t.minZ+(t.nz-1)*t.step;this.nx=Math.floor((r-this.minX)/n)+1,this.nz=Math.floor((i-this.minZ)/n)+1;let a=this.nx*this.nz;this.floor=new Float32Array(a),this.block=new Uint8Array(a),this.clear=new Float32Array(a),this.collidersDone=!1}async build(){let{nx:e,nz:t,step:n,minX:r,minZ:i,floor:a,grid:o,ctx:s}=this,c=performance.now();for(let l=0;l<t;l++){let t=i+l*n;for(let i=0;i<e;i++)a[l*e+i]=o.height(r+i*n,t);performance.now()-c>12&&(await s.yieldFrame(),c=performance.now())}let l=s.registry?.get?.(`rocks`);if(l?.list&&l.raycastDown)for(let o of l.list){if(!(o.bottom<.05)||o.x<r-4||o.z<i-4||o.x>r+e*n+4||o.z>i+t*n+4)continue;let u=o.radius+n,d=Math.max(0,Math.floor((o.x-u-r)/n)),f=Math.min(e-1,Math.ceil((o.x+u-r)/n)),p=Math.max(0,Math.floor((o.z-u-i)/n)),m=Math.min(t-1,Math.ceil((o.z+u-i)/n));for(let t=p;t<=m;t++)for(let s=d;s<=f;s++){let c=r+s*n,d=i+t*n,f=c-o.x,p=d-o.z;if(f*f+p*p>u*u)continue;let m=l.raycastDown(c,d);m===null&&f*f+p*p<o.radius*o.radius&&(m=Math.min(o.top,a[t*e+s]+.3)),m!==null&&m>a[t*e+s]&&(a[t*e+s]=m)}performance.now()-c>12&&(await s.yieldFrame(),c=performance.now())}let u=s.layout;for(let e of u.BOARDWALKS||[]){let t=(e.width||2)/2+.45;for(let n=0;n<e.path.length-1;n++)this.blockSegment(e.path[n],e.path[n+1],t);if(e.platformEnd){let t=e.path[e.path.length-1];this.blockDisk(t[0],t[1],e.platformEnd.r+.5)}}for(let e of u.HOUSES||[])e.kind===`overwater`&&this.blockDisk(e.x,e.z,(e.deckR||6)+.5);return this.derive(),this}blockDisk(e,t,n){let{nx:r,nz:i,step:a,minX:o,minZ:s}=this,c=Math.max(0,Math.floor((e-n-o)/a)),l=Math.min(r-1,Math.ceil((e+n-o)/a)),u=Math.max(0,Math.floor((t-n-s)/a)),d=Math.min(i-1,Math.ceil((t+n-s)/a));for(let i=u;i<=d;i++)for(let u=c;u<=l;u++){let c=o+u*a-e,l=s+i*a-t;c*c+l*l<=n*n&&(this.block[i*r+u]=1)}}blockSegment(e,t,n){let{nx:r,nz:i,step:a,minX:o,minZ:s}=this,c=Math.min(e[0],t[0])-n,l=Math.max(e[0],t[0])+n,u=Math.min(e[1],t[1])-n,d=Math.max(e[1],t[1])+n,f=Math.max(0,Math.floor((c-o)/a)),p=Math.min(r-1,Math.ceil((l-o)/a)),m=Math.max(0,Math.floor((u-s)/a)),h=Math.min(i-1,Math.ceil((d-s)/a)),g=t[0]-e[0],_=t[1]-e[1],v=g*g+_*_||1;for(let t=m;t<=h;t++)for(let i=f;i<=p;i++){let c=o+i*a,l=s+t*a,u=K(((c-e[0])*g+(l-e[1])*_)/v,0,1),d=e[0]+g*u-c,f=e[1]+_*u-l;d*d+f*f<=n*n&&(this.block[t*r+i]=1)}}addColliders(){if(this.collidersDone)return!0;let e=this.ctx.collision?.bvh;if(!e)return!1;this.collidersDone=!0;let{nx:t,nz:n,step:r,minX:i,minZ:a,floor:o}=this,s=i+(t-1)*r,c=a+(n-1)*r,l=this.ctx.layout.WATER_Y,u=0,d=(e,s,c)=>{let l=Math.round((e-i)/r),d=Math.round((s-a)/r);if(l<0||d<0||l>=t||d>=n)return;let f=d*t+l;c>o[f]&&(o[f]=c,u++)};try{e.shapecast({intersectsBounds:e=>+(e.min.y<l-.03&&e.max.x>i&&e.min.x<s&&e.max.z>a&&e.min.z<c),intersectsTriangle:e=>{let t=e.a,n=e.b,o=e.c;if(Math.min(t.y,n.y,o.y)>l-.03)return!1;let u=Math.min(t.x,n.x,o.x),f=Math.max(t.x,n.x,o.x),p=Math.min(t.z,n.z,o.z),m=Math.max(t.z,n.z,o.z);if(f<i||u>s||m<a||p>c)return!1;let h=Math.max(f-u,m-p);if(h>30)return!1;let g=Math.max(1,Math.ceil(h/(r*.5)));for(let e=0;e<=g;e++)for(let r=0;r<=g-e;r++){let i=e/g,a=r/g,s=1-i-a,c=t.y*s+n.y*i+o.y*a;c>l+.05||d(t.x*s+n.x*i+o.x*a,t.z*s+n.z*i+o.z*a,c)}return!1}})}catch(e){console.warn(`[lagoon] fish habitat: collider scan failed`,e)}return this.derive(),u}derive(){let{nx:e,nz:t,step:n,floor:r,block:i,clear:a}=this;for(let n=0;n<e*t;n++)a[n]=i[n]||r[n]>-.06?0:Ae;let o=n,s=n*Math.SQRT2;for(let n=0;n<t;n++)for(let t=0;t<e;t++){let r=n*e+t,i=a[r];i!==0&&(t>0&&(i=Math.min(i,a[r-1]+o)),n>0&&(i=Math.min(i,a[r-e]+o),t>0&&(i=Math.min(i,a[r-e-1]+s)),t<e-1&&(i=Math.min(i,a[r-e+1]+s))),a[r]=i)}for(let n=t-1;n>=0;n--)for(let r=e-1;r>=0;r--){let i=n*e+r,c=a[i];c!==0&&(r<e-1&&(c=Math.min(c,a[i+1]+o)),n<t-1&&(c=Math.min(c,a[i+e]+o),r<e-1&&(c=Math.min(c,a[i+e+1]+s)),r>0&&(c=Math.min(c,a[i+e-1]+s))),a[i]=c)}for(let n=0;n<e*t;n++)a[n]>60&&(a[n]=60)}_bil(e,t,n,r){let i=(t-this.minX)/this.step,a=(n-this.minZ)/this.step;if(i<0||a<0||i>=this.nx-1||a>=this.nz-1)return r;let o=i|0,s=a|0,c=i-o,l=a-s,u=this.nx,d=s*u+o,f=e[d]+(e[d+1]-e[d])*c;return f+(e[d+u]+(e[d+u+1]-e[d+u])*c-f)*l}floorAt(e,t){return this._bil(this.floor,e,t,2)}clearAt(e,t){return this._bil(this.clear,e,t,0)}depthAt(e,t){return-this.floorAt(e,t)}ok(e,t,n,r){return this.floorAt(e,t)<-n&&this.clearAt(e,t)>r}repel(e,t,n,r,i,a=.15,o=.6){let s=.5,c=(e,t)=>{let i=-this.floorAt(e,t),s=this.clearAt(e,t),c=Math.max(0,n+a-i)*2.5,l=Math.max(0,r+o-s)*1.5;return c*c+l*l},l=c(e,t);return l<=0?(i[0]=0,i[1]=0,0):(i[0]=-(c(e+s,t)-c(e-s,t))/(2*s),i[1]=-(c(e,t+s)-c(e,t-s))/(2*s),l)}},Me=0,Ne=1,Pe=2,Fe=3,Ie=4,Le=5;function Re(e){let t=0;for(let n=0;n<e.top.length;n++)t=Math.max(t,(e.top[n][1]-e.bot[n][1])/2);return t}function ze(e){for(;e>Math.PI;)e-=G;for(;e<-Math.PI;)e+=G;return e}var Be=class{constructor(e,t,n,r,i=9001){this.hab=e,this.species=t,this.groups=r,this.seed=i;let a=this.n=n.length;this.sp=new Uint8Array(a),this.blk=new Uint8Array(a),this.grp=new Uint16Array(a),this.L=new Float32Array(a),this.sx=new Float32Array(a),this.sy=new Float32Array(a),this.x=new Float32Array(a),this.y=new Float32Array(a),this.z=new Float32Array(a),this.yaw=new Float32Array(a),this.pitch=new Float32Array(a),this.U=new Float32Array(a),this.yawRate=new Float32Array(a),this.kappa=new Float32Array(a),this.roll=new Float32Array(a),this.tailPh=new Float32Array(a),this.tailA=new Float32Array(a),this.pecPh=new Float32Array(a),this.pecA=new Float32Array(a),this.fold=new Float32Array(a),this.brPh=new Float32Array(a),this.state=new Uint8Array(a),this.timer=new Float32Array(a),this.coasting=new Uint8Array(a),this.tx=new Float32Array(a),this.ty=new Float32Array(a),this.tz=new Float32Array(a),this.ud=new Float32Array(a),this.pref=new Float32Array(a),this.cnt=new Uint32Array(a),this.oa=new Float32Array(a),this.oc=new Float32Array(a),this.oy=new Float32Array(a),this.hd=t.map(e=>Re(e)),this.cruiseK=new Float32Array(a),n.forEach((e,n)=>{this.sp[n]=e.sp,this.blk[n]=e.blk,this.grp[n]=e.g,this.L[n]=e.L,this.sx[n]=e.sx,this.sy[n]=e.sy,this.pref[n]=e.pref;let r=t[e.sp].len;this.cruiseK[n]=(e.L/((r[0]+r[1])/2))**-.3}),this._g=[0,0],this.threat={x:0,y:100,z:0,on:!1}}rnd(e){return J(e,this.cnt[e]++,this.seed)}leaderAt(e,t){let n=e.loop,r=e.s%n.len;r<0&&(r+=n.len);let i=r/n.seg,a=Math.floor(i)%n.m,o=(a+1)%n.m,s=i-Math.floor(i);t.x=q(n.xs[a],n.xs[o],s),t.z=q(n.zs[a],n.zs[o],s);let c=(a+n.m-3)%n.m,l=(a+4)%n.m,u=n.xs[l]-n.xs[c],d=n.zs[l]-n.zs[c],f=Math.hypot(u,d)||1;t.tx=u/f*e.dirSign,t.tz=d/f*e.dirSign;let p=q(n.ds[a],n.ds[o],s);return t.y=-K(p*e.depthK,.3,Math.max(.3,p-.35)),t}reset(e){for(let t of this.groups)t.revCount=0,t.kind===`school`&&(t.dirSign=1,t.s=t.offset+t.speed*e,t.nextRev=e+20+30*J(t.id,77,this.seed),this.leaderAt(t,t.lead));for(let t=0;t<this.n;t++){let n=this.groups[this.grp[t]],r=this.species[this.sp[t]],i=this.L[t],a,o,s,c;if(n.kind===`school`){let e=Math.cbrt(J(t,2,this.seed)),r=J(t,3,this.seed)*G,i=2*J(t,4,this.seed)-1,l=Math.sqrt(1-i*i),u=n.lead,d=n.radius,f=n.thick||.45*d;this.oa[t]=d*e*l*Math.cos(r),this.oc[t]=.85*d*e*l*Math.sin(r),this.oy[t]=f*e*i,a=u.x+u.tx*this.oa[t]+u.tz*this.oc[t],o=u.z+u.tz*this.oa[t]-u.tx*this.oc[t],s=u.y+this.oy[t],c=Math.atan2(u.tx,u.tz)+(J(t,5,this.seed)-.5)*.3,this.state[t]=Ne}else{let e=Math.sqrt(J(t,2,this.seed))*n.radius*.7,i=J(t,3,this.seed)*G;a=n.x+Math.cos(i)*e,o=n.z+Math.sin(i)*e,this.hab.ok(a,o,r.depth.minWater,.3)||(a=n.x,o=n.z),s=this.hab.floorAt(a,o)+.3,c=J(t,5,this.seed)*G,this.state[t]=Me,this.timer[t]=.5+2*J(t,6,this.seed)}this.x[t]=a,this.z[t]=o,this.y[t]=s,this.yaw[t]=c,this.pitch[t]=0,this.U[t]=n.kind===`school`?r.cruise*i:0,this.tx[t]=a,this.ty[t]=s,this.tz[t]=o,this.tailPh[t]=J(t,7,this.seed)*G+e*G*2,this.pecPh[t]=J(t,8,this.seed)*G,this.brPh[t]=J(t,9,this.seed)*G+e*G*r.breath,this.tailA[t]=.05,this.pecA[t]=0,this.fold[t]=.5,this.kappa[t]=0,this.yawRate[t]=0,this.cnt[t]=100+(e*10|0),this.clampFish(t)}}clampFish(e){let t=this.species[this.sp[e]],n=this.L[e],r=this.hab,i=this.hd[this.sp[e]]*n*this.sy[e],a=.5*n*Math.abs(Math.sin(this.pitch[e])),o=r.floorAt(this.x[e],this.z[e])+i*.85+a+t.depth.floor,s=-(i+t.depth.surf);return o>s?(this.y[e]=Math.min(s,(o+s)*.5),!1):(this.y[e]<o&&(this.y[e]=o),this.y[e]>s&&(this.y[e]=s),!0)}pickTarget(e,t,n,r){let i=this.hab,a=this.L[e];for(let o=0;o<10;o++){let o,s;if(r){let n=this.yaw[e]+(this.rnd(e)-.5)*3.4,i=r[0]+(r[1]-r[0])*this.rnd(e);o=this.x[e]+Math.sin(n)*i,s=this.z[e]+Math.cos(n)*i;let a=t.x-o,c=t.z-s,l=Math.hypot(a,c);l>t.radius&&(o+=a*(1-t.radius/l),s+=c*(1-t.radius/l))}else{let n=this.rnd(e)*G,r=Math.sqrt(this.rnd(e))*t.radius;o=t.x+Math.cos(n)*r,s=t.z+Math.sin(n)*r}let c=-i.floorAt(o,s);if(!(c<n.depth.minWater+.05)&&!(n.depth.maxWater&&c>n.depth.maxWater)&&!(i.clearAt(o,s)<.35+.6*a))return this.tx[e]=o,this.tz[e]=s,!0}return this.tx[e]=t.x,this.tz[e]=t.z,!1}step(e,t){let n=this.hab,r=this._g,i=this.threat;for(let n of this.groups){if(n.kind!==`school`)continue;if(t>=n.nextRev){n.dirSign=-n.dirSign,n.revCount++;for(let e=n.i0;e<n.i1;e++)this.oa[e]=-this.oa[e],this.oc[e]=-this.oc[e];n.nextRev=t+25+40*J(n.id,78+n.revCount,this.seed)}n.s+=n.dirSign*n.speed*e,this.leaderAt(n,n.lead);let r=0;for(let e=n.i0;e<n.i1;e++)this.state[e]===Le&&r++;n.nFlee=r}for(let a=0;a<this.n;a++){let o=this.sp[a],s=this.species[o],c=this.L[a],l=this.groups[this.grp[a]],u=this.x[a],d=this.y[a],f=this.z[a],p=this.yaw[a],m=Math.cos(p),h=Math.sin(p),g=this.state[a],_=h,v=m,y=d,b=0,x=null,S=1;if(this.timer[a]-=e,i.on&&g!==Le){let e=u-i.x,t=d-i.y,n=f-i.z,r=s.id===`carp`?3.2:s.id===`tilapia`?2.4:s.id===`pupfish`?.8:1.1;if(e*e+t*t+n*n<r*r){g=Le,this.timer[a]=.7+.8*this.rnd(a);let t=Math.hypot(e,n)||1;this.tx[a]=u+e/t*3,this.tz[a]=f+n/t*3}}if(l.kind===`school`&&l.nFlee>0&&g!==Le){let e=36*c*c;for(let t=l.i0;t<l.i1;t++){if(t===a||this.state[t]!==Le)continue;let n=this.x[t]-u,r=this.y[t]-d,i=this.z[t]-f;if(n*n+r*r+i*i>e)continue;g=Le,this.timer[a]=.4+.5*this.rnd(a);let o=this.tx[t]-this.x[t],s=this.tz[t]-this.z[t],c=Math.hypot(o,s)||1;this.tx[a]=u+o/c*2.5,this.tz[a]=f+s/c*2.5;break}}if(g===Le)_=this.tx[a]-u,v=this.tz[a]-f,b=s.burst*c,S=3.5,y=d-.3,this.timer[a]<=0&&(g=l.kind===`school`?Ne:Me,this.timer[a]=.5+this.rnd(a));else if(l.kind===`school`){let e=l.lead,n=0,r=0,i=0,o=0,p=0,m=0,h=0,x=0,S=0,C=2.2*c,w=5*c,T=10*c;for(let e=l.i0;e<l.i1;e++){if(e===a)continue;let t=this.x[e]-u,s=this.y[e]-d,c=this.z[e]-f,l=t*t+s*s*2+c*c;if(!(l>T*T)&&(h+=t,x+=c,S++,l<w*w&&(o+=Math.sin(this.yaw[e]),p+=Math.cos(this.yaw[e]),m++),l<C*C&&l>1e-10)){let e=Math.sqrt(l),a=(1-e/C)/e;n-=t*a,r-=s*a,i-=c*a}}let E=l.radius,D=l.thick||.45*E,O=t*(.06+.05*this.pref[a])+a*2.39,k=this.oa[a]+.35*E*Math.sin(O),A=this.oc[a]+.3*E*Math.cos(O*1.3+1.1),j=e.x+e.tx*k+e.tz*A,M=e.z+e.tz*k-e.tx*A,N=j-u,P=M-f,F=Math.hypot(N,P)||1e-6,I=K(F/(.6*E),0,3);if(_=2.6*n+1*e.tx+N/F*I,v=2.6*i+1*e.tz+P/F*I,m){let e=Math.hypot(o,p)||1;_+=1.2*o/e,v+=1.2*p/e}if(S){let e=Math.hypot(h,x)||1;_+=.2*h/e,v+=.2*x/e}let ee=.45*Math.sin(t*(.45+.4*this.pref[a])+a*1.93);_+=ee*e.tz,v-=ee*e.tx,y=e.y+this.oy[a]+.25*D*Math.sin(O*.8+.5)+.8*r;let L=N*e.tx+P*e.tz;b=s.cruise*c*(.92+.16*this.pref[a])*K(1+L/(1.2*E),.6,1.9),g=Ne}else if(s.id===`pupfish`){let e=n.floorAt(u,f);y=e+s.depth.prefAbove[0]+(s.depth.prefAbove[1]-s.depth.prefAbove[0])*this.pref[a],g===Me||g===Ne?(b=0,_=h+.25*Math.sin(t*1.3+a),v=m+.25*Math.cos(t*1.1+a*2.1),S=.5,this.timer[a]<=0&&(this.rnd(a)<.72?(g=Pe,this.pickTarget(a,l,s,[.12,.6]),this.timer[a]=.25+.3*this.rnd(a)):(g=Ie,this.timer[a]=.35+.6*this.rnd(a)))):g===Pe?(_=this.tx[a]-u,v=this.tz[a]-f,b=s.burst*c*(.7+.5*this.pref[a]),S=2.2,(this.timer[a]<=0||_*_+v*v<.0016)&&(g=Fe,this.timer[a]=.25+.4*this.rnd(a))):g===Fe?(b=0,this.timer[a]<=0&&this.U[a]<.6*c&&(g=Me,this.timer[a]=.3+1.6*this.rnd(a))):g===Ie&&(b=.25*c,x=-.6,y=e+.3*c,this.timer[a]<=0&&(g=Me,this.timer[a]=.3+1.2*this.rnd(a)));let r=0,i=0,o=2.4*c;for(let e=l.i0;e<l.i1;e++){if(e===a)continue;let t=this.x[e]-u,n=this.z[e]-f,s=t*t+n*n;if(s<o*o&&s>1e-10){let e=Math.sqrt(s),a=(1-e/o)/e;r-=t*a,i-=n*a}}_+=1.5*r,v+=1.5*i}else{let e=n.floorAt(u,f),r=s.depth.prefAbove,i=Math.min(e+r[0]+(r[1]-r[0])*this.pref[a],-.2-this.hd[o]*c),d=l.lead0!==void 0&&l.lead0!==a?l.lead0:-1;if(g===Ne){let e=this.tx[a],t=this.tz[a];if(d>=0&&this.state[d]===Ne){let n=this.yaw[d];e=this.x[d]-Math.sin(n)*1.6*c+Math.cos(n)*.7*c*(this.pref[a]>.5?1:-1),t=this.z[d]-Math.cos(n)*1.6*c-Math.sin(n)*.7*c*(this.pref[a]>.5?1:-1)}_=e-u,v=t-f;let n=Math.hypot(_,v);b=s.cruise*c*this.cruiseK[a]*(.85+.3*this.pref[a]),d>=0&&(b*=K(n/(1.5*c),.4,1.6)),b*=K(n/(1.5*c),.35,1),y=i,d<0&&n<Math.max(.35,1.5*c)&&(this.rnd(a)<(s.id===`carp`?.6:.5)?(g=Ie,this.timer[a]=3+5*this.rnd(a)):(g=Me,this.timer[a]=2+4*this.rnd(a))),d>=0&&this.state[d]!==Ne&&(g=this.state[d]===Ie?Ie:Me,this.timer[a]=2+3*this.rnd(a))}else g===Me?(b=0,S=.35,_=h+.3*Math.sin(t*.5+a),v=m+.3*Math.cos(t*.43+a*1.7),y=i,this.timer[a]<=0&&(g=Ne,this.pickTarget(a,l,s,null))):g===Ie&&(x=s.id===`carp`?-.5:-.62,y=e+.45*c*Math.sin(-x)+this.hd[o]*c*.55+.01,b=(s.id===`carp`?.1:Math.sin(t*5+a*3.1)>.8?.6:.05)*c,S=.25,_=h+.2*Math.sin(t*.4+a),v=m+.2*Math.cos(t*.37+a),this.timer[a]<=0&&(g=Ne,this.pickTarget(a,l,s,null)))}let C=Math.max(.35,this.U[a]*1.4+2.5*c),w=.25+.5*c,T=s.avoid,E=n.repel(u+h*C,f+m*C,s.depth.minWater,w,r,T[0],T[1]);if(E>0){let e=Math.hypot(r[0],r[1])||1,t=Math.min(4,1+E);_+=r[0]/e*t,v+=r[1]/e*t}if(E=n.repel(u,f,s.depth.minWater,w,r,T[0],T[1]),E>0){let e=Math.hypot(r[0],r[1])||1,t=Math.min(5,1.5+E);_+=r[0]/e*t,v+=r[1]/e*t}let D=this.U[a],O=ze(Math.atan2(_,v)-p),k=s.turn*S*(.45+.55*Math.min(1,D/(s.cruise*c+1e-4)))*e,A=K(O*Math.min(1,e*5),-k,k);p=ze(p+A),this.yaw[a]=p,this.yawRate[a]=q(this.yawRate[a],A/e,ae(8,e));let j,M=b,N=s.burstCoast;N&&b>.3*c&&g===Ne?this.coasting[a]?(j=!1,D<N[0]*b&&(this.coasting[a]=0,j=!0)):(j=!0,M=b*(N[1]+.15),D>N[1]*b&&(this.coasting[a]=1,j=!1)):j=b>.05*c&&D<b*1.15;let P=D;j?P+=(M-P)*ae(g===Le||g===Pe?7:s.id===`carp`?.8:2.2,e):P-=P/s.glideTau*e,P=Math.max(0,P),this.U[a]=P;let F=y-d,I=x===null?Math.atan2(F*1.2,Math.max(P,.6*c)*1.5+.05):x;I=K(I,-.75,.5),this.pitch[a]=q(this.pitch[a],I,ae(x===null?3:2.5,e));let ee=Math.cos(this.pitch[a]),L=u+Math.sin(p)*ee*P*e,R=f+Math.cos(p)*ee*P*e,z=1-Math.min(1,P/(.8*c)),B=d+Math.sin(this.pitch[a])*P*e+K(F*.9,-.06,.06)*z*e,te=n.floorAt(L,R),V=.12+.45*c,H=s.depth.minWater*.6,ne=-te<H||n.clearAt(L,R)<V;ne&&(-n.floorAt(u,f)<H||n.clearAt(u,f)<V)&&(ne=n.clearAt(L,R)-te<n.clearAt(u,f)-n.floorAt(u,f)),ne?(this.U[a]*=.5,n.repel(u,f,s.depth.minWater,w,r,T[0],T[1]),(r[0]||r[1])&&(this.yaw[a]=ze(p+K(ze(Math.atan2(r[0],r[1])-p),-.3,.3)))):(this.x[a]=L,this.z[a]=R),this.y[a]=B,this.clampFish(a),this.state[a]=g;let U=P/c,re,W,J=0,oe=2,se;if(s.labriform&&U<s.labriform&&g!==Le)re=j||P>.15*c?.014:.008,W=1.4,J=P>.08*c?.5*K(U/.8,.45,1.1):.3,oe=1.3+2.2*U,se=0;else{let e=K((b-D)/(.5*s.cruise*c+1e-4),0,1);j?(re=.085+.065*e,W=1.25*U+(s.id===`carp`?.7:s.id===`tilapia`?.9:1.3)):P>.35*c?(re=.012,W=1.2):(re=.018,W=1.4),se=ie(.9,2.2,U)*(j?1:.7),!j&&P<.8*c&&(J=.26,oe=s.id===`carp`?1.2:s.id===`tilapia`?1.6:2.8,se=0),(g===Pe||g===Le)&&(se=1),g===Ie&&(J=.3,oe=s.id===`carp`?1:2.2,se=0)}W=Math.min(W,14),this.tailA[a]=q(this.tailA[a],re,ae(j?10:4,e)),this.tailPh[a]=(this.tailPh[a]+G*W*e)%(G*1e3),this.pecA[a]=q(this.pecA[a],J,ae(4,e)),this.pecPh[a]=(this.pecPh[a]+G*oe*e)%(G*1e3),this.fold[a]=q(this.fold[a],se,ae(5,e)),this.brPh[a]=(this.brPh[a]+G*s.breath*(1+.6*!!j)*e)%(G*1e3);let ce=K(this.yawRate[a]*c/Math.max(P,.9*c),-1.4,1.4);this.kappa[a]=q(this.kappa[a],ce,ae(7,e)),this.roll[a]=q(this.roll[a],K(this.kappa[a]*.12,-.25,.25)+.035*Math.sin(t*.7+a),ae(3,e))}}};function Ve(e,t,n,r,i){let a=null,o=1e9,s=e.step;for(let c=-r;c<=r;c+=s)for(let l=-r;l<=r;l+=s){let s=l*l+c*c;if(s>r*r||s>=o)continue;let u=t+l,d=n+c;i(-e.floorAt(u,d),e.clearAt(u,d),u,d)&&(o=s,a=[u,d])}return a}function He(e,t,n,r,i,a,o,s,c){let l=[0,0],u=r=>{for(let i=0;i<90&&!e.ok(r[0],r[1],o,s);i++){e.repel(r[0],r[1],o,s,l,.1,.2);let i=l[0],a=l[1],c=Math.hypot(i,a);c<1e-6&&(i=t-r[0],a=n-r[1],c=Math.hypot(i,a)||1),r[0]+=i/c*.3,r[1]+=a/c*.3}},d=Math.cos(a),f=Math.sin(a),p=[];for(let e=0;e<28;e++){let a=e/28*G,o=1+.16*Math.sin(a*2+c)+.08*Math.sin(a*3+c*1.7),s=r*Math.cos(a)*o,l=i*Math.sin(a)*o;p.push([t+s*d-l*f,n+s*f+l*d])}for(let e=0;e<4;e++){for(let e of p)u(e);let e=p.map(e=>e.slice());for(let t=0;t<28;t++){let n=e[(t+28-1)%28],r=e[(t+1)%28];p[t][0]=q(e[t][0],(n[0]+r[0])*.5,.5),p[t][1]=q(e[t][1],(n[1]+r[1])*.5,.5)}}for(let e of p)u(e);let m=[];for(let e=0;e<28;e++){let t=p[(e+28-1)%28],n=p[e],r=p[(e+1)%28],i=p[(e+2)%28];for(let e=0;e<10;e++){let a=e/10,o=a*a,s=o*a,c=(e,t,n,r)=>.5*(2*t+(-e+n)*a+(2*e-5*t+4*n-r)*o+(-e+3*t-3*n+r)*s);m.push([c(t[0],n[0],r[0],i[0]),c(t[1],n[1],r[1],i[1])])}}let h=[0];for(let e=1;e<=m.length;e++){let t=m[e-1],n=m[e%m.length];h.push(h[e-1]+Math.hypot(n[0]-t[0],n[1]-t[1]))}let g=h[m.length],_=Math.max(8,Math.floor(g/.25)),v=new Float32Array(_),y=new Float32Array(_),b=new Float32Array(_),x=0;for(let e=0;e<_;e++){let t=e/_*g;for(;h[x+1]<t;)x++;let n=(t-h[x])/Math.max(1e-6,h[x+1]-h[x]),r=m[x],i=m[(x+1)%m.length];v[e]=q(r[0],i[0],n),y[e]=q(r[1],i[1],n)}let S=[0,0];for(let e=0;e<3;e++){for(let e=0;e<_;e++)S[0]=v[e],S[1]=y[e],u(S),v[e]=S[0],y[e]=S[1];for(let e=0;e<2;e++)for(let e=0;e<_;e++){let t=(e+_-1)%_,n=(e+1)%_;v[e]=q(v[e],(v[t]+v[n])*.5,.5),y[e]=q(y[e],(y[t]+y[n])*.5,.5)}}for(let t=0;t<_;t++)b[t]=e.depthAt(v[t],y[t]);for(let e=0;e<6;e++)for(let e=0;e<_;e++)b[e]=Math.min(b[e],(b[(e+_-1)%_]+b[e]+b[(e+1)%_])/3+.02);return{xs:v,zs:y,ds:b,m:_,len:g,seg:g/_}}function Ue(e,t,n=1,r=9001){let i=t.VIEWS,a=(e,t)=>{let n=e.yaw*Math.PI/180;return[e.pos[0]+Math.sin(n)*t,e.pos[2]-Math.cos(n)*t]},o=[{kind:`school`,sp:0,n:40,at:a(i.spawn,17),R:14,minDepth:1,rx:6,rz:3.5},{kind:`school`,sp:0,n:46,at:a(i.underwater,9),R:10,minDepth:1.8,rx:6.5,rz:4.5,anchor:a(i.underwater,4.5),anchorT:12},{kind:`school`,sp:0,n:36,at:[29,19],R:12,minDepth:1,rx:6,rz:3.5},{kind:`school`,sp:0,n:28,at:[52,-21],R:8,minDepth:1.2,rx:4,rz:3},{kind:`school`,sp:0,n:24,at:[6,-21],R:8,minDepth:1,rx:5,rz:3},{kind:`shoal`,sp:1,n:12,at:a(i.spawn,9),R:12},{kind:`shoal`,sp:1,n:14,at:a(i.shallows,3),R:8},{kind:`shoal`,sp:1,n:10,at:a(i.drifter,5),R:10},{kind:`shoal`,sp:1,n:10,at:[15,30],R:10},{kind:`shoal`,sp:1,n:10,at:a(i.lounge,8),R:10},{kind:`shoal`,sp:1,n:10,at:[-36,20],R:8},{kind:`solo`,sp:2,n:2,at:a(i.shallows,7),R:10,radius:6},{kind:`solo`,sp:2,n:1,at:a(i.spawn,13),R:10,radius:6},{kind:`solo`,sp:2,n:2,at:[-4,16],R:10,radius:7},{kind:`solo`,sp:2,n:1,at:[26,4],R:10,radius:7},{kind:`solo`,sp:2,n:1,at:[16,24],R:8,radius:5},{kind:`solo`,sp:3,n:2,at:[-56,4],R:14,radius:9},{kind:`solo`,sp:3,n:1,at:a(i.underwater,6),R:6,radius:5},{kind:`solo`,sp:3,n:2,at:[36,-2],R:12,radius:9}],s=[],c=[],l=0;for(let t of o){let i=ue[t.sp],a=t.kind===`solo`?t.n:Math.max(3,Math.round(t.n*n)),o;if(o=t.kind===`school`?Ve(e,t.at[0],t.at[1],t.R,(e,n)=>e>t.minDepth+.6&&n>3):t.kind===`shoal`?Ve(e,t.at[0],t.at[1],t.R,(e,t)=>e>.16&&e<.42&&t>.8):Ve(e,t.at[0],t.at[1],t.R,(e,t)=>e>i.depth.minWater+.4&&t>1.6),!o)continue;let u=s.length,d={id:u,kind:t.kind,sp:t.sp,x:o[0],z:o[1],i0:c.length,i1:0},f=(i.len[0]+i.len[1])/2;if(t.kind===`school`){if(d.loop=He(e,o[0],o[1],t.rx,t.rz,J(u,1,r)*G,t.minDepth,1.2,r+u*13),d.speed=i.cruise*f,d.offset=J(u,3,r)*d.loop.len,t.anchor){let e=d.loop,n=0,r=1e9;for(let i=0;i<e.m;i++){let a=(e.xs[i]-t.anchor[0])**2+(e.zs[i]-t.anchor[1])**2;a<r&&(r=a,n=i)}d.offset=((n*e.seg-d.speed*(t.anchorT||12))%e.len+e.len)%e.len}d.depthK=.4;let n=2*f;d.radius=Math.max(.3,Math.cbrt(1.5*a*n*n*n/Math.PI)),d.thick=.45*d.radius,d.lead={x:0,z:0,tx:0,tz:1,y:-1},d.dirSign=1}else t.kind===`shoal`?d.radius=1.4+.1*a:(d.radius=t.radius,d.lead0=c.length);let p=t.sp===2?l++%2:0;for(let e=0;e<a;e++){let e=c.length,n=J(e,11,r),a=i.blocks[0],o=n**1.4;if(t.sp===1){let t=J(e,12,r)<.45;a=t?1:2,o=t?.45+.55*n:.6*n}t.sp===2&&(a=i.blocks[p]),c.push({sp:t.sp,blk:a,g:u,L:q(i.len[0],i.len[1],o),sx:1+.08*(J(e,13,r)-.5),sy:1+.1*(J(e,14,r)-.5),pref:J(e,15,r)})}d.i1=c.length,s.push(d)}return{groups:s,fishList:c}}async function Z(e,t,n=9001){let{layout:i,quality:a,LAYERS:s,G:c}=e,l=e.params,u=a.name,d=u===`low`?.5:u===`medium`?.75:a.cinematic||u===`cinematic`?1.25:1,f=u===`low`?.6:u===`medium`?.8:a.cinematic||u===`cinematic`?1.25:1,p={t0:performance.now()},m=K(a.textureSize||1024,512,2048),g=Te(e,m),_=await new je(e,t,.5).build();p.habitat=performance.now();let{groups:y,fishList:b}=Ue(_,i,d,n),S=new Be(_,ue,b,y,n),w=S.n;p.groups=performance.now();let T=l?.get?.(`fishview`)||null,k={minnow:[0,0],pupfish:[1,1],pupfishf:[1,2],tilapia:[2,3],zillii:[2,3],aureus:[2,5],carp:[3,4]},j=[];if(T){let e=T===`all`?[`minnow`,`pupfish`,`tilapia`,`carp`]:[T];for(let t of e)k[t]&&j.push({sp:k[t][0],blk:k[t][1]})}let M=!!T&&!l?.has?.(`fishall`),N=(e,t)=>{let n=parseFloat(l?.get?.(e));return Number.isFinite(n)?n:t},{map:P,data:F}=await g;p.atlas=performance.now();let I=null;if(l?.get?.(`fishatlas`)){let t=new E({map:l.get(`fishatlas`)===`2`?F:P,side:2,depthTest:!1,depthWrite:!1,transparent:!0,blending:l.get(`fishatlas`)===`2`?0:1});t.userData.noPatch=!0,I=new h(new C(1,1.5),t),I.renderOrder=999,I.frustumCulled=!1,e.scene.add(I)}let ee=ke(e,P,F,{msaa:a.msaa>0}),L=ue.map(()=>[]);for(let e=0;e<w;e++)L[S.sp[e]].push(e);let R=ue.map((t,n)=>{let i=L[n].length+j.filter(e=>e.sp===n).length,a=ye(t,f),o=new Float32Array(Math.max(1,i)*4),c=new Float32Array(Math.max(1,i)*4),l=le(o,4),u=le(c,4);a.setAttribute(`aSwim`,l),a.setAttribute(`aFinAnim`,u);let d=new O(a,ee,Math.max(1,i));return d.name=`ambient-fish-`+t.id,d.instanceMatrix.setUsage(r),d.frustumCulled=!1,d.castShadow=!1,d.receiveShadow=!0,d.layers.set(s.NO_REFLECT),d.count=0,d.userData={swim:o,fin:c,aSwim:l,aFin:u,cap:i},e.scene.add(d),d});for(let e of R)e.count=1;let z=new C(1,1).rotateX(-Math.PI/2),B=new Float32Array(w),te=le(B,1);z.setAttribute(`aShadow`,te);let V=new A({vertexShader:`
      attribute float aShadow; varying float vA; varying vec2 vUv2;
      void main() { vUv2 = uv; vA = aShadow; gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0); }`,fragmentShader:`
      varying float vA; varying vec2 vUv2;
      void main() {
        vec2 p = vUv2 * 2.0 - 1.0;
        // spindle: widest a third behind the snout, narrow caudal peduncle, small tail
        float y = p.y;
        float w = y > -0.55 ? (1.0 - smoothstep(0.35, 1.0, abs(y + 0.25) / 0.75)) : 0.35 * (1.0 - smoothstep(0.0, 0.45, abs(y + 0.8)));
        w = max(w, 0.05);
        float d = abs(p.x) / w;
        float a = vA * (1.0 - smoothstep(0.35, 1.0, d)) * (1.0 - smoothstep(0.85, 1.0, abs(y)));
        gl_FragColor = vec4(0.0, 0.0, 0.0, clamp(a, 0.0, 1.0));
      }`,transparent:!0,depthWrite:!1,depthTest:!0,blending:5,blendEquation:100,blendSrc:200,blendDst:205,blendSrcAlpha:200,blendDstAlpha:201,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});V.userData.noPatch=!0;let H=new O(z,V,Math.max(1,w));H.name=`ambient-fish-shadows`,H.instanceMatrix.setUsage(r),H.frustumCulled=!1,H.castShadow=!1,H.receiveShadow=!1,H.layers.set(s.NO_REFLECT),H.renderOrder=2,H.count=0,e.scene.add(H);let ne=ue.map(e=>{let t=0;for(let[n]of e.width){let r=e.top.find(e=>e[0]>=n)||e.top[e.top.length-1],i=e.bot.find(e=>e[0]>=n)||e.bot[e.bot.length-1];t=Math.max(t,e.width.find(e=>e[0]>=n)[1]*(r[1]-i[1]))}return t}),U=ue.map(e=>2*Re(e)),re=[40,28,75,95],W=e.camera,q=new o,J=new x,ae=new v,oe=l?.freeze!==null&&l?.freeze!==void 0,se=null,fe=1/30;function pe(e){let t=oe?Math.floor((e-8)/4)*4:e-6;S.reset(t);let n=t,r=Math.max(0,Math.floor((e-t)/fe));for(let e=0;e<r;e++)n+=fe,S.step(fe,n);e-n>1e-6&&S.step(e-n,e),se=e}function me(e,t,n){let r=S.L[n],i=Math.cos(S.pitch[n]);ce(e.instanceMatrix.array,t,S.x[n],S.y[n],S.z[n],Math.sin(S.yaw[n])*i,Math.sin(S.pitch[n]),Math.cos(S.yaw[n])*i,S.roll[n],r*S.sx[n],r*S.sy[n],r);let a=e.userData,o=t*4;a.swim[o]=S.tailPh[n],a.swim[o+1]=S.tailA[n],a.swim[o+2]=S.kappa[n],a.swim[o+3]=S.blk[n],a.fin[o]=S.pecPh[n],a.fin[o+1]=S.pecA[n],a.fin[o+2]=S.fold[n],a.fin[o+3]=S.brPh[n]}function he(e,t){W.updateMatrixWorld();let n=W.matrixWorld.elements,r=-n[8],i=-n[9],a=-n[10],o=n[0],s=n[1],c=n[2],u=n[4],d=n[5],f=n[6],p=j.length;j.forEach((n,m)=>{let h=ue[n.sp],g=R[n.sp],_=t[n.sp]++,v=N(`fishlen`,(h.len[0]+h.len[1])/2),y=p>1?.28:v,b=N(`fishdist`,p>1?.9:Math.max(.12,1.7*y)),x=p>1?(m%2-.5)*.36:0,S=p>1?(.5-Math.floor(m/2))*.2:0,C=W.position.x+r*b+o*x+u*S,w=W.position.y+i*b+s*x+d*S,T=W.position.z+a*b+c*x+f*S,E=N(`fishyaw`,0)*Math.PI/180,D=N(`fishpitch`,0)*Math.PI/180,O=o*Math.cos(E)+r*Math.sin(E),k=c*Math.cos(E)+a*Math.sin(E),A=Math.hypot(O,k)||1,j=l?.get?.(`fishpose`)||`swim`,M=N(`fishspeed`,j===`burst`?h.burst:j===`hover`||j===`forage`?0:h.cruise),P=j===`glide`||j===`hover`||j===`forage`?1.3:1.25*M+(n.sp===3?.7:n.sp===2?.9:1.3),F=j===`glide`?.012:j===`hover`||j===`forage`?.018:j===`burst`?.14:h.labriform&&M<h.labriform?.014:.09,I=j===`turn`?N(`fishturn`,1):0,ee=j===`forage`?-.6:D;ce(g.instanceMatrix.array,_,C,w,T,O/A*Math.cos(ee),Math.sin(ee),k/A*Math.cos(ee),0,y,y,y);let L=g.userData,z=_*4,B=j===`hover`||j===`forage`||h.labriform&&M<h.labriform;L.swim[z]=G*P*e,L.swim[z+1]=F,L.swim[z+2]=I,L.swim[z+3]=n.blk,L.fin[z]=G*(B?h.labriform?1.3+2.2*M:2.4:2)*e,L.fin[z+1]=B?h.labriform&&M>0?.5:.28:0,L.fin[z+2]=B?0:ie(.9,2.2,M),L.fin[z+3]=G*h.breath*e})}let ge=[0,0,0,0],_e=0,ve=0,Y=!1,be=!!l?.has?.(`fishstats`);function xe(e,t){!_.collidersDone&&_e<240&&(_e++,_.addColliders()),Y||(_.collidersDone||_e>=240?(pe(t),Y=!0):se===null&&(S.reset(t),se=t));let n=t-se;for((n<0||n>2)&&(se=t,n=0);n>1e-6;){let e=Math.min(n,fe);se+=e,S.step(e,se),n-=e}let r=W.position;S.threat.on=r.y<2.2,S.threat.x=r.x,S.threat.y=Math.min(r.y,.1),S.threat.z=r.z,ge[0]=ge[1]=ge[2]=ge[3]=0;let i=0;if(r.y<80&&Math.abs(r.x)<220&&Math.abs(r.z)<180){W.updateMatrixWorld(),J.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),q.setFromProjectionMatrix(J);let e=c.uSunDir.value,n=Math.hypot(e.x,e.z)||1,a=-e.x/n,o=-e.z/n,s=K(n/1.333,0,.99),l=s/Math.sqrt(1-s*s),u=H.instanceMatrix.array;for(let e=0;e<w&&!M;e++){let t=S.sp[e],n=S.L[e],s=S.x[e]-r.x,c=S.y[e]-r.y,d=S.z[e]-r.z,f=re[t];if(s*s+c*c+d*d>f*f)continue;ae.center.set(S.x[e],S.y[e],S.z[e]),ae.radius=n*.7,q.intersectsSphere(ae)&&me(R[t],ge[t]++,e);let p=_.floorAt(S.x[e],S.z[e]),m=Math.max(0,S.y[e]-p),h=S.x[e]+a*m*l,g=S.z[e]+o*m*l,v=_.floorAt(h,g),y=-v;if(y<.05||y>3.6)continue;let b=.55*(1-ie(1.2,3.6,y))/(1+1.4*m);if(b<.012||(ae.center.set(h,v,g),ae.radius=n*1.5+m,!q.intersectsSphere(ae)))continue;let x=.5,C=_.floorAt(h+x,g)-_.floorAt(h-x,g),w=_.floorAt(h,g+x)-_.floorAt(h,g-x),T=Math.sin(S.yaw[e]),E=Math.cos(S.yaw[e]),D=Math.abs(T*o-E*a),O=1+.8*m,k=n*(ne[t]+U[t]*l*D*.8)*O,A=n*(1+U[t]*l*(1-D)*.5)*(1+.3*m);We(u,i,h,v+.04,g,T,E,-C,2*x,-w,k,A),B[i]=b,i++}j.length&&he(t,ge)}for(let e=0;e<4;e++){let t=R[e];if(t.count=ge[e],t.visible=ge[e]>0,ge[e]>0){t.instanceMatrix.clearUpdateRanges(),t.instanceMatrix.addUpdateRange(0,ge[e]*16),t.instanceMatrix.needsUpdate=!0;let n=t.userData;n.aSwim.clearUpdateRanges(),n.aSwim.addUpdateRange(0,ge[e]*4),n.aSwim.needsUpdate=!0,n.aFin.clearUpdateRanges(),n.aFin.addUpdateRange(0,ge[e]*4),n.aFin.needsUpdate=!0}}if(H.count=i,H.visible=i>0,i>0&&(H.instanceMatrix.clearUpdateRanges(),H.instanceMatrix.addUpdateRange(0,i*16),H.instanceMatrix.needsUpdate=!0,te.clearUpdateRanges(),te.addUpdateRange(0,i),te.needsUpdate=!0),I&&(W.updateMatrixWorld(),I.position.copy(W.position).add(new D(0,0,-1.05).applyQuaternion(W.quaternion)),I.quaternion.copy(W.quaternion)),be&&(++ve%60==1||ve===6||ve===12)){let e=y.map(e=>{let t=0,n=0,r=0;for(let i=e.i0;i<e.i1;i++)t+=S.x[i],n+=S.y[i],r+=S.z[i];let i=Math.max(1,e.i1-e.i0);return`${e.kind[0]}${e.sp}:${(t/i).toFixed(1)},${(n/i).toFixed(2)},${(r/i).toFixed(1)}`}).join(` `);console.log(`[lagoon] fish drawn `+JSON.stringify({t:+t.toFixed(2),counts:ge,nShadow:i,total:w,groups:y.length,colliders:_.collidersDone})+` at `+e)}}p.meshes=performance.now(),xe(1/60,e.engine.time??0),p.first=performance.now(),console.log(`[lagoon] fish: `+w+` fish in `+y.length+` groups, atlas `+m+`x`+Math.round(m*1.5)+` `+JSON.stringify({habitat:Math.round(p.habitat-p.t0),groups:Math.round(p.groups-p.habitat),atlas:Math.round(p.atlas-p.groups),meshes:Math.round(p.meshes-p.atlas),first:Math.round(p.first-p.meshes)}));for(let e of R)e.count===0&&(e.count=1,e.visible=!0,ce(e.instanceMatrix.array,0,0,-50,0,0,0,1,0,.001,.001,.001),e.instanceMatrix.needsUpdate=!0);return{mesh:R[0],meshes:R,shadows:H,update:xe,count:w,schools:y.filter(e=>e.kind===`school`).length,loops:y.filter(e=>e.loop).map(e=>e.loop),groups:y,habitat:_,sim:S,species:ue.map(e=>e.id),speciesIndex:de}}function We(e,t,n,r,i,a,o,s,c,l,u,d){let f=Math.hypot(s,c,l);s/=f,c/=f,l/=f;let p=c*o,m=l*a-s*o,h=-c*a;f=Math.hypot(p,m,h)||1,p/=f,m/=f,h/=f;let g=m*l-h*c,_=h*s-p*l,v=p*c-m*s,y=t*16;e[y]=p*u,e[y+1]=m*u,e[y+2]=h*u,e[y+3]=0,e[y+4]=s,e[y+5]=c,e[y+6]=l,e[y+7]=0,e[y+8]=g*d,e[y+9]=_*d,e[y+10]=v*d,e[y+11]=0,e[y+12]=n,e[y+13]=r,e[y+14]=i,e[y+15]=1}var Ge=Math.PI*2,Ke=class{constructor(){this.pos=[],this.uv=[],this.c1=[],this.c2=[],this.bone=[],this.mat=[],this.idx=[],this.alt=[],this.nrm=null,this.explicitN=new Map,this.part=0,this.color=[1,1,1],this.color2=null,this.boneCur=[0,0,0],this.matCur=[.8,0,0,0],this.colorFn=null,this.color2Fn=null,this.uvFn=null,this.boneFn=null,this.pieceStart=0,this.seams=[]}setPart(e){return this.part=e,this}setColor(e,t=null){return this.color=e,this.color2=t,this.colorFn=null,this.color2Fn=null,this}setMat(e,t=0,n=0,r=0,i=0){return this.matCur=[e,t+Math.min(.95,Math.max(0,n)),r,i],this}setBone(e=0,t=0,n=0){return this.boneCur=[e,t,n],this.boneFn=null,this}vertex(e,t,n,r,i){let a=this.pos.length/3;if(this.pos.push(e,t,n),this.alt.push(e,t,n),r===void 0){let a=this.uvFn?this.uvFn(e,t,n):[0,0];r=a[0],i=a[1]}this.uv.push(r,i);let o=this.colorFn?this.colorFn(e,t,n):this.color,s=this.color2Fn?this.color2Fn(e,t,n):this.color2??o;this.c1.push(o[0],o[1],o[2]),this.c2.push(s[0],s[1],s[2]);let c=this.boneFn?this.boneFn(e,t,n):this.boneCur;return this.bone.push(c[0],c[1],c[2],this.part),this.mat.push(this.matCur[0],this.matCur[1],this.matCur[2],this.matCur[3]),a}setAlt(e,t,n,r){this.alt[e*3]=t,this.alt[e*3+1]=n,this.alt[e*3+2]=r}copyAltFrom(e,t,n=0){let r=t.pos.length/3-n;for(let i=0;i<r;i++){let r=(n+i)*3;this.setAlt(e+i,t.pos[r],t.pos[r+1],t.pos[r+2])}return r}setNormal(e,t){this.explicitN.set(e,t)}tri(e,t,n){this.idx.push(e,t,n)}quad(e,t,n,r){this.idx.push(e,t,n,e,n,r)}beginPiece(){this.pieceStart=this.idx.length}endPiece(e){let t=this.pos,n=this.idx,r=0,i=0,a=0;for(let e=this.pieceStart;e<n.length;e+=3){let o=n[e]*3,s=n[e+1]*3,c=n[e+2]*3,l=t[s]-t[o],u=t[s+1]-t[o+1],d=t[s+2]-t[o+2],f=t[c]-t[o],p=t[c+1]-t[o+1],m=t[c+2]-t[o+2];r+=u*m-d*p,i+=d*f-l*m,a+=l*p-u*f}if(r*e[0]+i*e[1]+a*e[2]<0)for(let e=this.pieceStart;e<n.length;e+=3){let t=n[e+1];n[e+1]=n[e+2],n[e+2]=t}}endPieceOutward(e){let t=this.pos,n=this.idx;for(let r=this.pieceStart;r<n.length;r+=3){let i=n[r]*3,a=n[r+1]*3,o=n[r+2]*3,s=t[a]-t[i],c=t[a+1]-t[i+1],l=t[a+2]-t[i+2],u=t[o]-t[i],d=t[o+1]-t[i+1],f=t[o+2]-t[i+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u,g=(t[i]+t[a]+t[o])/3-e[0],_=(t[i+1]+t[a+1]+t[o+1])/3-e[1],v=(t[i+2]+t[a+2]+t[o+2])/3-e[2];if(p*g+m*_+h*v<0){let e=n[r+1];n[r+1]=n[r+2],n[r+2]=e}}}sweep(e,t,n=[0,1,0],r=null,i=null,a=null){let o=[],s=new D,c=new D,l=new D,u=new D(...n),d=0,f=a&&!this.uvFn;for(let n=0;n<e.length;n++){let p=e[Math.max(0,n-1)].c,m=e[Math.min(e.length-1,n+1)].c;e.length===1&&(p=r??e[0].c,m=i??e[0].c),s.set(m[0]-p[0],m[1]-p[1],m[2]-p[2]).normalize(),c.crossVectors(u,s),c.lengthSq()<1e-8&&c.set(1,0,0),c.normalize(),l.crossVectors(s,c).normalize();let h=e[n];if(n>0){let t=e[n-1].c;d+=Math.hypot(h.c[0]-t[0],h.c[1]-t[1],h.c[2]-t[2])}let g=Math.PI*(h.rx+h.ry);o.push(this.pos.length/3);for(let e=0;e<=t;e++){let n=e/t*Ge+(h.roll??0),r=Math.cos(n)*h.rx,i=Math.sin(n)*h.ry,o=h.c[0]+c.x*r+l.x*i,s=h.c[1]+c.y*r+l.y*i,u=h.c[2]+c.z*r+l.z*i;f?this.vertex(o,s,u,e/t*g*a[0],d*a[1]):this.vertex(o,s,u)}this.seams.push([o[n],o[n]+t])}t+1;for(let n=0;n<e.length-1;n++)for(let e=0;e<t;e++){let t=o[n]+e,r=o[n]+e+1,i=o[n+1]+e+1,a=o[n+1]+e;this.quad(t,r,i,a)}if(r){let e=f?this.vertex(r[0],r[1],r[2],0,-.01*a[1]):this.vertex(r[0],r[1],r[2]);for(let n=0;n<t;n++)this.tri(e,o[0]+n+1,o[0]+n)}if(i){let n=e.length-1,r=f?this.vertex(i[0],i[1],i[2],0,(d+.01)*a[1]):this.vertex(i[0],i[1],i[2]);for(let e=0;e<t;e++)this.tri(r,o[n]+e,o[n]+e+1)}return o}grid(e,t=null){let n=[];for(let r=0;r<e.length;r++){let i=[];for(let n=0;n<e[r].length;n++){let a=e[r][n];i.push(t?this.vertex(a[0],a[1],a[2],t[r][n][0],t[r][n][1]):this.vertex(a[0],a[1],a[2]))}n.push(i)}for(let e=0;e<n.length-1;e++){let t=Math.min(n[e].length,n[e+1].length);for(let r=0;r<t-1;r++)this.quad(n[e][r],n[e+1][r],n[e+1][r+1],n[e][r+1])}return n}vertexCount(){return this.pos.length/3}build(){let e=new S;e.setAttribute(`position`,new l(this.pos,3));{let t=this.pos.length/3,n=new Float32Array(t*4),r=e=>Math.round(Math.sqrt(Math.min(1,Math.max(0,e)))*255),i=(e,t)=>r(e[t*3])+256*r(e[t*3+1])+65536*r(e[t*3+2]);for(let e=0;e<t;e++)n[e*4]=this.uv[e*2],n[e*4+1]=this.uv[e*2+1],n[e*4+2]=i(this.c1,e),n[e*4+3]=i(this.c2,e);e.setAttribute(`aUvC`,new l(n,4))}e.setAttribute(`aBone`,new l(this.bone,4)),e.setAttribute(`aMat`,new l(this.mat,4)),e.setIndex(this.idx),e.computeVertexNormals();{let t=e.attributes.normal.array;for(let[e,n]of this.seams){let r=t[e*3]+t[n*3],i=t[e*3+1]+t[n*3+1],a=t[e*3+2]+t[n*3+2],o=Math.hypot(r,i,a)||1;t[e*3]=t[n*3]=r/o,t[e*3+1]=t[n*3+1]=i/o,t[e*3+2]=t[n*3+2]=a/o}}if(this.explicitN.size){let t=e.attributes.normal.array;for(let[e,n]of this.explicitN)t[e*3]=n[0],t[e*3+1]=n[1],t[e*3+2]=n[2]}e.setAttribute(`aAlt`,new l(this.alt,3));{let t=new S;t.setAttribute(`position`,new l(this.alt,3)),t.setIndex(this.idx),t.computeVertexNormals();let n=t.attributes.normal.array;for(let[e,t]of this.seams){let r=n[e*3]+n[t*3],i=n[e*3+1]+n[t*3+1],a=n[e*3+2]+n[t*3+2],o=Math.hypot(r,i,a)||1;n[e*3]=n[t*3]=r/o,n[e*3+1]=n[t*3+1]=i/o,n[e*3+2]=n[t*3+2]=a/o}let r=this.pos,i=this.alt,a=e.attributes.normal.array;for(let e=0;e<r.length;e+=3)r[e]===i[e]&&r[e+1]===i[e+1]&&r[e+2]===i[e+2]&&(n[e]=a[e],n[e+1]=a[e+1],n[e+2]=a[e+2]);e.setAttribute(`aAltN`,new l(n,3)),t.dispose()}return e.computeBoundingSphere(),e}},qe={P_BODY:10,P_HEAD:11,P_TAIL:12,P_ARM:13,P_HAND:14,NP:[0,.012,.086],S:[.036,.024,.028],W:[.305,.03,.038],TB:[0,.006,-.094],TAIL_FAN:.66,HAND_SWEEP:1.05,ARM_SWEEP:.32},Q={P_TORSO:20,P_NECK:21,P_HEAD:22,P_TIBIA_L:23,P_TARSUS_L:24,P_TOES_L:25,P_TIBIA_R:26,P_TARSUS_R:27,P_TOES_R:28,HP:[0,.47,0],NB:[0,.548,.158],NT:[0,.34,.94],HT:[0,.72,.69],NECK_LEN:.42,LEGX:.032,KNEE_Y:.42,JOINT_Y:.17,FOOT_Y:.012,L1:.25,L2:.158,BILL:.176},Je={P_BODY:30,P_HEAD:31,P_ARM:32,P_HAND:33,P_TAIL:34,P_LEG_L:35,P_LEG_R:36,LIFT:.04,NP:[0,.078,.046],HEAD_DIR:[0,-.3,1],S:[.018,.087,.03],W:[.084,.089,.03],TB:[0,.068,-.062],HIP:[.013,.033,.006],LEG:.033,TAIL_FAN:.62,BILL:[0,.096,.0915],BODY:[[-.08,.068,.009,.006],[-.064,.066,.019,.016],[-.042,.061,.028,.027],[-.016,.059,.033,.035],[.01,.063,.033,.037],[.03,.071,.029,.033],[.046,.081,.021,.025]]};function Ye(e,t,n,r){let i=Math.cos(n),a=Math.sin(n);return r[0]=i*e-a*t,r[1]=a*e+i*t,r}var Xe=[0,0];function Ze(e,t,n){let r=Q.HP,i=Q.NB,a=Q.NT;Ye(i[1]-r[1],i[2]-r[2],e,Xe),t[0]=Xe[0]+r[1],t[1]=Xe[1]+r[2];let o=Math.hypot(a[1],a[2]);return Ye(a[1]/o,a[2]/o,e,n),t}function Qe(e,t){let n=Q.HT,r=Math.hypot(n[1],n[2]);return Ye(n[1]/r,n[2]/r,e,t)}function $e(e,t,n,r,i,a,o,s=null){let c=e[0]+t[0]*i,l=e[1]+t[1]*i,u=n[0]-r[0]*i,d=n[1]-r[1]*i,f=1-a,p=f*f*f,m=3*f*f*a,h=3*f*a*a,g=a*a*a;return o[0]=p*e[0]+m*c+h*u+g*n[0],o[1]=p*e[1]+m*l+h*d+g*n[1],s&&(s[0]=3*f*f*(c-e[0])+6*f*a*(u-c)+3*a*a*(n[0]-u),s[1]=3*f*f*(l-e[1])+6*f*a*(d-l)+3*a*a*(n[1]-d)),o}var et=[0,0],tt=[0,0];function nt(e,t,n,r,i){let a=0;$e(e,t,n,r,i,0,et);for(let o=1;o<=16;o++)$e(e,t,n,r,i,o/16,tt),a+=Math.hypot(tt[0]-et[0],tt[1]-et[1]),et[0]=tt[0],et[1]=tt[1];return a}function rt(e,t,n,r,i=Q.NECK_LEN){let a=.01,o=Math.max(.05,.85*Math.hypot(n[0]-e[0],n[1]-e[1]));if(nt(e,t,n,r,a)>=i)return a;if(nt(e,t,n,r,o)<=i)return o;for(let s=0;s<14;s++){let s=.5*(a+o);nt(e,t,n,r,s)<i?a=s:o=s}return .5*(a+o)}function it(e,t,n,r=Q.L1,i=Q.L2){let a=Math.hypot(e,t),o=(r+i)*.9995,s=Math.abs(r-i)+.02,c=a>o?o/a:a<s?s/Math.max(a,1e-6):1;e*=c,t*=c,a=Math.hypot(e,t);let l=Math.atan2(e,-t),u=(r*r+a*a-i*i)/(2*r*a),d=l-Math.acos(Math.max(-1,Math.min(1,u))),f=Math.sin(d)*r,p=-Math.cos(d)*r,m=Math.atan2(e-f,-(t-p));return n[0]=d,n[1]=m-d,n}var at=Math.PI*2,ot=(e,t,n)=>e<t?t:e>n?n:e,st=(e,t,n)=>e+(t-e)*n,ct=(e,t,n)=>{let r=ot((n-e)/(t-e),0,1);return r*r*(3-2*r)},lt=(e,t,n)=>[st(e[0],t[0],n),st(e[1],t[1],n),st(e[2],t[2],n)],ut=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],dt=e=>{let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]},ft=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],pt=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2];function mt(e,t){let n=dt([t.tip[0]-t.base[0],t.tip[1]-t.base[1],t.tip[2]-t.base[2]]),r=Math.hypot(t.tip[0]-t.base[0],t.tip[1]-t.base[1],t.tip[2]-t.base[2]),i=dt(ft(t.up,n));pt(i,t.outer)<0&&(i=ut(i,-1));let a=dt(ft(n,i)).map((e,r)=>e*(pt(ft(n,i),t.up)<0?-1:1)),o=t.rows??[0,.18,.36,.54,.7,.83,.92,.97],s=t.camber??.0018,c=t.droop??0;e.beginPiece();let l=[],u=[];for(let e of o){let o=e>.84?Math.sqrt(Math.max(0,1-((e-.84)/.16)**2)):1,d=t.wo(e)*o,f=t.wi(e)*o,p=[0,1,2].map(i=>t.base[i]+n[i]*r*e-a[i]*c*e*e),m=(e,t)=>[0,1,2].map(n=>p[n]+i[n]*e*t-a[n]*s*.6);l.push([m(d,1),p.map((e,t)=>e+a[t]*s),m(f,-1)]),u.push([[.5-.5*o,e],[.5,e],[.5+.5*o,e]])}let d=e.grid(l,u),f=d[d.length-1],p=[0,1,2].map(e=>t.tip[e]-a[e]*c),m=e.vertex(p[0],p[1],p[2],.5,1);return e.tri(f[0],f[1],m),e.tri(f[1],f[2],m),e.endPiece(t.up),d}function ht(e,t,n,r,i,a){e.colorFn=(e,n,o)=>{let s=pt(dt([e-t[0],n-t[1],o-t[2]]),r);return s>.82?a:s>.35?i:[.02,.018,.016]};let o=[];for(let e=0;e<=4;e++){let i=e/4*Math.PI;o.push({c:[t[0]+r[0]*-Math.cos(i)*n,t[1]+r[1]*-Math.cos(i)*n,t[2]+r[2]*-Math.cos(i)*n],rx:Math.max(1e-4,Math.sin(i)*n),ry:Math.max(1e-4,Math.sin(i)*n)})}e.sweep(o.slice(1,4),8,Math.abs(r[1])>.9?[1,0,0]:[0,1,0],[t[0]-r[0]*n,t[1]-r[1]*n,t[2]-r[2]*n],[t[0]+r[0]*n,t[1]+r[1]*n,t[2]+r[2]*n]),e.colorFn=null}function gt(e){let t=qe,n=[.052,.035,.024],r=[.1,.05,.026],i=[.15,.095,.058],a=[.2,.165,.125],o=[.25,.21,.16],s=[.06,.042,.03],c=[.62,.43,.045],l=[.02,.018,.016],u=[.6,.42,.05],d=[.05,.034,.023],f=[.16,.105,.064],p=[.075,.038,.02],m=[.042,.031,.023],h=[.07,.058,.05],g=[.026,.021,.018],_=[.26,.21,.16],v=[.028,.023,.02],y=[.1,.066,.042],b=[.19,.14,.095];e.setPart(t.P_BODY).setMat(.86,0,.35,1,0).setBone(0,0,0),e.colorFn=(e,t,a)=>{let o=ct(-.01,.02,t);return lt(a<-.07?lt(r,i,ct(-.07,-.1,a)):r,n,o)},e.sweep([{c:[0,.005,-.126],rx:.016,ry:.007},{c:[0,.002,-.1],rx:.03,ry:.02},{c:[0,-.002,-.058],rx:.045,ry:.036},{c:[0,-.004,-.012],rx:.054,ry:.046},{c:[0,-.002,.032],rx:.051,ry:.047},{c:[0,.003,.066],rx:.04,ry:.039},{c:[0,.008,.09],rx:.029,ry:.03}],12,[0,1,0],[0,.006,-.132],[0,.01,.1],[8.5,8.5]),e.setMat(.5,2,0,0,0);for(let t of[-1,1])e.colorFn=(e,t,n)=>n<-.074?[.015,.013,.012]:u,e.sweep([{c:[t*.017,-.034,-.046],rx:.007,ry:.006},{c:[t*.016,-.036,-.062],rx:.0085,ry:.0065}],6,[0,1,0],[t*.017,-.031,-.036],[t*.014,-.036,-.078]);e.setPart(t.P_HEAD).setMat(.84,0,.3,1,0),e.colorFn=(e,t,n)=>t<.004&&n>.1?o:Math.abs(t-.021)<.007&&n<.14&&n>.1&&Math.abs(e)>.016?lt(a,s,.8):a,e.sweep([{c:[0,.012,.078],rx:.027,ry:.029},{c:[0,.016,.1],rx:.03,ry:.032},{c:[0,.018,.122],rx:.027,ry:.029},{c:[0,.015,.14],rx:.02,ry:.022},{c:[0,.011,.153],rx:.013,ry:.015}],12,[0,1,0],[0,.011,.07],null,[22,22]),e.setMat(.38,2,0,0,0),e.colorFn=(e,t,n)=>n<.163?c:l,e.sweep([{c:[0,.011,.152],rx:.0095,ry:.012},{c:[0,.01,.162],rx:.0078,ry:.0105},{c:[0,.008,.171],rx:.0062,ry:.009},{c:[0,.004,.18],rx:.0044,ry:.0068},{c:[0,-.002,.1855],rx:.0028,ry:.0042}],8,[0,1,0],null,[0,-.0085,.1865]),e.setMat(.12,2,0,0,0);for(let t of[-1,1])ht(e,[t*.0215,.021,.128],.0052,dt([t,.05,.35]),[.15,.075,.032],[.008,.006,.005]);e.setMat(.84,0,.3,1,0),e.colorFn=()=>lt(a,s,.35);for(let t of[-1,1])e.sweep([{c:[t*.019,.029,.118],rx:.004,ry:.003},{c:[t*.02,.029,.13],rx:.0045,ry:.0032},{c:[t*.017,.027,.141],rx:.003,ry:.0022}],6,[0,1,0],[t*.017,.028,.11],[t*.014,.025,.147]);e.setPart(t.P_TAIL).setMat(.8,1,.25,.3,.45);for(let n=0;n<12;n++){let r=(n-5.5)/5.5,i=Math.abs(r),a=r*.085,o=.228+.042*i*Math.sqrt(i),s=[t.TB[0]+r*.026,t.TB[1]+.0022*(1-i)-8e-4*i,t.TB[2]-.004*i],c=[s[0]+Math.sin(a)*o,s[1]-.004,s[2]-Math.cos(a)*o];e.setBone(r,0,0),e.colorFn=()=>y,e.color2Fn=()=>b,mt(e,{base:s,tip:c,up:[0,1,0],outer:[r>=0?1:-1,0,0],wo:e=>st(.011,.014,e),wi:e=>st(.013,.02,e),camber:.0012,droop:.002})}e.colorFn=null,e.color2Fn=null;for(let r of[-1,1]){let i=e=>e*r,a=[r,0,0];e.setPart(t.P_ARM).setMat(.78,1,.12,.35,.5);for(let r=0;r<13;r++){let o=.046+r*.0205,s=r<3,c=s?-.188+r*.006:st(-.172,-.158,(r-3)/9);e.setBone(0,0,ct(t.S[0],t.S[0]+.055,o)),e.colorFn=()=>s?lt(m,n,.4):m,e.color2Fn=()=>h,mt(e,{base:[i(o),.022+r*3e-4,.028],tip:[i(o+.012),.017,c],up:[0,1,0],outer:a,wo:e=>s?.013:.011,wi:e=>(s?.02:.017)*st(1,.92,e),camber:.0016,droop:.003})}e.setPart(t.P_HAND);let o=[[.335,-.15],[.375,-.148],[.425,-.142],[.486,-.13],[.546,-.11],[.606,-.083],[.656,-.051],[.693,-.017],[.704,.014],[.662,.035]],s=o.map((e,t)=>[.31+t*.016,.012+t*.0022]),c=o.map((e,t)=>Math.atan2(-(e[1]-s[t][1]),e[0]-s[t][0])),l=c.reduce((e,t)=>e+t,0)/c.length;for(let t=0;t<10;t++){let n=t>=4,a=n?.5-(t-4)*.02:2;e.setMat(.74,1,.08,.32,.55),e.setBone(t/9,c[t]-l,1),e.colorFn=(e,t,n)=>g;let u=s[t][0],d=s[t][1],f=Math.hypot(o[t][0]-u,o[t][1]-d);e.color2Fn=(e,t,n)=>{let r=Math.hypot(Math.abs(e)-u,n-d)/f;return lt(_,v,ct(.38,.72,r))};let p=t===9?.75:1,m=t<4?2.05:t===4?1.45:1;mt(e,{base:[i(u),.024+t*.0011,d],tip:[i(o[t][0]),.02+t*6e-4,o[t][1]],up:[0,1,0],outer:dt([r*-Math.sin(c[t])*.2,0,Math.cos(c[t])+.2]),wo:e=>p*m*(e<a?.0105:st(.0105,.0055,ct(a,a+.08,e))),wi:e=>p*m*(e<a?.019:st(.019,.0095,ct(a,a+.1,e))),camber:.0015,droop:n?.009+(t-4)*.002:.004})}let u=e=>lt(d,f,ct(.3,.75,e));e.setPart(t.P_ARM).setMat(.84,0,.55,1,.12);{let n=[t.S[0],.07,.11,.16,.21,.26,t.W[0]],r=[],a=[];for(let e of n){let n=(e-t.S[0])/(t.W[0]-t.S[0]),o=st(.074,.085,n),s=st(-.042,-.05,n),c=st(t.S[1],t.W[1],n),l=[],u=[];for(let[t,n,r]of[[0,-.006,.004],[.08,.009,0],[.3,.012,0],[.6,.01,0],[1,.005,0]]){let a=st(o,s,t)+r;l.push([i(e),c+n,a]),u.push([e*9,(.09-a)*9])}r.push(l),a.push(u)}e.beginPiece(),e.boneFn=e=>[0,0,ct(t.S[0],t.S[0]+.055,Math.abs(e))],e.colorFn=(e,n,r)=>{let i=ot((Math.abs(e)-t.S[0])/(t.W[0]-t.S[0]),0,1);return u((st(.074,.085,i)-r)/(st(.074,.085,i)-st(-.042,-.05,i)))},e.color2Fn=()=>p,e.grid(r,a),e.endPiece([0,1,0]),e.boneFn=null}e.setPart(t.P_HAND).setMat(.82,0,.35,1,.12);{let n=[t.W[0],.34,.38,.42,.458],r=[.085,.078,.066,.05,.034],a=[-.05,-.042,-.034,-.024,-.008],o=[],s=[];n.forEach((e,c)=>{let l=c/(n.length-1),u=st(t.W[1],.032,l),d=[],f=[];for(let[t,n]of[[0,-.005],[.12,.008],[.45,.01],[1,.006]]){let o=st(r[c],a[c],t);d.push([i(e),u+n*(1-.5*l),o]),f.push([e*9,(.09-o)*9])}o.push(d),s.push(f)}),e.beginPiece(),e.boneFn=e=>[0,0,ct(t.W[0],t.W[0]+.05,Math.abs(e))],e.colorFn=()=>lt(g,d,.5),e.color2Fn=e=>lt(p,_,ct(.33,.44,Math.abs(e))*.6),e.grid(o,s),e.endPiece([0,1,0]),e.boneFn=null}e.colorFn=null,e.color2Fn=null}}function _t(){let e=[0,0],t=[0,0],n=[0,0];Ze(-.5,e,t),Qe(-.05,n);let r=[.92,.19];return{P0:e,T0:t,P3:r,T3:n,m:rt(e,t,r,n)}}function vt(e){return .0172+.017*(1-ct(0,.28,e))+.0028*ct(.72,1,e)}function yt(e){let t=Q,n=[.8,.8,.765],r=e=>ut(n,e),i=[.78,.43,.02],a=[.52,.3,.03],o=[.5,.56,.1],s=[.013,.012,.011];e.setPart(t.P_TORSO).setMat(.8,0,.05,.055,.22).setBone(0,0,0),e.colorFn=(e,t,n)=>r(.9+.1*ct(.44,.52,t)),e.sweep([{c:[0,.478,-.285],rx:.02,ry:.006},{c:[0,.482,-.235],rx:.034,ry:.012},{c:[0,.489,-.175],rx:.05,ry:.032},{c:[0,.495,-.11],rx:.062,ry:.055},{c:[0,.498,-.04],rx:.067,ry:.068},{c:[0,.499,.03],rx:.064,ry:.073},{c:[0,.505,.09],rx:.054,ry:.066},{c:[0,.518,.14],rx:.04,ry:.05},{c:[0,.534,.172],rx:.029,ry:.034}],16,[0,1,0],[0,.477,-.3],[0,.545,.19],[4.5,4.5]),e.setMat(.78,0,.07,.09,.28);for(let t of[-1,1])e.colorFn=(e,t,n)=>r(.94+.06*ct(.47,.53,t)),e.sweep([{c:[t*.05,.53,.125],rx:.012,ry:.03},{c:[t*.062,.522,.06],rx:.016,ry:.05},{c:[t*.066,.515,-.02],rx:.017,ry:.057},{c:[t*.058,.508,-.1],rx:.016,ry:.048},{c:[t*.04,.5,-.18],rx:.013,ry:.032},{c:[t*.022,.494,-.25],rx:.009,ry:.017}],10,[0,1,0],[t*.045,.534,.15],[t*.006,.49,-.31],[5.5,5.5]);e.setPart(t.P_NECK).setMat(.82,0,.04,.05,.22);{let n=_t(),i=[0,0],a=[0,0],o=[];for(let s=0;s<15;s++){let c=s/14;$e(n.P0,n.T0,n.P3,n.T3,n.m,c,i,a);let l=Math.hypot(a[0],a[1])||1,u=a[0]/l,d=a[1]/l,f=vt(c),p=[];for(let n=0;n<=10;n++){let a=n/10*at,o=Math.cos(a),s=Math.sin(a),l=f*.92*o,m=i[0]+s*f*d,h=i[1]-s*f*u;e.boneFn=()=>[c,a,f],e.colorFn=()=>r(.97),p.push(e.vertex(l,m,h,n/10*at*f*14,c*t.NECK_LEN*14))}o.push(p),e.seams.push([p[0],p[10]])}e.beginPiece();let s=t=>{let r=e.bone[t*4],o=e.bone[t*4+1];$e(n.P0,n.T0,n.P3,n.T3,n.m,r,i,a);let s=Math.hypot(a[0],a[1])||1,c=Math.sin(o);return[Math.cos(o),c*a[1]/s,-c*a[0]/s]};for(let t=0;t<14;t++)for(let n=0;n<10;n++){let r=o[t][n],i=o[t][n+1],a=o[t+1][n+1],c=o[t+1][n];for(let[t,n,o]of[[r,i,a],[r,a,c]]){let r=e.pos;pt(ft([r[n*3]-r[t*3],r[n*3+1]-r[t*3+1],r[n*3+2]-r[t*3+2]],[r[o*3]-r[t*3],r[o*3+1]-r[t*3+1],r[o*3+2]-r[t*3+2]]),s(t))>=0?e.tri(t,n,o):e.tri(t,o,n)}}e.boneFn=null}e.setPart(t.P_HEAD).setMat(.8,0,.03,.05,.2).setBone(0,0,0),e.colorFn=(e,t,n)=>n>.036&&t<.012&&t>-.008&&Math.abs(e)>.006?o:r(.98),e.sweep([{c:[0,.003,-.02],rx:.0135,ry:.0135},{c:[0,.009,-.006],rx:.0168,ry:.0188},{c:[0,.011,.012],rx:.0178,ry:.0198},{c:[0,.008,.03],rx:.0158,ry:.0168},{c:[0,.004,.045],rx:.0122,ry:.0128},{c:[0,.002,.055],rx:.0098,ry:.011}],12,[0,1,0],[0,.002,-.028],null,[26,26]),e.setMat(.36,2,0,0,0),e.colorFn=(e,t,n)=>{let r=lt(i,a,ct(.13,.172,n));return Math.abs(t-st(0,-.003,(n-.055)/.12))<7e-4?ut(r,.45):r},e.sweep([{c:[0,.0015,.054],rx:.0092,ry:.0106},{c:[0,0,.08],rx:.0073,ry:.0086},{c:[0,-.0014,.11],rx:.0055,ry:.0063},{c:[0,-.0028,.14],rx:.0037,ry:.0042},{c:[0,-.0036,.16],rx:.0021,ry:.0024}],8,[0,1,0],null,[0,-.004,t.BILL]),e.setMat(.1,2,0,0,0);for(let t of[-1,1])ht(e,[t*.0138,.0085,.036],.0042,dt([t,.08,.3]),[.72,.56,.06],[.006,.005,.005]);for(let n of[1,-1]){let i=n*t.LEGX,a=n>0?t.P_TIBIA_L:t.P_TIBIA_R;e.setPart(a).setBone(0,0,0),e.setMat(.5,2,0,0,0),e.colorFn=(e,t)=>t>.392?r(.9):s,e.sweep([{c:[i,.455,0],rx:.022,ry:.025},{c:[i,.425,0],rx:.019,ry:.021},{c:[i,.395,0],rx:.0145,ry:.0155},{c:[i,.374,0],rx:.0085,ry:.009},{c:[i,.3,0],rx:.0062,ry:.0068},{c:[i,.21,0],rx:.0054,ry:.006},{c:[i,.178,0],rx:.0068,ry:.0074},{c:[i,.163,0],rx:.006,ry:.0064}],8,[0,0,1],[i,.465,0],[i,.158,0],[60,60]),e.setPart(a+1).setMat(.46,0,0,.8,0),e.colorFn=()=>s,e.sweep([{c:[i,.176,0],rx:.0064,ry:.0068},{c:[i,.152,0],rx:.0052,ry:.0058},{c:[i,.06,0],rx:.0047,ry:.0053},{c:[i,.02,0],rx:.0052,ry:.0056}],8,[0,0,1],null,[i,.008,.001],[70,70]),e.setPart(a+2).setMat(.48,0,0,.8,0);let o=[[0,.096],[-.42*n,.076],[.44*n,.083],[Math.PI,.05]];for(let[t,n]of o){let r=Math.sin(t),a=Math.cos(t),o=[];for(let e=0;e<=4;e++){let t=e/4;o.push({c:[i+r*n*t*.97,.0038-.0013*t,a*n*t*.97],rx:st(.0038,.0017,t),ry:st(.0034,.0015,t),t})}e.boneFn=(e,o,s)=>[ot(((e-i)*r+s*a)/n,0,1),t===Math.PI?0:t,+(t===Math.PI)],e.colorFn=(e,t,o)=>((e-i)*r+o*a)/n>.93?[.03,.028,.026]:s,e.sweep(o,6,[0,1,0],[i-r*.004,.005,-a*.004],[i+r*n,.0012,a*n],[120,120])}e.boneFn=null}e.colorFn=null}function bt(e={}){let t=new Ke;gt(t);let n=t.vertexCount();yt(t);let r=t.vertexCount()-n,i=0;if(e.dove&&typeof e.dove==`function`){let n=t.vertexCount();e.dove(t),i=t.vertexCount()-n}let a=t.build();return a.userData.counts={kite:n,egret:r,dove:i,total:t.vertexCount(),tris:t.idx.length/3},a}var xt=(e,t,n)=>e<t?t:e>n?n:e,St=(e,t,n)=>e+(t-e)*n,Ct=(e,t,n)=>{let r=xt((n-e)/(t-e),0,1);return r*r*(3-2*r)},wt=(e,t,n)=>[St(e[0],t[0],n),St(e[1],t[1],n),St(e[2],t[2],n)],Tt=e=>{let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]},Et=(e,t,n)=>{let r=Math.sin(e*127.1+t*311.7+n*74.7)*43758.5453;return r-Math.floor(r)},Dt=[.4,.235,.205],Ot=[.34,.215,.2],kt=[.45,.24,.19],At=[.29,.115,.045],jt=[.018,.014,.012],Mt=[.6,.5,.42],Nt=[.68,.64,.58],Pt=[.24,.115,.062],Ft=[.25,.125,.07],It=[.12,.14,.18],Lt=[.07,.064,.062],Rt=[.16,.165,.18],zt=[.045,.04,.037],Bt=[.13,.13,.14],Vt=[.24,.26,.3],Ht=[.19,.11,.07],Ut=[.06,.056,.056],Wt=[.7,.69,.66],Gt=[.025,.023,.023],Kt=[.028,.026,.03],qt=[.07,.03,.018],Jt=[.46,.12,.11],Yt=[.03,.025,.022];function Xt(e,t){let n=Je.BODY;if(e-=Je.LIFT,t<=n[0][0]||t>=n[n.length-1][0])return 0;let r=0;for(;r<n.length-2&&t>n[r+1][0];)r++;let i=(t-n[r][0])/(n[r+1][0]-n[r][0]),a=St(n[r][1],n[r+1][1],i),o=St(n[r][2],n[r+1][2],i),s=St(n[r][3],n[r+1][3],i),c=(e-a)/s;return c*c>=1?0:o*Math.sqrt(1-c*c)}function Zt(e,t,n,r){let i=e.alt;for(let e=t;e<n;e++){let t=e*3,n=i[t]<0?-1:1,a=Xt(i[t+1],i[t+2])+r;Math.abs(i[t])<a&&(i[t]=n*a)}}function Qt(e){let t=Je,n=t.LIFT,r=e=>[e[0],e[1]+n,e[2]],i=r(t.S),a=r(t.W),o=r(t.TB),s=e.vertexCount();e.setPart(t.P_BODY).setMat(.86,0,.18,.35,.05).setBone(0,0,0),e.colorFn=(e,t,n)=>{let r=Ct(.1,.122,t);return wt(wt(wt(wt(kt,Mt,.4),kt,Ct(-.01,.03,n)),wt(Mt,Nt,Ct(-.03,-.065,n)),Ct(.085,.07,t)*Ct(.01,-.02,n)),Pt,r)},e.sweep(t.BODY.map(([e,t,r,i])=>({c:[0,t+n,e],rx:r,ry:i})),18,[0,1,0],[0,.109,-.086],[0,.128,.053],[34,34]),e.setPart(t.P_HEAD).setMat(.84,0,.1,.3,.05),e.colorFn=(e,t,n)=>{if(n-.03>.2*Math.abs(e)-.004&&t>.106&&t<.132&&n>.034){let r=[Math.floor(e/.0042),Math.floor(t/.0038),Math.floor(n/.004)];return Et(r[0],r[1],r[2])>.55?jt:At}return t>.145?Ot:wt(kt,Dt,Ct(.12,.14,t))},e.sweep([{c:[0,.108,.03],rx:.02,ry:.021},{c:[0,.12,.041],rx:.0165,ry:.0175},{c:[0,.131,.05],rx:.0135,ry:.0142},{c:[0,.139,.055],rx:.0122,ry:.0128}],16,[0,0,1],null,null,[40,40]),e.sweep([{c:[0,.1445,.047],rx:.0098,ry:.0102},{c:[0,.1465,.053],rx:.0124,ry:.013},{c:[0,.1465,.062],rx:.0133,ry:.014},{c:[0,.1435,.071],rx:.0112,ry:.0117},{c:[0,.14,.0775],rx:.0068,ry:.0074}],16,[0,1,0],[0,.144,.042],null,[48,48]),e.setMat(.4,2,0,0,0),e.colorFn=(e,t,n)=>n<.0815?[.1,.095,.1]:Kt,e.sweep([{c:[0,.1395,.0772],rx:.0044,ry:.0052},{c:[0,.1382,.0825],rx:.0031,ry:.0036},{c:[0,.137,.0875],rx:.002,ry:.0024}],6,[0,1,0],null,[0,.1358,t.BILL[2]]),e.setMat(.1,2,0,0,0);for(let t of[-1,1])ht(e,[t*.0106,.1478,.0655],.0031,Tt([t,.1,.45]),qt,[.006,.005,.005]);e.colorFn=null,e.setPart(t.P_TAIL).setMat(.8,1,.12,.08,.35);for(let t=0;t<12;t++){let n=(t-5.5)/5.5,r=Math.abs(n),i=.11-.03*r*r,a=[o[0]+n*.011,o[1]+.0018*(1-r),o[2]-.002*r],s=[a[0]+n*.009,a[1]-.006,a[2]-i];e.setBone(n,0,0);let c=r>.3;e.colorFn=(e,t,n)=>{let o=(a[2]-n)/i;return c?o>.74?Wt:wt(Ht,Ut,Ct(.05,.3,r)):Ht},e.color2Fn=(e,t,n)=>(a[2]-n)/i>.74&&c?Wt:Gt,mt(e,{base:a,tip:s,up:[0,1,0],outer:[n>=0?1:-1,0,0],wo:e=>St(.0048,.0056,e),wi:e=>St(.0062,.0085,e),camber:8e-4,droop:.002})}e.colorFn=null,e.color2Fn=null;for(let n of[-1,1]){let r=e=>e*n,o=[n,0,0],s=e=>[e[0]*n,e[1],e[2]],c=e=>{let t=new Ke;return mt(t,e),t};e.setPart(t.P_ARM).setMat(.8,1,.1,.15,.45);for(let t=0;t<12;t++){let n=t/11,a=.022+t*.0053,l=t<3;e.setBone(0,0,Ct(i[0],i[0]+.02,a)),e.colorFn=()=>l?wt(Lt,Pt,.55):Lt,e.color2Fn=()=>Rt;let u=()=>l?.0062:.0055,d=e=>(l?.0095:.0085)*St(1,.94,e),f=e.vertexCount();mt(e,{base:[r(a),.127,.014],tip:[r(a+.004),.124,l?-.044+t*.002:-.038],up:[0,1,0],outer:o,wo:u,wi:d,camber:.001,droop:.0015});let p=St(.131,.113,n),m=St(.008,.02,n),h=St(.128,.112,n),g=St(-.05,-.045,n),_=s(Tt([St(.4,.9,n),St(.92,.45,n),0])),v=c({base:[r(Xt(p,m)+.004),p,m],tip:[r(Xt(h,g)+.005),h,g],up:_,outer:[0,-1,0],wo:u,wi:d,camber:.001,droop:.0015});e.copyAltFrom(f,v),Zt(e,f,e.vertexCount(),.004+4e-4*(11-t))}e.setPart(t.P_HAND);let l=[[.094,-.046],[.108,-.049],[.123,-.049],[.139,-.047],[.155,-.042],[.17,-.035],[.184,-.025],[.197,-.013],[.206,0],[.199,.011]],u=l.map((e,t)=>[.08+t*.0048,.02+t*8e-4]),d=l.map((e,t)=>Math.atan2(-(e[1]-u[t][1]),e[0]-u[t][0])),f=d.reduce((e,t)=>e+t,0)/d.length;for(let t=0;t<10;t++){e.setMat(.76,1,.08,.12,.5),e.setBone(t/9,d[t]-f,1),e.colorFn=()=>zt,e.color2Fn=()=>Bt;let i=t>=7?.62:2,a=e=>e<i?.0052:St(.0052,.0034,Ct(i,i+.1,e)),o=e=>e<i?.0098:St(.0098,.0062,Ct(i,i+.12,e)),p=u[t][0],m=u[t][1],h=Math.hypot(l[t][0]-p,l[t][1]-m),g=e.vertexCount();mt(e,{base:[r(p),.128+t*4e-4,m],tip:[r(l[t][0]),.126+t*2e-4,l[t][1]],up:[0,1,0],outer:Tt([n*-Math.sin(d[t])*.2,0,Math.cos(d[t])+.2]),wo:a,wi:o,camber:.001,droop:.003});let _=t/9,v=[0,St(.111,.116,_),St(.032,-.002,_)],y=Tt([-.07,.09,-1]),b=[0,v[1]+y[1]*h,v[2]+y[2]*h],x=Xt(v[1],v[2])+.004,S=c({base:[r(x),v[1],v[2]],tip:[r(Math.max(.011,x+y[0]*h*.9)),b[1],b[2]],up:s(Tt([.62,.78,0])),outer:[0,-1,0],wo:a,wi:o,camber:.001,droop:.001});e.copyAltFrom(g,S),Zt(e,g,e.vertexCount(),.0015+25e-5*(9-t))}e.setPart(t.P_ARM).setMat(.84,0,.3,.4,.1);{let t=[i[0],.03,.043,.056,.07,a[0]],n=[[0,-.004],[.1,.005],[.35,.007],[.65,.006],[1,.003]],o=[],s=[],c=[];for(let e of t){let t=(e-i[0])/(a[0]-i[0]),l=St(.044,.041,t),u=St(i[1],a[1],t),d=[],f=[],p=[];for(let[i,a]of n){let n=St(l,-.006,i);d.push([r(e),u+a,n]),f.push([e*30,(.05-n)*30]);let o=St(.134,.111,t)+.002*i,s=St(.03,.04,t)-.05*i;p.push([r(Xt(o,s)+.0095),o,s])}o.push(d),s.push(f),c.push(p)}e.beginPiece();let l=e.vertexCount();e.boneFn=e=>[0,0,Ct(i[0],i[0]+.02,Math.abs(e))],e.colorFn=(e,t,n)=>{let r=xt((Math.abs(e)-i[0])/(a[0]-i[0]),0,1);return wt(Ft,It,Ct(.48,.7,(St(.044,.041,r)-n)/(St(.044,.041,r)+.006))*(1-.3*Ct(.7,1,r)))},e.color2Fn=()=>Vt,e.grid(o,s),e.endPiece([0,1,0]);let u=new Ke;u.grid(c,s),e.copyAltFrom(l,u),Zt(e,l,e.vertexCount(),.0095),e.boneFn=null}e.setPart(t.P_HAND).setMat(.82,0,.2,.3,.1).setBone(0,0,1);{let t=[a[0],.095,.108,.12],n=[.041,.036,.03,.022],i=[-.004,0,.004,.008],o=[],s=[],c=[];t.forEach((e,l)=>{let u=l/(t.length-1),d=[],f=[],p=[];for(let[t,o]of[[0,-.003],[.15,.005],[.5,.006],[1,.004]]){let s=St(n[l],i[l],t);d.push([r(e),St(a[1],.13,u)+o*(1-.4*u),s]),f.push([e*30,(.05-s)*30]);let c=.109+.006*t+.004*u,m=.038-.036*u-.006*t;p.push([r(Xt(c,m)+.0048),c,m])}o.push(d),s.push(f),c.push(p)}),e.beginPiece();let l=e.vertexCount();e.colorFn=()=>wt(zt,Lt,.6),e.color2Fn=()=>Vt,e.grid(o,s),e.endPiece([0,1,0]);let u=new Ke;u.grid(c,s),e.copyAltFrom(l,u),Zt(e,l,e.vertexCount(),.0048)}e.colorFn=null,e.color2Fn=null}{let t=e.pos,r=e.alt,i=e.vertexCount();for(let e=s;e<i;e++)t[e*3+1]-=n,r[e*3+1]-=n}for(let n of[1,-1]){let r=n*t.HIP[0],i=t.HIP[1],a=t.HIP[2];e.setPart(n>0?t.P_LEG_L:t.P_LEG_R).setBone(0,0,0),e.setMat(.86,0,.1,.2,0),e.colorFn=()=>wt(Mt,kt,.25),e.sweep([{c:[r,i+.004,a-.002],rx:.0085,ry:.0085},{c:[r,i-.005,a],rx:.0066,ry:.0066},{c:[r,i-.012,a+.002],rx:.0034,ry:.0034}],6,[0,0,1],[r,i+.01,a-.003],null),e.setMat(.5,2,0,0,0),e.colorFn=()=>Jt,e.sweep([{c:[r,i-.009,a+.002],rx:.0026,ry:.0026},{c:[r,.011,.0105],rx:.0024,ry:.0024},{c:[r,.005,.012],rx:.0023,ry:.0023}],6,[0,0,1],null,[r,.003,.0125]);for(let[t,i]of[[0,.021],[-.42*n,.017],[.44*n,.017],[Math.PI,.012]]){let n=Math.sin(t),a=Math.cos(t);e.colorFn=(e,t,o)=>((e-r)*n+(o-.012)*a)/i>.86?Yt:Jt,e.sweep([{c:[r,.0026,.012],rx:.0019,ry:.0017},{c:[r+n*i*.5,.0019,.012+a*i*.5],rx:.0015,ry:.0013}],5,[0,1,0],null,[r+n*i,9e-4,.012+a*i])}}e.colorFn=null}var $t=e=>{let t=(+e).toFixed(5);return t.includes(`.`)?t:t+`.0`},en=e=>`vec3(${$t(e[0])}, ${$t(e[1])}, ${$t(e[2])})`,tn=e=>{let t=Math.hypot(e[0],e[1],e[2]);return en([e[0]/t,e[1]/t,e[2]/t])},nn=`
attribute vec4 aUvC;
attribute vec4 aBone;
attribute vec4 aMat;
attribute vec4 aPA;
attribute vec4 aPB;
attribute vec4 aPC;
attribute vec3 aAlt;
attribute vec3 aAltN;
${U}
vec3 birdUnpackCol(float v) {
  float b = floor(v / 65536.0);
  float r1 = v - b * 65536.0;
  float g = floor(r1 / 256.0);
  vec3 c = vec3(r1 - g * 256.0, g, b) / 255.0;
  return c * c;
}
// ---- black kite
void kiteDeform(inout vec3 p, inout vec3 n, float part) {
  if (part < 10.5) return;
  if (part < 11.5) {
    const vec3 NP = ${en(qe.NP)};
    p = ambRotY(ambRotX(p - NP, aPC.y), aPC.x) + NP;
    n = ambRotY(ambRotX(n, aPC.y), aPC.x);
    return;
  }
  if (part < 12.5) {
    const vec3 TB = ${en(qe.TB)};
    float a = -aPB.w * aBone.x * ${$t(qe.TAIL_FAN)};
    vec3 q = ambRotY(p - TB, a); vec3 m = ambRotY(n, a);
    q = ambRotX(q, aPC.z); m = ambRotX(m, aPC.z);
    q = ambRotZ(q, aPB.z); m = ambRotZ(m, aPB.z);
    p = q + TB; n = m;
    return;
  }
  // wings: mirror to the +x side, hand (wrist) then arm (shoulder)
  float sd = p.x < 0.0 ? -1.0 : 1.0;
  vec3 q = vec3(abs(p.x), p.y, p.z);
  vec3 m = vec3(n.x * sd, n.y, n.z);
  float fold = aPA.w;
  const vec3 S = ${en(qe.S)};
  const vec3 W = ${en(qe.W)};
  if (part > 13.5) {
    float w = aBone.z;
    float close = -fold * 0.8 * aBone.y;
    float hs = fold * ${$t(qe.HAND_SWEEP)} * w + close;
    float we = (aPA.y - fold * 0.32) * w;
    q -= W;
    q = ambRotY(q, hs); m = ambRotY(m, hs);
    q = ambRotZ(q, we); m = ambRotZ(m, we);
    q += W;
  }
  float aw = part > 13.5 ? 1.0 : aBone.z;
  float el = (aPA.x + aPB.y * sd) * aw;
  float sw = (aPA.z + fold * ${$t(qe.ARM_SWEEP)}) * aw;
  float tw = aPB.x * aw;
  q -= S;
  q = ambRotX(q, tw); m = ambRotX(m, tw);
  q = ambRotY(q, sw); m = ambRotY(m, sw);
  q = ambRotZ(q, el); m = ambRotZ(m, el);
  q += S;
  p = vec3(q.x * sd, q.y, q.z); n = vec3(m.x * sd, m.y, m.z);
}
// ---- great egret
void egretDeform(inout vec3 p, inout vec3 n, float part) {
  const vec3 HP = ${en(Q.HP)};
  float pitch = aPC.x;
  if (part < 20.5) { p = ambRotX(p - HP, pitch) + HP; n = ambRotX(n, pitch); return; }
  if (part < 22.5) {
    vec3 P0 = ambRotX(${en(Q.NB)} - HP, pitch) + HP;
    vec3 T0 = ambRotX(${tn(Q.NT)}, pitch);
    vec3 P3 = vec3(0.0, aPB.x, aPB.y);
    float hp = aPB.z;
    vec3 T3 = ambRotX(${tn(Q.HT)}, hp);
    float ml = aPC.y;
    vec3 P1 = P0 + T0 * ml, P2 = P3 - T3 * ml;
    vec3 q, m;
    if (part < 21.5) {
      float s = aBone.x, th = aBone.y, r = aBone.z;
      float u = 1.0 - s;
      vec3 C = u * u * u * P0 + 3.0 * u * u * s * P1 + 3.0 * u * s * s * P2 + s * s * s * P3;
      vec3 T = 3.0 * u * u * (P1 - P0) + 6.0 * u * s * (P2 - P1) + 3.0 * s * s * (P3 - P2);
      T = normalize(T + vec3(0.0, 1e-5, 0.0));
      vec3 N = vec3(0.0, T.z, -T.y);
      float cx = cos(th), cn = sin(th);
      q = C + vec3(cx * r * 0.92, 0.0, 0.0) + N * (cn * r);
      m = normalize(vec3(cx, 0.0, 0.0) + N * cn);
    } else {
      q = P3 + ambRotX(p, hp); m = ambRotX(n, hp);
    }
    float yaw = aPB.w;
    p = ambRotY(q - P0, yaw) + P0; n = ambRotY(m, yaw);
    return;
  }
  bool right = part > 25.5;
  float lp = right ? part - 3.0 : part;
  float th1 = right ? aPA.z : aPA.x;
  float th2 = right ? aPA.w : aPA.y;
  float sx = right ? -1.0 : 1.0;
  vec3 K = vec3(sx * ${$t(Q.LEGX)}, ${$t(Q.KNEE_Y)}, 0.0);
  vec3 J = vec3(sx * ${$t(Q.LEGX)}, ${$t(Q.JOINT_Y)}, 0.0);
  vec3 F = vec3(sx * ${$t(Q.LEGX)}, ${$t(Q.FOOT_Y)}, 0.0);
  if (lp > 24.5) {
    float pk = aPC.z;
    float cl = floor(pk + 1e-4);
    float curl = right ? clamp((pk - cl) / 0.99, 0.0, 1.0) : cl / 255.0;
    vec3 t = p - F; vec3 m = n;
    if (aBone.z > 0.5) {           // hallux folds forward/down
      t = ambRotX(t, -curl * 0.9); m = ambRotX(m, -curl * 0.9);
    } else {                       // front toes close together and droop
      float cv = -aBone.y * 0.62 * curl;
      t = ambRotY(t, cv); m = ambRotY(m, cv);
      t = ambRotX(t, curl * 1.25); m = ambRotX(m, curl * 1.25);
    }
    vec3 Fp = ambRotX(ambRotX(F - J, -th2) + J - K, -th1) + K;
    p = Fp + t; n = m;
  } else {
    if (lp > 23.5) { p = ambRotX(p - J, -th2) + J; n = ambRotX(n, -th2); }
    p = ambRotX(p - K, -th1) + K; n = ambRotX(n, -th1);
  }
}
// ---- laughing dove
// aPA = (shoulder elev, wrist elev, fold 0..1, hand sweep)   aPB = (head thrust, head pitch, head yaw, body pitch)
// aPC = (tail fan, tail pitch 8b + leg lift L 8b + leg lift R 8b, leg swing L 12b + R 12b, 2)
void doveDeform(inout vec3 p, inout vec3 n, float part) {
  const vec3 HIPC = vec3(0.0, ${$t(Je.HIP[1])}, ${$t(Je.HIP[2])});
  float bp = aPB.w;                       // body pitch about the hips (+ = nose down)
  if (part < 30.5) { p = ambRotX(p - HIPC, bp) + HIPC; n = ambRotX(n, bp); return; }
  if (part < 31.5) {
    const vec3 NP = ${en(Je.NP)};
    const vec3 HD = ${tn(Je.HEAD_DIR)};
    vec3 q = ambRotY(ambRotX(p - NP, aPB.y), aPB.z) + NP + HD * aPB.x;
    vec3 m = ambRotY(ambRotX(n, aPB.y), aPB.z);
    p = ambRotX(q - HIPC, bp) + HIPC; n = ambRotX(m, bp);
    return;
  }
  float pk = aPC.y;
  float liftR = floor(pk / 65536.0);
  float r1 = pk - liftR * 65536.0;
  float liftL = floor(r1 / 256.0);
  float tp8 = r1 - liftL * 256.0;
  if (part < 33.5) {
    float sd = p.x < 0.0 ? -1.0 : 1.0;
    vec3 q = vec3(abs(p.x), p.y, p.z);
    vec3 m = vec3(n.x * sd, n.y, n.z);
    float fold = clamp(aPA.z, 0.0, 1.0);
    if (fold < 0.999) {
      const vec3 S = ${en(Je.S)};
      const vec3 W = ${en(Je.W)};
      float hs = aPA.w;
      if (part > 32.5) {
        float ha = (hs - hs * 0.6 * aBone.y) * aBone.z;   // primaries bunch as the hand sweeps back
        float we = aPA.y * aBone.z;
        q -= W; q = ambRotY(q, ha); m = ambRotY(m, ha); q = ambRotZ(q, we); m = ambRotZ(m, we); q += W;
      }
      float aw = part > 32.5 ? 1.0 : aBone.z;
      float asw = hs * 0.3 * aw, el = aPA.x * aw;
      q -= S;
      q = ambRotY(q, asw); m = ambRotY(m, asw);
      q = ambRotZ(q, el); m = ambRotZ(m, el);
      q += S;
    }
    vec3 qa = vec3(abs(aAlt.x), aAlt.y, aAlt.z);
    vec3 ma = vec3(aAltN.x * sd, aAltN.y, aAltN.z);
    q = mix(q, qa, fold);
    m = normalize(mix(m, ma, fold) + vec3(0.0, 1e-4, 0.0));
    p = vec3(q.x * sd, q.y, q.z); n = vec3(m.x * sd, m.y, m.z);
    p = ambRotX(p - HIPC, bp) + HIPC; n = ambRotX(n, bp);
    return;
  }
  if (part < 34.5) {
    const vec3 TB = ${en(Je.TB)};
    float tpitch = tp8 / 255.0 * 1.6 - 0.8;           // + = tail raised
    float a = -aPC.x * aBone.x * ${$t(Je.TAIL_FAN)};
    vec3 q = ambRotY(p - TB, a); vec3 m = ambRotY(n, a);
    q = ambRotX(q, tpitch); m = ambRotX(m, tpitch);
    p = ambRotX(q + TB - HIPC, bp) + HIPC; n = ambRotX(m, bp);
    return;
  }
  // legs: foot lift (the tarsus folds up) then swing about the hip (+ = foot forward)
  bool left = part < 35.5;
  float sw12 = aPC.z;
  float sR = floor(sw12 / 4096.0);
  float sL = sw12 - sR * 4096.0;
  float swing = (left ? sL : sR) / 4095.0 * 3.2 - 1.6;
  float lift = (left ? liftL : liftR) / 255.0;
  vec3 H = vec3((left ? 1.0 : -1.0) * ${$t(Je.HIP[0])}, ${$t(Je.HIP[1])}, ${$t(Je.HIP[2])});
  p.y += lift * ${$t(Je.LEG*.7)} * clamp((H.y - p.y) / ${$t(Je.LEG)}, 0.0, 1.0);
  p = ambRotX(p - H, -swing) + H; n = ambRotX(n, -swing);
}
bool birdDeform(inout vec3 p, inout vec3 n) {
  float part = aBone.w;
  float sp = floor(part * 0.1 + 0.05) - 1.0;
  if (abs(sp - aPC.w) > 0.5) { p = vec3(0.0); return false; }
#ifdef BIRD_DEPTH
  if (sp < 0.5) { p = vec3(0.0); return false; }
#endif
  if (sp < 0.5) kiteDeform(p, n, part);
  else if (sp < 1.5) egretDeform(p, n, part);
  else doveDeform(p, n, part);
  return true;
}
`,rn=`
uniform sampler2D uBirdContour;
uniform sampler2D uBirdFeather;
varying vec3 vCol1;
varying vec3 vCol2;
varying vec4 vMatV;
varying vec2 vUvF;
float birdH;
vec3 birdPerturb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDir) {
  vec3 vSigmaX = normalize(dFdx(surf_pos));
  vec3 vSigmaY = normalize(dFdy(surf_pos));
  vec3 R1 = cross(vSigmaY, surf_norm);
  vec3 R2 = cross(surf_norm, vSigmaX);
  float fDet = dot(vSigmaX, R1) * faceDir;
  vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
  return normalize(abs(fDet) * surf_norm - vGrad);
}
${re}
`;function an(e,t){let n=new w({roughness:.8,metalness:0,side:2,envMapIntensity:.85});n.name=`ambient-birds`;let r={uBirdContour:{value:t.contour},uBirdFeather:{value:t.feather}};n.onBeforeCompile=t=>{t.uniforms.uTime=e.G.uTime,Object.assign(t.uniforms,r);let n=t.vertexShader;n=n.replace(`#include <common>`,`#include <common>
varying vec3 vCol1;
varying vec3 vCol2;
varying vec4 vMatV;
varying vec2 vUvF;
`+nn),n=n.replace(`#include <color_vertex>`,`#include <color_vertex>
vCol1 = birdUnpackCol(aUvC.z); vCol2 = birdUnpackCol(aUvC.w); vMatV = aMat; vUvF = aUvC.xy;`),n=n.replace(`#include <beginnormal_vertex>`,`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
vec3 objectTangent = vec3( tangent.xyz );
#endif
vec3 ambPos = vec3( position );
birdDeform(ambPos, objectNormal);
`),n=n.replace(`#include <begin_vertex>`,`vec3 transformed = ambPos;`),t.vertexShader=n;let i=t.fragmentShader;i=i.replace(`#include <common>`,`#include <common>
`+rn),i=i.replace(`#include <map_fragment>`,`
      vec3 bBase = gl_FrontFacing ? vCol1 : vCol2;
      float bMode = floor(vMatV.y + 0.001);
      float bFringe = vMatV.y - bMode;
      vec2 bgx = dFdx(vUvF), bgy = dFdy(vUvF);
      vec4 bCt = textureGrad(uBirdContour, vUvF, bgx, bgy);
      vec4 bFt = textureGrad(uBirdFeather, clamp(vUvF, vec2(0.002), vec2(0.998)), bgx, bgy);
      // contour mode: aMat.z = texture strength; flight feathers: aMat.z = cross-bars
      float bDet = bMode < 0.5 ? vMatV.z : 1.0;
      vec4 bT = bMode < 0.5 ? mix(vec4(0.5, 0.0, 0.0, 0.5), bCt, bDet) : (bMode < 1.5 ? bFt : vec4(0.5, 0.0, 0.0, 0.5));
      vec3 bCol = bBase * (bT.r * 2.0);
      vec3 bFr = min(bBase * 1.9 + vec3(0.035, 0.026, 0.016), vec3(0.86));
      bCol = mix(bCol, bFr, bT.g * bFringe);
      bCol *= 1.0 - bT.b * (bMode < 0.5 ? 0.0 : vMatV.z) * 0.55;
      diffuseColor.rgb = max(bCol, vec3(0.0));
      birdH = bT.a;
    `),i=i.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
roughnessFactor = clamp(vMatV.x + (birdH - 0.5) * 0.12, 0.05, 1.0);`),i=i.replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
metalnessFactor = 0.0;`),i=i.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
      {
        vec2 bdH = vec2(dFdx(birdH), dFdy(birdH));
        float bBump = bMode < 0.5 ? 0.45 : (bMode < 1.5 ? 0.6 : 0.0);
        normal = birdPerturb(-vViewPosition, normal, bdH * bBump, faceDirection);
      }
    `),i=i.replace(`#include <opaque_fragment>`,`outgoingLight += diffuseColor.rgb * uSunColor * uSunIntensity * vMatV.w * ambBacklight(normal) * 0.3;
#include <opaque_fragment>`),t.fragmentShader=i},n.customProgramCacheKey=()=>`ambient-birds-v3`,e.patchMaterial(n);let i=new k;return i.name=`ambient-birds-depth`,i.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
#define BIRD_DEPTH
`+nn).replace(`#include <begin_vertex>`,`vec3 ambPos = vec3( position );
vec3 ambN = vec3( normal );
birdDeform(ambPos, ambN);
vec3 transformed = ambPos;`)},i.customProgramCacheKey=()=>`ambient-birds-depth-v3`,i.userData.noPatch=!0,{mat:n,depth:i}}var on=`
vec4 bake(vec2 uv) {
  const float N = 8.0;
  vec2 p = uv * N;
  float bestV = -1.0, bestJ = 1e9;
  vec2 bq = vec2(0.0); float bw = 1.0, bid = 0.0;
  for (int dj = -2; dj <= 1; dj++) {
    float j = floor(p.y) + float(dj);
    float off = mod(j, 2.0) * 0.5;
    for (int di = -1; di <= 1; di++) {
      float i = floor(p.x - off) + float(di);
      vec2 cell = mod(vec2(i, j), vec2(N));
      vec2 jit = (bk_hash22(cell + 3.1) - 0.5) * vec2(0.16, 0.14);
      vec2 q = p - vec2(i + off + 0.5, j) - jit;
      // feather outline: base at v = 0 (hidden), tip at v ~ 1.2, half width 0.66
      float t = (q.y - 0.42) / 0.8;
      float w = 0.66 * sqrt(max(0.0, 1.0 - t * t));
      if (q.y < -0.35 || q.y > 1.22 || abs(q.x) > w) continue;
      // the row closest to the head (smallest j) lies on top
      if (j < bestJ || (j == bestJ && abs(q.x) / max(w, 1e-3) < abs(bq.x) / max(bw, 1e-3))) {
        bestJ = j; bq = q; bw = w; bid = bk_hash12(cell + 11.7);
      }
    }
  }
  if (bestJ > 1e8) return vec4(0.42, 0.0, 0.0, 0.2);
  float rx = abs(bq.x) / max(bw, 1e-3);
  float t = (bq.y - 0.42) / 0.8;
  float r = sqrt(rx * rx * 0.6 + t * t * 0.4 * step(0.0, t) + 0.0);
  float tipZone = smoothstep(0.35, 1.0, bq.y);
  float edge = smoothstep(0.72, 0.97, max(rx, (bq.y - 0.3) / 0.92)) * tipZone;
  float shaft = (1.0 - smoothstep(0.0, 0.045, abs(bq.x))) * smoothstep(0.0, 0.3, bq.y) * (1.0 - tipZone * 0.6);
  // barb grain angled toward the tip
  float barb = 0.5 + 0.5 * sin((bq.y * 9.0 - abs(bq.x) * 7.0) * 6.2832);
  // lies in the shadow of the feather row above near its base
  float occ = smoothstep(-0.2, 0.55, bq.y);
  float lum = 0.5 * (0.93 + 0.07 * occ) + 0.012 * (bid - 0.5) + 0.012 * shaft + 0.006 * (barb - 0.5);
  float h = 0.18 + 0.62 * smoothstep(-0.3, 1.05, bq.y) * (1.0 - smoothstep(0.88, 1.0, max(rx, (bq.y - 0.2) / 1.0))) + 0.05 * shaft + 0.02 * barb;
  return vec4(clamp(lum, 0.0, 1.0), edge, 0.0, clamp(h, 0.0, 1.0));
}
`,sn=`
vec4 bake(vec2 uv) {
  float x = uv.x * 2.0 - 1.0;          // -1 outer edge .. 0 rachis .. 1 inner edge
  float v = uv.y;
  float ax = abs(x);
  float side = x < 0.0 ? 0.0 : 1.0;
  // rachis: tapers toward the tip, round (height ridge)
  float rw = mix(0.075, 0.018, v);
  float rach = 1.0 - smoothstep(rw * 0.45, rw, ax);
  // barbs leave the rachis angled toward the tip
  float ph = v * 110.0 - ax * 16.0;
  float barb = 0.5 + 0.5 * cos(ph * 6.2832);
  // splits between barb bundles (feather wear), different on each vane
  float n = bk_vnoise(vec2(ph * 0.12, side * 7.0 + ax * 2.0), vec2(64.0, 16.0));
  float split = smoothstep(0.78, 0.86, n) * smoothstep(0.25, 0.6, ax);
  float grain = bk_fbm(vec2(ax * 1.5 + side * 3.0, v * 3.0), vec2(4.0, 8.0), 3);
  // worn, paler edge + tip
  float edge = max(smoothstep(0.7, 0.98, ax), smoothstep(0.86, 0.99, v)) * (1.0 - rach);
  // faint wavy bars (visible on barred rectrices / secondaries only)
  float bars = smoothstep(0.35, 0.75, 0.5 + 0.5 * sin(v * 6.2832 * 7.0 + ax * 1.2 + grain * 1.4)) * smoothstep(0.05, 0.2, v);
  float lum = 0.5 + 0.035 * (barb - 0.5) + 0.07 * rach + 0.03 * grain - 0.1 * split - 0.04 * smoothstep(0.0, 0.12, 0.12 - v);
  float h = 0.42 + 0.4 * rach + 0.05 * (barb - 0.5) - 0.12 * split - 0.1 * smoothstep(0.6, 1.0, ax);
  return vec4(clamp(lum, 0.0, 1.0), edge, bars, clamp(h, 0.0, 1.0));
}
`;function cn(e){let t=e.quality||{},n=t.atLeast?t.atLeast(`high`):t.name!==`low`&&t.name!==`medium`,r=t.atLeast?t.atLeast(`ultra`):t.name===`ultra`,i=!!t.cinematic||(t.atLeast?t.atLeast(`cinematic`):!1),a=i?1024:r?512:256,o=i?16:r?8:n?4:2;return{contour:e.tex.bake(on,{width:a,height:a,srgb:!1,anisotropy:o,name:`ambient.birdContour`,wrap:p}),feather:e.tex.bake(sn,{width:i?512:r?256:128,height:i?2048:r?1024:512,srgb:!1,anisotropy:o,name:`ambient.birdFeather`,wrap:f})}}var ln=Math.PI*2,un=9.81,dn=(e,t,n)=>e<t?t:e>n?n:e,fn=(e,t,n)=>e+(t-e)*n,pn=(e,t,n)=>{let r=dn((n-e)/(t-e),0,1);return r*r*(3-2*r)},mn=e=>(e=(e+Math.PI)%ln,e<0&&(e+=ln),e-Math.PI),hn=(e,t)=>M(e|0,911,t|0);function gn(e,t){let n=Math.floor(e),r=e-n,i=r*r*r*(r*(r*6-15)+10);return fn(hn(n,t),hn(n+1,t),i)*2-1}function _n(e,t,n){let r=e/t,i=Math.floor(r),a=r-i,o=.15+.6*hn(i,n+7),s=hn(i-1,n)*2-1,c=hn(i,n)*2-1;return a<o?s:fn(s,c,pn(o,o+.1,a))}function vn(e,t){let n=e.length,r=[];if(n===1){let t=e[0];return r.push({type:0,c:t.c,R:t.R,a0:0,sweep:ln*t.turns,len:ln*t.turns*t.R,climb:t.climb}),r}let i=[];for(let r=0;r<n;r++){let a=e[r],o=e[(r+1)%n],s=o.c[0]-a.c[0],c=o.c[1]-a.c[1],l=Math.hypot(s,c),u=Math.atan2(c,s)-Math.asin(dn(t*(o.R-a.R)/l,-1,1)),d=Math.cos(u),f=-Math.sin(u),p=d,m=[a.c[0]-t*a.R*f,a.c[1]-t*a.R*p],h=[o.c[0]-t*o.R*f,o.c[1]-t*o.R*p];i.push({P1:m,P2:h,len:Math.hypot(h[0]-m[0],h[1]-m[1]),aExit:Math.atan2(m[1]-a.c[1],m[0]-a.c[0]),aEntry:Math.atan2(h[1]-o.c[1],h[0]-o.c[0])})}for(let a=0;a<n;a++){let o=e[a],s=i[(a-1+n)%n].aEntry,c=t*(i[a].aExit-s);c=(c%ln+ln)%ln,c+=ln*o.turns,r.push({type:0,c:o.c,R:o.R,a0:s,sweep:c,len:c*o.R,climb:o.climb}),r.push({type:1,P1:i[a].P1,P2:i[a].P2,len:i[a].len})}return r}function yn(e,t,n){t=(t%e.L+e.L)%e.L;let r=0;for(;r<e.segs.length-1&&t>=e.segs[r].s1;)r++;let i=e.segs[r],a=t-i.s0;if(i.type===0){let t=i.a0+e.dir*a/i.R;n[0]=i.c[0]+Math.cos(t)*i.R,n[1]=i.c[1]+Math.sin(t)*i.R}else{let e=a/i.len;n[0]=fn(i.P1[0],i.P2[0],e),n[1]=fn(i.P1[1],i.P2[1],e)}return n[2]=r,n[3]=a,n}function bn(e,t){let{hf:n,layout:r}=e,i=e.registry?.get?.(`rocks`),a=[...r.HERO_TREES||[],...r.EXTRA_TREES||[]],o=(r.HOUSES||[]).map(e=>{let t=e.tree?a.find(t=>t.id===e.tree):null,n=Array.isArray(e.levels)&&e.levels.length?Math.max(...e.levels.map(e=>e.y??0))+9:(e.deckY??2)+10;return{x:t?t.x:e.x??0,z:t?t.z:e.z??0,top:n}}),s=(e.registry?.get?.(`palms`)?.palms??[]).map(e=>({x:e.x,z:e.z,top:(e.y??n.heightAt(e.x,e.z))+(e.height??12),r:(e.crownR??4)+6})),c=(e,t)=>{let c=Math.max(n.heightAt(e,t),r.WATER_Y??0)+24;for(let n of s)Math.abs(e-n.x)<n.r&&Math.abs(t-n.z)<n.r&&Math.hypot(e-n.x,t-n.z)<n.r&&(c=Math.max(c,n.top+9));let l=i?.raycastDown?i.raycastDown(e,t):null;l!=null&&(c=Math.max(c,l+22));for(let r of a)Math.hypot(e-r.x,t-r.z)<r.crown+8&&(c=Math.max(c,(r.groundY??n.heightAt(r.x,r.z))+r.height+14));for(let n of o)Math.hypot(e-n.x,t-n.z)<16&&(c=Math.max(c,n.top+12));return c},l=[],u=[0,0,0,0];for(let e=0;e<t.length;e++){let n=t[e],r=vn(n.thermals,n.dir),i=0;for(let e of r)e.s0=i,i+=e.len,e.s1=i;let a={...n,segs:r,L:i,period:i/n.v,id:e},o=r.reduce((e,t)=>e+(t.type===0?t.climb:0),0),s=r.reduce((e,t)=>e+(t.type===1?t.len:0),0),d=0;for(let e of r){e.alt0=d;let t=e.type===0?s>0?e.climb:0:-o*(e.len/Math.max(s,1e-6));d+=t,e.alt1=d}let f=Math.max(1,Math.ceil(i/3)),p=new Float32Array(f);for(let e=0;e<f;e++){yn(a,e*3,u);let t=r[u[2]],i=u[3]/t.len,o=i-Math.sin(ln*i)/ln,s=n.alt+fn(t.alt0,t.alt1,o)-2.6;p[e]=Math.max(0,c(u[0],u[1])-s)}let m=e=>(e%f+f)%f,h=new Float32Array(f);for(let e=0;e<f;e++){let t=0;for(let n=-26;n<=26;n++)t=Math.max(t,p[m(e+n)]);h[e]=t}for(let e=0;e<2;e++){let e=new Float32Array(f);for(let t=0;t<f;t++){let n=0;for(let e=-12;e<=12;e++)n+=h[m(t+e)];e[t]=n/25}h=e}a.lift=h,a.liftStep=3,a.altBase=n.alt;let g=1e9;for(let e=0;e<f;e++)g=Math.min(g,h[e]-p[e]);a.clearance=g,l.push(a)}let d={x:0,y:0,z:0,hx:0,hz:1,seg:0,ls:0,type:0};function f(e,t,n){let r=(t+e.t0)*e.v;yn(e,r,u),n.x=u[0],n.z=u[1];let i=e.segs[u[2]],a=u[3]/i.len,o=a-Math.sin(ln*a)/ln,s=(r%e.L+e.L)%e.L/e.liftStep,c=Math.floor(s),l=s-c,d=e.lift.length,f=e.lift[c%d]*(1-l)+e.lift[(c+1)%d]*l;return n.y=e.altBase+fn(i.alt0,i.alt1,o)+f+1.6*Math.sin(t*.071+e.id*2.3)+.8*Math.sin(t*.17+e.id),n.seg=u[2],n.ls=u[3],n.type=i.type,n.len=i.len,n}let p={x:0,y:0,z:0},m={x:0,y:0,z:0},h={x:0,y:0,z:0};function g(e,t){return f(e,t-.1,p),f(e,t+.1,m),Math.atan2(m.z-p.z,m.x-p.x)}function _(e,t,n){let r=f(e,t,d);f(e,t+.12,h);let i=h.x-r.x,a=h.y-r.y,o=h.z-r.z,s=Math.hypot(i,o)||1,c=g(e,t-.8),l=mn(g(e,t+.8)-c)/1.6,u=e.id*17.3,p=.075*gn(t*.55+u,3)+.04*gn(t*1.35+u,4)+.02*gn(t*2.9+u,5),m=-Math.atan(e.v*l/un)*.96+p,_=r.type===1?pn(0,2.5,r.ls/e.v)*pn(0,2.5,(r.len-r.ls)/e.v):0,v=e.flapHz,y=0;if(r.type===1){let t=3+Math.floor(hn(r.seg,e.id+40)*3),n=r.ls/e.v;y=pn(0,.3,n)*(1-pn(t/v-.25,t/v+.1,n))}{let n=14+6*hn(e.id,55),r=(t+e.t0*1.7)/n,i=Math.floor(r);if(hn(i,e.id+90)<.38){let t=2+Math.floor(hn(i,e.id+91)*4),a=(.1+.6*hn(i,e.id+92))*n,o=(r-i)*n-a;y=Math.max(y,pn(0,.3,o)*(1-pn(t/v-.25,t/v+.1,o)))}}let b=t*v+e.id*.37,x=b-Math.floor(b),S,C,w,T,E;if(x<.55){let e=x/.55,t=e*e*(3-2*e),n=Math.sin(Math.PI*e);S=fn(.92,-.6,t),C=-.04+.2*n,w=-.1,T=.02,E=.1*n}else{let e=(x-.55)/.45,t=e*e*(3-2*e),n=Math.sin(Math.PI*e);S=fn(-.6,.92,t),C=-.42*n-.04*(1-n),w=fn(-.1,.04,n),T=.8*n**.7,E=-.09*n}let D=.5+.5*gn(t*.4+u,8),O=.075+.02*D,k=-.13-.03*D,A=-.04+.03*D,j=.03+.05*D,M=fn(O,.035,_),N=fn(k,-.2,_),P=fn(A,.08,_),F=fn(j,.34,_);M=fn(M,S,y),N=fn(N,C,y),P=fn(P,w,y),F=fn(F,T,y);let I=fn(.02,.03,_)*(1-y)+E*y,ee=gn(t*.9+u,11),L=dn(.35*m+.22*ee-1.4*p,-.7,.7),R=-.6*p+.04*ee,z=dn(fn(.55+.12*gn(t*.3+u,12),.12,_)*(1-y)+.3*y,0,1),B=fn(.06,0,_)+.04*gn(t*.7+u,13),te=.45*_n(t+u,1.7,e.id+20)+dn(-m*.6,-.35,.35),V=.32+.14*_n(t+u*.7,2.3,e.id+21),H=Math.atan2(a,s),ne=fn(.06,.015,_),U=-.028*Math.cos(ln*(x-.1))*y;n.x=r.x,n.y=r.y+U,n.z=r.z,n.bob=U;let re=Math.cos(H+ne),W=Math.sin(H+ne);return n.fx=i/s*re,n.fy=W,n.fz=o/s*re,n.roll=m,n.pa[0]=M,n.pa[1]=N,n.pa[2]=P,n.pa[3]=dn(F,0,1),n.pb[0]=I,n.pb[1]=R,n.pb[2]=L,n.pb[3]=z,n.pc[0]=te,n.pc[1]=V,n.pc[2]=B,n.pc[3]=0,n}function v(e,t,n,r){_(e,t,r);let i=t*e.flapHz,a=i-Math.floor(i);if(n===`flap`){let e,t,n,i,o;if(a<.55){let r=a/.55,s=r*r*(3-2*r),c=Math.sin(Math.PI*r);e=fn(.92,-.6,s),t=-.04+.2*c,n=-.1,i=.02,o=.1*c}else{let r=(a-.55)/.45,s=r*r*(3-2*r),c=Math.sin(Math.PI*r);e=fn(-.6,.92,s),t=-.42*c-.04*(1-c),n=fn(-.1,.04,c),i=.8*c**.7,o=-.09*c}r.pa[0]=e,r.pa[1]=t,r.pa[2]=n,r.pa[3]=i,r.pb[0]=o,r.pb[3]=.3,r.bob=-.028*Math.cos(ln*(a-.1))}else n===`glide`?(r.bob=0,r.pa[0]=.035,r.pa[1]=-.2,r.pa[2]=.08,r.pa[3]=.34,r.pb[3]=.12):n===`soar`&&(r.bob=0,r.pa[0]=.08,r.pa[1]=-.14,r.pa[2]=-.03,r.pa[3]=.05,r.pb[3]=.6);return r}return{kites:l,evaluate:_,evaluateForced:v,pathAt:f,minAlt:c}}var xn=Math.PI*2,Sn=(e,t,n)=>e<t?t:e>n?n:e,Cn=(e,t,n)=>e+(t-e)*n,wn=(e,t,n)=>{let r=Sn((n-e)/(t-e),0,1);return r*r*(3-2*r)},Tn=e=>(e=Sn(e,0,1),e*e*e*(e*(e*6-15)+10)),En=e=>(e=(e+Math.PI)%xn,e<0&&(e+=xn),e-Math.PI),Dn=(e,t)=>M(e|0,577,t|0);function On(e,t){let n=Math.floor(e),r=e-n,i=r*r*r*(r*(r*6-15)+10);return Cn(Dn(n,t),Dn(n+1,t),i)*2-1}function kn(e,t,n){let r=e/t,i=Math.floor(r),a=r-i,o=.2+.55*Dn(i,n+7),s=Dn(i-1,n)*2-1,c=Dn(i,n)*2-1;return a<o?s:Cn(s,c,wn(o,o+.12,a))}var An={alert:[-.5,-.008,.92,.19,-.05],rest:[-.3,-.03,.78,.12,.1],stalk:[-.15,-.052,.72,.42,.35],peer:[-.05,-.05,.64,.52,.95],swallow:[-.45,-.012,.93,.21,-.7],turn:[-.32,-.02,.83,.3,.15]},jn=.028,Mn=.78;function Nn(e,t){let{hf:n,layout:r}=e,i=r.WATER_Y??0,a=e.registry?.get?.(`rocks`),o=e.registry?.get?.(`architecture`),s=j(t.seed*7919+13),c=t.scale??1,l=t.home,u=t.radius??5,d=t.depthMin??.1,f=t.depthMax??.32,p=!!t.loose,m=(e,t)=>{if(Math.hypot(e-l[0],t-l[1])>u)return!1;if(p)return!0;let r=i-n.heightAt(e,t);return!(r<d||r>f||n.distToPaths(e,t)<2.2||a?.isRock&&a.isRock(e,t,.7)||o?.blocked&&o.blocked(e,t,.6))},h=(e,t,n,r)=>{let i=Math.hypot(n-e,r-t),a=Math.max(2,Math.ceil(i/.2));for(let i=1;i<=a;i++)if(!m(Cn(e,n,i/a),Cn(t,r,i/a)))return!1;return!0},g=[],_=[[],[]],v=e=>[Math.cos(e),-Math.sin(e)],y=(e,t,n,r)=>{let i=v(n),a=r===0?1:-1;return[e+i[0]*jn*c*a,t+i[1]*jn*c*a]},b=t.yaw??s()*xn,x=[y(l[0],l[1],b,0),y(l[0],l[1],b,1)],S=0,C=l[0],w=l[1],T=b,E=`alert`,D=0,O=`alert`,k=(e,t,r,i,a)=>_[e].push({tl:t,tp:r,x:i,z:a,y:n.groundHeight(i,a)}),A=e=>{e.prevPost=E,e.trans=e.trans??.8,e.type===`strike`&&g.length&&g[g.length-1].type===`peer`&&(g[g.length-1].toStrike=!0),g.push(e),E=e.post,S=e.t1,O=e.type},M=(e,t,n={})=>A({type:e,t0:S,t1:S+t,x0:C,z0:w,yaw0:T,post:n.post??e,...n}),N=(e,t=!1)=>{let n=En(e-T);if(Math.abs(n)<(t?.001:.35))return;let r=Math.max(2,Math.ceil(Math.abs(n)/.75)),i=.9*r+.4,a={type:`turn`,t0:S,t1:S+i,x0:C,z0:w,yaw0:T,yaw1:T+n,post:`turn`,trans:.6};for(let e=0;e<r;e++){let t=S+i*(e+.08)/r,o=t+.72*i/r,s=Tn((o+.1*i/r-a.t0)/i),[c,l]=y(C,w,T+n*s,D);k(D,t,o,c,l),D^=1}A(a),T+=n},P=(e,t)=>{let n=Math.hypot(e-C,t-w),r=Math.atan2(e-C,t-w);N(r);let i=Math.max(2,Math.round(n/(.16*c))),a=Cn(1,1.3,s()),o=i*a,l={type:`walk`,t0:S,t1:S+o+.75*a,D:o,n:i,T:a,x0:C,z0:w,x1:e,z1:t,yaw0:r,post:`stalk`,trans:.9};for(let e=0;e<i;e++){let t=S+e*a,n=t+Mn*a,[i,s]=B(l,Math.min(n+.55*a,S+o)),[c,u]=y(i,s,r,D);k(D,t,n,c,u),D^=1}{let n=S+o-.1*a,i=n+.7*a,[s,c]=y(e,t,r,D);k(D,n,i,s,c),D^=1}A(l),C=e,w=t,T=r},F=()=>{for(let e=0;e<16;e++){let t=e<8?T+(s()-.5)*2.2:s()*xn,n=Cn(.6,2.4,s()),r=C+Math.sin(t)*n,i=w+Math.cos(t)*n;if(m(r,i)&&h(C,w,r,i))return[r,i]}return null},I=t.forced||null,ee=I?90:1100,L=0;for(;S<ee&&L++<5e3;){let e=s();if(I===`walk`){let e=T+(s()-.5)*.6,t=C+Math.sin(e)*1.2,n=w+Math.cos(e)*1.2;m(t,n)||(t=l[0],n=l[1]),P(t,n),M(`alert`,1.5);continue}if(I===`strike`){M(`peer`,3+s()*2),A({type:`strike`,t0:S,t1:S+1,x0:C,z0:w,yaw0:T,post:`peer`,aim:(s()-.5)*.3,trans:.1}),M(`swallow`,1.8,{trans:.6}),M(`alert`,2.5);continue}if(I===`stand`||I===`alert`){M(`alert`,8);continue}if(I===`rest`){M(`rest`,20);continue}if(I===`peer`){M(`peer`,6),M(`alert`,3);continue}if(O===`alert`||O===`turn`){if(e<.5){let e=F();e?P(e[0],e[1]):M(`alert`,Cn(3,7,s()))}else e<.72?M(`peer`,Cn(2.5,6,s()),{aim:(s()-.5)*.5}):e<.8?M(`rest`,Cn(12,26,s()),{trans:1.4}):M(`alert`,Cn(3,8,s()))}else if(O===`rest`)M(`alert`,Cn(4,9,s()),{trans:1.2});else if(O===`walk`){if(e<.55)M(`peer`,Cn(2.5,7,s()),{aim:(s()-.5)*.5});else if(e<.8){let e=F();e?P(e[0],e[1]):M(`alert`,4)}else M(`alert`,Cn(3,8,s()))}else if(O===`peer`){if(e<.62)A({type:`strike`,t0:S,t1:S+1,x0:C,z0:w,yaw0:T,post:`peer`,aim:g[g.length-1].aim??0,trans:.1,hit:s()<.5});else if(e<.85){let e=F();e?P(e[0],e[1]):M(`alert`,4)}else M(`alert`,Cn(3,6,s()))}else O===`strike`?g[g.length-1].hit?M(`swallow`,1.8,{trans:.6}):e<.5?M(`peer`,Cn(2,5,s()),{aim:(s()-.5)*.5}):M(`alert`,Cn(2,5,s())):O===`swallow`?M(`alert`,Cn(3,8,s()),{trans:.8}):M(`alert`,4)}for(let e=0;e<12&&Math.hypot(C-l[0],w-l[1])>.05;e++){let e=Math.hypot(l[0]-C,l[1]-w);if(h(C,w,l[0],l[1])||p){P(l[0],l[1]);break}let t=null,n=e;for(let r=0;r<24;r++){let i=r/24*xn,a=Math.min(1.5,e),o=C+Math.sin(i)*a,s=w+Math.cos(i)*a,c=Math.hypot(l[0]-o,l[1]-s);c<n-.2&&m(o,s)&&h(C,w,o,s)&&(n=c,t=[o,s])}if(!t)break;P(t[0],t[1])}C=l[0],w=l[1],N(b,!0),T=b;{let e={type:`alert`,t0:S,t1:S+2.2,x0:C,z0:w,yaw0:b,post:`alert`,trans:.8};for(let e=0;e<2;e++){let t=S+.2+e*.9,n=t+.7;k(e,t,n,x[e][0],x[e][1])}A(e)}g[0].prevPost=`alert`;let R=S,z=x.map(e=>n.groundHeight(e[0],e[1]));function B(e,t){let n=Sn((t-e.t0)/e.D,0,1),r=1/e.n,i=1/(1-r),a;a=n<r?i*n*n/(2*r):n<=1-r?i*(r/2+(n-r)):1-i*(1-n)*(1-n)/(2*r);let o=Math.sin(Math.PI*n);return a+=.12*i*Math.sin(xn*e.n*n)/(xn*e.n)*o*o,[Cn(e.x0,e.x1,a),Cn(e.z0,e.z1,a),a]}function te(e){let t=0,n=g.length-1;for(;t<n;){let r=t+n+1>>1;g[r].t0<=e?t=r:n=r-1}return g[t]}function V(e,t,n){let r=_[e],i=-1,a=r.length-1;for(;i<a;){let e=i+a+1>>1;r[e].tl<=t?i=e:a=e-1}let o=i>0?r[i-1]:null,s=i>0?o.x:x[e][0],l=i>0?o.z:x[e][1],u=i>0?o.y:z[e];if(i<0)return n[0]=x[e][0],n[1]=z[e],n[2]=x[e][1],n[3]=0,n;let d=r[i];if(t>=d.tp)return n[0]=d.x,n[1]=d.y,n[2]=d.z,n[3]=0,n;let f=(t-d.tl)/(d.tp-d.tl),p=Tn((f-.12)/.8),m=.1*c*Math.sin(Math.PI*Sn(f,0,1))**1.3;return n[0]=Cn(s,d.x,p),n[2]=Cn(l,d.z,p),n[1]=Cn(u,d.y,p)+m,n[3]=Math.sin(Math.PI*Sn(f*1.1,0,1))**.6,n}let H=[0,0,0,0,0],ne=[0,0,0,0],U=[0,0,0,0],re=[0,0],W=[0,0],G=[0,0],K=[0,0],q=(t.phase??0)*R;function ie(e,r){let a=(e+q)%R;a<0&&(a+=R);let o=te(a),s=a-o.t0,l=o.t1-o.t0,u=o.x0,d=o.z0,f=o.yaw0,p=0,m=0,h=0;if(o.type===`walk`){let e=B(o,a);u=e[0],d=e[1];let t=Sn(s/o.D,0,1);p=wn(0,.6/o.n,t)*(1-wn(1-.6/o.n,1,t)),m=t*o.n%1,h=.006*Math.sin(xn*m)*p}else o.type===`turn`&&(f=o.yaw0+(o.yaw1-o.yaw0)*Tn(s/l));let g=An[o.prevPost]??An.alert,_=An[o.post]??An.alert,v=Tn(s/Math.max(.05,o.trans));for(let e=0;e<5;e++)H[e]=Cn(g[e],_[e],v);let y=0,b=wn(0,.5,s)*wn(0,.5,l-s),x=t.seed*5.3,S=n.groundHeight(u,d);if(o.type===`alert`)y=.55*kn(a+x,2.3,t.seed)*b,H[4]+=.09*kn(a+x*.7,3.4,t.seed+3)*b;else if(o.type===`rest`)y=.12*On(a*.11+x,t.seed+5)*b,H[2]+=.002*Math.sin(a*1.7);else if(o.type===`peer`){let e=o.toStrike?1:wn(0,.6,l-s);y=(o.aim??0)*wn(0,.6,s)*e+.04*Math.sin(a*1.15+x)*b,H[3]+=.035*wn(0,l,s)*e}else if(o.type===`turn`)y=.35*Math.sign(o.yaw1-o.yaw0)*Math.sin(Math.PI*Sn(s/l,0,1));else if(o.type===`walk`){let e=Math.hypot(o.x1-o.x0,o.z1-o.z0)/o.n/c,n=e*(wn(.62,.9,m)-m)+.3*e;H[3]+=n*p,H[2]-=.15*n*p,y=.05*On(a*.4+x,t.seed+9)*p}else if(o.type===`swallow`){let e=(1-wn(.9,1.5,s))*wn(0,.25,s);H[4]+=.14*Math.sin(xn*2.6*s)*e,H[2]+=.012*Math.max(0,Math.sin(xn*2.6*s))*e}let C=S+(H[1]+h)*c;if(o.type===`strike`){let e=wn(0,.12,s),t=wn(.45,1,s),n=e*(1-t),r=Cn(An.peer[4],1.25,n),a=Cn(An.peer[1],-.075,n);C=S+a*c;let l=(Math.max(i-.06,S+.012)-C)/c+Q.BILL*Math.sin(1.25);H[0]=Cn(An.peer[0],.16,n),H[1]=a,H[2]=Cn(An.peer[2],l,n),H[3]=Cn(An.peer[3]+.035*(1-t),.56,n),H[4]=r,y=(o.aim??0)*(1-wn(.55,1,s))}if(t.pose){let e=An[t.pose===`strike`?`peer`:t.pose]??An.alert;for(let t=0;t<5;t++)H[t]=e[t];if(y=0,C=S+H[1]*c,t.pose===`strike`){C=S-.075*c;let e=(Math.max(i-.06,S+.012)-C)/c;H[0]=.16,H[1]=-.075,H[2]=e+Q.BILL*Math.sin(1.25),H[3]=.56,H[4]=1.25}}V(0,a,ne),V(1,a,U);let w=Math.sin(f),T=Math.cos(f);-Math.sin(f);let E=(Q.L1+Q.L2)*.985,D=0;for(let e of[ne,U]){let t=e[0]-u,n=e[2]-d,r=(t*w+n*T)/c,i=(e[1]+Q.FOOT_Y*c-C)/c-Q.KNEE_Y,a=Math.sqrt(Math.max(0,E*E-r*r));-i>a&&(D=Math.max(D,-i-a))}C-=D*c;let O=[];for(let e of[ne,U]){let t=e[0]-u,n=e[2]-d;it((t*w+n*T)/c,(e[1]+Q.FOOT_Y*c-C)/c-Q.KNEE_Y,K),O.push(K[0],K[1])}Ze(H[0],re,W),Qe(H[4],G);let k=rt(re,W,[H[2],H[3]],G);r.x=u,r.y=C,r.z=d,r.fx=w,r.fz=T,r.scale=c,r.pa[0]=O[0],r.pa[1]=O[1],r.pa[2]=O[2],r.pa[3]=O[3],r.pb[0]=H[2],r.pb[1]=H[3],r.pb[2]=H[4],r.pb[3]=y;let A=Math.round(Sn(ne[3],0,1)*255),j=Sn(U[3],0,1)*.99;r.pc[0]=H[0],r.pc[1]=k,r.pc[2]=A+j,r.pc[3]=1,r.type=o.type;let M=r.feet;if(M&&(M[0]=ne[0],M[1]=ne[2],M[2]=i-ne[1]>.02?.25+.8*ne[3]:0,M[3]=U[0],M[4]=U[2],M[5]=i-U[1]>.02?.25+.8*U[3]:0,M[8]=0,o.type===`strike`)){let e=H[2]-Q.BILL*Math.sin(H[4]),t=H[3]+Q.BILL*Math.cos(H[4]);C+e*c<i&&(M[6]=u+w*t*c,M[7]=d+T*t*c,M[8]=1.4*wn(.02,.1,s)*(1-wn(.5,.9,s)))}return r}return{evaluate:ie,period:R,segs:g,feet:_,home:l,init:x,stats:{segs:g.length,steps:_[0].length+_[1].length}}}var Pn=Math.PI*2,Fn=9.81,In=(e,t,n)=>e<t?t:e>n?n:e,$=(e,t,n)=>e+(t-e)*n,Ln=(e,t,n)=>{let r=In((n-e)/(t-e),0,1);return r*r*(3-2*r)},Rn=e=>(e=In(e,0,1),e*e*e*(e*(e*6-15)+10)),zn=e=>(e=(e+Math.PI)%Pn,e<0&&(e+=Pn),e-Math.PI),Bn=(e,t)=>M(e|0,733,t|0);function Vn(e,t,n){let r=e/t,i=Math.floor(r),a=r-i,o=.25+.5*Bn(i,n+7),s=Bn(i-1,n)*2-1,c=Bn(i,n)*2-1;return a<o?s:$(s,c,Ln(o,o+.06,a))}function Hn(e,t,n,r,i,a){let o=Math.round(In((e+.8)/1.6,0,1)*255),s=Math.round(In(t,0,1)*255),c=Math.round(In(n,0,1)*255),l=Math.round(In((r+1.6)/3.2,0,1)*4095),u=Math.round(In((i+1.6)/3.2,0,1)*4095);a[1]=o+256*s+65536*c,a[2]=l+4096*u}function Un(e,t,n){let r=Math.cos(n),i=Math.sin(n);return[r*e-i*t,i*e+r*t]}function Wn(e,t,n){let r=Je.NP,i=Je.BILL,a=Je.HIP,o=Math.hypot(Je.HEAD_DIR[1],Je.HEAD_DIR[2]),[s,c]=Un(i[1]-r[1],i[2]-r[2],t);return s+=r[1]+n*Je.HEAD_DIR[1]/o,c+=r[2]+n*Je.HEAD_DIR[2]/o,Un(s-a[1],c-a[2],e)[0]+a[1]}function Gn(e){let{hf:t,layout:n,registry:r}=e,i=n.WATER_Y??0,a=r?.get?.(`rocks`),o=r?.get?.(`architecture`),s=r?.get?.(`palms`)?.palms??[],c=r?.get?.(`vegetation`)?.cover,l=c?.texture?.image?.data??null,[u,d,f,p]=c?.bounds??[0,0,0,0],m=(e,t,n)=>{if(n[0]=n[1]=n[2]=0,!l)return n;let r=Math.floor(e-u),i=Math.floor(t-d);if(r<0||i<0||r>=f||i>=p)return n;let a=(i*f+r)*4;return n[0]=l[a]/255,n[1]=l[a+1]/255,n[2]=l[a+2]/255,n},h=[...n.HERO_TREES||[],...n.EXTRA_TREES||[]].map(e=>{let r=e.groundY??t.heightAt(e.x,e.z);return{x:e.x,z:e.z,gy:r,top:r+e.height,crown:e.crown,low:r+e.forkY*.5,trunk:n.trunkRadiusAt(e,r+1),id:e.id}}),g=[];for(let e of n.HOUSES||[])if(e.tree){let t=h.find(t=>t.id===e.tree);if(!t||!e.levels?.length)continue;g.push({x:t.x,z:t.z,r:Math.max(...e.levels.map(e=>e.outer??5))+1.5,y0:Math.min(...e.levels.map(e=>e.y))-1.5,y1:Math.max(...e.levels.map(e=>e.y))+7})}else Number.isFinite(e.x)&&g.push({x:e.x,z:e.z,r:(e.deckR??6)+1.5,y0:-2,y1:(e.deckY??1.3)+10});let _=(n.BRIDGES||[]).map(e=>({a:e.a,b:e.b,sag:e.sag??1})),v=(n.BOARDWALKS||[]).map(e=>({y:e.y??1,w:e.width??2,path:e.path,end:e.platformEnd?.r??0})),y=(e,t,n,r,i,a)=>{let o=i-n,s=a-r,c=o*o+s*s||1e-9,l=In(((e-n)*o+(t-r)*s)/c,0,1),u=n+o*l-e,d=r+s*l-t;return[u*u+d*d,l]},b=s,x=(e,t,n)=>{b=s.filter(r=>Math.hypot(r.x-e,r.z-t)<n+12)},S=[0,0,0];function C(e,n,r,s){let c=t.groundHeight(e,r);if(n<Math.max(c,i)+.02)return T.fail=`ground`,!1;let l=n-c;if(a?.raycastDown){let t=a.raycastDown(e,r);if(t!=null&&n<t+s+.3)return T.fail=`rock`,!1}for(let t of h){let i=Math.hypot(e-t.x,r-t.z);if(i<t.trunk*2.2+1.5+s&&n<t.top)return T.fail=`trunk`,!1;if(i<t.crown+1.5+s&&n>t.low-s&&n<t.top+1.5+s)return T.fail=`crown`,!1}for(let t of g)if(n>t.y0-s&&n<t.y1+s&&Math.hypot(e-t.x,r-t.z)<t.r+s)return T.fail=`house`,!1;for(let t of b){let i=Math.hypot(e-t.x,r-t.z),a=t.y+t.height;if(i<(t.trunkR??.3)+.5+s&&n<a)return T.fail=`palmTrunk`,!1;if(i<t.crownR+1.3+s&&n>a-t.crownR*.85-s&&n<a+1+s)return T.fail=`palmCrown`,!1}for(let t of _){let[i,a]=y(e,r,t.a[0],t.a[2],t.b[0],t.b[2]),o=$(t.a[1],t.b[1],a)-4*t.sag*a*(1-a);if(i<(2.2+s)*(2.2+s)&&Math.abs(n-o)<2.5+s)return T.fail=`bridge`,!1}for(let t of v)if(!(n>t.y+1.8+s)){for(let n=0;n+1<t.path.length;n++){let[i]=y(e,r,t.path[n][0],t.path[n][1],t.path[n+1][0],t.path[n+1][1]);if(i<(t.w/2+.6+s)**2)return T.fail=`walk`,!1}if(t.end){let n=t.path[t.path.length-1];if(Math.hypot(e-n[0],r-n[1])<t.end+.6+s)return T.fail=`walkEnd`,!1}}if(l<3.5&&o?.blocked&&o.blocked(e,r,.4+s))return T.fail=`post`,!1;if(l<2.4){if(m(e,r,S),S[2]>.25)return T.fail=`shrub`,!1;if(l<.9&&S[0]+S[1]>.9)return T.fail=`grass`,!1}return!0}function w(e,n,r=!1){if(t.groundHeight(e,n)<i+.28||t.slopeAt&&t.slopeAt(e,n)>16||(m(e,n,S),S[0]+S[1]>(r?.28:.42)||S[2]>.06))return!1;for(let t of b)if(Math.hypot(e-t.x,n-t.z)<(t.trunkR??.3)+(r?1.6:.7))return!1;for(let t of h)if(Math.hypot(e-t.x,n-t.z)<t.trunk*2.2+(r?2.5:1.2))return!1;return!(o?.blocked&&o.blocked(e,n,r?1.4:.35)||a?.blocked&&a.blocked(e,n,r?1:.3)||a?.isRock&&a.isRock(e,n,r?.8:.25))}let T={clear:C,openGround:w,focus:x,WY:i,hasCover:!!l,fail:``};return T}function Kn(e,t,n,r,i,a,o,s){let c=Math.sin(n),l=Math.cos(n),u=t[0]+r*l*i,d=t[1]-r*c*i,f=Math.atan2(t[1]-d,t[0]-u),p=a*i,m=e.groundHeight(t[0],t[1]),h=f-r*a,g=[u+Math.cos(h)*i,d+Math.sin(h)*i],_=e.groundHeight(g[0],g[1]),v=Math.min(p*.3,o*1.5),y=Math.min(p*.4,o*2.6),b=p/s+2.1/2,x=-1e9;for(let t=1;t<64;t++){let n=f-r*a*t/64;x=Math.max(x,e.groundHeight(u+Math.cos(n)*i,d+Math.sin(n)*i))}return{A:t,B:g,cx:u,cz:d,a0:f,dir:r,R:i,L:p,yA:m,yB:_,H:o,yTop:Math.max(Math.max(m,_)+o,x+6),Lc:v,Ld:y,v:s,T1:.9,T2:1.2,T:b,h0:n}}function qn(e,t,n,r){let i=Math.hypot(n[0]-t[0],n[1]-t[1]);return{kind:`hop`,A:t,B:n,L:i,hMax:r,yA:e.groundHeight(t[0],t[1]),yB:e.groundHeight(n[0],n[1]),dur:.5+.16*i,R:1e9,dir:1,T1:.2,T2:.25,v:i/(.5+.16*i)}}function Jn(e,t,n,r,i,a){let o=Math.hypot(r[0]-n[0],r[1]-n[1]),s=e.groundHeight(n[0],n[1]),c=e.groundHeight(r[0],r[1]),l=-1e9;for(let i=1;i<32;i++){let a=i/32;l=Math.max(l,e.groundHeight($(n[0],r[0],a),$(n[1],r[1],a)),t)}let u=Math.max(Math.max(s,c)+i,l+2.6);return{kind:`line`,A:n,B:r,L:o,yA:s,yB:c,yTop:u,Lc:Math.min(o*.35,(u-s)*1.25),Ld:Math.min(o*.45,(u-c)*2.4),v:a,T1:.9,T2:1.2,R:1e9,dir:1,h0:Math.atan2(r[0]-n[0],r[1]-n[1])}}function Yn(e,t){if(e.kind===`hop`){let n=In(t/e.dur,0,1);return e.L*n*n*(3-2*n)}let{v:n,T1:r,T2:i}=e,a=.8;if(t<=0)return 0;if(t<r)return n*t*t/(2*r);let o=e.L-(n+a)/2*i,s=r+(o-n*r/2)/n;if(t<s)return n*r/2+n*(t-r);let c=Math.min(t-s,i);return Math.min(e.L,o+n*c-(n-a)*c*c/(2*i))}function Xn(e){if(e.kind===`hop`)return e.dur;let t=e.L-(e.v+.8)/2*e.T2;return e.T1+(t-e.v*e.T1/2)/e.v+e.T2}function Zn(e,t,n){if(e.kind===`hop`){let r=e.L>0?t/e.L:1;return n[0]=$(e.A[0],e.B[0],r),n[2]=$(e.A[1],e.B[1],r),n[1]=$(e.yA,e.yB,r)+e.hMax*Math.sin(Math.PI*r),n}if(e.kind===`line`){let r=e.L>0?t/e.L:1;n[0]=$(e.A[0],e.B[0],r),n[2]=$(e.A[1],e.B[1],r)}else{let r=e.a0-e.dir*t/e.R;n[0]=e.cx+Math.cos(r)*e.R,n[2]=e.cz+Math.sin(r)*e.R}let r=t<e.Lc?1-(1-t/e.Lc)*(1-t/e.Lc):1,i=e.L-t,a=i<e.Ld?1-(1-i/e.Ld)*(1-i/e.Ld):1,o=$(e.yA,e.yB,t/e.L);return n[1]=o+(e.yTop-o)*Math.min(r,a),n}function Qn(e,t={}){let{hf:n}=e,r=Gn(e),i=t.targets||[],a={doves:[],groups:[],evaluate:null,stats:{groups:0,doves:0,flights:0,rejected:0,why:{}}};if(!i.length)return a;let o=.42,s=.034,c=1;{let e=0,t=1.15;for(let n=0;n<30;n++){let n=.5*(e+t);Wn(o,n,s)>.004?e=n:t=n}c=.5*(e+t)}let l=[],u=0;for(let e of i){let i=j(9173+u*101);r.focus(e.x,e.z,60);let o=null,s=1e9;for(let t of[1,1.6,2.3]){let i=(e.r??9)*t,a=t>1?1:.5;for(let t=-i;t<=i;t+=a)for(let c=-i;c<=i;c+=a){let a=e.x+c,u=e.z+t,d=Math.hypot(c,t);if(d>=s||d>i||n.distToPaths(a,u)<1.1||l.some(e=>Math.hypot(e[0]-a,e[1]-u)<8)||!r.openGround(a,u,!0))continue;let f=!0;for(let e=0;e<8&&f;e++){let t=e/8*Pn;r.openGround(a+Math.cos(t)*1.6,u+Math.sin(t)*1.6)||(f=!1)}f&&(s=d,o=[a,u])}if(o)break}if(!o){a.stats.noPatch=(a.stats.noPatch||0)+1,u++;continue}l.push(o);let c=2.1,d=o,f=(e,t)=>Math.hypot(e-d[0],t-d[1])<=c&&r.openGround(e,t),p=(e,t)=>{if(n.distToPaths(e,t)<1.1||!r.openGround(e,t,!0))return!1;for(let n=0;n<8;n++){let i=n/8*Pn;if(!r.openGround(e+Math.cos(i)*1.6,t+Math.sin(i)*1.6))return!1}return!0},m=e.n??3,h=[];for(let e=0;e<m;e++){let t=null;for(let e=0;e<40&&!t;e++){let e=i()*Pn,n=Math.sqrt(i())*c*.8,r=o[0]+Math.cos(e)*n,a=o[1]+Math.sin(e)*n;f(r,a)&&h.every(e=>Math.hypot(e.init[0]-r,e.init[1]-a)>.35)&&(t=[r,a])}t&&h.push({init:t,yaw0:i()*Pn,segs:[],seed:u*10+e,scale:$(.95,1.05,i())})}if(!h.length){u++;continue}let g=(e,t,i,o,s,c)=>{let l=Pn+$(.08,.3,Bn(e.seed,31)),u=Kn(n,t,i,o,s,l,c,$(8.2,9.2,Bn(e.seed,32)));if(!f(u.B[0],u.B[1])){let e=!1;for(let r of[Pn+.05,Pn+.12,Pn+.2,Pn+.35,Pn-.06]){let a=Kn(n,t,i,o,s,r,c,u.v);if(f(a.B[0],a.B[1])){Object.assign(u,a),e=!0;break}}if(!e)return null}let d=[0,0,0];for(let e=.25;e<u.L-.25;e+=.5){Zn(u,e,d);let t=Math.min(1,.15+.12*Math.min(e,u.L-e));if(!r.clear(d[0],d[1],d[2],t))return a.stats.why[r.fail]=(a.stats.why[r.fail]||0)+1,null}return u.dur=Xn(u),u},_=[];for(let e=0;e<120&&_.length<1&&t.circuits!==!1;e++){let t=Bn(u,50+e)*Pn,n=Bn(u,90+e)<.5?-1:1,r=$(9,20,Bn(u,130+e)),i=$(10,22,Bn(u,170+e));g(h[0],h[0].init,t,n,r,i)&&_.push({h0:t,dir:n,R:r,H:i})}let v=_[0]||null;v||a.stats.rejected++;let y=$(2.4,4.2,i()),b=$(7.6,8.8,i()),x=(e,t)=>{let i=Jn(n,r.WY,e,t,y,b);if(i.L<6)return null;let o=[0,0,0];for(let e=.25;e<i.L-.25;e+=.5){Zn(i,e,o);let t=Math.min(1,.15+.12*Math.min(e,i.L-e));if(!r.clear(o[0],o[1],o[2],t))return a.stats.why[r.fail]=(a.stats.why[r.fail]||0)+1,null}return i.dur=Xn(i),i},S=null;if(!v){let e=1e9;for(let t of[10,14,18,22,27,32,38,44])for(let n=0;n<24;n++){let r=n/24*Pn+t*.37,i=[o[0]+Math.cos(r)*t,o[1]+Math.sin(r)*t],a=Math.abs(t-22)+4*Bn(u*31+n,t);a>=e||l.some(e=>Math.hypot(e[0]-i[0],e[1]-i[1])<8)||p(i[0],i[1])&&x(o,i)&&x(i,o)&&(e=a,S=i)}S&&l.push(S)}let C=[];{let e=$(24,42,i());for(;e<330;)C.push(e),e+=v?$(55,110,i()):S?$(40,80,i()):$(35,70,i());S&&C.length%2&&C.push(e)}let w=(e,t,i,a)=>{for(let o=0;o<14;o++){let s=a+(e()-.5)*(o<6?1.6:Pn),c=$(.8,2.2,e()),l=t+Math.sin(s)*c,u=i+Math.cos(s)*c,d=f(l,u);for(let e=1;e<4&&d;e++)d=r.openGround($(t,l,e/4),$(i,u,e/4));if(d)return qn(n,[t,i],[l,u],$(.3,.6,e()))}return null};for(let e of h){let t=j(e.seed*7907+3),n=0,i=e.init[0],s=e.init[1],l=e.yaw0,u=`look`;d=o;let p=t=>{t.t0=n,t.t1=n+t.dur,e.segs.push(t),n=t.t1,u=t.type},m=(e,t={})=>p({type:`look`,dur:e,x:i,z:s,yaw0:l,yaw1:t.yaw1??l,...t}),_=e=>{let r=0;for(;n<e-.05&&r++<400;){let r=e-n,a=t();if(r<1.2){m(r);break}let o=u===`walk`?a<.58?`peck`:a<.84?`walk`:a<.96?`look`:`hop`:a<.55?`walk`:a<.82?`peck`:a<.97?`look`:`hop`;if(o===`walk`){let e=null;for(let n=0;n<10&&!e;n++){let r=l+(t()-.5)*(n<5?2:Pn),a=$(.12,.55,t()),o=i+Math.sin(r)*a,c=s+Math.cos(r)*a;f(o,c)&&(e=[o,c])}if(!e){m(Math.min(r,1.5));continue}let n=$(.12,.16,t()),a=Math.hypot(e[0]-i,e[1]-s),o=.3;if(o+a/n>r-.2&&(a=Math.max(0,(r-.2-o)*n)),a<.08){m(Math.min(r,1.2));continue}let c=Math.atan2(e[0]-i,e[1]-s),u=i+Math.sin(c)*a,d=s+Math.cos(c)*a;p({type:`walk`,dur:o+a/n,turnT:o,x0:i,z0:s,x1:u,z1:d,yaw0:l,yaw1:l+zn(c-l),v:n,d:a}),i=u,s=d,l+=zn(c-l)}else if(o===`hop`&&r>3){let e=w(t,i,s,l);if(!e){m(Math.min(r,1.2));continue}let n=Math.atan2(e.B[0]-i,e.B[1]-s);m(.3,{yaw1:l+zn(n-l)}),l+=zn(n-l),p({type:`fly`,dur:e.dur,F:e,yaw0:l}),i=e.B[0],s=e.B[1],m($(.8,1.4,t()),{settle:!0})}else if(o===`peck`){let e=1+Math.floor(t()*4),n=Math.min(r,.32+e*.3+.28);p({type:`peck`,dur:n,x:i,z:s,yaw0:l,np:e,seed:Math.floor(t()*1e3)})}else m(Math.min(r,$(1,3.5,t())))}};for(let n=0;n<C.length;n++){let u=Bn(e.seed,200+n)*.45+(e===h[0]?0:.12);_(C[n]+u);let f=null;if(S){let e=d===o?S:o;for(let n=0;n<10&&!f;n++){let n=t()*Pn,a=Math.sqrt(t())*c*.6,o=[e[0]+Math.cos(n)*a,e[1]+Math.sin(n)*a];r.openGround(o[0],o[1])&&(f=x([i,s],o))}if(!f){let t=Math.hypot(d[0]-i,d[1]-s);if(t>.05){let e=Math.atan2(d[0]-i,d[1]-s);p({type:`walk`,dur:.3+t/.15,turnT:.3,x0:i,z0:s,x1:d[0],z1:d[1],yaw0:l,yaw1:l+zn(e-l),v:.15,d:t}),i=d[0],s=d[1],l+=zn(e-l)}f=x([i,s],e)}f&&(d=e)}for(let t=0;t<6&&!f&&v;t++)f=g(e,[i,s],v.h0+(t?(Bn(e.seed,300+t)-.5)*.4:0),v.dir,v.R+(Bn(e.seed,210+n)-.5)*2.5+t*.4,v.H+(Bn(e.seed,220+n)-.5)*3);if(!f&&(f=w(t,i,s,l),!f)){m(2);continue}let y=zn((f.kind===`circuit`||!f.kind&&v?v.h0:Math.atan2(f.B[0]-i,f.B[1]-s))-l);if(Math.abs(y)>.2&&(m(.35,{yaw1:l+y}),l+=y),p({type:`fly`,dur:f.dur,F:f,yaw0:l}),f.kind===`line`?a.stats.relocations=(a.stats.relocations||0)+1:f.kind===`hop`?a.stats.hops=(a.stats.hops||0)+1:a.stats.flights++,i=f.B[0],s=f.B[1],f.kind===`line`)l=f.h0;else if(f.kind!==`hop`){let e=f.a0-f.dir*f.L/f.R,t=-Math.sin(e)*-f.dir,n=Math.cos(e)*-f.dir;l=Math.atan2(t,n)}m($(1.4,2.4,t()),{settle:!0})}_(n+$(8,16,t()));for(let t=0;t<20&&Math.hypot(e.init[0]-i,e.init[1]-s)>.02;t++){let n=Math.hypot(e.init[0]-i,e.init[1]-s),r=Math.min(.9,n),a=Math.atan2(e.init[0]-i,e.init[1]-s),o=i+Math.sin(a)*r,c=s+Math.cos(a)*r,u=.14;p({type:`walk`,dur:.3+r/u,turnT:.3,x0:i,z0:s,x1:o,z1:c,yaw0:l,yaw1:l+zn(a-l),v:u,d:r}),i=o,s=c,l+=zn(a-l),t%2==1&&p({type:`peck`,dur:.9,x:i,z:s,yaw0:l,np:2,seed:t})}i=e.init[0],s=e.init[1],m(.6,{yaw1:l+zn(e.yaw0-l)}),l=e.yaw0,e.tEnd=n}let T=Math.max(...h.map(e=>e.tEnd))+1;for(let e of h){e.segs[e.segs.length-1];let t=T-e.tEnd;t>0&&e.segs.push({type:`look`,t0:e.tEnd,t1:T,dur:t,x:e.init[0],z:e.init[1],yaw0:e.yaw0,yaw1:e.yaw0}),e.period=T,e.phase=0,e.patch=o,a.doves.push(e)}a.groups.push({patch:o,n:h.length,plan:v,alt:S,flights:C.length}),u++}a.stats.groups=a.groups.length,a.stats.doves=a.doves.length;let d=[0,0,0],f=[0,0,0];function p(e,t){let n=e.segs,r=0,i=n.length-1;for(;r<i;){let e=r+i+1>>1;n[e].t0<=t?r=e:i=e-1}return n[r]}let m=Je.LEG;function h(e,t,n){let r=(t+e.phase)%e.period;r<0&&(r+=e.period);let i=p(e,r);return g(e,i,r-i.t0,i.t1-i.t0,r,n)}function g(e,t,r,i,a,l){let u=e.seed*3.1,p=t.x??t.x0??0,h=t.z??t.z0??0,g=t.yaw0??0,_=0,v=0,y=0,b=0,x=0,S=0,C=1,w=0,T=.05,E=0,D=0,O=0,k=0,A=0,j=!1,M=0,N=0,P=0;if(t.type===`look`){g=t.yaw0+(t.yaw1-t.yaw0)*Rn(r/Math.min(.35,i));let n=Ln(0,.3,r)*Ln(0,.3,i-r);b=.55*Vn(a+u,1.3,e.seed)*n,y=-.06+.12*Vn(a+u*.7,1.9,e.seed+5)*n;let o=((a*.23+Bn(e.seed,7))%1-.5)*60;E=.35*Math.exp(-o*o),t.settle&&(C=Ln(0,.35,r),x=.6*(1-Ln(0,.3,r)),T=$(1,.05,Ln(.05,.6,r)),E=Math.max(E,.3*(1-Ln(.1,.5,r))),_=-.25*(1-Ln(0,.45,r)),b*=Ln(.4,.8,r))}else if(t.type===`walk`){let e=Rn(r/t.turnT);g=t.yaw0+(t.yaw1-t.yaw0)*e;let n=Math.max(0,r-t.turnT),a=i-t.turnT,o=Math.min(.25,a*.3),s;s=n<o?t.v*n*n/(2*o):n>a-o?t.d-t.v*(a-n)*(a-n)/(2*o):t.v*o/2+t.v*(n-o),s=In(s,0,t.d);let c=t.d>0?s/t.d:0;p=$(t.x0,t.x1,c),h=$(t.z0,t.z1,c);let l=3.2,u=Ln(0,.12,n)*Ln(0,.12,a-n),d=n*l/2,b=t.v/l,x=(e,t)=>{let n=e-Math.floor(e),r=.6,i,a;if(n<r)i=b*.6*(1-2*n/r),a=0;else{let e=(n-r)/.4;i=b*.6*(-1+2*Rn(e)),a=Math.sin(Math.PI*e)}return t[0]=Math.atan2(i,m)*u,t[1]=.3*a*u,t};x(d,f),D=f[0],k=f[1],x(d+.5,f),O=f[0],A=f[1];let S=n*l%1,C=t.v/l;v=(C*(Ln(.58,.95,S)-S)+C*.4)*u,y=.08*u;let w=k<.01?m*(1-Math.cos(D)):1,T=A<.01?m*(1-Math.cos(O)):1;P=-Math.min(w,T,.004),_=.1*u,E=.04*Math.sin(Pn*S)*u}else if(t.type===`peck`){let e=Ln(0,.18,r)*(1-Ln(i-.24,i,r));_=o*e;let n=In((r-.18)/Math.max(.01,i-.42),0,1)*t.np,a=n-Math.floor(n),l=n>=t.np?0:Math.sin(Math.PI*In(a/.55,0,1));y=$(0,c-.3,e)+.3*l*e,v=s*e*(.4+.6*l),b=.12*(Bn(t.seed,Math.floor(n))-.5)*e,E=-.15*e}else if(t.type===`fly`){j=!0;let n=t.F,a=r,o=i-r,s=Yn(n,a);Zn(n,s,d),Zn(n,Math.min(n.L,s+.3),f),p=d[0],h=d[2];let c=f[0]-d[0],u=f[1]-d[1],m=f[2]-d[2];Math.hypot(c,m)<1e-4&&(c=Math.sin(t.yaw0),m=Math.cos(t.yaw0));let F=Math.hypot(c,m);g=Math.atan2(c,m),l.y=d[1];let I=Math.atan2(u,F),ee=n.kind===`hop`?0:a<n.T1?n.v*a/n.T1:o<n.T2?$(.8,n.v,o/n.T2):n.v,L=Ln(0,.8,a)*Ln(0,.8,o);N=n.dir*Math.atan(ee*ee/(n.R*Fn))*L;let R=1-Ln(.05,.7,a),z=1-Ln(0,.75,o);M=Math.sin(I*(1-Math.max(R,z))),_=-.55*R-.75*z+.04,C=1-Ln(0,.12,a);let B=9.6*Math.min(a,1.2)+8*Math.max(0,a-1.2),te=Math.floor(B),V=B-te,H=!t.flapOnly&&a>1.6&&o>2.2&&+(Bn(te>>3,e.seed+40)<.45)?Ln(0,.25,(te&7)+V)*Ln(0,.25,8-((te&7)+V)):0,ne=n.kind===`hop`||t.flapOnly?0:Ln(2.2,1.6,o)*(1-z),U=Math.max(H,ne),re=$(1,1.2,Math.max(R,z)),W,G,K,q;if(V<.55){let e=V/.55,t=e*e*(3-2*e),n=Math.sin(Math.PI*e);W=$(1.05,-.8,t)*re,G=.08*n,K=0,q=-.05*n}else{let e=(V-.55)/.45,t=e*e*(3-2*e),n=Math.sin(Math.PI*e);W=$(-.8,1.05,t)*re,G=-.4*n,K=.2*n,q=.75*n}x=$(W,ne>H?.28:-.2,U),S=$(G,-.05,U),w=$(q,.22,U),C=Math.max(C,K*(1-U));let ie=Ln(.22,0,o);x=$(x,.6,ie),S*=1-ie,w*=1-ie,C*=1-ie,P=-.02*Math.cos(Pn*(V-.1))*(1-U)*(1-ie),T=In(.9*Math.max(R,z)+.25*Math.abs(N)+.15,0,1),E=-.3*z+.05*R,y=-_*.8+.05,v=.004,b=In(-N*.25,-.3,.3);let J=Ln(.1,.45,a)*(1-Ln(.9,.35,o));D=O=$($(-.25,.55,z),-1.45,J),k=A=J}if(!j)l.y=n.groundHeight(p,h)+P,l.fx=Math.sin(g),l.fy=0,l.fz=Math.cos(g);else{l.y+=P;let e=Math.sqrt(Math.max(0,1-M*M));l.fx=Math.sin(g)*e,l.fy=M,l.fz=Math.cos(g)*e}return l.x=p,l.z=h,l.air=j,l.roll=N,l.scale=e.scale,l.type=t.type,l.pa[0]=x,l.pa[1]=S,l.pa[2]=In(C,0,1),l.pa[3]=w,l.pb[0]=v,l.pb[1]=y,l.pb[2]=b,l.pb[3]=_,l.pc[0]=T,l.pc[3]=2,Hn(E,k,A,D,O,l.pc),l}let _={seed:5,scale:1,period:1e9,phase:0},v=Kn(n,[0,0],0,1,1e5,.01,0,8.5);v.yA=v.yB=v.yTop=0;function y(e,t,n){let r,i,a;return e===`walk`?(r={type:`walk`,t0:0,turnT:0,x0:0,z0:0,x1:0,z1:1e5,v:.14,d:1e5,yaw0:0,yaw1:0},a=1e5/.14,i=1+t):e===`peck`?(r={type:`peck`,t0:0,x:0,z:0,yaw0:0,np:3,seed:3},a=1.5,i=t%2,i>a&&(r={type:`look`,x:0,z:0,yaw0:0,yaw1:0})):e===`fly`||e===`flap`||e===`glide`||e===`takeoff`||e===`land`?(r={type:`fly`,t0:0,F:v,yaw0:0,flapOnly:e===`flap`},a=600,e===`glide`&&(i=20+8*(Math.floor(t/8)+.5)),e!==`glide`&&(i=e===`fly`||e===`flap`?20+t:e===`takeoff`?t%1.6:a-1.6+t%1.6)):e===`settle`?(r={type:`look`,x:0,z:0,yaw0:0,yaw1:0,settle:!0},a=2,i=t%2):(r={type:`look`,x:0,z:0,yaw0:0,yaw1:0},a=1e5,i=t),g(_,r,i,a,t,n),n}return a.evaluate=h,a.evaluateForced=y,a.peckHp=c,a}var $n=(e,t,n)=>e<t?t:e>n?n:e;async function er(e,t,n=4242){let{layout:i,hf:a,LAYERS:o,quality:s,params:c}=e,l=i.WATER_Y??0,u=bn(e,[{thermals:[{c:[-12,34],R:24,turns:3,climb:7},{c:[34,42],R:20,turns:2,climb:4},{c:[16,-24],R:26,turns:3,climb:6}],dir:1,v:9.2,alt:28,flapHz:3.25,t0:0,scale:1},{thermals:[{c:[-12,34],R:28,turns:2,climb:5},{c:[-62,22],R:22,turns:3,climb:6},{c:[-40,-34],R:25,turns:2,climb:4}],dir:1,v:9.6,alt:34,flapHz:3.1,t0:37,scale:.95},{thermals:[{c:[62,-50],R:30,turns:3,climb:8},{c:[92,12],R:25,turns:2,climb:4},{c:[44,-92],R:28,turns:2,climb:5}],dir:-1,v:9.8,alt:42,flapHz:3.2,t0:11,scale:1.04},{thermals:[{c:[-92,-30],R:34,turns:3,climb:7},{c:[-44,-84],R:30,turns:2,climb:5}],dir:1,v:10,alt:50,flapHz:3,t0:70,scale:.98},{thermals:[{c:[4,2],R:125,turns:1,climb:0}],dir:-1,v:11,alt:72,flapHz:3.05,t0:5,scale:1.02}]),d=u.kites,f=(e,t)=>{let n=null,r=1e9;for(let i=-8;i<=8;i+=.5)for(let o=-8;o<=8;o+=.5){let s=e+o,c=t+i,u=l-a.heightAt(s,c);if(u<.14||u>.3||a.distToPaths(s,c)<3)continue;let d=Math.hypot(o,i)+20*Math.abs(u-.21);d<r&&(r=d,n=[s,c])}return n},p=i.PLAYER.spawn,m=i.VIEWS.shallows.pos,h=[];for(let[t,n,r,i,a]of[[p.x+13,p.z-4,.97,1,.13],[m[0]+2,m[2]-1.5,.93,2,.61],[62,-1,1,3,.37]]){let o=f(t,n);o&&h.push(Nn(e,{home:o,seed:i,scale:r,phase:a,radius:5}))}let g={doves:[],groups:[],stats:{}};if(c?.get?.(`birddoves`)!==`0`)try{g=Qn(e,{targets:[{x:p.x+4,z:p.z-3,r:9,n:3},{x:-60,z:38,r:9,n:2},{x:14,z:45,r:8,n:2},{x:66,z:5,r:8,n:3}]})}catch(e){console.warn(`[lagoon] birds: doves skipped`,e)}let _=g.doves,v=c?.get?.(`birdview`),y=[];if(v){let t=c.get(`birdact`)||(v===`dove`?`stand`:`auto`),n=$n(parseInt(c.get(`birdstrip`)||`1`,10)||1,1,12),r=parseFloat(c.get(`birddt`)||`0.06`),i=e.camera;i.updateMatrixWorld(!0);let o=new D;i.getWorldDirection(o);let s=new D().crossVectors(o,new D(0,1,0)).normalize(),l=v===`kite`?1.75:v===`egret`?.8:.3,u=v===`kite`?2.4:v===`egret`?2.2:.8,f=parseFloat(c.get(`birddist`)||``)||Math.max(u,n*l*.75),p=Math.atan2(o.x,o.z),m=(parseFloat(c.get(`birdyaw`)??`90`)||0)*Math.PI/180,h=p-m;y.frame={dist:f,yawRel:m,camYaw:p};for(let c=0;c<n;c++){let u=(c-(n-1)/2)*l,p=i.position.clone().addScaledVector(o,f).addScaledVector(s,u);if(v===`egret`){let n=[`alert`,`rest`,`stalk`,`peer`,`strike`,`swallow`],i=t===`sheet`?n[c%n.length]:null,o=t===`auto`?null:i?`stand`:t,s=Nn(e,{home:[p.x,p.z],seed:11+(t===`auto`?c:0),scale:1,loose:!0,radius:1.6,forced:o,pose:i,yaw:h,phase:0});y.push({kind:`egret`,E:s,dt:c*r,off:u,pb:[p.x,a.groundHeight(p.x,p.z),p.z]})}else if(v===`kite`)y.push({kind:`kite`,K:d[0],pos:[p.x,p.y,p.z],heading:h,act:t,dt:c*r,off:u});else if(v===`dove`&&g.evaluateForced){let e=t===`fly`||t===`flap`||t===`takeoff`||t===`land`,n=a.groundHeight(p.x,p.z),i=!e&&p.y-n<1.2;y.push({kind:`dove`,pos:[p.x,i?n:p.y-.1,p.z],heading:h,act:t,dt:c*r,air:!i,off:u})}}}let b=d.length,x=h.length,S=_.length,C=y.length,w=b+x+S+C,T=bt({dove:Qt}),E=new Float32Array(w*4),k=new Float32Array(w*4),A=new Float32Array(w*4),j=W(E,4),M=W(k,4),N=W(A,4);T.setAttribute(`aPA`,j),T.setAttribute(`aPB`,M),T.setAttribute(`aPC`,N);let{mat:P,depth:F}=an(e,cn(e)),I=new O(T,P,w);I.name=`ambient-birds`,I.instanceMatrix.setUsage(r),I.frustumCulled=!1,I.customDepthMaterial=F,I.castShadow=!!(s?.atLeast?s.atLeast(`medium`):s?.name!==`low`),I.receiveShadow=!0,I.layers.set(o.OPAQUE);let ee=e.registry?.get?.(`lighting`)?.staticLight?.shadow?.camera??null;I.onBeforeShadow=function(e,t,n,r){r===ee&&(T.drawRange.count=0)},I.onAfterShadow=function(){T.drawRange.count=1/0},e.scene.add(I);let L=I.instanceMatrix.array,R=new Float32Array(x*9),z=new Float32Array(9),B={pa:[0,0,0,0],pb:[0,0,0,0],pc:[0,0,0,0],feet:z},H=e=>{let t=e*4;E[t]=B.pa[0],E[t+1]=B.pa[1],E[t+2]=B.pa[2],E[t+3]=B.pa[3],k[t]=B.pb[0],k[t+1]=B.pb[1],k[t+2]=B.pb[2],k[t+3]=B.pb[3],A[t]=B.pc[0],A[t+1]=B.pc[1],A[t+2]=B.pc[2],A[t+3]=B.pc[3]},ne=(e,t,n,r)=>{B.air?V(L,e,t,n,r,B.fx,B.fy,B.fz,B.roll,B.scale):te(L,e,t,n,r,B.fx,0,B.fz,0,1,0,B.scale)},U=new D,re=new D,G=new D(0,1,0);function K(){let t=e.camera,n=y.frame;t.getWorldDirection(U),re.crossVectors(U,G).normalize();let r=Math.atan2(U.x,U.z);for(let e of y){let i=t.position.x+U.x*n.dist+re.x*e.off,o=t.position.y+U.y*n.dist,s=t.position.z+U.z*n.dist+re.z*e.off;if(e.heading=r-n.yawRel,e.kind===`egret`)e.pn=[i,a.groundHeight(i,s),s],e.dyaw=r-n.camYaw;else if(e.kind===`kite`)e.pos=[i,o,s];else{let t=a.groundHeight(i,s);e.pos=[i,e.air?o-.1:t,s]}}}function q(e,t){let n=0;for(let e=0;e<b;e++,n++){let r=d[e];u.evaluate(r,t,B),V(L,n,B.x,B.y,B.z,B.fx,B.fy,B.fz,B.roll,r.scale),H(n)}for(let e=0;e<x;e++,n++)h[e].evaluate(t,B),te(L,n,B.x,B.y,B.z,B.fx,0,B.fz,0,1,0,B.scale),H(n),R.set(z,e*9);for(let e=0;e<S;e++,n++)g.evaluate(_[e],t,B),ne(n,B.x,B.y,B.z),H(n);C&&K();for(let e=0;e<C;e++,n++){let r=y[e],i=t+r.dt;if(r.kind===`egret`){r.E.evaluate(i,B);let e=Math.cos(r.dyaw),t=Math.sin(r.dyaw),a=B.x-r.pb[0],o=B.z-r.pb[2],s=r.pn[0]+e*a+t*o,c=r.pn[2]-t*a+e*o,l=e*B.fx+t*B.fz,u=-t*B.fx+e*B.fz;te(L,n,s,B.y+r.pn[1]-r.pb[1],c,l,0,u,0,1,0,B.scale)}else if(r.kind===`kite`){r.act===`auto`?u.evaluate(r.K,i,B):u.evaluateForced(r.K,i,r.act,B);let e=Math.sin(r.heading),t=Math.cos(r.heading);V(L,n,r.pos[0],r.pos[1]+(B.bob??0),r.pos[2],e,0,t,0,1)}else{g.evaluateForced(r.act,i,B);let e=Math.sin(r.heading),t=Math.cos(r.heading),o=Math.sqrt(Math.max(0,1-B.fy*B.fy));B.fx=e*o,B.fz=t*o,B.roll=0;let s=B.air?B.y:B.y-a.groundHeight(B.x,B.z);ne(n,r.pos[0],r.pos[1]+s,r.pos[2])}H(n)}I.instanceMatrix.needsUpdate=!0,j.needsUpdate=!0,M.needsUpdate=!0,N.needsUpdate=!0}if(q(1/60,e.engine?.time??0),c?.has?.(`birdlog`)){let e=parseFloat(c.get(`birdlog`))||12,t={pa:[0,0,0,0],pb:[0,0,0,0],pc:[0,0,0,0],feet:new Float32Array(9)},n=e=>e.toFixed(2);for(let r=0;r<b;r++)u.evaluate(d[r],e,t),console.log(`[lagoon] birdlog t=${e} kite${r} ${n(t.x)},${n(t.y)},${n(t.z)} clearance ${n(d[r].clearance)} liftMax ${n(Math.max(...d[r].lift))}`);for(let r=0;r<x;r++)h[r].evaluate(e,t),console.log(`[lagoon] birdlog t=${e} egret${r} ${n(t.x)},${n(t.y)},${n(t.z)} yaw ${(Math.atan2(t.fx,t.fz)*57.2958).toFixed(0)} ${t.type}`);for(let r=0;r<S;r++)g.evaluate(_[r],e,t),console.log(`[lagoon] birdlog t=${e} dove${r} ${n(t.x)},${n(t.y)},${n(t.z)} yaw ${(Math.atan2(t.fx,t.fz)*57.2958).toFixed(0)} ${t.type} period ${_[r].period.toFixed(0)}`);console.log(`[lagoon] birdlog doves `+JSON.stringify(g.stats)+` geo `+JSON.stringify(T.userData.counts)+` groups `+JSON.stringify(g.groups.map(e=>({patch:e.patch.map(e=>+e.toFixed(1)),alt:e.alt?e.alt.map(e=>+e.toFixed(1)):null,circuit:!!e.plan,n:e.n,flights:e.flights}))))}return{mesh:I,update:q,fliers:b,waders:h.map(e=>({A:e.home,B:e.init[0]})),waderFeet:R,doves:S,stats:{verts:T.userData.counts,egretSegs:h.map(e=>e.stats),doves:g.stats}}}var tr=.04,nr=.012,rr=.34,ir=[.6,-.03],ar=[.3,0],or=.24;function sr(e){let t=Math.cos(or),n=Math.sin(or),r=e[1]-ir[0],i=e[2]-ir[1];return[e[0],ir[0]+r*t+i*n,ir[1]-r*n+i*t]}var cr=(()=>{let e=sr([0,.71,.15]);return[e[1],e[2]]})();function lr(e,t){let n=[],r=e.length;for(let i=0;i<r-1;i++){let a=e[Math.max(0,i-1)],o=e[i],s=e[i+1],c=e[Math.min(r-1,i+2)];for(let e=0;e<t;e++){let r=e/t,i=r*r,l=i*r;n.push([0,1,2].map(e=>.5*(2*o[e]+(-a[e]+s[e])*r+(2*a[e]-5*o[e]+4*s[e]-c[e])*i+(-a[e]+3*o[e]-3*s[e]+c[e])*l)))}}return n.push(e[r-1]),n}function ur(){let e=new B({aPart:1});e.uvFn=()=>[0,0],e.set(`aPart`,0),e.colorFn=(e,t,n)=>n>.24?[.26,.22,.08]:n>.13?[.16,.135,.11]:[.06,.042,.028],e.sweep([{c:[0,0,-.26],rx:.03,ry:.024},{c:[0,0,-.16],rx:.05,ry:.045},{c:[0,-.004,-.04],rx:.064,ry:.06},{c:[0,0,.06],rx:.058,ry:.056},{c:[0,.006,.14],rx:.042,ry:.043},{c:[0,.01,.19],rx:.034,ry:.034},{c:[0,.006,.232],rx:.02,ry:.02}],8,[0,1,0],[0,0,-.28],[0,-.01,.285]),e.colorFn=()=>[.1,.06,.032];for(let t of[-1,1]){let n=e.vertex(0,.004,-.2),r=e.vertex(t*.045,.004,-.21),i=e.vertex(t*.125,.002,-.5),a=e.vertex(0,.002,-.455);t>0?e.quad(n,a,i,r):e.quad(n,r,i,a)}e.set(`aPart`,1);for(let t of[-1,1]){let n=e=>e<=rr?F(.07,.095,(e-tr)/.30000000000000004):F(.095,.055,(e-rr)/.22),r=e=>e<=rr?F(-.165,-.155,(e-tr)/.30000000000000004):F(-.155,-.085,(e-rr)/.22),i=[tr,.14,.24,rr,.45,.56],a=[];for(let o of i){let i=n(o),s=r(o),c=(i+s)/2,l=[];for(let n=0;n<=3;n++){let r=F(i,s,n/3),a=(r-c)/((i-s)/2);e.colorFn=()=>n===3?[.045,.033,.024]:o>.38&&n<2?[.17,.14,.105]:[.11,.078,.052],l.push(e.vertex(t*o,nr+.014*(1-a*a)-.01*Math.max(0,o-rr),r))}a.push(l)}for(let n=0;n<i.length-1;n++)for(let r=0;r<3;r++){let i=a[n][r],o=a[n+1][r],s=a[n+1][r+1],c=a[n][r+1];t>0?e.quad(i,o,s,c):e.quad(i,c,s,o)}e.colorFn=()=>[.03,.024,.018];let o=[.7,.745,.76,.74,.69];for(let n=0;n<5;n++){let r=F(.05,-.075,n/4),i=.0098,a=e.vertex(t*.54,i,r+.016),s=e.vertex(t*.54,i,r-.016),c=e.vertex(t*o[n],-.0102,r-.02-n*.006),l=e.vertex(t*(o[n]-.01),-.0102,r+.004-n*.006);t>0?e.quad(a,l,c,s):e.quad(a,s,c,l)}}let t=e.vertex.bind(e);e.vertex=(n,r,i,a,o)=>{let s=sr([n,r,i]),c=e.colorFn;c&&(e.color=c(n,r,i),e.colorFn=null);let l=t(s[0],s[1],s[2],a,o);return e.colorFn=c,l};let n=(e,t,n,r)=>{let i=.72+.28*I(-.07,.05,t-r);return[.84*i,.84*i,.81*i]};e.set(`aPart`,2),e.colorFn=(e,t,r)=>n(e,t,r,.66+r*.2),e.sweep([{c:[0,.622,-.3],rx:.03,ry:.016},{c:[0,.628,-.26],rx:.05,ry:.036},{c:[0,.642,-.19],rx:.075,ry:.066},{c:[0,.66,-.11],rx:.091,ry:.088},{c:[0,.68,-.02],rx:.096,ry:.1},{c:[0,.7,.06],rx:.088,ry:.1},{c:[0,.72,.12],rx:.066,ry:.083},{c:[0,.736,.165],rx:.044,ry:.056}],14,[0,1,0],[0,.618,-.32],[0,.746,.19]);for(let t of[-1,1])e.colorFn=(e,t,r)=>{let i=n(e,t,r,.655+r*.15);return[i[0]*.99,i[1]*.98,i[2]*.95]},e.sweep([{c:[t*.058,.706,.1],rx:.02,ry:.048},{c:[t*.074,.69,.02],rx:.03,ry:.07},{c:[t*.074,.674,-.08],rx:.03,ry:.07},{c:[t*.058,.655,-.18],rx:.024,ry:.054},{c:[t*.034,.64,-.27],rx:.014,ry:.03}],10,[0,1,0],[t*.05,.712,.13],[-t*.01,.632,-.37]);e.set(`aPart`,3);let r=lr([[0,.7,.12],[0,.8,.19],[0,.9,.16],[0,.99,.145],[0,1.055,.178],[0,1.1,.228]],3);e.colorFn=()=>[.85,.85,.82],e.sweep(r.map((e,t)=>{let n=F(.036,.019,t/(r.length-1));return{c:e,rx:n,ry:n}}),8,[0,0,-1]),e.sweep([{c:[0,1.104,.214],rx:.02,ry:.021},{c:[0,1.11,.238],rx:.025,ry:.028},{c:[0,1.11,.266],rx:.021,ry:.024},{c:[0,1.106,.288],rx:.012,ry:.014}],8,[0,1,0],[0,1.1,.206],null),e.colorFn=(e,t,n)=>n>.405?[.22,.17,.05]:[.74,.54,.07],e.sweep([{c:[0,1.105,.288],rx:.011,ry:.013},{c:[0,1.102,.33],rx:.0085,ry:.0095},{c:[0,1.099,.38],rx:.0055,ry:.006}],6,[0,1,0],null,[0,1.096,.425]),e.vertex=t;for(let[t,n,r]of[[-1,4,5],[1,6,7]]){let i=t*.045;e.set(`aPart`,n),e.colorFn=(e,t)=>t>.585?[.8,.8,.77]:[.028,.025,.022],e.sweep([{c:[i,.62,-.035],rx:.02,ry:.02},{c:[i,.52,-.02],rx:.013,ry:.013},{c:[i,.3,0],rx:.0095,ry:.0095}],5,[0,0,1]),e.set(`aPart`,r),e.colorFn=()=>[.026,.023,.02],e.sweep([{c:[i,.3,0],rx:.0095,ry:.0095},{c:[i,.15,.004],rx:.0078,ry:.0078},{c:[i,.018,.01],rx:.0075,ry:.0075}],5,[0,0,1],null,[i,.008,.012]);for(let[t,n]of[[-.028,.075],[0,.085],[.028,.075],[0,-.04]])e.sweep([{c:[i,.012,.01],rx:.004,ry:.004}],4,[0,1,0],null,[i+t,.004,.01+n])}return e.colorFn=null,e.build()}async function dr(e,t,n=4242){if(!e.params?.has?.(`birdsold`))try{return await er(e,t,n)}catch(e){console.warn(`[lagoon] birds: anatomical flock failed, using the legacy birds`,e)}let{layout:i,hf:a,LAYERS:o}=e,s=[{cx:0,cz:20,alt:36,R:22,v:9,dir:1,drift:8,ph:0,flap:23,scale:1},{cx:0,cz:20,alt:41,R:26,v:9.4,dir:1,drift:8,ph:2.6,flap:29,scale:.94},{cx:62,cz:-62,alt:48,R:30,v:9.6,dir:-1,drift:10,ph:1.2,flap:31,scale:1.04},{cx:-96,cz:-28,alt:52,R:36,v:10,dir:1,drift:12,ph:4.1,flap:27,scale:.98},{cx:0,cz:0,alt:62,R:150,v:11,dir:-1,drift:20,ph:.7,flap:13,scale:1.02}],c=(e,n)=>{let r=null,i=1e9;for(let o=-8;o<=8;o+=.5)for(let s=-8;s<=8;s+=.5){let c=e+s,l=n+o,u=t.depth(c,l);if(u<.14||u>.3||a.distToPaths(c,l)<3)continue;let d=Math.hypot(s,o)+20*Math.abs(u-.22);d<i&&(i=d,r=[c,l])}return r},l=(e,n)=>{let r=null,i=-1e9;for(let a=0;a<16;a++){let o=a/16*N,s=e[0]+Math.cos(o)*n,c=e[1]+Math.sin(o)*n,l=!0,u=0;for(let n=1;n<=6;n++){let r=t.depth(F(e[0],s,n/6),F(e[1],c,n/6));if(r<.1||r>.34){l=!1;break}u+=-Math.abs(r-.22)}l&&u>i&&(i=u,r=[s,c])}return r??[e[0]+.01,e[1]]},u=i.PLAYER.spawn,d=i.VIEWS.shallows.pos,f=[];for(let[e,t,n,r,i]of[[u.x+13,u.z-4,.92,34,1],[d[0]+2,d[2]-1.5,.8,41,2]]){let a=c(e,t);if(!a)continue;let o=l(a,1.4);f.push({A:a,B:o,scale:n,cycle:r,seed:i,len:Math.hypot(o[0]-a[0],o[1]-a[1])})}let p=s.length,m=f.length,h=p+m,g=ur(),_=new Float32Array(h*4),v=new Float32Array(h*4),y=W(_,4),b=W(v,4);g.setAttribute(`aPose`,y),g.setAttribute(`aPose2`,b);let x=ne(e,`birds`,{vertexColors:!0,roughness:.88,metalness:0,side:2,envMapIntensity:.75},{vertexPars:`attribute float aPart;
attribute vec4 aPose;
attribute vec4 aPose2;
`+U,deform:`
      bool isWader = aPart > 1.5;
      if ((aPose2.z > 0.5) != isWader) {
        ambPos = vec3(0.0);
      } else if (aPart > 0.5 && aPart < 1.5) {
        // kite wing: shoulder hinge (a1) then elbow hinge (a2) for the hand
        float sd = ambPos.x < 0.0 ? -1.0 : 1.0;
        vec3 q = vec3(abs(ambPos.x), ambPos.y, ambPos.z);
        vec3 nq = vec3(objectNormal.x * sd, objectNormal.y, objectNormal.z);
        const vec3 SH = vec3(${tr.toFixed(3)}, ${nr.toFixed(3)}, 0.0);
        const vec3 EL = vec3(${rr.toFixed(3)}, ${nr.toFixed(3)}, 0.0);
        if (q.x > EL.x + 1e-4) { q = ambRotZ(q - EL, aPose.y) + EL; nq = ambRotZ(nq, aPose.y); }
        q = ambRotZ(q - SH, aPose.x) + SH; nq = ambRotZ(nq, aPose.x);
        ambPos = vec3(q.x * sd, q.y, q.z);
        objectNormal = vec3(nq.x * sd, nq.y, nq.z);
      } else if (aPart > 2.5 && aPart < 3.5) {
        // egret neck + head: dip (about x) then turn (about y) around the neck base
        const vec3 NP = vec3(0.0, ${cr[0].toFixed(3)}, ${cr[1].toFixed(3)});
        ambPos = ambRotY(ambRotX(ambPos - NP, aPose2.y), aPose2.x) + NP;
        objectNormal = ambRotY(ambRotX(objectNormal, aPose2.y), aPose2.x);
      } else if (aPart > 3.5) {
        // egret legs: ankle flex (lower segment) then hip swing
        bool left = aPart < 5.5;
        bool lower = (aPart > 4.5 && aPart < 5.5) || aPart > 6.5;
        float th1 = left ? aPose.x : aPose.z;
        float th2 = left ? aPose.y : aPose.w;
        const vec3 HP = vec3(0.0, ${ir[0].toFixed(3)}, ${ir[1].toFixed(3)});
        const vec3 AK = vec3(0.0, ${ar[0].toFixed(3)}, ${ar[1].toFixed(3)});
        if (lower) { ambPos = ambRotX(ambPos - AK, th2) + AK; objectNormal = ambRotX(objectNormal, th2); }
        ambPos = ambRotX(ambPos - HP, -th1) + HP; objectNormal = ambRotX(objectNormal, -th1);
      }
    `}),S=new O(g,x,h);S.name=`ambient-birds`,S.instanceMatrix.setUsage(r),S.frustumCulled=!1,S.castShadow=!1,S.receiveShadow=!0,S.layers.set(o.OPAQUE),e.scene.add(S);for(let e=0;e<m;e++)v[(p+e)*4+2]=1;let C=S.instanceMatrix.array,w=[0,0,0],T=[0,0],E=.22,D=Math.asin(E/2/.6);function k(e,t){let n=e-Math.floor(e);if(n<.5){t[0]=D*(1-4*n),t[1]=.04;return}let r=(n-.5)*2;t[0]=-D+2*D*(r*r*(3-2*r)),t[1]=.95*Math.sin(Math.PI*r)}function A(e,t,n){let r=e.cx+e.drift*Math.cos(t*.013+e.ph),i=e.cz+e.drift*Math.sin(t*.011+e.ph*1.3),a=e.R*(1+.12*Math.sin(t*.047+e.ph)),o=e.dir*(e.v/e.R)*t+e.ph;return n[0]=r+Math.cos(o)*a,n[2]=i+Math.sin(o)*a,n[1]=e.alt+4*Math.sin(t*.031+e.ph*2.1),n}function j(e,n){for(let e=0;e<p;e++){let t=s[e];A(t,n,w);let r=w[0],i=w[1],a=w[2];A(t,n+.1,w);let o=w[0]-r,c=w[1]-i,l=w[2]-a,u=-t.dir*Math.atan(t.v*t.v/(t.R*9.81))*.95+.05*Math.sin(n*.7+t.ph);V(C,e,r,i,a,o,c*.6,l,u,t.scale);let d=(n+t.ph*7)/t.flap,f=(d-Math.floor(d))*t.flap,p=I(0,.3,f)*(1-I(1.3,1.9,f)),m=n*N*3.1;_[e*4]=.07+.02*Math.sin(n*1.3+t.ph)+p*.6*Math.sin(m),_[e*4+1]=-.1+p*.32*Math.sin(m-.9)}for(let e=0;e<m;e++){let r=f[e],i=p+e,a=Math.floor(n/r.cycle),o=n-a*r.cycle,s=!(a&1),c=s?r.A:r.B,l=s?r.B:r.A,u=l[0]-c[0],d=l[1]-c[1],m=r.len||.001,h=.11,g=m/h,y=Math.atan2(-u,-d),b=Math.atan2(u,d),x=I(17,20,o),S=y+(b-y+0)*x,w=0,D=0;if(o>20){let e=o-20;w=P(h*e,0,m),D=I(0,1,e)*(1-I(g-.6,g+.6,e))}let O=c[0]+u/m*w,A=c[1]+d/m*w,j=t.height(O,A),M=w/(2*E);k(M,T),_[i*4]=T[0]*D,_[i*4+1]=.03+T[1]*D,k(M+.5,T),_[i*4+2]=T[0]*D,_[i*4+3]=.03+T[1]*D;let F=r.seed*3.7,ee=I(.55,.9,Math.sin(n*.13+F))*(1-D);v[i*4]=(.45*Math.sin(n*.21+F)+.2*Math.sin(n*.53+F*2))*(1-.7*D)*(1-ee),v[i*4+1]=.05+.06*Math.sin(n*.37+F)+.45*ee+.12*D;let L=.006*Math.sin(M*N*2)*D,R=Math.sin(S),z=Math.cos(S);te(C,i,O,j+L,A,R,0,z,0,1,0,r.scale)}S.instanceMatrix.needsUpdate=!0,y.needsUpdate=!0,b.needsUpdate=!0}return j(1/60,e.engine.time??0),{mesh:S,update:j,fliers:p,waders:f.map(e=>({A:e.A,B:e.B}))}}var fr=.012,pr=[[0,0],[.5,0],[0,.3125]],mr=.25,hr=.3125,gr=[.5,.3125],_r=.25,vr=.3125,yr=.625,br=.5,xr=.125,Sr=(e,t,n,r,i,a)=>[e+(fr+(1-2*fr)*i)*n,t+(fr+(1-2*fr)*a)*r],Cr=.03,wr=-.0245,Tr=.0135,Er=.038/Cr,Dr=.03,Or=.011,kr=Or/Dr,Ar=.72,jr=[{key:`darter`,len:1,percher:!0,beat:36},{key:`emperor`,len:1.82,percher:!1,beat:28},{key:`dropwing`,len:.86,percher:!0,beat:38},{key:`darterf`,len:.97,percher:!0,beat:36}],Mr=[{key:`paintedlady`,span:1,beat:9.5,burst:[3,7],glide:[.12,.45],glideAng:.12,amp:1,speed:1.6},{key:`tiger`,span:1.25,beat:5.6,burst:[2,4],glide:[.35,1],glideAng:.32,amp:.95,speed:1.2},{key:`orangetip`,span:.62,beat:11.5,burst:[5,12],glide:[.04,.2],glideAng:.06,amp:1.05,speed:1.9}],Nr=.058/.0618,Pr=40;function Fr(e,t=Pr){let n=e.length,r=[];for(let t=0;t<n;t++){let i=e[(t-1+n)%n],a=e[t],o=e[(t+1)%n],s=e[(t+2)%n];for(let e=0;e<12;e++){let t=e/12,n=t*t,c=n*t;r.push([0,1].map(e=>.5*(2*a[e]+(-i[e]+o[e])*t+(2*i[e]-5*a[e]+4*o[e]-s[e])*n+(-i[e]+3*a[e]-3*o[e]+s[e])*c)))}}let i=[0];for(let e=1;e<=r.length;e++){let t=r[e-1],n=r[e%r.length];i.push(i[e-1]+Math.hypot(n[0]-t[0],n[1]-t[1]))}let a=i[i.length-1],o=[],s=0;for(let e=0;e<t;e++){let n=e/t*a;for(;i[s+1]<n;)s++;let c=r[s],l=r[(s+1)%r.length],u=(n-i[s])/Math.max(1e-9,i[s+1]-i[s]);o.push([c[0]+(l[0]-c[0])*u,c[1]+(l[1]-c[1])*u])}return o}var Ir=(e,t)=>`const vec2 ${e}[${Pr}] = vec2[${Pr}](${Fr(t).map(e=>`vec2(${e[0].toFixed(4)}, ${e[1].toFixed(4)})`).join(`, `)});\n`,Lr=[[.03,.86],[.25,.99],[.5,1.07],[.75,1.115],[.905,1.13],[.965,1.085],[.95,.98],[.905,.87],[.86,.77],[.76,.63],[.56,.585],[.35,.6],[.15,.67],[.04,.76]],Rr=[[.04,.8],[.2,.84],[.42,.82],[.57,.745],[.67,.64],[.725,.52],[.73,.4],[.68,.28],[.59,.185],[.47,.13],[.36,.1],[.26,.115],[.15,.22],[.075,.39],[.045,.6]],zr=[[.03,.86],[.25,1],[.5,1.09],[.75,1.145],[.9,1.16],[.975,1.11],[.978,1],[.93,.87],[.85,.75],[.74,.625],[.55,.565],[.35,.585],[.15,.665],[.04,.765]],Br=[[.04,.8],[.22,.85],[.45,.82],[.62,.72],[.735,.585],[.775,.44],[.74,.29],[.645,.16],[.51,.08],[.35,.055],[.21,.095],[.11,.21],[.055,.4],[.042,.61]],Vr=[[.03,.86],[.25,.99],[.5,1.06],[.72,1.1],[.855,1.1],[.935,1.04],[.945,.94],[.9,.82],[.82,.7],[.7,.6],[.52,.565],[.32,.585],[.14,.665],[.04,.765]],Hr=[[.04,.8],[.2,.84],[.42,.8],[.575,.7],[.675,.565],[.7,.425],[.645,.285],[.545,.17],[.42,.095],[.285,.075],[.165,.13],[.085,.27],[.045,.47],[.035,.64]],Ur=[[0,.29],[.08,.34],[.4,.349],[.7,.35],[.88,.346],[.96,.334],[.995,.31],[.985,.275],[.93,.24],[.8,.19],[.6,.14],[.4,.11],[.22,.13],[.08,.19],[0,.225]],Wr=[[0,.285],[.08,.34],[.4,.349],[.7,.35],[.88,.346],[.96,.334],[.995,.31],[.985,.272],[.93,.232],[.78,.167],[.55,.1],[.36,.045],[.2,.012],[.09,.015],[.03,.07],[0,.16]];function Gr(e){let t=(1/(mr*e*(1-2*fr))).toFixed(6),n=(1/(br*e*(1-2*fr))).toFixed(6),r=(Math.max(Ar/(_r*e),1/(vr*e))/(1-2*fr)).toFixed(6);return`
#define PI 3.14159265
#define NPOLY ${Pr}
float sat(float x) { return clamp(x, 0.0, 1.0); }
vec2 rot2(vec2 p, float a) { float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
float nz(vec2 p, int oct) { return bk_fbm(p / 256.0, vec2(256.0), oct); }
vec3 wor(vec2 p) { return bk_worley(p / 256.0, vec2(256.0)); }
float sdPoly(vec2 p, vec2 v[NPOLY]) {
  float d = dot(p - v[0], p - v[0]);
  float s = 1.0;
  int j = NPOLY - 1;
  for (int i = 0; i < NPOLY; i++) {
    vec2 e = v[j] - v[i];
    vec2 w = p - v[i];
    vec2 b = w - e * clamp(dot(w, e) / max(dot(e, e), 1e-12), 0.0, 1.0);
    d = min(d, dot(b, b));
    bool c1 = p.y >= v[i].y;
    bool c2 = p.y < v[j].y;
    bool c3 = e.x * w.y > e.y * w.x;
    if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s;
    j = i;
  }
  return s * sqrt(d);
}
float disc(vec2 p, vec2 c, float r, float px) { return sat((r - length(p - c)) / px + 0.5); }
float oval(vec2 p, vec2 c, vec2 r, float ang, float px) {
  vec2 q = rot2(p - c, -ang) / r;
  return sat((1.0 - length(q)) * min(r.x, r.y) / px + 0.5);
}
// thin rays from o (angular spacing sp, first ray at a0), constant metric width
float rays(vec2 p, vec2 o, float a0, float sp, float width) {
  vec2 d = p - o;
  float r = length(d);
  float k = (atan(d.y, d.x) - a0) / sp;
  float f = abs(fract(k + 0.5) - 0.5) * sp;
  return 1.0 - smoothstep(width * 0.5, width, r * sin(min(f, 1.5)));
}
// round spots in a row parallel to a margin: arc = position along it, dm = distance in from it
float mdot(float arc, float dm, float dm0, float spacing, float r, float px) {
  float q = (fract(arc / spacing) - 0.5) * spacing;
  return sat((r - length(vec2(q, dm - dm0))) / px + 0.5);
}
float segd(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }

${Ir(`PL_FW`,Lr)}${Ir(`PL_HW`,Rr)}${Ir(`PT_FW`,zr)}${Ir(`PT_HW`,Br)}${Ir(`CE_FW`,Vr)}${Ir(`CE_HW`,Hr)}${Ir(`DF_FW`,Ur)}${Ir(`DF_HW`,Wr)}

// eyespot (painted lady hindwing underside): black ring, yellow ring, black, blue pupil, white dot
vec3 eyespot(vec3 c, vec2 p, vec2 o, float r, float px) {
  float d = length(p - o);
  c = mix(c, vec3(0.02, 0.018, 0.015), sat((r - d) / px + 0.5));
  c = mix(c, vec3(0.62, 0.46, 0.08), sat((r * 0.78 - d) / px + 0.5));
  c = mix(c, vec3(0.02, 0.018, 0.02), sat((r * 0.55 - d) / px + 0.5));
  c = mix(c, vec3(0.12, 0.2, 0.42), sat((r * 0.4 - d) / px + 0.5));
  c = mix(c, vec3(0.75, 0.78, 0.8), sat((r * 0.12 - d) / px + 0.5));
  return c;
}

// ---------------------------------------------------------------------------
// BUTTERFLY wing cell: w metric wing space, sp species, under 0/1
vec4 butterfly(vec2 w, float sp, float under) {
  float px = ${t};
  float dF = 0.0, dH = 0.0;
  vec2 A = vec2(0.93, 1.12);
  if (sp < 0.5) { dF = sdPoly(w, PL_FW); dH = sdPoly(w, PL_HW); }
  else if (sp < 1.5) { dF = sdPoly(w, PT_FW); dH = sdPoly(w, PT_HW); A = vec2(0.95, 1.14); }
  else { dF = sdPoly(w, CE_FW); dH = sdPoly(w, CE_HW); A = vec2(0.9, 1.08); }
  vec2 Rh = vec2(0.04, 0.78);
  float hr = length(w - Rh);
  float ha = atan(w.y - Rh.y, w.x - Rh.x);
  // scalloped hindwing margin (painted lady strongly, the others a little)
  float sc = 0.5 + 0.5 * cos(ha * 23.0);
  dH += (sp < 0.5 ? 0.009 : 0.003) * sc * smoothstep(0.35, 0.6, hr);
  float aF = sat(0.5 - dF / px), aH = sat(0.5 - dH / px);
  float alpha = max(aF, aH);
  bool onF;
  if (under < 0.5) onF = dF < 0.0 ? true : (dH < 0.0 ? false : dF < dH);
  else onF = dH < 0.0 ? false : (dF < 0.0 ? true : dF < dH);
  // forewing frame: fu along the costa (0 root .. 1 apex), fv toward the inner margin
  vec2 R = vec2(0.03, 0.81);
  vec2 U = normalize(A - R);
  vec2 V = vec2(U.y, -U.x);
  float Lf = length(A - R);
  float fu = dot(w - R, U) / Lf, fv = dot(w - R, V) / Lf;
  float dmF = -dF, dmH = -dH;
  // outer margins only (not the costa, the inner margin or the anal margin by the body)
  float outerF = smoothstep(0.56, 0.64, fu) * smoothstep(0.02, 0.06, fv);
  float outerH = smoothstep(-1.4, -1.15, ha);
  vec3 black = vec3(0.012, 0.01, 0.008);
  vec3 white = vec3(0.84, 0.83, 0.78);
  float grain = 0.94 + 0.12 * nz(w * 110.0, 2);
  vec3 c = vec3(0.5);
  float veinF = rays(w, R + U * 0.22 * Lf + V * 0.06, atan(U.y, U.x) - 0.9, 0.16, 0.012) * smoothstep(0.18, 0.4, fu);
  float veinH = rays(w, Rh + vec2(0.1, -0.05), -2.2, 0.2, 0.012) * smoothstep(0.2, 0.35, hr);
  if (sp < 0.5) {
    // ---------------- painted lady ----------------
    vec3 orange = vec3(0.8, 0.25, 0.07);
    vec3 dusky = vec3(0.12, 0.085, 0.05);
    if (under < 0.5) {
      if (onF) {
        c = mix(dusky, orange, smoothstep(0.05, 0.22, fu + 0.25 * fv));
        float bandC = 0.47 + 0.15 * fv + 0.035 * sin(fv * 19.0);
        float band = (1.0 - smoothstep(0.045, 0.07, abs(fu - bandC))) * (1.0 - smoothstep(0.42, 0.52, fv));
        band = max(band, disc(vec2(fu, fv), vec2(0.31, 0.12), 0.045, px * 1.1));
        band = max(band, (1.0 - smoothstep(0.03, 0.05, abs(fv - 0.5 + 0.2 * (fu - 0.45)))) * smoothstep(0.35, 0.45, fu) * (1.0 - smoothstep(0.62, 0.7, fu)));
        c = mix(c, black, band);
        float apexB = smoothstep(0.585, 0.615, fu - 0.55 * max(fv - 0.12, 0.0)) * (1.0 - smoothstep(0.34, 0.42, fv));
        c = mix(c, black, apexB);
        float wht = oval(vec2(fu, fv), vec2(0.625, 0.125), vec2(0.03, 0.1), 0.25, px);
        wht = max(wht, disc(vec2(fu, fv), vec2(0.83, 0.06), 0.034, px));
        wht = max(wht, disc(vec2(fu, fv), vec2(0.885, 0.145), 0.028, px));
        wht = max(wht, disc(vec2(fu, fv), vec2(0.865, 0.235), 0.025, px));
        wht = max(wht, disc(vec2(fu, fv), vec2(0.8, 0.305), 0.02, px));
        c = mix(c, white, wht);
        // black submarginal marks below the apex + marginal line
        float sub = (1.0 - smoothstep(0.012, 0.022, abs(dmF - 0.05))) * smoothstep(0.3, 0.4, fv) * (0.5 + 0.5 * cos(fv * 60.0));
        c = mix(c, black, max(sub * 0.9, (1.0 - smoothstep(0.012, 0.025, dmF)) * smoothstep(0.25, 0.35, fv) * outerF));
        c *= 1.0 - 0.25 * veinF * (1.0 - apexB);
        // chequered fringe
        float fr = (1.0 - smoothstep(0.004, 0.009, dmF)) * outerF;
        c = mix(c, step(0.5, fract(fv * Lf / 0.03)) > 0.5 ? white : black, fr);
      } else {
        c = mix(dusky, orange * 0.97, smoothstep(0.12, 0.3, hr));
        float spots = 0.0;
        for (int k = 0; k < 4; k++) {
          float ac = -0.2 - 0.36 * float(k);
          float dA = hr * abs(ha - ac);
          spots = max(spots, sat((0.026 - length(vec2(dA, dmH - 0.092))) / px + 0.5));
        }
        c = mix(c, black, spots);
        float chev = (1.0 - smoothstep(0.009, 0.016, abs(dmH - 0.042 - 0.012 * sc))) * smoothstep(0.2, 0.6, sc);
        c = mix(c, black, chev * 0.9);
        c = mix(c, black * 2.0, (1.0 - smoothstep(0.012, 0.022, dmH)) * outerH);
        c = mix(c, vec3(0.5, 0.45, 0.38), (1.0 - smoothstep(0.003, 0.007, dmH)) * outerH);
        c *= 1.0 - 0.2 * veinH;
      }
    } else {
      vec3 rose = vec3(0.76, 0.3, 0.2);
      vec3 buff = vec3(0.4, 0.32, 0.2);
      if (onF) {
        c = mix(vec3(0.22, 0.16, 0.1), rose, smoothstep(0.06, 0.25, fu + 0.3 * fv));
        float bandC = 0.48 + 0.15 * fv;
        float band = (1.0 - smoothstep(0.03, 0.05, abs(fu - bandC))) * (1.0 - smoothstep(0.38, 0.46, fv));
        band = max(band, disc(vec2(fu, fv), vec2(0.32, 0.12), 0.035, px));
        c = mix(c, black * 1.5, band);
        float apexB = smoothstep(0.585, 0.615, fu - 0.55 * max(fv - 0.12, 0.0)) * (1.0 - smoothstep(0.34, 0.42, fv));
        vec3 ap = mix(buff, vec3(0.22, 0.17, 0.1), smoothstep(0.3, 0.7, nz(w * 40.0, 3) + 0.5));
        c = mix(c, ap, apexB);
        float wht = oval(vec2(fu, fv), vec2(0.625, 0.125), vec2(0.03, 0.1), 0.25, px);
        wht = max(wht, disc(vec2(fu, fv), vec2(0.83, 0.06), 0.03, px));
        wht = max(wht, disc(vec2(fu, fv), vec2(0.885, 0.145), 0.025, px));
        wht = max(wht, disc(vec2(fu, fv), vec2(0.865, 0.235), 0.022, px));
        c = mix(c, white, wht);
        c *= 1.0 - 0.18 * veinF;
        c = mix(c, vec3(0.55, 0.5, 0.42), (1.0 - smoothstep(0.004, 0.009, dmF)) * outerF);
      } else {
        // cryptic marbled hindwing underside with a submarginal row of eyespots
        vec3 base = vec3(0.19, 0.15, 0.085), olive = vec3(0.27, 0.25, 0.13), pale = vec3(0.6, 0.57, 0.48);
        float n = nz(w * 9.0 + 3.1, 4);
        c = mix(base, olive, smoothstep(-0.25, 0.35, n));
        vec3 cl = wor(w * vec2(10.0, 12.0));
        float net = max(veinH, 1.0 - smoothstep(0.02, 0.07, cl.y - cl.x));
        c = mix(c, pale, net * 0.75);
        c = mix(c, pale * 1.1, smoothstep(0.15, 0.45, nz(w * 5.0 + 11.0, 3)) * (1.0 - smoothstep(0.3, 0.5, hr)) * 0.7);
        for (int k = 0; k < 5; k++) {
          float ac = -0.1 - 0.3 * float(k);
          float rr = 0.024 + 0.011 * sin(3.14159 * (float(k) + 0.5) / 5.0);
          vec2 cen = Rh + vec2(cos(ac), sin(ac)) * hr;
          float dA = hr * abs(ha - ac);
          float dd = length(vec2(dA, dmH - 0.095));
          c = mix(c, eyespot(c, vec2(dd, 0.0), vec2(0.0), rr, px), step(dd, rr * 1.4));
        }
        float mb = (1.0 - smoothstep(0.035, 0.045, dmH)) * outerH;
        c = mix(c, vec3(0.3, 0.31, 0.42), mb * 0.8);
        c = mix(c, black * 3.0, (1.0 - smoothstep(0.004, 0.009, abs(dmH - 0.02))) * 0.8 * outerH);
        c = mix(c, pale, (1.0 - smoothstep(0.003, 0.007, dmH)) * outerH);
      }
    }
  } else if (sp < 1.5) {
    // ---------------- plain tiger ----------------
    vec3 tawny = under < 0.5 ? vec3(0.72, 0.25, 0.035) : vec3(0.76, 0.4, 0.11);
    if (onF) {
      c = tawny;
      c = mix(c, black, 1.0 - smoothstep(0.03, 0.045, abs(fv + 0.01)));
      float apexB = smoothstep(0.56, 0.6, fu - 0.35 * max(fv - 0.05, 0.0)) * (1.0 - smoothstep(0.44, 0.5, fv));
      c = mix(c, under < 0.5 ? black : vec3(0.3, 0.14, 0.05), apexB);
      // oblique white band of 4-5 spots across the black apex
      float band = 0.0;
      for (int k = 0; k < 5; k++) {
        float f = float(k) / 4.0;
        vec2 cc = mix(vec2(0.62, 0.05), vec2(0.72, 0.36), f);
        band = max(band, oval(vec2(fu, fv), cc, vec2(0.04 - 0.008 * f, 0.03), 0.3, px));
      }
      band = max(band, mdot(fv * Lf, dmF, 0.05, 0.05, 0.008, px) * smoothstep(0.1, 0.2, fv) * 0.9);
      c = mix(c, white, band * apexB);
      float border = (1.0 - smoothstep(0.028, 0.038, dmF)) * outerF;
      c = mix(c, black, border);
      float dots = max(mdot(fv * Lf, dmF, 0.013, 0.034, 0.0065, px), mdot(fv * Lf + 0.017, dmF, 0.026, 0.034, 0.005, px) * 0.8);
      c = mix(c, white, dots * border);
      c *= 1.0 - 0.22 * veinF * (1.0 - apexB);
    } else {
      c = tawny * 0.98;
      float sp3 = max(disc(w, vec2(0.33, 0.6), 0.03, px), max(disc(w, vec2(0.41, 0.5), 0.026, px), disc(w, vec2(0.3, 0.49), 0.024, px)));
      c = mix(c, black, sp3);
      float border = (1.0 - smoothstep(0.045, 0.055, dmH)) * outerH;
      c = mix(c, black, border);
      float d1 = mdot(ha * hr, dmH, 0.013, 0.038, 0.0065, px);
      float d2 = mdot(ha * hr + 0.019, dmH, 0.032, 0.038, (under < 0.5 ? 0.007 : 0.009), px);
      c = mix(c, white, max(d1, d2) * border);
      c *= 1.0 - 0.25 * veinH * (1.0 - border);
    }
  } else {
    // ---------------- desert orange tip ----------------
    vec3 wh = vec3(0.86, 0.86, 0.82);
    if (onF) {
      c = mix(vec3(0.2, 0.2, 0.2), wh, smoothstep(0.02, 0.16, fu));
      float tip = smoothstep(0.6, 0.64, fu + 0.15 * fv) * (1.0 - smoothstep(0.52, 0.6, fv));
      vec3 org = under < 0.5 ? vec3(0.9, 0.3, 0.02) : vec3(0.85, 0.68, 0.3);
      c = mix(c, org, tip * (under < 0.5 ? 1.0 : 0.7));
      if (under < 0.5) {
        float bd = (1.0 - smoothstep(0.022, 0.032, dmF)) * smoothstep(0.52, 0.6, fu);
        float teeth = veinF * smoothstep(0.018, 0.06, 0.08 - dmF) * tip;
        c = mix(c, black, max(bd, teeth));
      }
      c = mix(c, black, disc(vec2(fu, fv), vec2(0.45, 0.2), 0.018, px) * (under < 0.5 ? 1.0 : 0.6));
      c *= 1.0 - 0.1 * veinF;
    } else {
      if (under < 0.5) {
        c = mix(vec3(0.3, 0.3, 0.3), wh, smoothstep(0.08, 0.3, hr));
        float mdots = (1.0 - smoothstep(0.012, 0.022, dmH)) * smoothstep(0.55, 0.9, sc) * outerH;
        c = mix(c, black, mdots);
      } else {
        c = vec3(0.8, 0.7, 0.5) * (0.9 + 0.2 * nz(w * 14.0, 3));
        c = mix(c, vec3(0.45, 0.35, 0.22), smoothstep(0.55, 0.7, nz(w * 30.0 + 5.0, 2) + 0.5) * 0.5);
      }
      c *= 1.0 - 0.1 * veinH;
    }
  }
  return vec4(max(c * grain, vec3(0.0)), alpha);
}

// ---------------------------------------------------------------------------
// DRAGONFLY wing cell: ab = (span 0..1, chord 0 trailing .. 1 leading)
// variant 0 scarlet darter, 1 emperor, 2 violet dropwing; hind 0/1
vec4 dfWing(vec2 ab, float variant, float hind) {
  float px = ${n};
  vec2 w = vec2(ab.x, ab.y * ${kr.toFixed(5)});
  float sd = hind > 0.5 ? sdPoly(w, DF_HW) : sdPoly(w, DF_FW);
  float inside = sat(0.5 - sd / px);
  float a = ab.x, b = ab.y;
  float vw = 0.0042;
  // longitudinal veins (metric y as a function of span)
  float v = 0.0;
  v = max(v, 1.0 - smoothstep(vw * 0.5, vw * 1.4, -sd));                                       // marginal vein / costa
  v = max(v, (1.0 - smoothstep(vw * 0.5, vw, abs(w.y - mix(0.322, 0.336, a)))) * step(0.02, a)); // R1
  v = max(v, (1.0 - smoothstep(vw * 0.5, vw, abs(w.y - mix(0.338, 0.345, a)))) * (1.0 - step(0.46, a))); // subcosta (ends at the nodus)
  v = max(v, (1.0 - smoothstep(vw * 0.45, vw * 0.9, abs(w.y - mix(0.3, 0.27, a)))) * step(0.1, a));
  v = max(v, (1.0 - smoothstep(vw * 0.45, vw * 0.9, abs(w.y - mix(0.285, 0.215, sat((a - 0.3) / 0.7))))) * step(0.3, a));
  v = max(v, (1.0 - smoothstep(vw * 0.45, vw * 0.9, abs(w.y - mix(0.265, 0.17, a)))) * step(0.04, a));
  v = max(v, (1.0 - smoothstep(vw * 0.45, vw * 0.9, abs(w.y - mix(hind > 0.5 ? 0.2 : 0.225, hind > 0.5 ? 0.09 : 0.12, a)))) * step(0.03, a));
  if (hind > 0.5) v = max(v, (1.0 - smoothstep(vw * 0.45, vw * 0.9, abs(w.y - mix(0.14, 0.02, sat(a / 0.55))))) * (1.0 - step(0.55, a)));
  // crossveins: ladder-like antenodals / postnodals along the leading edge, a
  // polygonal network elsewhere (cells smaller toward the trailing edge + tip)
  float nod = 0.46;
  float lad = step(0.322, w.y) * step(w.y, 0.35);
  float sp1 = a < nod ? 0.034 : 0.022;
  float cv = (1.0 - smoothstep(vw * 0.3, vw * 0.75, abs(fract(a / sp1) - 0.5) * sp1)) * lad;
  vec3 cl = wor(vec2(a * mix(34.0, 48.0, a), w.y * mix(26.0, 40.0, 1.0 - b)));
  float net = (1.0 - smoothstep(0.03, 0.09, cl.y - cl.x)) * (1.0 - lad) * smoothstep(0.03, 0.12, a);
  v = max(v, max(cv * 0.85, net * 0.7));
  // nodus + pterostigma
  float ptero = step(0.8, a) * step(a, 0.885) * step(0.326, w.y);
  v = max(v, disc(w, vec2(nod, 0.342), 0.007, px));
  // colours (membrane: a clear film; what little it shows is reflection, so a
  // low, faintly smoky albedo — the material adds the specular sheen)
  vec3 mem = vec3(0.3, 0.31, 0.3);
  float memA = 0.06;
  vec3 vc = vec3(0.035, 0.028, 0.022);
  vec3 pc = vec3(0.4, 0.28, 0.08);
  if (variant < 0.5) {
    // scarlet darter: amber base (hindwing), reddish costa and basal veins
    float amb = (1.0 - smoothstep(hind > 0.5 ? 0.1 : 0.04, hind > 0.5 ? 0.16 : 0.07, a)) * (hind > 0.5 ? 1.0 - smoothstep(0.24, 0.3, w.y) : 1.0);
    mem = mix(mem, vec3(0.85, 0.42, 0.06), amb); memA = mix(memA, 0.6, amb);
    vc = mix(vc, vec3(0.42, 0.07, 0.03), max(smoothstep(0.3, 0.34, w.y), 1.0 - smoothstep(0.1, 0.3, a)));
    pc = vec3(0.45, 0.22, 0.06);
  } else if (variant < 1.5) {
    // emperor: clear, faintly yellow membrane, yellow costa, brown pterostigma
    mem = vec3(0.34, 0.32, 0.25); memA = 0.07;
    vc = mix(vc, vec3(0.45, 0.36, 0.08), smoothstep(0.338, 0.348, w.y));
    pc = vec3(0.42, 0.3, 0.1);
  } else {
    // violet dropwing: large amber-orange base on the hindwing, red veins in front
    float amb = (1.0 - smoothstep(hind > 0.5 ? 0.17 : 0.05, hind > 0.5 ? 0.25 : 0.08, a)) * (hind > 0.5 ? 1.0 - smoothstep(0.28, 0.33, w.y) : 1.0);
    mem = mix(mem, vec3(0.85, 0.35, 0.05), amb); memA = mix(memA, 0.65, amb);
    vc = mix(vc, vec3(0.4, 0.05, 0.08), smoothstep(0.24, 0.33, w.y));
    pc = vec3(0.38, 0.1, 0.05);
  }
  vec3 c = mix(mem, vc, v);
  float al = mix(memA, 0.92, v);
  // pterostigma: filled cell, framed by black veins
  c = mix(c, pc, ptero); al = mix(al, 0.97, ptero);
  c = mix(c, vc * 0.6, ptero * (1.0 - smoothstep(0.003, 0.006, min(abs(a - 0.8), abs(a - 0.885)))));
  return vec4(c, al * inside);
}

// ---------------------------------------------------------------------------
// LEAF cell (fig): ab = (across 0..1, along 0 petiole .. 1 tip); variant 0 fig
// (ovate, drip tip), 1 sycamore fig (broad, cordate base)
vec4 leafCell(vec2 ab, float variant) {
  float px = ${r};
  float x = (ab.x - 0.5) * ${Ar.toFixed(3)};
  float y = ab.y;
  float y0 = variant < 0.5 ? 0.12 : 0.1;
  float t = (y - y0) / (1.0 - y0);
  float tt = clamp(t, 0.0, 1.0);
  float hw;
  if (variant < 0.5) {
    hw = 0.29 * pow(max(sin(PI * pow(max(tt, 1e-4), 0.78)), 1e-4), 0.85);
    hw *= 1.0 - 0.55 * smoothstep(0.8, 1.0, tt);          // acuminate drip tip
  } else {
    hw = 0.335 * pow(max(sin(PI * pow(max(tt, 1e-4), 0.58)), 1e-4), 0.62);
    hw += 0.06 * (1.0 - smoothstep(0.0, 0.1, tt)) * smoothstep(-0.06, 0.02, t); // cordate lobes
  }
  // gently wavy margin
  hw *= 1.0 + 0.025 * sin(tt * 37.0 + variant * 2.0);
  float sdb = abs(x) - hw;
  float ends = max(-t * (1.0 - y0), (t - 1.0) * (1.0 - y0));
  float sd = max(sdb, ends);
  if (variant > 0.5) sd = max(sdb, max((y0 - 0.06 - y), t - 1.0));
  float blade = sat(0.5 - sd / px);
  float pet = (1.0 - smoothstep(0.01, 0.016, abs(x))) * step(0.005, y) * (1.0 - step(y0 + 0.05, y));
  float alpha = max(blade, pet);
  float ax = abs(x);
  float u = ax / max(hw, 0.02);                  // 0 midrib .. 1 margin
  vec2 wq = vec2(nz(ab * 9.0 + variant * 4.0, 2), nz(ab * 9.0 + vec2(7.0, 3.0) + variant * 4.0, 2)); // organic warp
  // insect damage: one or two small ragged holes with a dark scar rim
  vec3 hc = wor(ab * vec2(6.0, 8.0) + variant * 7.0 + 0.35 * wq);
  float hr = 0.035 + 0.02 * fract(hc.z * 13.1);
  float holeCell = step(0.93, hc.z) * step(u, 0.8) * step(0.1, tt);
  float hole = (1.0 - smoothstep(hr - 0.006, hr, hc.x)) * holeCell;
  float scar = (1.0 - smoothstep(hr, hr + 0.03, hc.x)) * holeCell;
  alpha *= 1.0 - hole * blade;
  // ---- venation (Ficus: pale midrib; 6-8 pairs of secondaries leaving it at
  // ~50 deg, sub-opposite, curving up toward the tip and looping into a faint
  // intramarginal vein; a fine reticulate tertiary net between them)
  float Lb = 1.0 - y0;
  float midW = mix(0.017, 0.005, tt);
  float mid = (1.0 - smoothstep(midW * 0.5, midW * 0.5 + px * 1.5, ax)) * step(0.0, t) * step(t, 0.99);
  float N = variant < 0.5 ? 8.0 : 6.0;
  float c1 = variant < 0.5 ? 0.84 : 0.95, c2 = variant < 0.5 ? 2.1 : 1.3;
  float G = c1 * ax + c2 * ax * ax;             // vein offset along the blade (metric)
  float slope = c1 + 2.0 * c2 * ax;
  float spc = Lb / N;
  float vq = (t * Lb - G) / spc + (x < 0.0 ? 0.33 : 0.0) + 0.05 * wq.x;
  float vd = abs(fract(vq) - 0.5) * spc / sqrt(1.0 + slope * slope);
  float vw = mix(0.0055, 0.0025, u);
  float lat = (1.0 - smoothstep(vw * 0.5, vw * 0.5 + px, vd)) * smoothstep(0.01, 0.03, ax) * (1.0 - smoothstep(0.86, 0.93, u)) * step(0.04, vq) * step(t, 0.95);
  if (variant > 0.5) {
    // sycamore fig: a pair of strong basal veins from the petiole junction
    vec2 bq = vec2(ax, t * Lb);
    float bd = abs(bq.y - 0.9 * bq.x - 1.4 * bq.x * bq.x + 0.005) / sqrt(1.0 + pow(0.9 + 2.8 * bq.x, 2.0));
    lat = max(lat, (1.0 - smoothstep(0.003, 0.003 + px, bd)) * (1.0 - smoothstep(0.7, 0.85, u)));
  }
  float im = (1.0 - smoothstep(0.0025, 0.0025 + px, abs(u - 0.9) * hw)) * step(0.06, tt) * step(tt, 0.93) * 0.5;
  vec3 tcl = wor(ab * vec2(26.0, 34.0) + variant * 5.0 + 0.4 * wq);
  float net = (1.0 - smoothstep(0.03, 0.09, tcl.y - tcl.x)) * (1.0 - smoothstep(0.85, 0.95, u));
  float nearVein = max(1.0 - smoothstep(0.0, 0.05, ax - midW * 0.5), (1.0 - smoothstep(0.0, 0.03, vd - vw * 0.5)) * (1.0 - step(0.9, u)));
  // ---- senescence (the instance colour sets the overall hue: this cell is a near-white modulation)
  float n = nz(ab * 7.0 + variant * 3.0, 4);
  vec3 col = vec3(0.86, 0.84, 0.72) * (0.92 + 0.14 * n);
  // residual chlorophyll: greener islands along the veins where it breaks down last
  float isl = smoothstep(0.05, 0.45, nz(ab * vec2(3.2, 3.8) + vec2(11.0, 2.0) + variant, 3));
  col = mix(col, vec3(0.58, 0.8, 0.48), isl * nearVein * 0.7);
  // blotchy browning between the veins
  float blot = smoothstep(0.15, 0.55, nz(ab * 3.3 + vec2(0.7, 0.2) + variant + 0.3 * wq, 3) + 0.2);
  col = mix(col, vec3(0.58, 0.44, 0.3), blot * 0.4 * (1.0 - nearVein * 0.6));
  // necrotic margin + tip: an irregular dry brown band behind a dark front
  // (patchy: only some stretches of the margin, the drip tip more often)
  float patchM = smoothstep(0.05, 0.35, nz(ab * vec2(2.2, 2.8) + vec2(17.0, 5.0) + variant * 9.0, 2) + 0.12);
  float mf = max(u + 0.14 * wq.y + 0.06 * n - 0.2 * (1.0 - patchM), (tt - 0.1) * 1.08 + 0.1 * wq.x);
  float marg = smoothstep(0.86, 0.9, mf);
  col = mix(col, vec3(0.44, 0.3, 0.17), marg * 0.85);
  col = mix(col, vec3(0.22, 0.14, 0.08), (1.0 - smoothstep(0.0, 0.025, abs(mf - 0.875))) * 0.55);
  // leaf-spot fungus: a few irregular spots, brown centre, dark rim, pale halo
  vec3 sw = wor(ab * vec2(5.0, 6.5) + 3.0 + variant + 0.25 * wq);
  float isSpot = step(0.76, sw.z) * step(u, 0.85);
  float sr = 0.1 + 0.12 * fract(sw.z * 7.31);
  float sdn = sw.x * (1.0 + 0.25 * wq.y);
  col = mix(col, col * 1.12 + vec3(0.02, 0.02, -0.04), (1.0 - smoothstep(sr, sr * 1.9, sdn)) * isSpot * 0.6);
  col = mix(col, vec3(0.46, 0.33, 0.2), (1.0 - smoothstep(sr * 0.75, sr, sdn)) * isSpot);
  col = mix(col, vec3(0.2, 0.13, 0.08), (1.0 - smoothstep(0.0, 0.03, abs(sdn - sr * 0.88))) * isSpot * 0.75);
  col = mix(col, vec3(0.28, 0.18, 0.1), scar * 0.8);
  // veins read paler than the blade on the upper side
  col = mix(col, vec3(0.98, 0.96, 0.84), max(max(mid * 0.85, lat * 0.6), max(im, net * 0.16)) * (1.0 - marg * 0.5));
  if (pet > blade) col = vec3(0.55, 0.45, 0.28);
  return vec4(col, alpha);
}

vec4 bake(vec2 uv) {
  vec4 r = vec4(0.0);
  if (uv.y < 0.625) {
    float col = floor(uv.x * 4.0);
    float row = floor(uv.y / 0.3125);
    vec2 l = vec2(fract(uv.x * 4.0), fract(uv.y / 0.3125));
    vec2 ab = (l - ${fr.toFixed(4)}) / ${(1-2*fr).toFixed(4)};
    float cell = row * 4.0 + col;
    if (cell < 5.5) {
      float sp = floor(cell * 0.5 + 0.01);
      float under = mod(cell, 2.0);
      r = butterfly(vec2(ab.x, ab.y * ${Er.toFixed(5)}), sp, under);
    } else {
      r = leafCell(ab, cell - 6.0);
    }
  } else {
    vec2 q = vec2(uv.x * 2.0, (uv.y - 0.625) / 0.125);
    vec2 l = fract(q);
    vec2 ab = (l - ${fr.toFixed(4)}) / ${(1-2*fr).toFixed(4)};
    r = dfWing(ab, floor(q.y), floor(q.x));
    // premultiplied: the mips then average veins + membrane by coverage (the
    // blurred beating wing samples a coarse mip) instead of darkening toward
    // the colour of the empty texels around the wing
    r.rgb *= r.a;
  }
  return r;
}
`}function Kr(e,t,n,r,i=null,a=null){let o=[],s=new D,c=new D,l=new D,u=new D(0,1,0);for(let i=0;i<t.length;i++){let a=t[Math.max(0,i-1)].c,d=t[Math.min(t.length-1,i+1)].c;s.set(d[0]-a[0],d[1]-a[1],d[2]-a[2]).normalize(),c.crossVectors(u,s),c.lengthSq()<1e-10&&c.set(1,0,0),c.normalize(),l.crossVectors(s,c).normalize();let f=t[i];o.push(e.pos.length/3);for(let t=0;t<n;t++){let a=t/n*N,o=Math.cos(a),s=Math.sin(a);r&&r(i,t,o,s);let u=o*f.rx,d=s*f.ry;e.vertex(f.c[0]+c.x*u+l.x*d,f.c[1]+c.y*u+l.y*d,f.c[2]+c.z*u+l.z*d)}}for(let r=0;r<t.length-1;r++)for(let t=0;t<n;t++){let i=(t+1)%n;e.quad(o[r]+t,o[r]+i,o[r+1]+i,o[r+1]+t)}if(i){r&&r(0,0,0,0);let t=e.vertex(i[0],i[1],i[2]);for(let r=0;r<n;r++)e.tri(t,o[0]+(r+1)%n,o[0]+r)}if(a){let i=t.length-1;r&&r(i,0,0,0);let s=e.vertex(a[0],a[1],a[2]);for(let t=0;t<n;t++)e.tri(s,o[i]+t,o[i]+(t+1)%n)}return o}function qr(e,t,n,r,i,a){let o=(t,n,r)=>(a&&a(t,n,r),e.vertex(t,n,r)),s=o(t[0],t[1]+n[1],t[2]),c=[];for(let e=1;e<i;e++){let a=e/i*Math.PI,s=Math.cos(a),l=Math.sin(a),u=[];for(let e=0;e<r;e++){let i=e/r*N;u.push(o(t[0]+Math.cos(i)*l*n[0],t[1]+s*n[1],t[2]+Math.sin(i)*l*n[2]))}c.push(u)}let l=o(t[0],t[1]-n[1],t[2]),u=c.length-1;for(let t=0;t<r;t++){let n=(t+1)%r;e.tri(s,c[0][n],c[0][t]),e.tri(l,c[u][t],c[u][n])}for(let t=0;t<u;t++)for(let n=0;n<r;n++){let i=(n+1)%r;e.quad(c[t][n],c[t][i],c[t+1][i],c[t+1][n])}}function Jr(e,t,n,r,i,a){let o=[];for(let a=0;a<=t;a++)for(let s=0;s<=n;s++){let c=a/t,l=s/n,u=r(c,l),d=i(c,l);o.push(e.vertex(u[0],u[1],u[2],d[0],d[1]))}let s=n+1;for(let r=0;r<t;r++)for(let t=0;t<n;t++){let n=o[r*s+t],i=o[(r+1)*s+t],c=o[(r+1)*s+t+1],l=o[r*s+t+1];a?e.quad(n,l,c,i):e.quad(n,i,c,l)}}var Yr=[.05,.105,.11,.112,.112,.108,.103,.09,.068,.052],Xr=[[0,.0013,.0014],[.06,.00148,.00148],[.13,.0016,.00138],[.24,.00185,.0013],[.36,.00212,.00124],[.5,.00222,.0012],[.64,.00212,.00115],[.77,.00182,.0011],[.87,.00145,.00102],[.94,.00115,95e-5],[1,9e-4,8e-4]];function Zr(e){for(let t=1;t<Xr.length;t++)if(e<=Xr[t][0]){let n=Xr[t-1],r=Xr[t],i=(e-n[0])/(r[0]-n[0]);return[F(n[1],r[1],i),F(n[2],r[2],i)]}return[Xr[Xr.length-1][1],Xr[Xr.length-1][2]]}var Qr=-.0042,$r=-.0305,ei=e=>2e-4-6e-4*e;function ti(){let e=new B({aPart:1,aAux:3});e.color=[1,1,1];let t=[.999,.999];e.uvFn=()=>t;{let t=Yr.reduce((e,t)=>e+t,0),n=[0];for(let e of Yr)n.push(n[n.length-1]+e/t);let r=[],i=[];for(let e=0;e<10;e++)for(let t of[0,.5]){let a=F(n[e],n[e+1],t),[o,s]=Zr(a),c=t===0&&e>0?.94:1;r.push({c:[0,ei(a),F(Qr,$r,a)],rx:o*c,ry:s*c}),i.push([a,e+t])}let[a,o]=Zr(1);r.push({c:[0,ei(1),$r],rx:a*.9,ry:o*.9}),i.push([1,10]),e.set(`aPart`,3),Kr(e,r,10,(t,n,r,a)=>e.set(`aAux`,i[t][0],a,i[t][1]),[0,ei(0),-.0036],[0,ei(1),-.0309])}e.set(`aPart`,7);for(let t of[-1,1])e.set(`aAux`,1.02,0,0),Kr(e,[{c:[t*32e-5,ei(1)+1e-4,-.030699999999999998],rx:22e-5,ry:22e-5},{c:[t*55e-5,ei(1)+22e-5,-.0322],rx:1e-4,ry:1e-4}],4,null,null,[t*6e-4,ei(1)+24e-5,-.0326]);e.set(`aAux`,1.02,0,0),Kr(e,[{c:[0,ei(1)-3e-4,-.030699999999999998],rx:2e-4,ry:15e-5},{c:[0,ei(1)-2e-4,-.0317],rx:1e-4,ry:8e-5}],4,null,null,[0,ei(1)-1e-4,-.032]);{let t=[[-.0048,.0012,.0014],[-.0036,.0022,.0026],[-.0016,.0027,.0032],[5e-4,.0028,.0033],[.0025,.0026,.003],[.0038,.002,.0022],[.0046,.0012,.0013]],n=t.map(([e,t,n])=>({c:[0,0,e],rx:t,ry:n}));e.set(`aPart`,2);let r=e.pos.length/3;Kr(e,n,10,(n,r,i,a)=>e.set(`aAux`,n/(t.length-1),a,i),[0,0,-.0052],[0,0,.0049]);let i=e.pos.length/3;for(let t=r;t<i;t++)e.pos[t*3+2]-=.32*e.pos[t*3+1]}e.set(`aPart`,1);for(let t of[-1,1]){let n=[t*.00128,8e-4,.0066],r=[.00232,.0022,.00182];qr(e,n,r,12,8,(t,i)=>e.set(`aAux`,1,(i-n[1])/r[1],0))}qr(e,[0,-7e-4,.0077],[.0019,.0015,.0012],10,6,(t,n)=>e.set(`aAux`,0,(n+7e-4)/.0015,0)),qr(e,[0,-.0017,.0073],[.0012,8e-4,8e-4],8,4,()=>e.set(`aAux`,0,-1,0)),e.set(`aPart`,4);{let t=[0,-.0068,.0014];[[.0032,.0022],[.0016,6e-4],[0,-.0018]].forEach(([n,r],i)=>{for(let a of[-1,1]){let o=[a*8e-4,-.0026,n],s=[a*(.0024+4e-4*i),-.0035,n+r],c=[t[0]+a*4e-4,t[1],t[2]+r*.3];e.set(`aAux`,i,n,0),Kr(e,[{c:o,rx:24e-5,ry:24e-5},{c:s,rx:2e-4,ry:2e-4},{c,rx:13e-5,ry:13e-5}],3,null,null,[c[0]+a*2e-4,c[1]-3e-4,c[2]+3e-4])}})}for(let t of[0,1]){let n=t?-.0022:.0016,r=t?.6:.71;e.set(`aPart`,t?6:5);for(let i=0;i<3;i++){e.set(`aAux`,i,0,0);for(let i of[-1,1])Jr(e,5,2,(e,t)=>[i*(.001+e*Dr),.0028+25e-5*Math.sin(Math.PI*t)*(1-e),n+(t-r)*Or],(e,n)=>Sr(t*br,yr,br,xr,e,n),i>0)}}e.set(`aPart`,10);{let t=[[-.002,.0011,.0012],[-.004,.0013,.0014],[-.0075,.00125,.0013],[-.011,.001,.00105],[-.0135,7e-4,75e-5]];Kr(e,t.map(([e,t,n],r)=>({c:[0,-3e-4-8e-5*r*r,e],rx:t,ry:n})),8,(n,r,i,a)=>e.set(`aAux`,0,a,n/(t.length-1)),null,[0,-.0017,-.0148]),qr(e,[0,2e-4,.0012],[.0019,.002,.0033],10,7,(t,n)=>e.set(`aAux`,1,(n-2e-4)/.002,0)),qr(e,[0,1e-4,.0049],[.0013,.0012,.001],8,5,(t,n)=>e.set(`aAux`,2,(n-1e-4)/.0012,0));for(let t of[-1,1])qr(e,[t*98e-5,2e-4,.0051],[8e-4,9e-4,8e-4],8,6,()=>e.set(`aAux`,3,0,0));qr(e,[0,-5e-4,.0061],[4e-4,6e-4,8e-4],6,4,()=>e.set(`aAux`,4,-.5,0))}e.set(`aPart`,11);for(let t of[-1,1]){let n=[t*5e-4,.001,.0056],r=[t*.33,.47,.82],i=.0112,a=[];for(let e=0;e<=7;e++){let t=e/7,o=t<.8?11e-5:11e-5+24e-5*Math.sin(Math.PI*Math.min(1,(t-.8)/.2)*.75);a.push({c:[n[0]+r[0]*i*t,n[1]+r[1]*i*t-6e-4*t*t,n[2]+r[2]*i*t],rx:o,ry:o})}Kr(e,a,4,t=>e.set(`aAux`,t/7,0,0),null,[n[0]+r[0]*i*1.03,n[1]+r[1]*i*1.03-6e-4,n[2]+r[2]*i*1.03])}e.set(`aPart`,12);for(let[t,n,r,i]of[[.0025,.004,.0028,-.0022],[.0012,.0025,.0036,-.0045],[-2e-4,-.0028,.0038,-.0045]])for(let a of[-1,1]){e.set(`aAux`,0,0,0);let o=[a*7e-4,-.0015,t],s=[r*.62*a,-.0013,t+n*.5],c=[a*r,i,t+n];Kr(e,[{c:o,rx:16e-5,ry:16e-5},{c:s,rx:13e-5,ry:13e-5},{c,rx:8e-5,ry:8e-5}],3,null)}e.set(`aPart`,13),e.set(`aAux`,0,0,0);for(let t of[-1,1])Jr(e,6,6,(e,n)=>[t*(9e-4+e*Cr),.0011+6e-4*e*e,F(wr,Tr,n)],(e,t)=>Sr(pr[0][0],pr[0][1],mr,hr,e,t),t>0);e.set(`aPart`,20),e.set(`aAux`,0,0,0),Jr(e,6,8,(e,t)=>{let n=(e-.5)*Ar,r=t-.5,i=n/(Ar*.5);return[n,.05*i*i-2*r*.06*(2*r)+.012*Math.abs(i),r]},(e,t)=>Sr(gr[0],gr[1],_r,vr,e,t),!0),e.set(`aPart`,30);{let t=[-.04,.22,.235,.245,.48,.495,.505,.72,.735,.745,.9,.985];Kr(e,t.map(e=>{let t=[.235,.495,.735].some(t=>Math.abs(t-e)<.002)?1.18:1,n=F(.0048,.0021,Math.max(0,e))*t;return{c:[0,e,0],rx:n,ry:n}}),6,(n,r)=>e.set(`aAux`,Math.max(0,t[n]),+!![2,5,8].includes(n),r/6),null,[.0016,1,4e-4])}return e.colorFn=null,e.build()}var ni=`
attribute float aPart;
attribute vec3 aAux;
attribute vec4 aAnim;
attribute vec4 aAnim2;
varying float vCritPart;
varying float vCritSp;
varying vec3 vCritAux;
varying float vCritX;
`,ri=`
float kind = floor(aPart * 0.1 + 0.01);
vCritPart = aPart; vCritSp = aAnim.y; vCritAux = aAux; vCritX = 0.0;
if (abs(kind - aAnim.x) > 0.5) {
  ambPos = vec3(0.0);
} else if (kind < 0.5) {
  // ---------------- dragonfly ----------------
  float sp = aAnim.y;
  bool emp = sp > 0.5 && sp < 1.5;
  bool dw = sp > 1.5 && sp < 2.5;
  if ((aPart > 2.5 && aPart < 3.5) || aPart > 6.5) {
    // species abdomen shape: emperor long + slender with a swollen S2, dropwing slimmer
    float s = aAux.x;
    float yc = 0.0002 - 0.0006 * min(s, 1.0);
    float wx = 1.0, wy = 1.0, lz = 1.0;
    if (emp) { float sw = exp(-((s - 0.1) * (s - 0.1)) / 0.004); wx = mix(0.6, 0.95, sw); wy = mix(1.05, 1.3, sw); lz = 1.14; }
    else if (dw) { wx = 0.84; wy = 0.92; }
    ambPos.x *= wx; ambPos.y = yc + (ambPos.y - yc) * wy;
    ambPos.z = -0.0042 + (ambPos.z + 0.0042) * lz;
    objectNormal = normalize(vec3(objectNormal.x / wx, objectNormal.y / wy, objectNormal.z / lz));
  } else if (aPart > 4.5 && aPart < 6.5) {
    bool hind = aPart > 5.5;
    float side = ambPos.x < 0.0 ? -1.0 : 1.0;
    vec3 root = vec3(side * 0.001, 0.0028, hind ? -0.0022 : 0.0016);
    float g = aAux.x;
    float mode = aAnim.w;
    float th = 0.0, pit = 0.0, swp = 0.0;
    bool keep = true;
    if (mode < 0.5) {
      // perched: spread flat, forewings angled a little forward and hindwings
      // a little back so the pairs separate (dropwing: drooped, swept forward)
      keep = g < 0.5;
      th = dw ? -0.36 : -0.05;
      swp = dw ? (hind ? 0.14 : 0.24) : (hind ? -0.07 : 0.11);
    } else if (mode < 1.5) {
      // flapping: three ghosts spread over the stroke. Stroke ~76 deg peak to
      // peak in the hover (aAnim2.x 0.95), ~56-60 deg in forward flight; the
      // stroke plane is inclined to the body, so the wing sweeps forward on
      // the downstroke and back on the upstroke, and it pronates on the
      // downstroke / supinates on the upstroke
      float ph = aAnim.z + g * 2.0944 + (hind ? aAnim2.y : 0.0);
      float sn = sin(ph);
      th = 0.1 + 0.7 * aAnim2.x * sn;
      swp = (hind ? -0.05 : 0.07) - 0.3 * aAnim2.x * sn;
      pit = 0.55 * cos(ph);
      vCritX = 1.0;
    } else {
      keep = g < 0.5;
      th = 0.07 + 0.03 * sin(aAnim.z);
    }
    if (!keep) {
      ambPos = vec3(0.0);
    } else {
      vec3 q = ambPos - root;
      vec3 nq = objectNormal;
      q = ambRotX(q, -pit); nq = ambRotX(nq, -pit);
      q = ambRotY(q, -swp * side); nq = ambRotY(nq, -swp * side);
      q = ambRotZ(q, th * side); nq = ambRotZ(nq, th * side);
      ambPos = root + q; objectNormal = nq;
    }
  } else if (aPart > 3.5 && aPart < 4.5) {
    // legs fold forward under the thorax in flight (aAnim2.z = tuck)
    float tk = aAnim2.z;
    vec3 att = vec3(sign(ambPos.x) * 0.0008, -0.0026, aAux.y);
    vec3 q = ambPos - att;
    q = ambRotX(q, -1.25 * tk);
    q.x *= 1.0 - 0.55 * tk;
    ambPos = att + q * (1.0 - 0.3 * tk);
  }
} else if (kind < 1.5) {
  // ---------------- butterfly ----------------
  if (aPart > 12.5 && aPart < 13.5) {
    float side = ambPos.x < 0.0 ? -1.0 : 1.0;
    vec3 root = vec3(side * 0.0009, 0.0011, 0.0005);
    vec3 q = ambPos - root;
    float sp = clamp(abs(q.x) / 0.03, 0.0, 1.0);
    float th = aAnim.z + aAnim.w * sp * sp;
    q = ambRotZ(q, th * side);
    ambPos = root + q;
    objectNormal = ambRotZ(objectNormal, th * side);
  } else if (aPart > 10.5 && aPart < 11.5) {
    // antennae: a slow wave of the pair
    ambPos = ambRotX(ambPos - vec3(0.0, 0.001, 0.0056), -0.08 * aAnim2.x) + vec3(0.0, 0.001, 0.0056);
  }
} else if (kind < 2.5) {
  // ---------------- leaf: dry leaves curl (edges roll up, tip curls) ----------------
  float c = aAnim.z;
  float xn = ambPos.x / 0.36;
  float zn = max(ambPos.z / 0.5, 0.0);
  ambPos.y += c * (0.18 * xn * xn + 0.12 * zn * zn * zn);
  ambPos.x *= 1.0 - 0.12 * c * xn * xn;
  objectNormal = normalize(objectNormal + vec3(-c * xn, 0.0, -0.72 * c * zn * zn));
} else {
  // ---------------- stalk ----------------
  vCritX = aAnim.z;
}
`,ii=`
#ifdef USE_MAP
if (aPart > 4.5 && aPart < 6.5) {
  float wv = (aAnim.y > 0.5 && aAnim.y < 1.5) ? 1.0 : ((aAnim.y > 1.5 && aAnim.y < 2.5) ? 2.0 : 0.0);
  vMapUv.y += wv * ${xr.toFixed(4)};
} else if (aPart > 12.5 && aPart < 13.5) {
  vMapUv += aAnim.y < 0.5 ? vec2(0.0) : (aAnim.y < 1.5 ? vec2(${pr[1][0].toFixed(4)}, ${pr[1][1].toFixed(4)}) : vec2(${pr[2][0].toFixed(4)}, ${pr[2][1].toFixed(4)}));
} else if (aPart > 19.5 && aPart < 20.5) {
  vMapUv.x += aAnim.y > 0.5 ? ${_r.toFixed(4)} : 0.0;
}
#endif
`,ai=`
varying float vCritPart;
varying float vCritSp;
varying vec3 vCritAux;
varying float vCritX;
float crHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
// atlas tap with the filter footprint (scaled by sc) clamped to CR_MAXRHO texels:
// far critters must not reach the coarse mips where the atlas cells bleed together
vec4 crTex(sampler2D m, vec2 uv, vec2 dx, vec2 dy, float sc) {
  dx *= sc; dy *= sc;
  float rho = max(length(dx), length(dy)) * CR_ATLAS;
  if (rho > CR_MAXRHO) { float k = CR_MAXRHO / rho; dx *= k; dy *= k; }
  return textureGrad(m, uv, dx, dy);
}

// dragonfly body colour (linear): part, species, aux
vec3 dfBody(float part, float sp, vec3 a) {
  vec3 abd, abdLow, thx, eyeTop, eyeLow, face, leg;
  if (sp < 0.5) {        // scarlet darter male
    abd = vec3(0.5, 0.03, 0.016); abdLow = vec3(0.24, 0.022, 0.012); thx = vec3(0.3, 0.05, 0.022);
    eyeTop = vec3(0.34, 0.03, 0.025); eyeLow = vec3(0.19, 0.12, 0.12); face = vec3(0.42, 0.07, 0.03); leg = vec3(0.03, 0.02, 0.014);
  } else if (sp < 1.5) { // emperor male
    abd = vec3(0.06, 0.28, 0.6); abdLow = vec3(0.025, 0.08, 0.17); thx = vec3(0.18, 0.4, 0.05);
    eyeTop = vec3(0.035, 0.2, 0.28); eyeLow = vec3(0.12, 0.28, 0.26); face = vec3(0.34, 0.42, 0.08); leg = vec3(0.02, 0.018, 0.015);
  } else if (sp < 2.5) { // violet dropwing male (pruinose)
    abd = vec3(0.38, 0.05, 0.24); abdLow = vec3(0.18, 0.03, 0.11); thx = vec3(0.22, 0.045, 0.13);
    eyeTop = vec3(0.3, 0.03, 0.07); eyeLow = vec3(0.17, 0.11, 0.15); face = vec3(0.32, 0.05, 0.1); leg = vec3(0.025, 0.018, 0.016);
  } else {               // scarlet darter female / immature
    abd = vec3(0.4, 0.23, 0.055); abdLow = vec3(0.3, 0.2, 0.09); thx = vec3(0.3, 0.19, 0.07);
    eyeTop = vec3(0.2, 0.1, 0.045); eyeLow = vec3(0.2, 0.22, 0.24); face = vec3(0.4, 0.3, 0.12); leg = vec3(0.04, 0.03, 0.02);
  }
  vec3 c = abd;
  if (part < 1.5) {
    c = a.x > 0.5 ? mix(eyeLow, eyeTop, smoothstep(-0.35, 0.45, a.y)) : face;
  } else if (part < 2.5) {
    c = thx * (0.8 + 0.3 * smoothstep(-0.8, 0.7, a.y));
    if (sp > 2.5) c = mix(c, vec3(0.55, 0.45, 0.22), (1.0 - smoothstep(0.08, 0.16, abs(a.z))) * smoothstep(0.6, 0.85, a.y));
    if (sp > 0.5 && sp < 1.5) c = mix(c, vec3(0.05, 0.06, 0.02), (1.0 - smoothstep(0.02, 0.05, abs(abs(a.z) - 0.55))) * 0.7);
  } else if (part < 3.5 || part > 6.5) {
    float s = a.x, d = a.y, sc = a.z;
    float fj = fract(sc);
    float joint = 1.0 - smoothstep(0.0, 0.035, min(fj, 1.0 - fj));
    c = mix(abdLow, abd, smoothstep(-0.7, 0.15, d));
    if (sp < 0.5 || sp > 2.5) {
      c = mix(c, vec3(0.03, 0.01, 0.008), smoothstep(0.955, 0.99, d) * 0.8);
      if (sp > 2.5) c = mix(c, vec3(0.03, 0.02, 0.01), (1.0 - smoothstep(0.06, 0.16, abs(abs(d) - 0.1))) * smoothstep(0.5, 0.65, s));
    } else if (sp < 1.5) {
      float dth = mix(0.8, 0.42, fj * fj) - (s > 0.72 ? 0.18 : 0.0);
      float blk = smoothstep(dth - 0.05, dth + 0.05, d);
      c = mix(c, vec3(0.012, 0.012, 0.014), blk);
      c = mix(c, vec3(0.1, 0.36, 0.2), (1.0 - smoothstep(0.07, 0.13, s)) * (1.0 - blk));
    } else {
      c = mix(c, vec3(0.02, 0.015, 0.015), smoothstep(0.5, 0.75, d) * smoothstep(0.64, 0.7, s) * (1.0 - smoothstep(0.92, 0.97, s)));
    }
    c *= 1.0 - 0.55 * joint;
    if (part > 6.5) c = (sp < 0.5 || sp > 2.5) ? abd * 0.45 : vec3(0.02);
  } else {
    c = leg;
  }
  return c;
}

// butterfly body colour: part, species, aux (region, dorsal, axial)
vec3 bfBody(float part, float sp, vec3 a) {
  vec3 body = vec3(0.045, 0.036, 0.024), hair = vec3(0.3, 0.24, 0.14);
  if (sp > 0.5 && sp < 1.5) { body = vec3(0.014, 0.012, 0.01); hair = vec3(0.55, 0.55, 0.5); }
  else if (sp > 1.5) { body = vec3(0.09, 0.09, 0.09); hair = vec3(0.7, 0.7, 0.66); }
  vec3 c = body;
  if (part > 11.5) {
    c = body * 0.9;
  } else if (part > 10.5) {
    // ringed antenna, pale-tipped club
    c = mix(body, hair * 1.3, step(0.5, fract(a.x * 16.0)) * (1.0 - step(0.8, a.x)) * ((sp > 0.5 && sp < 1.5) ? 0.0 : 0.8));
    c = mix(c, vec3(0.6, 0.55, 0.45), step(0.95, a.x));
  } else if (a.x > 2.5 && a.x < 3.5) {
    c = vec3(0.07, 0.05, 0.03);
  } else {
    c = mix(hair, body, smoothstep(-0.7, 0.3, a.y));
    if (a.x > 0.5 && a.x < 1.5) c = mix(c, hair * 0.9, 0.35);   // furry thorax
    if (sp > 0.5 && sp < 1.5) c = mix(c, vec3(0.8), step(0.93, crHash(floor(vec2(a.y * 6.0, a.z * 9.0 + a.x * 3.0)))));
  }
  return c;
}
`+re,oi=`
float crRough = 0.55;
float crTrans = 0.0;
float crSoft = 0.0;
{
  float cp = vCritPart;
  vec3 nV = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  vec3 vV = normalize(vViewPosition);
#ifdef USE_MAP
  vec2 crDx = dFdx(vMapUv), crDy = dFdy(vMapUv);
#endif
  if (cp < 4.5 || (cp > 6.5 && cp < 7.5)) {
    diffuseColor = vec4(dfBody(cp, vCritSp, vCritAux), 1.0);
    crRough = (vCritSp > 1.5 && vCritSp < 2.5) ? 0.55 : 0.34;
    if (cp < 1.5 && vCritAux.x > 0.5) {
      // compound eye: glossy, dark pseudopupil where the ommatidia point at the viewer
      float pp = smoothstep(0.982, 0.998, dot(nV, vV));
      diffuseColor.rgb *= 1.0 - 0.6 * pp;
      crRough = 0.2;
    }
    if (cp > 3.5 && cp < 4.5) crRough = 0.5;
  } else if (cp < 6.5) {
    // dragonfly wing (premultiplied atlas cell). A clear membrane: its MSAA
    // coverage is its true opacity (see CR_ALPHATEST), so only the veins,
    // pterostigma and amber bases read, plus the film's sheen toward grazing.
    // A beating wing (blur ghost, vCritX) is a smear, not a vein pattern: a
    // 5x filter footprint smears veins + membrane into a faint haze.
  #ifdef USE_MAP
    vec4 w = crTex(map, vMapUv, crDx, crDy, vCritX > 0.5 ? 5.0 : 1.0);
    diffuseColor = vec4(w.rgb / max(w.a, 1e-3), w.a * (vCritX > 0.5 ? 0.6 : 1.0));
  #endif
    float fr = 1.0 - abs(dot(nV, vV));
    float f2 = fr * fr; float f4 = f2 * f2;
    diffuseColor.a = min(1.0, diffuseColor.a * (1.0 + 1.5 * f4) + 0.12 * f4 * step(0.004, diffuseColor.a));
    crRough = 0.16; crTrans = 0.45; crSoft = 1.0;
  } else if (cp < 12.5) {
    diffuseColor = vec4(bfBody(cp, vCritSp, vCritAux), 1.0);
    crRough = 0.8;
  } else if (cp < 13.5) {
  #ifdef USE_MAP
    diffuseColor = crTex(map, vMapUv + (gl_FrontFacing ? vec2(0.0) : vec2(${mr.toFixed(4)}, 0.0)), crDx, crDy, 1.0);
  #endif
    crRough = 0.72; crTrans = 0.3;
  } else if (cp < 25.0) {
  #ifdef USE_MAP
    diffuseColor = crTex(map, vMapUv, crDx, crDy, 1.0);
  #endif
    // leaf: paler, matte underside
    if (!gl_FrontFacing) diffuseColor.rgb = mix(diffuseColor.rgb, vec3(dot(diffuseColor.rgb, vec3(0.3, 0.5, 0.2))), 0.25) * 1.1;
    crRough = gl_FrontFacing ? 0.55 : 0.75; crTrans = 0.55;
  } else {
    // dry reed stalk: straw with fibres, darker nodes, wet dark base below the waterline
    float y = vCritAux.x;
    vec3 straw = vec3(0.33, 0.27, 0.165) * (0.88 + 0.24 * crHash(vec2(floor(vCritAux.z * 6.0 + 0.5), floor(y * 40.0))));
    straw *= 0.9 + 0.1 * sin(vCritAux.z * 6.2832 * 7.0);
    straw = mix(straw, vec3(0.16, 0.12, 0.07), vCritAux.y * 0.8);
    straw = mix(straw, vec3(0.42, 0.37, 0.28), smoothstep(0.7, 1.0, y) * 0.4);
    float wet = 1.0 - smoothstep(vCritX, vCritX + 0.06, y);
    diffuseColor = vec4(mix(straw, vec3(0.06, 0.065, 0.035), wet), 1.0);
    crRough = mix(0.72, 0.4, wet);
  }
}
`,si=`
#ifdef USE_ALPHATEST
{
  float crFw = fwidth(diffuseColor.a);
  if (crSoft > 0.5) {
  #ifdef ALPHA_TO_COVERAGE
    diffuseColor.a = clamp(diffuseColor.a, 0.0, 1.0);
    if (diffuseColor.a < 0.02) discard;
  #else
    if (diffuseColor.a < crHash(gl_FragCoord.xy)) discard;
    diffuseColor.a = 1.0;
  #endif
  } else {
  #ifdef ALPHA_TO_COVERAGE
    diffuseColor.a = smoothstep(alphaTest, alphaTest + crFw, diffuseColor.a);
    if (diffuseColor.a == 0.0) discard;
  #else
    if (diffuseColor.a < alphaTest) discard;
  #endif
  }
}
#endif
`;function ci(e,t,n=!1){let r=e.registry?.get?.(`vegetation`);if(!r)return null;for(let e of t){let t=r[e];if(Array.isArray(t)&&t.length){let e=[];for(let r of t){let t;t=Array.isArray(r)?n?r.length>=3?[r[0],r[1],r[2]]:null:r.length>=3?[r[0],r[2]]:[r[0],r[1]]:n?Number.isFinite(r.y)?[r.x,r.y,r.z]:null:[r.x,r.z],t&&t.every(Number.isFinite)&&e.push(t)}if(e.length)return e}}return null}var li=[5,6];function ui(e){let t=e.registry?.get?.(`vegetation`)?.root;if(!t?.traverse)return null;let n=[];try{t.traverse(e=>{if(!e.isMesh||!/^veg-grass-/.test(e.name||``))return;let t=e.geometry?.attributes,r=t?.iPos,i=t?.iShape,a=t?.iColor;if(!r||!i||r.itemSize!==4||i.itemSize!==4)return;let o=r.array,s=i.array,c=a?.itemSize===4?a.array:null;for(let e=0;e<r.count;e++){let t=s[e*4+3];if(Math.abs(t-li[0])>.1&&Math.abs(t-li[1])>.1)continue;let r=s[e*4+1];r>.15&&r<1&&n.push({x:o[e*4],y:o[e*4+1],z:o[e*4+2],h:r,cut:c?c[e*4+3]:1e9})}})}catch{return null}return n.length?n:null}function di(e,t,n,r,i,a,o){let s=null;for(let c=0;c<=n&&!s;c+=r){let n=Math.max(1,Math.round(N*c/r));for(let r=0;r<n;r++){let l=r/n*N+c*.37,u=e+Math.cos(l)*c,d=t+Math.sin(l)*c;if(i(u,d)&&!a.some(e=>(e[0]-u)**2+(e[1]-d)**2<o*o)){s=[u,d];break}}}return s&&a.push(s),s}var fi=(e,t)=>{let n=t-e;return n-=N*Math.round(n/N),n},pi=(e,t,n)=>e+fi(e,t)*n,mi=e=>e<.5?2*e*e:1-2*(1-e)*(1-e);async function hi(e,t,n=777){let i=performance.now(),{layout:a,hf:c,LAYERS:l,quality:u,G:d,camera:p}=e,m=a.VIEWS,h=a.WATER_Y,g=u.rank??[`low`,`medium`,`high`,`ultra`,`cinematic`].indexOf(u.name),_=g<=0,v=e.registry?.get?.(`rocks`)??null,b=(e,t,n=0)=>{try{return!!v?.isRock?.(e,t,n)}catch{return!1}},S=e.registry?.get?.(`vegetation`)?.cover,C=S?.texture?.image?.data,w=S?.bounds,T=(e,t)=>{if(!C||!w)return 0;let n=Math.floor(e-w[0]),r=Math.floor(t-w[1]);if(n<0||r<0||n>=w[2]||r>=w[3])return 0;let i=(r*w[2]+n)*4;return(C[i]+C[i+1]+C[i+2])/255},E=ci(e,[`reedPoints`,`reeds`,`reedPositions`]),k=ci(e,[`flowerPoints`,`flowers`,`shrubPoints`,`shrubs`]),A=ci(e,[`flowerTips`],!0),j=ui(e),M=[0,0,0],z=.88;function B(e,t,n){let r=d.uTime.value,i=d.uWindDir.value,a=d.uWindStrength.value,o=e.x*.371+e.z*.529,s=e.x*i.x+e.z*i.y,c=-e.x*i.y+e.z*i.x,l=.5+.5*Math.sin(r*.55-s*.07)*Math.sin(r*.23-s*.021+1.3),u=1.6*Math.sin(c*.21+.7)+1.1*Math.sin(c*.067-s*.05+2.1),f=.5+.5*Math.sin(s*.9-r*2.4+u);f*=f;let p=(.25+.8*l+.75*f*(.35+l)+.12*Math.sin(r*1.8+o))*a*t*t*e.h*.55,m=.035*t*e.h*(.4+a),h=i.x*p+Math.sin(r*3.3+o*3.1)*m,g=i.y*p+Math.cos(r*2.9+o*2.3)*m;return n[0]=h,n[2]=g,n[1]=-(h*h+g*g)*.5/Math.max(e.h,.1),n}let V=[[a.PLAYER.spawn.x+6,a.PLAYER.spawn.z-3],[m.shallows.pos[0],m.shallows.pos[2]],[m.originBase.pos[0]+3,m.originBase.pos[2]+4],[a.GATHERINGS[0].x,a.GATHERINGS[0].z-8],[m.drifter.pos[0]-4,m.drifter.pos[2]-3],[a.WATERFALLS[0].pool[0]+6,a.WATERFALLS[0].pool[2]+4],[a.WATERFALLS[1].pool[0]-5,a.WATERFALLS[1].pool[2]+3],[m.lounge.pos[0]-4,m.lounge.pos[2]]],re=(e,n)=>{let r=t.depth(e,n);return r>.04&&r<.34&&!b(e,n,.25)&&c.distToPaths(e,n)>1.1},G=[],K=[],q=[],ie=_?[1,1,1,1,0,1,0,1]:[2,2,1,2,1,1,1,1],J=[0,2,3,0,2,0,3,2,0,2,0];V.forEach((e,r)=>{for(let i=0;i<ie[r];i++){let a=[],o=E?E.filter(t=>(t[0]-e[0])**2+(t[1]-e[1])**2<196):[],s=(e,n)=>{let r=null,i=-1;for(let o=.35;o<=1.4;o+=.35)for(let s=0;s<8;s++){let c=s/8*N+o,l=e+Math.cos(c)*o,u=n+Math.sin(c)*o;if(!re(l,u)||K.some(e=>(e.x-l)**2+(e.z-u)**2<.36)||a.some(e=>(e.x-l)**2+(e.z-u)**2<.8*.8))continue;let d=Math.min(t.depth(l,u),.26);d>i&&(i=d,r=[l,u])}return r};for(let c=0;c<14&&a.length<2;c++){let l=null;if(o.length){let e=o[Math.floor(L(r*31+i,c,n)*o.length)];if(a.length&&(e[0]-a[0].x)**2+(e[1]-a[0].z)**2>16)continue;l=s(e[0],e[1])}else{let t=a.length?[a[0].x,a[0].z]:e;l=di(t[0]+R(r,c,n)*2,t[1]+R(r,c+7,n)*2,12,.5,re,q,.9)}if(!l)continue;let u=K.length,d=l[0],f=l[1],p=t.height(d,f),m=h-p+.5+.45*L(u,1,n+3),g=.04+.14*L(u,2,n+3),_=L(u,3,n+3)*N,v=[Math.sin(g)*Math.cos(_),Math.cos(g),Math.sin(g)*Math.sin(_)],y={x:d,z:f,y0:p-.02,H:m,up:v,wl:(h-p+.02)/m,tip:[d+v[0]*m,p-.02+v[1]*m,f+v[2]*m],fwd:_+Math.PI*.5};K.push(y),a.push(y)}if(!a.length)continue;let c=G.length,l=J[c%J.length],u=a.reduce((e,t)=>e+t.x,0)/a.length,d=a.reduce((e,t)=>e+t.z,0)/a.length;G.push({sp:l,percher:!0,perches:a,ax:u,az:d,C:11+7*L(c,1,n),off:40*L(c,2,n),plan:null,planK:-1e9})}});let ae=_?1:g>=3?4:3,oe=[V[1],V[0],V[4],V[2],V[3]],se=e=>{for(let n=0;n<48;n++){let r=n/48*e.period,i=e.ax+e.R*(.62*Math.sin(e.w[0]*r+e.p[0])+.38*Math.sin(e.w[1]*r+e.p[1])),a=e.az+e.R*(.62*Math.cos(e.w[0]*r+e.p[0])+.38*Math.sin(e.w[2]*r+e.p[2]));if(t.depth(i,a)<.12||b(i,a,.8))return!1}return!0};for(let e=0;e<ae;e++){let r=oe[e%oe.length],i=di(r[0],r[1],18,1,(e,n)=>t.depth(e,n)>.45&&!b(e,n,2),q,7);if(!i)continue;let a=G.length,o={sp:1,percher:!1,ax:i[0],az:i[1],R:4.2+1.2*L(a,3,n),w:[0,0,0],p:[L(a,4,n)*N,L(a,5,n)*N,L(a,6,n)*N,L(a,7,n)*N],period:0,h0:.7+.5*L(a,8,n),C:7+3*L(a,9,n),H:.9+.8*L(a,10,n),off:30*L(a,11,n),yaw:0,valid:!0,bvhChecked:!1};for(let e=0;e<5;e++){let t=(1.7+.6*L(a,12,n))/(o.R*1.25);if(o.w=[t,2*t,t],o.period=N/t,se(o))break;o.R*=.75,e===4&&(o.valid=!1)}o.valid&&G.push(o)}let ce=[],le=(e,n)=>{let r=t.height(e,n),i=c.waterSDF(e,n);return r>.35&&r<4&&i>1.2&&i<16&&c.distToPaths(e,n)>.8&&!b(e,n,.3)},ue=[];for(let e of a.ISLANDS.slice(0,4))ue.push([e.x+e.r*.55,e.z+e.r*.3]);ue.push([a.PLAYER.spawn.x+2,a.PLAYER.spawn.z-1],[a.PLAYER.spawn.x+9,a.PLAYER.spawn.z+3]);for(let e of a.GATHERINGS)ue.push([e.x,e.z]);let de=a.EXTRA_TREES.find(e=>e.id===`spawnTree`);de&&ue.push([de.x+3,de.z]),ue.push([m.lounge.pos[0]-3,m.lounge.pos[2]+3]);let fe=[];ue.forEach((e,r)=>{let i=_?1:r<4?2:1+r%2;for(let a=0;a<i;a++){let i=null;if(k){let t=k.filter(t=>(t[0]-e[0])**2+(t[1]-e[1])**2<200&&!ce.some(e=>(e[0]-t[0])**2+(e[1]-t[1])**2<16));t.length&&(i=t[Math.floor(L(r,a,n+1)*t.length)],ce.push(i))}if(i||=di(e[0],e[1],12,.8,le,ce,4),!i)continue;let o=fe.length,s=L(o,9,n),l=s<.55?0:s<.78?1:2,u=[],d=A?A.filter(e=>(e[0]-i[0])**2+(e[2]-i[1])**2<49):[],f=!d.length&&j?j.filter(e=>(e.x-i[0])**2+(e.z-i[1])**2<49&&e.cut>30&&e.y+e.h*.7>h+.05&&c.distToPaths(e.x,e.z)>.5):[];for(let e=0;e<4;e++){if(d.length&&L(o,20+e,n)<.7){let t=d[Math.floor(L(o,30+e,n)*d.length)];u.push({x:t[0],z:t[2],y:t[1],flower:!0,ready:!0});continue}if(f.length&&L(o,20+e,n)<.7){let t=f[Math.floor(L(o,30+e,n)*f.length)];u.push({x:t.x,z:t.z,y:t.y+t.h*z,flower:!0,ready:!0,tuft:t});continue}let r=null,a=1e9;for(let s=0;s<16;s++){let l=.8+3.6*L(o*7+e,s,n+40),u=L(o*7+e,s,n+41)*N,d=i[0]+Math.cos(u)*l,f=i[1]+Math.sin(u)*l,p=t.height(d,f);if(p<.1||p>5||c.waterSDF(d,f)<.4||c.distToPaths(d,f)<.6)continue;let m=T(d,f)+.05*l;m<a&&(a=m,r={x:d,z:f,y:c.groundHeight(d,f),flower:!1,ready:!1})}u.push(r??{x:i[0],z:i[1],y:c.groundHeight(i[0],i[1]),flower:!1,ready:!1})}fe.push({sp:l,ax:i[0],az:i[1],spots:u,C:11+7*L(o,1,n),off:50*L(o,2,n),plan:null,planK:-1e9})}});let pe=a.HERO_TREES,me=_?14:g>=3?34:26,he=pe.reduce((e,t)=>e+t.crown,0),ge=[];for(let e=0;e<me;e++){let t=L(e,0,n+5)*he,r=0;for(;r<pe.length-1&&t>pe[r].crown;)t-=pe[r].crown,r++;ge.push({tree:pe[r],period:50+30*L(e,1,n+5),off:L(e,2,n+5)*80,hold:0,k:-1e9,bvh:!1})}let _e=G.length,ve=fe.length,ye=ge.length,Y=K.length,be=_e+ve+ye+Y,xe=ti(),X=new Float32Array(be*4),Se=new Float32Array(be*4),Ce=W(X,4),we=W(Se,4);xe.setAttribute(`aAnim`,Ce),xe.setAttribute(`aAnim2`,we);let Te=new Float32Array(be*3).fill(1),Ee=[[.62,.44,.05],[.56,.33,.045],[.66,.52,.1],[.3,.13,.04],[.24,.14,.055],[.36,.22,.07],[.2,.22,.05],[.1,.15,.035]],De=[.15,.2,.1,.55,.8,.5,.2,.05];for(let e=0;e<be;e++){let t=e*4;if(e<_e)X[t]=0,X[t+1]=G[e].sp;else if(e<_e+ve)X[t]=1,X[t+1]=fe[e-_e].sp;else if(e<_e+ve+ye){let r=e-_e-ve,i=Math.floor(L(r,3,n)*Ee.length),a=Ee[i],o=.85+.3*L(r,4,n);Te[e*3]=a[0]*o,Te[e*3+1]=a[1]*o,Te[e*3+2]=a[2]*o,X[t]=2,X[t+1]=L(r,5,n)<.55?0:1,X[t+2]=P(De[i]+.2*R(r,6,n),0,1),ge[r].curl=X[t+2]}else{let n=K[e-_e-ve-ye];X[t]=3,X[t+2]=n.wl}}let Oe=g>=3?2048:g>=1?1024:512,ke=e.tex.bake(Gr(Oe),{width:Oe,height:Oe,srgb:!0,anisotropy:g>=3?16:8,name:`ambient.critterAtlas`,wrap:f}),Ae=2**Math.max(2,Math.log2(Oe)-5),je=u.msaa>0,Me=ne(e,`critters2`,{map:ke,vertexColors:!0,roughness:.55,metalness:0,side:2,alphaToCoverage:je,alphaTest:je?.02:.4,envMapIntensity:.85},{vertexPars:ni+U,uv:ii,color:`#ifdef USE_INSTANCING_COLOR
vColor.rgb = color.rgb * ((aPart > 19.5 && aPart < 20.5) ? instanceColor.rgb : vec3(1.0));
#endif`,deform:ri,fragmentPars:`#define CR_ATLAS ${Oe.toFixed(1)}\n#define CR_MAXRHO ${Ae.toFixed(1)}\n`+ai,afterMap:oi,alphaTest:si,afterRoughness:`roughnessFactor = crRough;`,beforeOutput:`outgoingLight += diffuseColor.rgb * uSunColor * uSunIntensity * crTrans * ambBacklight(normal) * 0.32;`}),Ne=new O(xe,Me,be);Ne.name=`ambient-critters`,Ne.instanceMatrix.setUsage(r),Ne.instanceColor=new y(Te,3),Ne.frustumCulled=!1,Ne.castShadow=!1,Ne.receiveShadow=!0,Ne.layers.set(l.OPAQUE),e.scene.add(Ne);let Pe=Ne.instanceMatrix.array,Fe=_e,Ie=_e+ve,Le=_e+ve+ye;function Re(){for(let e=0;e<Y;e++){let t=K[e],n=Math.cos(t.fwd),r=Math.sin(t.fwd),i=n*t.up[0]+r*t.up[2];te(Pe,Le+e,t.x,t.y0,t.z,n-i*t.up[0],-i*t.up[1],r-i*t.up[2],t.up[0],t.up[1],t.up[2],1,t.H,1)}}let ze=new s(new D,new D(0,-1,0));function Be(t,n,r,i){let a=c.groundHeight(t,n),o=!1,s=!1;a<h&&(a=h,o=!0);try{let e=v?.raycastDown?.(t,n);Number.isFinite(e)&&e>a+.005&&e<r&&(a=e,o=!1)}catch{}let l=i?e.collision?.bvh:null;if(l){ze.origin.set(t,r,n);try{let e=l.raycastFirst(ze,2);e&&e.point.y>a+.02&&(a=e.point.y,o=!1,s=!0)}catch{}}return{y:a,water:o,deck:s}}let Ve=[0,1,0],He=[0,0,0];function Ue(e,t,n,r,i,a,o,s){let c=Math.cos(a),l=Math.sin(i)*c,u=Math.sin(a),d=Math.cos(i)*c,f=Math.hypot(d,l)||1,p=d/f,m=-l/f,h=u*m,g=d*p-l*m,_=-u*p,v=Math.cos(o),y=Math.sin(o);te(Pe,e,t,n,r,l,u,d,h*v+p*y,g*v,_*v+m*y,s)}let Z=[0,0,0];function We(e,r,i,a){let o=e.ax,s=e.az,c=-1e9;for(let a=0;a<6;a++){let l=.6+2.4*Math.sqrt(L(r*7+a,i,n+60+e.idx)),u=L(r*7+a,i,n+61+e.idx)*N,d=e.ax+Math.cos(u)*l,f=e.az+Math.sin(u)*l,p=t.depth(d,f),m=Math.min(p,.5)*2-T(d,f)*1.5-(b(d,f,.3)?2:0)-.1*l;if(m>c&&(c=m,o=d,s=f),p>.3&&T(d,f)<.1)break}let l=Math.max(t.height(o,s),h);return a[0]=o,a[2]=s,a[1]=l+.25+.95*L(r,i,n+62+e.idx),a}let Ge=(e,t)=>e.perches.length>1?Math.floor(L(t,3,n+70+e.idx)*e.perches.length):0;function Ke(e,t){let r=e.perches[Ge(e,t)],i=2+ +(L(t-1,4,n+71+e.idx)<.4);return We(e,t-1,i-1,Z),Math.atan2(r.tip[0]-Z[0],r.tip[2]-Z[2])}function qe(e,t){let r=e.segs||=[];r.length=0;let i=e.perches[Ge(e,t)],a=e.perches[Ge(e,t+1)],o=2+ +(L(t,4,n+71+e.idx)<.4),s=[];for(let n=0;n<o;n++)s.push(We(e,t,n,[0,0,0]));let c=[a.tip[0],a.tip[1]+.05+.0068*jr[e.sp].len,a.tip[2]],l=t=>t.tip[1]+.0068*jr[e.sp].len,u=[],d=[i.tip[0],l(i),i.tip[2]],f=Ke(e,t),p=0,m=e=>{let t=Math.hypot(e[0]-d[0],e[1]-d[1],e[2]-d[2]),n=Math.max(.14,Math.sqrt(t/24)*1.9),r=Math.atan2(e[0]-d[0],e[2]-d[2]),i=u.length===0?f:r;u.push([1,p,p+n,d[0],d[1],d[2],e[0],e[1],e[2],i,r,t]),p+=n,d=e,f=r},h=(e,t)=>{u.push([2,p,p+e,d[0],d[1],d[2],d[0],d[1],d[2],f,t,0]),p+=e};for(let r=0;r<o;r++)m(s[r]),h(.25+1.1*L(t,10+r,n+72+e.idx),f+R(t,20+r,n+73+e.idx)*1.4);m(c),h(.3,f),u.push([3,p,p+.22,c[0],c[1],c[2],a.tip[0],l(a),a.tip[2],f,f,0]),p+=.22;let g=Math.max(2,e.C-p);for(let e of u)e[1]+=g,e[2]+=g,r.push(e);e.tp=g,e.p0=[i.tip[0],l(i),i.tip[2]],e.yaw0=Ke(e,t),e.planK=t,e.cycleLen=g+p}G.forEach((e,t)=>{e.idx=t});function Q(e,t){return e.spots[Math.floor(L(t,1,n+90+e.idx)*e.spots.length)]}function Je(e,t){let r=Q(e,t),i=Q(e,t+1),a=Mr[e.sp],o=P(3.2+Math.hypot(i.x-r.x,i.z-r.z)/a.speed+4*L(t,2,n+91+e.idx),3.5,e.C-2.5);e.tp=e.C-o,e.fly=o,e.S0=r,e.S1=i,e.alt=.8+1*L(t,3,n+92+e.idx),e.wa=[1.1+.9*L(t,4,n+93+e.idx),1.7+1.3*L(t,5,n+93+e.idx),.9+.8*L(t,6,n+93+e.idx)],e.wp=[L(t,7,n+94+e.idx)*N,L(t,8,n+94+e.idx)*N,L(t,9,n+94+e.idx)*N],e.wr=.5+.9*L(t,10,n+95+e.idx),e.bask=+!r.flower,e.yawP=Ye(e,t,r),e.planK=t}function Ye(e,t,r){return r.flower?L(t,14,n+96+e.idx)*N:Math.atan2(-d.uSunDir.value.x,-d.uSunDir.value.z)+R(t,11,n+96+e.idx)*.6}fe.forEach((e,t)=>{e.idx=t,e.s=Mr[e.sp].span*Nr});function Xe(e,n,r){let i=e.S0,a=e.S1,o=ee(n),s=Math.sin(Math.PI*n),c=n*e.fly,l=e.wr*(.6*Math.sin(e.wa[0]*c+e.wp[0])+.4*Math.sin(e.wa[1]*c+e.wp[1])),u=e.wr*(.6*Math.cos(e.wa[0]*c*.9+e.wp[2])+.4*Math.sin(e.wa[2]*c+e.wp[1]));r[0]=F(i.x,a.x,o)+l*s,r[2]=F(i.z,a.z,o)+u*s;let d=Math.max(t.height(r[0],r[2]),h+.15),f=F(i.y,a.y,o)+e.s*.0045,p=e.alt*s+.18*Math.sin(e.wa[2]*c*1.7+e.wp[2])*s;return r[1]=Math.max(f+p,d+.35*I(0,.2,n)*(1-I(.8,1,n))),r}function Ze(t,r,i,a){let o=t.tree,s=o.groundY??0,l=s+o.height,u=L(i,r,n+21)*N,f=o.crown*(.4+.5*Math.sqrt(L(i,r,n+22)));t.sx=o.x+Math.cos(u)*f,t.sz=o.z+Math.sin(u)*f,t.sy=F(Math.max(o.forkY,s+4),l-3,.25+.6*L(i,r,n+23)),t.tumble=L(i,r,n+24)<.22,t.size=.075+.05*L(r,7,n),t.tumble?(t.v=1.25+.4*L(i,r,n+25),t.spinW=N*(2.2+2*L(i,r,n+26))*(L(i,r,n+27)<.5?-1:1),t.drift=.35+.5*L(i,r,n+28)):(t.T=1.1+1*L(i,r,n+25),t.om=N/t.T,t.A=.18+.3*L(i,r,n+26),t.v=.75+.35*L(i,r,n+27),t.kArc=.72+.23*L(i,r,n+28),t.tiltMax=.55+.35*L(i,r,n+34),t.prec=R(i,r,n+29)*.35,t.beta=(L(i,r,n+30)<.5?0:Math.PI*.5)+R(i,r,n+31)*.4),t.psi0=L(i,r,n+32)*N;let p=.15+.5*d.uWindStrength.value;t.wx=d.uWindDir.value.x*p,t.wz=d.uWindDir.value.y*p;let m=Be(t.sx,t.sz,t.sy,a);for(let e=0;e<3;e++)t.D=Math.max(1,(t.sy-m.y)/t.v),Qe(t,t.D,Z),m=Be(Z[0],Z[2],t.sy,a);t.D=Math.max(1,(t.sy-m.y)/t.v),Qe(t,t.D,Z),t.lx=Z[0],t.lz=Z[2],t.ly=m.y,t.water=m.water,t.deck=m.deck,!t.water&&!t.deck?c.normalAt(t.lx,t.lz,.3,Ve):(Ve[0]=0,Ve[1]=1,Ve[2]=0),t.nx=Ve[0],t.ny=Ve[1],t.nz=Ve[2],t.restYaw=t.psi0+L(i,r,n+33)*N,t.k=i,t.bvh=!!(a&&e.collision?.bvh)}function Qe(e,t,n){if(e.tumble){let r=e.psi0+.15*t,i=-Math.sin(r),a=Math.cos(r);n[0]=e.sx+(e.wx+i*e.drift)*t,n[2]=e.sz+(e.wz+a*e.drift)*t,n[1]=e.sy-e.v*t}else{let r=I(0,1.2,t),i=e.A*Math.sin(e.om*t)*r,a=e.psi0+e.prec*t;n[0]=e.sx+e.wx*t+i*Math.cos(a),n[2]=e.sz+e.wz*t+i*Math.sin(a),n[1]=e.sy-e.v*t-e.v*e.kArc*r*Math.sin(2*e.om*t)/(2*e.om)}return n}let $e=null;function et(e,t=90,n=0,r=0){if($e=null,!e)return!1;let[i,a]=String(e).toLowerCase().split(`:`),o={dragonfly:[0,0],darter:[0,0],darterf:[0,3],dropwing:[0,2],emperor:[0,1],butterfly:[1,0],paintedlady:[1,0],tiger:[1,1],orangetip:[1,2],leaf:[2,0],leaf2:[2,1],stalk:[3,0]}[i];if(!o)return!1;let s=o[0]===0?_e?0:-1:o[0]===1?ve?Fe:-1:o[0]===2?ye?Ie:-1:Y?Le:-1;if(s<0)return!1;let c=o[0]===0?.045*jr[o[1]].len:o[0]===1?.06*Mr[o[1]].span:o[0]===2?.11:.6;return $e={kind:o[0],sp:o[1],idx:s,state:a||``,size:c,yaw:t*Math.PI/180,pitch:n*Math.PI/180,dist:r},X[s*4+1]=o[1],o[0]===2&&(X[s*4+2]=a===`rest`?.35:.15,Te[s*3]=.62,Te[s*3+1]=.44,Te[s*3+2]=.05,Ne.instanceColor.needsUpdate=!0),!0}e.params?.get?.(`critterview`)&&et(e.params.get(`critterview`),e.params.num?.(`critteryaw`,90)??90,e.params.num?.(`critterpitch`,0)??0,e.params.num?.(`critterdist`,0)||0);let tt=new o,nt=new x,rt=new D,it=0;function at(t,r){t=Math.min(t,1/20),it++;let i=p.position.x,a=p.position.y,o=p.position.z,s=3600,l=L(it,1,n+5)*N;for(let t=0;t<_e;t++){let c=G[t],u=t*4,d=jr[c.sp];if((c.ax-i)**2+(c.az-o)**2+a*a*.25>s){H(Pe,0+t);continue}let f,p,m,g,_=0,v=0,y=1,b=.9,x=Math.PI,S=1;if(c.percher){let e=r+c.off,i=Math.floor(e/c.C);i!==c.planK&&qe(c,i);let a=e-i*c.C;if(a<c.tp)[f,p,m]=c.p0,g=c.yaw0,y=0,S=0;else{let i=c.segs,o=i[i.length-1];for(let e=0;e<i.length;e++)if(a<i[e][2]){o=i[e];break}let s=P((a-o[1])/Math.max(.001,o[2]-o[1]),0,1);if(o[0]===1){let r=mi(s),i=Math.sin(Math.PI*s)*.08*o[11]*(L(Math.floor(e/c.C),Math.round(o[1]*10),n+80+t)<.5?-1:1),l=o[6]-o[3],u=o[8]-o[5],d=Math.hypot(l,u)||1;f=F(o[3],o[6],r)+-u/d*i,m=F(o[5],o[8],r)+l/d*i,p=F(o[4],o[7],r);let h=I(0,.18,s*(o[2]-o[1]));g=pi(o[9],o[10],h),_=(s<.5?-.22:.18)*Math.sin(Math.PI*s)-.08*Math.min(1,o[11]/1.5)*Math.sin(Math.PI*s),v=-Math.sign(i)*.35*Math.sin(Math.PI*s),b=.75,x=-1.4,S=o[1]-c.tp<.01?I(0,.15,a-c.tp):1}else if(o[0]===2){let e=o[2]-o[1],n=a-o[1];f=o[3]+.006*Math.sin(r*7.3+t)+.012*Math.sin(r*1.3+t*2),p=o[4]+.005*Math.sin(r*5.9+t*1.7)+.01*Math.sin(r*.9+t),m=o[5]+.006*Math.cos(r*6.7+t*.3)+.012*Math.cos(r*1.1+t*1.3);let s=o[10],c=i[i.indexOf(o)+1];c&&c[0]===1&&(s=Math.atan2(c[6]-c[3],c[8]-c[5])),g=pi(o[9],o[10],I(e*.3,e*.3+.12,n)),g=pi(g,s,I(e-.14,e,n)),_=.05+.02*Math.sin(r*3.1+t),v=.03*Math.sin(r*2.3+t),b=.95,x=Math.PI}else{let e=ee(s);f=F(o[3],o[6],e),p=F(o[4],o[7],e),m=F(o[5],o[8],e),g=o[9],_=.08*(1-s),S=1-e,y=s>.92?0:1,b=.8}}}else{if(!c.bvhChecked&&e.collision?.bvh){c.bvhChecked=!0;let t=e.collision.bvh;for(let e=0;e<32&&c.valid;e++){let n=e/32*c.period,r=c.ax+c.R*(.62*Math.sin(c.w[0]*n+c.p[0])+.38*Math.sin(c.w[1]*n+c.p[1])),i=c.az+c.R*(.62*Math.cos(c.w[0]*n+c.p[0])+.38*Math.sin(c.w[2]*n+c.p[2]));ze.origin.set(r,h+4,i);try{let e=t.raycastFirst(ze,2);e&&e.point.y>h+.1&&(c.valid=!1)}catch{}}}if(!c.valid){H(Pe,0+t);continue}let i=r+c.off,a=Math.floor(i/c.C),o=i-a*c.C,s=1+(c.C-c.H-2)*L(a,2,n+86+t),l=c.H,u=.22,d=o;{let e=s,t=s+u,n=s+l-u,r=s+l;o>e&&(d-=o<t?(o-e)*(o-e)/(2*u):u/2+(Math.min(o,n)-t)),o>n&&(d-=o<r?o-n-(o-n)*(o-n)/(2*u):u/2)}let S=a*(c.C-(l-u))+d,C=(e,t)=>(t[0]=c.ax+c.R*(.62*Math.sin(c.w[0]*e+c.p[0])+.38*Math.sin(c.w[1]*e+c.p[1])),t[2]=c.az+c.R*(.62*Math.cos(c.w[0]*e+c.p[0])+.38*Math.sin(c.w[2]*e+c.p[2])),t[1]=h+c.h0+.3*Math.sin(.37*e+c.p[3])+.12*Math.sin(1.3*e+c.p[1]),t);C(S,Z),f=Z[0],p=Z[1],m=Z[2];let w=f,T=m;C(S+.08,Z);let E=Z[0]-w,D=Z[2]-T,O=Math.atan2(E,D);C(S+.3,Z);let k=fi(O,Math.atan2(Z[0]-w,Z[2]-T));if(o>s&&o<s+l){let e=o-s;g=pi(O,O+R(a,3,n+87+t)*.9,I(.2,.35,e)*(1-I(l-.25,l-.05,e))),f+=.008*Math.sin(r*6.1+t),p+=.006*Math.sin(r*5.3+t),m+=.008*Math.cos(r*5.7+t),_=.04,b=.95,x=Math.PI}else{g=O,v=P(-k*1.6,-.5,.5),_=-.1,b=.7,x=-1.4;let e=(o+3.1*L(a,4,n+88+t))%3.3;Math.abs(k)<.08&&e<.55&&L(a,5,n+88+t)<.6&&(y=2)}}X[u+2]=(r*d.beat*N+l)%N,X[u+3]=y,Se[u]=b,Se[u+1]=x,Se[u+2]=S,Ue(0+t,f,p,m,g,_,v,d.len)}let u=!!e.collision?.bvh;for(let e=0;e<ve;e++){let t=fe[e],l=Fe+e,d=l*4,f=Mr[t.sp];if((t.ax-i)**2+(t.az-o)**2+a*a*.25>s){H(Pe,l);continue}if(u&&!t.spotsBvh){t.spotsBvh=!0;for(let e of t.spots)if(!e.flower){let t=Be(e.x,e.z,c.groundHeight(e.x,e.z)+3,!0);e.y=t.y,e.water=t.water,e.deck=t.deck}t.planK=-1e9}let p=r+t.off,m=Math.floor(p/t.C);m!==t.planK&&Je(t,m);let h=p-m*t.C,g=f.span*Nr,_,v=0,y,b,x,S,C=0,w=0;if(h<t.tp){let i=t.S0,a=h,o=I(.55,.95,Math.max(0,Math.sin(a*(.9+.6*L(m,12,n+97+e))+L(m,13,n+97+e)*6)))*I(.6,2,a)*(1-I(t.tp-.6,t.tp-.1,a));if(_=t.bask?F(-.04,1.45,o):F(1.47,.55,o),y=i.x,x=i.z,b=i.y+.0045*g,S=t.yawP,i.tuft&&(B(i.tuft,z,M),y+=M[0],b+=M[1],x+=M[2]),!i.flower&&!i.deck&&!i.water){c.normalAt(i.x,i.z,.25,Ve);let e=Math.sin(S),t=Math.cos(S),n=e*Ve[0]+t*Ve[2];te(Pe,l,y,b,x,e-n*Ve[0],-n*Ve[1],t-n*Ve[2],Ve[0],Ve[1],Ve[2],g)}else Ue(l,y,b,x,S,0,0,g);X[d+2]=_,X[d+3]=0,Se[d]=Math.sin(r*.7+e);continue}let T=(h-t.tp)/t.fly;Xe(t,T,He),Xe(t,Math.min(1,T+.03),Z);let E=Z[0]-He[0],D=Z[2]-He[2],O=Z[1]-He[1],k=h-t.tp,A=(f.burst[0]+(f.burst[1]-f.burst[0])*.5)/f.beat+(f.glide[0]+f.glide[1])*.5,j=Math.floor(k/A),P=k-j*A,ee=Math.round(F(f.burst[0],f.burst[1],L(j,1,n+98+e)))/f.beat,R=T>.9||T<.06,V=0;if(P<ee||R)V=N*f.beat*(R?k:P),_=.35+1.05*f.amp*Math.sin(V),v=-.35*Math.cos(V);else{let e=P-ee;_=F(.35,f.glideAng,I(0,.06,e)),v=.05}let ne=P<ee||R,U=ne?-.012*g/Nr*Math.sin(V):-.02*(P-ee);if(y=He[0],x=He[2],b=He[1]+U,S=Math.atan2(E,D)+(ne?.12*Math.sin(V*.5+e):0),C=ne?.42+.15*Math.cos(V):.12+Math.atan2(O,Math.hypot(E,D)+.001)*.3,w=.12*Math.sin(k*2.3+e),t.S0.tuft&&T<.15){let e=1-I(0,.15,T);B(t.S0.tuft,z,M),y+=M[0]*e,b+=M[1]*e,x+=M[2]*e}if(t.S1.tuft&&T>.85){let e=I(.85,1,T);B(t.S1.tuft,z,M),y+=M[0]*e,b+=M[1]*e,x+=M[2]*e}if(T>.96){let e=I(.96,1,T);C=F(C,0,e),w=F(w,0,e),b=F(b,t.S1.y+.0045*g+(t.S1.tuft?M[1]:0),e),_=F(_,t.S1.flower?1.47:-.04,e*e),S=pi(S,Ye(t,m+1,t.S1),e)}Ue(l,y,b,x,S,C,w,g),X[d+2]=_,X[d+3]=v,Se[d]=Math.sin(r*1.3+e)}nt.multiplyMatrices(p.projectionMatrix,p.matrixWorldInverse),tt.setFromProjectionMatrix(nt);for(let e=0;e<ye;e++){let t=ge[e],n=Ie+e,a=t.tree;if((a.x-i)**2+(a.z-o)**2>28900){H(Pe,n);continue}let s=r+t.off-t.hold,c=Math.floor(s/t.period),l=s-c*t.period;c!==t.k&&t.k>-1e8&&l<1&&(rt.set(t.lx,t.ly,t.lz),(t.lx-i)**2+(t.lz-o)**2<1225&&tt.containsPoint(rt)&&(t.hold+=l+.001,s=r+t.off-t.hold,c=t.k,l=s-c*t.period)),(c!==t.k||u&&!t.bvh)&&Ze(t,e,c,u);let d=t.size;if(l<t.D){Qe(t,l,Z);let r=Z[0],i=Z[1],a=Z[2],o=I(t.D-.6,t.D,l),s,c,u,f,p,m;if(t.tumble){let e=t.psi0+.15*l,n=Math.cos(e),r=Math.sin(e),i=t.spinW*l,a=Math.cos(i),o=Math.sin(i);s=-r*o,c=a,u=n*o,f=n,p=0,m=r}else{let n=t.psi0+t.prec*l,r=Math.cos(n),i=Math.sin(n),a=I(0,1.2,l),o=Math.sin(t.om*l)*a,d=t.tiltMax*o+.08*Math.sin(t.om*l*2+e),h=Math.cos(d),g=Math.sin(d);s=-r*g,c=h,u=-i*g;let _=r*h,v=g,y=i*h,b=Math.cos(t.beta),x=Math.sin(t.beta),S=c*y-u*v,C=u*_-s*y,w=s*v-c*_;f=_*b+S*x,p=v*b+C*x,m=y*b+w*x;let T=.18*Math.sin(t.om*l*3.1+e*1.7)*a,E=p*u-m*c,D=m*s-f*u,O=f*c-p*s;s+=E*T,c+=D*T,u+=O*T}if(o>0){let e=t.restYaw;s=F(s,t.nx,o),c=F(c,t.ny,o),u=F(u,t.nz,o),f=F(f,Math.cos(e),o),p=F(p,0,o),m=F(m,Math.sin(e),o),r=F(r,t.lx,o),a=F(a,t.lz,o),i=F(i,t.ly+.004+d*.06*(.3+t.curl),o*o)}let h=Math.hypot(s,c,u)||1;s/=h,c/=h,u/=h;let g=f*s+p*c+m*u;f-=g*s,p-=g*c,m-=g*u,i=Math.max(i,t.ly+.01+d*.08),te(Pe,n,r,i,a,f,p,m,s,c,u,d)}else{let i=l-t.D,a=t.lx,o=t.lz,s=t.ly+.004+d*.06*(.3+t.curl),c=t.restYaw;if(t.water){let n=Math.min(i,40);a+=t.wx*.12*n,o+=t.wz*.12*n,s=h+.008+.002*Math.sin(r*1.7+e),c+=.02*n}let u=Math.cos(c),f=Math.sin(c),p=u*t.nx+f*t.nz;te(Pe,n,a,s,o,u-p*t.nx,-p*t.ny,f-p*t.nz,t.nx,t.ny,t.nz,d)}}Re(),$e&&lt(r,l),Ne.instanceMatrix.needsUpdate=!0,Ce.needsUpdate=!0,we.needsUpdate=!0}let ot=new D,st=new D,ct=new D;function lt(e,t){p.updateMatrixWorld();let n=p.matrixWorld.elements;st.set(n[0],n[1],n[2]),ct.set(n[4],n[5],n[6]),ot.set(-n[8],-n[9],-n[10]);let r=p.fov*Math.PI/180,i=$e.dist||Math.max(.22,$e.size*1.6/(2*Math.tan(r/2))),a=p.position.x+ot.x*i,o=p.position.y+ot.y*i,s=p.position.z+ot.z*i,c=Math.atan2(-ot.x,-ot.z)+$e.yaw,l=$e.idx,u=l*4;if($e.kind===0){let n=jr[$e.sp],r=$e.state||`perch`;X[u+1]=$e.sp,X[u+2]=(e*n.beat*N+t)%N,X[u+3]=r===`perch`?0:r===`glide`?2:1,Se[u]=r===`dart`?.75:.95,Se[u+1]=r===`dart`?-1.4:Math.PI,Se[u+2]=r===`perch`?0:1,Ue(l,a,o,s,c,$e.pitch,0,n.len),r===`perch`&&Y&&te(Pe,Le,a,o-.0068*n.len-.8,s,1,0,0,0,1,0,1,.8,1)}else if($e.kind===1){let t=Mr[$e.sp],n=$e.state||`flap`;X[u+1]=$e.sp;let r=.35+1.05*t.amp*Math.sin(N*t.beat*e),i=-.35*Math.cos(N*t.beat*e);n===`glide`?(r=t.glideAng,i=.05):n===`open`?(r=-.04,i=0):n===`closed`&&(r=1.47,i=0),X[u+2]=r,X[u+3]=i,Ue(l,a,o,s,c,$e.pitch,0,t.span*Nr)}else if($e.kind===2){let t=$e.state||`flutter`,n=0,r=1,i=0,u=Math.sin(c),d=Math.cos(c);if(t===`flutter`){let t=.7*Math.sin(N*.7*e);n=-Math.sin(t)*Math.cos(c),r=Math.cos(t),i=Math.sin(t)*Math.sin(c)}else if(t===`tumble`){let t=N*3*e;r=Math.cos(t),n=Math.sin(t)*Math.cos(c),i=-Math.sin(t)*Math.sin(c)}let f=u*n+d*i;te(Pe,l,a,o,s,u-f*n,-f*r,d-f*i,n,r,i,.11)}else te(Pe,l,a,o-.5,s,1,0,0,0,1,0,1,.8,1)}return at(1/60,e.engine.time??0),console.log(`[lagoon] critters: ${_e} dragonflies (${Y} perch stalks), ${ve} butterflies (${j?.length??0} flower tufts), ${ye} leaves, atlas ${Oe} in ${Math.round(performance.now()-i)} ms`),{mesh:Ne,update:at,dragonflies:G.map(e=>[e.ax,e.az]),butterflies:fe.map(e=>[e.ax,e.az]),leaves:ye,stalks:K.map(e=>[e.x,e.z,e.tip[1]]),setCritterView:et,debugInfo(){let e=e=>[Pe[e*16+12],Pe[e*16+13],Pe[e*16+14]].map(e=>+e.toFixed(3));return{dragonflies:G.map((t,n)=>({sp:jr[t.sp].key,pos:e(0+n),mode:X[(0+n)*4+3],anchor:[t.ax,t.az],perches:t.perches?.map(e=>e.tip.map(e=>+e.toFixed(3))),cycle:t.percher?{C:t.C,off:t.off,k:t.planK,start:t.planK*t.C-t.off,tp:t.tp,segs:(t.segs||[]).map(e=>[e[0],+e[1].toFixed(3),+e[2].toFixed(3)])}:{C:t.C,off:t.off,H:t.H}})),butterflies:fe.map((t,n)=>({sp:Mr[t.sp].key,pos:e(Fe+n),open:X[(Fe+n)*4+2],flowerSpots:t.spots.filter(e=>e.tuft).length,onFlower:!!t.S0?.tuft,nextFlower:!!t.S1?.tuft,cycle:{C:t.C,off:t.off,k:t.planK,start:t.planK*t.C-t.off,tp:t.tp,fly:t.fly}})),leaves:ge.map((t,n)=>({pos:e(Ie+n),tumble:!!t.tumble,water:!!t.water,deck:!!t.deck,start:t.k*t.period-t.off+t.hold,D:t.D,period:t.period})),stalks:K.length,flowerTufts:j?.length??0}}}}function gi(e,n=31337){let{layout:r,quality:a,G:o,pipeline:s,LAYERS:c}=e,l=Math.round(2600*_i(a.foliageDensity??1)),u=new Float32Array(l*3),d=new Float32Array(l*4);for(let e=0;e<l;e++)u[e*3]=L(e,1,n),u[e*3+1]=L(e,2,n),u[e*3+2]=L(e,3,n),d[e*4]=L(e,4,n),d[e*4+1]=L(e,5,n),d[e*4+2]=.4+.9*L(e,6,n),d[e*4+3]=L(e,7,n);let f=new S;f.setAttribute(`position`,new t(u,3)),f.setAttribute(`aRand`,new t(d,4)),f.boundingSphere=new v(new D,1e6);let p=[...r.HERO_TREES,...r.EXTRA_TREES],m=p.length,h=[],g=[];for(let e of p){let t=e.groundY??r.WATER_Y+1.5;h.push(new b(e.x,e.z,e.crown,t+e.height)),g.push(new b(t,e.forkY,0,0))}let _=!!(o.tShadowStatic&&o.uShadowStaticMat&&o.uShadowStaticParams&&o.uShadowStaticOn),y=Math.max(0,e.params?.num?.(`motegain`,1)??1),x=new A({defines:{..._?{AMB_STATIC_SHADOW:1}:{},...e.params?.has?.(`motedebug`)?{AMB_MOTE_DEBUG:e.params.num(`motedebug`,1)|0}:{}},uniforms:{uTime:o.uTime,uSunDir:o.uSunDir,uSunColor:o.uSunColor,uSunIntensity:o.uSunIntensity,uWaterLevel:o.uWaterLevel,uWindDir:o.uWindDir,uWindStrength:o.uWindStrength,uResolution:s.uniforms.uResolution,uBox:{value:12},uTrees:{value:h},uTreesB:{value:g},uGain:{value:y},..._?{tShadowStatic:o.tShadowStatic,uShadowStaticMat:o.uShadowStaticMat,uShadowStaticParams:o.uShadowStaticParams,uShadowStaticOn:o.uShadowStaticOn}:{}},vertexShader:`
      #define NT ${m}
      #ifdef AMB_STATIC_SHADOW
      uniform float uShadowStaticOn;
      #endif
      uniform float uTime; uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uSunIntensity;
      uniform float uWaterLevel; uniform vec2 uWindDir; uniform float uWindStrength;
      uniform vec2 uResolution; uniform float uBox; uniform float uGain;
      uniform vec4 uTrees[NT]; uniform vec4 uTreesB[NT];
      attribute vec4 aRand;
      varying vec3 vCol;
      varying vec3 vWp;
      varying float vShadowW;
      varying float vPs;
      float mh(vec2 p) { p = fract(p * vec2(0.1031, 0.1030)); p += dot(p, p.yx + 33.33); return fract((p.x + p.y) * p.x); }
      float vnoise(vec2 p) {
        vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(mh(i), mh(i + vec2(1.0, 0.0)), u.x), mix(mh(i + vec2(0.0, 1.0)), mh(i + vec2(1.0, 1.0)), u.x), u.y);
      }
      // integer hash (large time arguments stay exact), [0, 1)
      float ih(float i, float s) {
        uvec2 q = uvec2(ivec2(int(i), int(s)));
        q = q * uvec2(1597334673u, 3812015801u);
        uint n = (q.x ^ q.y) * 1597334673u;
        return float(n >> 8u) * (1.0 / 16777216.0);
      }
      // smooth 1D gradient noise in time, ~[-1, 1]
      float gn(float x, float s) {
        float i = floor(x), f = x - i;
        float u = f * f * (3.0 - 2.0 * f);
        return 2.0 * mix((ih(i, s) * 2.0 - 1.0) * f, (ih(i + 1.0, s) * 2.0 - 1.0) * (f - 1.0), u);
      }
      // random walk: 35 cm over ~20 s, 7 cm over ~4 s, 1.5 cm over ~1 s (a few cm/s)
      vec3 wander(float t, float s) {
        vec3 w = vec3(0.0);
        float a = 0.35, fr = 0.05;
        for (int o = 0; o < 3; o++) {
          float so = s + float(o) * 131.0;
          w += a * vec3(gn(t * fr, so), 0.6 * gn(t * fr + 17.0, so + 41.0), gn(t * fr + 53.0, so + 83.0));
          a *= 0.2; fr *= 4.5;
        }
        return w;
      }
      void main() {
        float t = uTime;
        vec3 p = position * uBox;
        float sp = aRand.z;
        float sd0 = floor(aRand.y * 9973.0) + floor(aRand.w * 97.0) * 9973.0;
        p += vec3(uWindDir.x, 0.0, uWindDir.y) * (0.03 + 0.12 * uWindStrength) * sp * t;
        p += wander(t, sd0);
        p.y += (aRand.x - 0.45) * 0.012 * t;          // heavier ones settle, light ones rise
        vec3 wp = cameraPosition + mod(p - cameraPosition + 0.5 * uBox, uBox) - 0.5 * uBox;

        // density: pollen / dust / midges gather in and under the tree crowns
        float m = 0.0;
        for (int i = 0; i < NT; i++) {
          vec4 T = uTrees[i]; vec4 B = uTreesB[i];
          float d = length(wp.xz - T.xy);
          float horiz = 1.0 - smoothstep(T.z * 0.55, T.z * 1.2, d);
          float vert = smoothstep(B.x - 0.5, B.x + 1.2, wp.y) * (1.0 - smoothstep(T.w - 4.0, T.w + 1.0, wp.y));
          m = max(m, horiz * vert);
        }
        vec3 sd = normalize(uSunDir);
        bool camUnder = cameraPosition.y < uWaterLevel;
        float dens = camUnder ? 0.7 : mix(0.18, 1.0, m);
        // with the static shadow map the fragment stage applies real sun visibility
        // (shadow sampler taps are fragment-only on ANGLE/D3D11); else noise shafts
        float useMap = 0.0;
      #ifdef AMB_STATIC_SHADOW
        useMap = step(0.5, uShadowStaticOn);
      #endif
        float lit = 1.0;
        if (useMap < 0.5) {
          vec3 t1 = normalize(cross(sd, vec3(0.0, 1.0, 0.0)));
          vec3 t2 = cross(t1, sd);
          vec2 q = vec2(dot(wp, t1), dot(wp, t2)) * 0.5;
          lit = mix(0.3, 1.6 * smoothstep(0.52, 0.8, vnoise(q)), m);
        }

        vec4 mv = modelViewMatrix * vec4(wp, 1.0);
        float dist = -mv.z;
        float worldSize = mix(0.0016, 0.0065, aRand.x * aRand.x);
        float px = worldSize * uResolution.y * projectionMatrix[1][1] * 0.5 / max(dist, 0.05);
        float ps = max(px, 1.5);
        float energy = px / ps; energy *= energy;
        float fade = smoothstep(0.3, 0.9, dist) * (1.0 - smoothstep(uBox * 0.3, uBox * 0.48, dist));

        // Henyey-Greenstein, g = 0.7, normalised to 1 straight toward the sun,
        // plus a little isotropic scattering (rough flakes)
        vec3 V = normalize(wp - cameraPosition);
        float cth = dot(V, sd);
        const float g = 0.7;
        float den = max(1.0 + g * g - 2.0 * g * cth, 1e-3);
        float hg = (1.0 - g * g) / (den * sqrt(den));
        float phase = 0.03 + hg * ((1.0 - g) * (1.0 - g) / (1.0 + g));
        // tumbling flakes: the glint comes and goes (slowly, per mote)
        float tw = 0.55 + 0.45 * gn(t * (0.4 + 1.2 * aRand.y), sd0 + 7.0);

        vec3 col;
        float side;
        if (camUnder) {
          side = step(wp.y, uWaterLevel - 0.08);
          col = vec3(0.22, 0.52, 0.5) * uSunIntensity * 0.06 * (0.35 + phase);
        } else {
          side = step(uWaterLevel + 0.1, wp.y);
          col = uSunColor * uSunIntensity * phase * lit * 0.55 * uGain;
        }
        float keep = step(aRand.w, dens);
        vCol = max(col * energy * fade * side * tw * keep, vec3(0.0));
        vWp = wp;
        vPs = ps;
        vShadowW = camUnder ? 0.0 : useMap;
        gl_PointSize = keep * side > 0.5 ? ps : 0.0;
      #if defined(AMB_MOTE_DEBUG) && AMB_MOTE_DEBUG == 1
        vCol = vec3(8.0, 0.0, 0.0) * fade; gl_PointSize = 5.0; vShadowW = 0.0;
      #elif defined(AMB_MOTE_DEBUG) && AMB_MOTE_DEBUG == 2
        vShadowW = 0.0;
      #endif
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      #ifdef AMB_STATIC_SHADOW
      uniform sampler2DShadow tShadowStatic; uniform mat4 uShadowStaticMat;
      uniform vec4 uShadowStaticParams; uniform vec3 uSunDir;
      #endif
      varying vec3 vCol;
      varying vec3 vWp;
      varying float vShadowW;
      varying float vPs;
      void main() {
        // tiny sprites (1-2 px): flat, so a pixel centre off the point centre still
        // gets the (energy-normalised) value; larger ones get a soft round profile
        vec2 d = gl_PointCoord - 0.5;
        float r2 = dot(d, d) * 4.0;
        float g = exp(-r2 * 2.5) * (1.0 - smoothstep(0.8, 1.0, r2));
        float a = mix(0.8, g * 1.6, smoothstep(1.8, 4.0, vPs));
        vec3 col = vCol * a;
      #ifdef AMB_STATIC_SHADOW
        if (vShadowW > 0.5) {
          // same lookup as lagoonStaticShadowTap (textureGrad: textureLod on a
          // shadow sampler is not reliable on ANGLE/D3D11)
          vec3 c = (uShadowStaticMat * vec4(vWp + uSunDir * (uShadowStaticParams.z * 1.5), 1.0)).xyz;
          float vis = 1.0;
          if (c.x > 0.0 && c.y > 0.0 && c.x < 1.0 && c.y < 1.0 && c.z < 1.0 && c.z > 0.0) vis = textureGrad(tShadowStatic, c, vec2(0.0), vec2(0.0));
          col *= vis;
        }
      #endif
        gl_FragColor = vec4(col, 1.0);
      }`,transparent:!0,depthWrite:!1,depthTest:!0,blending:2});x.userData.noPatch=!0;let C=new i(f,x);return C.name=`ambient-motes`,C.frustumCulled=!1,C.layers.set(c.FX),C.renderOrder=10,e.scene.add(C),{points:C,count:l}}function _i(e){return e<.3?.3:e>1.4?1.4:e}function vi(e,t){console.error(`[lagoon] ambient/${e}:`,t),window.__lagoon?.errors?.push({where:`ambient/${e}`,message:String(t?.stack||t)})}async function yi(e){let{layout:t,hf:n}=e,r=1e9,i=-1e9,a=1e9,o=-1e9;for(let e of t.LAGOON_LOBES)r=Math.min(r,e.x-e.rx),i=Math.max(i,e.x+e.rx),a=Math.min(a,e.z-e.rz),o=Math.max(o,e.z+e.rz);let s=await new z(n,r-14,a-14,i+14,o+14,1).build(e.yieldFrame);e.progress(.35,`Waking the lagoon`);let c={},l=[[`fish`,()=>Z(e,s)],[`birds`,()=>dr(e,s)],[`critters`,()=>hi(e,s)],[`motes`,()=>gi(e)]],u=(e.params?.get?.(`ambskip`)||``).split(`,`);for(let t=0;t<l.length;t++){let[n,r]=l[t];if(!u.includes(n)){try{c[n]=await r()}catch(e){vi(n,e)}e.progress(.35+.65*((t+1)/l.length),`Waking the lagoon`),await e.yieldFrame()}}let d=[`fish`,`birds`,`critters`].map(e=>c[e]?.update).filter(Boolean),f=!1,p=0,m={},h=!!e.params?.has?.(`ambstats`);if(h){let t=[c.fish?.mesh,c.fish?.shadows,c.birds?.mesh,c.critters?.mesh,c.motes?.points].filter(Boolean);for(let n of t)n.onBeforeRender=(t,r,i)=>{let a=i===e.camera?`main`:i.isOrthographicCamera?`shadow`:`other`,o=n.name+`:`+a;m[o]=(m[o]||0)+1}}return{...c,grid:s,order:20,stats:{fish:c.fish?.count??0,birds:(c.birds?.fliers??0)+(c.birds?.waders?.length??0),dragonflies:c.critters?.dragonflies?.length??0,butterflies:c.critters?.butterflies?.length??0,leaves:c.critters?.leaves??0,motes:c.motes?.count??0},update(e,t){if(!f){if(h){++p%8==0&&console.log(`[lagoon] ambient draws/frame `+JSON.stringify(m));for(let e in m)m[e]=0}try{for(let n=0;n<d.length;n++)d[n](e,t)}catch(e){f=!0,vi(`update`,e)}}}}}export{yi as build};