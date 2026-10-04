var e=8,t=`
varying vec3 vWorld;
varying float vViewZ;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  vec4 mv = viewMatrix * w;
  vViewZ = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,n=`
#ifdef ENVMAP_TYPE_CUBE_UV
uniform sampler2D tWEnv;
#include <cube_uv_reflection_fragment>
#endif
uniform float uWEnvIntensity;
uniform vec3 uWAbsorb;
uniform vec3 uWScatter;
uniform float uWInScatter;
uniform float uWSunPathK;

float wPow5(float x) { float x2 = x * x; return x2 * x2 * x; }

// Sky radiance along d (PMREM environment when available, else analytic).
vec3 wSky(vec3 d, float rough) {
#ifdef ENVMAP_TYPE_CUBE_UV
  return textureCubeUV(tWEnv, d, rough).rgb * uWEnvIntensity;
#else
  float h = clamp(d.y, 0.0, 1.0);
  vec3 c = mix(uSkyHorizon, uSkyZenith, sqrt(h));
  float s = max(dot(d, uSunDir), 0.0);
  float s2 = s * s; float s4 = s2 * s2; float s8 = s4 * s4;
  c += uSunColor * (s8 * 0.6);
  return c * 1.6 * uWEnvIntensity;
#endif
}

// Light that illuminates the water body at depth z (sun through the surface + sky).
// sv = sun visibility at the surface (1 lit, 0 in shadow).
vec3 wWaterLight(float z, float sv) {
  vec3 sigT = uWAbsorb + uWScatter;
  float sunEl = max(uSunDir.y, 0.02);
  // Fresnel transmission of the low sun into the water (~0.7 at 12 deg elevation)
  float Ts = 1.0 - (0.0204 + 0.9796 * wPow5(1.0 - sunEl));
  vec3 sun = uSunColor * uSunIntensity * Ts * sv * exp(-sigT * z * uWSunPathK);
  vec3 sky = mix(uSkyHorizon, uSkyZenith, 0.55) * 1.6 * exp(-sigT * z * 1.2);
  return (sun * 0.16 + sky * 0.9) * uWInScatter;
}

// Radiance of a white Lambertian surface (foam, spray) with normal n: sun (sv =
// visibility) + sky irradiance (the rough-convolved environment ~ E_sky / pi).
vec3 wFoamLight(vec3 n, float sv) {
  return uSunColor * (uSunIntensity * max(dot(n, uSunDir), 0.0) * sv * 0.3183) + wSky(vec3(0.0, 1.0, 0.0), 1.0);
}

// Single-scattering in-scatter along a path of length L that dips to column depth z.
vec3 wInScatter(float L, float z, float sv) {
  vec3 sigT = uWAbsorb + uWScatter;
  vec3 Tv = exp(-sigT * L);
  return wWaterLight(min(z, 3.0) * 0.5, sv) * (uWScatter / sigT) * (1.0 - Tv);
}
`,r=`
#include <common>
#include <lagoon_common>
#include <lagoon_depth>
${n}
#ifndef WATER_Q
#define WATER_Q 2
#endif
uniform sampler2D tWReflection;
uniform mat4 uWReflMatrix;
uniform float uWReflValid;
uniform vec4 uWReflRect;
uniform float uWReflDist;
uniform float uWReflTexH;      // mirror texture height (texels), for the blur lod
uniform float uWReflBlur;      // 0 = sharp mirror (A/B), 1 = physical blur
uniform sampler2D tWWaveA;
uniform sampler2D tWWaveB;
uniform sampler2D tWFoam;
uniform vec2 uWWind;
uniform vec3 uWTile;
uniform vec3 uWAmp;
uniform vec3 uWSpeed;
uniform vec4 uWGust;           // tile along the wind (m), drift (m/s), gain in slicks, gain in gusts
uniform vec4 uWCap;            // capillary tile (m), rms slope, speed (m/s), unused
uniform vec4 uWGlintP;         // micro slope rms in slicks, in gusts, spec clamp, unused
uniform vec4 uWLap;            // swash amplitude (m), period 1 (s), period 2 (s), foam gain
uniform float uWRefr;
uniform float uWGlint;
uniform float uWFoam;
uniform float uWDebug;
uniform vec4 uWImpacts[4];     // x, z, r, strength
uniform vec4 uWImpactsB[4];    // across-curtain dir x, z, curtain half-length (m), 0
uniform float uWImpactCount;
uniform vec4 uWRings[${e}];
uniform float uWRingCount;
varying vec3 vWorld;
varying float vViewZ;

// explicit gradients (loops / branches must not rely on implicit derivatives)
vec2 gWx, gWy;
float gFp;     // pixel footprint on the water (m)
float gFpMaj;  // its long axis (m): along the view direction at grazing angles
float gExpo;   // 0 sheltered shore .. 1 shore the wind waves run onto (lee shore)

