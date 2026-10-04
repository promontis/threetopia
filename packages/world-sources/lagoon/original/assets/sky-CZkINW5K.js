import{$r as e,Dr as t,Qt as n,Rn as r,Rt as i,U as a,V as o,Yt as s,ar as c,do as l,ea as u,jr as d,no as f,ro as p,ta as m}from"./three.core-DtjtRha-.js";import{t as h}from"./three.module-CA589J5f.js";import"./index-BjH0GYGf.js";var g={bottomRadius:6360,topRadius:6460,cameraAltitude:.12,rayleighScattering:[.005802,.013558,.0331],rayleighScaleHeight:8,mieScattering:.003996,mieAbsorption:444e-6,mieScaleHeight:1.2,mieG:.8,aerosol:2,dustAbsorbTint:[.5,1,2.2],ozoneAbsorption:[65e-5,.001881,85e-6],ozoneCenter:25,ozoneHalfWidth:15,groundAlbedo:[.42,.35,.26]},_=`
#define ATM_PI 3.14159265
uniform float uRg;
uniform float uRt;
uniform vec3 uRayS;
uniform float uRayH;
uniform vec3 uMieS;
uniform vec3 uMieE;
uniform float uMieH;
uniform float uMieG;
uniform vec3 uOzoA;
uniform float uOzoC;
uniform float uOzoW;
uniform vec3 uGroundAlbedo;

// distance along rd (from ro) to the sphere of radius R; nearest positive hit or -1
float atmRaySphere(vec3 ro, vec3 rd, float R) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - R * R;
  float d = b * b - c;
  if (d < 0.0) return -1.0;
  d = sqrt(d);
  float t0 = -b - d, t1 = -b + d;
  if (t0 > 0.0) return t0;
  if (t1 > 0.0) return t1;
  return -1.0;
}

void atmMedium(float h, out vec3 scatR, out vec3 scatM, out vec3 ext) {
  float dR = exp(-max(h, 0.0) / uRayH);
  float dM = exp(-max(h, 0.0) / uMieH);
  float dO = max(0.0, 1.0 - abs(h - uOzoC) / uOzoW);
  scatR = uRayS * dR;
  scatM = uMieS * dM;
  ext = scatR + uMieE * dM + uOzoA * dO;
}

vec2 atmTransmittanceUV(float r, float mu) {
  float H = sqrt(max(uRt * uRt - uRg * uRg, 0.0));
  float rho = sqrt(max(r * r - uRg * uRg, 0.0));
  float disc = r * r * (mu * mu - 1.0) + uRt * uRt;
  float d = max(-r * mu + sqrt(max(disc, 0.0)), 0.0);
  float dmin = uRt - r, dmax = rho + H;
  float xmu = (d - dmin) / max(dmax - dmin, 1e-6);
  float xr = rho / H;
  return vec2(0.5 / 256.0 + xmu * (1.0 - 1.0 / 256.0),
              0.5 / 64.0 + xr * (1.0 - 1.0 / 64.0));
}

vec3 atmTransmittance(sampler2D T, float r, float mu) {
  return textureLod(T, atmTransmittanceUV(r, mu), 0.0).rgb;
}

float atmPhaseRayleigh(float c) { return 3.0 / (16.0 * ATM_PI) * (1.0 + c * c); }
float atmPhaseMie(float c, float g) {
  float g2 = g * g;
  float den = max(1.0 + g2 - 2.0 * g * c, 1e-4);
  return 3.0 / (8.0 * ATM_PI) * ((1.0 - g2) * (1.0 + c * c)) / ((2.0 + g2) * den * sqrt(den));
}
`,v=`void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,y=`
${_}
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(256.0, 64.0);
  float xmu = (uv.x - 0.5 / 256.0) / (1.0 - 1.0 / 256.0);
  float xr = (uv.y - 0.5 / 64.0) / (1.0 - 1.0 / 64.0);
  float H = sqrt(uRt * uRt - uRg * uRg);
  float rho = H * clamp(xr, 0.0, 1.0);
  float r = sqrt(rho * rho + uRg * uRg);
  float dmin = uRt - r, dmax = rho + H;
  float d = dmin + clamp(xmu, 0.0, 1.0) * (dmax - dmin);
  float mu = d <= 0.0 ? 1.0 : clamp((H * H - rho * rho - d * d) / (2.0 * r * d), -1.0, 1.0);
  vec3 ro = vec3(0.0, r, 0.0);
  vec3 rd = vec3(sqrt(max(1.0 - mu * mu, 0.0)), mu, 0.0);
  float tMax = max(atmRaySphere(ro, rd, uRt), 0.0);
  const int N = 48;
  vec3 od = vec3(0.0);
  float dt = tMax / float(N);
  for (int i = 0; i < N; i++) {
    vec3 p = ro + rd * ((float(i) + 0.5) * dt);
    vec3 sR, sM, e;
    atmMedium(length(p) - uRg, sR, sM, e);
    od += e * dt;
  }
  gl_FragColor = vec4(exp(-od), 1.0);
}`,b=`
${_}
uniform sampler2D tTransmittance;
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5) / 31.0; // texel centres hit the range ends
  float muS = clamp(uv.x, 0.0, 1.0) * 2.0 - 1.0;
  float r = clamp(uRg + clamp(uv.y, 0.0, 1.0) * (uRt - uRg), uRg + 0.005, uRt - 0.005);
  vec3 ro = vec3(0.0, r, 0.0);
  vec3 sunL = vec3(sqrt(max(1.0 - muS * muS, 0.0)), muS, 0.0);
  vec3 L2 = vec3(0.0), fms = vec3(0.0);
  const int ND = 8;
  const int NS = 20;
  for (int a = 0; a < ND; a++)
  for (int b = 0; b < ND; b++) {
    float u = (float(a) + 0.5) / float(ND);
    float v = (float(b) + 0.5) / float(ND);
    float cosT = 1.0 - 2.0 * v;
    float sinT = sqrt(max(1.0 - cosT * cosT, 0.0));
    float ph = 2.0 * ATM_PI * u;
    vec3 rd = vec3(sinT * cos(ph), cosT, sinT * sin(ph));
    float tG = atmRaySphere(ro, rd, uRg);
    float tT = atmRaySphere(ro, rd, uRt);
    float tMax = tG > 0.0 ? tG : max(tT, 0.0);
    float dt = tMax / float(NS);
    vec3 T = vec3(1.0), L = vec3(0.0), F = vec3(0.0);
    for (int i = 0; i < NS; i++) {
      vec3 p = ro + rd * ((float(i) + 0.5) * dt);
      float pr = length(p);
      vec3 up = p / pr;
      vec3 sR, sM, e;
      atmMedium(pr - uRg, sR, sM, e);
      float mu = dot(up, sunL);
      vec3 Ts = atmTransmittance(tTransmittance, pr, mu);
      if (atmRaySphere(p, sunL, uRg) > 0.0) Ts = vec3(0.0);
      vec3 sc = sR + sM;
      vec3 stepT = exp(-e * dt);
      vec3 integ = (vec3(1.0) - stepT) / max(e, vec3(1e-7));
      L += T * sc * Ts * integ * (1.0 / (4.0 * ATM_PI));
      F += T * sc * integ;
      T *= stepT;
    }
    if (tG > 0.0) {
      vec3 pg = ro + rd * tG;
      vec3 upg = normalize(pg);
      float mu = dot(upg, sunL);
      vec3 Ts = atmTransmittance(tTransmittance, uRg, mu);
      L += T * Ts * max(mu, 0.0) * uGroundAlbedo / ATM_PI;
    }
    L2 += L;
    fms += F;
  }
  float inv = 1.0 / float(ND * ND);
  L2 *= inv;
  fms *= inv;
  vec3 psi = L2 / max(vec3(1.0) - fms, vec3(1e-3));
  gl_FragColor = vec4(psi, 1.0);
}`,x=`
${_}
uniform sampler2D tTransmittance;
uniform sampler2D tMultiScatter;
uniform float uSunElev;   // radians
uniform float uCamAlt;    // km
uniform float uScale;
vec3 msLookup(float h, float muS) {
  vec2 uv = vec2(muS * 0.5 + 0.5, clamp(h / (uRt - uRg), 0.0, 1.0));
  uv = (uv * 31.0 + 0.5) / 32.0;
  return textureLod(tMultiScatter, uv, 0.0).rgb;
}
void main() {
  float u = (gl_FragCoord.x - 0.5) / 255.0;
  float v = (gl_FragCoord.y - 0.5) / 127.0;
  float phi = clamp(u, 0.0, 1.0) * ATM_PI;
  float s = (clamp(v, 0.0, 1.0) - 0.5) * 2.0;
  float el = sign(s) * s * s * 0.5 * ATM_PI;
  vec3 rd = vec3(cos(el) * cos(phi), sin(el), cos(el) * sin(phi));
  vec3 sunL = vec3(cos(uSunElev), sin(uSunElev), 0.0);
  vec3 ro = vec3(0.0, uRg + uCamAlt, 0.0);
  float tG = atmRaySphere(ro, rd, uRg);
  float tT = atmRaySphere(ro, rd, uRt);
  float tMax = tG > 0.0 ? tG : max(tT, 0.0);
  float c = dot(rd, sunL);
  float pR = atmPhaseRayleigh(c), pM = atmPhaseMie(c, uMieG);
  const int N = 56;
  vec3 T = vec3(1.0), L = vec3(0.0);
  float tPrev = 0.0;
  for (int i = 0; i < N; i++) {
    float f = (float(i) + 1.0) / float(N);
    float t = tMax * f * f;           // denser near the viewer
    float dt = t - tPrev;
    float tm = tPrev + 0.5 * dt;
    tPrev = t;
    vec3 p = ro + rd * tm;
    float pr = length(p);
    vec3 up = p / pr;
    float h = pr - uRg;
    vec3 sR, sM, e;
    atmMedium(h, sR, sM, e);
    float muS = dot(up, sunL);
    vec3 Ts = atmTransmittance(tTransmittance, pr, muS);
    if (atmRaySphere(p, sunL, uRg) > 0.0) Ts = vec3(0.0);
    vec3 S = (sR * pR + sM * pM) * Ts + (sR + sM) * msLookup(h, muS);
    vec3 stepT = exp(-e * dt);
    L += T * S * (vec3(1.0) - stepT) / max(e, vec3(1e-7));
    T *= stepT;
  }
  if (tG > 0.0) {
    vec3 pg = ro + rd * tG;
    float mu = dot(normalize(pg), sunL);
    vec3 Ts = atmTransmittance(tTransmittance, uRg, mu);
    L += T * Ts * max(mu, 0.0) * uGroundAlbedo / ATM_PI;
  }
  gl_FragColor = vec4(max(L * uScale, vec3(0.0)), 1.0);
}`,S=`
${_}
uniform sampler2D tTransmittance;
uniform sampler2D tSkyView;
uniform float uSunElev;
uniform float uCamAlt;
vec2 svUV(float phi, float el) {
  float u = phi / ATM_PI;
  float v = 0.5 + 0.5 * sign(el) * sqrt(abs(el) / (0.5 * ATM_PI));
  return vec2((u * 255.0 + 0.5) / 256.0, (v * 127.0 + 0.5) / 128.0);
}
vec3 sv(float phi, float el) { return textureLod(tSkyView, svUV(phi, el), 0.0).rgb; }
void main() {
  int i = int(gl_FragCoord.x);
  vec3 o = vec3(0.0);
  float d3 = 3.0 * ATM_PI / 180.0;
  if (i == 0) o = sv(0.0, 0.5 * ATM_PI - 0.01);
  else if (i == 1) o = sv(0.0, d3);
  else if (i == 2) o = sv(0.5 * ATM_PI, d3);
  else if (i == 3) o = sv(ATM_PI, d3);
  else if (i == 4) { for (int k = 0; k < 32; k++) o += sv((float(k) + 0.5) / 32.0 * ATM_PI, d3); o /= 32.0; }
  else if (i == 5 || i == 9) {
    vec3 E = vec3(0.0), A = vec3(0.0); float W = 0.0;
    for (int a = 0; a < 32; a++)
    for (int b = 0; b < 24; b++) {
      float el = (float(b) + 0.5) / 24.0 * 0.5 * ATM_PI;
      float phi = (float(a) + 0.5) / 32.0 * ATM_PI;
      float dw = cos(el) * (0.5 * ATM_PI / 24.0) * (ATM_PI / 32.0) * 2.0;
      vec3 L = sv(phi, el);
      E += L * sin(el) * dw;
      A += L * dw; W += dw;
    }
    o = i == 5 ? E : A / W;
  }
  else if (i == 6) o = atmTransmittance(tTransmittance, uRg + uCamAlt, sin(uSunElev));
  else if (i == 7) o = atmTransmittance(tTransmittance, uRg + 2.2, sin(uSunElev));
  else if (i == 8) o = atmTransmittance(tTransmittance, uRg + 8.0, sin(uSunElev));
  gl_FragColor = vec4(o, 1.0);
}`;function C(e=g){let t=e.aerosol,n=e.mieScattering*t,r=e.dustAbsorbTint;return{uRg:{value:e.bottomRadius},uRt:{value:e.topRadius},uRayS:{value:new p(...e.rayleighScattering)},uRayH:{value:e.rayleighScaleHeight},uMieS:{value:new p(n,n,n)},uMieE:{value:new p(n+e.mieAbsorption*t*r[0],n+e.mieAbsorption*t*r[1],n+e.mieAbsorption*t*r[2])},uMieH:{value:e.mieScaleHeight},uMieG:{value:e.mieG},uOzoA:{value:new p(...e.ozoneAbsorption)},uOzoC:{value:e.ozoneCenter},uOzoW:{value:e.ozoneHalfWidth},uGroundAlbedo:{value:new p(...e.groundAlbedo)}}}function w(t,n,i=s){return new l(t,n,{type:i,format:e,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,minFilter:r,magFilter:r,wrapS:o,wrapT:o})}function T(e,n,r=1,a={}){let o={...g,...a},s=C(o),l=Math.asin(Math.min(1,Math.max(-1,n.y))),u=new c(new d(2,2));u.frustumCulled=!1;let f=new t(-1,1,1,-1,0,1),p=(e,t={})=>new m({uniforms:{...s,...t},vertexShader:v,fragmentShader:e,depthTest:!1,depthWrite:!1}),h=(t,n)=>{let r=e.getRenderTarget();u.material=t,e.setRenderTarget(n),e.render(u,f),e.setRenderTarget(r)},_=w(256,64);_.texture.name=`atmTransmittance`;let T=w(32,32);T.texture.name=`atmMultiScatter`;let E=w(256,128);E.texture.name=`atmSkyView`;let D=p(y);h(D,_);let O=p(b,{tTransmittance:{value:_.texture}});h(O,T);let k=p(x,{tTransmittance:{value:_.texture},tMultiScatter:{value:T.texture},uSunElev:{value:l},uCamAlt:{value:o.cameraAltitude},uScale:{value:r}});h(k,E);function A(e){k.uniforms.uScale.value=e,h(k,E)}function j(){let t=w(16,1,i),n=p(S,{tTransmittance:{value:_.texture},tSkyView:{value:E.texture},uSunElev:{value:l},uCamAlt:{value:o.cameraAltitude}}),r=null;try{h(n,t);let i=new Float32Array(64);e.readRenderTargetPixels(t,0,0,16,1,i);let a=e=>[i[e*4],i[e*4+1],i[e*4+2]];r={zenith:a(0),horizonSun:a(1),horizon90:a(2),horizonAnti:a(3),horizonAvg:a(4),skyIrradiance:a(5),sunT:a(6),sunTCloud:a(7),sunTCirrus:a(8),skyAvg:a(9)},(!r.horizonAvg.every(Number.isFinite)||r.horizonAvg[1]<=0)&&(r=null)}catch(e){console.warn(`[lagoon] sky probe failed`,e),r=null}return n.dispose(),t.dispose(),r}return D.dispose(),O.dispose(),{transmittance:_.texture,multiScatter:T.texture,skyView:E.texture,uniforms:s,sunElev:l,rebakeSkyView:A,probe:j,dispose(){k.dispose(),_.dispose(),T.dispose(),E.dispose(),u.geometry.dispose()}}}var E=`
float cn_remap(float v, float a, float b) { return clamp((v - a) / (b - a), 0.0, 1.0); }
vec4 bake(vec2 uv) {
  // Perlin-Worley: fbm dilated by inverted Worley billows (puffy, connected clumps)
  float pf = clamp(bk_fbm(uv, vec2(7.0), 6) * 0.62 + 0.5, 0.0, 1.0);
  float w1 = 1.0 - bk_worley(uv, vec2(11.0)).x;
  float w2 = 1.0 - bk_worley(uv, vec2(22.0)).x;
  float w3 = 1.0 - bk_worley(uv, vec2(44.0)).x;
  float wf = clamp(w1 * 0.625 + w2 * 0.25 + w3 * 0.125, 0.0, 1.0);
  float pw = cn_remap(pf, wf - 1.0, 1.0);
  pw = cn_remap(pw, 0.35, 1.0);
  // billow detail: Worley F1 fbm (0 at lump centres, 1 at their borders)
  float d1 = bk_worley(uv, vec2(16.0)).x;
  float d2 = bk_worley(uv, vec2(32.0)).x;
  float d3 = bk_worley(uv, vec2(64.0)).x;
  float det = clamp(d1 * 0.55 + d2 * 0.3 + d3 * 0.15, 0.0, 1.0);
  // cirrus: streaky fbm (short period across, long along)
  float ci = clamp(bk_fbm(uv, vec2(4.0, 22.0), 6) * 0.7 + 0.5, 0.0, 1.0);
  float cov = clamp(bk_fbm(uv + vec2(0.37, 0.71), vec2(3.0), 4) * 0.75 + 0.5, 0.0, 1.0);
  return vec4(pw, det, ci, cov);
}
`;function D(){return{tCloudNoise:{value:null},uCloudSun:{value:new a(20,15,10)},uCloudSunCi:{value:new a(22,17,12)},uCloudAmbTop:{value:new a(.9,1,1.2)},uCloudAmbBottom:{value:new a(.55,.5,.48)},uCloudCoverage:{value:.5},uCloudWind:{value:new f(6,2.5)}}}var O=`
#ifndef CLOUD_STEPS
#define CLOUD_STEPS 12
#endif
uniform sampler2D tCloudNoise;
uniform vec3 uCloudSun;
uniform vec3 uCloudSunCi;
uniform vec3 uCloudAmbTop;
uniform vec3 uCloudAmbBottom;
uniform float uCloudCoverage;
uniform vec2 uCloudWind;

