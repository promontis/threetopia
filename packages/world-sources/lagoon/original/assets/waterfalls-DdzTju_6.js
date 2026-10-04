import{E as e,Lt as t,O as n,U as r,an as i,ar as a,fa as o,in as s,j as c,ro as l,ta as u}from"./three.core-DtjtRha-.js";import{a as d,t as f}from"./noise-RmOKhMMB.js";import{a as p}from"./index-BjH0GYGf.js";import{t as m}from"./surfaceShader-dsv9JGIz.js";var h=9.81,g=1.4,_=1.3;function v(e,t,n,r,i){let a=i*i,o=a*i;return .5*(2*t+(-e+n)*i+(2*e-5*t+4*n-r)*a+(-e+3*t-3*n+r)*o)}function y(e,t){let n=[],r=[e[0],...e,e[e.length-1]];for(let e=1;e<r.length-2;e++){let i=r[e],a=r[e+1],o=Math.hypot(a[0]-i[0],a[1]-i[1]),s=Math.max(2,Math.ceil(o/(t*.25)));for(let t=0;t<s;t++){let o=t/s;n.push([v(r[e-1][0],i[0],a[0],r[e+2][0],o),v(r[e-1][1],i[1],a[1],r[e+2][1],o)])}}n.push(e[e.length-1]);let i=[{x:n[0][0],z:n[0][1],s:0}],a=0,o=t;for(let e=1;e<n.length;e++){let r=n[e-1][0],s=n[e-1][1],c=n[e][0],l=n[e][1],u=Math.hypot(c-r,l-s);for(;a+u>=o;){let e=(o-a)/u;i.push({x:r+(c-r)*e,z:s+(l-s)*e,s:o}),o+=t}a+=u}for(let e=0;e<i.length;e++){let t=i[Math.max(0,e-1)],n=i[Math.min(i.length-1,e+1)],r=Math.hypot(n.x-t.x,n.z-t.z)||1;i[e].tx=(n.x-t.x)/r,i[e].tz=(n.z-t.z)/r}return i}function b(e,t,n=1){let r=e.slice();for(let e=0;e<n;e++){let e=Array(r.length);for(let n=0;n<r.length;n++){let i=0,a=0;for(let e=-t;e<=t;e++){let o=Math.min(r.length-1,Math.max(0,n+e)),s=t+1-Math.abs(e);i+=r[o]*s,a+=s}e[n]=i/a}r=e}return r}function x(e,t,n={}){let r=n.step??.5,i=n.depth??.28,a=(t,n)=>e.groundHeight(t,n),o=(e,t)=>Math.max(a(e,t),n.support?n.support(e,t):-1e9),s=t.stream.map(e=>[e[0],e[1]]),c=s[s.length-1],l=t.pool[0]-c[0],u=t.pool[2]-c[1],d=Math.hypot(l,u)||1;l/=d,u/=d,s.push([c[0]+l*10,c[1]+u*10]);let f=y(s,r),p=f.map(e=>{let t=-e.tz,n=e.tx,r=a(e.x,e.z);for(let i of[-.6,-.3,.3,.6])r=Math.min(r,a(e.x+t*i,e.z+n*i));return r}),m=f.length-1;for(let e=4;e<f.length-1;e++){let t=(p[e]-p[e+1])/r;if(p[e]>3&&t>.85){m=e;break}}let v=b(p.slice(0,m+1),2,2),x=[],S=1e9;for(let e=0;e<=m;e++){let t=f[e];S=Math.min(S,v[e]+i);let n=S,r=Math.min(1,t.s/4);n-=(1-r)*(i+.12),x.push({x:t.x,z:t.z,y:n,bed:p[e],tx:t.tx,tz:t.tz,s:t.s,halfL:.6,halfR:.6,slope:0})}let C=x[x.length-1].y;for(let e of x){let t=-e.tz,n=e.tx;for(let r of[-1,1]){let i=.25;for(;i<3.2&&!(a(e.x+t*i*r,e.z+n*i*r)>e.y+.03);i+=.2);r<0?e.halfL=i:e.halfR=i}}let w=b(x.map(e=>e.halfL),2,2),T=b(x.map(e=>e.halfR),2,2);for(let e=0;e<x.length;e++){x[e].halfL=Math.min(3,w[e]+.35),x[e].halfR=Math.min(3,T[e]+.35);let t=x[Math.max(0,e-2)],n=x[Math.min(x.length-1,e+2)];x[e].slope=Math.max(0,(t.y-n.y)/Math.max(.1,n.s-t.s))}let E=f[m],D={x:E.x,z:E.z,y:C,tx:E.tx,tz:E.tz,s:E.s},O=n.cols??18,k=n.dt??.05,A=n.maxT??2.2,j=Math.ceil(A/k)+1,M=x[x.length-1],N=Math.max(.6,(M.halfL+M.halfR-.7)*1.05),P=n.width??Math.min(t.width,Math.max(t.width*.8,N)),F=n.width?Math.min(P,Math.max(P*.66,N)):P,I=Math.sqrt(2*Math.max(1,C-(t.pool[1]??0))/h),L=(P-F)/Math.max(.5,I);for(let e=0;e<x.length;e++){let t=Math.max(0,1-(D.s-x[e].s)/3.5);if(t<=0)continue;let n=F*.5+.25,r=t*t*(3-2*t);x[e].halfL=Math.max(x[e].halfL,x[e].halfL+(n-x[e].halfL)*r),x[e].halfR=Math.max(x[e].halfR,x[e].halfR+(n-x[e].halfR)*r)}let R=n.v0??3,z=new Float32Array(O*j*3),B=new Float32Array(O*j),V=new Float32Array(O*j),H=new Float32Array(O*j),U=-D.tz,W=D.tx,G=k/10,K=0,q=0,J=0,Y=1e9,X=-1e9;for(let e=0;e<O;e++){let t=e/(O-1)-.5,r=t*F,i=D.x+U*r,a=D.z+W*r;for(let e=0;e<4&&o(i,a)>C+.25;e+=.1)i+=D.tx*.1,a+=D.tz*.1;let s=Math.min(Math.max(C,o(i,a)+.05),C+.3),c=Math.abs(t)*2,l=R*(1-.18*c*c),u=t*((n.splay0??.35)+L),d=D.tx*l+U*u,f=D.tz*l+W*u,p=0,m=!1,v=!1;for(let t=0;t<j;t++){let n=e*j+t;if(z[n*3]=i,z[n*3+1]=s,z[n*3+2]=a,B[n]=Math.hypot(d,p,f),V[n]=+!m,H[n]=t*k,t===j-1)break;for(let e=0;e<10;e++){if(s<-.35){d=f=p=0;break}let e=i+d*G,t=a+f*G,n=o(e,t)+.07;if(m){let r=s-n;if(r>.06)m=!1,p=Math.min(p,0);else if(r<-.3){d*=.3,f*=.3,p=0;continue}else{let r=Math.hypot(d,f)||.001,o=-(n-s)/Math.max(1e-4,r*G);if(o>g)m=!1,p=Math.min(p,0);else{let c=1/Math.sqrt(1+o*o),l=o*c,u=Math.max(_,Math.hypot(r,p)+(h*l-.9)*G),m=u*c;s=n,i=e,a=t,d*=m/r,f*=m/r,p=-u*l;continue}}}p-=h*G;let r=i,c=a,l=s;i=e,a=t,s+=p*G;let u=o(i,a)+.07;if(s<=u&&s>-.2){let e=Math.hypot(d,f)||.001,t=d/e,n=f/e,h=(u-(o(i+t*.15,a+n*.15)+.07))/.15;if(l>=u-.3&&h<=g){s=u,m=!0;let r=Math.max(_,e*.55+Math.abs(p)*.18);d=t*r,f=n*r,p=0}else if(l>=u-.3){s=u;let r=Math.min(e,Math.abs(p)/Math.max(h,.001)+.15);d=t*r,f=n*r}else i=r,a=c,d*=.15,f*=.15}}if(!v&&s<.02){v=!0,K+=i,q+=a,J++;let e=(i-D.x)*U+(a-D.z)*W;Y=Math.min(Y,e),X=Math.max(X,e)}}}let Z=J?{x:K/J,z:q/J,r:Math.max(1.6,(X-Y)*.6+1)}:{x:t.pool[0],z:t.pool[2],r:2.5};return{stream:x,lip:D,sheet:{cols:O,rows:j,pos:z,speed:B,air:V,t:H,width:P,dt:k},impact:Z}}var S=7;function C(e,n){let r=[],i=[],a=[],o=[],s=[],l=[];for(let t of n){let n=t.stream;if(n.length<2)continue;let c=0,u=r.length/3;for(let l=0;l<n.length;l++){let u=n[l],d=Math.min(3.2,.45+u.slope*6+Math.max(0,1-(t.lip.s-u.s)/3)*1.6);l>0&&(c+=(u.s-n[l-1].s)/d);let f=-u.tz,p=u.tx,m=t.lip.s-u.s,h=Math.min(1,u.slope*4+Math.max(0,1-m/2.5)*.8);for(let t=0;t<S;t++){let n=t/6,l=-u.halfL+(u.halfL+u.halfR)*n,g=u.x+f*l,_=u.z+p*l,v=e.groundHeight(g,_),y=Math.min(u.y,v+.012);r.push(g,y,_),i.push(l,u.s),a.push(c,d,h,m),o.push(u.tx,u.tz),s.push(Math.min(n,1-n)*2)}}for(let e=0;e<n.length-1;e++)for(let t=0;t<6;t++){let n=u+e*S+t,r=n+1,i=n+S,a=i+1;l.push(n,i,r,r,i,a)}}let u=new c;return u.setAttribute(`position`,new t(r,3)),u.setAttribute(`uv`,new t(i,2)),u.setAttribute(`aFlow`,new t(a,4)),u.setAttribute(`aDir`,new t(o,2)),u.setAttribute(`aEdge`,new t(s,1)),u.setIndex(l),w(u),u.computeBoundingSphere(),u}function w(e){let t=e.attributes.position.array,n=e.index.array,r=0;for(let e=0;e<n.length;e+=3){let i=n[e]*3,a=n[e+1]*3,o=n[e+2]*3,s=t[a]-t[i],c=t[a+2]-t[i+2],l=t[o]-t[i],u=t[o+2]-t[i+2];r+=c*l-s*u}if(r<0)for(let e=0;e<n.length;e+=3){let t=n[e+1];n[e+1]=n[e+2],n[e+2]=t}}function T(e,n){let r=[],i=[],a=[],o=[],s=[],u=[],d=new l,f=new l,p=new l;for(let t of e){let e=t.sheet,{cols:c,rows:m}=e,h=e.pos,g=(e,t,n)=>{let r=(Math.min(c-1,Math.max(0,e))*m+Math.min(m-1,Math.max(0,t)))*3;return n.set(h[r],h[r+1],h[r+2])},_=new Float32Array(c*m*3),v=new l,y=new l,b=new l,x=new l;for(let e=0;e<c;e++)for(let n=0;n<m;n++){g(e+1,n,y),g(e-1,n,v),g(e,n+1,x),g(e,n-1,b),f.subVectors(y,v),p.subVectors(x,b),p.lengthSq()<1e-8&&p.set(0,-1,0),d.crossVectors(p,f).normalize(),d.x*t.lip.tx+d.z*t.lip.tz+d.y<0&&d.negate();let r=(e*m+n)*3;_[r]=d.x,_[r+1]=d.y,_[r+2]=d.z}let S=t.layers??n,C=t.kind??0,w=t.lip.y;for(let n of S){let l=r.length/3,d=-t.lip.tz,f=t.lip.tx;for(let t=0;t<c;t++){let l=t/(c-1);for(let c=0;c<m;c++){let u=t*m+c,p=e.t[u],g=n.spray?Math.min(1,Math.max(0,(p-.15)/1.1)):Math.min(1,p/1.2),v=n.widen*(l-.5)*e.width*g,y=n.spray?n.offset*g*g*(3-2*g):n.offset*Math.min(1,.25+p*.9),b=h[u*3]+d*v+_[u*3]*y,x=h[u*3+1]+_[u*3+1]*y,S=h[u*3+2]+f*v+_[u*3+2]*y;r.push(b,x,S),i.push(_[u*3],_[u*3+1],_[u*3+2]),a.push(l,p),o.push(e.speed[u],e.air[u],e.width*(1+n.widen*g),n.id),s.push(C,Math.max(0,w-h[u*3+1]))}}for(let e=0;e<c-1;e++)for(let t=0;t<m-1;t++){let n=l+e*m+t,r=n+1,i=n+m,a=i+1;u.push(n,i,r,r,i,a)}}}let m=new c;return m.setAttribute(`position`,new t(r,3)),m.setAttribute(`normal`,new t(i,3)),m.setAttribute(`uv`,new t(a,2)),m.setAttribute(`aSheet`,new t(o,4)),m.setAttribute(`aFx`,new t(s,2)),m.setIndex(u),m.computeBoundingSphere(),m.computeBoundingBox(),m}var E=`
attribute vec4 aFlow;
attribute vec2 aDir;
attribute float aEdge;
varying vec3 vWorld;
varying float vViewZ;
varying vec2 vUv;
varying vec4 vFlow;
varying vec2 vDir;
varying float vEdge;
void main() {
  vEdge = aEdge;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vUv = uv;
  vFlow = aFlow;
  vDir = aDir;
  vec4 mv = viewMatrix * w;
  vViewZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,D=`