vec2 wSlopeTex(sampler2D t, vec2 p, vec2 dir, float tile, float speed) {
  vec2 perp = vec2(-dir.y, dir.x);
  vec2 uv = vec2(dot(p, dir), dot(p, perp)) / tile;
  uv.x -= uTime * speed / tile;
  vec2 gx = vec2(dot(gWx, dir), dot(gWx, perp)) / tile;
  vec2 gy = vec2(dot(gWy, dir), dot(gWy, perp)) / tile;
  vec2 s = (textureGrad(t, uv, gx, gy).rg * 2.0 - 1.0) * 4.0;
  return s.x * dir + s.y * perp;
}

// Fraction of a layer's slope energy (wavelengths lamMin..lamMax, m) that the
// mipmapped map averages away at pixel footprint fp (m).
float wLost(float fp, float lamMin, float lamMax) {
  return clamp(log2(max(2.0 * fp / lamMin, 1.0)) / log2(lamMax / lamMin), 0.0, 1.0);
}

// Gust field 0..1: large patches and cat's paws drifting downwind, stretched along
// it (wind streaks). Low = glassy slick, high = rippled patch.
float wGustAt(vec2 p) {
#if WATER_Q >= 1
  vec2 w = normalize(uWWind + vec2(1e-4));
  vec2 q = vec2(dot(p, w), dot(p, vec2(-w.y, w.x)));
  float t = uTime * uWGust.y;
  float a = texture2D(tWFoam, vec2((q.x - t) / uWGust.x, q.y / (uWGust.x * 0.34))).a;
  float b = texture2D(tWFoam, vec2((q.x - t * 1.4) / (uWGust.x * 0.41) + 0.31, q.y / (uWGust.x * 0.16) + 0.57)).a;
  return smoothstep(0.4, 0.68, a * 0.62 + b * 0.45);
#else
  return 0.5;
#endif
}

// Ripple slope field (world dh/dx, dh/dz). fp = pixel footprint (m), amp = local
// scale (calm near shore, churned at the plunge pools), gust = wGustAt().
// lost = mean-square slope (x + z) of the ripples finer than the pixel.
// sR = the slope the REFRACTED image may follow: only ripples resolved over several
// pixels along the footprint's LONG axis (gFpMaj). Refraction magnifies a tilt into a
// screen offset of many pixels, so a ripple finer than that would fold the floor
// image into a jagged mosaic; physically those ripples blur the floor instead.
vec2 wSlope(vec2 p, float fp, float amp, float gust, out float lost, out vec2 sR) {
  vec2 w = normalize(uWWind + vec2(1e-4));
  vec2 d1 = vec2(w.x * -0.33 - w.y * 0.94, w.x * 0.94 + w.y * -0.33); // wind rotated ~110 deg
  vec2 d2 = vec2(w.x * 0.70 + w.y * 0.71, -w.x * 0.71 + w.y * 0.70);  // rotated ~-45 deg
  float g = mix(uWGust.z, uWGust.w, gust);           // local wind gain
  float a1 = uWAmp.x * mix(1.0, g, 0.55);
  float a2 = uWAmp.y * mix(1.0, g, 0.3);
  float a3 = uWAmp.z * g;
  float l1 = wLost(fp, 0.38, 6.5), l2 = wLost(fp, 0.156, 2.65), l3 = wLost(fp, 0.0475, 0.63);
  float fr = gFpMaj * 6.0;                           // refraction: ~6 px per wavelength
  float r1 = 1.0 - wLost(fr, 0.38, 6.5), r2 = 1.0 - wLost(fr, 0.156, 2.65), r3 = 1.0 - wLost(fr, 0.0475, 0.63);
  vec2 t1 = wSlopeTex(tWWaveA, p, w, uWTile.x, uWSpeed.x) * a1;
  vec2 t2 = wSlopeTex(tWWaveA, p + vec2(37.1, 11.7), d1, uWTile.y, uWSpeed.y) * a2;
  vec2 t3 = wSlopeTex(tWWaveB, p, d2, uWTile.z, uWSpeed.z) * a3;
  vec2 s = t1 * (1.0 - 0.45 * l1) + t2 * (1.0 - 0.45 * l2) + t3 * (1.0 - 0.45 * l3);
  sR = t1 * (r1 * r1) + t2 * (r2 * r2) + t3 * (r3 * r3);
  lost = 2.0 * (a1 * a1 * l1 + a2 * a2 * l2 + a3 * a3 * l3);
  // capillaries (1-16 cm): they appear with the wind and die in the slicks
  float a4 = uWCap.y * g * g;
#if WATER_Q >= 2
  vec2 d3 = vec2(w.x * 0.42 - w.y * 0.91, w.x * 0.91 + w.y * 0.42);   // rotated ~65 deg
  float l4 = wLost(fp, uWCap.x / 40.0, uWCap.x / 3.0);
  float r4 = 1.0 - wLost(fr, uWCap.x / 40.0, uWCap.x / 3.0);
  vec2 t4 = wSlopeTex(tWWaveB, p + vec2(5.3, 17.9), d3, uWCap.x, uWCap.z) * a4;
  s += t4 * (1.0 - 0.6 * l4);
  sR += t4 * (r4 * r4);
  lost += 2.0 * a4 * a4 * l4;
#else
  lost += 2.0 * a4 * a4;
#endif
  // a few analytic long, low swells (deep-water dispersion)
  float t = uTime;
  vec3 k1 = vec3(normalize(vec2(0.8, 0.6)), 0.61);   // dir, wavenumber (lambda ~10 m)
  vec3 k2 = vec3(normalize(vec2(-0.3, 0.95)), 0.93);
  vec3 k3 = vec3(normalize(vec2(0.95, -0.2)), 1.47);
  vec2 sw = k1.xy * (0.010 * cos(dot(p, k1.xy) * k1.z - t * sqrt(9.81 * k1.z)));
  sw += k2.xy * (0.008 * cos(dot(p, k2.xy) * k2.z - t * sqrt(9.81 * k2.z) + 1.7));
  sw += k3.xy * (0.006 * cos(dot(p, k3.xy) * k3.z - t * sqrt(9.81 * k3.z) + 4.1));
  s += sw;
  sR = (sR + sw) * amp;
  lost *= amp * amp;
  return s * amp;
}

