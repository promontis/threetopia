import{Dt as e,Lt as t,Rn as n,Yt as r,an as i,ar as a,do as o,ea as s,fa as c,ft as l,io as u,ir as d,jr as f,no as p,on as m,pn as h,ro as g,ta as _}from"./three.core-DtjtRha-.js";var v=32,y=[`walk`,`swim`,`mantle`,`climb`],b=class{constructor(e){this.ctx=e,this.hf=e.hf,this.camera=e.camera,this.eyeH=e.layout.PLAYER?.eyeHeight??1.68,this.waterY=e.layout.WATER_Y??0,this._plunge=(e.layout.WATERFALLS||[]).map(e=>[e.pool[0],e.pool[2],(e.plungeR||4)*1.6]),this.active=!1,this.source=`none`,this.mode=`walk`,this.flying=!1,this.fast=!1,this.feet=new g,this.vel=new g,this.eye=new g,this.speed=0,this.surfaceY=this.waterY,this.feetDepth=0,this.eyeDepth=-1,this.submerged=0,this.wading=!1,this.swimming=!1,this.diving=!1,this.inWater=!1,this.grounded=!0,this.heading=new p(0,-1),this.events=Array.from({length:v},()=>({type:``,x:0,y:0,z:0,strength:0})),this.nEvents=0,this._seenRef=Array(64).fill(null),this._seenT=new Float64Array(64).fill(NaN),this._seenSeq=-1,this._last=0,this._fxPrimed=!1,this._prevIn=!1,this._prevEyeUnder=!1,this._prevFeet=new g,this._havePrev=!1,this._stepAcc=0,this._strokeAcc=0,this._strokeSide=1,this._airVy=0,this._wasActive=!1}inWaterBody(e,t){let n=this.hf;if(n.waterDepthAt(e,t)<=.01)return!1;if(typeof n.lagoonSDF==`function`&&n.lagoonSDF(e,t)<8)return!0;for(let n=0;n<this._plunge.length;n++){let r=this._plunge[n],i=e-r[0],a=t-r[1];if(i*i+a*a<r[2]*r[2])return!0}return typeof n.lagoonSDF!=`function`}_push(e,t,n,r,i){if(this.nEvents>=v)return;let a=this.events[this.nEvents++];a.type=e,a.x=t,a.y=n,a.z=r,a.strength=i}update(e,t){this.nEvents=0;let n=(typeof window<`u`?window.__lagoon:null)?.player??null,r=this.camera;this.eye.copy(r.position);let i=`none`;n?n.active&&!n.capture&&(i=n.fx&&typeof n.fx==`object`&&n.fx.feet?`fx`:`player`):this.ctx.params?.capture||(i=`camera`),this.source=i;let a=this._wasActive;if(this.active=i!==`none`,this._wasActive=this.active,!this.active){this._dry(),this._havePrev=!1;return}i===`fx`?this._readFx(n.fx,!a):i===`player`?this._readPlayer(n,e):this._readCamera(e);let o=Math.hypot(this.vel.x,this.vel.z);if(o>.25)this.heading.set(this.vel.x/o,this.vel.z/o);else{let e=r.matrixWorld.elements,t=-e[8],n=-e[10],i=Math.hypot(t,n);i>.001&&this.heading.set(t/i,n/i)}i!==`fx`&&this._deriveEvents(e),this._prevFeet.copy(this.feet),this._havePrev=!0}_dry(){this.feetDepth=0,this.eyeDepth=-1,this.submerged=0,this.wading=!1,this.swimming=!1,this.diving=!1,this.inWater=!1,this.speed=0,this.vel.set(0,0,0),this._prevIn=!1,this._prevEyeUnder=!1}_readFx(e,t){this.mode=e.mode||`walk`,this.flying=!!e.flying||this.mode===`fly`,this.fast=!!e.fast,this.feet.copy(e.feet),e.vel?this.vel.copy(e.vel):this.vel.set(0,0,0),this.speed=Math.hypot(this.vel.x,this.vel.z),this.surfaceY=Number.isFinite(e.surfaceY)?e.surfaceY:this.waterY,this.feetDepth=Number.isFinite(e.feetDepth)?e.feetDepth:this.surfaceY-this.feet.y,this.eyeDepth=Number.isFinite(e.eyeDepth)?e.eyeDepth:this.surfaceY-this.eye.y,this.submerged=Number.isFinite(e.submerged)?e.submerged:+(this.eyeDepth>0),this.swimming=!!e.swimming,this.diving=!!e.diving,this.wading=!!e.wading,this.inWater=this.feetDepth>.005&&(this.swimming||this.wading||this.diving||this.inWaterBody(this.feet.x,this.feet.z)),this.grounded=this.mode===`walk`&&!this.flying&&Math.abs(this.vel.y)<.8;let n=e.events,r=e.eventSeq;if(!Array.isArray(n)||!n.length)return;let i=n.length;if(Number.isFinite(r)&&n[0]&&typeof n[0].seq==`number`){if(t||!this._fxPrimed||r<this._last){this._last=r,this._fxPrimed=!0;return}let e=this._last;for(r-e>i&&(e=r-i);e<r;e++){let t=n[e%i];t&&t.seq===e&&typeof t.type==`string`&&this._push(t.type,+t.x||0,Number.isFinite(t.y)?t.y:this.surfaceY,+t.z||0,Number.isFinite(t.strength)?t.strength:1)}this._last=r;return}let a=Math.min(i,64);if(t||!this._fxPrimed){for(let e=0;e<a;e++){let t=n[e];this._seenRef[e]=t??null,this._seenT[e]=t?t.t:NaN}this._seenSeq=r,this._fxPrimed=!0;return}if(!(Number.isFinite(r)&&r===this._seenSeq)){this._seenSeq=r;for(let e=0;e<a;e++){let t=n[e];t&&(t!==this._seenRef[e]||t.t!==this._seenT[e])&&(this._seenRef[e]=t,this._seenT[e]=t.t,typeof t.type==`string`&&this._push(t.type,+t.x||0,Number.isFinite(t.y)?t.y:this.surfaceY,+t.z||0,Number.isFinite(t.strength)?t.strength:1))}}}_readPlayer(e,t){let n=e.mode;this.mode=typeof n==`number`?y[n]??`walk`:n||`walk`,this.flying=!!e.fly||!!e.flying,this.flying&&(this.mode=`fly`),this.fast=!!e.sprinting,this.feet.copy(e.pos),this.flying&&this._havePrev&&t>0?this.vel.subVectors(this.feet,this._prevFeet).divideScalar(t):this.vel.copy(e.vel),this.speed=Math.hypot(this.vel.x,this.vel.z),this.surfaceY=Number.isFinite(e.surfaceY)?e.surfaceY:this.waterY,this._fillDepths(!!e.grounded,!!e.submerged)}_readCamera(e){this.mode=`walk`,this.flying=!1,this.feet.set(this.eye.x,this.eye.y-this.eyeH,this.eye.z),this._havePrev&&e>0?this.vel.subVectors(this.feet,this._prevFeet).divideScalar(e):this.vel.set(0,0,0),this.vel.lengthSq()>400&&this.vel.set(0,0,0),this.speed=Math.hypot(this.vel.x,this.vel.z),this.surfaceY=this.waterY,this._fillDepths(!0,!1),this.feetDepth>1.45&&(this.mode=`swim`)}_fillDepths(e,t){let n=this.feet,r=this.inWaterBody(n.x,n.z);this.feetDepth=r?Math.max(0,this.surfaceY-n.y):0,this.eyeDepth=r?this.surfaceY-this.eye.y:-1,this.inWater=this.feetDepth>.005,this.submerged=+(this.eyeDepth>.02),this.swimming=this.inWater&&this.mode===`swim`&&!t&&this.eyeDepth<0,this.diving=this.inWater&&(t||this.eyeDepth>.05),this.wading=this.inWater&&this.mode===`walk`&&!this.flying&&this.feetDepth>.02&&!this.swimming,this.grounded=this.mode===`walk`&&e&&!this.flying}_deriveEvents(e){let t=this.feet,n=this.surfaceY;if(!this._havePrev){this._prevIn=this.inWater,this._prevEyeUnder=this.eyeDepth>.02;return}let r=this.inWater;if(this.vel.y<-.5&&!r?this._airVy=-this.vel.y:r||(this._airVy=0),r&&!this._prevIn){let e=Math.max(this._airVy,-this.vel.y,0);this._push(`enterWater`,t.x,n,t.z,e),e>2.5&&this._push(`jumpIn`,t.x,n,t.z,e)}else!r&&this._prevIn&&this._push(`exitWater`,t.x,t.y,t.z,this.speed);let i=this.eyeDepth>.02;i&&!this._prevEyeUnder&&r?this._push(`dive`,this.eye.x,n,this.eye.z,Math.max(.5,-this.vel.y)):!i&&this._prevEyeUnder&&this.eyeDepth>-.6&&this._push(`surface`,this.eye.x,n,this.eye.z,Math.max(.3,this.vel.y)),this._prevIn=r,this._prevEyeUnder=i;let a=this.speed,o=Math.hypot(t.x-this._prevFeet.x,t.z-this._prevFeet.z);if(this.wading&&this.grounded&&a>.3&&o<1.5){let e=.72+.26*Math.min(1,Math.max(0,(a-3.2)/3.3));if(this._stepAcc+=o,this._stepAcc>=e){this._stepAcc-=e,this._strokeSide=-this._strokeSide;let r=this.heading.x,i=this.heading.y,o=t.x+-i*.12*this._strokeSide+r*.25,s=t.z+r*.12*this._strokeSide+i*.25;this._push(`wadeStep`,o,n,s,this.feetDepth),a>4.2&&this.feetDepth<.75&&this._push(`splashRun`,o,n,s,a)}}else this.wading||(this._stepAcc=0);if(this.swimming&&a>.35){if(this._strokeAcc+=e*(.55+.45*a),this._strokeAcc>=1.15){this._strokeAcc=0,this._strokeSide=-this._strokeSide;let e=this.heading.x,r=this.heading.y;this._push(`stroke`,t.x+e*.65+-r*.32*this._strokeSide,n,t.z+r*.65+e*.32*this._strokeSide,Math.min(1.5,.5+a*.4))}}else this._strokeAcc=.6}},x=16,S=`
attribute vec4 aA;   // p0.xyz, spawn time
attribute vec4 aB;   // v0.xyz, life (s)
attribute vec4 aC;   // size (radius m), drag k (1/s), gravity (m/s2, <0 = buoyant), type
attribute vec4 aD;   // killY, seed, alpha, grow (size x (1 + grow t))
uniform float uFxTime;
uniform float uShutter;
uniform float uPixelAngle;   // metres per pixel per metre of distance
varying vec2 vQ;
varying float vAlpha;
varying vec3 vWorld;
varying float vViewZ;
varying float vType;
varying float vSeed;
varying float vStreak;
varying float vKillY;
varying vec2 vCenter;        // particle centre in screen uv
varying float vPx;           // particle radius in pixels
varying float vAge;          // seconds since spawn

void main() {
  vQ = position.xy;
  vType = aC.w;
  vSeed = aD.y;
  vKillY = aD.x;
  vStreak = 1.0;
  vAlpha = 0.0;
  vWorld = aA.xyz;
  vViewZ = 1.0;
  vCenter = vec2(0.5);
  vPx = 1.0;
  float age = uFxTime - aA.w;
  vAge = age;
  float life = aB.w;
  if (age < 0.0 || age > life) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float t = age / life;
  float k = aC.y;
  vec3 g = vec3(0.0, -aC.z, 0.0);
  vec3 p, v;
  if (k > 1e-3) {
    vec3 vt = g / k;
    float e = exp(-k * age);
    p = aA.xyz + vt * age + (aB.xyz - vt) * ((1.0 - e) / k);
    v = vt + (aB.xyz - vt) * e;
  } else {
    p = aA.xyz + aB.xyz * age + 0.5 * g * age * age;
    v = aB.xyz + g * age;
  }
  float type = aC.w;
  bool ballistic = type < 0.5 || type > 3.5;
  float size = aC.x * (1.0 + aD.w * t);
  float alpha = aD.z;
  float w = aD.y * 6.2831853;
  if (ballistic) {
    if (p.y < aD.x) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
    alpha *= smoothstep(0.0, 0.02, age) * (1.0 - smoothstep(0.8, 1.0, t));
  } else if (type < 1.5) {
    p.y = max(p.y, aD.x + size * 0.15);
    alpha *= smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.3, 1.0, t));
  } else if (type < 2.5) {
    float amp = min(size * 2.5, 0.025);
    p.x += sin(age * (11.0 + aD.y * 7.0) + w) * amp;
    p.z += cos(age * (9.0 + aD.y * 6.0) + w * 1.7) * amp;
    size *= 1.0 + 0.08 * max(p.y - aA.y, 0.0);
    if (p.y > aD.x) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
    alpha *= smoothstep(0.0, 0.05, age) * (1.0 - smoothstep(aD.x - 0.05, aD.x, p.y)) * (1.0 - smoothstep(0.9, 1.0, t));
  } else {
    p += vec3(sin(age * 0.7 + w), 0.5 * sin(age * 0.5 + w * 2.1), cos(age * 0.6 + w * 1.3)) * 0.05;
    alpha *= smoothstep(0.0, 0.2, t) * (1.0 - smoothstep(0.6, 1.0, t));
    alpha *= 1.0 - smoothstep(aD.x - 0.15, aD.x - 0.02, p.y);
  }

  vec4 mv = viewMatrix * vec4(p, 1.0);
  float vz = max(-mv.z, 0.01);
  // never smaller than ~1.1 px: widen, and lower the alpha to keep the energy
  float minS = uPixelAngle * vz * 0.6;
  if (size < minS) { alpha *= size / minS; size = minS; }
  vPx = size / max(uPixelAngle * vz, 1e-6);
  vec4 cc = projectionMatrix * mv;
  vCenter = cc.xy / max(cc.w, 1e-4) * 0.5 + 0.5;
  vec2 off;
  vec2 q = position.xy;
  if (ballistic) {
    vec3 vv = (viewMatrix * vec4(v, 0.0)).xyz;
    vec2 sv = vv.xy + mv.xy * (vv.z / vz);   // screen-plane motion at this depth
    float sl = length(sv);
    vec2 dir = sl > 1e-4 ? sv / sl : vec2(0.0, 1.0);
    vec2 perp = vec2(dir.y, -dir.x);   // (perp, dir) right-handed: keeps the quad's winding (FrontSide)
    // sheet fragments: torn blobs and ligaments (fingers) drawn out along their motion
    float fing = fract(aD.y * 5.31);
    float wid = type > 3.5 ? size * mix(0.42, 0.9, fing) : size;
    float len0 = type > 3.5 ? size * mix(1.9, 1.1, fing) : size;
    float len = len0 + sl * uShutter * 0.5;
    off = perp * (q.x * wid) + dir * (q.y * len);
    vStreak = len / wid;
    alpha /= sqrt(len / len0);   // motion blur spreads the same energy
  } else if (type > 1.5 && type < 2.5) {
    // bubbles stay upright (highlight toward the light); bigger ones are oblate
    // and wobble (shape oscillation), small ones stay spherical
    float obl = clamp((aC.x - 0.0025) / 0.006, 0.0, 1.0) * (0.22 + 0.1 * sin(age * 19.0 + w));
    off = vec2(q.x * (1.0 + obl * 0.5), q.y * (1.0 - obl * 0.5)) * size;
  } else {
    float rot = w + (type > 2.5 ? age * 0.3 : 0.0);
    float cr = cos(rot), sr = sin(rot);
    off = vec2(q.x * cr - q.y * sr, q.x * sr + q.y * cr) * size;
  }
  vec3 R = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 U = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vWorld = p + R * off.x + U * off.y;
  mv.xy += off;
  vViewZ = -mv.z;
  vAlpha = alpha;
  gl_Position = projectionMatrix * mv;
}
`,C=`
#include <common>
#include <lagoon_common>
#include <lagoon_depth>
uniform sampler2D tFxNoise;
uniform float uHasNoise;
uniform float uUnderwater;
uniform sampler2D tBg;          // post path: the finished HDR frame behind the particles
uniform sampler2D tFinalDepth;  // post path: opaque + water depth
varying vec2 vQ;
varying float vAlpha;
varying vec3 vWorld;
varying float vViewZ;
varying float vType;
varying float vSeed;
varying float vStreak;
varying float vKillY;
varying vec2 vCenter;
varying float vPx;
varying float vAge;

float hgPhase(float c, float g) {
  float den = max(1.0 + g * g - 2.0 * g * c, 1e-3);
  return (1.0 - g * g) / (12.566 * den * sqrt(den));
}
vec3 bgAt(vec2 uv) {
#if WFX_POST
  return texture2D(tBg, clamp(uv, vec2(0.001), vec2(0.999))).rgb;
#else
  return mix(uSkyHorizon, uSkyZenith, 0.45) * 0.5;
#endif
}

void main() {
  if (vAlpha < 0.002) discard;
  vec2 q = vQ;
  vec2 suv = gl_FragCoord.xy / uResolution;
#if WFX_POST
  float sceneZ = lagoonLinearDepth(texture2D(tFinalDepth, suv).r);
#else
  float sceneZ = lagoonLinearDepth(texture2D(tSceneDepth, suv).r);
#endif
  vec3 V = normalize(vWorld - cameraPosition);
  float cs = dot(V, uSunDir);
  vec3 sunL = uSunColor * uSunIntensity;
  vec3 skyA = mix(uSkyHorizon, uSkyZenith, 0.45);
  float a;
  vec3 col;
  bool under = vType > 1.5 && vType < 3.5;
  if (vType < 0.5 || vType > 3.5) {
    bool sheet = vType > 3.5;
    // capsule along the streak
    float along = max(abs(q.y) * vStreak - (vStreak - 1.0), 0.0);
    vec2 cq = vec2(q.x, along);
    float d = length(cq);
    float tn1 = 0.5, tn2 = 0.5;
    if (sheet && uHasNoise > 0.5) {
      // torn sheet: a ragged outline, holes opening as it stretches
      vec4 tn = texture2D(tFxNoise, vec2(q.x * 0.05, cq.y * 0.05) + vec2(vSeed * 3.1, vSeed * 1.7));
      // B: fine breakup; R: bubble-cell network -> the sheet tears into ligaments
      tn1 = tn.b; tn2 = tn.r * 0.65 + tn.b * 0.35;
      d += (tn1 - 0.5) * 0.5 * smoothstep(0.2, 0.9, d);
    }
    if (d > 1.0) discard;
    float core = 1.0 - smoothstep(0.0, 0.8, d);
    float sv = mix(0.15, 1.0, lagoonStaticShadowTap(vWorld));
    // the ball lens: inverted, wide-angle image of what is around it, plus the
    // sky in the Fresnel rim, the reflected sun point and the forward glint
    vec2 duv = suv - vCenter;
    float rim = smoothstep(0.55, 1.0, d);
    float fwd = hgPhase(cs, 0.82) * 0.55;
    if (sheet) {
      // A chunk of the splash sheet: partly clear water (the scene behind,
      // refracted, the sky in its Fresnel edges) and partly AERATED water - full of
      // bubbles and micro-droplets, i.e. optically thick: it scatters light many
      // times and reads white like foam (lit side toward the sun, forward scatter
      // through the thin sheet when back-lit). Fresh chunks are the whitest; they
      // clear up and tear into holes as they stretch.
      // the aerated sheet shatters into clear drops within a few tenths of a second
      float ageK = clamp(vAge / 0.6, 0.0, 1.0);
      float white = mix(0.55, 0.95, fract(vSeed * 7.13)) * exp(-vAge / 0.32);
      vec3 behind = bgAt(suv + duv * 0.45 + vec2(0.0, 0.003));
      float F = 0.03 + 0.5 * rim * rim;
      vec3 clearW = behind * (1.0 - F) + skyA * 0.85 * F + sunL * sv * (fwd * 0.5 + 0.006);
      float litF = 0.5 + 0.5 * dot(-V, uSunDir);
      vec3 aerW = 0.78 * (sunL * sv * (0.15 + 0.85 * litF) * 0.3183 * 0.8 + skyA * 0.9)
                + sunL * sv * hgPhase(cs, 0.55) * 0.35;
      col = mix(clearW, aerW, white);
      float body = 1.0 - smoothstep(0.25, 1.0, d);
      // tearing only reads (and only looks right) on chunks a few pixels across
      float holes = smoothstep(0.08 + 0.45 * ageK, 0.38 + 0.45 * ageK, tn2 + (1.0 - d) * 0.45);
      body *= mix(1.0 - 0.4 * ageK, holes, smoothstep(4.0, 12.0, vPx));
      a = body * mix(0.45, 0.92, white) * (1.0 - 0.45 * ageK);
    } else {
      vec3 behind = bgAt(vCenter - duv * 2.2 + vec2(0.0, 0.004));
      vec3 env = mix(behind, skyA * 0.62, 0.45);
      col = env * (0.9 - 0.25 * rim) + skyA * 0.35 * rim;
      // sun: forward-refracted glint (back-lit) + the reflected point (any angle)
      float refl = 0.012 + 0.05 * core * smoothstep(1.5, 4.0, vPx);
      col += sunL * sv * (fwd + refl);
      a = (1.0 - smoothstep(0.45, 1.0, d)) * 0.85;
    }
    a *= smoothstep(0.0, 0.12, sceneZ - vViewZ);
    a *= smoothstep(0.06, 0.25, vViewZ);
    a *= smoothstep(-0.01, 0.02, vWorld.y - vKillY);
  } else if (vType < 1.5) {
    // spray puff
    float r = length(q);
    if (r > 1.0) discard;
    float n = 0.7;
    if (uHasNoise > 0.5) {
      vec4 tn = texture2D(tFxNoise, q * 0.3 + vec2(vSeed, vSeed * 1.9));
      n = tn.b * 0.7 + tn.a * 0.6;
    }
    a = (1.0 - smoothstep(0.1, 1.0, r));
    a *= a * (0.35 + 0.9 * n);
    float sv = mix(0.2, 1.0, lagoonStaticShadowTap(vWorld));
    col = sunL * sv * (hgPhase(cs, 0.7) * 0.7 + 0.02) + skyA * 0.7;
    a *= smoothstep(0.0, 0.5, sceneZ - vViewZ);
    a *= smoothstep(0.15, 0.8, vViewZ);
    a *= smoothstep(0.0, 0.12, vWorld.y - vKillY + 0.05);
  } else {
    // under water: bubble (rim + highlight) or mote (soft speck)
    float depth = max(uWaterLevel - vWorld.y, 0.0);
    vec3 sigT = uWaterAbsorb + vec3(0.03, 0.04, 0.045);
    vec3 down = exp(-sigT * (depth / max(uSunDir.y, 0.25) * 0.75 + 0.3));
    vec3 lightW = sunL * down * 0.05 + skyA * exp(-sigT * depth) * 0.35;
    float r = length(q);
    if (r > 1.0) discard;
    if (vType < 2.5) {
      float rim = smoothstep(0.62, 0.92, r) * (1.0 - smoothstep(0.93, 1.0, r));
      float hi = 1.0 - smoothstep(0.0, 0.28, length(q - vec2(-0.32, 0.38)));
      float lo = (1.0 - smoothstep(0.0, 0.35, length(q - vec2(0.25, -0.45)))) * 0.35;
      a = clamp(rim * 0.75 + hi * 0.9 + lo + 0.06, 0.0, 1.0);
      col = lightW * (1.6 + 5.0 * hi) + sunL * down * hgPhase(-cs, 0.6) * 0.15 * rim;
      // bubbles only a few pixels across read as soft silver points, not circles
      float tiny = 1.0 - smoothstep(1.5, 4.5, vPx);
      a = mix(a, (1.0 - smoothstep(0.0, 1.0, r)) * 0.85, tiny);
      col = mix(col, lightW * 4.5 + sunL * down * hgPhase(-cs, 0.6) * 0.12, tiny);
#if WFX_POST
      // the bubble's own refraction: the frame behind, slightly magnified
      col = mix(col, bgAt(vCenter - (suv - vCenter) * 0.8) * 1.15, (1.0 - hi) * (1.0 - rim) * 0.55 * (1.0 - tiny));
#endif
    } else {
      a = (1.0 - smoothstep(0.0, 1.0, r)) * 0.8;
      col = lightW * (0.9 + 0.8 * hgPhase(cs, 0.6));
    }
    a *= smoothstep(0.0, 0.25, sceneZ - vViewZ);
    a *= smoothstep(0.04, 0.2, vViewZ);
    float along = 1.0 / max(dot(V, -vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2])), 0.05);
    float myDist = vViewZ * along;
#if WFX_POST
    // drawn after the underwater volume: fade into the water's extinction
    if (uUnderwater > 0.5) {
      vec3 Tm = exp(-sigT * myDist);
      a *= dot(Tm, vec3(0.2126, 0.7152, 0.0722));
    }
#else
    // pre-compensate the post underwater fog (applied with the opaque depth behind)
    if (uUnderwater > 0.5) {
      float bgDist = sceneZ * along;
      float camDepth = max(uWaterLevel - cameraPosition.y, 0.0);
      if (V.y > 1e-4) bgDist = min(bgDist, camDepth / V.y);
      vec3 gain = min(exp(sigT * max(bgDist - myDist, 0.0)), vec3(6.0));
      col *= gain;
    }
#endif
  }
  a *= vAlpha;
  if (a < 0.002) discard;
  if (!under) col = lagoonAtmosphere(col, vWorld);
  gl_FragColor = vec4(max(col, vec3(0.0)) * a, a);
}
`,w=class{constructor(n,{count:r=2048,noise:o=null,post:u=!1,finalDepth:d=null}={}){let{G:f,pipeline:p,LAYERS:v}=n;this.count=r,this.post=!!(u&&d),this.array=new Float32Array(r*x);for(let e=0;e<r;e++)this.array[e*x+3]=-1e6,this.array[e*x+7]=.001;this.buffer=new m(this.array,x,1),this.buffer.setUsage(e);let y=new i;y.setAttribute(`position`,new t([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),y.setIndex([0,1,2,0,2,3]),y.setAttribute(`aA`,new h(this.buffer,4,0)),y.setAttribute(`aB`,new h(this.buffer,4,4)),y.setAttribute(`aC`,new h(this.buffer,4,8)),y.setAttribute(`aD`,new h(this.buffer,4,12)),y.instanceCount=r,y.boundingSphere=new c(new g,1e5);let b=new l(new Uint8Array([128,128,128,255]),1,1);b.needsUpdate=!0,this._one=b,this.uniforms={...f,...p.uniforms,uFxTime:{value:0},uShutter:{value:1/60},uPixelAngle:{value:.001},tFxNoise:{value:o??b},uHasNoise:{value:+!!o},tBg:{value:b},tFinalDepth:{value:this.post?d:b}};let w=new _({name:`waterfxParticles`,uniforms:this.uniforms,defines:{WFX_POST:+!!this.post},vertexShader:S,fragmentShader:C,transparent:!0,depthWrite:!1,depthTest:!this.post,blending:5,blendEquation:100,blendSrc:201,blendDst:205,blendSrcAlpha:200,blendDstAlpha:201});w.userData.noPatch=!0,this.material=w;let T=new a(y,w);T.name=`waterfx-particles`,T.frustumCulled=!1,T.renderOrder=26,this.post?(T.layers.enableAll(),this.scene=new s,this.scene.matrixWorldAutoUpdate=!1,this.scene.add(T)):(T.layers.set(v.FX),this.scene=null),this.mesh=T,this.head=0,this.time=0,this.aliveUntil=-1,this.lo=r,this.hi=-1,this.lo2=r,this.hi2=-1,this._rA={start:0,count:0},this._rB={start:0,count:0},this.spawned=0,this.draws=0}get sceneObject(){return this.post?null:this.mesh}emit(e,t,n,r,i,a,o,s,c,l,u,d,f,p=0,m=this.time){let h=this.head;this.head=(h+1)%this.count;let g=this.array,_=h*x;g[_]=t,g[_+1]=n,g[_+2]=r,g[_+3]=m,g[_+4]=i,g[_+5]=a,g[_+6]=o,g[_+7]=s,g[_+8]=c,g[_+9]=l,g[_+10]=u,g[_+11]=e,g[_+12]=d,g[_+13]=Math.random(),g[_+14]=f,g[_+15]=p,m+s>this.aliveUntil&&(this.aliveUntil=m+s),this.hi<0?this.lo=this.hi=h:h===this.hi+1?this.hi=h:this.hi2<0&&h===0?this.lo2=this.hi2=0:this.hi2>=0&&h===this.hi2+1?this.hi2=h:(this.lo=0,this.hi=this.count-1,this.hi2=-1),this.spawned++}update(e,t,n){if(this.time=e,this.uniforms.uFxTime.value=e,this.uniforms.uPixelAngle.value=2*Math.tan(t.fov*Math.PI/360)/Math.max(1,n),this.hi>=0){let e=this.buffer;e.updateRanges.length=0,this._rA.start=this.lo*x,this._rA.count=(this.hi-this.lo+1)*x,e.updateRanges.push(this._rA),this.hi2>=0&&(this._rB.start=this.lo2*x,this._rB.count=(this.hi2-this.lo2+1)*x,e.updateRanges.push(this._rB)),e.needsUpdate=!0,this.hi=-1,this.hi2=-1}this.mesh.visible=e<this.aliveUntil}renderPost(e,t,n,r,i=!1){if(!this.post)return;this.uniforms.tBg.value=r;let a=this.mesh.visible;i&&(this.mesh.visible=!0),e.setRenderTarget(t),e.render(this.scene,n),this.mesh.visible=a,this.draws++}alive(){return this.time<this.aliveUntil}},T=`
varying vec3 vWorld;
varying float vViewZ;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vec4 mv = viewMatrix * w;
  vViewZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,E=`
#include <common>
#include <lagoon_common>
#include <lagoon_depth>
uniform sampler2D tWReflection;
uniform mat4 uWReflMatrix;
uniform float uWReflValid;
uniform vec4 uWReflRect;
uniform float uHasPlanar;
uniform sampler2D tFoamTex;
uniform float uHasFoam;
uniform vec3 uWAbsorb;
uniform vec3 uWScatter;
uniform float uFxTime;
uniform float uSurfaceY;
uniform vec4 uRings[NRINGS];   // x, z, birth time, strength
uniform vec4 uRingK[NRINGS];   // bulge, start radius, foam, aeration
uniform vec4 uTrail[NTRAIL];   // x, z, emit time, strength
uniform vec4 uLeg[2];          // x, z, ripple amp, collar foam
uniform vec4 uLegDir;          // heading x, z, speed 0..1, 0
uniform vec4 uBow;             // x, z, heading * amp
varying vec3 vWorld;
varying float vViewZ;

float sPow5(float x) { float x2 = x * x; return x2 * x2 * x; }

vec3 reflAt(vec3 N, vec3 V) {
  vec3 R = reflect(-V, N);
  R.y = abs(R.y) + 0.002;
  R = normalize(R);
  vec3 sky = lagoonSkyRadiance(R);
  if (uHasPlanar < 0.5) return sky;
  vec4 rp = uWReflMatrix * vec4(vWorld + R * 9.0, 1.0);
  vec2 rv = rp.xy / max(rp.w, 1e-4);
  vec3 planar = texture2D(tWReflection, clamp(rv, uWReflRect.xy + 0.002, uWReflRect.zw - 0.002)).rgb;
  vec2 eLo = rv - uWReflRect.xy, eHi = uWReflRect.zw - rv;
  float edge = min(min(eLo.x, eHi.x), min(eLo.y, eHi.y));
  float w = uWReflValid * smoothstep(-0.02, 0.05, edge);
  return mix(sky, planar, w);
}

float glint(vec3 N, vec3 V, float rough) {
  vec3 H = normalize(uSunDir + V);
  float NdH = max(dot(N, H), 0.0);
  float NdL = max(dot(N, uSunDir), 0.0);
  float NdV = max(dot(N, V), 0.05);
  float a2 = rough * rough; a2 *= a2;
  float dd = NdH * NdH * (a2 - 1.0) + 1.0;
  float D = a2 / (3.14159 * dd * dd);
  float FH = 0.0204 + 0.9796 * sPow5(1.0 - max(dot(V, H), 0.0));
  return min(D * FH / (4.0 * NdV) * NdL, 60.0);
}

void main() {
  vec2 p = vWorld.xz;
  float t = uFxTime;
  vec2 slope = vec2(0.0);
  float foam = 0.0, aer = 0.0;
  float farK = 1.0 - smoothstep(14.0, 34.0, vViewZ);
  if (farK <= 0.0) discard;

  // ---- bursts
  for (int i = 0; i < NRINGS; i++) {
    vec4 R = uRings[i];
    float a = t - R.z;
    if (a < 0.0 || a > 4.5 || R.w <= 0.0) continue;
    vec4 K = uRingK[i];
    vec2 d = p - R.xy;
    float r = length(d);
    if (r > K.y + 0.75 + 0.75 * a) continue;
    vec2 dir = d / max(r, 1e-3);
    float s = R.w * exp(-a * 1.05);
    float R1 = K.y + 0.62 * a, w1 = 0.09 + 0.2 * a;
    float x1 = (r - R1) / w1;
    float dh = -exp(-x1 * x1) * sin((r - R1) * 13.0) * 0.13;
    float R2 = K.y * 0.7 + 0.33 * a, w2 = 0.05 + 0.13 * a;
    float x2 = (r - R2) / w2;
    dh -= exp(-x2 * x2) * sin((r - R2) * 31.0) * 0.1 * (1.0 - smoothstep(6.0, 16.0, vViewZ));
    dh *= s / (1.0 + 1.6 * max(r - K.y, 0.0));
    if (K.x > 0.0) {
      float rb = K.y + 0.12;
      float bump = exp(-r * r / (rb * rb)) * exp(-a * 4.0) * K.x * R.w;
      dh -= 2.0 * r / (rb * rb) * bump * 0.08;
    }
    slope += dir * dh;
    if (K.z + K.w > 0.0) {
      float fr = K.y + 0.2 + 0.4 * a;
      float fm = exp(-(r * r) / (fr * fr)) * exp(-a / (0.8 + 0.8 * K.z));
      foam += fm * K.z;
      aer += fm * K.w;
    }
  }

  // ---- wake trail
  float wakeFoam = 0.0;
  for (int i = 0; i < NTRAIL; i++) {
    vec4 T = uTrail[i];
    float a = t - T.z;
    if (a < 0.0 || a > 3.6 || T.w <= 0.0) continue;
    vec2 d = p - T.xy;
    float r = length(d);
    float R = 0.2 + 0.42 * a;
    if (r > R + 0.8) continue;
    float s = T.w * exp(-a * 0.85);
    float w = 0.13 + 0.12 * a;
    float x = (r - R) / w;
    float dh = -exp(-x * x) * sin((r - R) * 9.5) * 0.085 * s / (1.0 + 0.7 * R);
    slope += (d / max(r, 1e-3)) * dh;
    float fr = 0.2 + 0.32 * a;
    // white water grows fast with the stroke rate (a lazy swimmer leaves little)
    wakeFoam += T.w * T.w * 0.6 * exp(-(r * r) / (fr * fr)) * exp(-a * 1.3);
  }
  foam += min(wakeFoam, 1.2) * 0.3;

  // ---- legs: continuous rings, a contact collar piled up in front of the shin
  // and a short turbulent wake streaming off behind it (only while moving)
  vec2 lh = uLegDir.xy;
  vec2 lp = vec2(-lh.y, lh.x);
  for (int i = 0; i < 2; i++) {
    vec4 L = uLeg[i];
    if (L.z <= 0.0 && L.w <= 0.0) continue;
    vec2 d = p - L.xy;
    float r = length(d);
    if (r > 1.5) continue;
    float env = (1.0 - smoothstep(0.35, 1.5, r)) * smoothstep(0.05, 0.1, r);
    float dh = (sin(r * 38.0 - t * 9.5) + 0.45 * sin(r * 63.0 - t * 12.7 + 1.1)) * L.z * env;
    slope += (d / max(r, 1e-3)) * dh;
    if (L.w > 0.0) {
      float u = dot(d, lh), v = dot(d, lp);
      float ring = exp(-pow2((r - 0.07) / (0.02 + 0.03 * smoothstep(0.0, 0.08, u))));
      float front = 0.3 + 0.7 * smoothstep(-0.06, 0.06, u);
      float bu = max(-u, 0.0);
      float wake = (1.0 - smoothstep(-0.02, 0.03, u)) * exp(-v * v / (0.0025 + 0.02 * bu)) * exp(-bu / (0.2 + 0.35 * uLegDir.z));
      foam += L.w * (ring * front * 0.75 + wake * 0.6);
    }
  }

  // ---- bow wave
  float ba = length(uBow.zw);
  if (ba > 0.0) {
    vec2 hd = uBow.zw / ba;
    vec2 d = p - uBow.xy;
    float u = dot(d, hd), v = dot(d, vec2(-hd.y, hd.x));
    float h = ba * exp(-(u * u) / 0.07 - (v * v) / 0.2);
    slope += h * (-2.0 * u / 0.07 * hd - 2.0 * v / 0.2 * vec2(-hd.y, hd.x));
    foam += ba * 3.0 * exp(-((u - 0.12) * (u - 0.12)) / 0.02 - (v * v) / 0.12);
  }

  slope *= farK;
  foam *= farK;
  aer = clamp(aer * farK, 0.0, 1.0);
  if (dot(slope, slope) < 4e-6 && foam < 0.004 && aer < 0.004) discard;
  // capillary chop riding on the disturbed water: breaks the smooth rings into
  // sparkling facets (strongest where the rings are)
  if (uHasFoam > 0.5) {
    float disturb = min(length(slope) * 7.0 + aer * 0.6, 1.0);
    vec4 c1 = texture2D(tFoamTex, p * 1.9 + vec2(t * 0.05, -t * 0.037));
    vec4 c2 = texture2D(tFoamTex, p * 3.7 - vec2(t * 0.043, t * 0.061));
    slope += (vec2(c1.b, c2.a) - vec2(c2.b, c1.a)) * 0.09 * disturb;
  }

  // ---- is there water under this pixel?
  vec2 suv = gl_FragCoord.xy / uResolution;
  float rawD = texture2D(tSceneDepth, suv).r;
  vec3 floorP = lagoonWorldPosFromDepth(suv, rawD);
  float depthV = uSurfaceY - floorP.y;
  if (depthV < 0.004) discard;
  float edgeK = smoothstep(0.004, 0.05, depthV);

  // ---- foam texture breakup
  float foamA = 0.0;
  if (foam > 0.004) {
    float pat = 0.6;
    if (uHasFoam > 0.5) {
      vec4 f1 = texture2D(tFoamTex, p * 0.62 + slope * 0.6 + vec2(t * 0.011, -t * 0.008));
      vec4 f2 = texture2D(tFoamTex, p * 0.17 - vec2(t * 0.006, t * 0.004));
      pat = f1.r * (0.55 + 0.6 * f2.b) + 0.25 * f1.b;
    }
    foamA = clamp(foam, 0.0, 1.0) * smoothstep(0.25, 0.85, pat + clamp(foam, 0.0, 1.0) * 0.45);
    foamA = clamp(foamA * 1.1, 0.0, 0.92);
  }

  // ---- ripple optics: the lagoon's terms with the ripple normal minus flat
  vec3 toCam = cameraPosition - vWorld;
  vec3 V = normalize(toCam);
  vec3 N0 = vec3(0.0, 1.0, 0.0);
  vec3 N = normalize(vec3(-slope.x, 1.0, -slope.y));
  float sunVis = mix(0.12, 1.0, lagoonStaticShadowTap(vWorld));
  float F0 = 0.0204 + 0.9796 * sPow5(1.0 - max(V.y, 0.0));
  float FN = 0.0204 + 0.9796 * sPow5(1.0 - max(dot(N, V), 0.0));
  vec3 refl0 = reflAt(N0, V);
  vec3 reflN = reflAt(N, V);
  // refraction of the opaque floor (same offset rule as the lagoon shader)
  vec3 tiltV = (viewMatrix * vec4(N.x, 0.0, N.z, 0.0)).xyz;
  vec2 ruv = clamp(suv + tiltV.xy * clamp(depthV, 0.0, 2.5) / max(vViewZ, 1.5), vec2(0.001), vec2(0.999));
  if (lagoonLinearDepth(texture2D(tSceneDepth, ruv).r) < vViewZ) ruv = suv;
  vec3 refr0 = texture2D(tSceneColor, suv).rgb;
  vec3 refrN = texture2D(tSceneColor, ruv).rgb;
  float pathV = clamp(distance(floorP, vWorld), 0.0, 150.0);
  vec3 Tf = exp(-(uWAbsorb + uWScatter) * pathV);
  vec3 ins = uLagoonBounce * 1.4 * (1.0 - Tf) * sunVis;
  vec3 sunL = uSunColor * uSunIntensity * sunVis * sunVis;
  float rough = 0.055 + 0.10 * smoothstep(15.0, 300.0, vViewZ);
  vec3 est0 = mix(refr0 * Tf + ins, refl0, F0) + sunL * glint(N0, V, rough);
  vec3 estN = mix(refrN * Tf + ins, reflN, FN) + sunL * glint(N, V, rough);
  vec3 delta = (estN - est0) * edgeK;
  vec3 addC = max(delta, vec3(0.0));
  float lum0 = max(dot(est0, vec3(0.2126, 0.7152, 0.0722)), 1e-3);
  float mult = 1.0 - clamp(dot(max(-delta, vec3(0.0)), vec3(0.2126, 0.7152, 0.0722)) / lum0, 0.0, 0.45);

  // aerated (bubble-laden) water scatters light back up: milky turquoise
  vec3 skyA = mix(uSkyHorizon, uSkyZenith, 0.5);
  vec3 milk = (sunL * 0.018 + skyA * 0.32) * vec3(0.55, 0.95, 0.92);
  float aerA = aer * 0.7 * edgeK;
  addC = addC * (1.0 - aerA) + milk * aerA * (1.0 - F0);
  mult *= 1.0 - aerA * (1.0 - F0);

  // foam: laid over, lit like the lagoon's shoreline foam
  float sunDiff = (max(dot(N, uSunDir), 0.0) * 0.85 + 0.15) * sunVis;
  vec3 foamCol = 0.72 * (uSunColor * uSunIntensity * sunDiff * 0.3183 + skyA * 1.0);
  foamA *= edgeK;
  vec3 rgb = addC * (1.0 - foamA) + foamCol * foamA;
  float outA = mult * (1.0 - foamA);
  gl_FragColor = vec4(max(rgb, vec3(0.0)), clamp(outA, 0.0, 1.0));
}
`,D=()=>new u,ee=class{constructor(e,t,{rings:n=12,trail:r=24,size:i=26}={}){let{G:o,pipeline:s,LAYERS:c}=e;this.nRings=n,this.nTrail=r,this.size=i;let p=t?.material?.uniforms??null,m=!!(p&&p.tWReflection&&p.uWReflMatrix&&p.uWReflValid&&p.uWReflRect),h=t?.textures?.foam??null;if(this.uniforms={...o,...s.uniforms,tWReflection:m?p.tWReflection:{value:null},uWReflMatrix:m?p.uWReflMatrix:{value:new d},uWReflValid:m?p.uWReflValid:{value:0},uWReflRect:m?p.uWReflRect:{value:new u(0,0,1,1)},uHasPlanar:{value:+!!m},tFoamTex:{value:h},uHasFoam:{value:+!!h},uWAbsorb:t?.uniforms?.uWAbsorb??o.uWaterAbsorb??{value:new g(.4,.072,.052)},uWScatter:t?.uniforms?.uWScatter??{value:new g(.018,.055,.08)},uFxTime:{value:0},uSurfaceY:{value:e.layout.WATER_Y??0},uRings:{value:Array.from({length:n},D)},uRingK:{value:Array.from({length:n},D)},uTrail:{value:Array.from({length:r},D)},uLeg:{value:[D(),D()]},uLegDir:{value:new u(0,-1,0,0)},uBow:{value:D()}},!this.uniforms.tWReflection.value||!this.uniforms.tFoamTex.value){let e=new l(new Uint8Array([128,128,128,255]),1,1);e.needsUpdate=!0,this.uniforms.tWReflection.value||(this.uniforms.tWReflection={value:e}),this.uniforms.tFoamTex.value||(this.uniforms.tFoamTex={value:e})}let v=new _({name:`waterfxSurface`,uniforms:this.uniforms,defines:{NRINGS:n,NTRAIL:r},vertexShader:T,fragmentShader:E,transparent:!0,depthWrite:!1,depthTest:!0,side:0,blending:5,blendEquation:100,blendSrc:201,blendDst:204,blendSrcAlpha:200,blendDstAlpha:201,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});v.userData.noPatch=!0,this.material=v;let y=new f(1,1,1,1);y.rotateX(-Math.PI/2);let b=new a(y,v);b.name=`waterfx-surface`,b.layers.set(c.FX),b.renderOrder=4,b.frustumCulled=!1,b.scale.set(i,1,i),b.matrixAutoUpdate=!1,b.updateMatrix(),this.mesh=b,this.ringHead=0,this.trailHead=0,this.time=0,this.aliveUntil=-1,this.legsOn=!1,this.bowOn=!1}addRing(e,t,n,r=.05,i=0,a=0,o=0,s=0){let c=this.uniforms.uRings.value,l=this.uniforms.uRingK.value,u=this.ringHead,d=1/0;for(let e=0;e<this.nRings;e++){let t=this.time-c[e].z,n=t>4.5||c[e].w<=0?-1:c[e].w*Math.exp(-t*1.05)*(1+l[e].z+l[e].w);n<d&&(d=n,u=e)}this.ringHead=(u+1)%this.nRings,c[u].set(e,t,this.time+s,n),l[u].set(i,r,a,o);let f=this.time+s+4.5;f>this.aliveUntil&&(this.aliveUntil=f)}pushTrail(e,t,n){this.uniforms.uTrail.value[this.trailHead].set(e,t,this.time,n),this.trailHead=(this.trailHead+1)%this.nTrail;let r=this.time+3.6;r>this.aliveUntil&&(this.aliveUntil=r)}setLegs(e,t,n,r,i,a,o=0,s=-1,c=0){let l=this.uniforms.uLeg.value;l[0].set(e,t,i,a),l[1].set(n,r,i,a),this.uniforms.uLegDir.value.set(o,s,c,0),this.legsOn=i>0||a>0}setBow(e,t,n,r,i){this.uniforms.uBow.value.set(e,t,n*i,r*i),this.bowOn=i>0}update(e,t,n,r){this.time=e;let i=this.uniforms;i.uFxTime.value=e,i.uSurfaceY.value=r;let a=this.legsOn||this.bowOn||e<this.aliveUntil;if(this.mesh.visible=a,a){let e=this.mesh;e.position.set(t,r+.004,n),e.updateMatrix()}}reset(){let e=this.uniforms.uRings.value,t=this.uniforms.uTrail.value;for(let t=0;t<e.length;t++)e[t].set(0,0,-1e6,0);for(let e=0;e<t.length;e++)t[e].set(0,0,-1e6,0);this.setLegs(0,0,0,0,0,0),this.setBow(0,0,0,0,0),this.aliveUntil=-1}},O=12,k=`
attribute vec4 aA;   // x, y, z, birth time
attribute vec4 aB;   // heading x, heading z, side (+1 right, -1 left, 0 drip spot), wetness 0..1
attribute vec4 aC;   // normal xyz, life (s)
uniform float uFxTime;
varying vec2 vQ;
varying float vSide;
varying float vWet;
varying float vAge;
varying float vSeed;
void main() {
  vQ = position.xy;
  vSide = aB.z;
  vSeed = fract(aA.x * 1.618 + aA.z * 2.414 + aA.w * 0.37);
  float age = uFxTime - aA.w;
  vAge = age / max(aC.w, 1.0);
  vWet = aB.w;
  if (age < 0.0 || age > aC.w || aB.w <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec3 n = normalize(aC.xyz);
  vec3 f0 = vec3(aB.x, 0.0, aB.y);
  vec3 f = normalize(f0 - n * dot(f0, n) + vec3(1e-5, 0.0, 0.0));
  vec3 r = cross(f, n);
  vec2 hsz = abs(aB.z) > 0.5 ? vec2(0.062, 0.135) : vec2(0.03, 0.03);
  vec2 q = position.xy;
  float mir = aB.z < -0.5 ? -1.0 : 1.0;
  vec3 wp = aA.xyz + r * (q.x * hsz.x * mir) + f * (q.y * hsz.y) + n * 0.012;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`,A=`
varying vec2 vQ;
varying float vSide;
varying float vWet;
varying float vAge;
varying float vSeed;

float ell(vec2 p, vec2 c, vec2 r) { return length((p - c) / r) - 1.0; }
float h12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h12(i), h12(i + vec2(1.0, 0.0)), u.x), mix(h12(i + vec2(0.0, 1.0)), h12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }

void main() {
  vec2 p = vQ;           // x across (-1 inner .. +1 outer), y heel (-1) .. toes (+1)
  float d;
  if (abs(vSide) > 0.5) {
    float heel = ell(p, vec2(0.05, -0.64), vec2(0.5, 0.3));
    float arch = ell(p, vec2(0.38, -0.12), vec2(0.3, 0.42));
    float ball = ell(p, vec2(0.0, 0.33), vec2(0.72, 0.27));
    d = smin(smin(heel, arch, 0.18), ball, 0.18);
    // toes along an arc, big toe on the inner side (a slight bridge to the ball)
    float toes = ell(p, vec2(-0.48, 0.76), vec2(0.24, 0.18));
    toes = min(toes, ell(p, vec2(-0.1, 0.81), vec2(0.15, 0.12)));
    toes = min(toes, ell(p, vec2(0.19, 0.77), vec2(0.13, 0.11)));
    toes = min(toes, ell(p, vec2(0.44, 0.7), vec2(0.12, 0.1)));
    toes = min(toes, ell(p, vec2(0.66, 0.6), vec2(0.1, 0.09)));
    d = smin(d, toes, 0.07);
  } else {
    d = length(p) - 0.75;
  }
  // sand wets unevenly: a grainy, irregular boundary (different for every print)
  float nz = vn(p * vec2(7.0, 4.0) + vSeed * 37.0) * 0.6 + vn(p * vec2(19.0, 11.0) + vSeed * 53.0) * 0.4;
  d += (nz - 0.5) * 0.22;
  // evaporation: the rim dries first
  float dry = smoothstep(0.35, 1.0, vAge);
  float thr = -0.02 - 0.5 * dry;
  float m = 1.0 - smoothstep(thr - 0.16, thr + 0.07, d);
  // compressed, wetter rim + softer centre (sand pushed aside)
  float rim = smoothstep(-0.35, -0.05, d) * (1.0 - smoothstep(-0.05, 0.05, d));
  float dark = m * (0.75 + 0.35 * rim) * vWet * (1.0 - dry * 0.85);
  if (dark < 0.004) discard;
  vec3 mulC = vec3(1.0) - dark * vec3(0.40, 0.42, 0.46);
  gl_FragColor = vec4(mulC, 1.0);
}
`,te=class{constructor(n,{count:r=24,life:o=30}={}){let{LAYERS:s}=n;this.count=r,this.life=o,this.array=new Float32Array(r*O);for(let e=0;e<r;e++)this.array[e*O+3]=-1e6,this.array[e*O+11]=1;this.buffer=new m(this.array,O,1),this.buffer.setUsage(e);let l=new i;l.setAttribute(`position`,new t([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),l.setIndex([0,1,2,0,2,3]),l.setAttribute(`aA`,new h(this.buffer,4,0)),l.setAttribute(`aB`,new h(this.buffer,4,4)),l.setAttribute(`aC`,new h(this.buffer,4,8)),l.instanceCount=r,l.boundingSphere=new c(new g,1e5),this.uniforms={uFxTime:{value:0}};let u=new _({name:`waterfxFootprints`,uniforms:this.uniforms,vertexShader:k,fragmentShader:A,transparent:!0,depthWrite:!1,depthTest:!0,side:2,forceSinglePass:!0,blending:5,blendEquation:100,blendSrc:208,blendDst:200,blendSrcAlpha:200,blendDstAlpha:201,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4});u.userData.noPatch=!0,this.material=u;let d=new a(l,u);d.name=`waterfx-footprints`,d.frustumCulled=!1,d.layers.set(s.FX),d.renderOrder=3,this.mesh=d,this.head=0,this.time=0,this.aliveUntil=-1,this.dirty=!1}add(e,t,n,r,i,a,o,s=0,c=1,l=0,u=this.life){let d=this.head;this.head=(d+1)%this.count;let f=this.array,p=d*O;f[p]=e,f[p+1]=t,f[p+2]=n,f[p+3]=this.time,f[p+4]=r,f[p+5]=i,f[p+6]=a,f[p+7]=o,f[p+8]=s,f[p+9]=c,f[p+10]=l,f[p+11]=u,this.dirty=!0,this.time+u>this.aliveUntil&&(this.aliveUntil=this.time+u)}update(e){this.time=e,this.uniforms.uFxTime.value=e,this.dirty&&=(this.buffer.needsUpdate=!0,!1),this.mesh.visible=e<this.aliveUntil}},j=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,M=`
uniform sampler2D tInput;
uniform sampler2D tSceneColor;
uniform mat4 uProjectionInverse;
uniform mat4 uViewInverse;
uniform vec2 uResolution;
uniform float uAspect;
uniform float uTime;
uniform vec4 uDrop[NDROPS];    // x (0..aspect), y (0..1), radius (screen heights), alpha
uniform vec4 uDropT[NDROPS];   // trail top y, trail alpha, stretch, seed
uniform vec4 uFilm;            // front y (1 = top), strength, seed, 0
uniform float uVeil;
uniform vec4 uMen;             // on, camera height above the surface (m), lens radius (m), uw
uniform mat4 uViewProj;        // camera projection * view (mirror lookups for the meniscus)
varying vec2 vUv;

float h12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h12(i), h12(i + vec2(1.0, 0.0)), u.x), mix(h12(i + vec2(0.0, 1.0)), h12(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 samp(vec2 uv) { return texture2D(tInput, clamp(uv, vec2(0.0005), vec2(0.9995))).rgb; }
vec3 blur4(vec2 uv, float r) {
  vec2 o = vec2(r / uAspect, r);
  return 0.25 * (samp(uv + vec2(o.x, o.y * 0.3)) + samp(uv - vec2(o.x, o.y * 0.3)) + samp(uv + vec2(-o.x * 0.3, o.y)) + samp(uv + vec2(o.x * 0.3, -o.y)));
}
float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
float sq(float x) { return x * x; }

void main() {
  vec2 uv = vUv;
  vec2 P = vec2(uv.x * uAspect, uv.y);
  vec2 offs = vec2(0.0);
  float cover = 0.0, shade = 0.0, spec = 0.0, blurR = 0.0;

  // ---- droplets + trails
  for (int i = 0; i < NDROPS; i++) {
    vec4 D = uDrop[i];
    if (D.w <= 0.0) continue;
    vec4 T = uDropT[i];
    vec2 d = P - D.xy;
    float rr = D.z;
    // trail above the drop: a thin wet streak (slightly wandering), refracts a little
    if (T.y > 0.0 && d.y > 0.0 && P.y < T.x) {
      float wob = (vn(vec2(T.w * 17.0, P.y * 40.0)) - 0.5) * rr * 0.5;
      float along = clamp(d.y / max(T.x - D.y, 1e-3), 0.0, 1.0);
      float wdt = rr * mix(0.5, 0.18, along);
      float x = (d.x - wob) / max(wdt, 1e-4);
      if (abs(x) < 1.0) {
        float k = (1.0 - x * x) * T.y * (1.0 - 0.6 * along);
        offs.x += -x * wdt * 0.8 * k;
        cover = max(cover, k * 0.8);
        shade += k * 0.06;
        spec += k * 0.25 * smoothstep(0.3, 0.9, -x);
      }
    }
    d.y *= 1.0 + 0.3 * T.z;             // gravity sag: taller than wide while sliding
    d.y += rr * 0.12 * T.z;
    float dl = length(d);
    // drops are never perfect circles: a gently irregular outline
    float wob = 1.0 + 0.16 * (vn(d / max(dl, 1e-5) * 1.7 + T.w) - 0.5);
    float r = dl / (rr * wob);
    if (r < 1.0) {
      float hgt = sqrt(1.0 - r * r);
      vec2 n = d / (rr * wob);
      // soft, out-of-focus edge (the drop sits on the lens, far from the focus plane)
      float a = D.w * (1.0 - smoothstep(0.62, 1.0, r));
      // a ball lens: an inverted, wide-angle image (the rim sees far off-axis)
      offs += -n * (rr * (1.2 + 0.8 * hgt) + 0.13 * r * r * r) * a;
      cover = max(cover, a);
      blurR = max(blurR, rr * 0.12 * a);
      shade += smoothstep(0.72, 0.95, r) * (1.0 - smoothstep(0.95, 1.0, r)) * 0.3 * a;
      vec3 nn = normalize(vec3(n, hgt * 1.4));
      float s = max(dot(nn, normalize(vec3(-0.45, 0.55, 0.7))), 0.0);
      float s2 = s * s; float s4 = s2 * s2; float s16 = s4 * s4; s16 *= s16;
      spec += (s16 * s16 * 2.5 + smoothstep(0.7, 0.95, r) * 0.05) * a;
    }
  }

  // ---- sheeting film draining down the lens
  float film = 0.0;
  if (uFilm.y > 0.0) {
    float front = uFilm.x + (vn(vec2(P.x * 9.0, uFilm.z)) - 0.5) * 0.08 + (vn(vec2(P.x * 31.0, uFilm.z + 3.0)) - 0.5) * 0.025;
    film = (1.0 - smoothstep(front - 0.015, front + 0.004, uv.y)) * uFilm.y;
    float edge = exp(-sq((uv.y - front) / 0.012)) * uFilm.y;
    vec2 fp = vec2(P.x * 7.0, P.y * 2.2 + uTime * 1.6);
    vec2 fl = vec2(vn(fp) - 0.5, vn(fp * 1.7 + 9.1) - 0.5);
    offs += fl * vec2(0.016, 0.03) * film + vec2(0.0, 0.01) * edge;
    blurR = max(blurR, 0.004 * film);
    cover = max(cover, max(film, edge));
    spec += edge * 0.35;
    shade += film * 0.04;
  }

  // ---- splash veil (hard entry)
  if (uVeil > 0.0) {
    vec2 vp = P * 9.0 + vec2(uTime * 0.7, -uTime * 2.2);
    float b = vn(vp) * 0.6 + vn(vp * 2.3) * 0.4;
    offs += (vec2(vn(vp + 3.1), vn(vp + 7.7)) - 0.5) * 0.06 * uVeil;
    blurR = max(blurR, 0.012 * uVeil);
    cover = max(cover, uVeil);
    spec += smoothstep(0.55, 0.85, b) * uVeil * 0.8;
  }

  vec2 suv = uv + vec2(offs.x / uAspect, offs.y);
  vec3 base = samp(uv);
  vec3 col = base;
  if (cover > 0.0) {
    vec3 refr = blurR > 0.0004 ? blur4(suv, blurR) : samp(suv);
    col = mix(base, refr, clamp(cover, 0.0, 1.0));
    col *= 1.0 - clamp(shade, 0.0, 0.6);
    float env = max(luma(blur4(uv, 0.03)), 0.05);
    col += vec3(1.0, 0.98, 0.95) * spec * (0.6 * env + 0.25);
    col = mix(col, vec3(luma(col)) * 1.1 + env * 0.25, uVeil * 0.45);
  }

  // ---- meniscus: the water line where the lens straddles the surface
  if (uMen.x > 0.5) {
    vec4 vd = uProjectionInverse * vec4(uv * 2.0 - 1.0, 1.0, 1.0);
    vec3 rd = normalize((uViewInverse * vec4(normalize(vd.xyz / vd.w), 0.0)).xyz);
    // small surface waves washing over the lens (irregular, a few mm)
    float wave = 0.0022 * sin(rd.x * 7.0 + rd.z * 5.0 + uTime * 2.3) + 0.0012 * sin(rd.x * 19.0 - rd.z * 13.0 - uTime * 3.7)
               + 0.0016 * (vn(rd.xz * 11.0 + vec2(uTime * 0.9, -uTime * 0.6)) - 0.5);
    float lensY = uMen.y + rd.y * uMen.z;       // lens point height relative to the surface
    float s = lensY - wave;                      // < 0: that part of the lens is under water
    float bw = uMen.z * 0.028;
    float under = 1.0 - smoothstep(-bw * 0.5, bw * 0.5, s);
    float uw = uMen.w;
    // submerged part while the pipeline still shows the above-water image
    vec3 soft = blur4(uv + vec2(0.0, 0.004), 0.004);
    vec3 tinted = soft * vec3(0.30, 0.66, 0.72) + vec3(0.02, 0.10, 0.12) * max(luma(soft), 0.2);
    col = mix(col, tinted, under * (1.0 - uw));
    // above-water part while the pipeline applied its underwater look everywhere:
    // above the horizon the clean (opaque) image; below it the ray meets the water
    // surface right away at a grazing angle: the transmitted (underwater) image plus
    // the Fresnel reflection of the scene, looked up in the clean image by mirroring
    vec3 clean = texture2D(tSceneColor, uv).rgb;
    if (rd.y < 0.0 && uw > 0.0) {
      vec3 camP = uViewInverse[3].xyz;
      vec4 mp = uViewProj * vec4(camP + vec3(rd.x, -rd.y, rd.z) * 60.0, 1.0);
      vec2 muv = clamp(mp.xy / max(mp.w, 1e-4) * 0.5 + 0.5, vec2(0.001), vec2(0.999));
      float c1 = 1.0 + rd.y;  // 1 - cos(incidence)
      float c2 = c1 * c1;
      float F = 0.02 + 0.98 * c2 * c2 * c1;
      clean = mix(col, texture2D(tSceneColor, muv).rgb, F);
    }
    col = mix(col, clean, (1.0 - under) * uw);
    // the line: dark refracting band + bright upper edge
    float band = exp(-sq(s / bw));
    vec3 mag = samp(uv + vec2(0.0, -0.012 * band));
    col = mix(col, mag * 0.6, band * 0.55);
    col += vec3(0.9, 0.95, 1.0) * exp(-sq((s - bw * 0.9) / (bw * 0.45))) * 0.35 * max(luma(base), 0.2);
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`,N=()=>new u,ne=class{constructor(e,{drops:t=24,register:i=!0}={}){let{pipeline:a}=e;this.pipeline=a,this.nDrops=t;let s=a.uniforms.uResolution.value;this.rt=new o(Math.max(1,s.x),Math.max(1,s.y),{type:r,depthBuffer:!1,stencilBuffer:!1,minFilter:n,magFilter:n,generateMipmaps:!1}),this.rt.texture.name=`waterfxLens`,a.onResize?.((e,t)=>this.rt.setSize(Math.max(1,e),Math.max(1,t))),this.uniforms={tInput:{value:null},tSceneColor:a.uniforms.tSceneColor,uProjectionInverse:a.uniforms.uProjectionInverse,uViewInverse:a.uniforms.uViewInverse,uResolution:a.uniforms.uResolution,uAspect:{value:16/9},uTime:{value:0},uDrop:{value:Array.from({length:t},N)},uDropT:{value:Array.from({length:t},N)},uFilm:{value:N()},uVeil:{value:0},uMen:{value:N()},uViewProj:{value:new d}},this.camera=e.camera,this.material=new _({name:`waterfxLens`,uniforms:this.uniforms,defines:{NDROPS:t},vertexShader:j,fragmentShader:M,depthTest:!1,depthWrite:!1,blending:0}),this.material.userData.noPatch=!0,this.d=Array.from({length:t},()=>({on:!1,x:0,y:0,r:0,a:0,vy:0,stick:0,top:0,trail:0,life:0,age:0,seed:0,slide:!1})),this.film={t:-1,dur:.9,k:0},this.veil=0,this.men={on:!1,h:0,lens:.05,uw:0},this.time=0,this.active=!1,this._warm=0,this.draws=0,this.hook=(e,t,n)=>this.render(e,t,n),i&&a.postPasses.push(this.hook)}splash(e,t=.5,n=`all`){let r=this.uniforms.uAspect.value;for(let i=0;i<e;i++){let e=null,i=-1;for(let t=0;t<this.nDrops;t++){let n=this.d[t];if(!n.on){e=n;break}n.age>i&&(i=n.age,e=n)}let a=Math.random()<t*.5?.028+Math.random()*.03:.008+Math.random()*.018;e.on=!0,e.x=Math.random()*r,e.y=n===`low`?Math.random()*.4:.05+Math.random()*.95,e.r=a,e.a=0,e.vy=0,e.stick=Math.random()*.4,e.top=e.y,e.trail=0,e.age=0,e.life=1.2+Math.random()*1.2+a*15,e.seed=Math.random()*100,e.slide=a>.024}}sheet(e=1){this.film.t=0,this.film.k=e,this.film.seed=Math.random()*50}veilHit(e=1){this.veil=Math.max(this.veil,Math.min(1,e))}clear(){for(let e=0;e<this.nDrops;e++)this.d[e].on=!1;this.film.t=-1,this.film.k=0}update(e,t,n,r,i){this.time=t;let a=this.uniforms;a.uTime.value=t;let o=a.uResolution.value;a.uAspect.value=o.x/Math.max(1,o.y);let s=!1;r>.5&&n<-.01&&this.clear();for(let t=0;t<this.nDrops;t++){let n=this.d[t],r=a.uDrop.value[t],i=a.uDropT.value[t];if(!n.on){r.w=0,i.y=0;continue}if(n.age+=e,n.age>n.life){n.on=!1,r.w=0,i.y=0;continue}let o=Math.min(1,n.age/.06),c=1-Math.max(0,(n.age-n.life*.6)/(n.life*.4));n.a=o*c;let l=n.r*(.65+.35*c);if(n.slide){if(n.stick-=e,n.stick<=0){let t=.12+(n.r-.024)*9;n.vy+=(t-n.vy)*Math.min(1,e*6),Math.random()<e*1.5&&(n.stick=.05+Math.random()*.25,n.vy*=.2)}else n.vy*=Math.exp(-e*12);n.y-=n.vy*e,n.x+=Math.sin(n.seed+n.y*25)*n.vy*e*.08,n.trail=Math.min(1,n.trail+e*3)*c,n.y<-.1&&(n.on=!1)}else n.top=n.y;r.set(n.x,n.y,l,n.a),i.set(n.top,n.slide?n.trail*.8*n.a:0,Math.min(1,n.vy*8),n.seed),s=!0}let c=this.film;if(c.t>=0){c.t+=e;let t=c.t/c.dur;t>=1.6?(c.t=-1,a.uFilm.value.set(0,0,0,0)):(a.uFilm.value.set(1.05-t*1.2,c.k*(1-Math.max(0,(t-.6)/1)),c.seed,0),s=!0)}else a.uFilm.value.y=0;this.veil>0&&(this.veil=Math.max(0,this.veil-e*3.2),s=!0),a.uVeil.value=this.veil;let l=.06,u=i&&Math.abs(n)<l*1.15;a.uMen.value.set(+!!u,n,l,r),u&&this.camera&&a.uViewProj.value.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),s||=u,this.active=s}render(e,t,n){let r=t._warm===void 0?this._warm<2:t._warm<1;if(this.active||r)return this._warm++,this.uniforms.tInput.value=n,t.drawFullscreen(this.material,this.rt),this.draws++,this.active?this.rt.texture:void 0}},P=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,F=`
uniform sampler2D tInput;
varying vec2 vUv;
void main() { gl_FragColor = vec4(texture2D(tInput, vUv).rgb, 1.0); }
`,re=class{constructor(e,{particles:t,lens:i}){let{pipeline:a,camera:s}=e;if(this.pipeline=a,this.camera=s,this.particles=t,this.lens=i,this.rt=null,t.post){let e=a.uniforms.uResolution.value;this.rt=new o(Math.max(1,e.x),Math.max(1,e.y),{type:r,depthBuffer:!1,stencilBuffer:!1,minFilter:n,magFilter:n,generateMipmaps:!1}),this.rt.texture.name=`waterfxParticles`,a.onResize?.((e,t)=>this.rt.setSize(Math.max(1,e),Math.max(1,t))),this.copyMat=new _({name:`waterfxCopy`,uniforms:{tInput:{value:null}},vertexShader:P,fragmentShader:F,depthTest:!1,depthWrite:!1,blending:0}),this.copyMat.userData.noPatch=!0}this.calls=0,a.postPasses.push((e,t,n)=>this.render(e,t,n))}render(e,t,n){let r=t._warm!==void 0&&t._warm<1,i,a=n,o=this.particles;o.post&&(o.alive()||r)&&(this.copyMat.uniforms.tInput.value=n,t.drawFullscreen(this.copyMat,this.rt),o.renderPost(e,this.rt,this.camera,n,r),a=i=this.rt.texture,this.calls+=2);let s=this.lens;if(s.active||r){let n=s.render(e,t,a);n&&(i=n),this.calls++}return i}},I={pool:[512,1024,1536,2048,3072],k:[.35,.55,.8,1,1.3],rings:[6,8,10,12,16],trail:[12,16,20,24,28],prints:[10,14,20,24,28],drops:[8,12,18,24,32],size:[18,22,24,26,28]},L=9.81,R=(e,t)=>e+(t-e)*Math.random();async function z(e){let{scene:t,quality:n,registry:r,camera:i,pipeline:a,hf:o}=e,s=Math.max(0,Math.min(4,Number.isFinite(n.rank)?n.rank:[`low`,`medium`,`high`,`ultra`,`cinematic`].indexOf(n.name))),c=I.k[s],l=r.get(`water`)??null;e.layout.WATER_Y;let u=new b(e),d=a.compositeRT?.depthTexture??null,f=new w(e,{count:I.pool[s],noise:l?.textures?.foam??null,post:!!d,finalDepth:d}),p=new ee(e,l,{rings:I.rings[s],trail:I.trail[s],size:I.size[s]}),m=new te(e,{count:I.prints[s],life:30}),h=new ne(e,{drops:I.drops[s],register:!1}),g=new re(e,{particles:f,lens:h});t.add(p.mesh,m.mesh),f.sceneObject&&t.add(f.sceneObject);let _=ie(l),v=0,y=-10,x=0,S=-10,C=-10,T=-10,E=-100,D=99,O=0,k=1,A=0,j=1.5,M=0,N=0,P=0,F=0,z=0,B=0,ae=!1,V={events:0,splashes:0,prints:0,lastEvent:``},H=[0,1,0],U=u,W={x:0,y:0,z:-1},G=()=>{let e=i.matrixWorld.elements;W.x=-e[8],W.y=-e[9],W.z=-e[10]};function K(e,t,n,r,i,a,o,s,c,l=v,u=1){f.emit(0,e,t,n,r,i,a,s,o,.35,L,c,u,0,l)}function q(e,t,n,r,i,a,o,s,c,l=v,u=.85){f.emit(4,e,t,n,r,i,a,s,o,.5,L,c,u,1.2,l)}function J(e,t,n,r,i,a,o,s,c,l=.16,u=v){f.emit(1,e,t,n,r,i,a,s,o,2.6,1.2,c,l,1.6,u)}function Y(e,t,n,r,i,a,o,s,c=v){let l=.16+Math.min(o,.01)*16,u=Math.min(14,Math.max(.5,(s-t)/l+.8));f.emit(2,e,t,n,r,i,a,u,o,5,-l*5,s-.004,.9,0,c)}function X(e,t,n,r,i,a,o){f.emit(3,e,t,n,r,i,a,R(3,6),R(.0012,.0035),1.1,R(-.004,.004),o,R(.3,.7),0)}let Z=e=>Math.max(1,Math.round(e*c));function oe(e,t,n,r,i,a,o=!0,s=.15){let c=L;for(let l=0;l<r;l++){let r=Math.random()*6.2832,u=Math.sqrt(Math.random())*i,d=e+Math.cos(r)*u,f=n+Math.sin(r)*u,m=t+R(-.08,.08),h=-R(0,.4);if(K(d,m,f,Math.cos(r)*R(0,s),h,Math.sin(r)*R(0,s),R(.0018,.004),2,a,v+R(0,.15)),o&&l%3==0&&m>a){let e=m-a,t=(h+Math.sqrt(h*h+2*c*e))/c;p.addRing(d,f,.12,.01,0,0,0,t+.1)}}}function Q(e,t,n){if(v-y<.35)return;y=v,x=n,V.splashes++;let r=U.surfaceY,i=Math.min(2.2,Math.max(.45,n/6)),a=Math.sqrt(i),o=U.heading.x,s=U.heading.y,c=Math.min(U.speed,6),l=Z(40+40*i);for(let n=0;n<l;n++){let i=(n+Math.random()*.8)/l*6.2832,u=R(.26,.4),d=Math.cos(i),f=Math.sin(i),p=Math.random(),m=(.5+1.2*p)*a*R(.8,1.2),h=(1.2+3*p)*a*R(.85,1.15);q(e+d*u,r+.02,t+f*u,d*m+o*c*.2,h,f*m+s*c*.2,R(.03,.06)*a,1.6,r,v+R(0,.05))}let u=Z(60+90*i);for(let n=0;n<u;n++){let n=Math.random()*6.2832,i=R(.28,.45),l=Math.cos(n),u=Math.sin(n),d=R(1,2.8)*a,f=R(2.2,4.6)*a;K(e+l*i,r+.03,t+u*i,l*d+o*c*.25,f,u*d+s*c*.25,R(.002,.009),1.9,r,v+R(.02,.16))}let d=v+R(.26,.36),f=Z(18+14*i);for(let n=0;n<f;n++){let n=Math.random()*6.2832,i=R(0,.14),o=Math.random();q(e+R(-.04,.04),r+.03,t+R(-.04,.04),Math.cos(n)*i,(1.2+3.2*o)*a,Math.sin(n)*i,R(.035,.06)*a,1.6,r,d+(1-o)*.12)}let m=Z(16+16*i);for(let n=0;n<m;n++){let n=Math.random()*6.2832,i=R(0,.4);K(e+R(-.06,.06),r+.05,t+R(-.06,.06),Math.cos(n)*i,R(2.8,5.4)*a,Math.sin(n)*i,R(.003,.01),1.8,r,d+R(.02,.14))}let h=Z(5+7*i);for(let n=0;n<h;n++){let n=Math.random()*6.2832,i=Math.cos(n),o=Math.sin(n);J(e+i*.35,r+.12,t+o*.35,i*R(.6,1.4)*a,R(.6,1.4)*a,o*R(.6,1.4)*a,R(.22,.42)*a,R(1.1,1.8),r,.14,v+R(0,.1))}p.addRing(e,t,1.5*i**.7,.35,0,1,1,0),p.addRing(e,t,.8*a,.08,.6,.3,0,.55),_.add(e,t,.55+.35*a,.9,2.6);let g=Z(30+40*i);for(let n=0;n<g;n++){let n=R(.15,1.4*i);Y(e+R(-.35,.35),r-n,t+R(-.35,.35),R(-.3,.3),R(-.2,.3),R(-.3,.3),R(.0015,.007),r,v+R(0,.3))}}function se(e,t,n){let r=U.surfaceY,i=Math.min(U.speed,7),a=U.heading.x,o=U.heading.y,s=Z(6+i*4+n*3);for(let n=0;n<s;n++){let n=Math.random()*6.2832,s=Math.cos(n),c=Math.sin(n);K(e+s*.18,r+.02,t+c*.18,s*R(.3,.9)+a*i*.35,R(.7,1.6)*(.6+i*.18),c*R(.3,.9)+o*i*.35,R(.002,.006),1.2,r)}p.addRing(e,t,.5+.1*i,.1,0,.15,0,0)}function ce(e,t,n,r=1){let i=U.surfaceY,a=U.heading.x,o=U.heading.y,s=Math.min(1.6,n/6)*r,c=Z(18+18*s);for(let r=0;r<c;r++){let c=(r&1?1:-1)*R(.3,1.3),l=Math.cos(c),u=Math.sin(c),d=a*l-o*u,f=o*l+a*u,p=R(.35,1),m=R(2,4.4)*(.6+.4*s);K(e,i+.05,t,d*m*Math.cos(p)+a*n*.3,m*Math.sin(p),f*m*Math.cos(p)+o*n*.3,R(.002,.008),1.4,i,v+R(0,.05))}let l=Z(6+7*s);for(let r=0;r<l;r++){let c=(r&1?1:-1)*R(.25,.9),l=Math.cos(c),u=Math.sin(c),d=a*l-o*u,f=o*l+a*u,p=R(1.4,3)*(.6+.4*s);q(e+a*.08,i+.03,t+o*.08,d*p+a*n*.25,p*R(.6,1.2),f*p+o*n*.25,R(.025,.05),1.2,i)}let u=Z(3+3*s);for(let r=0;r<u;r++){let r=R(-.12,.12);q(e+a*.12-o*r,i+.05,t+o*.12+a*r,a*n*R(.6,.95)-o*r*4,R(2,3.4)*(.7+.3*s),o*n*R(.6,.95)+a*r*4,R(.03,.055),1.2,i,v+R(0,.04))}let d=Z(3+3*s);for(let r=0;r<d;r++)J(e+a*.2,i+.1,t+o*.2,a*n*.4+R(-.4,.4),R(.5,1.1),o*n*.4+R(-.4,.4),R(.18,.3),R(.8,1.3),i,.15);p.addRing(e,t,.8*s+.3,.12,0,.25,.15,0),n>5&&Math.random()<.18&&h.splash(1+ +(Math.random()<.4),.15,`low`)}function le(e,t,n,r,i,a=0,o=0,s=0){let c=U.surfaceY;for(let l=0;l<r;l++){let r=Math.random()*6.2832,l=Math.acos(R(-1,1)),u=Math.cbrt(Math.random())*i,d=Math.sin(l)*Math.cos(r)*u,f=Math.cos(l)*u,p=Math.sin(l)*Math.sin(r)*u,m=Math.min(t+f,c-.03);Y(e+d,m,n+p,a*.3+d*1.2,o*.3+f*1.2,s*.3+p*1.2,R(.0012,.0055),c,v+R(0,.12))}}function $(e){V.events++,V.lastEvent=e.type;let t=U.surfaceY;switch(e.type){case`enterWater`:S=v,e.strength>=2.5?Q(e.x,e.z,e.strength):se(e.x,e.z,e.strength);break;case`jumpIn`:Q(e.x,e.z,Math.max(e.strength,2.5));break;case`landFly`:(U.inWater||U.feetDepth>.02)&&Q(e.x,e.z,Math.max(3,e.strength));break;case`dive`:{G();let n=v-y<.7;if(n)x>5&&h.veilHit(Math.min(1,.35+(x-5)*.12));else{let n=Z(16);for(let r=0;r<n;r++){let n=Math.random()*6.2832;K(e.x+Math.cos(n)*.2,t+.02,e.z+Math.sin(n)*.2,Math.cos(n)*R(.3,1),R(.8,1.8),Math.sin(n)*R(.3,1),R(.002,.007),1.2,t)}for(let n=0;n<Z(6);n++){let n=Math.random()*6.2832;q(e.x+Math.cos(n)*.18,t+.02,e.z+Math.sin(n)*.18,Math.cos(n)*R(.3,.8),R(.7,1.5),Math.sin(n)*R(.3,.8),R(.025,.045),1,t)}p.addRing(e.x,e.z,.9,.25,0,.7,1,0),_.add(e.x,e.z,.5,.6,2)}let r=i.position;le(r.x+W.x*.55,r.y+W.y*.4-.05,r.z+W.z*.55,Z(n?110:70),n?.55:.4,U.vel.x,U.vel.y,U.vel.z);for(let e=0;e<Z(30);e++)X(r.x+R(-2,2),r.y+R(-1.2,.4),r.z+R(-2,2),R(-.05,.05),R(-.03,.03),R(-.05,.05),t);j=R(1.8,3),F=1.2;break}case`surface`:{T=v;let n=i.position;p.addRing(e.x,e.z,.75,.1,1,.25,0,0),oe(n.x,n.y+.08,n.z,Z(16),.16,t),h.sheet(1),h.splash(Math.round(R(10,16)*Math.min(1.3,c+.2)),.6);break}case`exitWater`:S=v,E=v,D=0,O=.35,N=0,(v-C<4||v-T<10)&&(h.splash(Math.round(R(4,8)),.35),h.sheet(.45));break;case`wadeStep`:{let n=Math.max(0,Math.min(1.2,e.strength)),r=U.speed;if(p.addRing(e.x,e.z,(.3+.45*Math.min(n/.8,1))*(.55+.45*Math.min(r/3,1)),.08,0,r>3?.2:.05,0,0),r>1.8&&n<.9){let i=U.heading.x,a=U.heading.y,o=Z((2+r*1.8)*(n<.5?1:.6));for(let n=0;n<o;n++)K(e.x+R(-.08,.08),t+.03,e.z+R(-.08,.08),i*R(.4,.8)*r*.4+R(-.4,.4),R(.6,1.8),a*R(.4,.8)*r*.4+R(-.4,.4),R(.002,.006),1.2,t)}break}case`splashRun`:ce(e.x,e.z,Math.max(U.speed,e.strength>3?e.strength:5));break;case`stroke`:{let n=Math.max(.3,Math.min(1.6,e.strength));p.addRing(e.x,e.z,.55*n,.12,0,.35,.25,0);let r=U.heading.x,i=U.heading.y,a=Z(5+4*n);for(let o=0;o<a;o++)K(e.x+R(-.1,.1),t+.03,e.z+R(-.1,.1),r*R(.2,.7)+R(-.35,.35),R(.6,1.5)*n,i*R(.2,.7)+R(-.35,.35),R(.002,.006),1.1,t);for(let a=0;a<Z(2+n);a++)q(e.x+R(-.08,.08),t+.02,e.z+R(-.08,.08),r*R(.1,.5)+R(-.3,.3),R(.5,1.2)*n,i*R(.1,.5)+R(-.3,.3),R(.018,.035),.9,t);oe(e.x-r*.55,t+.32,e.z-i*.55,Z(5),.12,t,!0,.25);for(let n=0;n<Z(5);n++)Y(e.x+R(-.1,.1),t-R(.08,.3),e.z+R(-.1,.1),r*.3,0,i*.3,R(.0015,.004),t);break}}}function ue(e){let t=U.surfaceY,n=U.feet,r=U.heading.x,a=U.heading.y,o=-a,s=r,l=U.speed;U.inWater&&(S=v),U.swimming&&(C=v),ae&&(Math.abs(n.x-z)>4||Math.abs(n.z-B)>4)&&(p.reset(),A=0),z=n.x,B=n.z,ae=!0;let u=!U.flying&&U.inWater&&U.feetDepth>.03;if(u&&!U.swimming&&!U.diving&&U.mode!==`mantle`){let e=Math.min(1,U.feetDepth/.8),t=Math.min(1,l/2.5);p.setLegs(n.x+o*.12,n.z+s*.12,n.x-o*.12,n.z-s*.12,(.03+.045*e)*(1-.5*t),.85*t*Math.min(1,U.feetDepth/.25),r,a,t)}else p.setLegs(0,0,0,0,0,0);if(u&&U.swimming&&l>.2?p.setBow(n.x+r*.42,n.z+a*.42,r,a,Math.min(.06,.008+.018*l)):p.setBow(0,0,0,0,0),u&&(U.swimming&&l>.15||U.wading&&l>.4&&U.feetDepth>.12)){if(A+=e,A>=.1){A=0;let e=U.swimming?Math.min(1.6,.35+l*.45):Math.min(.9,Math.min(U.feetDepth,1)*.9*Math.min(l/3,1.3));p.pushTrail(n.x,n.z,e)}}else A=.1;let d=i.position;if(U.diving||U.inWater&&d.y<t-.05){if(G(),j-=e,j<=0){j=R(2.2,4.2);let e=Math.max(5,Z(R(14,24))),n=d.x+W.x*.14,r=d.y-.09,i=d.z+W.z*.14;for(let a=0;a<e;a++){let e=Math.random()<.35;Y(n+R(-.03,.03),Math.min(r,t-.05),i+R(-.03,.03),W.x*.25+R(-.08,.08),R(.02,.15),W.z*.25+R(-.08,.08),e?R(.004,.011):R(.0012,.003),t,v+a*R(.02,.045))}}for(F>0&&(F-=e,Math.random()<e*14*c&&Y(d.x+W.x*.1,Math.min(d.y-.05,t-.05),d.z+W.z*.1,W.x*.1,.05,W.z*.1,R(.0012,.003),t)),M+=e*(5+Math.min(l,3)*14)*c;M>=1;)if(--M,l>.3&&Math.random()<.55){let e=Math.random()<.5?-1:1,i=R(.1,.35)*e;X(n.x-r*R(.2,1)+o*R(-.6,.6),d.y+R(-1.4,.2),n.z-a*R(.2,1)+s*R(-.6,.6),U.vel.x*.45+o*i,U.vel.y*.3+R(-.05,.05),U.vel.z*.45+s*i,t)}else{let e=R(.5,3.2);X(d.x+W.x*e+R(-1,1)*e*.7,d.y+W.y*e+R(-.6,.6)*e*.6,d.z+W.z*e+R(-1,1)*e*.7,R(-.03,.03),R(-.02,.02),R(-.03,.03),t)}}else M=0,F=0;if(U.mode===`mantle`&&v-S<1.6)for(P+=e*110*c;P>=1;){--P;let e=Math.random()*6.2832,i=R(.12,.3),o=n.x+Math.cos(e)*i-r*.1,s=n.z+Math.sin(e)*i-a*.1,c=n.y+R(.15,1.35),l=Math.max(t,de(o,s));Math.random()<.22?q(o,c,s,Math.cos(e)*R(0,.15),-R(.2,.8),Math.sin(e)*R(0,.15),R(.01,.02),1.6,l,v,.6):K(o,c,s,Math.cos(e)*R(0,.2),-R(0,.5),Math.sin(e)*R(0,.2),R(.0018,.006),1.6,l),Math.random()<.35&&l<=t+.001&&c>t&&p.addRing(o,s,.14,.01,0,0,0,Math.sqrt(2*(c-t)/L)+.05)}else P=0;let f=v-E,h=!U.inWater&&!U.flying&&U.mode===`walk`;if(h&&f<4.5){let t=1-f/4.5;for(N+=e*45*t*t*c;N>=1;){--N;let e=Math.random()*6.2832,r=R(.05,.26),i=n.x+Math.cos(e)*r+U.vel.x*.05,a=n.z+Math.sin(e)*r+U.vel.z*.05,o=n.y+R(.35,1.45);if(K(i,o,a,U.vel.x*.9,-R(0,.3),U.vel.z*.9,R(.0018,.004),1.6,n.y),U.grounded&&Math.random()<.22){let e=Math.sqrt(2*(o-n.y)/L);fe(i+U.vel.x*e,a+U.vel.z*e,n.y),m.add(i+U.vel.x*e,n.y,a+U.vel.z*e,1,0,0,R(.5,1)*t,H[0],H[1],H[2],R(10,18))}}}else N=0;if(h&&U.grounded&&D<20&&f<45){let t=Math.hypot(U.vel.x,U.vel.z)*e;if(t<1.2){let e=Math.min(1,Math.max(0,(l-3.2)/3.3));O+=t;let i=.72+.26*e;if(O>=i){O-=i,k=-k;let e=n.x+o*.11*k+r*.1,t=n.z+s*.11*k+a*.1;fe(e,t,n.y);let c=Math.max(.1,1-D/20)*(.8+.2*Math.random());m.add(e,n.y,t,r,a,k,c,H[0],H[1],H[2]),D++,V.prints++}}}U.inWater&&(D=99)}function de(e,t){try{return o.groundHeight(e,t)}catch{return-1e3}}function fe(e,t,n){let r=de(e,t);Math.abs(r-n)<.08&&typeof o.normalAt==`function`?o.normalAt(e,t,.3,H):(H[0]=0,H[1]=1,H[2]=0)}let pe={state:u,particles:f,surface:p,footprints:m,lens:h,post:g,stats:V,order:30,get time(){return v},forceBreath(){j=0},trigger(e,t=1){let n=u.feet;$({type:e,x:n.x,y:u.surfaceY,z:n.z,strength:t})},update(e){e>0||(e=0),v+=e,u.update(e,v);for(let e=0;e<u.nEvents;e++)$(u.events[e]);u.active?ue(e):(p.setLegs(0,0,0,0,0,0),p.setBow(0,0,0,0,0));let t=a.uniforms.uResolution.value;f.update(v,i,t.y),p.update(v,u.active?u.feet.x:i.position.x,u.active?u.feet.z:i.position.z,u.surfaceY),m.update(v);let n=a.uniforms.uUnderwater?.value??0,r=i.position,o=u.active&&u.inWaterBody(r.x,r.z);h.update(e,v,r.y-u.surfaceY,n,o&&!u.flying),_.update(v)}};return window.__lagoon&&(window.__lagoon.waterfx=pe),e.progress?.(1,`Stirring the water`),pe}function ie(e){let t=!!(e&&typeof e.setImpacts==`function`&&e.material?.uniforms?.uWImpacts),n=[];if(t){let t=e.material.uniforms,r=Math.min(4,t.uWImpactCount?.value|0);for(let e=0;e<r;e++){let r=t.uWImpacts.value[e],i=t.uWImpactsB?.value?.[e];n.push(i?{x:r.x,z:r.y,r:r.z,strength:r.w,ax:i.x,az:i.y,half:i.z}:{x:r.x,z:r.y,r:r.z,strength:r.w})}}let r=t?Math.max(0,4-n.length):0,i=Array.from({length:r},()=>({x:0,z:0,r:1,strength:0,ax:1,az:0,half:0,s0:0,t0:-1e6,dur:1})),a=[];for(let e=0;e<=r;e++){let t=n.slice();for(let n=0;n<e;n++)t.push(i[n]);a.push(t)}let o=0,s=!1,c=0;return{free:r,add(e,t,n,a,c){if(!r)return;let l=0,u=1/0;for(let e=0;e<r;e++){let t=i[e].strength;t<u&&(u=t,l=e)}let d=i[l];d.x=e,d.z=t,d.r=n,d.s0=a,d.strength=a,d.t0=o,d.dur=c,s=!0},update(t){if(o=t,!r)return;let n=0;for(let e=0;e<r;e++){let r=i[e],a=(t-r.t0)/r.dur,o=a<0||a>=1?0:r.s0*(1-a)*(1-a);o!==r.strength&&(r.strength=o,s=!0),o>.002&&(n=e+1)}if((s||n!==c)&&(s=!1,n!==0||c!==0)){c=n;try{e.setImpacts(a[n])}catch{}}}}}export{z as build};