const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/sky-CZkINW5K.js","assets/three.core-DtjtRha-.js","assets/three.module-CA589J5f.js","assets/rolldown-runtime-DK3Fl9T5.js","assets/lighting-v5Bxz3fy.js","assets/terrain-hAt8DxJj.js","assets/noise-RmOKhMMB.js","assets/farfield-C_pc_rD2.js","assets/water-gsagbnmh.js","assets/surfaceShader-dsv9JGIz.js","assets/rocks-y8HHw4CK.js","assets/trees-0uhX1FpN.js","assets/architecture-CZpTapAH.js","assets/util-BOJ-hp-d.js","assets/mesher-VCyixKF_.js","assets/palms-q8s8U1Ts.js","assets/vegetation-D1lQB87E.js","assets/waterfalls-DdzTju_6.js","assets/waterfx-DvUq_Vch.js","assets/ambient-CLaPyTDX.js"])))=>i.map(i=>d[i]);
import{t as e}from"./rolldown-runtime-DK3Fl9T5.js";import{$n as t,$r as n,A as r,Ar as i,Dr as a,E as o,Gt as s,Hn as c,Ii as l,Ja as u,Lt as d,Nr as f,O as p,Qa as m,Qi as h,Rn as g,Rt as _,U as v,V as y,Wi as b,Wr as x,Yt as S,_r as C,ar as w,bt as T,ct as E,do as D,ea as ee,io as O,ir as k,j as te,jn as A,jr as ne,jt as re,kr as ie,mr as ae,no as j,or as oe,ro as M,ta as se,tr as ce,vt as le,za as ue,zi as de}from"./three.core-DtjtRha-.js";import{i as fe,n as pe,r as me}from"./three.module-CA589J5f.js";import{a as he,c as ge,d as _e,i as ve,l as ye,n as be,o as xe,r as Se,s as Ce,t as we,u as Te}from"./layout-DXlv_L6y.js";import{i as Ee,n as De,o as Oe,s as N,t as ke}from"./noise-RmOKhMMB.js";import{c as Ae,l as je,s as Me}from"./farfield-C_pc_rD2.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var Ne=new URLSearchParams(location.search);function Pe(e,t){let n=Ne.get(e);if(n===null||n===``)return t;let r=parseFloat(n);return Number.isFinite(r)?r:t}function Fe(e){let t=Ne.get(e);return t?t.split(`,`).map(e=>e.trim()).filter(Boolean):null}var P={view:Ne.get(`view`),cam:Fe(`cam`)?.map(parseFloat)??null,fov:Pe(`fov`,null),freeze:Ne.has(`freeze`)?Pe(`freeze`,10):null,only:Fe(`only`),skip:Fe(`skip`)??[],q:Ne.get(`q`),capture:Ne.has(`capture`),fly:Ne.has(`fly`),debug:Ne.has(`debug`),nopost:Ne.has(`nopost`),colliders:Ne.has(`colliders`),raw:Ne,num:Pe,has:e=>Ne.has(e),get:e=>Ne.get(e)},Ie={low:{name:`low`,pixelRatio:1,msaa:0,shadowMapSize:2048,shadowCascades:2,shadowFar:140,textureSize:512,anisotropy:4,foliageDensity:.45,grassDensity:.35,grassDistance:45,scatterDistance:160,reflectionScale:.35,ssao:!1,bloom:!0,sunShafts:!1,lanternLights:4,treeLeafLOD:.6,terrainDetail:.5,waterDetail:.5,cinematic:!1},medium:{name:`medium`,pixelRatio:1.25,msaa:4,shadowMapSize:2048,shadowCascades:3,shadowFar:200,textureSize:1024,anisotropy:8,foliageDensity:.7,grassDensity:.6,grassDistance:70,scatterDistance:240,reflectionScale:.5,ssao:!0,bloom:!0,sunShafts:!0,lanternLights:6,treeLeafLOD:.8,terrainDetail:.75,waterDetail:.75,cinematic:!1},high:{name:`high`,pixelRatio:1.5,msaa:4,shadowMapSize:4096,shadowCascades:3,shadowFar:280,textureSize:1024,anisotropy:12,foliageDensity:1,grassDensity:1,grassDistance:95,scatterDistance:320,reflectionScale:.5,ssao:!0,bloom:!0,sunShafts:!0,lanternLights:8,treeLeafLOD:1,terrainDetail:1,waterDetail:1,cinematic:!1},ultra:{name:`ultra`,pixelRatio:2,msaa:4,shadowMapSize:4096,shadowCascades:4,shadowFar:360,textureSize:2048,anisotropy:16,foliageDensity:1.25,grassDensity:1.4,grassDistance:120,scatterDistance:420,reflectionScale:.75,ssao:!0,bloom:!0,sunShafts:!0,lanternLights:10,treeLeafLOD:1.2,terrainDetail:1,waterDetail:1,cinematic:!1},cinematic:{name:`cinematic`,pixelRatio:2,supersample:1.5,msaa:4,shadowMapSize:8192,shadowCascades:4,shadowFar:420,textureSize:2048,anisotropy:16,foliageDensity:1.5,grassDensity:1.8,grassDistance:160,scatterDistance:520,reflectionScale:1,ssao:!0,bloom:!0,sunShafts:!0,lanternLights:14,treeLeafLOD:1.5,terrainDetail:1,waterDetail:1,cinematic:!0}},Le=[`low`,`medium`,`high`,`ultra`,`cinematic`],Re={auto:{label:`Auto`,note:`Matched to your graphics card. Recommended.`},low:{label:`Low`,note:`Lightest. Short grass range, simple shadows, no ambient occlusion. Integrated graphics and older laptops.`},medium:{label:`Medium`,note:`Balanced. Moderate foliage and grass, three shadow cascades. Most integrated and entry GPUs.`},high:{label:`High`,note:`The full village with 4K shadows. Typical discrete GPUs.`},ultra:{label:`Ultra`,note:`Denser foliage and grass, 2K textures, sharper reflections. RTX 3060 / RX 6600 class and up.`},cinematic:{label:`Cinematic`,note:`Supersampled, 8K shadows, densest grass and foliage. Heavy: RTX 4080 class. Slower to load.`}},ze=`lagoon.quality.v1`,Be=`lagoon.renderScale.v1`,Ve=.75,He=1.5,Ue=()=>!P.capture&&!P.has(`playertest`);function We(){try{let e=localStorage.getItem(ze);return e&&Ie[e]?e:`auto`}catch{return`auto`}}function Ge(e){try{return!e||e===`auto`||!Ie[e]?localStorage.removeItem(ze):localStorage.setItem(ze,e),!0}catch{return!1}}function Ke(e){let t=Number(e);return Number.isFinite(t)?Math.min(He,Math.max(Ve,t)):1}function qe(){if(!Ue())return 1;try{let e=localStorage.getItem(Be);return e===null?1:Ke(parseFloat(e))}catch{return 1}}function Je(e){try{let t=Ke(e);return Math.abs(t-1)<.001?localStorage.removeItem(Be):localStorage.setItem(Be,String(Math.round(t*100)/100)),!0}catch{return!1}}function Ye(e){let t=``,n=``;try{let r=e.getExtension(`WEBGL_debug_renderer_info`);r&&(t=String(e.getParameter(r.UNMASKED_VENDOR_WEBGL)||``),n=String(e.getParameter(r.UNMASKED_RENDERER_WEBGL)||``)),n||=(t=String(e.getParameter(e.VENDOR)||``),String(e.getParameter(e.RENDERER)||``))}catch{}let r=n.replace(/ANGLE \w+ Renderer:\s*/i,``),i=r.match(/^ANGLE \((?:[^,]*),\s*([^,]+?)(?:\s*\(0x[0-9a-f]+\))?(?:\s+Direct3D.*|\s+OpenGL.*|\s+Vulkan.*|\s+Metal.*)?,/i),a=(i?i[1]:r).replace(/\s+/g,` `).trim();return{vendor:t,renderer:n,name:a}}function Xe(e){let t=String(e||``).trim();return t?(t=t.replace(/\(R\)|\(TM\)|®|™/gi,``).replace(/^(NVIDIA|AMD|ATI|Intel)\s+/i,``).replace(/^(GeForce|Radeon(?!\s*(?:Graphics|\d+M)\b))\s+/i,``).replace(/\s+(GPU|Graphics Processor)$/i,``).replace(/\s+Laptop$/i,` Laptop`).replace(/\s+/g,` `).trim(),t.length>34?t.slice(0,33)+`…`:t):``}function Ze(e){let t=`${e?.name||``} ${e?.renderer||``}`.toLowerCase();if(!t.trim())return{tier:`high`,reason:`unknown gpu`};if(/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/.test(t))return{tier:`low`,reason:`software rasteriser`};if(/mali|adreno|powervr|apple a\d|videocore|tegra|immortalis|xclipse/.test(t))return{tier:`low`,reason:`mobile gpu`};let n=t.match(/rtx\s*(?:a)?\s*(\d{4})/);if(/rtx\s*a\d{4}|quadro rtx|rtx \d{4} ada|rtx pro/.test(t))return{tier:`ultra`,reason:`nvidia workstation rtx`};if(n){let e=+n[1],t=Math.floor(e/1e3),r=e%1e3;return t>=3&&r>=60?{tier:`ultra`,reason:`nvidia rtx ${e}`}:{tier:`high`,reason:`nvidia rtx ${e}`}}if(/titan/.test(t))return{tier:`high`,reason:`nvidia titan`};if(n=t.match(/gtx\s*(\d{3,4})/),n){let e=+n[1];return e>=1070||e===980||e===1660?{tier:`high`,reason:`nvidia gtx ${e}`}:{tier:`medium`,reason:`nvidia gtx ${e}`}}if(/\bmx\s*\d{3}|geforce \d{3}m|nvs /.test(t))return{tier:`medium`,reason:`nvidia entry`};if(n=t.match(/rx\s*(\d{4})\s*(xtx|xt|gre)?/),n){let e=+n[1];return e>=9e3||e>=6600&&e<7e3||e>=7600&&e<8e3?{tier:`ultra`,reason:`radeon rx ${e}`}:e>=5500||e>=6400&&e<6600||e>=7e3&&e<7600?{tier:`high`,reason:`radeon rx ${e}`}:{tier:`medium`,reason:`radeon rx ${e}`}}return/rx\s*(vega|5[678]0)|radeon pro w\d|radeon vii/.test(t)?{tier:`high`,reason:`radeon discrete`}:/radeon.*(890m|880m|8060s|8050s|780m)/.test(t)?{tier:`high`,reason:`radeon strong apu`}:/radeon/.test(t)?{tier:`medium`,reason:`radeon integrated`}:/arc(?:\(tm\))?\s*(a7|a5|b5|b7)\d\d/.test(t)?{tier:`high`,reason:`intel arc`}:/intel.*\b(hd graphics|uhd graphics \d{3})\b/.test(t)&&!/xe|arc/.test(t)?{tier:`low`,reason:`intel uhd/hd`}:/arc|iris xe|iris\(r\) xe|intel.*graphics|uhd|iris/.test(t)?{tier:`medium`,reason:`intel integrated`}:/apple m\d+\s*(pro|max|ultra)/.test(t)?{tier:`ultra`,reason:`apple m pro/max`}:/apple m\d+/.test(t)?{tier:`high`,reason:`apple m`}:/apple/.test(t)?{tier:`high`,reason:`apple gpu (masked)`}:{tier:`high`,reason:`unrecognised discrete`}}function Qe(e){if(matchMedia(`(pointer: coarse)`).matches&&!matchMedia(`(any-pointer: fine)`).matches)return{tier:`low`,reason:`touch device`};let t=Ze(e),n=navigator.deviceMemory;return n&&n<=4&&(t.tier===`high`||t.tier===`ultra`)?{tier:`medium`,reason:t.reason+`, low device memory`}:t}function $e(e=null){let t=Qe(e),n=P.q&&Ie[P.q]?P.q:null,r=P.q===`auto`,i=!n&&!r&&Ue()?We():`auto`,a=n??(i===`auto`?null:i),o=a??t.tier,s={...Ie[o]};s.rank=Le.indexOf(o),s.atLeast=e=>s.rank>=Le.indexOf(e),s.choice=n??i,s.auto={tier:t.tier,reason:t.reason,forced:!!a,source:n?`url`:a?`saved`:`auto`,gpu:e?.name??``,gpuShort:Xe(e?.name??``)};let c=window.devicePixelRatio||1;return s.pixelRatio=Math.min(s.pixelRatio,Math.max(c,1)*(s.supersample??1)),s.supersample>1||(s.pixelRatio=Math.min(s.pixelRatio,c)),P.capture&&(s.pixelRatio=1),s}var et={OPAQUE:0,WATER:1,FX:2,NO_REFLECT:3,COLLIDER:4,REFLECT_EXTRA:5},tt=_e(),nt=()=>new k;function rt(e=`shadowDefault`){let t=new T(1,1,m);return t.format=le,t.compareFunction=515,t.minFilter=g,t.magFilter=g,t.generateMipmaps=!1,t.name=e,t.needsUpdate=!0,t}var it=rt(),at=()=>new O,F={uTime:{value:0},uSunDir:{value:new M(tt[0],tt[1],tt[2])},uSunColor:{value:new v(1,.78,.52)},uSunIntensity:{value:37.4},uSkyZenith:{value:new v(.18,.34,.72)},uSkyHorizon:{value:new v(3.2,3.46,2.94)},uWaterLevel:{value:0},uWindDir:{value:new j(.8,.6).normalize()},uWindStrength:{value:.35},uCameraUnderwater:{value:0},uFogDensity:{value:16e-5},uFogHeightFalloff:{value:.0016},uFogColor:{value:new v(2.8,3.4,3.1)},uFogSunColor:{value:new v(14.4,11,6.6)},uFogSunPower:{value:8},uFogChroma:{value:new M(.86,.97,1.17)},tSkyView:{value:null},uSkyViewReady:{value:0},uCausticsStrength:{value:1},uLagoonBounce:{value:new v(.05,.26,.24)},uLagoonBounceStrength:{value:1},uWaterAbsorb:{value:new M(.4,.072,.052)},tLagoonMask:{value:null},uLagoonMaskBounds:{value:new O(-160,-120,320,240)},uLagoonMaskReady:{value:0},tShadowAtlas:{value:it},tShadowStatic:{value:it},uShadowMat:{value:[nt(),nt(),nt()]},uShadowRect:{value:[at(),at(),at()]},uShadowParams:{value:[at(),at(),at()]},uShadowCascades:{value:0},uShadowSplit:{value:new O(1e4,1e4,1e4,0)},uShadowStaticMat:{value:nt()},uShadowStaticParams:{value:at()},uShadowStaticOn:{value:0},tShadowStaticDepth:{value:null},uShadowStaticRange:{value:1e3},uShadowPenumbra:{value:.0052},uShadowDebug:{value:0},uShadowHQ:{value:0},tSkyOcc:{value:null},uSkyOccBounds:{value:at()},uSkyOccDecode:{value:new j(0,1)},uSkyOccParams:{value:new O(1.4,.25,14,.8)},uSkyOccOn:{value:0},uSkyOccBounce:{value:new v(.4,.33,.24)},uCanopyParams:{value:new O(.7,.35,0,0)},uCanopyFill:{value:new v(.17,.25,.09)},tGroundBounce:{value:null},uGroundBounceBounds:{value:at()},uGroundBounceParams:{value:new O(.25,10,0,1.1)},uEnvGround:{value:new v(1.14,.79,.46)},uHazeNear:{value:new j(22e-5,1/45)},uLightDebug:{value:0},uLightFx:{value:new O(1,.4,1,.12)}},ot=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,st=`
uniform float uCamNear;
uniform float uCamFar;
uniform vec4 uProjParams;
const float SKY_DEPTH = 0.9999999;

// non-linear [0,1] depth -> positive view distance along -z (m)
float postLinearZ(float d) {
  float z = d * 2.0 - 1.0;
  return (2.0 * uCamNear * uCamFar) / max(uCamFar + uCamNear - z * (uCamFar - uCamNear), 1e-6);
}
// view-space position from screen uv and positive linear depth
vec3 postViewPos(vec2 uv, float lz) {
  vec2 ndc = uv * 2.0 - 1.0;
  return vec3(lz * (ndc.x + uProjParams.z) / uProjParams.x, lz * (ndc.y + uProjParams.w) / uProjParams.y, -lz);
}
float postLuma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
// PCG integer hash -> [0,1)
float postHash(uvec3 v) {
  uint s = v.x * 1664525u + v.y * 22695477u + v.z * 747796405u + 2891336453u;
  s = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u;
  s = (s >> 22u) ^ s;
  return float(s) * (1.0 / 4294967296.0);
}
`;function ct(e,t,n={}){let r=new D(Math.max(1,e),Math.max(1,t),{type:n.type??1016,format:n.format??1023,depthBuffer:!1,stencilBuffer:!1,minFilter:n.filter??1006,magFilter:n.filter??1006,wrapS:y,wrapT:y,generateMipmaps:!1});return r.texture.name=n.name??`post`,r}function I({uniforms:e={},fragmentShader:t,defines:n={},blending:r=0,name:i=`post`}){let a=new se({name:i,uniforms:e,defines:n,vertexShader:ot,fragmentShader:t,depthTest:!1,depthWrite:!1,blending:r});return a.userData.noPatch=!0,a}var lt={low:0,medium:1,high:2,ultra:3,cinematic:4};function ut(e){return e?e.cinematic?4:lt[e.name]??2:2}function dt(e,t){let n=e.projectionMatrix.elements;return t.set(n[0],n[5],n[8],n[9])}var ft=`
${st}
uniform sampler2D tDepth;
uniform vec2 uFullRes;
varying vec2 vUv;
vec3 posAt(ivec2 p) {
  p = clamp(p, ivec2(0), ivec2(uFullRes) - 1);
  float d = texelFetch(tDepth, p, 0).r;
  return postViewPos((vec2(p) + 0.5) / uFullRes, postLinearZ(d));
}
void main() {
  ivec2 fp = min(ivec2(gl_FragCoord.xy) * AO_SCALE, ivec2(uFullRes) - 1);
  float d = texelFetch(tDepth, fp, 0).r;
  if (d >= SKY_DEPTH) { gl_FragColor = vec4(0.0, 0.0, 1.0, 1e6); return; }
  vec3 P = postViewPos((vec2(fp) + 0.5) / uFullRes, postLinearZ(d));
  vec3 L = posAt(fp - ivec2(1, 0)), R = posAt(fp + ivec2(1, 0));
  vec3 D = posAt(fp - ivec2(0, 1)), U = posAt(fp + ivec2(0, 1));
  ivec2 hi = ivec2(uFullRes) - 1;
  // pick the neighbour on the same surface (smaller depth step); at the screen
  // border only the inner neighbour is valid
  bool useR = fp.x == 0 || (fp.x < hi.x && abs(R.z - P.z) < abs(P.z - L.z));
  bool useU = fp.y == 0 || (fp.y < hi.y && abs(U.z - P.z) < abs(P.z - D.z));
  vec3 dx = useR ? R - P : P - L;
  vec3 dy = useU ? U - P : P - D;
  vec3 n = cross(dx, dy);
  float nl = length(n);
  n = nl > 1e-12 ? n / nl : vec3(0.0, 0.0, 1.0);
  if (dot(n, -P) < 0.0) n = -n;
  gl_FragColor = vec4(n, -P.z);
}`,pt=`
${st}
uniform sampler2D tPrep;
uniform vec2 uHalfRes;        // AO buffer resolution
uniform vec2 uFullRes;
uniform float uRadius;        // world radius (m)
uniform float uMaxPixels;     // max screen radius in AO-buffer pixels
uniform float uPower;
uniform float uThin;          // thin-occluder compensation (0 = off)
uniform vec2 uFade;           // fade start / end distance (m)
varying vec2 vUv;
#define PI 3.14159265
#define HALF_PI 1.5707963
float fastAcos(float x) {
  float ax = abs(x);
  float r = -0.156583 * ax + HALF_PI;
  r *= sqrt(max(1.0 - ax, 0.0));
  return x >= 0.0 ? r : PI - r;
}
vec2 uvOf(vec2 hp) { return (floor(hp) * float(AO_SCALE) + 0.5) / uFullRes; }
vec3 posAt(vec2 hp) {
  hp = clamp(hp, vec2(0.0), uHalfRes - 1.0);
  float z = texelFetch(tPrep, ivec2(hp), 0).a;
  return postViewPos(uvOf(hp), z);
}
// 4x4 ordered patterns (period 4 so the 4x4 blur cancels them exactly)
float bayer4(ivec2 p) {
  int x = p.x & 3, y = p.y & 3;
  int b = ((x ^ y) & 1) * 8 + (y & 1) * 4 + (((x ^ y) >> 1) & 1) * 2 + ((y >> 1) & 1);
  return float(b);
}
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 c = texelFetch(tPrep, ip, 0);
  float z = c.a;
  if (z > uFade.y) { gl_FragColor = vec4(1.0); return; }
  vec3 N = normalize(c.xyz);
  vec2 hp = vec2(ip) + 0.5;
  vec3 P = postViewPos(uvOf(hp), z);
  vec3 V = normalize(-P);
  float pxPerM = uHalfRes.y * uProjParams.y / (2.0 * z);
  float radPx = min(uRadius * pxPerM, uMaxPixels);
  if (radPx < 1.5) { gl_FragColor = vec4(1.0); return; }
  // effective world radius when the screen radius is clamped
  float radW = radPx / pxPerM;
  float falloffRange = 0.62 * radW;
  float falloffMul = -1.0 / falloffRange;
  float falloffAdd = (radW - falloffRange) / falloffRange + 1.0;
  float thinZ = 1.0 + uThin;

  float noiseSlice = (bayer4(ip) + 0.5) / 16.0;
  float noiseStep = (bayer4(ip.yx + ivec2(1, 2)) + 0.5) / 16.0;

  float vis = 0.0;
  for (int s = 0; s < SLICES; s++) {
    float phi = (float(s) + noiseSlice) * PI / float(SLICES);
    vec2 omega = vec2(cos(phi), sin(phi));
    vec3 dirV = vec3(omega, 0.0);
    vec3 orthoDir = dirV - dot(dirV, V) * V;
    vec3 axis = normalize(cross(orthoDir, V));
    vec3 projN = N - axis * dot(N, axis);
    float projNLen = length(projN);
    float signN = dot(orthoDir, projN) >= 0.0 ? 1.0 : -1.0;
    float cosN = clamp(dot(projN, V) / max(projNLen, 1e-5), 0.0, 1.0);
    float n = signN * fastAcos(cosN);
    float low0 = cos(n + HALF_PI);
    float low1 = cos(n - HALF_PI);
    float hc0 = low0, hc1 = low1;
    for (int j = 0; j < STEPS; j++) {
      float t = (float(j) + noiseStep) / float(STEPS);
      t = t * t;
      float off = max(t * radPx, 1.0 + float(j) * 0.5);
      vec2 o = omega * off;
      vec3 d0 = posAt(hp + o) - P;
      vec3 d1 = posAt(hp - o) - P;
      float l0 = length(d0), l1 = length(d1);
      float s0 = dot(d0, V) / max(l0, 1e-4);
      float s1 = dot(d1, V) / max(l1, 1e-4);
      float f0 = length(vec3(d0.xy, d0.z * thinZ));
      float f1 = length(vec3(d1.xy, d1.z * thinZ));
      float w0 = clamp(f0 * falloffMul + falloffAdd, 0.0, 1.0);
      float w1 = clamp(f1 * falloffMul + falloffAdd, 0.0, 1.0);
      hc0 = max(hc0, mix(low0, s0, w0));
      hc1 = max(hc1, mix(low1, s1, w1));
    }
    float h0 = -fastAcos(clamp(hc1, -1.0, 1.0));
    float h1 = fastAcos(clamp(hc0, -1.0, 1.0));
    h0 = n + clamp(h0 - n, -HALF_PI, HALF_PI);
    h1 = n + clamp(h1 - n, -HALF_PI, HALF_PI);
    float sinN = sin(n);
    float ia0 = (cosN + 2.0 * h0 * sinN - cos(2.0 * h0 - n)) * 0.25;
    float ia1 = (cosN + 2.0 * h1 * sinN - cos(2.0 * h1 - n)) * 0.25;
    vis += projNLen * (ia0 + ia1);
  }
  vis = clamp(vis / float(SLICES), 0.0, 1.0);
  vis = exp2(uPower * log2(max(vis, 0.02)));
  vis = mix(vis, 1.0, smoothstep(uFade.x, uFade.y, z));
  gl_FragColor = vec4(vis, 0.0, 0.0, 1.0);
}`,mt=`
${st}
uniform sampler2D tAO;
uniform sampler2D tPrep;
uniform vec2 uHalfRes;
uniform vec2 uFullRes;
varying vec2 vUv;
vec2 uvOf(ivec2 q) { return (vec2(q) * float(AO_SCALE) + 0.5) / uFullRes; }
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 c = texelFetch(tPrep, ip, 0);
  float zc = c.a;
  if (zc > 1e5) { gl_FragColor = vec4(1.0); return; }
  vec3 nc = c.xyz;
  vec3 pc = postViewPos(uvOf(ip), zc);
  // plane-distance tolerance: neighbours on the same surface pass even at grazing angles
  float tol = 1.0 / (zc * 0.018 + 0.04);
  float sum = 0.0, wsum = 0.0;
  ivec2 hi = ivec2(uHalfRes) - 1;
  for (int y = -2; y <= 1; y++)
  for (int x = -2; x <= 1; x++) {
    ivec2 q = clamp(ip + ivec2(x, y), ivec2(0), hi);
    vec4 pq = texelFetch(tPrep, q, 0);
    float a = texelFetch(tAO, q, 0).r;
    vec3 pos = postViewPos(uvOf(q), pq.a);
    float wz = max(0.0, 1.0 - abs(dot(pos - pc, nc)) * tol);
    float nd = max(dot(nc, pq.xyz), 0.0);
    float wn = nd * nd;
    float w = wz * wn + 1e-4 * float(x == 0 && y == 0);
    sum += a * w; wsum += w;
  }
  gl_FragColor = vec4(sum / max(wsum, 1e-4), 0.0, 0.0, 1.0);
}`,ht=`
${st}
uniform sampler2D tDepth;
uniform sampler2D tColor;
uniform sampler2D tAO;
uniform sampler2D tPrep;
uniform vec2 uHalfRes;
uniform vec2 uFullRes;
uniform float uIntensity;
uniform float uDirectReduce;
uniform float uExposureRef;   // scene-linear value treated as "fully sunlit"
uniform float uAlbedo;        // multi-bounce: albedo of the brightest channel (0 = off)
varying vec2 vUv;
#if AO_SCALE == 1
float aoAt(vec2 fragCoord, vec3 P) { return texelFetch(tAO, ivec2(fragCoord), 0).r; }
#else
// plane-aware upsample: weight each of the 4 nearest low-res texels by bilinear
// position x how well this pixel lies on that texel's surface plane
float aoAt(vec2 fragCoord, vec3 P) {
  vec2 hp = (fragCoord - 0.5) / float(AO_SCALE);
  vec2 b = floor(hp);
  vec2 f = hp - b;
  vec2 hi = uHalfRes - 1.0;
  float z = -P.z;
  float tol = 1.0 / (z * 0.012 + 0.03);
  float sum = 0.0, wsum = 0.0, conf = 0.0;
  for (int k = 0; k < 4; k++) {
    vec2 o = vec2(float(k & 1), float(k >> 1));
    ivec2 q = ivec2(clamp(b + o, vec2(0.0), hi));
    vec4 pq = texelFetch(tPrep, q, 0);
    vec3 Pq = postViewPos((vec2(q) * float(AO_SCALE) + 0.5) / uFullRes, pq.a);
    float dPlane = abs(dot(P - Pq, pq.xyz)) * tol;
    float wd = max(0.0, 1.0 - dPlane);
    wd *= wd;
    float wb = (o.x > 0.5 ? f.x : 1.0 - f.x) * (o.y > 0.5 ? f.y : 1.0 - f.y);
    float w = (wb + 0.02) * wd;
    sum += texelFetch(tAO, q, 0).r * w; wsum += w;
    conf = max(conf, wd);
  }
  float ao = wsum > 1e-5 ? sum / wsum : 1.0;
  return mix(1.0, ao, smoothstep(0.05, 0.35, conf));
}
#endif
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  float d = texelFetch(tDepth, p, 0).r;
  if (d >= SKY_DEPTH) { gl_FragColor = vec4(1.0); return; }
  float z = postLinearZ(d);
  vec3 P = postViewPos((vec2(p) + 0.5) / uFullRes, z);
  float ao = aoAt(gl_FragCoord.xy, P);
  vec3 col = texelFetch(tColor, p, 0).rgb;
  float direct = smoothstep(0.25, 1.0, postLuma(col) / uExposureRef);
  ao = mix(ao, 1.0, direct * uDirectReduce);
  ao = mix(1.0, ao, uIntensity);
  vec3 r = vec3(ao);
  if (uAlbedo > 0.0) {
    // coloured multi-bounce (Jimenez 2016): light bounced inside the occluded
    // region carries the surface colour and partly refills it
    float m = max(col.r, max(col.g, col.b));
    vec3 alb = clamp(col / max(m, 1e-5) * uAlbedo, 0.0, 0.95);
    vec3 a = 2.0404 * alb - 0.3324;
    vec3 b = -4.7951 * alb + 0.6417;
    vec3 c = 2.7552 * alb + 0.6903;
    r = max(r, ((r * a + b) * r + c) * r);
  }
  gl_FragColor = vec4(clamp(r, 0.0, 1.0), 1.0);
}`,gt=class{constructor(e,t){this.pipeline=e;let n=ut(t);this.scale=n>=4?1:2,this.settings={radius:1.1,power:1.6,intensity:.95,directReduce:.6,thin:.8,albedo:.42,fade:[90,220],maxPixels:this.scale===1?128:64};let r=n>=4||n>=3?4:n>=2?3:2,i=n>=4?10:n>=3?8:n>=2?6:4,a={AO_SCALE:this.scale},o=e.postUniforms;this.prepRT=ct(1,1,{type:_,filter:C,name:`gtao.prep`}),this.aoRT=ct(1,1,{type:u,filter:C,name:`gtao.raw`}),this.blurRT=ct(1,1,{type:u,filter:C,name:`gtao.blur`}),this.halfRes=new j(1,1),this.fullRes=e.uniforms.uResolution.value,this.prepMat=I({name:`gtao.prep`,defines:a,uniforms:{...o,tDepth:e.uniforms.tSceneDepth,uFullRes:{value:this.fullRes}},fragmentShader:ft}),this.aoMat=I({name:`gtao.ao`,defines:{...a,SLICES:r,STEPS:i},uniforms:{...o,tPrep:{value:this.prepRT.texture},uHalfRes:{value:this.halfRes},uFullRes:{value:this.fullRes},uRadius:{value:this.settings.radius},uMaxPixels:{value:this.settings.maxPixels},uPower:{value:this.settings.power},uThin:{value:this.settings.thin},uFade:{value:new j(...this.settings.fade)}},fragmentShader:pt}),this.blurMat=I({name:`gtao.blur`,defines:a,uniforms:{...o,tAO:{value:this.aoRT.texture},tPrep:{value:this.prepRT.texture},uHalfRes:{value:this.halfRes},uFullRes:{value:this.fullRes}},fragmentShader:mt}),this.applyMat=I({name:`gtao.apply`,defines:a,uniforms:{...o,tDepth:e.uniforms.tSceneDepth,tColor:{value:e.opaqueRT.texture},tAO:{value:this.blurRT.texture},tPrep:{value:this.prepRT.texture},uHalfRes:{value:this.halfRes},uFullRes:{value:this.fullRes},uIntensity:{value:this.settings.intensity},uDirectReduce:{value:this.settings.directReduce},uExposureRef:{value:1},uAlbedo:{value:this.settings.albedo}},fragmentShader:ht,blending:5});let s=this.applyMat;s.blendEquation=100,s.blendSrc=208,s.blendDst=200,s.blendEquationAlpha=100,s.blendSrcAlpha=200,s.blendDstAlpha=201}setSize(e,t){let n=this.scale,r=Math.max(1,Math.ceil(e/n)),i=Math.max(1,Math.ceil(t/n));this.halfRes.set(r,i),this.prepRT.setSize(r,i),this.aoRT.setSize(r,i),this.blurRT.setSize(r,i)}syncSettings(){let e=this.settings,t=this.aoMat.uniforms;t.uRadius.value=e.radius,t.uPower.value=e.power,t.uMaxPixels.value=e.maxPixels,t.uThin.value=e.thin,t.uFade.value.set(e.fade[0],e.fade[1]);let n=this.applyMat.uniforms;n.uIntensity.value=e.intensity,n.uDirectReduce.value=e.directReduce,n.uAlbedo.value=e.albedo}compute(){let e=this.pipeline;this.syncSettings(),e.drawFullscreen(this.prepMat,this.prepRT),e.drawFullscreen(this.aoMat,this.aoRT),e.drawFullscreen(this.blurMat,this.blurRT)}get texture(){return this.blurRT.texture}dispose(){for(let e of[this.prepRT,this.aoRT,this.blurRT])e.dispose();for(let e of[this.prepMat,this.aoMat,this.blurMat,this.applyMat])e.dispose()}},_t=`
${st}
uniform sampler2D tCurrent;
uniform sampler2D tDepth;         // final depth (opaque + water)
uniform sampler2D tOpaqueDepth;   // opaque-only depth: where the final depth is in front, the pixel is water
uniform sampler2D tHistory;
uniform vec2 uRes;
uniform mat4 uCurInvViewProj;   // unjittered
uniform mat4 uPrevViewProj;     // unjittered, previous frame
uniform float uReset;
uniform float uAlpha;           // blend weight of the current frame when still
uniform float uAlphaMotion;     // ... when moving fast
uniform float uGamma;           // variance clip width (sigmas) when moving
uniform float uGammaStill;      // ... for still pixels (a tight box re-clips the converged history every jitter phase -> fizz)
uniform float uDepthTol;        // relative depth difference that rejects history
uniform float uAlphaWater;      // minimum current-frame weight on the water surface (animated, reflective) when moving
uniform float uAlphaWaterStill; // ... with a still camera
uniform vec2 uJitter;           // this frame's jitter (px): pixel p shows the unjittered scene at p + uJitter
uniform float uDepthMode;       // history depth test: 0 symmetric (legacy), 1 one-sided 'something moved in front'
uniform float uFilterK;         // current-frame reconstruction kernel exp(-k d^2) around the pixel centre (0 = raw sample)
varying vec2 vUv;

vec3 tmc(vec3 c) { return c / (1.0 + max(c.r, max(c.g, c.b)) * 0.5); }        // reversible compression
vec3 itmc(vec3 c) { return c / max(1.0 - max(c.r, max(c.g, c.b)) * 0.5, 1e-4); }
vec3 toYCoCg(vec3 c) { return vec3(0.25 * c.r + 0.5 * c.g + 0.25 * c.b, 0.5 * c.r - 0.5 * c.b, -0.25 * c.r + 0.5 * c.g - 0.25 * c.b); }
vec3 fromYCoCg(vec3 c) { return vec3(c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z); }
vec3 fetchC(ivec2 p) {
  p = clamp(p, ivec2(0), ivec2(uRes) - 1);
  return toYCoCg(tmc(min(max(texelFetch(tCurrent, p, 0).rgb, vec3(0.0)), vec3(64000.0))));
}
// Catmull-Rom history fetch from 5 bilinear taps (after Jimenez / MJP)
vec3 historyCR(vec2 uv) {
  vec2 pos = uv * uRes;
  vec2 tc1 = floor(pos - 0.5) + 0.5;
  vec2 f = pos - tc1;
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);
  vec2 w12 = w1 + w2;
  vec2 tc0 = (tc1 - 1.0) / uRes, tc3 = (tc1 + 2.0) / uRes, tc12 = (tc1 + w2 / w12) / uRes;
  vec3 r = texture2D(tHistory, vec2(tc12.x, tc0.y)).rgb * (w12.x * w0.y)
         + texture2D(tHistory, vec2(tc0.x, tc12.y)).rgb * (w0.x * w12.y)
         + texture2D(tHistory, tc12).rgb * (w12.x * w12.y)
         + texture2D(tHistory, vec2(tc3.x, tc12.y)).rgb * (w3.x * w12.y)
         + texture2D(tHistory, vec2(tc12.x, tc3.y)).rgb * (w12.x * w3.y);
  float ws = w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  return min(max(r / max(ws, 1e-4), vec3(0.0)), vec3(64000.0));
}
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  ivec2 hi = ivec2(uRes) - 1;
  float dC = texelFetch(tDepth, ip, 0).r;
  vec3 cur = fetchC(ip);
  // neighbourhood moments + nearest depth (dilation) + jitter-aware reconstruction
  // of the current frame at the UNJITTERED pixel centre: each neighbour's sample
  // sits at offset (o + jitter) from it, weighted by a Blackman-Harris-like
  // Gaussian, so the value fed to the blend barely changes with the jitter phase
  // (no residual jitter fizz on leaf edges / ropes when standing still)
  vec3 m1 = cur, m2 = cur * cur, mn = cur, mx = cur;
  vec3 fsum = cur * exp(-uFilterK * dot(uJitter, uJitter));
  float fw = exp(-uFilterK * dot(uJitter, uJitter));
  float dMin = dC;
  for (int k = 0; k < 8; k++) {
    ivec2 o = k < 3 ? ivec2(k - 1, -1) : k < 5 ? ivec2(k == 3 ? -1 : 1, 0) : ivec2(k - 6, 1);
    ivec2 q = clamp(ip + o, ivec2(0), hi);
    vec3 c = fetchC(q);
    m1 += c; m2 += c * c; mn = min(mn, c); mx = max(mx, c);
    vec2 dd = vec2(o) + uJitter;
    float w = exp(-uFilterK * dot(dd, dd));
    fsum += c * w; fw += w;
    dMin = min(dMin, texelFetch(tDepth, q, 0).r);
  }
  if (uFilterK > 0.0) cur = fsum / max(fw, 1e-5);
  // history alpha stores the DILATED depth, the same quantity the test below uses
  float zC = postLinearZ(dMin);
  if (uReset > 0.5) { gl_FragColor = vec4(itmc(fromYCoCg(cur)), zC); return; }
  // reproject with the nearest surface of the neighbourhood
  vec4 wp = uCurInvViewProj * vec4(vUv * 2.0 - 1.0, dMin * 2.0 - 1.0, 1.0);
  wp /= wp.w;
  vec4 pc = uPrevViewProj * vec4(wp.xyz, 1.0);
  vec2 prevUV = pc.xy / pc.w * 0.5 + 0.5;
  float expectZ = pc.w;             // this surface's view depth in the previous frame
  bool off = pc.w <= 0.0 || any(lessThan(prevUV, vec2(0.0))) || any(greaterThan(prevUV, vec2(1.0)));
  if (off) { gl_FragColor = vec4(itmc(fromYCoCg(cur)), zC); return; }
  vec3 hist = toYCoCg(tmc(historyCR(prevUV)));
  float hz = texelFetch(tHistory, clamp(ivec2(prevUV * uRes), ivec2(0), hi), 0).a;
  float rel, tol;
  if (uDepthMode > 0.5) {
    // one-sided: reject only when the current pixel's OWN surface is clearly in
    // front of the nearest surface around the history pixel (hz = its 3x3 near
    // envelope): a bird, fish or leaf moving in. Jitter at silhouettes never trips
    // it (the envelope already holds the near object), so foliage keeps its
    // history when standing still; whatever LEFT is removed by the colour clip.
    vec4 wo = uCurInvViewProj * vec4(vUv * 2.0 - 1.0, dC * 2.0 - 1.0, 1.0);
    wo /= wo.w;
    float expectOwn = (uPrevViewProj * vec4(wo.xyz, 1.0)).w;
    rel = (hz - expectOwn) / max(expectOwn, 1e-3);
    tol = uDepthTol * (1.0 + expectOwn / 40.0);
  } else {
    // symmetric (legacy): dilated depth vs reprojected dilated depth
    rel = abs(hz - expectZ) / max(min(hz, expectZ), 1e-3);
    tol = uDepthTol * (1.0 + expectZ / 40.0);        // grazing far ground: steeper depth per texel
  }
  float keep = 1.0 - smoothstep(tol, tol * 3.0, rel);
  float velPx = length((vUv - prevUV) * uRes);
  // variance clip toward the neighbourhood mean
  vec3 mu = m1 / 9.0;
  vec3 sig = sqrt(max(m2 / 9.0 - mu * mu, vec3(0.0)));
  float gam = mix(uGammaStill, uGamma, smoothstep(0.05, 1.0, velPx));
  vec3 bmin = max(mu - gam * sig, mn), bmax = min(mu + gam * sig, mx);
  vec3 ctr = 0.5 * (bmax + bmin), ext = max(0.5 * (bmax - bmin), vec3(1e-5));
  vec3 dv = hist - ctr;
  vec3 ts = abs(dv / ext);
  float tmax = max(ts.x, max(ts.y, ts.z));
  if (tmax > 1.0) hist = ctr + dv / tmax;
  float a = mix(uAlpha, uAlphaMotion, smoothstep(0.5, 6.0, velPx));
  // water surface: its reflections move with the reflected scene's parallax and
  // its ripples animate, neither follows the surface reprojection -> keep it
  // mostly current (still gets partial jitter averaging)
  float zOpq = postLinearZ(texelFetch(tOpaqueDepth, ip, 0).r);
  float water = postLinearZ(dC) < zOpq * 0.995 - 0.02 ? 1.0 : 0.0;
  // (with a still camera there is no parallax error, only the slow ripple
  // animation, which the colour clip bounds -> accumulate more)
  a = max(a, mix(uAlphaWaterStill, uAlphaWater, smoothstep(0.05, 1.0, velPx)) * water);
  a = mix(1.0, a, keep);
  vec3 res = mix(hist, cur, a);
  gl_FragColor = vec4(itmc(fromYCoCg(res)), zC);
}`,vt=[];function yt(e,t){let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r}for(let e=1;e<=8;e++)vt.push([yt(e,2)-.5,yt(e,3)-.5]);var bt=class{constructor(e){this.pipeline=e,this.settings={alpha:.1,alphaMotion:.4,alphaWater:.5,gamma:1.1,gammaStill:1.1,depthTol:.04,jitter:1,sharpen:.25,filterK:0,jitterSign:1,depthMode:0,alphaWaterStill:.5},this.rts=[ct(1,1,{name:`taa.a`}),ct(1,1,{name:`taa.b`})],this.idx=0,this.res=new j(1,1),this.mat=I({name:`taa`,uniforms:{...e.postUniforms,tCurrent:{value:null},tDepth:{value:null},tHistory:{value:null},tOpaqueDepth:e.uniforms.tSceneDepth,uAlphaWater:{value:.5},uJitter:{value:new j},uFilterK:{value:0},uDepthMode:{value:0},uAlphaWaterStill:{value:.5},uRes:{value:this.res},uCurInvViewProj:{value:new k},uPrevViewProj:{value:new k},uReset:{value:1},uAlpha:{value:.1},uAlphaMotion:{value:.22},uGamma:{value:1.1},uGammaStill:{value:1.1},uDepthTol:{value:.04}},fragmentShader:_t}),this.needsReset=!0,this._saved=new k,this._savedInv=new k,this._unjit=new k,this._prevVP=new k,this._curVP=new k,this._prevPos=new M(1e9,0,0),this._prevQuat=new x,this._lastFrame=-10,this._jittered=!1,this.phase=0}setSize(e,t){this.res.set(e,t);for(let n of this.rts)n.setSize(e,t);this.needsReset=!0}jitter(e,t){this._saved.copy(e.projectionMatrix),this._savedInv.copy(e.projectionMatrixInverse),this._unjit.copy(e.projectionMatrix);let n=vt[t&7],r=this.settings.jitter;this.phase=t&7;let i=e.projectionMatrix.elements;i[8]+=n[0]*r*2/this.res.x,i[9]+=n[1]*r*2/this.res.y,e.projectionMatrixInverse.copy(e.projectionMatrix).invert(),this._jittered=!0}restore(e){this._jittered&&=(e.projectionMatrix.copy(this._saved),e.projectionMatrixInverse.copy(this._savedInv),!1)}render(e,t,n,r){let i=this.pipeline,a=this.mat.uniforms,o=this.settings,s=n.position.distanceToSquared(this._prevPos)>25||n.quaternion.angleTo(this._prevQuat)>.52,c=this.needsReset||s||r!==this._lastFrame+1;this._curVP.multiplyMatrices(this._unjit,n.matrixWorldInverse),a.uCurInvViewProj.value.copy(this._curVP).invert(),a.uPrevViewProj.value.copy(c?this._curVP:this._prevVP),a.tCurrent.value=e,a.tDepth.value=t,a.tHistory.value=this.rts[this.idx].texture,a.uReset.value=+!!c,a.uAlpha.value=o.alpha,a.uAlphaMotion.value=o.alphaMotion,a.uGamma.value=o.gamma,a.uDepthTol.value=o.depthTol,a.uGammaStill.value=o.gammaStill,a.uAlphaWater.value=o.alphaWater;let l=vt[r&7],u=o.jitter*o.jitterSign;a.uJitter.value.set(l[0]*u,l[1]*u),a.uFilterK.value=o.filterK,a.uDepthMode.value=o.depthMode,a.uAlphaWaterStill.value=o.alphaWaterStill,this.idx^=1;let d=this.rts[this.idx];return i.drawFullscreen(this.mat,d),this._prevVP.copy(this._curVP),this._prevPos.copy(n.position),this._prevQuat.copy(n.quaternion),this._lastFrame=r,this.needsReset=!1,d.texture}dispose(){for(let e of this.rts)e.dispose();this.mat.dispose()}},xt=`
uniform sampler2D tSrc;
uniform vec2 uSrcTexel;
varying vec2 vUv;
vec4 tap4(vec2 o) { return texture2D(tSrc, vUv + o * uSrcTexel); }
vec3 tap(vec2 o) { return tap4(o).rgb; }
`,St=`
${st}
${xt}
uniform sampler2D tDepth;
uniform vec2 uFarRange;        // metres: geometry -> far threshold blend
uniform float uExposure;
uniform float uThreshold;      // near geometry (exposed units)
uniform float uThresholdFar;   // sky + far haze
uniform float uKnee;           // soft knee as a fraction of the threshold
float farAt(vec2 o) {
  float d = texture2D(tDepth, vUv + o * uSrcTexel).r;
  return d >= SKY_DEPTH ? 1.0 : smoothstep(uFarRange.x, uFarRange.y, postLinearZ(d));
}
uniform sampler2D tAdapt;
uniform float uAutoExp;
float lumaW(vec3 c) { return 1.0 / (1.0 + dot(c, vec3(0.2126, 0.7152, 0.0722))); }
vec3 scrub(vec3 c) { return min(max(c, vec3(0.0)), vec3(6.0e4)); }
void main() {
  vec3 a = scrub(tap(vec2(-2.0, 2.0))), b = scrub(tap(vec2(0.0, 2.0))), c = scrub(tap(vec2(2.0, 2.0)));
  vec3 d = scrub(tap(vec2(-2.0, 0.0))), e = scrub(tap(vec2(0.0, 0.0))), f = scrub(tap(vec2(2.0, 0.0)));
  vec3 g = scrub(tap(vec2(-2.0, -2.0))), h = scrub(tap(vec2(0.0, -2.0))), i = scrub(tap(vec2(2.0, -2.0)));
  vec3 j = scrub(tap(vec2(-1.0, 1.0))), k = scrub(tap(vec2(1.0, 1.0)));
  vec3 l = scrub(tap(vec2(-1.0, -1.0))), m = scrub(tap(vec2(1.0, -1.0)));
  vec3 g0 = (j + k + l + m) * 0.25;
  vec3 g1 = (a + b + d + e) * 0.25;
  vec3 g2 = (b + c + e + f) * 0.25;
  vec3 g3 = (d + e + g + h) * 0.25;
  vec3 g4 = (e + f + h + i) * 0.25;
  float w0 = 0.5 * lumaW(g0), w1 = 0.125 * lumaW(g1), w2 = 0.125 * lumaW(g2), w3 = 0.125 * lumaW(g3), w4 = 0.125 * lumaW(g4);
  vec3 col = (g0 * w0 + g1 * w1 + g2 * w2 + g3 * w3 + g4 * w4) / (w0 + w1 + w2 + w3 + w4);
  // meter: log2 of the plain (unweighted) average luminance, sun clamped
  vec3 avg = g0 * 0.5 + (g1 + g2 + g3 + g4) * 0.125;
  float meter = log2(clamp(dot(avg, vec3(0.2126, 0.7152, 0.0722)), 1e-4, 16.0));
  float comp = 1.0;
  if (uAutoExp > 0.5) { float ad = texelFetch(tAdapt, ivec2(0), 0).g; comp = ad > 0.0 ? ad : 1.0; }
  col *= uExposure * comp;
  // depth-aware soft-knee threshold on the brightest channel
  float far = 0.25 * (farAt(vec2(-1.0, 1.0)) + farAt(vec2(1.0, 1.0)) + farAt(vec2(-1.0, -1.0)) + farAt(vec2(1.0, -1.0)));
  float thr = mix(uThreshold, uThresholdFar, far);
  float knee = max(uKnee * thr, 1e-3);
  float br = max(col.r, max(col.g, col.b));
  float rq = clamp(br - thr + knee, 0.0, 2.0 * knee);
  rq = rq * rq / (4.0 * knee);
  float contrib = max(rq, br - thr) / max(br, 1e-5);
  gl_FragColor = vec4(min(col * contrib, vec3(2048.0)), meter);
}`,Ct=`
${xt}
void main() {
  vec4 a = tap4(vec2(-2.0, 2.0)), b = tap4(vec2(0.0, 2.0)), c = tap4(vec2(2.0, 2.0));
  vec4 d = tap4(vec2(-2.0, 0.0)), e = tap4(vec2(0.0, 0.0)), f = tap4(vec2(2.0, 0.0));
  vec4 g = tap4(vec2(-2.0, -2.0)), h = tap4(vec2(0.0, -2.0)), i = tap4(vec2(2.0, -2.0));
  vec4 j = tap4(vec2(-1.0, 1.0)), k = tap4(vec2(1.0, 1.0));
  vec4 l = tap4(vec2(-1.0, -1.0)), m = tap4(vec2(1.0, -1.0));
  gl_FragColor = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
}`,wt=`
uniform sampler2D tSrc;
uniform vec2 uSrcTexel;
uniform float uRadius;
uniform float uWeight;
varying vec2 vUv;
void main() {
  vec2 d = uSrcTexel * uRadius;
  vec3 s = texture2D(tSrc, vUv).rgb * 4.0;
  s += (texture2D(tSrc, vUv + vec2(d.x, 0.0)).rgb + texture2D(tSrc, vUv - vec2(d.x, 0.0)).rgb
      + texture2D(tSrc, vUv + vec2(0.0, d.y)).rgb + texture2D(tSrc, vUv - vec2(0.0, d.y)).rgb) * 2.0;
  s += texture2D(tSrc, vUv + d).rgb + texture2D(tSrc, vUv - d).rgb
     + texture2D(tSrc, vUv + vec2(d.x, -d.y)).rgb + texture2D(tSrc, vUv + vec2(-d.x, d.y)).rgb;
  gl_FragColor = vec4(s * (uWeight / 16.0), 1.0);
}`,Tt=class{constructor(e,t=6){this.pipeline=e,this.maxLevels=t,this.settings={threshold:1.25,thresholdFar:16,knee:.5,far:[250,1200],strength:.3,radius:1,falloff:.72,weights:t>=7?[1,.62,.4,.28,.21,.16,.12]:[1,.62,.4,.28,.21,.16]},this.rts=[];for(let e=0;e<t;e++)this.rts.push(ct(1,1,{name:`bloom.${e}`}));this.levels=t,this.prefilterMat=I({name:`bloom.prefilter`,uniforms:{...e.postUniforms,tDepth:e.uniforms.tSceneDepth,uFarRange:{value:new j(250,1200)},tSrc:{value:null},uSrcTexel:{value:new j},uExposure:{value:1},uThreshold:{value:this.settings.threshold},uThresholdFar:{value:this.settings.thresholdFar},uKnee:{value:this.settings.knee},tAdapt:{value:null},uAutoExp:{value:0}},fragmentShader:St}),this.downMat=I({name:`bloom.down`,uniforms:{tSrc:{value:null},uSrcTexel:{value:new j}},fragmentShader:Ct}),this.upMat=I({name:`bloom.up`,uniforms:{tSrc:{value:null},uSrcTexel:{value:new j},uRadius:{value:1},uWeight:{value:1}},fragmentShader:wt,blending:5});let n=this.upMat;n.blendEquation=100,n.blendSrc=201,n.blendDst=201,n.blendEquationAlpha=100,n.blendSrcAlpha=200,n.blendDstAlpha=201,this.fullW=1,this.fullH=1}setSize(e,t){this.fullW=e,this.fullH=t;let n=Math.max(1,e+1>>1),r=Math.max(1,t+1>>1);this.levels=0;for(let e=0;e<this.maxLevels;e++)this.rts[e].setSize(n,r),n>=4&&r>=4&&(this.levels=e+1),n=Math.max(1,n+1>>1),r=Math.max(1,r+1>>1);this.levels=Math.max(1,this.levels)}render(e,t,n=null){let r=this.pipeline,i=this.settings,a=this.prefilterMat.uniforms;a.tSrc.value=e,a.uSrcTexel.value.set(1/this.fullW,1/this.fullH),a.uExposure.value=t,a.tAdapt.value=n,a.uAutoExp.value=+!!n,a.uThreshold.value=i.threshold,a.uThresholdFar.value=Math.max(i.threshold,i.thresholdFar),a.uKnee.value=Math.min(1,Math.max(.001,i.knee)),a.uFarRange.value.set(i.far[0],Math.max(i.far[0]+1,i.far[1])),r.drawFullscreen(this.prefilterMat,this.rts[0]);let o=this.downMat.uniforms;for(let e=1;e<this.levels;e++){let t=this.rts[e-1];o.tSrc.value=t.texture,o.uSrcTexel.value.set(1/t.width,1/t.height),r.drawFullscreen(this.downMat,this.rts[e])}let s=this.upMat.uniforms;s.uRadius.value=i.radius;for(let e=this.levels-1;e>0;e--){let t=this.rts[e];s.uWeight.value=this.levelStep(e),s.tSrc.value=t.texture,s.uSrcTexel.value.set(1/t.width,1/t.height),r.drawFullscreen(this.upMat,this.rts[e-1])}return this.rts[0].texture}get meterTarget(){return this.rts[this.levels-1]}levelWeight(e){let t=this.settings.weights;return t&&t.length?t[Math.min(e,t.length-1)]*(e>=t.length?.75**(e-t.length+1):1):this.settings.falloff**+e}levelStep(e){return this.levelWeight(e)/Math.max(1e-6,this.levelWeight(e-1))}get compositeScale(){let e=0;for(let t=0;t<this.levels;t++)e+=this.levelWeight(t);return this.settings.strength/Math.max(1e-6,e)}dispose(){for(let e of this.rts)e.dispose();this.prefilterMat.dispose(),this.downMat.dispose(),this.upMat.dispose()}},Et=`
${st}
uniform sampler2D tDepth;
uniform vec2 uFullRes;
uniform vec3 uSunView;      // sun direction in view space
uniform float uMaskSharp;
uniform float uScale;       // full-res pixels per mask texel (2 or 4)
varying vec2 vUv;
void main() {
  vec2 base = floor(gl_FragCoord.xy) * uScale;
  float sky = 0.0;
  ivec2 hi = ivec2(uFullRes) - 1;
  for (int k = 0; k < 4; k++) {
    vec2 o = vec2(float(k & 1), float(k >> 1)) * (0.5 * uScale) + 0.5;
    float d = texelFetch(tDepth, clamp(ivec2(base + o), ivec2(0), hi), 0).r;
    sky += d >= SKY_DEPTH ? 0.25 : 0.0;
  }
  vec3 rd = normalize(postViewPos(vUv, 1.0));
  float c = max(dot(rd, uSunView), 0.0);
  float w = exp2((c - 1.0) * uMaskSharp);
  gl_FragColor = vec4(sky * w, 0.0, 0.0, 1.0);
}`,Dt=`
uniform sampler2D tSrc;
uniform vec2 uSunUV;
uniform float uSpan;       // fraction of the pixel->sun vector covered by this pass
uniform float uDecay;
uniform vec2 uAspect;      // (aspect, 1) for round falloff
varying vec2 vUv;
#define N 16
void main() {
  vec2 toSun = uSunUV - vUv;
  vec2 stepv = toSun * (uSpan / float(N));
  float sum = 0.0, wsum = 0.0, w = 1.0;
  // jitter-free: fixed sample positions (stable, no crawling)
  for (int i = 0; i < N; i++) {
    vec2 uv = vUv + stepv * float(i);
    sum += texture2D(tSrc, uv).r * w;
    wsum += w;
    w *= uDecay;
  }
  gl_FragColor = vec4(sum / wsum, 0.0, 0.0, 1.0);
}`,Ot=class{constructor(e,t=4){this.pipeline=e,this.scale=t===2?2:4,this.settings={amount:.2,sharpness:64,maskSharp:4,decay:.97,distScale:120,skyFactor:.15},this.rtA=ct(1,1,{name:`shafts.a`}),this.rtB=ct(1,1,{name:`shafts.b`}),this.qRes=new j(1,1),this.sunUV=new j(.5,.5),this.sunView=new M(0,0,-1),this.visibility=0,this._v4=new O,this._v3=new M,this._fwd=new M;let n=e.postUniforms;this.maskMat=I({name:`shafts.mask`,uniforms:{...n,tDepth:e.uniforms.tSceneDepth,uFullRes:{value:e.uniforms.uResolution.value},uSunView:{value:this.sunView},uMaskSharp:{value:this.settings.maskSharp},uScale:{value:this.scale}},fragmentShader:Et}),this.radialMat=I({name:`shafts.radial`,uniforms:{tSrc:{value:null},uSunUV:{value:this.sunUV},uSpan:{value:1},uDecay:{value:this.settings.decay},uAspect:{value:new j(1,1)}},fragmentShader:Dt})}setSize(e,t){let n=this.scale,r=Math.max(1,Math.ceil(e/n)),i=Math.max(1,Math.ceil(t/n));this.qRes.set(r,i),this.rtA.setSize(r,i),this.rtB.setSize(r,i),this.radialMat.uniforms.uAspect.value.set(e/Math.max(1,t),1)}update(e,t){let n=e.getWorldDirection(this._fwd).dot(t);if(this.sunView.copy(t).transformDirection(e.matrixWorldInverse),n<=.05||this.sunView.z>=-.001)return this.visibility=0,0;let r=this._v4.set(t.x,t.y,t.z,0).applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix),i=r.x/r.w,a=r.y/r.w;this.sunUV.set(i*.5+.5,a*.5+.5);let o=Math.max(0,Math.abs(i)-1),s=Math.max(0,Math.abs(a)-1),c=Math.sqrt(o*o+s*s),l=1-ce.smoothstep(c,0,.9),u=ce.smoothstep(n,.05,.45);return this.visibility=l*u,this.visibility}render(){let e=this.pipeline,t=this.settings;this.maskMat.uniforms.uMaskSharp.value=t.maskSharp,e.drawFullscreen(this.maskMat,this.rtA);let n=this.radialMat.uniforms;return n.uDecay.value=t.decay,n.tSrc.value=this.rtA.texture,n.uSpan.value=1/16,e.drawFullscreen(this.radialMat,this.rtB),n.tSrc.value=this.rtB.texture,n.uSpan.value=1,e.drawFullscreen(this.radialMat,this.rtA),this.rtA.texture}get texture(){return this.rtA.texture}dispose(){this.rtA.dispose(),this.rtB.dispose(),this.maskMat.dispose(),this.radialMat.dispose()}},kt=`
${st}
uniform sampler2D tInput;
uniform sampler2D tDepth;
uniform mat4 uViewInverse;
uniform vec3 uCamPos;
uniform float uWaterLevel;
uniform float uAmount;          // 0..1 blend (partial submersion)
uniform float uTime;
uniform vec3 uSunRefr;          // refracted sun direction underwater (pointing DOWN, unit)
uniform vec3 uSunLight;         // sun colour * intensity (linear)
uniform vec3 uWaterAbsorb;      // G.uWaterAbsorb: absorption per metre (shared with the water shader)
uniform float uScatterCoef;     // scattering per metre (adds to extinction)
uniform vec3 uScatterCol;       // single-scatter albedo tint
uniform float uShafts;
varying vec2 vUv;

float hash12(vec2 p) { return postHash(uvec3(ivec3(ivec2(floor(p)), 17))); }
// smooth value noise
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash12(i), b = hash12(i + vec2(1.0, 0.0)), c = hash12(i + vec2(0.0, 1.0)), d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
// caustic-like ridged pattern (thin bright filaments)
float causticCells(vec2 p, float t) {
  float n = vnoise(p + vec2(t * 0.35, t * 0.21)) + vnoise(p * 1.9 - vec2(t * 0.27, -t * 0.31)) * 0.5;
  float r = 1.0 - abs(n / 1.5 * 2.0 - 1.0);
  r = r * r; r = r * r;
  return r;
}

void main() {
  vec3 uSigma = uWaterAbsorb + vec3(uScatterCoef * 0.8, uScatterCoef, uScatterCoef * 1.15);
  vec2 uv = vUv;
  // refraction wobble (stronger near screen edges, like a mask-less eye)
  float t = uTime;
  vec2 wob = vec2(sin(uv.y * 23.0 + t * 1.6) + sin(uv.y * 41.0 - t * 2.3) * 0.5,
                  cos(uv.x * 19.0 + t * 1.3) + cos(uv.x * 37.0 + t * 1.9) * 0.5) * 0.0016;
  uv = clamp(uv + wob * uAmount, vec2(0.001), vec2(0.999));
  vec3 scene = texture2D(tInput, uv).rgb;
  float d = texture2D(tDepth, uv).r;

  vec3 vpos = postViewPos(uv, 1.0);
  vec3 rd = normalize((uViewInverse * vec4(vpos, 0.0)).xyz);
  float along = length(vpos);             // metres of ray per metre of view depth
  float dist = d >= SKY_DEPTH ? 1e4 : postLinearZ(d) * along;
  float camDepth = max(uWaterLevel - uCamPos.y, 0.0);
  if (rd.y > 1e-4) dist = min(dist, camDepth / rd.y);
  dist = min(dist, 400.0);

  vec3 T = exp(-uSigma * dist);
  // light reaching the medium: sunlight attenuated down to the average depth of the path
  float pathDepth = camDepth + max(-rd.y, 0.0) * min(dist, 30.0) * 0.5;
  vec3 down = exp(-uSigma * (pathDepth / max(-uSunRefr.y, 0.2) + 0.6));
  float mu = dot(rd, -uSunRefr);
  float g = 0.72;
  float hg = (1.0 - g * g) / (12.566 * max(1e-3, (1.0 + g * g - 2.0 * g * mu) * sqrt(1.0 + g * g - 2.0 * g * mu)));
  float iso = 0.0796;
  float upGlow = 0.55 + 0.45 * clamp(rd.y, -1.0, 1.0);
  vec3 Lin = uScatterCol * uSunLight * down * (iso * upGlow + hg * 0.35);
  vec3 col = scene * T + Lin * (1.0 - T);

  // light shafts
  if (uShafts > 0.0) {
    // 12 fixed (unjittered) samples over <= 18 m: the shaft pattern is broad
    // (~3 m cells) so this is adequately sampled -> smooth, no grain or moire
    float span = min(dist, 18.0);
    float acc = 0.0;
    vec2 slope = uSunRefr.xz / max(-uSunRefr.y, 0.2);
    for (int i = 0; i < 12; i++) {
      float s = (float(i) + 0.5) / 12.0 * span;
      vec3 p = uCamPos + rd * s;
      float pd = max(uWaterLevel - p.y, 0.0);
      vec2 q = (p.xz - slope * pd) * 0.33;  // back along the refracted sun ray to the surface
      float c = causticCells(q, t * 0.6);
      acc += c * exp(-(uSigma.g * (s + pd)));
    }
    acc *= span / 12.0;
    col += uScatterCol * uSunLight * (0.06 * uShafts) * acc * (0.4 + hg);
  }
  gl_FragColor = vec4(mix(texture2D(tInput, vUv).rgb, col, uAmount), 1.0);
}`,At=class{constructor(e){this.pipeline=e,this.settings={scatterCoef:.035,scatter:[.05,.3,.78],shafts:1},this.rt=ct(1,1,{name:`underwater`});let t=e.postUniforms;this.mat=I({name:`underwater`,uniforms:{...t,tInput:{value:null},tDepth:e.uniforms.tSceneDepth,uViewInverse:e.uniforms.uViewInverse,uCamPos:{value:new M},uWaterLevel:{value:0},uAmount:{value:1},uTime:{value:0},uSunRefr:{value:new M(0,-1,0)},uSunLight:{value:new M(1,1,1)},uWaterAbsorb:F.uWaterAbsorb??{value:new M(.4,.072,.052)},uScatterCoef:{value:this.settings.scatterCoef},uScatterCol:{value:new M(...this.settings.scatter)},uShafts:{value:1}},fragmentShader:kt}),this._in=new M}setSize(e,t){this.rt.setSize(e,t)}render(e,t,n){let r=this.mat.uniforms,i=this.settings;r.tInput.value=e,r.uCamPos.value.copy(t.position),r.uWaterLevel.value=F.uWaterLevel.value,r.uAmount.value=n,r.uTime.value=F.uTime.value,r.uScatterCoef.value=i.scatterCoef,r.uScatterCol.value.set(i.scatter[0],i.scatter[1],i.scatter[2]),r.uShafts.value=i.shafts;let a=this._in.copy(F.uSunDir.value).negate().normalize(),o=1/1.333,s=-a.y,c=1-o*o*(1-s*s),l=r.uSunRefr.value;c<0?l.set(0,-1,0):l.copy(a).multiplyScalar(o).add(this._in.set(0,1,0).multiplyScalar(o*s-Math.sqrt(c))).normalize();let u=F.uSunColor.value,d=F.uSunIntensity.value;return r.uSunLight.value.set(u.r*d,u.g*d,u.b*d),this.pipeline.drawFullscreen(this.mat,this.rt),this.rt.texture}dispose(){this.rt.dispose(),this.mat.dispose()}},jt={neutral:{id:0,calib:.52},aces:{id:1,calib:.47},agx:{id:2,calib:.86}},Mt={photo:{ShadowTint:[.975,.995,1.03],HighlightTint:[1,1,1.008],Saturation:1.05,HighlightSat:.92,GreenSat:.95,LogContrast:1.1,LogRange:2.2,Contrast:.08,Shoulder:.6,Desat:.16,ToeChroma:.85,Vignette:.2},r3:{ShadowTint:[.97,.995,1.035],HighlightTint:[1,1,1.01],Saturation:1.05,HighlightSat:.94,GreenSat:1,LogContrast:1,LogRange:2.2,Contrast:.2,Shoulder:.62,Desat:.1,ToeChroma:0,Vignette:.2}},Nt=`
${st}
uniform sampler2D tInput;
uniform sampler2D tBloom;
uniform sampler2D tShafts;
uniform sampler2D tDepth;
uniform sampler2D tAO;
uniform sampler2D tAdapt;        // eye adaptation texel (.g = exposure factor)
uniform float uAutoExp;
uniform float uBloomStrength;
uniform float exposure;
uniform float uCalib;
uniform int uTone;
uniform vec3 uShaftColor;       // sun colour * intensity * amount * visibility (0 = off)
uniform float uShaftDist;       // metres for in-scatter to reach ~63%
uniform float uShaftSky;        // factor on sky pixels (sky already has its own glow)
uniform vec3 uSunView;          // sun direction in view space (shaft phase lobe)
uniform float uShaftSharp;      // forward-scattering lobe sharpness
uniform vec3 uShadowTint;
uniform vec3 uHighlightTint;
uniform float uSaturation;
uniform float uHighlightSat;     // saturation reached at exposed luminance ~1.2
uniform float uGreenSat;         // extra saturation factor for foliage greens
uniform float uLogContrast;      // midtone log2 slope around mid grey (1 = off)
uniform float uLogRange;         // stops over which it acts
uniform float uContrast;         // sRGB S-curve amount
uniform float uVignette;
uniform vec2 uAspect;
uniform float uFrame;
uniform float uNoPost;
uniform float uCA;               // lateral chromatic aberration: uv shift at the corners (0 = off)
uniform float uGrain;            // film grain amplitude in sRGB units at mid grey (0 = off)
uniform float uSharpen;          // luma sharpening after TAA (0 = off)
uniform vec2 uTexel;             // 1 / resolution
uniform int uDebugView;         // 1 = AO buffer
varying vec2 vUv;

uniform float uShoulder;        // Neutral: start of highlight compression (Khronos: 0.76)
uniform float uDesat;           // Neutral: highlight desaturation (Khronos: 0.15)
uniform float uToeChroma;       // Neutral toe: 0 = stock (min channel), 1 = luminance ratio
vec3 tmNeutral(vec3 color) {
  float startCompression = uShoulder;
  float desaturation = uDesat;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
  vec3 cMin = color - offset;
  // same luminance as the stock toe, but the input's chromaticity — only in the
  // darks, where the min-channel toe squares chroma (candy shade); midtones keep
  // the stock offset's gentle punch (turquoise water, sunlit leaves)
  float lIn = max(postLuma(color), 1e-6);
  vec3 cLum = color * (postLuma(cMin) / lIn);
  float tc = uToeChroma * (1.0 - smoothstep(0.02, 0.2, lIn));
  color = max(mix(cMin, cLum, tc), vec3(0.0));
  float peak = max(color.r, max(color.g, color.b));
  if (peak < startCompression) return color;
  float d = 1.0 - startCompression;
  float newPeak = 1.0 - d * d / (peak + d - startCompression);
  color *= newPeak / peak;
  float g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0);
  return mix(color, vec3(newPeak), g);
}

vec3 rrtOdtFit(vec3 v) {
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}
vec3 tmAces(vec3 color) {
  const mat3 inM = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
  const mat3 outM = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
  color = inM * (color / 0.6);
  color = rrtOdtFit(color);
  return clamp(outM * color, 0.0, 1.0);
}

vec3 agxContrast(vec3 x) {
  vec3 x2 = x * x; vec3 x4 = x2 * x2;
  return 15.5 * x4 * x2 - 40.14 * x4 * x + 31.96 * x4 - 6.868 * x2 * x + 0.4298 * x2 + 0.1191 * x - 0.00232;
}
vec3 tmAgx(vec3 color) {
  const mat3 toR2020 = mat3(vec3(0.6274, 0.0691, 0.0164), vec3(0.3293, 0.9195, 0.0880), vec3(0.0433, 0.0113, 0.8956));
  const mat3 fromR2020 = mat3(vec3(1.6605, -0.1246, -0.0182), vec3(-0.5876, 1.1329, -0.1006), vec3(-0.0728, -0.0083, 1.1187));
  const mat3 inset = mat3(vec3(0.856627153315983, 0.137318972929847, 0.11189821299995),
                          vec3(0.0951212405381588, 0.761241990602591, 0.0767994186031903),
                          vec3(0.0482516061458583, 0.101439036467562, 0.811302368396859));
  const mat3 outset = mat3(vec3(1.1271005818144368, -0.1413297634984383, -0.14132976349843826),
                           vec3(-0.11060664309660323, 1.157823702216272, -0.11060664309660294),
                           vec3(-0.016493938717834573, -0.016493938717834257, 1.2519364065950405));
  const float minEv = -12.47393, maxEv = 4.026069;
  color = inset * (toR2020 * color);
  color = clamp((log2(max(color, vec3(1e-10))) - minEv) / (maxEv - minEv), 0.0, 1.0);
  color = agxContrast(color);
  color = outset * color;
  color = exp2(2.2 * log2(max(color, vec3(1e-6))));
  return clamp(fromR2020 * color, 0.0, 1.0);
}

vec3 toSRGB(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  vec3 hi = 1.055 * exp2(log2(max(c, vec3(1e-6))) / 2.4) - 0.055;
  return mix(c * 12.92, hi, step(0.0031308, c));
}
vec3 fromSRGB(vec3 c) {
  vec3 hi = exp2(2.4 * log2(max((c + 0.055) / 1.055, vec3(1e-6))));
  return mix(c / 12.92, hi, step(0.04045, c));
}
vec3 scrub(vec3 c) { return min(max(c, vec3(0.0)), vec3(64000.0)); } // NaN / negatives / inf

void main() {
  vec3 col;
  vec2 q = (vUv - 0.5) * uAspect;   // |q| = 1 at the corners
  float r2 = dot(q, q);
  if (uCA > 0.0 && uNoPost < 0.5) {
    // lateral CA: red focuses slightly larger, blue slightly smaller than green
    vec2 o = (vUv - 0.5) * (uCA * 2.0 * r2);
    col = vec3(texture2D(tInput, vUv + o).r, texture2D(tInput, vUv).g, texture2D(tInput, vUv - o).b);
  } else {
    col = texture2D(tInput, vUv).rgb;
  }
  col = scrub(col);
  if (uSharpen > 0.0 && uNoPost < 0.5) {
    // contrast-adaptive luma sharpening (restores the softness TAA resampling
    // leaves); luminance only and clamped to the 4-neighbourhood, so no halos
    // or colour fringes; done on a tone-compressed luma so highlights cannot ring
    float lc = postLuma(texture2D(tInput, vUv).rgb);
    float l1 = postLuma(texture2D(tInput, vUv + vec2(uTexel.x, 0.0)).rgb);
    float l2 = postLuma(texture2D(tInput, vUv - vec2(uTexel.x, 0.0)).rgb);
    float l3 = postLuma(texture2D(tInput, vUv + vec2(0.0, uTexel.y)).rgb);
    float l4 = postLuma(texture2D(tInput, vUv - vec2(0.0, uTexel.y)).rgb);
    float cc = lc / (1.0 + lc), c1 = l1 / (1.0 + l1), c2 = l2 / (1.0 + l2), c3 = l3 / (1.0 + l3), c4 = l4 / (1.0 + l4);
    float mnL = min(cc, min(min(c1, c2), min(c3, c4))), mxL = max(cc, max(max(c1, c2), max(c3, c4)));
    // CAS-style: less sharpening where local contrast is already high
    float amp = uSharpen * sqrt(clamp(min(mnL, 1.0 - mxL) / max(mxL, 1e-4), 0.0, 1.0));
    float sc = clamp(cc + amp * (4.0 * cc - c1 - c2 - c3 - c4), mnL, mxL);
    float ls = sc / max(1.0 - sc, 1e-4);
    col *= ls / max(lc, 1e-6);
  }
  float comp = 1.0;
  if (uAutoExp > 0.5) { float ad = texelFetch(tAdapt, ivec2(0), 0).g; comp = ad > 0.0 ? ad : 1.0; }
  float e = exposure * uCalib * comp;
  if (uNoPost > 0.5) {
    col = clamp(col * exposure, 0.0, 1.0);
  } else if (uDebugView == 1) {
    col = vec3(texture2D(tAO, vUv).r);
    col = col * col;
  } else {
    col *= e;
    if (uBloomStrength > 0.0) col += scrub(texture2D(tBloom, vUv).rgb) * uBloomStrength;
    if (uShaftColor.r + uShaftColor.g + uShaftColor.b > 0.0) {
      float d = texture2D(tDepth, vUv).r;
      float f = d >= SKY_DEPTH ? uShaftSky : 1.0 - exp(-postLinearZ(d) / uShaftDist);
      float c = max(dot(normalize(postViewPos(vUv, 1.0)), uSunView), 0.0);
      float phase = exp2((c - 1.0) * uShaftSharp);
      col += texture2D(tShafts, vUv).r * uShaftColor * (e * f * phase);
    }
    // natural lens falloff (scene-linear, before the curve)
    col *= 1.0 - uVignette * (0.3 * r2 + 0.7 * r2 * r2);
    // --- HDR grade: split-tone by exposure zone around mid grey ---
    float l = max(postLuma(col), 1e-6);
    col *= mix(uShadowTint, uHighlightTint, smoothstep(-2.5, 2.0, log2(l / 0.18)));
    // --- saturation: none in deep shadow, less in highlights, foliage greens a touch less ---
    float l2 = postLuma(col);
    float sat = mix(uSaturation, uHighlightSat, smoothstep(0.3, 1.2, l2));
    float gmax = max(col.g, 1e-6);
    float green = clamp((col.g - max(col.r, col.b)) / gmax * 2.5, 0.0, 1.0);
    sat *= mix(1.0, uGreenSat, green);
    col = max(mix(vec3(l2), col, mix(1.0, sat, smoothstep(0.01, 0.12, l2))), 0.0);
    // --- midtone contrast in log2 around mid grey, slope back to 1 beyond +-uLogRange stops ---
    if (uLogContrast != 1.0) {
      float lc = max(postLuma(col), 1e-6);
      float x = log2(lc / 0.18);
      float rr = uLogRange;
      float y = x + (uLogContrast - 1.0) * rr * x * inversesqrt(rr * rr + x * x);
      col *= exp2(y - x);
    }
    if (uTone == 1) col = tmAces(col);
    else if (uTone == 2) col = tmAgx(col);
    else col = tmNeutral(col);
    col = clamp(col, 0.0, 1.0);
    // gentle contrast S-curve on sRGB-encoded values: f(x) = x + c*x(1-x)(2x-1), identity at 0 and 1
    if (uContrast != 0.0) {
      vec3 s = toSRGB(col);
      s = s + uContrast * s * (1.0 - s) * (2.0 * s - 1.0);
      col = fromSRGB(clamp(s, 0.0, 1.0));
    }
  }
  vec3 outc = toSRGB(col);
  uvec3 hs = uvec3(uvec2(gl_FragCoord.xy), uint(uFrame));
  if (uGrain > 0.0 && uNoPost < 0.5 && uDebugView == 0) {
    // soft film grain: per-pixel noise lightly correlated with its 4 neighbours
    // (~1.3 px grains), re-seeded every frame; strongest in the midtones, mostly
    // luminance with a little chroma
    uvec3 f = uvec3(0u, 0u, 131u);
    float n0 = postHash(hs + f) - 0.5;
    float nx = postHash(hs + f + uvec3(1u, 0u, 0u)) + postHash(hs + f - uvec3(1u, 0u, 0u))
             + postHash(hs + f + uvec3(0u, 1u, 0u)) + postHash(hs + f - uvec3(0u, 1u, 0u)) - 2.0;
    float n = (n0 * 0.75 + nx * 0.125) * 3.3;              // ~unit variance
    float cr = postHash(hs + uvec3(0u, 0u, 977u)) - 0.5;
    float cb = postHash(hs + uvec3(0u, 0u, 1543u)) - 0.5;
    float lum = dot(outc, vec3(0.2126, 0.7152, 0.0722));
    float amp = uGrain * (0.35 + 2.6 * lum * (1.0 - lum));   // ~1x at mid grey, less at the ends
    outc += amp * (vec3(n) + vec3(cr, 0.0, cb) * 0.35);
  }
  // triangular-PDF dither, +-1 LSB
  float dn = postHash(hs) + postHash(hs + uvec3(0u, 0u, 7919u)) - 1.0;
  outc += dn / 255.0;
  gl_FragColor = vec4(outc, 1.0);
}`;function Pt(e,t,n=null){let r=n?{...Mt[t]??Mt.photo,...n}:Mt[t]??Mt.photo,i=e.uniforms;for(let e in r){let t=r[e],n=i[`u`+e];n&&(Array.isArray(t)?n.value.set(t[0],t[1],t[2]):n.value=t)}}function Ft(e,t){let n=I({name:`composite`,uniforms:{...e.postUniforms,...t,tShafts:{value:null},tDepth:e.uniforms.tSceneDepth,tAO:{value:null},tAdapt:{value:null},uAutoExp:{value:0},uCalib:{value:jt.neutral.calib},uTone:{value:0},uShaftColor:{value:new M(0,0,0)},uShaftDist:{value:120},uShaftSky:{value:.15},uSunView:{value:new M(0,0,-1)},uShaftSharp:{value:64},uShadowTint:{value:new M(1,1,1)},uHighlightTint:{value:new M(1,1,1)},uSaturation:{value:1},uHighlightSat:{value:1},uGreenSat:{value:1},uLogContrast:{value:1},uLogRange:{value:2.2},uContrast:{value:0},uShoulder:{value:.62},uDesat:{value:.1},uToeChroma:{value:0},uVignette:{value:.2},uAspect:{value:new j(1,1)},uFrame:{value:0},uNoPost:{value:0},uCA:{value:0},uGrain:{value:0},uSharpen:{value:0},uTexel:{value:new j(1,1)},uDebugView:{value:0}},fragmentShader:Nt});return Pt(n,`photo`),n}var It=16,Lt=6,Rt=class{constructor(e){this.gl=e.getContext(),this.ext=this.gl.getExtension(`EXT_disjoint_timer_query_webgl2`),this.supported=!!this.ext,this.enabled=!1,this.labels=[],this.avg={},this.last={},this.frames=0,this._frames=[];for(let e=0;e<Lt;e++)this._frames.push({id:-1,n:0,labels:Array(It),queries:Array(It),busy:!1});this._free=[],this._frameId=0,this._cur=null,this._active=!1,this._samplers=[],this.api=this._makeApi()}_makeApi(){let e=this;return{get supported(){return e.supported},get enabled(){return e.enabled},get avg(){return e.avg},get last(){return e.last},get frames(){return e.frames},enable(){return e.enabled=e.supported,e.enabled},disable(){e.enabled=!1},reset(){e.avg={},e.last={},e.frames=0},sample(t=60){return e.supported?(e.enabled=!0,new Promise(n=>e._samplers.push({left:t,n:t,sums:{},resolve:n}))):Promise.resolve(null)}}}_query(){return this._free.pop()??this.gl.createQuery()}frameStart(){if(!this.supported||!this.enabled&&!this._cur&&!this._anyBusy())return;let e=this.gl;if(this._poll(),!this.enabled){this._cur=null;return}let t=null;for(let e of this._frames)if(!e.busy){t=e;break}if(!t){t=this._frames.reduce((e,t)=>e.id<t.id?e:t);for(let e=0;e<t.n;e++)this._free.push(t.queries[e])}t.id=this._frameId++,t.n=0,t.busy=!0,this._cur=t,e.getParameter(this.ext.GPU_DISJOINT_EXT)&&(this._disjoint=!0)}begin(e){if(!this._cur)return;this._active&&this.end();let t=this._cur;if(t.n>=It)return;let n=this._query();t.labels[t.n]=e,t.queries[t.n]=n,t.n++,this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT,n),this._active=!0}end(){this._active&&=(this.gl.endQuery(this.ext.TIME_ELAPSED_EXT),!1)}_poll(){let e=this.gl,t=e.getParameter(this.ext.GPU_DISJOINT_EXT)||this._disjoint;for(this._disjoint=!1;;){let n=null;for(let e of this._frames)e.busy&&e!==this._cur&&(!n||e.id<n.id)&&(n=e);if(!n)break;if(t){this._release(n);continue}let r=n.queries[n.n-1];if(n.n===0){this._release(n);continue}if(!e.getQueryParameter(r,e.QUERY_RESULT_AVAILABLE))break;let i=0;for(let e in this.last)this.last[e]=0;for(let t=0;t<n.n;t++){let r=e.getQueryParameter(n.queries[t],e.QUERY_RESULT)/1e6,a=n.labels[t];this.last[a]=(this.last[a]??0)+r,i+=r}this.last.total=i;let a=this.frames<10?1/(this.frames+1):.08;for(let e in this.last)this.avg[e]=(this.avg[e]??this.last[e])*(1-a)+this.last[e]*a;this.frames++;for(let e=this._samplers.length-1;e>=0;e--){let t=this._samplers[e];for(let e in this.last)t.sums[e]=(t.sums[e]??0)+this.last[e];if(--t.left<=0){let n={};for(let e in t.sums)n[e]=+(t.sums[e]/t.n).toFixed(4);this._samplers.splice(e,1),t.resolve(n)}}this._release(n)}}_anyBusy(){for(let e=0;e<this._frames.length;e++)if(this._frames[e].busy)return!0;return!1}_release(e){for(let t=0;t<e.n;t++)this._free.push(e.queries[t]);e.n=0,e.busy=!1}},zt=`
uniform sampler2D tMeter;     // smallest bloom mip, alpha = log2 luminance
uniform sampler2D tPrev;      // previous adapted texel
uniform vec2 uMeterRes;
uniform float uBlend;         // 0..1 smoothing weight toward the new value (1 = instant)
uniform float uBlendUp;       // weight when brightening (scene got darker)
uniform float uRefLog;
uniform vec2 uDead;           // (dead zone when brightening, when darkening) in EV
uniform vec2 uMaxEv;          // (max brighten, max darken) in EV
uniform float uStrength;
varying vec2 vUv;
void main() {
  float sum = 0.0, wsum = 0.0;
  int nx = int(uMeterRes.x), ny = int(uMeterRes.y);
  for (int y = 0; y < 64; y++) {
    if (y >= ny) break;
    for (int x = 0; x < 64; x++) {
      if (x >= nx) break;
      vec2 uv = (vec2(float(x), float(y)) + 0.5) / uMeterRes;
      vec2 q = uv - 0.5;
      float w = max(1.0 - 1.4 * dot(q, q), 0.05);
      sum += texelFetch(tMeter, ivec2(x, y), 0).a * w;
      wsum += w;
    }
  }
  float L = sum / max(wsum, 1e-4);
  float prev = texelFetch(tPrev, ivec2(0), 0).r;
  float k = L < prev ? uBlendUp : uBlend;
  float A = mix(prev, L, clamp(k, 0.0, 1.0));
  float d = uRefLog - A;                          // + = scene darker than reference
  float ev = d > 0.0 ? max(d - uDead.x, 0.0) : min(d + uDead.y, 0.0);
  ev = clamp(ev, -uMaxEv.y, uMaxEv.x) * uStrength;
  gl_FragColor = vec4(A, exp2(ev), ev, 1.0);
}`,Bt=class{constructor(e){this.pipeline=e,this.settings={ref:.5,deadUp:1,deadDown:1.2,maxUp:1.4,maxDown:.6,speedUp:.9,speedDown:2.2,strength:1},this.rts=[ct(1,1,{type:_,filter:C,name:`adapt.a`}),ct(1,1,{type:_,filter:C,name:`adapt.b`})],this.idx=0,this.mat=I({name:`adapt`,uniforms:{tMeter:{value:null},tPrev:{value:null},uMeterRes:{value:new j(1,1)},uBlend:{value:1},uBlendUp:{value:1},uRefLog:{value:-1},uDead:{value:new j},uMaxEv:{value:new j},uStrength:{value:1}},fragmentShader:zt}),this.current={value:this.rts[0].texture},this.instant=!0,this._lastPos=new M(1e9,0,0),this.info={ev:0,log:0},this._readBuf=new Float32Array(4),this._reading=!1}update(e,t,n,r){let i=this.settings,a=this.mat.uniforms;t.position.distanceToSquared(this._lastPos)>25&&(this.instant=!0),this._lastPos.copy(t.position);let o=this.instant||r;this.instant=!1,a.tMeter.value=e.texture,a.uMeterRes.value.set(Math.min(64,e.width),Math.min(64,e.height)),a.tPrev.value=this.rts[this.idx].texture,a.uBlend.value=o?1:1-Math.exp(-n*i.speedDown),a.uBlendUp.value=o?1:1-Math.exp(-n*i.speedUp),a.uRefLog.value=Math.log2(i.ref),a.uDead.value.set(i.deadUp,i.deadDown),a.uMaxEv.value.set(i.maxUp,i.maxDown),a.uStrength.value=i.strength,this.idx^=1;let s=this.rts[this.idx];this.pipeline.drawFullscreen(this.mat,s),this.current.value=s.texture}poll(e){!this._reading&&e.readRenderTargetPixelsAsync&&(this._reading=!0,e.readRenderTargetPixelsAsync(this.rts[this.idx],0,0,1,1,this._readBuf).then(()=>{this.info.log=this._readBuf[0],this.info.ev=this._readBuf[2]}).catch(()=>{}).finally(()=>{this._reading=!1}))}dispose(){for(let e of this.rts)e.dispose();this.mat.dispose()}},Vt=e({GRID_STEP:()=>Wt,HF_NOISE:()=>Ut,TERRAIN_LOD:()=>Kt,WORLD:()=>ye,cliffMask:()=>nn,cliffMaskGrid:()=>rn,distToPaths:()=>Cn,distToPolyline:()=>en,groundHeight:()=>vn,heightAt:()=>un,isWater:()=>xn,islandSDF:()=>Jt,lagoonSDF:()=>qt,latticeHeight:()=>_n,lodLevelAt:()=>gn,normalAt:()=>yn,slopeAt:()=>bn,streamBedAt:()=>hn,waterDepthAt:()=>Sn,waterSDF:()=>Qt}),L=new ke(7331),Ht=new ke(9127),Ut={N:L,N2:Ht},Wt=.5;function Gt(){let e=[{step:Wt,x0:-120,x1:120,z0:-88,z1:88}],t=[56,48,48,48,80,56,40];for(let n=1;n<=t.length;n++){let r=e[n-1],i=r.step*2,a=i*2,o=t[n-1]*i;e.push({step:i,x0:Math.floor((r.x0-o)/a)*a,x1:Math.ceil((r.x1+o)/a)*a,z0:Math.floor((r.z0-o)/a)*a,z1:Math.ceil((r.z1+o)/a)*a})}return e}var Kt=Gt();function qt(e,t){let n=1e9;for(let r=0;r<ve.length;r++){let i=ve[r],a=(e-i.x)/i.rx,o=(t-i.z)/i.rz,s=Math.sqrt(a*a+o*o),c=(s-1)*Math.min(i.rx,i.rz)*(.75+.25*Math.min(1,s));n=Oe(n,c,9)}return n+=L.noise2(e*.03,t*.03)*2.6+L.noise2(e*.09+17,t*.09)*.9,n}function Jt(e,t,n){return Zt(e,t,n)}var Yt=1.17,Xt=Se.map((e,t)=>t).sort((e,t)=>Se[t].r-Se[e].r);function Zt(e,t,n){let r=1e9,i=null,a=1e9;for(let n=0;n<Xt.length;n++){let o=Xt[n],s=Se[o],c=e-s.x,l=t-s.z,u=Math.sqrt(c*c+l*l);if(u-s.r*Yt>r)continue;let d=Math.atan2(l,c),f=Math.cos(d),p=Math.sin(d),m=1+.12*Ht.noise2(f*1.3+o*7.1,p*1.3)+.05*Ht.noise2(f*4+o,p*4),h=u-s.r*m;(h<r||h===r&&o<a)&&(r=h,i=s,a=o)}return n&&(n.island=i),r}function Qt(e,t){let n=qt(e,t),r=Zt(e,t);return Math.max(n,-r)}function $t(e,t){let n=0,r=0;for(let i of ve){let a=(e-i.x)/i.rx,o=(t-i.z)/i.rz,s=Math.exp(-(a*a+o*o)*2)+1e-4;n+=s,r+=s*i.depth}return r/n}function en(e,t,n){let r=1e9;for(let i=0;i<n.length-1;i++){let a=n[i][0],o=n[i][1],s=n[i+1][0],c=n[i+1][1],l=s-a,u=c-o,d=l*l+u*u,f=d>0?((e-a)*l+(t-o)*u)/d:0;f=De(f,0,1);let p=a+l*f-e,m=o+u*f-t,h=Math.sqrt(p*p+m*m);h<r&&(r=h)}return r}function tn(e){let t=be.baseZ;for(let n of be.bulges){let r=(e-n.x)/n.width;t+=n.amount*Math.exp(-r*r)}return t+L.noise2(e*.05,3.3)*2.2}function nn(e,t){let n=tn(e),r=N(n,n-be.faceWidth,t);if(r<=0)return 0;let i=Math.max(0,-t-60),a=be.westFadeX-26+10*L.noise2(t*.011,4.1)-.45*i,o=be.eastFadeX+22+8*L.noise2(t*.011,8.7)+.35*i,s=N(a-40,a+10,e)*(1-N(o-10,o+40,e)),c=1-N(260,380,-t+50*L.noise2(e*.006,2.2));return r*s*c}function rn(e,t){let n=e.length,r=t.length,i=new Float64Array(n),a=new Float64Array(n);for(let t=0;t<n;t++)i[t]=tn(e[t]),a[t]=L.noise2(e[t]*.006,2.2);let o=new Float32Array(n*r);for(let s=0;s<r;s++){let r=t[s],c=Math.max(0,-r-60),l=be.westFadeX-26+10*L.noise2(r*.011,4.1)-.45*c,u=be.eastFadeX+22+8*L.noise2(r*.011,8.7)+.35*c;for(let t=0;t<n;t++){let c=N(i[t],i[t]-be.faceWidth,r);if(c<=0)continue;let d=e[t],f=N(l-40,l+10,d)*(1-N(u-10,u+40,d)),p=1-N(260,380,-r+50*a[t]);o[s*n+t]=c*f*p}}return o}function an(e){return 0+2.1*(1-Math.exp(-e/13))+Math.max(0,e-22)*.028}var on={island:null},sn=xe.map(e=>{let t=e.width*2,n=1e9,r=1e9,i=-1e9,a=-1e9;for(let[t,o]of e.path)n=Math.min(n,t),r=Math.min(r,o),i=Math.max(i,t),a=Math.max(a,o);return[n-t,r-t,i+t,a+t]}),cn={wsd:0,r:0};function ln(e,t){let n=qt(e,t),r=Zt(e,t,on),i=Math.max(n,-r),a;if(i<0){let i=Math.max(0,-n),o=$t(e,t)*(.85+.25*L.noise2(e*.04+50,t*.04)),s=-1*(1-Math.exp(-i/3.2))-Math.max(0,o-1)*N(2.5,18,i),c=Math.max(0,r),l=-1*(1-Math.exp(-c/2))-.55*Math.max(0,c-1.5);a=0+Math.max(s,l),a+=L.noise2(e*.18,t*.18)*.12+Ht.noise2(e*.5,t*.5)*.04}else if(r<0&&n<4){let n=on.island,i=-r,o=1-Math.exp(-i/(.3*n.r));a=0+n.h*o;let s=(i-.25*n.r)/(.22*n.r),c=Math.exp(-s*s);a+=n.rocky*c*N(0,1.5,i)*(.35+.45*L.noise2(e*.35,t*.35)),a+=Ht.noise2(e*.6,t*.6)*.05;let l=Math.hypot(e-n.x,t-n.z);a=Ee(a,0+n.h,N(.45*n.r,.2*n.r,l))}else{let n=i,r=an(n);a=r,a+=L.noise2(e*.055,t*.055)*.14*N(2,20,n);let o=Ae(e,t,n);a+=o,n>250&&(a=Math.max(a,r+Me(e,t)));let s=nn(e,t);if(s>0){let r=be.height+L.fbm2(e*.03,t*.03,3)*2.2,i=tn(e)-t,o=N(35,140,i),c=o>0?Ae(e,t,Math.max(n,60+i*1.6)):0;a=Ee(a,Math.max(a,0+r+c*o),s),a+=s*Ht.ridged2(e*.05,t*.05,3)*1.6*(1-.8*o)}}let o=Math.sqrt(e*e+t*t);o>900&&(a+=je(e,t));for(let n of ge){let r=e-n.pool[0],i=t-n.pool[2],o=r*r+i*i,s=n.plungeR||4;if(o<s*s*4){let e=Math.exp(-o/(s*s*.5));a=Math.min(a,Ee(a,0-(n.plungeDepth||2),e))}}return cn.wsd=i,cn.r=o,a}function un(e,t){let n=ln(e,t),r=cn.wsd,i=cn.r;if(n=mn(e,t,n),r>.5&&i<260)for(let r=0;r<xe.length;r++){let i=sn[r];if(e<i[0]||t<i[1]||e>i[2]||t>i[3])continue;let a=xe[r],o=en(e,t,a.path);if(o<a.width*2){let e=1-N(a.width*.5,a.width*2,o);n-=e*.06}}return n}var dn=.25;function fn(e){let t=e.stream,n=[0],r=1e9,i=1e9,a=-1e9,o=-1e9;for(let e=0;e<t.length;e++)e>0&&n.push(n[e-1]+Math.hypot(t[e][0]-t[e-1][0],t[e][1]-t[e-1][1])),r=Math.min(r,t[e][0]),i=Math.min(i,t[e][1]),a=Math.max(a,t[e][0]),o=Math.max(o,t[e][1]);let s=n[n.length-1],c=Math.ceil(s/dn)+1,l=e=>{let r=0;for(;r<t.length-2&&n[r+1]<e;)r++;let i=De((e-n[r])/Math.max(1e-9,n[r+1]-n[r]),0,1);return[Ee(t[r][0],t[r+1][0],i),Ee(t[r][1],t[r+1][1],i)]},u=new Float64Array(c);for(let e=0;e<c;e++){let[t,n]=l(Math.min(s,e*dn));u[e]=ln(t,n)}let d=e.lip[1]-.3,f=u[0]-1,p=new Float64Array(c),m=1e9;for(let e=0;e<c;e++){let t=Math.min(1,e*dn/s),n=f+(d-f)*t;m=Math.min(m,n,u[e]-.7),p[e]=m}for(let e=0;e<2;e++){let e=new Float64Array(c);for(let t=0;t<c;t++){let n=0;for(let e=-8;e<=8;e++)n+=p[Math.min(c-1,Math.max(0,t+e))];e[t]=n/17}p=e}m=1e9;for(let e=0;e<c;e++)m=Math.min(m,p[e],u[e]-.5),p[e]=m;return{pts:t,cum:n,len:s,prof:Float32Array.from(p),n:c,box:[r-6,i-6,a+6,o+6]}}var pn=ge.map(fn);function mn(e,t,n){for(let r=0;r<pn.length;r++){let i=pn[r],a=i.box;if(e<a[0]||t<a[1]||e>a[2]||t>a[3])continue;let o=i.pts,s=1e9,c=0;for(let n=0;n<o.length-1;n++){let r=o[n][0],a=o[n][1],l=o[n+1][0]-r,u=o[n+1][1]-a,d=l*l+u*u,f=d>0?De(((e-r)*l+(t-a)*u)/d,0,1):0,p=r+l*f-e,m=a+u*f-t,h=Math.sqrt(p*p+m*m);h<s&&(s=h,c=i.cum[n]+f*(i.cum[n+1]-i.cum[n]))}if(s>=6)continue;let l=Math.exp(-(s*s)/3.2)*nn(e,t);if(l<=0)continue;let u=Math.min(i.n-1,c/dn),d=Math.min(i.n-2,Math.floor(u)),f=Ee(i.prof[d],i.prof[d+1],u-d);n>f&&(n-=(n-f)*l)}return n}function hn(e,t){let n=pn[e];if(!n)return NaN;let r=De(t/dn,0,n.n-1),i=Math.min(n.n-2,Math.floor(r));return Ee(n.prof[i],n.prof[i+1],r-i)}function gn(e,t){for(let n=0;n<Kt.length;n++){let r=Kt[n];if(e>=r.x0&&e<=r.x1&&t>=r.z0&&t<=r.z1)return n}return Kt.length-1}function _n(e,t,n){let r=Kt[e],i=r.step;if(e<Kt.length-1){let e=Math.round(r.x0/i),a=Math.round(r.x1/i),o=Math.round(r.z0/i),s=Math.round(r.z1/i);if((t===e||t===a)&&n&1)return .5*(un(t*i,(n-1)*i)+un(t*i,(n+1)*i));if((n===o||n===s)&&t&1)return .5*(un((t-1)*i,n*i)+un((t+1)*i,n*i))}return un(t*i,n*i)}function vn(e,t){let n=gn(e,t),r=Kt[n].step,i=e/r,a=t/r,o=Math.floor(i),s=Math.floor(a),c=i-o,l=a-s,u=_n(n,o+1,s),d=_n(n,o,s+1);if(c+l<=1){let e=_n(n,o,s);return e+(u-e)*c+(d-e)*l}let f=_n(n,o+1,s+1);return f+(d-f)*(1-c)+(u-f)*(1-l)}function yn(e,t,n=.35,r=[0,1,0]){let i=un(e+n,t)-un(e-n,t),a=un(e,t+n)-un(e,t-n),o=-i,s=2*n,c=-a,l=Math.hypot(o,s,c);return r[0]=o/l,r[1]=s/l,r[2]=c/l,r}function bn(e,t){let n=yn(e,t);return Math.acos(De(n[1],-1,1))*180/Math.PI}function xn(e,t){return un(e,t)<0}function Sn(e,t){return Math.max(0,0-un(e,t))}function Cn(e,t){let n=1e9;for(let r of xe)n=Math.min(n,en(e,t,r.path)-r.width*.5);for(let r of we)n=Math.min(n,en(e,t,r.path)-r.width*.5);return n}pe.lagoon_depth=`
uniform sampler2D tSceneColor;
uniform sampler2D tSceneDepth;
uniform vec2 uResolution;      // drawing-buffer pixels
uniform float uCameraNear;
uniform float uCameraFar;
uniform mat4 uProjectionInverse;
uniform mat4 uViewInverse;
float lagoonLinearDepth(float d) {       // non-linear [0,1] -> view distance along -z (m)
  float z = d * 2.0 - 1.0;
  return (2.0 * uCameraNear * uCameraFar) / (uCameraFar + uCameraNear - z * (uCameraFar - uCameraNear));
}
vec3 lagoonViewPosFromDepth(vec2 uv, float d) {
  vec4 clip = vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec4 v = uProjectionInverse * clip;
  return v.xyz / v.w;
}
vec3 lagoonWorldPosFromDepth(vec2 uv, float d) {
  return (uViewInverse * vec4(lagoonViewPosFromDepth(uv, d), 1.0)).xyz;
}
`;var wn=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;function Tn(){let e=new te;return e.setAttribute(`position`,new d([-1,-1,0,3,-1,0,-1,3,0],3)),e.setAttribute(`uv`,new d([0,0,2,0,0,2],2)),e}var En=class{constructor(e){this.engine=e;let t=e.renderer,n=e.quality;this.quality=n;let r=ut(n);this.tier=r,t.autoClear=!1,t.shadowMap.autoUpdate=!1;let i=t.getDrawingBufferSize(new j),o=Math.max(1,i.x),s=Math.max(1,i.y),c=new T(o,s);c.type=m,this.opaqueRT=new D(o,s,{type:S,samples:n.msaa,depthBuffer:!0,depthTexture:c,minFilter:g,magFilter:g,generateMipmaps:!1});let l=P.get(`taa`),u=!P.nopost&&(l===`1`||l!==`0`&&r>=3),d;u&&(d=new T(o,s),d.type=m),this.compositeRT=new D(o,s,{type:S,depthBuffer:!0,depthTexture:d??null,minFilter:g,magFilter:g,generateMipmaps:!1}),this.uniforms={tSceneColor:{value:this.opaqueRT.texture},tSceneDepth:{value:this.opaqueRT.depthTexture},uResolution:{value:new j(o,s)},uCameraNear:{value:e.camera.near},uCameraFar:{value:e.camera.far},uProjectionInverse:{value:new k},uViewInverse:{value:new k},uUnderwater:{value:0}},this.postUniforms={uCamNear:this.uniforms.uCameraNear,uCamFar:this.uniforms.uCameraFar,uProjParams:{value:new O(1,1,0,0)}},this.fsCamera=new a(-1,1,1,-1,0,1),this.fsQuad=new w(Tn()),this.fsQuad.frustumCulled=!1,this.copyMat=new se({uniforms:{tColor:this.uniforms.tSceneColor,tDepth:this.uniforms.tSceneDepth},vertexShader:wn,fragmentShader:`
        uniform sampler2D tColor; uniform sampler2D tDepth; varying vec2 vUv;
        void main() {
          ivec2 p = ivec2(gl_FragCoord.xy);
          gl_FragColor = texelFetch(tColor, p, 0);
          gl_FragDepth = texelFetch(tDepth, p, 0).r;
        }`,depthTest:!0,depthWrite:!0,depthFunc:1});let f=P.get(`tone`);this.settings={tone:f&&jt[f]?f:`neutral`,ao:!!n.ssao&&!P.has(`noao`),bloom:!!n.bloom&&!P.has(`nobloom`),shafts:!!n.sunShafts&&!P.has(`noshafts`),underwater:!P.has(`nounderwater`),debugView:+!!P.has(`aoview`),taa:u,autoExposure:!!n.bloom&&!P.has(`noautoexp`),grade:Mt[P.get(`grade`)]?P.get(`grade`):`photo`,grain:P.has(`nograin`)?0:P.num(`grain`,r>=4?.011:r>=3?.008:0),ca:P.has(`noca`)?0:P.num(`ca`,r>=4?6e-4:0)},this.post={exposure:{value:P.num(`exposure`,1)},tInput:{value:this.compositeRT.texture},tBloom:{value:null},uBloomStrength:{value:0}},this.compositeMat=Ft(this,this.post),this.compositeMat.uniforms.uNoPost.value=+!!P.nopost,this._grade=null,this.gradeOverrides=null,this.ao=n.ssao?new gt(this,n):null,this.bloom=n.bloom?new Tt(this,r>=3?7:6):null,this.shafts=n.sunShafts?new Ot(this,r>=3?2:4):null,this.underwater=new At(this),this.taa=u?new bt(this):null,this.adapt=this.bloom?new Bt(this):null,this._aoInPlace=this.opaqueRT.samples>0&&!t.extensions.has(`WEBGL_multisampled_render_to_texture`),this.compositeMat.uniforms.tAO.value=this.ao?this.ao.texture:null,this.timer=new Rt(t),(P.debug||P.has(`gpu`))&&this.timer.api.enable(),typeof window<`u`&&window.__lagoon&&(window.__lagoon.gpu=this.timer.api),this.preRender=[],this.postOpaque=[],this.postPasses=[],this.stats={calls:0,triangles:0,programs:0,geometries:0,textures:0,postCalls:0},this._camMask=0,this._frame=0,this._fsDraws=0,this._warm=0,this._sunDir=new M,this._sizeV=new j,this._resizePasses(o,s)}_resizePasses(e,t){this.ao?.setSize(e,t),this.taa?.setSize(e,t),this.bloom?.setSize(e,t),this.shafts?.setSize(e,t),this.underwater.setSize(e,t);let n=e/Math.max(1,t),r=Math.hypot(n*.5,.5);this.compositeMat.uniforms.uAspect.value.set(n/r,1/r)}setSize(){let e=this.engine.renderer.getDrawingBufferSize(this._sizeV),t=Math.max(1,e.x),n=Math.max(1,e.y);this.opaqueRT.setSize(t,n),this.compositeRT.setSize(t,n);for(let e of[this.opaqueRT,this.compositeRT]){let r=e.depthTexture;r?.image&&(r.image.width=t,r.image.height=n)}this.uniforms.uResolution.value.set(t,n),this._resizePasses(t,n);for(let e of this._resize||[])e(t,n)}onResize(e){(this._resize||=[]).push(e)}setTone(e){jt[e]&&(this.settings.tone=e)}setGrade(e,t=null){Mt[e]&&(this.settings.grade=e),this.gradeOverrides=t,this._grade=null}setExposure(e){this.post.exposure.value=e}get toneCalibration(){return jt[this.settings.tone].calib}drawFullscreen(e,t){let n=this.engine.renderer;this.fsQuad.material=e,this._fsDraws++,n.setRenderTarget(t??null),n.render(this.fsQuad,this.fsCamera)}_underwaterAmount(e){let t=F.uCameraUnderwater.value,n=F.uWaterLevel.value,r=e.position;return t<1&&r.y<n-.08&&Sn(r.x,r.z)>.05&&(t=1),Math.min(1,Math.max(0,t))}render(e){let{renderer:t,scene:n,camera:r}=this.engine,i=this.settings,a=this.timer,o=P.nopost,s=this._warm<1;t.info.reset(),this._fsDraws=0,a.frameStart(),r.updateMatrixWorld();let c=!!this.taa&&!o&&(i.taa||s);c&&i.taa&&this.taa.jitter(r,this._frame),this.uniforms.uCameraNear.value=r.near,this.uniforms.uCameraFar.value=r.far,this.uniforms.uProjectionInverse.value.copy(r.projectionMatrixInverse),this.uniforms.uViewInverse.value.copy(r.matrixWorld),dt(r,this.postUniforms.uProjParams.value);let l=i.underwater?this._underwaterAmount(r):0;this.uniforms.uUnderwater.value=l;let u=r.layers.mask;a.begin(`reflect`);for(let i of this.preRender)i(t,n,r,e);a.begin(`opaque`),r.layers.mask=u,r.layers.disable(et.WATER),r.layers.disable(et.FX),t.shadowMap.needsUpdate=!0,t.setRenderTarget(this.opaqueRT),t.setClearColor(0,1),t.clear(!0,!0,!1),t.render(n,r),t.shadowMap.needsUpdate=!1,r.layers.mask=u;let d=this.ao&&!o&&(i.ao||s||i.debugView===1);if(d&&(a.begin(`ao`),this.ao.applyMat.uniforms.uExposureRef.value=1,this.ao.compute(),this._aoInPlace&&i.ao)){let e=this.opaqueRT;e.resolveDepthBuffer=!1,this.drawFullscreen(this.ao.applyMat,e),e.resolveDepthBuffer=!0}if(a.begin(`copy`),t.setRenderTarget(this.compositeRT),t.clear(!0,!0,!1),this.drawFullscreen(this.copyMat,this.compositeRT),d&&!this._aoInPlace&&i.ao&&this.drawFullscreen(this.ao.applyMat,this.compositeRT),this.postOpaque.length){a.begin(`postOpaque`);for(let e of this.postOpaque)e(t,this)}a.begin(`water`),t.setRenderTarget(this.compositeRT),r.layers.set(et.WATER),t.render(n,r),r.layers.set(et.FX),t.render(n,r),r.layers.mask=u;let f=this.compositeRT.texture;if(c){this.taa.restore(r),a.begin(`taa`);let e=this.taa.render(f,this.compositeRT.depthTexture,r,this._frame);i.taa&&(f=e)}if(!o&&(l>0||s)){a.begin(`underwater`);let e=this.underwater.render(f,r,Math.max(l,0));l>0&&(f=e)}if(this.postPasses.length){a.begin(`post`);for(let e of this.postPasses){let n=e(t,this,f);n&&(f=n)}}let p=this.compositeMat.uniforms,m=this.post.exposure.value*this.toneCalibration;if(p.uShaftColor.value.set(0,0,0),this.shafts&&!o&&(i.shafts||s)){this._sunDir.copy(F.uSunDir.value).normalize();let e=l>0?0:this.shafts.update(r,this._sunDir);if((e>.001||s)&&(a.begin(`shafts`),p.tShafts.value=this.shafts.render(),i.shafts&&e>.001)){let t=F.uFogSunColor.value,n=this.shafts.settings.amount*e;p.uShaftColor.value.set(t.r*n,t.g*n,t.b*n),p.uShaftDist.value=this.shafts.settings.distScale,p.uShaftSky.value=this.shafts.settings.skyFactor,p.uShaftSharp.value=this.shafts.settings.sharpness,p.uSunView.value.copy(this.shafts.sunView)}}this.post.uBloomStrength.value=0;let h=!!this.adapt&&i.autoExposure&&!o;if(this.bloom&&!o&&(i.bloom||h||s)){a.begin(`bloom`);let n=this.bloom.render(f,m,h?this.adapt.current.value:null);i.bloom&&(this.post.tBloom.value=n,this.post.uBloomStrength.value=this.bloom.compositeScale),(h||s)&&(this.adapt.update(this.bloom.meterTarget,r,e,P.capture||s),P.debug&&!(this._frame&15)&&this.adapt.poll(t))}p.uAutoExp.value=+!!h,p.tAdapt.value=this.adapt?this.adapt.current.value:null,a.begin(`composite`),this.post.tInput.value=f,p.uCalib.value=this.toneCalibration,p.uTone.value=jt[i.tone].id,p.uFrame.value=this._frame&65535,p.uDebugView.value=this.ao?i.debugView:0,this._grade!==i.grade&&(Pt(this.compositeMat,i.grade,this.gradeOverrides),this._grade=i.grade),p.uGrain.value=i.grain,p.uSharpen.value=c&&i.taa?this.taa.settings.sharpen:0,p.uTexel.value.set(1/this.uniforms.uResolution.value.x,1/this.uniforms.uResolution.value.y),p.uCA.value=i.ca,this.drawFullscreen(this.compositeMat,null),a.end(),this._frame++,s&&this._warm++;let g=t.info;this.stats.calls=g.render.calls,this.stats.triangles=g.render.triangles,this.stats.programs=g.programs?.length??0,this.stats.geometries=g.memory.geometries,this.stats.textures=g.memory.textures,this.stats.postCalls=this._fsDraws}};function Dn(e){return{traverse(t){for(let n=0;n<e.length;n++){let r=e[n];r.drawState&&Object.assign(r.material,r.drawState),t(r)}},traverseVisible(){}}}var On=[`side`,`map`,`alphaMap`,`alphaTest`,`displacementMap`,`displacementScale`,`clipShadows`,`clippingPlanes`,`clipIntersection`,`wireframe`,`visible`];function kn(e){if(!(e.isMeshDepthMaterial||e.isMeshDistanceMaterial))return{side:e.side};let t={};for(let n of On)t[n]=e[n];return t}function An(e,t){let n=Object.create(e);return n.material=t,n.drawState=kn(t),n}var jn=16588800,Mn=class{constructor(e){this.container=e,this.params=P;let t=new me({antialias:!1,alpha:!1,powerPreference:`high-performance`,stencil:!1,depth:!0,preserveDrawingBuffer:P.capture});this.gpu=Ye(t.getContext()),this.quality=$e(this.gpu);let n=t.capabilities.maxTextureSize||4096;this.quality.shadowMapSize=Math.min(this.quality.shadowMapSize,n),this.quality.textureSize=Math.min(this.quality.textureSize,n),this.parallelCompile=t.extensions.has(`KHR_parallel_shader_compile`),this.renderScale=P.has(`scale`)?Ke(P.num(`scale`,1)):qe(),this.pixelScale=1,t.setPixelRatio(this._pixelRatio(e.clientWidth,e.clientHeight)),t.setSize(e.clientWidth,e.clientHeight,!1),t.outputColorSpace=h,t.toneMapping=0,t.shadowMap.enabled=!0,t.shadowMap.type=1,t.info.autoReset=!1,e.appendChild(t.domElement),t.domElement.style.display=`block`,t.domElement.style.width=`100%`,t.domElement.style.height=`100%`,this.renderer=t,this.canvas=t.domElement,this.scene=new ee,this.scene.matrixWorldAutoUpdate=!0;let r=e.clientWidth/Math.max(1,e.clientHeight);this.camera=new ie(P.fov??70,r,.1,9e3),this.camera.layers.enable(et.OPAQUE),this.camera.layers.enable(et.NO_REFLECT),this.camera.rotation.order=`YXZ`,this.scene.add(this.camera),this.pipeline=new En(this),this.updaters=[],this.time=P.freeze??0,this.frame=0,this._last=0,this.running=!1,this._resizeHandlers=[],this.dynres=new Rn(this,!P.capture&&!P.has(`playertest`)&&!P.has(`nodynres`)),window.addEventListener(`resize`,()=>this.resize())}addUpdate(e,t=0){return this.updaters.push({fn:e,order:t}),this.updaters.sort((e,t)=>e.order-t.order),()=>{this.updaters=this.updaters.filter(t=>t.fn!==e)}}onResize(e){this._resizeHandlers.push(e)}resize(){let e=this.container.clientWidth,t=this.container.clientHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/Math.max(1,t),this.camera.updateProjectionMatrix(),this.pipeline.setSize(e,t);for(let e of[this.pipeline.opaqueRT,this.pipeline.compositeRT]){let t=e?.depthTexture;t&&(t.image.width!==e.width||t.image.height!==e.height)&&(t.image.width=e.width,t.image.height=e.height)}for(let n of this._resizeHandlers)n(e,t)}_pixelRatio(e=this.container.clientWidth,t=this.container.clientHeight){let n=this.quality.pixelRatio*this.pixelScale,r=n*this.renderScale;return this.renderScale>1&&(r=Math.min(r,Math.max(n,Math.sqrt(jn/Math.max(1,e*t))))),Math.max(.25,r)}_applyPixelRatio(){let e=this._pixelRatio();Math.abs(this.renderer.getPixelRatio()-e)<.001||(this.renderer.setPixelRatio(e),this.resize())}setPixelScale(e){this.pixelScale=e,this._applyPixelRatio()}setRenderScale(e){return this.renderScale=Ke(e),this._applyPixelRatio(),this.renderScale}update(e){e=Math.min(e,1/20),P.freeze===null&&(this.time+=e),F.uTime.value=this.time;let t=this.updaters;for(let n=0;n<t.length;n++)t[n].fn(e,this.time);return e}render(e){this.pipeline.render(e),this.frame++}step(e){this.render(this.update(e))}start(){if(this.running)return;this.running=!0,this._last=performance.now(),this.dynres.reset(3e3);let e=this._gen=(this._gen||0)+1,t=n=>{if(!this.running||e!==this._gen)return;requestAnimationFrame(t);let r=Math.max(0,n-this._last);this._last=n,this.dynres.sample(r),this.step(r/1e3)};requestAnimationFrame(t)}stop(){this.running=!1,this._gen=(this._gen||0)+1}compileObjects(e){if(!e.length)return;let t=this.renderer,n=t.getRenderTarget();t.setRenderTarget(this.pipeline.opaqueRT);try{t.compile(Dn(e),this.camera,this.scene)}finally{t.setRenderTarget(n)}}_forceAll(e){let t=this.renderer,n=this.pipeline,r=[],i=[],a=[];this.scene.traverse(t=>{if(t.isLight){t.castShadow&&t.shadow&&(i.push(t.shadow,t.shadow.needsUpdate),e&&t.shadow.autoUpdate===!1&&(t.shadow.needsUpdate=!1));return}t.isCamera||(r.push(t,t.visible,t.frustumCulled),t.visible=!0,t.frustumCulled=!1,t.isLOD&&(a.push(t,t.autoUpdate),t.autoUpdate=!1))});let o=n._frame,s=n._warm,c=t.shadowMap.needsUpdate;return()=>{for(let e=0;e<r.length;e+=3)r[e].visible=r[e+1],r[e].frustumCulled=r[e+2];for(let e=0;e<a.length;e+=2)a[e].autoUpdate=a[e+1];for(let e=0;e<i.length;e+=2)i[e].needsUpdate=i[e+1];n._frame=o,n._warm=s,t.shadowMap.needsUpdate=c}}compileFrame(e=1/60){let t=this.renderer,n=this.pipeline,r=new Map,i=new Set,a=[],o=this._forceAll(!1),s=t.render,c=t.renderBufferDirect;t.render=function(e,t){a.push(e,t);try{return s.call(this,e,t)}finally{a.length-=2}},t.renderBufferDirect=function(e,n,o,s,c){let l=a.length,u=n||a[l-2],d=a[l-1]||e;if(!u||!s||!c)return;let f=t.getRenderTarget(),p=d.layers.mask,m=u.id+`:`+d.id+`:`+ +!!f+`:`+p,h=r.get(m);h||r.set(m,h={scene:u,camera:d,target:f,mask:p,list:[]});let g=m+`:`+s.id+`:`+c.id+`:`+s.side+`:`+(s.map?s.map.id:0);i.has(g)||(i.add(g),h.list.push(An(c,s)))};try{n.render(e)}finally{t.render=s,t.renderBufferDirect=c,o()}let l=t.getRenderTarget(),u=new Map;for(let e of r.values())for(let t of e.list)u.has(t.material)||u.set(t.material,kn(t.material));let d=0;for(let e of r.values()){let n=e.camera.layers.mask;e.camera.layers.mask=e.mask;try{t.setRenderTarget(e.target),t.compile(Dn(e.list),e.camera,e.scene)}catch(e){console.warn(`[lagoon] warm-up compile failed for a pass:`,e)}finally{e.camera.layers.mask=n}d+=e.list.length}for(let[e,t]of u)Object.assign(e,t);return t.setRenderTarget(l),{draws:d,groups:r.size}}drawAll(e=1/60){let t=this._forceAll(!0);try{this.pipeline.render(e)}finally{t()}}programsPending(){let e=this.renderer.info.programs,t=0;for(let n=0;n<e.length;n++)e[n].isReady()||t++;return t}async waitForPrograms(e=null,t=12e4){let n=performance.now();for(;;){let r=this.renderer.info.programs,i=0;for(let e=0;e<r.length;e++)r[e].isReady()&&i++;if(e?.(i,r.length),i>=r.length)return!0;if(performance.now()-n>t)return!1;await new Promise(e=>setTimeout(e,16))}}async gpuIdle(e=15e3){let t=this.renderer.getContext();if(!t.fenceSync)return;let n=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);if(!n)return;t.flush();let r=performance.now();for(;t.getSyncParameter(n,t.SYNC_STATUS)!==t.SIGNALED&&performance.now()-r<e;)await new Promise(e=>setTimeout(e,8));t.deleteSync(n)}},Nn=[1,.875,.75],Pn=28,Fn=17.5,In=3e3,Ln=12e3,Rn=class{constructor(e,t){this.engine=e,this.enabled=t,this.level=0,this.scale=1,this.banned=new Uint8Array(Nn.length),this.buf=new Float32Array(512),this.tmp=new Float32Array(512),this.n=0,this.acc=0,this.grace=0,this.upAt=-1e9,this.clock=0,this.changes=0}reset(e=0){this.n=0,this.acc=0,this.grace=e}sample(e){if(!this.enabled)return;if(e>250||document.hidden){this.n=0,this.acc=0;return}if(this.clock+=e,this.grace>0){this.grace-=e;return}if(this.n<this.buf.length&&(this.buf[this.n++]=e),this.acc+=e,this.acc<In)return;let t=this._median();this.n=0,this.acc=0,t>Pn&&this.level<Nn.length-1?(this.clock-this.upAt<Ln&&(this.banned[this.level]=1),this._set(this.level+1)):t<Fn&&this.level>0&&!this.banned[this.level-1]&&(this.upAt=this.clock,this._set(this.level-1))}_median(){let e=this.n,t=this.tmp;for(let n=0;n<e;n++)t[n]=this.buf[n];let n=t.subarray(0,e);return n.sort(),e?n[e>>1]:0}_set(e){this.level=e,this.scale=Nn[e],this.changes++,this.engine.setPixelScale(this.scale),this.grace=1e3,window.__lagoon&&(window.__lagoon.renderScale=this.scale)}};pe.lagoon_common=`
uniform float uTime;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform vec3 uSkyZenith;
uniform vec3 uSkyHorizon;
uniform float uWaterLevel;
uniform float uCameraUnderwater;
uniform float uFogDensity;
uniform float uFogHeightFalloff;
uniform vec3 uFogColor;
uniform vec3 uFogSunColor;
uniform float uFogSunPower;
uniform vec3 uFogChroma;
uniform sampler2D tSkyView;
uniform float uSkyViewReady;
uniform float uCausticsStrength;
uniform vec3 uLagoonBounce;
uniform float uLagoonBounceStrength;
uniform vec3 uWaterAbsorb;
uniform sampler2D tLagoonMask;
uniform vec4 uLagoonMaskBounds;
uniform float uLagoonMaskReady;
uniform sampler2DShadow tShadowAtlas;
uniform sampler2DShadow tShadowStatic;
uniform mat4 uShadowMat[3];
uniform vec4 uShadowRect[3];
uniform vec4 uShadowParams[3];
uniform float uShadowCascades;
uniform mat4 uShadowStaticMat;
uniform vec4 uShadowStaticParams;
uniform float uShadowStaticOn;
uniform sampler2D tShadowStaticDepth;
uniform float uShadowStaticRange;
uniform float uShadowPenumbra;
uniform float uShadowDebug;
uniform float uShadowHQ;
uniform vec4 uShadowSplit;
uniform sampler2D tSkyOcc;
uniform vec4 uSkyOccBounds;
uniform vec2 uSkyOccDecode;
uniform vec4 uSkyOccParams;
uniform float uSkyOccOn;
uniform vec3 uSkyOccBounce;
uniform vec4 uCanopyParams;
uniform vec3 uCanopyFill;
uniform sampler2D tGroundBounce;
uniform vec4 uGroundBounceBounds;
uniform vec4 uGroundBounceParams;
uniform vec3 uEnvGround;
uniform vec2 uHazeNear;
uniform float uLightDebug;         // ?lightdebug=1 ground bounce, 2 sky visibility (red solid, green canopy), 3 lagoon mask
uniform vec4 uLightFx;             // x micro-shadowing, y rough diffuse (EON), z horizon occlusion, w - (globals.js)
vec3 lagoonShadowTint = vec3(1.0); // debug: which cascade served the last lookup
float lagoonGroundMapValid = 0.0;  // set by the IBL block where the ground-bounce map covers the fragment
float lagoonCanopyCover = 0.0;     // share of the sky replaced by tree canopy (set by lagoonSkyVisibility)
float lagoonCanopyI = 0.0;         // canopy share blocked in the ~30 deg zenith cone / the 30-56 deg ring (lagoonSkyVisibility)
float lagoonCanopyR = 0.0;
float lagoonSolidVis = 1.0;        // sky visibility left by solid cover (roofs, decks) alone
vec3 lagoonDebugColor = vec3(0.0); // ?lightdebug output (patched materials)
vec3 lagoonSunDiffuse = vec3(0.0); // the sun's share of reflectedLight.directDiffuse / directSpecular (sun block)
vec3 lagoonSunSpecular = vec3(0.0);
vec3 lagoonSunDirView = vec3(0.0, 0.0, 1.0); // toward the sun, view space (sun block)

#define LAGOON_PI 3.14159265
#define LAGOON_WATER_IOR 1.333

// ---------------------------------------------------------------- rough diffuse
// Energy-preserving Oren-Nayar ("EON", Portsmouth, Kutz and Hill 2024, the
// OpenPBR diffuse): rough diffuse reflectance relative to Lambert for unit
// normal n, light l and view v (same space), roughness r (0..1) and albedo rho.
// Rough natural surfaces (sand, rock, bark, weathered wood, thatch) scatter the
// light back toward the source: brighter than Lambert with the sun behind the
// viewer and under a grazing sun, flatter and darker looking into the sun. The
// multiple-scattering term keeps the mean albedo (no energy lost or gained).
float lagoonEFON(float mu, float r) {
  float mc = 1.0 - mu;
  float g = mc * (0.0571085289 + mc * (0.491881867 + mc * (-0.332181442 + mc * 0.0714429953)));
  return (1.0 + r * g) / (1.0 + (0.5 - 2.0 / (3.0 * LAGOON_PI)) * r);
}
vec3 lagoonEONRatio(vec3 n, vec3 l, vec3 v, float r, vec3 rho) {
  float mi = clamp(dot(n, l), 1e-4, 1.0);
  float mo = clamp(dot(n, v), 1e-4, 1.0);
  float s = dot(l, v) - mi * mo;
  float sot = s > 0.0 ? s / max(mi, mo) : s;
  float AF = 1.0 / (1.0 + (0.5 - 2.0 / (3.0 * LAGOON_PI)) * r);
  float fss = AF * (1.0 + r * sot);
  float avgEF = AF * (1.0 + (2.0 / 3.0 - 28.0 / (15.0 * LAGOON_PI)) * r);
  float ems = max(1e-5, 1.0 - lagoonEFON(mo, r)) * max(1e-5, 1.0 - lagoonEFON(mi, r)) / max(1e-5, 1.0 - avgEF);
  vec3 rhoMs = rho * avgEF / max(vec3(1.0) - rho * (1.0 - avgEF), vec3(1e-3));   // multiple-scattering albedo / rho
  return max(vec3(fss) + rhoMs * ems, vec3(0.0));
}

// ---------------------------------------------------------------- sky + haze
// Sky-view LUT: u = azimuth relative to the sun (0..pi), v = elevation with a
// square-root mapping that concentrates texels at the horizon.
vec2 lagoonSkyViewUV(vec3 d) {
  float el = asin(clamp(d.y, -1.0, 1.0));
  vec2 sh = uSunDir.xz / max(length(uSunDir.xz), 1e-5);
  float lh = length(d.xz);
  float cphi = lh > 1e-5 ? dot(d.xz / lh, sh) : 1.0;
  float u = acos(clamp(cphi, -1.0, 1.0)) * (1.0 / LAGOON_PI);
  float v = 0.5 + 0.5 * sign(el) * sqrt(abs(el) * (2.0 / LAGOON_PI));
  return vec2((u * 255.0 + 0.5) / 256.0, (v * 127.0 + 0.5) / 128.0);
}

// Linear radiance of the clear sky in direction d (no sun disk, no clouds).
vec3 lagoonSkyRadiance(vec3 d) {
  vec3 c = mix(uSkyHorizon, uSkyZenith, sqrt(clamp(d.y, 0.0, 1.0)));
  if (uSkyViewReady > 0.5) c = textureLod(tSkyView, lagoonSkyViewUV(d), 0.0).rgb;
  return c;
}

// In-scattered radiance of the low haze for a view ray: the horizontal sky
// radiance in the ray's azimuth (the asymptotic in-scatter of the lower air).
vec3 lagoonHazeColor(vec3 rd) {
  float l = length(rd.xz);
  vec2 h = l > 1e-4 ? rd.xz / l : vec2(1.0, 0.0);
  vec3 d = vec3(h.x * 0.99985, 0.0175, h.y * 0.99985); // ~1 degree above the horizon
  vec3 c = uFogColor;
  if (uSkyViewReady > 0.5) {
    c = textureLod(tSkyView, lagoonSkyViewUV(d), 0.0).rgb;
  } else {
    float sunAmt = max(dot(d, uSunDir), 0.0);
    float s2 = sunAmt * sunAmt; float s4 = s2 * s2; float s8 = s4 * s4;
    c = mix(uFogColor, uFogSunColor, mix(s4, s8, clamp((uFogSunPower - 4.0) / 4.0, 0.0, 1.0)));
  }
  return c;
}

// Optical depth of an exponential height layer (extinction dens per metre at
// height 0, falloff b per metre) along a ray from height h0 rising rdy per metre
// over dist metres (analytic integral).
float lagoonLayerDepth(float dens, float b, float h0, float rdy, float dist) {
  b = max(b, 1e-6);
  float k = b * rdy * dist;
  float base = dens * exp(-b * h0);
  float o = abs(k) < 1e-4 ? base * dist : base * dist * (1.0 - exp(-k)) / k;
  return max(o, 0.0);
}

// Optical depth of the basin haze along a ray: the thin humid layer lives over
// the oasis only (a disk of radius LAGOON_BASIN_R around the village), so only
// the part of the ray inside that disk counts (analytic chord).
#define LAGOON_BASIN_R 170.0
float lagoonBasinDepth(vec3 rd, float dist, float h0) {
  if (uHazeNear.x <= 0.0) return 0.0;
  vec2 oc = cameraPosition.xz;             // disk centred on the village (0, 0)
  float a = dot(rd.xz, rd.xz);
  float c = dot(oc, oc) - LAGOON_BASIN_R * LAGOON_BASIN_R;
  float t0 = 0.0, t1 = dist;
  if (a > 1e-6) {
    float bq = dot(oc, rd.xz);
    float disc = bq * bq - a * c;
    if (disc <= 0.0) return 0.0;
    float s = sqrt(disc);
    t0 = max((-bq - s) / a, 0.0);
    t1 = min((-bq + s) / a, dist);
  } else if (c > 0.0) return 0.0;           // vertical ray outside the disk
  if (t1 <= t0) return 0.0;
  return lagoonLayerDepth(uHazeNear.x, uHazeNear.y, max(h0 + rd.y * t0, 0.0), rd.y, t1 - t0);
}

// Aerial perspective: exponential height haze (analytic optical depth along the
// ray, per-channel extinction) with sky-matched in-scatter. worldPos in metres.
// Two layers: the regional desert haze (scale height ~600 m: the far dunes and
// mountains) and a thin basin layer over the oasis (humid, dusty air, scale
// height ~45 m, uHazeNear) that gives houses 50-200 m away a hint of depth. The
// basin layer only exists over the oasis (lagoonBasinDepth), so the far desert
// keeps the regional haze it was tuned with.
vec3 lagoonAtmosphere(vec3 col, vec3 worldPos) {
  vec3 rd = worldPos - cameraPosition;
  float dist = length(rd);
  if (dist < 1e-3) return col;
  rd /= dist;
  float h0 = max(cameraPosition.y - uWaterLevel, -5.0);
  float optical = lagoonLayerDepth(uFogDensity, uFogHeightFalloff, h0, rd.y, dist);
  float basin = lagoonBasinDepth(rd, dist, max(h0, 0.0));
  // basin haze: larger droplets / dust, closer to grey extinction than the regional aerosol
  vec3 T = exp(-optical * uFogChroma - basin * mix(vec3(1.0), uFogChroma, 0.5));
  return col * T + lagoonHazeColor(rd) * (1.0 - T);
}

// ---------------------------------------------------------------- masks
float lagoonHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// Water proximity (1 over / near the lagoon). Patched materials read the copy
// lighting.js packs into the sky-occlusion map's alpha (LAGOON_MASK_IN_SKYOCC:
// saves them a texture unit; the lagoon lies well inside that map); custom
// shaders read the water module's mask itself.
float lagoonMaskAt(vec3 wpos) {
#if defined( LAGOON_MASK_IN_SKYOCC ) && !defined( LAGOON_NO_SKYOCC )
  vec2 uv = vec2((wpos.x - uSkyOccBounds.x) * uSkyOccBounds.z, (uSkyOccBounds.y - wpos.z) * uSkyOccBounds.w);
  if (uSkyOccOn < 0.5 || uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 0.0;
  return textureLod(tSkyOcc, uv, 0.0).a;
#else
  vec2 uv = (wpos.xz - uLagoonMaskBounds.xy) / uLagoonMaskBounds.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 0.0;
  return texture2D(tLagoonMask, uv).r;
#endif
}

// ---------------------------------------------------------------- shadows
float lagoonIGN(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }

// 12-tap Vogel disk (unit radius), rotated per pixel.
const vec2 LAGOON_VOGEL[12] = vec2[12](
  vec2(0.2041, 0.0000), vec2(-0.2607, 0.2388), vec2(0.0399, -0.4547), vec2(0.3286, 0.4286),
  vec2(-0.6030, -0.1067), vec2(0.5712, -0.3634), vec2(-0.1911, 0.7107), vec2(-0.3644, -0.7016),
  vec2(0.7906, 0.2887), vec2(-0.8224, 0.3395), vec2(0.3965, -0.8472), vec2(0.2930, 0.9341)
);

const vec2 LAGOON_VOGEL16[16] = vec2[16](
  vec2(0.1768, 0.0000), vec2(-0.2258, 0.2068), vec2(0.0346, -0.3938), vec2(0.2846, 0.3712),
  vec2(-0.5222, -0.0924), vec2(0.4947, -0.3147), vec2(-0.1655, 0.6155), vec2(-0.3156, -0.6076),
  vec2(0.6846, 0.2500), vec2(-0.7123, 0.2940), vec2(0.3434, -0.7337), vec2(0.2537, 0.8089),
  vec2(-0.7647, -0.4432), vec2(0.8971, -0.1972), vec2(-0.5475, 0.7788), vec2(-0.1265, -0.9761)
);

// Light-space axes of every sun shadow map (they all look along -uSunDir with
// world up as their up vector): x across the sun, y up the light's view.
void lagoonLightAxes(out vec3 ax, out vec3 ay) {
  ax = normalize(vec3(uSunDir.z, 0.0, -uSunDir.x));
  ay = cross(uSunDir, ax);
}

// Receiver-plane depth slope: metres of depth (away from the sun) per metre of
// light-space offset (x, y) along the plane through the receiver (normal n).
// The sun grazes the sand at 12.5 deg (4.5 m of depth per metre): without this a
// wide kernel compares its outer taps against the receiver's own surface and
// self-shadows, darkening soft penumbrae unevenly. Clamped (planes nearly
// parallel to the light, thin cards).
vec2 lagoonPlaneSlope(vec3 n, vec3 ax, vec3 ay) {
  float nz = dot(n, uSunDir);
  nz = nz < 0.0 ? min(nz, -0.18) : max(nz, 0.18);
  vec2 g = vec2(dot(n, ax), dot(n, ay)) / nz;
  float m = length(g);
  return m > 5.5 ? g * (5.5 / m) : g;
}

// PCF over a per-pixel rotated Vogel disk. c = receiver in map space, r = kernel
// radius (uv), dz = receiver-plane depth change over one kernel radius along the
// light-space x / y axes (depth units). Each tap is a hardware 2x2 bilinear
// comparison, so edges interpolate between texels instead of stair-stepping.
float lagoonPCF16(sampler2DShadow sm, vec3 c, vec2 r, vec2 dz, mat2 rot) {
  float s = 0.0;
  for (int i = 0; i < 16; i++) {
    vec2 o = rot * LAGOON_VOGEL16[i];
    s += textureGrad(sm, vec3(c.xy + o * r, c.z + dot(o, dz)), vec2(0.0), vec2(0.0));
  }
  return s * (1.0 / 16.0);
}

float lagoonPCF(sampler2DShadow sm, vec3 c, vec2 r, vec2 dz, mat2 rot) {
  float s = 0.0;
  for (int i = 0; i < 12; i++) {
    vec2 o = rot * LAGOON_VOGEL[i];
    s += textureGrad(sm, vec3(c.xy + o * r, c.z + dot(o, dz)), vec2(0.0), vec2(0.0));
  }
  return s * (1.0 / 12.0);
}

// Harmonic-mean distance (m) from a receiver to the blockers around it, read
// from the static map's depth copy (0 = no blocker). cs = receiver in static-map
// space, slope = its receiver-plane slope. Weighted toward near blockers so
// contact shadows stay crisp. Each of the 8 taps weighs the 2x2 texels around it
// bilinearly (a texel counts once its blocker stands ~1 m in front of the
// receiver plane: the R16F copy resolves 0.2-0.6 m), so the estimate - and with
// it the kernel size and the map choice below - varies smoothly across the
// ground. (Nearest sampling made it jump from one static texel to the next:
// blocky, stair-stepped patches in far-foliage shadows. Hardware filtering would
// mix blockers with empty texels into fake far blockers.)
float lagoonBlockerDistance(vec3 cs, vec2 slope) {
  ivec2 isz = textureSize(tShadowStaticDepth, 0);
  ivec2 bMax = max(isz - 2, ivec2(0));
  vec2 sz = vec2(isz);
  const float RS = 0.8;                                  // search radius (m): blockers up to ~150 m
  vec2 rS = uShadowStaticParams.xy * RS;
  vec2 dzS = slope * (RS / uShadowStaticRange);          // receiver plane over the search radius
  float inv = 0.0, wsum = 0.0;
  for (int i = 0; i < 8; i++) {
    vec2 o = LAGOON_VOGEL16[i * 2 + 1];
    vec2 t = (cs.xy + o * rS) * sz - 0.5;
    vec2 f = fract(t);
    ivec2 b = clamp(ivec2(floor(t)), ivec2(0), bMax);
    vec4 r = vec4(texelFetch(tShadowStaticDepth, b, 0).r, texelFetch(tShadowStaticDepth, b + ivec2(1, 0), 0).r,
                  texelFetch(tShadowStaticDepth, b + ivec2(0, 1), 0).r, texelFetch(tShadowStaticDepth, b + ivec2(1, 1), 0).r);
    vec4 d = (cs.z + dot(o, dzS) - (1.0 - r)) * uShadowStaticRange;
    vec4 w = vec4((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y)
           * step(r, vec4(0.995)) * smoothstep(0.5, 1.3, d);
    inv += dot(w, 1.0 / max(d, vec4(0.5)));
    wsum += w.x + w.y + w.z + w.w;
  }
  // fades to 0 as the last blocker weight leaves the search disk (no jump)
  return wsum > 1e-4 ? (wsum / inv) * smoothstep(0.0, 0.25, wsum) : 0.0;
}

// Point-sampled variant of the same estimate for alpha-tested foliage (leaf
// cards, fronds, grass) and the water reflection: about a quarter of the cost,
// and the static-texel steps it has are lost in the foliage's own structure (or
// the waves). Every opaque surface seen directly (ground, lagoon floor, wood,
// rock) takes the filtered search above.
float lagoonBlockerDistanceFast(vec3 cs, vec2 slope) {
  const float RS = 0.8;
  vec2 rS = uShadowStaticParams.xy * RS;
  vec2 dzS = slope * (RS / uShadowStaticRange);
  float inv = 0.0, wsum = 0.0;
  for (int i = 0; i < 8; i++) {
    vec2 o = LAGOON_VOGEL16[i * 2 + 1];
    float r = textureLod(tShadowStaticDepth, cs.xy + o * rS, 0.0).r;
    float d = (cs.z + dot(o, dzS) - (1.0 - r)) * uShadowStaticRange;
    float w = step(r, 0.995) * smoothstep(0.5, 1.3, d);
    inv += w / max(d, 0.5);
    wsum += w;
  }
  return wsum > 1e-4 ? (wsum / inv) * smoothstep(0.0, 0.25, wsum) : 0.0;
}

// Sun visibility (1 = lit) at world position wp with geometric world normal wn.
// Contact-hardening soft shadows: the penumbra radius follows the distance to the
// blockers (sun disk ~0.27 deg + aureole), found in the static map. The PCF runs
// in the finest map that contains the receiver, whose texels suit that kernel
// and within whose split distance the receiver lies (uShadowSplit): a kernel
// outgrowing ~4-6 texels hands over to the next coarser map gradually (both are
// blended in between), cascades cross-fade over their outer 15% and split
// distance, and the static village map covers everything beyond, fading to lit
// at its edge. No hard switch anywhere, so wide penumbrae stay smooth.
float lagoonSunShadow(vec3 wp, vec3 wn) {
  if (uShadowCascades < 0.5 && uShadowStaticOn < 0.5) return 1.0;
  float NoL = dot(wn, uSunDir);
  float grazing = 1.0 - clamp(abs(NoL), 0.0, 1.0);
  float a = lagoonIGN(gl_FragCoord.xy) * 6.2831853;
  float ca = cos(a), sa = sin(a);
  mat2 rot = mat2(ca, sa, -sa, ca);
  vec3 ax, ay;
  lagoonLightAxes(ax, ay);
  vec2 slope = lagoonPlaneSlope(wn, ax, ay);
  float dist = distance(wp, cameraPosition);

  // static-map position (bias as for its own PCF) + penumbra estimate
  vec4 SP = uShadowStaticParams;
  vec3 cs = (uShadowStaticMat * vec4(wp + wn * (SP.z * (0.8 + 1.5 * grazing)) + uSunDir * (SP.z * 1.2), 1.0)).xyz;
  bool inStatic = uShadowStaticOn > 0.5 && cs.x > 0.0 && cs.y > 0.0 && cs.x < 1.0 && cs.y < 1.0 && cs.z > 0.0 && cs.z < 1.0;
#if defined( USE_ALPHATEST ) || defined( ALPHA_TO_COVERAGE )
  float rP = inStatic ? min(lagoonBlockerDistanceFast(cs, slope) * uShadowPenumbra, 0.8) : 0.0;
#else
  // the planar-reflection pass (mirrored camera under the surface while the eye
  // is above it) sees these shadows at half resolution through the waves: the
  // point-sampled search is plenty there
  bool lgRefl = cameraPosition.y < uWaterLevel && uCameraUnderwater < 0.5;
  float rP = inStatic ? min((lgRefl ? lagoonBlockerDistanceFast(cs, slope) : lagoonBlockerDistance(cs, slope)) * uShadowPenumbra, 0.8) : 0.0;
#endif
  float acc = 0.0, rem = 1.0;
  for (int i = 0; i < 3; i++) {
    if (float(i) >= uShadowCascades || rem < 0.002) break;
    vec4 P = uShadowParams[i];          // u/m, v/m, texel m, filter radius m
    float texel = P.z;
    float rad = max(max(P.w, rP), texel * 1.5);
    bool coarser = float(i) + 1.0 < uShadowCascades || inStatic;
    // share kept by this map: the rest goes to the next coarser one as the kernel
    // outgrows ~4-6 texels or the receiver nears the split distance
    float keep = 1.0;
    if (coarser) {
      keep = (1.0 - smoothstep(4.0 * texel, 6.0 * texel, rad)) * (1.0 - smoothstep(0.8 * uShadowSplit[i], uShadowSplit[i], dist));
      rad = min(rad, 6.0 * texel);
    } else {
      rad = min(rad, 8.0 * texel);
    }
    if (keep < 0.002) continue;
    vec3 p = wp + wn * (texel * (1.0 + 2.5 * grazing)) + uSunDir * (texel * 1.5);
    vec3 c = (uShadowMat[i] * vec4(p, 1.0)).xyz;
    vec4 rc = uShadowRect[i];
    vec2 ruv = rad * P.xy;
    vec2 lo = (c.xy - rc.xy - ruv) / P.xy;
    vec2 hi = (rc.zw - c.xy - ruv) / P.xy;
    float edge = min(min(lo.x, lo.y), min(hi.x, hi.y));   // metres to the usable border
    if (edge <= 0.0 || c.z >= 1.0 || c.z <= 0.0) continue;
    float halfExtent = 0.5 * (rc.z - rc.x) / P.x;
    float bl = clamp(edge / (0.15 * halfExtent), 0.0, 1.0) * keep;
    // depth units per metre = length of the matrix's depth row
    float zs = length(vec3(uShadowMat[i][0][2], uShadowMat[i][1][2], uShadowMat[i][2][2]));
    vec2 dz = slope * (rad * zs);
    acc += rem * bl * (uShadowHQ > 0.5 || rad > 3.0 * texel ? lagoonPCF16(tShadowAtlas, c, ruv, dz, rot) : lagoonPCF(tShadowAtlas, c, ruv, dz, rot));
    if (uShadowDebug > 0.5) lagoonShadowTint = mix(lagoonShadowTint, i == 0 ? vec3(1.0, 0.25, 0.25) : i == 1 ? vec3(0.25, 1.0, 0.25) : vec3(1.0, 1.0, 0.2), rem * bl);
    rem *= 1.0 - bl;
  }
  if (rem > 0.002 && inStatic) {
    float rad = max(max(SP.w, rP), SP.z * 1.25);
    vec2 ruv = rad * SP.xy;
    vec2 lo = (cs.xy - ruv) / SP.xy;
    vec2 hi = (vec2(1.0) - cs.xy - ruv) / SP.xy;
    float edge = min(min(lo.x, lo.y), min(hi.x, hi.y));
    if (edge > 0.0) {
      float halfExtent = 0.5 / max(SP.x, SP.y);   // the shorter side (the box is not square)
      float bl = clamp(edge / (0.12 * halfExtent), 0.0, 1.0);
      vec2 dz = slope * (rad / uShadowStaticRange);
      acc += rem * bl * (rad > 3.0 * SP.z ? lagoonPCF16(tShadowStatic, cs, ruv, dz, rot) : lagoonPCF(tShadowStatic, cs, ruv, dz, rot));
      if (uShadowDebug > 0.5) lagoonShadowTint = mix(lagoonShadowTint, vec3(0.3, 0.3, 1.0), rem * bl);
      rem *= 1.0 - bl;
    }
  }
  return acc + rem;
}

// Cheap filtered static-map lookup (e.g. is a spot on the water sunlit): four
// hardware-bilinear taps a texel apart, i.e. a smooth 3x3-texel tent. One tap
// showed the static texels as stair-stepped blocks, stretched 4.6x along the
// sun on the water. Fixed pattern: no per-pixel noise.
float lagoonStaticShadowTap(vec3 wp) {
  if (uShadowStaticOn < 0.5) return 1.0;
  vec4 SP = uShadowStaticParams;
  vec3 c = (uShadowStaticMat * vec4(wp + uSunDir * (SP.z * 1.5), 1.0)).xyz;
  if (c.x <= 0.0 || c.y <= 0.0 || c.x >= 1.0 || c.y >= 1.0 || c.z >= 1.0 || c.z <= 0.0) return 1.0;
  vec2 o = SP.xy * (SP.z * 0.5);   // half a texel in uv
  float s = textureGrad(tShadowStatic, vec3(c.xy + vec2(-o.x, -o.y), c.z), vec2(0.0), vec2(0.0))
          + textureGrad(tShadowStatic, vec3(c.xy + vec2( o.x, -o.y), c.z), vec2(0.0), vec2(0.0))
          + textureGrad(tShadowStatic, vec3(c.xy + vec2(-o.x,  o.y), c.z), vec2(0.0), vec2(0.0))
          + textureGrad(tShadowStatic, vec3(c.xy + vec2( o.x,  o.y), c.z), vec2(0.0), vec2(0.0));
  return s * 0.25;
}

// ---------------------------------------------------------------- sky occlusion
// Fraction (0..1) of the sky light reaching wp (world, m) with world normal n,
// from the top-down height map of solid casters (lighting.js: houses, decks,
// bridges, docks, shades, rocks; no terrain, trees or palms). 12 taps on a disk
// in front of the surface count as cover when something stands above a ~40 deg
// cone over wp and less than the fade height above it (the next storey's roof
// still counts, a roof far overhead does not). Fixed taps: no noise. The covered
// part is replaced by uSkyOccBounce in the IBL block below.
// Tree canopy (G/B channels, mipmapped): the leaf-covered share of a disk about
// 0.6x as wide as the point lies below the local crown top (the sky within
// ~50 deg of the zenith, where a spreading crown sits), times uCanopyParams.x;
// fades in over the top 0.4-4 m of a crown (leaves there see the sky). That
// share is reported in lagoonCanopyCover (the IBL block replaces it with the
// crown's dim underside light, uCanopyFill).
// Materials already near the texture-unit limit compile without it
// (LAGOON_NO_SKYOCC, see samplerDefines below).
float lagoonSkyVisibility(vec3 wp, vec3 n) {
  lagoonCanopyCover = 0.0;
  lagoonCanopyI = 0.0; lagoonCanopyR = 0.0; lagoonSolidVis = 1.0;
#ifdef LAGOON_NO_SKYOCC
  return 1.0;
#else
  if (uSkyOccOn < 0.5) return 1.0;
  vec4 P = uSkyOccParams;          // disk radius m, min rise m, fade-out height m, strength
  vec2 c = wp.xz + n.xz * (0.8 * P.x);
  vec2 uv = vec2((c.x - uSkyOccBounds.x) * uSkyOccBounds.z, (uSkyOccBounds.y - c.y) * uSkyOccBounds.w);
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 1.0;
  vec2 rs = vec2(P.x * uSkyOccBounds.z, -P.x * uSkyOccBounds.w);
  float cover = 0.0;
  for (int i = 0; i < 12; i++) {
    vec2 o = LAGOON_VOGEL[i];
    float h = uSkyOccDecode.x + uSkyOccDecode.y * textureLod(tSkyOcc, uv + o * rs, 0.0).r;
    float rise = h - wp.y;
    float d = length(c + o * P.x - wp.xz);
    cover += smoothstep(0.0, 0.35, rise - P.y - 0.8 * d) * (1.0 - smoothstep(0.6 * P.z, P.z, rise));
  }
  float vs = 1.0 - P.w * cover * (1.0 / 12.0);
  lagoonSolidVis = vs;
  float vc = 1.0;
  if (uCanopyParams.x > 0.0) {
    float tsz = float(textureSize(tSkyOcc, 0).x);
    float texel = 1.0 / (uSkyOccBounds.z * tsz);        // metres per texel
    float maxLod = log2(tsz);
    vec2 uvP = vec2((wp.x - uSkyOccBounds.x) * uSkyOccBounds.z, (uSkyOccBounds.y - wp.z) * uSkyOccBounds.w);
    vec4 c1 = textureLod(tSkyOcc, uvP, log2(4.0 / texel)); // crown top ~4 m around
    float dh = c1.g > 0.02 ? c1.b / c1.g - wp.y : 10.0;    // no crown right above: look for ones nearby
    if (dh > 0.3) {
      // two cones: ~30 deg (disk 0.6 dh) and ~56 deg (disk 1.5 dh) from the zenith.
      // Under the middle of a crown both are covered; at its edge, or just outside
      // it, only part of the wider cone is - the open horizon sky still lights it.
      float r = clamp(0.6 * dh, 1.0, 16.0);
      vec2 cc = wp.xz + n.xz * min(0.5 * r, 4.0);
      vec2 uvc = vec2((cc.x - uSkyOccBounds.x) * uSkyOccBounds.z, (uSkyOccBounds.y - cc.y) * uSkyOccBounds.w);
      float lodI = clamp(log2(2.0 * r / texel), 0.0, maxLod);
      vec4 c2 = textureLod(tSkyOcc, uvc, lodI);
      vec4 c3 = textureLod(tSkyOcc, uvc, min(lodI + 1.32, maxLod));  // 2.5x wider
      float dh2 = c2.g > 0.02 ? c2.b / c2.g - wp.y : 0.0;
      float dh3 = c3.g > 0.02 ? c3.b / c3.g - wp.y : 0.0;
      float kI = c2.g * smoothstep(0.4, 4.0, dh2);
      float kO = c3.g * smoothstep(0.4, 4.0, dh3);
      float kR = clamp((6.25 * kO - kI) * (1.0 / 5.25), 0.0, 1.0);  // the ring between the two cones
      float s = uCanopyParams.x;
    #if defined( USE_ALPHATEST ) || defined( ALPHA_TO_COVERAGE )
      s *= mix(uCanopyParams.y, 1.0, smoothstep(4.0, 10.0, dh2)); // leaf cards: own crown AO near the top
    #endif
      // shares of the sky light the canopy can block: inner cone ~35%, ring ~65%
      // (the golden-hour sky is brightest toward the horizon)
      lagoonCanopyI = s * kI;
      lagoonCanopyR = s * kR;
      vc = 1.0 - clamp(0.35 * lagoonCanopyI + 0.65 * lagoonCanopyR, 0.0, 0.95);
    }
  }
  lagoonCanopyCover = vs * (1.0 - vc);
  return vs * vc;
#endif
}

// Share of the sky a reflection in world direction r sees replaced by tree
// canopy (after lagoonSkyVisibility): steep reflections look up into the crown,
// grazing ones (wet sand at the waterline, the lagoon-side of a trunk) see the
// open horizon sky under it.
float lagoonCanopySpecular(vec3 r) {
  float up = clamp(r.y, 0.0, 1.0);
  return mix(lagoonCanopyR * smoothstep(0.3, 0.6, up), lagoonCanopyI, smoothstep(0.75, 0.92, up));
}

// ---------------------------------------------------------------- ground bounce
// Radiance of the ground that a surface at wp (world, m) with geometric world
// normal n sees below it, from lighting.js's top-down bake of the lit ground
// (rgb = radiance, a = ground or water-surface height, mipmapped). The
// cosine-weighted view of a ground plane h metres below is centred ~h metres
// out along the normal's horizontal part and about h wide, so the lookup shifts
// that far and reads the mip level whose texels are that wide: a deck underside
// averages the sand below it, a trunk base the patch in front of it. m = 1 where
// the map covers the surface (fades to 0 at its edge, where the caller keeps the
// environment map's uniform sunlit-sand ground, uEnvGround), 0 when off, under
// water, or compiled out (LAGOON_NO_GROUNDBOUNCE: texture-unit budget).
vec3 lagoonGroundRadiance(vec3 wp, vec3 n, out float m) {
  m = 0.0;
#ifdef LAGOON_NO_GROUNDBOUNCE
  return uEnvGround;
#else
  vec4 B = uGroundBounceBounds;
  vec4 P = uGroundBounceParams;       // texel m, max lod, on, strength
  if (P.z < 0.5) return uEnvGround;
  vec2 uv0 = vec2((wp.x - B.x) * B.z, (B.y - wp.z) * B.w);
  if (uv0.x <= 0.0 || uv0.y <= 0.0 || uv0.x >= 1.0 || uv0.y >= 1.0) return uEnvGround;
  float gH = textureLod(tGroundBounce, uv0, 3.0).a;   // mean ground height around wp (~2 m)
  float above = wp.y - gH;
  if (above < -0.35) return uEnvGround;                // under the water surface / buried
  float h = clamp(above, 0.1, 60.0);
  vec2 c = wp.xz + n.xz * (0.9 * h + 0.1);
  float r = h * (1.0 + 0.6 * length(n.xz)) + 0.15;
  float lod = clamp(log2(2.0 * r / P.x), 0.0, P.y);
  vec2 uv = vec2((c.x - B.x) * B.z, (B.y - c.y) * B.w);
  // cosine-weighted view of the ground: about half of it lies within ~h of the
  // point below, most of the rest within ~3h (sunlit sand around the shade of a
  // deck or a crown still lights its underside): two footprints, equal weights
  vec2 c3 = wp.xz + n.xz * (2.0 * h + 0.1);
  vec2 uv3 = vec2((c3.x - B.x) * B.z, (B.y - c3.y) * B.w);
  vec3 L = 0.5 * (textureLod(tGroundBounce, clamp(uv, vec2(0.0), vec2(1.0)), lod).rgb
                + textureLod(tGroundBounce, clamp(uv3, vec2(0.0), vec2(1.0)), min(lod + 1.58, P.y)).rgb);
  vec2 e = min(uv, 1.0 - uv);
  // high up (top decks, lookouts, crowns) the ground is far and mostly hidden
  // behind the floors and foliage in between (which the map does not know):
  // hand back to the uniform environment ground there
  m = smoothstep(0.0, 0.04, min(e.x, e.y)) * smoothstep(-0.35, -0.1, above) * (1.0 - smoothstep(6.0, 18.0, h));
  return mix(uEnvGround, max(L, vec3(0.0)), m);
#endif
}

// ---------------------------------------------------------------- caustics
// Physically based caustics: a ripple height field (9 travelling waves, 0.4-1.3 m)
// refracts the sun; the floor irradiance is 1 / |det J| of the surface -> floor
// mapping, J = I - a * Hessian(h), a = path length * (1 - 1/n). The floor point's
// surface preimage is found by fixed-point iteration, which turns fold lines into
// sharp filaments. Energy conserving (mean ~1); sharpens with depth; the three
// channels use slightly different refraction (dispersion).
const vec4 LAGOON_WAVES[9] = vec4[9](
  vec4(6.6085, 1.4047, 0.0100, 3.2564),
  vec4(6.3957, 6.8586, 0.0072, 3.8366),
  vec4(10.3572, -6.2232, 0.0052, 4.3549),
  vec4(1.7808, 14.5031, 0.0040, 4.7891),
  vec4(2.9794, -7.3743, 0.0082, 3.5332),
  vec4(-9.4748, 5.2520, 0.0058, 4.1235),
  vec4(-7.9724, 14.9938, 0.0033, 5.1628),
  vec4(4.7781, -0.4180, 0.0120, 2.7438),
  vec4(-3.9086, -12.7843, 0.0044, 4.5807)
);

void lagoonRipple(vec2 p, float t, out vec2 g, out vec3 H) {
  g = vec2(0.0);
  H = vec3(0.0); // (hxx, hzz, hxz)
  for (int i = 0; i < 9; i++) {
    vec4 w = LAGOON_WAVES[i];
    float th = dot(w.xy, p) - w.w * t + float(i) * 2.3;
    float s = sin(th), c = cos(th);
    g += (w.z * c) * w.xy;
    H -= (w.z * s) * vec3(w.x * w.x, w.y * w.y, w.x * w.y);
  }
}

// Caustic irradiance multiplier at point p (world xz, metres) for deflection
// strength a (metres); eps limits the focus (sun disk size, footprint).
vec3 lagoonCausticJ(vec2 p, float a, float eps, float t) {
  // ripple energy varies slowly across the lagoon (gust patches): breaks the repeat
  float m = 0.72 + 0.28 * sin(p.x * 0.29 + 0.8 * sin(p.y * 0.21 + t * 0.05)) * sin(p.y * 0.25 - 0.7 * sin(p.x * 0.17));
  a *= m;
  vec2 x = p, g = vec2(0.0);
  vec3 H = vec3(0.0);
  for (int k = 0; k < 4; k++) { lagoonRipple(x, t, g, H); x = p + a * g; }
  lagoonRipple(x, t, g, H);
  vec3 aa = a * vec3(0.985, 1.0, 1.02);
  vec3 dt = (1.0 - aa * H.x) * (1.0 - aa * H.y) - aa * aa * (H.z * H.z);
  return min(1.0 / max(abs(dt), vec3(eps)), vec3(8.0));
}

// Legacy helper: caustic filaments for p in metres, mean ~0.2.
float lagoonCausticPattern(vec2 p, float t) {
  return 0.2 * lagoonCausticJ(p, 0.5, 0.08, t).g;
}

// Irradiance multiplier (mean ~1) of caustic light on the lagoon floor.
// surf = where the refracted sun ray crossed the surface, depth in metres,
// fw = screen-space footprint (metres per pixel) for anti-aliasing.
vec3 lagoonCausticLight(vec2 surf, float depth, float fw) {
  // The ripples whose focal length matches the depth dominate, so the network
  // scales with depth: fine and sharp in the shallows, broader and softer deeper.
  // Fixed network scale: a depth-dependent scale stretched the pattern on sloping
  // floors into contour streaks and left a seam where it clamped. Depth now only
  // softens the filaments (eps) and fades the strength.
  float sc = 0.8;
  float k = clamp(uCausticsStrength, 0.0, 2.0) * exp(-depth * 0.16) * smoothstep(0.02, 0.12, depth)
          * (1.0 - smoothstep(0.035, 0.16, fw / sc));
  if (k < 0.01) return vec3(1.0);
  float eps = 0.06 + 0.015 * depth + (fw / sc) * 6.0;
  vec3 I = lagoonCausticJ(surf / sc, 0.55, eps, uTime * 0.7 / sqrt(sc));
  return mix(vec3(1.0), I, clamp(k, 0.0, 1.0));
}

// Sun light arriving at an underwater point: returns the transmission colour
// (Fresnel x absorption along the refracted path); Lw = refracted direction
// toward the sun (world), surf = where that ray crossed the water surface.
vec3 lagoonUnderwaterSun(vec3 wp, out vec3 Lw, out vec3 surf) {
  float depth = max(uWaterLevel - wp.y, 0.0);
  float cosI = max(uSunDir.y, 0.02);
  float sinI = sqrt(max(1.0 - cosI * cosI, 0.0));
  float sinT = sinI / LAGOON_WATER_IOR;
  float cosT = sqrt(max(1.0 - sinT * sinT, 1e-4));
  vec2 hd = uSunDir.xz / max(length(uSunDir.xz), 1e-5);
  Lw = vec3(hd.x * sinT, cosT, hd.y * sinT);
  float s = depth / cosT;
  surf = wp + Lw * s;
  float f = 1.0 - cosI; float f2 = f * f;
  float F = 0.02 + 0.98 * f2 * f2 * f;
  return (1.0 - F) * exp(-uWaterAbsorb * s);
}

float lagoonUnderwaterMask(vec3 wpos) {
  if (wpos.y >= uWaterLevel) return 0.0;
  return uLagoonMaskReady > 0.5 ? smoothstep(0.35, 0.75, lagoonMaskAt(wpos)) : 1.0;
}

// ---------------------------------------------------------------- lagoon bounce
// Extra light on surfaces above the lagoon (radiance to add to outgoingLight):
//  * upwelling turquoise light from the water below (view-factor weighted)
//  * sun reflected by the rippled surface: moving caustic glints on faces that
//    look toward the reflection point (undersides of docks, sun-side posts)
// diffuse = surface albedo, n = world normal.
vec3 lagoonExtraLight(vec3 diffuse, vec3 wpos, vec3 n) {
  vec3 add = vec3(0.0);
  float above = wpos.y - uWaterLevel;
  float fwp = length(fwidth(wpos.xz)) + 4.5 * fwidth(wpos.y);
  if (above > -0.05 && above < 12.0 && uLagoonBounceStrength > 0.0) {
    float m = lagoonMaskAt(wpos);
    float hA = max(above, 0.0);
    // (the ground-bounce map already carries the lagoon's upwelling where it covers the fragment)
    if (m > 0.001 && lagoonGroundMapValid < 0.999) {
      float vf = clamp(0.5 - 0.5 * n.y, 0.0, 1.0);
      add += diffuse * uLagoonBounce * (uLagoonBounceStrength * m * vf * exp(-hA * 0.09) * (1.0 - lagoonGroundMapValid));
    }
    vec3 Lr = vec3(uSunDir.x, -uSunDir.y, uSunDir.z);
    float ndl = dot(n, Lr);
    if (ndl > 0.0 && above > 0.02) {
      vec3 W = wpos + Lr * (hA / max(uSunDir.y, 0.05));
      float mw = smoothstep(0.55, 0.95, lagoonMaskAt(W));
      if (mw > 0.001) {
        float cosI = max(uSunDir.y, 0.02);
        float f = 1.0 - cosI; float f2 = f * f;
        float F = 0.02 + 0.98 * f2 * f2 * f;
        float sh = lagoonStaticShadowTap(W);
        float contrast = exp(-hA * 0.3) * (1.0 - smoothstep(0.08, 0.4, fwp)) * clamp(uCausticsStrength, 0.0, 2.0);
        float glint = 1.0;
        if (contrast > 0.01) glint = mix(1.0, lagoonCausticJ(W.xz, min(hA, 2.0) * 0.55, 0.06 + fwp * 6.0 + hA * 0.03, uTime * 0.7).g, clamp(contrast, 0.0, 1.0));
        vec3 E = uSunColor * (uSunIntensity * F * ndl * mw * sh * glint * exp(-hA * 0.05));
        add += diffuse * E * (uLagoonBounceStrength * (1.0 / LAGOON_PI));
      }
    }
  }
  return add;
}
`;var zn=`
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
{
  vec3 lgN = normalize( ( vec4( nonPerturbedNormal, 0.0 ) * viewMatrix ).xyz );
  vec3 lgL = uSunDir;
  vec3 lgSun = uSunColor * uSunIntensity;
  vec3 lgShadowP = vLagoonWorldPos;
  vec3 lgShadowN = lgN;
  float lgFw = length( fwidth( vLagoonWorldPos.xz ) );
  float lgM = lagoonUnderwaterMask( vLagoonWorldPos );
  if ( lgM > 0.0 ) {
    vec3 lgLw = lgL, lgSurf = vLagoonWorldPos;
    vec3 lgT = lagoonUnderwaterSun( vLagoonWorldPos, lgLw, lgSurf );
    vec3 lgC = lagoonCausticLight( lgSurf.xz, uWaterLevel - vLagoonWorldPos.y, lgFw );
    lgSun = mix( lgSun, lgSun * lgT * lgC, lgM );
    lgL = normalize( mix( lgL, lgLw, lgM ) );
    lgShadowP = mix( lgShadowP, lgSurf, lgM );
    lgShadowN = normalize( mix( lgN, vec3( 0.0, 1.0, 0.0 ), lgM ) );
  }
  float lgSh = 1.0;
  if ( receiveShadow ) {
  #if !defined( USE_ALPHATEST ) && !defined( ALPHA_TO_COVERAGE ) && !defined( USE_TRANSMISSION )
    // an opaque surface facing away from the sun is in its own shadow: no lookup
    // (deck and roof undersides, the far sides of trunks, walls and rocks)
    lgSh = dot( lgN, lgL ) < -0.2 ? 0.0 : lagoonSunShadow( lgShadowP, lgShadowN );
  #else
    lgSh = lagoonSunShadow( lgShadowP, lgShadowN );
  #endif
  }
  directLight.direction = normalize( ( viewMatrix * vec4( lgL, 0.0 ) ).xyz );
  directLight.color = lgSun * lgSh * ( uShadowDebug > 0.5 ? lagoonShadowTint : vec3( 1.0 ) );
  directLight.visible = true;
  vec3 lgD0 = reflectedLight.directDiffuse;
  vec3 lgS0 = reflectedLight.directSpecular;
  RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  lagoonSunDiffuse = reflectedLight.directDiffuse - lgD0;
  lagoonSunSpecular = reflectedLight.directSpecular - lgS0;
  lagoonSunDirView = directLight.direction;
  #if defined( STANDARD ) && !defined( USE_ALPHATEST ) && !defined( ALPHA_TO_COVERAGE ) && !defined( USE_TRANSMISSION )
  if ( uLightFx.y > 0.0 ) {
    // rough natural materials: energy-preserving Oren-Nayar instead of Lambert
    // (roughness 0.5 -> 0.95 ramps it in; metals and foliage keep Lambert)
    float lgRr = uLightFx.y * smoothstep( 0.5, 0.95, material.roughness ) * ( 1.0 - material.metalness );
    if ( lgRr > 0.002 ) {
      // the sun calibration (sky.js: sunlit sand ~1.1) was judged down-sun, where
      // the back-scatter peak sits: the gain there is capped (uLightFx.w) so the
      // hero's sand keeps its ripple relief, the darkening elsewhere is kept
      vec3 lgK = min( lagoonEONRatio( geometryNormal, directLight.direction, geometryViewDir, lgRr, material.diffuseColor ), vec3( 1.0 + uLightFx.w ) );
      vec3 lgDd = lagoonSunDiffuse * ( lgK - 1.0 );
      reflectedLight.directDiffuse += lgDd;
      lagoonSunDiffuse += lgDd;
    }
  }
  #endif
}
#endif
`,Bn=`
#if defined( USE_AOMAP ) && !defined( USE_ALPHATEST ) && !defined( ALPHA_TO_COVERAGE )
if ( uLightFx.x > 0.0 ) {
  // relief cavities only: the texel's AO relative to the map's local mean (a
  // coarse mip), so broad grime / weathering baked into the AO does not dim a
  // whole plank face under the grazing sun - only gaps, grooves and weave do
  float lgAoMean = ( textureLod( aoMap, vAoMapUv, 6.0 ).r - 1.0 ) * aoMapIntensity + 1.0;
  float lgAoRel = clamp( ambientOcclusion / max( lgAoMean, 0.05 ), 0.0, 1.0 );
  float lgNoL = clamp( dot( normal, lagoonSunDirView ), 0.0, 1.0 );
  float lgAp = inversesqrt( max( 1.0 - lgAoRel, 1e-4 ) );
  float lgMs = clamp( lgNoL * lgAp, 0.0, 1.0 );
  lgMs = 1.0 - uLightFx.x * ( 1.0 - lgMs * lgMs );
  reflectedLight.directDiffuse -= lagoonSunDiffuse * ( 1.0 - lgMs );
  reflectedLight.directSpecular -= lagoonSunSpecular * ( 1.0 - lgMs );
}
#endif
`,Vn=pe.lights_fragment_begin,Hn=Vn.indexOf(`#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )`),Un=Vn.indexOf(`#if ( NUM_RECT_AREA_LIGHTS > 0 )`),Wn=Hn>=0&&Un>Hn;Wn||console.warn(`[lagoon] materialPatch: lights_fragment_begin layout changed; using three sun loop`),pe.lagoon_lights_fragment_begin=Wn?Vn.slice(0,Hn)+zn+`
`+Vn.slice(Un):Vn;var Gn=e=>`
{
  vec3 lgWN = normalize( ( vec4( nonPerturbedNormal, 0.0 ) * viewMatrix ).xyz );
  float lgV = lagoonSkyVisibility( vLagoonWorldPos, lgWN );
  // mirror direction (world) of the shading normal: what the specular lobe sees
  vec3 lgRw = normalize( ( vec4( reflect( - geometryViewDir, geometryNormal ), 0.0 ) * viewMatrix ).xyz );
  vec3 lgA = vec3( uLagoonEnvScale * lgV );
  // specular: solid cover as for the diffuse, tree canopy only where the
  // reflection looks up into the crown (lagoonCanopySpecular)
  float lgCs = lagoonSolidVis * lagoonCanopySpecular( lgRw );
  vec3 lgAs = vec3( uLagoonEnvScale * ( lagoonSolidVis - lgCs ) );
  // covered sky: roofs / decks bounce warm light off the floors and ground below,
  // tree crowns pass a little dim green light through
  vec3 lgB = uSkyOccBounce * max( 1.0 - lgV - lagoonCanopyCover, 0.0 );
  #ifndef LAGOON_NO_GROUNDBOUNCE
  {
    // local ground bounce: the environment map's lower hemisphere is one uniform
    // sunlit-sand radiance (uEnvGround); swap it for the ground actually below
    float lgGM;
    vec3 lgG = lagoonGroundRadiance( vLagoonWorldPos, lgWN, lgGM );
    if ( lgGM > 0.0 ) {
      lagoonGroundMapValid = lgGM;
      vec3 lgWNs = normalize( ( vec4( geometryNormal, 0.0 ) * viewMatrix ).xyz );
      float lgGV = clamp( 0.5 - 0.5 * lgWNs.y, 0.0, 1.0 );        // view factor of the ground plane
      vec3 lgRat = lgG / max( uEnvGround, vec3( 1e-3 ) );
      #if defined( RE_IndirectDiffuse )
        iblIrradiance = max( iblIrradiance + ( LAGOON_PI * uGroundBounceParams.w * lgGV ) * ( lgG - uEnvGround ), iblIrradiance * 0.2 );
      #endif
      #if defined( RE_IndirectSpecular )
      {
        // reflections that point at the ground see the local ground too
        float lgWr = clamp( 0.5 - 1.6 * lgRw.y, 0.0, 1.0 );
        radiance *= mix( vec3( 1.0 ), clamp( lgRat, vec3( 0.05 ), vec3( 3.0 ) ), lgWr );
      }
      #endif
      // covered places (under decks, eaves): the light bounced into them comes off the ground below too
      float lgRl = dot( lgRat, vec3( 0.2126, 0.7152, 0.0722 ) );
      lgB *= mix( 1.0, clamp( lgRl, 0.3, 1.5 ), 0.6 * lgGM );
    }
  }
  #endif
  // (1 - lgV - lagoonCanopyCover = 1 - lagoonSolidVis: lgB so far is the solid cover's bounce)
  vec3 lgBs = lgB + uCanopyFill * lgCs;
  lgB += uCanopyFill * lagoonCanopyCover;
  if ( uLightDebug > 0.5 ) {
    float lgDM;
    vec3 lgDG = lagoonGroundRadiance( vLagoonWorldPos, lgWN, lgDM );
    lagoonDebugColor = uLightDebug < 1.5 ? mix( vec3( 0.0, 0.0, 0.25 ), lgDG, lgDM )
                     : uLightDebug < 2.5 ? vec3( lgV + lagoonCanopyCover, 1.0 - lagoonCanopyCover, lgV )
                     : uLightDebug < 3.5 ? vec3( lagoonMaskAt( vLagoonWorldPos ) )
                     : vec3( lagoonSolidVis - lgCs, 1.0 - lgCs, lagoonSolidVis );
  }
  ${e?`float lgUM = lagoonUnderwaterMask( vLagoonWorldPos );
  vec3 lgW = lgUM > 0.0 ? mix( vec3( 1.0 ), 0.9 * exp( -uWaterAbsorb * ( ( uWaterLevel - vLagoonWorldPos.y ) * 1.25 ) ), lgUM ) : vec3( 1.0 );
  lgA *= lgW;
  lgB *= lgW;
  lgAs *= lgW;
  lgBs *= lgW;
  #if defined( RE_IndirectDiffuse )
    irradiance *= lgW;
  #endif`:``}
  #if defined( RE_IndirectDiffuse )
    iblIrradiance = iblIrradiance * lgA + lgB;
  #endif
  #if defined( RE_IndirectSpecular )
    {
      // horizon (specular) occlusion: a normal-mapped groove whose reflection
      // vector dips below the geometric surface reflects the surface itself, not
      // the sky - bark furrows, plank gaps and thatch strands must not glow
      float lgHz = clamp( 1.0 + 1.2 * dot( reflect( - geometryViewDir, geometryNormal ), nonPerturbedNormal ), 0.0, 1.0 );
      radiance *= mix( 1.0, lgHz * lgHz, uLightFx.z );
    }
    radiance = radiance * lgAs + lgBs * ( 1.0 / LAGOON_PI );
    #ifdef USE_CLEARCOAT
      clearcoatRadiance *= lgAs;
    #endif
  #endif
}
#include <lights_fragment_end>
`,Kn=new Map;typeof window<`u`&&(window.__lagoonTextureBudget=Kn);var qn=6,Jn=new Set(`alphaMap anisotropyMap aoMap batchingColorTexture batchingIdTexture batchingTexture boneTexture bumpMap clearcoatMap clearcoatNormalMap clearcoatRoughnessMap dfgLUT directionalShadowMap displacementMap emissiveMap envMap gradientMap iridescenceMap iridescenceThicknessMap lightMap ltc_1 ltc_2 map matcap metalnessMap morphTexture morphTargetsTexture normalMap pointShadowMap probesSH roughnessMap sheenColorMap sheenRoughnessMap specularColorMap specularIntensityMap specularMap spotLightMap spotShadowMap thicknessMap transmissionMap transmissionSamplerMap`.split(` `));function Yn(e,t,n){let r=n?.capabilities?.maxTextures??16,i=Xn(e,t,r),a=`#define LAGOON_MASK_IN_SKYOCC
`;i>r&&(a+=`#define LAGOON_NO_GROUNDBOUNCE
`);let o=Kn.get(t.name||t.type);return o&&(o.dropped=i>r?[`GROUNDBOUNCE`]:[]),o&&i-1>r&&(o.over=!0),a}function Xn(e,t,n){let r=qn,i=[];for(let t in e)(t.endsWith(`Map`)||t===`map`||t===`matcap`)&&e[t]===!0&&i.push(t);r+=i.length,t.isMeshStandardMaterial&&r++,e.batching&&(r+=e.batchingColor?3:2),(e.morphTargets||e.morphNormals||e.morphColors)&&r++,e.skinning&&r++,e.transmission&&r++;let a=new Set,o=/uniform\s+(?:(?:highp|mediump|lowp)\s+)?[iu]?sampler\w+\s+(\w+)/g;for(let t of[e.vertexShader,e.fragmentShader])for(let e of t.matchAll(o))Jn.has(e[1])||a.add(e[1]);return r+=a.size,Kn.set(t.name||t.type,{units:r,max:n,maps:i,own:[...a]}),r}var Zn=()=>/float\s+ambientOcclusion\s*=/.test(pe.aomap_fragment||``),Qn=[];function $n(e){Qn.find(t=>t.key===e.key)||Qn.push(e)}var er=new WeakSet;function tr(e,n={}){if(!e||er.has(e)||e.isShaderMaterial||e.isRawShaderMaterial||!(e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial||e.isMeshBasicMaterial))return e;er.add(e);let r=n.extraLight!==!1&&!e.isMeshBasicMaterial,i=n.fog!==!1;for(let t of Qn)t.setup?.(e);let a=e.onBeforeCompile,o=e.customProgramCacheKey===t.prototype.customProgramCacheKey?null:e.customProgramCacheKey.bind(e),s=a&&a!==t.prototype.onBeforeCompile?a.toString():``,c=0;for(let e=0;e<s.length;e++)c=Math.imul(c,31)+s.charCodeAt(e)|0;return e.onBeforeCompile=function(n,o){a&&a!==t.prototype.onBeforeCompile&&a.call(this,n,o);for(let e in F)n.uniforms[e]=F[e];let s=this;n.uniforms.uLagoonEnvScale={get value(){return s.envMapIntensity??1},set value(e){}},n.vertexShader=n.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vLagoonWorldPos;`).replace(`#include <fog_vertex>`,`#include <fog_vertex>
vLagoonWorldPos = (vec4(mvPosition.xyz, 0.0) * viewMatrix).xyz + cameraPosition;`);let c=Yn(n,e,o),l=n.fragmentShader.replace(`#include <common>`,`#include <common>\n${c}#include <lagoon_common>\nvarying vec3 vLagoonWorldPos;\nuniform float uLagoonEnvScale;`).replace(`#include <lights_fragment_begin>`,`#include <lagoon_lights_fragment_begin>`).replace(`#include <lights_fragment_end>`,Gn(r));e.isMeshStandardMaterial&&l.includes(`#include <aomap_fragment>`)&&Zn()&&(l=l.replace(`#include <aomap_fragment>`,`#include <aomap_fragment>
`+Bn)),r&&(l=l.replace(`#include <opaque_fragment>`,`outgoingLight += lagoonExtraLight(diffuseColor.rgb, vLagoonWorldPos, normalize((vec4(normal, 0.0) * viewMatrix).xyz));
#include <opaque_fragment>`)),i&&(l=l.replace(`#include <fog_fragment>`,`gl_FragColor.rgb = uLightDebug > 0.5 ? lagoonDebugColor : lagoonAtmosphere(gl_FragColor.rgb, vLagoonWorldPos);`)),n.fragmentShader=l;for(let t of Qn)t.onBeforeCompile?.(n,e)},e.customProgramCacheKey=function(){return(o?o():`h`+c)+`|lagoon3:${+!!r}${+!!i}:${Qn.map(e=>e.key).join(`,`)}`},e.needsUpdate=!0,e}function nr(e){e.traverse(e=>{if(!e.material)return;let t=Array.isArray(e.material)?e.material:[e.material];for(let e of t)e.userData?.noPatch||tr(e)})}var rr=1.25,ir=65535,ar=2**-24,or=Symbol(`SKIP_GENERATION`),sr={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[or]:!1};function R(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function cr(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function lr(e,t){t.set(e)}function ur(e,t,n){let r,i;for(let a=0;a<3;a++){let o=a+3;r=e[a],i=t[a],n[a]=r<i?r:i,r=e[o],i=t[o],n[o]=r>i?r:i}}function dr(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],a=t[e+2*r+1],o=i-a,s=i+a;o<n[r]&&(n[r]=o),s>n[r+3]&&(n[r+3]=s)}}function fr(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function z(e,t){return t[e+15]===ir}function B(e,t){return t[e+6]}function V(e,t){return t[e+14]}function H(e){return e+8}function U(e,t){return e+t[e+6]*8}function pr(e,t){return t[e+7]}function W(e){return e}function mr(e,t,n,r,i){let a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,m=-1/0,h=-1/0,g=-1/0,_=e.offset||0;for(let r=(t-_)*6,i=(t+n-_)*6;r<i;r+=6){let t=e[r+0],n=e[r+1],i=t-n,_=t+n;i<a&&(a=i),_>c&&(c=_),t<d&&(d=t),t>m&&(m=t);let v=e[r+2],y=e[r+3],b=v-y,x=v+y;b<o&&(o=b),x>l&&(l=x),v<f&&(f=v),v>h&&(h=v);let S=e[r+4],C=e[r+5],w=S-C,T=S+C;w<s&&(s=w),T>u&&(u=T),S<p&&(p=S),S>g&&(g=S)}r[0]=a,r[1]=o,r[2]=s,r[3]=c,r[4]=l,r[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=m,i[4]=h,i[5]=g}var hr=32,gr=(e,t)=>e.candidate-t.candidate,_r=Array(hr).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),vr=new Float32Array(6);function yr(e,t,n,r,i,a){let o=-1,s=0;if(a===0)o=cr(t),o!==-1&&(s=(t[o]+t[o+3])/2);else if(a===1)o=cr(e),o!==-1&&(s=br(n,r,i,o));else if(a===2){let a=fr(e),c=rr*i,l=n.offset||0,u=(r-l)*6,d=(r+i-l)*6;for(let e=0;e<3;e++){let r=t[e],l=(t[e+3]-r)/hr;if(i<hr/4){let t=[..._r];t.length=i;let r=0;for(let i=u;i<d;i+=6,r++){let a=t[r];a.candidate=n[i+2*e],a.count=0;let{bounds:o,leftCacheBounds:s,rightCacheBounds:c}=a;for(let e=0;e<3;e++)c[e]=1/0,c[e+3]=-1/0,s[e]=1/0,s[e+3]=-1/0,o[e]=1/0,o[e+3]=-1/0;dr(i,n,o)}t.sort(gr);let l=i;for(let e=0;e<l;e++){let n=t[e];for(;e+1<l&&t[e+1].candidate===n.candidate;)t.splice(e+1,1),l--}for(let r=u;r<d;r+=6){let i=n[r+2*e];for(let e=0;e<l;e++){let a=t[e];i>=a.candidate?dr(r,n,a.rightCacheBounds):(dr(r,n,a.leftCacheBounds),a.count++)}}for(let n=0;n<l;n++){let r=t[n],l=r.count,u=i-r.count,d=r.leftCacheBounds,f=r.rightCacheBounds,p=0;l!==0&&(p=fr(d)/a);let m=0;u!==0&&(m=fr(f)/a);let h=1+rr*(p*l+m*u);h<c&&(o=e,c=h,s=r.candidate)}}else{for(let e=0;e<hr;e++){let t=_r[e];t.count=0,t.candidate=r+l+e*l;let n=t.bounds;for(let e=0;e<3;e++)n[e]=1/0,n[e+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((n[t+2*e]-r)/l);i>=hr&&(i=31);let a=_r[i];a.count++,dr(t,n,a.bounds)}let t=_r[31];lr(t.bounds,t.rightCacheBounds);for(let e=30;e>=0;e--){let t=_r[e],n=_r[e+1];ur(t.bounds,n.rightCacheBounds,t.rightCacheBounds)}let f=0;for(let t=0;t<31;t++){let n=_r[t],r=n.count,l=n.bounds,u=_r[t+1].rightCacheBounds;r!==0&&(f===0?lr(l,vr):ur(l,vr,vr)),f+=r;let d=0,p=0;f!==0&&(d=fr(vr)/a);let m=i-f;m!==0&&(p=fr(u)/a);let h=1+rr*(d*f+p*m);h<c&&(o=e,c=h,s=n.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:o,pos:s}}function br(e,t,n,r){let i=0,a=e.offset;for(let o=t,s=t+n;o<s;o++)i+=e[(o-a)*6+r*2];return i/n}var xr=class{constructor(){this.boundingData=new Float32Array(6)}};function Sr(e,t,n,r,i,a){let o=r,s=r+i-1,c=a.pos,l=a.axis*2,u=n.offset||0;for(;;){for(;o<=s&&n[(o-u)*6+l]<c;)o++;for(;o<=s&&n[(s-u)*6+l]>=c;)s--;if(o<s){for(let n=0;n<t;n++){let r=e[o*t+n];e[o*t+n]=e[s*t+n],e[s*t+n]=r}for(let e=0;e<6;e++){let t=o-u,r=s-u,i=n[t*6+e];n[t*6+e]=n[r*6+e],n[r*6+e]=i}o++,s--}else return o}}var Cr,wr,Tr,Er,Dr=2**32;function Or(e){return`count`in e?1:1+Or(e.left)+Or(e.right)}function kr(e,t,n){return Cr=new Float32Array(n),wr=new Uint32Array(n),Tr=new Uint16Array(n),Er=new Uint8Array(n),Ar(e,t)}function Ar(e,t){let n=e/4,r=e/2,i=`count`in t,a=t.boundingData;for(let e=0;e<6;e++)Cr[n+e]=a[e];if(i)return t.buffer?(Er.set(new Uint8Array(t.buffer),e),e+t.buffer.byteLength):(wr[n+6]=t.offset,Tr[r+14]=t.count,Tr[r+15]=ir,e+32);{let{left:r,right:i,splitAxis:a}=t,o=Ar(e+32,r),s=e/32,c=o/32-s;if(c>Dr)throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);return wr[n+6]=c,wr[n+7]=a,Ar(o,i)}}function jr(e,t,n,r,i,a){let{maxDepth:o,verbose:s,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:u,onProgress:d}=i,f=e.primitiveBuffer,p=e.primitiveBufferStride,m=new Float32Array(6),h=!1,g=new xr;return mr(t,n,r,g.boundingData,m),v(g,n,r,m),g;function _(e){d&&d((e-a.offset)/a.count)}function v(e,n,r,i=null,a=0){!h&&a>=o&&(h=!0,s&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));let d=r>l;if(r<=c&&!d||a>=o)return _(n+r),e.offset=n,e.count=r,e;let g=yr(e.boundingData,i,t,n,r,u),y=g.axis===-1?-1:Sr(f,p,t,n,r,g);if(g.axis===-1||y===n||y===n+r){if(!d)return _(n+r),e.offset=n,e.count=r,e;g.axis=Math.max(0,cr(e.boundingData)),y=n+Math.max(1,Math.floor(r/2))}e.splitAxis=g.axis;let b=new xr,x=n,S=y-n;e.left=b,mr(t,x,S,b.boundingData,m),v(b,x,S,m,a+1);let C=new xr,w=y,T=r-S;return e.right=C,mr(t,w,T,C.boundingData,m),v(C,w,T,m,a+1),e}}function Mr(e,t){let n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=e.getRootRanges(t.range),i=r[0],a=r[r.length-1],o={offset:i.offset,count:a.offset+a.count-i.offset},s=new Float32Array(6*o.count);s.offset=o.offset,e.computePrimitiveBounds(o.offset,o.count,s),e._roots=r.map(r=>{let i=jr(e,s,r.offset,r.count,t,o),a=Or(i),c=new n(32*a);return kr(0,i,c),c})}var Nr=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},G=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Pr,Fr,Ir=[],Lr=new Nr(()=>new o);function Rr(e,t,n,r,i,a){Pr=Lr.getPrimitive(),Fr=Lr.getPrimitive(),Ir.push(Pr,Fr),G.setBuffer(e._roots[t]);let o=zr(0,e.geometry,n,r,i,a);G.clearBuffer(),Lr.releasePrimitive(Pr),Lr.releasePrimitive(Fr),Ir.pop(),Ir.pop();let s=Ir.length;return s>0&&(Fr=Ir[s-1],Pr=Ir[s-2]),o}function zr(e,t,n,r,i=null,a=0,o=0){let{float32Array:s,uint16Array:c,uint32Array:l}=G,u=e*2;if(z(u,c)){let t=B(e,l),n=V(u,c);return R(W(e),s,Pr),r(t,n,!1,o,a+e/8,Pr)}{let u=H(e),d=U(e,l),f=u,p=d,m,h,g,_;if(i&&(g=Pr,_=Fr,R(W(f),s,g),R(W(p),s,_),m=i(g),h=i(_),h<m)){f=d,p=u;let e=m;m=h,h=e,g=_}g||(g=Pr,R(W(f),s,g));let v=z(f*2,c),y=n(g,v,m,o+1,a+f/8),b;if(y===2){let e=w(f);b=r(e,T(f)-e,!0,o+1,a+f/8,g)}else b=y&&zr(f,t,n,r,i,a,o+1);if(b)return!0;_=Fr,R(W(p),s,_);let x=z(p*2,c),S=n(_,x,h,o+1,a+p/8),C;if(S===2){let e=w(p);C=r(e,T(p)-e,!0,o+1,a+p/8,_)}else C=S&&zr(p,t,n,r,i,a,o+1);return!!C;function w(e){let{uint16Array:t,uint32Array:n}=G,r=e*2;for(;!z(r,t);)e=H(e),r=e*2;return B(e,n)}function T(e){let{uint16Array:t,uint32Array:n}=G,r=e*2;for(;!z(r,t);)e=U(e,n),r=e*2;return B(e,n)+V(r,t)}}}var Br=new G.constructor,Vr=new G.constructor,Hr=new Nr(()=>new o),Ur=new o,Wr=new o,Gr=new o,Kr=new o,qr=!1;function Jr(e,t,n,r){if(qr)throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);qr=!0;let i=e._roots,a=t._roots,o,s=0,c=0,l=new k().copy(n).invert();for(let e=0,t=i.length;e<t;e++){Br.setBuffer(i[e]),c=0;let t=Hr.getPrimitive();R(W(0),Br.float32Array,t),t.applyMatrix4(l);for(let e=0,i=a.length;e<i&&(Vr.setBuffer(a[e]),o=Yr(0,0,n,l,r,s,c,0,0,t),Vr.clearBuffer(),c+=a[e].byteLength/32,!o);e++);if(Hr.releasePrimitive(t),Br.clearBuffer(),s+=i[e].byteLength/32,o)break}return qr=!1,o}function Yr(e,t,n,r,i,a=0,o=0,s=0,c=0,l=null,u=!1){let d,f;u?(d=Vr,f=Br):(d=Br,f=Vr);let p=d.float32Array,m=d.uint32Array,h=d.uint16Array,g=f.float32Array,_=f.uint32Array,v=f.uint16Array,y=e*2,b=t*2,x=z(y,h),S=z(b,v),C=!1;if(S&&x)C=u?i(B(t,_),V(t*2,v),B(e,m),V(e*2,h),c,o+t/8,s,a+e/8):i(B(e,m),V(e*2,h),B(t,_),V(t*2,v),s,a+e/8,c,o+t/8);else if(S){let l=Hr.getPrimitive();R(W(t),g,l),l.applyMatrix4(n);let d=H(e),f=U(e,m);R(W(d),p,Ur),R(W(f),p,Wr);let h=l.intersectsBox(Ur),_=l.intersectsBox(Wr);C=h&&Yr(t,d,r,n,i,o,a,c,s+1,l,!u)||_&&Yr(t,f,r,n,i,o,a,c,s+1,l,!u),Hr.releasePrimitive(l)}else{let d=H(t),f=U(t,_);R(W(d),g,Gr),R(W(f),g,Kr);let h=l.intersectsBox(Gr),v=l.intersectsBox(Kr);if(h&&v)C=Yr(e,d,n,r,i,a,o,s,c+1,l,u)||Yr(e,f,n,r,i,a,o,s,c+1,l,u);else if(h){if(x)C=Yr(e,d,n,r,i,a,o,s,c+1,l,u);else{let t=Hr.getPrimitive();t.copy(Gr).applyMatrix4(n);let l=H(e),f=U(e,m);R(W(l),p,Ur),R(W(f),p,Wr);let h=t.intersectsBox(Ur),g=t.intersectsBox(Wr);C=h&&Yr(d,l,r,n,i,o,a,c,s+1,t,!u)||g&&Yr(d,f,r,n,i,o,a,c,s+1,t,!u),Hr.releasePrimitive(t)}}else if(v){if(x)C=Yr(e,f,n,r,i,a,o,s,c+1,l,u);else{let t=Hr.getPrimitive();t.copy(Kr).applyMatrix4(n);let l=H(e),d=U(e,m);R(W(l),p,Ur),R(W(d),p,Wr);let h=t.intersectsBox(Ur),g=t.intersectsBox(Wr);C=h&&Yr(f,l,r,n,i,o,a,c,s+1,t,!u)||g&&Yr(f,d,r,n,i,o,a,c,s+1,t,!u),Hr.releasePrimitive(t)}}}return C}var Xr=new class{constructor(){let e=null,t=null,n=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(i,a)=>{if(r)throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);this.root=a,this.buffer=e=i._roots[a],this.uint16Array=n=new Uint16Array(e),this.uint32Array=t=new Uint32Array(e)},this.reset=()=>{this.root=null,this.buffer=e=null,this.uint16Array=n=null,this.uint32Array=t=null},this.getRangeStart=e=>{let r=e*2;for(;!z(r,n);)e=H(e),r=e*2;return B(e,t)},this.getRangeEnd=e=>{let r=e*2;for(;!z(r,n);)e=U(e,t),r=e*2;return B(e,t)+V(r,n)};let i=(e,r,a)=>{let o=z(r*2,n);if(!e(a,o,r)&&!o){let n=H(r),o=U(r,t);i(e,n,a+1),i(e,o,a+1)}};this.traverseBuffer=e=>{if(r)throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);r=!0;try{i(e,0,0)}finally{r=!1}},this.traverse=r=>{this.traverseBuffer((i,a,o)=>{if(a){let s=o*2,c=t[o+6],l=n[s+14];return r(i,a,new Float32Array(e,o*4,6),c,l)}{let n=pr(o,t);return r(i,a,new Float32Array(e,o*4,6),n)}})}}},Zr=new o,Qr=new Float32Array(6),$r=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...sr,...e},`maxLeafSize`in e&&(console.warn(`BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.`),e={...e,targetLeafSize:e.maxLeafSize}),Mr(this,e)}getRootRanges(){throw Error(`BVH: getRootRanges() not implemented`)}writePrimitiveBounds(){throw Error(`BVH: writePrimitiveBounds() not implemented`)}writePrimitiveRangeBounds(e,t,n,r){let i=1/0,a=1/0,o=1/0,s=-1/0,c=-1/0,l=-1/0;for(let n=e,r=e+t;n<r;n++){this.writePrimitiveBounds(n,Qr,0);let[e,t,r,u,d,f]=Qr;e<i&&(i=e),u>s&&(s=u),t<a&&(a=t),d>c&&(c=d),r<o&&(o=r),f>l&&(l=f)}return n[r+0]=i,n[r+1]=a,n[r+2]=o,n[r+3]=s,n[r+4]=c,n[r+5]=l,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let i=e,a=e+t;i<a;i++){this.writePrimitiveBounds(i,Qr,0);let[e,t,a,o,s,c]=Qr,l=(e+o)/2,u=(t+s)/2,d=(a+c)/2,f=(o-e)/2,p=(s-t)/2,m=(c-a)/2,h=(i-r)*6;n[h+0]=l,n[h+1]=f+(Math.abs(l)+f)*ar,n[h+2]=u,n[h+3]=p+(Math.abs(u)+p)*ar,n[h+4]=d,n[h+5]=m+(Math.abs(d)+m)*ar}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t)for(let n=0,r=t.length;n<r;n++)t[n]+=e;else{let t=this._roots;for(let n=0;n<t.length;n++){let r=t[n],i=new Uint32Array(r),a=new Uint16Array(r),o=r.byteLength/32;for(let t=0;t<o;t++){let n=8*t;z(2*n,a)&&(i[n+6]+=e)}}}}traverse(e,t=0){Xr.setBVH(this,t),Xr.traverse(e),Xr.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n),a=new Float32Array(n),o=n.byteLength/32;for(let e=o-1;e>=0;e--){let t=e*8,n=t*2;if(z(n,i)){let e=B(t,r),o=V(n,i);this.writePrimitiveRangeBounds(e,o,Qr,0),a.set(Qr,t)}else{let e=H(t),n=U(t,r);for(let r=0;r<3;r++){let i=a[e+r],o=a[e+r+3],s=a[n+r],c=a[n+r+3];a[t+r]=i<s?i:s,a[t+r+3]=o>c?o:c}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{R(0,new Float32Array(t),Zr),e.union(Zr)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:i,scratchPrimitive:a,iterate:o}=e;if(r&&i){let e=r;r=(t,n,r,s,c)=>e(t,n,r,s,c)?!0:o(t,n,this,i,r,s,a)}else r||=i?(e,t,n,r)=>o(e,t,this,i,n,r,a):(e,t,n)=>n;let s=!1,c=0,l=this._roots;for(let e=0,i=l.length;e<i;e++){let i=l[e];if(s=Rr(this,e,n,r,t,c),s)break;c+=i.byteLength/32}return s}bvhcast(e,t,n){let{intersectsRanges:r}=n;return Jr(this,e,t,r)}};function ei(){return typeof SharedArrayBuffer<`u`}function ti(e){return e.index?e.index.count:e.attributes.position.count}function ni(e){return ti(e)/3}function ri(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function ii(e,t){if(!e.index){let n=e.attributes.position.count,i=ri(n,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new r(i,1));for(let e=0;e<n;e++)i[e]=e}}function ai(e,t,n){let r=ti(e)/n,i=t||e.drawRange,a=i.start/n,o=(i.start+i.count)/n,s=Math.max(0,a),c=Math.min(r,o)-s;return{offset:Math.floor(s),count:Math.floor(c)}}function oi(e,t){return e.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function si(e,t,n){let r=ai(e,t,n),i=oi(e,n);if(!i.length)return[r];let a=[],o=r.offset,s=r.offset+r.count,c=ti(e)/n,l=[];for(let e of i){let{offset:t,count:n}=e,r=t,i=t+(isFinite(n)?n:c-t);r<s&&i>o&&(l.push({pos:Math.max(o,r),isStart:!0}),l.push({pos:Math.min(s,i),isStart:!1}))}l.sort((e,t)=>e.pos===t.pos?e.type===`end`?-1:1:e.pos-t.pos);let u=0,d=null;for(let e of l){let t=e.pos;u!==0&&t!==d&&a.push({offset:d,count:t-d}),u+=e.isStart?1:-1,d=t}return a}function ci(e,t){let n=e[e.length-1],r=n.offset+n.count>2**16,i=e.reduce((e,t)=>e+t.count,0),a=r?4:2,o=t?new SharedArrayBuffer(i*a):new ArrayBuffer(i*a),s=r?new Uint32Array(o):new Uint16Array(o),c=0;for(let t=0;t<e.length;t++){let{offset:n,count:r}=e[t];for(let e=0;e<r;e++)s[c+e]=n+e;c+=r}return s}var li=class extends $r{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(!e.isBufferGeometry)throw Error(`BVH: Only BufferGeometries are supported.`);if(e.index&&e.index.isInterleavedBufferAttribute)throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);if(t.useSharedArrayBuffer&&!ei())throw Error(`BVH: SharedArrayBuffer is not available.`);super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?e=>this._indirectBuffer[e]:e=>e,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...sr,...t},t[or]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=ci(si(t,e.range,n),e.useSharedArrayBuffer);this._indirectBuffer=r}else ii(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new o))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:si(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw Error(`BVH: raycastObject3D() not implemented`)}},ui=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,a=e.length;i<a;i++){let a=e[i][t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=e.dot(a);n=o<n?o:n,r=o>r?o:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};ui.prototype.setFromBox=(function(){let e=new M;return function(t,n){let r=n.min,i=n.max,a=1/0,o=-1/0;for(let n=0;n<=1;n++)for(let s=0;s<=1;s++)for(let c=0;c<=1;c++){e.x=r.x*n+i.x*(1-n),e.y=r.y*s+i.y*(1-s),e.z=r.z*c+i.z*(1-c);let l=t.dot(e);a=Math.min(l,a),o=Math.max(l,o)}this.min=a,this.max=o}})();var di=(function(){let e=new M,t=new M,n=new M;return function(r,i,a){let o=r.start,s=e,c=i.start,l=t;n.subVectors(o,c),e.subVectors(r.end,r.start),t.subVectors(i.end,i.start);let u=n.dot(l),d=l.dot(s),f=l.dot(l),p=n.dot(s),m=s.dot(s)*f-d*d,h,g;h=m===0?0:(u*d-p*f)/m,g=(u+h*d)/f,a.x=h,a.y=g}})(),fi=(function(){let e=new j,t=new M,n=new M;return function(r,i,a,o){di(r,i,e);let s=e.x,c=e.y;if(s>=0&&s<=1&&c>=0&&c<=1){r.at(s,a),i.at(c,o);return}if(s>=0&&s<=1){c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);return}if(c>=0&&c<=1){s<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);return}{let e;e=s<0?r.start:r.end;let l;l=c<0?i.start:i.end;let u=t,d=n;if(r.closestPointToPoint(l,!0,t),i.closestPointToPoint(e,!0,n),u.distanceToSquared(l)<=d.distanceToSquared(e)){a.copy(u),o.copy(l);return}a.copy(e),o.copy(d);return}}})(),pi=(function(){let e=new M,t=new M,n=new i,r=new A;return function(i,a){let{radius:o,center:s}=i,{a:c,b:l,c:u}=a;if(r.start=c,r.end=l,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o||(r.start=c,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o)||(r.start=l,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o))return!0;let d=a.getPlane(n);if(Math.abs(d.distanceToPoint(s))<=o){let e=d.projectPoint(s,t);if(a.containsPoint(e))return!0}return!1}})(),mi=[`x`,`y`,`z`],hi=1e-15,gi=hi*hi;function _i(e){return Math.abs(e)<hi}var vi=class extends ue{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new M),this.satBounds=[,,,,].fill().map(()=>new ui),this.points=[this.a,this.b,this.c],this.plane=new i,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new A,this.needsUpdate=!0}intersectsSphere(e){return pi(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,a=this.satBounds,o=i[0],s=a[0];this.getNormal(o),s.setFromPoints(o,r);let c=i[1],l=a[1];c.subVectors(e,t),l.setFromPoints(c,r);let u=i[2],d=a[2];u.subVectors(t,n),d.setFromPoints(u,r);let f=i[3],p=a[3];f.subVectors(n,e),p.setFromPoints(f,r);let m=c.length(),h=u.length(),g=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<hi?h<hi||g<hi?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):h<hi?g<hi?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<hi&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};vi.prototype.closestPointToSegment=(function(){let e=new M,t=new M,n=new A;return function(r,i=null,a=null){let{start:o,end:s}=r,c=this.points,l,u=1/0;for(let o=0;o<3;o++){let s=(o+1)%3;n.start.copy(c[o]),n.end.copy(c[s]),fi(n,r,e,t),l=e.distanceToSquared(t),l<u&&(u=l,i&&i.copy(e),a&&a.copy(t))}return this.closestPointToPoint(o,e),l=o.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(o)),this.closestPointToPoint(s,e),l=s.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(s)),Math.sqrt(u)}})(),vi.prototype.intersectsTriangle=(function(){let e=new vi,t=new ui,n=new ui,r=new M,i=new M,a=new M,o=new M,s=new A,c=new A,l=new M,u=new j,d=new j;function f(e,i,a,s){let c=r;!e.isDegenerateIntoPoint&&!e.isDegenerateIntoSegment?c.copy(e.plane.normal):c.copy(i.plane.normal);let l=e.satBounds,u=e.satAxes;for(let r=1;r<4;r++){let a=l[r],s=u[r];if(t.setFromPoints(s,i.points),a.isSeparated(t)||(o.copy(c).cross(s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}let d=i.satBounds,f=i.satAxes;for(let r=1;r<4;r++){let a=d[r],s=f[r];if(t.setFromPoints(s,e.points),a.isSeparated(t)||(o.crossVectors(c,s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}return a&&(s||console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`),a.start.set(0,0,0),a.end.set(0,0,0)),!0}function p(e,t,n,r,i,a,o,s,c,l,u){let d=o/(o-s);l.x=r+(i-r)*d,u.start.subVectors(t,e).multiplyScalar(d).add(e),d=o/(o-c),l.y=r+(a-r)*d,u.end.subVectors(n,e).multiplyScalar(d).add(e)}function m(e,t,n,r,i,a,o,s,c,l,u){if(i>0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else if(a>0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(s*c>0||o!=0)p(e.a,e.b,e.c,t,n,r,o,s,c,l,u);else if(s!=0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(c!=0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else return!0;return!1}function h(e,t,n,i){let a=t.degenerateSegment,o=e.plane.distanceToPoint(a.start),s=e.plane.distanceToPoint(a.end);return _i(o)?_i(s)?f(e,t,n,i):(n&&(n.start.copy(a.start),n.end.copy(a.start)),e.containsPoint(a.start)):_i(s)?(n&&(n.start.copy(a.end),n.end.copy(a.end)),e.containsPoint(a.end)):e.plane.intersectLine(a,r)!=null&&(n&&(n.start.copy(r),n.end.copy(r)),e.containsPoint(r))}function g(e,t,n){let r=t.a;return _i(e.plane.distanceToPoint(r))&&e.containsPoint(r)?(n&&(n.start.copy(r),n.end.copy(r)),!0):!1}function _(e,t,n){let i=e.degenerateSegment,a=t.a;return i.closestPointToPoint(a,!0,r),a.distanceToSquared(r)<gi&&(n&&(n.start.copy(a),n.end.copy(a)),!0)}function v(e,t,n,o){if(e.isDegenerateIntoSegment){if(t.isDegenerateIntoSegment){let o=e.degenerateSegment,s=t.degenerateSegment,c=i,l=a;o.delta(c),s.delta(l);let u=r.subVectors(s.start,o.start),d=c.x*l.y-c.y*l.x;if(_i(d))return!1;let f=(u.x*l.y-u.y*l.x)/d,p=-(c.x*u.y-c.y*u.x)/d;return f<0||f>1||p<0||p>1?!1:_i(o.start.z+c.z*f-(s.start.z+l.z*p))?(n&&(n.start.copy(o.start).addScaledVector(c,f),n.end.copy(o.start).addScaledVector(c,f)),!0):!1}return t.isDegenerateIntoPoint?_(e,t,n):h(t,e,n,o)}if(e.isDegenerateIntoPoint)return t.isDegenerateIntoPoint?t.a.distanceToSquared(e.a)<gi&&(n&&(n.start.copy(e.a),n.end.copy(e.a)),!0):t.isDegenerateIntoSegment?_(t,e,n):g(t,e,n);if(t.isDegenerateIntoPoint)return g(e,t,n);if(t.isDegenerateIntoSegment)return h(e,t,n,o)}return function(t,n=null,r=!1){this.needsUpdate&&this.update(),t.isExtendedTriangle?t.needsUpdate&&t.update():(e.copy(t),e.update(),t=e);let o=v(this,t,n,r);if(o!==void 0)return o;let p=this.plane,h=t.plane,g=h.distanceToPoint(this.a),_=h.distanceToPoint(this.b),y=h.distanceToPoint(this.c);_i(g)&&(g=0),_i(_)&&(_=0),_i(y)&&(y=0);let b=g*_,x=g*y;if(b>0&&x>0)return!1;let S=p.distanceToPoint(t.a),C=p.distanceToPoint(t.b),w=p.distanceToPoint(t.c);_i(S)&&(S=0),_i(C)&&(C=0),_i(w)&&(w=0);let T=S*C,E=S*w;if(T>0&&E>0)return!1;i.copy(p.normal),a.copy(h.normal);let D=i.cross(a),ee=0,O=Math.abs(D.x),k=Math.abs(D.y);k>O&&(O=k,ee=1),Math.abs(D.z)>O&&(ee=2);let te=mi[ee],A=this.a[te],ne=this.b[te],re=this.c[te],ie=t.a[te],ae=t.b[te],j=t.c[te];if(m(this,A,ne,re,b,x,g,_,y,u,s)||m(t,ie,ae,j,T,E,S,C,w,d,c))return f(this,t,n,r);if(u.y<u.x){let e=u.y;u.y=u.x,u.x=e,l.copy(s.start),s.start.copy(s.end),s.end.copy(l)}if(d.y<d.x){let e=d.y;d.y=d.x,d.x=e,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(n&&(d.x>u.x?n.start.copy(c.start):n.start.copy(s.start),d.y<u.y?n.end.copy(c.end):n.end.copy(s.end)),!0)}})(),vi.prototype.distanceToPoint=(function(){let e=new M;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),vi.prototype.distanceToTriangle=(function(){let e=new M,t=new M,n=[`a`,`b`,`c`],r=new A,i=new A;return function(a,o=null,s=null){let c=o||s?r:null;if(this.intersectsTriangle(a,c,!0))return(o||s)&&(o&&c.getCenter(o),s&&c.getCenter(s)),0;let l=1/0;for(let t=0;t<3;t++){let r,i=n[t],c=a[i];this.closestPointToPoint(c,e),r=c.distanceToSquared(e),r<l&&(l=r,o&&o.copy(e),s&&s.copy(c));let u=this[i];a.closestPointToPoint(u,e),r=u.distanceToSquared(e),r<l&&(l=r,o&&o.copy(u),s&&s.copy(e))}for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];r.set(this[u],this[d]);for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];i.set(a[u],a[d]),fi(r,i,e,t);let f=e.distanceToSquared(t);f<l&&(l=f,o&&o.copy(e),s&&s.copy(t))}}return Math.sqrt(l)}})();var K=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new M,this.max=new M,this.matrix=new k,this.invMatrix=new k,this.points=Array(8).fill().map(()=>new M),this.satAxes=[,,,].fill().map(()=>new M),this.satBounds=[,,,].fill().map(()=>new ui),this.alignedSatBounds=[,,,].fill().map(()=>new ui),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};K.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let i=0;i<=1;i++)for(let a=0;a<=1;a++)for(let o=0;o<=1;o++){let s=r[1*i|2*a|4*o];s.x=i?n.x:t.x,s.y=a?n.y:t.y,s.z=o?n.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,a=this.satAxes,o=r[0];for(let e=0;e<3;e++){let t=a[e],n=i[e],s=r[1<<e];t.subVectors(o,s),n.setFromPoints(t,r)}let s=this.alignedSatBounds;s[0].setFromPointsField(r,`x`),s[1].setFromPointsField(r,`y`),s[2].setFromPointsField(r,`z`),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})(),K.prototype.intersectsBox=(function(){let e=new ui;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,i=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(e.min=n.x,e.max=r.x,o[0].isSeparated(e)||(e.min=n.y,e.max=r.y,o[1].isSeparated(e))||(e.min=n.z,e.max=r.z,o[2].isSeparated(e)))return!1;for(let n=0;n<3;n++){let r=a[n],o=i[n];if(e.setFromBox(r,t),o.isSeparated(e))return!1}return!0}})(),K.prototype.intersectsTriangle=(function(){let e=new vi,t=[,,,],n=new ui,r=new ui,i=new M;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let o=this.satBounds,s=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let e=0;e<3;e++){let r=o[e],i=s[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}let c=a.satBounds,l=a.satAxes,u=this.points;for(let e=0;e<3;e++){let t=c[e],r=l[e];if(n.setFromPoints(r,u),t.isSeparated(n))return!1}for(let e=0;e<3;e++){let a=s[e];for(let e=0;e<4;e++){let o=l[e];if(i.crossVectors(a,o),n.setFromPoints(i,t),r.setFromPoints(i,u),n.isSeparated(r))return!1}}return!0}})(),K.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})(),K.prototype.distanceToPoint=(function(){let e=new M;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),K.prototype.distanceToBox=(function(){let e=[`x`,`y`,`z`],t=Array(12).fill().map(()=>new A),n=Array(12).fill().map(()=>new A),r=new M,i=new M;return function(a,o=0,s=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(s||c)&&(a.getCenter(i),this.closestPointToPoint(i,r),a.closestPointToPoint(r,i),s&&s.copy(r),c&&c.copy(i)),0;let l=o*o,u=a.min,d=a.max,f=this.points,p=1/0;for(let e=0;e<8;e++){let t=f[e];i.copy(t).clamp(u,d);let n=t.distanceToSquared(i);if(n<p&&(p=n,s&&s.copy(t),c&&c.copy(i),n<l))return Math.sqrt(n)}let m=0;for(let r=0;r<3;r++)for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let o=(r+1)%3,s=(r+2)%3,c=i<<o|a<<s,l=1<<r|i<<o|a<<s,p=f[c],h=f[l];t[m].set(p,h);let g=e[r],_=e[o],v=e[s],y=n[m],b=y.start,x=y.end;b[g]=u[g],b[_]=i?u[_]:d[_],b[v]=a?u[v]:d[_],x[g]=d[g],x[_]=i?u[_]:d[_],x[v]=a?u[v]:d[_],m++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){i.x=e?d.x:u.x,i.y=t?d.y:u.y,i.z=n?d.z:u.z,this.closestPointToPoint(i,r);let a=i.distanceToSquared(r);if(a<p&&(p=a,s&&s.copy(r),c&&c.copy(i),a<l))return Math.sqrt(a)}for(let e=0;e<12;e++){let a=t[e];for(let e=0;e<12;e++){let t=n[e];fi(a,t,r,i);let o=r.distanceToSquared(i);if(o<p&&(p=o,s&&s.copy(r),c&&c.copy(i),o<l))return Math.sqrt(o)}}return Math.sqrt(p)}})();var yi=new class extends Nr{constructor(){super(()=>new vi)}},bi=new M,xi=new M;function Si(e,t,n={},r=0,i=1/0){let a=r*r,o=i*i,s=1/0,c=null;if(e.shapecast({boundsTraverseOrder:e=>(bi.copy(t).clamp(e.min,e.max),bi.distanceToSquared(t)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle:(e,n)=>{e.closestPointToPoint(t,bi);let r=t.distanceToSquared(bi);return r<s&&(xi.copy(bi),s=r,c=n),r<a}}),s===1/0)return null;let l=Math.sqrt(s);return n.point?n.point.copy(xi):n.point=xi.clone(),n.distance=l,n.faceIndex=c,n}var Ci=!0,wi=new M,Ti=new M,Ei=new M,Di=new j,Oi=new j,ki=new j,Ai=new M,ji=new M,Mi=new M,Ni=new M;function Pi(e,t,n,r,i,a,o,s){let c;if(c=a===1?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,a!==2,i),c===null)return null;let l=e.origin.distanceTo(i);return l<o||l>s?null:{distance:l,point:i.clone()}}function Fi(e,t,n,r,i,a,o,s,c,l,u){wi.fromBufferAttribute(t,a),Ti.fromBufferAttribute(t,o),Ei.fromBufferAttribute(t,s);let d=Pi(e,wi,Ti,Ei,Ni,c,l,u);if(d){if(r){Di.fromBufferAttribute(r,a),Oi.fromBufferAttribute(r,o),ki.fromBufferAttribute(r,s),d.uv=new j;let e=ue.getInterpolation(Ni,wi,Ti,Ei,Di,Oi,ki,d.uv);Ci||(d.uv=e)}if(i){Di.fromBufferAttribute(i,a),Oi.fromBufferAttribute(i,o),ki.fromBufferAttribute(i,s),d.uv1=new j;let e=ue.getInterpolation(Ni,wi,Ti,Ei,Di,Oi,ki,d.uv1);Ci||(d.uv1=e)}if(n){Ai.fromBufferAttribute(n,a),ji.fromBufferAttribute(n,o),Mi.fromBufferAttribute(n,s),d.normal=new M;let t=ue.getInterpolation(Ni,wi,Ti,Ei,Ai,ji,Mi,d.normal);d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1),Ci||(d.normal=t)}let t={a,b:o,c:s,normal:new M,materialIndex:0};if(ue.getNormal(wi,Ti,Ei,t.normal),d.face=t,d.faceIndex=a,Ci){let e=new M;ue.getBarycoord(Ni,wi,Ti,Ei,e),d.barycoord=e}}return d}function Ii(e){return e&&e.isMaterial?e.side:e}function Li(e,t,n,r,i,a,o){let s=r*3,c=s+0,l=s+1,u=s+2,{index:d,groups:f}=e;e.index&&(c=d.getX(c),l=d.getX(l),u=d.getX(u));let{position:p,normal:m,uv:h,uv1:g}=e.attributes;if(Array.isArray(t)){let e=r*3;for(let s=0,d=f.length;s<d;s++){let{start:d,count:_,materialIndex:v}=f[s];if(e>=d&&e<d+_){let e=Ii(t[v]),s=Fi(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=v,i)i.push(s);else return s}}}}else{let e=Ii(t),s=Fi(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=0,i)i.push(s);else return s}}return null}function q(e,t,n,r){let i=e.a,a=e.b,o=e.c,s=t,c=t+1,l=t+2;n&&(s=n.getX(s),c=n.getX(c),l=n.getX(l)),i.x=r.getX(s),i.y=r.getY(s),i.z=r.getZ(s),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l)}function Ri(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,l=r+i;e<l;e++)Li(c,t,n,e,a,o,s)}function zi(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,c=r+i;e<c;e++){let r;r=Li(s,t,n,e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Bi(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let n=e,s=t+e;n<s;n++){let e;if(e=n,q(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Vi(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(e,n,a=!1){let l=e*2;if(z(l,s)){let t=B(e,o),n=V(l,s),a=1/0,u=1/0,d=1/0,f=-1/0,p=-1/0,m=-1/0;for(let e=3*t,o=3*(t+n);e<o;e++){let t=r[e],n=i.getX(t),o=i.getY(t),s=i.getZ(t);n<a&&(a=n),n>f&&(f=n),o<u&&(u=o),o>p&&(p=o),s<d&&(d=s),s>m&&(m=s)}return c[e+0]!==a||c[e+1]!==u||c[e+2]!==d||c[e+3]!==f||c[e+4]!==p||c[e+5]!==m?(c[e+0]=a,c[e+1]=u,c[e+2]=d,c[e+3]=f,c[e+4]=p,c[e+5]=m,!0):!1}{let r=H(e),i=U(e,o),s=a,l=!1,u=!1;if(t){if(!s){let e=r/8+n/32,a=i/8+n/32;l=t.has(e),u=t.has(a),s=!l&&!u}}else l=!0,u=!0;let f=s||l,p=s||u,m=!1;f&&(m=d(r,n,s));let h=!1;p&&(h=d(i,n,s));let g=m||h;if(g)for(let t=0;t<3;t++){let n=r+t,a=i+t,o=c[n],s=c[n+3],l=c[a],u=c[a+3];c[e+t]=o<l?o:l,c[e+t+3]=s>u?s:u}return g}}}function Hi(e,t,n,r,i){let a,o,s,c,l,u,d=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,m=n.origin.x,h=n.origin.y,g=n.origin.z,_=t[e],v=t[e+3],y=t[e+1],b=t[e+3+1],x=t[e+2],S=t[e+3+2];return d>=0?(a=(_-m)*d,o=(v-m)*d):(a=(v-m)*d,o=(_-m)*d),f>=0?(s=(y-h)*f,c=(b-h)*f):(s=(b-h)*f,c=(y-h)*f),a>c||s>o||((s>a||isNaN(a))&&(a=s),(c<o||isNaN(o))&&(o=c),p>=0?(l=(x-g)*p,u=(S-g)*p):(l=(S-g)*p,u=(x-g)*p),a>u||l>o)?!1:((l>a||a!==a)&&(a=l),(u<o||o!==o)&&(o=u),a<=i&&o>=r)}function Ui(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,u=r+i;e<u;e++)Li(c,t,n,l?l[e]:e,a,o,s)}function Wi(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,d=r+i;e<d;e++){let r;r=Li(s,t,n,c?c[e]:e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function Gi(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(e=n.resolveTriangleIndex(s),q(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Ki(e,t,n,r,i,a,o){G.setBuffer(e._roots[t]),qi(0,e,n,r,i,a,o),G.clearBuffer()}function qi(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=G,u=e*2;if(z(u,c))Ri(t,n,r,B(e,l),V(u,c),i,a,o);else{let c=H(e);Hi(c,s,r,a,o)&&qi(c,t,n,r,i,a,o);let u=U(e,l);Hi(u,s,r,a,o)&&qi(u,t,n,r,i,a,o)}}var Ji=[`x`,`y`,`z`];function Yi(e,t,n,r,i,a){G.setBuffer(e._roots[t]);let o=Xi(0,e,n,r,i,a);return G.clearBuffer(),o}function Xi(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=G,l=e*2;if(z(l,s))return zi(t,n,r,B(e,c),V(l,s),i,a);{let s=pr(e,c),l=Ji[s],u=r.direction[l]>=0,d,f;u?(d=H(e),f=U(e,c)):(d=U(e,c),f=H(e));let p=Hi(d,o,r,i,a)?Xi(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Hi(f,o,r,i,a)?Xi(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var Zi=new o,Qi=new vi,$i=new vi,ea=new k,ta=new K,na=new K;function ra(e,t,n,r){G.setBuffer(e._roots[t]);let i=ia(0,e,n,r);return G.clearBuffer(),i}function ia(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=G,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),ta.set(n.boundingBox.min,n.boundingBox.max,r),i=ta),z(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=B(e,s),m=V(c,o);if(ea.copy(r).invert(),n.boundsTree)return R(W(e),a,na),na.matrix.copy(ea),na.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>na.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let t=p*3,n=(m+p)*3;t<n;t+=3)if(q($i,t,l,u),$i.needsUpdate=!0,e.intersectsTriangle($i))return!0;return!1}});{let e=ni(n);for(let t=p*3,n=(m+p)*3;t<n;t+=3){q(Qi,t,l,u),Qi.a.applyMatrix4(ea),Qi.b.applyMatrix4(ea),Qi.c.applyMatrix4(ea),Qi.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(q($i,t,d,f),$i.needsUpdate=!0,Qi.intersectsTriangle($i))return!0}}}else{let o=H(e),c=U(e,s);return R(W(o),a,Zi),!!(i.intersectsBox(Zi)&&ia(o,t,n,r,i)||(R(W(c),a,Zi),i.intersectsBox(Zi)&&ia(c,t,n,r,i)))}}var aa=new k,oa=new K,sa=new K,ca=new M,la=new M,ua=new M,da=new M;function fa(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),oa.set(t.boundingBox.min,t.boundingBox.max,n),oa.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=yi.getPrimitive(),p=yi.getPrimitive(),m=ca,h=la,g=null,_=null;i&&(g=ua,_=da);let v=1/0,y=null,b=null;return aa.copy(n).invert(),sa.matrix.copy(aa),e.shapecast({boundsTraverseOrder:e=>oa.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(sa.min.copy(e.min),sa.max.copy(e.max),sa.needsUpdate=!0),!0),intersectsRange:(e,r)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>sa.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,i)=>{for(let o=t,s=t+i;o<s;o++){q(p,3*o,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){q(f,3*t,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=t,b=o),e<a)return!0}}}});{let i=ni(t);for(let t=0,o=i;t<o;t++){q(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=e,i=e+r;n<i;n++){q(f,3*n,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=n,b=t),e<a)return!0}}}}}),yi.releasePrimitive(f),yi.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(aa),h.applyMatrix4(aa),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function pa(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(n,a,l=!1){let u=n*2;if(z(u,s)){let t=B(n,o),a=V(u,s),l=1/0,d=1/0,f=1/0,p=-1/0,m=-1/0,h=-1/0;for(let n=t,o=t+a;n<o;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let n=t+e;n=r?r[n]:n;let a=i.getX(n),o=i.getY(n),s=i.getZ(n);a<l&&(l=a),a>p&&(p=a),o<d&&(d=o),o>m&&(m=o),s<f&&(f=s),s>h&&(h=s)}}return c[n+0]!==l||c[n+1]!==d||c[n+2]!==f||c[n+3]!==p||c[n+4]!==m||c[n+5]!==h?(c[n+0]=l,c[n+1]=d,c[n+2]=f,c[n+3]=p,c[n+4]=m,c[n+5]=h,!0):!1}{let e=H(n),r=U(n,o),i=l,s=!1,u=!1;if(t){if(!i){let n=e/8+a/32,o=r/8+a/32;s=t.has(n),u=t.has(o),i=!s&&!u}}else s=!0,u=!0;let f=i||s,p=i||u,m=!1;f&&(m=d(e,a,i));let h=!1;p&&(h=d(r,a,i));let g=m||h;if(g)for(let t=0;t<3;t++){let i=e+t,a=r+t,o=c[i],s=c[i+3],l=c[a],u=c[a+3];c[n+t]=o<l?o:l,c[n+t+3]=s>u?s:u}return g}}}function ma(e,t,n,r,i,a,o){G.setBuffer(e._roots[t]),ha(0,e,n,r,i,a,o),G.clearBuffer()}function ha(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=G,u=e*2;if(z(u,c))Ui(t,n,r,B(e,l),V(u,c),i,a,o);else{let c=H(e);Hi(c,s,r,a,o)&&ha(c,t,n,r,i,a,o);let u=U(e,l);Hi(u,s,r,a,o)&&ha(u,t,n,r,i,a,o)}}var ga=[`x`,`y`,`z`];function _a(e,t,n,r,i,a){G.setBuffer(e._roots[t]);let o=va(0,e,n,r,i,a);return G.clearBuffer(),o}function va(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=G,l=e*2;if(z(l,s))return Wi(t,n,r,B(e,c),V(l,s),i,a);{let s=pr(e,c),l=ga[s],u=r.direction[l]>=0,d,f;u?(d=H(e),f=U(e,c)):(d=U(e,c),f=H(e));let p=Hi(d,o,r,i,a)?va(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Hi(f,o,r,i,a)?va(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var ya=new o,ba=new vi,xa=new vi,Sa=new k,Ca=new K,wa=new K;function Ta(e,t,n,r){G.setBuffer(e._roots[t]);let i=Ea(0,e,n,r);return G.clearBuffer(),i}function Ea(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=G,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),Ca.set(n.boundingBox.min,n.boundingBox.max,r),i=Ca),z(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=B(e,s),m=V(c,o);if(Sa.copy(r).invert(),n.boundsTree)return R(W(e),a,wa),wa.matrix.copy(Sa),wa.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>wa.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let n=p,r=m+p;n<r;n++)if(q(xa,3*t.resolveTriangleIndex(n),l,u),xa.needsUpdate=!0,e.intersectsTriangle(xa))return!0;return!1}});{let e=ni(n);for(let n=p,r=m+p;n<r;n++){q(ba,3*t.resolveTriangleIndex(n),l,u),ba.a.applyMatrix4(Sa),ba.b.applyMatrix4(Sa),ba.c.applyMatrix4(Sa),ba.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if(q(xa,t,d,f),xa.needsUpdate=!0,ba.intersectsTriangle(xa))return!0}}}else{let o=H(e),c=U(e,s);return R(W(o),a,ya),!!(i.intersectsBox(ya)&&Ea(o,t,n,r,i)||(R(W(c),a,ya),i.intersectsBox(ya)&&Ea(c,t,n,r,i)))}}var Da=new k,Oa=new K,ka=new K,Aa=new M,ja=new M,Ma=new M,Na=new M;function Pa(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Oa.set(t.boundingBox.min,t.boundingBox.max,n),Oa.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=yi.getPrimitive(),p=yi.getPrimitive(),m=Aa,h=ja,g=null,_=null;i&&(g=Ma,_=Na);let v=1/0,y=null,b=null;return Da.copy(n).invert(),ka.matrix.copy(Da),e.shapecast({boundsTraverseOrder:e=>Oa.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(ka.min.copy(e.min),ka.max.copy(e.max),ka.needsUpdate=!0),!0),intersectsRange:(r,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>ka.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,o)=>{for(let x=t,S=t+o;x<S;x++){let t=s.resolveTriangleIndex(x);q(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=r,n=r+i;t<n;t++){let n=e.resolveTriangleIndex(t);q(f,3*n,l,c),f.needsUpdate=!0;let r=f.distanceToTriangle(p,m,g);if(r<v&&(h.copy(m),_&&_.copy(g),v=r,y=t,b=x),r<a)return!0}}}})}{let o=ni(t);for(let t=0,s=o;t<s;t++){q(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=r,o=r+i;n<o;n++){let r=e.resolveTriangleIndex(n);q(f,3*r,l,c),f.needsUpdate=!0;let i=f.distanceToTriangle(p,m,g);if(i<v&&(h.copy(m),_&&_.copy(g),v=i,y=n,b=t),i<a)return!0}}}}}),yi.releasePrimitive(f),yi.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(Da),h.applyMatrix4(Da),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function Fa(e,t,n){return e===null?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e)}var Ia=new K,La=new l,Ra=new M,za=new k,Ba=new M,Va=[`getX`,`getY`,`getZ`],Ha=class e extends li{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(e=>e.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=i?i.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=i),o}static deserialize(t,n,i={}){i={setIndex:!0,indirect:!!t.indirectBuffer,...i};let{index:a,roots:o,indirectBuffer:s}=t;t.version||(console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`),l(o));let c=new e(n,{...i,[or]:!0});if(c._roots=o,c._indirectBuffer=s||null,i.setIndex){let e=n.getIndex();if(e===null){let e=new r(t.index,1,!1);n.setIndex(e)}else e.array!==a&&(e.array.set(a),e.needsUpdate=!0)}return c;function l(e){for(let t=0;t<e.length;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n);for(let e=0,t=n.byteLength/32;e<t;e++){let t=8*e;z(2*t,i)||(r[t+6]=r[t+6]/8-e)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn(`MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.`),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=(i?i[e]:e)*3,c=s+0,l=s+1,u=s+2;o&&(c=o[c],l=o[l],u=o[u]);for(let e=0;e<3;e++){let r=a[Va[e]](c),i=a[Va[e]](l),o=a[Va[e]](u),s=r;i<s&&(s=i),o<s&&(s=o);let d=r;i>d&&(d=i),o>d&&(d=o),t[n+e]=s,t[n+e+3]=d}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw Error(`MeshBVH: compute triangle bounds range is invalid.`);let c=a.array,l=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let d=[`getX`,`getY`,`getZ`],f=n.offset;for(let r=e,p=e+t;r<p;r++){let e=(i?i[r]:r)*3,t=(r-f)*6,p=e+0,m=e+1,h=e+2;o&&(p=o[p],m=o[m],h=o[h]),s||(p=p*u+l,m=m*u+l,h=h*u+l);for(let e=0;e<3;e++){let r,i,o;s?(r=a[d[e]](p),i=a[d[e]](m),o=a[d[e]](h)):(r=c[p+e],i=c[m+e],o=c[h+e]);let l=r;i<l&&(l=i),o<l&&(l=o);let u=r;i>u&&(u=i),o>u&&(u=o);let f=(u-l)/2,g=e*2;n[t+g+0]=l+f,n[t+g+1]=f+(Math.abs(l)+f)*ar}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;za.copy(e.matrixWorld).invert(),La.copy(t.ray).applyMatrix4(za),Ba.setFromMatrixScale(e.matrixWorld),Ra.copy(La.direction).multiply(Ba);let i=Ra.length(),a=t.near/i,o=t.far/i;if(t.firstHitOnly===!0){let i=this.raycastFirst(La,r,a,o);i=Fa(i,e,t),i&&n.push(i)}else{let i=this.raycast(La,r,a,o);for(let r=0,a=i.length;r<a;r++){let a=Fa(i[r],e,t);a&&n.push(a)}}return n}refit(e=null){return(this.indirect?pa:Vi)(this,e)}raycast(e,t=0,n=0,r=1/0){let i=this._roots,a=[],o=this.indirect?ma:Ki;for(let s=0,c=i.length;s<c;s++)o(this,s,t,e,a,n,r);return a}raycastFirst(e,t=0,n=0,r=1/0){let i=this._roots,a=null,o=this.indirect?_a:Yi;for(let s=0,c=i.length;s<c;s++){let i=o(this,s,t,e,n,r);i!=null&&(a==null||i.distance<a.distance)&&(a=i)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,i=this.indirect?Ta:ra;for(let a=0,o=r.length;a<o&&(n=i(this,a,e,t),!n);a++);return n}shapecast(e){let t=yi.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Gi:Bi});return yi.releasePrimitive(t),n}bvhcast(t,n,r){let{intersectsRanges:i,intersectsTriangles:a}=r,o=yi.getPrimitive(),s=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?e=>{let t=this.resolveTriangleIndex(e);q(o,t*3,s,c)}:e=>{q(o,e*3,s,c)},u=yi.getPrimitive(),d=t.geometry.index,f=t.geometry.attributes.position,p=t.indirect?e=>{let n=t.resolveTriangleIndex(e);q(u,n*3,d,f)}:e=>{q(u,e*3,d,f)};if(a){if(!(t instanceof e))throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);let r=(e,t,r,i,s,c,d,f)=>{for(let m=r,h=r+i;m<h;m++){p(m),u.a.applyMatrix4(n),u.b.applyMatrix4(n),u.c.applyMatrix4(n),u.needsUpdate=!0;for(let n=e,r=e+t;n<r;n++)if(l(n),o.needsUpdate=!0,a(o,u,n,m,s,c,d,f))return!0}return!1};if(i){let e=i;i=function(t,n,i,a,o,s,c,l){return e(t,n,i,a,o,s,c,l)?!0:r(t,n,i,a,o,s,c,l)}}else i=r}return super.bvhcast(t,n,{intersectsRanges:i})}intersectsBox(e,t){return Ia.set(e.min,e.max,t),Ia.needsUpdate=!0,this.shapecast({intersectsBounds:e=>Ia.intersectsBox(e),intersectsTriangle:e=>Ia.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,a=1/0){return(this.indirect?Pa:fa)(this,e,t,n,r,i,a)}closestPointToPoint(e,t={},n=0,r=1/0){return Si(this,e,t,n,r)}};function Ua(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new te,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Wa(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Wa(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Wa(e){let t,n,i,a=-1,o=0;for(let r=0;r<e.length;++r){let s=e[r];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(i===void 0&&(i=s.normalized),i!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(a===-1&&(a=s.gpuType),a!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;o+=s.count*n}let s=new t(o),c=new r(s,n,i),l=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=l/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);c.setComponent(t+e,i,n)}}else s.set(r.array,l);l+=r.count*n}return a!==void 0&&(c.gpuType=a),c}function Ga(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}var Ka=new k,qa=class{constructor(e){this.scene=e,this.parts=[],this.bvh=null,this.mesh=null,this.count=0}_push(e,t,n){let r=e.index?e.toNonIndexed():e.clone();for(let e of Object.keys(r.attributes))e!==`position`&&r.deleteAttribute(e);return t&&r.applyMatrix4(t),r.userData.kind=n,this.parts.push(r),this.count++,r}addMesh(e,t=`solid`){return e.updateWorldMatrix(!0,!1),this._push(e.geometry,e.matrixWorld,t)}addGeometry(e,t=null,n=`solid`){return this._push(e,t,n)}addBox(e,t,n=0,r=`solid`){let i=new p(t[0],t[1],t[2]);return Ka.makeRotationY(n).setPosition(e[0],e[1],e[2]),this._push(i,Ka,r)}addCylinder(e,t,n,r=12,i=`solid`){let a=new E(t,t,n,r,1,!1);return Ka.makeTranslation(e[0],e[1]+n/2,e[2]),this._push(a,Ka,i)}addRamp(e,t,n,r=.12,i=`walk`){let a=new M(...e),o=new M(...t),s=new M().subVectors(o,a),c=s.length(),l=new p(n,r,c);l.translate(0,-r/2,c/2);let u=new k().lookAt(new M,s.clone().negate(),new M(0,1,0));return u.setPosition(a),this._push(l,u,i)}finalize(){if(!this.parts.length)return null;let e=Ua(this.parts,!1);this.bvh=new Ha(e,{targetLeafSize:8}),e.boundsTree=this.bvh;let t=new oe({color:16711935,wireframe:!0,transparent:!0,opacity:.35});t.userData.noPatch=!0,this.mesh=new w(e,t),this.mesh.name=`collision`,this.mesh.layers.set(et.COLLIDER),this.mesh.matrixAutoUpdate=!1,this.scene.add(this.mesh);for(let e of this.parts)e.dispose();return this.parts=[],this.bvh}},Ja=class{constructor(e,t,n){this.scene=e,this.camera=t,this.list=[],this.lights=[];let r=n.lanternLights;for(let t=0;t<r;t++){let t=new f(16756848,0,9,2);t.castShadow=!1,t.layers.enableAll(),t.userData.target=null,t.userData.level=0,e.add(t),this.lights.push(t)}this._tmp=new M,this._prevCam=new M(1e9,0,0),this._snap=!0}register(e){let t={position:new M(...e.position),color:new v(e.color??16756848),intensity:e.intensity??6,distance:e.distance??9,flicker:e.flicker??.08,phase:this.list.length*1.618%6.283,id:this.list.length};return this.list.push(t),t}flickerAt(e,t){return 1+(Math.sin(t*7.3+e.phase)*.5+Math.sin(t*13.1+e.phase*2.1)*.3+Math.sin(t*2.3+e.phase)*.2)*e.flicker}update(e,t){let n=this.list.length,r=this.lights.length;if(!r||!n)return;let i=this.camera.getWorldPosition(this._tmp),a=this._snap||i.distanceToSquared(this._prevCam)>25;this._prevCam.copy(i),this._snap=!1,(!this._best||this._best.length!==r)&&(this._best=Array(r).fill(null),this._bestD=new Float64Array(r));let o=this._best,s=this._bestD,c=0;for(let e=0;e<n;e++){let t=this.list[e],n=t.position.distanceToSquared(i);if(c<r){let e=c++;for(;e>0&&s[e-1]>n;)s[e]=s[e-1],o[e]=o[e-1],e--;s[e]=n,o[e]=t}else if(n<s[r-1]){let e=r-1;for(;e>0&&s[e-1]>n;)s[e]=s[e-1],o[e]=o[e-1],e--;s[e]=n,o[e]=t}}for(let e=0;e<n;e++)this.list[e]._want=!1;for(let e=0;e<c;e++)o[e]._want=!0;let l=this.lights;for(let t=0;t<r;t++){let n=l[t],r=n.userData.target,i=r&&r._want;n.userData.level=a?+!!i:ce.damp(n.userData.level,+!!i,6,e),r&&!i&&n.userData.level<.02&&(n.userData.target=null,n.userData.level=0),i&&(r._want=!1)}let u=0;for(let e=0;e<r;e++){let t=l[e];if(t.userData.target)continue;for(;u<c&&!o[u]._want;)u++;if(u>=c)break;let n=o[u++];n._want=!1,t.userData.target=n,t.userData.level=+!!a}for(let e=0;e<r;e++){let n=l[e],r=n.userData.target;if(!r){n.intensity=0;continue}n.position.copy(r.position),n.color.copy(r.color),n.distance=r.distance,n.intensity=r.intensity*n.userData.level*this.flickerAt(r,t)}}},Ya=Math.PI/180;function Xa(e,t,n){e.rotation.order=`YXZ`,e.rotation.set(n*Ya,-t*Ya,0)}var Za=new re;function Qa(e,t={yaw:0,pitch:0}){let n=Za.setFromQuaternion(e.quaternion,`YXZ`);return t.yaw=-n.y/Ya,t.pitch=n.x/Ya,t}function $a(e){if(Array.isArray(e)){let[t,n,r,i=0,a=0]=e;return{pos:[t,n,r],yaw:i,pitch:a}}return Ce[e]??null}function eo(e,t,n=null){let r=$a(t);if(!r)return!1;let[i,a,o]=r.pos;r.eye&&(a=Math.max(a,vn(i,o))+he.eyeHeight),e.position.set(i,a,o),Xa(e,r.yaw??0,r.pitch??0);let s=n??r.fov;return s&&(e.fov=s,e.updateProjectionMatrix()),e.updateMatrixWorld(!0),!0}var to=`
// ---- tileable hash/noise helpers (period p in cells) ----
float bk_hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 bk_hash22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
// value noise, tileable with period per (integer)
float bk_vnoise(vec2 x, vec2 per) {
  vec2 i = floor(x), f = fract(x);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = bk_hash12(mod(i, per));
  float b = bk_hash12(mod(i + vec2(1.0, 0.0), per));
  float c = bk_hash12(mod(i + vec2(0.0, 1.0), per));
  float d = bk_hash12(mod(i + vec2(1.0, 1.0), per));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
// gradient noise, tileable, returns ~[-1,1]
float bk_gnoise(vec2 x, vec2 per) {
  vec2 i = floor(x), f = fract(x);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec2 ga = bk_hash22(mod(i, per)) * 2.0 - 1.0;
  vec2 gb = bk_hash22(mod(i + vec2(1.0, 0.0), per)) * 2.0 - 1.0;
  vec2 gc = bk_hash22(mod(i + vec2(0.0, 1.0), per)) * 2.0 - 1.0;
  vec2 gd = bk_hash22(mod(i + vec2(1.0, 1.0), per)) * 2.0 - 1.0;
  float va = dot(ga, f), vb = dot(gb, f - vec2(1.0, 0.0)), vc = dot(gc, f - vec2(0.0, 1.0)), vd = dot(gd, f - vec2(1.0, 1.0));
  return 1.4 * mix(mix(va, vb, u.x), mix(vc, vd, u.x), u.y);
}
float bk_fbm(vec2 uv, vec2 per, int oct) {
  float s = 0.0, a = 0.5, n = 0.0;
  vec2 p = uv * per;
  for (int o = 0; o < 8; o++) {
    if (o >= oct) break;
    s += a * bk_gnoise(p, per);
    n += a;
    p *= 2.0; per *= 2.0; a *= 0.5;
  }
  return s / n;
}
// tileable Worley: returns (F1, F2, cell id hash)
vec3 bk_worley(vec2 uv, vec2 per) {
  vec2 p = uv * per;
  vec2 i = floor(p), f = fract(p);
  float f1 = 8.0, f2 = 8.0, id = 0.0;
  for (int y = -1; y <= 1; y++)
  for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 c = mod(i + g, per);
    vec2 o = bk_hash22(c);
    vec2 r = g + o - f;
    float d = dot(r, r);
    if (d < f1) { f2 = f1; f1 = d; id = bk_hash12(c + 7.7); }
    else if (d < f2) { f2 = d; }
  }
  return vec3(sqrt(f1), sqrt(f2), id);
}
`;function no(e){let t=e.info?.programs;if(!t)return 0;let n=0;for(let e of t)(!e.isReady||e.isReady())&&(e.getUniforms(),n++);return n}var ro=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,io=class{constructor(e){this.renderer=e,this.camera=new a(-1,1,1,-1,0,1),this.quad=new w(new ne(2,2)),this.quad.frustumCulled=!1,this.targets=[],this.maxAniso=e.capabilities.getMaxAnisotropy()}bake(e,t={}){let r=t.size??1024,i=!!t.srgb,a=t.mipmaps!==!1,o=new D(t.width??r,t.height??r,{type:t.type??1009,format:n,colorSpace:i?h:``,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:a,minFilter:a?c:g,magFilter:g,wrapS:t.wrap??1e3,wrapT:t.wrap??1e3,anisotropy:Math.min(t.anisotropy??8,this.maxAniso)}),s=new se({uniforms:t.uniforms??{},vertexShader:ro,fragmentShader:`precision highp float;\nvarying vec2 vUv;\n${to}\n${e}\nvoid main(){ gl_FragColor = bake(vUv); }`,depthTest:!1,depthWrite:!1});this.quad.material=s;let l=this.renderer,u=l.getRenderTarget();return l.setRenderTarget(o),l.render(this.quad,this.camera),l.setRenderTarget(u),s.dispose(),this.targets.push(o),o.texture.name=t.name??`baked`,o.texture}},ao=`
// Never set from JS: GLSL initialises uniforms to 0. Loop bounds offset by uZero are
// opaque to the HLSL compiler (ANGLE/FXC), so loops stay loops instead of being fully
// unrolled at every call site. That keeps cold compile time low (the bake itself is
// only a few ms of GPU work per set).
uniform int uZero;
#ifndef PI
#define PI 3.14159265359
#endif
#define S_TAU 6.28318530718

struct S {
  vec2 uv;
  float curv;   // small-scale convexity: + ridge / edge, - groove (about -1..1)
  float cav;    // mid-scale cavity depth below local mean (metres, >= 0)
  float occ;    // framework ambient occlusion estimate (1 = open)
  vec3 n;       // tangent-space normal (+z out)
  float h;      // OUT height 0..1
  vec3 albedo;  // OUT linear albedo
  float rough;  // OUT roughness
  float metal;  // OUT metalness
  float ao;     // OUT extra AO multiplier
};

S s_new(vec2 uv) {
  S s;
  s.uv = uv; s.curv = 0.0; s.cav = 0.0; s.occ = 1.0; s.n = vec3(0.0, 0.0, 1.0);
  s.h = 0.5; s.albedo = vec3(0.5); s.rough = 0.8; s.metal = 0.0; s.ao = 1.0;
  return s;
}

float s_sat(float x) { return clamp(x, 0.0, 1.0); }
vec3 s_sat(vec3 x) { return clamp(x, 0.0, 1.0); }
// linear ramp 0..1 between a and b (a < b)
float s_ls(float a, float b, float x) { return clamp((x - a) / (b - a), 0.0, 1.0); }
// smooth ramp between a and b (a < b)
float s_ss(float a, float b, float x) { float t = clamp((x - a) / (b - a), 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
float s_lum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
float s_sq(float x) { return x * x; }
// safe power for non-negative bases
float s_pow(float x, float e) { return pow(max(x, 1e-6), e); }
vec3 s_desat(vec3 c, float k) { return mix(c, vec3(s_lum(c)), k); }

// wrapped distance between two coordinates with period 1
float s_wd(float a, float b) { float d = abs(fract(a) - fract(b)); return min(d, 1.0 - d); }
vec2 s_wd2(vec2 a, vec2 b) { vec2 d = abs(fract(a) - fract(b)); return min(d, 1.0 - d); }

// ---- hashes (inputs are integer-ish cell coordinates) ----
float s_h(vec2 p) { return bk_hash12(p); }
float s_h(float n) { return bk_hash12(vec2(n, n * 0.6180339 + 13.71)); }
vec2 s_h2(vec2 p) { return bk_hash22(p); }
vec3 s_h3(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yzz) * p3.zyx);
}

// ---- tileable noises ----
// x in CELL units, per = period in cells (integers)
float s_gn(vec2 x, vec2 per) { return bk_gnoise(x, per); }          // ~[-1, 1]
float s_vn(vec2 x, vec2 per) { return bk_vnoise(x, per); }          // [0, 1]
// uv-domain fbm (period 1), base frequency per; ~[-1, 1] (practically +-0.7)
float s_fbm(vec2 uv, vec2 per, int oct) {
  float s = 0.0, a = 0.5, n = 0.0;
  vec2 p = uv * per;
  for (int o = uZero; o < oct; o++) {
    s += a * bk_gnoise(p, per);
    n += a;
    p *= 2.0; per *= 2.0; a *= 0.5;
  }
  return s / n;
}
// fbm with custom persistence
float s_fbmg(vec2 uv, vec2 per, int oct, float gain) {
  float s = 0.0, a = 0.5, n = 0.0;
  vec2 p = uv * per;
  for (int o = uZero; o < oct; o++) {
    s += a * bk_gnoise(p, per);
    n += a;
    p *= 2.0; per *= 2.0; a *= gain;
  }
  return s / n;
}
// value-noise fbm in [0, 1]
float s_vfbm(vec2 uv, vec2 per, int oct) {
  float s = 0.0, a = 0.5, n = 0.0;
  vec2 p = uv * per;
  for (int o = uZero; o < oct; o++) {
    s += a * bk_vnoise(p, per);
    n += a;
    p *= 2.0; per *= 2.0; a *= 0.5;
  }
  return s / n;
}
// ridged multifractal in [0, 1] (sharp crests)
float s_ridged(vec2 uv, vec2 per, int oct) {
  float s = 0.0, a = 0.5, n = 0.0, prev = 1.0;
  vec2 p = uv * per;
  for (int o = uZero; o < oct; o++) {
    float r = 1.0 - abs(bk_gnoise(p, per));
    r *= r;
    s += a * r * prev;
    n += a;
    prev = clamp(r * 1.4, 0.0, 1.0);
    p *= 2.0; per *= 2.0; a *= 0.5;
  }
  return s / n;
}
// periodic 2D warp vector field
vec2 s_warp(vec2 uv, vec2 per, int oct) {
  return vec2(s_fbm(uv, per, oct), s_fbm(uv + vec2(0.371, 0.713), per, oct));
}

// ---- tileable Voronoi with border distance (Quilez) ----
struct Vor {
  float f1;     // distance to nearest feature point
  float f2;     // distance to second nearest
  float edge;   // distance to the nearest cell border
  vec2 cell;    // integer id of the nearest cell (already wrapped to the period)
  vec2 rel;     // vector from the sample to the nearest feature point
  vec2 enrm;    // unit normal of the nearest border
};
// isotropic: uv period 1, per cells, jit 0..1 feature-point jitter
Vor s_vor(vec2 uv, vec2 per, float jit) {
  vec2 p = uv * per;
  vec2 ip = floor(p), fp = fract(p);
  float md = 1e9, md2 = 1e9;
  vec2 mr = vec2(0.0), mg = vec2(0.0);
  for (int y = -1 - uZero; y <= 1; y++)
  for (int x = -1 - uZero; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = 0.5 + jit * (s_h2(mod(ip + g, per)) - 0.5);
    vec2 r = g + o - fp;
    float d = dot(r, r);
    if (d < md) { md2 = md; md = d; mr = r; mg = g; }
    else if (d < md2) { md2 = d; }
  }
  float ed = 1e9;
  vec2 en = vec2(0.0, 1.0);
  for (int y = -2 - uZero; y <= 2; y++)
  for (int x = -2 - uZero; x <= 2; x++) {
    vec2 g = mg + vec2(float(x), float(y));
    vec2 o = 0.5 + jit * (s_h2(mod(ip + g, per)) - 0.5);
    vec2 r = g + o - fp;
    vec2 dr = r - mr;
    if (dot(dr, dr) > 1e-6) {
      vec2 nd = normalize(dr);
      float e = dot(0.5 * (mr + r), nd);
      if (e < ed) { ed = e; en = nd; }
    }
  }
  Vor v;
  v.f1 = sqrt(md); v.f2 = sqrt(md2); v.edge = ed; v.cell = mod(ip + mg, per); v.rel = mr; v.enrm = en;
  return v;
}
// anisotropic metric: distances measured after scaling cell units by m (e.g. metres
// per cell in u and v) so elongated cells get physically correct border widths.
Vor s_vorA(vec2 uv, vec2 per, float jit, vec2 m) {
  vec2 p = uv * per;
  vec2 ip = floor(p), fp = fract(p);
  float md = 1e9, md2 = 1e9;
  vec2 mr = vec2(0.0), mg = vec2(0.0);
  for (int y = -2 - uZero; y <= 2; y++)
  for (int x = -2 - uZero; x <= 2; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = 0.5 + jit * (s_h2(mod(ip + g, per)) - 0.5);
    vec2 r = (g + o - fp) * m;
    float d = dot(r, r);
    if (d < md) { md2 = md; md = d; mr = r; mg = g; }
    else if (d < md2) { md2 = d; }
  }
  float ed = 1e9;
  vec2 en = vec2(0.0, 1.0);
  for (int y = -2 - uZero; y <= 2; y++)
  for (int x = -2 - uZero; x <= 2; x++) {
    vec2 g = mg + vec2(float(x), float(y));
    vec2 o = 0.5 + jit * (s_h2(mod(ip + g, per)) - 0.5);
    vec2 r = (g + o - fp) * m;
    vec2 dr = r - mr;
    if (dot(dr, dr) > 1e-9) {
      vec2 nd = normalize(dr);
      float e = dot(0.5 * (mr + r), nd);
      if (e < ed) { ed = e; en = nd; }
    }
  }
  Vor v;
  v.f1 = sqrt(md); v.f2 = sqrt(md2); v.edge = ed; v.cell = mod(ip + mg, per); v.rel = mr; v.enrm = en;
  return v;
}

// ---- shapes ----
vec2 s_rot(vec2 p, float a) { float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }
// distance to segment a-b
float s_seg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-9), 0.0, 1.0);
  return length(pa - ba * t);
}
// rounded dome profile for normalized radius r (1 at rim)
float s_dome(float r) { return sqrt(max(1.0 - r * r, 0.0)); }
`,oo=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,so=2048,co=`
vec2 s_ssOff(int k) {
  if (k == 0) return vec2(-0.125, -0.375);
  if (k == 1) return vec2(0.375, -0.125);
  if (k == 2) return vec2(0.125, 0.375);
  return vec2(-0.375, 0.125);
}
`,lo={fbm:1,gn:1,vfbm:2,vn:2,ridged:3},uo=`
precision highp float;
varying vec2 vUv;
layout(location = 0) out highp vec4 oL;
uniform int uMode;                 // 0 = four scalar layers, 1 = voronoi
uniform vec4 uKind, uPerX, uPerY, uOct, uGain, uOffX, uOffY;
uniform vec2 uVPer, uVMetric, uVOff;
uniform float uVJit;
${to}
${ao}
void main() {
  vec2 uv = vUv;
  if (uMode == 1) {
    Vor v = s_vorA(uv + uVOff, uVPer, uVJit, uVMetric);
    oL = vec4(v.rel, s_h(v.cell + 17.0), v.edge);
    return;
  }
  vec4 r = vec4(0.0);
  for (int c = uZero; c < 4; c++) {
    float k = uKind[c];
    vec2 per = vec2(uPerX[c], uPerY[c]);
    vec2 p = uv + vec2(uOffX[c], uOffY[c]);
    int oct = int(uOct[c] + 0.5);
    float v = 0.0;
    if (k > 2.5) v = s_ridged(p, per, oct);
    else if (k > 1.5) v = s_vfbm(p, per, oct);
    else if (k > 0.5) v = s_fbmg(p, per, oct, uGain[c]);
    if (c == 0) r.x = v; else if (c == 1) r.y = v; else if (c == 2) r.z = v; else r.w = v;
  }
  oL = r;
}
`;function fo(e){let t=[],n=null,r=0,i=[];for(let[a,o]of Object.entries(e.layers??{})){let e=o[0],s=[r*.61803%1*.73+.11,r*.41421%1*.67+.23];if(r++,e===`vor`){t.push({mode:1,spec:o,seed:s}),i.push(`#define V_${a}(p) textureLod(tL${t.length-1}, (p), 0.0)`);continue}if(!(e in lo))throw Error(`surface layer '${a}': unknown kind '${e}'`);(!n||n.items.length===4)&&(n={mode:0,items:[]},t.push(n));let c=`xyzw`[n.items.length];n.items.push({name:a,spec:o,seed:s}),i.push(`#define L_${a}(p) textureLod(tL${t.indexOf(n)}, (p), 0.0).${c}`)}return{groups:t,glsl:t.map((e,t)=>`uniform sampler2D tL${t};`).join(`
`)+`
`+i.join(`
`)}}function po(e,t){let n=e.ss??1,r=e.detail?.glsl??`float detail(vec2 uv) { return 0.5; }`;return`
precision highp float;
#define SS ${n}
varying vec2 vUv;
layout(location = 0) out highp vec4 o0;
layout(location = 1) out highp vec4 o1;
layout(location = 2) out highp vec4 o2;
layout(location = 3) out highp vec4 o3;
uniform int uPass;
uniform sampler2D tData;
uniform vec2 uTexel;
uniform float uDepth;   // metres of relief for height 0..1
uniform float uWorld;   // metres per tile
uniform float uAO;      // cavity AO strength
uniform float uDRep;    // detail tiles per surface tile
uniform float uDDepth;  // metres of detail relief for detail 0..1
uniform float uDSlope;  // slope range of the detail encoding
${to}
${ao}
${co}
${t}
${e.glsl}
${r}
float s_hAt(vec2 uv, float lod) { return textureLod(tData, uv, lod).r; }
vec2 s_hdAt(vec2 uv) { return textureLod(tData, uv, 0.0).rg; }
void main() {
  vec2 uv = vUv;
  vec2 t = uTexel;
  bool shade = uPass == 1;
  float h0 = 0.0, occ = 1.0, curv = 0.0, cav = 0.0;
  vec3 n = vec3(0.0, 0.0, 1.0);
  vec2 dS = vec2(0.0);                     // detail slope (m/m)
  if (shade) {
    float texM = uWorld * t.x;             // metres per texel
    h0 = s_hAt(uv, 0.0);
    // Sobel slope in metres per metre (x = height, y = detail height)
    vec2 hl = s_hdAt(uv + vec2(-t.x, 0.0)), hr = s_hdAt(uv + vec2(t.x, 0.0));
    vec2 hd = s_hdAt(uv + vec2(0.0, -t.y)), hu = s_hdAt(uv + vec2(0.0, t.y));
    vec2 hlu = s_hdAt(uv + vec2(-t.x, t.y)), hru = s_hdAt(uv + vec2(t.x, t.y));
    vec2 hld = s_hdAt(uv + vec2(-t.x, -t.y)), hrd = s_hdAt(uv + vec2(t.x, -t.y));
    vec2 sx = (hru + 2.0 * hr + hrd) - (hlu + 2.0 * hl + hld);
    vec2 sy = (hlu + 2.0 * hu + hru) - (hld + 2.0 * hd + hrd);
    float gx = sx.x / (8.0 * texM) * uDepth;
    float gy = sy.x / (8.0 * texM) * uDepth;
    n = normalize(vec3(-gx, -gy, 1.0));
    float dTexM = texM / uDRep;            // metres per texel of the detail tile
    dS = vec2(sx.y, sy.y) / (8.0 * dTexM) * uDDepth;
    // multi-scale horizon estimate from the mip pyramid: elevation of the local
    // mean above this texel, as an angle, at radii of 2..128 texels
    float o = 0.0;
    for (int L = 1 + uZero; L <= 7; L++) {
      float lod = float(L);
      float m = s_hAt(uv, lod);
      float r = texM * exp2(lod) * 0.6;
      float e = max(m - h0, 0.0) * uDepth / r;
      o += atan(e) * 0.63662 * (1.0 - 0.08 * lod);
    }
    occ = clamp(1.0 - o * uAO * 0.55, 0.0, 1.0);
    curv = clamp((h0 - s_hAt(uv, 2.0)) * uDepth / (texM * 3.0), -1.0, 1.0);
    cav = max(s_hAt(uv, 4.0) - h0, 0.0) * uDepth;
  }
  float hs = 0.0, rough = 0.0, metal = 0.0, ao = 0.0;
  vec3 alb = vec3(0.0);
  for (int k = uZero; k < SS; k++) {
    S s = s_new(uv + (SS > 1 ? s_ssOff(k) * t : vec2(0.0)));
    s.curv = curv; s.cav = cav; s.occ = occ; s.n = n;
    surface(s);
    hs += s.h; alb += s.albedo; rough += s.rough; metal += s.metal; ao += s.ao;
  }
  float inv = 1.0 / float(SS);
  if (!shade) {
    o0 = vec4(clamp(hs * inv, 0.0, 1.0), clamp(detail(uv), 0.0, 1.0), 0.0, 1.0);
    o1 = vec4(0.0); o2 = vec4(0.0); o3 = vec4(0.0);
    return;
  }
  alb *= inv; rough *= inv; metal *= inv; ao *= inv;
  vec2 dE = clamp(dS / uDSlope, -1.0, 1.0) * 0.5 + 0.5;
  o0 = vec4(clamp(alb, 0.0, 1.0), 1.0);
  o1 = vec4(n * 0.5 + 0.5, dE.y);
  o2 = vec4(clamp(occ * ao, 0.0, 1.0), clamp(rough, 0.03, 1.0), clamp(metal, 0.0, 1.0), dE.x);
  o3 = vec4(h0, 0.0, 0.0, 1.0);
}
`}function mo(e,t=[.4,.33,.25],n=.85){return{worldSize:e.worldSize,depth:e.depth??.01,ss:1,layers:{n:[`fbm`,[8,8],4]},glsl:`
void surface(inout S s) {
  float n = L_n(s.uv);
  s.h = 0.5 + 0.3 * n;
  s.albedo = vec3(${t.map(e=>e.toFixed(3)).join(`,`)}) * (0.9 + 0.2 * n);
  s.rough = ${n.toFixed(3)};
  s.metal = 0.0;
}`}}var ho=class{constructor(e){this.renderer=e,this.camera=new a(-1,1,1,-1,0,1),this.geo=new ne(2,2),this.quad=new w(this.geo),this.quad.frustumCulled=!1,this.maxAniso=e.capabilities.getMaxAnisotropy(),this.dataRT=null,this.pool=[],this.poolSize=0,this.targets=[],this.bytes=0,this.layerMat=new se({name:`bake.layers`,glslVersion:s,vertexShader:oo,fragmentShader:uo,uniforms:{uMode:{value:0},uKind:{value:new O},uPerX:{value:new O},uPerY:{value:new O},uOct:{value:new O},uGain:{value:new O},uOffX:{value:new O},uOffY:{value:new O},uVPer:{value:new j},uVMetric:{value:new j},uVOff:{value:new j},uVJit:{value:0}},depthTest:!1,depthWrite:!1})}_layerTarget(e,t){t=Math.min(t,so);let r=this.pool[e];return r&&r.width===t?r:(r?.dispose(),r=new D(t,t,{type:S,format:n,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,minFilter:g,magFilter:g,wrapS:b,wrapT:b}),r.texture.name=`surface.layer`+e,this.pool[e]=r,r)}_dataTarget(e){if(this.dataRT&&this.dataRT.width===e)return this.dataRT;this.dataRT?.dispose();let t=new D(e,e,{count:4,type:u,format:n,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,minFilter:g,magFilter:g,wrapS:b,wrapT:b}),r=t.textures[0];r.type=S,r.generateMipmaps=!0,r.minFilter=c,r.name=`surface.scratch`;for(let e=1;e<4;e++)t.textures[e].format=de;return this.dataRT=t,t}prepare(e,t,n){let r=fo(t),i={uPass:{value:0},tData:{value:null},uTexel:{value:new j(1/n,1/n)},uDepth:{value:t.depth??.02},uWorld:{value:t.worldSize},uAO:{value:t.aoStrength??1},uDRep:{value:8},uDDepth:{value:t.detail?t.detail.depth??.001:0},uDSlope:{value:1}};return r.groups.forEach((e,t)=>{i[`tL`+t]={value:null}}),{name:e,def:t,size:n,mat:new se({name:`bake.${e}`,glslVersion:s,vertexShader:oo,fragmentShader:po(t,r.glsl),uniforms:i,depthTest:!1,depthWrite:!1}),plan:r}}async compileAll(e){let t=this.renderer,n=new ee;for(let t of[this.layerMat,...e.map(e=>e.mat)]){let e=new w(this.geo,t);e.frustumCulled=!1,n.add(e)}let r=this._dataTarget(e[0]?.size??1024),i=t.getRenderTarget();t.setRenderTarget(r);try{t.compileAsync?await t.compileAsync(n,this.camera):t.compile(n,this.camera)}finally{t.setRenderTarget(i)}}prime(e){let t=this.renderer.properties;for(let n of[this.layerMat,...e.map(e=>e.mat)])t.get(n).currentProgram?.getUniforms()}runnable(e){let t=this.renderer.properties;for(let n of[this.layerMat,e.mat]){let e=t.get(n).currentProgram;if(e&&e.diagnostics&&e.diagnostics.runnable===!1)return!1}return!0}_render(e,t){let n=this.renderer;this.quad.material=e,n.setRenderTarget(t),n.render(this.quad,this.camera)}_renderLayers(e){let t=this.layerMat.uniforms;e.plan.groups.forEach((n,r)=>{let i=this._layerTarget(r,e.size);if(n.mode===1){let[,e,r,i]=n.spec;t.uMode.value=1,t.uVPer.value.set(e[0],e[1]),t.uVMetric.value.set(i?i[0]:1,i?i[1]:1),t.uVOff.value.set(n.seed[0],n.seed[1]),t.uVJit.value=r??.8}else{t.uMode.value=0;let e=[0,0,0,0],r=[1,1,1,1],i=[1,1,1,1],a=[1,1,1,1],o=[.5,.5,.5,.5],s=[0,0,0,0],c=[0,0,0,0];n.items.forEach((t,n)=>{let[l,u,d,f]=t.spec;e[n]=lo[l],r[n]=u[0],i[n]=u[1],a[n]=l===`gn`||l===`vn`?1:d??4,o[n]=f??.5,s[n]=t.seed[0],c[n]=t.seed[1]}),t.uKind.value.fromArray(e),t.uPerX.value.fromArray(r),t.uPerY.value.fromArray(i),t.uOct.value.fromArray(a),t.uGain.value.fromArray(o),t.uOffX.value.fromArray(s),t.uOffY.value.fromArray(c)}this._render(this.layerMat,i),e.mat.uniforms[`tL`+r].value=i.texture})}bake(e,t=8){let r=this.renderer,{size:i,def:a,name:o,mat:s}=e,l=r.getRenderTarget(),d=Math.min(t,this.maxAniso);this._renderLayers(e);let f=this._dataTarget(i);s.uniforms.uPass.value=0,s.uniforms.tData.value=null,this._render(s,f);let p=new D(i,i,{count:4,type:u,format:n,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!0,minFilter:c,magFilter:g,wrapS:b,wrapT:b,anisotropy:d}),[m,_,v,y]=p.textures;m.colorSpace=h,_.colorSpace=``,v.colorSpace=``,y.colorSpace=``,y.format=de,y.anisotropy=Math.min(4,d),m.name=o+`.map`,_.name=o+`.normal`,v.name=o+`.orm`,y.name=o+`.height`,s.uniforms.uPass.value=1,s.uniforms.tData.value=f.textures[0],this._render(s,p),s.uniforms.tData.value=null;for(let e in s.uniforms)e.startsWith(`tL`)&&(s.uniforms[e].value=null);r.setRenderTarget(l),this.targets.push(p);let x=i*i*(4/3);return this.bytes+=x*4*3+x,{map:m,normalMap:_,ormMap:v,heightMap:y,worldSize:a.worldSize,depth:a.depth??.02}}disposeJob(e){e.mat.dispose()}disposeScratch(){this.dataRT?.dispose(),this.dataRT=null;for(let e of this.pool)e?.dispose();this.pool.length=0,this.layerMat.dispose()}},go={hero:!0,worldSize:2,depth:.1,aoStrength:1.2,layers:{w1:[`fbm`,[2,3],3],w2:[`fbm`,[3,2],3],tw:[`fbm`,[1,4],2],f1:[`gn`,[18,3]],f2:[`gn`,[36,5]],f3:[`gn`,[72,9]],wid:[`fbm`,[4,6],3],dp:[`vfbm`,[5,3],3],rj:[`fbm`,[6,18],3],rj2:[`fbm`,[30,40],2],bz:[`vfbm`,[6,4],3],cork:[`fbm`,[40,20],4],scl:[`ridged`,[60,36],3],fib:[`ridged`,[110,12],3],bump:[`fbm`,[20,10],3],grain:[`fbm`,[160,80],2],tone:[`vfbm`,[3,2],4],tone2:[`vfbm`,[12,6],3],lz:[`vfbm`,[5,3],5],ln:[`vfbm`,[70,60],3],mz:[`vfbm`,[3,2],4],mn:[`vfbm`,[60,40],3],dFib:[`ridged`,[64,8],2],dCork:[`vfbm`,[48,40],3],dW:[`fbm`,[12,6],2]},detail:{depth:.0018,glsl:`
float detail(vec2 uv) {
  float fib = L_dFib(uv + vec2(0.01 * L_dW(uv), 0.0));
  float cork = L_dCork(uv);
  return 0.5 + 0.36 * (fib - 0.5) + 0.4 * (cork - 0.5);
}`},glsl:`
float barkN(vec2 q) { return L_f1(q) + 0.5 * L_f2(q) + 0.25 * L_f3(q); }
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  vec2 q = uv + vec2(0.03 * w.x + 0.018 * L_tw(uv), 0.03 * w.y);

  // ---- furrows: distance to the zero set = |n| / |grad n| (metres), so every
  // furrow has a physical width instead of widening into blobs where n is flat
  float n = barkN(q);
  float e = 1.5 / 2048.0;
  vec2 gr = vec2(barkN(q + vec2(e, 0.0)) - barkN(q - vec2(e, 0.0)), barkN(q + vec2(0.0, e)) - barkN(q - vec2(0.0, e))) / (2.0 * e);
  float dist = abs(n) / max(length(gr), 1.0) * 2.0;        // metres (tile = 2 m)
  dist += 0.0045 * L_rj2(q) + 0.003 * (L_fib(q) - 0.5);      // ragged, stringy ridge edges
  float hw = 0.01 + 0.011 * (L_wid(q) * 0.5 + 0.5);          // furrow half-width 1..2.1 cm
  float deep = 0.55 + 0.45 * L_dp(q);
  float t = dist / hw;                                       // 0 furrow floor .. 1 ridge edge
  float wall = s_ss(0.0, 1.0, t);
  float vwall = clamp(t, 0.0, 1.0);                          // straight V flank
  float roll = s_ss(1.0, 1.9, t);                            // ridge top rolling over the edge

  // ---- ridge blocks: roughly horizontal cracks across each ridge (~12 cm apart),
  // offset between neighbouring ridges (n changes sign across every furrow), with
  // per-block height and a forward tilt (the upper end of each block stands out)
  float side = step(0.0, n);
  float rowF = q.y * (2.0 / 0.16) + side * 0.5 + 0.9 * L_rj(q + side * 0.31) + 0.12 * L_rj2(q);
  float rid = floor(rowF), rf = fract(rowF);
  float bid = s_h(vec2(mod(rid, 200.0), side * 7.0 + 3.0));
  // V-shaped breaks about as wide as they are deep (1-2.4 cm across): a narrow
  // flat-bottomed slot read as a thin scored line with a lit lip under raking light
  float crackW = (0.006 + 0.006 * fract(bid * 7.3)) * (1.0 + 0.8 * (1.0 - roll)) + 0.0025 * L_rj2(q * 1.7);
  float bOn = s_ss(0.3, 0.6, L_bz(q));                        // blocky zones vs long ridges
  float rowOn = step(0.5, s_h(vec2(mod(rid, 200.0), side + 11.0)));
  float cd = abs(min(rf, 1.0 - rf) * 0.16 + 0.006 * L_rj2(q + 0.5));   // metres to the crack row (wavy)
  float crackV = 1.0 - s_ls(0.0, crackW, cd);
  float crack = crackV * (0.6 + 0.4 * crackV) * bOn * rowOn * roll;
  float tilt = (0.5 - rf) * 2.0;
  float blockH = ((bid - 0.5) * 0.045 + 0.015 * tilt) * bOn * rowOn;

  float cork = L_cork(q), scl = L_scl(q), fib = L_fib(q);
  float ridge = 0.74 + 0.07 * cork + 0.05 * scl + 0.045 * fib + 0.03 * L_bump(q) + blockH;
  float bottom = (0.08 + 0.05 * L_bump(q + 0.3)) * deep;
  float prof = mix(vwall, wall, 0.5);
  float h = mix(bottom, ridge - 0.08 * (1.0 - roll), prof);
  h += (0.07 * (fib - 0.5) + 0.05 * cork) * (1.0 - roll) * prof;   // torn, fibrous flanks
  h -= 0.11 * crack;
  h += 0.012 * L_grain(uv);
  s.h = clamp(h, 0.0, 1.0);

  // ---- colour ------------------------------------------------------------------
  float tone = L_tone(uv), tone2 = L_tone2(q);
  vec3 cFloor = vec3(0.058, 0.038, 0.026);                  // furrow floor: dark red-brown inner bark
  vec3 cFlank = vec3(0.092, 0.07, 0.053);                   // flanks: dull brown, close to the ridges
  vec3 cRidgeA = mix(vec3(0.118, 0.09, 0.066), vec3(0.15, 0.118, 0.088), tone2);   // brown-grey
  vec3 cRidgeB = mix(vec3(0.15, 0.138, 0.118), vec3(0.182, 0.167, 0.143), tone);   // weathered grey
  vec3 ridgeC = mix(cRidgeA, cRidgeB, 0.5 * s_ss(0.3, 0.75, tone + 0.2 * cork));
  ridgeC *= 0.82 + 0.34 * scl;                              // scaly flakes catch light
  ridgeC *= 0.91 + 0.18 * fib;                              // vertical fibre
  ridgeC *= 0.9 + 0.2 * (cork * 0.5 + 0.5);                 // corky patches
  ridgeC *= 0.93 + 0.14 * (bid - 0.5) * bOn + 0.07;         // block to block
  vec3 col = mix(cFloor, cFlank, s_ss(0.0, 0.45, t));
  col = mix(col, ridgeC * 0.9, s_ss(0.35, 1.0, t) * (0.55 + 0.45 * fib));   // flank streaks
  col = mix(col, ridgeC, s_ss(0.9, 1.4, t));
  col = mix(col, col * 0.55, crack * crack * 0.8);           // shadowed crack floors
  col *= 0.93 + 0.14 * s_h(floor(uv * 1024.0));
  col *= 1.0 + 0.28 * s_sat(s.curv * 1.2) * roll;           // bleached crests
  // broad sun-bleached grey zones on the ridges
  float lzN = L_lz(uv);
  float wz = s_ss(0.42, 0.72, lzN) * roll;
  col = mix(col, s_desat(col, 0.6) * 1.3, wz * 0.6);
  // crustose lichen: rare soft crusts on some ridge tops
  float lichen = s_ss(0.6, 0.72, lzN) * s_ss(0.5, 0.8, L_ln(uv)) * roll;
  vec3 lcol = s_desat(col, 0.7) * vec3(1.18, 1.24, 1.12) + vec3(0.012, 0.014, 0.01);
  col = mix(col, lcol, lichen * 0.45);
  // moss in some furrows
  float moss = s_ss(0.55, 0.7, L_mz(uv)) * (1.0 - s_ss(0.3, 1.0, t)) * s_ss(0.35, 0.6, L_mn(uv));
  col = mix(col, mix(vec3(0.035, 0.05, 0.016), vec3(0.065, 0.08, 0.025), L_mn(uv + 0.5)), moss * 0.85);
  s.albedo = col;

  s.rough = mix(0.96, 0.88, roll) + 0.03 * scl + 0.02 * lichen;
  s.ao = mix(0.5, 1.0, wall) * (1.0 - 0.35 * crack);
}`},_o={worldSize:1,depth:.05,aoStrength:1.1,layers:{w1:[`fbm`,[3,2],3],w2:[`fbm`,[2,3],3],pf:[`ridged`,[90,6],3],mesh1:[`fbm`,[20,20],2],mesh2:[`fbm`,[60,60],3],fibv:[`fbm`,[120,10],2],low:[`fbm`,[12,12],3],tone:[`vfbm`,[4,4],3],split:[`vfbm`,[40,8],3],dust:[`vfbm`,[6,6],3],dFib:[`ridged`,[40,6],2],dGr:[`fbm`,[30,30],2]},detail:{depth:.0012,glsl:`
float detail(vec2 uv) { return 0.5 + 0.4 * (L_dFib(uv + 0.01 * L_dGr(uv)) - 0.5) + 0.12 * L_dGr(uv); }`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  vec2 q = uv + vec2(0.012 * w.x, 0.008 * w.y);
  float NU = 7.0, NV = 10.0;                               // stubs around / rows along (staggered)
  float best = -1.0, bY = 0.0, bR = 0.0, bR2 = 0.0, bBul = 0.0, bCut = 0.0;
  for (int dy = -1 - uZero; dy <= 1; dy++)
  for (int dx = -1 - uZero; dx <= 1; dx++) {
    float row = floor(q.y * NV) + float(dy);
    float rid = mod(row, NV);
    float off = mod(rid, 2.0) * 0.5 + 0.1 * (s_h(vec2(rid, 3.0)) - 0.5);
    float colc = floor(q.x * NU + off) + float(dx);
    vec2 cid = vec2(mod(colc, NU), rid);
    vec3 rj = s_h3(cid + 1.7);
    vec2 d = vec2(q.x * NU + off - (colc + 0.5 + 0.14 * (rj.x - 0.5)), q.y * NV - (row + 0.45 + 0.12 * (rj.y - 0.5)));
    float sz = 0.85 + 0.3 * rj.z;
    float yN = d.y / sz + 0.55;                            // 0 base .. ~1.2 cut end (overlaps the row above)
    if (yN < 0.0 || yN > 1.22) continue;
    float halfW = mix(0.18, 0.62, s_ss(0.0, 0.95, yN)) * sz + 0.04 * (L_split(q) - 0.5);
    float xx = abs(d.x + 0.06 * (rj.x - 0.5) * yN);
    if (xx > halfW) continue;
    float bulge = s_dome(clamp(xx / max(halfW, 0.05), 0.0, 1.0));
    float cut = s_ss(1.02, 1.16, yN);
    float hk = (0.25 + 0.62 * s_ss(0.0, 1.05, yN)) * (0.72 + 0.28 * bulge) - 0.22 * cut * s_ss(0.2, 0.9, bulge) + 0.06 * (rj.z - 0.5);
    hk *= s_ss(0.0, 0.1, halfW - xx) * 0.3 + 0.7;
    if (hk > best) { best = hk; bY = yN; bR = rj.x; bR2 = rj.y; bBul = bulge; bCut = cut; }
  }
  float stubM = step(0.0, best);
  // packed fibre mesh behind the stubs (integer slopes keep it periodic)
  vec2 dm = q * vec2(NU, NV) * 6.0;
  float fa = abs(fract((dm.x + dm.y) * 0.5 + 0.3 * L_mesh1(q)) - 0.5);
  float fb = abs(fract((dm.x - dm.y) * 0.5 + 0.3 * L_mesh1(q + 0.5)) - 0.5);
  float mesh = max(1.0 - s_ss(0.0, 0.25, fa), 1.0 - s_ss(0.0, 0.25, fb)) * (0.6 + 0.4 * L_mesh2(q));
  float pf = L_pf(q);
  float h = mix(0.1 + 0.12 * mesh, max(best, 0.0) + 0.04 * pf, stubM) + 0.04 * L_low(q);
  s.h = clamp(h, 0.0, 1.0);

  vec3 grey = mix(vec3(0.19, 0.17, 0.14), vec3(0.25, 0.23, 0.2), L_tone(uv));
  vec3 brown = vec3(0.15, 0.105, 0.07);
  vec3 stub = mix(brown, grey, s_ss(0.2, 0.9, bY) * (0.55 + 0.45 * bR));
  stub *= 0.82 + 0.3 * pf + 0.08 * L_fibv(q);
  stub = mix(stub, vec3(0.09, 0.062, 0.045), bCut * s_ss(0.2, 0.8, bBul) * 0.7);
  stub *= 0.88 + 0.24 * bR2;
  vec3 fib = vec3(0.12, 0.078, 0.048) * (0.7 + 0.5 * mesh) * (0.85 + 0.3 * L_fibv(q + 0.3));
  vec3 c = mix(fib, stub, stubM);
  c *= 1.0 + 0.18 * s_sat(s.curv * 2.0);
  c = mix(c, vec3(0.33, 0.28, 0.21), s_ss(0.2, 0.7, s.n.y) * stubM * 0.2 * (0.5 + L_dust(uv)));
  s.albedo = c;
  s.rough = mix(0.93, 0.85, stubM) + 0.04 * pf;
  s.ao = mix(0.6, 1.0, stubM);
}`},vo=`
// latewood band profile for ring phase x (0..1): sharp dark band late in the ring
float latewood(float x, float sharp) {
  float a = s_ss(0.60, 0.60 + 0.28 * sharp, x);
  float b = 1.0 - s_ss(0.93, 1.0, x);
  return a * b;
}
`,yo={hero:!0,worldSize:1.2,depth:.009,ss:4,aoStrength:1,layers:{w1:[`fbm`,[1,3],3],w2:[`fbm`,[1,3],3],fig:[`fbm`,[2,3],3],wob:[`fbm`,[9,24],3],lwS:[`vn`,[3,40]],cw:[`fbm`,[6,1],2],fibre:[`fbm`,[6,360],3],fibre2:[`fbm`,[20,160],2],cup:[`fbm`,[2,6],3],weather:[`vfbm`,[2,5],4],streak:[`vn`,[5,70]],stain:[`vfbm`,[4,3],4],tone:[`vfbm`,[1,6],3],knot:[`vor`,[2,5],.8,[.6,.24]],nail:[`vor`,[3,6],.7,[.4,.2]],dFib:[`ridged`,[4,60],2],dSpl:[`fbm`,[12,40],2]},detail:{depth:8e-4,glsl:`
float detail(vec2 uv) {
  float fib = L_dFib(uv + vec2(0.0, 0.004 * L_dSpl(uv)));
  return 0.5 + 0.38 * (fib - 0.5) + 0.16 * L_dSpl(uv);
}`},glsl:vo+`
// straight drying check in rows across the grain: tapered split with random start/length
float checkRows(vec2 uv, float rows, float prob, float seed, float wav) {
  float ry = uv.y * rows;
  float ri = mod(floor(ry), rows);
  float fy = fract(ry);
  vec3 rr = s_h3(vec2(ri, seed));
  float len = 0.06 + 0.28 * s_h(vec2(ri, seed + 9.0));
  float tt = fract(uv.x - rr.x) / len;
  float inside = step(tt, 1.0) * step(rr.z, prob);
  float yc = 0.25 + 0.5 * rr.y + wav;
  float wdt = (0.04 + 0.06 * s_h(vec2(ri, seed + 4.0))) * sqrt(max(sin(PI * clamp(tt, 0.0, 1.0)), 0.0));
  return inside * (1.0 - s_ss(wdt * 0.45, wdt + 0.01, abs(fy - yc)));
}
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  // ---- knots: sparse, elongated along the grain
  vec4 kv = V_knot(uv);
  float kid = kv.z;
  float hasKnot = step(kid, 0.3);
  float krad = 0.013 + 0.02 * s_h(vec2(kid * 977.0, 9.1));
  vec2 kp = -kv.xy;                                        // knot centre -> sample (m)
  vec2 kd = kp / vec2(1.45, 1.0);
  float kdist = length(kd) / krad;                         // 1 at the knot rim
  float kdef = hasKnot * krad * 2.4 * exp(-s_sq(kp.x / (4.5 * krad)) - s_sq(kp.y / (2.6 * krad))) * clamp(kp.y / krad, -1.0, 1.0);
  // ---- growth rings (312 per tile keeps v periodic). Real rings are not a uniform
  // zebra: every year has its own width (the latewood band starts earlier or later in
  // the ring cell) and its own density (how dark and how raised the band weathers),
  // so both are hashed per ring. floor(R) is constant along a ring line; mod keeps the
  // hash periodic (R grows by 312 per tile in v) and lw is 0 at the cell borders.
  float R = (uv.y * 1.2 - kdef) * 260.0;
  R += 24.0 * L_fig(uv + 0.13) + 6.0 * w.x + 0.7 * L_wob(uv);   // (a stronger 5 cm wobble reads as fingerprints)
  float ring = fract(R);
  vec3 rh = s_h3(vec2(mod(floor(R), 312.0), 5.3));
  float rStr = 0.25 + 0.75 * rh.x * (0.6 + 0.4 * rh.y);      // band density this year
  float rS0 = 0.42 + 0.36 * rh.z;                            // band start in the cell
  float lwSharp = 0.45 + 0.45 * L_lwS(uv);
  float lw = s_ss(rS0, rS0 + (0.93 - rS0) * (0.3 + 0.5 * lwSharp), ring) * (1.0 - s_ss(0.93, 1.0, ring));
  float kcore = hasKnot * (1.0 - s_ss(0.82, 1.02, kdist));
  float krim = hasKnot * s_ss(0.72, 0.95, kdist) * (1.0 - s_ss(0.95, 1.2, kdist));
  float kring = hasKnot * (1.0 - s_ss(0.0, 1.0, kdist)) * (0.5 + 0.5 * sin(kdist * 12.0));
  float kang = atan(kd.y, kd.x);
  float kcheck = hasKnot * (1.0 - s_ss(0.0, 0.06, abs(sin(kang + kid * 6.0)))) * s_ss(0.2, 0.7, kdist) * (1.0 - s_ss(0.9, 1.6, kdist));
  // ---- drying checks: straight, tapered splits along the grain
  float check = max(checkRows(uv, 50.0, 0.3, 7.0, 0.05 * L_cw(uv)), checkRows(uv + vec2(0.37, 0.0), 23.0, 0.25, 13.0, 0.04 * L_cw(uv + 0.5)));
  float fibre = L_fibre(uv), fibre2 = L_fibre2(uv);
  // ---- nail pairs
  vec4 nv = V_nail(uv);
  float isNail = step(nv.z, 0.28);
  vec2 nr = nv.xy;
  float nailD = min(length(nr - vec2(0.0, 0.035)), length(nr + vec2(0.0, 0.035)));
  float nail = isNail * (1.0 - s_ss(0.0022, 0.0034, nailD));
  float dent = isNail * (1.0 - s_ss(0.003, 0.009, nailD));
  float nAcross = min(abs(nr.y - 0.035), abs(nr.y + 0.035));
  float rustBleed = isNail * exp(-s_sq(nr.x / 0.02) - s_sq(nAcross / 0.005));

  // raised latewood (earlywood eroded by weather) + fibrous texture
  float h = 0.5 + (0.1 + 0.14 * rStr) * lw + 0.08 * fibre + 0.04 * fibre2 + 0.12 * L_cup(uv);
  h += 0.16 * kcore - 0.12 * kcheck - 0.06 * kring * kcore + 0.04 * krim;
  h -= 0.55 * check + 0.2 * dent;
  s.h = clamp(h, 0.0, 1.0);

  // ---- colour: silver-grey patina over warm brown timber
  float weather = s_ss(0.15, 0.85, L_weather(uv));
  float tone = L_tone(uv);
  vec3 brown = mix(vec3(0.27, 0.17, 0.10), vec3(0.34, 0.23, 0.13), tone);
  vec3 silver = mix(vec3(0.28, 0.26, 0.23), vec3(0.36, 0.34, 0.31), tone);
  vec3 col = mix(brown, silver, 0.3 + 0.55 * weather);
  vec3 lateCol = mix(vec3(0.12, 0.078, 0.05), vec3(0.16, 0.145, 0.13), 0.3 + 0.55 * weather);
  col = mix(col, lateCol, lw * (0.28 + 0.52 * rStr));
  col *= 0.86 + 0.28 * L_streak(uv);
  col *= 0.9 + 0.2 * fibre + 0.08 * fibre2;
  col = mix(col, vec3(0.09, 0.056, 0.034), kcore * 0.9);
  col = mix(col, col * 0.55, krim * 0.7 + kring * 0.12);
  float stain = s_ss(0.6, 0.82, L_stain(uv));
  col = mix(col, col * vec3(0.7, 0.68, 0.66), stain * 0.55);
  col = mix(col, col * 0.3, check * 0.9 + kcheck * 0.6);     // shadowed split interior
  col = mix(col, vec3(0.26, 0.12, 0.05), clamp(rustBleed, 0.0, 1.0) * 0.5);
  col = mix(col, vec3(0.075, 0.06, 0.05), nail);
  col *= 1.0 + 0.14 * s_sat(s.curv * 3.0);
  s.albedo = col;

  s.rough = 0.78 + 0.12 * (1.0 - lw) - 0.1 * kcore + 0.08 * check - 0.25 * nail + 0.04 * stain;
  s.metal = nail * 0.3;
  s.ao = 1.0 - 0.45 * check - 0.25 * kcheck;
}`},bo={worldSize:1.6,depth:.022,ss:4,aoStrength:1,layers:{w1:[`fbm`,[2,3],3],w2:[`fbm`,[2,3],3],adze:[`vor`,[12,22],.85,[1.6/12,1.6/22]],fig:[`fbm`,[2,3],3],fibre:[`fbm`,[10,220],4],coarse:[`ridged`,[6,90],3],cn:[`gn`,[1,16]],cm:[`vn`,[3,16]],cup:[`fbm`,[2,5],3],weather:[`vfbm`,[2,5],4],streak:[`vn`,[6,70]],stain:[`vfbm`,[3,4],4],tone:[`vfbm`,[1,4],3],dFib:[`ridged`,[5,70],2],dSpl:[`fbm`,[12,36],2]},detail:{depth:.0011,glsl:`
float detail(vec2 uv) {
  float fib = L_dFib(uv + vec2(0.0, 0.005 * L_dSpl(uv)));
  return 0.5 + 0.36 * (fib - 0.5) + 0.18 * L_dSpl(uv);
}`},glsl:vo+`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  // adze scallops: overlapping shallow dishes elongated along the grain
  vec4 av = V_adze(uv + 0.004 * w);
  float sc = length(av.xy) / 0.075;
  float scallop = 1.0 - s_sq(1.0 - s_sat(sc));
  float ridgeLine = 1.0 - s_ss(0.0, 0.006, av.w);
  // grain (304 per tile keeps v periodic)
  float R = uv.y * 1.6 * 190.0 + 16.0 * L_fig(uv + 0.2) + 4.0 * w.x;
  float lw = latewood(fract(R), 0.6);
  float fibre = L_fibre(uv);
  float coarse = L_coarse(uv + 0.01 * w);
  // deep drying checks
  float cmask = s_ss(0.5, 0.78, L_cm(uv));
  float check = (1.0 - s_ss(0.0, 0.028 * cmask + 0.001, abs(L_cn(uv + vec2(0.0, 0.002 * w.y))))) * cmask;

  float h = 0.44 + 0.36 * scallop + 0.02 * ridgeLine + 0.07 * lw + 0.07 * fibre + 0.05 * coarse + 0.08 * L_cup(uv);
  h -= 0.6 * check;
  s.h = clamp(h, 0.0, 1.0);

  float weather = s_ss(0.3, 0.8, L_weather(uv));
  float tone = L_tone(uv);
  vec3 brown = mix(vec3(0.15, 0.092, 0.055), vec3(0.19, 0.12, 0.07), tone);
  vec3 grey = vec3(0.20, 0.18, 0.155);
  vec3 col = mix(brown, grey, weather * 0.5);
  col = mix(col, col * vec3(0.62, 0.58, 0.55), lw * 0.6);
  col *= 0.88 + 0.24 * L_streak(uv);
  col *= 0.92 + 0.14 * fibre;
  col *= 1.0 + 0.18 * s_sat(s.curv * 2.5);                 // tool ridges catch wear
  col = mix(col, col * 0.8, s_sat(-s.curv * 2.0) * 0.5);   // dish bottoms keep grime
  col = mix(col, col * 0.7, s_ss(0.6, 0.85, L_stain(uv)) * 0.5);
  col = mix(col, col * 0.3, check * 0.9);
  s.albedo = col;
  s.rough = 0.84 + 0.06 * (1.0 - lw) + 0.08 * check - 0.05 * ridgeLine;
  s.ao = 1.0 - 0.5 * check;
}`},xo={worldSize:.8,depth:.003,ss:4,aoStrength:.8,layers:{w1:[`fbm`,[1,2],3],fig:[`fbm`,[1,3],3],pore:[`vn`,[160,768]],ray:[`vn`,[90,12]],band:[`vn`,[2,9]],fibre:[`fbm`,[8,256],3],low:[`fbm`,[2,4],3],wear:[`vfbm`,[3,3],3],tone:[`vfbm`,[3,6],3],streak:[`vn`,[6,120]],dPore:[`vn`,[30,240]],dFib:[`fbm`,[5,120],2]},detail:{depth:15e-5,glsl:`
float detail(vec2 uv) { return 0.55 - 0.4 * s_ss(0.72, 0.92, L_dPore(uv)) + 0.08 * L_dFib(uv); }`},glsl:vo+`
void surface(inout S s) {
  vec2 uv = s.uv;
  float w = L_w1(uv);
  // straight quarter-sawn grain with slow waves (256 per tile keeps v periodic)
  float R = uv.y * 0.8 * 320.0 + 9.0 * L_fig(uv) + 2.5 * w;
  float ring = fract(R);
  float lw = latewood(ring, 0.8);
  // open pores: tiny dark dashes along the grain, in the earlywood
  float pore = s_ss(0.72, 0.9, L_pore(vec2(uv.x, R / 256.0)));
  pore *= s_ss(0.2, 0.6, ring) * (1.0 - s_ss(0.6, 0.8, ring));
  float ray = s_ss(0.78, 0.95, L_ray(uv + 0.01 * w));
  float fibre = L_fibre(uv);

  float h = 0.5 + 0.12 * lw + 0.1 * fibre - 0.35 * pore + 0.05 * ray + 0.06 * L_low(uv);
  s.h = clamp(h, 0.0, 1.0);

  vec3 base = mix(vec3(0.07, 0.04, 0.023), vec3(0.105, 0.062, 0.035), 0.7 * L_band(uv) + 0.3 * L_tone(uv));
  vec3 col = mix(base, base * 0.55, lw * 0.8);
  col *= 0.9 + 0.2 * L_streak(uv);
  col = mix(col, col * 1.35, ray * 0.4);
  col = mix(col, vec3(0.02, 0.012, 0.008), pore * 0.8);
  float wear = s_ss(0.6, 0.85, L_wear(uv));
  col = mix(col, col * 1.25, wear * 0.35);
  s.albedo = col;
  s.rough = 0.46 + 0.1 * (1.0 - lw) + 0.2 * pore - 0.08 * wear + 0.05 * fibre;
  s.ao = 1.0 - 0.3 * pore;
}`},So={hero:!0,worldSize:1,depth:.07,ss:4,aoStrength:1.2,layers:{sway:[`fbm`,[3,2],3],edge:[`fbm`,[24,1],2],fray:[`vn`,[400,30]],fine:[`fbm`,[300,6],2],tone:[`vfbm`,[2,3],4],grey:[`vfbm`,[3,2],3],bund:[`vn`,[30,6]],wave:[`fbm`,[4,3],3],dRib:[`ridged`,[60,4],2],dStr:[`fbm`,[16,6],2]},detail:{depth:6e-4,glsl:`
float detail(vec2 uv) { return 0.5 + 0.38 * (L_dRib(uv + vec2(0.004 * L_dStr(uv), 0.0)) - 0.5) + 0.14 * L_dStr(uv); }`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  // v runs DOWN the roof (kit roofs: v = metres from the ridge toward the eave), so
  // each course's butt edge is at its high-v end: t = 0 at the butt edge, t = 1 at
  // the upper part tucked under the next course up.
  float Nc = 4.0;                                          // courses per tile (25 cm)
  float NBu = 16.0;                                        // bundles per metre around
  float sway = 0.012 * L_sway(uv);
  // hand-laid courses meander and vary in visibility (they merge in places)
  float cc0 = uv.y * Nc + 0.1 * L_edge(uv) + 0.32 * L_wave(uv);
  float cvis = mix(0.45, 1.0, s_ss(0.3, 0.7, L_tone(uv + vec2(0.31, 0.57))));
  float ci0 = floor(cc0);
  // bundle the sample belongs to (staggered by half a bundle on alternate courses)
  float bw = 0.45 * L_edge(uv + vec2(0.37, 0.0)) + 0.08 * L_wave(uv + 0.5);   // uneven bundle widths
  float bx0 = uv.x * NBu + 0.5 * mod(ci0, 2.0) + bw;
  float tuft = s_h(vec2(mod(floor(bx0), NBu), mod(ci0, Nc) + 3.0));
  float cc = cc0 + 0.2 * tuft;                             // ragged cut line, bundle by bundle
  float ci = mod(floor(cc), Nc);
  float t = 1.0 - fract(cc);
  float bx = uv.x * NBu + 0.5 * mod(floor(cc), 2.0) + bw;
  float bid = mod(floor(bx), NBu);
  // bundle cross-section; creases are clearest near the butt ends and merge upslope
  float bProf = s_dome(clamp(abs(fract(bx) - 0.5) * 2.0 / 0.97, 0.0, 1.0));
  bProf = mix(bProf, 1.0, 0.6 * s_ss(0.15, 0.7, t));
  float bRand = s_h(vec2(bid, ci + 11.0));

  float best = -1.0, bestR = 0.0, bestR2 = 0.0, bestProf = 0.0, bestK = 0.0;
  for (int k = uZero; k < 3; k++) {
    float fk = float(k);
    float NS = fk < 0.5 ? 150.0 : (fk < 1.5 ? 113.0 : 89.0);   // integer strand counts keep u periodic
    float x = (uv.x + sway * (1.0 + 0.4 * fk)) * NS + fk * 0.37;
    float cid = mod(floor(x), NS);
    float fx = fract(x);
    float r = s_h(vec2(cid, fk * 13.1 + 1.0 + ci * 5.0));
    float r2 = s_h(vec2(cid, fk * 7.7 + 3.0 + ci * 3.0));
    float width = 0.6 + 0.38 * s_h(vec2(cid + 0.5, ci + fk * 31.0));
    float prof = s_dome(clamp(abs(fx - 0.5) / (0.5 * width), 0.0, 1.0));
    // strands end at slightly different lengths; frayed tips split into finer fibres
    float te = t - 0.1 * r * (0.5 + 0.5 * r2);                 // ragged butts (1-2.5 cm)
    prof *= step(0.0, te);
    prof *= mix(0.4 + 0.6 * L_fray(uv + fk * 0.21), 1.0, s_ss(0.0, 0.08, te));
    float courseH = 1.0 - 0.7 * cvis * t;
    float hk = courseH * (0.6 + 0.2 * bProf + 0.2 * prof) * step(0.02, prof) - fk * 0.08;
    hk *= mix(0.62, 1.0, s_ss(0.0, 0.07, te));             // tips droop onto the course below (no sheer step)
    if (hk > best) { best = hk; bestR = r; bestR2 = r2; bestProf = prof; bestK = fk; }
  }
  float gap = step(best, 0.0);
  // under the ragged butt ends lies the top of the course below (in this course's
  // shadow), not a black void: a hole to height 0 there drew an ink outline along
  // every course in both the albedo and the normal map
  float lowH = (1.0 - 0.7 * cvis) * 0.72 * (1.0 - s_ss(0.03, 0.14, t));
  float h = mix(max(best, 0.0), lowH, gap) + 0.025 * L_fine(uv);
  s.h = clamp(h * 0.95 + 0.02, 0.0, 1.0);

  // colour: golden straw, per-strand / bundle / course variation, a few old dark and
  // weathered grey strands, deeper strand layers and bundle gaps in shadow
  // (mean albedo kept near the old set's ~0.4 / 0.28 / 0.13 despite the extra shading)
  vec3 col = mix(vec3(0.49, 0.325, 0.123), vec3(0.635, 0.47, 0.225), bestR);
  col *= 0.84 + 0.3 * bRand;                               // bundle to bundle
  col *= 0.93 + 0.14 * s_h(vec2(ci, 7.3));                 // course to course
  col = mix(col, vec3(0.24, 0.15, 0.07), step(0.93, bestR2) * 0.75);        // old dark strands
  col = mix(col, vec3(0.37, 0.32, 0.25), step(bestR2, 0.05) * 0.6);         // weathered grey strands
  col = mix(col, s_desat(col, 0.45) * 0.95, s_ss(0.6, 0.85, L_grey(uv)) * 0.4);  // weathered zones
  col *= 0.86 + 0.28 * L_tone(uv);
  col *= 0.92 + 0.16 * L_bund(uv);
  col *= 0.93 + 0.14 * L_fine(uv + 0.3);
  col *= 1.0 - 0.14 * bestK;                               // lower strand layers are shaded
  col *= mix(0.64, 1.0, s_ss(0.0, 0.35, bProf));           // dark creases between bundles
  col = mix(col, col * vec3(0.8, 0.76, 0.72), (1.0 - s_ss(0.0, 0.07, t)) * 0.55);   // weathered cut ends
  col *= mix(1.0, 1.0 - 0.45 * cvis, s_ss(0.5, 1.0, t));   // shadow under the course above
  col = mix(col, col * 0.42, gap);                         // shaded straw below / between strands
  s.albedo = col;
  s.rough = mix(0.9, 0.62, bestProf) + 0.06 * gap;
  s.ao = (1.0 - 0.55 * gap) * mix(0.8, 1.0, s_ss(0.0, 0.3, bProf));
}`},Co={worldSize:.1,depth:.007,ss:4,aoStrength:1.1,layers:{fib:[`fbm`,[70,5],3],fib2:[`fbm`,[160,12],2],fuzz:[`vn`,[220,44]],tone:[`vfbm`,[2,3],3],ytone:[`vn`,[3,20]],yw:[`fbm`,[4,12],2],dFz:[`fbm`,[48,48],2]},detail:{depth:8e-5,glsl:`
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFz(uv); }`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 d = vec2(uv.x + uv.y, uv.x - uv.y);                 // diagonal coords (periodic)
  float s3 = d.x * 3.0;                                    // 3 strands per tile
  float x = fract(s3);
  float sid = mod(floor(s3), 3.0);
  float prof = s_dome(clamp(abs(x - 0.5) * 2.0 / 0.98, 0.0, 1.0));
  prof = sqrt(prof);                                       // round, full strands with tight grooves
  // counter-twisted yarns crossing each strand, slightly irregular
  float y = fract(d.y * 7.0 + x * 1.3 + sid * 0.31 + 0.15 * L_yw(d));
  float yprof = s_dome(clamp(abs(y - 0.5) * 2.0 / 0.97, 0.0, 1.0));
  float fib = L_fib(d), fib2 = L_fib2(d + 0.3);
  float fuzz = s_ss(0.82, 0.95, L_fuzz(d + 0.2));
  float h = prof * (0.82 + 0.18 * yprof) + 0.07 * fib * prof + 0.03 * fib2 + 0.03 * fuzz;
  s.h = clamp(h, 0.0, 1.0);

  vec3 hemp = mix(vec3(0.32, 0.24, 0.135), vec3(0.40, 0.31, 0.18), L_tone(uv));
  vec3 col = hemp * (0.92 + 0.12 * L_ytone(d) + 0.05 * sid);
  col *= 0.8 + 0.3 * fib + 0.1 * fib2;                       // fibre-to-fibre variation
  col = mix(col * 0.35, col, s_ss(0.0, 0.6, prof));          // shadowed grooves
  col = mix(col, col * 0.85, (1.0 - yprof) * 0.35);
  col = mix(col, vec3(0.5, 0.43, 0.32), fuzz * 0.35);        // pale stray fibres
  col *= 1.0 + 0.12 * s_sat(s.curv * 2.0);                   // hand-polished crowns
  s.albedo = col;
  s.rough = mix(0.92, 0.68, prof * yprof) + 0.03 * fuzz;
  s.ao = mix(0.45, 1.0, s_ss(0.0, 0.55, prof));
}`},wo={worldSize:.3,depth:.0012,ss:4,aoStrength:.8,layers:{slubW:[`vn`,[160,10]],slubF:[`vn`,[10,160]],tw:[`vn`,[160,3]],tf:[`vn`,[3,160]],dirt:[`vfbm`,[2,2],4],crease:[`fbm`,[3,5],3],dFz:[`fbm`,[64,64],2]},detail:{depth:6e-5,glsl:`
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFz(uv); }`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  float NT = 160.0;                                        // threads per tile (~1.9 mm)
  vec2 g = uv * NT;
  vec2 c = floor(g), f = fract(g);
  float i = mod(c.x, NT), j = mod(c.y, NT);
  float sw = L_slubW(uv), sf = L_slubF(uv);
  float thW = 0.74 + 0.22 * s_ss(0.55, 0.9, sw) + 0.06 * L_tw(uv);   // warp thread width (slubs)
  float thF = 0.74 + 0.22 * s_ss(0.55, 0.9, sf) + 0.06 * L_tf(uv);
  // over / under: warp over where (i + j) is even
  float wH = 0.5 + 0.5 * cos(PI * (g.y - 0.5 - i));
  float fH = 0.5 - 0.5 * cos(PI * (g.x - 0.5 - j));
  float pW = s_dome(clamp(abs(f.x - 0.5) / (0.5 * thW), 0.0, 1.0));
  float pF = s_dome(clamp(abs(f.y - 0.5) / (0.5 * thF), 0.0, 1.0));
  float hW = (0.3 + 0.7 * wH) * (0.35 + 0.65 * pW) * step(0.01, pW);
  float hF = (0.3 + 0.7 * fH) * (0.35 + 0.65 * pF) * step(0.01, pF);
  float h = max(hW, hF);
  float isWarp = step(hF, hW);
  s.h = clamp(h, 0.0, 1.0);

  vec3 base = vec3(0.74, 0.68, 0.575);
  float thr = isWarp > 0.5 ? s_h(vec2(i, 1.0)) : s_h(vec2(j, 2.0));
  vec3 col = base * (0.94 + 0.1 * thr);
  float slub = isWarp > 0.5 ? s_ss(0.7, 0.95, sw) : s_ss(0.7, 0.95, sf);
  col = mix(col, vec3(0.6, 0.52, 0.4), slub * 0.45);        // natural flax flecks
  col = mix(col * 0.55, col, s_ss(0.0, 0.35, h));           // gaps between threads
  col *= 1.0 - 0.07 * s_ss(0.5, 0.9, L_dirt(uv));           // faint dust / water marks
  col *= 1.0 + 0.04 * L_crease(uv);
  s.albedo = col;
  s.rough = 0.88 + 0.06 * (1.0 - h);
  s.ao = mix(0.7, 1.0, s_ss(0.0, 0.4, h));
}`},To={worldSize:.4,depth:.008,ss:4,aoStrength:1.1,layers:{streak:[`fbm`,[8,160],3],node:[`vn`,[40,12]],tone:[`vfbm`,[2,2],3],dust:[`vfbm`,[3,3],3],dFib:[`fbm`,[16,96],2]},detail:{depth:1e-4,glsl:`
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFib(uv); }`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  float NSk = 16.0, NW = 40.0;                             // stakes 2.5 cm, weavers 1 cm
  vec2 g = vec2(uv.x * NSk, uv.y * NW);
  float si = mod(floor(g.x), NSk), fx = fract(g.x);
  float wi = mod(floor(g.y), NW), fy = fract(g.y);
  // weaver passes over stake si when (si + wi) is even
  float wH = 0.5 + 0.45 * cos(PI * (g.x - 0.5) + PI * wi);
  float yy = abs(fy - 0.5) / 0.46;
  float wProf = s_dome(clamp(yy * yy * yy * 0.7 + yy * 0.3, 0.0, 1.0));   // flat strip, rounded edges
  float hWeaver = wH * (0.35 + 0.65 * wProf) * step(0.01, wProf);
  float sProf = s_dome(clamp(abs(fx - 0.5) / 0.17, 0.0, 1.0));
  float hStake = (0.5 + 0.1 * sProf) * step(0.01, sProf);
  float h = max(hWeaver, hStake);
  float onStake = step(hWeaver, hStake);
  s.h = clamp(h, 0.0, 1.0);

  float rw = s_h(vec2(wi, 4.0)), rs = s_h(vec2(si, 9.0));
  vec3 rattan = vec3(0.43, 0.285, 0.13);
  vec3 cw = rattan * (0.8 + 0.4 * rw);
  cw = mix(cw, vec3(0.38, 0.32, 0.2), step(0.88, rw) * 0.6);   // occasional greyish cane
  vec3 cs = vec3(0.3, 0.195, 0.09) * (0.85 + 0.3 * rs);
  vec3 col = mix(cw, cs, onStake);
  col *= 0.88 + 0.24 * L_streak(uv);
  col *= 1.0 - 0.15 * s_ss(0.7, 0.95, L_node(uv));
  col *= 0.9 + 0.2 * L_tone(uv);
  col = mix(col * 0.2, col, s_ss(0.0, 0.25, h));            // dark gaps
  col = mix(col, vec3(0.4, 0.34, 0.26), s_ss(0.6, 0.85, L_dust(uv)) * 0.2);
  s.albedo = col;
  s.rough = mix(0.85, 0.5, s_ss(0.2, 0.7, h));
  s.ao = mix(0.5, 1.0, s_ss(0.0, 0.35, h));
}`},Eo={worldSize:.8,depth:.0015,ss:4,aoStrength:.8,layers:{fade:[`vfbm`,[2,2],4],fuzz:[`fbm`,[200,200],2],dirt:[`vfbm`,[3,3],3],wob:[`fbm`,[4,4],2],dFz:[`fbm`,[80,80],2]},detail:{depth:1e-4,glsl:`
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFz(uv); }`},glsl:`
vec3 kilim(float k) {
  if (k < 0.5) return vec3(0.64, 0.56, 0.42);   // cream
  if (k < 1.5) return vec3(0.40, 0.12, 0.055);  // terracotta
  if (k < 2.5) return vec3(0.045, 0.065, 0.16); // indigo
  if (k < 3.5) return vec3(0.54, 0.32, 0.085);  // ochre
  return vec3(0.11, 0.065, 0.04);               // brown
}
void surface(inout S s) {
  vec2 uv = s.uv;
  // pattern on a 5 mm "knot" grid (160 per tile) for the stepped look
  vec2 pp = (floor(uv * 160.0) + 0.5) / 160.0;
  float by = fract(pp.y * 4.0);                            // 4 bands per tile (20 cm)
  float bx = fract(pp.x * 8.0);                            // 8 motifs per tile (10 cm)
  float k = 1.0;
  if (by < 0.05 || by > 0.95) k = 4.0;
  else if (by < 0.15) k = (abs(fract(pp.x * 32.0) - 0.5) < 0.12 && abs(by - 0.1) < 0.02) ? 3.0 : 0.0;
  else if (by < 0.2 || by > 0.8) k = 1.0;
  else if (by > 0.85) k = 0.0;
  else {
    vec2 m = vec2(abs(bx - 0.5) * 2.0, abs(by - 0.5) / 0.3); // motif space 0..1
    float dd = m.x + m.y;
    k = 1.0;
    if (dd < 0.95) k = 2.0;
    if (dd < 0.75) k = 0.0;
    if (dd < 0.55) k = 3.0;
    if (dd < 0.32) k = 2.0;
    if (dd < 0.12) k = 0.0;
    // hooked "ram's horn" side ornaments
    if (m.x > 0.8 && abs(m.y - 0.5) < 0.12) k = 0.0;
  }
  vec3 col = kilim(k);
  // twill ribs (diagonal, integer slope keeps it periodic)
  float rib = fract((uv.x + uv.y) * 200.0);
  float ribP = s_dome(clamp(abs(rib - 0.5) * 2.2, 0.0, 1.0));
  float yarn = fract(uv.y * 400.0);
  float h = 0.45 + 0.35 * ribP + 0.1 * s_dome(clamp(abs(yarn - 0.5) * 2.0, 0.0, 1.0)) + 0.1 * L_fuzz(uv);
  s.h = clamp(h, 0.0, 1.0);
  col *= 0.85 + 0.25 * ribP;
  col *= 0.92 + 0.12 * L_fuzz(uv + 0.4);
  // sun fading and wear
  float fade = s_ss(0.5, 0.85, L_fade(uv));
  col = mix(col, mix(col, vec3(s_lum(col)), 0.4) * 1.25 + 0.03, fade * 0.45);
  col *= 1.0 - 0.1 * s_ss(0.6, 0.9, L_dirt(uv));
  s.albedo = col;
  s.rough = 0.9 + 0.05 * (1.0 - ribP);
  s.ao = mix(0.8, 1.0, ribP);
}`},Do=`
// asymmetric ripple profile for phase t (0..1): long stoss slope, short steep lee
float ripple(float t) {
  float up = s_ss(0.0, 0.72, t);
  float dn = 1.0 - s_ss(0.72, 1.0, t);
  return min(up, dn);
}
// Per-texel grain multiplier (period 1, 2048 cells = one per texel up to 2048 px):
// luminance jitter +-k/2 and a partial hue shift toward feldspar / lithic / iron-
// stained / quartz grains; 1.5 % coarse grains a little darker or brighter.
vec3 sandGrains(vec2 uv, float k) {
  vec2 gc = floor(uv * 2048.0);
  vec3 g = s_h3(gc + 0.37);
  vec3 t = g.y < 0.3 ? vec3(1.05, 0.98, 0.93)
         : (g.y < 0.55 ? vec3(0.935, 0.935, 0.95)
         : (g.y < 0.78 ? vec3(1.04, 0.965, 0.885) : vec3(1.03, 1.03, 1.02)));
  vec3 c = mix(vec3(1.0), t, g.z) * (1.0 + k * (g.x - 0.5));
  float r2 = s_h(gc + 91.3);
  c *= r2 > 0.988 ? 0.84 : (r2 < 0.012 ? 1.1 : 1.0);
  return c / vec3(1.0066, 0.9873, 0.9713);                 // unit mean: the set's mean colour is unchanged
}
// Irregular flat fragment (shell grit / pebble chip) around a voronoi feature
// point: rotated, elongated, lumpy outline, soft rim. rel = sample -> point (cell
// units), id = cell hash, r = mean radius (cell units). Returns coverage 0..1.
float shard(vec2 rel, float id, float r) {
  vec2 p = s_rot(rel, id * 37.0);
  p.x *= 0.5 + 0.35 * fract(id * 13.7);
  float ang = atan(p.y, p.x + 1e-5);
  float rr = r * (1.0 + 0.22 * sin(3.0 * ang + id * 71.0) + 0.12 * sin(5.0 * ang + id * 23.0));
  return 1.0 - s_ss(rr * 0.72, rr, length(p));
}
`,Oo={hero:!0,worldSize:4,depth:.02,aoStrength:.9,layers:{w1:[`fbm`,[3,3],4],w2:[`fbm`,[3,3],4],pw:[`fbm`,[2,5],3],pw2:[`fbm`,[3,4],3],amp:[`vfbm`,[2,2],3],mixR:[`vfbm`,[3,3],3],lump:[`fbm`,[6,6],4],lump2:[`fbm`,[20,20],3],grainN:[`fbm`,[256,256],2],tone:[`vfbm`,[3,3],4],tone2:[`vfbm`,[14,14],3],pz:[`vfbm`,[4,4],3],peb:[`vor`,[48,48],.9],dG1:[`fbm`,[150,150],2],dG2:[`vn`,[300,300]]},detail:{depth:8e-4,glsl:`
float detail(vec2 uv) { return 0.5 + 0.25 * L_dG1(uv) + 0.25 * (L_dG2(uv) - 0.5); }`},glsl:Do+`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  // two ripple trains with slightly different wavelengths blended by a mask -> Y-junction defects
  float ph1 = uv.x * 40.0 + 1.6 * L_pw(uv) + 1.4 * w.x + 0.4 * w.y;
  float ph2 = uv.x * 44.0 + 1.7 * L_pw2(uv) + 1.3 * w.x - 0.3 * w.y + 0.5;
  float m = s_ss(0.4, 0.6, L_mixR(uv));
  float r = mix(ripple(fract(ph1)), ripple(fract(ph2)), m);
  float amp = s_ss(0.35, 0.78, L_amp(uv));
  float lump = L_lump(uv), lump2 = L_lump2(uv);
  float grain = L_grainN(uv);
  // rare flat chips: shell grit and pebble fragments, half buried in the sand
  vec4 pv = V_peb(uv);
  float isChip = step(pv.z, 0.022) * s_ss(0.45, 0.75, L_pz(uv));
  float chip = shard(pv.xy, pv.z, 0.11 + 0.1 * fract(pv.z * 53.0)) * isChip;

  float h = 0.45 + 0.28 * r * amp + 0.12 * lump + 0.05 * lump2 + 0.03 * grain + 0.035 * chip;
  s.h = clamp(h, 0.0, 1.0);

  vec3 base = vec3(0.575, 0.475, 0.35);
  vec3 col = base * (0.94 + 0.12 * L_tone(uv));
  col *= 0.96 + 0.08 * L_tone2(uv);
  // heavy dark minerals settle in ripple troughs; crests coarser and paler
  col = mix(col, col * vec3(0.84, 0.82, 0.8), (1.0 - r) * amp * 0.4);
  col *= 1.0 + 0.05 * r * amp;
  col *= 1.0 + 0.06 * grain;                              // grain-size sorting
  col *= sandGrains(uv, 0.14);
  // chip colours stay close to the sand: bleached shell, grey chip, rust stain
  float pk = fract(pv.z * 97.0);
  vec3 pc = pk < 0.55 ? col * vec3(1.14, 1.12, 1.09) : (pk < 0.8 ? s_desat(col, 0.5) * 0.84 : col * vec3(0.95, 0.85, 0.75));
  col = mix(col, pc, chip * 0.7);
  col *= 1.0 + 0.1 * s_sat(s.curv * 2.0);
  s.albedo = col;
  s.rough = 0.92 - 0.04 * chip - 0.02 * r;
  s.ao = 1.0;
}`},ko={worldSize:4,depth:.008,aoStrength:.8,layers:{w1:[`fbm`,[3,3],4],w2:[`fbm`,[3,3],4],pw:[`fbm`,[2,5],3],amp:[`vfbm`,[2,2],3],lump:[`fbm`,[6,6],4],sw:[`fbm`,[2,6],3],swm:[`vfbm`,[3,2],3],pud:[`vfbm`,[3,3],4],tone:[`vfbm`,[3,3],4],tone2:[`vfbm`,[14,14],3],grainN:[`fbm`,[256,256],2],hole:[`vor`,[90,90],.9],peb:[`vor`,[40,40],.9],hz:[`vfbm`,[4,4],3],dG1:[`fbm`,[150,150],2],dG2:[`vn`,[300,300]]},detail:{depth:4e-4,glsl:`
float detail(vec2 uv) { return 0.5 + 0.2 * L_dG1(uv) + 0.2 * (L_dG2(uv) - 0.5); }`},glsl:Do+`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  float r = ripple(fract(uv.x * 40.0 + 1.6 * L_pw(uv) + 1.4 * w.x));
  float amp = s_ss(0.3, 0.8, L_amp(uv)) * 0.3;              // ripples washed low
  float pud = s_ss(0.62, 0.76, L_pud(uv));                   // thin standing-water patches
  // swash lines: thin crests of deposited grains marking old water edges
  // (sparse and soft: the terrain orients this set by the dune wind, not the shore)
  float swl = 1.0 - s_ss(0.0, 0.05, abs(fract(uv.x * 7.0 + 0.8 * L_sw(uv) + 0.6 * w.y) - 0.5) - 0.43);
  swl *= s_ss(0.62, 0.82, L_swm(uv));
  // pinholes left by air escaping as the swash drains: 2-5 mm, clustered, shallow
  vec4 hv = V_hole(uv);
  float hr = 0.06 + 0.05 * fract(hv.z * 37.0);
  float hole = (1.0 - s_ss(hr * 0.4, hr, length(hv.xy))) * step(hv.z, 0.3) * s_ss(0.55, 0.8, L_hz(uv));
  // rare flat shell grit, half buried
  vec4 pv = V_peb(uv);
  float chip = shard(pv.xy, pv.z, 0.1 + 0.1 * fract(pv.z * 53.0)) * step(pv.z, 0.022);

  float h = 0.5 + 0.25 * r * amp + 0.1 * L_lump(uv) * (1.0 - 0.6 * pud) + 0.035 * swl + 0.01 * L_grainN(uv);
  h -= 0.1 * hole;
  h += 0.03 * chip;
  h = mix(h, 0.46, pud * 0.7);                               // water film levels the surface
  s.h = clamp(h, 0.0, 1.0);

  vec3 base = vec3(0.33, 0.26, 0.178);
  vec3 col = base * (0.92 + 0.14 * L_tone(uv));
  col *= 0.95 + 0.1 * L_tone2(uv);
  col = mix(col, col * 0.9, pud);
  col = mix(col, col * 1.08 + 0.005, swl * 0.5);
  col *= 1.0 + 0.08 * L_grainN(uv);
  col *= sandGrains(uv, 0.16);
  col *= 1.0 - 0.28 * hole;
  float pk = fract(pv.z * 53.0 + 0.3);
  col = mix(col, pk < 0.7 ? col * vec3(1.16, 1.14, 1.1) : s_desat(col, 0.4) * 0.8, chip * 0.6);
  s.albedo = col;
  s.rough = mix(0.36 + 0.1 * L_tone2(uv + 0.5) + 0.1 * swl, 0.07, pud);
  s.ao = 1.0 - 0.2 * hole;
}`},Ao=`
// twig at grid cell c (period per): returns coverage, fills height / tone
float twigs(vec2 uv, vec2 per, float density, out float th, out float tr) {
  vec2 p = uv * per;
  vec2 ip = floor(p), fp = fract(p);
  float cov = 0.0; th = 0.0; tr = 0.0;
  for (int y = -1 - uZero; y <= 1; y++)
  for (int x = -1 - uZero; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 cid = mod(ip + g, per);
    vec3 r = s_h3(cid + 3.7);
    if (r.z > density) continue;
    vec2 c = g + r.xy - fp;                                 // twig centre (cells)
    float ang = s_h(cid + 1.9) * PI;
    vec2 dir = vec2(cos(ang), sin(ang));
    float len = 0.25 + 0.45 * s_h(cid + 5.3);
    float d = s_seg(vec2(0.0), c - dir * len, c + dir * len);
    float wdt = 0.025 + 0.025 * s_h(cid + 8.1);
    float k = 1.0 - s_ss(wdt * 0.6, wdt, d);
    if (k > cov) { cov = k; th = s_dome(clamp(d / wdt, 0.0, 1.0)); tr = s_h(cid + 2.2); }
  }
  return cov;
}
`,jo={bark:go,barkPalm:_o,woodPlank:yo,woodBeam:bo,woodDark:xo,thatch:So,rope:Co,linen:wo,wicker:To,sand:Oo,sandWet:ko,rock:{hero:!0,worldSize:3,depth:.1,aoStrength:1.15,layers:{w1:[`fbm`,[3,3],4],w2:[`fbm`,[3,3],4],jag:[`fbm`,[60,60],2],lump:[`fbm`,[3,3],5],mid:[`fbm`,[9,9],4],fine:[`fbm`,[30,30],4],grain:[`fbm`,[160,160],2],knobs:[`ridged`,[12,12],3],frac:[`vor`,[4,4],.9],frac2:[`vor`,[11,11],.9],fracO:[`vfbm`,[6,6],3],pocket:[`vfbm`,[5,5],4],honey:[`vor`,[26,26],.9],band:[`fbm`,[1,2],3],bandD:[`fbm`,[6,6],3],bz:[`vfbm`,[2,2],3],tone:[`vfbm`,[3,3],4],rust:[`vfbm`,[4,4],4],tone2:[`vfbm`,[18,18],3],mott:[`vfbm`,[48,48],3],streak:[`fbm`,[14,1],4],streak2:[`fbm`,[31,2],3],vz:[`vfbm`,[3,2],3],lz:[`vfbm`,[5,5],3],ld:[`fbm`,[128,128],2],lich:[`vor`,[30,30],.95],dG:[`fbm`,[120,120],2],dP:[`vfbm`,[40,40],3]},detail:{depth:.0015,glsl:`
float detail(vec2 uv) { return 0.5 + 0.22 * L_dG(uv) + 0.3 * (L_dP(uv) - 0.5) - 0.18 * s_ss(0.7, 0.85, L_dP(uv + 0.37)); }`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  vec2 q = uv + 0.045 * w;
  float jg = L_jag(uv);

  // ---- relief -------------------------------------------------------------
  float lump = L_lump(q), mid = L_mid(q + 0.3), fine = L_fine(q), grain = L_grain(uv), knobs = L_knobs(q);
  // fractures: straight joints meeting at angles (voronoi borders), open only in places.
  // Weathered, soft-edged grooves rather than thin ink lines: when the tile is seen
  // small (boulders, triplanar terrain) a sharp dark line reads as a scribble.
  vec4 fv = V_frac(uv + 0.0025 * vec2(jg, L_jag(uv + 0.5)));
  float fo = s_ss(0.66, 0.8, L_fracO(uv));
  float fw = 0.012 + 0.016 * fo;
  float fr = (1.0 - s_ss(0.0, fw, fv.w)) * fo;
  float frH = (1.0 - s_ss(0.0, fw * 2.6, fv.w)) * fo;      // rounded groove shoulders
  vec4 fv2 = V_frac2(uv + 0.002 * vec2(jg, -jg));
  float fr2 = (1.0 - s_ss(0.0, 0.03, fv2.w)) * s_ss(0.78, 0.88, L_fracO(uv + 0.5)) * 0.45;
  // weathering pockets (tafoni) with honeycomb walls inside
  float pocket = s_ss(0.6, 0.76, L_pocket(q));
  vec4 hc = V_honey(q);
  float honeyWall = s_ss(0.02, 0.16, hc.w);

  float h = 0.5 + 0.22 * lump + 0.1 * mid + 0.06 * fine + 0.05 * knobs + 0.015 * grain;
  h -= pocket * 0.12 * (0.8 + 0.2 * honeyWall);
  h -= 0.09 * fr + 0.09 * frH + 0.04 * fr2;
  s.h = clamp(h, 0.0, 1.0);

  // ---- colour ---------------------------------------------------------------
  vec3 tanC = vec3(0.46, 0.31, 0.19);
  vec3 buff = vec3(0.56, 0.43, 0.30);
  vec3 ochre = vec3(0.50, 0.28, 0.13);
  vec3 col = mix(tanC, buff, s_ss(0.3, 0.7, L_tone(uv + 0.5)));
  col = mix(col, ochre, s_ss(0.42, 0.85, L_rust(q + 1.3)) * 0.5);   // gradual iron staining (a hard threshold read as camouflage blotches)
  col *= 0.88 + 0.24 * L_tone2(uv);
  col *= 0.9 + 0.2 * L_mott(q);
  // Liesegang iron banding, subtle and zoned
  float bands = s_ss(0.6, 0.95, sin((L_band(q) * 9.0 + 2.0 * L_bandD(q)) * S_TAU) * 0.5 + 0.5);
  col = mix(col, vec3(0.38, 0.19, 0.09), bands * s_ss(0.55, 0.8, L_bz(uv)) * 0.25);
  // mineral speckle (dark lithics, bright quartz)
  float sp = s_h(floor(uv * 1024.0));
  col *= 0.92 + 0.16 * s_h(floor(uv * 512.0) + 7.0);
  col *= sp > 0.975 ? 0.78 : (sp < 0.02 ? 1.12 : 1.0);
  // desert varnish: dark streaks running down, patchy
  float streak = L_streak(q) + 0.4 * L_streak2(q + 0.7);
  float varnish = s_ss(0.2, 0.5, streak) * s_ss(0.62, 0.86, L_vz(uv + 0.2));
  col = mix(col, vec3(0.17, 0.1, 0.06), varnish * 0.42);
  // pockets: shadowed, iron-stained interiors; fractures dark
  col = mix(col, col * vec3(0.72, 0.6, 0.52), pocket * 0.6);
  col = mix(col, col * vec3(0.7, 0.66, 0.63), clamp(fr * 0.75 + frH * 0.25 + fr2 * 0.3, 0.0, 1.0));
  // crustose lichen rosettes (pale green-grey, orange, black), zoned
  vec4 lv = V_lich(uv);
  float lr = 0.14 + 0.26 * s_h(vec2(lv.z * 911.0, 5.0));
  float lichen = (1.0 - s_ss(lr * 0.55, lr, length(lv.xy) + 0.08 * L_ld(uv))) * step(lv.z, 0.08) * s_ss(0.6, 0.8, L_lz(uv));
  vec3 lcol = lv.z < 0.045 ? s_desat(col, 0.6) * vec3(0.92, 1.0, 0.9) : (lv.z < 0.065 ? col * vec3(1.08, 0.78, 0.5) : col * 0.55);
  col = mix(col, lcol, lichen * 0.55 * (1.0 - fr) * (1.0 - pocket));
  // weathered convex knobs bleach, concavities collect dust
  col *= 1.0 + 0.16 * s_sat(s.curv * 2.0);
  col = mix(col, vec3(0.52, 0.42, 0.31), s_sat(-s.curv * 1.5) * 0.2);
  s.albedo = col;

  s.rough = 0.86 + 0.06 * grain - 0.24 * varnish + 0.05 * lichen + 0.05 * fr;
  s.ao = 1.0 - 0.2 * fr - 0.2 * pocket;
}`},cliff:{worldSize:8,depth:.45,aoStrength:1,layers:{w1:[`fbm`,[2,3],4],w2:[`fbm`,[3,2],4],bw:[`fbm`,[2,1],3],er:[`fbm`,[12,3],4],rough:[`fbm`,[10,10],5],crag:[`ridged`,[18,14],3],fine:[`fbm`,[64,64],3],jn:[`gn`,[7,1]],lamF:[`fbm`,[6,3],3],lamB:[`vn`,[24,60]],tone:[`vfbm`,[5,2],3],tone2:[`vfbm`,[16,6],3],mott:[`vfbm`,[40,30],3],curtain:[`fbm`,[22,1],4],curtain2:[`fbm`,[47,2],3],cz:[`vfbm`,[4,1],3],runoff:[`fbm`,[17,1],3],rz:[`vfbm`,[3,1],2],spall:[`vor`,[7,11],.9],dG:[`fbm`,[120,120],3],dL:[`ridged`,[20,60],2]},detail:{depth:.003,glsl:`
float detail(vec2 uv) { return 0.5 + 0.25 * L_dG(uv) + 0.2 * (L_dL(uv + 0.004 * L_dG(uv)) - 0.5); }`},glsl:`
vec3 cliffCol(float lid) {
  float pk = s_h(vec2(lid, 9.3));
  if (pk < 0.25) return vec3(0.60, 0.46, 0.32);   // cream buff
  if (pk < 0.5) return vec3(0.50, 0.34, 0.21);    // tan
  if (pk < 0.68) return vec3(0.47, 0.26, 0.14);   // rust
  if (pk < 0.86) return vec3(0.55, 0.37, 0.28);   // pinkish
  return vec3(0.43, 0.31, 0.21);                  // darker brown
}
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  // band coordinate: 13 layers per tile, undulating boundaries, strongly uneven thickness
  float b = uv.y * 13.0 + 0.6 * L_bw(uv) + 0.25 * w.x + 0.45 * sin(uv.y * 2.0 * S_TAU + 1.3) + 0.18 * L_er(uv);
  float li = floor(b), lf = fract(b);
  float lid = mod(li, 13.0);
  float hard = s_h(vec2(lid, 1.7));                          // resistant layers protrude
  float hardAbove = s_h(vec2(mod(li + 1.0, 13.0), 1.7));
  float sub = s_h(vec2(lid, 4.1));
  // ledge profile inside the layer (lf 0 = base, 1 = top); eroded, irregular edges
  float lfe = clamp(lf + 0.1 * L_er(uv + 0.3), 0.0, 1.0);
  float ledge = s_ss(0.0, 0.25, lfe) * (1.0 - s_ss(0.75, 1.0, lfe) * (0.5 + 0.5 * hard));
  float undercut = s_ss(0.0, 0.5, lfe);
  float face = mix(undercut * 0.65, ledge, hard);
  // cross-bedding laminae, faint and broken up (integer tilt keeps u periodic)
  float tilt = floor((sub - 0.5) * 9.0);
  float lam = fract(lf * 6.0 + uv.x * tilt + 0.6 * L_lamF(uv));
  float lamLine = (1.0 - s_ss(0.0, 0.12, abs(lam - 0.5) * 2.0 - 0.75)) * s_ss(0.4, 0.75, L_lamB(uv));
  // vertical joints running the full height of some layers
  float jOn = step(s_h(vec2(lid, 6.1)), 0.2);
  float joint = (1.0 - s_ss(0.0, 0.01, abs(L_jn(vec2(uv.x + 0.01 * w.y, (li + 0.5) / 13.0))))) * jOn * 0.35;
  // spalled scars: recessed patches with crisp rims
  vec4 sv = V_spall(uv + 0.02 * w);
  float spall = step(sv.z, 0.2) * s_ss(0.03, 0.12, sv.w);
  float rough = L_rough(uv + 0.2 * w), crag = L_crag(uv + 0.01 * w), fine = L_fine(uv);

  float h = 0.34 + 0.3 * face + 0.12 * hard * ledge + 0.16 * rough + 0.08 * crag + 0.03 * fine;
  h -= 0.015 * lamLine + 0.16 * joint + 0.06 * spall;
  s.h = clamp(h, 0.0, 1.0);

  // ---- colour: per-layer warm sandstones with soft transitions between layers
  vec3 col = mix(cliffCol(lid), cliffCol(mod(li - 1.0, 13.0)), (1.0 - s_ss(0.0, 0.18, lf)) * 0.5);
  col = mix(col, cliffCol(mod(li + 1.0, 13.0)), s_ss(0.82, 1.0, lf) * 0.5);
  col = mix(col, vec3(0.60, 0.46, 0.32), 0.25 * L_tone(uv));
  col *= 0.86 + 0.24 * L_tone2(uv);
  col *= 0.9 + 0.2 * L_mott(uv);
  col *= 0.92 + 0.16 * crag;
  col *= 1.0 - 0.05 * lamLine;
  col *= 0.94 + 0.12 * s_h(floor(uv * 1024.0));
  col = mix(col, vec3(0.62, 0.5, 0.36), spall * 0.3);
  // desert varnish curtains hanging from the hard ledge above
  float curtain = L_curtain(vec2(uv.x + 0.02 * w.y, uv.y)) + 0.35 * L_curtain2(uv);
  float varnish = s_ss(0.05, 0.4, curtain) * s_ss(0.3, 0.75, L_cz(uv + 0.1));
  varnish = clamp(varnish * (0.3 + 0.9 * hardAbove * mix(0.25, 1.0, lf)), 0.0, 1.0);
  col = mix(col, vec3(0.13, 0.08, 0.05), varnish * 0.65);
  // pale mineral / water runoff streaks
  float runoff = s_ss(0.35, 0.6, L_runoff(uv + 0.5)) * s_ss(0.55, 0.8, L_rz(uv + 0.7));
  col = mix(col, vec3(0.66, 0.58, 0.48), runoff * 0.3);
  // wind-blown sand settles on up-facing ledges (tangent +v = up)
  float dustUp = s_ss(0.15, 0.6, s.n.y) * (0.6 + 0.4 * s_sat(-s.curv));
  col = mix(col, vec3(0.62, 0.51, 0.37), dustUp * 0.5);
  col = mix(col, col * 0.55, joint);
  col *= 1.0 + 0.12 * s_sat(s.curv * 2.0);
  s.albedo = col;

  s.rough = 0.88 - 0.2 * varnish + 0.05 * fine + 0.04 * dustUp;
  s.ao = 1.0 - 0.4 * joint;
}`},soil:{worldSize:2,depth:.03,aoStrength:1.1,layers:{w1:[`fbm`,[3,3],4],w2:[`fbm`,[3,3],4],clump:[`fbm`,[10,10],5],crumb:[`ridged`,[34,34],3],fine:[`fbm`,[64,64],3],tone:[`vfbm`,[3,3],4],damp:[`vfbm`,[2,2],4],org:[`vfbm`,[48,48],3],mott:[`vfbm`,[20,20],3],crk:[`vor`,[12,12],.85],clod:[`vor`,[40,40],.9],peb:[`vor`,[26,26],.9],pz:[`vfbm`,[4,4],3],dCr:[`vfbm`,[50,50],3],dGr:[`fbm`,[100,100],2]},detail:{depth:.0024,glsl:`
float detail(vec2 uv) { return 0.5 + 0.4 * (L_dCr(uv) - 0.5) + 0.12 * L_dGr(uv); }`},glsl:Ao+`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  vec2 q = uv + 0.02 * w;
  float clump = L_clump(q), crumb = L_crumb(q);
  vec4 cv = V_clod(q);
  float clod = s_dome(clamp(length(cv.xy) / (0.35 + 0.25 * cv.z), 0.0, 1.0));
  float dry = 1.0 - s_ss(0.35, 0.7, L_damp(uv));
  vec4 kv = V_crk(q);
  float crack = (1.0 - s_ss(0.0, 0.014, kv.w)) * s_ss(0.72, 0.92, dry) * 0.5;
  vec4 pv = V_peb(uv);
  float pr = 0.16 + 0.2 * s_h(vec2(pv.z * 211.0, 3.0));
  float isPeb = step(pv.z, 0.08) * s_ss(0.45, 0.7, L_pz(uv));
  float peb = s_dome(clamp(length(pv.xy) / pr, 0.0, 1.0)) * isPeb;
  float th, tr;
  float tw = twigs(uv, vec2(8.0), 0.18, th, tr);

  float h = 0.42 + 0.13 * clump + 0.08 * crumb + 0.08 * clod + 0.04 * L_fine(uv) - 0.14 * crack;
  h = max(h, 0.46 + 0.22 * sqrt(peb) * step(0.01, peb));          // half-buried pebbles
  h = max(h, 0.52 + 0.15 * th * step(0.01, tw));
  s.h = clamp(h, 0.0, 1.0);

  vec3 dryC = vec3(0.18, 0.135, 0.092), wetC = vec3(0.095, 0.068, 0.047);
  vec3 col = mix(wetC, dryC, dry) * (0.86 + 0.28 * L_tone(uv));
  col *= 0.88 + 0.24 * L_mott(q);
  col *= 0.9 + 0.2 * crumb;
  col = mix(col, vec3(0.05, 0.04, 0.03), s_ss(0.62, 0.85, L_org(uv)) * 0.45);   // organic matter
  col *= 0.9 + 0.2 * s_h(floor(uv * 1024.0));
  col = mix(col, col * 0.6, crack);
  float pk = s_h(vec2(pv.z * 67.0, 5.0));
  vec3 pc = mix(vec3(0.16, 0.14, 0.12), vec3(0.21, 0.16, 0.11), pk) * (0.8 + 0.3 * s_h(vec2(pv.z * 13.0, 1.0)));
  col = mix(col, mix(col, pc, 0.7), s_ss(0.0, 0.35, peb));                        // dusty, soil-coated stones
  vec3 tc = mix(vec3(0.09, 0.065, 0.045), vec3(0.17, 0.13, 0.09), tr);
  col = mix(col, tc * (0.75 + 0.35 * th), tw);
  col *= 1.0 + 0.12 * s_sat(s.curv * 2.0);
  s.albedo = col;
  s.rough = mix(0.84, 0.94, dry) - 0.1 * peb * isPeb - 0.04 * tw;
  s.ao = 1.0 - 0.25 * crack;
}`},stone:{worldSize:2,depth:.02,aoStrength:1,layers:{w1:[`fbm`,[3,3],4],w2:[`fbm`,[3,3],4],jag:[`fbm`,[50,50],2],broad:[`fbm`,[2,2],4],mid:[`fbm`,[8,8],4],fine:[`fbm`,[128,128],3],gr:[`fbm`,[40,40],3],lamF:[`fbm`,[2,1],3],lz:[`vfbm`,[3,3],3],frac:[`vor`,[3,3],.9],fracO:[`vfbm`,[5,5],3],tone:[`vfbm`,[3,3],4],tone2:[`vfbm`,[12,12],3],mott:[`vfbm`,[40,40],3],iron:[`vfbm`,[5,5],4],pitN:[`vfbm`,[70,70],2],pitZ:[`vfbm`,[4,4],3],lich:[`vfbm`,[9,9],4],worn:[`vfbm`,[3,3],3],dG:[`fbm`,[80,80],3]},detail:{depth:6e-4,glsl:`
float detail(vec2 uv) { return 0.5 + 0.35 * L_dG(uv); }`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec2 w = vec2(L_w1(uv), L_w2(uv));
  vec2 q = uv + 0.03 * w;
  float broad = L_broad(q), mid = L_mid(q + 0.4), fine = L_fine(uv), gr = L_gr(q);
  // bedding planes: gently stepped laminae exposed by wear
  float lam = fract(q.y * 9.0 + 1.6 * L_lamF(q));
  float step1 = s_ss(0.0, 0.05, lam) * 0.5 + s_ss(0.5, 0.56, lam) * 0.5;
  float lamZone = s_ss(0.35, 0.7, L_lz(uv + 0.2));
  // a few straight fractures, open only in places: V-section, soft shoulders (a
  // dense dark voronoi network read as dried-mud crazing, not as sandstone)
  vec4 fv = V_frac(uv + 0.005 * vec2(L_jag(uv), L_jag(uv + 0.5)));
  float crackV = 1.0 - s_ls(0.0, 0.01, fv.w);
  float crack = crackV * crackV * s_ss(0.66, 0.78, L_fracO(uv));
  // irregular solution pits in clusters
  float pit = s_ss(0.7, 0.82, L_pitN(uv)) * s_ss(0.5, 0.75, L_pitZ(uv));
  float worn = s_ss(0.45, 0.75, L_worn(uv));

  float h = 0.55 + 0.18 * broad + 0.07 * mid + 0.04 * gr + 0.05 * step1 * lamZone + 0.03 * fine * (1.0 - 0.7 * worn);
  h -= 0.24 * crack + 0.1 * pit;
  s.h = clamp(h, 0.0, 1.0);

  vec3 grey = vec3(0.41, 0.37, 0.31);
  vec3 warm = vec3(0.47, 0.36, 0.25);
  vec3 col = mix(grey, warm, s_ss(0.35, 0.75, L_tone(q + 1.0)));
  col *= 0.88 + 0.22 * L_tone2(uv);
  col *= 0.9 + 0.2 * L_mott(q);
  col *= 1.0 - 0.07 * (1.0 - s_ss(0.0, 0.1, abs(lam - 0.5) - 0.38)) * lamZone;
  col = mix(col, vec3(0.45, 0.25, 0.12), s_ss(0.62, 0.85, L_iron(q + 3.0)) * 0.35);
  float lich = s_ss(0.72, 0.8, L_lich(uv + 0.8) + 0.06 * fine);
  col = mix(col, vec3(0.2, 0.18, 0.14), lich * 0.45);
  col *= 0.95 + 0.1 * s_h(floor(uv * 1024.0));
  col = mix(col, col * 0.6, crack);
  col = mix(col, col * 0.7, pit);
  col = mix(col, col * 1.08 + 0.02, worn * 0.4);
  col *= 1.0 + 0.1 * s_sat(s.curv * 2.0);
  s.albedo = col;

  s.rough = mix(0.84, 0.6, worn) + 0.05 * fine + 0.08 * lich;
  s.ao = 1.0 - 0.4 * crack - 0.2 * pit;
}`},metal:{worldSize:.5,depth:.003,aoStrength:.9,layers:{ham:[`vor`,[28,28],.95],hamZ:[`vfbm`,[3,3],3],tarn:[`vfbm`,[4,4],4],verd:[`vfbm`,[5,5],4],verdD:[`fbm`,[40,40],3],fine:[`fbm`,[128,128],2],tone:[`vfbm`,[3,3],3],scr1:[`gn`,[3,90]],scr2:[`gn`,[70,4]],scm:[`vn`,[9,9]],low:[`fbm`,[3,3],3],dS1:[`gn`,[3,70]],dS2:[`gn`,[60,4]],dSm:[`vn`,[6,6]],dPit:[`vfbm`,[90,90],2]},detail:{depth:2e-5,glsl:`
float detail(vec2 uv) {
  float sc = max(1.0 - s_ss(0.0, 0.04, abs(L_dS1(uv))), (1.0 - s_ss(0.0, 0.04, abs(L_dS2(uv)))) * s_ss(0.4, 0.7, L_dSm(uv)));
  return 0.6 - 0.35 * sc - 0.2 * s_ss(0.7, 0.9, L_dPit(uv));
}`},glsl:`
void surface(inout S s) {
  vec2 uv = s.uv;
  vec4 hv = V_ham(uv);
  float hz = s_ss(0.3, 0.7, L_hamZ(uv));                      // hammering fades out in places
  float dimple = mix(1.0, s_sq(s_sat(length(hv.xy) / (0.5 + 0.25 * hv.z))), hz * 0.8);
  float scrM = s_ss(0.55, 0.8, L_scm(uv));
  float scr = max(1.0 - s_ss(0.0, 0.03, abs(L_scr1(uv))), 1.0 - s_ss(0.0, 0.03, abs(L_scr2(uv + 0.3)))) * scrM;
  float h = 0.5 + 0.22 * dimple + 0.14 * L_low(uv) + 0.02 * L_fine(uv) - 0.05 * scr;
  s.h = clamp(h, 0.0, 1.0);

  vec3 polished = vec3(0.80, 0.62, 0.34);                    // brass F0 (linear)
  vec3 aged = vec3(0.50, 0.36, 0.19);
  float tarnish = s_ss(0.15, 0.95, L_tarn(uv)) * (0.55 + 0.45 * (1.0 - dimple));
  vec3 col = mix(polished, aged, 0.65 + 0.3 * L_tone(uv));
  col = mix(col, polished * 1.05, s_sat(s.curv * 3.0) * 0.6);   // rubbed high points
  col = mix(col, vec3(0.16, 0.11, 0.06), tarnish * 0.7);
  col = mix(col, col * 1.2, scr * 0.5);
  // verdigris: non-metal, in cavities and zones
  float verd = s_ss(0.82, 0.95, L_verd(uv) + 0.1 * L_verdD(uv) + s.cav * 80.0 + 0.15 * s_sat(-s.curv * 2.0)) * 0.8;
  vec3 vcol = mix(vec3(0.16, 0.36, 0.28), vec3(0.3, 0.46, 0.38), L_verdD(uv + 0.5) * 0.5 + 0.5);
  s.albedo = mix(col, vcol, verd);
  s.metal = mix(mix(1.0, 0.6, tarnish), 0.0, verd);
  s.rough = mix(mix(0.3, 0.55, tarnish) + 0.1 * (1.0 - dimple) * 0.3, 0.85, verd) - 0.08 * scr;
  s.ao = 1.0;
}`},fabric:Eo,leafLitter:{worldSize:2,depth:.012,aoStrength:.75,layers:{clump:[`fbm`,[10,10],4],tone:[`vfbm`,[3,3],4],hole:[`vfbm`,[60,60],3],vein:[`fbm`,[120,120],2],dens:[`vfbm`,[3,3],3],dry:[`vfbm`,[4,4],3],duff:[`vfbm`,[36,36],3],blot:[`vfbm`,[24,24],3],dV:[`ridged`,[40,40],2],dCr:[`fbm`,[20,20],3]},detail:{depth:.0012,glsl:`
float detail(vec2 uv) { return 0.5 + 0.2 * (L_dV(uv) - 0.5) + 0.25 * L_dCr(uv); }`},glsl:Ao+`
void surface(inout S s) {
  vec2 uv = s.uv;
  float dens = s_ss(0.2, 0.8, L_dens(uv));
  // leaves: 4 layers on jittered grids, topmost wins (the one below is tracked too)
  float top = -1.0, lh = 0.0, lcol = 0.0, lmid = 0.0, lvein = 0.0, ledge = 0.0, lk = 0.0;
  float sec = -1.0, lh2 = 0.0, ledgeN = 0.0;                // the leaf directly underneath
  for (int layer = uZero; layer < 4; layer++) {
    float fl = float(layer);
    vec2 per = vec2(fl < 1.5 ? 9.0 : 8.0);
    vec2 p = (uv + vec2(0.37, 0.61) * fl) * per;
    vec2 ip = floor(p), fp = fract(p);
    for (int y = -1 - uZero; y <= 1; y++)
    for (int x = -1 - uZero; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 cid = mod(ip + g, per);
      vec3 r = s_h3(cid + fl * 17.3);
      if (r.z > 0.9 + 0.1 * dens) continue;
      vec2 c = g + 0.2 + 0.6 * r.xy - fp;                    // leaf centre (cells)
      float ang = s_h(cid + fl * 3.1 + 0.7) * S_TAU;
      vec2 lp = s_rot(-c, -ang);                              // leaf-local coords
      float L = 0.27 + 0.24 * s_h(cid + fl * 5.9);            // half length (cells)
      float lobeK = s_h(cid + fl * 4.7 + 1.3);                // broad fig-like / lobed oak-like / narrow
      float Wd = L * (lobeK < 0.4 ? 0.5 + 0.1 * r.x : 0.34 + 0.14 * r.y);
      float t = lp.x / L;
      if (abs(t) > 1.0) continue;
      float at = abs(t);
      float hw = Wd * sqrt(max(1.0 - at * sqrt(at), 0.0)) * (1.0 - 0.3 * t);   // pointed tip, broad base
      hw *= 1.0 + (lobeK > 0.6 ? 0.2 : 0.05) * sin(t * (lobeK > 0.6 ? 9.4 : 4.0) + r.x * 6.3);   // lobes / waviness
      float ay = abs(lp.y);
      if (ay > hw) continue;
      float z = fl + r.z;
      if (z <= sec) continue;
      float yn = ay / max(hw, 1e-3);
      // height keeps the old 0..1 distribution (the terrain height-blends litter over
      // sand with it); the relief itself stays gentle through the smaller depth
      // (no raised rim: a curled-edge ridge draws every leaf outline in the normals)
      float hh = 0.52 + 0.1 * fl + 0.05 * sin(t * 2.2 + r.x * 6.0);
      if (z <= top) { sec = z; lh2 = hh; continue; }
      sec = top; lh2 = lh;
      top = z;
      lh = hh;
      lcol = s_h(cid + fl * 9.7 + 4.4);
      lk = fl;
      lmid = 1.0 - s_ss(0.0, 0.06, yn);
      lvein = 1.0 - s_ss(0.0, 0.08, abs(fract((lp.x + ay * 0.9) / L * 4.0) - 0.5) - 0.42);
      ledge = s_ss(0.8, 1.0, yn);
      ledgeN = yn;
    }
  }
  float leaf = step(0.0, top);
  // decay holes reveal what is below
  float holeN = L_hole(uv);
  float holed = leaf * s_ss(0.72, 0.76, holeN) * s_ss(0.5, 0.8, L_dry(uv));
  leaf *= 1.0 - holed;
  float th, tr;
  float tw = twigs(uv, vec2(7.0), 0.12, th, tr);
  // duff: crumbled leaf fragments over the soil, so gaps are brown debris, not dark holes
  float duffN = L_duff(uv);
  float duff = s_ss(0.2, 0.5, duffN);

  float soilH = 0.3 + 0.08 * L_clump(uv) + 0.04 * duff;
  // leaf edges taper onto whatever lies below (soil or the leaf underneath): a
  // height step at the rim would emboss every leaf outline into the normal map
  float below = sec >= 0.0 ? max(soilH, lh2) : soilH;
  float lhS = mix(below, lh + 0.015 * lmid, 1.0 - s_ss(0.45, 1.0, ledgeN));
  float h = mix(soilH, lhS, leaf);
  h = max(h, (0.62 + 0.18 * th) * step(0.01, tw));
  s.h = clamp(h, 0.0, 1.0);

  // palette: dry fig / oak litter, brown to grey-brown, a few pale bleached and russet leaves
  vec3 soilC = vec3(0.105, 0.078, 0.053) * (0.85 + 0.3 * L_tone(uv));
  vec3 duffC = vec3(0.17, 0.12, 0.075) * (0.78 + 0.44 * L_blot(uv * 2.0 + 0.3));
  vec3 ground = mix(soilC, duffC, duff * 0.85);
  vec3 c0 = vec3(0.25, 0.165, 0.095), c1 = vec3(0.19, 0.125, 0.072), c2 = vec3(0.3, 0.22, 0.14);
  vec3 c3 = vec3(0.13, 0.088, 0.055), c4 = vec3(0.22, 0.172, 0.122), c5 = vec3(0.28, 0.165, 0.08);
  vec3 lc = lcol < 0.3 ? c0 : lcol < 0.52 ? c1 : lcol < 0.66 ? c2 : lcol < 0.82 ? c3 : lcol < 0.95 ? c4 : c5;
  lc *= 0.9 + 0.2 * L_blot(uv + lcol);                      // mottled decay blotches
  lc *= 0.92 + 0.14 * L_vein(uv);
  lc *= 1.0 - 0.06 * lvein;                                 // faint veins
  lc = mix(lc, lc * 1.1 + 0.01, lmid * 0.45);               // paler midrib
  lc = mix(lc, s_desat(lc, 0.3) * 1.06, ledge * 0.4);       // dried, paler curled edge
  lc *= 1.0 - 0.06 * (3.0 - lk);                            // lower layers a touch darker
  vec3 col = mix(ground, lc, leaf);
  vec3 tc = mix(vec3(0.1, 0.072, 0.05), vec3(0.18, 0.14, 0.1), tr);
  col = mix(col, tc * (0.8 + 0.3 * th), tw);
  col *= 0.95 + 0.1 * s_h(floor(uv * 1024.0));
  s.albedo = col;
  s.rough = mix(0.95, 0.78, leaf) + 0.04 * ledge;
  s.ao = 1.0;
}`}},Mo=typeof location<`u`&&/[?&]noprime(&|=|$)/.test(location.search),No=(()=>{if(typeof location>`u`)return 0;let e=location.search.match(/[?&]texsize=(\d+)/),t=e?parseInt(e[1],10):0;return t>=256&&t<=4096&&!(t&t-1)?t:0})(),Po={low:{texel:.003,min:256,cap:512,hero:512},medium:{texel:.0015,min:512,cap:1024,hero:1024},high:{texel:.001,min:512,cap:1024,hero:1024},ultra:{texel:6e-4,min:1024,cap:2048,hero:2048},cinematic:{texel:3e-4,min:1024,cap:2048,hero:4096}};function Fo(e={}){if(e.cinematic)return`cinematic`;if(e.name&&Po[e.name])return e.name;let t=e.textureSize??1024;return t>=4096?`cinematic`:t>=2048?`ultra`:t>=1024?`high`:`low`}function Io(e,t={}){if(No)return No;let n=Po[Fo(t)],r=Math.max(n.min,Math.min(n.cap,t.textureSize??n.cap)),i=e.hero?r*(n.hero/n.cap):r;e.maxSize&&(i=Math.min(i,Math.max(e.maxSize,n.min)));let a=e.worldSize/n.texel,o=2**Math.round(Math.log2(Math.max(a,1)));return Math.max(n.min,Math.min(i,o))}var Lo=class{constructor(e,t){this.renderer=e,this.quality=t,this.baker=new io(e),this.surfaceBaker=new ho(e),this.sets=new Map,this.extra=new Map,this.stats=null}async generate(e,t={}){let n=this.renderer.getContext(),r=t.profile?[]:null,i=performance.now(),a=Object.keys(jo),o=Fo(this.quality),s=this.quality.anisotropy,c=this.surfaceBaker,l=Object.fromEntries(a.map(e=>[e,Io(jo[e],this.quality)])),u=[...a].sort((e,t)=>l[t]-l[e]).map(e=>c.prepare(e,jo[e],l[e]));e?.(.02,`compiling`),await c.compileAll(u),Mo||c.prime(u);let d=performance.now()-i;e?.(.35,`compiled`);let f=[],p=new Map;for(let i=0;i<u.length;i++){let a=u[i];c.runnable(a)||(f.push(a.name),console.error(`[lagoon] textures: surface '${a.name}' failed to compile, using fallback`),c.disposeJob(a),a=c.prepare(a.name,mo(a.def),a.size));let o=r?performance.now():0;if(p.set(a.name,c.bake(a,s)),r&&(n.finish(),r.push([a.name,Math.round(performance.now()-o)])),t.glcheck){let e=n.getError();e&&console.error(`[lagoon] textures: GL error ${e} after baking '${a.name}'`)}c.disposeJob(a),e?.(.35+.65*((i+1)/u.length),a.name),i%4==3&&await new Promise(e=>setTimeout(e,0))}for(let e of a)this.sets.set(e,p.get(e));c.disposeScratch(),this.profile=r;let m={};for(let e of a)m[l[e]]=(m[l[e]]||0)+1;let h=Object.keys(m).map(Number).sort((e,t)=>t-e).map(e=>`${m[e]}x${e}`).join(` `);this.stats={sets:u.length,tier:o,size:Math.max(...Object.values(l)),sizes:l,compileMs:Math.round(d),totalMs:Math.round(performance.now()-i),megabytes:Math.round(c.bytes/1048576),failed:f},console.log(`[lagoon] textures: ${this.stats.sets} sets (${o}: ${h}), ${this.stats.megabytes} MB (with mips), compile ${this.stats.compileMs} ms, total ${this.stats.totalMs} ms${f.length?`, FAILED: `+f.join(`,`):``}`)}get(e){let t=this.sets.get(e);if(!t)throw Error(`TextureLibrary: unknown set '${e}'`);return t}has(e){return this.sets.has(e)}register(e,t){return this.extra.set(e,t),t}extraTex(e){return this.extra.get(e)}bake(e,t){return this.baker.bake(e,t)}primePrograms(){return no(this.renderer)}},Ro={bark:{normalScale:1,envMapIntensity:.9,pom:!0},barkPalm:{normalScale:1,envMapIntensity:.9},woodPlank:{normalScale:1.1,pom:!0,pomScale:.9},woodBeam:{normalScale:1,pom:!0,pomScale:.8},woodDark:{normalScale:.9,pom:!0,pomScale:1},thatch:{normalScale:1,envMapIntensity:.9},rope:{normalScale:1},linen:{normalScale:.8,side:2},wicker:{normalScale:1},sand:{normalScale:1,antiTile:!0,macro:.1},sandWet:{normalScale:.9,antiTile:!0,macro:.08},rock:{normalScale:1,antiTile:!0,macro:.12},cliff:{normalScale:1,antiTile:!0,macro:.12},soil:{normalScale:1,antiTile:!0,macro:.12},stone:{normalScale:1,antiTile:!0,macro:.08},metal:{normalScale:.8},fabric:{normalScale:.8},leafLitter:{normalScale:1,antiTile:!0,macro:.1}},zo=.07,Bo=2.5,Vo=12,Ho=.2,Uo=4,Wo=9,Go={low:0,medium:1,high:2,ultra:3,cinematic:4},Ko=!1;function qo(){if(Ko)return;Ko=!0;let e=pe,t=e=>e.toFixed(4);e.map_pars_fragment+=`
#ifdef LV_NOTILE
#ifndef LV_NOTILE_FREQ
#define LV_NOTILE_FREQ 0.47
#endif
float lvHash( vec2 p ) { vec3 p3 = fract( vec3( p.xyx ) * 0.1031 ); p3 += dot( p3, p3.yzx + 33.33 ); return fract( ( p3.x + p3.y ) * p3.z ); }
float lvNoise( vec2 x ) {
  vec2 i = floor( x ), f = fract( x );
  vec2 u = f * f * ( 3.0 - 2.0 * f );
  return mix( mix( lvHash( i ), lvHash( i + vec2( 1.0, 0.0 ) ), u.x ), mix( lvHash( i + vec2( 0.0, 1.0 ) ), lvHash( i + vec2( 1.0, 1.0 ) ), u.x ), u.y );
}
#endif
#ifdef LV_WMACRO
float lvHash3( vec3 p ) { p = fract( p * 0.1031 ); p += dot( p, p.zyx + 31.32 ); return fract( ( p.x + p.y ) * p.z ); }
float lvNoise3( vec3 x ) {
  vec3 i = floor( x ), f = fract( x );
  vec3 u = f * f * ( 3.0 - 2.0 * f );
  float a = mix( lvHash3( i ), lvHash3( i + vec3( 1.0, 0.0, 0.0 ) ), u.x );
  float b = mix( lvHash3( i + vec3( 0.0, 1.0, 0.0 ) ), lvHash3( i + vec3( 1.0, 1.0, 0.0 ) ), u.x );
  float c = mix( lvHash3( i + vec3( 0.0, 0.0, 1.0 ) ), lvHash3( i + vec3( 1.0, 0.0, 1.0 ) ), u.x );
  float d = mix( lvHash3( i + vec3( 0.0, 1.0, 1.0 ) ), lvHash3( i + vec3( 1.0, 1.0, 1.0 ) ), u.x );
  return mix( mix( a, b, u.y ), mix( c, d, u.y ), u.z );
}
#endif
`;let n=`
#if defined( LV_POM ) && defined( USE_BUMPMAP ) && defined( USE_MAP ) && defined( USE_NORMALMAP_TANGENTSPACE ) && defined( USE_ROUGHNESSMAP ) && ! defined( USE_TANGENT ) && ! defined( FLAT_SHADED ) && ! defined( LV_NOTILE ) && ! defined( vMapUv ) && ! defined( vNormalMapUv )
  #define LV_POM_ACTIVE
  vec2 lvPGx = dFdx( vBumpMapUv ), lvPGy = dFdy( vBumpMapUv );
  vec2 lvPOff = vec2( 0.0 );
  {
    float lvPFade = 1.0 - smoothstep( ${t(Uo)}, ${t(Wo)}, length( vViewPosition ) );
    if ( lvPFade > 0.0 ) {
      vec3 lvPN = normalize( vNormal );
      #ifdef DOUBLE_SIDED
      lvPN *= gl_FrontFacing ? 1.0 : - 1.0;
      #endif
      mat3 lvPT = getTangentFrame( - vViewPosition, lvPN, vBumpMapUv );
      vec3 lvV = normalize( vViewPosition );
      vec3 lvVt = vec3( dot( lvV, lvPT[ 0 ] ), dot( lvV, lvPT[ 1 ] ), max( dot( lvV, lvPN ), 0.0 ) );
      // offset limiting keeps grazing views from sliding far
      vec2 lvPDir = - lvVt.xy / ( lvVt.z + 0.3 ) * abs( bumpScale );   // bumpScale = relief in tile units
      float lvN = floor( mix( LV_POM_STEPS, 8.0, lvVt.z ) );
      float lvStep = 1.0 / lvN;
      vec2 lvDelta = lvPDir * lvStep;
      vec2 lvCur = vec2( 0.0 );
      float lvLayer = 0.0;
      float lvD = 1.0 - textureGrad( bumpMap, vBumpMapUv, lvPGx, lvPGy ).r;
      float lvPrevD = lvD, lvPrevL = 0.0;
      for ( int i = 0; i < 40; i ++ ) {
        if ( lvLayer >= lvD || float( i ) >= lvN ) break;
        lvPrevD = lvD; lvPrevL = lvLayer;
        lvCur += lvDelta;
        lvLayer += lvStep;
        lvD = 1.0 - textureGrad( bumpMap, vBumpMapUv + lvCur, lvPGx, lvPGy ).r;
      }
      // refine: binary search between the last two layers, then a linear fit
      vec2 lvLo = lvCur - lvDelta, lvHi = lvCur;
      float lvLoL = lvPrevL, lvHiL = lvLayer;
      for ( int j = 0; j < 4; j ++ ) {
        vec2 lvMid = 0.5 * ( lvLo + lvHi );
        float lvMidL = 0.5 * ( lvLoL + lvHiL );
        float lvMidD = 1.0 - textureGrad( bumpMap, vBumpMapUv + lvMid, lvPGx, lvPGy ).r;
        if ( lvMidL >= lvMidD ) { lvHi = lvMid; lvHiL = lvMidL; lvD = lvMidD; }
        else { lvLo = lvMid; lvLoL = lvMidL; lvPrevD = lvMidD; }
      }
      float lvA = lvPrevD - lvLoL, lvB = lvD - lvHiL;          // > 0 above, <= 0 below the surface
      float lvS = clamp( lvA / max( lvA - lvB, 1e-5 ), 0.0, 1.0 );
      lvPOff = mix( lvLo, lvHi, lvS ) * lvPFade;
    }
  }
  vec2 lvMapUvP = vMapUv + lvPOff;
  vec2 lvRghUvP = vRoughnessMapUv + lvPOff;
  #define vMapUv lvMapUvP
  #define vRoughnessMapUv lvRghUvP
  #ifdef USE_METALNESSMAP
  vec2 lvMtlUvP = vMetalnessMapUv + lvPOff;
  #define vMetalnessMapUv lvMtlUvP
  #endif
#endif
`,r=`
#ifdef LV_POM_ACTIVE
#undef texture2D
#define texture2D( s, c ) textureGrad( s, c, lvPGx, lvPGy )
#endif
`,i=`
#ifdef LV_POM_ACTIVE
#undef texture2D
#define texture2D texture
#endif
`;e.map_fragment=`
${n}
${`
#if defined( LV_DETAIL ) && defined( USE_NORMALMAP_TANGENTSPACE ) && defined( USE_ROUGHNESSMAP ) && ! defined( USE_PACKED_NORMALMAP )
  #define LV_DT_ACTIVE
  #ifdef LV_POM_ACTIVE
  vec2 lvDUv = ( vNormalMapUv + lvPOff ) * ${t(8)} + vec2( 0.371, 0.613 );
  vec2 lvDGx = lvPGx * ${t(8)}, lvDGy = lvPGy * ${t(8)};
  #else
  vec2 lvDUv = vNormalMapUv * ${t(8)} + vec2( 0.371, 0.613 );
  vec2 lvDGx = dFdx( lvDUv ), lvDGy = dFdy( lvDUv );
  #endif
  float lvDetK = 1.0 - smoothstep( ${t(Bo)}, ${t(Vo)}, length( vViewPosition ) );
  vec2 lvDetS = vec2( 0.0 );
  if ( lvDetK > 0.0 ) {
    lvDetS = vec2( textureGrad( roughnessMap, lvDUv, lvDGx, lvDGy ).a, textureGrad( normalMap, lvDUv, lvDGx, lvDGy ).a ) * 2.0 - 1.0;
    lvDetS *= ${t(1)};
    lvDetS *= lvDetK;
  }
#endif
`}
#if defined( LV_NOTILE ) && defined( USE_MAP )
  #define LV_NT_ACTIVE
  vec2 lvDx = dFdx( vMapUv ), lvDy = dFdy( vMapUv );
  float lvK = lvNoise( vMapUv * LV_NOTILE_FREQ ) * 6.0;
  float lvI = floor( lvK ), lvF = fract( lvK );
  vec2 lvOa = sin( vec2( 3.0, 7.0 ) * lvI ), lvOb = sin( vec2( 3.0, 7.0 ) * ( lvI + 1.0 ) );
  vec4 lvA = textureGrad( map, vMapUv + lvOa, lvDx, lvDy );
  vec4 lvB = textureGrad( map, vMapUv + lvOb, lvDx, lvDy );
  float lvW = smoothstep( 0.2, 0.8, lvF - 0.1 * dot( lvA.rgb - lvB.rgb, vec3( 1.0 ) ) );
  vec4 sampledDiffuseColor = mix( lvA, lvB, lvW );
  #ifdef LV_MACRO
  float lvM = lvNoise( vMapUv * 0.071 + 13.1 ) * 0.65 + lvNoise( vMapUv * 0.23 + 7.7 ) * 0.35;
  sampledDiffuseColor.rgb *= 1.0 + LV_MACRO * ( lvM - 0.5 ) * 2.0;
  #endif
  diffuseColor *= sampledDiffuseColor;
#else
${r}
${e.map_fragment}
${i}
#endif
#if defined( LV_WMACRO ) && defined( USE_MAP )
  {
    // world position from the view-space position (independent of other patches)
    vec3 lvWp = cameraPosition + ( vec4( - vViewPosition, 0.0 ) * viewMatrix ).xyz;
    float lvWm = lvNoise3( lvWp * 0.37 ) * 0.62 + lvNoise3( lvWp * 1.13 + 5.3 ) * 0.38;
    float lvWk = ( lvWm - 0.5 ) * 2.0 * ${t(zo)};
    float lvWl = dot( diffuseColor.rgb, vec3( 0.2126, 0.7152, 0.0722 ) );
    diffuseColor.rgb *= 1.0 + lvWk;
    diffuseColor.rgb = mix( diffuseColor.rgb, vec3( lvWl * ( 1.0 + lvWk ) ), clamp( lvWk * 3.0, 0.0, 0.3 ) );
  }
#endif
`,e.roughnessmap_fragment=`
#if defined( LV_NT_ACTIVE ) && defined( USE_ROUGHNESSMAP )
  #define LV_NT_ORM
  vec4 lvOrm = mix( textureGrad( roughnessMap, vRoughnessMapUv + lvOa, lvDx, lvDy ), textureGrad( roughnessMap, vRoughnessMapUv + lvOb, lvDx, lvDy ), lvW );
  float roughnessFactor = roughness * lvOrm.g;
#else
${r}
${e.roughnessmap_fragment}
${i}
#endif
#ifdef LV_DT_ACTIVE
  // zero-mean breakup (the slopes average to 0 over a detail tile), so the mean
  // roughness does not shift as the layer fades in with distance
  roughnessFactor = clamp( roughnessFactor * ( 1.0 + ${t(Ho)} * clamp( ( lvDetS.x - 0.7 * lvDetS.y ) * 2.5, - 1.0, 1.0 ) ), 0.03, 1.0 );
#endif
`,e.metalnessmap_fragment=`
#if defined( LV_NT_ORM ) && defined( USE_METALNESSMAP )
  float metalnessFactor = metalness * lvOrm.b;
#else
${r}
${e.metalnessmap_fragment}
${i}
#endif
`,e.normal_fragment_maps=`
#ifdef LV_POM_ACTIVE
  vec2 lvNrmUvP = vNormalMapUv + lvPOff;
  #define vNormalMapUv lvNrmUvP
#endif
${r}
#if defined( USE_NORMALMAP_TANGENTSPACE ) && ! defined( USE_PACKED_NORMALMAP ) && ( defined( LV_NT_ACTIVE ) || defined( LV_DT_ACTIVE ) )
  #ifdef LV_NT_ACTIVE
  vec3 mapN = mix( textureGrad( normalMap, vNormalMapUv + lvOa, lvDx, lvDy ), textureGrad( normalMap, vNormalMapUv + lvOb, lvDx, lvDy ), lvW ).xyz * 2.0 - 1.0;
  #else
  vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
  #endif
  mapN.xy *= normalScale;
  #ifdef LV_DT_ACTIVE
  // derivative (slope) blend: add the micro-relief gradient to the map's gradient,
  // (xy / z - s, 1) scaled by z so steep walls keep their slope (dividing by a
  // clamped z flattened the bark furrow walls and brightened them wherever the
  // layer was on)
  mapN = normalize( vec3( mapN.xy - lvDetS * mapN.z, mapN.z ) );
  #ifdef LV_DETAIL_DEBUG
  totalEmissiveRadiance = vec3( abs( lvDetS ) * 4.0, lvDetK * 0.2 );
  #endif
  #endif
  normal = normalize( tbn * mapN );
#else
${e.normal_fragment_maps}
#endif
${i}
`;let a=`texture2D( aoMap, vAoMapUv ).r`;e.aomap_fragment.includes(a)&&(e.aomap_fragment=`
#ifdef LV_NT_ORM
  #define LV_AO_SAMPLE lvOrm.r
#elif defined( LV_POM_ACTIVE )
  #define LV_AO_SAMPLE textureGrad( aoMap, vAoMapUv + lvPOff, lvPGx, lvPGy ).r
#else
  #define LV_AO_SAMPLE ${a}
#endif
${e.aomap_fragment.replace(a,`LV_AO_SAMPLE`)}
`),e.uv_vertex=`
#ifdef LV_UVSWAP
  #define LV_UVT( v ) ( v ).yx
#else
  #define LV_UVT( v ) ( v )
#endif
${e.uv_vertex.replace(/vec3\( (\w+_UV), 1 \)/g,`vec3( LV_UVT( $1 ), 1 )`)}
`}var Jo=class{constructor(e,t=null){this.tex=e,this.quality=t??e?.quality??{};let n=this.quality;this.rank=n.rank??Go[n.name]??(n.textureSize>=2048?3:n.textureSize>=1024?2:0),this.cache=new Map,qo()}_build(e,t={}){let n=this.tex.get(e),r=Ro[e]??{},{uvSwap:i,antiTile:a,macro:o,detail:s,pom:c,...l}=t,u=1/n.worldSize;for(let e of[n.map,n.normalMap,n.ormMap,n.heightMap])e&&(e.wrapS=e.wrapT=b,e.repeat.set(u,u));let d=new ae({map:n.map,normalMap:n.normalMap,normalScale:new j(r.normalScale??1,r.normalScale??1),roughnessMap:n.ormMap,metalnessMap:n.ormMap,aoMap:n.ormMap,aoMapIntensity:r.aoMapIntensity??1,roughness:1,metalness:1,side:r.side??0,envMapIntensity:r.envMapIntensity??1});Object.assign(d,l);let f={...d.defines??{}};if(a??r.antiTile){f.LV_NOTILE=``;let e=o??r.macro??0;e>0&&(f.LV_MACRO=e.toFixed(3))}i&&(f.LV_UVSWAP=``);let p=d.normalMap===n.normalMap&&d.roughnessMap===n.ormMap;return this.rank>=1&&p&&(s??!0)&&(f.LV_DETAIL=``),this.rank>=1&&d.map===n.map&&(f.LV_WMACRO=``),this.rank>=3&&(c??r.pom)&&n.heightMap&&p&&d.map===n.map&&!f.LV_NOTILE&&!d.bumpMap&&(d.bumpMap=n.heightMap,d.bumpScale=(r.pomScale??.65)*(n.depth??.05)/n.worldSize,f.LV_POM=``,f.LV_POM_STEPS=this.rank>=4?`28.0`:`20.0`),d.defines=f,d.name=e,tr(d),d}get(e){return this.cache.has(e)||this.cache.set(e,this._build(e)),this.cache.get(e)}create(e,t={}){return this._build(e,t)}names(){return Object.keys(Ro)}},Yo=`modulepreload`,Xo=function(e){return`/`+e},Zo={},J=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Xo(t,n),t=s(t),t in Zo)return;Zo[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Yo,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Qo=[{name:`sky`,weight:2,always:!0,load:()=>J(()=>import(`./sky-CZkINW5K.js`),__vite__mapDeps([0,1,2,3]))},{name:`lighting`,weight:1,always:!0,load:()=>J(()=>import(`./lighting-v5Bxz3fy.js`),__vite__mapDeps([4,1]))},{name:`terrain`,weight:6,load:()=>J(()=>import(`./terrain-hAt8DxJj.js`),__vite__mapDeps([5,1,6,7]))},{name:`water`,weight:3,load:()=>J(()=>import(`./water-gsagbnmh.js`),__vite__mapDeps([8,1,2,3,6,9]))},{name:`rocks`,weight:3,load:()=>J(()=>import(`./rocks-y8HHw4CK.js`),__vite__mapDeps([10,1,6,7]))},{name:`trees`,weight:8,load:()=>J(()=>import(`./trees-0uhX1FpN.js`),__vite__mapDeps([11,1,2,3,6]))},{name:`architecture`,weight:8,load:()=>J(()=>import(`./architecture-CZpTapAH.js`).then(e=>e.t),__vite__mapDeps([12,3,1,13,6,14]))},{name:`palms`,weight:4,load:()=>J(()=>import(`./palms-q8s8U1Ts.js`),__vite__mapDeps([15,1,2,3,6]))},{name:`vegetation`,weight:4,load:()=>J(()=>import(`./vegetation-D1lQB87E.js`),__vite__mapDeps([16,1,2,3,6]))},{name:`waterfalls`,weight:2,load:()=>J(()=>import(`./waterfalls-DdzTju_6.js`),__vite__mapDeps([17,1,6,9]))},{name:`waterfx`,weight:1,load:()=>J(()=>import(`./waterfx-DvUq_Vch.js`),__vite__mapDeps([18,1]))},{name:`ambient`,weight:1,load:()=>J(()=>import(`./ambient-CLaPyTDX.js`),__vite__mapDeps([19,1,6]))}],$o={solid:0,walk:1,ladder:2,other:3};function es(e){let t=e?.parts;if(!t||!t.length)return null;let n=0;for(let e of t)n+=e.attributes.position.count/3|0;let r=new Uint8Array(n),i=0,a=!1;for(let e of t){let t=e.attributes.position.count/3|0,n=$o[e.userData?.kind]??$o.other;n===$o.ladder&&(a=!0),r.fill(n,i,i+t),i+=t}return{kinds:r,hasLadders:a}}var ts=2048,ns=6,rs=.2,is=class{constructor({collision:e,hf:t,kinds:n=null}){this.hf=t,this.S=t.GRID_STEP,this.bvh=e?.bvh??null,this.index=this.bvh?this.bvh.geometry.index?.array??null:null,this.kinds=n?.kinds??null,this._ci=new Int32Array(ts).fill(2147483647),this._cj=new Int32Array(ts).fill(2147483647),this._cv=new Float64Array(ts),this._ox=new Float64Array(7),this._oz=new Float64Array(7);for(let e=0;e<ns;e++){let t=e/ns*Math.PI*2+.3;this._ox[e+1]=Math.cos(t)*rs,this._oz[e+1]=Math.sin(t)*rs}this._nSamples=7,this.sup={y:-1/0,nx:0,ny:1,nz:0,terrain:!1,kind:0},this._tn=new M,this._box=new o,this._seg=new A(new M,new M),this._triPt=new M,this._capPt=new M,this._r=.32,this.contacts=new Float64Array(32),this.nContacts=0,this.ceiling=!1,this.lifted=!1,this.ladder=!1,this.ladderNx=0,this.ladderNz=0,this._px=0,this._pz=0,this._pTop=0,this._pBot=0,this._pN=1,this._best=-1/0,this._bnx=0,this._bny=1,this._bnz=0,this._bkind=0;let r=this;this._probeCB={intersectsBounds:e=>e.intersectsBox(r._box),intersectsTriangle:(e,t)=>(r._probeTri(e,t),!1)},this._capsuleCB={intersectsBounds:e=>e.intersectsBox(r._box),intersectsTriangle:(e,t)=>(r._capsuleTri(e,t),!1)},this._overlapHit=!1,this._overlapCB={intersectsBounds:e=>e.intersectsBox(r._box),intersectsTriangle:e=>e.closestPointToSegment(r._seg,r._triPt,r._capPt)<r._r&&(r._overlapHit=!0,!0)}}kindOf(e){if(!this.kinds||!this.index)return 0;let t=this.index[e*3];return this.kinds[t/3|0]??0}_lat(e,t){let n=(Math.imul(e,73856093)^Math.imul(t,19349663))&2047;if(this._ci[n]===e&&this._cj[n]===t)return this._cv[n];let r=this.hf.heightAt(e*this.S,t*this.S);return this._ci[n]=e,this._cj[n]=t,this._cv[n]=r,r}terrain(e,t,n=null){let r=this.S,i=e/r,a=t/r,o=Math.floor(i),s=Math.floor(a),c=i-o,l=a-s,u=this._lat(o,s),d=this._lat(o+1,s),f=this._lat(o,s+1),p=this._lat(o+1,s+1),m,h,g;if(c+l<=1?(m=u+(d-u)*c+(f-u)*l,h=(d-u)/r,g=(f-u)/r):(m=p+(f-p)*(1-c)+(d-p)*(1-l),h=(p-f)/r,g=(p-d)/r),n){let e=Math.sqrt(h*h+1+g*g);n.set(-h/e,1/e,-g/e)}return m}probe(e,t,n,r,i=!0){let a=this.sup;if(a.y=-1/0,a.terrain=!1,a.kind=0,this._best=-1/0,this.bvh){this._px=e,this._pz=t,this._pTop=n,this._pBot=r,this._pN=i?this._nSamples:1;let o=i?.21000000000000002:.01;this._box.min.set(e-o,r-.01,t-o),this._box.max.set(e+o,n+.01,t+o),this.bvh.shapecast(this._probeCB),this._best>-1/0&&(a.y=this._best,a.nx=this._bnx,a.ny=this._bny,a.nz=this._bnz,a.kind=this._bkind)}let o=this.terrain(e,t,this._tn);return o>=r&&o<=n&&o>a.y&&(a.y=o,a.nx=this._tn.x,a.ny=this._tn.y,a.nz=this._tn.z,a.terrain=!0,a.kind=0),a.y}_probeTri(e,t){let n=e.a,r=e.b,i=e.c,a=r.x-n.x,o=r.y-n.y,s=r.z-n.z,c=i.x-n.x,l=i.y-n.y,u=i.z-n.z,d=o*u-s*l,f=s*c-a*u,p=a*l-o*c,m=Math.sqrt(d*d+f*f+p*p);if(m<1e-12||(d/=m,f/=m,p/=m,f<0&&(d=-d,f=-f,p=-p),f<.02))return;let h=(r.z-i.z)*(n.x-i.x)+(i.x-r.x)*(n.z-i.z);if(Math.abs(h)<1e-12)return;let g=1/h;for(let e=0;e<this._pN;e++){let a=this._px+this._ox[e],o=this._pz+this._oz[e],s=((r.z-i.z)*(a-i.x)+(i.x-r.x)*(o-i.z))*g;if(s<-1e-6)continue;let c=((i.z-n.z)*(a-i.x)+(n.x-i.x)*(o-i.z))*g;if(c<-1e-6)continue;let l=1-s-c;if(l<-1e-6)continue;let u=s*n.y+c*r.y+l*i.y;u>this._pTop||u<this._pBot||u>this._best&&(this._best=u,this._bnx=d,this._bny=f,this._bnz=p,this._bkind=this.kindOf(t))}}resolveCapsule(e,t,n,r,i=3,a=!1){if(this.nContacts=0,this.ceiling=!1,this.lifted=!1,this.ladder=!1,!this.bvh)return!1;this._r=t,this._grounded=a;let o=this._seg,s=!1;for(let a=0;a<i;a++){o.start.set(e.x,e.y+n+t,e.z),o.end.set(e.x,e.y+r-t,e.z);let i=o.start.x,a=o.start.y,c=o.start.z;if(this._box.min.set(e.x-t,e.y+n,e.z-t),this._box.max.set(e.x+t,e.y+r,e.z+t),this._hit=!1,this.bvh.shapecast(this._capsuleCB),!this._hit)break;s=!0,e.x+=o.start.x-i,e.y+=o.start.y-a,e.z+=o.start.z-c}return s}_capsuleTri(e,t){let n=this._seg,r=this._r,i=e.closestPointToSegment(n,this._triPt,this._capPt);if(i>=r)return;let a,o,s;if(i>1e-5)a=(this._capPt.x-this._triPt.x)/i,o=(this._capPt.y-this._triPt.y)/i,s=(this._capPt.z-this._triPt.z)/i;else{let t=e.a,n=e.b,r=e.c,i=n.x-t.x,c=n.y-t.y,l=n.z-t.z,u=r.x-t.x,d=r.y-t.y,f=r.z-t.z;a=c*f-l*d,o=l*u-i*f,s=i*d-c*u;let p=Math.sqrt(a*a+o*o+s*s)||1;a/=p,o/=p,s/=p}let c=r-i;this._hit=!0;let l=this.kindOf(t);if(o<-.4){this.ceiling=!0;let e=Math.sqrt(a*a+s*s);if(!this._grounded||e<.1){let e=Math.min(c/-o,c*2.5);n.start.y-=e,n.end.y-=e;return}}if(o>.8){let e=Math.min(c/o,c*1.5);n.start.y+=e,n.end.y+=e,this.lifted=!0;return}let u=Math.sqrt(a*a+s*s);if(u<1e-4)return;let d=a/u,f=s/u,p=Math.min(c/u,c*(o<-.4?4:2.5));n.start.x+=d*p,n.start.z+=f*p,n.end.x+=d*p,n.end.z+=f*p,this.nContacts<16&&(this.contacts[this.nContacts*2]=d,this.contacts[this.nContacts*2+1]=f,this.nContacts++),(l===$o.ladder||l===$o.walk&&this._isLadderFace(e))&&(this.ladder=!0,this.ladderNx=d,this.ladderNz=f)}_isLadderFace(e){let t=e.a,n=e.b,r=e.c,i=n.x-t.x,a=n.y-t.y,o=n.z-t.z,s=r.x-t.x,c=r.y-t.y,l=r.z-t.z,u=a*l-o*c,d=o*s-i*l,f=i*c-a*s,p=Math.sqrt(u*u+d*d+f*f);if(p<1e-12||Math.abs(d/p)>.35)return!1;let m=Math.min(t.y,n.y,r.y),h=Math.max(t.y,n.y,r.y)-m;return h<1?!1:h>1.6*Math.max(Math.hypot(n.x-t.x,n.z-t.z),Math.hypot(r.x-t.x,r.z-t.z),Math.hypot(r.x-n.x,r.z-n.z))}overlaps(e,t,n,r,i,a){return this.bvh?(this._r=r,this._seg.start.set(e,t+i+r,n),this._seg.end.set(e,t+a-r,n),this._box.min.set(e-r,t+i,n-r),this._box.max.set(e+r,t+a,n+r),this._overlapHit=!1,this.bvh.shapecast(this._overlapCB),this._overlapHit):!1}},as=.085,os=250,ss=[`KeyW`,`ArrowUp`],cs=[`KeyS`,`ArrowDown`],ls=[`KeyA`,`ArrowLeft`],us=[`KeyD`,`ArrowRight`],ds=[`ShiftLeft`,`ShiftRight`],fs=[`Space`],ps=[`KeyC`,`ControlLeft`,`ControlRight`],ms=new Set([`Space`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`]),hs=class{constructor(e,{allowLock:t=!0}={}){this.canvas=e,this.allowLock=t,this.enabled=!1,this.locked=!1,this.lockFailed=!1,this.keys=new Set,this.onLook=null,this.onFlight=null,this.state={fwd:0,strafe:0,sprint:!1,jump:!1,jumpEdge:!1,dive:!1},this._jumpWas=!1,this._drag=!1,this.paused=document.getElementById(`paused`),this._pending=!1,document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===e,this._pending=!1,this.locked||this.keys.clear(),this._syncOverlay()}),document.addEventListener(`pointerlockerror`,()=>{this._pending=!1,this._lockErrors=(this._lockErrors||0)+1,this._lockErrors>=2&&(this.lockFailed=!0),this._syncOverlay()});let n=e=>this.requestLock(e);e.addEventListener(`click`,n),this.paused?.addEventListener(`click`,n),document.addEventListener(`mousemove`,e=>{if(!this.enabled||!this.locked&&!(this.lockFailed&&this._drag))return;let t=e.movementX||0,n=e.movementY||0;Math.abs(t)>os||Math.abs(n)>os||this.onLook?.(t*as,n*as)}),e.addEventListener(`mousedown`,()=>{this._drag=!0}),window.addEventListener(`mouseup`,()=>{this._drag=!1}),window.addEventListener(`keydown`,e=>{this.enabled&&(ms.has(e.code)&&e.preventDefault(),this._active()&&(this.keys.add(e.code),e.code===`KeyF`&&e.isTrusted&&!e.repeat&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&this.onFlight?.(e.shiftKey)))}),window.addEventListener(`keyup`,e=>{this.keys.delete(e.code)}),window.addEventListener(`blur`,()=>this.keys.clear()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.keys.clear()})}_active(){return this.locked||this.lockFailed||!this.allowLock}_syncOverlay(){if(!this.paused)return;let e=this.enabled&&this.allowLock&&!this.locked&&!this.lockFailed&&!this._pending;this.paused.classList.toggle(`show`,e)}requestLock(e){if(!this.allowLock||!this.enabled||this.locked||e&&e.isTrusted===!1||!e&&navigator.userActivation&&!navigator.userActivation.isActive)return;let t=this.canvas;if(!t.requestPointerLock){this.lockFailed=!0,this._syncOverlay();return}this._pending=!0,clearTimeout(this._pendingTimer),this._pendingTimer=setTimeout(()=>{this._pending=!1,this._syncOverlay()},1500);try{let e=t.requestPointerLock();e&&typeof e.catch==`function`&&e.catch(()=>{this._pending=!1,this._syncOverlay()})}catch{this._pending=!1}this._syncOverlay()}setEnabled(e){this.enabled=e,e||this.keys.clear(),this._syncOverlay()}_any(e){for(let t=0;t<e.length;t++)if(this.keys.has(e[t]))return!0;return!1}poll(){let e=this.state,t=this._active()&&this.enabled;e.fwd=t?+!!this._any(ss)-!!this._any(cs):0,e.strafe=t?+!!this._any(us)-!!this._any(ls):0,e.sprint=t&&this._any(ds);let n=t&&this._any(fs);return e.jumpEdge=n&&!this._jumpWas,this._jumpWas=n,e.jump=n,e.dive=t&&this._any(ps),e}},gs=Math.PI/180,_s=0,vs={speed:8,fast:28,accel:3.2,decel:2.4,maxAccel:14,maxDecel:20,clearance:.3,softR:1150,hardR:1250,ceilSoft:300,ceilHard:380,carryMax:12},ys=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},bs=class{constructor(e){this.p=e,this.fastLatch=!1,this.fast=!1,this.falling=!1,this.toggles=0,this._hint=null,this._hintTimer=0,e.fly&&this.set(!0,!1,!0)}get on(){return!!this.p.fly}toggle(e=!1){this.p.capture||(this.p.fly?this.set(!1):this.set(!0,e))}set(e,t=!1,n=!1){let r=this.p;if(e){let e=r.fly;r.fly=!0,this.fastLatch=!!t,this.fast=!!t,this.falling=!1,r.mode=_s,r.grounded=!1,r.steep=!1,r.submerged=!1,r.jumpBuf=0,r.blockT=0,r.airT=0,e||this.toggles++,n||this._showHint(t?`Fast flight`:`Flight on`);return}if(!r.fly)return;r.fly=!1,this.fastLatch=!1,this.fast=!1,r.mode=_s,r.grounded=!1,r.steep=!1,r.jumped=!0,r.airT=0,r.jumpBuf=0,r.blockT=0,r.lastWalkY=r.pos.y;let i=r.vel,a=Math.hypot(i.x,i.z);a>vs.carryMax&&(i.x*=vs.carryMax/a,i.z*=vs.carryMax/a),this.falling=!0,this.toggles++,n||this._showHint(`Flight off`)}update(e,t){let n=this.p,r=n.pos,i=n.vel,a=vs,o=this.fastLatch||!!t.sprint;this.fast=o;let s=o?a.fast:a.speed,c=n.yaw*gs,l=n.pitch*gs,u=Math.cos(l),d=Math.sin(c)*u,f=Math.sin(l),p=-Math.cos(c)*u,m=Math.cos(c),h=Math.sin(c),g=+!!t.jump-!!t.dive,_=d*t.fwd+m*t.strafe,v=f*t.fwd+g,y=p*t.fwd+h*t.strafe,b=Math.sqrt(_*_+v*v+y*y);b>1&&(_/=b,v/=b,y/=b),_*=s,v*=s,y*=s;let x=b>.01,S=1-Math.exp(-(x?a.accel:a.decel)*e),C=(_-i.x)*S,w=(v-i.y)*S,T=(y-i.z)*S,E=Math.sqrt(C*C+w*w+T*T),D=(x?a.maxAccel:a.maxDecel)*e;if(E>D){let e=D/E;C*=e,w*=e,T*=e}i.x+=C,i.y+=w,i.z+=T,r.x+=i.x*e,r.y+=i.y*e,r.z+=i.z*e;let ee=n.q.terrain(r.x,r.z,null)+a.clearance;if(r.y<ee&&(r.y=ee,i.y<0&&(i.y=0)),r.y>a.ceilSoft){let t=ys(a.ceilSoft,a.ceilHard,r.y);i.y>0&&(i.y*=Math.exp(-t*10*e)),i.y-=t*4*e,r.y>a.ceilHard&&(r.y=a.ceilHard,i.y>0&&(i.y=0))}let O=Math.hypot(r.x,r.z);if(O>a.softR){let t=r.x/O,n=r.z/O,o=ys(a.softR,a.hardR,O),s=i.x*t+i.z*n;if(s>0){let r=s*Math.min(1,o*8*e);i.x-=t*r,i.z-=n*r}i.x-=t*o*6*e,i.z-=n*o*6*e,O>a.hardR&&(r.x=t*a.hardR,r.z=n*a.hardR)}if(!Number.isFinite(r.x+r.y+r.z)){i.set(0,0,0),n.respawn();return}n.mode=_s,n.grounded=!1,n.submerged=!1,n.time+=e;let k=n._surface(r.x,r.z);n.surfaceY=k,n.depthFeet=r.y<k&&n._inWater(r.x,r.z)?k-r.y:0}_showHint(e){if(!(typeof document>`u`||this.p.capture))try{let t=this._hint;if(!t){t=document.getElementById(`flight-hint`)||document.createElement(`div`),t.id=`flight-hint`,t.setAttribute(`aria-live`,`polite`),t.style.cssText=`position:fixed;left:50%;bottom:34px;transform:translateX(-50%);z-index:5;color:rgba(255,250,240,0.85);font:italic 15px 'Cormorant Garamond', Georgia, serif;text-shadow:0 1px 8px rgba(0,0,0,0.5);letter-spacing:0.04em;opacity:0;pointer-events:none;white-space:nowrap;`;let e=document.getElementById(`hint`);if(e){let n=getComputedStyle(e);n.font&&(t.style.font=n.font),n.color&&(t.style.color=n.color),n.textShadow&&(t.style.textShadow=n.textShadow),n.letterSpacing&&(t.style.letterSpacing=n.letterSpacing),n.bottom&&(t.style.bottom=n.bottom)}t.parentNode||document.body.appendChild(t),this._hint=t}document.getElementById(`hint`)?.classList.remove(`show`),t.textContent=e,t.style.transition=`opacity 0.25s ease`,t.style.opacity=`1`,clearTimeout(this._hintTimer),this._hintTimer=setTimeout(()=>{t.style.transition=`opacity 0.9s ease`,t.style.opacity=`0`},600)}catch{}}},xs=[`walk`,`swim`,`mantle`,`climb`],Ss=0,Cs=1;function ws(){let e=Array(32);for(let t=0;t<32;t++)e[t]={type:``,t:0,x:0,y:0,z:0,strength:0,seq:-1};return{mode:`walk`,flying:!1,fast:!1,feet:new M,vel:new M,speed:0,surfaceY:0,feetDepth:0,eyeDepth:-1.68,submerged:0,wading:!1,swimming:!1,diving:!1,grounded:!1,strokePhase:0,time:0,events:e,eventSeq:0,_wet:!1,_under:!1,_resync:!0,mute:!1,_pvx:0,_pvy:0,_pvz:0,_pGrounded:!0,_pFly:!1,_pMode:0}}function Ts(e,t,n,r,i,a,o){if(e.mute)return;let s=e.eventSeq,c=e.events[s%32];c.type=t,c.t=n,c.x=r,c.y=i,c.z=a,c.strength=o,c.seq=s,e.eventSeq=s+1}function Es(e,t){let n=e.fx;if(!n)return;let r=e.camera.position,i=e.active&&!e.capture,a=n.feet,o=n.vel;i?(a.copy(e.pos),o.copy(e.vel)):(a.set(r.x,r.y-e.eye,r.z),o.set(0,0,0)),n.speed=o.length(),n.time=e.time;let s=i&&!!e.fly;n.flying=s,n.fast=s&&!!e.flight?.fast,n.mode=s?`fly`:xs[e.mode]??`walk`,n.grounded=i&&!s&&e.grounded;let c=e._surface(a.x,a.z);n.surfaceY=c;let l=e._inWater(a.x,a.z);n.feetDepth=l?c-a.y:Math.min(c-a.y,-.001);let u=e._surface(r.x,r.z),d=e._inWater(r.x,r.z);n.eyeDepth=d?u-r.y:Math.min(u-r.y,-.001),n.submerged=e.G.uCameraUnderwater.value;let f=n._wet?l&&n.feetDepth>-.005:l&&n.feetDepth>.03,p=n._under?d&&n.eyeDepth>-.02:d&&n.eyeDepth>.04;if(n.diving=p,n.swimming=!s&&i&&e.mode===Cs&&!p,n.wading=!s&&i&&e.mode===Ss&&f&&!p,n._resync||!i)n._resync=!1;else{let t=e.time;if(f&&!n._wet){let r=Math.max(0,-Math.min(o.y,n._pvy));Ts(n,`enterWater`,t,a.x,c,a.z,r);let i=n._pFly||!n._pGrounded&&n._pMode===Ss,l=0;i&&(l=Math.max(Math.hypot(n._pvx,n._pvy,n._pvz),n.speed),l>1.5&&Ts(n,`jumpIn`,t,a.x,c,a.z,l)),e.feel?.onEnterWater(r,s?0:l)}else!f&&n._wet&&(Ts(n,`exitWater`,t,a.x,c,a.z,n.speed),e.feel?.onExitWater());p&&!n._under?Ts(n,`dive`,t,r.x,u,r.z,Math.max(0,-o.y)):!p&&n._under&&Ts(n,`surface`,t,r.x,u,r.z,Math.max(0,o.y));let i=e.flight;i&&i.falling&&!s&&(e.mode===Ss&&e.grounded?(i.falling=!1,Ts(n,`landFly`,t,a.x,a.y,a.z,Math.max(0,-n._pvy))):e.mode!==Ss&&(i.falling=!1))}n._wet=f,n._under=p,n._pvx=o.x,n._pvy=o.y,n._pvz=o.z,n._pGrounded=n.grounded||i&&!s&&e.mode!==Ss,n._pFly=s,n._pMode=e.mode}var Ds=Math.PI/180,Os=Math.PI*2,ks=0,As=1,Y={dipW:6.5,dipZeta:.5,dipPerImpact:.2,dipMaxV:2.3,floatKick:.35,buoyancy:.3,plungeBuoyancy:1.1,plungeTime:6,strokeHz:.55,strokeHzPerMs:.13,underHz:.45,underHzPerMs:.1,strokeBob:.022,strokeRoll:1,strokeSurge:.12,underBob:.012,underPitch:.6,underRoll:.3,wadeRoll:.5,wadeSway:.012,idleRoll:.3,idleHz:.32,diveTilt:7,diveTime:1.4,exitTime:1,exitSlow:.3,exitThud:.014,snapA:.06,snapS:.03,snapInner:.08,snapBand:.2,runSplash:4.2},js=(e,t,n)=>e<t?t:e>n?n:e,Ms=(e,t,n)=>{let r=js((n-e)/(t-e),0,1);return r*r*(3-2*r)},Ns=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r)),Ps=class{constructor(e){this.p=e,this.reset()}reset(){this.dip=0,this.dipV=0,this.strokePhase=0,this.strokeCount=0,this.strokeW=0,this.strokeMul=1,this.wadeW=0,this.idleT=0,this.tilt=0,this.diveT=0,this._wasDive=!1,this._plungeSub=!1,this.exitT=0,this.exitH=0,this.wetDepth=0,this.speedMul=1,this.plungeT=0,this.buoyancy=Y.buoyancy,this._stepIdx=null,this._prevMode=this.p.mode,this._prevFly=!!this.p.fly,this.roll=0,this.pitchOff=0,this.offY=0}onEnterWater(e,t){this.exitT=0,t>1.5&&(this.dipV-=Math.min(Y.dipMaxV,Y.dipPerImpact*t)),t>4&&(this.plungeT=Y.plungeTime,this._plungeSub=!1)}onExitWater(){this.exitH=js((this.wetDepth-.15)/.85,0,1),this.wetDepth=0,this.exitH>.05&&(this.exitT=Y.exitTime)}afterCamera(e){let t=this.p,n=t.camera,r=t.pos,i=t.vel,a=t.fx;if(!(e>0))return;let o=!!t.fly,s=!o&&t.mode===As,c=!o&&t.mode===ks,l=s&&t.submerged,u=Math.hypot(i.x,i.z),d=c?t.depthFeet:0,f=t.surfaceY;a?._wet&&(this.wetDepth=Math.max(this.wetDepth,s?1.2:d)),s&&this._prevMode!==As&&!this._prevFly&&(this.dipV-=Y.floatKick*js(.3+Math.abs(i.y)*.3,0,1)),this._prevMode=t.mode,this._prevFly=o;let p=Y.dipW;this.dipV+=(-this.dip*p*p-2*Y.dipZeta*p*this.dipV)*e,this.dip+=this.dipV*e,Math.abs(this.dip)<1e-5&&Math.abs(this.dipV)<1e-4&&(this.dip=0,this.dipV=0);let m=t._sim??t.input?.state,h=!!m&&(Math.abs(m.fwd)>.1||Math.abs(m.strafe)>.1||l&&(m.jump||m.dive));this.plungeT>0&&(l&&(this._plungeSub=!0),this.plungeT=h||this._plungeSub&&!l||o?0:Math.max(0,this.plungeT-e)),this.buoyancy=this.plungeT>0?Y.plungeBuoyancy:Y.buoyancy;let g=l?Math.sqrt(u*u+i.y*i.y):u;if(this.strokeW=Ns(this.strokeW,s&&h?js(.3+g/1.5,0,1):0,3,e),this.strokeW>.02){this.strokeW<.1&&this.strokePhase<.5&&s&&h&&(this.strokePhase=Math.max(this.strokePhase,.8));let n=l?Y.underHz+Y.underHzPerMs*g:Y.strokeHz+Y.strokeHzPerMs*g;if(this.strokePhase+=n*e,this.strokePhase>=1&&(this.strokePhase-=Math.floor(this.strokePhase),this.strokeCount++,s&&this.strokeW>.3)){let e=r.y+t.eye;Ts(a,`stroke`,t.time,r.x,e<f-.05?e:f,r.z,g)}}let _=this.strokeCount+this.strokePhase,v=this.strokeW;this.strokeMul=1+(s?v*Y.strokeSurge*Math.cos(Os*(this.strokePhase-.25)):0);let y=0,b=0,x=0,S=0;if(s&&(l?(y+=v*Y.underBob*Math.sin(Os*_),S+=v*Y.underPitch*Math.sin(Os*_+1),x+=v*Y.underRoll*Math.sin(Math.PI*_)):(y+=v*Y.strokeBob*Math.sin(Os*_-.6),x+=v*Y.strokeRoll*Math.sin(Math.PI*_))),this.idleT+=e,this.wadeW=Ns(this.wadeW,c&&t.grounded&&a?._wet?js((d-.08)/.8,0,1):0,3,e),this.wadeW>.001){let e=js(u/1.5,0,1),n=Math.sin(t.bobPhase);x+=this.wadeW*(Y.wadeRoll*e*n+Y.idleRoll*(1-e)*Math.sin(Os*Y.idleHz*this.idleT)),b+=this.wadeW*Y.wadeSway*e*n}if(c&&t.grounded){let e=Math.floor(t.bobPhase/Math.PI);this._stepIdx===null?this._stepIdx=e:e!==this._stepIdx&&(this._stepIdx=e,a?._wet&&d>.02&&(Ts(a,`wadeStep`,t.time,r.x,f,r.z,d),u>Y.runSplash&&d<.75&&Ts(a,`splashRun`,t.time,r.x,f,r.z,u)))}if(this.exitT>0){this.exitT=Math.max(0,this.exitT-e);let n=Ms(0,1,this.exitT/Y.exitTime)*this.exitH;if(this.speedMul=1-Y.exitSlow*n,c&&t.grounded){let e=1-Math.abs(Math.sin(t.bobPhase));y-=Y.exitThud*n*e*e*e*t.bobW}}else this.speedMul=1;let C=l&&!!m?.dive;C&&!this._wasDive&&t.pos.y+t.eye>f-1.2&&(this.diveT=Y.diveTime),this._wasDive=C,this.diveT>0&&(this.diveT-=e);let w=C&&this.diveT>0&&i.y<-.15?-Y.diveTilt*js(-i.y/1.6,0,1):0;this.tilt=Ns(this.tilt,w,2.5,e),S+=this.tilt,this.roll=x,this.pitchOff=S,this.offY=y+this.dip;let T=n.position,E=t.yaw*Ds;T.x+=Math.cos(E)*b,T.z+=Math.sin(E)*b,T.y+=this.offY;let D=T.y-f;D>-Y.snapBand&&D<Y.snapBand&&t._inWater(T.x,T.z)&&(T.y=f+D+Y.snapA*Math.tanh(D/Y.snapS)*(1-Ms(Y.snapInner,Y.snapBand,Math.abs(D)))),(Math.abs(x)>1e-4||Math.abs(S)>1e-4)&&(n.rotation.order=`YXZ`,n.rotation.set(js(t.pitch+S,-89,89)*Ds,-t.yaw*Ds,x*Ds)),n.updateMatrixWorld(),a&&(a.strokePhase=this.strokePhase)}},Fs=Math.PI/180,Is=0,Ls=1,Rs=2,zs=3,Bs=[`walk`,`swim`,`mantle`,`climb`],Vs=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Hs=(e,t,n)=>e<t?t:e>n?n:e,Us=e=>e.ny>=(e.kind===$o.walk&&!e.terrain?X.walkSlopeCos:X.slopeCos),X={stepH:.35,walk:3.2,sprint:6.5,accel:10,decel:12,airAccel:1.4,jumpH:1.1,gravity:17,maxFall:40,slopeCos:Math.cos(46*Fs),walkSlopeCos:Math.cos(62*Fs),snapDown:.45,maxSub:1/120,wadeStart:.3,swimEye:.25,swimSpeed:1.55,swimSprint:2.5,swimVert:1.6,swimAccel:2.8,floatK:16,floatC:7.5,climbReach:1.3,waterClimb:1.55,ladderSpeed:1.7,softR:1200,hardR:1260},Ws=class{constructor(e,t={}){this.ctx=e,this.camera=e.camera,this.params=e.params,this.layout=e.layout,this.G=e.G,this.capture=!!e.params.capture,this.testMode=e.params.has(`playertest`),this.fly=!!e.params.fly,this.active=!1,this.time=0;let n=e.layout.PLAYER;this.radius=n.radius??.32,this.height=n.height??1.8,this.eye=n.eyeHeight??1.68,this.jumpV=Math.sqrt(2*X.gravity*X.jumpH),this.q=new is({collision:e.collision,hf:e.hf,kinds:t.kinds});let r=e.registry?.get(`water`);this._waterSurfaceFn=typeof r?.surfaceAt==`function`?r.surfaceAt.bind(r):null,this._plunge=(e.layout.WATERFALLS||[]).map(e=>[e.pool[0],e.pool[2],(e.plungeR||4)*1.6]),this.pos=new M,this.vel=new M,this.mode=Is,this.grounded=!1,this.steep=!1,this.submerged=!1,this.lastWalkY=0,this.gnx=0,this.gny=1,this.gnz=0,this.depthFeet=0,this.surfaceY=e.G.uWaterLevel.value,this.blockT=0,this.airT=0,this.jumpBuf=0,this.jumped=!1,this.mantleCool=0,this.ladderLost=0,this.ladNx=0,this.ladNz=0,this.mantle={t:0,dur:1,x0:0,y0:0,z0:0,x1:0,y1:0,z1:0},this.stats={substeps:0,mantles:0,respawns:0,minClearance:1/0};let i=Qa(this.camera);this.yaw=i.yaw,this.pitch=i.pitch,this.baseFov=this.camera.fov,this.fov=this.camera.fov,this.camStep=0,this.dip=0,this.dipV=0,this.bobPhase=0,this.bobW=0,this.sprinting=!1,this.input=null,this.capture||(this.input=new hs(e.renderer.domElement,{allowLock:!this.testMode}),this.input.onLook=(e,t)=>{this.yaw=(this.yaw+e)%360,this.pitch=Hs(this.pitch-t,-88,88)}),this._sim=null,this._simState={fwd:0,strafe:0,sprint:!1,jump:!1,jumpEdge:!1,dive:!1},this._simJumpWas=!1,this.fx=ws(),this.feel=new Ps(this),this.flight=new bs(this),this.input&&(this.input.onFlight=e=>this.flight.toggle(e))}start({lock:e=!1}={}){if(!this.capture){if(this.active=!0,this.input?.setEnabled(!0),this.params.view||this.params.cam){let e=this.camera.position;this.teleport(e.x,e.y-this.eye,e.z,this.yaw,this.pitch)}else this.respawn();e&&this.input?.requestLock(null)}}respawn(){let e=this.layout.PLAYER.spawn,t=this.q.terrain(e.x,e.z),n=this.q.probe(e.x,e.z,t+2.5,t-.5);this.teleport(e.x,n>-1/0?n:t,e.z,e.yawDeg,e.pitchDeg),this.stats.respawns++}teleport(e,t,n,r=this.yaw,i=this.pitch){this.pos.set(e,t,n),this.vel.set(0,0,0),this.yaw=r,this.pitch=i,this.mode=Is,this.submerged=!1,this.jumped=!1,this.jumpBuf=0,this.airT=0,this.blockT=0,this.camStep=0,this.dip=0,this.dipV=0,this.bobW=0;let a=this.q.probe(e,n,t+.5,t-.5);this.grounded=a>-1/0,this.grounded&&(this.pos.y=a),this.lastWalkY=this.pos.y,this.surfaceY=this._surface(e,n);let o=this.surfaceY+X.swimEye-this.eye;this.pos.y<o-.07&&this._inWater(e,n)&&(this.mode=Ls,this.grounded=!1),this.fx&&(this.fx._resync=!0,this.feel.reset()),this._updateCamera(0)}update(e,t){if(this.capture||!this.active){this._writeUnderwater(e,!0),Es(this,e);return}let n=this._sim??this.input.poll();if(this.fly)this._fly(e,n);else{let t=Math.max(1,Math.ceil(e/X.maxSub-1e-6)),r=e/t,i=this.pos;this.surfaceY=this._surface(i.x,i.z);for(let e=0;e<t;e++)this._substep(r,n,n.jumpEdge&&e===0),this.time+=r;this.stats.substeps+=t,this._bounds(e)}this._updateCamera(e),this.feel.afterCamera(e),this._writeUnderwater(e,!1),Es(this,e)}_substep(e,t,n){if(this.mantleCool>0&&(this.mantleCool-=e),this.mode===Rs){this._stepMantle(e);return}let r=this.yaw*Fs,i=Math.sin(r),a=-Math.cos(r),o=Math.cos(r),s=Math.sin(r),c=i*t.fwd+o*t.strafe,l=a*t.fwd+s*t.strafe,u=Math.sqrt(c*c+l*l);u>1&&(c/=u,l/=u,u=1),this.mode===Ls?this._stepSwim(e,t,c,l,u,i,a,o,s):this.mode===zs?this._stepClimb(e,t,n):this._stepWalk(e,t,c,l,u,n)}_stepWalk(e,t,n,r,i,a){let o=this.pos,s=this.vel,c=this.q,l=X,u=this.surfaceY,d=o.y<u&&this._inWater(o.x,o.z)?u-o.y:0;this.depthFeet=d;let f=Hs((d-l.wadeStart)/.9,0,1),p=1-.6*f*(2-f);this.sprinting=t.sprint&&i>.1&&t.fwd>=0;let m=(this.sprinting?l.sprint:l.walk)*p*this.feel.speedMul,h;h=this.grounded&&!this.steep?i>.01?l.accel:l.decel:this.grounded?.6:l.airAccel;let g=1-Math.exp(-h*e);s.x+=(n*m-s.x)*g,s.z+=(r*m-s.z)*g,this.jumpBuf=a?.12:Math.max(0,this.jumpBuf-e);let _=!this.grounded&&!this.jumped&&this.airT<.12&&s.y<=.5;if(this.jumpBuf>0&&(this.grounded&&!this.steep||_)){if(this.jumpBuf=0,this.grounded&&i>.3&&this._pushingWall(n,r)&&this._tryMantle(n/i,r/i,l.climbReach))return;s.y=this.jumpV*(d>.6?.5:1),this.grounded=!1,this.jumped=!0,this.airT=0}if(!this.grounded)s.y-=l.gravity*e,d>0&&(s.y*=Math.exp(-2.4*Math.min(1,d/1.2)*e)),s.y<-l.maxFall&&(s.y=-l.maxFall),this.airT+=e;else if(this.steep){let t=Math.hypot(this.gnx,this.gnz)||1,n=l.gravity*Math.sqrt(Math.max(0,1-this.gny*this.gny))*.8;s.x+=this.gnx/t*n*e,s.z+=this.gnz/t*n*e}let v=o.x,y=o.y,b=o.z;o.x+=s.x*e,o.z+=s.z*e,this._collideBody(s),o.y+=s.y*e;let x=this.grounded,S=s.y>.5?o.y+.02:Math.max(y,o.y)+l.stepH,C=o.y-(x&&s.y<=0?l.snapDown:0)-.001,w=c.probe(o.x,o.z,S,C);this._blocked(w,y,S)&&(this._clipUphill(v,b),w=c.probe(o.x,o.z,S,C),this._blocked(w,y,S)&&(o.x=v,o.z=b,w=c.probe(o.x,o.z,S,C)));let T=c.sup;if(w>-1/0?(x?Math.abs(w-y)>.03&&(this.camStep+=w-y):this._land(-s.y),o.y=w,s.y<0&&(s.y=0),this.grounded=!0,this.gnx=T.nx,this.gny=T.ny,this.gnz=T.nz,this.steep=!Us(T),this.steep||(this.lastWalkY=o.y),this.airT=0,this.jumped=!1):(this.grounded=!1,this.steep=!1,this.lastWalkY=o.y),this._terrainSafety(),i>.3&&t.fwd>0){if(this.blockT+=e,!this.grounded&&t.jump&&s.y<3&&this._pushingWall(n,r)&&this._tryMantle(n/i,r/i,l.climbReach-.2)||d>.45&&this.blockT>.3&&this._climbTick(e)&&this._tryMantle(n/i,r/i,Math.max(l.climbReach,u+l.waterClimb-o.y),.5))return}else this.blockT=0;if(this.q.ladder&&t.fwd>.3&&n*this.q.ladderNx+r*this.q.ladderNz<-.4*i){this._enterClimb();return}if(o.y<u){let e=u+l.swimEye-this.eye;o.y<e-.07&&this._inWater(o.x,o.z)&&(this.mode=Ls,this.grounded=!1,this.submerged=o.y+this.eye<u-.6)}}_blocked(e,t,n){let r=this.q,i=X;return r.terrain(this.pos.x,this.pos.z,null)>n+.001?(r.terrain(this.pos.x,this.pos.z,r._tn),r.sup.nx=r._tn.x,r.sup.ny=r._tn.y,r.sup.nz=r._tn.z,!0):e===-1/0||e-t<=.01||Us(r.sup)?!1:e-this.lastWalkY>i.stepH}_clipUphill(e,t){let n=this.pos,r=this.vel,i=this.q.sup,a=-i.nx,o=-i.nz,s=Math.hypot(a,o);if(s<1e-4){n.x=e,n.z=t;return}a/=s,o/=s;let c=(n.x-e)*a+(n.z-t)*o;c>0&&(n.x-=a*c,n.z-=o*c);let l=r.x*a+r.z*o;l>0&&(r.x-=a*l,r.z-=o*l)}_terrainSafety(){let e=this.pos,t=this.q.terrain(e.x,e.z,null);e.y<t-.02&&(e.y=t,this.vel.y<0&&(this.vel.y=0),this.mode===Is&&(this.grounded=!0))}_land(e){e>2.5&&(this.dipV-=Math.min(1.6,(e-2)*.16))}_collideBody(e){let t=this.q;t.resolveCapsule(this.pos,this.radius,X.stepH,this.height,3,this.grounded&&this.mode===Is);for(let n=0;n<t.nContacts;n++){let r=t.contacts[n*2],i=t.contacts[n*2+1],a=e.x*r+e.z*i;a<0&&(e.x-=r*a,e.z-=i*a)}t.ceiling&&e.y>0&&(e.y=0),t.lifted&&e.y<0&&(e.y=0)}_pushingWall(e,t){let n=this.q,r=Math.hypot(e,t)||1;for(let i=0;i<n.nContacts;i++)if((n.contacts[i*2]*e+n.contacts[i*2+1]*t)/r<-.55)return!0;return!1}_stepSwim(e,t,n,r,i,a,o,s,c){let l=this.pos,u=this.vel,d=this.q,f=X,p=this.surfaceY;if(!this._inWater(l.x,l.z)||l.y>p){this.mode=Is,this.grounded=!1,this.submerged=!1;return}let m=p+f.swimEye-this.eye,h=l.y+this.eye;this.depthFeet=p-l.y,this.sprinting=!1,t.dive||h<p-.6?this.submerged=!0:h>p-.22&&u.y>-.3&&(this.submerged=!1);let g=(t.sprint?f.swimSprint:f.swimSpeed)*this.feel.strokeMul,_,v=0,y;if(this.submerged){let e=this.pitch*Fs,n=Math.cos(e),r=Math.sin(e);_=a*n*t.fwd+s*t.strafe,y=o*n*t.fwd+c*t.strafe,v=r*t.fwd;let i=Math.sqrt(_*_+v*v+y*y);i>1&&(_/=i,v/=i,y/=i),_*=g,v*=g,y*=g,t.jump&&(v+=f.swimVert),t.dive&&(v-=f.swimVert),!t.jump&&!t.dive&&Math.abs(t.fwd)<.1&&(v+=this.feel.buoyancy)}else _=n*g,y=r*g,t.fwd>.1&&this.pitch<-40&&(this.submerged=!0,v=Math.sin(this.pitch*Fs)*g*t.fwd);let b=1-Math.exp(-f.swimAccel*e);if(u.x+=(_-u.x)*b,u.z+=(y-u.z)*b,this.submerged)u.y+=(v-u.y)*(1-Math.exp(-2.6*e));else{let n=m+(.028*Math.sin(this.time*1.35)+.012*Math.sin(this.time*2.7+1.3))+(t.jump?.1:0);u.y+=((n-l.y)*f.floatK-u.y*f.floatC)*e}l.x+=u.x*e,l.z+=u.z*e,this._collideBody(u),l.y+=u.y*e,l.y>m+.35&&(l.y=m+.35,u.y>0&&(u.y=0));let x=d.probe(l.x,l.z,l.y+f.stepH,l.y-.001);if(x>-1/0&&(l.y<x&&(l.y=x,u.y<0&&(u.y=0)),x>=m)){this.mode=Is,this.grounded=!0,this.submerged=!1,this.gnx=d.sup.nx,this.gny=d.sup.ny,this.gnz=d.sup.nz,this.steep=!Us(d.sup),this.lastWalkY=l.y,u.y=0;return}if(this._terrainSafety(),!this.submerged&&i>.3&&t.fwd>.3){if(this.blockT+=e,this.blockT>.15&&this._climbTick(e)&&this._tryMantle(n/i,r/i,p+f.waterClimb-l.y,p+.15-l.y))return}else this.blockT=0;d.ladder&&t.fwd>.3&&n*d.ladderNx+r*d.ladderNz<-.4*i&&this._enterClimb()}_climbTick(e){return this._climbAcc=(this._climbAcc||0)+e,this._climbAcc<1/15?!1:(this._climbAcc=0,!0)}_tryMantle(e,t,n,r=.3){if(this.mantleCool>0)return!1;let i=this.pos,a=this.q,o=this.radius,s=o+.42,c=i.x+e*s,l=i.z+t*s,u=a.probe(c,l,i.y+n,i.y+r,!1);if(u===-1/0||!Us(a.sup)||a.probe(c+e*.3,l+t*.3,u+.3,u-.35,!1)===-1/0||a.overlaps(c,u,l,o,.06,this.height)||a.overlaps(i.x,u,i.z,o*.85,.06,this.height)||a.overlaps((i.x+c)*.5,u,(i.z+l)*.5,o*.85,.06,this.height))return!1;let d=this.mantle;return d.t=0,d.x0=i.x,d.y0=i.y,d.z0=i.z,d.x1=c,d.y1=u,d.z1=l,d.dur=.5+.45*Hs((u-i.y)/2.2,0,1),this.mode=Rs,this.vel.set(0,0,0),this.submerged=!1,this.stats.mantles++,!0}_stepMantle(e){let t=this.pos,n=this.mantle;n.t+=e;let r=Math.min(1,n.t/n.dur),i=Vs(0,.62,r),a=Vs(.38,1,r);t.x=n.x0+(n.x1-n.x0)*a,t.z=n.z0+(n.z1-n.z0)*a,t.y=n.y0+(n.y1+.02-n.y0)*i,r>=1&&(t.set(n.x1,n.y1,n.z1),this.mode=Is,this.grounded=!0,this.steep=!1,this.lastWalkY=n.y1,this.vel.set(0,0,0),this.mantleCool=.35,this.camStep=0)}_enterClimb(){this.mode=zs,this.ladNx=this.q.ladderNx,this.ladNz=this.q.ladderNz,this.vel.set(0,0,0),this.ladderLost=0,this.grounded=!1,this.submerged=!1}_stepClimb(e,t,n){let r=this.pos,i=this.vel,a=this.q,o=X,s=0;if(t.fwd>.3||t.jump?s=o.ladderSpeed:(t.fwd<-.3||t.dive)&&(s=-o.ladderSpeed),n&&t.fwd<=.3){this.mode=Is,i.set(this.ladNx*2.5,3,this.ladNz*2.5);return}if(i.set(-this.ladNx*.5,s,-this.ladNz*.5),r.x+=i.x*e,r.z+=i.z*e,this._collideBody(i),r.y+=s*e,a.ceiling&&s>0&&(r.y-=s*e),a.ladder?(this.ladderLost=0,this.ladNx=a.ladderNx,this.ladNz=a.ladderNz):(this.ladderLost+=e,s>0&&(r.y-=s*e)),s>0&&this._tryMantle(-this.ladNx,-this.ladNz,1.4,.1))return;let c=a.probe(r.x,r.z,r.y+.05,r.y-.05);if(c>-1/0&&s<=0){r.y=Math.max(r.y,c),this.mode=Is,this.grounded=!0,this.lastWalkY=r.y;return}this.ladderLost>.25&&(this.mode=Is,this.grounded=!1,i.set(0,0,0)),this._terrainSafety();let l=this.surfaceY;r.y<l+X.swimEye-this.eye-.07&&this._inWater(r.x,r.z)&&(this.mode=Ls)}_fly(e,t){this.flight.update(e,t)}_bounds(e){let t=this.pos,n=this.vel,r=X;if(!Number.isFinite(t.x+t.y+t.z)||t.y<-30){this.respawn();return}let i=Math.hypot(t.x,t.z);if(i>r.hardR+200){this.respawn();return}if(i>r.softR){let a=t.x/i,o=t.z/i,s=n.x*a+n.z*o,c=Vs(r.softR,r.hardR,i);s>0&&(n.x-=a*s*c,n.z-=o*s*c),n.x-=a*c*3*e*10,n.z-=o*c*3*e*10,i>r.hardR&&(t.x=a*r.hardR,t.z=o*r.hardR)}}_updateCamera(e){let t=this.camera,n=this.pos,r=this.vel,i=X,a=Math.exp(-e*11);this.camStep=Hs(this.camStep*a,-.6,.6),Math.abs(this.camStep)<1e-4&&(this.camStep=0),this.dipV+=(-this.dip*110-this.dipV*21)*e,this.dip+=this.dipV*e;let o=Math.hypot(r.x,r.z),s=this.mode===Is&&this.grounded&&!this.fly,c=s?Hs(o/i.walk,0,1.3):0;this.bobW+=(c-this.bobW)*(1-Math.exp(-e*7));let l=Hs((o-i.walk)/(i.sprint-i.walk),0,1),u=.72+.26*l;s&&(this.bobPhase+=o*e/u*Math.PI);let d=(.024+.014*l)*this.bobW,f=(Math.abs(Math.sin(this.bobPhase))-.6366)*d*1.5,p=Math.sin(this.bobPhase)*.01*this.bobW,m=this.yaw*Fs,h=Math.cos(m),g=Math.sin(m);t.position.set(n.x+h*p,n.y+this.eye-this.camStep+this.dip+f,n.z+g*p);let _=this.baseFov+(this.sprinting&&o>i.walk+.8&&this.grounded?3.5:0);this.fov+=(_-this.fov)*(1-Math.exp(-e*4)),Math.abs(t.fov-this.fov)>.01&&(t.fov=this.fov,t.updateProjectionMatrix()),Xa(t,this.yaw,this.pitch),t.updateMatrixWorld()}_surface(e,t){return this._waterSurfaceFn?this._waterSurfaceFn(e,t):this.G.uWaterLevel.value}_inWater(e,t){let n=this._surface(e,t);if(this.q.terrain(e,t,null)>=n-.01)return!1;if(this.ctx.hf.lagoonSDF(e,t)<8)return!0;for(let n=0;n<this._plunge.length;n++){let r=this._plunge[n],i=e-r[0],a=t-r[1];if(i*i+a*a<r[2]*r[2])return!0}return!1}_writeUnderwater(e,t){let n=this.camera.position,r=this._surface(n.x,n.z),i=0;n.y<r+.06&&this._inWater(n.x,n.z)&&(i=Vs(-.03,.05,r-n.y));let a=this.G.uCameraUnderwater;t||!(e>0)?a.value=i:a.value+=(i-a.value)*(1-Math.exp(-e*30)),a.value<1e-4?a.value=0:a.value>.9999&&(a.value=1)}prewarm(){if(this.capture)return;let e=this.camera,t={p:e.position.clone(),q:e.quaternion.clone(),fov:e.fov},n=this.active;this.active=!0;let r=this.fly;this.fx.mute=!0;let i=this.layout.PLAYER.spawn;this.teleport(i.x,this.q.terrain(i.x,i.z),i.z,i.yawDeg,0),this.simulate([{fwd:1,n:20},{fwd:1,sprint:!0,n:20},{jump:!0,n:30},{strafe:1,n:10}]),this.teleport(-6,-1.43,8,0,0),this.simulate([{fwd:1,n:20},{dive:!0,n:20},{jump:!0,n:20}]),this._tryMantle(1,0,1.2),this.mode=Is,this.flight.set(!0,!1,!0),this.simulate([{fwd:1,sprint:!0,jump:!0,n:10}]),this.flight.set(!1,!1,!0),this.simulate([{n:5}]),this.flight.set(r,!1,!0),this.flight.falling=!1,this.fx.mute=!1,this.fx._resync=!0,this.feel.reset(),this.active=n,this.stats.substeps=0,this.stats.mantles=0,this.vel.set(0,0,0),e.position.copy(t.p),e.quaternion.copy(t.q),e.fov=t.fov,this.fov=t.fov,e.updateProjectionMatrix();let a=Qa(e);this.yaw=a.yaw,this.pitch=a.pitch,this.G.uCameraUnderwater.value=0}simulate(e){let t=this._simState;for(let n of e){let e=n.n??1,r=n.dt??1/60;n.yaw!=null&&(this.yaw=n.yaw),n.pitch!=null&&(this.pitch=n.pitch),t.fwd=n.fwd??0,t.strafe=n.strafe??0,t.sprint=!!n.sprint,t.dive=!!n.dive;let i=!!n.jump;for(let a=0;a<e;a++)t.jump=i,t.jumpEdge=i&&!this._simJumpWas,this._simJumpWas=i,this._sim=t,this.update(r,this.time),this._sim=null,n.onStep&&n.onStep(this)}return this.snapshot()}snapshot(){let e=this.pos;return{x:+e.x.toFixed(3),y:+e.y.toFixed(3),z:+e.z.toFixed(3),eye:+this.camera.position.y.toFixed(3),mode:Bs[this.mode],fly:this.fly,grounded:this.grounded,steep:this.steep,submerged:this.submerged,depthFeet:+this.depthFeet.toFixed(3),speed:+Math.hypot(this.vel.x,this.vel.z).toFixed(3),vy:+this.vel.y.toFixed(3),yaw:+this.yaw.toFixed(1),pitch:+this.pitch.toFixed(1),underwater:+this.G.uCameraUnderwater.value.toFixed(3),surfaceY:this.surfaceY}}},Gs=.85,Ks=class{constructor(e=!1){this.el=document.getElementById(`loader`),this.bar=document.getElementById(`loader-bar`),this.track=this.bar?.parentElement??null,this.label=document.getElementById(`loader-label`),this.gate=document.getElementById(`gate`),this.hint=document.getElementById(`hint`),this._p=0,this._pct=-1,this._ph={f0:0,f1:0,ms:0,t0:0},this._anim=null,this._shown=0,this.hidden=e,this.bar&&(this.bar.style.transition=`none`),e&&this.el?.classList.add(`gone`)}_current(){if(!this.bar)return this._p;let e=/matrix\(([-\d.e]+)/.exec(getComputedStyle(this.bar).transform||``);return e?Math.min(1,Math.max(0,+e[1])):this._shown}_animate(e,t,n){let r=this.bar;if(!r||this.hidden)return;let i=this._current();e=Math.max(i,e),t=Math.max(e,t);let a=e>i+1e-4?350:0,o=a+Math.max(0,n),s=[{transform:`scaleX(${i})`,offset:0}];if(a&&o>a&&s.push({transform:`scaleX(${e})`,offset:a/o,easing:`linear`}),s.push({transform:`scaleX(${o>a?t:e})`,offset:1}),s[0].easing=a?`ease-out`:`linear`,this._anim?.cancel(),o<=0){r.style.transform=`scaleX(${e})`,this._anim=null,this._shown=e;return}r.style.transform=`scaleX(${i})`;try{this._anim=r.animate(s,{duration:o,fill:`forwards`})}catch{r.style.transform=`scaleX(${e})`,this._anim=null}this._shown=o>a?t:e}_creepTarget(e){let{f0:t,f1:n,ms:r,t0:i}=this._ph,a=t+(n-t)*Gs;if(e>=a||r<=0)return{to:e,ms:0};let o=performance.now()-i,s=n>t?(e-t)/(n-t):1;return{to:a,ms:Math.max(r*(Gs-s),r*Gs-o,250)}}phase(e,t,n){this._ph={f0:e,f1:t,ms:n,t0:performance.now()};let r=Math.max(this._p,e);this._p=r;let i=this._creepTarget(r);this._animate(r,i.to,i.ms),this._aria(r)}progress(e,t){if(e=Math.min(1,e),t&&this.label&&this.label.textContent!==t&&(this.label.textContent=t),e<=this._p+.004)return;this._p=e;let n=this._creepTarget(e);this._animate(e,n.to,n.ms),this._aria(e)}_aria(e){let t=Math.round(e*100);t!==this._pct&&this.track&&(this._pct=t,this.track.setAttribute(`aria-valuenow`,String(t)))}hide(){this._anim?.cancel(),this.el?.classList.add(`gone`)}ready(e){this._ph={f0:1,f1:1,ms:0,t0:performance.now()},this._p=1,this._animate(1,1,0),this._aria(1),this.label&&(this.label.textContent=`Ready`),this.el?.classList.add(`done`),this.gate?.removeAttribute(`disabled`);let t=e=>!!(e&&e.closest&&e.closest(`.qs`));try{t(document.activeElement)||this.gate?.focus({preventScroll:!0})}catch{}let n=!1,r=i=>{i.isTrusted&&!n&&(i.type===`keydown`&&(i.repeat||i.key===`Escape`||i.key===`Tab`||i.metaKey||i.ctrlKey||i.altKey)||i.type===`keydown`&&t(i.target)||(n=!0,this.el?.classList.add(`gone`),window.removeEventListener(`keydown`,r),this.gate?.removeEventListener(`click`,r),e(),this.hint&&(this.hint.classList.add(`show`),setTimeout(()=>this.hint.classList.remove(`show`),7e3))))};this.gate?.addEventListener(`click`,r),window.addEventListener(`keydown`,r)}},qs=e=>e&&e[0].toUpperCase()+e.slice(1),Js=0;function Z(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n!=null&&(r.textContent=n),r}function Ys(e,{engine:t,quality:n,context:r=`loader`,scale:i=!0}={}){if(!e||!n)return null;let a=`qs${++Js}`,o=n.auto||{},s=n.choice||`auto`,c=o.tier||n.name,l=o.gpuShort||``,u=[`auto`,...Le],d=e=>e===`auto`?`Auto`:Re[e]?.label??qs(e),f=[qs(c),l].filter(Boolean).join(` · `),p=e=>e===`auto`?`Picks ${qs(c)} for ${l?`your ${l}`:`this device`}. Recommended.`:Re[e]?.note??``,m=Z(`div`,`qs qs--${r}`),h=Z(`button`,`qs-trigger`);h.type=`button`,h.setAttribute(`aria-haspopup`,`dialog`),h.setAttribute(`aria-expanded`,`false`),h.setAttribute(`aria-controls`,`${a}-panel`);let g=Z(`span`,`qs-k`,`Quality`),_=Z(`span`,`qs-v`),v=Z(`span`,`qs-chev`);v.setAttribute(`aria-hidden`,`true`),h.append(g,_,v);let y=Z(`div`,`qs-panel`);y.id=`${a}-panel`,y.setAttribute(`role`,`dialog`),y.setAttribute(`aria-label`,`Graphics settings`),y.hidden=!0;let b=Z(`div`,`qs-h`,`Quality`);b.id=`${a}-h`;let x=Z(`div`,`qs-list`);x.setAttribute(`role`,`radiogroup`),x.setAttribute(`aria-labelledby`,b.id);let S=u.map(e=>{let t=Z(`button`,`qs-opt`);t.type=`button`,t.dataset.choice=e,t.setAttribute(`role`,`radio`);let n=e===s;t.setAttribute(`aria-checked`,n?`true`:`false`),t.tabIndex=n?0:-1;let r=Z(`span`,`qs-dot`);r.setAttribute(`aria-hidden`,`true`);let i=Z(`span`,`qs-name`,d(e));t.append(r,i);let o=e===`auto`?f:e===c?`detected`:e===`cinematic`?`heavy`:``;return o&&t.append(Z(`span`,`qs-meta`,o)),t.setAttribute(`aria-describedby`,`${a}-note`),x.append(t),t}),C=Z(`p`,`qs-note`);C.id=`${a}-note`,C.setAttribute(`aria-live`,`polite`);let w=Z(`div`,`qs-scale`),T=Z(`label`,`qs-h qs-h--scale`,`Render scale`);T.htmlFor=`${a}-scale`;let E=Z(`input`,`qs-range`);E.type=`range`,E.id=`${a}-scale`,E.min=String(Ve),E.max=String(He),E.step=`0.05`;let D=Z(`output`,`qs-out`);D.htmlFor=E.id,w.append(T,E,D);let ee=Z(`p`,`qs-fine`,i?`Quality changes reload the village · render scale applies instantly`:`Choosing a quality reloads the village`);y.append(b,x,C,...i?[w]:[],ee),m.append(y,h),e.append(m);let O=!1,k=!1,te=()=>Ke(t?.renderScale??1),A=()=>{let e=s===`auto`?`Auto · ${f}`:d(s),t=te();_.textContent=Math.abs(t-1)>.001?`${e} · ${t.toFixed(2)}×`:e,h.setAttribute(`aria-label`,`Quality: ${_.textContent}. Open graphics settings`)},ne=()=>{let e=te();E.value=String(e);let n=t?.canvas,r=n&&n.width>0?` · ${n.width}×${n.height}`:``;D.value=`${e.toFixed(2)}×${r}`,D.textContent=D.value,E.setAttribute(`aria-valuetext`,`${e.toFixed(2)} times`);let i=(e-Ve)/(He-Ve);E.style.setProperty(`--f`,String(Math.min(1,Math.max(0,i))))},re=e=>{k||(C.textContent=p(e))},ie=(e,t=!0)=>{if(!k||e){if(O=e,y.hidden=!e,m.classList.toggle(`open`,e),h.setAttribute(`aria-expanded`,e?`true`:`false`),e){for(let e of S)e.tabIndex=e.getAttribute(`aria-checked`)===`true`?0:-1;ne(),A(),re(s),t&&(S.find(e=>e.tabIndex===0)??S[0]).focus({preventScroll:!0})}else t&&m.contains(document.activeElement)&&h.focus({preventScroll:!0})}},ae=e=>{if(k)return;let t=new URL(location.href),n=t.searchParams.has(`q`);if(e===s&&!n&&r!==`fatal`){ie(!1);return}let i=Ge(e);t.searchParams.delete(`q`),!i&&e!==`auto`&&t.searchParams.set(`q`,e),k=!0,m.classList.add(`busy`);for(let t of S)t.setAttribute(`aria-checked`,t.dataset.choice===e?`true`:`false`),t.disabled=!0;C.textContent=`Reloading the village in ${d(e)}${e===`auto`?` (${qs(c)})`:``}…`,setTimeout(()=>{t.href===location.href?location.reload():location.replace(t.href)},120)};h.addEventListener(`click`,()=>ie(!O));for(let e of S)e.addEventListener(`click`,()=>ae(e.dataset.choice)),e.addEventListener(`mouseenter`,()=>re(e.dataset.choice)),e.addEventListener(`focus`,()=>re(e.dataset.choice));x.addEventListener(`mouseleave`,()=>{let e=document.activeElement;re(e&&e.dataset?.choice?e.dataset.choice:s)}),x.addEventListener(`keydown`,e=>{let t=S.indexOf(document.activeElement);if(t<0)return;let n=-1;e.key===`ArrowDown`||e.key===`ArrowRight`?n=(t+1)%S.length:e.key===`ArrowUp`||e.key===`ArrowLeft`?n=(t-1+S.length)%S.length:e.key===`Home`?n=0:e.key===`End`&&(n=S.length-1),!(n<0)&&(e.preventDefault(),S[t].tabIndex=-1,S[n].tabIndex=0,S[n].focus({preventScroll:!0}))}),E.addEventListener(`input`,()=>{t?.setRenderScale&&t.setRenderScale(parseFloat(E.value)),ne(),A()}),E.addEventListener(`change`,()=>{Je(te()),A()}),m.addEventListener(`keydown`,e=>{document.pointerLockElement||(e.stopPropagation(),e.key===`Escape`&&O&&(e.preventDefault(),ie(!1)))}),m.addEventListener(`click`,e=>e.stopPropagation()),m.addEventListener(`mousedown`,e=>e.stopPropagation());let j=!1;return m.addEventListener(`pointerdown`,e=>{j=!0,e.stopPropagation()}),document.addEventListener(`click`,e=>{j&&!m.contains(e.target)&&(e.stopPropagation(),e.preventDefault()),j=!1},!0),document.addEventListener(`pointerup`,()=>{setTimeout(()=>{j=!1},0)},!0),document.addEventListener(`pointerdown`,e=>{O&&!m.contains(e.target)&&ie(!1,!1)},!0),document.addEventListener(`pointerlockchange`,()=>{if(!document.pointerLockElement){A();return}O&&ie(!1,!1),m.contains(document.activeElement)&&document.activeElement.blur()}),window.addEventListener(`resize`,()=>{O&&ne()}),A(),ne(),requestAnimationFrame(()=>m.classList.add(`in`)),{el:m,close:()=>ie(!1,!1),get open(){return O}}}var Xs=()=>new Promise(e=>requestAnimationFrame(()=>e())),Zs=()=>new Promise(e=>setTimeout(e,0)),Q=window.__lagoon={ready:!1,errors:[],modules:{},timings:{},timingsDetail:{},stats:null,viewNames:Object.keys(Ce)};function $(e,t){console.error(`[lagoon] ${e}:`,t),Q.errors.push({where:e,message:String(t?.stack||t)})}function Qs(e){if(P.capture||P.has(`playertest`))return;let t=document.getElementById(`fatal`);if(!t||!t.hidden)return;Q.fatal=e;try{Q.player?.input?.setEnabled(!1)}catch{}try{document.pointerLockElement&&document.exitPointerLock()}catch{}let n=Q.engine?.quality??null,r=!1;if(!n){let e=null;try{let t=document.createElement(`canvas`).getContext(`webgl2`);t?(e=Ye(t),t.getExtension(`WEBGL_lose_context`)?.loseContext()):r=!0}catch{r=!0}try{n=$e(e)}catch{n=null}}let i=n?Re[n.name]?.label??n.name:``,a=n&&n.rank>0?`, or choose a lower quality below`:``,o=document.getElementById(`fatal-msg`);o&&(o.textContent=r?`This browser could not start WebGL 2, which the village needs. Turn on hardware acceleration or try another browser, then reload.`:e===`lost`?`The graphics card ran out of memory or was reset${i?` while drawing ${i} quality`:``}. Reload${a}.`:`Something went wrong while building the village${i?` at ${i} quality`:``}. Reload${a}.`),document.getElementById(`loader`)?.classList.add(`gone`),document.getElementById(`paused`)?.classList.remove(`show`),t.hidden=!1;let s=document.getElementById(`fatal-reload`);s?.addEventListener(`click`,()=>location.reload());try{s?.focus({preventScroll:!0})}catch{}if(n&&!r)try{Ys(document.getElementById(`fatal-settings`),{engine:null,quality:n,context:`fatal`,scale:!1})}catch(e){console.error(`[lagoon] recovery menu:`,e)}}var $s={textures:2500,sky:2400,lighting:20,terrain:1200,water:700,rocks:1e3,trees:2200,architecture:2500,palms:2500,vegetation:2600,waterfalls:450,ambient:700,finalize:300,prewarm:4500},ec=`lagoon.bootTimings.v1`;function tc(e){try{return JSON.parse(localStorage.getItem(ec)||`{}`)[e]||null}catch{return null}}var nc={low:.55,medium:.75,high:.9,ultra:1,cinematic:1.35};function rc(e){for(let t of[`ultra`,`high`,`cinematic`,`medium`,`low`]){if(t===e)continue;let n=tc(t);if(!n)continue;let r=(nc[e]??1)/(nc[t]??1),i={};for(let e in n)typeof n[e]==`number`&&(i[e]=Math.round(n[e]*r));return i}return null}function ic(e,t){try{let n=JSON.parse(localStorage.getItem(ec)||`{}`);n[e]=t,localStorage.setItem(ec,JSON.stringify(n))}catch{}}async function ac(){let e=performance.now();Q.bootStart=e;let t=Q.timingsDetail,n=new Ks(P.capture),r=new Mn(document.getElementById(`app`)),{renderer:i,scene:a,camera:o,pipeline:s,quality:c}=r;if(Q.engine=r,Q.quality=c.name,Q.gpuName=r.gpu?.name??``,Q.autoTier=c.auto,Q.qualityChoice=c.choice,Q.parallelCompile=r.parallelCompile,r.canvas.addEventListener(`webglcontextlost`,()=>{Q.contextLost=!0,$(`webgl`,`context lost`),r.stop(),Qs(`lost`)}),!P.capture&&!P.has(`playertest`))try{Q.settings={loader:Ys(document.getElementById(`loader-settings`),{engine:r,quality:c,context:`loader`}),pause:Ys(document.getElementById(`pause-settings`),{engine:r,quality:c,context:`pause`})}}catch(e){$(`settings`,e)}let l=new qa(a),u=new Ja(a,o,c),d=new Lo(i,c),f=new Jo(d),p=new Map;P.cam?eo(o,P.cam,P.fov):eo(o,P.view??`spawn`,P.fov);let m=Qo.filter(e=>e.always?!0:P.only?P.only.includes(e.name):!P.skip.includes(e.name)),h=new Map(m.map(e=>[e.name,e.load().then(e=>({mod:e}),e=>({err:e}))])),g=tc(c.name)??rc(c.name),_=[`textures`,...m.map(e=>e.name),`finalize`,`prewarm`],v=e=>Math.max(20,g?.[e]??$s[e]??(m.find(t=>t.name===e)?.weight??2)*400),y=_.reduce((e,t)=>e+v(t),0),b=0,x=null,S=(e,t,r)=>{e!==x&&(x=e,n.phase(b/y,(b+v(e))/y,v(e))),n.progress((b+v(e)*Math.min(1,Math.max(0,t)))/y,r)},C=e=>{b+=v(e)},w=P.get(`prewarm`)!==`legacy`,T=new WeakSet,E=[],D=!m.some(e=>e.name===`lighting`),ee=()=>o.layers.mask|1<<et.WATER|1<<et.FX|1<<et.REFLECT_EXTRA,O=()=>{a.traverse(e=>{if(!T.has(e)){if(T.add(e),e.isLight){e.layers.enableAll();return}e.layers.mask&ee()&&(e.isMesh||e.isPoints||e.isLine||e.isSprite)&&e.material&&E.push(e)}})},k=w&&P.get(`spec`)!==`0`,te=()=>{if(!k||!D||!E.length)return;let e=performance.now(),n=E;E=[];for(let e of n){let t=Array.isArray(e.material)?e.material:[e.material];for(let e of t)e&&!e.userData?.noPatch&&tr(e)}try{r.compileObjects(n)}catch(e){$(`speculative compile`,e)}t.queueMs=(t.queueMs??0)+Math.round(performance.now()-e)};O();let A=performance.now();S(`textures`,0,`Weaving textures`);try{await d.generate((e,t)=>S(`textures`,e,`Weaving textures · ${t}`))}catch(e){$(`textures`,e)}Q.timings.textures=Math.round(performance.now()-A),C(`textures`);let ne={THREE:fe,engine:r,renderer:i,scene:a,camera:o,pipeline:s,quality:c,params:P,G:F,LAYERS:et,layout:Te,hf:Vt,tex:d,mats:f,collision:l,lanterns:u,registry:p,patchMaterial:tr,addMaterialHook:$n,addUpdate:(e,t)=>r.addUpdate(e,t),yieldFrame:Zs,progress:null};for(let e of m){let n=performance.now();ne.progress=(t,n)=>S(e.name,t,n??`Building ${e.name}`),ne.progress(0,`Building ${e.name}`),await Zs();try{let n=performance.now(),i=await h.get(e.name);if(i.err)throw i.err;let a=Math.round(performance.now()-n);a>4&&(t[e.name+`:importWait`]=a);let o=await i.mod.build(ne);o?.update&&r.addUpdate(o.update,o.order??0),p.set(e.name,o??{}),Q.modules[e.name]=`ok`}catch(t){$(`module ${e.name}`,t),Q.modules[e.name]=`error`}Q.timings[e.name]=Math.round(performance.now()-n);try{O(),e.name===`lighting`&&(D=!0),te()}catch(e){$(`adopt`,e)}C(e.name)}let re=performance.now();S(`finalize`,.2,`Settling the village`),await Zs();try{nr(a)}catch(e){$(`patchScene`,e)}let ie=P.get(`playertest`);if(ie===`mock`)try{await(await J(async()=>{let{buildTestCourse:e}=await import(`./testCourse-DoO9h4gw.js`);return{buildTestCourse:e}},[])).buildTestCourse(ne)}catch(e){$(`player test course`,e)}let ae=null;try{ae=es(l)}catch(e){$(`collider kinds`,e)}try{l.finalize()}catch(e){$(`collision`,e)}P.colliders&&o.layers.enable(et.COLLIDER),r.addUpdate((e,t)=>u.update(e,t),50),Q.registry=p,Q.collision=l;let j=null;try{j=new Ws(ne,{kinds:ae}),r.addUpdate((e,t)=>j.update(e,t),-10),Q.player=j,P.capture||j.prewarm()}catch(e){$(`player`,e)}D=!0,O(),te(),Q.timings.finalize=Math.round(performance.now()-re),C(`finalize`),S(`prewarm`,0,`Warming up the light`),await Zs();let oe=performance.now();try{w?await oc(r,p,e=>S(`prewarm`,e,`Warming up the light`),t):await sc(r,t)}catch(e){$(`prewarm`,e);try{await sc(r,t)}catch(e){$(`prewarm fallback`,e)}}if(Q.timings.prewarm=Math.round(performance.now()-oe),C(`prewarm`),Q.timings.total=Math.round(performance.now()-e),Q.programs=i.info.programs?.length??0,!Q.errors.length&&!P.only&&!P.skip.length&&ic(c.name,Q.timings),Q.goto=async(e,t=12)=>{let n=r.running;r.stop();let i=Q.player,a=i?.active;i&&(i.active=!1),typeof e==`string`&&e.includes(`,`)?eo(o,e.split(`,`).map(parseFloat)):eo(o,e);for(let e=0;e<t;e++)r.step(1/60),await Xs();i&&(i.active=a),(n||P.capture)&&r.start()},P.capture){P.cam?eo(o,P.cam,P.fov):P.view&&eo(o,P.view,P.fov);let e=P.num(`frames`,12);for(let t=0;t<e;t++)r.step(1/60),await Xs();Q.stats={...s.stats,programsAfter:i.info.programs?.length??0},n.hide(),Q.readyAt=performance.now(),Q.ready=!0,r.start();return}if(ie!==null){n.hide();try{j?.start({lock:!1});let{PlayerTest:e}=await J(async()=>{let{PlayerTest:e}=await import(`./playerTest-DuF0uUeG.js`);return{PlayerTest:e}},[]);j&&(j.test=new e(ne,j))}catch(e){$(`player test`,e)}Q.readyAt=performance.now(),Q.ready=!0;return}Q.fatal||n.ready(()=>{Q.fatal||(j?.start({lock:!0}),r.start())}),Q.readyAt=performance.now(),Q.ready=!0,P.debug&&J(()=>import(`./debug-Ddyy37ka.js`).then(e=>e.mountDebug(r,Q)),[]).catch(e=>$(`debug`,e))}async function oc(e,t,n,r){let{renderer:i}=e,a=(()=>{let e=performance.now();return t=>{let n=performance.now();r[t]=Math.round(n-e),e=n}})(),o=()=>i.info.programs.length;r.programsAtWarmStart=o(),r.readyAtWarmStart=o()-e.programsPending(),e.update(1/60),r.warmDraws=e.compileFrame(1/60).draws,r.programsQueued=o(),a(`capture`),n(.05),await e.waitForPrograms((e,t)=>n(.05+.65*(t?e/t:1))),a(`compileWait`),r.programsAfterCompile=o();let s=t.get(`lighting`);if(s?.update)for(let t=0;t<24;t++)s.update(1/60,e.time);let c=new Set(i.info.programs);e.drawAll(1/60),r.programsAfterFirstFrame=o();let l=i.info.programs.filter(e=>!c.has(e));l.length&&(Q.lateCompiles=l.map(e=>(e.name||`?`)+` | `+e.cacheKey.slice(0,40)+` … `+e.cacheKey.slice(-80))),a(`firstFrame`),n(.8),e.render(1/60),await Xs(),e.step(1/60),r.programsAfterSettle=o(),a(`settle`),n(.95),await e.gpuIdle(),a(`gpuIdle`),n(1)}async function sc(e,t){let{renderer:n,scene:r,camera:i,pipeline:a}=e,o=performance.now(),s=i.layers.mask;i.layers.enableAll(),n.setRenderTarget(a.opaqueRT),n.compileAsync?await n.compileAsync(r,i):n.compile(r,i),n.setRenderTarget(null),i.layers.mask=s,e.params.colliders||i.layers.disable(et.COLLIDER),t.compileWait=Math.round(performance.now()-o),t.programsAfterCompile=n.info.programs.length,o=performance.now();let c=[];r.traverse(e=>{e.frustumCulled&&=(c.push(e),!1)}),e.step(1/60);for(let e of c)e.frustumCulled=!0;t.firstFrame=Math.round(performance.now()-o),t.programsAfterFirstFrame=n.info.programs.length,o=performance.now();let l={p:i.position.clone(),q:i.quaternion.clone(),fov:i.fov};if(!e.params.capture)for(let t of[`hero`,`originDeck`,`aerial`])eo(i,t),e.step(1/60),await Xs();i.position.copy(l.p),i.quaternion.copy(l.q),i.fov=l.fov,i.updateProjectionMatrix(),t.views=Math.round(performance.now()-o)}ac().catch(e=>{$(`boot`,e);try{Qs(`boot`)}catch(e){console.error(`[lagoon] recovery screen:`,e)}});export{Ga as a,en as c,F as d,Qa as i,Mt as l,to as n,Ha as o,eo as r,Ut as s,J as t,it as u};