// Beckmann-Smith G1 (rational approximation), m2 = mean-square slope.
float wSmithG1(float c, float m2) {
  c = clamp(c, 1e-3, 1.0);
  float a = c / max(sqrt(m2 * (1.0 - c * c)), 1e-5);
  if (a >= 1.6) return 1.0;
  return (3.535 * a + 2.181 * a * a) / (1.0 + 2.276 * a + 2.577 * a * a);
}

// Mirror image with the ripples finer than the pixel as a blur: along the screen
// vertical (tilts toward/away from the eye swing the reflected ray up and down)
// and a little across (tilts sideways are foreshortened by the grazing angle).
vec3 wPlanar(vec2 rv, float blurV, float blurH) {
  vec2 lo = uWReflRect.xy + 0.002, hi = uWReflRect.zw - 0.002;
  float bias = clamp(log2(max(blurH * uWReflTexH, 1.0)), 0.0, 3.0);
#if WATER_Q >= 3
  vec3 c = texture2D(tWReflection, clamp(rv, lo, hi), bias).rgb * 0.2;
  c += texture2D(tWReflection, clamp(rv + vec2(0.0, 0.28 * blurV), lo, hi), bias).rgb * 0.17;
  c += texture2D(tWReflection, clamp(rv - vec2(0.0, 0.28 * blurV), lo, hi), bias).rgb * 0.17;
  c += texture2D(tWReflection, clamp(rv + vec2(0.0, 0.62 * blurV), lo, hi), bias).rgb * 0.14;
  c += texture2D(tWReflection, clamp(rv - vec2(0.0, 0.62 * blurV), lo, hi), bias).rgb * 0.14;
  c += texture2D(tWReflection, clamp(rv + vec2(0.0, 1.05 * blurV), lo, hi), bias).rgb * 0.09;
  c += texture2D(tWReflection, clamp(rv - vec2(0.0, 1.05 * blurV), lo, hi), bias).rgb * 0.09;
  return c;
#elif WATER_Q >= 2
  vec3 c = texture2D(tWReflection, clamp(rv, lo, hi), bias).rgb * 0.28;
  c += texture2D(tWReflection, clamp(rv + vec2(0.0, 0.4 * blurV), lo, hi), bias).rgb * 0.22;
  c += texture2D(tWReflection, clamp(rv - vec2(0.0, 0.4 * blurV), lo, hi), bias).rgb * 0.22;
  c += texture2D(tWReflection, clamp(rv + vec2(0.0, 1.0 * blurV), lo, hi), bias).rgb * 0.14;
  c += texture2D(tWReflection, clamp(rv - vec2(0.0, 1.0 * blurV), lo, hi), bias).rgb * 0.14;
  return c;
#elif WATER_Q >= 1
  vec3 c = texture2D(tWReflection, clamp(rv, lo, hi), bias).rgb * 0.4;
  c += texture2D(tWReflection, clamp(rv + vec2(0.0, 0.7 * blurV), lo, hi), bias).rgb * 0.3;
  c += texture2D(tWReflection, clamp(rv - vec2(0.0, 0.7 * blurV), lo, hi), bias).rgb * 0.3;
  return c;
#else
  return texture2D(tWReflection, clamp(rv, lo, hi), bias).rgb;
#endif
}

// Plunge-pool foam at p: bubble lace + large rafts advected by the surface current
// (outward from the curtain, slowing, with a slow swirl), two-phase flow map (no
// seams). dir = unit vector away from the curtain line, rn = distance / r.
// Returns (lace 0..1, rafts 0..1, boil texture 0..1). Scales are chosen so the
// patterns stay resolved from the pool edge (cells 15-40 cm, rafts metres wide).
// Variance-preserving blend of two flow-map phases (a plain crossfade of two
// uncorrelated patterns halves their contrast mid-cycle, so thresholded foam would
// pulse); m = the pattern's mean.
float wFlowMix(float a, float b, float w, float m) {
  return m + (mix(a, b, w) - m) * inversesqrt(w * w + (1.0 - w) * (1.0 - w));
}

