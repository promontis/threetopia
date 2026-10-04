const __vite__mapDeps = (i2, m2 = __vite__mapDeps, d2 = m2.f || (m2.f = ["assets/sky-CZkINW5K.js", "assets/three.core-DtjtRha-.js", "assets/three.module-CA589J5f.js", "assets/rolldown-runtime-DK3Fl9T5.js", "assets/lighting-v5Bxz3fy.js", "assets/terrain-hAt8DxJj.js", "assets/noise-RmOKhMMB.js", "assets/farfield-C_pc_rD2.js", "assets/water-gsagbnmh.js", "assets/surfaceShader-dsv9JGIz.js", "assets/rocks-y8HHw4CK.js", "assets/trees-0uhX1FpN.js", "assets/architecture-CZpTapAH.js", "assets/util-BOJ-hp-d.js", "assets/mesher-VCyixKF_.js", "assets/palms-q8s8U1Ts.js", "assets/vegetation-D1lQB87E.js", "assets/waterfalls-DdzTju_6.js", "assets/waterfx-DvUq_Vch.js", "assets/ambient-CLaPyTDX.js"])) => i2.map((i3) => d2[i3]);
import { t as e } from "./rolldown-runtime-DK3Fl9T5.js";
import { $n as t, $r as n, A as r, Ar as i, Dr as a, E as o, Gt as s, Hn as c, Ii as l, Ja as u, Lt as d, Nr as f, O as p, Qa as m, Qi as h, Rn as g, Rt as _, U as v, V as y, Wi as b, Wr as x, Yt as S, _r as C, ar as w, bt as T, ct as E, do as D, ea as ee, io as O, ir as k, j as te, jn as A, jr as ne, jt as re, kr as ie, mr as ae, no as j, or as oe, ro as M, ta as se, tr as ce, vt as le, za as ue, zi as de } from "./three.core-DtjtRha-.js";
import { i as fe, n as pe, r as me } from "./three.module-CA589J5f.js";
import { a as he, c as ge, d as _e, i as ve, l as ye, n as be, o as xe, r as Se, s as Ce, t as we, u as Te } from "./layout-DXlv_L6y.js";
import { i as Ee, n as De, o as Oe, s as N, t as ke } from "./noise-RmOKhMMB.js";
import { c as Ae, l as je, s as Me } from "./farfield-C_pc_rD2.js";
(function() {
  let e3 = document.createElement(`link`).relList;
  if (e3 && e3.supports && e3.supports(`modulepreload`)) return;
  for (let e4 of document.querySelectorAll(`link[rel="modulepreload"]`)) n2(e4);
  new MutationObserver((e4) => {
    for (let t3 of e4) if (t3.type === `childList`) for (let e5 of t3.addedNodes) e5.tagName === `LINK` && e5.rel === `modulepreload` && n2(e5);
  }).observe(document, { childList: true, subtree: true });
  function t2(e4) {
    let t3 = {};
    return e4.integrity && (t3.integrity = e4.integrity), e4.referrerPolicy && (t3.referrerPolicy = e4.referrerPolicy), t3.credentials = e4.crossOrigin === `use-credentials` ? `include` : e4.crossOrigin === `anonymous` ? `omit` : `same-origin`, t3;
  }
  function n2(e4) {
    if (e4.ep) return;
    e4.ep = true;
    let n3 = t2(e4);
    fetch(e4.href, n3);
  }
})();
var Ne = new URLSearchParams(location.search);
function Pe(e3, t2) {
  let n2 = Ne.get(e3);
  if (n2 === null || n2 === ``) return t2;
  let r2 = parseFloat(n2);
  return Number.isFinite(r2) ? r2 : t2;
}
function Fe(e3) {
  let t2 = Ne.get(e3);
  return t2 ? t2.split(`,`).map((e4) => e4.trim()).filter(Boolean) : null;
}
var P = { view: Ne.get(`view`), cam: Fe(`cam`)?.map(parseFloat) ?? null, fov: Pe(`fov`, null), freeze: Ne.has(`freeze`) ? Pe(`freeze`, 10) : null, only: Fe(`only`), skip: Fe(`skip`) ?? [], q: Ne.get(`q`), capture: Ne.has(`capture`), fly: Ne.has(`fly`), debug: Ne.has(`debug`), nopost: Ne.has(`nopost`), colliders: Ne.has(`colliders`), raw: Ne, num: Pe, has: (e3) => Ne.has(e3), get: (e3) => Ne.get(e3) }, Ie = { low: { name: `low`, pixelRatio: 1, msaa: 0, shadowMapSize: 2048, shadowCascades: 2, shadowFar: 140, textureSize: 512, anisotropy: 4, foliageDensity: 0.45, grassDensity: 0.35, grassDistance: 45, scatterDistance: 160, reflectionScale: 0.35, ssao: false, bloom: true, sunShafts: false, lanternLights: 4, treeLeafLOD: 0.6, terrainDetail: 0.5, waterDetail: 0.5, cinematic: false }, medium: { name: `medium`, pixelRatio: 1.25, msaa: 4, shadowMapSize: 2048, shadowCascades: 3, shadowFar: 200, textureSize: 1024, anisotropy: 8, foliageDensity: 0.7, grassDensity: 0.6, grassDistance: 70, scatterDistance: 240, reflectionScale: 0.5, ssao: true, bloom: true, sunShafts: true, lanternLights: 6, treeLeafLOD: 0.8, terrainDetail: 0.75, waterDetail: 0.75, cinematic: false }, high: { name: `high`, pixelRatio: 1.5, msaa: 4, shadowMapSize: 4096, shadowCascades: 3, shadowFar: 280, textureSize: 1024, anisotropy: 12, foliageDensity: 1, grassDensity: 1, grassDistance: 95, scatterDistance: 320, reflectionScale: 0.5, ssao: true, bloom: true, sunShafts: true, lanternLights: 8, treeLeafLOD: 1, terrainDetail: 1, waterDetail: 1, cinematic: false }, ultra: { name: `ultra`, pixelRatio: 2, msaa: 4, shadowMapSize: 4096, shadowCascades: 4, shadowFar: 360, textureSize: 2048, anisotropy: 16, foliageDensity: 1.25, grassDensity: 1.4, grassDistance: 120, scatterDistance: 420, reflectionScale: 0.75, ssao: true, bloom: true, sunShafts: true, lanternLights: 10, treeLeafLOD: 1.2, terrainDetail: 1, waterDetail: 1, cinematic: false }, cinematic: { name: `cinematic`, pixelRatio: 2, supersample: 1.5, msaa: 4, shadowMapSize: 8192, shadowCascades: 4, shadowFar: 420, textureSize: 2048, anisotropy: 16, foliageDensity: 1.5, grassDensity: 1.8, grassDistance: 160, scatterDistance: 520, reflectionScale: 1, ssao: true, bloom: true, sunShafts: true, lanternLights: 14, treeLeafLOD: 1.5, terrainDetail: 1, waterDetail: 1, cinematic: true } }, Le = [`low`, `medium`, `high`, `ultra`, `cinematic`], Re = { auto: { label: `Auto`, note: `Matched to your graphics card. Recommended.` }, low: { label: `Low`, note: `Lightest. Short grass range, simple shadows, no ambient occlusion. Integrated graphics and older laptops.` }, medium: { label: `Medium`, note: `Balanced. Moderate foliage and grass, three shadow cascades. Most integrated and entry GPUs.` }, high: { label: `High`, note: `The full village with 4K shadows. Typical discrete GPUs.` }, ultra: { label: `Ultra`, note: `Denser foliage and grass, 2K textures, sharper reflections. RTX 3060 / RX 6600 class and up.` }, cinematic: { label: `Cinematic`, note: `Supersampled, 8K shadows, densest grass and foliage. Heavy: RTX 4080 class. Slower to load.` } }, ze = `lagoon.quality.v1`, Be = `lagoon.renderScale.v1`, Ve = 0.75, He = 1.5, Ue = () => !P.capture && !P.has(`playertest`);
function We() {
  try {
    let e3 = localStorage.getItem(ze);
    return e3 && Ie[e3] ? e3 : `auto`;
  } catch {
    return `auto`;
  }
}
function Ge(e3) {
  try {
    return !e3 || e3 === `auto` || !Ie[e3] ? localStorage.removeItem(ze) : localStorage.setItem(ze, e3), true;
  } catch {
    return false;
  }
}
function Ke(e3) {
  let t2 = Number(e3);
  return Number.isFinite(t2) ? Math.min(He, Math.max(Ve, t2)) : 1;
}
function qe() {
  if (!Ue()) return 1;
  try {
    let e3 = localStorage.getItem(Be);
    return e3 === null ? 1 : Ke(parseFloat(e3));
  } catch {
    return 1;
  }
}
function Je(e3) {
  try {
    let t2 = Ke(e3);
    return Math.abs(t2 - 1) < 1e-3 ? localStorage.removeItem(Be) : localStorage.setItem(Be, String(Math.round(t2 * 100) / 100)), true;
  } catch {
    return false;
  }
}
function Ye(e3) {
  let t2 = ``, n2 = ``;
  try {
    let r3 = e3.getExtension(`WEBGL_debug_renderer_info`);
    r3 && (t2 = String(e3.getParameter(r3.UNMASKED_VENDOR_WEBGL) || ``), n2 = String(e3.getParameter(r3.UNMASKED_RENDERER_WEBGL) || ``)), n2 ||= (t2 = String(e3.getParameter(e3.VENDOR) || ``), String(e3.getParameter(e3.RENDERER) || ``));
  } catch {
  }
  let r2 = n2.replace(/ANGLE \w+ Renderer:\s*/i, ``), i2 = r2.match(/^ANGLE \((?:[^,]*),\s*([^,]+?)(?:\s*\(0x[0-9a-f]+\))?(?:\s+Direct3D.*|\s+OpenGL.*|\s+Vulkan.*|\s+Metal.*)?,/i), a2 = (i2 ? i2[1] : r2).replace(/\s+/g, ` `).trim();
  return { vendor: t2, renderer: n2, name: a2 };
}
function Xe(e3) {
  let t2 = String(e3 || ``).trim();
  return t2 ? (t2 = t2.replace(/\(R\)|\(TM\)|®|™/gi, ``).replace(/^(NVIDIA|AMD|ATI|Intel)\s+/i, ``).replace(/^(GeForce|Radeon(?!\s*(?:Graphics|\d+M)\b))\s+/i, ``).replace(/\s+(GPU|Graphics Processor)$/i, ``).replace(/\s+Laptop$/i, ` Laptop`).replace(/\s+/g, ` `).trim(), t2.length > 34 ? t2.slice(0, 33) + `\u2026` : t2) : ``;
}
function Ze(e3) {
  let t2 = `${e3?.name || ``} ${e3?.renderer || ``}`.toLowerCase();
  if (!t2.trim()) return { tier: `high`, reason: `unknown gpu` };
  if (/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/.test(t2)) return { tier: `low`, reason: `software rasteriser` };
  if (/mali|adreno|powervr|apple a\d|videocore|tegra|immortalis|xclipse/.test(t2)) return { tier: `low`, reason: `mobile gpu` };
  let n2 = t2.match(/rtx\s*(?:a)?\s*(\d{4})/);
  if (/rtx\s*a\d{4}|quadro rtx|rtx \d{4} ada|rtx pro/.test(t2)) return { tier: `ultra`, reason: `nvidia workstation rtx` };
  if (n2) {
    let e4 = +n2[1], t3 = Math.floor(e4 / 1e3), r2 = e4 % 1e3;
    return t3 >= 3 && r2 >= 60 ? { tier: `ultra`, reason: `nvidia rtx ${e4}` } : { tier: `high`, reason: `nvidia rtx ${e4}` };
  }
  if (/titan/.test(t2)) return { tier: `high`, reason: `nvidia titan` };
  if (n2 = t2.match(/gtx\s*(\d{3,4})/), n2) {
    let e4 = +n2[1];
    return e4 >= 1070 || e4 === 980 || e4 === 1660 ? { tier: `high`, reason: `nvidia gtx ${e4}` } : { tier: `medium`, reason: `nvidia gtx ${e4}` };
  }
  if (/\bmx\s*\d{3}|geforce \d{3}m|nvs /.test(t2)) return { tier: `medium`, reason: `nvidia entry` };
  if (n2 = t2.match(/rx\s*(\d{4})\s*(xtx|xt|gre)?/), n2) {
    let e4 = +n2[1];
    return e4 >= 9e3 || e4 >= 6600 && e4 < 7e3 || e4 >= 7600 && e4 < 8e3 ? { tier: `ultra`, reason: `radeon rx ${e4}` } : e4 >= 5500 || e4 >= 6400 && e4 < 6600 || e4 >= 7e3 && e4 < 7600 ? { tier: `high`, reason: `radeon rx ${e4}` } : { tier: `medium`, reason: `radeon rx ${e4}` };
  }
  return /rx\s*(vega|5[678]0)|radeon pro w\d|radeon vii/.test(t2) ? { tier: `high`, reason: `radeon discrete` } : /radeon.*(890m|880m|8060s|8050s|780m)/.test(t2) ? { tier: `high`, reason: `radeon strong apu` } : /radeon/.test(t2) ? { tier: `medium`, reason: `radeon integrated` } : /arc(?:\(tm\))?\s*(a7|a5|b5|b7)\d\d/.test(t2) ? { tier: `high`, reason: `intel arc` } : /intel.*\b(hd graphics|uhd graphics \d{3})\b/.test(t2) && !/xe|arc/.test(t2) ? { tier: `low`, reason: `intel uhd/hd` } : /arc|iris xe|iris\(r\) xe|intel.*graphics|uhd|iris/.test(t2) ? { tier: `medium`, reason: `intel integrated` } : /apple m\d+\s*(pro|max|ultra)/.test(t2) ? { tier: `ultra`, reason: `apple m pro/max` } : /apple m\d+/.test(t2) ? { tier: `high`, reason: `apple m` } : /apple/.test(t2) ? { tier: `high`, reason: `apple gpu (masked)` } : { tier: `high`, reason: `unrecognised discrete` };
}
function Qe(e3) {
  if (matchMedia(`(pointer: coarse)`).matches && !matchMedia(`(any-pointer: fine)`).matches) return { tier: `low`, reason: `touch device` };
  let t2 = Ze(e3), n2 = navigator.deviceMemory;
  return n2 && n2 <= 4 && (t2.tier === `high` || t2.tier === `ultra`) ? { tier: `medium`, reason: t2.reason + `, low device memory` } : t2;
}
function $e(e3 = null) {
  let t2 = Qe(e3), n2 = P.q && Ie[P.q] ? P.q : null, r2 = P.q === `auto`, i2 = !n2 && !r2 && Ue() ? We() : `auto`, a2 = n2 ?? (i2 === `auto` ? null : i2), o2 = a2 ?? t2.tier, s2 = { ...Ie[o2] };
  s2.rank = Le.indexOf(o2), s2.atLeast = (e4) => s2.rank >= Le.indexOf(e4), s2.choice = n2 ?? i2, s2.auto = { tier: t2.tier, reason: t2.reason, forced: !!a2, source: n2 ? `url` : a2 ? `saved` : `auto`, gpu: e3?.name ?? ``, gpuShort: Xe(e3?.name ?? ``) };
  let c2 = window.devicePixelRatio || 1;
  return s2.pixelRatio = Math.min(s2.pixelRatio, Math.max(c2, 1) * (s2.supersample ?? 1)), s2.supersample > 1 || (s2.pixelRatio = Math.min(s2.pixelRatio, c2)), P.capture && (s2.pixelRatio = 1), s2;
}
var et = { OPAQUE: 0, WATER: 1, FX: 2, NO_REFLECT: 3, COLLIDER: 4, REFLECT_EXTRA: 5 }, tt = _e(), nt = () => new k();
function rt(e3 = `shadowDefault`) {
  let t2 = new T(1, 1, m);
  return t2.format = le, t2.compareFunction = 515, t2.minFilter = g, t2.magFilter = g, t2.generateMipmaps = false, t2.name = e3, t2.needsUpdate = true, t2;
}
var it = rt(), at = () => new O(), F = { uTime: { value: 0 }, uSunDir: { value: new M(tt[0], tt[1], tt[2]) }, uSunColor: { value: new v(1, 0.78, 0.52) }, uSunIntensity: { value: 37.4 }, uSkyZenith: { value: new v(0.18, 0.34, 0.72) }, uSkyHorizon: { value: new v(3.2, 3.46, 2.94) }, uWaterLevel: { value: 0 }, uWindDir: { value: new j(0.8, 0.6).normalize() }, uWindStrength: { value: 0.35 }, uCameraUnderwater: { value: 0 }, uFogDensity: { value: 16e-5 }, uFogHeightFalloff: { value: 16e-4 }, uFogColor: { value: new v(2.8, 3.4, 3.1) }, uFogSunColor: { value: new v(14.4, 11, 6.6) }, uFogSunPower: { value: 8 }, uFogChroma: { value: new M(0.86, 0.97, 1.17) }, tSkyView: { value: null }, uSkyViewReady: { value: 0 }, uCausticsStrength: { value: 1 }, uLagoonBounce: { value: new v(0.05, 0.26, 0.24) }, uLagoonBounceStrength: { value: 1 }, uWaterAbsorb: { value: new M(0.4, 0.072, 0.052) }, tLagoonMask: { value: null }, uLagoonMaskBounds: { value: new O(-160, -120, 320, 240) }, uLagoonMaskReady: { value: 0 }, tShadowAtlas: { value: it }, tShadowStatic: { value: it }, uShadowMat: { value: [nt(), nt(), nt()] }, uShadowRect: { value: [at(), at(), at()] }, uShadowParams: { value: [at(), at(), at()] }, uShadowCascades: { value: 0 }, uShadowSplit: { value: new O(1e4, 1e4, 1e4, 0) }, uShadowStaticMat: { value: nt() }, uShadowStaticParams: { value: at() }, uShadowStaticOn: { value: 0 }, tShadowStaticDepth: { value: null }, uShadowStaticRange: { value: 1e3 }, uShadowPenumbra: { value: 52e-4 }, uShadowDebug: { value: 0 }, uShadowHQ: { value: 0 }, tSkyOcc: { value: null }, uSkyOccBounds: { value: at() }, uSkyOccDecode: { value: new j(0, 1) }, uSkyOccParams: { value: new O(1.4, 0.25, 14, 0.8) }, uSkyOccOn: { value: 0 }, uSkyOccBounce: { value: new v(0.4, 0.33, 0.24) }, uCanopyParams: { value: new O(0.7, 0.35, 0, 0) }, uCanopyFill: { value: new v(0.17, 0.25, 0.09) }, tGroundBounce: { value: null }, uGroundBounceBounds: { value: at() }, uGroundBounceParams: { value: new O(0.25, 10, 0, 1.1) }, uEnvGround: { value: new v(1.14, 0.79, 0.46) }, uHazeNear: { value: new j(22e-5, 1 / 45) }, uLightDebug: { value: 0 }, uLightFx: { value: new O(1, 0.4, 1, 0.12) } }, ot = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`, st = `
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
`;
function ct(e3, t2, n2 = {}) {
  let r2 = new D(Math.max(1, e3), Math.max(1, t2), { type: n2.type ?? 1016, format: n2.format ?? 1023, depthBuffer: false, stencilBuffer: false, minFilter: n2.filter ?? 1006, magFilter: n2.filter ?? 1006, wrapS: y, wrapT: y, generateMipmaps: false });
  return r2.texture.name = n2.name ?? `post`, r2;
}
function I({ uniforms: e3 = {}, fragmentShader: t2, defines: n2 = {}, blending: r2 = 0, name: i2 = `post` }) {
  let a2 = new se({ name: i2, uniforms: e3, defines: n2, vertexShader: ot, fragmentShader: t2, depthTest: false, depthWrite: false, blending: r2 });
  return a2.userData.noPatch = true, a2;
}
var lt = { low: 0, medium: 1, high: 2, ultra: 3, cinematic: 4 };
function ut(e3) {
  return e3 ? e3.cinematic ? 4 : lt[e3.name] ?? 2 : 2;
}
function dt(e3, t2) {
  let n2 = e3.projectionMatrix.elements;
  return t2.set(n2[0], n2[5], n2[8], n2[9]);
}
var ft = `
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
}`, pt = `
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
}`, mt = `
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
}`, ht = `
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
}`, gt = class {
  constructor(e3, t2) {
    this.pipeline = e3;
    let n2 = ut(t2);
    this.scale = n2 >= 4 ? 1 : 2, this.settings = { radius: 1.1, power: 1.6, intensity: 0.95, directReduce: 0.6, thin: 0.8, albedo: 0.42, fade: [90, 220], maxPixels: this.scale === 1 ? 128 : 64 };
    let r2 = n2 >= 4 || n2 >= 3 ? 4 : n2 >= 2 ? 3 : 2, i2 = n2 >= 4 ? 10 : n2 >= 3 ? 8 : n2 >= 2 ? 6 : 4, a2 = { AO_SCALE: this.scale }, o2 = e3.postUniforms;
    this.prepRT = ct(1, 1, { type: _, filter: C, name: `gtao.prep` }), this.aoRT = ct(1, 1, { type: u, filter: C, name: `gtao.raw` }), this.blurRT = ct(1, 1, { type: u, filter: C, name: `gtao.blur` }), this.halfRes = new j(1, 1), this.fullRes = e3.uniforms.uResolution.value, this.prepMat = I({ name: `gtao.prep`, defines: a2, uniforms: { ...o2, tDepth: e3.uniforms.tSceneDepth, uFullRes: { value: this.fullRes } }, fragmentShader: ft }), this.aoMat = I({ name: `gtao.ao`, defines: { ...a2, SLICES: r2, STEPS: i2 }, uniforms: { ...o2, tPrep: { value: this.prepRT.texture }, uHalfRes: { value: this.halfRes }, uFullRes: { value: this.fullRes }, uRadius: { value: this.settings.radius }, uMaxPixels: { value: this.settings.maxPixels }, uPower: { value: this.settings.power }, uThin: { value: this.settings.thin }, uFade: { value: new j(...this.settings.fade) } }, fragmentShader: pt }), this.blurMat = I({ name: `gtao.blur`, defines: a2, uniforms: { ...o2, tAO: { value: this.aoRT.texture }, tPrep: { value: this.prepRT.texture }, uHalfRes: { value: this.halfRes }, uFullRes: { value: this.fullRes } }, fragmentShader: mt }), this.applyMat = I({ name: `gtao.apply`, defines: a2, uniforms: { ...o2, tDepth: e3.uniforms.tSceneDepth, tColor: { value: e3.opaqueRT.texture }, tAO: { value: this.blurRT.texture }, tPrep: { value: this.prepRT.texture }, uHalfRes: { value: this.halfRes }, uFullRes: { value: this.fullRes }, uIntensity: { value: this.settings.intensity }, uDirectReduce: { value: this.settings.directReduce }, uExposureRef: { value: 1 }, uAlbedo: { value: this.settings.albedo } }, fragmentShader: ht, blending: 5 });
    let s2 = this.applyMat;
    s2.blendEquation = 100, s2.blendSrc = 208, s2.blendDst = 200, s2.blendEquationAlpha = 100, s2.blendSrcAlpha = 200, s2.blendDstAlpha = 201;
  }
  setSize(e3, t2) {
    let n2 = this.scale, r2 = Math.max(1, Math.ceil(e3 / n2)), i2 = Math.max(1, Math.ceil(t2 / n2));
    this.halfRes.set(r2, i2), this.prepRT.setSize(r2, i2), this.aoRT.setSize(r2, i2), this.blurRT.setSize(r2, i2);
  }
  syncSettings() {
    let e3 = this.settings, t2 = this.aoMat.uniforms;
    t2.uRadius.value = e3.radius, t2.uPower.value = e3.power, t2.uMaxPixels.value = e3.maxPixels, t2.uThin.value = e3.thin, t2.uFade.value.set(e3.fade[0], e3.fade[1]);
    let n2 = this.applyMat.uniforms;
    n2.uIntensity.value = e3.intensity, n2.uDirectReduce.value = e3.directReduce, n2.uAlbedo.value = e3.albedo;
  }
  compute() {
    let e3 = this.pipeline;
    this.syncSettings(), e3.drawFullscreen(this.prepMat, this.prepRT), e3.drawFullscreen(this.aoMat, this.aoRT), e3.drawFullscreen(this.blurMat, this.blurRT);
  }
  get texture() {
    return this.blurRT.texture;
  }
  dispose() {
    for (let e3 of [this.prepRT, this.aoRT, this.blurRT]) e3.dispose();
    for (let e3 of [this.prepMat, this.aoMat, this.blurMat, this.applyMat]) e3.dispose();
  }
}, _t = `
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
}`, vt = [];
function yt(e3, t2) {
  let n2 = 1, r2 = 0;
  for (; e3 > 0; ) n2 /= t2, r2 += e3 % t2 * n2, e3 = Math.floor(e3 / t2);
  return r2;
}
for (let e3 = 1; e3 <= 8; e3++) vt.push([yt(e3, 2) - 0.5, yt(e3, 3) - 0.5]);
var bt = class {
  constructor(e3) {
    this.pipeline = e3, this.settings = { alpha: 0.1, alphaMotion: 0.4, alphaWater: 0.5, gamma: 1.1, gammaStill: 1.1, depthTol: 0.04, jitter: 1, sharpen: 0.25, filterK: 0, jitterSign: 1, depthMode: 0, alphaWaterStill: 0.5 }, this.rts = [ct(1, 1, { name: `taa.a` }), ct(1, 1, { name: `taa.b` })], this.idx = 0, this.res = new j(1, 1), this.mat = I({ name: `taa`, uniforms: { ...e3.postUniforms, tCurrent: { value: null }, tDepth: { value: null }, tHistory: { value: null }, tOpaqueDepth: e3.uniforms.tSceneDepth, uAlphaWater: { value: 0.5 }, uJitter: { value: new j() }, uFilterK: { value: 0 }, uDepthMode: { value: 0 }, uAlphaWaterStill: { value: 0.5 }, uRes: { value: this.res }, uCurInvViewProj: { value: new k() }, uPrevViewProj: { value: new k() }, uReset: { value: 1 }, uAlpha: { value: 0.1 }, uAlphaMotion: { value: 0.22 }, uGamma: { value: 1.1 }, uGammaStill: { value: 1.1 }, uDepthTol: { value: 0.04 } }, fragmentShader: _t }), this.needsReset = true, this._saved = new k(), this._savedInv = new k(), this._unjit = new k(), this._prevVP = new k(), this._curVP = new k(), this._prevPos = new M(1e9, 0, 0), this._prevQuat = new x(), this._lastFrame = -10, this._jittered = false, this.phase = 0;
  }
  setSize(e3, t2) {
    this.res.set(e3, t2);
    for (let n2 of this.rts) n2.setSize(e3, t2);
    this.needsReset = true;
  }
  jitter(e3, t2) {
    this._saved.copy(e3.projectionMatrix), this._savedInv.copy(e3.projectionMatrixInverse), this._unjit.copy(e3.projectionMatrix);
    let n2 = vt[t2 & 7], r2 = this.settings.jitter;
    this.phase = t2 & 7;
    let i2 = e3.projectionMatrix.elements;
    i2[8] += n2[0] * r2 * 2 / this.res.x, i2[9] += n2[1] * r2 * 2 / this.res.y, e3.projectionMatrixInverse.copy(e3.projectionMatrix).invert(), this._jittered = true;
  }
  restore(e3) {
    this._jittered &&= (e3.projectionMatrix.copy(this._saved), e3.projectionMatrixInverse.copy(this._savedInv), false);
  }
  render(e3, t2, n2, r2) {
    let i2 = this.pipeline, a2 = this.mat.uniforms, o2 = this.settings, s2 = n2.position.distanceToSquared(this._prevPos) > 25 || n2.quaternion.angleTo(this._prevQuat) > 0.52, c2 = this.needsReset || s2 || r2 !== this._lastFrame + 1;
    this._curVP.multiplyMatrices(this._unjit, n2.matrixWorldInverse), a2.uCurInvViewProj.value.copy(this._curVP).invert(), a2.uPrevViewProj.value.copy(c2 ? this._curVP : this._prevVP), a2.tCurrent.value = e3, a2.tDepth.value = t2, a2.tHistory.value = this.rts[this.idx].texture, a2.uReset.value = +!!c2, a2.uAlpha.value = o2.alpha, a2.uAlphaMotion.value = o2.alphaMotion, a2.uGamma.value = o2.gamma, a2.uDepthTol.value = o2.depthTol, a2.uGammaStill.value = o2.gammaStill, a2.uAlphaWater.value = o2.alphaWater;
    let l2 = vt[r2 & 7], u2 = o2.jitter * o2.jitterSign;
    a2.uJitter.value.set(l2[0] * u2, l2[1] * u2), a2.uFilterK.value = o2.filterK, a2.uDepthMode.value = o2.depthMode, a2.uAlphaWaterStill.value = o2.alphaWaterStill, this.idx ^= 1;
    let d2 = this.rts[this.idx];
    return i2.drawFullscreen(this.mat, d2), this._prevVP.copy(this._curVP), this._prevPos.copy(n2.position), this._prevQuat.copy(n2.quaternion), this._lastFrame = r2, this.needsReset = false, d2.texture;
  }
  dispose() {
    for (let e3 of this.rts) e3.dispose();
    this.mat.dispose();
  }
}, xt = `
uniform sampler2D tSrc;
uniform vec2 uSrcTexel;
varying vec2 vUv;
vec4 tap4(vec2 o) { return texture2D(tSrc, vUv + o * uSrcTexel); }
vec3 tap(vec2 o) { return tap4(o).rgb; }
`, St = `
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
}`, Ct = `
${xt}
void main() {
  vec4 a = tap4(vec2(-2.0, 2.0)), b = tap4(vec2(0.0, 2.0)), c = tap4(vec2(2.0, 2.0));
  vec4 d = tap4(vec2(-2.0, 0.0)), e = tap4(vec2(0.0, 0.0)), f = tap4(vec2(2.0, 0.0));
  vec4 g = tap4(vec2(-2.0, -2.0)), h = tap4(vec2(0.0, -2.0)), i = tap4(vec2(2.0, -2.0));
  vec4 j = tap4(vec2(-1.0, 1.0)), k = tap4(vec2(1.0, 1.0));
  vec4 l = tap4(vec2(-1.0, -1.0)), m = tap4(vec2(1.0, -1.0));
  gl_FragColor = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
}`, wt = `
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
}`, Tt = class {
  constructor(e3, t2 = 6) {
    this.pipeline = e3, this.maxLevels = t2, this.settings = { threshold: 1.25, thresholdFar: 16, knee: 0.5, far: [250, 1200], strength: 0.3, radius: 1, falloff: 0.72, weights: t2 >= 7 ? [1, 0.62, 0.4, 0.28, 0.21, 0.16, 0.12] : [1, 0.62, 0.4, 0.28, 0.21, 0.16] }, this.rts = [];
    for (let e4 = 0; e4 < t2; e4++) this.rts.push(ct(1, 1, { name: `bloom.${e4}` }));
    this.levels = t2, this.prefilterMat = I({ name: `bloom.prefilter`, uniforms: { ...e3.postUniforms, tDepth: e3.uniforms.tSceneDepth, uFarRange: { value: new j(250, 1200) }, tSrc: { value: null }, uSrcTexel: { value: new j() }, uExposure: { value: 1 }, uThreshold: { value: this.settings.threshold }, uThresholdFar: { value: this.settings.thresholdFar }, uKnee: { value: this.settings.knee }, tAdapt: { value: null }, uAutoExp: { value: 0 } }, fragmentShader: St }), this.downMat = I({ name: `bloom.down`, uniforms: { tSrc: { value: null }, uSrcTexel: { value: new j() } }, fragmentShader: Ct }), this.upMat = I({ name: `bloom.up`, uniforms: { tSrc: { value: null }, uSrcTexel: { value: new j() }, uRadius: { value: 1 }, uWeight: { value: 1 } }, fragmentShader: wt, blending: 5 });
    let n2 = this.upMat;
    n2.blendEquation = 100, n2.blendSrc = 201, n2.blendDst = 201, n2.blendEquationAlpha = 100, n2.blendSrcAlpha = 200, n2.blendDstAlpha = 201, this.fullW = 1, this.fullH = 1;
  }
  setSize(e3, t2) {
    this.fullW = e3, this.fullH = t2;
    let n2 = Math.max(1, e3 + 1 >> 1), r2 = Math.max(1, t2 + 1 >> 1);
    this.levels = 0;
    for (let e4 = 0; e4 < this.maxLevels; e4++) this.rts[e4].setSize(n2, r2), n2 >= 4 && r2 >= 4 && (this.levels = e4 + 1), n2 = Math.max(1, n2 + 1 >> 1), r2 = Math.max(1, r2 + 1 >> 1);
    this.levels = Math.max(1, this.levels);
  }
  render(e3, t2, n2 = null) {
    let r2 = this.pipeline, i2 = this.settings, a2 = this.prefilterMat.uniforms;
    a2.tSrc.value = e3, a2.uSrcTexel.value.set(1 / this.fullW, 1 / this.fullH), a2.uExposure.value = t2, a2.tAdapt.value = n2, a2.uAutoExp.value = +!!n2, a2.uThreshold.value = i2.threshold, a2.uThresholdFar.value = Math.max(i2.threshold, i2.thresholdFar), a2.uKnee.value = Math.min(1, Math.max(1e-3, i2.knee)), a2.uFarRange.value.set(i2.far[0], Math.max(i2.far[0] + 1, i2.far[1])), r2.drawFullscreen(this.prefilterMat, this.rts[0]);
    let o2 = this.downMat.uniforms;
    for (let e4 = 1; e4 < this.levels; e4++) {
      let t3 = this.rts[e4 - 1];
      o2.tSrc.value = t3.texture, o2.uSrcTexel.value.set(1 / t3.width, 1 / t3.height), r2.drawFullscreen(this.downMat, this.rts[e4]);
    }
    let s2 = this.upMat.uniforms;
    s2.uRadius.value = i2.radius;
    for (let e4 = this.levels - 1; e4 > 0; e4--) {
      let t3 = this.rts[e4];
      s2.uWeight.value = this.levelStep(e4), s2.tSrc.value = t3.texture, s2.uSrcTexel.value.set(1 / t3.width, 1 / t3.height), r2.drawFullscreen(this.upMat, this.rts[e4 - 1]);
    }
    return this.rts[0].texture;
  }
  get meterTarget() {
    return this.rts[this.levels - 1];
  }
  levelWeight(e3) {
    let t2 = this.settings.weights;
    return t2 && t2.length ? t2[Math.min(e3, t2.length - 1)] * (e3 >= t2.length ? 0.75 ** (e3 - t2.length + 1) : 1) : this.settings.falloff ** +e3;
  }
  levelStep(e3) {
    return this.levelWeight(e3) / Math.max(1e-6, this.levelWeight(e3 - 1));
  }
  get compositeScale() {
    let e3 = 0;
    for (let t2 = 0; t2 < this.levels; t2++) e3 += this.levelWeight(t2);
    return this.settings.strength / Math.max(1e-6, e3);
  }
  dispose() {
    for (let e3 of this.rts) e3.dispose();
    this.prefilterMat.dispose(), this.downMat.dispose(), this.upMat.dispose();
  }
}, Et = `
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
}`, Dt = `
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
}`, Ot = class {
  constructor(e3, t2 = 4) {
    this.pipeline = e3, this.scale = t2 === 2 ? 2 : 4, this.settings = { amount: 0.2, sharpness: 64, maskSharp: 4, decay: 0.97, distScale: 120, skyFactor: 0.15 }, this.rtA = ct(1, 1, { name: `shafts.a` }), this.rtB = ct(1, 1, { name: `shafts.b` }), this.qRes = new j(1, 1), this.sunUV = new j(0.5, 0.5), this.sunView = new M(0, 0, -1), this.visibility = 0, this._v4 = new O(), this._v3 = new M(), this._fwd = new M();
    let n2 = e3.postUniforms;
    this.maskMat = I({ name: `shafts.mask`, uniforms: { ...n2, tDepth: e3.uniforms.tSceneDepth, uFullRes: { value: e3.uniforms.uResolution.value }, uSunView: { value: this.sunView }, uMaskSharp: { value: this.settings.maskSharp }, uScale: { value: this.scale } }, fragmentShader: Et }), this.radialMat = I({ name: `shafts.radial`, uniforms: { tSrc: { value: null }, uSunUV: { value: this.sunUV }, uSpan: { value: 1 }, uDecay: { value: this.settings.decay }, uAspect: { value: new j(1, 1) } }, fragmentShader: Dt });
  }
  setSize(e3, t2) {
    let n2 = this.scale, r2 = Math.max(1, Math.ceil(e3 / n2)), i2 = Math.max(1, Math.ceil(t2 / n2));
    this.qRes.set(r2, i2), this.rtA.setSize(r2, i2), this.rtB.setSize(r2, i2), this.radialMat.uniforms.uAspect.value.set(e3 / Math.max(1, t2), 1);
  }
  update(e3, t2) {
    let n2 = e3.getWorldDirection(this._fwd).dot(t2);
    if (this.sunView.copy(t2).transformDirection(e3.matrixWorldInverse), n2 <= 0.05 || this.sunView.z >= -1e-3) return this.visibility = 0, 0;
    let r2 = this._v4.set(t2.x, t2.y, t2.z, 0).applyMatrix4(e3.matrixWorldInverse).applyMatrix4(e3.projectionMatrix), i2 = r2.x / r2.w, a2 = r2.y / r2.w;
    this.sunUV.set(i2 * 0.5 + 0.5, a2 * 0.5 + 0.5);
    let o2 = Math.max(0, Math.abs(i2) - 1), s2 = Math.max(0, Math.abs(a2) - 1), c2 = Math.sqrt(o2 * o2 + s2 * s2), l2 = 1 - ce.smoothstep(c2, 0, 0.9), u2 = ce.smoothstep(n2, 0.05, 0.45);
    return this.visibility = l2 * u2, this.visibility;
  }
  render() {
    let e3 = this.pipeline, t2 = this.settings;
    this.maskMat.uniforms.uMaskSharp.value = t2.maskSharp, e3.drawFullscreen(this.maskMat, this.rtA);
    let n2 = this.radialMat.uniforms;
    return n2.uDecay.value = t2.decay, n2.tSrc.value = this.rtA.texture, n2.uSpan.value = 1 / 16, e3.drawFullscreen(this.radialMat, this.rtB), n2.tSrc.value = this.rtB.texture, n2.uSpan.value = 1, e3.drawFullscreen(this.radialMat, this.rtA), this.rtA.texture;
  }
  get texture() {
    return this.rtA.texture;
  }
  dispose() {
    this.rtA.dispose(), this.rtB.dispose(), this.maskMat.dispose(), this.radialMat.dispose();
  }
}, kt = `
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
}`, At = class {
  constructor(e3) {
    this.pipeline = e3, this.settings = { scatterCoef: 0.035, scatter: [0.05, 0.3, 0.78], shafts: 1 }, this.rt = ct(1, 1, { name: `underwater` });
    let t2 = e3.postUniforms;
    this.mat = I({ name: `underwater`, uniforms: { ...t2, tInput: { value: null }, tDepth: e3.uniforms.tSceneDepth, uViewInverse: e3.uniforms.uViewInverse, uCamPos: { value: new M() }, uWaterLevel: { value: 0 }, uAmount: { value: 1 }, uTime: { value: 0 }, uSunRefr: { value: new M(0, -1, 0) }, uSunLight: { value: new M(1, 1, 1) }, uWaterAbsorb: F.uWaterAbsorb ?? { value: new M(0.4, 0.072, 0.052) }, uScatterCoef: { value: this.settings.scatterCoef }, uScatterCol: { value: new M(...this.settings.scatter) }, uShafts: { value: 1 } }, fragmentShader: kt }), this._in = new M();
  }
  setSize(e3, t2) {
    this.rt.setSize(e3, t2);
  }
  render(e3, t2, n2) {
    let r2 = this.mat.uniforms, i2 = this.settings;
    r2.tInput.value = e3, r2.uCamPos.value.copy(t2.position), r2.uWaterLevel.value = F.uWaterLevel.value, r2.uAmount.value = n2, r2.uTime.value = F.uTime.value, r2.uScatterCoef.value = i2.scatterCoef, r2.uScatterCol.value.set(i2.scatter[0], i2.scatter[1], i2.scatter[2]), r2.uShafts.value = i2.shafts;
    let a2 = this._in.copy(F.uSunDir.value).negate().normalize(), o2 = 1 / 1.333, s2 = -a2.y, c2 = 1 - o2 * o2 * (1 - s2 * s2), l2 = r2.uSunRefr.value;
    c2 < 0 ? l2.set(0, -1, 0) : l2.copy(a2).multiplyScalar(o2).add(this._in.set(0, 1, 0).multiplyScalar(o2 * s2 - Math.sqrt(c2))).normalize();
    let u2 = F.uSunColor.value, d2 = F.uSunIntensity.value;
    return r2.uSunLight.value.set(u2.r * d2, u2.g * d2, u2.b * d2), this.pipeline.drawFullscreen(this.mat, this.rt), this.rt.texture;
  }
  dispose() {
    this.rt.dispose(), this.mat.dispose();
  }
}, jt = { neutral: { id: 0, calib: 0.52 }, aces: { id: 1, calib: 0.47 }, agx: { id: 2, calib: 0.86 } }, Mt = { photo: { ShadowTint: [0.975, 0.995, 1.03], HighlightTint: [1, 1, 1.008], Saturation: 1.05, HighlightSat: 0.92, GreenSat: 0.95, LogContrast: 1.1, LogRange: 2.2, Contrast: 0.08, Shoulder: 0.6, Desat: 0.16, ToeChroma: 0.85, Vignette: 0.2 }, r3: { ShadowTint: [0.97, 0.995, 1.035], HighlightTint: [1, 1, 1.01], Saturation: 1.05, HighlightSat: 0.94, GreenSat: 1, LogContrast: 1, LogRange: 2.2, Contrast: 0.2, Shoulder: 0.62, Desat: 0.1, ToeChroma: 0, Vignette: 0.2 } }, Nt = `
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
  // same luminance as the stock toe, but the input's chromaticity \u2014 only in the
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
}`;
function Pt(e3, t2, n2 = null) {
  let r2 = n2 ? { ...Mt[t2] ?? Mt.photo, ...n2 } : Mt[t2] ?? Mt.photo, i2 = e3.uniforms;
  for (let e4 in r2) {
    let t3 = r2[e4], n3 = i2[`u` + e4];
    n3 && (Array.isArray(t3) ? n3.value.set(t3[0], t3[1], t3[2]) : n3.value = t3);
  }
}
function Ft(e3, t2) {
  let n2 = I({ name: `composite`, uniforms: { ...e3.postUniforms, ...t2, tShafts: { value: null }, tDepth: e3.uniforms.tSceneDepth, tAO: { value: null }, tAdapt: { value: null }, uAutoExp: { value: 0 }, uCalib: { value: jt.neutral.calib }, uTone: { value: 0 }, uShaftColor: { value: new M(0, 0, 0) }, uShaftDist: { value: 120 }, uShaftSky: { value: 0.15 }, uSunView: { value: new M(0, 0, -1) }, uShaftSharp: { value: 64 }, uShadowTint: { value: new M(1, 1, 1) }, uHighlightTint: { value: new M(1, 1, 1) }, uSaturation: { value: 1 }, uHighlightSat: { value: 1 }, uGreenSat: { value: 1 }, uLogContrast: { value: 1 }, uLogRange: { value: 2.2 }, uContrast: { value: 0 }, uShoulder: { value: 0.62 }, uDesat: { value: 0.1 }, uToeChroma: { value: 0 }, uVignette: { value: 0.2 }, uAspect: { value: new j(1, 1) }, uFrame: { value: 0 }, uNoPost: { value: 0 }, uCA: { value: 0 }, uGrain: { value: 0 }, uSharpen: { value: 0 }, uTexel: { value: new j(1, 1) }, uDebugView: { value: 0 } }, fragmentShader: Nt });
  return Pt(n2, `photo`), n2;
}
var It = 16, Lt = 6, Rt = class {
  constructor(e3) {
    this.gl = e3.getContext(), this.ext = this.gl.getExtension(`EXT_disjoint_timer_query_webgl2`), this.supported = !!this.ext, this.enabled = false, this.labels = [], this.avg = {}, this.last = {}, this.frames = 0, this._frames = [];
    for (let e4 = 0; e4 < Lt; e4++) this._frames.push({ id: -1, n: 0, labels: Array(It), queries: Array(It), busy: false });
    this._free = [], this._frameId = 0, this._cur = null, this._active = false, this._samplers = [], this.api = this._makeApi();
  }
  _makeApi() {
    let e3 = this;
    return { get supported() {
      return e3.supported;
    }, get enabled() {
      return e3.enabled;
    }, get avg() {
      return e3.avg;
    }, get last() {
      return e3.last;
    }, get frames() {
      return e3.frames;
    }, enable() {
      return e3.enabled = e3.supported, e3.enabled;
    }, disable() {
      e3.enabled = false;
    }, reset() {
      e3.avg = {}, e3.last = {}, e3.frames = 0;
    }, sample(t2 = 60) {
      return e3.supported ? (e3.enabled = true, new Promise((n2) => e3._samplers.push({ left: t2, n: t2, sums: {}, resolve: n2 }))) : Promise.resolve(null);
    } };
  }
  _query() {
    return this._free.pop() ?? this.gl.createQuery();
  }
  frameStart() {
    if (!this.supported || !this.enabled && !this._cur && !this._anyBusy()) return;
    let e3 = this.gl;
    if (this._poll(), !this.enabled) {
      this._cur = null;
      return;
    }
    let t2 = null;
    for (let e4 of this._frames) if (!e4.busy) {
      t2 = e4;
      break;
    }
    if (!t2) {
      t2 = this._frames.reduce((e4, t3) => e4.id < t3.id ? e4 : t3);
      for (let e4 = 0; e4 < t2.n; e4++) this._free.push(t2.queries[e4]);
    }
    t2.id = this._frameId++, t2.n = 0, t2.busy = true, this._cur = t2, e3.getParameter(this.ext.GPU_DISJOINT_EXT) && (this._disjoint = true);
  }
  begin(e3) {
    if (!this._cur) return;
    this._active && this.end();
    let t2 = this._cur;
    if (t2.n >= It) return;
    let n2 = this._query();
    t2.labels[t2.n] = e3, t2.queries[t2.n] = n2, t2.n++, this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT, n2), this._active = true;
  }
  end() {
    this._active &&= (this.gl.endQuery(this.ext.TIME_ELAPSED_EXT), false);
  }
  _poll() {
    let e3 = this.gl, t2 = e3.getParameter(this.ext.GPU_DISJOINT_EXT) || this._disjoint;
    for (this._disjoint = false; ; ) {
      let n2 = null;
      for (let e4 of this._frames) e4.busy && e4 !== this._cur && (!n2 || e4.id < n2.id) && (n2 = e4);
      if (!n2) break;
      if (t2) {
        this._release(n2);
        continue;
      }
      let r2 = n2.queries[n2.n - 1];
      if (n2.n === 0) {
        this._release(n2);
        continue;
      }
      if (!e3.getQueryParameter(r2, e3.QUERY_RESULT_AVAILABLE)) break;
      let i2 = 0;
      for (let e4 in this.last) this.last[e4] = 0;
      for (let t3 = 0; t3 < n2.n; t3++) {
        let r3 = e3.getQueryParameter(n2.queries[t3], e3.QUERY_RESULT) / 1e6, a3 = n2.labels[t3];
        this.last[a3] = (this.last[a3] ?? 0) + r3, i2 += r3;
      }
      this.last.total = i2;
      let a2 = this.frames < 10 ? 1 / (this.frames + 1) : 0.08;
      for (let e4 in this.last) this.avg[e4] = (this.avg[e4] ?? this.last[e4]) * (1 - a2) + this.last[e4] * a2;
      this.frames++;
      for (let e4 = this._samplers.length - 1; e4 >= 0; e4--) {
        let t3 = this._samplers[e4];
        for (let e5 in this.last) t3.sums[e5] = (t3.sums[e5] ?? 0) + this.last[e5];
        if (--t3.left <= 0) {
          let n3 = {};
          for (let e5 in t3.sums) n3[e5] = +(t3.sums[e5] / t3.n).toFixed(4);
          this._samplers.splice(e4, 1), t3.resolve(n3);
        }
      }
      this._release(n2);
    }
  }
  _anyBusy() {
    for (let e3 = 0; e3 < this._frames.length; e3++) if (this._frames[e3].busy) return true;
    return false;
  }
  _release(e3) {
    for (let t2 = 0; t2 < e3.n; t2++) this._free.push(e3.queries[t2]);
    e3.n = 0, e3.busy = false;
  }
}, zt = `
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
}`, Bt = class {
  constructor(e3) {
    this.pipeline = e3, this.settings = { ref: 0.5, deadUp: 1, deadDown: 1.2, maxUp: 1.4, maxDown: 0.6, speedUp: 0.9, speedDown: 2.2, strength: 1 }, this.rts = [ct(1, 1, { type: _, filter: C, name: `adapt.a` }), ct(1, 1, { type: _, filter: C, name: `adapt.b` })], this.idx = 0, this.mat = I({ name: `adapt`, uniforms: { tMeter: { value: null }, tPrev: { value: null }, uMeterRes: { value: new j(1, 1) }, uBlend: { value: 1 }, uBlendUp: { value: 1 }, uRefLog: { value: -1 }, uDead: { value: new j() }, uMaxEv: { value: new j() }, uStrength: { value: 1 } }, fragmentShader: zt }), this.current = { value: this.rts[0].texture }, this.instant = true, this._lastPos = new M(1e9, 0, 0), this.info = { ev: 0, log: 0 }, this._readBuf = new Float32Array(4), this._reading = false;
  }
  update(e3, t2, n2, r2) {
    let i2 = this.settings, a2 = this.mat.uniforms;
    t2.position.distanceToSquared(this._lastPos) > 25 && (this.instant = true), this._lastPos.copy(t2.position);
    let o2 = this.instant || r2;
    this.instant = false, a2.tMeter.value = e3.texture, a2.uMeterRes.value.set(Math.min(64, e3.width), Math.min(64, e3.height)), a2.tPrev.value = this.rts[this.idx].texture, a2.uBlend.value = o2 ? 1 : 1 - Math.exp(-n2 * i2.speedDown), a2.uBlendUp.value = o2 ? 1 : 1 - Math.exp(-n2 * i2.speedUp), a2.uRefLog.value = Math.log2(i2.ref), a2.uDead.value.set(i2.deadUp, i2.deadDown), a2.uMaxEv.value.set(i2.maxUp, i2.maxDown), a2.uStrength.value = i2.strength, this.idx ^= 1;
    let s2 = this.rts[this.idx];
    this.pipeline.drawFullscreen(this.mat, s2), this.current.value = s2.texture;
  }
  poll(e3) {
    !this._reading && e3.readRenderTargetPixelsAsync && (this._reading = true, e3.readRenderTargetPixelsAsync(this.rts[this.idx], 0, 0, 1, 1, this._readBuf).then(() => {
      this.info.log = this._readBuf[0], this.info.ev = this._readBuf[2];
    }).catch(() => {
    }).finally(() => {
      this._reading = false;
    }));
  }
  dispose() {
    for (let e3 of this.rts) e3.dispose();
    this.mat.dispose();
  }
}, Vt = e({ GRID_STEP: () => Wt, HF_NOISE: () => Ut, TERRAIN_LOD: () => Kt, WORLD: () => ye, cliffMask: () => nn, cliffMaskGrid: () => rn, distToPaths: () => Cn, distToPolyline: () => en, groundHeight: () => vn, heightAt: () => un, isWater: () => xn, islandSDF: () => Jt, lagoonSDF: () => qt, latticeHeight: () => _n, lodLevelAt: () => gn, normalAt: () => yn, slopeAt: () => bn, streamBedAt: () => hn, waterDepthAt: () => Sn, waterSDF: () => Qt }), L = new ke(7331), Ht = new ke(9127), Ut = { N: L, N2: Ht }, Wt = 0.5;
function Gt() {
  let e3 = [{ step: Wt, x0: -120, x1: 120, z0: -88, z1: 88 }], t2 = [56, 48, 48, 48, 80, 56, 40];
  for (let n2 = 1; n2 <= t2.length; n2++) {
    let r2 = e3[n2 - 1], i2 = r2.step * 2, a2 = i2 * 2, o2 = t2[n2 - 1] * i2;
    e3.push({ step: i2, x0: Math.floor((r2.x0 - o2) / a2) * a2, x1: Math.ceil((r2.x1 + o2) / a2) * a2, z0: Math.floor((r2.z0 - o2) / a2) * a2, z1: Math.ceil((r2.z1 + o2) / a2) * a2 });
  }
  return e3;
}
var Kt = Gt();
function qt(e3, t2) {
  let n2 = 1e9;
  for (let r2 = 0; r2 < ve.length; r2++) {
    let i2 = ve[r2], a2 = (e3 - i2.x) / i2.rx, o2 = (t2 - i2.z) / i2.rz, s2 = Math.sqrt(a2 * a2 + o2 * o2), c2 = (s2 - 1) * Math.min(i2.rx, i2.rz) * (0.75 + 0.25 * Math.min(1, s2));
    n2 = Oe(n2, c2, 9);
  }
  return n2 += L.noise2(e3 * 0.03, t2 * 0.03) * 2.6 + L.noise2(e3 * 0.09 + 17, t2 * 0.09) * 0.9, n2;
}
function Jt(e3, t2, n2) {
  return Zt(e3, t2, n2);
}
var Yt = 1.17, Xt = Se.map((e3, t2) => t2).sort((e3, t2) => Se[t2].r - Se[e3].r);
function Zt(e3, t2, n2) {
  let r2 = 1e9, i2 = null, a2 = 1e9;
  for (let n3 = 0; n3 < Xt.length; n3++) {
    let o2 = Xt[n3], s2 = Se[o2], c2 = e3 - s2.x, l2 = t2 - s2.z, u2 = Math.sqrt(c2 * c2 + l2 * l2);
    if (u2 - s2.r * Yt > r2) continue;
    let d2 = Math.atan2(l2, c2), f2 = Math.cos(d2), p2 = Math.sin(d2), m2 = 1 + 0.12 * Ht.noise2(f2 * 1.3 + o2 * 7.1, p2 * 1.3) + 0.05 * Ht.noise2(f2 * 4 + o2, p2 * 4), h2 = u2 - s2.r * m2;
    (h2 < r2 || h2 === r2 && o2 < a2) && (r2 = h2, i2 = s2, a2 = o2);
  }
  return n2 && (n2.island = i2), r2;
}
function Qt(e3, t2) {
  let n2 = qt(e3, t2), r2 = Zt(e3, t2);
  return Math.max(n2, -r2);
}
function $t(e3, t2) {
  let n2 = 0, r2 = 0;
  for (let i2 of ve) {
    let a2 = (e3 - i2.x) / i2.rx, o2 = (t2 - i2.z) / i2.rz, s2 = Math.exp(-(a2 * a2 + o2 * o2) * 2) + 1e-4;
    n2 += s2, r2 += s2 * i2.depth;
  }
  return r2 / n2;
}
function en(e3, t2, n2) {
  let r2 = 1e9;
  for (let i2 = 0; i2 < n2.length - 1; i2++) {
    let a2 = n2[i2][0], o2 = n2[i2][1], s2 = n2[i2 + 1][0], c2 = n2[i2 + 1][1], l2 = s2 - a2, u2 = c2 - o2, d2 = l2 * l2 + u2 * u2, f2 = d2 > 0 ? ((e3 - a2) * l2 + (t2 - o2) * u2) / d2 : 0;
    f2 = De(f2, 0, 1);
    let p2 = a2 + l2 * f2 - e3, m2 = o2 + u2 * f2 - t2, h2 = Math.sqrt(p2 * p2 + m2 * m2);
    h2 < r2 && (r2 = h2);
  }
  return r2;
}
function tn(e3) {
  let t2 = be.baseZ;
  for (let n2 of be.bulges) {
    let r2 = (e3 - n2.x) / n2.width;
    t2 += n2.amount * Math.exp(-r2 * r2);
  }
  return t2 + L.noise2(e3 * 0.05, 3.3) * 2.2;
}
function nn(e3, t2) {
  let n2 = tn(e3), r2 = N(n2, n2 - be.faceWidth, t2);
  if (r2 <= 0) return 0;
  let i2 = Math.max(0, -t2 - 60), a2 = be.westFadeX - 26 + 10 * L.noise2(t2 * 0.011, 4.1) - 0.45 * i2, o2 = be.eastFadeX + 22 + 8 * L.noise2(t2 * 0.011, 8.7) + 0.35 * i2, s2 = N(a2 - 40, a2 + 10, e3) * (1 - N(o2 - 10, o2 + 40, e3)), c2 = 1 - N(260, 380, -t2 + 50 * L.noise2(e3 * 6e-3, 2.2));
  return r2 * s2 * c2;
}
function rn(e3, t2) {
  let n2 = e3.length, r2 = t2.length, i2 = new Float64Array(n2), a2 = new Float64Array(n2);
  for (let t3 = 0; t3 < n2; t3++) i2[t3] = tn(e3[t3]), a2[t3] = L.noise2(e3[t3] * 6e-3, 2.2);
  let o2 = new Float32Array(n2 * r2);
  for (let s2 = 0; s2 < r2; s2++) {
    let r3 = t2[s2], c2 = Math.max(0, -r3 - 60), l2 = be.westFadeX - 26 + 10 * L.noise2(r3 * 0.011, 4.1) - 0.45 * c2, u2 = be.eastFadeX + 22 + 8 * L.noise2(r3 * 0.011, 8.7) + 0.35 * c2;
    for (let t3 = 0; t3 < n2; t3++) {
      let c3 = N(i2[t3], i2[t3] - be.faceWidth, r3);
      if (c3 <= 0) continue;
      let d2 = e3[t3], f2 = N(l2 - 40, l2 + 10, d2) * (1 - N(u2 - 10, u2 + 40, d2)), p2 = 1 - N(260, 380, -r3 + 50 * a2[t3]);
      o2[s2 * n2 + t3] = c3 * f2 * p2;
    }
  }
  return o2;
}
function an(e3) {
  return 0 + 2.1 * (1 - Math.exp(-e3 / 13)) + Math.max(0, e3 - 22) * 0.028;
}
var on = { island: null }, sn = xe.map((e3) => {
  let t2 = e3.width * 2, n2 = 1e9, r2 = 1e9, i2 = -1e9, a2 = -1e9;
  for (let [t3, o2] of e3.path) n2 = Math.min(n2, t3), r2 = Math.min(r2, o2), i2 = Math.max(i2, t3), a2 = Math.max(a2, o2);
  return [n2 - t2, r2 - t2, i2 + t2, a2 + t2];
}), cn = { wsd: 0, r: 0 };
function ln(e3, t2) {
  let n2 = qt(e3, t2), r2 = Zt(e3, t2, on), i2 = Math.max(n2, -r2), a2;
  if (i2 < 0) {
    let i3 = Math.max(0, -n2), o3 = $t(e3, t2) * (0.85 + 0.25 * L.noise2(e3 * 0.04 + 50, t2 * 0.04)), s2 = -1 * (1 - Math.exp(-i3 / 3.2)) - Math.max(0, o3 - 1) * N(2.5, 18, i3), c2 = Math.max(0, r2), l2 = -1 * (1 - Math.exp(-c2 / 2)) - 0.55 * Math.max(0, c2 - 1.5);
    a2 = 0 + Math.max(s2, l2), a2 += L.noise2(e3 * 0.18, t2 * 0.18) * 0.12 + Ht.noise2(e3 * 0.5, t2 * 0.5) * 0.04;
  } else if (r2 < 0 && n2 < 4) {
    let n3 = on.island, i3 = -r2, o3 = 1 - Math.exp(-i3 / (0.3 * n3.r));
    a2 = 0 + n3.h * o3;
    let s2 = (i3 - 0.25 * n3.r) / (0.22 * n3.r), c2 = Math.exp(-s2 * s2);
    a2 += n3.rocky * c2 * N(0, 1.5, i3) * (0.35 + 0.45 * L.noise2(e3 * 0.35, t2 * 0.35)), a2 += Ht.noise2(e3 * 0.6, t2 * 0.6) * 0.05;
    let l2 = Math.hypot(e3 - n3.x, t2 - n3.z);
    a2 = Ee(a2, 0 + n3.h, N(0.45 * n3.r, 0.2 * n3.r, l2));
  } else {
    let n3 = i2, r3 = an(n3);
    a2 = r3, a2 += L.noise2(e3 * 0.055, t2 * 0.055) * 0.14 * N(2, 20, n3);
    let o3 = Ae(e3, t2, n3);
    a2 += o3, n3 > 250 && (a2 = Math.max(a2, r3 + Me(e3, t2)));
    let s2 = nn(e3, t2);
    if (s2 > 0) {
      let r4 = be.height + L.fbm2(e3 * 0.03, t2 * 0.03, 3) * 2.2, i3 = tn(e3) - t2, o4 = N(35, 140, i3), c2 = o4 > 0 ? Ae(e3, t2, Math.max(n3, 60 + i3 * 1.6)) : 0;
      a2 = Ee(a2, Math.max(a2, 0 + r4 + c2 * o4), s2), a2 += s2 * Ht.ridged2(e3 * 0.05, t2 * 0.05, 3) * 1.6 * (1 - 0.8 * o4);
    }
  }
  let o2 = Math.sqrt(e3 * e3 + t2 * t2);
  o2 > 900 && (a2 += je(e3, t2));
  for (let n3 of ge) {
    let r3 = e3 - n3.pool[0], i3 = t2 - n3.pool[2], o3 = r3 * r3 + i3 * i3, s2 = n3.plungeR || 4;
    if (o3 < s2 * s2 * 4) {
      let e4 = Math.exp(-o3 / (s2 * s2 * 0.5));
      a2 = Math.min(a2, Ee(a2, 0 - (n3.plungeDepth || 2), e4));
    }
  }
  return cn.wsd = i2, cn.r = o2, a2;
}
function un(e3, t2) {
  let n2 = ln(e3, t2), r2 = cn.wsd, i2 = cn.r;
  if (n2 = mn(e3, t2, n2), r2 > 0.5 && i2 < 260) for (let r3 = 0; r3 < xe.length; r3++) {
    let i3 = sn[r3];
    if (e3 < i3[0] || t2 < i3[1] || e3 > i3[2] || t2 > i3[3]) continue;
    let a2 = xe[r3], o2 = en(e3, t2, a2.path);
    if (o2 < a2.width * 2) {
      let e4 = 1 - N(a2.width * 0.5, a2.width * 2, o2);
      n2 -= e4 * 0.06;
    }
  }
  return n2;
}
var dn = 0.25;
function fn(e3) {
  let t2 = e3.stream, n2 = [0], r2 = 1e9, i2 = 1e9, a2 = -1e9, o2 = -1e9;
  for (let e4 = 0; e4 < t2.length; e4++) e4 > 0 && n2.push(n2[e4 - 1] + Math.hypot(t2[e4][0] - t2[e4 - 1][0], t2[e4][1] - t2[e4 - 1][1])), r2 = Math.min(r2, t2[e4][0]), i2 = Math.min(i2, t2[e4][1]), a2 = Math.max(a2, t2[e4][0]), o2 = Math.max(o2, t2[e4][1]);
  let s2 = n2[n2.length - 1], c2 = Math.ceil(s2 / dn) + 1, l2 = (e4) => {
    let r3 = 0;
    for (; r3 < t2.length - 2 && n2[r3 + 1] < e4; ) r3++;
    let i3 = De((e4 - n2[r3]) / Math.max(1e-9, n2[r3 + 1] - n2[r3]), 0, 1);
    return [Ee(t2[r3][0], t2[r3 + 1][0], i3), Ee(t2[r3][1], t2[r3 + 1][1], i3)];
  }, u2 = new Float64Array(c2);
  for (let e4 = 0; e4 < c2; e4++) {
    let [t3, n3] = l2(Math.min(s2, e4 * dn));
    u2[e4] = ln(t3, n3);
  }
  let d2 = e3.lip[1] - 0.3, f2 = u2[0] - 1, p2 = new Float64Array(c2), m2 = 1e9;
  for (let e4 = 0; e4 < c2; e4++) {
    let t3 = Math.min(1, e4 * dn / s2), n3 = f2 + (d2 - f2) * t3;
    m2 = Math.min(m2, n3, u2[e4] - 0.7), p2[e4] = m2;
  }
  for (let e4 = 0; e4 < 2; e4++) {
    let e5 = new Float64Array(c2);
    for (let t3 = 0; t3 < c2; t3++) {
      let n3 = 0;
      for (let e6 = -8; e6 <= 8; e6++) n3 += p2[Math.min(c2 - 1, Math.max(0, t3 + e6))];
      e5[t3] = n3 / 17;
    }
    p2 = e5;
  }
  m2 = 1e9;
  for (let e4 = 0; e4 < c2; e4++) m2 = Math.min(m2, p2[e4], u2[e4] - 0.5), p2[e4] = m2;
  return { pts: t2, cum: n2, len: s2, prof: Float32Array.from(p2), n: c2, box: [r2 - 6, i2 - 6, a2 + 6, o2 + 6] };
}
var pn = ge.map(fn);
function mn(e3, t2, n2) {
  for (let r2 = 0; r2 < pn.length; r2++) {
    let i2 = pn[r2], a2 = i2.box;
    if (e3 < a2[0] || t2 < a2[1] || e3 > a2[2] || t2 > a2[3]) continue;
    let o2 = i2.pts, s2 = 1e9, c2 = 0;
    for (let n3 = 0; n3 < o2.length - 1; n3++) {
      let r3 = o2[n3][0], a3 = o2[n3][1], l3 = o2[n3 + 1][0] - r3, u3 = o2[n3 + 1][1] - a3, d3 = l3 * l3 + u3 * u3, f3 = d3 > 0 ? De(((e3 - r3) * l3 + (t2 - a3) * u3) / d3, 0, 1) : 0, p2 = r3 + l3 * f3 - e3, m2 = a3 + u3 * f3 - t2, h2 = Math.sqrt(p2 * p2 + m2 * m2);
      h2 < s2 && (s2 = h2, c2 = i2.cum[n3] + f3 * (i2.cum[n3 + 1] - i2.cum[n3]));
    }
    if (s2 >= 6) continue;
    let l2 = Math.exp(-(s2 * s2) / 3.2) * nn(e3, t2);
    if (l2 <= 0) continue;
    let u2 = Math.min(i2.n - 1, c2 / dn), d2 = Math.min(i2.n - 2, Math.floor(u2)), f2 = Ee(i2.prof[d2], i2.prof[d2 + 1], u2 - d2);
    n2 > f2 && (n2 -= (n2 - f2) * l2);
  }
  return n2;
}
function hn(e3, t2) {
  let n2 = pn[e3];
  if (!n2) return NaN;
  let r2 = De(t2 / dn, 0, n2.n - 1), i2 = Math.min(n2.n - 2, Math.floor(r2));
  return Ee(n2.prof[i2], n2.prof[i2 + 1], r2 - i2);
}
function gn(e3, t2) {
  for (let n2 = 0; n2 < Kt.length; n2++) {
    let r2 = Kt[n2];
    if (e3 >= r2.x0 && e3 <= r2.x1 && t2 >= r2.z0 && t2 <= r2.z1) return n2;
  }
  return Kt.length - 1;
}
function _n(e3, t2, n2) {
  let r2 = Kt[e3], i2 = r2.step;
  if (e3 < Kt.length - 1) {
    let e4 = Math.round(r2.x0 / i2), a2 = Math.round(r2.x1 / i2), o2 = Math.round(r2.z0 / i2), s2 = Math.round(r2.z1 / i2);
    if ((t2 === e4 || t2 === a2) && n2 & 1) return 0.5 * (un(t2 * i2, (n2 - 1) * i2) + un(t2 * i2, (n2 + 1) * i2));
    if ((n2 === o2 || n2 === s2) && t2 & 1) return 0.5 * (un((t2 - 1) * i2, n2 * i2) + un((t2 + 1) * i2, n2 * i2));
  }
  return un(t2 * i2, n2 * i2);
}
function vn(e3, t2) {
  let n2 = gn(e3, t2), r2 = Kt[n2].step, i2 = e3 / r2, a2 = t2 / r2, o2 = Math.floor(i2), s2 = Math.floor(a2), c2 = i2 - o2, l2 = a2 - s2, u2 = _n(n2, o2 + 1, s2), d2 = _n(n2, o2, s2 + 1);
  if (c2 + l2 <= 1) {
    let e4 = _n(n2, o2, s2);
    return e4 + (u2 - e4) * c2 + (d2 - e4) * l2;
  }
  let f2 = _n(n2, o2 + 1, s2 + 1);
  return f2 + (d2 - f2) * (1 - c2) + (u2 - f2) * (1 - l2);
}
function yn(e3, t2, n2 = 0.35, r2 = [0, 1, 0]) {
  let i2 = un(e3 + n2, t2) - un(e3 - n2, t2), a2 = un(e3, t2 + n2) - un(e3, t2 - n2), o2 = -i2, s2 = 2 * n2, c2 = -a2, l2 = Math.hypot(o2, s2, c2);
  return r2[0] = o2 / l2, r2[1] = s2 / l2, r2[2] = c2 / l2, r2;
}
function bn(e3, t2) {
  let n2 = yn(e3, t2);
  return Math.acos(De(n2[1], -1, 1)) * 180 / Math.PI;
}
function xn(e3, t2) {
  return un(e3, t2) < 0;
}
function Sn(e3, t2) {
  return Math.max(0, 0 - un(e3, t2));
}
function Cn(e3, t2) {
  let n2 = 1e9;
  for (let r2 of xe) n2 = Math.min(n2, en(e3, t2, r2.path) - r2.width * 0.5);
  for (let r2 of we) n2 = Math.min(n2, en(e3, t2, r2.path) - r2.width * 0.5);
  return n2;
}
pe.lagoon_depth = `
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
`;
var wn = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;
function Tn() {
  let e3 = new te();
  return e3.setAttribute(`position`, new d([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3)), e3.setAttribute(`uv`, new d([0, 0, 2, 0, 0, 2], 2)), e3;
}
var En = class {
  constructor(e3) {
    this.engine = e3;
    let t2 = e3.renderer, n2 = e3.quality;
    this.quality = n2;
    let r2 = ut(n2);
    this.tier = r2, t2.autoClear = false, t2.shadowMap.autoUpdate = false;
    let i2 = t2.getDrawingBufferSize(new j()), o2 = Math.max(1, i2.x), s2 = Math.max(1, i2.y), c2 = new T(o2, s2);
    c2.type = m, this.opaqueRT = new D(o2, s2, { type: S, samples: n2.msaa, depthBuffer: true, depthTexture: c2, minFilter: g, magFilter: g, generateMipmaps: false });
    let l2 = P.get(`taa`), u2 = !P.nopost && (l2 === `1` || l2 !== `0` && r2 >= 3), d2;
    u2 && (d2 = new T(o2, s2), d2.type = m), this.compositeRT = new D(o2, s2, { type: S, depthBuffer: true, depthTexture: d2 ?? null, minFilter: g, magFilter: g, generateMipmaps: false }), this.uniforms = { tSceneColor: { value: this.opaqueRT.texture }, tSceneDepth: { value: this.opaqueRT.depthTexture }, uResolution: { value: new j(o2, s2) }, uCameraNear: { value: e3.camera.near }, uCameraFar: { value: e3.camera.far }, uProjectionInverse: { value: new k() }, uViewInverse: { value: new k() }, uUnderwater: { value: 0 } }, this.postUniforms = { uCamNear: this.uniforms.uCameraNear, uCamFar: this.uniforms.uCameraFar, uProjParams: { value: new O(1, 1, 0, 0) } }, this.fsCamera = new a(-1, 1, 1, -1, 0, 1), this.fsQuad = new w(Tn()), this.fsQuad.frustumCulled = false, this.copyMat = new se({ uniforms: { tColor: this.uniforms.tSceneColor, tDepth: this.uniforms.tSceneDepth }, vertexShader: wn, fragmentShader: `
        uniform sampler2D tColor; uniform sampler2D tDepth; varying vec2 vUv;
        void main() {
          ivec2 p = ivec2(gl_FragCoord.xy);
          gl_FragColor = texelFetch(tColor, p, 0);
          gl_FragDepth = texelFetch(tDepth, p, 0).r;
        }`, depthTest: true, depthWrite: true, depthFunc: 1 });
    let f2 = P.get(`tone`);
    this.settings = { tone: f2 && jt[f2] ? f2 : `neutral`, ao: !!n2.ssao && !P.has(`noao`), bloom: !!n2.bloom && !P.has(`nobloom`), shafts: !!n2.sunShafts && !P.has(`noshafts`), underwater: !P.has(`nounderwater`), debugView: +!!P.has(`aoview`), taa: u2, autoExposure: !!n2.bloom && !P.has(`noautoexp`), grade: Mt[P.get(`grade`)] ? P.get(`grade`) : `photo`, grain: P.has(`nograin`) ? 0 : P.num(`grain`, r2 >= 4 ? 0.011 : r2 >= 3 ? 8e-3 : 0), ca: P.has(`noca`) ? 0 : P.num(`ca`, r2 >= 4 ? 6e-4 : 0) }, this.post = { exposure: { value: P.num(`exposure`, 1) }, tInput: { value: this.compositeRT.texture }, tBloom: { value: null }, uBloomStrength: { value: 0 } }, this.compositeMat = Ft(this, this.post), this.compositeMat.uniforms.uNoPost.value = +!!P.nopost, this._grade = null, this.gradeOverrides = null, this.ao = n2.ssao ? new gt(this, n2) : null, this.bloom = n2.bloom ? new Tt(this, r2 >= 3 ? 7 : 6) : null, this.shafts = n2.sunShafts ? new Ot(this, r2 >= 3 ? 2 : 4) : null, this.underwater = new At(this), this.taa = u2 ? new bt(this) : null, this.adapt = this.bloom ? new Bt(this) : null, this._aoInPlace = this.opaqueRT.samples > 0 && !t2.extensions.has(`WEBGL_multisampled_render_to_texture`), this.compositeMat.uniforms.tAO.value = this.ao ? this.ao.texture : null, this.timer = new Rt(t2), (P.debug || P.has(`gpu`)) && this.timer.api.enable(), typeof window < `u` && window.__lagoon && (window.__lagoon.gpu = this.timer.api), this.preRender = [], this.postOpaque = [], this.postPasses = [], this.stats = { calls: 0, triangles: 0, programs: 0, geometries: 0, textures: 0, postCalls: 0 }, this._camMask = 0, this._frame = 0, this._fsDraws = 0, this._warm = 0, this._sunDir = new M(), this._sizeV = new j(), this._resizePasses(o2, s2);
  }
  _resizePasses(e3, t2) {
    this.ao?.setSize(e3, t2), this.taa?.setSize(e3, t2), this.bloom?.setSize(e3, t2), this.shafts?.setSize(e3, t2), this.underwater.setSize(e3, t2);
    let n2 = e3 / Math.max(1, t2), r2 = Math.hypot(n2 * 0.5, 0.5);
    this.compositeMat.uniforms.uAspect.value.set(n2 / r2, 1 / r2);
  }
  setSize() {
    let e3 = this.engine.renderer.getDrawingBufferSize(this._sizeV), t2 = Math.max(1, e3.x), n2 = Math.max(1, e3.y);
    this.opaqueRT.setSize(t2, n2), this.compositeRT.setSize(t2, n2);
    for (let e4 of [this.opaqueRT, this.compositeRT]) {
      let r2 = e4.depthTexture;
      r2?.image && (r2.image.width = t2, r2.image.height = n2);
    }
    this.uniforms.uResolution.value.set(t2, n2), this._resizePasses(t2, n2);
    for (let e4 of this._resize || []) e4(t2, n2);
  }
  onResize(e3) {
    (this._resize ||= []).push(e3);
  }
  setTone(e3) {
    jt[e3] && (this.settings.tone = e3);
  }
  setGrade(e3, t2 = null) {
    Mt[e3] && (this.settings.grade = e3), this.gradeOverrides = t2, this._grade = null;
  }
  setExposure(e3) {
    this.post.exposure.value = e3;
  }
  get toneCalibration() {
    return jt[this.settings.tone].calib;
  }
  drawFullscreen(e3, t2) {
    let n2 = this.engine.renderer;
    this.fsQuad.material = e3, this._fsDraws++, n2.setRenderTarget(t2 ?? null), n2.render(this.fsQuad, this.fsCamera);
  }
  _underwaterAmount(e3) {
    let t2 = F.uCameraUnderwater.value, n2 = F.uWaterLevel.value, r2 = e3.position;
    return t2 < 1 && r2.y < n2 - 0.08 && Sn(r2.x, r2.z) > 0.05 && (t2 = 1), Math.min(1, Math.max(0, t2));
  }
  render(e3) {
    let { renderer: t2, scene: n2, camera: r2 } = this.engine, i2 = this.settings, a2 = this.timer, o2 = P.nopost, s2 = this._warm < 1;
    t2.info.reset(), this._fsDraws = 0, a2.frameStart(), r2.updateMatrixWorld();
    let c2 = !!this.taa && !o2 && (i2.taa || s2);
    c2 && i2.taa && this.taa.jitter(r2, this._frame), this.uniforms.uCameraNear.value = r2.near, this.uniforms.uCameraFar.value = r2.far, this.uniforms.uProjectionInverse.value.copy(r2.projectionMatrixInverse), this.uniforms.uViewInverse.value.copy(r2.matrixWorld), dt(r2, this.postUniforms.uProjParams.value);
    let l2 = i2.underwater ? this._underwaterAmount(r2) : 0;
    this.uniforms.uUnderwater.value = l2;
    let u2 = r2.layers.mask;
    a2.begin(`reflect`);
    for (let i3 of this.preRender) i3(t2, n2, r2, e3);
    a2.begin(`opaque`), r2.layers.mask = u2, r2.layers.disable(et.WATER), r2.layers.disable(et.FX), t2.shadowMap.needsUpdate = true, t2.setRenderTarget(this.opaqueRT), t2.setClearColor(0, 1), t2.clear(true, true, false), t2.render(n2, r2), t2.shadowMap.needsUpdate = false, r2.layers.mask = u2;
    let d2 = this.ao && !o2 && (i2.ao || s2 || i2.debugView === 1);
    if (d2 && (a2.begin(`ao`), this.ao.applyMat.uniforms.uExposureRef.value = 1, this.ao.compute(), this._aoInPlace && i2.ao)) {
      let e4 = this.opaqueRT;
      e4.resolveDepthBuffer = false, this.drawFullscreen(this.ao.applyMat, e4), e4.resolveDepthBuffer = true;
    }
    if (a2.begin(`copy`), t2.setRenderTarget(this.compositeRT), t2.clear(true, true, false), this.drawFullscreen(this.copyMat, this.compositeRT), d2 && !this._aoInPlace && i2.ao && this.drawFullscreen(this.ao.applyMat, this.compositeRT), this.postOpaque.length) {
      a2.begin(`postOpaque`);
      for (let e4 of this.postOpaque) e4(t2, this);
    }
    a2.begin(`water`), t2.setRenderTarget(this.compositeRT), r2.layers.set(et.WATER), t2.render(n2, r2), r2.layers.set(et.FX), t2.render(n2, r2), r2.layers.mask = u2;
    let f2 = this.compositeRT.texture;
    if (c2) {
      this.taa.restore(r2), a2.begin(`taa`);
      let e4 = this.taa.render(f2, this.compositeRT.depthTexture, r2, this._frame);
      i2.taa && (f2 = e4);
    }
    if (!o2 && (l2 > 0 || s2)) {
      a2.begin(`underwater`);
      let e4 = this.underwater.render(f2, r2, Math.max(l2, 0));
      l2 > 0 && (f2 = e4);
    }
    if (this.postPasses.length) {
      a2.begin(`post`);
      for (let e4 of this.postPasses) {
        let n3 = e4(t2, this, f2);
        n3 && (f2 = n3);
      }
    }
    let p2 = this.compositeMat.uniforms, m2 = this.post.exposure.value * this.toneCalibration;
    if (p2.uShaftColor.value.set(0, 0, 0), this.shafts && !o2 && (i2.shafts || s2)) {
      this._sunDir.copy(F.uSunDir.value).normalize();
      let e4 = l2 > 0 ? 0 : this.shafts.update(r2, this._sunDir);
      if ((e4 > 1e-3 || s2) && (a2.begin(`shafts`), p2.tShafts.value = this.shafts.render(), i2.shafts && e4 > 1e-3)) {
        let t3 = F.uFogSunColor.value, n3 = this.shafts.settings.amount * e4;
        p2.uShaftColor.value.set(t3.r * n3, t3.g * n3, t3.b * n3), p2.uShaftDist.value = this.shafts.settings.distScale, p2.uShaftSky.value = this.shafts.settings.skyFactor, p2.uShaftSharp.value = this.shafts.settings.sharpness, p2.uSunView.value.copy(this.shafts.sunView);
      }
    }
    this.post.uBloomStrength.value = 0;
    let h2 = !!this.adapt && i2.autoExposure && !o2;
    if (this.bloom && !o2 && (i2.bloom || h2 || s2)) {
      a2.begin(`bloom`);
      let n3 = this.bloom.render(f2, m2, h2 ? this.adapt.current.value : null);
      i2.bloom && (this.post.tBloom.value = n3, this.post.uBloomStrength.value = this.bloom.compositeScale), (h2 || s2) && (this.adapt.update(this.bloom.meterTarget, r2, e3, P.capture || s2), P.debug && !(this._frame & 15) && this.adapt.poll(t2));
    }
    p2.uAutoExp.value = +!!h2, p2.tAdapt.value = this.adapt ? this.adapt.current.value : null, a2.begin(`composite`), this.post.tInput.value = f2, p2.uCalib.value = this.toneCalibration, p2.uTone.value = jt[i2.tone].id, p2.uFrame.value = this._frame & 65535, p2.uDebugView.value = this.ao ? i2.debugView : 0, this._grade !== i2.grade && (Pt(this.compositeMat, i2.grade, this.gradeOverrides), this._grade = i2.grade), p2.uGrain.value = i2.grain, p2.uSharpen.value = c2 && i2.taa ? this.taa.settings.sharpen : 0, p2.uTexel.value.set(1 / this.uniforms.uResolution.value.x, 1 / this.uniforms.uResolution.value.y), p2.uCA.value = i2.ca, this.drawFullscreen(this.compositeMat, null), a2.end(), this._frame++, s2 && this._warm++;
    let g2 = t2.info;
    this.stats.calls = g2.render.calls, this.stats.triangles = g2.render.triangles, this.stats.programs = g2.programs?.length ?? 0, this.stats.geometries = g2.memory.geometries, this.stats.textures = g2.memory.textures, this.stats.postCalls = this._fsDraws;
  }
};
function Dn(e3) {
  return { traverse(t2) {
    for (let n2 = 0; n2 < e3.length; n2++) {
      let r2 = e3[n2];
      r2.drawState && Object.assign(r2.material, r2.drawState), t2(r2);
    }
  }, traverseVisible() {
  } };
}
var On = [`side`, `map`, `alphaMap`, `alphaTest`, `displacementMap`, `displacementScale`, `clipShadows`, `clippingPlanes`, `clipIntersection`, `wireframe`, `visible`];
function kn(e3) {
  if (!(e3.isMeshDepthMaterial || e3.isMeshDistanceMaterial)) return { side: e3.side };
  let t2 = {};
  for (let n2 of On) t2[n2] = e3[n2];
  return t2;
}
function An(e3, t2) {
  let n2 = Object.create(e3);
  return n2.material = t2, n2.drawState = kn(t2), n2;
}
var jn = 16588800, Mn = class {
  constructor(e3) {
    this.container = e3, this.params = P;
    let t2 = new me({ antialias: false, alpha: false, powerPreference: `high-performance`, stencil: false, depth: true, preserveDrawingBuffer: P.capture });
    this.gpu = Ye(t2.getContext()), this.quality = $e(this.gpu);
    let n2 = t2.capabilities.maxTextureSize || 4096;
    this.quality.shadowMapSize = Math.min(this.quality.shadowMapSize, n2), this.quality.textureSize = Math.min(this.quality.textureSize, n2), this.parallelCompile = t2.extensions.has(`KHR_parallel_shader_compile`), this.renderScale = P.has(`scale`) ? Ke(P.num(`scale`, 1)) : qe(), this.pixelScale = 1, t2.setPixelRatio(this._pixelRatio(e3.clientWidth, e3.clientHeight)), t2.setSize(e3.clientWidth, e3.clientHeight, false), t2.outputColorSpace = h, t2.toneMapping = 0, t2.shadowMap.enabled = true, t2.shadowMap.type = 1, t2.info.autoReset = false, e3.appendChild(t2.domElement), t2.domElement.style.display = `block`, t2.domElement.style.width = `100%`, t2.domElement.style.height = `100%`, this.renderer = t2, this.canvas = t2.domElement, this.scene = new ee(), this.scene.matrixWorldAutoUpdate = true;
    let r2 = e3.clientWidth / Math.max(1, e3.clientHeight);
    this.camera = new ie(P.fov ?? 70, r2, 0.1, 9e3), this.camera.layers.enable(et.OPAQUE), this.camera.layers.enable(et.NO_REFLECT), this.camera.rotation.order = `YXZ`, this.scene.add(this.camera), this.pipeline = new En(this), this.updaters = [], this.time = P.freeze ?? 0, this.frame = 0, this._last = 0, this.running = false, this._resizeHandlers = [], this.dynres = new Rn(this, !P.capture && !P.has(`playertest`) && !P.has(`nodynres`)), window.addEventListener(`resize`, () => this.resize());
  }
  addUpdate(e3, t2 = 0) {
    return this.updaters.push({ fn: e3, order: t2 }), this.updaters.sort((e4, t3) => e4.order - t3.order), () => {
      this.updaters = this.updaters.filter((t3) => t3.fn !== e3);
    };
  }
  onResize(e3) {
    this._resizeHandlers.push(e3);
  }
  resize() {
    let e3 = this.container.clientWidth, t2 = this.container.clientHeight;
    this.renderer.setSize(e3, t2, false), this.camera.aspect = e3 / Math.max(1, t2), this.camera.updateProjectionMatrix(), this.pipeline.setSize(e3, t2);
    for (let e4 of [this.pipeline.opaqueRT, this.pipeline.compositeRT]) {
      let t3 = e4?.depthTexture;
      t3 && (t3.image.width !== e4.width || t3.image.height !== e4.height) && (t3.image.width = e4.width, t3.image.height = e4.height);
    }
    for (let n2 of this._resizeHandlers) n2(e3, t2);
  }
  _pixelRatio(e3 = this.container.clientWidth, t2 = this.container.clientHeight) {
    let n2 = this.quality.pixelRatio * this.pixelScale, r2 = n2 * this.renderScale;
    return this.renderScale > 1 && (r2 = Math.min(r2, Math.max(n2, Math.sqrt(jn / Math.max(1, e3 * t2))))), Math.max(0.25, r2);
  }
  _applyPixelRatio() {
    let e3 = this._pixelRatio();
    Math.abs(this.renderer.getPixelRatio() - e3) < 1e-3 || (this.renderer.setPixelRatio(e3), this.resize());
  }
  setPixelScale(e3) {
    this.pixelScale = e3, this._applyPixelRatio();
  }
  setRenderScale(e3) {
    return this.renderScale = Ke(e3), this._applyPixelRatio(), this.renderScale;
  }
  update(e3) {
    e3 = Math.min(e3, 1 / 20), P.freeze === null && (this.time += e3), F.uTime.value = this.time;
    let t2 = this.updaters;
    for (let n2 = 0; n2 < t2.length; n2++) t2[n2].fn(e3, this.time);
    return e3;
  }
  render(e3) {
    this.pipeline.render(e3), this.frame++;
  }
  step(e3) {
    this.render(this.update(e3));
  }
  start() {
    if (this.running) return;
    this.running = true, this._last = performance.now(), this.dynres.reset(3e3);
    let e3 = this._gen = (this._gen || 0) + 1, t2 = (n2) => {
      if (!this.running || e3 !== this._gen) return;
      requestAnimationFrame(t2);
      let r2 = Math.max(0, n2 - this._last);
      this._last = n2, this.dynres.sample(r2), this.step(r2 / 1e3);
    };
    requestAnimationFrame(t2);
  }
  stop() {
    this.running = false, this._gen = (this._gen || 0) + 1;
  }
  compileObjects(e3) {
    if (!e3.length) return;
    let t2 = this.renderer, n2 = t2.getRenderTarget();
    t2.setRenderTarget(this.pipeline.opaqueRT);
    try {
      t2.compile(Dn(e3), this.camera, this.scene);
    } finally {
      t2.setRenderTarget(n2);
    }
  }
  _forceAll(e3) {
    let t2 = this.renderer, n2 = this.pipeline, r2 = [], i2 = [], a2 = [];
    this.scene.traverse((t3) => {
      if (t3.isLight) {
        t3.castShadow && t3.shadow && (i2.push(t3.shadow, t3.shadow.needsUpdate), e3 && t3.shadow.autoUpdate === false && (t3.shadow.needsUpdate = false));
        return;
      }
      t3.isCamera || (r2.push(t3, t3.visible, t3.frustumCulled), t3.visible = true, t3.frustumCulled = false, t3.isLOD && (a2.push(t3, t3.autoUpdate), t3.autoUpdate = false));
    });
    let o2 = n2._frame, s2 = n2._warm, c2 = t2.shadowMap.needsUpdate;
    return () => {
      for (let e4 = 0; e4 < r2.length; e4 += 3) r2[e4].visible = r2[e4 + 1], r2[e4].frustumCulled = r2[e4 + 2];
      for (let e4 = 0; e4 < a2.length; e4 += 2) a2[e4].autoUpdate = a2[e4 + 1];
      for (let e4 = 0; e4 < i2.length; e4 += 2) i2[e4].needsUpdate = i2[e4 + 1];
      n2._frame = o2, n2._warm = s2, t2.shadowMap.needsUpdate = c2;
    };
  }
  compileFrame(e3 = 1 / 60) {
    let t2 = this.renderer, n2 = this.pipeline, r2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Set(), a2 = [], o2 = this._forceAll(false), s2 = t2.render, c2 = t2.renderBufferDirect;
    t2.render = function(e4, t3) {
      a2.push(e4, t3);
      try {
        return s2.call(this, e4, t3);
      } finally {
        a2.length -= 2;
      }
    }, t2.renderBufferDirect = function(e4, n3, o3, s3, c3) {
      let l3 = a2.length, u3 = n3 || a2[l3 - 2], d3 = a2[l3 - 1] || e4;
      if (!u3 || !s3 || !c3) return;
      let f2 = t2.getRenderTarget(), p2 = d3.layers.mask, m2 = u3.id + `:` + d3.id + `:` + +!!f2 + `:` + p2, h2 = r2.get(m2);
      h2 || r2.set(m2, h2 = { scene: u3, camera: d3, target: f2, mask: p2, list: [] });
      let g2 = m2 + `:` + s3.id + `:` + c3.id + `:` + s3.side + `:` + (s3.map ? s3.map.id : 0);
      i2.has(g2) || (i2.add(g2), h2.list.push(An(c3, s3)));
    };
    try {
      n2.render(e3);
    } finally {
      t2.render = s2, t2.renderBufferDirect = c2, o2();
    }
    let l2 = t2.getRenderTarget(), u2 = /* @__PURE__ */ new Map();
    for (let e4 of r2.values()) for (let t3 of e4.list) u2.has(t3.material) || u2.set(t3.material, kn(t3.material));
    let d2 = 0;
    for (let e4 of r2.values()) {
      let n3 = e4.camera.layers.mask;
      e4.camera.layers.mask = e4.mask;
      try {
        t2.setRenderTarget(e4.target), t2.compile(Dn(e4.list), e4.camera, e4.scene);
      } catch (e5) {
        console.warn(`[lagoon] warm-up compile failed for a pass:`, e5);
      } finally {
        e4.camera.layers.mask = n3;
      }
      d2 += e4.list.length;
    }
    for (let [e4, t3] of u2) Object.assign(e4, t3);
    return t2.setRenderTarget(l2), { draws: d2, groups: r2.size };
  }
  drawAll(e3 = 1 / 60) {
    let t2 = this._forceAll(true);
    try {
      this.pipeline.render(e3);
    } finally {
      t2();
    }
  }
  programsPending() {
    let e3 = this.renderer.info.programs, t2 = 0;
    for (let n2 = 0; n2 < e3.length; n2++) e3[n2].isReady() || t2++;
    return t2;
  }
  async waitForPrograms(e3 = null, t2 = 12e4) {
    let n2 = performance.now();
    for (; ; ) {
      let r2 = this.renderer.info.programs, i2 = 0;
      for (let e4 = 0; e4 < r2.length; e4++) r2[e4].isReady() && i2++;
      if (e3?.(i2, r2.length), i2 >= r2.length) return true;
      if (performance.now() - n2 > t2) return false;
      await new Promise((e4) => setTimeout(e4, 16));
    }
  }
  async gpuIdle(e3 = 15e3) {
    let t2 = this.renderer.getContext();
    if (!t2.fenceSync) return;
    let n2 = t2.fenceSync(t2.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!n2) return;
    t2.flush();
    let r2 = performance.now();
    for (; t2.getSyncParameter(n2, t2.SYNC_STATUS) !== t2.SIGNALED && performance.now() - r2 < e3; ) await new Promise((e4) => setTimeout(e4, 8));
    t2.deleteSync(n2);
  }
}, Nn = [1, 0.875, 0.75], Pn = 28, Fn = 17.5, In = 3e3, Ln = 12e3, Rn = class {
  constructor(e3, t2) {
    this.engine = e3, this.enabled = t2, this.level = 0, this.scale = 1, this.banned = new Uint8Array(Nn.length), this.buf = new Float32Array(512), this.tmp = new Float32Array(512), this.n = 0, this.acc = 0, this.grace = 0, this.upAt = -1e9, this.clock = 0, this.changes = 0;
  }
  reset(e3 = 0) {
    this.n = 0, this.acc = 0, this.grace = e3;
  }
  sample(e3) {
    if (!this.enabled) return;
    if (e3 > 250 || document.hidden) {
      this.n = 0, this.acc = 0;
      return;
    }
    if (this.clock += e3, this.grace > 0) {
      this.grace -= e3;
      return;
    }
    if (this.n < this.buf.length && (this.buf[this.n++] = e3), this.acc += e3, this.acc < In) return;
    let t2 = this._median();
    this.n = 0, this.acc = 0, t2 > Pn && this.level < Nn.length - 1 ? (this.clock - this.upAt < Ln && (this.banned[this.level] = 1), this._set(this.level + 1)) : t2 < Fn && this.level > 0 && !this.banned[this.level - 1] && (this.upAt = this.clock, this._set(this.level - 1));
  }
  _median() {
    let e3 = this.n, t2 = this.tmp;
    for (let n3 = 0; n3 < e3; n3++) t2[n3] = this.buf[n3];
    let n2 = t2.subarray(0, e3);
    return n2.sort(), e3 ? n2[e3 >> 1] : 0;
  }
  _set(e3) {
    this.level = e3, this.scale = Nn[e3], this.changes++, this.engine.setPixelScale(this.scale), this.grace = 1e3, window.__lagoon && (window.__lagoon.renderScale = this.scale);
  }
};
pe.lagoon_common = `
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
`;
var zn = `
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
`, Bn = `
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
`, Vn = pe.lights_fragment_begin, Hn = Vn.indexOf(`#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )`), Un = Vn.indexOf(`#if ( NUM_RECT_AREA_LIGHTS > 0 )`), Wn = Hn >= 0 && Un > Hn;
Wn || console.warn(`[lagoon] materialPatch: lights_fragment_begin layout changed; using three sun loop`), pe.lagoon_lights_fragment_begin = Wn ? Vn.slice(0, Hn) + zn + `
` + Vn.slice(Un) : Vn;
var Gn = (e3) => `
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
  ${e3 ? `float lgUM = lagoonUnderwaterMask( vLagoonWorldPos );
  vec3 lgW = lgUM > 0.0 ? mix( vec3( 1.0 ), 0.9 * exp( -uWaterAbsorb * ( ( uWaterLevel - vLagoonWorldPos.y ) * 1.25 ) ), lgUM ) : vec3( 1.0 );
  lgA *= lgW;
  lgB *= lgW;
  lgAs *= lgW;
  lgBs *= lgW;
  #if defined( RE_IndirectDiffuse )
    irradiance *= lgW;
  #endif` : ``}
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
`, Kn = /* @__PURE__ */ new Map();
typeof window < `u` && (window.__lagoonTextureBudget = Kn);
var qn = 6, Jn = new Set(`alphaMap anisotropyMap aoMap batchingColorTexture batchingIdTexture batchingTexture boneTexture bumpMap clearcoatMap clearcoatNormalMap clearcoatRoughnessMap dfgLUT directionalShadowMap displacementMap emissiveMap envMap gradientMap iridescenceMap iridescenceThicknessMap lightMap ltc_1 ltc_2 map matcap metalnessMap morphTexture morphTargetsTexture normalMap pointShadowMap probesSH roughnessMap sheenColorMap sheenRoughnessMap specularColorMap specularIntensityMap specularMap spotLightMap spotShadowMap thicknessMap transmissionMap transmissionSamplerMap`.split(` `));
function Yn(e3, t2, n2) {
  let r2 = n2?.capabilities?.maxTextures ?? 16, i2 = Xn(e3, t2, r2), a2 = `#define LAGOON_MASK_IN_SKYOCC
`;
  i2 > r2 && (a2 += `#define LAGOON_NO_GROUNDBOUNCE
`);
  let o2 = Kn.get(t2.name || t2.type);
  return o2 && (o2.dropped = i2 > r2 ? [`GROUNDBOUNCE`] : []), o2 && i2 - 1 > r2 && (o2.over = true), a2;
}
function Xn(e3, t2, n2) {
  let r2 = qn, i2 = [];
  for (let t3 in e3) (t3.endsWith(`Map`) || t3 === `map` || t3 === `matcap`) && e3[t3] === true && i2.push(t3);
  r2 += i2.length, t2.isMeshStandardMaterial && r2++, e3.batching && (r2 += e3.batchingColor ? 3 : 2), (e3.morphTargets || e3.morphNormals || e3.morphColors) && r2++, e3.skinning && r2++, e3.transmission && r2++;
  let a2 = /* @__PURE__ */ new Set(), o2 = /uniform\s+(?:(?:highp|mediump|lowp)\s+)?[iu]?sampler\w+\s+(\w+)/g;
  for (let t3 of [e3.vertexShader, e3.fragmentShader]) for (let e4 of t3.matchAll(o2)) Jn.has(e4[1]) || a2.add(e4[1]);
  return r2 += a2.size, Kn.set(t2.name || t2.type, { units: r2, max: n2, maps: i2, own: [...a2] }), r2;
}
var Zn = () => /float\s+ambientOcclusion\s*=/.test(pe.aomap_fragment || ``), Qn = [];
function $n(e3) {
  Qn.find((t2) => t2.key === e3.key) || Qn.push(e3);
}
var er = /* @__PURE__ */ new WeakSet();
function tr(e3, n2 = {}) {
  if (!e3 || er.has(e3) || e3.isShaderMaterial || e3.isRawShaderMaterial || !(e3.isMeshStandardMaterial || e3.isMeshLambertMaterial || e3.isMeshPhongMaterial || e3.isMeshBasicMaterial)) return e3;
  er.add(e3);
  let r2 = n2.extraLight !== false && !e3.isMeshBasicMaterial, i2 = n2.fog !== false;
  for (let t2 of Qn) t2.setup?.(e3);
  let a2 = e3.onBeforeCompile, o2 = e3.customProgramCacheKey === t.prototype.customProgramCacheKey ? null : e3.customProgramCacheKey.bind(e3), s2 = a2 && a2 !== t.prototype.onBeforeCompile ? a2.toString() : ``, c2 = 0;
  for (let e4 = 0; e4 < s2.length; e4++) c2 = Math.imul(c2, 31) + s2.charCodeAt(e4) | 0;
  return e3.onBeforeCompile = function(n3, o3) {
    a2 && a2 !== t.prototype.onBeforeCompile && a2.call(this, n3, o3);
    for (let e4 in F) n3.uniforms[e4] = F[e4];
    let s3 = this;
    n3.uniforms.uLagoonEnvScale = { get value() {
      return s3.envMapIntensity ?? 1;
    }, set value(e4) {
    } }, n3.vertexShader = n3.vertexShader.replace(`#include <common>`, `#include <common>
varying vec3 vLagoonWorldPos;`).replace(`#include <fog_vertex>`, `#include <fog_vertex>
vLagoonWorldPos = (vec4(mvPosition.xyz, 0.0) * viewMatrix).xyz + cameraPosition;`);
    let c3 = Yn(n3, e3, o3), l2 = n3.fragmentShader.replace(`#include <common>`, `#include <common>
${c3}#include <lagoon_common>
varying vec3 vLagoonWorldPos;
uniform float uLagoonEnvScale;`).replace(`#include <lights_fragment_begin>`, `#include <lagoon_lights_fragment_begin>`).replace(`#include <lights_fragment_end>`, Gn(r2));
    e3.isMeshStandardMaterial && l2.includes(`#include <aomap_fragment>`) && Zn() && (l2 = l2.replace(`#include <aomap_fragment>`, `#include <aomap_fragment>
` + Bn)), r2 && (l2 = l2.replace(`#include <opaque_fragment>`, `outgoingLight += lagoonExtraLight(diffuseColor.rgb, vLagoonWorldPos, normalize((vec4(normal, 0.0) * viewMatrix).xyz));
#include <opaque_fragment>`)), i2 && (l2 = l2.replace(`#include <fog_fragment>`, `gl_FragColor.rgb = uLightDebug > 0.5 ? lagoonDebugColor : lagoonAtmosphere(gl_FragColor.rgb, vLagoonWorldPos);`)), n3.fragmentShader = l2;
    for (let t2 of Qn) t2.onBeforeCompile?.(n3, e3);
  }, e3.customProgramCacheKey = function() {
    return (o2 ? o2() : `h` + c2) + `|lagoon3:${+!!r2}${+!!i2}:${Qn.map((e4) => e4.key).join(`,`)}`;
  }, e3.needsUpdate = true, e3;
}
function nr(e3) {
  e3.traverse((e4) => {
    if (!e4.material) return;
    let t2 = Array.isArray(e4.material) ? e4.material : [e4.material];
    for (let e5 of t2) e5.userData?.noPatch || tr(e5);
  });
}
var rr = 1.25, ir = 65535, ar = 2 ** -24, or = /* @__PURE__ */ Symbol(`SKIP_GENERATION`), sr = { strategy: 0, maxDepth: 40, targetLeafSize: 10, useSharedArrayBuffer: false, setBoundingBox: true, onProgress: null, indirect: false, verbose: true, range: null, [or]: false };
function R(e3, t2, n2) {
  return n2.min.x = t2[e3], n2.min.y = t2[e3 + 1], n2.min.z = t2[e3 + 2], n2.max.x = t2[e3 + 3], n2.max.y = t2[e3 + 4], n2.max.z = t2[e3 + 5], n2;
}
function cr(e3) {
  let t2 = -1, n2 = -1 / 0;
  for (let r2 = 0; r2 < 3; r2++) {
    let i2 = e3[r2 + 3] - e3[r2];
    i2 > n2 && (n2 = i2, t2 = r2);
  }
  return t2;
}
function lr(e3, t2) {
  t2.set(e3);
}
function ur(e3, t2, n2) {
  let r2, i2;
  for (let a2 = 0; a2 < 3; a2++) {
    let o2 = a2 + 3;
    r2 = e3[a2], i2 = t2[a2], n2[a2] = r2 < i2 ? r2 : i2, r2 = e3[o2], i2 = t2[o2], n2[o2] = r2 > i2 ? r2 : i2;
  }
}
function dr(e3, t2, n2) {
  for (let r2 = 0; r2 < 3; r2++) {
    let i2 = t2[e3 + 2 * r2], a2 = t2[e3 + 2 * r2 + 1], o2 = i2 - a2, s2 = i2 + a2;
    o2 < n2[r2] && (n2[r2] = o2), s2 > n2[r2 + 3] && (n2[r2 + 3] = s2);
  }
}
function fr(e3) {
  let t2 = e3[3] - e3[0], n2 = e3[4] - e3[1], r2 = e3[5] - e3[2];
  return 2 * (t2 * n2 + n2 * r2 + r2 * t2);
}
function z(e3, t2) {
  return t2[e3 + 15] === ir;
}
function B(e3, t2) {
  return t2[e3 + 6];
}
function V(e3, t2) {
  return t2[e3 + 14];
}
function H(e3) {
  return e3 + 8;
}
function U(e3, t2) {
  return e3 + t2[e3 + 6] * 8;
}
function pr(e3, t2) {
  return t2[e3 + 7];
}
function W(e3) {
  return e3;
}
function mr(e3, t2, n2, r2, i2) {
  let a2 = 1 / 0, o2 = 1 / 0, s2 = 1 / 0, c2 = -1 / 0, l2 = -1 / 0, u2 = -1 / 0, d2 = 1 / 0, f2 = 1 / 0, p2 = 1 / 0, m2 = -1 / 0, h2 = -1 / 0, g2 = -1 / 0, _2 = e3.offset || 0;
  for (let r3 = (t2 - _2) * 6, i3 = (t2 + n2 - _2) * 6; r3 < i3; r3 += 6) {
    let t3 = e3[r3 + 0], n3 = e3[r3 + 1], i4 = t3 - n3, _3 = t3 + n3;
    i4 < a2 && (a2 = i4), _3 > c2 && (c2 = _3), t3 < d2 && (d2 = t3), t3 > m2 && (m2 = t3);
    let v2 = e3[r3 + 2], y2 = e3[r3 + 3], b2 = v2 - y2, x2 = v2 + y2;
    b2 < o2 && (o2 = b2), x2 > l2 && (l2 = x2), v2 < f2 && (f2 = v2), v2 > h2 && (h2 = v2);
    let S2 = e3[r3 + 4], C2 = e3[r3 + 5], w2 = S2 - C2, T2 = S2 + C2;
    w2 < s2 && (s2 = w2), T2 > u2 && (u2 = T2), S2 < p2 && (p2 = S2), S2 > g2 && (g2 = S2);
  }
  r2[0] = a2, r2[1] = o2, r2[2] = s2, r2[3] = c2, r2[4] = l2, r2[5] = u2, i2[0] = d2, i2[1] = f2, i2[2] = p2, i2[3] = m2, i2[4] = h2, i2[5] = g2;
}
var hr = 32, gr = (e3, t2) => e3.candidate - t2.candidate, _r = Array(hr).fill().map(() => ({ count: 0, bounds: new Float32Array(6), rightCacheBounds: new Float32Array(6), leftCacheBounds: new Float32Array(6), candidate: 0 })), vr = new Float32Array(6);
function yr(e3, t2, n2, r2, i2, a2) {
  let o2 = -1, s2 = 0;
  if (a2 === 0) o2 = cr(t2), o2 !== -1 && (s2 = (t2[o2] + t2[o2 + 3]) / 2);
  else if (a2 === 1) o2 = cr(e3), o2 !== -1 && (s2 = br(n2, r2, i2, o2));
  else if (a2 === 2) {
    let a3 = fr(e3), c2 = rr * i2, l2 = n2.offset || 0, u2 = (r2 - l2) * 6, d2 = (r2 + i2 - l2) * 6;
    for (let e4 = 0; e4 < 3; e4++) {
      let r3 = t2[e4], l3 = (t2[e4 + 3] - r3) / hr;
      if (i2 < hr / 4) {
        let t3 = [..._r];
        t3.length = i2;
        let r4 = 0;
        for (let i3 = u2; i3 < d2; i3 += 6, r4++) {
          let a4 = t3[r4];
          a4.candidate = n2[i3 + 2 * e4], a4.count = 0;
          let { bounds: o3, leftCacheBounds: s3, rightCacheBounds: c3 } = a4;
          for (let e5 = 0; e5 < 3; e5++) c3[e5] = 1 / 0, c3[e5 + 3] = -1 / 0, s3[e5] = 1 / 0, s3[e5 + 3] = -1 / 0, o3[e5] = 1 / 0, o3[e5 + 3] = -1 / 0;
          dr(i3, n2, o3);
        }
        t3.sort(gr);
        let l4 = i2;
        for (let e5 = 0; e5 < l4; e5++) {
          let n3 = t3[e5];
          for (; e5 + 1 < l4 && t3[e5 + 1].candidate === n3.candidate; ) t3.splice(e5 + 1, 1), l4--;
        }
        for (let r5 = u2; r5 < d2; r5 += 6) {
          let i3 = n2[r5 + 2 * e4];
          for (let e5 = 0; e5 < l4; e5++) {
            let a4 = t3[e5];
            i3 >= a4.candidate ? dr(r5, n2, a4.rightCacheBounds) : (dr(r5, n2, a4.leftCacheBounds), a4.count++);
          }
        }
        for (let n3 = 0; n3 < l4; n3++) {
          let r5 = t3[n3], l5 = r5.count, u3 = i2 - r5.count, d3 = r5.leftCacheBounds, f2 = r5.rightCacheBounds, p2 = 0;
          l5 !== 0 && (p2 = fr(d3) / a3);
          let m2 = 0;
          u3 !== 0 && (m2 = fr(f2) / a3);
          let h2 = 1 + rr * (p2 * l5 + m2 * u3);
          h2 < c2 && (o2 = e4, c2 = h2, s2 = r5.candidate);
        }
      } else {
        for (let e5 = 0; e5 < hr; e5++) {
          let t4 = _r[e5];
          t4.count = 0, t4.candidate = r3 + l3 + e5 * l3;
          let n3 = t4.bounds;
          for (let e6 = 0; e6 < 3; e6++) n3[e6] = 1 / 0, n3[e6 + 3] = -1 / 0;
        }
        for (let t4 = u2; t4 < d2; t4 += 6) {
          let i3 = ~~((n2[t4 + 2 * e4] - r3) / l3);
          i3 >= hr && (i3 = 31);
          let a4 = _r[i3];
          a4.count++, dr(t4, n2, a4.bounds);
        }
        let t3 = _r[31];
        lr(t3.bounds, t3.rightCacheBounds);
        for (let e5 = 30; e5 >= 0; e5--) {
          let t4 = _r[e5], n3 = _r[e5 + 1];
          ur(t4.bounds, n3.rightCacheBounds, t4.rightCacheBounds);
        }
        let f2 = 0;
        for (let t4 = 0; t4 < 31; t4++) {
          let n3 = _r[t4], r4 = n3.count, l4 = n3.bounds, u3 = _r[t4 + 1].rightCacheBounds;
          r4 !== 0 && (f2 === 0 ? lr(l4, vr) : ur(l4, vr, vr)), f2 += r4;
          let d3 = 0, p2 = 0;
          f2 !== 0 && (d3 = fr(vr) / a3);
          let m2 = i2 - f2;
          m2 !== 0 && (p2 = fr(u3) / a3);
          let h2 = 1 + rr * (d3 * f2 + p2 * m2);
          h2 < c2 && (o2 = e4, c2 = h2, s2 = n3.candidate);
        }
      }
    }
  } else console.warn(`BVH: Invalid build strategy value ${a2} used.`);
  return { axis: o2, pos: s2 };
}
function br(e3, t2, n2, r2) {
  let i2 = 0, a2 = e3.offset;
  for (let o2 = t2, s2 = t2 + n2; o2 < s2; o2++) i2 += e3[(o2 - a2) * 6 + r2 * 2];
  return i2 / n2;
}
var xr = class {
  constructor() {
    this.boundingData = new Float32Array(6);
  }
};
function Sr(e3, t2, n2, r2, i2, a2) {
  let o2 = r2, s2 = r2 + i2 - 1, c2 = a2.pos, l2 = a2.axis * 2, u2 = n2.offset || 0;
  for (; ; ) {
    for (; o2 <= s2 && n2[(o2 - u2) * 6 + l2] < c2; ) o2++;
    for (; o2 <= s2 && n2[(s2 - u2) * 6 + l2] >= c2; ) s2--;
    if (o2 < s2) {
      for (let n3 = 0; n3 < t2; n3++) {
        let r3 = e3[o2 * t2 + n3];
        e3[o2 * t2 + n3] = e3[s2 * t2 + n3], e3[s2 * t2 + n3] = r3;
      }
      for (let e4 = 0; e4 < 6; e4++) {
        let t3 = o2 - u2, r3 = s2 - u2, i3 = n2[t3 * 6 + e4];
        n2[t3 * 6 + e4] = n2[r3 * 6 + e4], n2[r3 * 6 + e4] = i3;
      }
      o2++, s2--;
    } else return o2;
  }
}
var Cr, wr, Tr, Er, Dr = 2 ** 32;
function Or(e3) {
  return `count` in e3 ? 1 : 1 + Or(e3.left) + Or(e3.right);
}
function kr(e3, t2, n2) {
  return Cr = new Float32Array(n2), wr = new Uint32Array(n2), Tr = new Uint16Array(n2), Er = new Uint8Array(n2), Ar(e3, t2);
}
function Ar(e3, t2) {
  let n2 = e3 / 4, r2 = e3 / 2, i2 = `count` in t2, a2 = t2.boundingData;
  for (let e4 = 0; e4 < 6; e4++) Cr[n2 + e4] = a2[e4];
  if (i2) return t2.buffer ? (Er.set(new Uint8Array(t2.buffer), e3), e3 + t2.buffer.byteLength) : (wr[n2 + 6] = t2.offset, Tr[r2 + 14] = t2.count, Tr[r2 + 15] = ir, e3 + 32);
  {
    let { left: r3, right: i3, splitAxis: a3 } = t2, o2 = Ar(e3 + 32, r3), s2 = e3 / 32, c2 = o2 / 32 - s2;
    if (c2 > Dr) throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);
    return wr[n2 + 6] = c2, wr[n2 + 7] = a3, Ar(o2, i3);
  }
}
function jr(e3, t2, n2, r2, i2, a2) {
  let { maxDepth: o2, verbose: s2, targetLeafSize: c2, _strictLeafSize: l2 = 1 / 0, strategy: u2, onProgress: d2 } = i2, f2 = e3.primitiveBuffer, p2 = e3.primitiveBufferStride, m2 = new Float32Array(6), h2 = false, g2 = new xr();
  return mr(t2, n2, r2, g2.boundingData, m2), v2(g2, n2, r2, m2), g2;
  function _2(e4) {
    d2 && d2((e4 - a2.offset) / a2.count);
  }
  function v2(e4, n3, r3, i3 = null, a3 = 0) {
    !h2 && a3 >= o2 && (h2 = true, s2 && console.warn(`BVH: Max depth of ${o2} reached when generating BVH. Consider increasing maxDepth.`));
    let d3 = r3 > l2;
    if (r3 <= c2 && !d3 || a3 >= o2) return _2(n3 + r3), e4.offset = n3, e4.count = r3, e4;
    let g3 = yr(e4.boundingData, i3, t2, n3, r3, u2), y2 = g3.axis === -1 ? -1 : Sr(f2, p2, t2, n3, r3, g3);
    if (g3.axis === -1 || y2 === n3 || y2 === n3 + r3) {
      if (!d3) return _2(n3 + r3), e4.offset = n3, e4.count = r3, e4;
      g3.axis = Math.max(0, cr(e4.boundingData)), y2 = n3 + Math.max(1, Math.floor(r3 / 2));
    }
    e4.splitAxis = g3.axis;
    let b2 = new xr(), x2 = n3, S2 = y2 - n3;
    e4.left = b2, mr(t2, x2, S2, b2.boundingData, m2), v2(b2, x2, S2, m2, a3 + 1);
    let C2 = new xr(), w2 = y2, T2 = r3 - S2;
    return e4.right = C2, mr(t2, w2, T2, C2.boundingData, m2), v2(C2, w2, T2, m2, a3 + 1), e4;
  }
}
function Mr(e3, t2) {
  let n2 = t2.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer, r2 = e3.getRootRanges(t2.range), i2 = r2[0], a2 = r2[r2.length - 1], o2 = { offset: i2.offset, count: a2.offset + a2.count - i2.offset }, s2 = new Float32Array(6 * o2.count);
  s2.offset = o2.offset, e3.computePrimitiveBounds(o2.offset, o2.count, s2), e3._roots = r2.map((r3) => {
    let i3 = jr(e3, s2, r3.offset, r3.count, t2, o2), a3 = Or(i3), c2 = new n2(32 * a3);
    return kr(0, i3, c2), c2;
  });
}
var Nr = class {
  constructor(e3) {
    this._getNewPrimitive = e3, this._primitives = [];
  }
  getPrimitive() {
    let e3 = this._primitives;
    return e3.length === 0 ? this._getNewPrimitive() : e3.pop();
  }
  releasePrimitive(e3) {
    this._primitives.push(e3);
  }
}, G = new class {
  constructor() {
    this.float32Array = null, this.uint16Array = null, this.uint32Array = null;
    let e3 = [], t2 = null;
    this.setBuffer = (n2) => {
      t2 && e3.push(t2), t2 = n2, this.float32Array = new Float32Array(n2), this.uint16Array = new Uint16Array(n2), this.uint32Array = new Uint32Array(n2);
    }, this.clearBuffer = () => {
      t2 = null, this.float32Array = null, this.uint16Array = null, this.uint32Array = null, e3.length !== 0 && this.setBuffer(e3.pop());
    };
  }
}(), Pr, Fr, Ir = [], Lr = new Nr(() => new o());
function Rr(e3, t2, n2, r2, i2, a2) {
  Pr = Lr.getPrimitive(), Fr = Lr.getPrimitive(), Ir.push(Pr, Fr), G.setBuffer(e3._roots[t2]);
  let o2 = zr(0, e3.geometry, n2, r2, i2, a2);
  G.clearBuffer(), Lr.releasePrimitive(Pr), Lr.releasePrimitive(Fr), Ir.pop(), Ir.pop();
  let s2 = Ir.length;
  return s2 > 0 && (Fr = Ir[s2 - 1], Pr = Ir[s2 - 2]), o2;
}
function zr(e3, t2, n2, r2, i2 = null, a2 = 0, o2 = 0) {
  let { float32Array: s2, uint16Array: c2, uint32Array: l2 } = G, u2 = e3 * 2;
  if (z(u2, c2)) {
    let t3 = B(e3, l2), n3 = V(u2, c2);
    return R(W(e3), s2, Pr), r2(t3, n3, false, o2, a2 + e3 / 8, Pr);
  }
  {
    let w2 = function(e4) {
      let { uint16Array: t3, uint32Array: n3 } = G, r3 = e4 * 2;
      for (; !z(r3, t3); ) e4 = H(e4), r3 = e4 * 2;
      return B(e4, n3);
    }, T2 = function(e4) {
      let { uint16Array: t3, uint32Array: n3 } = G, r3 = e4 * 2;
      for (; !z(r3, t3); ) e4 = U(e4, n3), r3 = e4 * 2;
      return B(e4, n3) + V(r3, t3);
    };
    let u3 = H(e3), d2 = U(e3, l2), f2 = u3, p2 = d2, m2, h2, g2, _2;
    if (i2 && (g2 = Pr, _2 = Fr, R(W(f2), s2, g2), R(W(p2), s2, _2), m2 = i2(g2), h2 = i2(_2), h2 < m2)) {
      f2 = d2, p2 = u3;
      let e4 = m2;
      m2 = h2, h2 = e4, g2 = _2;
    }
    g2 || (g2 = Pr, R(W(f2), s2, g2));
    let v2 = z(f2 * 2, c2), y2 = n2(g2, v2, m2, o2 + 1, a2 + f2 / 8), b2;
    if (y2 === 2) {
      let e4 = w2(f2);
      b2 = r2(e4, T2(f2) - e4, true, o2 + 1, a2 + f2 / 8, g2);
    } else b2 = y2 && zr(f2, t2, n2, r2, i2, a2, o2 + 1);
    if (b2) return true;
    _2 = Fr, R(W(p2), s2, _2);
    let x2 = z(p2 * 2, c2), S2 = n2(_2, x2, h2, o2 + 1, a2 + p2 / 8), C2;
    if (S2 === 2) {
      let e4 = w2(p2);
      C2 = r2(e4, T2(p2) - e4, true, o2 + 1, a2 + p2 / 8, _2);
    } else C2 = S2 && zr(p2, t2, n2, r2, i2, a2, o2 + 1);
    return !!C2;
  }
}
var Br = new G.constructor(), Vr = new G.constructor(), Hr = new Nr(() => new o()), Ur = new o(), Wr = new o(), Gr = new o(), Kr = new o(), qr = false;
function Jr(e3, t2, n2, r2) {
  if (qr) throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);
  qr = true;
  let i2 = e3._roots, a2 = t2._roots, o2, s2 = 0, c2 = 0, l2 = new k().copy(n2).invert();
  for (let e4 = 0, t3 = i2.length; e4 < t3; e4++) {
    Br.setBuffer(i2[e4]), c2 = 0;
    let t4 = Hr.getPrimitive();
    R(W(0), Br.float32Array, t4), t4.applyMatrix4(l2);
    for (let e5 = 0, i3 = a2.length; e5 < i3 && (Vr.setBuffer(a2[e5]), o2 = Yr(0, 0, n2, l2, r2, s2, c2, 0, 0, t4), Vr.clearBuffer(), c2 += a2[e5].byteLength / 32, !o2); e5++) ;
    if (Hr.releasePrimitive(t4), Br.clearBuffer(), s2 += i2[e4].byteLength / 32, o2) break;
  }
  return qr = false, o2;
}
function Yr(e3, t2, n2, r2, i2, a2 = 0, o2 = 0, s2 = 0, c2 = 0, l2 = null, u2 = false) {
  let d2, f2;
  u2 ? (d2 = Vr, f2 = Br) : (d2 = Br, f2 = Vr);
  let p2 = d2.float32Array, m2 = d2.uint32Array, h2 = d2.uint16Array, g2 = f2.float32Array, _2 = f2.uint32Array, v2 = f2.uint16Array, y2 = e3 * 2, b2 = t2 * 2, x2 = z(y2, h2), S2 = z(b2, v2), C2 = false;
  if (S2 && x2) C2 = u2 ? i2(B(t2, _2), V(t2 * 2, v2), B(e3, m2), V(e3 * 2, h2), c2, o2 + t2 / 8, s2, a2 + e3 / 8) : i2(B(e3, m2), V(e3 * 2, h2), B(t2, _2), V(t2 * 2, v2), s2, a2 + e3 / 8, c2, o2 + t2 / 8);
  else if (S2) {
    let l3 = Hr.getPrimitive();
    R(W(t2), g2, l3), l3.applyMatrix4(n2);
    let d3 = H(e3), f3 = U(e3, m2);
    R(W(d3), p2, Ur), R(W(f3), p2, Wr);
    let h3 = l3.intersectsBox(Ur), _3 = l3.intersectsBox(Wr);
    C2 = h3 && Yr(t2, d3, r2, n2, i2, o2, a2, c2, s2 + 1, l3, !u2) || _3 && Yr(t2, f3, r2, n2, i2, o2, a2, c2, s2 + 1, l3, !u2), Hr.releasePrimitive(l3);
  } else {
    let d3 = H(t2), f3 = U(t2, _2);
    R(W(d3), g2, Gr), R(W(f3), g2, Kr);
    let h3 = l2.intersectsBox(Gr), v3 = l2.intersectsBox(Kr);
    if (h3 && v3) C2 = Yr(e3, d3, n2, r2, i2, a2, o2, s2, c2 + 1, l2, u2) || Yr(e3, f3, n2, r2, i2, a2, o2, s2, c2 + 1, l2, u2);
    else if (h3) {
      if (x2) C2 = Yr(e3, d3, n2, r2, i2, a2, o2, s2, c2 + 1, l2, u2);
      else {
        let t3 = Hr.getPrimitive();
        t3.copy(Gr).applyMatrix4(n2);
        let l3 = H(e3), f4 = U(e3, m2);
        R(W(l3), p2, Ur), R(W(f4), p2, Wr);
        let h4 = t3.intersectsBox(Ur), g3 = t3.intersectsBox(Wr);
        C2 = h4 && Yr(d3, l3, r2, n2, i2, o2, a2, c2, s2 + 1, t3, !u2) || g3 && Yr(d3, f4, r2, n2, i2, o2, a2, c2, s2 + 1, t3, !u2), Hr.releasePrimitive(t3);
      }
    } else if (v3) {
      if (x2) C2 = Yr(e3, f3, n2, r2, i2, a2, o2, s2, c2 + 1, l2, u2);
      else {
        let t3 = Hr.getPrimitive();
        t3.copy(Kr).applyMatrix4(n2);
        let l3 = H(e3), d4 = U(e3, m2);
        R(W(l3), p2, Ur), R(W(d4), p2, Wr);
        let h4 = t3.intersectsBox(Ur), g3 = t3.intersectsBox(Wr);
        C2 = h4 && Yr(f3, l3, r2, n2, i2, o2, a2, c2, s2 + 1, t3, !u2) || g3 && Yr(f3, d4, r2, n2, i2, o2, a2, c2, s2 + 1, t3, !u2), Hr.releasePrimitive(t3);
      }
    }
  }
  return C2;
}
var Xr = new class {
  constructor() {
    let e3 = null, t2 = null, n2 = null, r2 = false;
    this.root = null, this.buffer = null, this.uint32Array = null, this.uint16Array = null, this.setBVH = (i3, a2) => {
      if (r2) throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);
      this.root = a2, this.buffer = e3 = i3._roots[a2], this.uint16Array = n2 = new Uint16Array(e3), this.uint32Array = t2 = new Uint32Array(e3);
    }, this.reset = () => {
      this.root = null, this.buffer = e3 = null, this.uint16Array = n2 = null, this.uint32Array = t2 = null;
    }, this.getRangeStart = (e4) => {
      let r3 = e4 * 2;
      for (; !z(r3, n2); ) e4 = H(e4), r3 = e4 * 2;
      return B(e4, t2);
    }, this.getRangeEnd = (e4) => {
      let r3 = e4 * 2;
      for (; !z(r3, n2); ) e4 = U(e4, t2), r3 = e4 * 2;
      return B(e4, t2) + V(r3, n2);
    };
    let i2 = (e4, r3, a2) => {
      let o2 = z(r3 * 2, n2);
      if (!e4(a2, o2, r3) && !o2) {
        let n3 = H(r3), o3 = U(r3, t2);
        i2(e4, n3, a2 + 1), i2(e4, o3, a2 + 1);
      }
    };
    this.traverseBuffer = (e4) => {
      if (r2) throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);
      r2 = true;
      try {
        i2(e4, 0, 0);
      } finally {
        r2 = false;
      }
    }, this.traverse = (r3) => {
      this.traverseBuffer((i3, a2, o2) => {
        if (a2) {
          let s2 = o2 * 2, c2 = t2[o2 + 6], l2 = n2[s2 + 14];
          return r3(i3, a2, new Float32Array(e3, o2 * 4, 6), c2, l2);
        }
        {
          let n3 = pr(o2, t2);
          return r3(i3, a2, new Float32Array(e3, o2 * 4, 6), n3);
        }
      });
    };
  }
}(), Zr = new o(), Qr = new Float32Array(6), $r = class {
  constructor() {
    this._roots = null, this.primitiveBuffer = null, this.primitiveBufferStride = null;
  }
  init(e3) {
    e3 = { ...sr, ...e3 }, `maxLeafSize` in e3 && (console.warn(`BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.`), e3 = { ...e3, targetLeafSize: e3.maxLeafSize }), Mr(this, e3);
  }
  getRootRanges() {
    throw Error(`BVH: getRootRanges() not implemented`);
  }
  writePrimitiveBounds() {
    throw Error(`BVH: writePrimitiveBounds() not implemented`);
  }
  writePrimitiveRangeBounds(e3, t2, n2, r2) {
    let i2 = 1 / 0, a2 = 1 / 0, o2 = 1 / 0, s2 = -1 / 0, c2 = -1 / 0, l2 = -1 / 0;
    for (let n3 = e3, r3 = e3 + t2; n3 < r3; n3++) {
      this.writePrimitiveBounds(n3, Qr, 0);
      let [e4, t3, r4, u2, d2, f2] = Qr;
      e4 < i2 && (i2 = e4), u2 > s2 && (s2 = u2), t3 < a2 && (a2 = t3), d2 > c2 && (c2 = d2), r4 < o2 && (o2 = r4), f2 > l2 && (l2 = f2);
    }
    return n2[r2 + 0] = i2, n2[r2 + 1] = a2, n2[r2 + 2] = o2, n2[r2 + 3] = s2, n2[r2 + 4] = c2, n2[r2 + 5] = l2, n2;
  }
  computePrimitiveBounds(e3, t2, n2) {
    let r2 = n2.offset || 0;
    for (let i2 = e3, a2 = e3 + t2; i2 < a2; i2++) {
      this.writePrimitiveBounds(i2, Qr, 0);
      let [e4, t3, a3, o2, s2, c2] = Qr, l2 = (e4 + o2) / 2, u2 = (t3 + s2) / 2, d2 = (a3 + c2) / 2, f2 = (o2 - e4) / 2, p2 = (s2 - t3) / 2, m2 = (c2 - a3) / 2, h2 = (i2 - r2) * 6;
      n2[h2 + 0] = l2, n2[h2 + 1] = f2 + (Math.abs(l2) + f2) * ar, n2[h2 + 2] = u2, n2[h2 + 3] = p2 + (Math.abs(u2) + p2) * ar, n2[h2 + 4] = d2, n2[h2 + 5] = m2 + (Math.abs(d2) + m2) * ar;
    }
    return n2;
  }
  shiftPrimitiveOffsets(e3) {
    let t2 = this._indirectBuffer;
    if (t2) for (let n2 = 0, r2 = t2.length; n2 < r2; n2++) t2[n2] += e3;
    else {
      let t3 = this._roots;
      for (let n2 = 0; n2 < t3.length; n2++) {
        let r2 = t3[n2], i2 = new Uint32Array(r2), a2 = new Uint16Array(r2), o2 = r2.byteLength / 32;
        for (let t4 = 0; t4 < o2; t4++) {
          let n3 = 8 * t4;
          z(2 * n3, a2) && (i2[n3 + 6] += e3);
        }
      }
    }
  }
  traverse(e3, t2 = 0) {
    Xr.setBVH(this, t2), Xr.traverse(e3), Xr.reset();
  }
  refit() {
    let e3 = this._roots;
    for (let t2 = 0, n2 = e3.length; t2 < n2; t2++) {
      let n3 = e3[t2], r2 = new Uint32Array(n3), i2 = new Uint16Array(n3), a2 = new Float32Array(n3), o2 = n3.byteLength / 32;
      for (let e4 = o2 - 1; e4 >= 0; e4--) {
        let t3 = e4 * 8, n4 = t3 * 2;
        if (z(n4, i2)) {
          let e5 = B(t3, r2), o3 = V(n4, i2);
          this.writePrimitiveRangeBounds(e5, o3, Qr, 0), a2.set(Qr, t3);
        } else {
          let e5 = H(t3), n5 = U(t3, r2);
          for (let r3 = 0; r3 < 3; r3++) {
            let i3 = a2[e5 + r3], o3 = a2[e5 + r3 + 3], s2 = a2[n5 + r3], c2 = a2[n5 + r3 + 3];
            a2[t3 + r3] = i3 < s2 ? i3 : s2, a2[t3 + r3 + 3] = o3 > c2 ? o3 : c2;
          }
        }
      }
    }
  }
  getBoundingBox(e3) {
    return e3.makeEmpty(), this._roots.forEach((t2) => {
      R(0, new Float32Array(t2), Zr), e3.union(Zr);
    }), e3;
  }
  shapecast(e3) {
    let { boundsTraverseOrder: t2, intersectsBounds: n2, intersectsRange: r2, intersectsPrimitive: i2, scratchPrimitive: a2, iterate: o2 } = e3;
    if (r2 && i2) {
      let e4 = r2;
      r2 = (t3, n3, r3, s3, c3) => e4(t3, n3, r3, s3, c3) ? true : o2(t3, n3, this, i2, r3, s3, a2);
    } else r2 ||= i2 ? (e4, t3, n3, r3) => o2(e4, t3, this, i2, n3, r3, a2) : (e4, t3, n3) => n3;
    let s2 = false, c2 = 0, l2 = this._roots;
    for (let e4 = 0, i3 = l2.length; e4 < i3; e4++) {
      let i4 = l2[e4];
      if (s2 = Rr(this, e4, n2, r2, t2, c2), s2) break;
      c2 += i4.byteLength / 32;
    }
    return s2;
  }
  bvhcast(e3, t2, n2) {
    let { intersectsRanges: r2 } = n2;
    return Jr(this, e3, t2, r2);
  }
};
function ei() {
  return typeof SharedArrayBuffer < `u`;
}
function ti(e3) {
  return e3.index ? e3.index.count : e3.attributes.position.count;
}
function ni(e3) {
  return ti(e3) / 3;
}
function ri(e3, t2 = ArrayBuffer) {
  return e3 > 65535 ? new Uint32Array(new t2(4 * e3)) : new Uint16Array(new t2(2 * e3));
}
function ii(e3, t2) {
  if (!e3.index) {
    let n2 = e3.attributes.position.count, i2 = ri(n2, t2.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
    e3.setIndex(new r(i2, 1));
    for (let e4 = 0; e4 < n2; e4++) i2[e4] = e4;
  }
}
function ai(e3, t2, n2) {
  let r2 = ti(e3) / n2, i2 = t2 || e3.drawRange, a2 = i2.start / n2, o2 = (i2.start + i2.count) / n2, s2 = Math.max(0, a2), c2 = Math.min(r2, o2) - s2;
  return { offset: Math.floor(s2), count: Math.floor(c2) };
}
function oi(e3, t2) {
  return e3.groups.map((e4) => ({ offset: e4.start / t2, count: e4.count / t2 }));
}
function si(e3, t2, n2) {
  let r2 = ai(e3, t2, n2), i2 = oi(e3, n2);
  if (!i2.length) return [r2];
  let a2 = [], o2 = r2.offset, s2 = r2.offset + r2.count, c2 = ti(e3) / n2, l2 = [];
  for (let e4 of i2) {
    let { offset: t3, count: n3 } = e4, r3 = t3, i3 = t3 + (isFinite(n3) ? n3 : c2 - t3);
    r3 < s2 && i3 > o2 && (l2.push({ pos: Math.max(o2, r3), isStart: true }), l2.push({ pos: Math.min(s2, i3), isStart: false }));
  }
  l2.sort((e4, t3) => e4.pos === t3.pos ? e4.type === `end` ? -1 : 1 : e4.pos - t3.pos);
  let u2 = 0, d2 = null;
  for (let e4 of l2) {
    let t3 = e4.pos;
    u2 !== 0 && t3 !== d2 && a2.push({ offset: d2, count: t3 - d2 }), u2 += e4.isStart ? 1 : -1, d2 = t3;
  }
  return a2;
}
function ci(e3, t2) {
  let n2 = e3[e3.length - 1], r2 = n2.offset + n2.count > 2 ** 16, i2 = e3.reduce((e4, t3) => e4 + t3.count, 0), a2 = r2 ? 4 : 2, o2 = t2 ? new SharedArrayBuffer(i2 * a2) : new ArrayBuffer(i2 * a2), s2 = r2 ? new Uint32Array(o2) : new Uint16Array(o2), c2 = 0;
  for (let t3 = 0; t3 < e3.length; t3++) {
    let { offset: n3, count: r3 } = e3[t3];
    for (let e4 = 0; e4 < r3; e4++) s2[c2 + e4] = n3 + e4;
    c2 += r3;
  }
  return s2;
}
var li = class extends $r {
  get indirect() {
    return !!this._indirectBuffer;
  }
  get primitiveStride() {
    return null;
  }
  get primitiveBufferStride() {
    return this.indirect ? 1 : this.primitiveStride;
  }
  set primitiveBufferStride(e3) {
  }
  get primitiveBuffer() {
    return this.indirect ? this._indirectBuffer : this.geometry.index.array;
  }
  set primitiveBuffer(e3) {
  }
  constructor(e3, t2 = {}) {
    if (!e3.isBufferGeometry) throw Error(`BVH: Only BufferGeometries are supported.`);
    if (e3.index && e3.index.isInterleavedBufferAttribute) throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);
    if (t2.useSharedArrayBuffer && !ei()) throw Error(`BVH: SharedArrayBuffer is not available.`);
    super(), this.geometry = e3, this.resolvePrimitiveIndex = t2.indirect ? (e4) => this._indirectBuffer[e4] : (e4) => e4, this.primitiveBuffer = null, this.primitiveBufferStride = null, this._indirectBuffer = null, t2 = { ...sr, ...t2 }, t2[or] || this.init(t2);
  }
  init(e3) {
    let { geometry: t2, primitiveStride: n2 } = this;
    if (e3.indirect) {
      let r2 = ci(si(t2, e3.range, n2), e3.useSharedArrayBuffer);
      this._indirectBuffer = r2;
    } else ii(t2, e3);
    super.init(e3), !t2.boundingBox && e3.setBoundingBox && (t2.boundingBox = this.getBoundingBox(new o()));
  }
  getRootRanges(e3) {
    return this.indirect ? [{ offset: 0, count: this._indirectBuffer.length }] : si(this.geometry, e3, this.primitiveStride);
  }
  raycastObject3D() {
    throw Error(`BVH: raycastObject3D() not implemented`);
  }
}, ui = class {
  constructor() {
    this.min = 1 / 0, this.max = -1 / 0;
  }
  setFromPointsField(e3, t2) {
    let n2 = 1 / 0, r2 = -1 / 0;
    for (let i2 = 0, a2 = e3.length; i2 < a2; i2++) {
      let a3 = e3[i2][t2];
      n2 = a3 < n2 ? a3 : n2, r2 = a3 > r2 ? a3 : r2;
    }
    this.min = n2, this.max = r2;
  }
  setFromPoints(e3, t2) {
    let n2 = 1 / 0, r2 = -1 / 0;
    for (let i2 = 0, a2 = t2.length; i2 < a2; i2++) {
      let a3 = t2[i2], o2 = e3.dot(a3);
      n2 = o2 < n2 ? o2 : n2, r2 = o2 > r2 ? o2 : r2;
    }
    this.min = n2, this.max = r2;
  }
  isSeparated(e3) {
    return this.min > e3.max || e3.min > this.max;
  }
};
ui.prototype.setFromBox = (function() {
  let e3 = new M();
  return function(t2, n2) {
    let r2 = n2.min, i2 = n2.max, a2 = 1 / 0, o2 = -1 / 0;
    for (let n3 = 0; n3 <= 1; n3++) for (let s2 = 0; s2 <= 1; s2++) for (let c2 = 0; c2 <= 1; c2++) {
      e3.x = r2.x * n3 + i2.x * (1 - n3), e3.y = r2.y * s2 + i2.y * (1 - s2), e3.z = r2.z * c2 + i2.z * (1 - c2);
      let l2 = t2.dot(e3);
      a2 = Math.min(l2, a2), o2 = Math.max(l2, o2);
    }
    this.min = a2, this.max = o2;
  };
})();
var di = (function() {
  let e3 = new M(), t2 = new M(), n2 = new M();
  return function(r2, i2, a2) {
    let o2 = r2.start, s2 = e3, c2 = i2.start, l2 = t2;
    n2.subVectors(o2, c2), e3.subVectors(r2.end, r2.start), t2.subVectors(i2.end, i2.start);
    let u2 = n2.dot(l2), d2 = l2.dot(s2), f2 = l2.dot(l2), p2 = n2.dot(s2), m2 = s2.dot(s2) * f2 - d2 * d2, h2, g2;
    h2 = m2 === 0 ? 0 : (u2 * d2 - p2 * f2) / m2, g2 = (u2 + h2 * d2) / f2, a2.x = h2, a2.y = g2;
  };
})(), fi = (function() {
  let e3 = new j(), t2 = new M(), n2 = new M();
  return function(r2, i2, a2, o2) {
    di(r2, i2, e3);
    let s2 = e3.x, c2 = e3.y;
    if (s2 >= 0 && s2 <= 1 && c2 >= 0 && c2 <= 1) {
      r2.at(s2, a2), i2.at(c2, o2);
      return;
    }
    if (s2 >= 0 && s2 <= 1) {
      c2 < 0 ? i2.at(0, o2) : i2.at(1, o2), r2.closestPointToPoint(o2, true, a2);
      return;
    }
    if (c2 >= 0 && c2 <= 1) {
      s2 < 0 ? r2.at(0, a2) : r2.at(1, a2), i2.closestPointToPoint(a2, true, o2);
      return;
    }
    {
      let e4;
      e4 = s2 < 0 ? r2.start : r2.end;
      let l2;
      l2 = c2 < 0 ? i2.start : i2.end;
      let u2 = t2, d2 = n2;
      if (r2.closestPointToPoint(l2, true, t2), i2.closestPointToPoint(e4, true, n2), u2.distanceToSquared(l2) <= d2.distanceToSquared(e4)) {
        a2.copy(u2), o2.copy(l2);
        return;
      }
      a2.copy(e4), o2.copy(d2);
      return;
    }
  };
})(), pi = (function() {
  let e3 = new M(), t2 = new M(), n2 = new i(), r2 = new A();
  return function(i2, a2) {
    let { radius: o2, center: s2 } = i2, { a: c2, b: l2, c: u2 } = a2;
    if (r2.start = c2, r2.end = l2, r2.closestPointToPoint(s2, true, e3).distanceTo(s2) <= o2 || (r2.start = c2, r2.end = u2, r2.closestPointToPoint(s2, true, e3).distanceTo(s2) <= o2) || (r2.start = l2, r2.end = u2, r2.closestPointToPoint(s2, true, e3).distanceTo(s2) <= o2)) return true;
    let d2 = a2.getPlane(n2);
    if (Math.abs(d2.distanceToPoint(s2)) <= o2) {
      let e4 = d2.projectPoint(s2, t2);
      if (a2.containsPoint(e4)) return true;
    }
    return false;
  };
})(), mi = [`x`, `y`, `z`], hi = 1e-15, gi = hi * hi;
function _i(e3) {
  return Math.abs(e3) < hi;
}
var vi = class extends ue {
  constructor(...e3) {
    super(...e3), this.isExtendedTriangle = true, this.satAxes = [, , , ,].fill().map(() => new M()), this.satBounds = [, , , ,].fill().map(() => new ui()), this.points = [this.a, this.b, this.c], this.plane = new i(), this.isDegenerateIntoSegment = false, this.isDegenerateIntoPoint = false, this.degenerateSegment = new A(), this.needsUpdate = true;
  }
  intersectsSphere(e3) {
    return pi(e3, this);
  }
  update() {
    let e3 = this.a, t2 = this.b, n2 = this.c, r2 = this.points, i2 = this.satAxes, a2 = this.satBounds, o2 = i2[0], s2 = a2[0];
    this.getNormal(o2), s2.setFromPoints(o2, r2);
    let c2 = i2[1], l2 = a2[1];
    c2.subVectors(e3, t2), l2.setFromPoints(c2, r2);
    let u2 = i2[2], d2 = a2[2];
    u2.subVectors(t2, n2), d2.setFromPoints(u2, r2);
    let f2 = i2[3], p2 = a2[3];
    f2.subVectors(n2, e3), p2.setFromPoints(f2, r2);
    let m2 = c2.length(), h2 = u2.length(), g2 = f2.length();
    this.isDegenerateIntoPoint = false, this.isDegenerateIntoSegment = false, m2 < hi ? h2 < hi || g2 < hi ? this.isDegenerateIntoPoint = true : (this.isDegenerateIntoSegment = true, this.degenerateSegment.start.copy(e3), this.degenerateSegment.end.copy(n2)) : h2 < hi ? g2 < hi ? this.isDegenerateIntoPoint = true : (this.isDegenerateIntoSegment = true, this.degenerateSegment.start.copy(t2), this.degenerateSegment.end.copy(e3)) : g2 < hi && (this.isDegenerateIntoSegment = true, this.degenerateSegment.start.copy(n2), this.degenerateSegment.end.copy(t2)), this.plane.setFromNormalAndCoplanarPoint(o2, e3), this.needsUpdate = false;
  }
};
vi.prototype.closestPointToSegment = (function() {
  let e3 = new M(), t2 = new M(), n2 = new A();
  return function(r2, i2 = null, a2 = null) {
    let { start: o2, end: s2 } = r2, c2 = this.points, l2, u2 = 1 / 0;
    for (let o3 = 0; o3 < 3; o3++) {
      let s3 = (o3 + 1) % 3;
      n2.start.copy(c2[o3]), n2.end.copy(c2[s3]), fi(n2, r2, e3, t2), l2 = e3.distanceToSquared(t2), l2 < u2 && (u2 = l2, i2 && i2.copy(e3), a2 && a2.copy(t2));
    }
    return this.closestPointToPoint(o2, e3), l2 = o2.distanceToSquared(e3), l2 < u2 && (u2 = l2, i2 && i2.copy(e3), a2 && a2.copy(o2)), this.closestPointToPoint(s2, e3), l2 = s2.distanceToSquared(e3), l2 < u2 && (u2 = l2, i2 && i2.copy(e3), a2 && a2.copy(s2)), Math.sqrt(u2);
  };
})(), vi.prototype.intersectsTriangle = (function() {
  let e3 = new vi(), t2 = new ui(), n2 = new ui(), r2 = new M(), i2 = new M(), a2 = new M(), o2 = new M(), s2 = new A(), c2 = new A(), l2 = new M(), u2 = new j(), d2 = new j();
  function f2(e4, i3, a3, s3) {
    let c3 = r2;
    !e4.isDegenerateIntoPoint && !e4.isDegenerateIntoSegment ? c3.copy(e4.plane.normal) : c3.copy(i3.plane.normal);
    let l3 = e4.satBounds, u3 = e4.satAxes;
    for (let r3 = 1; r3 < 4; r3++) {
      let a4 = l3[r3], s4 = u3[r3];
      if (t2.setFromPoints(s4, i3.points), a4.isSeparated(t2) || (o2.copy(c3).cross(s4), t2.setFromPoints(o2, e4.points), n2.setFromPoints(o2, i3.points), t2.isSeparated(n2))) return false;
    }
    let d3 = i3.satBounds, f3 = i3.satAxes;
    for (let r3 = 1; r3 < 4; r3++) {
      let a4 = d3[r3], s4 = f3[r3];
      if (t2.setFromPoints(s4, e4.points), a4.isSeparated(t2) || (o2.crossVectors(c3, s4), t2.setFromPoints(o2, e4.points), n2.setFromPoints(o2, i3.points), t2.isSeparated(n2))) return false;
    }
    return a3 && (s3 || console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`), a3.start.set(0, 0, 0), a3.end.set(0, 0, 0)), true;
  }
  function p2(e4, t3, n3, r3, i3, a3, o3, s3, c3, l3, u3) {
    let d3 = o3 / (o3 - s3);
    l3.x = r3 + (i3 - r3) * d3, u3.start.subVectors(t3, e4).multiplyScalar(d3).add(e4), d3 = o3 / (o3 - c3), l3.y = r3 + (a3 - r3) * d3, u3.end.subVectors(n3, e4).multiplyScalar(d3).add(e4);
  }
  function m2(e4, t3, n3, r3, i3, a3, o3, s3, c3, l3, u3) {
    if (i3 > 0) p2(e4.c, e4.a, e4.b, r3, t3, n3, c3, o3, s3, l3, u3);
    else if (a3 > 0) p2(e4.b, e4.a, e4.c, n3, t3, r3, s3, o3, c3, l3, u3);
    else if (s3 * c3 > 0 || o3 != 0) p2(e4.a, e4.b, e4.c, t3, n3, r3, o3, s3, c3, l3, u3);
    else if (s3 != 0) p2(e4.b, e4.a, e4.c, n3, t3, r3, s3, o3, c3, l3, u3);
    else if (c3 != 0) p2(e4.c, e4.a, e4.b, r3, t3, n3, c3, o3, s3, l3, u3);
    else return true;
    return false;
  }
  function h2(e4, t3, n3, i3) {
    let a3 = t3.degenerateSegment, o3 = e4.plane.distanceToPoint(a3.start), s3 = e4.plane.distanceToPoint(a3.end);
    return _i(o3) ? _i(s3) ? f2(e4, t3, n3, i3) : (n3 && (n3.start.copy(a3.start), n3.end.copy(a3.start)), e4.containsPoint(a3.start)) : _i(s3) ? (n3 && (n3.start.copy(a3.end), n3.end.copy(a3.end)), e4.containsPoint(a3.end)) : e4.plane.intersectLine(a3, r2) != null && (n3 && (n3.start.copy(r2), n3.end.copy(r2)), e4.containsPoint(r2));
  }
  function g2(e4, t3, n3) {
    let r3 = t3.a;
    return _i(e4.plane.distanceToPoint(r3)) && e4.containsPoint(r3) ? (n3 && (n3.start.copy(r3), n3.end.copy(r3)), true) : false;
  }
  function _2(e4, t3, n3) {
    let i3 = e4.degenerateSegment, a3 = t3.a;
    return i3.closestPointToPoint(a3, true, r2), a3.distanceToSquared(r2) < gi && (n3 && (n3.start.copy(a3), n3.end.copy(a3)), true);
  }
  function v2(e4, t3, n3, o3) {
    if (e4.isDegenerateIntoSegment) {
      if (t3.isDegenerateIntoSegment) {
        let o4 = e4.degenerateSegment, s3 = t3.degenerateSegment, c3 = i2, l3 = a2;
        o4.delta(c3), s3.delta(l3);
        let u3 = r2.subVectors(s3.start, o4.start), d3 = c3.x * l3.y - c3.y * l3.x;
        if (_i(d3)) return false;
        let f3 = (u3.x * l3.y - u3.y * l3.x) / d3, p3 = -(c3.x * u3.y - c3.y * u3.x) / d3;
        return f3 < 0 || f3 > 1 || p3 < 0 || p3 > 1 ? false : _i(o4.start.z + c3.z * f3 - (s3.start.z + l3.z * p3)) ? (n3 && (n3.start.copy(o4.start).addScaledVector(c3, f3), n3.end.copy(o4.start).addScaledVector(c3, f3)), true) : false;
      }
      return t3.isDegenerateIntoPoint ? _2(e4, t3, n3) : h2(t3, e4, n3, o3);
    }
    if (e4.isDegenerateIntoPoint) return t3.isDegenerateIntoPoint ? t3.a.distanceToSquared(e4.a) < gi && (n3 && (n3.start.copy(e4.a), n3.end.copy(e4.a)), true) : t3.isDegenerateIntoSegment ? _2(t3, e4, n3) : g2(t3, e4, n3);
    if (t3.isDegenerateIntoPoint) return g2(e4, t3, n3);
    if (t3.isDegenerateIntoSegment) return h2(e4, t3, n3, o3);
  }
  return function(t3, n3 = null, r3 = false) {
    this.needsUpdate && this.update(), t3.isExtendedTriangle ? t3.needsUpdate && t3.update() : (e3.copy(t3), e3.update(), t3 = e3);
    let o3 = v2(this, t3, n3, r3);
    if (o3 !== void 0) return o3;
    let p3 = this.plane, h3 = t3.plane, g3 = h3.distanceToPoint(this.a), _3 = h3.distanceToPoint(this.b), y2 = h3.distanceToPoint(this.c);
    _i(g3) && (g3 = 0), _i(_3) && (_3 = 0), _i(y2) && (y2 = 0);
    let b2 = g3 * _3, x2 = g3 * y2;
    if (b2 > 0 && x2 > 0) return false;
    let S2 = p3.distanceToPoint(t3.a), C2 = p3.distanceToPoint(t3.b), w2 = p3.distanceToPoint(t3.c);
    _i(S2) && (S2 = 0), _i(C2) && (C2 = 0), _i(w2) && (w2 = 0);
    let T2 = S2 * C2, E2 = S2 * w2;
    if (T2 > 0 && E2 > 0) return false;
    i2.copy(p3.normal), a2.copy(h3.normal);
    let D2 = i2.cross(a2), ee2 = 0, O2 = Math.abs(D2.x), k2 = Math.abs(D2.y);
    k2 > O2 && (O2 = k2, ee2 = 1), Math.abs(D2.z) > O2 && (ee2 = 2);
    let te2 = mi[ee2], A2 = this.a[te2], ne2 = this.b[te2], re2 = this.c[te2], ie2 = t3.a[te2], ae2 = t3.b[te2], j2 = t3.c[te2];
    if (m2(this, A2, ne2, re2, b2, x2, g3, _3, y2, u2, s2) || m2(t3, ie2, ae2, j2, T2, E2, S2, C2, w2, d2, c2)) return f2(this, t3, n3, r3);
    if (u2.y < u2.x) {
      let e4 = u2.y;
      u2.y = u2.x, u2.x = e4, l2.copy(s2.start), s2.start.copy(s2.end), s2.end.copy(l2);
    }
    if (d2.y < d2.x) {
      let e4 = d2.y;
      d2.y = d2.x, d2.x = e4, l2.copy(c2.start), c2.start.copy(c2.end), c2.end.copy(l2);
    }
    return u2.y < d2.x || d2.y < u2.x ? false : (n3 && (d2.x > u2.x ? n3.start.copy(c2.start) : n3.start.copy(s2.start), d2.y < u2.y ? n3.end.copy(c2.end) : n3.end.copy(s2.end)), true);
  };
})(), vi.prototype.distanceToPoint = (function() {
  let e3 = new M();
  return function(t2) {
    return this.closestPointToPoint(t2, e3), t2.distanceTo(e3);
  };
})(), vi.prototype.distanceToTriangle = (function() {
  let e3 = new M(), t2 = new M(), n2 = [`a`, `b`, `c`], r2 = new A(), i2 = new A();
  return function(a2, o2 = null, s2 = null) {
    let c2 = o2 || s2 ? r2 : null;
    if (this.intersectsTriangle(a2, c2, true)) return (o2 || s2) && (o2 && c2.getCenter(o2), s2 && c2.getCenter(s2)), 0;
    let l2 = 1 / 0;
    for (let t3 = 0; t3 < 3; t3++) {
      let r3, i3 = n2[t3], c3 = a2[i3];
      this.closestPointToPoint(c3, e3), r3 = c3.distanceToSquared(e3), r3 < l2 && (l2 = r3, o2 && o2.copy(e3), s2 && s2.copy(c3));
      let u2 = this[i3];
      a2.closestPointToPoint(u2, e3), r3 = u2.distanceToSquared(e3), r3 < l2 && (l2 = r3, o2 && o2.copy(u2), s2 && s2.copy(e3));
    }
    for (let c3 = 0; c3 < 3; c3++) {
      let u2 = n2[c3], d2 = n2[(c3 + 1) % 3];
      r2.set(this[u2], this[d2]);
      for (let c4 = 0; c4 < 3; c4++) {
        let u3 = n2[c4], d3 = n2[(c4 + 1) % 3];
        i2.set(a2[u3], a2[d3]), fi(r2, i2, e3, t2);
        let f2 = e3.distanceToSquared(t2);
        f2 < l2 && (l2 = f2, o2 && o2.copy(e3), s2 && s2.copy(t2));
      }
    }
    return Math.sqrt(l2);
  };
})();
var K = class {
  constructor(e3, t2, n2) {
    this.isOrientedBox = true, this.min = new M(), this.max = new M(), this.matrix = new k(), this.invMatrix = new k(), this.points = Array(8).fill().map(() => new M()), this.satAxes = [, , ,].fill().map(() => new M()), this.satBounds = [, , ,].fill().map(() => new ui()), this.alignedSatBounds = [, , ,].fill().map(() => new ui()), this.needsUpdate = false, e3 && this.min.copy(e3), t2 && this.max.copy(t2), n2 && this.matrix.copy(n2);
  }
  set(e3, t2, n2) {
    this.min.copy(e3), this.max.copy(t2), this.matrix.copy(n2), this.needsUpdate = true;
  }
  copy(e3) {
    this.min.copy(e3.min), this.max.copy(e3.max), this.matrix.copy(e3.matrix), this.needsUpdate = true;
  }
};
K.prototype.update = /* @__PURE__ */ (function() {
  return function() {
    let e3 = this.matrix, t2 = this.min, n2 = this.max, r2 = this.points;
    for (let i3 = 0; i3 <= 1; i3++) for (let a3 = 0; a3 <= 1; a3++) for (let o3 = 0; o3 <= 1; o3++) {
      let s3 = r2[1 * i3 | 2 * a3 | 4 * o3];
      s3.x = i3 ? n2.x : t2.x, s3.y = a3 ? n2.y : t2.y, s3.z = o3 ? n2.z : t2.z, s3.applyMatrix4(e3);
    }
    let i2 = this.satBounds, a2 = this.satAxes, o2 = r2[0];
    for (let e4 = 0; e4 < 3; e4++) {
      let t3 = a2[e4], n3 = i2[e4], s3 = r2[1 << e4];
      t3.subVectors(o2, s3), n3.setFromPoints(t3, r2);
    }
    let s2 = this.alignedSatBounds;
    s2[0].setFromPointsField(r2, `x`), s2[1].setFromPointsField(r2, `y`), s2[2].setFromPointsField(r2, `z`), this.invMatrix.copy(this.matrix).invert(), this.needsUpdate = false;
  };
})(), K.prototype.intersectsBox = (function() {
  let e3 = new ui();
  return function(t2) {
    this.needsUpdate && this.update();
    let n2 = t2.min, r2 = t2.max, i2 = this.satBounds, a2 = this.satAxes, o2 = this.alignedSatBounds;
    if (e3.min = n2.x, e3.max = r2.x, o2[0].isSeparated(e3) || (e3.min = n2.y, e3.max = r2.y, o2[1].isSeparated(e3)) || (e3.min = n2.z, e3.max = r2.z, o2[2].isSeparated(e3))) return false;
    for (let n3 = 0; n3 < 3; n3++) {
      let r3 = a2[n3], o3 = i2[n3];
      if (e3.setFromBox(r3, t2), o3.isSeparated(e3)) return false;
    }
    return true;
  };
})(), K.prototype.intersectsTriangle = (function() {
  let e3 = new vi(), t2 = [, , ,], n2 = new ui(), r2 = new ui(), i2 = new M();
  return function(a2) {
    this.needsUpdate && this.update(), a2.isExtendedTriangle ? a2.needsUpdate && a2.update() : (e3.copy(a2), e3.update(), a2 = e3);
    let o2 = this.satBounds, s2 = this.satAxes;
    t2[0] = a2.a, t2[1] = a2.b, t2[2] = a2.c;
    for (let e4 = 0; e4 < 3; e4++) {
      let r3 = o2[e4], i3 = s2[e4];
      if (n2.setFromPoints(i3, t2), r3.isSeparated(n2)) return false;
    }
    let c2 = a2.satBounds, l2 = a2.satAxes, u2 = this.points;
    for (let e4 = 0; e4 < 3; e4++) {
      let t3 = c2[e4], r3 = l2[e4];
      if (n2.setFromPoints(r3, u2), t3.isSeparated(n2)) return false;
    }
    for (let e4 = 0; e4 < 3; e4++) {
      let a3 = s2[e4];
      for (let e5 = 0; e5 < 4; e5++) {
        let o3 = l2[e5];
        if (i2.crossVectors(a3, o3), n2.setFromPoints(i2, t2), r2.setFromPoints(i2, u2), n2.isSeparated(r2)) return false;
      }
    }
    return true;
  };
})(), K.prototype.closestPointToPoint = /* @__PURE__ */ (function() {
  return function(e3, t2) {
    return this.needsUpdate && this.update(), t2.copy(e3).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), t2;
  };
})(), K.prototype.distanceToPoint = (function() {
  let e3 = new M();
  return function(t2) {
    return this.closestPointToPoint(t2, e3), t2.distanceTo(e3);
  };
})(), K.prototype.distanceToBox = (function() {
  let e3 = [`x`, `y`, `z`], t2 = Array(12).fill().map(() => new A()), n2 = Array(12).fill().map(() => new A()), r2 = new M(), i2 = new M();
  return function(a2, o2 = 0, s2 = null, c2 = null) {
    if (this.needsUpdate && this.update(), this.intersectsBox(a2)) return (s2 || c2) && (a2.getCenter(i2), this.closestPointToPoint(i2, r2), a2.closestPointToPoint(r2, i2), s2 && s2.copy(r2), c2 && c2.copy(i2)), 0;
    let l2 = o2 * o2, u2 = a2.min, d2 = a2.max, f2 = this.points, p2 = 1 / 0;
    for (let e4 = 0; e4 < 8; e4++) {
      let t3 = f2[e4];
      i2.copy(t3).clamp(u2, d2);
      let n3 = t3.distanceToSquared(i2);
      if (n3 < p2 && (p2 = n3, s2 && s2.copy(t3), c2 && c2.copy(i2), n3 < l2)) return Math.sqrt(n3);
    }
    let m2 = 0;
    for (let r3 = 0; r3 < 3; r3++) for (let i3 = 0; i3 <= 1; i3++) for (let a3 = 0; a3 <= 1; a3++) {
      let o3 = (r3 + 1) % 3, s3 = (r3 + 2) % 3, c3 = i3 << o3 | a3 << s3, l3 = 1 << r3 | i3 << o3 | a3 << s3, p3 = f2[c3], h2 = f2[l3];
      t2[m2].set(p3, h2);
      let g2 = e3[r3], _2 = e3[o3], v2 = e3[s3], y2 = n2[m2], b2 = y2.start, x2 = y2.end;
      b2[g2] = u2[g2], b2[_2] = i3 ? u2[_2] : d2[_2], b2[v2] = a3 ? u2[v2] : d2[_2], x2[g2] = d2[g2], x2[_2] = i3 ? u2[_2] : d2[_2], x2[v2] = a3 ? u2[v2] : d2[_2], m2++;
    }
    for (let e4 = 0; e4 <= 1; e4++) for (let t3 = 0; t3 <= 1; t3++) for (let n3 = 0; n3 <= 1; n3++) {
      i2.x = e4 ? d2.x : u2.x, i2.y = t3 ? d2.y : u2.y, i2.z = n3 ? d2.z : u2.z, this.closestPointToPoint(i2, r2);
      let a3 = i2.distanceToSquared(r2);
      if (a3 < p2 && (p2 = a3, s2 && s2.copy(r2), c2 && c2.copy(i2), a3 < l2)) return Math.sqrt(a3);
    }
    for (let e4 = 0; e4 < 12; e4++) {
      let a3 = t2[e4];
      for (let e5 = 0; e5 < 12; e5++) {
        let t3 = n2[e5];
        fi(a3, t3, r2, i2);
        let o3 = r2.distanceToSquared(i2);
        if (o3 < p2 && (p2 = o3, s2 && s2.copy(r2), c2 && c2.copy(i2), o3 < l2)) return Math.sqrt(o3);
      }
    }
    return Math.sqrt(p2);
  };
})();
var yi = new class extends Nr {
  constructor() {
    super(() => new vi());
  }
}(), bi = new M(), xi = new M();
function Si(e3, t2, n2 = {}, r2 = 0, i2 = 1 / 0) {
  let a2 = r2 * r2, o2 = i2 * i2, s2 = 1 / 0, c2 = null;
  if (e3.shapecast({ boundsTraverseOrder: (e4) => (bi.copy(t2).clamp(e4.min, e4.max), bi.distanceToSquared(t2)), intersectsBounds: (e4, t3, n3) => n3 < s2 && n3 < o2, intersectsTriangle: (e4, n3) => {
    e4.closestPointToPoint(t2, bi);
    let r3 = t2.distanceToSquared(bi);
    return r3 < s2 && (xi.copy(bi), s2 = r3, c2 = n3), r3 < a2;
  } }), s2 === 1 / 0) return null;
  let l2 = Math.sqrt(s2);
  return n2.point ? n2.point.copy(xi) : n2.point = xi.clone(), n2.distance = l2, n2.faceIndex = c2, n2;
}
var Ci = true, wi = new M(), Ti = new M(), Ei = new M(), Di = new j(), Oi = new j(), ki = new j(), Ai = new M(), ji = new M(), Mi = new M(), Ni = new M();
function Pi(e3, t2, n2, r2, i2, a2, o2, s2) {
  let c2;
  if (c2 = a2 === 1 ? e3.intersectTriangle(r2, n2, t2, true, i2) : e3.intersectTriangle(t2, n2, r2, a2 !== 2, i2), c2 === null) return null;
  let l2 = e3.origin.distanceTo(i2);
  return l2 < o2 || l2 > s2 ? null : { distance: l2, point: i2.clone() };
}
function Fi(e3, t2, n2, r2, i2, a2, o2, s2, c2, l2, u2) {
  wi.fromBufferAttribute(t2, a2), Ti.fromBufferAttribute(t2, o2), Ei.fromBufferAttribute(t2, s2);
  let d2 = Pi(e3, wi, Ti, Ei, Ni, c2, l2, u2);
  if (d2) {
    if (r2) {
      Di.fromBufferAttribute(r2, a2), Oi.fromBufferAttribute(r2, o2), ki.fromBufferAttribute(r2, s2), d2.uv = new j();
      let e4 = ue.getInterpolation(Ni, wi, Ti, Ei, Di, Oi, ki, d2.uv);
      Ci || (d2.uv = e4);
    }
    if (i2) {
      Di.fromBufferAttribute(i2, a2), Oi.fromBufferAttribute(i2, o2), ki.fromBufferAttribute(i2, s2), d2.uv1 = new j();
      let e4 = ue.getInterpolation(Ni, wi, Ti, Ei, Di, Oi, ki, d2.uv1);
      Ci || (d2.uv1 = e4);
    }
    if (n2) {
      Ai.fromBufferAttribute(n2, a2), ji.fromBufferAttribute(n2, o2), Mi.fromBufferAttribute(n2, s2), d2.normal = new M();
      let t4 = ue.getInterpolation(Ni, wi, Ti, Ei, Ai, ji, Mi, d2.normal);
      d2.normal.dot(e3.direction) > 0 && d2.normal.multiplyScalar(-1), Ci || (d2.normal = t4);
    }
    let t3 = { a: a2, b: o2, c: s2, normal: new M(), materialIndex: 0 };
    if (ue.getNormal(wi, Ti, Ei, t3.normal), d2.face = t3, d2.faceIndex = a2, Ci) {
      let e4 = new M();
      ue.getBarycoord(Ni, wi, Ti, Ei, e4), d2.barycoord = e4;
    }
  }
  return d2;
}
function Ii(e3) {
  return e3 && e3.isMaterial ? e3.side : e3;
}
function Li(e3, t2, n2, r2, i2, a2, o2) {
  let s2 = r2 * 3, c2 = s2 + 0, l2 = s2 + 1, u2 = s2 + 2, { index: d2, groups: f2 } = e3;
  e3.index && (c2 = d2.getX(c2), l2 = d2.getX(l2), u2 = d2.getX(u2));
  let { position: p2, normal: m2, uv: h2, uv1: g2 } = e3.attributes;
  if (Array.isArray(t2)) {
    let e4 = r2 * 3;
    for (let s3 = 0, d3 = f2.length; s3 < d3; s3++) {
      let { start: d4, count: _2, materialIndex: v2 } = f2[s3];
      if (e4 >= d4 && e4 < d4 + _2) {
        let e5 = Ii(t2[v2]), s4 = Fi(n2, p2, m2, h2, g2, c2, l2, u2, e5, a2, o2);
        if (s4) {
          if (s4.faceIndex = r2, s4.face.materialIndex = v2, i2) i2.push(s4);
          else return s4;
        }
      }
    }
  } else {
    let e4 = Ii(t2), s3 = Fi(n2, p2, m2, h2, g2, c2, l2, u2, e4, a2, o2);
    if (s3) {
      if (s3.faceIndex = r2, s3.face.materialIndex = 0, i2) i2.push(s3);
      else return s3;
    }
  }
  return null;
}
function q(e3, t2, n2, r2) {
  let i2 = e3.a, a2 = e3.b, o2 = e3.c, s2 = t2, c2 = t2 + 1, l2 = t2 + 2;
  n2 && (s2 = n2.getX(s2), c2 = n2.getX(c2), l2 = n2.getX(l2)), i2.x = r2.getX(s2), i2.y = r2.getY(s2), i2.z = r2.getZ(s2), a2.x = r2.getX(c2), a2.y = r2.getY(c2), a2.z = r2.getZ(c2), o2.x = r2.getX(l2), o2.y = r2.getY(l2), o2.z = r2.getZ(l2);
}
function Ri(e3, t2, n2, r2, i2, a2, o2, s2) {
  let { geometry: c2, _indirectBuffer: l2 } = e3;
  for (let e4 = r2, l3 = r2 + i2; e4 < l3; e4++) Li(c2, t2, n2, e4, a2, o2, s2);
}
function zi(e3, t2, n2, r2, i2, a2, o2) {
  let { geometry: s2, _indirectBuffer: c2 } = e3, l2 = 1 / 0, u2 = null;
  for (let e4 = r2, c3 = r2 + i2; e4 < c3; e4++) {
    let r3;
    r3 = Li(s2, t2, n2, e4, null, a2, o2), r3 && r3.distance < l2 && (u2 = r3, l2 = r3.distance);
  }
  return u2;
}
function Bi(e3, t2, n2, r2, i2, a2, o2) {
  let { geometry: s2 } = n2, { index: c2 } = s2, l2 = s2.attributes.position;
  for (let n3 = e3, s3 = t2 + e3; n3 < s3; n3++) {
    let e4;
    if (e4 = n3, q(o2, e4 * 3, c2, l2), o2.needsUpdate = true, r2(o2, e4, i2, a2)) return true;
  }
  return false;
}
function Vi(e3, t2 = null) {
  t2 && Array.isArray(t2) && (t2 = new Set(t2));
  let n2 = e3.geometry, r2 = n2.index ? n2.index.array : null, i2 = n2.attributes.position, a2, o2, s2, c2, l2 = 0, u2 = e3._roots;
  for (let e4 = 0, t3 = u2.length; e4 < t3; e4++) a2 = u2[e4], o2 = new Uint32Array(a2), s2 = new Uint16Array(a2), c2 = new Float32Array(a2), d2(0, l2), l2 += a2.byteLength;
  function d2(e4, n3, a3 = false) {
    let l3 = e4 * 2;
    if (z(l3, s2)) {
      let t3 = B(e4, o2), n4 = V(l3, s2), a4 = 1 / 0, u3 = 1 / 0, d3 = 1 / 0, f2 = -1 / 0, p2 = -1 / 0, m2 = -1 / 0;
      for (let e5 = 3 * t3, o3 = 3 * (t3 + n4); e5 < o3; e5++) {
        let t4 = r2[e5], n5 = i2.getX(t4), o4 = i2.getY(t4), s3 = i2.getZ(t4);
        n5 < a4 && (a4 = n5), n5 > f2 && (f2 = n5), o4 < u3 && (u3 = o4), o4 > p2 && (p2 = o4), s3 < d3 && (d3 = s3), s3 > m2 && (m2 = s3);
      }
      return c2[e4 + 0] !== a4 || c2[e4 + 1] !== u3 || c2[e4 + 2] !== d3 || c2[e4 + 3] !== f2 || c2[e4 + 4] !== p2 || c2[e4 + 5] !== m2 ? (c2[e4 + 0] = a4, c2[e4 + 1] = u3, c2[e4 + 2] = d3, c2[e4 + 3] = f2, c2[e4 + 4] = p2, c2[e4 + 5] = m2, true) : false;
    }
    {
      let r3 = H(e4), i3 = U(e4, o2), s3 = a3, l4 = false, u3 = false;
      if (t2) {
        if (!s3) {
          let e5 = r3 / 8 + n3 / 32, a4 = i3 / 8 + n3 / 32;
          l4 = t2.has(e5), u3 = t2.has(a4), s3 = !l4 && !u3;
        }
      } else l4 = true, u3 = true;
      let f2 = s3 || l4, p2 = s3 || u3, m2 = false;
      f2 && (m2 = d2(r3, n3, s3));
      let h2 = false;
      p2 && (h2 = d2(i3, n3, s3));
      let g2 = m2 || h2;
      if (g2) for (let t3 = 0; t3 < 3; t3++) {
        let n4 = r3 + t3, a4 = i3 + t3, o3 = c2[n4], s4 = c2[n4 + 3], l5 = c2[a4], u4 = c2[a4 + 3];
        c2[e4 + t3] = o3 < l5 ? o3 : l5, c2[e4 + t3 + 3] = s4 > u4 ? s4 : u4;
      }
      return g2;
    }
  }
}
function Hi(e3, t2, n2, r2, i2) {
  let a2, o2, s2, c2, l2, u2, d2 = 1 / n2.direction.x, f2 = 1 / n2.direction.y, p2 = 1 / n2.direction.z, m2 = n2.origin.x, h2 = n2.origin.y, g2 = n2.origin.z, _2 = t2[e3], v2 = t2[e3 + 3], y2 = t2[e3 + 1], b2 = t2[e3 + 3 + 1], x2 = t2[e3 + 2], S2 = t2[e3 + 3 + 2];
  return d2 >= 0 ? (a2 = (_2 - m2) * d2, o2 = (v2 - m2) * d2) : (a2 = (v2 - m2) * d2, o2 = (_2 - m2) * d2), f2 >= 0 ? (s2 = (y2 - h2) * f2, c2 = (b2 - h2) * f2) : (s2 = (b2 - h2) * f2, c2 = (y2 - h2) * f2), a2 > c2 || s2 > o2 || ((s2 > a2 || isNaN(a2)) && (a2 = s2), (c2 < o2 || isNaN(o2)) && (o2 = c2), p2 >= 0 ? (l2 = (x2 - g2) * p2, u2 = (S2 - g2) * p2) : (l2 = (S2 - g2) * p2, u2 = (x2 - g2) * p2), a2 > u2 || l2 > o2) ? false : ((l2 > a2 || a2 !== a2) && (a2 = l2), (u2 < o2 || o2 !== o2) && (o2 = u2), a2 <= i2 && o2 >= r2);
}
function Ui(e3, t2, n2, r2, i2, a2, o2, s2) {
  let { geometry: c2, _indirectBuffer: l2 } = e3;
  for (let e4 = r2, u2 = r2 + i2; e4 < u2; e4++) Li(c2, t2, n2, l2 ? l2[e4] : e4, a2, o2, s2);
}
function Wi(e3, t2, n2, r2, i2, a2, o2) {
  let { geometry: s2, _indirectBuffer: c2 } = e3, l2 = 1 / 0, u2 = null;
  for (let e4 = r2, d2 = r2 + i2; e4 < d2; e4++) {
    let r3;
    r3 = Li(s2, t2, n2, c2 ? c2[e4] : e4, null, a2, o2), r3 && r3.distance < l2 && (u2 = r3, l2 = r3.distance);
  }
  return u2;
}
function Gi(e3, t2, n2, r2, i2, a2, o2) {
  let { geometry: s2 } = n2, { index: c2 } = s2, l2 = s2.attributes.position;
  for (let s3 = e3, u2 = t2 + e3; s3 < u2; s3++) {
    let e4;
    if (e4 = n2.resolveTriangleIndex(s3), q(o2, e4 * 3, c2, l2), o2.needsUpdate = true, r2(o2, e4, i2, a2)) return true;
  }
  return false;
}
function Ki(e3, t2, n2, r2, i2, a2, o2) {
  G.setBuffer(e3._roots[t2]), qi(0, e3, n2, r2, i2, a2, o2), G.clearBuffer();
}
function qi(e3, t2, n2, r2, i2, a2, o2) {
  let { float32Array: s2, uint16Array: c2, uint32Array: l2 } = G, u2 = e3 * 2;
  if (z(u2, c2)) Ri(t2, n2, r2, B(e3, l2), V(u2, c2), i2, a2, o2);
  else {
    let c3 = H(e3);
    Hi(c3, s2, r2, a2, o2) && qi(c3, t2, n2, r2, i2, a2, o2);
    let u3 = U(e3, l2);
    Hi(u3, s2, r2, a2, o2) && qi(u3, t2, n2, r2, i2, a2, o2);
  }
}
var Ji = [`x`, `y`, `z`];
function Yi(e3, t2, n2, r2, i2, a2) {
  G.setBuffer(e3._roots[t2]);
  let o2 = Xi(0, e3, n2, r2, i2, a2);
  return G.clearBuffer(), o2;
}
function Xi(e3, t2, n2, r2, i2, a2) {
  let { float32Array: o2, uint16Array: s2, uint32Array: c2 } = G, l2 = e3 * 2;
  if (z(l2, s2)) return zi(t2, n2, r2, B(e3, c2), V(l2, s2), i2, a2);
  {
    let s3 = pr(e3, c2), l3 = Ji[s3], u2 = r2.direction[l3] >= 0, d2, f2;
    u2 ? (d2 = H(e3), f2 = U(e3, c2)) : (d2 = U(e3, c2), f2 = H(e3));
    let p2 = Hi(d2, o2, r2, i2, a2) ? Xi(d2, t2, n2, r2, i2, a2) : null;
    if (p2) {
      let e4 = p2.point[l3];
      if (u2 ? e4 <= o2[f2 + s3] : e4 >= o2[f2 + s3 + 3]) return p2;
    }
    let m2 = Hi(f2, o2, r2, i2, a2) ? Xi(f2, t2, n2, r2, i2, a2) : null;
    return p2 && m2 ? p2.distance <= m2.distance ? p2 : m2 : p2 || m2 || null;
  }
}
var Zi = new o(), Qi = new vi(), $i = new vi(), ea = new k(), ta = new K(), na = new K();
function ra(e3, t2, n2, r2) {
  G.setBuffer(e3._roots[t2]);
  let i2 = ia(0, e3, n2, r2);
  return G.clearBuffer(), i2;
}
function ia(e3, t2, n2, r2, i2 = null) {
  let { float32Array: a2, uint16Array: o2, uint32Array: s2 } = G, c2 = e3 * 2;
  if (i2 === null && (n2.boundingBox || n2.computeBoundingBox(), ta.set(n2.boundingBox.min, n2.boundingBox.max, r2), i2 = ta), z(c2, o2)) {
    let i3 = t2.geometry, l2 = i3.index, u2 = i3.attributes.position, d2 = n2.index, f2 = n2.attributes.position, p2 = B(e3, s2), m2 = V(c2, o2);
    if (ea.copy(r2).invert(), n2.boundsTree) return R(W(e3), a2, na), na.matrix.copy(ea), na.needsUpdate = true, n2.boundsTree.shapecast({ intersectsBounds: (e4) => na.intersectsBox(e4), intersectsTriangle: (e4) => {
      e4.a.applyMatrix4(r2), e4.b.applyMatrix4(r2), e4.c.applyMatrix4(r2), e4.needsUpdate = true;
      for (let t3 = p2 * 3, n3 = (m2 + p2) * 3; t3 < n3; t3 += 3) if (q($i, t3, l2, u2), $i.needsUpdate = true, e4.intersectsTriangle($i)) return true;
      return false;
    } });
    {
      let e4 = ni(n2);
      for (let t3 = p2 * 3, n3 = (m2 + p2) * 3; t3 < n3; t3 += 3) {
        q(Qi, t3, l2, u2), Qi.a.applyMatrix4(ea), Qi.b.applyMatrix4(ea), Qi.c.applyMatrix4(ea), Qi.needsUpdate = true;
        for (let t4 = 0, n4 = e4 * 3; t4 < n4; t4 += 3) if (q($i, t4, d2, f2), $i.needsUpdate = true, Qi.intersectsTriangle($i)) return true;
      }
    }
  } else {
    let o3 = H(e3), c3 = U(e3, s2);
    return R(W(o3), a2, Zi), !!(i2.intersectsBox(Zi) && ia(o3, t2, n2, r2, i2) || (R(W(c3), a2, Zi), i2.intersectsBox(Zi) && ia(c3, t2, n2, r2, i2)));
  }
}
var aa = new k(), oa = new K(), sa = new K(), ca = new M(), la = new M(), ua = new M(), da = new M();
function fa(e3, t2, n2, r2 = {}, i2 = {}, a2 = 0, o2 = 1 / 0) {
  t2.boundingBox || t2.computeBoundingBox(), oa.set(t2.boundingBox.min, t2.boundingBox.max, n2), oa.needsUpdate = true;
  let s2 = e3.geometry, c2 = s2.attributes.position, l2 = s2.index, u2 = t2.attributes.position, d2 = t2.index, f2 = yi.getPrimitive(), p2 = yi.getPrimitive(), m2 = ca, h2 = la, g2 = null, _2 = null;
  i2 && (g2 = ua, _2 = da);
  let v2 = 1 / 0, y2 = null, b2 = null;
  return aa.copy(n2).invert(), sa.matrix.copy(aa), e3.shapecast({ boundsTraverseOrder: (e4) => oa.distanceToBox(e4), intersectsBounds: (e4, t3, n3) => n3 < v2 && n3 < o2 && (t3 && (sa.min.copy(e4.min), sa.max.copy(e4.max), sa.needsUpdate = true), true), intersectsRange: (e4, r3) => {
    if (t2.boundsTree) return t2.boundsTree.shapecast({ boundsTraverseOrder: (e5) => sa.distanceToBox(e5), intersectsBounds: (e5, t3, n3) => n3 < v2 && n3 < o2, intersectsRange: (t3, i3) => {
      for (let o3 = t3, s3 = t3 + i3; o3 < s3; o3++) {
        q(p2, 3 * o3, d2, u2), p2.a.applyMatrix4(n2), p2.b.applyMatrix4(n2), p2.c.applyMatrix4(n2), p2.needsUpdate = true;
        for (let t4 = e4, n3 = e4 + r3; t4 < n3; t4++) {
          q(f2, 3 * t4, l2, c2), f2.needsUpdate = true;
          let e5 = f2.distanceToTriangle(p2, m2, g2);
          if (e5 < v2 && (h2.copy(m2), _2 && _2.copy(g2), v2 = e5, y2 = t4, b2 = o3), e5 < a2) return true;
        }
      }
    } });
    {
      let i3 = ni(t2);
      for (let t3 = 0, o3 = i3; t3 < o3; t3++) {
        q(p2, 3 * t3, d2, u2), p2.a.applyMatrix4(n2), p2.b.applyMatrix4(n2), p2.c.applyMatrix4(n2), p2.needsUpdate = true;
        for (let n3 = e4, i4 = e4 + r3; n3 < i4; n3++) {
          q(f2, 3 * n3, l2, c2), f2.needsUpdate = true;
          let e5 = f2.distanceToTriangle(p2, m2, g2);
          if (e5 < v2 && (h2.copy(m2), _2 && _2.copy(g2), v2 = e5, y2 = n3, b2 = t3), e5 < a2) return true;
        }
      }
    }
  } }), yi.releasePrimitive(f2), yi.releasePrimitive(p2), v2 === 1 / 0 ? null : (r2.point ? r2.point.copy(h2) : r2.point = h2.clone(), r2.distance = v2, r2.faceIndex = y2, i2 && (i2.point ? i2.point.copy(_2) : i2.point = _2.clone(), i2.point.applyMatrix4(aa), h2.applyMatrix4(aa), i2.distance = h2.sub(i2.point).length(), i2.faceIndex = b2), r2);
}
function pa(e3, t2 = null) {
  t2 && Array.isArray(t2) && (t2 = new Set(t2));
  let n2 = e3.geometry, r2 = n2.index ? n2.index.array : null, i2 = n2.attributes.position, a2, o2, s2, c2, l2 = 0, u2 = e3._roots;
  for (let e4 = 0, t3 = u2.length; e4 < t3; e4++) a2 = u2[e4], o2 = new Uint32Array(a2), s2 = new Uint16Array(a2), c2 = new Float32Array(a2), d2(0, l2), l2 += a2.byteLength;
  function d2(n3, a3, l3 = false) {
    let u3 = n3 * 2;
    if (z(u3, s2)) {
      let t3 = B(n3, o2), a4 = V(u3, s2), l4 = 1 / 0, d3 = 1 / 0, f2 = 1 / 0, p2 = -1 / 0, m2 = -1 / 0, h2 = -1 / 0;
      for (let n4 = t3, o3 = t3 + a4; n4 < o3; n4++) {
        let t4 = 3 * e3.resolveTriangleIndex(n4);
        for (let e4 = 0; e4 < 3; e4++) {
          let n5 = t4 + e4;
          n5 = r2 ? r2[n5] : n5;
          let a5 = i2.getX(n5), o4 = i2.getY(n5), s3 = i2.getZ(n5);
          a5 < l4 && (l4 = a5), a5 > p2 && (p2 = a5), o4 < d3 && (d3 = o4), o4 > m2 && (m2 = o4), s3 < f2 && (f2 = s3), s3 > h2 && (h2 = s3);
        }
      }
      return c2[n3 + 0] !== l4 || c2[n3 + 1] !== d3 || c2[n3 + 2] !== f2 || c2[n3 + 3] !== p2 || c2[n3 + 4] !== m2 || c2[n3 + 5] !== h2 ? (c2[n3 + 0] = l4, c2[n3 + 1] = d3, c2[n3 + 2] = f2, c2[n3 + 3] = p2, c2[n3 + 4] = m2, c2[n3 + 5] = h2, true) : false;
    }
    {
      let e4 = H(n3), r3 = U(n3, o2), i3 = l3, s3 = false, u4 = false;
      if (t2) {
        if (!i3) {
          let n4 = e4 / 8 + a3 / 32, o3 = r3 / 8 + a3 / 32;
          s3 = t2.has(n4), u4 = t2.has(o3), i3 = !s3 && !u4;
        }
      } else s3 = true, u4 = true;
      let f2 = i3 || s3, p2 = i3 || u4, m2 = false;
      f2 && (m2 = d2(e4, a3, i3));
      let h2 = false;
      p2 && (h2 = d2(r3, a3, i3));
      let g2 = m2 || h2;
      if (g2) for (let t3 = 0; t3 < 3; t3++) {
        let i4 = e4 + t3, a4 = r3 + t3, o3 = c2[i4], s4 = c2[i4 + 3], l4 = c2[a4], u5 = c2[a4 + 3];
        c2[n3 + t3] = o3 < l4 ? o3 : l4, c2[n3 + t3 + 3] = s4 > u5 ? s4 : u5;
      }
      return g2;
    }
  }
}
function ma(e3, t2, n2, r2, i2, a2, o2) {
  G.setBuffer(e3._roots[t2]), ha(0, e3, n2, r2, i2, a2, o2), G.clearBuffer();
}
function ha(e3, t2, n2, r2, i2, a2, o2) {
  let { float32Array: s2, uint16Array: c2, uint32Array: l2 } = G, u2 = e3 * 2;
  if (z(u2, c2)) Ui(t2, n2, r2, B(e3, l2), V(u2, c2), i2, a2, o2);
  else {
    let c3 = H(e3);
    Hi(c3, s2, r2, a2, o2) && ha(c3, t2, n2, r2, i2, a2, o2);
    let u3 = U(e3, l2);
    Hi(u3, s2, r2, a2, o2) && ha(u3, t2, n2, r2, i2, a2, o2);
  }
}
var ga = [`x`, `y`, `z`];
function _a(e3, t2, n2, r2, i2, a2) {
  G.setBuffer(e3._roots[t2]);
  let o2 = va(0, e3, n2, r2, i2, a2);
  return G.clearBuffer(), o2;
}
function va(e3, t2, n2, r2, i2, a2) {
  let { float32Array: o2, uint16Array: s2, uint32Array: c2 } = G, l2 = e3 * 2;
  if (z(l2, s2)) return Wi(t2, n2, r2, B(e3, c2), V(l2, s2), i2, a2);
  {
    let s3 = pr(e3, c2), l3 = ga[s3], u2 = r2.direction[l3] >= 0, d2, f2;
    u2 ? (d2 = H(e3), f2 = U(e3, c2)) : (d2 = U(e3, c2), f2 = H(e3));
    let p2 = Hi(d2, o2, r2, i2, a2) ? va(d2, t2, n2, r2, i2, a2) : null;
    if (p2) {
      let e4 = p2.point[l3];
      if (u2 ? e4 <= o2[f2 + s3] : e4 >= o2[f2 + s3 + 3]) return p2;
    }
    let m2 = Hi(f2, o2, r2, i2, a2) ? va(f2, t2, n2, r2, i2, a2) : null;
    return p2 && m2 ? p2.distance <= m2.distance ? p2 : m2 : p2 || m2 || null;
  }
}
var ya = new o(), ba = new vi(), xa = new vi(), Sa = new k(), Ca = new K(), wa = new K();
function Ta(e3, t2, n2, r2) {
  G.setBuffer(e3._roots[t2]);
  let i2 = Ea(0, e3, n2, r2);
  return G.clearBuffer(), i2;
}
function Ea(e3, t2, n2, r2, i2 = null) {
  let { float32Array: a2, uint16Array: o2, uint32Array: s2 } = G, c2 = e3 * 2;
  if (i2 === null && (n2.boundingBox || n2.computeBoundingBox(), Ca.set(n2.boundingBox.min, n2.boundingBox.max, r2), i2 = Ca), z(c2, o2)) {
    let i3 = t2.geometry, l2 = i3.index, u2 = i3.attributes.position, d2 = n2.index, f2 = n2.attributes.position, p2 = B(e3, s2), m2 = V(c2, o2);
    if (Sa.copy(r2).invert(), n2.boundsTree) return R(W(e3), a2, wa), wa.matrix.copy(Sa), wa.needsUpdate = true, n2.boundsTree.shapecast({ intersectsBounds: (e4) => wa.intersectsBox(e4), intersectsTriangle: (e4) => {
      e4.a.applyMatrix4(r2), e4.b.applyMatrix4(r2), e4.c.applyMatrix4(r2), e4.needsUpdate = true;
      for (let n3 = p2, r3 = m2 + p2; n3 < r3; n3++) if (q(xa, 3 * t2.resolveTriangleIndex(n3), l2, u2), xa.needsUpdate = true, e4.intersectsTriangle(xa)) return true;
      return false;
    } });
    {
      let e4 = ni(n2);
      for (let n3 = p2, r3 = m2 + p2; n3 < r3; n3++) {
        q(ba, 3 * t2.resolveTriangleIndex(n3), l2, u2), ba.a.applyMatrix4(Sa), ba.b.applyMatrix4(Sa), ba.c.applyMatrix4(Sa), ba.needsUpdate = true;
        for (let t3 = 0, n4 = e4 * 3; t3 < n4; t3 += 3) if (q(xa, t3, d2, f2), xa.needsUpdate = true, ba.intersectsTriangle(xa)) return true;
      }
    }
  } else {
    let o3 = H(e3), c3 = U(e3, s2);
    return R(W(o3), a2, ya), !!(i2.intersectsBox(ya) && Ea(o3, t2, n2, r2, i2) || (R(W(c3), a2, ya), i2.intersectsBox(ya) && Ea(c3, t2, n2, r2, i2)));
  }
}
var Da = new k(), Oa = new K(), ka = new K(), Aa = new M(), ja = new M(), Ma = new M(), Na = new M();
function Pa(e3, t2, n2, r2 = {}, i2 = {}, a2 = 0, o2 = 1 / 0) {
  t2.boundingBox || t2.computeBoundingBox(), Oa.set(t2.boundingBox.min, t2.boundingBox.max, n2), Oa.needsUpdate = true;
  let s2 = e3.geometry, c2 = s2.attributes.position, l2 = s2.index, u2 = t2.attributes.position, d2 = t2.index, f2 = yi.getPrimitive(), p2 = yi.getPrimitive(), m2 = Aa, h2 = ja, g2 = null, _2 = null;
  i2 && (g2 = Ma, _2 = Na);
  let v2 = 1 / 0, y2 = null, b2 = null;
  return Da.copy(n2).invert(), ka.matrix.copy(Da), e3.shapecast({ boundsTraverseOrder: (e4) => Oa.distanceToBox(e4), intersectsBounds: (e4, t3, n3) => n3 < v2 && n3 < o2 && (t3 && (ka.min.copy(e4.min), ka.max.copy(e4.max), ka.needsUpdate = true), true), intersectsRange: (r3, i3) => {
    if (t2.boundsTree) {
      let s3 = t2.boundsTree;
      return s3.shapecast({ boundsTraverseOrder: (e4) => ka.distanceToBox(e4), intersectsBounds: (e4, t3, n3) => n3 < v2 && n3 < o2, intersectsRange: (t3, o3) => {
        for (let x2 = t3, S2 = t3 + o3; x2 < S2; x2++) {
          let t4 = s3.resolveTriangleIndex(x2);
          q(p2, 3 * t4, d2, u2), p2.a.applyMatrix4(n2), p2.b.applyMatrix4(n2), p2.c.applyMatrix4(n2), p2.needsUpdate = true;
          for (let t5 = r3, n3 = r3 + i3; t5 < n3; t5++) {
            let n4 = e3.resolveTriangleIndex(t5);
            q(f2, 3 * n4, l2, c2), f2.needsUpdate = true;
            let r4 = f2.distanceToTriangle(p2, m2, g2);
            if (r4 < v2 && (h2.copy(m2), _2 && _2.copy(g2), v2 = r4, y2 = t5, b2 = x2), r4 < a2) return true;
          }
        }
      } });
    }
    {
      let o3 = ni(t2);
      for (let t3 = 0, s3 = o3; t3 < s3; t3++) {
        q(p2, 3 * t3, d2, u2), p2.a.applyMatrix4(n2), p2.b.applyMatrix4(n2), p2.c.applyMatrix4(n2), p2.needsUpdate = true;
        for (let n3 = r3, o4 = r3 + i3; n3 < o4; n3++) {
          let r4 = e3.resolveTriangleIndex(n3);
          q(f2, 3 * r4, l2, c2), f2.needsUpdate = true;
          let i4 = f2.distanceToTriangle(p2, m2, g2);
          if (i4 < v2 && (h2.copy(m2), _2 && _2.copy(g2), v2 = i4, y2 = n3, b2 = t3), i4 < a2) return true;
        }
      }
    }
  } }), yi.releasePrimitive(f2), yi.releasePrimitive(p2), v2 === 1 / 0 ? null : (r2.point ? r2.point.copy(h2) : r2.point = h2.clone(), r2.distance = v2, r2.faceIndex = y2, i2 && (i2.point ? i2.point.copy(_2) : i2.point = _2.clone(), i2.point.applyMatrix4(Da), h2.applyMatrix4(Da), i2.distance = h2.sub(i2.point).length(), i2.faceIndex = b2), r2);
}
function Fa(e3, t2, n2) {
  return e3 === null ? null : (e3.point.applyMatrix4(t2.matrixWorld), e3.distance = e3.point.distanceTo(n2.ray.origin), e3.object = t2, e3);
}
var Ia = new K(), La = new l(), Ra = new M(), za = new k(), Ba = new M(), Va = [`getX`, `getY`, `getZ`], Ha = class e2 extends li {
  static serialize(e3, t2 = {}) {
    t2 = { cloneBuffers: true, ...t2 };
    let n2 = e3.geometry, r2 = e3._roots, i2 = e3._indirectBuffer, a2 = n2.getIndex(), o2 = { version: 1, roots: null, index: null, indirectBuffer: null };
    return t2.cloneBuffers ? (o2.roots = r2.map((e4) => e4.slice()), o2.index = a2 ? a2.array.slice() : null, o2.indirectBuffer = i2 ? i2.slice() : null) : (o2.roots = r2, o2.index = a2 ? a2.array : null, o2.indirectBuffer = i2), o2;
  }
  static deserialize(t2, n2, i2 = {}) {
    i2 = { setIndex: true, indirect: !!t2.indirectBuffer, ...i2 };
    let { index: a2, roots: o2, indirectBuffer: s2 } = t2;
    t2.version || (console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`), l2(o2));
    let c2 = new e2(n2, { ...i2, [or]: true });
    if (c2._roots = o2, c2._indirectBuffer = s2 || null, i2.setIndex) {
      let e3 = n2.getIndex();
      if (e3 === null) {
        let e4 = new r(t2.index, 1, false);
        n2.setIndex(e4);
      } else e3.array !== a2 && (e3.array.set(a2), e3.needsUpdate = true);
    }
    return c2;
    function l2(e3) {
      for (let t3 = 0; t3 < e3.length; t3++) {
        let n3 = e3[t3], r2 = new Uint32Array(n3), i3 = new Uint16Array(n3);
        for (let e4 = 0, t4 = n3.byteLength / 32; e4 < t4; e4++) {
          let t5 = 8 * e4;
          z(2 * t5, i3) || (r2[t5 + 6] = r2[t5 + 6] / 8 - e4);
        }
      }
    }
  }
  get primitiveStride() {
    return 3;
  }
  get resolveTriangleIndex() {
    return this.resolvePrimitiveIndex;
  }
  constructor(e3, t2 = {}) {
    t2.maxLeafTris && (console.warn(`MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.`), t2 = { ...t2, targetLeafSize: t2.maxLeafTris }), super(e3, t2);
  }
  shiftTriangleOffsets(e3) {
    return super.shiftPrimitiveOffsets(e3);
  }
  writePrimitiveBounds(e3, t2, n2) {
    let r2 = this.geometry, i2 = this._indirectBuffer, a2 = r2.attributes.position, o2 = r2.index ? r2.index.array : null, s2 = (i2 ? i2[e3] : e3) * 3, c2 = s2 + 0, l2 = s2 + 1, u2 = s2 + 2;
    o2 && (c2 = o2[c2], l2 = o2[l2], u2 = o2[u2]);
    for (let e4 = 0; e4 < 3; e4++) {
      let r3 = a2[Va[e4]](c2), i3 = a2[Va[e4]](l2), o3 = a2[Va[e4]](u2), s3 = r3;
      i3 < s3 && (s3 = i3), o3 < s3 && (s3 = o3);
      let d2 = r3;
      i3 > d2 && (d2 = i3), o3 > d2 && (d2 = o3), t2[n2 + e4] = s3, t2[n2 + e4 + 3] = d2;
    }
    return t2;
  }
  computePrimitiveBounds(e3, t2, n2) {
    let r2 = this.geometry, i2 = this._indirectBuffer, a2 = r2.attributes.position, o2 = r2.index ? r2.index.array : null, s2 = a2.normalized;
    if (e3 < 0 || t2 + e3 - n2.offset > n2.length / 6) throw Error(`MeshBVH: compute triangle bounds range is invalid.`);
    let c2 = a2.array, l2 = a2.offset || 0, u2 = 3;
    a2.isInterleavedBufferAttribute && (u2 = a2.data.stride);
    let d2 = [`getX`, `getY`, `getZ`], f2 = n2.offset;
    for (let r3 = e3, p2 = e3 + t2; r3 < p2; r3++) {
      let e4 = (i2 ? i2[r3] : r3) * 3, t3 = (r3 - f2) * 6, p3 = e4 + 0, m2 = e4 + 1, h2 = e4 + 2;
      o2 && (p3 = o2[p3], m2 = o2[m2], h2 = o2[h2]), s2 || (p3 = p3 * u2 + l2, m2 = m2 * u2 + l2, h2 = h2 * u2 + l2);
      for (let e5 = 0; e5 < 3; e5++) {
        let r4, i3, o3;
        s2 ? (r4 = a2[d2[e5]](p3), i3 = a2[d2[e5]](m2), o3 = a2[d2[e5]](h2)) : (r4 = c2[p3 + e5], i3 = c2[m2 + e5], o3 = c2[h2 + e5]);
        let l3 = r4;
        i3 < l3 && (l3 = i3), o3 < l3 && (l3 = o3);
        let u3 = r4;
        i3 > u3 && (u3 = i3), o3 > u3 && (u3 = o3);
        let f3 = (u3 - l3) / 2, g2 = e5 * 2;
        n2[t3 + g2 + 0] = l3 + f3, n2[t3 + g2 + 1] = f3 + (Math.abs(l3) + f3) * ar;
      }
    }
    return n2;
  }
  raycastObject3D(e3, t2, n2 = []) {
    let { material: r2 } = e3;
    if (r2 === void 0) return;
    za.copy(e3.matrixWorld).invert(), La.copy(t2.ray).applyMatrix4(za), Ba.setFromMatrixScale(e3.matrixWorld), Ra.copy(La.direction).multiply(Ba);
    let i2 = Ra.length(), a2 = t2.near / i2, o2 = t2.far / i2;
    if (t2.firstHitOnly === true) {
      let i3 = this.raycastFirst(La, r2, a2, o2);
      i3 = Fa(i3, e3, t2), i3 && n2.push(i3);
    } else {
      let i3 = this.raycast(La, r2, a2, o2);
      for (let r3 = 0, a3 = i3.length; r3 < a3; r3++) {
        let a4 = Fa(i3[r3], e3, t2);
        a4 && n2.push(a4);
      }
    }
    return n2;
  }
  refit(e3 = null) {
    return (this.indirect ? pa : Vi)(this, e3);
  }
  raycast(e3, t2 = 0, n2 = 0, r2 = 1 / 0) {
    let i2 = this._roots, a2 = [], o2 = this.indirect ? ma : Ki;
    for (let s2 = 0, c2 = i2.length; s2 < c2; s2++) o2(this, s2, t2, e3, a2, n2, r2);
    return a2;
  }
  raycastFirst(e3, t2 = 0, n2 = 0, r2 = 1 / 0) {
    let i2 = this._roots, a2 = null, o2 = this.indirect ? _a : Yi;
    for (let s2 = 0, c2 = i2.length; s2 < c2; s2++) {
      let i3 = o2(this, s2, t2, e3, n2, r2);
      i3 != null && (a2 == null || i3.distance < a2.distance) && (a2 = i3);
    }
    return a2;
  }
  intersectsGeometry(e3, t2) {
    let n2 = false, r2 = this._roots, i2 = this.indirect ? Ta : ra;
    for (let a2 = 0, o2 = r2.length; a2 < o2 && (n2 = i2(this, a2, e3, t2), !n2); a2++) ;
    return n2;
  }
  shapecast(e3) {
    let t2 = yi.getPrimitive(), n2 = super.shapecast({ ...e3, intersectsPrimitive: e3.intersectsTriangle, scratchPrimitive: t2, iterate: this.indirect ? Gi : Bi });
    return yi.releasePrimitive(t2), n2;
  }
  bvhcast(t2, n2, r2) {
    let { intersectsRanges: i2, intersectsTriangles: a2 } = r2, o2 = yi.getPrimitive(), s2 = this.geometry.index, c2 = this.geometry.attributes.position, l2 = this.indirect ? (e3) => {
      let t3 = this.resolveTriangleIndex(e3);
      q(o2, t3 * 3, s2, c2);
    } : (e3) => {
      q(o2, e3 * 3, s2, c2);
    }, u2 = yi.getPrimitive(), d2 = t2.geometry.index, f2 = t2.geometry.attributes.position, p2 = t2.indirect ? (e3) => {
      let n3 = t2.resolveTriangleIndex(e3);
      q(u2, n3 * 3, d2, f2);
    } : (e3) => {
      q(u2, e3 * 3, d2, f2);
    };
    if (a2) {
      if (!(t2 instanceof e2)) throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);
      let r3 = (e3, t3, r4, i3, s3, c3, d3, f3) => {
        for (let m2 = r4, h2 = r4 + i3; m2 < h2; m2++) {
          p2(m2), u2.a.applyMatrix4(n2), u2.b.applyMatrix4(n2), u2.c.applyMatrix4(n2), u2.needsUpdate = true;
          for (let n3 = e3, r5 = e3 + t3; n3 < r5; n3++) if (l2(n3), o2.needsUpdate = true, a2(o2, u2, n3, m2, s3, c3, d3, f3)) return true;
        }
        return false;
      };
      if (i2) {
        let e3 = i2;
        i2 = function(t3, n3, i3, a3, o3, s3, c3, l3) {
          return e3(t3, n3, i3, a3, o3, s3, c3, l3) ? true : r3(t3, n3, i3, a3, o3, s3, c3, l3);
        };
      } else i2 = r3;
    }
    return super.bvhcast(t2, n2, { intersectsRanges: i2 });
  }
  intersectsBox(e3, t2) {
    return Ia.set(e3.min, e3.max, t2), Ia.needsUpdate = true, this.shapecast({ intersectsBounds: (e4) => Ia.intersectsBox(e4), intersectsTriangle: (e4) => Ia.intersectsTriangle(e4) });
  }
  intersectsSphere(e3) {
    return this.shapecast({ intersectsBounds: (t2) => e3.intersectsBox(t2), intersectsTriangle: (t2) => t2.intersectsSphere(e3) });
  }
  closestPointToGeometry(e3, t2, n2 = {}, r2 = {}, i2 = 0, a2 = 1 / 0) {
    return (this.indirect ? Pa : fa)(this, e3, t2, n2, r2, i2, a2);
  }
  closestPointToPoint(e3, t2 = {}, n2 = 0, r2 = 1 / 0) {
    return Si(this, e3, t2, n2, r2);
  }
};
function Ua(e3, t2 = false) {
  let n2 = e3[0].index !== null, r2 = new Set(Object.keys(e3[0].attributes)), i2 = new Set(Object.keys(e3[0].morphAttributes)), a2 = {}, o2 = {}, s2 = e3[0].morphTargetsRelative, c2 = new te(), l2 = 0;
  for (let u2 = 0; u2 < e3.length; ++u2) {
    let d2 = e3[u2], f2 = 0;
    if (n2 !== (d2.index !== null)) return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` + u2 + `. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`), null;
    for (let e4 in d2.attributes) {
      if (!r2.has(e4)) return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` + u2 + `. All geometries must have compatible attributes; make sure "` + e4 + `" attribute exists among all geometries, or in none of them.`), null;
      a2[e4] === void 0 && (a2[e4] = []), a2[e4].push(d2.attributes[e4]), f2++;
    }
    if (f2 !== r2.size) return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` + u2 + `. Make sure all geometries have the same number of attributes.`), null;
    if (s2 !== d2.morphTargetsRelative) return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` + u2 + `. .morphTargetsRelative must be consistent throughout all geometries.`), null;
    for (let e4 in d2.morphAttributes) {
      if (!i2.has(e4)) return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` + u2 + `.  .morphAttributes must be consistent throughout all geometries.`), null;
      o2[e4] === void 0 && (o2[e4] = []), o2[e4].push(d2.morphAttributes[e4]);
    }
    if (t2) {
      let e4;
      if (n2) e4 = d2.index.count;
      else if (d2.attributes.position !== void 0) e4 = d2.attributes.position.count;
      else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` + u2 + `. The geometry must have either an index or a position attribute`), null;
      c2.addGroup(l2, e4, u2), l2 += e4;
    }
  }
  if (n2) {
    let t3 = 0, n3 = [];
    for (let r3 = 0; r3 < e3.length; ++r3) {
      let i3 = e3[r3].index;
      for (let e4 = 0; e4 < i3.count; ++e4) n3.push(i3.getX(e4) + t3);
      t3 += e3[r3].attributes.position.count;
    }
    c2.setIndex(n3);
  }
  for (let e4 in a2) {
    let t3 = Wa(a2[e4]);
    if (!t3) return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ` + e4 + ` attribute.`), null;
    c2.setAttribute(e4, t3);
  }
  for (let e4 in o2) {
    let t3 = o2[e4][0].length;
    if (t3 !== 0) {
      c2.morphAttributes = c2.morphAttributes || {}, c2.morphAttributes[e4] = [];
      for (let n3 = 0; n3 < t3; ++n3) {
        let t4 = [];
        for (let r4 = 0; r4 < o2[e4].length; ++r4) t4.push(o2[e4][r4][n3]);
        let r3 = Wa(t4);
        if (!r3) return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ` + e4 + ` morphAttribute.`), null;
        c2.morphAttributes[e4].push(r3);
      }
    }
  }
  return c2;
}
function Wa(e3) {
  let t2, n2, i2, a2 = -1, o2 = 0;
  for (let r2 = 0; r2 < e3.length; ++r2) {
    let s3 = e3[r2];
    if (t2 === void 0 && (t2 = s3.array.constructor), t2 !== s3.array.constructor) return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`), null;
    if (n2 === void 0 && (n2 = s3.itemSize), n2 !== s3.itemSize) return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`), null;
    if (i2 === void 0 && (i2 = s3.normalized), i2 !== s3.normalized) return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`), null;
    if (a2 === -1 && (a2 = s3.gpuType), a2 !== s3.gpuType) return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`), null;
    o2 += s3.count * n2;
  }
  let s2 = new t2(o2), c2 = new r(s2, n2, i2), l2 = 0;
  for (let t3 = 0; t3 < e3.length; ++t3) {
    let r2 = e3[t3];
    if (r2.isInterleavedBufferAttribute) {
      let e4 = l2 / n2;
      for (let t4 = 0, i3 = r2.count; t4 < i3; t4++) for (let i4 = 0; i4 < n2; i4++) {
        let n3 = r2.getComponent(t4, i4);
        c2.setComponent(t4 + e4, i4, n3);
      }
    } else s2.set(r2.array, l2);
    l2 += r2.count * n2;
  }
  return a2 !== void 0 && (c2.gpuType = a2), c2;
}
function Ga(e3, t2 = 1e-4) {
  t2 = Math.max(t2, 2 ** -52);
  let n2 = {}, r2 = e3.getIndex(), i2 = e3.getAttribute(`position`), a2 = r2 ? r2.count : i2.count, o2 = 0, s2 = Object.keys(e3.attributes), c2 = {}, l2 = {}, u2 = [], d2 = [`getX`, `getY`, `getZ`, `getW`], f2 = [`setX`, `setY`, `setZ`, `setW`];
  for (let t3 = 0, n3 = s2.length; t3 < n3; t3++) {
    let n4 = s2[t3], r3 = e3.attributes[n4];
    c2[n4] = new r3.constructor(new r3.array.constructor(r3.count * r3.itemSize), r3.itemSize, r3.normalized);
    let i3 = e3.morphAttributes[n4];
    i3 && (l2[n4] || (l2[n4] = []), i3.forEach((e4, t4) => {
      let r4 = new e4.array.constructor(e4.count * e4.itemSize);
      l2[n4][t4] = new e4.constructor(r4, e4.itemSize, e4.normalized);
    }));
  }
  let p2 = t2 * 0.5, m2 = 10 ** Math.log10(1 / t2), h2 = p2 * m2;
  for (let t3 = 0; t3 < a2; t3++) {
    let i3 = r2 ? r2.getX(t3) : t3, a3 = ``;
    for (let t4 = 0, n3 = s2.length; t4 < n3; t4++) {
      let n4 = s2[t4], r3 = e3.getAttribute(n4), o3 = r3.itemSize;
      for (let e4 = 0; e4 < o3; e4++) a3 += `${Math.trunc(r3[d2[e4]](i3) * m2 + h2)},`;
    }
    if (a3 in n2) u2.push(n2[a3]);
    else {
      for (let t4 = 0, n3 = s2.length; t4 < n3; t4++) {
        let n4 = s2[t4], r3 = e3.getAttribute(n4), a4 = e3.morphAttributes[n4], u3 = r3.itemSize, p3 = c2[n4], m3 = l2[n4];
        for (let e4 = 0; e4 < u3; e4++) {
          let t5 = d2[e4], n5 = f2[e4];
          if (p3[n5](o2, r3[t5](i3)), a4) for (let e5 = 0, r4 = a4.length; e5 < r4; e5++) m3[e5][n5](o2, a4[e5][t5](i3));
        }
      }
      n2[a3] = o2, u2.push(o2), o2++;
    }
  }
  let g2 = e3.clone();
  for (let t3 in e3.attributes) {
    let e4 = c2[t3];
    if (g2.setAttribute(t3, new e4.constructor(e4.array.slice(0, o2 * e4.itemSize), e4.itemSize, e4.normalized)), t3 in l2) for (let e5 = 0; e5 < l2[t3].length; e5++) {
      let n3 = l2[t3][e5];
      g2.morphAttributes[t3][e5] = new n3.constructor(n3.array.slice(0, o2 * n3.itemSize), n3.itemSize, n3.normalized);
    }
  }
  return g2.setIndex(u2), g2;
}
var Ka = new k(), qa = class {
  constructor(e3) {
    this.scene = e3, this.parts = [], this.bvh = null, this.mesh = null, this.count = 0;
  }
  _push(e3, t2, n2) {
    let r2 = e3.index ? e3.toNonIndexed() : e3.clone();
    for (let e4 of Object.keys(r2.attributes)) e4 !== `position` && r2.deleteAttribute(e4);
    return t2 && r2.applyMatrix4(t2), r2.userData.kind = n2, this.parts.push(r2), this.count++, r2;
  }
  addMesh(e3, t2 = `solid`) {
    return e3.updateWorldMatrix(true, false), this._push(e3.geometry, e3.matrixWorld, t2);
  }
  addGeometry(e3, t2 = null, n2 = `solid`) {
    return this._push(e3, t2, n2);
  }
  addBox(e3, t2, n2 = 0, r2 = `solid`) {
    let i2 = new p(t2[0], t2[1], t2[2]);
    return Ka.makeRotationY(n2).setPosition(e3[0], e3[1], e3[2]), this._push(i2, Ka, r2);
  }
  addCylinder(e3, t2, n2, r2 = 12, i2 = `solid`) {
    let a2 = new E(t2, t2, n2, r2, 1, false);
    return Ka.makeTranslation(e3[0], e3[1] + n2 / 2, e3[2]), this._push(a2, Ka, i2);
  }
  addRamp(e3, t2, n2, r2 = 0.12, i2 = `walk`) {
    let a2 = new M(...e3), o2 = new M(...t2), s2 = new M().subVectors(o2, a2), c2 = s2.length(), l2 = new p(n2, r2, c2);
    l2.translate(0, -r2 / 2, c2 / 2);
    let u2 = new k().lookAt(new M(), s2.clone().negate(), new M(0, 1, 0));
    return u2.setPosition(a2), this._push(l2, u2, i2);
  }
  finalize() {
    if (!this.parts.length) return null;
    let e3 = Ua(this.parts, false);
    this.bvh = new Ha(e3, { targetLeafSize: 8 }), e3.boundsTree = this.bvh;
    let t2 = new oe({ color: 16711935, wireframe: true, transparent: true, opacity: 0.35 });
    t2.userData.noPatch = true, this.mesh = new w(e3, t2), this.mesh.name = `collision`, this.mesh.layers.set(et.COLLIDER), this.mesh.matrixAutoUpdate = false, this.scene.add(this.mesh);
    for (let e4 of this.parts) e4.dispose();
    return this.parts = [], this.bvh;
  }
}, Ja = class {
  constructor(e3, t2, n2) {
    this.scene = e3, this.camera = t2, this.list = [], this.lights = [];
    let r2 = n2.lanternLights;
    for (let t3 = 0; t3 < r2; t3++) {
      let t4 = new f(16756848, 0, 9, 2);
      t4.castShadow = false, t4.layers.enableAll(), t4.userData.target = null, t4.userData.level = 0, e3.add(t4), this.lights.push(t4);
    }
    this._tmp = new M(), this._prevCam = new M(1e9, 0, 0), this._snap = true;
  }
  register(e3) {
    let t2 = { position: new M(...e3.position), color: new v(e3.color ?? 16756848), intensity: e3.intensity ?? 6, distance: e3.distance ?? 9, flicker: e3.flicker ?? 0.08, phase: this.list.length * 1.618 % 6.283, id: this.list.length };
    return this.list.push(t2), t2;
  }
  flickerAt(e3, t2) {
    return 1 + (Math.sin(t2 * 7.3 + e3.phase) * 0.5 + Math.sin(t2 * 13.1 + e3.phase * 2.1) * 0.3 + Math.sin(t2 * 2.3 + e3.phase) * 0.2) * e3.flicker;
  }
  update(e3, t2) {
    let n2 = this.list.length, r2 = this.lights.length;
    if (!r2 || !n2) return;
    let i2 = this.camera.getWorldPosition(this._tmp), a2 = this._snap || i2.distanceToSquared(this._prevCam) > 25;
    this._prevCam.copy(i2), this._snap = false, (!this._best || this._best.length !== r2) && (this._best = Array(r2).fill(null), this._bestD = new Float64Array(r2));
    let o2 = this._best, s2 = this._bestD, c2 = 0;
    for (let e4 = 0; e4 < n2; e4++) {
      let t3 = this.list[e4], n3 = t3.position.distanceToSquared(i2);
      if (c2 < r2) {
        let e5 = c2++;
        for (; e5 > 0 && s2[e5 - 1] > n3; ) s2[e5] = s2[e5 - 1], o2[e5] = o2[e5 - 1], e5--;
        s2[e5] = n3, o2[e5] = t3;
      } else if (n3 < s2[r2 - 1]) {
        let e5 = r2 - 1;
        for (; e5 > 0 && s2[e5 - 1] > n3; ) s2[e5] = s2[e5 - 1], o2[e5] = o2[e5 - 1], e5--;
        s2[e5] = n3, o2[e5] = t3;
      }
    }
    for (let e4 = 0; e4 < n2; e4++) this.list[e4]._want = false;
    for (let e4 = 0; e4 < c2; e4++) o2[e4]._want = true;
    let l2 = this.lights;
    for (let t3 = 0; t3 < r2; t3++) {
      let n3 = l2[t3], r3 = n3.userData.target, i3 = r3 && r3._want;
      n3.userData.level = a2 ? +!!i3 : ce.damp(n3.userData.level, +!!i3, 6, e3), r3 && !i3 && n3.userData.level < 0.02 && (n3.userData.target = null, n3.userData.level = 0), i3 && (r3._want = false);
    }
    let u2 = 0;
    for (let e4 = 0; e4 < r2; e4++) {
      let t3 = l2[e4];
      if (t3.userData.target) continue;
      for (; u2 < c2 && !o2[u2]._want; ) u2++;
      if (u2 >= c2) break;
      let n3 = o2[u2++];
      n3._want = false, t3.userData.target = n3, t3.userData.level = +!!a2;
    }
    for (let e4 = 0; e4 < r2; e4++) {
      let n3 = l2[e4], r3 = n3.userData.target;
      if (!r3) {
        n3.intensity = 0;
        continue;
      }
      n3.position.copy(r3.position), n3.color.copy(r3.color), n3.distance = r3.distance, n3.intensity = r3.intensity * n3.userData.level * this.flickerAt(r3, t2);
    }
  }
}, Ya = Math.PI / 180;
function Xa(e3, t2, n2) {
  e3.rotation.order = `YXZ`, e3.rotation.set(n2 * Ya, -t2 * Ya, 0);
}
var Za = new re();
function Qa(e3, t2 = { yaw: 0, pitch: 0 }) {
  let n2 = Za.setFromQuaternion(e3.quaternion, `YXZ`);
  return t2.yaw = -n2.y / Ya, t2.pitch = n2.x / Ya, t2;
}
function $a(e3) {
  if (Array.isArray(e3)) {
    let [t2, n2, r2, i2 = 0, a2 = 0] = e3;
    return { pos: [t2, n2, r2], yaw: i2, pitch: a2 };
  }
  return Ce[e3] ?? null;
}
function eo(e3, t2, n2 = null) {
  let r2 = $a(t2);
  if (!r2) return false;
  let [i2, a2, o2] = r2.pos;
  r2.eye && (a2 = Math.max(a2, vn(i2, o2)) + he.eyeHeight), e3.position.set(i2, a2, o2), Xa(e3, r2.yaw ?? 0, r2.pitch ?? 0);
  let s2 = n2 ?? r2.fov;
  return s2 && (e3.fov = s2, e3.updateProjectionMatrix()), e3.updateMatrixWorld(true), true;
}
var to = `
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
`;
function no(e3) {
  let t2 = e3.info?.programs;
  if (!t2) return 0;
  let n2 = 0;
  for (let e4 of t2) (!e4.isReady || e4.isReady()) && (e4.getUniforms(), n2++);
  return n2;
}
var ro = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`, io = class {
  constructor(e3) {
    this.renderer = e3, this.camera = new a(-1, 1, 1, -1, 0, 1), this.quad = new w(new ne(2, 2)), this.quad.frustumCulled = false, this.targets = [], this.maxAniso = e3.capabilities.getMaxAnisotropy();
  }
  bake(e3, t2 = {}) {
    let r2 = t2.size ?? 1024, i2 = !!t2.srgb, a2 = t2.mipmaps !== false, o2 = new D(t2.width ?? r2, t2.height ?? r2, { type: t2.type ?? 1009, format: n, colorSpace: i2 ? h : ``, depthBuffer: false, stencilBuffer: false, generateMipmaps: a2, minFilter: a2 ? c : g, magFilter: g, wrapS: t2.wrap ?? 1e3, wrapT: t2.wrap ?? 1e3, anisotropy: Math.min(t2.anisotropy ?? 8, this.maxAniso) }), s2 = new se({ uniforms: t2.uniforms ?? {}, vertexShader: ro, fragmentShader: `precision highp float;
varying vec2 vUv;
${to}
${e3}
void main(){ gl_FragColor = bake(vUv); }`, depthTest: false, depthWrite: false });
    this.quad.material = s2;
    let l2 = this.renderer, u2 = l2.getRenderTarget();
    return l2.setRenderTarget(o2), l2.render(this.quad, this.camera), l2.setRenderTarget(u2), s2.dispose(), this.targets.push(o2), o2.texture.name = t2.name ?? `baked`, o2.texture;
  }
}, ao = `
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
`, oo = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`, so = 2048, co = `
vec2 s_ssOff(int k) {
  if (k == 0) return vec2(-0.125, -0.375);
  if (k == 1) return vec2(0.375, -0.125);
  if (k == 2) return vec2(0.125, 0.375);
  return vec2(-0.375, 0.125);
}
`, lo = { fbm: 1, gn: 1, vfbm: 2, vn: 2, ridged: 3 }, uo = `
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
`;
function fo(e3) {
  let t2 = [], n2 = null, r2 = 0, i2 = [];
  for (let [a2, o2] of Object.entries(e3.layers ?? {})) {
    let e4 = o2[0], s2 = [r2 * 0.61803 % 1 * 0.73 + 0.11, r2 * 0.41421 % 1 * 0.67 + 0.23];
    if (r2++, e4 === `vor`) {
      t2.push({ mode: 1, spec: o2, seed: s2 }), i2.push(`#define V_${a2}(p) textureLod(tL${t2.length - 1}, (p), 0.0)`);
      continue;
    }
    if (!(e4 in lo)) throw Error(`surface layer '${a2}': unknown kind '${e4}'`);
    (!n2 || n2.items.length === 4) && (n2 = { mode: 0, items: [] }, t2.push(n2));
    let c2 = `xyzw`[n2.items.length];
    n2.items.push({ name: a2, spec: o2, seed: s2 }), i2.push(`#define L_${a2}(p) textureLod(tL${t2.indexOf(n2)}, (p), 0.0).${c2}`);
  }
  return { groups: t2, glsl: t2.map((e4, t3) => `uniform sampler2D tL${t3};`).join(`
`) + `
` + i2.join(`
`) };
}
function po(e3, t2) {
  let n2 = e3.ss ?? 1, r2 = e3.detail?.glsl ?? `float detail(vec2 uv) { return 0.5; }`;
  return `
precision highp float;
#define SS ${n2}
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
${t2}
${e3.glsl}
${r2}
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
`;
}
function mo(e3, t2 = [0.4, 0.33, 0.25], n2 = 0.85) {
  return { worldSize: e3.worldSize, depth: e3.depth ?? 0.01, ss: 1, layers: { n: [`fbm`, [8, 8], 4] }, glsl: `
void surface(inout S s) {
  float n = L_n(s.uv);
  s.h = 0.5 + 0.3 * n;
  s.albedo = vec3(${t2.map((e4) => e4.toFixed(3)).join(`,`)}) * (0.9 + 0.2 * n);
  s.rough = ${n2.toFixed(3)};
  s.metal = 0.0;
}` };
}
var ho = class {
  constructor(e3) {
    this.renderer = e3, this.camera = new a(-1, 1, 1, -1, 0, 1), this.geo = new ne(2, 2), this.quad = new w(this.geo), this.quad.frustumCulled = false, this.maxAniso = e3.capabilities.getMaxAnisotropy(), this.dataRT = null, this.pool = [], this.poolSize = 0, this.targets = [], this.bytes = 0, this.layerMat = new se({ name: `bake.layers`, glslVersion: s, vertexShader: oo, fragmentShader: uo, uniforms: { uMode: { value: 0 }, uKind: { value: new O() }, uPerX: { value: new O() }, uPerY: { value: new O() }, uOct: { value: new O() }, uGain: { value: new O() }, uOffX: { value: new O() }, uOffY: { value: new O() }, uVPer: { value: new j() }, uVMetric: { value: new j() }, uVOff: { value: new j() }, uVJit: { value: 0 } }, depthTest: false, depthWrite: false });
  }
  _layerTarget(e3, t2) {
    t2 = Math.min(t2, so);
    let r2 = this.pool[e3];
    return r2 && r2.width === t2 ? r2 : (r2?.dispose(), r2 = new D(t2, t2, { type: S, format: n, depthBuffer: false, stencilBuffer: false, generateMipmaps: false, minFilter: g, magFilter: g, wrapS: b, wrapT: b }), r2.texture.name = `surface.layer` + e3, this.pool[e3] = r2, r2);
  }
  _dataTarget(e3) {
    if (this.dataRT && this.dataRT.width === e3) return this.dataRT;
    this.dataRT?.dispose();
    let t2 = new D(e3, e3, { count: 4, type: u, format: n, depthBuffer: false, stencilBuffer: false, generateMipmaps: false, minFilter: g, magFilter: g, wrapS: b, wrapT: b }), r2 = t2.textures[0];
    r2.type = S, r2.generateMipmaps = true, r2.minFilter = c, r2.name = `surface.scratch`;
    for (let e4 = 1; e4 < 4; e4++) t2.textures[e4].format = de;
    return this.dataRT = t2, t2;
  }
  prepare(e3, t2, n2) {
    let r2 = fo(t2), i2 = { uPass: { value: 0 }, tData: { value: null }, uTexel: { value: new j(1 / n2, 1 / n2) }, uDepth: { value: t2.depth ?? 0.02 }, uWorld: { value: t2.worldSize }, uAO: { value: t2.aoStrength ?? 1 }, uDRep: { value: 8 }, uDDepth: { value: t2.detail ? t2.detail.depth ?? 1e-3 : 0 }, uDSlope: { value: 1 } };
    return r2.groups.forEach((e4, t3) => {
      i2[`tL` + t3] = { value: null };
    }), { name: e3, def: t2, size: n2, mat: new se({ name: `bake.${e3}`, glslVersion: s, vertexShader: oo, fragmentShader: po(t2, r2.glsl), uniforms: i2, depthTest: false, depthWrite: false }), plan: r2 };
  }
  async compileAll(e3) {
    let t2 = this.renderer, n2 = new ee();
    for (let t3 of [this.layerMat, ...e3.map((e4) => e4.mat)]) {
      let e4 = new w(this.geo, t3);
      e4.frustumCulled = false, n2.add(e4);
    }
    let r2 = this._dataTarget(e3[0]?.size ?? 1024), i2 = t2.getRenderTarget();
    t2.setRenderTarget(r2);
    try {
      t2.compileAsync ? await t2.compileAsync(n2, this.camera) : t2.compile(n2, this.camera);
    } finally {
      t2.setRenderTarget(i2);
    }
  }
  prime(e3) {
    let t2 = this.renderer.properties;
    for (let n2 of [this.layerMat, ...e3.map((e4) => e4.mat)]) t2.get(n2).currentProgram?.getUniforms();
  }
  runnable(e3) {
    let t2 = this.renderer.properties;
    for (let n2 of [this.layerMat, e3.mat]) {
      let e4 = t2.get(n2).currentProgram;
      if (e4 && e4.diagnostics && e4.diagnostics.runnable === false) return false;
    }
    return true;
  }
  _render(e3, t2) {
    let n2 = this.renderer;
    this.quad.material = e3, n2.setRenderTarget(t2), n2.render(this.quad, this.camera);
  }
  _renderLayers(e3) {
    let t2 = this.layerMat.uniforms;
    e3.plan.groups.forEach((n2, r2) => {
      let i2 = this._layerTarget(r2, e3.size);
      if (n2.mode === 1) {
        let [, e4, r3, i3] = n2.spec;
        t2.uMode.value = 1, t2.uVPer.value.set(e4[0], e4[1]), t2.uVMetric.value.set(i3 ? i3[0] : 1, i3 ? i3[1] : 1), t2.uVOff.value.set(n2.seed[0], n2.seed[1]), t2.uVJit.value = r3 ?? 0.8;
      } else {
        t2.uMode.value = 0;
        let e4 = [0, 0, 0, 0], r3 = [1, 1, 1, 1], i3 = [1, 1, 1, 1], a2 = [1, 1, 1, 1], o2 = [0.5, 0.5, 0.5, 0.5], s2 = [0, 0, 0, 0], c2 = [0, 0, 0, 0];
        n2.items.forEach((t3, n3) => {
          let [l2, u2, d2, f2] = t3.spec;
          e4[n3] = lo[l2], r3[n3] = u2[0], i3[n3] = u2[1], a2[n3] = l2 === `gn` || l2 === `vn` ? 1 : d2 ?? 4, o2[n3] = f2 ?? 0.5, s2[n3] = t3.seed[0], c2[n3] = t3.seed[1];
        }), t2.uKind.value.fromArray(e4), t2.uPerX.value.fromArray(r3), t2.uPerY.value.fromArray(i3), t2.uOct.value.fromArray(a2), t2.uGain.value.fromArray(o2), t2.uOffX.value.fromArray(s2), t2.uOffY.value.fromArray(c2);
      }
      this._render(this.layerMat, i2), e3.mat.uniforms[`tL` + r2].value = i2.texture;
    });
  }
  bake(e3, t2 = 8) {
    let r2 = this.renderer, { size: i2, def: a2, name: o2, mat: s2 } = e3, l2 = r2.getRenderTarget(), d2 = Math.min(t2, this.maxAniso);
    this._renderLayers(e3);
    let f2 = this._dataTarget(i2);
    s2.uniforms.uPass.value = 0, s2.uniforms.tData.value = null, this._render(s2, f2);
    let p2 = new D(i2, i2, { count: 4, type: u, format: n, depthBuffer: false, stencilBuffer: false, generateMipmaps: true, minFilter: c, magFilter: g, wrapS: b, wrapT: b, anisotropy: d2 }), [m2, _2, v2, y2] = p2.textures;
    m2.colorSpace = h, _2.colorSpace = ``, v2.colorSpace = ``, y2.colorSpace = ``, y2.format = de, y2.anisotropy = Math.min(4, d2), m2.name = o2 + `.map`, _2.name = o2 + `.normal`, v2.name = o2 + `.orm`, y2.name = o2 + `.height`, s2.uniforms.uPass.value = 1, s2.uniforms.tData.value = f2.textures[0], this._render(s2, p2), s2.uniforms.tData.value = null;
    for (let e4 in s2.uniforms) e4.startsWith(`tL`) && (s2.uniforms[e4].value = null);
    r2.setRenderTarget(l2), this.targets.push(p2);
    let x2 = i2 * i2 * (4 / 3);
    return this.bytes += x2 * 4 * 3 + x2, { map: m2, normalMap: _2, ormMap: v2, heightMap: y2, worldSize: a2.worldSize, depth: a2.depth ?? 0.02 };
  }
  disposeJob(e3) {
    e3.mat.dispose();
  }
  disposeScratch() {
    this.dataRT?.dispose(), this.dataRT = null;
    for (let e3 of this.pool) e3?.dispose();
    this.pool.length = 0, this.layerMat.dispose();
  }
}, go = { hero: true, worldSize: 2, depth: 0.1, aoStrength: 1.2, layers: { w1: [`fbm`, [2, 3], 3], w2: [`fbm`, [3, 2], 3], tw: [`fbm`, [1, 4], 2], f1: [`gn`, [18, 3]], f2: [`gn`, [36, 5]], f3: [`gn`, [72, 9]], wid: [`fbm`, [4, 6], 3], dp: [`vfbm`, [5, 3], 3], rj: [`fbm`, [6, 18], 3], rj2: [`fbm`, [30, 40], 2], bz: [`vfbm`, [6, 4], 3], cork: [`fbm`, [40, 20], 4], scl: [`ridged`, [60, 36], 3], fib: [`ridged`, [110, 12], 3], bump: [`fbm`, [20, 10], 3], grain: [`fbm`, [160, 80], 2], tone: [`vfbm`, [3, 2], 4], tone2: [`vfbm`, [12, 6], 3], lz: [`vfbm`, [5, 3], 5], ln: [`vfbm`, [70, 60], 3], mz: [`vfbm`, [3, 2], 4], mn: [`vfbm`, [60, 40], 3], dFib: [`ridged`, [64, 8], 2], dCork: [`vfbm`, [48, 40], 3], dW: [`fbm`, [12, 6], 2] }, detail: { depth: 18e-4, glsl: `
float detail(vec2 uv) {
  float fib = L_dFib(uv + vec2(0.01 * L_dW(uv), 0.0));
  float cork = L_dCork(uv);
  return 0.5 + 0.36 * (fib - 0.5) + 0.4 * (cork - 0.5);
}` }, glsl: `
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
}` }, _o = { worldSize: 1, depth: 0.05, aoStrength: 1.1, layers: { w1: [`fbm`, [3, 2], 3], w2: [`fbm`, [2, 3], 3], pf: [`ridged`, [90, 6], 3], mesh1: [`fbm`, [20, 20], 2], mesh2: [`fbm`, [60, 60], 3], fibv: [`fbm`, [120, 10], 2], low: [`fbm`, [12, 12], 3], tone: [`vfbm`, [4, 4], 3], split: [`vfbm`, [40, 8], 3], dust: [`vfbm`, [6, 6], 3], dFib: [`ridged`, [40, 6], 2], dGr: [`fbm`, [30, 30], 2] }, detail: { depth: 12e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.4 * (L_dFib(uv + 0.01 * L_dGr(uv)) - 0.5) + 0.12 * L_dGr(uv); }` }, glsl: `
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
}` }, vo = `
// latewood band profile for ring phase x (0..1): sharp dark band late in the ring
float latewood(float x, float sharp) {
  float a = s_ss(0.60, 0.60 + 0.28 * sharp, x);
  float b = 1.0 - s_ss(0.93, 1.0, x);
  return a * b;
}
`, yo = { hero: true, worldSize: 1.2, depth: 9e-3, ss: 4, aoStrength: 1, layers: { w1: [`fbm`, [1, 3], 3], w2: [`fbm`, [1, 3], 3], fig: [`fbm`, [2, 3], 3], wob: [`fbm`, [9, 24], 3], lwS: [`vn`, [3, 40]], cw: [`fbm`, [6, 1], 2], fibre: [`fbm`, [6, 360], 3], fibre2: [`fbm`, [20, 160], 2], cup: [`fbm`, [2, 6], 3], weather: [`vfbm`, [2, 5], 4], streak: [`vn`, [5, 70]], stain: [`vfbm`, [4, 3], 4], tone: [`vfbm`, [1, 6], 3], knot: [`vor`, [2, 5], 0.8, [0.6, 0.24]], nail: [`vor`, [3, 6], 0.7, [0.4, 0.2]], dFib: [`ridged`, [4, 60], 2], dSpl: [`fbm`, [12, 40], 2] }, detail: { depth: 8e-4, glsl: `
float detail(vec2 uv) {
  float fib = L_dFib(uv + vec2(0.0, 0.004 * L_dSpl(uv)));
  return 0.5 + 0.38 * (fib - 0.5) + 0.16 * L_dSpl(uv);
}` }, glsl: vo + `
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
}` }, bo = { worldSize: 1.6, depth: 0.022, ss: 4, aoStrength: 1, layers: { w1: [`fbm`, [2, 3], 3], w2: [`fbm`, [2, 3], 3], adze: [`vor`, [12, 22], 0.85, [1.6 / 12, 1.6 / 22]], fig: [`fbm`, [2, 3], 3], fibre: [`fbm`, [10, 220], 4], coarse: [`ridged`, [6, 90], 3], cn: [`gn`, [1, 16]], cm: [`vn`, [3, 16]], cup: [`fbm`, [2, 5], 3], weather: [`vfbm`, [2, 5], 4], streak: [`vn`, [6, 70]], stain: [`vfbm`, [3, 4], 4], tone: [`vfbm`, [1, 4], 3], dFib: [`ridged`, [5, 70], 2], dSpl: [`fbm`, [12, 36], 2] }, detail: { depth: 11e-4, glsl: `
float detail(vec2 uv) {
  float fib = L_dFib(uv + vec2(0.0, 0.005 * L_dSpl(uv)));
  return 0.5 + 0.36 * (fib - 0.5) + 0.18 * L_dSpl(uv);
}` }, glsl: vo + `
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
}` }, xo = { worldSize: 0.8, depth: 3e-3, ss: 4, aoStrength: 0.8, layers: { w1: [`fbm`, [1, 2], 3], fig: [`fbm`, [1, 3], 3], pore: [`vn`, [160, 768]], ray: [`vn`, [90, 12]], band: [`vn`, [2, 9]], fibre: [`fbm`, [8, 256], 3], low: [`fbm`, [2, 4], 3], wear: [`vfbm`, [3, 3], 3], tone: [`vfbm`, [3, 6], 3], streak: [`vn`, [6, 120]], dPore: [`vn`, [30, 240]], dFib: [`fbm`, [5, 120], 2] }, detail: { depth: 15e-5, glsl: `
float detail(vec2 uv) { return 0.55 - 0.4 * s_ss(0.72, 0.92, L_dPore(uv)) + 0.08 * L_dFib(uv); }` }, glsl: vo + `
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
}` }, So = { hero: true, worldSize: 1, depth: 0.07, ss: 4, aoStrength: 1.2, layers: { sway: [`fbm`, [3, 2], 3], edge: [`fbm`, [24, 1], 2], fray: [`vn`, [400, 30]], fine: [`fbm`, [300, 6], 2], tone: [`vfbm`, [2, 3], 4], grey: [`vfbm`, [3, 2], 3], bund: [`vn`, [30, 6]], wave: [`fbm`, [4, 3], 3], dRib: [`ridged`, [60, 4], 2], dStr: [`fbm`, [16, 6], 2] }, detail: { depth: 6e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.38 * (L_dRib(uv + vec2(0.004 * L_dStr(uv), 0.0)) - 0.5) + 0.14 * L_dStr(uv); }` }, glsl: `
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
}` }, Co = { worldSize: 0.1, depth: 7e-3, ss: 4, aoStrength: 1.1, layers: { fib: [`fbm`, [70, 5], 3], fib2: [`fbm`, [160, 12], 2], fuzz: [`vn`, [220, 44]], tone: [`vfbm`, [2, 3], 3], ytone: [`vn`, [3, 20]], yw: [`fbm`, [4, 12], 2], dFz: [`fbm`, [48, 48], 2] }, detail: { depth: 8e-5, glsl: `
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFz(uv); }` }, glsl: `
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
}` }, wo = { worldSize: 0.3, depth: 12e-4, ss: 4, aoStrength: 0.8, layers: { slubW: [`vn`, [160, 10]], slubF: [`vn`, [10, 160]], tw: [`vn`, [160, 3]], tf: [`vn`, [3, 160]], dirt: [`vfbm`, [2, 2], 4], crease: [`fbm`, [3, 5], 3], dFz: [`fbm`, [64, 64], 2] }, detail: { depth: 6e-5, glsl: `
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFz(uv); }` }, glsl: `
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
}` }, To = { worldSize: 0.4, depth: 8e-3, ss: 4, aoStrength: 1.1, layers: { streak: [`fbm`, [8, 160], 3], node: [`vn`, [40, 12]], tone: [`vfbm`, [2, 2], 3], dust: [`vfbm`, [3, 3], 3], dFib: [`fbm`, [16, 96], 2] }, detail: { depth: 1e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFib(uv); }` }, glsl: `
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
}` }, Eo = { worldSize: 0.8, depth: 15e-4, ss: 4, aoStrength: 0.8, layers: { fade: [`vfbm`, [2, 2], 4], fuzz: [`fbm`, [200, 200], 2], dirt: [`vfbm`, [3, 3], 3], wob: [`fbm`, [4, 4], 2], dFz: [`fbm`, [80, 80], 2] }, detail: { depth: 1e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.4 * L_dFz(uv); }` }, glsl: `
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
}` }, Do = `
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
`, Oo = { hero: true, worldSize: 4, depth: 0.02, aoStrength: 0.9, layers: { w1: [`fbm`, [3, 3], 4], w2: [`fbm`, [3, 3], 4], pw: [`fbm`, [2, 5], 3], pw2: [`fbm`, [3, 4], 3], amp: [`vfbm`, [2, 2], 3], mixR: [`vfbm`, [3, 3], 3], lump: [`fbm`, [6, 6], 4], lump2: [`fbm`, [20, 20], 3], grainN: [`fbm`, [256, 256], 2], tone: [`vfbm`, [3, 3], 4], tone2: [`vfbm`, [14, 14], 3], pz: [`vfbm`, [4, 4], 3], peb: [`vor`, [48, 48], 0.9], dG1: [`fbm`, [150, 150], 2], dG2: [`vn`, [300, 300]] }, detail: { depth: 8e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.25 * L_dG1(uv) + 0.25 * (L_dG2(uv) - 0.5); }` }, glsl: Do + `
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
}` }, ko = { worldSize: 4, depth: 8e-3, aoStrength: 0.8, layers: { w1: [`fbm`, [3, 3], 4], w2: [`fbm`, [3, 3], 4], pw: [`fbm`, [2, 5], 3], amp: [`vfbm`, [2, 2], 3], lump: [`fbm`, [6, 6], 4], sw: [`fbm`, [2, 6], 3], swm: [`vfbm`, [3, 2], 3], pud: [`vfbm`, [3, 3], 4], tone: [`vfbm`, [3, 3], 4], tone2: [`vfbm`, [14, 14], 3], grainN: [`fbm`, [256, 256], 2], hole: [`vor`, [90, 90], 0.9], peb: [`vor`, [40, 40], 0.9], hz: [`vfbm`, [4, 4], 3], dG1: [`fbm`, [150, 150], 2], dG2: [`vn`, [300, 300]] }, detail: { depth: 4e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.2 * L_dG1(uv) + 0.2 * (L_dG2(uv) - 0.5); }` }, glsl: Do + `
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
}` }, Ao = `
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
`, jo = { bark: go, barkPalm: _o, woodPlank: yo, woodBeam: bo, woodDark: xo, thatch: So, rope: Co, linen: wo, wicker: To, sand: Oo, sandWet: ko, rock: { hero: true, worldSize: 3, depth: 0.1, aoStrength: 1.15, layers: { w1: [`fbm`, [3, 3], 4], w2: [`fbm`, [3, 3], 4], jag: [`fbm`, [60, 60], 2], lump: [`fbm`, [3, 3], 5], mid: [`fbm`, [9, 9], 4], fine: [`fbm`, [30, 30], 4], grain: [`fbm`, [160, 160], 2], knobs: [`ridged`, [12, 12], 3], frac: [`vor`, [4, 4], 0.9], frac2: [`vor`, [11, 11], 0.9], fracO: [`vfbm`, [6, 6], 3], pocket: [`vfbm`, [5, 5], 4], honey: [`vor`, [26, 26], 0.9], band: [`fbm`, [1, 2], 3], bandD: [`fbm`, [6, 6], 3], bz: [`vfbm`, [2, 2], 3], tone: [`vfbm`, [3, 3], 4], rust: [`vfbm`, [4, 4], 4], tone2: [`vfbm`, [18, 18], 3], mott: [`vfbm`, [48, 48], 3], streak: [`fbm`, [14, 1], 4], streak2: [`fbm`, [31, 2], 3], vz: [`vfbm`, [3, 2], 3], lz: [`vfbm`, [5, 5], 3], ld: [`fbm`, [128, 128], 2], lich: [`vor`, [30, 30], 0.95], dG: [`fbm`, [120, 120], 2], dP: [`vfbm`, [40, 40], 3] }, detail: { depth: 15e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.22 * L_dG(uv) + 0.3 * (L_dP(uv) - 0.5) - 0.18 * s_ss(0.7, 0.85, L_dP(uv + 0.37)); }` }, glsl: `
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
}` }, cliff: { worldSize: 8, depth: 0.45, aoStrength: 1, layers: { w1: [`fbm`, [2, 3], 4], w2: [`fbm`, [3, 2], 4], bw: [`fbm`, [2, 1], 3], er: [`fbm`, [12, 3], 4], rough: [`fbm`, [10, 10], 5], crag: [`ridged`, [18, 14], 3], fine: [`fbm`, [64, 64], 3], jn: [`gn`, [7, 1]], lamF: [`fbm`, [6, 3], 3], lamB: [`vn`, [24, 60]], tone: [`vfbm`, [5, 2], 3], tone2: [`vfbm`, [16, 6], 3], mott: [`vfbm`, [40, 30], 3], curtain: [`fbm`, [22, 1], 4], curtain2: [`fbm`, [47, 2], 3], cz: [`vfbm`, [4, 1], 3], runoff: [`fbm`, [17, 1], 3], rz: [`vfbm`, [3, 1], 2], spall: [`vor`, [7, 11], 0.9], dG: [`fbm`, [120, 120], 3], dL: [`ridged`, [20, 60], 2] }, detail: { depth: 3e-3, glsl: `
float detail(vec2 uv) { return 0.5 + 0.25 * L_dG(uv) + 0.2 * (L_dL(uv + 0.004 * L_dG(uv)) - 0.5); }` }, glsl: `
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
}` }, soil: { worldSize: 2, depth: 0.03, aoStrength: 1.1, layers: { w1: [`fbm`, [3, 3], 4], w2: [`fbm`, [3, 3], 4], clump: [`fbm`, [10, 10], 5], crumb: [`ridged`, [34, 34], 3], fine: [`fbm`, [64, 64], 3], tone: [`vfbm`, [3, 3], 4], damp: [`vfbm`, [2, 2], 4], org: [`vfbm`, [48, 48], 3], mott: [`vfbm`, [20, 20], 3], crk: [`vor`, [12, 12], 0.85], clod: [`vor`, [40, 40], 0.9], peb: [`vor`, [26, 26], 0.9], pz: [`vfbm`, [4, 4], 3], dCr: [`vfbm`, [50, 50], 3], dGr: [`fbm`, [100, 100], 2] }, detail: { depth: 24e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.4 * (L_dCr(uv) - 0.5) + 0.12 * L_dGr(uv); }` }, glsl: Ao + `
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
}` }, stone: { worldSize: 2, depth: 0.02, aoStrength: 1, layers: { w1: [`fbm`, [3, 3], 4], w2: [`fbm`, [3, 3], 4], jag: [`fbm`, [50, 50], 2], broad: [`fbm`, [2, 2], 4], mid: [`fbm`, [8, 8], 4], fine: [`fbm`, [128, 128], 3], gr: [`fbm`, [40, 40], 3], lamF: [`fbm`, [2, 1], 3], lz: [`vfbm`, [3, 3], 3], frac: [`vor`, [3, 3], 0.9], fracO: [`vfbm`, [5, 5], 3], tone: [`vfbm`, [3, 3], 4], tone2: [`vfbm`, [12, 12], 3], mott: [`vfbm`, [40, 40], 3], iron: [`vfbm`, [5, 5], 4], pitN: [`vfbm`, [70, 70], 2], pitZ: [`vfbm`, [4, 4], 3], lich: [`vfbm`, [9, 9], 4], worn: [`vfbm`, [3, 3], 3], dG: [`fbm`, [80, 80], 3] }, detail: { depth: 6e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.35 * L_dG(uv); }` }, glsl: `
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
}` }, metal: { worldSize: 0.5, depth: 3e-3, aoStrength: 0.9, layers: { ham: [`vor`, [28, 28], 0.95], hamZ: [`vfbm`, [3, 3], 3], tarn: [`vfbm`, [4, 4], 4], verd: [`vfbm`, [5, 5], 4], verdD: [`fbm`, [40, 40], 3], fine: [`fbm`, [128, 128], 2], tone: [`vfbm`, [3, 3], 3], scr1: [`gn`, [3, 90]], scr2: [`gn`, [70, 4]], scm: [`vn`, [9, 9]], low: [`fbm`, [3, 3], 3], dS1: [`gn`, [3, 70]], dS2: [`gn`, [60, 4]], dSm: [`vn`, [6, 6]], dPit: [`vfbm`, [90, 90], 2] }, detail: { depth: 2e-5, glsl: `
float detail(vec2 uv) {
  float sc = max(1.0 - s_ss(0.0, 0.04, abs(L_dS1(uv))), (1.0 - s_ss(0.0, 0.04, abs(L_dS2(uv)))) * s_ss(0.4, 0.7, L_dSm(uv)));
  return 0.6 - 0.35 * sc - 0.2 * s_ss(0.7, 0.9, L_dPit(uv));
}` }, glsl: `
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
}` }, fabric: Eo, leafLitter: { worldSize: 2, depth: 0.012, aoStrength: 0.75, layers: { clump: [`fbm`, [10, 10], 4], tone: [`vfbm`, [3, 3], 4], hole: [`vfbm`, [60, 60], 3], vein: [`fbm`, [120, 120], 2], dens: [`vfbm`, [3, 3], 3], dry: [`vfbm`, [4, 4], 3], duff: [`vfbm`, [36, 36], 3], blot: [`vfbm`, [24, 24], 3], dV: [`ridged`, [40, 40], 2], dCr: [`fbm`, [20, 20], 3] }, detail: { depth: 12e-4, glsl: `
float detail(vec2 uv) { return 0.5 + 0.2 * (L_dV(uv) - 0.5) + 0.25 * L_dCr(uv); }` }, glsl: Ao + `
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
}` } }, Mo = typeof location < `u` && /[?&]noprime(&|=|$)/.test(location.search), No = (() => {
  if (typeof location > `u`) return 0;
  let e3 = location.search.match(/[?&]texsize=(\d+)/), t2 = e3 ? parseInt(e3[1], 10) : 0;
  return t2 >= 256 && t2 <= 4096 && !(t2 & t2 - 1) ? t2 : 0;
})(), Po = { low: { texel: 3e-3, min: 256, cap: 512, hero: 512 }, medium: { texel: 15e-4, min: 512, cap: 1024, hero: 1024 }, high: { texel: 1e-3, min: 512, cap: 1024, hero: 1024 }, ultra: { texel: 6e-4, min: 1024, cap: 2048, hero: 2048 }, cinematic: { texel: 3e-4, min: 1024, cap: 2048, hero: 4096 } };
function Fo(e3 = {}) {
  if (e3.cinematic) return `cinematic`;
  if (e3.name && Po[e3.name]) return e3.name;
  let t2 = e3.textureSize ?? 1024;
  return t2 >= 4096 ? `cinematic` : t2 >= 2048 ? `ultra` : t2 >= 1024 ? `high` : `low`;
}
function Io(e3, t2 = {}) {
  if (No) return No;
  let n2 = Po[Fo(t2)], r2 = Math.max(n2.min, Math.min(n2.cap, t2.textureSize ?? n2.cap)), i2 = e3.hero ? r2 * (n2.hero / n2.cap) : r2;
  e3.maxSize && (i2 = Math.min(i2, Math.max(e3.maxSize, n2.min)));
  let a2 = e3.worldSize / n2.texel, o2 = 2 ** Math.round(Math.log2(Math.max(a2, 1)));
  return Math.max(n2.min, Math.min(i2, o2));
}
var Lo = class {
  constructor(e3, t2) {
    this.renderer = e3, this.quality = t2, this.baker = new io(e3), this.surfaceBaker = new ho(e3), this.sets = /* @__PURE__ */ new Map(), this.extra = /* @__PURE__ */ new Map(), this.stats = null;
  }
  async generate(e3, t2 = {}) {
    let n2 = this.renderer.getContext(), r2 = t2.profile ? [] : null, i2 = performance.now(), a2 = Object.keys(jo), o2 = Fo(this.quality), s2 = this.quality.anisotropy, c2 = this.surfaceBaker, l2 = Object.fromEntries(a2.map((e4) => [e4, Io(jo[e4], this.quality)])), u2 = [...a2].sort((e4, t3) => l2[t3] - l2[e4]).map((e4) => c2.prepare(e4, jo[e4], l2[e4]));
    e3?.(0.02, `compiling`), await c2.compileAll(u2), Mo || c2.prime(u2);
    let d2 = performance.now() - i2;
    e3?.(0.35, `compiled`);
    let f2 = [], p2 = /* @__PURE__ */ new Map();
    for (let i3 = 0; i3 < u2.length; i3++) {
      let a3 = u2[i3];
      c2.runnable(a3) || (f2.push(a3.name), console.error(`[lagoon] textures: surface '${a3.name}' failed to compile, using fallback`), c2.disposeJob(a3), a3 = c2.prepare(a3.name, mo(a3.def), a3.size));
      let o3 = r2 ? performance.now() : 0;
      if (p2.set(a3.name, c2.bake(a3, s2)), r2 && (n2.finish(), r2.push([a3.name, Math.round(performance.now() - o3)])), t2.glcheck) {
        let e4 = n2.getError();
        e4 && console.error(`[lagoon] textures: GL error ${e4} after baking '${a3.name}'`);
      }
      c2.disposeJob(a3), e3?.(0.35 + 0.65 * ((i3 + 1) / u2.length), a3.name), i3 % 4 == 3 && await new Promise((e4) => setTimeout(e4, 0));
    }
    for (let e4 of a2) this.sets.set(e4, p2.get(e4));
    c2.disposeScratch(), this.profile = r2;
    let m2 = {};
    for (let e4 of a2) m2[l2[e4]] = (m2[l2[e4]] || 0) + 1;
    let h2 = Object.keys(m2).map(Number).sort((e4, t3) => t3 - e4).map((e4) => `${m2[e4]}x${e4}`).join(` `);
    this.stats = { sets: u2.length, tier: o2, size: Math.max(...Object.values(l2)), sizes: l2, compileMs: Math.round(d2), totalMs: Math.round(performance.now() - i2), megabytes: Math.round(c2.bytes / 1048576), failed: f2 }, console.log(`[lagoon] textures: ${this.stats.sets} sets (${o2}: ${h2}), ${this.stats.megabytes} MB (with mips), compile ${this.stats.compileMs} ms, total ${this.stats.totalMs} ms${f2.length ? `, FAILED: ` + f2.join(`,`) : ``}`);
  }
  get(e3) {
    let t2 = this.sets.get(e3);
    if (!t2) throw Error(`TextureLibrary: unknown set '${e3}'`);
    return t2;
  }
  has(e3) {
    return this.sets.has(e3);
  }
  register(e3, t2) {
    return this.extra.set(e3, t2), t2;
  }
  extraTex(e3) {
    return this.extra.get(e3);
  }
  bake(e3, t2) {
    return this.baker.bake(e3, t2);
  }
  primePrograms() {
    return no(this.renderer);
  }
}, Ro = { bark: { normalScale: 1, envMapIntensity: 0.9, pom: true }, barkPalm: { normalScale: 1, envMapIntensity: 0.9 }, woodPlank: { normalScale: 1.1, pom: true, pomScale: 0.9 }, woodBeam: { normalScale: 1, pom: true, pomScale: 0.8 }, woodDark: { normalScale: 0.9, pom: true, pomScale: 1 }, thatch: { normalScale: 1, envMapIntensity: 0.9 }, rope: { normalScale: 1 }, linen: { normalScale: 0.8, side: 2 }, wicker: { normalScale: 1 }, sand: { normalScale: 1, antiTile: true, macro: 0.1 }, sandWet: { normalScale: 0.9, antiTile: true, macro: 0.08 }, rock: { normalScale: 1, antiTile: true, macro: 0.12 }, cliff: { normalScale: 1, antiTile: true, macro: 0.12 }, soil: { normalScale: 1, antiTile: true, macro: 0.12 }, stone: { normalScale: 1, antiTile: true, macro: 0.08 }, metal: { normalScale: 0.8 }, fabric: { normalScale: 0.8 }, leafLitter: { normalScale: 1, antiTile: true, macro: 0.1 } }, zo = 0.07, Bo = 2.5, Vo = 12, Ho = 0.2, Uo = 4, Wo = 9, Go = { low: 0, medium: 1, high: 2, ultra: 3, cinematic: 4 }, Ko = false;
function qo() {
  if (Ko) return;
  Ko = true;
  let e3 = pe, t2 = (e4) => e4.toFixed(4);
  e3.map_pars_fragment += `
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
`;
  let n2 = `
#if defined( LV_POM ) && defined( USE_BUMPMAP ) && defined( USE_MAP ) && defined( USE_NORMALMAP_TANGENTSPACE ) && defined( USE_ROUGHNESSMAP ) && ! defined( USE_TANGENT ) && ! defined( FLAT_SHADED ) && ! defined( LV_NOTILE ) && ! defined( vMapUv ) && ! defined( vNormalMapUv )
  #define LV_POM_ACTIVE
  vec2 lvPGx = dFdx( vBumpMapUv ), lvPGy = dFdy( vBumpMapUv );
  vec2 lvPOff = vec2( 0.0 );
  {
    float lvPFade = 1.0 - smoothstep( ${t2(Uo)}, ${t2(Wo)}, length( vViewPosition ) );
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
`, r2 = `
#ifdef LV_POM_ACTIVE
#undef texture2D
#define texture2D( s, c ) textureGrad( s, c, lvPGx, lvPGy )
#endif
`, i2 = `
#ifdef LV_POM_ACTIVE
#undef texture2D
#define texture2D texture
#endif
`;
  e3.map_fragment = `
${n2}
${`
#if defined( LV_DETAIL ) && defined( USE_NORMALMAP_TANGENTSPACE ) && defined( USE_ROUGHNESSMAP ) && ! defined( USE_PACKED_NORMALMAP )
  #define LV_DT_ACTIVE
  #ifdef LV_POM_ACTIVE
  vec2 lvDUv = ( vNormalMapUv + lvPOff ) * ${t2(8)} + vec2( 0.371, 0.613 );
  vec2 lvDGx = lvPGx * ${t2(8)}, lvDGy = lvPGy * ${t2(8)};
  #else
  vec2 lvDUv = vNormalMapUv * ${t2(8)} + vec2( 0.371, 0.613 );
  vec2 lvDGx = dFdx( lvDUv ), lvDGy = dFdy( lvDUv );
  #endif
  float lvDetK = 1.0 - smoothstep( ${t2(Bo)}, ${t2(Vo)}, length( vViewPosition ) );
  vec2 lvDetS = vec2( 0.0 );
  if ( lvDetK > 0.0 ) {
    lvDetS = vec2( textureGrad( roughnessMap, lvDUv, lvDGx, lvDGy ).a, textureGrad( normalMap, lvDUv, lvDGx, lvDGy ).a ) * 2.0 - 1.0;
    lvDetS *= ${t2(1)};
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
${r2}
${e3.map_fragment}
${i2}
#endif
#if defined( LV_WMACRO ) && defined( USE_MAP )
  {
    // world position from the view-space position (independent of other patches)
    vec3 lvWp = cameraPosition + ( vec4( - vViewPosition, 0.0 ) * viewMatrix ).xyz;
    float lvWm = lvNoise3( lvWp * 0.37 ) * 0.62 + lvNoise3( lvWp * 1.13 + 5.3 ) * 0.38;
    float lvWk = ( lvWm - 0.5 ) * 2.0 * ${t2(zo)};
    float lvWl = dot( diffuseColor.rgb, vec3( 0.2126, 0.7152, 0.0722 ) );
    diffuseColor.rgb *= 1.0 + lvWk;
    diffuseColor.rgb = mix( diffuseColor.rgb, vec3( lvWl * ( 1.0 + lvWk ) ), clamp( lvWk * 3.0, 0.0, 0.3 ) );
  }
#endif
`, e3.roughnessmap_fragment = `
#if defined( LV_NT_ACTIVE ) && defined( USE_ROUGHNESSMAP )
  #define LV_NT_ORM
  vec4 lvOrm = mix( textureGrad( roughnessMap, vRoughnessMapUv + lvOa, lvDx, lvDy ), textureGrad( roughnessMap, vRoughnessMapUv + lvOb, lvDx, lvDy ), lvW );
  float roughnessFactor = roughness * lvOrm.g;
#else
${r2}
${e3.roughnessmap_fragment}
${i2}
#endif
#ifdef LV_DT_ACTIVE
  // zero-mean breakup (the slopes average to 0 over a detail tile), so the mean
  // roughness does not shift as the layer fades in with distance
  roughnessFactor = clamp( roughnessFactor * ( 1.0 + ${t2(Ho)} * clamp( ( lvDetS.x - 0.7 * lvDetS.y ) * 2.5, - 1.0, 1.0 ) ), 0.03, 1.0 );
#endif
`, e3.metalnessmap_fragment = `
#if defined( LV_NT_ORM ) && defined( USE_METALNESSMAP )
  float metalnessFactor = metalness * lvOrm.b;
#else
${r2}
${e3.metalnessmap_fragment}
${i2}
#endif
`, e3.normal_fragment_maps = `
#ifdef LV_POM_ACTIVE
  vec2 lvNrmUvP = vNormalMapUv + lvPOff;
  #define vNormalMapUv lvNrmUvP
#endif
${r2}
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
${e3.normal_fragment_maps}
#endif
${i2}
`;
  let a2 = `texture2D( aoMap, vAoMapUv ).r`;
  e3.aomap_fragment.includes(a2) && (e3.aomap_fragment = `
#ifdef LV_NT_ORM
  #define LV_AO_SAMPLE lvOrm.r
#elif defined( LV_POM_ACTIVE )
  #define LV_AO_SAMPLE textureGrad( aoMap, vAoMapUv + lvPOff, lvPGx, lvPGy ).r
#else
  #define LV_AO_SAMPLE ${a2}
#endif
${e3.aomap_fragment.replace(a2, `LV_AO_SAMPLE`)}
`), e3.uv_vertex = `
#ifdef LV_UVSWAP
  #define LV_UVT( v ) ( v ).yx
#else
  #define LV_UVT( v ) ( v )
#endif
${e3.uv_vertex.replace(/vec3\( (\w+_UV), 1 \)/g, `vec3( LV_UVT( $1 ), 1 )`)}
`;
}
var Jo = class {
  constructor(e3, t2 = null) {
    this.tex = e3, this.quality = t2 ?? e3?.quality ?? {};
    let n2 = this.quality;
    this.rank = n2.rank ?? Go[n2.name] ?? (n2.textureSize >= 2048 ? 3 : n2.textureSize >= 1024 ? 2 : 0), this.cache = /* @__PURE__ */ new Map(), qo();
  }
  _build(e3, t2 = {}) {
    let n2 = this.tex.get(e3), r2 = Ro[e3] ?? {}, { uvSwap: i2, antiTile: a2, macro: o2, detail: s2, pom: c2, ...l2 } = t2, u2 = 1 / n2.worldSize;
    for (let e4 of [n2.map, n2.normalMap, n2.ormMap, n2.heightMap]) e4 && (e4.wrapS = e4.wrapT = b, e4.repeat.set(u2, u2));
    let d2 = new ae({ map: n2.map, normalMap: n2.normalMap, normalScale: new j(r2.normalScale ?? 1, r2.normalScale ?? 1), roughnessMap: n2.ormMap, metalnessMap: n2.ormMap, aoMap: n2.ormMap, aoMapIntensity: r2.aoMapIntensity ?? 1, roughness: 1, metalness: 1, side: r2.side ?? 0, envMapIntensity: r2.envMapIntensity ?? 1 });
    Object.assign(d2, l2);
    let f2 = { ...d2.defines ?? {} };
    if (a2 ?? r2.antiTile) {
      f2.LV_NOTILE = ``;
      let e4 = o2 ?? r2.macro ?? 0;
      e4 > 0 && (f2.LV_MACRO = e4.toFixed(3));
    }
    i2 && (f2.LV_UVSWAP = ``);
    let p2 = d2.normalMap === n2.normalMap && d2.roughnessMap === n2.ormMap;
    return this.rank >= 1 && p2 && (s2 ?? true) && (f2.LV_DETAIL = ``), this.rank >= 1 && d2.map === n2.map && (f2.LV_WMACRO = ``), this.rank >= 3 && (c2 ?? r2.pom) && n2.heightMap && p2 && d2.map === n2.map && !f2.LV_NOTILE && !d2.bumpMap && (d2.bumpMap = n2.heightMap, d2.bumpScale = (r2.pomScale ?? 0.65) * (n2.depth ?? 0.05) / n2.worldSize, f2.LV_POM = ``, f2.LV_POM_STEPS = this.rank >= 4 ? `28.0` : `20.0`), d2.defines = f2, d2.name = e3, tr(d2), d2;
  }
  get(e3) {
    return this.cache.has(e3) || this.cache.set(e3, this._build(e3)), this.cache.get(e3);
  }
  create(e3, t2 = {}) {
    return this._build(e3, t2);
  }
  names() {
    return Object.keys(Ro);
  }
}, Yo = `modulepreload`, Xo = function(e3) {
  return `/` + e3;
}, Zo = {}, J = function(e3, t2, n2) {
  let r2 = Promise.resolve();
  if (t2 && t2.length > 0) {
    let o2 = function(e5) {
      return Promise.all(e5.map((e6) => Promise.resolve(e6).then((e7) => ({ status: `fulfilled`, value: e7 }), (e7) => ({ status: `rejected`, reason: e7 }))));
    }, s2 = function(e5) {
      return import.meta.resolve ? import.meta.resolve(e5) : new URL(e5, import.meta.url).href;
    };
    let e4 = document.getElementsByTagName(`link`), i3 = document.querySelector(`meta[property=csp-nonce]`), a2 = i3?.nonce || i3?.getAttribute(`nonce`);
    r2 = o2(t2.map((t3) => {
      if (t3 = Xo(t3, n2), t3 = s2(t3), t3 in Zo) return;
      Zo[t3] = true;
      let r3 = t3.endsWith(`.css`);
      for (let n3 = e4.length - 1; n3 >= 0; n3--) {
        let i5 = e4[n3];
        if (i5.href === t3 && (!r3 || i5.rel === `stylesheet`)) return;
      }
      let i4 = document.createElement(`link`);
      if (i4.rel = r3 ? `stylesheet` : Yo, r3 || (i4.as = `script`), i4.crossOrigin = ``, i4.href = t3, a2 && i4.setAttribute(`nonce`, a2), document.head.appendChild(i4), r3) return new Promise((e5, n3) => {
        i4.addEventListener(`load`, e5), i4.addEventListener(`error`, () => n3(Error(`Unable to preload CSS for ${t3}`)));
      });
    }).filter((e5) => e5 !== void 0));
  }
  function i2(e4) {
    let t3 = new Event(`vite:preloadError`, { cancelable: true });
    if (t3.payload = e4, window.dispatchEvent(t3), !t3.defaultPrevented) throw e4;
  }
  return r2.then((t3) => {
    for (let e4 of t3 || []) e4.status === `rejected` && i2(e4.reason);
    return e3().catch(i2);
  });
}, Qo = [{ name: `sky`, weight: 2, always: true, load: () => J(() => import("./sky-CZkINW5K.js"), __vite__mapDeps([0, 1, 2, 3])) }, { name: `lighting`, weight: 1, always: true, load: () => J(() => import("./lighting-v5Bxz3fy.js"), __vite__mapDeps([4, 1])) }, { name: `terrain`, weight: 6, load: () => J(() => import("./terrain-hAt8DxJj.js"), __vite__mapDeps([5, 1, 6, 7])) }, { name: `water`, weight: 3, load: () => J(() => import("./water-gsagbnmh.js"), __vite__mapDeps([8, 1, 2, 3, 6, 9])) }, { name: `rocks`, weight: 3, load: () => J(() => import("./rocks-y8HHw4CK.js"), __vite__mapDeps([10, 1, 6, 7])) }, { name: `trees`, weight: 8, load: () => J(() => import("./trees-0uhX1FpN.js"), __vite__mapDeps([11, 1, 2, 3, 6])) }, { name: `architecture`, weight: 8, load: () => J(() => import("./architecture-CZpTapAH.js").then((e3) => e3.t), __vite__mapDeps([12, 3, 1, 13, 6, 14])) }, { name: `palms`, weight: 4, load: () => J(() => import("./palms-q8s8U1Ts.js"), __vite__mapDeps([15, 1, 2, 3, 6])) }, { name: `vegetation`, weight: 4, load: () => J(() => import("./vegetation-D1lQB87E.js"), __vite__mapDeps([16, 1, 2, 3, 6])) }, { name: `waterfalls`, weight: 2, load: () => J(() => import("./waterfalls-DdzTju_6.js"), __vite__mapDeps([17, 1, 6, 9])) }, { name: `waterfx`, weight: 1, load: () => J(() => import("./waterfx-DvUq_Vch.js"), __vite__mapDeps([18, 1])) }, { name: `ambient`, weight: 1, load: () => J(() => import("./ambient-CLaPyTDX.js"), __vite__mapDeps([19, 1, 6])) }], $o = { solid: 0, walk: 1, ladder: 2, other: 3 };
function es(e3) {
  let t2 = e3?.parts;
  if (!t2 || !t2.length) return null;
  let n2 = 0;
  for (let e4 of t2) n2 += e4.attributes.position.count / 3 | 0;
  let r2 = new Uint8Array(n2), i2 = 0, a2 = false;
  for (let e4 of t2) {
    let t3 = e4.attributes.position.count / 3 | 0, n3 = $o[e4.userData?.kind] ?? $o.other;
    n3 === $o.ladder && (a2 = true), r2.fill(n3, i2, i2 + t3), i2 += t3;
  }
  return { kinds: r2, hasLadders: a2 };
}
var ts = 2048, ns = 6, rs = 0.2, is = class {
  constructor({ collision: e3, hf: t2, kinds: n2 = null }) {
    this.hf = t2, this.S = t2.GRID_STEP, this.bvh = e3?.bvh ?? null, this.index = this.bvh ? this.bvh.geometry.index?.array ?? null : null, this.kinds = n2?.kinds ?? null, this._ci = new Int32Array(ts).fill(2147483647), this._cj = new Int32Array(ts).fill(2147483647), this._cv = new Float64Array(ts), this._ox = new Float64Array(7), this._oz = new Float64Array(7);
    for (let e4 = 0; e4 < ns; e4++) {
      let t3 = e4 / ns * Math.PI * 2 + 0.3;
      this._ox[e4 + 1] = Math.cos(t3) * rs, this._oz[e4 + 1] = Math.sin(t3) * rs;
    }
    this._nSamples = 7, this.sup = { y: -1 / 0, nx: 0, ny: 1, nz: 0, terrain: false, kind: 0 }, this._tn = new M(), this._box = new o(), this._seg = new A(new M(), new M()), this._triPt = new M(), this._capPt = new M(), this._r = 0.32, this.contacts = new Float64Array(32), this.nContacts = 0, this.ceiling = false, this.lifted = false, this.ladder = false, this.ladderNx = 0, this.ladderNz = 0, this._px = 0, this._pz = 0, this._pTop = 0, this._pBot = 0, this._pN = 1, this._best = -1 / 0, this._bnx = 0, this._bny = 1, this._bnz = 0, this._bkind = 0;
    let r2 = this;
    this._probeCB = { intersectsBounds: (e4) => e4.intersectsBox(r2._box), intersectsTriangle: (e4, t3) => (r2._probeTri(e4, t3), false) }, this._capsuleCB = { intersectsBounds: (e4) => e4.intersectsBox(r2._box), intersectsTriangle: (e4, t3) => (r2._capsuleTri(e4, t3), false) }, this._overlapHit = false, this._overlapCB = { intersectsBounds: (e4) => e4.intersectsBox(r2._box), intersectsTriangle: (e4) => e4.closestPointToSegment(r2._seg, r2._triPt, r2._capPt) < r2._r && (r2._overlapHit = true, true) };
  }
  kindOf(e3) {
    if (!this.kinds || !this.index) return 0;
    let t2 = this.index[e3 * 3];
    return this.kinds[t2 / 3 | 0] ?? 0;
  }
  _lat(e3, t2) {
    let n2 = (Math.imul(e3, 73856093) ^ Math.imul(t2, 19349663)) & 2047;
    if (this._ci[n2] === e3 && this._cj[n2] === t2) return this._cv[n2];
    let r2 = this.hf.heightAt(e3 * this.S, t2 * this.S);
    return this._ci[n2] = e3, this._cj[n2] = t2, this._cv[n2] = r2, r2;
  }
  terrain(e3, t2, n2 = null) {
    let r2 = this.S, i2 = e3 / r2, a2 = t2 / r2, o2 = Math.floor(i2), s2 = Math.floor(a2), c2 = i2 - o2, l2 = a2 - s2, u2 = this._lat(o2, s2), d2 = this._lat(o2 + 1, s2), f2 = this._lat(o2, s2 + 1), p2 = this._lat(o2 + 1, s2 + 1), m2, h2, g2;
    if (c2 + l2 <= 1 ? (m2 = u2 + (d2 - u2) * c2 + (f2 - u2) * l2, h2 = (d2 - u2) / r2, g2 = (f2 - u2) / r2) : (m2 = p2 + (f2 - p2) * (1 - c2) + (d2 - p2) * (1 - l2), h2 = (p2 - f2) / r2, g2 = (p2 - d2) / r2), n2) {
      let e4 = Math.sqrt(h2 * h2 + 1 + g2 * g2);
      n2.set(-h2 / e4, 1 / e4, -g2 / e4);
    }
    return m2;
  }
  probe(e3, t2, n2, r2, i2 = true) {
    let a2 = this.sup;
    if (a2.y = -1 / 0, a2.terrain = false, a2.kind = 0, this._best = -1 / 0, this.bvh) {
      this._px = e3, this._pz = t2, this._pTop = n2, this._pBot = r2, this._pN = i2 ? this._nSamples : 1;
      let o3 = i2 ? 0.21000000000000002 : 0.01;
      this._box.min.set(e3 - o3, r2 - 0.01, t2 - o3), this._box.max.set(e3 + o3, n2 + 0.01, t2 + o3), this.bvh.shapecast(this._probeCB), this._best > -1 / 0 && (a2.y = this._best, a2.nx = this._bnx, a2.ny = this._bny, a2.nz = this._bnz, a2.kind = this._bkind);
    }
    let o2 = this.terrain(e3, t2, this._tn);
    return o2 >= r2 && o2 <= n2 && o2 > a2.y && (a2.y = o2, a2.nx = this._tn.x, a2.ny = this._tn.y, a2.nz = this._tn.z, a2.terrain = true, a2.kind = 0), a2.y;
  }
  _probeTri(e3, t2) {
    let n2 = e3.a, r2 = e3.b, i2 = e3.c, a2 = r2.x - n2.x, o2 = r2.y - n2.y, s2 = r2.z - n2.z, c2 = i2.x - n2.x, l2 = i2.y - n2.y, u2 = i2.z - n2.z, d2 = o2 * u2 - s2 * l2, f2 = s2 * c2 - a2 * u2, p2 = a2 * l2 - o2 * c2, m2 = Math.sqrt(d2 * d2 + f2 * f2 + p2 * p2);
    if (m2 < 1e-12 || (d2 /= m2, f2 /= m2, p2 /= m2, f2 < 0 && (d2 = -d2, f2 = -f2, p2 = -p2), f2 < 0.02)) return;
    let h2 = (r2.z - i2.z) * (n2.x - i2.x) + (i2.x - r2.x) * (n2.z - i2.z);
    if (Math.abs(h2) < 1e-12) return;
    let g2 = 1 / h2;
    for (let e4 = 0; e4 < this._pN; e4++) {
      let a3 = this._px + this._ox[e4], o3 = this._pz + this._oz[e4], s3 = ((r2.z - i2.z) * (a3 - i2.x) + (i2.x - r2.x) * (o3 - i2.z)) * g2;
      if (s3 < -1e-6) continue;
      let c3 = ((i2.z - n2.z) * (a3 - i2.x) + (n2.x - i2.x) * (o3 - i2.z)) * g2;
      if (c3 < -1e-6) continue;
      let l3 = 1 - s3 - c3;
      if (l3 < -1e-6) continue;
      let u3 = s3 * n2.y + c3 * r2.y + l3 * i2.y;
      u3 > this._pTop || u3 < this._pBot || u3 > this._best && (this._best = u3, this._bnx = d2, this._bny = f2, this._bnz = p2, this._bkind = this.kindOf(t2));
    }
  }
  resolveCapsule(e3, t2, n2, r2, i2 = 3, a2 = false) {
    if (this.nContacts = 0, this.ceiling = false, this.lifted = false, this.ladder = false, !this.bvh) return false;
    this._r = t2, this._grounded = a2;
    let o2 = this._seg, s2 = false;
    for (let a3 = 0; a3 < i2; a3++) {
      o2.start.set(e3.x, e3.y + n2 + t2, e3.z), o2.end.set(e3.x, e3.y + r2 - t2, e3.z);
      let i3 = o2.start.x, a4 = o2.start.y, c2 = o2.start.z;
      if (this._box.min.set(e3.x - t2, e3.y + n2, e3.z - t2), this._box.max.set(e3.x + t2, e3.y + r2, e3.z + t2), this._hit = false, this.bvh.shapecast(this._capsuleCB), !this._hit) break;
      s2 = true, e3.x += o2.start.x - i3, e3.y += o2.start.y - a4, e3.z += o2.start.z - c2;
    }
    return s2;
  }
  _capsuleTri(e3, t2) {
    let n2 = this._seg, r2 = this._r, i2 = e3.closestPointToSegment(n2, this._triPt, this._capPt);
    if (i2 >= r2) return;
    let a2, o2, s2;
    if (i2 > 1e-5) a2 = (this._capPt.x - this._triPt.x) / i2, o2 = (this._capPt.y - this._triPt.y) / i2, s2 = (this._capPt.z - this._triPt.z) / i2;
    else {
      let t3 = e3.a, n3 = e3.b, r3 = e3.c, i3 = n3.x - t3.x, c3 = n3.y - t3.y, l3 = n3.z - t3.z, u3 = r3.x - t3.x, d3 = r3.y - t3.y, f3 = r3.z - t3.z;
      a2 = c3 * f3 - l3 * d3, o2 = l3 * u3 - i3 * f3, s2 = i3 * d3 - c3 * u3;
      let p3 = Math.sqrt(a2 * a2 + o2 * o2 + s2 * s2) || 1;
      a2 /= p3, o2 /= p3, s2 /= p3;
    }
    let c2 = r2 - i2;
    this._hit = true;
    let l2 = this.kindOf(t2);
    if (o2 < -0.4) {
      this.ceiling = true;
      let e4 = Math.sqrt(a2 * a2 + s2 * s2);
      if (!this._grounded || e4 < 0.1) {
        let e5 = Math.min(c2 / -o2, c2 * 2.5);
        n2.start.y -= e5, n2.end.y -= e5;
        return;
      }
    }
    if (o2 > 0.8) {
      let e4 = Math.min(c2 / o2, c2 * 1.5);
      n2.start.y += e4, n2.end.y += e4, this.lifted = true;
      return;
    }
    let u2 = Math.sqrt(a2 * a2 + s2 * s2);
    if (u2 < 1e-4) return;
    let d2 = a2 / u2, f2 = s2 / u2, p2 = Math.min(c2 / u2, c2 * (o2 < -0.4 ? 4 : 2.5));
    n2.start.x += d2 * p2, n2.start.z += f2 * p2, n2.end.x += d2 * p2, n2.end.z += f2 * p2, this.nContacts < 16 && (this.contacts[this.nContacts * 2] = d2, this.contacts[this.nContacts * 2 + 1] = f2, this.nContacts++), (l2 === $o.ladder || l2 === $o.walk && this._isLadderFace(e3)) && (this.ladder = true, this.ladderNx = d2, this.ladderNz = f2);
  }
  _isLadderFace(e3) {
    let t2 = e3.a, n2 = e3.b, r2 = e3.c, i2 = n2.x - t2.x, a2 = n2.y - t2.y, o2 = n2.z - t2.z, s2 = r2.x - t2.x, c2 = r2.y - t2.y, l2 = r2.z - t2.z, u2 = a2 * l2 - o2 * c2, d2 = o2 * s2 - i2 * l2, f2 = i2 * c2 - a2 * s2, p2 = Math.sqrt(u2 * u2 + d2 * d2 + f2 * f2);
    if (p2 < 1e-12 || Math.abs(d2 / p2) > 0.35) return false;
    let m2 = Math.min(t2.y, n2.y, r2.y), h2 = Math.max(t2.y, n2.y, r2.y) - m2;
    return h2 < 1 ? false : h2 > 1.6 * Math.max(Math.hypot(n2.x - t2.x, n2.z - t2.z), Math.hypot(r2.x - t2.x, r2.z - t2.z), Math.hypot(r2.x - n2.x, r2.z - n2.z));
  }
  overlaps(e3, t2, n2, r2, i2, a2) {
    return this.bvh ? (this._r = r2, this._seg.start.set(e3, t2 + i2 + r2, n2), this._seg.end.set(e3, t2 + a2 - r2, n2), this._box.min.set(e3 - r2, t2 + i2, n2 - r2), this._box.max.set(e3 + r2, t2 + a2, n2 + r2), this._overlapHit = false, this.bvh.shapecast(this._overlapCB), this._overlapHit) : false;
  }
}, as = 0.085, os = 250, ss = [`KeyW`, `ArrowUp`], cs = [`KeyS`, `ArrowDown`], ls = [`KeyA`, `ArrowLeft`], us = [`KeyD`, `ArrowRight`], ds = [`ShiftLeft`, `ShiftRight`], fs = [`Space`], ps = [`KeyC`, `ControlLeft`, `ControlRight`], ms = /* @__PURE__ */ new Set([`Space`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`]), hs = class {
  constructor(e3, { allowLock: t2 = true } = {}) {
    this.canvas = e3, this.allowLock = t2, this.enabled = false, this.locked = false, this.lockFailed = false, this.keys = /* @__PURE__ */ new Set(), this.onLook = null, this.onFlight = null, this.state = { fwd: 0, strafe: 0, sprint: false, jump: false, jumpEdge: false, dive: false }, this._jumpWas = false, this._drag = false, this.paused = document.getElementById(`paused`), this._pending = false, document.addEventListener(`pointerlockchange`, () => {
      this.locked = document.pointerLockElement === e3, this._pending = false, this.locked || this.keys.clear(), this._syncOverlay();
    }), document.addEventListener(`pointerlockerror`, () => {
      this._pending = false, this._lockErrors = (this._lockErrors || 0) + 1, this._lockErrors >= 2 && (this.lockFailed = true), this._syncOverlay();
    });
    let n2 = (e4) => this.requestLock(e4);
    e3.addEventListener(`click`, n2), this.paused?.addEventListener(`click`, n2), document.addEventListener(`mousemove`, (e4) => {
      if (!this.enabled || !this.locked && !(this.lockFailed && this._drag)) return;
      let t3 = e4.movementX || 0, n3 = e4.movementY || 0;
      Math.abs(t3) > os || Math.abs(n3) > os || this.onLook?.(t3 * as, n3 * as);
    }), e3.addEventListener(`mousedown`, () => {
      this._drag = true;
    }), window.addEventListener(`mouseup`, () => {
      this._drag = false;
    }), window.addEventListener(`keydown`, (e4) => {
      this.enabled && (ms.has(e4.code) && e4.preventDefault(), this._active() && (this.keys.add(e4.code), e4.code === `KeyF` && e4.isTrusted && !e4.repeat && !e4.ctrlKey && !e4.metaKey && !e4.altKey && this.onFlight?.(e4.shiftKey)));
    }), window.addEventListener(`keyup`, (e4) => {
      this.keys.delete(e4.code);
    }), window.addEventListener(`blur`, () => this.keys.clear()), document.addEventListener(`visibilitychange`, () => {
      document.hidden && this.keys.clear();
    });
  }
  _active() {
    return this.locked || this.lockFailed || !this.allowLock;
  }
  _syncOverlay() {
    if (!this.paused) return;
    let e3 = this.enabled && this.allowLock && !this.locked && !this.lockFailed && !this._pending;
    this.paused.classList.toggle(`show`, e3);
  }
  requestLock(e3) {
    if (!this.allowLock || !this.enabled || this.locked || e3 && e3.isTrusted === false || !e3 && navigator.userActivation && !navigator.userActivation.isActive) return;
    let t2 = this.canvas;
    if (!t2.requestPointerLock) {
      this.lockFailed = true, this._syncOverlay();
      return;
    }
    this._pending = true, clearTimeout(this._pendingTimer), this._pendingTimer = setTimeout(() => {
      this._pending = false, this._syncOverlay();
    }, 1500);
    try {
      let e4 = t2.requestPointerLock();
      e4 && typeof e4.catch == `function` && e4.catch(() => {
        this._pending = false, this._syncOverlay();
      });
    } catch {
      this._pending = false;
    }
    this._syncOverlay();
  }
  setEnabled(e3) {
    this.enabled = e3, e3 || this.keys.clear(), this._syncOverlay();
  }
  _any(e3) {
    for (let t2 = 0; t2 < e3.length; t2++) if (this.keys.has(e3[t2])) return true;
    return false;
  }
  poll() {
    let e3 = this.state, t2 = this._active() && this.enabled;
    e3.fwd = t2 ? +!!this._any(ss) - !!this._any(cs) : 0, e3.strafe = t2 ? +!!this._any(us) - !!this._any(ls) : 0, e3.sprint = t2 && this._any(ds);
    let n2 = t2 && this._any(fs);
    return e3.jumpEdge = n2 && !this._jumpWas, this._jumpWas = n2, e3.jump = n2, e3.dive = t2 && this._any(ps), e3;
  }
}, gs = Math.PI / 180, _s = 0, vs = { speed: 8, fast: 28, accel: 3.2, decel: 2.4, maxAccel: 14, maxDecel: 20, clearance: 0.3, softR: 1150, hardR: 1250, ceilSoft: 300, ceilHard: 380, carryMax: 12 }, ys = (e3, t2, n2) => {
  let r2 = Math.min(1, Math.max(0, (n2 - e3) / (t2 - e3)));
  return r2 * r2 * (3 - 2 * r2);
}, bs = class {
  constructor(e3) {
    this.p = e3, this.fastLatch = false, this.fast = false, this.falling = false, this.toggles = 0, this._hint = null, this._hintTimer = 0, e3.fly && this.set(true, false, true);
  }
  get on() {
    return !!this.p.fly;
  }
  toggle(e3 = false) {
    this.p.capture || (this.p.fly ? this.set(false) : this.set(true, e3));
  }
  set(e3, t2 = false, n2 = false) {
    let r2 = this.p;
    if (e3) {
      let e4 = r2.fly;
      r2.fly = true, this.fastLatch = !!t2, this.fast = !!t2, this.falling = false, r2.mode = _s, r2.grounded = false, r2.steep = false, r2.submerged = false, r2.jumpBuf = 0, r2.blockT = 0, r2.airT = 0, e4 || this.toggles++, n2 || this._showHint(t2 ? `Fast flight` : `Flight on`);
      return;
    }
    if (!r2.fly) return;
    r2.fly = false, this.fastLatch = false, this.fast = false, r2.mode = _s, r2.grounded = false, r2.steep = false, r2.jumped = true, r2.airT = 0, r2.jumpBuf = 0, r2.blockT = 0, r2.lastWalkY = r2.pos.y;
    let i2 = r2.vel, a2 = Math.hypot(i2.x, i2.z);
    a2 > vs.carryMax && (i2.x *= vs.carryMax / a2, i2.z *= vs.carryMax / a2), this.falling = true, this.toggles++, n2 || this._showHint(`Flight off`);
  }
  update(e3, t2) {
    let n2 = this.p, r2 = n2.pos, i2 = n2.vel, a2 = vs, o2 = this.fastLatch || !!t2.sprint;
    this.fast = o2;
    let s2 = o2 ? a2.fast : a2.speed, c2 = n2.yaw * gs, l2 = n2.pitch * gs, u2 = Math.cos(l2), d2 = Math.sin(c2) * u2, f2 = Math.sin(l2), p2 = -Math.cos(c2) * u2, m2 = Math.cos(c2), h2 = Math.sin(c2), g2 = +!!t2.jump - !!t2.dive, _2 = d2 * t2.fwd + m2 * t2.strafe, v2 = f2 * t2.fwd + g2, y2 = p2 * t2.fwd + h2 * t2.strafe, b2 = Math.sqrt(_2 * _2 + v2 * v2 + y2 * y2);
    b2 > 1 && (_2 /= b2, v2 /= b2, y2 /= b2), _2 *= s2, v2 *= s2, y2 *= s2;
    let x2 = b2 > 0.01, S2 = 1 - Math.exp(-(x2 ? a2.accel : a2.decel) * e3), C2 = (_2 - i2.x) * S2, w2 = (v2 - i2.y) * S2, T2 = (y2 - i2.z) * S2, E2 = Math.sqrt(C2 * C2 + w2 * w2 + T2 * T2), D2 = (x2 ? a2.maxAccel : a2.maxDecel) * e3;
    if (E2 > D2) {
      let e4 = D2 / E2;
      C2 *= e4, w2 *= e4, T2 *= e4;
    }
    i2.x += C2, i2.y += w2, i2.z += T2, r2.x += i2.x * e3, r2.y += i2.y * e3, r2.z += i2.z * e3;
    let ee2 = n2.q.terrain(r2.x, r2.z, null) + a2.clearance;
    if (r2.y < ee2 && (r2.y = ee2, i2.y < 0 && (i2.y = 0)), r2.y > a2.ceilSoft) {
      let t3 = ys(a2.ceilSoft, a2.ceilHard, r2.y);
      i2.y > 0 && (i2.y *= Math.exp(-t3 * 10 * e3)), i2.y -= t3 * 4 * e3, r2.y > a2.ceilHard && (r2.y = a2.ceilHard, i2.y > 0 && (i2.y = 0));
    }
    let O2 = Math.hypot(r2.x, r2.z);
    if (O2 > a2.softR) {
      let t3 = r2.x / O2, n3 = r2.z / O2, o3 = ys(a2.softR, a2.hardR, O2), s3 = i2.x * t3 + i2.z * n3;
      if (s3 > 0) {
        let r3 = s3 * Math.min(1, o3 * 8 * e3);
        i2.x -= t3 * r3, i2.z -= n3 * r3;
      }
      i2.x -= t3 * o3 * 6 * e3, i2.z -= n3 * o3 * 6 * e3, O2 > a2.hardR && (r2.x = t3 * a2.hardR, r2.z = n3 * a2.hardR);
    }
    if (!Number.isFinite(r2.x + r2.y + r2.z)) {
      i2.set(0, 0, 0), n2.respawn();
      return;
    }
    n2.mode = _s, n2.grounded = false, n2.submerged = false, n2.time += e3;
    let k2 = n2._surface(r2.x, r2.z);
    n2.surfaceY = k2, n2.depthFeet = r2.y < k2 && n2._inWater(r2.x, r2.z) ? k2 - r2.y : 0;
  }
  _showHint(e3) {
    if (!(typeof document > `u` || this.p.capture)) try {
      let t2 = this._hint;
      if (!t2) {
        t2 = document.getElementById(`flight-hint`) || document.createElement(`div`), t2.id = `flight-hint`, t2.setAttribute(`aria-live`, `polite`), t2.style.cssText = `position:fixed;left:50%;bottom:34px;transform:translateX(-50%);z-index:5;color:rgba(255,250,240,0.85);font:italic 15px 'Cormorant Garamond', Georgia, serif;text-shadow:0 1px 8px rgba(0,0,0,0.5);letter-spacing:0.04em;opacity:0;pointer-events:none;white-space:nowrap;`;
        let e4 = document.getElementById(`hint`);
        if (e4) {
          let n2 = getComputedStyle(e4);
          n2.font && (t2.style.font = n2.font), n2.color && (t2.style.color = n2.color), n2.textShadow && (t2.style.textShadow = n2.textShadow), n2.letterSpacing && (t2.style.letterSpacing = n2.letterSpacing), n2.bottom && (t2.style.bottom = n2.bottom);
        }
        t2.parentNode || document.body.appendChild(t2), this._hint = t2;
      }
      document.getElementById(`hint`)?.classList.remove(`show`), t2.textContent = e3, t2.style.transition = `opacity 0.25s ease`, t2.style.opacity = `1`, clearTimeout(this._hintTimer), this._hintTimer = setTimeout(() => {
        t2.style.transition = `opacity 0.9s ease`, t2.style.opacity = `0`;
      }, 600);
    } catch {
    }
  }
}, xs = [`walk`, `swim`, `mantle`, `climb`], Ss = 0, Cs = 1;
function ws() {
  let e3 = Array(32);
  for (let t2 = 0; t2 < 32; t2++) e3[t2] = { type: ``, t: 0, x: 0, y: 0, z: 0, strength: 0, seq: -1 };
  return { mode: `walk`, flying: false, fast: false, feet: new M(), vel: new M(), speed: 0, surfaceY: 0, feetDepth: 0, eyeDepth: -1.68, submerged: 0, wading: false, swimming: false, diving: false, grounded: false, strokePhase: 0, time: 0, events: e3, eventSeq: 0, _wet: false, _under: false, _resync: true, mute: false, _pvx: 0, _pvy: 0, _pvz: 0, _pGrounded: true, _pFly: false, _pMode: 0 };
}
function Ts(e3, t2, n2, r2, i2, a2, o2) {
  if (e3.mute) return;
  let s2 = e3.eventSeq, c2 = e3.events[s2 % 32];
  c2.type = t2, c2.t = n2, c2.x = r2, c2.y = i2, c2.z = a2, c2.strength = o2, c2.seq = s2, e3.eventSeq = s2 + 1;
}
function Es(e3, t2) {
  let n2 = e3.fx;
  if (!n2) return;
  let r2 = e3.camera.position, i2 = e3.active && !e3.capture, a2 = n2.feet, o2 = n2.vel;
  i2 ? (a2.copy(e3.pos), o2.copy(e3.vel)) : (a2.set(r2.x, r2.y - e3.eye, r2.z), o2.set(0, 0, 0)), n2.speed = o2.length(), n2.time = e3.time;
  let s2 = i2 && !!e3.fly;
  n2.flying = s2, n2.fast = s2 && !!e3.flight?.fast, n2.mode = s2 ? `fly` : xs[e3.mode] ?? `walk`, n2.grounded = i2 && !s2 && e3.grounded;
  let c2 = e3._surface(a2.x, a2.z);
  n2.surfaceY = c2;
  let l2 = e3._inWater(a2.x, a2.z);
  n2.feetDepth = l2 ? c2 - a2.y : Math.min(c2 - a2.y, -1e-3);
  let u2 = e3._surface(r2.x, r2.z), d2 = e3._inWater(r2.x, r2.z);
  n2.eyeDepth = d2 ? u2 - r2.y : Math.min(u2 - r2.y, -1e-3), n2.submerged = e3.G.uCameraUnderwater.value;
  let f2 = n2._wet ? l2 && n2.feetDepth > -5e-3 : l2 && n2.feetDepth > 0.03, p2 = n2._under ? d2 && n2.eyeDepth > -0.02 : d2 && n2.eyeDepth > 0.04;
  if (n2.diving = p2, n2.swimming = !s2 && i2 && e3.mode === Cs && !p2, n2.wading = !s2 && i2 && e3.mode === Ss && f2 && !p2, n2._resync || !i2) n2._resync = false;
  else {
    let t3 = e3.time;
    if (f2 && !n2._wet) {
      let r3 = Math.max(0, -Math.min(o2.y, n2._pvy));
      Ts(n2, `enterWater`, t3, a2.x, c2, a2.z, r3);
      let i4 = n2._pFly || !n2._pGrounded && n2._pMode === Ss, l3 = 0;
      i4 && (l3 = Math.max(Math.hypot(n2._pvx, n2._pvy, n2._pvz), n2.speed), l3 > 1.5 && Ts(n2, `jumpIn`, t3, a2.x, c2, a2.z, l3)), e3.feel?.onEnterWater(r3, s2 ? 0 : l3);
    } else !f2 && n2._wet && (Ts(n2, `exitWater`, t3, a2.x, c2, a2.z, n2.speed), e3.feel?.onExitWater());
    p2 && !n2._under ? Ts(n2, `dive`, t3, r2.x, u2, r2.z, Math.max(0, -o2.y)) : !p2 && n2._under && Ts(n2, `surface`, t3, r2.x, u2, r2.z, Math.max(0, o2.y));
    let i3 = e3.flight;
    i3 && i3.falling && !s2 && (e3.mode === Ss && e3.grounded ? (i3.falling = false, Ts(n2, `landFly`, t3, a2.x, a2.y, a2.z, Math.max(0, -n2._pvy))) : e3.mode !== Ss && (i3.falling = false));
  }
  n2._wet = f2, n2._under = p2, n2._pvx = o2.x, n2._pvy = o2.y, n2._pvz = o2.z, n2._pGrounded = n2.grounded || i2 && !s2 && e3.mode !== Ss, n2._pFly = s2, n2._pMode = e3.mode;
}
var Ds = Math.PI / 180, Os = Math.PI * 2, ks = 0, As = 1, Y = { dipW: 6.5, dipZeta: 0.5, dipPerImpact: 0.2, dipMaxV: 2.3, floatKick: 0.35, buoyancy: 0.3, plungeBuoyancy: 1.1, plungeTime: 6, strokeHz: 0.55, strokeHzPerMs: 0.13, underHz: 0.45, underHzPerMs: 0.1, strokeBob: 0.022, strokeRoll: 1, strokeSurge: 0.12, underBob: 0.012, underPitch: 0.6, underRoll: 0.3, wadeRoll: 0.5, wadeSway: 0.012, idleRoll: 0.3, idleHz: 0.32, diveTilt: 7, diveTime: 1.4, exitTime: 1, exitSlow: 0.3, exitThud: 0.014, snapA: 0.06, snapS: 0.03, snapInner: 0.08, snapBand: 0.2, runSplash: 4.2 }, js = (e3, t2, n2) => e3 < t2 ? t2 : e3 > n2 ? n2 : e3, Ms = (e3, t2, n2) => {
  let r2 = js((n2 - e3) / (t2 - e3), 0, 1);
  return r2 * r2 * (3 - 2 * r2);
}, Ns = (e3, t2, n2, r2) => e3 + (t2 - e3) * (1 - Math.exp(-n2 * r2)), Ps = class {
  constructor(e3) {
    this.p = e3, this.reset();
  }
  reset() {
    this.dip = 0, this.dipV = 0, this.strokePhase = 0, this.strokeCount = 0, this.strokeW = 0, this.strokeMul = 1, this.wadeW = 0, this.idleT = 0, this.tilt = 0, this.diveT = 0, this._wasDive = false, this._plungeSub = false, this.exitT = 0, this.exitH = 0, this.wetDepth = 0, this.speedMul = 1, this.plungeT = 0, this.buoyancy = Y.buoyancy, this._stepIdx = null, this._prevMode = this.p.mode, this._prevFly = !!this.p.fly, this.roll = 0, this.pitchOff = 0, this.offY = 0;
  }
  onEnterWater(e3, t2) {
    this.exitT = 0, t2 > 1.5 && (this.dipV -= Math.min(Y.dipMaxV, Y.dipPerImpact * t2)), t2 > 4 && (this.plungeT = Y.plungeTime, this._plungeSub = false);
  }
  onExitWater() {
    this.exitH = js((this.wetDepth - 0.15) / 0.85, 0, 1), this.wetDepth = 0, this.exitH > 0.05 && (this.exitT = Y.exitTime);
  }
  afterCamera(e3) {
    let t2 = this.p, n2 = t2.camera, r2 = t2.pos, i2 = t2.vel, a2 = t2.fx;
    if (!(e3 > 0)) return;
    let o2 = !!t2.fly, s2 = !o2 && t2.mode === As, c2 = !o2 && t2.mode === ks, l2 = s2 && t2.submerged, u2 = Math.hypot(i2.x, i2.z), d2 = c2 ? t2.depthFeet : 0, f2 = t2.surfaceY;
    a2?._wet && (this.wetDepth = Math.max(this.wetDepth, s2 ? 1.2 : d2)), s2 && this._prevMode !== As && !this._prevFly && (this.dipV -= Y.floatKick * js(0.3 + Math.abs(i2.y) * 0.3, 0, 1)), this._prevMode = t2.mode, this._prevFly = o2;
    let p2 = Y.dipW;
    this.dipV += (-this.dip * p2 * p2 - 2 * Y.dipZeta * p2 * this.dipV) * e3, this.dip += this.dipV * e3, Math.abs(this.dip) < 1e-5 && Math.abs(this.dipV) < 1e-4 && (this.dip = 0, this.dipV = 0);
    let m2 = t2._sim ?? t2.input?.state, h2 = !!m2 && (Math.abs(m2.fwd) > 0.1 || Math.abs(m2.strafe) > 0.1 || l2 && (m2.jump || m2.dive));
    this.plungeT > 0 && (l2 && (this._plungeSub = true), this.plungeT = h2 || this._plungeSub && !l2 || o2 ? 0 : Math.max(0, this.plungeT - e3)), this.buoyancy = this.plungeT > 0 ? Y.plungeBuoyancy : Y.buoyancy;
    let g2 = l2 ? Math.sqrt(u2 * u2 + i2.y * i2.y) : u2;
    if (this.strokeW = Ns(this.strokeW, s2 && h2 ? js(0.3 + g2 / 1.5, 0, 1) : 0, 3, e3), this.strokeW > 0.02) {
      this.strokeW < 0.1 && this.strokePhase < 0.5 && s2 && h2 && (this.strokePhase = Math.max(this.strokePhase, 0.8));
      let n3 = l2 ? Y.underHz + Y.underHzPerMs * g2 : Y.strokeHz + Y.strokeHzPerMs * g2;
      if (this.strokePhase += n3 * e3, this.strokePhase >= 1 && (this.strokePhase -= Math.floor(this.strokePhase), this.strokeCount++, s2 && this.strokeW > 0.3)) {
        let e4 = r2.y + t2.eye;
        Ts(a2, `stroke`, t2.time, r2.x, e4 < f2 - 0.05 ? e4 : f2, r2.z, g2);
      }
    }
    let _2 = this.strokeCount + this.strokePhase, v2 = this.strokeW;
    this.strokeMul = 1 + (s2 ? v2 * Y.strokeSurge * Math.cos(Os * (this.strokePhase - 0.25)) : 0);
    let y2 = 0, b2 = 0, x2 = 0, S2 = 0;
    if (s2 && (l2 ? (y2 += v2 * Y.underBob * Math.sin(Os * _2), S2 += v2 * Y.underPitch * Math.sin(Os * _2 + 1), x2 += v2 * Y.underRoll * Math.sin(Math.PI * _2)) : (y2 += v2 * Y.strokeBob * Math.sin(Os * _2 - 0.6), x2 += v2 * Y.strokeRoll * Math.sin(Math.PI * _2))), this.idleT += e3, this.wadeW = Ns(this.wadeW, c2 && t2.grounded && a2?._wet ? js((d2 - 0.08) / 0.8, 0, 1) : 0, 3, e3), this.wadeW > 1e-3) {
      let e4 = js(u2 / 1.5, 0, 1), n3 = Math.sin(t2.bobPhase);
      x2 += this.wadeW * (Y.wadeRoll * e4 * n3 + Y.idleRoll * (1 - e4) * Math.sin(Os * Y.idleHz * this.idleT)), b2 += this.wadeW * Y.wadeSway * e4 * n3;
    }
    if (c2 && t2.grounded) {
      let e4 = Math.floor(t2.bobPhase / Math.PI);
      this._stepIdx === null ? this._stepIdx = e4 : e4 !== this._stepIdx && (this._stepIdx = e4, a2?._wet && d2 > 0.02 && (Ts(a2, `wadeStep`, t2.time, r2.x, f2, r2.z, d2), u2 > Y.runSplash && d2 < 0.75 && Ts(a2, `splashRun`, t2.time, r2.x, f2, r2.z, u2)));
    }
    if (this.exitT > 0) {
      this.exitT = Math.max(0, this.exitT - e3);
      let n3 = Ms(0, 1, this.exitT / Y.exitTime) * this.exitH;
      if (this.speedMul = 1 - Y.exitSlow * n3, c2 && t2.grounded) {
        let e4 = 1 - Math.abs(Math.sin(t2.bobPhase));
        y2 -= Y.exitThud * n3 * e4 * e4 * e4 * t2.bobW;
      }
    } else this.speedMul = 1;
    let C2 = l2 && !!m2?.dive;
    C2 && !this._wasDive && t2.pos.y + t2.eye > f2 - 1.2 && (this.diveT = Y.diveTime), this._wasDive = C2, this.diveT > 0 && (this.diveT -= e3);
    let w2 = C2 && this.diveT > 0 && i2.y < -0.15 ? -Y.diveTilt * js(-i2.y / 1.6, 0, 1) : 0;
    this.tilt = Ns(this.tilt, w2, 2.5, e3), S2 += this.tilt, this.roll = x2, this.pitchOff = S2, this.offY = y2 + this.dip;
    let T2 = n2.position, E2 = t2.yaw * Ds;
    T2.x += Math.cos(E2) * b2, T2.z += Math.sin(E2) * b2, T2.y += this.offY;
    let D2 = T2.y - f2;
    D2 > -Y.snapBand && D2 < Y.snapBand && t2._inWater(T2.x, T2.z) && (T2.y = f2 + D2 + Y.snapA * Math.tanh(D2 / Y.snapS) * (1 - Ms(Y.snapInner, Y.snapBand, Math.abs(D2)))), (Math.abs(x2) > 1e-4 || Math.abs(S2) > 1e-4) && (n2.rotation.order = `YXZ`, n2.rotation.set(js(t2.pitch + S2, -89, 89) * Ds, -t2.yaw * Ds, x2 * Ds)), n2.updateMatrixWorld(), a2 && (a2.strokePhase = this.strokePhase);
  }
}, Fs = Math.PI / 180, Is = 0, Ls = 1, Rs = 2, zs = 3, Bs = [`walk`, `swim`, `mantle`, `climb`], Vs = (e3, t2, n2) => {
  let r2 = Math.min(1, Math.max(0, (n2 - e3) / (t2 - e3)));
  return r2 * r2 * (3 - 2 * r2);
}, Hs = (e3, t2, n2) => e3 < t2 ? t2 : e3 > n2 ? n2 : e3, Us = (e3) => e3.ny >= (e3.kind === $o.walk && !e3.terrain ? X.walkSlopeCos : X.slopeCos), X = { stepH: 0.35, walk: 3.2, sprint: 6.5, accel: 10, decel: 12, airAccel: 1.4, jumpH: 1.1, gravity: 17, maxFall: 40, slopeCos: Math.cos(46 * Fs), walkSlopeCos: Math.cos(62 * Fs), snapDown: 0.45, maxSub: 1 / 120, wadeStart: 0.3, swimEye: 0.25, swimSpeed: 1.55, swimSprint: 2.5, swimVert: 1.6, swimAccel: 2.8, floatK: 16, floatC: 7.5, climbReach: 1.3, waterClimb: 1.55, ladderSpeed: 1.7, softR: 1200, hardR: 1260 }, Ws = class {
  constructor(e3, t2 = {}) {
    this.ctx = e3, this.camera = e3.camera, this.params = e3.params, this.layout = e3.layout, this.G = e3.G, this.capture = !!e3.params.capture, this.testMode = e3.params.has(`playertest`), this.fly = !!e3.params.fly, this.active = false, this.time = 0;
    let n2 = e3.layout.PLAYER;
    this.radius = n2.radius ?? 0.32, this.height = n2.height ?? 1.8, this.eye = n2.eyeHeight ?? 1.68, this.jumpV = Math.sqrt(2 * X.gravity * X.jumpH), this.q = new is({ collision: e3.collision, hf: e3.hf, kinds: t2.kinds });
    let r2 = e3.registry?.get(`water`);
    this._waterSurfaceFn = typeof r2?.surfaceAt == `function` ? r2.surfaceAt.bind(r2) : null, this._plunge = (e3.layout.WATERFALLS || []).map((e4) => [e4.pool[0], e4.pool[2], (e4.plungeR || 4) * 1.6]), this.pos = new M(), this.vel = new M(), this.mode = Is, this.grounded = false, this.steep = false, this.submerged = false, this.lastWalkY = 0, this.gnx = 0, this.gny = 1, this.gnz = 0, this.depthFeet = 0, this.surfaceY = e3.G.uWaterLevel.value, this.blockT = 0, this.airT = 0, this.jumpBuf = 0, this.jumped = false, this.mantleCool = 0, this.ladderLost = 0, this.ladNx = 0, this.ladNz = 0, this.mantle = { t: 0, dur: 1, x0: 0, y0: 0, z0: 0, x1: 0, y1: 0, z1: 0 }, this.stats = { substeps: 0, mantles: 0, respawns: 0, minClearance: 1 / 0 };
    let i2 = Qa(this.camera);
    this.yaw = i2.yaw, this.pitch = i2.pitch, this.baseFov = this.camera.fov, this.fov = this.camera.fov, this.camStep = 0, this.dip = 0, this.dipV = 0, this.bobPhase = 0, this.bobW = 0, this.sprinting = false, this.input = null, this.capture || (this.input = new hs(e3.renderer.domElement, { allowLock: !this.testMode }), this.input.onLook = (e4, t3) => {
      this.yaw = (this.yaw + e4) % 360, this.pitch = Hs(this.pitch - t3, -88, 88);
    }), this._sim = null, this._simState = { fwd: 0, strafe: 0, sprint: false, jump: false, jumpEdge: false, dive: false }, this._simJumpWas = false, this.fx = ws(), this.feel = new Ps(this), this.flight = new bs(this), this.input && (this.input.onFlight = (e4) => this.flight.toggle(e4));
  }
  start({ lock: e3 = false } = {}) {
    if (!this.capture) {
      if (this.active = true, this.input?.setEnabled(true), this.params.view || this.params.cam) {
        let e4 = this.camera.position;
        this.teleport(e4.x, e4.y - this.eye, e4.z, this.yaw, this.pitch);
      } else this.respawn();
      e3 && this.input?.requestLock(null);
    }
  }
  respawn() {
    let e3 = this.layout.PLAYER.spawn, t2 = this.q.terrain(e3.x, e3.z), n2 = this.q.probe(e3.x, e3.z, t2 + 2.5, t2 - 0.5);
    this.teleport(e3.x, n2 > -1 / 0 ? n2 : t2, e3.z, e3.yawDeg, e3.pitchDeg), this.stats.respawns++;
  }
  teleport(e3, t2, n2, r2 = this.yaw, i2 = this.pitch) {
    this.pos.set(e3, t2, n2), this.vel.set(0, 0, 0), this.yaw = r2, this.pitch = i2, this.mode = Is, this.submerged = false, this.jumped = false, this.jumpBuf = 0, this.airT = 0, this.blockT = 0, this.camStep = 0, this.dip = 0, this.dipV = 0, this.bobW = 0;
    let a2 = this.q.probe(e3, n2, t2 + 0.5, t2 - 0.5);
    this.grounded = a2 > -1 / 0, this.grounded && (this.pos.y = a2), this.lastWalkY = this.pos.y, this.surfaceY = this._surface(e3, n2);
    let o2 = this.surfaceY + X.swimEye - this.eye;
    this.pos.y < o2 - 0.07 && this._inWater(e3, n2) && (this.mode = Ls, this.grounded = false), this.fx && (this.fx._resync = true, this.feel.reset()), this._updateCamera(0);
  }
  update(e3, t2) {
    if (this.capture || !this.active) {
      this._writeUnderwater(e3, true), Es(this, e3);
      return;
    }
    let n2 = this._sim ?? this.input.poll();
    if (this.fly) this._fly(e3, n2);
    else {
      let t3 = Math.max(1, Math.ceil(e3 / X.maxSub - 1e-6)), r2 = e3 / t3, i2 = this.pos;
      this.surfaceY = this._surface(i2.x, i2.z);
      for (let e4 = 0; e4 < t3; e4++) this._substep(r2, n2, n2.jumpEdge && e4 === 0), this.time += r2;
      this.stats.substeps += t3, this._bounds(e3);
    }
    this._updateCamera(e3), this.feel.afterCamera(e3), this._writeUnderwater(e3, false), Es(this, e3);
  }
  _substep(e3, t2, n2) {
    if (this.mantleCool > 0 && (this.mantleCool -= e3), this.mode === Rs) {
      this._stepMantle(e3);
      return;
    }
    let r2 = this.yaw * Fs, i2 = Math.sin(r2), a2 = -Math.cos(r2), o2 = Math.cos(r2), s2 = Math.sin(r2), c2 = i2 * t2.fwd + o2 * t2.strafe, l2 = a2 * t2.fwd + s2 * t2.strafe, u2 = Math.sqrt(c2 * c2 + l2 * l2);
    u2 > 1 && (c2 /= u2, l2 /= u2, u2 = 1), this.mode === Ls ? this._stepSwim(e3, t2, c2, l2, u2, i2, a2, o2, s2) : this.mode === zs ? this._stepClimb(e3, t2, n2) : this._stepWalk(e3, t2, c2, l2, u2, n2);
  }
  _stepWalk(e3, t2, n2, r2, i2, a2) {
    let o2 = this.pos, s2 = this.vel, c2 = this.q, l2 = X, u2 = this.surfaceY, d2 = o2.y < u2 && this._inWater(o2.x, o2.z) ? u2 - o2.y : 0;
    this.depthFeet = d2;
    let f2 = Hs((d2 - l2.wadeStart) / 0.9, 0, 1), p2 = 1 - 0.6 * f2 * (2 - f2);
    this.sprinting = t2.sprint && i2 > 0.1 && t2.fwd >= 0;
    let m2 = (this.sprinting ? l2.sprint : l2.walk) * p2 * this.feel.speedMul, h2;
    h2 = this.grounded && !this.steep ? i2 > 0.01 ? l2.accel : l2.decel : this.grounded ? 0.6 : l2.airAccel;
    let g2 = 1 - Math.exp(-h2 * e3);
    s2.x += (n2 * m2 - s2.x) * g2, s2.z += (r2 * m2 - s2.z) * g2, this.jumpBuf = a2 ? 0.12 : Math.max(0, this.jumpBuf - e3);
    let _2 = !this.grounded && !this.jumped && this.airT < 0.12 && s2.y <= 0.5;
    if (this.jumpBuf > 0 && (this.grounded && !this.steep || _2)) {
      if (this.jumpBuf = 0, this.grounded && i2 > 0.3 && this._pushingWall(n2, r2) && this._tryMantle(n2 / i2, r2 / i2, l2.climbReach)) return;
      s2.y = this.jumpV * (d2 > 0.6 ? 0.5 : 1), this.grounded = false, this.jumped = true, this.airT = 0;
    }
    if (!this.grounded) s2.y -= l2.gravity * e3, d2 > 0 && (s2.y *= Math.exp(-2.4 * Math.min(1, d2 / 1.2) * e3)), s2.y < -l2.maxFall && (s2.y = -l2.maxFall), this.airT += e3;
    else if (this.steep) {
      let t3 = Math.hypot(this.gnx, this.gnz) || 1, n3 = l2.gravity * Math.sqrt(Math.max(0, 1 - this.gny * this.gny)) * 0.8;
      s2.x += this.gnx / t3 * n3 * e3, s2.z += this.gnz / t3 * n3 * e3;
    }
    let v2 = o2.x, y2 = o2.y, b2 = o2.z;
    o2.x += s2.x * e3, o2.z += s2.z * e3, this._collideBody(s2), o2.y += s2.y * e3;
    let x2 = this.grounded, S2 = s2.y > 0.5 ? o2.y + 0.02 : Math.max(y2, o2.y) + l2.stepH, C2 = o2.y - (x2 && s2.y <= 0 ? l2.snapDown : 0) - 1e-3, w2 = c2.probe(o2.x, o2.z, S2, C2);
    this._blocked(w2, y2, S2) && (this._clipUphill(v2, b2), w2 = c2.probe(o2.x, o2.z, S2, C2), this._blocked(w2, y2, S2) && (o2.x = v2, o2.z = b2, w2 = c2.probe(o2.x, o2.z, S2, C2)));
    let T2 = c2.sup;
    if (w2 > -1 / 0 ? (x2 ? Math.abs(w2 - y2) > 0.03 && (this.camStep += w2 - y2) : this._land(-s2.y), o2.y = w2, s2.y < 0 && (s2.y = 0), this.grounded = true, this.gnx = T2.nx, this.gny = T2.ny, this.gnz = T2.nz, this.steep = !Us(T2), this.steep || (this.lastWalkY = o2.y), this.airT = 0, this.jumped = false) : (this.grounded = false, this.steep = false, this.lastWalkY = o2.y), this._terrainSafety(), i2 > 0.3 && t2.fwd > 0) {
      if (this.blockT += e3, !this.grounded && t2.jump && s2.y < 3 && this._pushingWall(n2, r2) && this._tryMantle(n2 / i2, r2 / i2, l2.climbReach - 0.2) || d2 > 0.45 && this.blockT > 0.3 && this._climbTick(e3) && this._tryMantle(n2 / i2, r2 / i2, Math.max(l2.climbReach, u2 + l2.waterClimb - o2.y), 0.5)) return;
    } else this.blockT = 0;
    if (this.q.ladder && t2.fwd > 0.3 && n2 * this.q.ladderNx + r2 * this.q.ladderNz < -0.4 * i2) {
      this._enterClimb();
      return;
    }
    if (o2.y < u2) {
      let e4 = u2 + l2.swimEye - this.eye;
      o2.y < e4 - 0.07 && this._inWater(o2.x, o2.z) && (this.mode = Ls, this.grounded = false, this.submerged = o2.y + this.eye < u2 - 0.6);
    }
  }
  _blocked(e3, t2, n2) {
    let r2 = this.q, i2 = X;
    return r2.terrain(this.pos.x, this.pos.z, null) > n2 + 1e-3 ? (r2.terrain(this.pos.x, this.pos.z, r2._tn), r2.sup.nx = r2._tn.x, r2.sup.ny = r2._tn.y, r2.sup.nz = r2._tn.z, true) : e3 === -1 / 0 || e3 - t2 <= 0.01 || Us(r2.sup) ? false : e3 - this.lastWalkY > i2.stepH;
  }
  _clipUphill(e3, t2) {
    let n2 = this.pos, r2 = this.vel, i2 = this.q.sup, a2 = -i2.nx, o2 = -i2.nz, s2 = Math.hypot(a2, o2);
    if (s2 < 1e-4) {
      n2.x = e3, n2.z = t2;
      return;
    }
    a2 /= s2, o2 /= s2;
    let c2 = (n2.x - e3) * a2 + (n2.z - t2) * o2;
    c2 > 0 && (n2.x -= a2 * c2, n2.z -= o2 * c2);
    let l2 = r2.x * a2 + r2.z * o2;
    l2 > 0 && (r2.x -= a2 * l2, r2.z -= o2 * l2);
  }
  _terrainSafety() {
    let e3 = this.pos, t2 = this.q.terrain(e3.x, e3.z, null);
    e3.y < t2 - 0.02 && (e3.y = t2, this.vel.y < 0 && (this.vel.y = 0), this.mode === Is && (this.grounded = true));
  }
  _land(e3) {
    e3 > 2.5 && (this.dipV -= Math.min(1.6, (e3 - 2) * 0.16));
  }
  _collideBody(e3) {
    let t2 = this.q;
    t2.resolveCapsule(this.pos, this.radius, X.stepH, this.height, 3, this.grounded && this.mode === Is);
    for (let n2 = 0; n2 < t2.nContacts; n2++) {
      let r2 = t2.contacts[n2 * 2], i2 = t2.contacts[n2 * 2 + 1], a2 = e3.x * r2 + e3.z * i2;
      a2 < 0 && (e3.x -= r2 * a2, e3.z -= i2 * a2);
    }
    t2.ceiling && e3.y > 0 && (e3.y = 0), t2.lifted && e3.y < 0 && (e3.y = 0);
  }
  _pushingWall(e3, t2) {
    let n2 = this.q, r2 = Math.hypot(e3, t2) || 1;
    for (let i2 = 0; i2 < n2.nContacts; i2++) if ((n2.contacts[i2 * 2] * e3 + n2.contacts[i2 * 2 + 1] * t2) / r2 < -0.55) return true;
    return false;
  }
  _stepSwim(e3, t2, n2, r2, i2, a2, o2, s2, c2) {
    let l2 = this.pos, u2 = this.vel, d2 = this.q, f2 = X, p2 = this.surfaceY;
    if (!this._inWater(l2.x, l2.z) || l2.y > p2) {
      this.mode = Is, this.grounded = false, this.submerged = false;
      return;
    }
    let m2 = p2 + f2.swimEye - this.eye, h2 = l2.y + this.eye;
    this.depthFeet = p2 - l2.y, this.sprinting = false, t2.dive || h2 < p2 - 0.6 ? this.submerged = true : h2 > p2 - 0.22 && u2.y > -0.3 && (this.submerged = false);
    let g2 = (t2.sprint ? f2.swimSprint : f2.swimSpeed) * this.feel.strokeMul, _2, v2 = 0, y2;
    if (this.submerged) {
      let e4 = this.pitch * Fs, n3 = Math.cos(e4), r3 = Math.sin(e4);
      _2 = a2 * n3 * t2.fwd + s2 * t2.strafe, y2 = o2 * n3 * t2.fwd + c2 * t2.strafe, v2 = r3 * t2.fwd;
      let i3 = Math.sqrt(_2 * _2 + v2 * v2 + y2 * y2);
      i3 > 1 && (_2 /= i3, v2 /= i3, y2 /= i3), _2 *= g2, v2 *= g2, y2 *= g2, t2.jump && (v2 += f2.swimVert), t2.dive && (v2 -= f2.swimVert), !t2.jump && !t2.dive && Math.abs(t2.fwd) < 0.1 && (v2 += this.feel.buoyancy);
    } else _2 = n2 * g2, y2 = r2 * g2, t2.fwd > 0.1 && this.pitch < -40 && (this.submerged = true, v2 = Math.sin(this.pitch * Fs) * g2 * t2.fwd);
    let b2 = 1 - Math.exp(-f2.swimAccel * e3);
    if (u2.x += (_2 - u2.x) * b2, u2.z += (y2 - u2.z) * b2, this.submerged) u2.y += (v2 - u2.y) * (1 - Math.exp(-2.6 * e3));
    else {
      let n3 = m2 + (0.028 * Math.sin(this.time * 1.35) + 0.012 * Math.sin(this.time * 2.7 + 1.3)) + (t2.jump ? 0.1 : 0);
      u2.y += ((n3 - l2.y) * f2.floatK - u2.y * f2.floatC) * e3;
    }
    l2.x += u2.x * e3, l2.z += u2.z * e3, this._collideBody(u2), l2.y += u2.y * e3, l2.y > m2 + 0.35 && (l2.y = m2 + 0.35, u2.y > 0 && (u2.y = 0));
    let x2 = d2.probe(l2.x, l2.z, l2.y + f2.stepH, l2.y - 1e-3);
    if (x2 > -1 / 0 && (l2.y < x2 && (l2.y = x2, u2.y < 0 && (u2.y = 0)), x2 >= m2)) {
      this.mode = Is, this.grounded = true, this.submerged = false, this.gnx = d2.sup.nx, this.gny = d2.sup.ny, this.gnz = d2.sup.nz, this.steep = !Us(d2.sup), this.lastWalkY = l2.y, u2.y = 0;
      return;
    }
    if (this._terrainSafety(), !this.submerged && i2 > 0.3 && t2.fwd > 0.3) {
      if (this.blockT += e3, this.blockT > 0.15 && this._climbTick(e3) && this._tryMantle(n2 / i2, r2 / i2, p2 + f2.waterClimb - l2.y, p2 + 0.15 - l2.y)) return;
    } else this.blockT = 0;
    d2.ladder && t2.fwd > 0.3 && n2 * d2.ladderNx + r2 * d2.ladderNz < -0.4 * i2 && this._enterClimb();
  }
  _climbTick(e3) {
    return this._climbAcc = (this._climbAcc || 0) + e3, this._climbAcc < 1 / 15 ? false : (this._climbAcc = 0, true);
  }
  _tryMantle(e3, t2, n2, r2 = 0.3) {
    if (this.mantleCool > 0) return false;
    let i2 = this.pos, a2 = this.q, o2 = this.radius, s2 = o2 + 0.42, c2 = i2.x + e3 * s2, l2 = i2.z + t2 * s2, u2 = a2.probe(c2, l2, i2.y + n2, i2.y + r2, false);
    if (u2 === -1 / 0 || !Us(a2.sup) || a2.probe(c2 + e3 * 0.3, l2 + t2 * 0.3, u2 + 0.3, u2 - 0.35, false) === -1 / 0 || a2.overlaps(c2, u2, l2, o2, 0.06, this.height) || a2.overlaps(i2.x, u2, i2.z, o2 * 0.85, 0.06, this.height) || a2.overlaps((i2.x + c2) * 0.5, u2, (i2.z + l2) * 0.5, o2 * 0.85, 0.06, this.height)) return false;
    let d2 = this.mantle;
    return d2.t = 0, d2.x0 = i2.x, d2.y0 = i2.y, d2.z0 = i2.z, d2.x1 = c2, d2.y1 = u2, d2.z1 = l2, d2.dur = 0.5 + 0.45 * Hs((u2 - i2.y) / 2.2, 0, 1), this.mode = Rs, this.vel.set(0, 0, 0), this.submerged = false, this.stats.mantles++, true;
  }
  _stepMantle(e3) {
    let t2 = this.pos, n2 = this.mantle;
    n2.t += e3;
    let r2 = Math.min(1, n2.t / n2.dur), i2 = Vs(0, 0.62, r2), a2 = Vs(0.38, 1, r2);
    t2.x = n2.x0 + (n2.x1 - n2.x0) * a2, t2.z = n2.z0 + (n2.z1 - n2.z0) * a2, t2.y = n2.y0 + (n2.y1 + 0.02 - n2.y0) * i2, r2 >= 1 && (t2.set(n2.x1, n2.y1, n2.z1), this.mode = Is, this.grounded = true, this.steep = false, this.lastWalkY = n2.y1, this.vel.set(0, 0, 0), this.mantleCool = 0.35, this.camStep = 0);
  }
  _enterClimb() {
    this.mode = zs, this.ladNx = this.q.ladderNx, this.ladNz = this.q.ladderNz, this.vel.set(0, 0, 0), this.ladderLost = 0, this.grounded = false, this.submerged = false;
  }
  _stepClimb(e3, t2, n2) {
    let r2 = this.pos, i2 = this.vel, a2 = this.q, o2 = X, s2 = 0;
    if (t2.fwd > 0.3 || t2.jump ? s2 = o2.ladderSpeed : (t2.fwd < -0.3 || t2.dive) && (s2 = -o2.ladderSpeed), n2 && t2.fwd <= 0.3) {
      this.mode = Is, i2.set(this.ladNx * 2.5, 3, this.ladNz * 2.5);
      return;
    }
    if (i2.set(-this.ladNx * 0.5, s2, -this.ladNz * 0.5), r2.x += i2.x * e3, r2.z += i2.z * e3, this._collideBody(i2), r2.y += s2 * e3, a2.ceiling && s2 > 0 && (r2.y -= s2 * e3), a2.ladder ? (this.ladderLost = 0, this.ladNx = a2.ladderNx, this.ladNz = a2.ladderNz) : (this.ladderLost += e3, s2 > 0 && (r2.y -= s2 * e3)), s2 > 0 && this._tryMantle(-this.ladNx, -this.ladNz, 1.4, 0.1)) return;
    let c2 = a2.probe(r2.x, r2.z, r2.y + 0.05, r2.y - 0.05);
    if (c2 > -1 / 0 && s2 <= 0) {
      r2.y = Math.max(r2.y, c2), this.mode = Is, this.grounded = true, this.lastWalkY = r2.y;
      return;
    }
    this.ladderLost > 0.25 && (this.mode = Is, this.grounded = false, i2.set(0, 0, 0)), this._terrainSafety();
    let l2 = this.surfaceY;
    r2.y < l2 + X.swimEye - this.eye - 0.07 && this._inWater(r2.x, r2.z) && (this.mode = Ls);
  }
  _fly(e3, t2) {
    this.flight.update(e3, t2);
  }
  _bounds(e3) {
    let t2 = this.pos, n2 = this.vel, r2 = X;
    if (!Number.isFinite(t2.x + t2.y + t2.z) || t2.y < -30) {
      this.respawn();
      return;
    }
    let i2 = Math.hypot(t2.x, t2.z);
    if (i2 > r2.hardR + 200) {
      this.respawn();
      return;
    }
    if (i2 > r2.softR) {
      let a2 = t2.x / i2, o2 = t2.z / i2, s2 = n2.x * a2 + n2.z * o2, c2 = Vs(r2.softR, r2.hardR, i2);
      s2 > 0 && (n2.x -= a2 * s2 * c2, n2.z -= o2 * s2 * c2), n2.x -= a2 * c2 * 3 * e3 * 10, n2.z -= o2 * c2 * 3 * e3 * 10, i2 > r2.hardR && (t2.x = a2 * r2.hardR, t2.z = o2 * r2.hardR);
    }
  }
  _updateCamera(e3) {
    let t2 = this.camera, n2 = this.pos, r2 = this.vel, i2 = X, a2 = Math.exp(-e3 * 11);
    this.camStep = Hs(this.camStep * a2, -0.6, 0.6), Math.abs(this.camStep) < 1e-4 && (this.camStep = 0), this.dipV += (-this.dip * 110 - this.dipV * 21) * e3, this.dip += this.dipV * e3;
    let o2 = Math.hypot(r2.x, r2.z), s2 = this.mode === Is && this.grounded && !this.fly, c2 = s2 ? Hs(o2 / i2.walk, 0, 1.3) : 0;
    this.bobW += (c2 - this.bobW) * (1 - Math.exp(-e3 * 7));
    let l2 = Hs((o2 - i2.walk) / (i2.sprint - i2.walk), 0, 1), u2 = 0.72 + 0.26 * l2;
    s2 && (this.bobPhase += o2 * e3 / u2 * Math.PI);
    let d2 = (0.024 + 0.014 * l2) * this.bobW, f2 = (Math.abs(Math.sin(this.bobPhase)) - 0.6366) * d2 * 1.5, p2 = Math.sin(this.bobPhase) * 0.01 * this.bobW, m2 = this.yaw * Fs, h2 = Math.cos(m2), g2 = Math.sin(m2);
    t2.position.set(n2.x + h2 * p2, n2.y + this.eye - this.camStep + this.dip + f2, n2.z + g2 * p2);
    let _2 = this.baseFov + (this.sprinting && o2 > i2.walk + 0.8 && this.grounded ? 3.5 : 0);
    this.fov += (_2 - this.fov) * (1 - Math.exp(-e3 * 4)), Math.abs(t2.fov - this.fov) > 0.01 && (t2.fov = this.fov, t2.updateProjectionMatrix()), Xa(t2, this.yaw, this.pitch), t2.updateMatrixWorld();
  }
  _surface(e3, t2) {
    return this._waterSurfaceFn ? this._waterSurfaceFn(e3, t2) : this.G.uWaterLevel.value;
  }
  _inWater(e3, t2) {
    let n2 = this._surface(e3, t2);
    if (this.q.terrain(e3, t2, null) >= n2 - 0.01) return false;
    if (this.ctx.hf.lagoonSDF(e3, t2) < 8) return true;
    for (let n3 = 0; n3 < this._plunge.length; n3++) {
      let r2 = this._plunge[n3], i2 = e3 - r2[0], a2 = t2 - r2[1];
      if (i2 * i2 + a2 * a2 < r2[2] * r2[2]) return true;
    }
    return false;
  }
  _writeUnderwater(e3, t2) {
    let n2 = this.camera.position, r2 = this._surface(n2.x, n2.z), i2 = 0;
    n2.y < r2 + 0.06 && this._inWater(n2.x, n2.z) && (i2 = Vs(-0.03, 0.05, r2 - n2.y));
    let a2 = this.G.uCameraUnderwater;
    t2 || !(e3 > 0) ? a2.value = i2 : a2.value += (i2 - a2.value) * (1 - Math.exp(-e3 * 30)), a2.value < 1e-4 ? a2.value = 0 : a2.value > 0.9999 && (a2.value = 1);
  }
  prewarm() {
    if (this.capture) return;
    let e3 = this.camera, t2 = { p: e3.position.clone(), q: e3.quaternion.clone(), fov: e3.fov }, n2 = this.active;
    this.active = true;
    let r2 = this.fly;
    this.fx.mute = true;
    let i2 = this.layout.PLAYER.spawn;
    this.teleport(i2.x, this.q.terrain(i2.x, i2.z), i2.z, i2.yawDeg, 0), this.simulate([{ fwd: 1, n: 20 }, { fwd: 1, sprint: true, n: 20 }, { jump: true, n: 30 }, { strafe: 1, n: 10 }]), this.teleport(-6, -1.43, 8, 0, 0), this.simulate([{ fwd: 1, n: 20 }, { dive: true, n: 20 }, { jump: true, n: 20 }]), this._tryMantle(1, 0, 1.2), this.mode = Is, this.flight.set(true, false, true), this.simulate([{ fwd: 1, sprint: true, jump: true, n: 10 }]), this.flight.set(false, false, true), this.simulate([{ n: 5 }]), this.flight.set(r2, false, true), this.flight.falling = false, this.fx.mute = false, this.fx._resync = true, this.feel.reset(), this.active = n2, this.stats.substeps = 0, this.stats.mantles = 0, this.vel.set(0, 0, 0), e3.position.copy(t2.p), e3.quaternion.copy(t2.q), e3.fov = t2.fov, this.fov = t2.fov, e3.updateProjectionMatrix();
    let a2 = Qa(e3);
    this.yaw = a2.yaw, this.pitch = a2.pitch, this.G.uCameraUnderwater.value = 0;
  }
  simulate(e3) {
    let t2 = this._simState;
    for (let n2 of e3) {
      let e4 = n2.n ?? 1, r2 = n2.dt ?? 1 / 60;
      n2.yaw != null && (this.yaw = n2.yaw), n2.pitch != null && (this.pitch = n2.pitch), t2.fwd = n2.fwd ?? 0, t2.strafe = n2.strafe ?? 0, t2.sprint = !!n2.sprint, t2.dive = !!n2.dive;
      let i2 = !!n2.jump;
      for (let a2 = 0; a2 < e4; a2++) t2.jump = i2, t2.jumpEdge = i2 && !this._simJumpWas, this._simJumpWas = i2, this._sim = t2, this.update(r2, this.time), this._sim = null, n2.onStep && n2.onStep(this);
    }
    return this.snapshot();
  }
  snapshot() {
    let e3 = this.pos;
    return { x: +e3.x.toFixed(3), y: +e3.y.toFixed(3), z: +e3.z.toFixed(3), eye: +this.camera.position.y.toFixed(3), mode: Bs[this.mode], fly: this.fly, grounded: this.grounded, steep: this.steep, submerged: this.submerged, depthFeet: +this.depthFeet.toFixed(3), speed: +Math.hypot(this.vel.x, this.vel.z).toFixed(3), vy: +this.vel.y.toFixed(3), yaw: +this.yaw.toFixed(1), pitch: +this.pitch.toFixed(1), underwater: +this.G.uCameraUnderwater.value.toFixed(3), surfaceY: this.surfaceY };
  }
}, Gs = 0.85, Ks = class {
  constructor(e3 = false) {
    this.el = document.getElementById(`loader`), this.bar = document.getElementById(`loader-bar`), this.track = this.bar?.parentElement ?? null, this.label = document.getElementById(`loader-label`), this.gate = document.getElementById(`gate`), this.hint = document.getElementById(`hint`), this._p = 0, this._pct = -1, this._ph = { f0: 0, f1: 0, ms: 0, t0: 0 }, this._anim = null, this._shown = 0, this.hidden = e3, this.bar && (this.bar.style.transition = `none`), e3 && this.el?.classList.add(`gone`);
  }
  _current() {
    if (!this.bar) return this._p;
    let e3 = /matrix\(([-\d.e]+)/.exec(getComputedStyle(this.bar).transform || ``);
    return e3 ? Math.min(1, Math.max(0, +e3[1])) : this._shown;
  }
  _animate(e3, t2, n2) {
    let r2 = this.bar;
    if (!r2 || this.hidden) return;
    let i2 = this._current();
    e3 = Math.max(i2, e3), t2 = Math.max(e3, t2);
    let a2 = e3 > i2 + 1e-4 ? 350 : 0, o2 = a2 + Math.max(0, n2), s2 = [{ transform: `scaleX(${i2})`, offset: 0 }];
    if (a2 && o2 > a2 && s2.push({ transform: `scaleX(${e3})`, offset: a2 / o2, easing: `linear` }), s2.push({ transform: `scaleX(${o2 > a2 ? t2 : e3})`, offset: 1 }), s2[0].easing = a2 ? `ease-out` : `linear`, this._anim?.cancel(), o2 <= 0) {
      r2.style.transform = `scaleX(${e3})`, this._anim = null, this._shown = e3;
      return;
    }
    r2.style.transform = `scaleX(${i2})`;
    try {
      this._anim = r2.animate(s2, { duration: o2, fill: `forwards` });
    } catch {
      r2.style.transform = `scaleX(${e3})`, this._anim = null;
    }
    this._shown = o2 > a2 ? t2 : e3;
  }
  _creepTarget(e3) {
    let { f0: t2, f1: n2, ms: r2, t0: i2 } = this._ph, a2 = t2 + (n2 - t2) * Gs;
    if (e3 >= a2 || r2 <= 0) return { to: e3, ms: 0 };
    let o2 = performance.now() - i2, s2 = n2 > t2 ? (e3 - t2) / (n2 - t2) : 1;
    return { to: a2, ms: Math.max(r2 * (Gs - s2), r2 * Gs - o2, 250) };
  }
  phase(e3, t2, n2) {
    this._ph = { f0: e3, f1: t2, ms: n2, t0: performance.now() };
    let r2 = Math.max(this._p, e3);
    this._p = r2;
    let i2 = this._creepTarget(r2);
    this._animate(r2, i2.to, i2.ms), this._aria(r2);
  }
  progress(e3, t2) {
    if (e3 = Math.min(1, e3), t2 && this.label && this.label.textContent !== t2 && (this.label.textContent = t2), e3 <= this._p + 4e-3) return;
    this._p = e3;
    let n2 = this._creepTarget(e3);
    this._animate(e3, n2.to, n2.ms), this._aria(e3);
  }
  _aria(e3) {
    let t2 = Math.round(e3 * 100);
    t2 !== this._pct && this.track && (this._pct = t2, this.track.setAttribute(`aria-valuenow`, String(t2)));
  }
  hide() {
    this._anim?.cancel(), this.el?.classList.add(`gone`);
  }
  ready(e3) {
    this._ph = { f0: 1, f1: 1, ms: 0, t0: performance.now() }, this._p = 1, this._animate(1, 1, 0), this._aria(1), this.label && (this.label.textContent = `Ready`), this.el?.classList.add(`done`), this.gate?.removeAttribute(`disabled`);
    let t2 = (e4) => !!(e4 && e4.closest && e4.closest(`.qs`));
    try {
      t2(document.activeElement) || this.gate?.focus({ preventScroll: true });
    } catch {
    }
    let n2 = false, r2 = (i2) => {
      i2.isTrusted && !n2 && (i2.type === `keydown` && (i2.repeat || i2.key === `Escape` || i2.key === `Tab` || i2.metaKey || i2.ctrlKey || i2.altKey) || i2.type === `keydown` && t2(i2.target) || (n2 = true, this.el?.classList.add(`gone`), window.removeEventListener(`keydown`, r2), this.gate?.removeEventListener(`click`, r2), e3(), this.hint && (this.hint.classList.add(`show`), setTimeout(() => this.hint.classList.remove(`show`), 7e3))));
    };
    this.gate?.addEventListener(`click`, r2), window.addEventListener(`keydown`, r2);
  }
}, qs = (e3) => e3 && e3[0].toUpperCase() + e3.slice(1), Js = 0;
function Z(e3, t2, n2) {
  let r2 = document.createElement(e3);
  return t2 && (r2.className = t2), n2 != null && (r2.textContent = n2), r2;
}
function Ys(e3, { engine: t2, quality: n2, context: r2 = `loader`, scale: i2 = true } = {}) {
  if (!e3 || !n2) return null;
  let a2 = `qs${++Js}`, o2 = n2.auto || {}, s2 = n2.choice || `auto`, c2 = o2.tier || n2.name, l2 = o2.gpuShort || ``, u2 = [`auto`, ...Le], d2 = (e4) => e4 === `auto` ? `Auto` : Re[e4]?.label ?? qs(e4), f2 = [qs(c2), l2].filter(Boolean).join(` \xB7 `), p2 = (e4) => e4 === `auto` ? `Picks ${qs(c2)} for ${l2 ? `your ${l2}` : `this device`}. Recommended.` : Re[e4]?.note ?? ``, m2 = Z(`div`, `qs qs--${r2}`), h2 = Z(`button`, `qs-trigger`);
  h2.type = `button`, h2.setAttribute(`aria-haspopup`, `dialog`), h2.setAttribute(`aria-expanded`, `false`), h2.setAttribute(`aria-controls`, `${a2}-panel`);
  let g2 = Z(`span`, `qs-k`, `Quality`), _2 = Z(`span`, `qs-v`), v2 = Z(`span`, `qs-chev`);
  v2.setAttribute(`aria-hidden`, `true`), h2.append(g2, _2, v2);
  let y2 = Z(`div`, `qs-panel`);
  y2.id = `${a2}-panel`, y2.setAttribute(`role`, `dialog`), y2.setAttribute(`aria-label`, `Graphics settings`), y2.hidden = true;
  let b2 = Z(`div`, `qs-h`, `Quality`);
  b2.id = `${a2}-h`;
  let x2 = Z(`div`, `qs-list`);
  x2.setAttribute(`role`, `radiogroup`), x2.setAttribute(`aria-labelledby`, b2.id);
  let S2 = u2.map((e4) => {
    let t3 = Z(`button`, `qs-opt`);
    t3.type = `button`, t3.dataset.choice = e4, t3.setAttribute(`role`, `radio`);
    let n3 = e4 === s2;
    t3.setAttribute(`aria-checked`, n3 ? `true` : `false`), t3.tabIndex = n3 ? 0 : -1;
    let r3 = Z(`span`, `qs-dot`);
    r3.setAttribute(`aria-hidden`, `true`);
    let i3 = Z(`span`, `qs-name`, d2(e4));
    t3.append(r3, i3);
    let o3 = e4 === `auto` ? f2 : e4 === c2 ? `detected` : e4 === `cinematic` ? `heavy` : ``;
    return o3 && t3.append(Z(`span`, `qs-meta`, o3)), t3.setAttribute(`aria-describedby`, `${a2}-note`), x2.append(t3), t3;
  }), C2 = Z(`p`, `qs-note`);
  C2.id = `${a2}-note`, C2.setAttribute(`aria-live`, `polite`);
  let w2 = Z(`div`, `qs-scale`), T2 = Z(`label`, `qs-h qs-h--scale`, `Render scale`);
  T2.htmlFor = `${a2}-scale`;
  let E2 = Z(`input`, `qs-range`);
  E2.type = `range`, E2.id = `${a2}-scale`, E2.min = String(Ve), E2.max = String(He), E2.step = `0.05`;
  let D2 = Z(`output`, `qs-out`);
  D2.htmlFor = E2.id, w2.append(T2, E2, D2);
  let ee2 = Z(`p`, `qs-fine`, i2 ? `Quality changes reload the village \xB7 render scale applies instantly` : `Choosing a quality reloads the village`);
  y2.append(b2, x2, C2, ...i2 ? [w2] : [], ee2), m2.append(y2, h2), e3.append(m2);
  let O2 = false, k2 = false, te2 = () => Ke(t2?.renderScale ?? 1), A2 = () => {
    let e4 = s2 === `auto` ? `Auto \xB7 ${f2}` : d2(s2), t3 = te2();
    _2.textContent = Math.abs(t3 - 1) > 1e-3 ? `${e4} \xB7 ${t3.toFixed(2)}\xD7` : e4, h2.setAttribute(`aria-label`, `Quality: ${_2.textContent}. Open graphics settings`);
  }, ne2 = () => {
    let e4 = te2();
    E2.value = String(e4);
    let n3 = t2?.canvas, r3 = n3 && n3.width > 0 ? ` \xB7 ${n3.width}\xD7${n3.height}` : ``;
    D2.value = `${e4.toFixed(2)}\xD7${r3}`, D2.textContent = D2.value, E2.setAttribute(`aria-valuetext`, `${e4.toFixed(2)} times`);
    let i3 = (e4 - Ve) / (He - Ve);
    E2.style.setProperty(`--f`, String(Math.min(1, Math.max(0, i3))));
  }, re2 = (e4) => {
    k2 || (C2.textContent = p2(e4));
  }, ie2 = (e4, t3 = true) => {
    if (!k2 || e4) {
      if (O2 = e4, y2.hidden = !e4, m2.classList.toggle(`open`, e4), h2.setAttribute(`aria-expanded`, e4 ? `true` : `false`), e4) {
        for (let e5 of S2) e5.tabIndex = e5.getAttribute(`aria-checked`) === `true` ? 0 : -1;
        ne2(), A2(), re2(s2), t3 && (S2.find((e5) => e5.tabIndex === 0) ?? S2[0]).focus({ preventScroll: true });
      } else t3 && m2.contains(document.activeElement) && h2.focus({ preventScroll: true });
    }
  }, ae2 = (e4) => {
    if (k2) return;
    let t3 = new URL(location.href), n3 = t3.searchParams.has(`q`);
    if (e4 === s2 && !n3 && r2 !== `fatal`) {
      ie2(false);
      return;
    }
    let i3 = Ge(e4);
    t3.searchParams.delete(`q`), !i3 && e4 !== `auto` && t3.searchParams.set(`q`, e4), k2 = true, m2.classList.add(`busy`);
    for (let t4 of S2) t4.setAttribute(`aria-checked`, t4.dataset.choice === e4 ? `true` : `false`), t4.disabled = true;
    C2.textContent = `Reloading the village in ${d2(e4)}${e4 === `auto` ? ` (${qs(c2)})` : ``}\u2026`, setTimeout(() => {
      t3.href === location.href ? location.reload() : location.replace(t3.href);
    }, 120);
  };
  h2.addEventListener(`click`, () => ie2(!O2));
  for (let e4 of S2) e4.addEventListener(`click`, () => ae2(e4.dataset.choice)), e4.addEventListener(`mouseenter`, () => re2(e4.dataset.choice)), e4.addEventListener(`focus`, () => re2(e4.dataset.choice));
  x2.addEventListener(`mouseleave`, () => {
    let e4 = document.activeElement;
    re2(e4 && e4.dataset?.choice ? e4.dataset.choice : s2);
  }), x2.addEventListener(`keydown`, (e4) => {
    let t3 = S2.indexOf(document.activeElement);
    if (t3 < 0) return;
    let n3 = -1;
    e4.key === `ArrowDown` || e4.key === `ArrowRight` ? n3 = (t3 + 1) % S2.length : e4.key === `ArrowUp` || e4.key === `ArrowLeft` ? n3 = (t3 - 1 + S2.length) % S2.length : e4.key === `Home` ? n3 = 0 : e4.key === `End` && (n3 = S2.length - 1), !(n3 < 0) && (e4.preventDefault(), S2[t3].tabIndex = -1, S2[n3].tabIndex = 0, S2[n3].focus({ preventScroll: true }));
  }), E2.addEventListener(`input`, () => {
    t2?.setRenderScale && t2.setRenderScale(parseFloat(E2.value)), ne2(), A2();
  }), E2.addEventListener(`change`, () => {
    Je(te2()), A2();
  }), m2.addEventListener(`keydown`, (e4) => {
    document.pointerLockElement || (e4.stopPropagation(), e4.key === `Escape` && O2 && (e4.preventDefault(), ie2(false)));
  }), m2.addEventListener(`click`, (e4) => e4.stopPropagation()), m2.addEventListener(`mousedown`, (e4) => e4.stopPropagation());
  let j2 = false;
  return m2.addEventListener(`pointerdown`, (e4) => {
    j2 = true, e4.stopPropagation();
  }), document.addEventListener(`click`, (e4) => {
    j2 && !m2.contains(e4.target) && (e4.stopPropagation(), e4.preventDefault()), j2 = false;
  }, true), document.addEventListener(`pointerup`, () => {
    setTimeout(() => {
      j2 = false;
    }, 0);
  }, true), document.addEventListener(`pointerdown`, (e4) => {
    O2 && !m2.contains(e4.target) && ie2(false, false);
  }, true), document.addEventListener(`pointerlockchange`, () => {
    if (!document.pointerLockElement) {
      A2();
      return;
    }
    O2 && ie2(false, false), m2.contains(document.activeElement) && document.activeElement.blur();
  }), window.addEventListener(`resize`, () => {
    O2 && ne2();
  }), A2(), ne2(), requestAnimationFrame(() => m2.classList.add(`in`)), { el: m2, close: () => ie2(false, false), get open() {
    return O2;
  } };
}
var Xs = () => new Promise((e3) => requestAnimationFrame(() => e3())), Zs = () => new Promise((e3) => setTimeout(e3, 0)), Q = window.__lagoon = { ready: false, errors: [], modules: {}, timings: {}, timingsDetail: {}, stats: null, viewNames: Object.keys(Ce) };
function $(e3, t2) {
  console.error(`[lagoon] ${e3}:`, t2), Q.errors.push({ where: e3, message: String(t2?.stack || t2) });
}
function Qs(e3) {
  if (P.capture || P.has(`playertest`)) return;
  let t2 = document.getElementById(`fatal`);
  if (!t2 || !t2.hidden) return;
  Q.fatal = e3;
  try {
    Q.player?.input?.setEnabled(false);
  } catch {
  }
  try {
    document.pointerLockElement && document.exitPointerLock();
  } catch {
  }
  let n2 = Q.engine?.quality ?? null, r2 = false;
  if (!n2) {
    let e4 = null;
    try {
      let t3 = document.createElement(`canvas`).getContext(`webgl2`);
      t3 ? (e4 = Ye(t3), t3.getExtension(`WEBGL_lose_context`)?.loseContext()) : r2 = true;
    } catch {
      r2 = true;
    }
    try {
      n2 = $e(e4);
    } catch {
      n2 = null;
    }
  }
  let i2 = n2 ? Re[n2.name]?.label ?? n2.name : ``, a2 = n2 && n2.rank > 0 ? `, or choose a lower quality below` : ``, o2 = document.getElementById(`fatal-msg`);
  o2 && (o2.textContent = r2 ? `This browser could not start WebGL 2, which the village needs. Turn on hardware acceleration or try another browser, then reload.` : e3 === `lost` ? `The graphics card ran out of memory or was reset${i2 ? ` while drawing ${i2} quality` : ``}. Reload${a2}.` : `Something went wrong while building the village${i2 ? ` at ${i2} quality` : ``}. Reload${a2}.`), document.getElementById(`loader`)?.classList.add(`gone`), document.getElementById(`paused`)?.classList.remove(`show`), t2.hidden = false;
  let s2 = document.getElementById(`fatal-reload`);
  s2?.addEventListener(`click`, () => location.reload());
  try {
    s2?.focus({ preventScroll: true });
  } catch {
  }
  if (n2 && !r2) try {
    Ys(document.getElementById(`fatal-settings`), { engine: null, quality: n2, context: `fatal`, scale: false });
  } catch (e4) {
    console.error(`[lagoon] recovery menu:`, e4);
  }
}
var $s = { textures: 2500, sky: 2400, lighting: 20, terrain: 1200, water: 700, rocks: 1e3, trees: 2200, architecture: 2500, palms: 2500, vegetation: 2600, waterfalls: 450, ambient: 700, finalize: 300, prewarm: 4500 }, ec = `lagoon.bootTimings.v1`;
function tc(e3) {
  try {
    return JSON.parse(localStorage.getItem(ec) || `{}`)[e3] || null;
  } catch {
    return null;
  }
}
var nc = { low: 0.55, medium: 0.75, high: 0.9, ultra: 1, cinematic: 1.35 };
function rc(e3) {
  for (let t2 of [`ultra`, `high`, `cinematic`, `medium`, `low`]) {
    if (t2 === e3) continue;
    let n2 = tc(t2);
    if (!n2) continue;
    let r2 = (nc[e3] ?? 1) / (nc[t2] ?? 1), i2 = {};
    for (let e4 in n2) typeof n2[e4] == `number` && (i2[e4] = Math.round(n2[e4] * r2));
    return i2;
  }
  return null;
}
function ic(e3, t2) {
  try {
    let n2 = JSON.parse(localStorage.getItem(ec) || `{}`);
    n2[e3] = t2, localStorage.setItem(ec, JSON.stringify(n2));
  } catch {
  }
}
async function ac() {
  let e3 = performance.now();
  Q.bootStart = e3;
  let t2 = Q.timingsDetail, n2 = new Ks(P.capture), r2 = new Mn(document.getElementById(`app`)), { renderer: i2, scene: a2, camera: o2, pipeline: s2, quality: c2 } = r2;
  if (Q.engine = r2, Q.quality = c2.name, Q.gpuName = r2.gpu?.name ?? ``, Q.autoTier = c2.auto, Q.qualityChoice = c2.choice, Q.parallelCompile = r2.parallelCompile, r2.canvas.addEventListener(`webglcontextlost`, () => {
    Q.contextLost = true, $(`webgl`, `context lost`), r2.stop(), Qs(`lost`);
  }), !P.capture && !P.has(`playertest`)) try {
    Q.settings = { loader: Ys(document.getElementById(`loader-settings`), { engine: r2, quality: c2, context: `loader` }), pause: Ys(document.getElementById(`pause-settings`), { engine: r2, quality: c2, context: `pause` }) };
  } catch (e4) {
    $(`settings`, e4);
  }
  let l2 = new qa(a2), u2 = new Ja(a2, o2, c2), d2 = new Lo(i2, c2), f2 = new Jo(d2), p2 = /* @__PURE__ */ new Map();
  P.cam ? eo(o2, P.cam, P.fov) : eo(o2, P.view ?? `spawn`, P.fov);
  let m2 = Qo.filter((e4) => e4.always ? true : P.only ? P.only.includes(e4.name) : !P.skip.includes(e4.name)), h2 = new Map(m2.map((e4) => [e4.name, e4.load().then((e5) => ({ mod: e5 }), (e5) => ({ err: e5 }))])), g2 = tc(c2.name) ?? rc(c2.name), _2 = [`textures`, ...m2.map((e4) => e4.name), `finalize`, `prewarm`], v2 = (e4) => Math.max(20, g2?.[e4] ?? $s[e4] ?? (m2.find((t3) => t3.name === e4)?.weight ?? 2) * 400), y2 = _2.reduce((e4, t3) => e4 + v2(t3), 0), b2 = 0, x2 = null, S2 = (e4, t3, r3) => {
    e4 !== x2 && (x2 = e4, n2.phase(b2 / y2, (b2 + v2(e4)) / y2, v2(e4))), n2.progress((b2 + v2(e4) * Math.min(1, Math.max(0, t3))) / y2, r3);
  }, C2 = (e4) => {
    b2 += v2(e4);
  }, w2 = P.get(`prewarm`) !== `legacy`, T2 = /* @__PURE__ */ new WeakSet(), E2 = [], D2 = !m2.some((e4) => e4.name === `lighting`), ee2 = () => o2.layers.mask | 1 << et.WATER | 1 << et.FX | 1 << et.REFLECT_EXTRA, O2 = () => {
    a2.traverse((e4) => {
      if (!T2.has(e4)) {
        if (T2.add(e4), e4.isLight) {
          e4.layers.enableAll();
          return;
        }
        e4.layers.mask & ee2() && (e4.isMesh || e4.isPoints || e4.isLine || e4.isSprite) && e4.material && E2.push(e4);
      }
    });
  }, k2 = w2 && P.get(`spec`) !== `0`, te2 = () => {
    if (!k2 || !D2 || !E2.length) return;
    let e4 = performance.now(), n3 = E2;
    E2 = [];
    for (let e5 of n3) {
      let t3 = Array.isArray(e5.material) ? e5.material : [e5.material];
      for (let e6 of t3) e6 && !e6.userData?.noPatch && tr(e6);
    }
    try {
      r2.compileObjects(n3);
    } catch (e5) {
      $(`speculative compile`, e5);
    }
    t2.queueMs = (t2.queueMs ?? 0) + Math.round(performance.now() - e4);
  };
  O2();
  let A2 = performance.now();
  S2(`textures`, 0, `Weaving textures`);
  try {
    await d2.generate((e4, t3) => S2(`textures`, e4, `Weaving textures \xB7 ${t3}`));
  } catch (e4) {
    $(`textures`, e4);
  }
  Q.timings.textures = Math.round(performance.now() - A2), C2(`textures`);
  let ne2 = { THREE: fe, engine: r2, renderer: i2, scene: a2, camera: o2, pipeline: s2, quality: c2, params: P, G: F, LAYERS: et, layout: Te, hf: Vt, tex: d2, mats: f2, collision: l2, lanterns: u2, registry: p2, patchMaterial: tr, addMaterialHook: $n, addUpdate: (e4, t3) => r2.addUpdate(e4, t3), yieldFrame: Zs, progress: null };
  for (let e4 of m2) {
    let n3 = performance.now();
    ne2.progress = (t3, n4) => S2(e4.name, t3, n4 ?? `Building ${e4.name}`), ne2.progress(0, `Building ${e4.name}`), await Zs();
    try {
      let n4 = performance.now(), i3 = await h2.get(e4.name);
      if (i3.err) throw i3.err;
      let a3 = Math.round(performance.now() - n4);
      a3 > 4 && (t2[e4.name + `:importWait`] = a3);
      let o3 = await i3.mod.build(ne2);
      o3?.update && r2.addUpdate(o3.update, o3.order ?? 0), p2.set(e4.name, o3 ?? {}), Q.modules[e4.name] = `ok`;
    } catch (t3) {
      $(`module ${e4.name}`, t3), Q.modules[e4.name] = `error`;
    }
    Q.timings[e4.name] = Math.round(performance.now() - n3);
    try {
      O2(), e4.name === `lighting` && (D2 = true), te2();
    } catch (e5) {
      $(`adopt`, e5);
    }
    C2(e4.name);
  }
  let re2 = performance.now();
  S2(`finalize`, 0.2, `Settling the village`), await Zs();
  try {
    nr(a2);
  } catch (e4) {
    $(`patchScene`, e4);
  }
  let ie2 = P.get(`playertest`);
  if (ie2 === `mock`) try {
    await (await J(async () => {
      let { buildTestCourse: e4 } = await import("./testCourse-DoO9h4gw.js");
      return { buildTestCourse: e4 };
    }, [])).buildTestCourse(ne2);
  } catch (e4) {
    $(`player test course`, e4);
  }
  let ae2 = null;
  try {
    ae2 = es(l2);
  } catch (e4) {
    $(`collider kinds`, e4);
  }
  try {
    l2.finalize();
  } catch (e4) {
    $(`collision`, e4);
  }
  P.colliders && o2.layers.enable(et.COLLIDER), r2.addUpdate((e4, t3) => u2.update(e4, t3), 50), Q.registry = p2, Q.collision = l2;
  let j2 = null;
  try {
    j2 = new Ws(ne2, { kinds: ae2 }), r2.addUpdate((e4, t3) => j2.update(e4, t3), -10), Q.player = j2, P.capture || j2.prewarm();
  } catch (e4) {
    $(`player`, e4);
  }
  D2 = true, O2(), te2(), Q.timings.finalize = Math.round(performance.now() - re2), C2(`finalize`), S2(`prewarm`, 0, `Warming up the light`), await Zs();
  if (new URLSearchParams(location.search).has('extract')) {
    Q.ready = true; Q.captureContext = ne2; Q.THREE = fe;
    n2.hide(); return;
  }
  let oe2 = performance.now();
  try {
    w2 ? await oc(r2, p2, (e4) => S2(`prewarm`, e4, `Warming up the light`), t2) : await sc(r2, t2);
  } catch (e4) {
    $(`prewarm`, e4);
    try {
      await sc(r2, t2);
    } catch (e5) {
      $(`prewarm fallback`, e5);
    }
  }
  if (Q.timings.prewarm = Math.round(performance.now() - oe2), C2(`prewarm`), Q.timings.total = Math.round(performance.now() - e3), Q.programs = i2.info.programs?.length ?? 0, !Q.errors.length && !P.only && !P.skip.length && ic(c2.name, Q.timings), Q.goto = async (e4, t3 = 12) => {
    let n3 = r2.running;
    r2.stop();
    let i3 = Q.player, a3 = i3?.active;
    i3 && (i3.active = false), typeof e4 == `string` && e4.includes(`,`) ? eo(o2, e4.split(`,`).map(parseFloat)) : eo(o2, e4);
    for (let e5 = 0; e5 < t3; e5++) r2.step(1 / 60), await Xs();
    i3 && (i3.active = a3), (n3 || P.capture) && r2.start();
  }, P.capture) {
    P.cam ? eo(o2, P.cam, P.fov) : P.view && eo(o2, P.view, P.fov);
    let e4 = P.num(`frames`, 12);
    for (let t3 = 0; t3 < e4; t3++) r2.step(1 / 60), await Xs();
    Q.stats = { ...s2.stats, programsAfter: i2.info.programs?.length ?? 0 }, n2.hide(), Q.readyAt = performance.now(), Q.ready = true, r2.start();
    return;
  }
  if (ie2 !== null) {
    n2.hide();
    try {
      j2?.start({ lock: false });
      let { PlayerTest: e4 } = await J(async () => {
        let { PlayerTest: e5 } = await import("./playerTest-DuF0uUeG.js");
        return { PlayerTest: e5 };
      }, []);
      j2 && (j2.test = new e4(ne2, j2));
    } catch (e4) {
      $(`player test`, e4);
    }
    Q.readyAt = performance.now(), Q.ready = true;
    return;
  }
  Q.fatal || n2.ready(() => {
    Q.fatal || (j2?.start({ lock: true }), r2.start());
  }), Q.readyAt = performance.now(), Q.ready = true, P.debug && J(() => import("./debug-Ddyy37ka.js").then((e4) => e4.mountDebug(r2, Q)), []).catch((e4) => $(`debug`, e4));
}
async function oc(e3, t2, n2, r2) {
  let { renderer: i2 } = e3, a2 = (() => {
    let e4 = performance.now();
    return (t3) => {
      let n3 = performance.now();
      r2[t3] = Math.round(n3 - e4), e4 = n3;
    };
  })(), o2 = () => i2.info.programs.length;
  r2.programsAtWarmStart = o2(), r2.readyAtWarmStart = o2() - e3.programsPending(), e3.update(1 / 60), r2.warmDraws = e3.compileFrame(1 / 60).draws, r2.programsQueued = o2(), a2(`capture`), n2(0.05), await e3.waitForPrograms((e4, t3) => n2(0.05 + 0.65 * (t3 ? e4 / t3 : 1))), a2(`compileWait`), r2.programsAfterCompile = o2();
  let s2 = t2.get(`lighting`);
  if (s2?.update) for (let t3 = 0; t3 < 24; t3++) s2.update(1 / 60, e3.time);
  let c2 = new Set(i2.info.programs);
  e3.drawAll(1 / 60), r2.programsAfterFirstFrame = o2();
  let l2 = i2.info.programs.filter((e4) => !c2.has(e4));
  l2.length && (Q.lateCompiles = l2.map((e4) => (e4.name || `?`) + ` | ` + e4.cacheKey.slice(0, 40) + ` \u2026 ` + e4.cacheKey.slice(-80))), a2(`firstFrame`), n2(0.8), e3.render(1 / 60), await Xs(), e3.step(1 / 60), r2.programsAfterSettle = o2(), a2(`settle`), n2(0.95), await e3.gpuIdle(), a2(`gpuIdle`), n2(1);
}
async function sc(e3, t2) {
  let { renderer: n2, scene: r2, camera: i2, pipeline: a2 } = e3, o2 = performance.now(), s2 = i2.layers.mask;
  i2.layers.enableAll(), n2.setRenderTarget(a2.opaqueRT), n2.compileAsync ? await n2.compileAsync(r2, i2) : n2.compile(r2, i2), n2.setRenderTarget(null), i2.layers.mask = s2, e3.params.colliders || i2.layers.disable(et.COLLIDER), t2.compileWait = Math.round(performance.now() - o2), t2.programsAfterCompile = n2.info.programs.length, o2 = performance.now();
  let c2 = [];
  r2.traverse((e4) => {
    e4.frustumCulled &&= (c2.push(e4), false);
  }), e3.step(1 / 60);
  for (let e4 of c2) e4.frustumCulled = true;
  t2.firstFrame = Math.round(performance.now() - o2), t2.programsAfterFirstFrame = n2.info.programs.length, o2 = performance.now();
  let l2 = { p: i2.position.clone(), q: i2.quaternion.clone(), fov: i2.fov };
  if (!e3.params.capture) for (let t3 of [`hero`, `originDeck`, `aerial`]) eo(i2, t3), e3.step(1 / 60), await Xs();
  i2.position.copy(l2.p), i2.quaternion.copy(l2.q), i2.fov = l2.fov, i2.updateProjectionMatrix(), t2.views = Math.round(performance.now() - o2);
}
ac().catch((e3) => {
  $(`boot`, e3);
  try {
    Qs(`boot`);
  } catch (e4) {
    console.error(`[lagoon] recovery screen:`, e4);
  }
});
export { Ga as a, en as c, F as d, Qa as i, Mt as l, to as n, Ha as o, eo as r, Ut as s, J as t, it as u };