#define CLOUD_TILE 30000.0
#define CLOUD_BASE_KM 2.1
#define CLOUD_THICK 1000.0
#define CIRRUS_KM 8.5
#define CIRRUS_TILE 64000.0
#define EARTH_KM 6360.0

// km along a ray (elevation sine rdY) from altitude camKm to the shell at hKm
float cloudShellDist(float camKm, float rdY, float hKm) {
  float r0 = EARTH_KM + camKm;
  float b = r0 * rdY;
  float c = (hKm - camKm) * (2.0 * EARTH_KM + hKm + camKm);
  return c / (b + sqrt(b * b + c));
}
float cloudRemap(float v, float a, float b) { return clamp((v - a) / max(b - a, 1e-4), 0.0, 1.0); }
float cloudHG(float c, float g) {
  float g2 = g * g;
  float d = max(1.0 + g2 - 2.0 * g * c, 1e-4);
  return (1.0 - g2) / (4.0 * LAGOON_PI * d * sqrt(d));
}

// Composites the cloud layers over sky radiance skyCol for view direction rd.
// Returns the new radiance; alpha (total cloud opacity) is written to cov.
vec3 skyClouds(vec3 rd, vec3 skyCol, out float cloudAlpha) {
  cloudAlpha = 0.0;
  float ry = max(rd.y, 0.004);
  float camKm = max(cameraPosition.y, 0.0) * 0.001 + 0.12;
  vec2 hd = rd.xz;
  float cosT = dot(rd, uSunDir);
  vec2 wind = uCloudWind * uTime;

  // ---------------- cirrus (behind the cumulus)
  float tCi = cloudShellDist(camKm, ry, CIRRUS_KM);
  vec2 Pc = cameraPosition.xz + hd * (tCi * 1000.0) + wind * 2.4;
  // streaks run along the upper-level wind (rotated ~35 degrees from the cumulus drift)
  vec2 uvc = mat2(0.819, 0.574, -0.574, 0.819) * Pc / CIRRUS_TILE;
  vec2 dcx = dFdx(uvc), dcy = dFdy(uvc);
  float ci = textureGrad(tCloudNoise, uvc, dcx, dcy).b;
  float ciMask = textureGrad(tCloudNoise, uvc * 0.43 + 0.21, dcx * 0.43, dcy * 0.43).a;
  float dCi = cloudRemap(ci, 0.56, 0.92) * cloudRemap(ciMask, 0.42, 0.78) * 0.5;
  dCi *= smoothstep(0.015, 0.16, rd.y);
  vec3 col = skyCol;
  if (dCi > 0.002) {
    vec3 Lci = uCloudSunCi * (0.16 / LAGOON_PI + cloudHG(cosT, 0.75) * 0.35) + uCloudAmbTop * 0.75;
    float Tp = exp(-tCi * 0.012);
    Lci = Lci * Tp + skyCol * (1.0 - Tp);
    col = mix(col, Lci, dCi);
    cloudAlpha = dCi;
  }

  // ---------------- cumulus layer: height-field clouds (flat bases, rounded tops)
  // marched through the slab so distant clouds show their sides.
  float tB = cloudShellDist(camKm, ry, CLOUD_BASE_KM);
  float tT = cloudShellDist(camKm, ry, CLOUD_BASE_KM + CLOUD_THICK * 0.001);
  vec2 org = cameraPosition.xz + wind;
  vec2 uvB = (org + hd * (tB * 1000.0)) / CLOUD_TILE;
  vec2 dx = dFdx(uvB), dy = dFdy(uvB);
  float horizonFade = smoothstep(0.004, 0.045, rd.y);
  float lh = max(length(uSunDir.xz), 1e-4);
  vec2 sd = uSunDir.xz / lh;
  float rise = uSunDir.y / lh;                        // metres up per metre toward the sun
  float segKm = (tT - tB) / float(CLOUD_STEPS);
  float stepA = 1.0 - exp(-segKm * 14.0);
  float T = 1.0;
  vec3 Lacc = vec3(0.0);
  vec3 Lhit = vec3(0.0);
  bool lit = false;
  float tHit = tB;
  for (int i = 0; i < CLOUD_STEPS; i++) {
    if (horizonFade < 0.001 || T < 0.02) break;
    float fr = (float(i) + 0.5) / float(CLOUD_STEPS); // relative height in the slab
    float tk = mix(tB, tT, fr);
    vec2 uv = (org + hd * (tk * 1000.0)) / CLOUD_TILE;
    vec4 n = textureGrad(tCloudNoise, uv, dx, dy);
    float cov = uCloudCoverage + (n.a - 0.5) * 0.6
              + 0.08 * (1.0 - smoothstep(0.04, 0.4, rd.y))
              - 0.1 * smoothstep(0.8, 0.985, cosT);
    float base = cloudRemap(n.r, 1.0 - cov, 1.0);
    if (base <= 0.0) continue;
    float det = textureGrad(tCloudNoise, uv * 2.2 + vec2(0.13, 0.71), dx * 2.2, dy * 2.2).g;
  #ifdef CLOUD_FINE
    // a finer billow octave (~4 m texels at the cloud layer): crisp cauliflower
    // fringes instead of 30 m-soft edges (textureGrad fades it out with distance)
    float det2 = textureGrad(tCloudNoise, uv * 7.3 + vec2(0.41, 0.27), dx * 7.3, dy * 7.3).g;
    det = det * 0.66 + det2 * 0.34;
  #endif
    // erode only the fringe (the core resists): lumpy, billowy silhouettes
    float dens = cloudRemap(base, det * 0.55 * (1.0 - 0.5 * base), 1.0);
    dens = dens * dens * (3.0 - 2.0 * dens);
    float top = sqrt(dens) * (0.55 + 0.45 * base);    // column height (fraction of the slab)
    float occ = smoothstep(0.0, 0.16, top - fr);
    if (occ <= 0.0) continue;
    if (!lit) {
      lit = true;
      tHit = tk;
      // sun ray from the entry point through the neighbouring cloud tops
      float h0 = fr * CLOUD_THICK;
      float od = 0.0, s = 0.0;
    #ifdef CLOUD_SELFSHADOW
      // billow-scale self-shadowing: the first ~90 m toward the sun through the
      // eroded (detail) shapes, so the lumps of one cloud shade each other - lit
      // cauliflower tops over darker folds instead of one flat tone per cloud
      float tauF = 0.0;
      float covOff = cov - (n.a - 0.5) * 0.6;           // this pixel's view-dependent coverage terms
      for (int j = 0; j < 3; j++) {
        float sf = 16.0 + 30.0 * float(j) + 6.0 * float(j * j);   // 16, 52, 100 m
        vec2 us = uv + sd * (sf / CLOUD_TILE);
        vec4 m = textureGrad(tCloudNoise, us, dx, dy);
        float b2 = cloudRemap(m.r, 1.0 - (covOff + (m.a - 0.5) * 0.6), 1.0);
        float d2 = textureGrad(tCloudNoise, us * 2.2 + vec2(0.13, 0.71), dx * 2.2, dy * 2.2).g;
        float e2 = cloudRemap(b2, d2 * 0.55 * (1.0 - 0.5 * b2), 1.0);
        e2 = e2 * e2 * (3.0 - 2.0 * e2);
        float top2 = CLOUD_THICK * sqrt(e2) * (0.55 + 0.45 * b2);
        tauF += smoothstep(0.0, 80.0, top2 - (h0 + rise * sf)) * (j == 0 ? 0.5 : j == 1 ? 0.8 : 1.0);
      }
    #endif
      for (int j = 0; j < 6; j++) {
        float ds = 90.0 * (1.0 + float(j) * 0.9);
        s += ds;
        vec4 m = textureLod(tCloudNoise, uv + sd * (s / CLOUD_TILE), 1.0);
        float c2 = uCloudCoverage + (m.a - 0.5) * 0.6;
        float b2 = cloudRemap(m.r, 1.0 - c2, 1.0);
        float top2 = CLOUD_THICK * sqrt(b2) * (0.55 + 0.45 * b2);
        od += max(top2 - (h0 + rise * s), 0.0) * ds;
      }
      float tau = od * 3.0e-5 + (1.0 - fr) * dens * 0.8;
    #ifdef CLOUD_SELFSHADOW
      tau += tauF * 0.9;
    #endif
      float Tl = exp(-tau) + 0.16 * exp(-tau * 0.3) + 0.04 * exp(-tau * 0.08);
      float thin = exp(-dens * 3.0);
      // thick cloud reflects like a bright diffuser; thin edges scatter forward (silver lining)
      vec3 sunL = uCloudSun * Tl * (0.8 / LAGOON_PI * (0.5 + 0.5 * (1.0 - thin))
                                    + cloudHG(cosT, 0.7) * 3.2 * (1.0 - thin) * thin);
      // skylight: bases see the ground + haze, upper sides and thin parts the blue sky
      vec3 amb = mix(uCloudAmbBottom, uCloudAmbTop, clamp(0.2 + 0.6 * fr + 0.35 * (1.0 - dens), 0.0, 1.0));
      Lhit = sunL + amb * (0.6 + 0.4 * thin);
    }
    float a = occ * stepA;
    Lacc += T * a * Lhit;
    T *= 1.0 - a;
  }
  if (lit) {
    float a = (1.0 - T) * horizonFade;
    vec3 Lc = Lacc / max(1.0 - T, 1e-4);
    // aerial perspective between viewer and cloud
    float Tp = exp(-tHit * 0.02);
    Lc = Lc * Tp + skyCol * (1.0 - Tp);
    col = mix(col, Lc, a);
    cloudAlpha = 1.0 - (1.0 - cloudAlpha) * (1.0 - a);
  }
  return col;
}
`,k=1.1,A=.7,j=1.1,M=.004654,N=2e4,P=[.46,.38,.28],F=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],I=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * viewMatrix * vec4(cameraPosition + position, 1.0);
  p.z = p.w * 0.999999; // just inside the far plane: only uncovered pixels shade
  gl_Position = p;
}`,L=`
#include <common>
#include <lagoon_common>
${O}
uniform float uEnvPass;          // 1 while capturing the environment map
uniform vec3 uGroundRadiance;    // sunlit sand seen from above (env lower hemisphere)
uniform float uSunDiskRadiance;
uniform float uSunRadius;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  vec3 sky = lagoonSkyRadiance(normalize(vec3(d.x, max(d.y, 0.0025), d.z)));
  float ca;
  vec3 col = skyClouds(d, sky, ca);
  if (uEnvPass < 0.5) {
    // sun disk with limb darkening (redder, dimmer toward the limb)
    float sinA = length(cross(d, uSunDir));
    if (dot(d, uSunDir) > 0.0 && sinA < uSunRadius * 1.5) {
      float x = clamp(sinA / uSunRadius, 0.0, 1.0);
      float mu = sqrt(max(1.0 - x * x, 0.0));
      vec3 limb = vec3(1.0) - vec3(0.42, 0.52, 0.64) * (1.0 - mu) - vec3(0.12, 0.13, 0.14) * (1.0 - mu * mu);
      float edge = 1.0 - smoothstep(0.93, 1.0, sinA / uSunRadius);
      col += uSunColor * uSunDiskRadiance * limb * edge * (1.0 - ca);
    }
  }
  if (d.y < 0.0) {
    vec3 haze = lagoonHazeColor(d);
    col = uEnvPass > 0.5 ? mix(haze, uGroundRadiance, smoothstep(0.0, 0.08, -d.y)) : haze;
  }
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}`;function R(e){let t=e._allocateTargets;typeof t==`function`&&(e._allocateTargets=function(...e){let n=t.apply(this,e),r=this._ggxMaterial,i=`for(uint i = 0u; i < uint(GGX_SAMPLES); i++)`;return r&&!r.userData.lagoonQuiet&&r.fragmentShader.includes(i)&&(r.uniforms.uGgxSamples={value:r.defines?.GGX_SAMPLES??256},r.uniforms.uGgxFirst={value:0},r.fragmentShader=r.fragmentShader.replace(`uniform float mipInt;`,`uniform float mipInt;
uniform float uGgxSamples;
uniform float uGgxFirst;`).replace(i,`for(uint i = uint(uGgxFirst); i < uint(uGgxSamples); i++)`),r.userData.lagoonQuiet=!0,r.needsUpdate=!0),n})}async function z(e){let{scene:t,renderer:r,G:i,tex:o,params:s}=e,l=performance.now(),d=i.uSunDir.value,f={};s?.has(`aerosol`)&&(f.aerosol=s.num(`aerosol`,2.6)),s?.has(`mieg`)&&(f.mieG=s.num(`mieg`,.8));let p=T(r,d,1,f),g=p.probe(),_={};if(g){let e=g.sunT,t=Math.max(.05,d.y),n=F([0,1,2].map(n=>P[n]*(e[n]*t+g.skyIrradiance[n])/Math.PI)),r=k/Math.max(1e-6,n);p.rebakeSkyView(r);let a=g.sunT;Math.max(a[0],a[1],a[2]);let o=s?.has(`sunchroma`)?s.num(`sunchroma`,A):A,c=a.map(e=>Math.max(e,1e-6)**+o),l=Math.max(c[0],c[1],c[2]),u=c.map(e=>e/l);i.uSunColor.value.setRGB(u[0],u[1],u[2]),i.uSunIntensity.value=r*F(a)/Math.max(1e-6,F(u));let f=e=>[e[0]*r,e[1]*r,e[2]*r];i.uSkyZenith.value.fromArray(f(g.zenith)),i.uSkyHorizon.value.fromArray(f(g.horizonAvg)),i.uFogColor.value.fromArray(f([.5*(g.horizon90[0]+g.horizonAnti[0]),.5*(g.horizon90[1]+g.horizonAnti[1]),.5*(g.horizon90[2]+g.horizonAnti[2])])),i.uFogSunColor.value.fromArray(f(g.horizonSun)),Object.assign(_,{eToa:r,sunT:a,sunIntensity:i.uSunIntensity.value,sunColor:i.uSunColor.value.toArray(),zenith:f(g.zenith),horizonAvg:f(g.horizonAvg),horizonSun:f(g.horizonSun),horizonAnti:f(g.horizonAnti),skyIrradiance:f(g.skyIrradiance),skyAvg:f(g.skyAvg),sunTCloud:g.sunTCloud,sunTCirrus:g.sunTCirrus})}else console.warn(`[lagoon] sky: probe unavailable, using default calibration`),p.rebakeSkyView(22),Object.assign(_,{eToa:22,sunT:[.86,.57,.33],sunTCloud:[.9,.66,.42],sunTCirrus:[.93,.75,.55],skyIrradiance:[2.2,2.4,2.8],skyAvg:[.7,.8,1],zenith:i.uSkyZenith.value.toArray(),horizonAvg:i.uSkyHorizon.value.toArray()});i.tSkyView.value=p.skyView,i.uSkyViewReady.value=1;let v=i.uSunIntensity.value,y=i.uSunColor.value,b=Math.max(.05,d.y),x=_.skyIrradiance,S=[0,1,2].map(e=>P[e]*(v*[y.r,y.g,y.b][e]*b+x[e])/Math.PI);_.sunlitSand=F(S),i.uSkyOccBounce&&i.uSkyOccBounce.value.setRGB(Math.PI*.12*S[0],Math.PI*.12*S[1],Math.PI*.12*S[2]),_.shadedSand=F([0,1,2].map(e=>P[e]*x[e]/Math.PI));let C=i.uWaterAbsorb.value;i.uLagoonBounce.value.setRGB(_.sunlitSand*(.55*Math.exp(-C.x*2.4)+.02),_.sunlitSand*(.55*Math.exp(-C.y*2.4)+.06),_.sunlitSand*(.55*Math.exp(-C.z*2.4)+.08));let w=D();w.tCloudNoise.value=o.bake(E,{size:1024,name:`cloudNoise`,anisotropy:8});let O=_.eToa;w.uCloudSun.value.setRGB(_.sunTCloud[0]*O,_.sunTCloud[1]*O,_.sunTCloud[2]*O),w.uCloudSunCi.value.setRGB(_.sunTCirrus[0]*O,_.sunTCirrus[1]*O,_.sunTCirrus[2]*O);let z=_.skyAvg;w.uCloudAmbTop.value.setRGB(z[0]*1.1,z[1]*1.1,z[2]*1.1),w.uCloudAmbBottom.value.setRGB(.35*S[0]+.18*_.horizonAvg[0],.35*S[1]+.18*_.horizonAvg[1],.35*S[2]+.18*_.horizonAvg[2]),w.uCloudWind.value.set(i.uWindDir.value.x,i.uWindDir.value.y).multiplyScalar(6.5);let B=new a().fromArray(S).multiplyScalar(.8);if(i.uEnvGround.value.copy(B),i.uGroundBounceParams.value.w=j*(s?.has(`bounce`)?s.num(`bounce`,1):1),s?.has(`haze`)&&(i.uHazeNear.value.x*=s.num(`haze`,1)),i.uCanopyFill){let e=[.62,.92,.32],t=F(e),n=.1*F(x);i.uCanopyFill.value.setRGB(n*e[0]/t,n*e[1]/t,n*e[2]/t),s?.has(`canopy`)&&(i.uCanopyParams.value.x*=s.num(`canopy`,1))}let V={...i,...w,uEnvPass:{value:0},uGroundRadiance:{value:B.clone()},uSunDiskRadiance:{value:Math.min(N,v/(Math.PI*M*M))},uSunRadius:{value:M}},H=e.quality?.name,U=!!(e.quality?.cinematic||H===`cinematic`),W={CLOUD_STEPS:U?28:H===`ultra`?20:12};(s?.has(`cloudfine`)?s.num(`cloudfine`,1)>0:U||H===`ultra`)&&(W.CLOUD_FINE=``);let G=U||H===`ultra`||H===`high`;(s?.has(`cloudshade`)?s.num(`cloudshade`,1)>0:G)&&(W.CLOUD_SELFSHADOW=``);let K=new m({name:`sky`,defines:W,uniforms:V,vertexShader:I,fragmentShader:L,side:2,depthWrite:!1,depthTest:!0});K.userData.noPatch=!0;let q=new c(new n(100,6),K);q.frustumCulled=!1,q.renderOrder=1e6,q.castShadow=!1,q.receiveShadow=!1,q.name=`sky`,t.add(q);let J=new h(r);R(J);let Y=new u,X=new c(q.geometry,K);X.frustumCulled=!1,Y.add(X),V.uEnvPass.value=1;let Z=J.fromScene(Y,0,.1,1e3,{size:256});V.uEnvPass.value=0,t.environment=Z.texture,t.environmentIntensity=j,J.dispose(),_.ms=Math.round(performance.now()-l);let Q=e=>e?`(${e.map(e=>e.toFixed(3)).join(`, `)})`:`-`;return console.log(`[lagoon] sky: E_toa ${_.eToa.toFixed(2)} sun ${v.toFixed(2)}*${Q(y.toArray())} zenith ${Q(_.zenith)} horizon ${Q(_.horizonAvg)} toward-sun ${Q(_.horizonSun)} anti ${Q(_.horizonAnti)} skyE ${Q(x)} sand lit~${_.sunlitSand.toFixed(2)} shade~${_.shadedSand.toFixed(2)} (${_.ms} ms)`),{dome:q,envTexture:Z.texture,atmosphere:p,calib:_,uniforms:V}}export{z as build};