vec3 wPoolFoam(vec2 p, vec2 dir, float rn) {
  vec2 tang = vec2(-dir.y, dir.x);
  vec2 vel = dir * (1.1 / (1.0 + 1.6 * rn)) + tang * 0.1;
  float T = 2.4;
  float ph0 = fract(uTime / T), ph1 = fract(uTime / T + 0.5);
  float wt = abs(1.0 - 2.0 * ph0);
  vec2 o0 = vel * (ph0 * T), o1 = vel * (ph1 * T);
  vec2 gx = gWx, gy = gWy;
  float lace = wFlowMix(textureGrad(tWFoam, (p - o1) * 0.31 + vec2(0.37, 0.21), gx * 0.31, gy * 0.31).r,
                        textureGrad(tWFoam, (p - o0) * 0.31, gx * 0.31, gy * 0.31).r, wt, 0.3);
  float rafts = wFlowMix(textureGrad(tWFoam, (p - o1) * 0.085 + vec2(0.13, 0.71), gx * 0.085, gy * 0.085).a,
                         textureGrad(tWFoam, (p - o0) * 0.085 + vec2(0.61, 0.13), gx * 0.085, gy * 0.085).a, wt, 0.5);
  // the boil churns faster and coarser
  float Tb = 1.1;
  float q0 = fract(uTime / Tb), q1 = fract(uTime / Tb + 0.5);
  float wb = abs(1.0 - 2.0 * q0);
  vec2 vb = dir * 1.8 + tang * 0.3;
  float boil = wFlowMix(textureGrad(tWFoam, (p - vb * (q1 * Tb)) * 0.22 + vec2(0.52, 0.33), gx * 0.22, gy * 0.22).b,
                        textureGrad(tWFoam, (p - vb * (q0 * Tb)) * 0.22 + vec2(0.07, 0.88), gx * 0.22, gy * 0.22).b, wb, 0.5);
  return vec3(clamp(lace, 0.0, 1.0), smoothstep(0.3, 0.7, rafts), clamp(boil, 0.0, 1.0));
}

// Beckmann NDF (m2 = mean-square slope, c = cos theta_h).
float wBeckmann(float c, float m2) {
  float c2 = c * c;
  return exp(-(1.0 - c2) / (c2 * m2)) / (3.14159 * m2 * c2 * c2);
}

// Stochastic glitter: the unresolved facets are grouped into world-locked cells about
// one pixel wide (two power-of-two levels blended by footprint, so nothing swims or
// pops as the camera moves); each cell gets a random tilt carrying kSp of the unresolved
// slope variance and twinkles (a new tilt every ~0.14 s, faded in and out). Averaged
// over cells this equals the smooth lobe D(N, m2), so the glitter path keeps its
// energy while breaking into discrete sparkles the way sun glint on wind-rippled
// water does. Returns the NDF value to use instead of D(N, m2).
float wSparkleLevel(vec2 p, float lev, vec3 N, vec3 H, float sig, float m2r) {
  float c = exp2(lev);
  vec2 id = floor(p / c) + vec2(lev * 37.0, lev * 11.0);
  float h0 = lagoonHash(id);
  float ph = uTime * 7.0 + h0 * 7.0;
  float tid = floor(ph);
  float env = sin(3.14159 * fract(ph)) * 1.5708;
  vec2 q = id + vec2(tid * 17.31, tid * 41.97);
  vec2 g = vec2(lagoonHash(q) + lagoonHash(q + 3.7) + lagoonHash(q + 9.1),
                lagoonHash(q + 5.3) + lagoonHash(q + 13.9) + lagoonHash(q + 21.7)) - 1.5;
  g *= 2.0 * sig;                                  // ~gaussian, per-axis rms = sig
  vec3 Ns = normalize(N + vec3(-g.x, 0.0, -g.y));
  return wBeckmann(clamp(dot(Ns, H), 1e-3, 1.0), m2r) * env;
}

float wGlitterD(vec2 p, vec3 N, vec3 H, float m2, float lost) {
  float kSp = 0.8;
  float sig = sqrt(max(lost * 0.5 * kSp, 0.0));
  float m2r = max(m2 - lost * kSp, 2.2e-5);
  float lf = log2(max(gFp, 1e-4) * 1.3);
  float l0 = floor(lf), bl = lf - l0;
  float d0 = wSparkleLevel(p, l0, N, H, sig, m2r);
  float d1 = wSparkleLevel(p, l0 + 1.0, N, H, sig, m2r);
  return mix(d0, d1, bl);
}