#include <common>
#include <lagoon_common>
#include <lagoon_depth>
${m}
uniform sampler2D tWWaveA;
uniform sampler2D tWWaveB;
uniform sampler2D tWFoam;
varying vec3 vWorld;
varying float vViewZ;
varying vec2 vUv;
varying vec4 vFlow;
varying vec2 vDir;
varying float vEdge;

void main() {
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 V = toCam / max(dist, 1e-4);
  vec2 suv = gl_FragCoord.xy / uResolution;
  vec2 fdir = normalize(vDir + vec2(1e-5));
  vec2 perp = vec2(-fdir.y, fdir.x);
  float speed = vFlow.y;
  float rapids = vFlow.z;

  // flow-aligned ripples (texture scrolls at the local water speed)
  float trav = (vFlow.x - uTime) * speed; // metres of travel
  vec2 uvA = vec2(vUv.x / 1.6, trav / 2.2);
  vec2 uvB = vec2(vUv.x / 0.7 + 0.37, trav / 0.9);
  vec2 sA = (texture2D(tWWaveA, uvA).rg * 2.0 - 1.0) * 4.0;
  vec2 sB = (texture2D(tWWaveB, uvB).rg * 2.0 - 1.0) * 4.0;
  // running water is never glassy: livelier chop than the lagoon, more in the rapids
  vec2 sl = sA * (0.05 + 0.06 * rapids) + sB * (0.035 + 0.08 * rapids);
  vec2 slope = sl.x * perp + sl.y * fdir;
  vec3 N = normalize(vec3(-slope.x, 1.0, -slope.y));
  float NdV = max(dot(N, V), 0.0);

  // scene behind
  float rawD = texture2D(tSceneDepth, suv).r;
  vec3 floorP = lagoonWorldPosFromDepth(suv, rawD);
  float depthV = max(vWorld.y - floorP.y, 0.0);
  vec3 tiltV = (viewMatrix * vec4(N.x, 0.0, N.z, 0.0)).xyz;
  vec2 ruv = clamp(suv + tiltV.xy * 2.2 * clamp(depthV, 0.0, 0.8) / max(vViewZ, 1.5), vec2(0.001), vec2(0.999));
  float rawD2 = texture2D(tSceneDepth, ruv).r;
  if (lagoonLinearDepth(rawD2) < vViewZ) { ruv = suv; rawD2 = rawD; }
  vec3 refr = texture2D(tSceneColor, ruv).rgb;
  vec3 floor2 = lagoonWorldPosFromDepth(ruv, rawD2);
  float pathV = clamp(distance(floor2, vWorld), 0.0, 20.0);
  float colD = clamp(vWorld.y - floor2.y, 0.0, 5.0);
  // stream water carries fine sediment and algae: a little more absorption and a
  // green-teal scattering veil than the settled lagoon (reads as water, not glass)
  vec3 sigA = uWAbsorb * 1.7 + vec3(0.12, 0.05, 0.10);
  vec3 sigS = uWScatter * 5.0;
  vec3 sigT = sigA + sigS;
  float sunVis = mix(0.12, 1.0, lagoonStaticShadowTap(vWorld));
  vec3 Tv = exp(-sigT * pathV);
  vec3 veil = wWaterLight(min(colD, 1.0) * 0.5, sunVis) * vec3(0.85, 1.0, 0.8) * (sigS / sigT) * (1.0 - Tv);
  vec3 below = refr * Tv + veil;

  vec3 R = reflect(-V, N); R.y = abs(R.y) + 0.002; R = normalize(R);
  float F = 0.0204 + 0.9796 * wPow5(1.0 - NdV);
  vec3 col = mix(below, wSky(R, 0.12 + 0.2 * rapids), F);

  // sun glints
  vec3 Hh = normalize(uSunDir + V);
  float NdH = max(dot(N, Hh), 0.0);
  float a2 = 0.012;
  float dd = NdH * NdH * (a2 - 1.0) + 1.0;
  col += uSunColor * uSunIntensity * sunVis * min(a2 / (3.14159 * dd * dd) * 0.05 / max(NdV, 0.1), 30.0) * max(dot(N, uSunDir), 0.0);

  // foam: rapids, the accelerating tongue before the lip, and the banks
  vec4 f1 = texture2D(tWFoam, vec2(vUv.x * 0.5, trav * 0.35));
  vec4 f2 = texture2D(tWFoam, vec2(vUv.x * 0.9 + 0.5, trav * 0.6));
  float foam = smoothstep(0.55, 0.9, f1.r * 0.7 + f2.g * 0.5) * rapids;
  foam = max(foam, (1.0 - smoothstep(0.0, 0.07, depthV)) * smoothstep(0.4, 0.8, f2.r) * 0.6);
  foam *= smoothstep(0.0, 0.01, depthV);
  vec3 foamCol = 0.8 * (uSunColor * uSunIntensity * (max(dot(N, uSunDir), 0.0) * 0.8 + 0.2) * 0.3 + mix(uSkyHorizon, uSkyZenith, 0.5) * 1.1);
  col = mix(col, foamCol, clamp(foam, 0.0, 1.0));

  // soft banks: the film over open banks shows the ground, darkened where it is wet
  // (a damp margin a hand's width wide, slightly broken up)
  vec3 sceneRaw = texture2D(tSceneColor, suv).rgb;
  float wet = (1.0 - smoothstep(0.0, 0.03, depthV)) * (0.75 + 0.25 * f2.b) * smoothstep(0.0, 0.3, vEdge);
  sceneRaw *= mix(1.0, 0.62, wet * smoothstep(0.0, 0.004, depthV + 0.004 * f1.a));
  col = mix(sceneRaw, col, smoothstep(0.0, 0.035, depthV));
  gl_FragColor = vec4(max(lagoonAtmosphere(col, vWorld), vec3(0.0)), 1.0);
}
`,O=`
attribute vec4 aSheet;
attribute vec2 aFx;
varying vec3 vWorld;
varying vec3 vN;
varying vec2 vUv;
varying vec4 vSheet;
varying vec2 vFx;
varying float vViewZ;
uniform float uTime;
void main() {
  vec3 p = position;
  float t = uv.y;
  float spray = step(2.5, aSheet.w);
  // flutter grows as the sheet falls (thin water never hangs perfectly still);
  // the spray envelope billows more
  float fl = sin(uTime * 6.3 + uv.x * 17.0 + t * 11.0) + 0.6 * sin(uTime * 9.7 - uv.x * 29.0 + t * 7.0);
  fl += spray * 1.6 * sin(uTime * 2.1 + uv.x * 7.0 - t * 3.0);
  p += normal * fl * (0.025 + 0.02 * spray) * t;
  vec4 w = modelMatrix * vec4(p, 1.0);
  vWorld = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  vUv = uv;
  vSheet = aSheet;
  vFx = aFx;
  vec4 mv = viewMatrix * w;
  vViewZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,k=`
#include <common>
#include <lagoon_common>
#include <lagoon_depth>
${m}
uniform sampler2D tWFoam;
uniform float uFxInReflection;
varying vec3 vWorld;
varying vec3 vN;
varying vec2 vUv;
varying vec4 vSheet;
varying vec2 vFx;
varying float vViewZ;

void main() {
  float t = vUv.y;
  float u = vUv.x;
  float airborne = vSheet.y;
  float width = vSheet.z;
  float layerId = vSheet.w;
  float ribbon = vFx.x;
  float fallen = vFx.y;
  if (vWorld.y < uWaterLevel - 0.05) discard;
  float isCore = 1.0 - step(0.5, layerId);
  float isSpray = step(2.5, layerId);

  // ---- layered streaks, advected with the water. Rows are fall time, so every
  // feature stretches as the water accelerates (short blobs at the brink, long
  // streaks lower down) and all of them move at the true local speed.
  float xm = (u - 0.5) * width;          // metres across
  float flow = t - uTime;                // advected coordinate
  float lid = layerId * 0.371;
  float ropes = texture2D(tWFoam, vec2(xm * 0.17 + lid, flow * 0.36)).g;          // broad ropes
  float fine  = texture2D(tWFoam, vec2(xm * 0.47 + 0.31 + lid, flow * 0.86)).g;   // streaks
  float hair  = texture2D(tWFoam, vec2(xm * 1.35 + 0.63, flow * 1.65 + lid)).g;   // hairlines
  float lumps = texture2D(tWFoam, vec2(xm * 0.38 + 0.17 + lid, flow * 2.0)).r;    // aerated clumps
  vec4 brk    = texture2D(tWFoam, vec2(xm * 0.29 + 0.5, flow * 0.5 + lid * 0.5)); // breakup / mask
  float streak = smoothstep(0.12, 0.62, ropes * 0.55 + fine * 0.42 + hair * 0.26 + (brk.a - 0.5) * 0.25);

  // ---- aeration: a glassy tongue rolls over the brink and whitens within ~0.5 s
  // (along the streaks first); sliding water and cascade ribbons are white at once
  float aer = smoothstep(0.03, 0.5, t + (streak - 0.5) * 0.22);
  aer = max(aer, 1.0 - airborne);
  aer = max(aer, ribbon * smoothstep(0.0, 0.18, t));

  // ---- frayed, translucent edges: a band that widens with the fall, where the
  // sheet tears into separate strands (hairline noise), plus a hard outer limit
  float e = abs(u - 0.5) * 2.0;
  float fray = mix(0.1, 0.42, smoothstep(0.0, 1.3, t)) * mix(1.0, 0.7, ribbon);
  float zf = clamp((e - (1.0 - fray)) / max(fray, 1e-3), 0.0, 1.0);
  float strandN = hair * 0.55 + fine * 0.35 + brk.b * 0.35;
  float edgeMask = smoothstep(zf * 0.75 - 0.05, zf * 0.75 + 0.18, strandN) * (1.0 - smoothstep(0.97, 1.0, e));

  // ---- opacity: glass at the brink, dense white streaks with translucent gaps below
  float alpha = mix(0.7, mix(0.5, 0.97, streak) * (0.86 + 0.22 * lumps), aer);
  // lower down the curtain breaks into fingers and falling clumps
  float brkT = smoothstep(0.55, 1.5, t) * (1.0 - 0.6 * ribbon);
  float fingers = smoothstep(0.22, 0.6, ropes * 0.55 + lumps * 0.45 + brk.g * 0.3);
  alpha *= mix(1.0, 0.45 + 0.55 * fingers, brkT);
  alpha *= edgeMask;
  // veils: sparse misty streak layers that give the curtain its thickness
  if (layerId > 0.5 && layerId < 2.5) {
    alpha *= 0.42 * smoothstep(0.25, 0.75, streak * 0.7 + lumps * 0.5) * smoothstep(0.08, 0.45, t);
  }
  // spray envelope: soft billowing mist hugging the lower curtain
  if (isSpray > 0.5) {
    float cloud = smoothstep(0.3, 0.85, brk.a * 0.75 + lumps * 0.35 + ropes * 0.2);
    alpha = mix(0.18, 0.3, smoothstep(0.8, 1.6, t)) * cloud * smoothstep(0.25, 1.1, t) * (1.0 - smoothstep(0.55, 1.0, e));
  }

  // soft contact with rock and pool (skipped in the mirror pass: its depth is not ours)
  if (uFxInReflection < 0.5) {
    vec2 suv = gl_FragCoord.xy / uResolution;
    float sceneZ = lagoonLinearDepth(texture2D(tSceneDepth, suv).r);
    alpha *= smoothstep(0.0, mix(0.45, 1.2, isSpray), sceneZ - vViewZ);
    // never smear a sheet across the lens
    alpha *= smoothstep(0.3, 1.5, vViewZ);
  }
  // the foot of the curtain disappears into the churn
  alpha *= smoothstep(uWaterLevel - 0.05, uWaterLevel + 0.45 + 0.5 * isSpray, vWorld.y);
  alpha = clamp(alpha, 0.0, 1.0);
  if (alpha < 0.004) discard;

  // ---- lighting: wrap diffuse + strong forward scattering when back-lit
  vec3 N = normalize(vN) * (gl_FrontFacing ? 1.0 : -1.0);
  vec3 V = normalize(cameraPosition - vWorld);
  float sv = mix(0.1, 1.0, lagoonStaticShadowTap(vWorld));
  vec3 sun = uSunColor * uSunIntensity * sv;
  float NdL = dot(N, uSunDir);
  float wrap = clamp((NdL + 0.5) / 1.5, 0.0, 1.0);
  float back = max(dot(-V, uSunDir), 0.0);
  float b2 = back * back; float b4 = b2 * b2; float b8 = b4 * b4;
  // sky light on the (mostly vertical) sheet: the rough-convolved environment seen
  // by a surface tilted up a little (half the sky + the bright horizon). The sheet
  // is translucent, so its underside (the tongue curling over the brink, seen from
  // below) is lit through the water by the same sky, not by the ground under it.
  vec3 Nl = vec3(N.x, abs(N.y), N.z);
  vec3 sky = wSky(normalize(Nl + vec3(0.0, 0.7, 0.0)), 1.0) * 1.25;
  // dense streaks are brighter; the gaps between them are thinner, slightly darker water
  float dens = mix(0.62, 1.12, streak) * (0.8 + 0.4 * lumps * aer);
  vec3 white = (sun * (wrap * 0.34 + b8 * 0.6 + b2 * 0.06) + sky * 0.85) * dens;
  // aqua tint in the thinner, less aerated water between the white streaks
  vec3 aqua = vec3(0.6, 0.88, 0.86);
  vec3 foamy = white * mix(aqua, vec3(1.0), 0.3 + 0.7 * max(streak, isSpray));
  // glassy tongue: reflects the sky with a sun sheen, tinted by the water body
  vec3 R = reflect(-V, N);
  float NdV = max(dot(N, V), 0.0);
  float F = 0.0204 + 0.9796 * wPow5(1.0 - NdV);
  vec3 glass = mix(vec3(0.05, 0.16, 0.15) * (sky * 0.6 + sun * 0.08), wSky(R, 0.08), 0.25 + 0.75 * F);
  vec3 Hh = normalize(uSunDir + V);
  float NdH = max(dot(N, Hh), 0.0);
  float a2 = 0.02;
  float dd = NdH * NdH * (a2 - 1.0) + 1.0;
  glass += sun * min(a2 / (3.14159 * dd * dd) * F / max(4.0 * NdV, 0.2), 20.0) * max(NdL, 0.0);
  vec3 col = mix(glass, foamy, aer);
  col = lagoonAtmosphere(col, vWorld);
  gl_FragColor = vec4(max(col, vec3(0.0)), alpha);
}
`;function A(e,t,n){for(let r=0;r<12;r+=.05)if(e.groundHeight(t.x+t.tx*r,t.z+t.tz*r)<n)return r;return 6}function j(e,t,n,r=2,i=1.05){let a=n.y-.25,o=[],s=0,c=n.y,l=i;for(let i=1;i<=r;i++){let u=a*(1-i/(r+1))+.25*(i/(r+1)),d=A(e,n,u),f=Math.sqrt(2*Math.max(.1,c-u)/9.81),p=Math.max(d,s+l*f),m=Math.max(d+1+.3*i,p+1);o.push({a0:d-1.6,a1:m,y:u,w:t.width*1.9+.6*i,t:1.3+.3*i}),s=m,c=u,l=1.6}return o}function M(e,t){let n=-t.tz,r=t.tx;return(i,a)=>{let o=i-t.x,s=a-t.z,c=o*t.tx+s*t.tz,l=o*n+s*r,u=-1e9;for(let t of e)if(c>=t.a0&&c<=t.a1-.05&&Math.abs(l)<=t.w*.5-.3){let e=Math.max(0,(c-t.a0)/(t.a1-t.a0)-.7)/.3;u=Math.max(u,t.y-e*e*.22)}return u}}function N(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function P(e,r,i=7){let a=new f(i),o=-r.tz,s=r.tx,u=[],d=[],m=[],h=[];for(let i of e){let e=new n(1,1,1,10,5,14);e.deleteAttribute(`normal`),e.deleteAttribute(`uv`);let c=p(e,1e-4);e.dispose(),c.setAttribute(`uv`,new t(new Float32Array(c.attributes.position.count*2),2));let f=c.attributes.position,g=new l;for(let e=0;e<f.count;e++){g.fromBufferAttribute(f,e);let t=g.x+.5,n=g.y+.5,c=g.z,l=Math.abs(c)*2,u=a.noise3(c*4.2+i.y,i.y*.7,3.1)*.5+a.noise3(c*11,i.y,7.7)*.2,d=(1-.42*N(.5,1,l))*(1+u*.35*N(.3,.75,l)),p=i.a0+(i.a1-i.a0)*t*(.55+.45*n)*d,m=i.y-i.t*(1-n),h=Math.max(0,t-.7)/.3;m-=h*h*.22*n;let _=c*i.w*(.9+.1*n),v=r.x+r.tx*p+o*_,y=r.z+r.tz*p+s*_,b=a.noise3(v*.45,m*.9,y*.45),x=a.noise3(v*1.7+11,m*1.7,y*1.7),S=n>.99?.25:1,C=Math.sin(m*9+b*2)*.035,w=(b*.16+x*.05+C)*S;v+=r.tx*w*1.2+o*w*.5,y+=r.tz*w*1.2+s*w*.5,m+=n>.99?x*.04:w*.6,f.setXYZ(e,v,m,y)}c.computeVertexNormals();let _=c.attributes.normal,v=c.attributes.uv;for(let e=0;e<f.count;e++){let t=Math.abs(_.getX(e)),n=Math.abs(_.getY(e)),r=Math.abs(_.getZ(e)),i=f.getX(e),a=f.getY(e),o=f.getZ(e);n>=t&&n>=r?v.setXY(e,i,o):t>=r?v.setXY(e,o,a):v.setXY(e,i,a)}let y=u.length/3;u.push(...f.array),d.push(..._.array),m.push(...v.array);for(let e of c.index.array)h.push(y+e);c.dispose()}let g=new c;return g.setAttribute(`position`,new t(u,3)),g.setAttribute(`normal`,new t(d,3)),g.setAttribute(`uv`,new t(m,2)),g.setIndex(h),g.computeBoundingSphere(),g}var F=`
attribute vec3 aOrigin;
attribute vec4 aSeed;   // phase, angle, radius, rotation
attribute vec4 aConf;   // disc radius, life (s), size start, size end
attribute vec4 aMove;   // outward burst speed, initial up speed, gravity, wind drift factor
attribute vec3 aLine;   // spawn line direction x, z, half-length (m)
attribute float aAlpha;
uniform float uTime;
uniform vec2 uMistWind;
uniform float uMistWindStrength;
varying vec2 vQ;
varying float vAlpha;
varying vec3 vWorld;
varying float vViewZ;
varying float vSeed;
void main() {
  float life = aConf.y;
  float cyc = (uTime + aSeed.x * life) / life;
  float k = floor(cyc);
  float t = cyc - k;
  float age = t * life;
  float ang = aSeed.y * 6.2831853 + k * 2.3999632;
  float rr = sqrt(fract(aSeed.z + k * 0.6180339)) * aConf.x;
  float lu = fract(aSeed.w * 3.17 + k * 0.4142136) * 2.0 - 1.0;
  vec2 od = vec2(cos(ang), sin(ang));
  vec3 p = aOrigin + vec3(od.x * rr + aLine.x * lu * aLine.z, 0.0, od.y * rr + aLine.y * lu * aLine.z);
  p.xz += od * aMove.x * (1.0 - exp(-age * 1.6)) / 1.6;
  p.y += aMove.y * age - 0.5 * aMove.z * age * age;
  p.xz += uMistWind * uMistWindStrength * aMove.w * age;
  p.y = max(p.y, aOrigin.y - 0.2);
  float size = mix(aConf.z, aConf.w, sqrt(t));
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  float rot = aSeed.w * 6.2831853 + age * 0.25;
  float cr = cos(rot), sr = sin(rot);
  vec2 q = position.xy;
  vec2 qr = vec2(q.x * cr - q.y * sr, q.x * sr + q.y * cr);
  vec3 wp = p + (right * qr.x + up * qr.y) * size;
  vQ = q;
  vAlpha = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.4, 1.0, t)) * aAlpha;
  vSeed = fract(aSeed.w * 7.13 + k * 0.37);
  vWorld = wp;
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  vViewZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,I=`
#include <common>
#include <lagoon_common>
#include <lagoon_depth>
uniform sampler2D tMistNoise;
uniform float uMistRainbow;
varying vec2 vQ;
varying float vAlpha;
varying vec3 vWorld;
varying float vViewZ;
varying float vSeed;

float mistHG(float c, float g) {
  float den = max(1.0 + g * g - 2.0 * g * c, 1e-3);
  return (1.0 - g * g) / (12.566 * den * sqrt(den));
}

// Spectral bands of a water-drop rainbow at deviation angle th (degrees from the
// antisolar point): primary 40.6 (violet) - 42.3 (red), secondary 50.4 - 53.4 reversed.
vec3 mistRainbow(float th) {
  float t1 = (th - 40.3) / 2.3;                 // 0 violet .. 1 red
  vec3 b1 = vec3(exp(-pow2((t1 - 0.9) / 0.2)), exp(-pow2((t1 - 0.55) / 0.2)), exp(-pow2((t1 - 0.15) / 0.2)));
  float t2 = (53.6 - th) / 3.2;                 // reversed order, wider, fainter
  vec3 b2 = vec3(exp(-pow2((t2 - 0.9) / 0.22)), exp(-pow2((t2 - 0.55) / 0.22)), exp(-pow2((t2 - 0.15) / 0.22)));
  // the sky inside the primary bow is brighter (Alexander's band outside it is dark)
  float inside = (1.0 - smoothstep(38.0, 41.0, th)) * 0.12;
  return b1 + b2 * 0.35 + vec3(inside);
}

void main() {
  float r = length(vQ);
  if (r > 1.0 || vAlpha < 0.002) discard;
  vec4 n = texture2D(tMistNoise, vQ * 0.22 + vec2(vSeed, vSeed * 1.7));
  float a = 1.0 - smoothstep(0.05, 1.0, r);
  a *= a;
  a *= 0.45 + 0.9 * n.a * (0.6 + 0.4 * n.b);
  vec2 suv = gl_FragCoord.xy / uResolution;
  float sceneZ = lagoonLinearDepth(texture2D(tSceneDepth, suv).r);
  a *= smoothstep(0.0, 1.4, sceneZ - vViewZ);   // soft particles
  a *= smoothstep(0.4, 3.0, vViewZ);            // never smear across the lens
  a *= vAlpha;
  if (a < 0.002) discard;
  vec3 V = normalize(vWorld - cameraPosition);
  float c = dot(V, uSunDir);
  float sv = mix(0.12, 1.0, lagoonStaticShadowTap(vWorld));
  float hg = 0.55 * mistHG(c, 0.82) + 0.45 * mistHG(c, 0.25);
  vec3 sky = mix(uSkyHorizon, uSkyZenith, 0.6) * 1.6;
  vec3 sun = uSunColor * uSunIntensity * sv;
  vec3 col = sun * (hg * 0.85 + 0.018) + sky * 0.62;
  // rainbow (sun behind the viewer): deviation from the antisolar point
  float th = degrees(acos(clamp(-c, -1.0, 1.0)));
  if (th > 36.0 && th < 56.0) col += sun * mistRainbow(th) * (0.022 * uMistRainbow);
  col = lagoonAtmosphere(col, vWorld);
  gl_FragColor = vec4(max(col, vec3(0.0)), a);
}
`;function L(n,r,c,f=1){let{G:p,pipeline:m,LAYERS:h}=n,g=d(4441),_=r.map(e=>Math.max(1,Math.round(e.count*f))),v=1/Math.sqrt(Math.max(.25,f)),y=_.reduce((e,t)=>e+t,0),b=new i;b.setAttribute(`position`,new t([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),b.setIndex([0,1,2,0,2,3]);let x=new Float32Array(y*3),S=new Float32Array(y*4),C=new Float32Array(y*3),w=new Float32Array(y*4),T=new Float32Array(y*4),E=new Float32Array(y),D=0,O=1e9,k=1e9,A=1e9,j=-1e9,M=-1e9,N=-1e9;r.forEach((e,t)=>{let n=Math.hypot(e.ax??1,e.az??0)||1,r=(e.ax??1)/n,i=(e.az??0)/n,a=Math.max(0,e.half??0);for(let n=0;n<_[t];n++,D++){x.set([e.x,e.y,e.z],D*3),S.set([g(),g(),g(),g()],D*4),C.set([r,i,a],D*3);let t=.75+.5*g();w.set([e.r,e.life*t,e.size0*(.7+.6*g()),e.size1*(.7+.6*g())],D*4),T.set([e.burst*(.5+g()),e.up*(.6+.8*g()),e.grav,e.drift*(.6+.8*g())],D*4),E[D]=Math.min(1,e.alpha*v*(.6+.8*g()))}let o=e.r+a+e.burst+e.size1+e.drift*e.life*1.5+2;O=Math.min(O,e.x-o),j=Math.max(j,e.x+o),A=Math.min(A,e.z-o),N=Math.max(N,e.z+o),k=Math.min(k,e.y-1),M=Math.max(M,e.y+e.up*e.life+e.size1+2)}),b.setAttribute(`aOrigin`,new s(x,3)),b.setAttribute(`aSeed`,new s(S,4)),b.setAttribute(`aConf`,new s(w,4)),b.setAttribute(`aMove`,new s(T,4)),b.setAttribute(`aLine`,new s(C,3)),b.setAttribute(`aAlpha`,new s(E,1)),b.instanceCount=y,b.boundingBox=new e(new l(O,k,A),new l(j,M,N)),b.boundingSphere=b.boundingBox.getBoundingSphere(new o);let P=new u({name:`waterfallMist`,uniforms:{...p,...m.uniforms,tMistNoise:{value:c},uMistWind:p.uWindDir,uMistWindStrength:p.uWindStrength,uMistRainbow:{value:1}},vertexShader:F,fragmentShader:I,transparent:!0,depthWrite:!1,depthTest:!0,blending:1});P.userData.noPatch=!0;let L=new a(b,P);return L.name=`waterfall-mist`,L.layers.set(h.FX),L.renderOrder=20,L.userData.particles=y,L}var R={mainFalls:{v0:3.4,depth:.3,cols:28,dt:.05,maxT:2.8,widthK:1.12},cascade:{v0:1.05,depth:.22,cols:14,dt:.05,maxT:4.5,splay0:.1}},z=[{id:2,offset:-.14,widen:.06},{id:0,offset:0,widen:0},{id:1,offset:.2,widen:.16},{id:3,offset:.55,widen:.34,spray:!0}],B=[{id:2,offset:-.08,widen:.05},{id:0,offset:0,widen:0},{id:1,offset:.12,widen:.14}];async function V(e){let{scene:t,hf:n,layout:i,G:o,LAYERS:s,pipeline:c,registry:l,tex:d,mats:f}=e,p=l.get(`water`);if(!p||!p.uniforms)throw Error(`waterfalls: water module missing`);let m=d.extraTex(`waterFoam`),h=l.get(`rocks`),g=h?.raycastDown?(e,t)=>h.raycastDown(e,t)??-1e9:null,_=[],v=[];for(let t of i.WATERFALLS){let r={...R[t.id]??{v0:2,depth:.25,cols:16,dt:.05,maxT:2.4}};r.widthK&&(r.width=t.width*r.widthK);let i=x(n,t,{...r,support:g});if(t.stepped){let e=j(n,t,i.lip,2,r.v0),a=e.filter(e=>!g||[.3,.7,.95].every(t=>{let n=e.a0+(e.a1-e.a0)*t;return g(i.lip.x+i.lip.tx*n,i.lip.z+i.lip.tz*n)<e.y-.3})),o=M(a,i.lip);i=x(n,t,{...r,support:g?(e,t)=>Math.max(o(e,t),g(e,t)):o}),i.ledges=a,i.plannedLedges=e.map(e=>[+e.a0.toFixed(2),+e.a1.toFixed(2),+e.y.toFixed(2)]),a.length&&v.push({ledges:a,lip:i.lip})}i.id=t.id,i.wf=t,i.kind=+!!t.stepped,i.layers=t.stepped?B:z,_.push(i),await e.yieldFrame()}e.progress?.(.4,`Pouring the falls`);let y=p.uniforms,b=p.material.defines,S=C(n,_),w=new u({name:`waterfallStream`,uniforms:{...o,...c.uniforms,...y,tWWaveA:{value:p.textures.waveA},tWWaveB:{value:p.textures.waveB},tWFoam:{value:m}},defines:{...b},vertexShader:E,fragmentShader:D,side:0});w.userData.noPatch=!0;let A=new a(S,w);A.name=`waterfall-streams`,A.layers.set(s.WATER),A.renderOrder=1,t.add(A);let N=T(_,z),F={...o,...c.uniforms,...y,tWFoam:{value:m},uFxInReflection:{value:0}},I=new u({name:`waterfallSheet`,uniforms:F,defines:{...b},vertexShader:O,fragmentShader:k,transparent:!0,depthWrite:!1,depthTest:!0,side:2,blending:1});I.userData.noPatch=!0;let V=new a(N,I);V.name=`waterfall-sheets`,V.layers.set(s.FX),V.layers.enable(p.REFLECT_EXTRA_LAYER),V.renderOrder=10;let G=p.reflection.camera;V.onBeforeRender=(e,t,n)=>{F.uFxInReflection.value=+(n===G)},t.add(V);let K=null;if(v.length){let e=v.map((e,t)=>P(e.ledges,e.lip,31+t)),n=e.length===1?e[0]:W(e),i=f.create(`cliff`,{color:new r(.8,.69,.57)});K=new a(n,i),K.name=`waterfall-ledges`,K.castShadow=!0,K.receiveShadow=!0,t.add(K)}p.setImpacts(_.map(e=>({x:e.impact.x,z:e.impact.z,r:e.sheet.width*(e.wf.stepped?.8:.55),strength:e.wf.stepped?.7:1,ax:-e.lip.tz,az:e.lip.tx,half:Math.max(0,(e.impact.r-1)/1.2)*.8})));let q=[];for(let e of _){let t=e.wf.stepped?.55:1,n=e.impact.x,r=e.impact.z,i={ax:-e.lip.tz,az:e.lip.tx,half:Math.max(0,(e.impact.r-1)/1.2)*.75},a=e.impact.r;q.push({x:n,y:.15,z:r,r:a*.45,count:Math.round(90*t),life:6,size0:.8*t+.3,size1:3.4*t+.6,up:.7,grav:.04,burst:1.5*t,drift:1,alpha:.024,...i}),q.push({x:n,y:.1,z:r,r:a*.3,count:Math.round(150*t),life:1.4,size0:.1,size1:.35*t+.15,up:3.6*t+.9,grav:5,burst:2.3*t,drift:.3,alpha:.2,...i}),q.push({x:n,y:.05,z:r,r:a*.35,count:Math.round(120*t),life:.9,size0:.25,size1:.6*t+.3,up:.55,grav:1.2,burst:1.3*t,drift:.15,alpha:.2,...i}),q.push({x:n,y:.1,z:r,r:a*.3,count:Math.round(90*t),life:2.2,size0:.5*t+.15,size1:1.9*t+.4,up:1.3*t+.3,grav:.5,burst:1.1*t,drift:.5,alpha:.11,...i}),q.push({x:n,y:.6,z:r,r:a*.4,count:Math.round(30*t),life:8,size0:1.4*t+.4,size1:4.6*t+.8,up:.9,grav:0,burst:.8,drift:1.3,alpha:.012,...i});let o=U(e,.75);if(q.push({x:o.x,y:o.y*.5,z:o.z,r:e.sheet.width*.45,count:Math.round(26*t),life:4,size0:1*t,size1:2.4*t,up:.25,grav:0,burst:.4,drift:1,alpha:.032}),e.ledges)for(let t of e.ledges){let n=e.lip.x+e.lip.tx*(t.a1-.6),r=e.lip.z+e.lip.tz*(t.a1-.6);q.push({x:n,y:t.y+.1,z:r,r:.5,count:18,life:1.2,size0:.15,size1:.6,up:1.4,grav:3,burst:.9,drift:.3,alpha:.18,ax:i.ax,az:i.az,half:e.sheet.width*.3})}}let J=e.quality??{},Y=L(e,q,m,J.cinematic?1.4:Math.max(.5,Math.min(1,J.waterDetail??1)));return t.add(Y),e.progress?.(1,`Pouring the falls`),window.__lagoon&&(window.__lagoon.waterfalls=H(_,g,n)),{falls:_,streamMesh:A,sheetMesh:V,ledgeMesh:K,mist:Y,update(){let e=p.material.defines;e.CUBEUV_TEXEL_HEIGHT!==w.defines.CUBEUV_TEXEL_HEIGHT&&(w.defines={...e},w.needsUpdate=!0,I.defines={...e},I.needsUpdate=!0)}}}function H(e,t,n){return e.map(e=>{let r=e.sheet,i=Math.floor(r.cols/2),a=[],o=[];for(let e=0;e<r.rows;e+=2){let t=(i*r.rows+e)*3;a.push([+r.pos[t].toFixed(2),+r.pos[t+1].toFixed(2),+r.pos[t+2].toFixed(2),r.air[i*r.rows+e]])}for(let r=-1;r<=8;r+=.5){let i=e.lip.x+e.lip.tx*r,a=e.lip.z+e.lip.tz*r;o.push([+r.toFixed(1),+n.groundHeight(i,a).toFixed(2),t?+t(i,a).toFixed(2):null])}let s=e.stream.filter((e,t)=>t%4==0).map(e=>[+e.s.toFixed(1),+e.y.toFixed(2),+e.bed.toFixed(2),+n.groundHeight(e.x,e.z).toFixed(2),+(e.halfL+e.halfR).toFixed(1)]),c=(e.ledges??[]).map(e=>({a0:+e.a0.toFixed(2),a1:+e.a1.toFixed(2),y:+e.y.toFixed(2),w:+e.w.toFixed(2)}));return{id:e.id,lip:e.lip,width:r.width,impact:e.impact,path:a,probe:o,stream:s,ledges:c,planned:e.plannedLedges}})}function U(e,t){let n=e.sheet,r=Math.floor(n.cols/2),i=Math.min(n.rows-1,Math.round(t/n.dt)),a=(r*n.rows+i)*3;return{x:n.pos[a],y:Math.max(.5,n.pos[a+1]),z:n.pos[a+2]}}function W(e){let n=[],r=[],i=[],a=[];for(let t of e){let e=n.length/3;n.push(...t.attributes.position.array),r.push(...t.attributes.normal.array),i.push(...t.attributes.uv.array);for(let n of t.index.array)a.push(e+n)}let o=new c;return o.setAttribute(`position`,new t(n,3)),o.setAttribute(`normal`,new t(r,3)),o.setAttribute(`uv`,new t(i,2)),o.setIndex(a),o.computeBoundingSphere(),o}export{V as build};