vec3 shadeAbove(vec3 N, vec3 V, float dist, vec2 suv, vec2 slope, vec2 slopeR, float lost, float gust,
                float aer, float boil, float poolFoam, float poolShade, vec4 mask) {
  float NdV = max(dot(N, V), 0.0);

  // ---- scene behind the surface (undistorted)
  float rawD = texture2D(tSceneDepth, suv).r;
  vec3 floorP = lagoonWorldPosFromDepth(suv, rawD);
  float depthV = max(vWorld.y - floorP.y, 0.0);

  // ---- lapping swash: the waterline breathes a couple of centimetres (two
  // wavelet trains arriving obliquely), so on a gentle beach the edge slides
  // back and forth over the terrain's wet band; dE = effective water depth.
  float ph1 = uTime * (6.2831853 / uWLap.y) + dot(vWorld.xz, vec2(0.23, 0.14)) + 0.9 * sin(dot(vWorld.xz, vec2(0.051, -0.073)));
  float ph2 = uTime * (6.2831853 / uWLap.z) + dot(vWorld.xz, vec2(-0.17, 0.26)) + 1.3;
  float lapH = uWLap.x * mix(0.45, 1.0, gExpo) * (0.31 * (1.0 - cos(ph1)) + 0.19 * (1.0 - cos(ph2)));
  float uprush = clamp(-(sin(ph1) * 0.62 + sin(ph2) * 0.38), 0.0, 1.0);  // edge advancing
  // a few millimetres of static relief (sand ripples, grains) so the edge meanders
  // instead of following the terrain's straight triangle edges
  float edgeN = texture2D(tWFoam, vWorld.xz * 0.21 + vec2(0.3, 0.7)).b - 0.5;
  float dE = depthV - lapH + edgeN * 0.014;

  // ---- refraction: offset by the view-space tilt of the resolved ripples (slopeR),
  // scaled by water depth
  vec3 NR = normalize(vec3(-slopeR.x, 1.0, -slopeR.y));
  vec3 tiltV = (viewMatrix * vec4(NR.x, 0.0, NR.z, 0.0)).xyz;
  vec2 off = tiltV.xy * uWRefr * clamp(depthV, 0.0, 2.5) / max(vViewZ, 1.5);
  vec2 ruv = clamp(suv + off, vec2(0.001), vec2(0.999));
  float rawD2 = texture2D(tSceneDepth, ruv).r;
  if (lagoonLinearDepth(rawD2) < vViewZ) { ruv = suv; rawD2 = rawD; } // landed on foreground
  vec3 refr = texture2D(tSceneColor, ruv).rgb;
  vec3 floor2 = lagoonWorldPosFromDepth(ruv, rawD2);
  float pathV = clamp(distance(floor2, vWorld), 0.0, 150.0);
  float colD = clamp(vWorld.y - floor2.y, 0.0, 40.0);

  // ---- Beer-Lambert along the upwelling view path (the floor already received
  //      attenuated downwelling sun + caustics from materialPatch), plus in-scatter
  vec3 sigT = uWAbsorb + uWScatter;
  vec3 Tf = exp(-sigT * pathV);
  // sun visibility at the surface (static village shadow map: trees, houses, cliffs)
  float sunVis = mix(0.12, 1.0, lagoonStaticShadowTap(vWorld));
  vec3 below = refr * Tf + wInScatter(pathV, colD, sunVis);

  // ---- reflection: planar mirror image, distorted along the perturbed reflected
  // ray (resolved ripples) and blurred by the unresolved ones
  vec3 R = reflect(-V, N);
  R.y = abs(R.y) + 0.002;
  R = normalize(R);
  vec4 rp = uWReflMatrix * vec4(vWorld + R * uWReflDist, 1.0);
  vec2 rv = rp.xy / max(rp.w, 1e-4);
  float sigL = sqrt(lost * 0.5);                        // unresolved rms slope per axis
  float p11 = 1.0 / max(uProjectionInverse[1][1], 1e-3);
  float blurV = min(sigL * p11 * uWReflBlur, 0.08);
  float blurH = blurV * max(V.y, 0.12);
  vec3 planar = wPlanar(rv, blurV, blurH);
  // only uWReflRect of the mirror texture was rendered this frame (the water's
  // screen rect, padded); fade to the environment toward its edges
  vec2 eLo = rv - uWReflRect.xy, eHi = uWReflRect.zw - rv;
  float edge = min(min(eLo.x, eHi.x), min(eLo.y, eHi.y));
  float wPlanarW = uWReflValid * smoothstep(-0.02, 0.05, edge);
  // environment fallback only where the mirror image is missing (frame edges, skipped pass)
  vec3 refl = planar;
  if (wPlanarW < 0.995) refl = mix(wSky(R, 0.05 + sigL * 2.0), planar, wPlanarW);

  // bubble-laden water around a plunge point scatters light back up (milky turquoise)
  below = mix(below, wWaterLight(0.4, sunVis) * vec3(0.55, 0.95, 0.92) * 1.6, clamp(aer * 1.2, 0.0, 1.0) * 0.55);

  float F = 0.0204 + 0.9796 * wPow5(1.0 - NdV);
  vec3 col = mix(below, refl, F);

  // ---- sun glitter: Beckmann facets. The resolved normal N places each sparkle;
  // m2 = capillaries finer than the maps (rougher in the gusts) + ripples averaged
  // away inside this pixel + the sun disk (0.27 deg).
  vec3 Hh = normalize(uSunDir + V);
  float NdH = clamp(dot(N, Hh), 1e-3, 1.0);
  float NdL = dot(N, uSunDir);
  float mMicro = mix(uWGlintP.x, uWGlintP.y, gust);
  float m2 = mMicro * mMicro + lost + 2.2e-5;
#if WATER_Q >= 1
  float D = wGlitterD(vWorld.xz, N, Hh, m2, lost);
#else
  float D = wBeckmann(NdH, m2);
#endif
  float FH = 0.0204 + 0.9796 * wPow5(1.0 - max(dot(V, Hh), 0.0));
  float Gs = wSmithG1(NdV, m2) * wSmithG1(max(NdL, 0.0), m2);
  float spec = D * FH * Gs / (4.0 * max(NdV, 0.02)) * step(0.0, NdL);
  float foamCover = max(poolFoam, boil);
  col += uSunColor * uSunIntensity * min(spec, uWGlintP.z) * uWGlint * (1.0 - foamCover) * sunVis * sunVis;

  // ---- shoreline: a thin, broken thread of fine bubbles riding the swash front
  // (strongest on the uprush and on the shores the wind waves run onto; sheltered
  // coves get almost none) with sparse bubbles trailing behind it, and a faint wet
  // collar at rocks / posts / reeds. Bubble cells 2-4 cm, grouped into clumps and
  // metre-long stretches; below a pixel the pattern turns into its mean coverage.
  vec2 fdr = vec2(uTime * 0.013, -uTime * 0.009);
  vec4 fz = texture2D(tWFoam, vWorld.xz * 1.1 + slope * 0.4 + fdr);
  vec4 fzf = texture2D(tWFoam, vWorld.xz * 2.9 + vec2(0.41, 0.17) + slope * 0.6 - fdr * 1.7);
  vec4 fz2 = texture2D(tWFoam, vWorld.xz * 0.13 - vec2(uTime * 0.007, uTime * 0.004));
  float aaD = max(fwidth(depthV), 1e-4);
  float slopeW = clamp(aaD / max(length(fwidth(vWorld.xz)), 1e-4), 0.02, 4.0);
  float steep = smoothstep(0.4, 1.8, slopeW);
  float edgeW = max(0.005, 1.2 * aaD);
  float front = smoothstep(-0.4 * edgeW, 0.05 * edgeW, dE) * (1.0 - smoothstep(0.4 * edgeW, 1.2 * edgeW, dE));
  float trail = smoothstep(0.3 * edgeW, 0.9 * edgeW, dE) * (1.0 - smoothstep(1.1 * edgeW, 3.4 * edgeW, dE));
  float bubF = fzf.r * 0.7 + fz.r * 0.4 + (fzf.b - 0.5) * 0.5;
  float stretch = smoothstep(0.2, 0.58, fz2.a + (fz2.b - 0.5) * 0.4 + 0.18 * uprush);
  float resolved = 1.0 - smoothstep(0.012, 0.05, gFp);
  float cover = mix(0.36, smoothstep(0.34, 0.74, bubF + 0.12 * uprush), resolved);
  float trailCover = mix(0.1, smoothstep(0.74, 0.96, bubF), resolved);
  float foam = (front * cover + trail * trailCover * 0.7) * stretch * (0.55 + 0.45 * uprush) * (1.0 - 0.6 * steep);
  foam *= mix(0.45, 0.95, gExpo);
  float collar = (1.0 - smoothstep(0.0, 0.05, dE)) * smoothstep(0.0, 0.004, dE) * steep;
  foam = max(foam, collar * smoothstep(0.5, 0.9, fz.b * 0.8 + fz.r * 0.5 * (0.4 + 0.8 * fz2.a)) * 0.55);
  foam *= uWLap.w;
  // plunge pools
  foam = max(foam, poolFoam);
  foam = max(foam, boil);
  foam = clamp(foam * uWFoam, 0.0, 1.0);
  // foam: albedo ~0.8 bubbles on a gently heaving surface (sun + sky, no glow)
  vec3 foamN = normalize(vec3(N.x * 3.0, 1.0, N.z * 3.0));
  float poolW = clamp(max(poolFoam, boil) * 2.0, 0.0, 1.0);
  vec3 foamCol = 0.85 * wFoamLight(foamN, sunVis) * mix(0.82 + 0.25 * fz.r, poolShade, poolW);
  // the swash front is a curved meniscus: it catches the sky over a wider range of
  // angles than the flat film, a thin bright thread at the water's edge
  vec3 menisc = max(refl, wSky(normalize(vec3(-V.x, 0.8, -V.z)), 0.2));
  col = mix(col, menisc, front * 0.28 * (1.0 - steep));
  col = mix(col, foamCol, foam);

  // soft intersection: blend back to the undistorted scene where the water is
  // paper-thin or has drawn back down the beach (wet sand shows through)
  vec3 sceneRaw = texture2D(tSceneColor, suv).rgb;
  col = mix(sceneRaw, col, smoothstep(-0.002, max(0.012, 1.5 * aaD), dE));
  vec3 outC = lagoonAtmosphere(col, vWorld);
  if (uWDebug > 0.5) {
    outC = vec3(sqrt(m2) * 8.0, blurV * 20.0, foam);
    if (uWDebug < 5.5) outC = vec3(gust);
    if (uWDebug < 4.5) outC = below;
    if (uWDebug < 3.5) outC = vec3(fract(depthV), depthV / 6.0, pathV / 30.0);
    if (uWDebug < 2.5) outC = N * 0.5 + 0.5;
    if (uWDebug < 1.5) outC = planar;
    if (uWDebug > 6.5) outC = vec3(gExpo, foam, fract(dE * 20.0));
  }
  return outC;
}

vec3 shadeBelow(vec3 N, vec3 V, float dist, vec2 suv) {
  vec3 Nd = -N;                 // faces the (submerged) camera
  vec3 I = -V;                  // camera -> surface, upward
  float cosI = clamp(dot(V, Nd), 0.0, 1.0);
  float eta = 1.333;
  float k = 1.0 - eta * eta * (1.0 - cosI * cosI);
  // the lit water body that total internal reflection mirrors back down
  vec3 body = wWaterLight(1.2, 1.0) * (uWScatter / (uWAbsorb + uWScatter)) * (0.45 + 0.9 * cosI);
  body *= 0.8 + 0.4 * clamp(0.5 + (N.x - N.z) * 6.0, 0.0, 1.0);
  vec3 col = body;
  if (k > 0.0) {
    float cosT = sqrt(k);
    vec3 T = normalize(eta * I + (eta * cosI - cosT) * Nd);
    float F = 0.0204 + 0.9796 * wPow5(1.0 - cosT);
    F = mix(1.0, F, smoothstep(0.0, 0.12, k)); // soft Snell's-window rim
    vec3 through = wSky(T, 0.04);
    // objects above the surface (canopies, houses): the opaque image behind this pixel
    vec3 tiltV = (viewMatrix * vec4(N.x, 0.0, N.z, 0.0)).xyz;
    vec2 ruv = clamp(suv + tiltV.xy * 0.05, vec2(0.001), vec2(0.999));
    float rd = texture2D(tSceneDepth, ruv).r;
    vec3 scn = texture2D(tSceneColor, ruv).rgb;
    through = mix(through, scn, step(rd, 0.99995));
    // the sun seen through the window, broken into glints by the ripples
    float sd = max(dot(T, uSunDir), 0.0);
    float s2 = sd * sd; float s8 = s2 * s2; s8 *= s8; float s64 = s8 * s8; s64 *= s64; s64 *= s64;
    through += uSunColor * uSunIntensity * (s64 * 6.0 + s8 * 0.08);
    col = mix(through, body, F);
  }
  return max(col, vec3(0.0));
}

void main() {
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 V = toCam / max(dist, 1e-4);
  vec2 suv = gl_FragCoord.xy / uResolution;
  gWx = dFdx(vWorld.xz);
  gWy = dFdy(vWorld.xz);
  // pixel footprint on the water as the maps' anisotropic filter sees it (up to
  // 8 taps along the long axis of the footprint)
  float fpA = length(gWx), fpB = length(gWy);
  float fp = max(max(fpA, fpB) * 0.125, min(fpA, fpB));
  gFp = fp;
  gFpMaj = max(fpA, fpB);

  vec2 muv = (vWorld.xz - uLagoonMaskBounds.xy) / uLagoonMaskBounds.zw;
  vec4 mask = texture2D(tLagoonMask, clamp(muv, vec2(0.0), vec2(1.0)));
  float shoreDist = max((mask.g - 0.5) * 32.0, 0.0);
  float calm = mix(0.45, 1.0, smoothstep(0.3, 5.0, shoreDist));
  // shore exposure: the land lies downwind (the wind waves run onto this shore):
  // the signed shore distance falls along the wind
  vec2 wd = normalize(uWWind + vec2(1e-4)) * 4.0 / uLagoonMaskBounds.zw;
  float sdUp = texture2D(tLagoonMask, clamp(muv - wd, vec2(0.0), vec2(1.0))).g;
  float sdDn = texture2D(tLagoonMask, clamp(muv + wd, vec2(0.0), vec2(1.0))).g;
  gExpo = smoothstep(-0.25, 0.6, (sdUp - sdDn) * 4.0);   // (g units * 32 m) / 8 m
  // paper-thin water over the sand (swash film, last centimetres): bottom friction
  // damps the ripples, so the film is glassy and mirrors the sky
  if (gl_FrontFacing) {
    float d0 = max(vWorld.y - lagoonWorldPosFromDepth(suv, texture2D(tSceneDepth, suv).r).y, 0.0);
    calm *= mix(0.3, 1.0, smoothstep(0.003, 0.05, d0));
  }

  // plunge pools: the curtain lands along a line; around it a white boil, milky
  // aerated water, chaotic chop + ring swell, and foam lace drifting outward
  vec2 impSlope = vec2(0.0);
  float aer = 0.0, boil = 0.0, poolFoam = 0.0, poolShade = 1.0;
  for (int i = 0; i < 4; i++) {
    if (float(i) >= uWImpactCount) break;
    vec4 P = uWImpacts[i];
    vec4 B = uWImpactsB[i];
    vec2 dv = vWorld.xz - P.xy;
    vec2 dl = dv - B.xy * clamp(dot(dv, B.xy), -B.z, B.z);
    float r = length(dl);
    float rn = r / max(P.z, 0.5);
    if (rn < 3.2) {
      vec2 dir = r > 1e-3 ? dl / r : vec2(1.0, 0.0);
      float env = exp(-rn * 0.9) * P.w;
      impSlope += dir * (cos(r * 4.2 - uTime * 3.6) * 0.09 + cos(r * 8.3 - uTime * 6.1 + 1.3) * 0.045) * env;
      // chaotic chop riding the outward current
      float Tc = 1.7;
      float c0 = fract(uTime / Tc), c1 = fract(uTime / Tc + 0.5);
      vec2 vc = dir * (1.4 / (1.0 + rn));
      vec2 ch0 = (textureGrad(tWWaveB, (vWorld.xz - vc * (c0 * Tc)) / 1.3, gWx / 1.3, gWy / 1.3).rg * 2.0 - 1.0) * 4.0;
      vec2 ch1 = (textureGrad(tWWaveB, (vWorld.xz - vc * (c1 * Tc)) / 1.3 + 0.5, gWx / 1.3, gWy / 1.3).rg * 2.0 - 1.0) * 4.0;
      float bl = (1.0 - smoothstep(0.1, 0.65, rn)) * P.w;
      float wc = abs(1.0 - 2.0 * c0);
      impSlope += mix(ch1, ch0, wc) * inversesqrt(wc * wc + (1.0 - wc) * (1.0 - wc)) * (0.05 + 0.1 * bl) * env;
      float a = (1.0 - smoothstep(0.2, 2.4, rn)) * P.w;
      vec3 pf = wPoolFoam(vWorld.xz, dir, rn);
      // coverage thins outward: solid boil -> foam blanket with holes -> lace ->
      // drifting rafts and streaks
      float pat = 0.62 * pf.x + 0.5 * pf.y;
      float thr = mix(0.02, 1.0, smoothstep(0.3, 2.7, rn));
      float f = smoothstep(thr - 0.1, thr + 0.14, pat) * (1.0 - smoothstep(2.4, 3.15, rn)) * P.w;
      float b = (1.0 - smoothstep(0.35, 0.95, rn + (pf.z - 0.5) * 0.7)) * P.w;
      aer = max(aer, a);
      boil = max(boil, b * (0.72 + 0.28 * pf.z));
      poolFoam = max(poolFoam, f * (0.6 + 0.4 * pf.x));
      // thick churning foam is brighter, thin lace lets the dark water through
      poolShade = min(poolShade, 0.72 + 0.3 * pf.x + 0.18 * pf.z * b);
    }
  }

  // capillary ring ripples around egret legs (kind 0) and floating leaves (kind 1)
  vec2 ringSlope = vec2(0.0);
  float ringFade = 1.0 - smoothstep(12.0, 40.0, dist);
  if (ringFade > 0.0) {
    for (int i = 0; i < ${e}; i++) {
      if (float(i) >= uWRingCount) break;
      vec4 Rg = uWRings[i];
      vec2 dv = vWorld.xz - Rg.xy;
      float r = length(dv);
      float leg = 1.0 - Rg.z;
      float reach = mix(0.36, 1.4, leg);
      if (r < reach && r > 0.004) {
        vec2 dir = dv / r;
        float k = mix(62.0, 40.0, leg);        // rad/m (wavelength ~10-16 cm)
        float w = mix(8.0, 10.0, leg);         // rad/s
        float env = (1.0 - smoothstep(reach * 0.3, reach, r)) * smoothstep(mix(0.012, 0.035, leg), mix(0.035, 0.08, leg), r);
        float amp = mix(0.045, 0.1, leg) * Rg.w;
        ringSlope += dir * (sin(r * k - uTime * w) + 0.45 * sin(r * k * 1.73 - uTime * w * 1.3 + 1.1)) * amp * env;
      }
    }
    ringSlope *= ringFade;
  }

  float gust = wGustAt(vWorld.xz);
  float lost;
  vec2 slopeR;
  vec2 slope = wSlope(vWorld.xz, fp, calm * (1.0 + aer * 1.8), gust, lost, slopeR) + impSlope + ringSlope;
  slopeR += impSlope * 0.6 + ringSlope * (1.0 - wLost(gFpMaj * 6.0, 0.05, 0.16));
  lost += 0.02 * (aer + boil);   // churned water is rough at every scale
  vec3 N = normalize(vec3(-slope.x, 1.0, -slope.y));

  vec3 col;
  if (gl_FrontFacing) col = shadeAbove(N, V, dist, suv, slope, slopeR, lost, gust, aer, boil, poolFoam, poolShade, mask);
  else col = shadeBelow(N, V, dist, suv);
  gl_FragColor = vec4(max(col, vec3(0.0)), 1.0);
}
`;function i(e){if(!e||e.mapping!==306||!e.image?.height)return null;let t=e.image.height,n=Math.log2(t)-2,r=1/t;return{ENVMAP_TYPE_CUBE_UV:``,CUBEUV_TEXEL_WIDTH:(1/(3*Math.max(2**n,112))).toFixed(8),CUBEUV_TEXEL_HEIGHT:r.toFixed(8),CUBEUV_MAX_MIP:n.toFixed(1)}}function a(e){if(e?.cinematic)return 3;let t=e?.waterDetail??1;return t>=.9?2:+(t>=.6)}export{a,i,r as n,t as r,n as t};