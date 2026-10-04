import{$r as e,Dr as t,E as n,Gt as r,Ha as i,Hn as a,Ja as o,Lt as s,Qi as c,Rn as l,U as u,V as d,Va as f,Wi as p,Wr as m,Yt as h,_r as g,ar as _,do as v,ea as y,fa as b,in as x,io as S,ir as C,j as w,jr as T,mr as E,no as D,ro as O,sn as k,sr as A,ta as j,x as ee}from"./three.core-DtjtRha-.js";import{n as M}from"./three.module-CA589J5f.js";import{a as N,i as P,n as F,r as I,s as L,t as R}from"./noise-RmOKhMMB.js";import{n as z}from"./index-BjH0GYGf.js";var B={pinA:[0,0,.125,1],pinB:[.125,0,.125,1],pinDry:[.25,0,.125,1],pinYoung:[.375,0,.125,1],fan:[.5,0,.5,.5],fanDry:[.5,.5,.5,.25],dates:[.5,.75,.25,.25],rachis:[.75,.75,.125,.25],rachisDry:[.875,.75,.125,.25]},V=.03,H=.005,U=.02,W=.4;function te(e){return W+.18*((e*.618034+.37)%1)}function G(e,t,n,r=[0,0]){let i=B[e],a=e.startsWith(`pin`),o=a?V:U,s=a?H:U;return r[0]=i[0]+i[2]*(o+(1-2*o)*t),r[1]=i[1]+i[3]*(s+(1-2*s)*n),r}var ne=`
uniform float uPx;
#define PIN_MU ${V.toFixed(4)}
#define PIN_MV ${H.toFixed(4)}
#define BOX_M ${U.toFixed(4)}

struct PalmTexel { vec3 col; float a; vec3 n; float tr; float ao; float rough; };

PalmTexel paEmpty(vec3 fill) {
  PalmTexel o;
  o.col = fill; o.a = 0.0; o.n = vec3(0.0, 0.0, 1.0); o.tr = 0.0; o.ao = 1.0; o.rough = 0.8;
  return o;
}

bool paOut(vec2 p) { return p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0; }

// ---- pinnate half-frond strip: p.x across (0 rachis .. 1 leaflet tips), p.y along (0 base .. 1 tip)
// kind: 0 = mature A, 1 = older B, 2 = dry, 3 = young
PalmTexel paPinnate(vec2 p, float seed, float kind) {
  bool dry = kind > 1.5 && kind < 2.5;
  bool young = kind > 2.5;
  bool older = kind > 0.5 && kind < 1.5;
  // (date palm leaflets are faintly glaucous: a touch less yellow than a
  // pure yellow-green, the waxy bloom greys them)
  vec3 cOlive = vec3(0.078, 0.110, 0.035);
  vec3 cYG = vec3(0.172, 0.218, 0.056);
  vec3 cDryA = vec3(0.265, 0.200, 0.135);
  vec3 cDryB = vec3(0.195, 0.170, 0.140);
  vec3 fill = dry ? cDryA : (young ? vec3(0.2, 0.25, 0.06) : mix(cOlive, cYG, 0.45));
  bool inside = !paOut(p);

  const float LF = 4.0;   // metres along the strip (assumed for isotropy)
  const float WM = 0.5;   // metres across
  const float N = 74.0;   // leaflets per side
  float hwBase = dry ? 0.0078 : (young ? 0.0138 : 0.0122);
  float missP = dry ? 0.16 : (older ? 0.05 : 0.028);
  float brokeP = dry ? 0.34 : (older ? 0.1 : 0.05);
  float S1 = 0.045, S2 = 0.035;               // forward slant of the leaflets
  float sl = S1 * p.x + S2 * p.x * p.x;
  float dsl = S1 + 2.0 * S2 * p.x;
  vec2 ldir = normalize(vec2(WM, dsl * LF));  // leaflet direction (metric)
  float k = (p.y - sl) * N;
  float aa = 4.6 * uPx;                       // ~1 texel in metres

  float cov = 0.0, sSel = 0.0, tSel = 0.0, idSel = 0.0, spineSel = 0.0;
  bool found = false;
  for (int j = -2; j <= 1; j++) {
    float i = floor(k) + float(j);
    vec2 hh = bk_hash22(vec2(i, seed));
    float h3 = bk_hash12(vec2(i + 17.0, seed * 1.37 + 3.0));
    float vi = (i + 0.5 + (hh.x - 0.5) * 0.55) / N;
    if (!inside || vi < 0.0 || vi > 1.0) continue;
    if (h3 < missP) continue;
    float spine = 1.0 - smoothstep(0.05, 0.19, vi);
    float len = (0.8 + 0.2 * hh.y) * mix(1.0, 0.38 + 0.2 * hh.x, spine);
    if (h3 > 1.0 - brokeP) len *= 0.45 + 0.4 * hh.x;
    float t = p.x / len;
    if (t >= 1.0) continue;
    float hw = hwBase * mix(1.0, 0.3, spine) * (0.85 + 0.3 * hh.y);
    float prof = smoothstep(0.0, 0.1, t) * pow(max(1.0 - t, 1e-4), 0.7) * 1.12;
    float vc = vi + sl;
    float dv = (p.y - vc) * LF * ldir.x;
    float w = hw * prof;
    float c = 1.0 - smoothstep(max(w - aa, 0.0), w + aa, abs(dv));
    if (c > cov) {
      cov = c; found = true;
      sSel = clamp(dv / max(w, 1e-4), -1.0, 1.0);
      tSel = t; idSel = i; spineSel = spine;
    }
  }
  PalmTexel o = paEmpty(fill);
  if (found) {

  float hv = bk_hash12(vec2(idSel, seed + 5.3));
  float hv2 = bk_hash12(vec2(idSel * 1.7, seed + 9.1));
  vec3 leaf;
  if (dry) {
    leaf = mix(cDryA, cDryB, hv) * (0.82 + 0.34 * hv2);
  } else {
    vec3 cA = young ? vec3(0.160, 0.215, 0.045) : cOlive;
    vec3 cB = young ? vec3(0.255, 0.295, 0.068) : cYG;
    leaf = mix(cA, cB, clamp(hv * 0.85 + (older ? -0.12 : 0.1), 0.0, 1.0));
    leaf *= 0.88 + 0.24 * hv2;
  }
  float mid = 1.0 - smoothstep(0.0, 0.25, abs(sSel));
  leaf = mix(leaf, leaf * vec3(1.3, 1.25, 0.85) + vec3(0.02, 0.02, 0.0), mid * 0.55);
  leaf *= 0.82 + 0.18 * (1.0 - sSel * sSel);
  leaf *= 0.95 + 0.05 * sin(sSel * 14.0);
  leaf = mix(leaf, vec3(0.34, 0.30, 0.17), spineSel * 0.85);
  float tipStart = (older ? 0.62 : 0.72) + 0.26 * bk_hash12(vec2(idSel, seed + 7.7));
  float dryT = dry ? 0.0 : smoothstep(tipStart, min(tipStart + 0.14, 0.999), tSel);
  if (young) dryT *= 0.3;
  leaf = mix(leaf, vec3(0.29, 0.19, 0.08) * (0.8 + 0.4 * hv2), dryT * 0.9);
  float bl = bk_vnoise(vec2(tSel * 36.0 + idSel * 3.1, sSel * 2.0 + idSel * 5.7), vec2(4096.0));
  leaf *= 0.88 + 0.22 * bl;
  if (older) leaf = mix(leaf, vec3(0.15, 0.16, 0.11), 0.2 * bl);

  o.col = leaf;
  o.a = cov;
  vec2 perp = vec2(-ldir.y, ldir.x);
  float fold = dry ? 0.95 : 0.55;
  vec2 nt = perp * (sSel * fold) - ldir * (tSel * (dry ? 0.35 : 0.15));
  o.n = normalize(vec3(nt, 1.0));
  o.tr = dry ? 0.14 : mix(0.75, 0.4, mid) * (1.0 - 0.6 * dryT) * mix(1.0, 0.3, spineSel);
  o.ao = 0.72 + 0.28 * smoothstep(0.0, 0.3, p.x);
  // waxy cuticle: leaflets fairly glossy along the fold, duller dry tips
  o.rough = dry ? 0.82 : mix(0.36 + 0.12 * bl + 0.06 * (1.0 - mid), 0.78, dryT);
  }
  return o;
}

// ---- costapalmate fan blade: p.x = angle across the fan, p.y = radius (0 hastula .. 1 edge)
PalmTexel paFan(vec2 p, float seed, bool dry) {
  vec3 fill = dry ? vec3(0.30, 0.23, 0.14) : vec3(0.13, 0.17, 0.075);
  PalmTexel o = paEmpty(fill);
  if (!paOut(p)) {
  const float NS = 46.0;
  float q = p.x * NS;
  float i = floor(q), f = fract(q);
  vec2 hh = bk_hash22(vec2(i, seed));
  float h3 = bk_hash12(vec2(i + 31.0, seed));
  float r = p.y;
  float rs = 0.40 + 0.22 * hh.x;                            // where segments split apart
  float rmax = dry ? 0.68 + 0.32 * hh.y : 0.86 + 0.14 * hh.y; // segment length (ragged edge)
  float edge = min(p.x, 1.0 - p.x);
  rmax *= mix(0.72, 1.0, smoothstep(0.0, 0.18, edge));
  float e = min(f, 1.0 - f);                                 // distance to segment boundary
  float gap = smoothstep(rs, 1.0, r) * 0.26 + smoothstep(rmax - 0.2, rmax, r) * 0.16;
  float cov = mix(1.0, smoothstep(gap, gap + 0.05, e), smoothstep(0.0, 0.01, gap));
  float notch = smoothstep(rmax - 0.14, rmax, r) * 0.14;     // bifid segment tips
  cov *= mix(1.0, smoothstep(notch, notch + 0.04, abs(f - 0.5)), smoothstep(0.0, 0.01, notch));
  cov *= 1.0 - smoothstep(rmax - 0.012, rmax, r);
  if (r < 0.035) cov = 1.0;
  float thread = 0.0;                                        // filifera threads in the gaps
  if (!dry && h3 > 0.35 && r > rs + 0.05 && r < rmax + 0.1) {
    float wig = 0.03 * sin(r * 60.0 + i * 2.3);
    float dth = abs(f - (0.03 + wig));
    thread = (1.0 - smoothstep(0.012, 0.03, dth)) * smoothstep(rs + 0.05, rs + 0.15, r);
  }
  float ridge = 1.0 - abs(f - 0.5) * 2.0;
  vec3 c = dry ? mix(vec3(0.34, 0.26, 0.15), vec3(0.23, 0.195, 0.15), hh.x)
               : mix(vec3(0.078, 0.122, 0.058), vec3(0.125, 0.165, 0.075), hh.x * 0.8 + 0.2 * r);
  c *= 0.84 + 0.22 * ridge;
  c = mix(c, c * vec3(1.35, 1.3, 0.9), (1.0 - smoothstep(0.0, 0.035, abs(p.x - 0.5))) * (1.0 - smoothstep(0.3, 0.6, r)) * 0.6);
  if (!dry) {
    float dt = smoothstep(rmax - 0.05 - 0.15 * h3, rmax, r) * step(0.4, h3);
    c = mix(c, vec3(0.30, 0.22, 0.12), dt * 0.8);
  }
  float n1 = bk_vnoise(vec2(p.x * 300.0, r * 40.0), vec2(4096.0));
  c *= 0.9 + 0.2 * n1;
  if (thread > cov) c = vec3(0.42, 0.40, 0.34);
  o.col = c;
  o.a = max(cov, thread * 0.9);
  o.n = normalize(vec3(-(f - 0.5) * 1.3, 0.0, 1.0));
  o.tr = dry ? 0.14 : 0.3 * (0.8 + 0.2 * ridge);
  o.ao = 0.75 + 0.25 * smoothstep(0.0, 0.25, r);
  o.rough = dry ? 0.85 : 0.5 + 0.1 * n1;
  }
  return o;
}

// ---- green costapalmate fan blade, segmented (matches builder.js fanBladeSegmented):
// p.x = angle across the blade (segment i = floor(p.x * FAN_NS)), p.y = r / R.
// Palmate and connected up to the split radius, then each induplicate segment
// runs free, narrowing to a bifid (two-pointed) apex; some tips dry brown;
// filifera threads curl off the free margins. Normal: the V fold of each
// segment (valley along its midline, ridges at the segment boundaries).
const float FAN_NS = ${36 .toFixed(1)};
float fanSplitT(float i) { return ${W.toFixed(3)} + 0.18 * fract(i * 0.618034 + 0.37); }
float fanLenT(float i) {
  float edge = min((i + 0.5) / FAN_NS, 1.0 - (i + 0.5) / FAN_NS);
  return (0.84 + 0.16 * fract(i * 0.414214 + 0.11)) * (0.8 + 0.2 * smoothstep(0.0, 0.2, edge));
}
PalmTexel paFanSeg(vec2 p, float seed) {
  PalmTexel o = paEmpty(vec3(0.105, 0.14, 0.07));
  if (!paOut(p)) {
  float q = p.x * FAN_NS;
  float i = floor(q), f = fract(q);
  float r = p.y;
  float rs = fanSplitT(i), rmax = fanLenT(i);
  vec2 hh = bk_hash22(vec2(i, seed));
  float h3 = bk_hash12(vec2(i + 31.0, seed));
  // one texel in segment-width (f) and radius units
  float aaR = uPx / (0.5 * (1.0 - 2.0 * BOX_M));
  float aaF = aaR * FAN_NS;
  float fr = clamp((r - rs) / max(rmax - rs, 1e-3), 0.0, 1.0);
  float af = abs(f - 0.5);
  // free segment: widest at the split, narrowing toward the apex
  float hw = r < rs ? 0.52 : mix(0.47, 0.2, fr * fr);
  float cov = smoothstep(-aaF, aaF, hw - af);
  // bifid apex: the last ~16 % of the segment is split along its midline
  float nL = 0.16 * (rmax - rs);
  float nw = 0.2 * smoothstep(rmax - nL, rmax, r);
  cov *= smoothstep(-aaF, aaF, af - nw);
  // ragged end (the two points end at slightly different lengths)
  float rEnd = rmax - (f < 0.5 ? 0.0 : 0.02 * hh.y);
  cov *= 1.0 - smoothstep(rEnd - aaR, rEnd + aaR, r);
  if (r < 0.03) cov = 1.0;
  // filifera threads: fine curly fibres peeling off the free margins
  float thread = 0.0;
  if (h3 > 0.45 && r > rs + 0.04 && r < rmax + 0.08) {
    float wig = 0.035 * sin(r * 70.0 + i * 2.3) + 0.02 * sin(r * 31.0 + i);
    float dth = abs(af - (0.46 - 0.2 * fr + wig));
    thread = (1.0 - smoothstep(0.5 * aaF + 0.004, aaF + 0.014, dth)) * smoothstep(rs + 0.04, rs + 0.12, r);
  }
  // colour: grey-green blade, paler costa + segment ridges, dry apices
  float ridge = 1.0 - af * 2.0;                             // 1 at the segment midline
  vec3 c = mix(vec3(0.078, 0.112, 0.056), vec3(0.118, 0.152, 0.074), hh.x * 0.75 + 0.25 * r);
  c *= 0.9 + 0.14 * (1.0 - ridge);                           // ridges catch more sun-bleach
  c = mix(c, c * vec3(1.35, 1.3, 0.92), (1.0 - smoothstep(0.0, 0.03, abs(p.x - 0.5))) * (1.0 - smoothstep(0.25, 0.5, r)) * 0.6);
  float n1 = bk_vnoise(vec2(p.x * 320.0, r * 44.0), vec2(4096.0));
  float n2 = bk_vnoise(vec2(p.x * 90.0 + 3.0, r * 9.0), vec2(4096.0));
  c *= 0.9 + 0.16 * n1;
  c *= 0.92 + 0.14 * n2;
  // longitudinal veins along each segment
  float vein = 1.0 - smoothstep(0.0, 0.06, abs(fract(f * 7.0) - 0.5) - 0.44);
  c *= 1.0 - 0.06 * vein;
  float dryT = smoothstep(rmax - 0.05 - 0.2 * h3, rmax, r) * step(0.35, h3);
  c = mix(c, vec3(0.30, 0.215, 0.12) * (0.85 + 0.3 * hh.y), dryT * 0.85);
  // split margins dry a little first (thin pale edge)
  c = mix(c, vec3(0.22, 0.2, 0.13), smoothstep(hw - 0.05, hw, af) * step(rs, r) * 0.45);
  if (thread > cov) c = vec3(0.40, 0.38, 0.31);
  o.col = c;
  o.a = max(cov, thread * 0.9);
  // V fold: constant facet tilt with a rounded valley and ridge
  float tilt = clamp((0.5 - f) * 7.0, -1.0, 1.0) * 0.5;
  o.n = normalize(vec3(tilt, 0.0, 1.0));
  o.tr = 0.32 * (0.75 + 0.25 * ridge) * (1.0 - 0.6 * dryT);
  o.ao = (0.74 + 0.26 * smoothstep(0.0, 0.3, r)) * (0.9 + 0.1 * (1.0 - ridge));
  o.rough = mix(0.42 + 0.12 * n1, 0.8, dryT);
  }
  return o;
}

// ---- hanging date cluster card: p.x across, p.y up (stalk enters at the top)
PalmTexel paDates(vec2 p, float seed) {
  vec3 fill = vec3(0.40, 0.18, 0.05);
  PalmTexel o = paEmpty(fill);
  if (!paOut(p)) {
  const float yT = 0.76;
  float cov = 0.0; vec3 col = fill; vec3 n = vec3(0.0, 0.0, 1.0); float rough = 0.5; float tr = 0.15;
  // stalk
  float sx = 0.5 + 0.025 * sin(p.y * 7.0);
  float stalk = (1.0 - smoothstep(0.011, 0.019, abs(p.x - sx))) * step(yT - 0.03, p.y);
  if (stalk > 0.0) { cov = stalk; col = vec3(0.40, 0.27, 0.09); n = normalize(vec3((p.x - sx) * 40.0, 0.0, 1.0)); rough = 0.6; }
  vec2 d = p - vec2(0.5, yT);
  float ang = atan(d.x, -d.y);
  float rad = length(d);
  const float NSd = 16.0;
  const float SPREAD = 0.62;
  float sa = (ang / SPREAD) * 0.5 + 0.5;
  float dAng = 2.0 * SPREAD / NSd;
  for (int j = -1; j <= 1; j++) {
    float si = floor(sa * NSd) + float(j);
    if (si < 0.0 || si >= NSd) continue;
    float sLen = 0.46 + 0.26 * bk_hash12(vec2(si, seed));
    float sAng = ((si + 0.5) / NSd - 0.5) * 2.0 * SPREAD + (bk_hash12(vec2(si, seed + 2.0)) - 0.5) * 0.05;
    vec2 sd = vec2(sin(sAng), -cos(sAng));
    vec2 sp = vec2(-sd.y, sd.x);
    float along = dot(d, sd), across = dot(d, sp);
    // strand line
    if (along > 0.0 && along < sLen) {
      float sw = 1.0 - smoothstep(0.0035, 0.0065, abs(across));
      if (sw > cov) { cov = sw; col = vec3(0.36, 0.23, 0.07); n = normalize(vec3(across * 120.0, 0.0, 1.0)); rough = 0.55; }
    }
    // dates along the strand, alternating sides
    float kk = floor((along - 0.05) / 0.04 + 0.5);
    for (int m = -1; m <= 1; m++) {
      float km = kk + float(m);
      if (km < 0.0) continue;
      float ra = 0.05 + km * 0.04;
      if (ra > sLen) continue;
      float hd = bk_hash12(vec2(si * 31.0 + km, seed + 4.0));
      if (hd < 0.06) continue;
      float side = mod(km, 2.0) < 0.5 ? 1.0 : -1.0;
      vec2 cxy = vec2(ra + 0.012 * (hd - 0.5), side * (0.012 + 0.004 * hd));
      vec2 q = vec2(along, across) - cxy;
      vec2 e = q / vec2(0.029, 0.02);
      float r2 = dot(e, e);
      if (r2 < 1.0) {
        float c = 1.0 - smoothstep(0.82, 1.0, r2);
        if (c >= cov) {
          cov = c;
          vec3 ripe = mix(vec3(0.22, 0.075, 0.02), vec3(0.42, 0.18, 0.035), hd * hd);
          if (hd > 0.92) ripe = vec3(0.5, 0.3, 0.05);
          col = ripe * (0.9 + 0.2 * bk_hash12(vec2(km, si)));
          vec2 en = e.x * sd * 0.7 + e.y * sp;
          n = normalize(vec3(en, sqrt(max(1.0 - r2, 0.0)) + 0.2));
          rough = 0.52; tr = 0.18;
        }
      }
    }
  }
  if (cov > 0.0) {
    o.col = col; o.a = cov; o.n = n; o.rough = rough; o.tr = tr; o.ao = 0.8 + 0.2 * smoothstep(0.2, 0.7, p.y);
  }
  }
  return o;
}

// ---- rachis / petiole bark: p.x around, p.y along
PalmTexel paRachis(vec2 p, bool dry) {
  PalmTexel o = paEmpty(vec3(0.2));
  float n1 = bk_fbm(p, vec2(30.0, 3.0), 4);
  vec3 top = dry ? vec3(0.27, 0.22, 0.16) : vec3(0.15, 0.165, 0.06);
  vec3 under = dry ? vec3(0.32, 0.27, 0.19) : vec3(0.24, 0.25, 0.11);
  float side = abs(p.x - 0.5) * 2.0;
  vec3 c = mix(top, under, smoothstep(0.3, 0.9, side));
  c *= 0.86 + 0.24 * n1;
  o.col = c; o.a = 1.0;
  o.n = normalize(vec3(n1 * 0.35, 0.0, 1.0));
  o.tr = 0.1; o.ao = 1.0; o.rough = dry ? 0.82 : 0.66;
  return o;
}

vec2 paBox(vec2 l) { return (l - BOX_M) / (1.0 - 2.0 * BOX_M); }

`,re=`
uniform float uPx;
float tf2(vec2 uv, vec2 per) { vec2 p = uv * per; return (0.5 * bk_gnoise(p, per) + 0.25 * bk_gnoise(p * 2.0, per * 2.0)) / 0.75; }
float tf3(vec2 uv, vec2 per) { vec2 p = uv * per; return (0.5 * bk_gnoise(p, per) + 0.25 * bk_gnoise(p * 2.0, per * 2.0) + 0.125 * bk_gnoise(p * 4.0, per * 4.0)) / 0.875; }
float tf4(vec2 uv, vec2 per) { vec2 p = uv * per; return (0.5 * bk_gnoise(p, per) + 0.25 * bk_gnoise(p * 2.0, per * 2.0) + 0.125 * bk_gnoise(p * 4.0, per * 4.0) + 0.0625 * bk_gnoise(p * 8.0, per * 8.0)) / 0.9375; }
const float DT_COLS = 5.0;
const float DT_ROWS = 8.0;
// Date palm: helical lattice of cut leaf-base boots. Each boot is a shingle that
// rises from a tucked lower edge to a proud, cut ledge; gaps hold brown fibre
// mesh. Jittered, size-varied, some boots worn down, broken or missing.
// Returns (height, cell hash, position up the shingle, boot face mask).
vec4 dateSurface(vec2 uv) {
  vec2 g = vec2(uv.x * DT_COLS, uv.y * DT_ROWS);
  g.x += 0.25 * g.y;                                    // helical rows (2 columns per tile height: tileable)
  // coarse + fine warps: boots vary in outline, edges are ragged, not machined
  g.x += 0.14 * bk_gnoise(uv * vec2(3.0, 5.0), vec2(3.0, 5.0)) + 0.05 * bk_gnoise(uv * vec2(12.0, 16.0) + 2.3, vec2(12.0, 16.0));
  g.y += 0.09 * bk_gnoise(uv * vec2(4.0, 2.0) + 7.0, vec2(4.0, 2.0)) + 0.04 * bk_gnoise(uv * vec2(14.0, 10.0) + 4.1, vec2(14.0, 10.0));
  float best = 1e3, cell = 0.0, dyB = 0.0, ero = 0.0, ledge = 0.9, gapW = 0.0;
  for (int k = -1; k < 2; k++) {
    float j = floor(g.y) + float(k);
    float off = mod(j, 2.0) * 0.5;
    for (int c = -1; c <= 1; c++) {
      float ci = floor(g.x - off) + float(c);
      vec2 cid = vec2(mod(ci - 0.25 * (j - mod(j, DT_ROWS)), DT_COLS), mod(j, DT_ROWS));
      vec4 hh = vec4(bk_hash22(cid + 3.1), bk_hash22(cid + 9.7));
      vec2 d = (vec2(g.x - (ci + off + 0.5), g.y - j) - (hh.xy - 0.5) * vec2(0.22, 0.26)) / (0.84 + 0.32 * hh.z);
      float m = abs(d.x) * 2.0 + abs(d.y) * 1.05;
      if (m < best) { best = m; dyB = d.y; cell = bk_hash12(cid + 0.37); ero = bk_hash12(cid + 5.5); ledge = 0.8 + 0.14 * hh.w; gapW = hh.x; }
    }
  }
  float halfH = max(1.0 - (best - abs(dyB)), 0.02);
  float sv = clamp((dyB + halfH) / (2.0 * halfH), 0.0, 1.0);
  // fibre gaps of varying width around each boot
  float face = 1.0 - smoothstep(0.76 + 0.1 * gapW, 0.98, best);
  // ragged, fibrous cut edge instead of a clean machined ledge
  ledge = clamp(ledge + 0.07 * tf2(uv, vec2(36.0, 8.0)), 0.68, 0.95);
  // the boot climbs steeply out of the fibre, then runs as a gently sloped,
  // mostly flat face up to the cut ledge (a linear ramp read as quilted pillows)
  float r = clamp(sv / ledge, 0.0, 1.0);
  float shingle = (0.62 * smoothstep(0.0, 0.3, r) + 0.38 * r) * (1.0 - smoothstep(ledge + 0.02, min(ledge + 0.1, 0.999), sv));
  // woven sheath fibre between the boots (two diagonal strand sets, tileable)
  float wA = bk_gnoise(vec2((uv.x + uv.y) * 44.0, (uv.x - uv.y) * 4.0), vec2(44.0, 4.0));
  float wB = bk_gnoise(vec2((uv.x - uv.y) * 44.0, (uv.x + uv.y) * 4.0) + 5.0, vec2(44.0, 4.0));
  float mesh = 0.3 + 0.045 * (wA + wB);
  float h = mix(mesh, mesh + (0.5 + 0.45 * cell) * 0.6, shingle * face);
  // long fibres running up each leaf base, split ends along the cut
  h += face * (tf3(uv, vec2(72.0, 6.0)) * 0.12 + bk_gnoise(uv * vec2(160.0, 10.0), vec2(160.0, 10.0)) * 0.04);
  float worn = smoothstep(0.72, 1.0, ero);
  h = mix(h, mesh + 0.1, 0.6 * worn);
  float faceA = face * smoothstep(0.05, 0.35, sv) * (1.0 - 0.6 * worn);
  return vec4(h, cell, sv, faceA);
}
// Fan palm (Washingtonia). Tile = 1 m around x 2 m along (worldSize [1, 2]).
// Leaf-scar rings with jittered spacing that wander, fade in and out around the
// trunk and carry a raised lip above each scar; bands between scars bulge and
// vary in tone; long meandering vertical cracks and checked cork in patches;
// wandering vertical fibre. Albedo adds broad growth bands and weathering
// streaks that survive into the far mips.
// Returns (height, fissure/crack, scar groove (+) / lip (-), band tone).
const float FN_RINGS = 56.0;
const float FN_COLS = 9.0;
float fanRingC(float ri) { return ri + 0.5 + (bk_hash12(vec2(mod(ri, FN_RINGS), 7.3)) - 0.5) * 0.7; }
// fine fibre strands running up the stem, wandering a little (not ruled lines)
float fanFib(vec2 uv) {
  float wx = 1.6 * bk_gnoise(uv * vec2(6.0, 14.0) + 2.7, vec2(6.0, 14.0));
  return 0.65 * bk_gnoise(vec2(uv.x * 90.0 + wx, uv.y * 7.0), vec2(90.0, 7.0))
       + 0.35 * bk_gnoise(vec2(uv.x * 37.0 + 0.6 * wx + 3.3, uv.y * 11.0), vec2(37.0, 11.0));
}
vec4 fanSurface(vec2 uv) {
  float wy = 0.6 * bk_gnoise(uv * vec2(3.0, 5.0), vec2(3.0, 5.0)) + 0.22 * bk_gnoise(uv * vec2(8.0, 11.0) + 3.1, vec2(8.0, 11.0));
  float rv = uv.y * FN_RINGS + wy;
  float i0 = floor(rv);
  float cB = fanRingC(i0);
  float lo, hi, idLo;
  if (rv >= cB) { lo = cB; hi = fanRingC(i0 + 1.0); idLo = i0; }
  else { lo = fanRingC(i0 - 1.0); hi = cB; idLo = i0 - 1.0; }
  float mLo = mod(idLo, FN_RINGS), mHi = mod(idLo + 1.0, FN_RINGS);
  float dLo = rv - lo, dHi = hi - rv, t = dLo / max(hi - lo, 1e-3);
  float depLo = bk_hash12(vec2(mLo, 2.1)), depHi = bk_hash12(vec2(mHi, 2.1));
  // each scar fades in and out around the circumference
  float sLo = smoothstep(0.12, 0.62, bk_vnoise(vec2(uv.x * 7.0, mLo), vec2(7.0, FN_RINGS))) * mix(0.3, 1.0, depLo);
  float sHi = smoothstep(0.12, 0.62, bk_vnoise(vec2(uv.x * 7.0, mHi), vec2(7.0, FN_RINGS))) * mix(0.3, 1.0, depHi);
  float wLo = mix(0.09, 0.2, depLo), wHi = mix(0.09, 0.2, depHi);
  float groove = max((1.0 - smoothstep(0.0, wLo, dLo)) * sLo, (1.0 - smoothstep(0.0, wHi * 0.7, dHi)) * sHi);
  float lip = smoothstep(0.0, wLo, dLo) * (1.0 - smoothstep(wLo, wLo * 3.5, dLo)) * sLo;
  // vertical fissures: long, thin, meandering cracks through the corky bark
  // (0.3-1.5 m, a few mm wide, tapering at both ends), sparse and in patches,
  // so they break the rings irregularly instead of ruling a grid
  float fm = smoothstep(-0.45, 0.35, bk_gnoise(uv * vec2(3.0, 3.0) + 9.1, vec2(3.0, 3.0)));
  float gx = uv.x * FN_COLS + 0.3 * bk_gnoise(uv * vec2(2.0, 3.0) + 5.7, vec2(2.0, 3.0));
  float fis = 0.0;
  for (int k = -1; k <= 1; k++) {
    float ci = floor(gx) + float(k);
    float cm = mod(ci, FN_COLS);
    float segN = 1.0 + floor(bk_hash12(vec2(cm, 4.7)) * 3.0);   // 1..3 segments per 2 m tile
    float sy = uv.y * segN + bk_hash12(vec2(cm, 8.3)) * segN;
    float sI = mod(floor(sy), segN);
    float st = fract(sy);
    vec3 hs = vec3(bk_hash22(vec2(cm, sI + 17.0)), bk_hash12(vec2(cm + 3.7, sI)));
    float wob = bk_gnoise(vec2(cm * 5.3 + 0.5, uv.y * 16.0), vec2(64.0, 16.0)) + 0.35 * bk_gnoise(vec2(cm * 2.9 + 7.5, uv.y * 48.0), vec2(64.0, 48.0));
    float xc = ci + 0.5 + (hs.y - 0.5) * 0.5 + 0.16 * wob;
    float a = 0.05 + 0.3 * hs.z, b = 0.95 - 0.3 * hs.y;
    float taper = smoothstep(a, a + 0.25, st) * (1.0 - smoothstep(b - 0.25, b, st));
    float w = (0.022 + 0.04 * hs.z) * taper;
    float c = (1.0 - smoothstep(w * 0.3, w + 0.004, abs(gx - xc))) * smoothstep(0.0, 0.2, taper) * step(0.42, hs.x) * (0.6 + 0.4 * hs.z);
    fis = max(fis, c);
  }
  fis *= fm;
  float fib = fanFib(uv);
  // corky micro-relief so the bark between the scars isn't glassy smooth
  float cork = tf2(uv + 0.61, vec2(48.0, 80.0));
  // weathered patches where the cork has checked into small irregular plates
  float fp = smoothstep(0.05, 0.55, bk_gnoise(uv * vec2(3.0, 4.0) + 2.2, vec2(3.0, 4.0)));
  vec3 wf = bk_worley(uv + vec2(0.012 * fib, 0.0), vec2(14.0, 30.0));
  float chk = (1.0 - smoothstep(0.02, 0.16, wf.y - wf.x)) * fp * 0.6;
  float h = 0.56 + 0.09 * tf3(uv, vec2(6.0, 10.0)) + 0.03 * fib + 0.035 * cork
          + 0.085 * sin(3.14159 * t) * (0.82 + 0.36 * t) + 0.03 * (wf.z - 0.5) * fp
          - 0.26 * groove + 0.09 * lip - 0.3 * fis - 0.1 * chk;
  return vec4(h, max(fis, 0.35 * chk), groove - 0.5 * lip, bk_hash12(vec2(mLo, 2.9)));
}
vec4 dateAlbedo(vec2 uv, vec4 s) {
  // warm leaf-base browns; tan, fibrous cut ends; dark reddish sheath fibre between
  vec3 boot = mix(vec3(0.168, 0.118, 0.076), vec3(0.275, 0.207, 0.142), s.g);
  float hue = fract(s.g * 7.31);                             // per-boot: redder .. greyer
  boot = mix(boot, boot * vec3(1.12, 0.94, 0.8), smoothstep(0.6, 1.0, hue) * 0.7);
  boot = mix(boot, vec3(dot(boot, vec3(0.33))) * vec3(1.05, 1.0, 0.93), (1.0 - smoothstep(0.0, 0.35, hue)) * 0.45);
  float cut = smoothstep(0.66, 0.88, s.b) * s.a;
  boot = mix(boot, vec3(0.35, 0.282, 0.205), cut * 0.55);
  float fib = tf4(uv, vec2(72.0, 6.0));
  boot *= 0.74 + 0.42 * (fib * 0.5 + 0.5);
  boot *= 0.88 + 0.2 * smoothstep(-0.6, 0.6, bk_gnoise(uv * vec2(160.0, 10.0), vec2(160.0, 10.0)));
  boot *= mix(0.74, 1.0, smoothstep(0.05, 0.55, s.b));
  float strands = smoothstep(-0.2, 0.6, bk_gnoise(vec2((uv.x + uv.y) * 44.0, (uv.x - uv.y) * 4.0), vec2(44.0, 4.0)));
  vec3 fibre = mix(vec3(0.095, 0.062, 0.038), vec3(0.205, 0.14, 0.088), strands);
  vec3 c = mix(fibre, boot, s.a);
  c *= 0.88 + 0.24 * tf4(uv + 0.5, vec2(2.0, 3.0));
  c = mix(c, vec3(0.27, 0.25, 0.22), 0.2 * smoothstep(0.2, 0.7, tf3(uv + 1.7, vec2(3.0, 2.0))));
  return vec4(c, 1.0);
}
vec4 dateOrm(vec2 uv, vec4 s) {
  return vec4(0.5 + 0.5 * smoothstep(0.3, 0.62, s.r), clamp(0.87 + 0.1 * tf3(uv, vec2(72.0, 6.0)) - 0.06 * smoothstep(0.7, 0.9, s.b) * s.a, 0.0, 1.0), 0.0, 1.0);
}
vec4 fanAlbedo(vec2 uv, vec4 s) {
  // grey-brown bark: browner patches, weathering streaks running down, band tones
  float big = tf3(uv + 0.21, vec2(3.0, 4.0)) * 0.5 + 0.5;
  // weathering streaks run down the stem but wander and break up (a straight
  // periodic streak crossed with the ring bands read as plaid)
  vec2 sw = vec2(uv.x + 0.06 * bk_gnoise(uv * vec2(2.0, 6.0) + 1.3, vec2(2.0, 6.0)), uv.y);
  float streak = tf2(sw + 0.37, vec2(7.0, 2.0)) * 0.5 + 0.5;
  // (kept fairly dark, ~0.1 average: a vertical trunk facing the low sun gets
  // far more light than the ground, and a lighter bark read as white columns)
  vec3 c = mix(vec3(0.112, 0.104, 0.094), vec3(0.133, 0.104, 0.078), smoothstep(0.3, 0.75, big));
  c *= 0.92 + 0.16 * s.a;
  c *= 0.9 + 0.16 * smoothstep(0.2, 0.8, streak);
  // broad, slightly wandering growth bands (tens of cm) that survive into the
  // far mips, so a trunk seen from a distance isn't one plain column
  float gb = tf2(vec2(uv.x, uv.y + 0.04 * bk_gnoise(uv * vec2(3.0, 2.0) + 4.4, vec2(3.0, 2.0))), vec2(2.0, 7.0));
  c *= 0.86 + 0.28 * smoothstep(-0.45, 0.45, gb);
  c *= 0.88 + 0.18 * (fanFib(uv) * 0.5 + 0.5);
  float groove = max(s.b, 0.0), lip = max(-s.b, 0.0) * 2.0;
  c = mix(c, c * vec3(0.72, 0.68, 0.64), groove * 0.45);
  c = mix(c, c * 1.18 + vec3(0.012, 0.01, 0.008), lip * 0.4);
  c = mix(c, c * vec3(0.4, 0.36, 0.33), s.g * 0.85);
  // sun-bleached grey patches (soft, large) rather than pale specks
  float bleach = smoothstep(0.58, 0.82, tf3(uv + 0.3, vec2(4.0, 6.0)) * 0.5 + 0.5);
  c = mix(c, vec3(0.165, 0.16, 0.148), bleach * 0.28);
  return vec4(c, 1.0);
}
vec4 fanOrm(vec2 uv, vec4 s) {
  float ao = (0.5 + 0.5 * smoothstep(0.2, 0.62, s.r)) * (1.0 - 0.22 * max(s.b, 0.0));
  return vec4(ao, clamp(0.9 + 0.06 * s.g - 0.08 * max(-s.b, 0.0), 0.0, 1.0), 0.0, 1.0);
}
`,ie=`
out vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,K={mesh:null,cam:null};function ae(){return K.mesh||(K.mesh=new _(new T(2,2)),K.mesh.frustumCulled=!1,K.cam=new t(-1,1,1,-1,0,1)),K}function oe(e,t,n){let i=Array.from({length:e},(e,t)=>`layout(location = ${t}) out highp vec4 gOut${t};`).join(`
`),a=new j({glslVersion:r,uniforms:n,vertexShader:ie,fragmentShader:`precision highp float;
in vec2 vUv;
uniform vec4 uRect;
${i}
${z}
${t}`,depthTest:!1,depthWrite:!1});return a.userData.noPatch=!0,a}async function se(e,n,r=null){if(!e.compileAsync||!n.length)return;let i=new T(2,2),a=new y;for(let e of n){let t=new _(i,e);t.frustumCulled=!1,a.add(t)}let o=new t(-1,1,1,-1,0,1),s=e.getRenderTarget();e.setRenderTarget(r);try{let t=e.compileAsync(a,o);e.setRenderTarget(s),await t}catch(t){e.setRenderTarget(s),console.warn(`[lagoon] palms compileParallel:`,t)}i.dispose()}function ce(t,n,r,i){let s=new v(t,t,{count:3,type:o,format:e,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!0,minFilter:a,magFilter:l,wrapS:n,wrapT:n,anisotropy:r});return s.textures.forEach((e,t)=>{e.colorSpace=t===0?c:``,e.name=i[t]}),s}function q(t){return new v(t,t,{type:h,format:e,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,minFilter:g,magFilter:g})}function le(e,t,n,r){let{mesh:i,cam:a}=ae(),o=e.getRenderTarget();for(let o of r){let r=o.rect??[0,0,1,1];i.material=o.mat,t.viewport.set(Math.round(r[0]*n),Math.round(r[1]*n),Math.round(r[2]*n),Math.round(r[3]*n)),e.setRenderTarget(t),e.render(i,a)}t.viewport.set(0,0,n,n),e.setRenderTarget(o)}var ue=`
void main() {
  vec2 uv = uRect.xy + vUv * uRect.zw;
  PalmTexel t = region(uv);
  gOut0 = vec4(t.col, t.a);
  gOut1 = vec4(t.n * 0.5 + 0.5, t.tr);
  gOut2 = vec4(t.ao, t.rough, 0.0, 1.0);
}`,de=[{rect:[0,0,.5,1],body:ne+`
PalmTexel region(vec2 uv) {
  float col = floor(uv.x * 8.0);
  float lx = fract(uv.x * 8.0);
  vec2 p = vec2((lx - PIN_MU) / (1.0 - 2.0 * PIN_MU), (uv.y - PIN_MV) / (1.0 - 2.0 * PIN_MV));
  return paPinnate(p, 11.0 + col * 7.0, col);
}`+ue},{rect:[.5,0,.5,.75],body:ne+`
PalmTexel region(vec2 uv) {
  bool dry = uv.y >= 0.5;
  vec2 l = dry ? vec2((uv.x - 0.5) / 0.5, (uv.y - 0.5) / 0.25) : vec2((uv.x - 0.5) / 0.5, uv.y / 0.5);
  if (dry) return paFan(paBox(l), 8.0, true);
  return paFanSeg(paBox(l), 3.0);
}`+ue},{rect:[.5,.75,.25,.25],body:ne+`
PalmTexel region(vec2 uv) {
  return paDates(paBox(vec2((uv.x - 0.5) / 0.25, (uv.y - 0.75) / 0.25)), 5.0);
}`+ue},{rect:[.75,.75,.25,.25],body:ne+`
PalmTexel region(vec2 uv) {
  bool dry = uv.x >= 0.875;
  return paRachis(paBox(vec2((uv.x - (dry ? 0.875 : 0.75)) / 0.125, (uv.y - 0.75) / 0.25)), dry);
}`+ue}],fe=[{key:`date`,fn:`date`,name:`palmTrunkDate`,worldSize:[1,1],relief:.018},{key:`fan`,fn:`fan`,name:`palmTrunkFan`,worldSize:[1,2],relief:.022}],pe=e=>re+`
void main() { gOut0 = ${e}Surface(vUv); }`,me=(e,t,n)=>re+`
uniform sampler2D tSurf;
vec4 surfAt(ivec2 c) {
  ivec2 s = textureSize(tSurf, 0);
  return texelFetch(tSurf, ivec2((c.x + s.x) % s.x, (c.y + s.y) % s.y), 0);
}
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 s = surfAt(c);
  // height slope in metres per metre along each axis (texel pitch = worldSize * uPx)
  vec2 K = vec2(${(t/n[0]).toFixed(5)}, ${(t/n[1]).toFixed(5)}) / uPx * 0.5;
  float dx = surfAt(c - ivec2(1, 0)).r - surfAt(c + ivec2(1, 0)).r;
  float dy = surfAt(c - ivec2(0, 1)).r - surfAt(c + ivec2(0, 1)).r;
  gOut0 = ${e}Albedo(vUv, s);
  gOut1 = vec4(normalize(vec3(dx * K.x, dy * K.y, 1.0)) * 0.5 + 0.5, 1.0);
  gOut2 = ${e}Orm(vUv, s);
}`;function he(e,t,n,r={atlas:!0,trunks:!0}){let i=r.atlas?ce(e,d,8,[`palmFrond.map`,`palmFrond.normal`,`palmFrond.orm`]):null,a=r.atlas?de.map(t=>({rect:t.rect,mat:oe(3,t.body,{uPx:{value:1/e},uRect:{value:new S(...t.rect)}})})):[],o=r.trunks?fe.map(e=>{let r=q(t);return{k:e,data:r,rt:ce(t,p,n,[e.name+`.map`,e.name+`.normal`,e.name+`.orm`]),dataMat:oe(1,pe(e.fn),{uPx:{value:1/t},uRect:{value:new S(0,0,1,1)}}),mrtMat:oe(3,me(e.fn,e.relief,e.worldSize),{uPx:{value:1/t},uRect:{value:new S(0,0,1,1)},tSurf:{value:r.texture}})}}):[],s=a.map(e=>e.mat);for(let e of o)s.push(e.dataMat,e.mrtMat);return{atlasRT:i,atlasJobs:a,trunks:o,materials:s,target:i??o[0]?.rt??null}}function ge(e,t,n,r){let i=e.renderer,a=null;if(t.atlasRT){le(i,t.atlasRT,n,t.atlasJobs);let[r,o,s]=t.atlasRT.textures;e.register(`palmFrond.map`,r),e.register(`palmFrond.normal`,o),e.register(`palmFrond.orm`,s),a={map:r,normalMap:o,ormMap:s}}let o={};for(let n of t.trunks){le(i,n.data,r,[{mat:n.dataMat}]),le(i,n.rt,r,[{mat:n.mrtMat}]),n.data.dispose();let[t,a,s]=n.rt.textures,[c,l]=n.k.worldSize;for(let e of[t,a,s])e.repeat.set(1/c,1/l);e.register(n.k.name+`.map`,t),o[n.k.key]={map:t,normalMap:a,ormMap:s,worldSize:[c,l]}}for(let e of t.materials)e.dispose();return{atlas:a,trunkSets:o}}async function _e(e,t,n,r=8){let i=performance.now(),a=he(t,n,r),o=se(e.renderer,a.materials,a.target),s=performance.now();await o;let c=performance.now(),l=ge(e,a,t,n),u=performance.now();return l.times={submit:Math.round(s-i),compile:Math.round(c-s),draw:Math.round(u-c)},l}function ve(e,t){return ge(e,he(t,0,1,{atlas:!0,trunks:!1}),t,0).atlas}function ye(e,t,n=8){return ge(e,he(0,t,n,{atlas:!1,trunks:!0}),0,t).trunkSets}var J=new O(0,1,0),be=2.39996323,Y=Math.PI*2,X=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Z=(e,t,n)=>e+(t-e)*n,xe=[{id:`dateTall`,species:`date`,seed:101,H:13.2,lean:2.4,rBase:.34,rTop:.265,fronds:36,frondL:4.9,wMax:.74,dead:9,dates:0},{id:`dateMid`,species:`date`,seed:102,H:9.2,lean:1.5,rBase:.33,rTop:.27,fronds:34,frondL:4.5,wMax:.72,dead:12,dates:4},{id:`dateShort`,species:`date`,seed:103,H:5.4,lean:.7,rBase:.37,rTop:.3,fronds:32,frondL:4,wMax:.68,dead:14,dates:5},{id:`dateSlender`,species:`date`,seed:104,H:11,lean:3.3,rBase:.29,rTop:.235,fronds:30,frondL:4.6,wMax:.72,dead:6,dates:3},{id:`fanTall`,species:`fan`,seed:201,H:13.8,lean:.55,rBase:.4,rTop:.27,fans:26,R:1.08,skirt:4.2},{id:`fanMid`,species:`fan`,seed:202,H:8.2,lean:.35,rBase:.44,rTop:.32,fans:24,R:1,skirt:2.8},{id:`youngClump`,species:`young`,seed:301,stems:[[0,1.25],[0,.7],[0,.35],[0,0],[0,.15]]},{id:`youngPair`,species:`young`,seed:302,stems:[[0,1.8],[0,.8],[0,0]]}],Se=class{constructor(){this.p=[],this.n=[],this.uv=[],this.c=[],this.w=[],this.i=[],this.count=0}v(e,t,n,r,i=null){return this.p.push(e.x,e.y,e.z),i?this.n.push(i.x,i.y,i.z):this.n.push(0,1,0),this.uv.push(t[0],t[1]),this.c.push(n[0],n[1],n[2]),this.w.push(r[0],r[1],r[2],r[3]),this.count++}quad(e,t,n,r){this.i.push(e,t,n,e,n,r)}tri(e,t,n){this.i.push(e,t,n)}mark(){return{v:this.count,i:this.i.length}}smooth(e,t=null){let n=this.p,r=this.n,i=this.i;for(let t=e.v;t<this.count;t++)r[t*3]=0,r[t*3+1]=0,r[t*3+2]=0;for(let t=e.i;t<i.length;t+=3){let e=i[t]*3,a=i[t+1]*3,o=i[t+2]*3,s=n[a]-n[e],c=n[a+1]-n[e+1],l=n[a+2]-n[e+2],u=n[o]-n[e],d=n[o+1]-n[e+1],f=n[o+2]-n[e+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u;for(let t of[e,a,o])r[t]+=p,r[t+1]+=m,r[t+2]+=h}for(let n=e.v;n<this.count;n++){let e=r[n*3],i=r[n*3+1],a=r[n*3+2],o=Math.hypot(e,i,a);o<1e-12?(e=0,i=1,a=0):(e/=o,i/=o,a/=o),t&&e*t.x+i*t.y+a*t.z<0&&(e=-e,i=-i,a=-a),r[n*3]=e,r[n*3+1]=i,r[n*3+2]=a}}geometry(){let e=new w;return e.setAttribute(`position`,new s(this.p,3)),e.setAttribute(`normal`,new s(this.n,3)),e.setAttribute(`uv`,new s(this.uv,2)),e.setAttribute(`color`,new s(this.c,3)),e.setAttribute(`aWind`,new s(this.w,4)),e.setIndex(this.count>65535?new i(this.i,1):new f(this.i,1)),e.computeBoundingBox(),e.computeBoundingSphere(),e}},Q=[0,0];function Ce(e,t){let n=t.segs,r=new O(Math.cos(t.az),0,Math.sin(t.az)),i=new O(-Math.sin(t.az),0,Math.cos(t.az)),a=[],o=[],s=t.p0.clone(),c=new O;for(let e=0;e<=n;e++){let i=e/n,l=t.el-t.bend*i**1.5;c.copy(r).multiplyScalar(Math.cos(l)).addScaledVector(J,Math.sin(l));let u=s.clone();u.y<t.floor+.02*i&&(u.y=t.floor+.02*i),a.push(u),o.push(c.clone());let d=t.el-t.bend*Math.min(1,i+.5/n)**1.5;s.addScaledVector(c.copy(r).multiplyScalar(Math.cos(d)).addScaledVector(J,Math.sin(d)),t.L/n)}let l=t.across,u=new O,d=new O,f=new O,p=new O,m=[[],[]];for(let r=0;r<=n;r++){let s=r/n;p.crossVectors(i,o[r]).normalize();let c=t.twist*s;d.copy(i).multiplyScalar(Math.cos(c)).addScaledVector(p,Math.sin(c)),f.copy(p).multiplyScalar(Math.cos(c)).addScaledVector(i,-Math.sin(c));let h=t.wMax*Z(.2,1,X(.05,.3,s))*(1-.78*X(.55,1,s)),g=t.vAng*(1-.35*s),_=Z(.6,1,X(0,.35,s));for(let n=0;n<2;n++){let i=n===0?-1:1,o=n===0?t.regL:t.regR,c=[];for(let n of l){let l=h*n*Math.cos(g),p=h*n*Math.sin(g)-h*t.droop*n*n;u.copy(a[r]).addScaledVector(d,i*l).addScaledVector(f,p),u.y<t.floor&&(u.y=t.floor),G(o,n,s,Q);let m=_*(.9+.1*n);c.push(e.v(u,Q,[t.tint[0]*m,t.tint[1]*m,t.tint[2]*m],[t.bendW,s*s,n,t.phase]))}m[n].push(c)}}let h=e.mark();for(let t=0;t<2;t++){let r=m[t];for(let i=0;i<n;i++)for(let n=0;n<l.length-1;n++)t===0?e.quad(r[i][n],r[i+1][n],r[i+1][n+1],r[i][n+1]):e.quad(r[i][n],r[i][n+1],r[i+1][n+1],r[i+1][n])}if(e.smooth(h,J),t.ribbon){let r=e.mark(),s=[];for(let r=0;r<=n;r++){let c=r/n;p.crossVectors(i,o[r]).normalize();let l=t.rachisW*(1-.85*c)*(1+2.2*(1-X(0,.14,c))),u=[t.tint[0]*.9,t.tint[1]*.9,t.tint[2]*.9],d=[t.bendW,c*c,0,t.phase],f=a[r].clone().addScaledVector(i,-l).addScaledVector(p,-.35*l),m=a[r].clone().addScaledVector(p,.6*l),h=a[r].clone().addScaledVector(i,l).addScaledVector(p,-.35*l);s.push([e.v(f,G(t.rachisReg,0,c,Q),u,d),e.v(m,G(t.rachisReg,.5,c,Q),u,d),e.v(h,G(t.rachisReg,1,c,Q),u,d)])}for(let t=0;t<n;t++)e.quad(s[t][0],s[t][1],s[t+1][1],s[t+1][0]),e.quad(s[t][1],s[t][2],s[t+1][2],s[t+1][1]);e.smooth(r,J)}return a[n]}function we(e,t){let n=new O(Math.cos(t.az),0,Math.sin(t.az)),r=new O(-Math.sin(t.az),0,Math.cos(t.az)),i=t.petSegs,a=t.p0.clone(),o=new O,s=[],c=[];for(let e=0;e<=i;e++){let r=e/i,l=t.el-t.petBend*r;o.copy(n).multiplyScalar(Math.cos(l)).addScaledVector(J,Math.sin(l));let u=a.clone();u.y<t.floor&&(u.y=t.floor),s.push(u),c.push(o.clone()),a.addScaledVector(o,t.petL/i)}let l=new O,u=[t.tint[0]*.9,t.tint[1]*.9,t.tint[2]*.9],d=e.mark(),f=[];for(let n=0;n<=i;n++){let a=n/i;l.crossVectors(r,c[n]).normalize();let o=Z(t.petW*1.6,t.petW,Math.min(1,a*3)),d=[t.bendW,.35*a*a,0,t.phase],p=s[n].clone().addScaledVector(r,-o).addScaledVector(l,-.3*o),m=s[n].clone().addScaledVector(l,.45*o),h=s[n].clone().addScaledVector(r,o).addScaledVector(l,-.3*o);f.push([e.v(p,G(t.rachisReg,0,a,Q),u,d),e.v(m,G(t.rachisReg,.5,a,Q),u,d),e.v(h,G(t.rachisReg,1,a,Q),u,d)])}for(let t=0;t<i;t++)e.quad(f[t][0],f[t][1],f[t+1][1],f[t+1][0]),e.quad(f[t][1],f[t][2],f[t+1][2],f[t+1][1]);e.smooth(d,J);let p=s[i],m=c[i].clone().applyAxisAngle(r,t.faceTilt).normalize(),h=new O().crossVectors(r,m).normalize();if(t.segmented){Me(e,t,p,m,r,h);return}let g=e.mark(),_=[],v=new O,y=new O;for(let n=0;n<=t.radSegs;n++){let i=n/t.radSegs,a=[];for(let n=0;n<=t.angSegs;n++){let o=n/t.angSegs,s=(o-.5)*t.span;y.copy(m).multiplyScalar(Math.cos(s)).addScaledVector(r,Math.sin(s));let c=i*t.R;v.copy(p).addScaledVector(y,c),v.addScaledVector(h,c*t.fold*Math.abs(Math.sin(s))),v.y-=t.droop*t.R*X(.3,1,i)**2*(.6+.4*Math.abs(Math.sin(s))),v.y-=c*Math.max(Math.cos(s),0)*t.sag,t.pleat&&n>0&&n<t.angSegs&&v.addScaledVector(h,(n%2?1:-1)*t.pleat*i),v.y<t.floor&&(v.y=t.floor),G(t.reg,o,i,Q);let l=Z(.7,1,X(0,.5,i));a.push(e.v(v,Q,[t.tint[0]*l,t.tint[1]*l,t.tint[2]*l],[t.bendW,.35+.65*i*i,i,t.phase]))}_.push(a)}for(let n=0;n<t.radSegs;n++)for(let r=0;r<t.angSegs;r++)e.quad(_[n][r],_[n][r+1],_[n+1][r+1],_[n+1][r]);e.smooth(g,h)}var Te=new O,Ee=new O,De=new O,Oe=new O,ke=new O,Ae=new O,je=new O;function Me(e,t,n,r,i,a){let o=t.R,s=t.span,c=N(Math.floor(t.phase*1e6)+17),l=new Float32Array(36),u=new Float32Array(36),d=new Float32Array(36);for(let e=0;e<36;e++){let n=t.mirror?35-e:e;l[e]=te(n);let r=Math.abs((e+.5)/36-.5)*2;u[e]=t.segDroop*(.5+1*c())*(.65+.7*r),d[e]=(c()-.5)*.06}let f=(e,c,f,p)=>{let m=(c-.5)*s;Ee.copy(r).multiplyScalar(Math.cos(m)).addScaledVector(i,Math.sin(m));let h=e*o;if(p.copy(n).addScaledVector(Ee,h),p.addScaledVector(a,h*t.fold*Math.abs(Math.sin(m))),p.y-=t.droop*o*X(.3,1,e)**2*(.6+.4*Math.abs(Math.sin(m))),p.y-=h*Math.max(Math.cos(m),0)*t.sag,f>=0){let t=l[f],n=Math.max(0,(e-t)/(1-t)),r=u[f]*o*n*n;p.y-=r,p.addScaledVector(Ee,-.45*r*r/Math.max(.1,o*(1-t))),Ae.crossVectors(a,Ee),p.addScaledVector(Ae,d[f]*o*n*n)}return p},p=(e,t,n,r)=>{let i=.02,o=.25/36,s=Math.max(e,.08);return f(Math.min(1.02,s+i),t,n,De),f(s-i,t,n,Oe),De.sub(Oe),f(s,t+o,n,Oe),f(s,t-o,n,ke),Oe.sub(ke),r.crossVectors(Oe,De).normalize(),r.dot(a)<0&&r.negate(),r},m=e=>e*o*s/36,h=e=>t.pleat*m(e),g=e=>{let n=Z(.7,1,X(0,.5,e));return[t.tint[0]*n,t.tint[1]*n,t.tint[2]*n]},_=(n,r,i,a)=>(f(n,r,i,Te),p(n,r,i,je),Te.addScaledVector(je,a*h(n)),G(t.reg,t.mirror?1-r:r,n,Q),e.v(Te,Q,g(n),[t.bendW,.35+.65*n*n,n,t.phase],je)),v=[.03,.14,.27,W],y=[];for(let e of v){let t=[];for(let n=0;n<=72;n++)t.push(_(e,n/72,-1,n%2?-1:1));y.push(t)}for(let t=0;t<v.length-1;t++)for(let n=0;n<72;n++)e.quad(y[t][n],y[t][n+1],y[t+1][n+1],y[t+1][n]);for(let t=0;t<36;t++){let n=[];for(let e=0;e<=6;e++){let r=W+(1-W)*(e/6);n.push([_(r,t/36,t,1),_(r,(t+.5)/36,t,-1),_(r,(t+1)/36,t,1)])}for(let t=0;t<6;t++)e.quad(n[t][0],n[t][1],n[t+1][1],n[t+1][0]),e.quad(n[t][1],n[t][2],n[t+1][2],n[t+1][1])}}function Ne(e,t){let n=t.base,r=t.leanDir.clone(),i=n.clone().addScaledVector(J,-.35),a=n.clone().addScaledVector(J,t.H*.3).addScaledVector(r,t.lean*.6),o=n.clone().addScaledVector(J,t.H*.66).addScaledVector(r,t.lean*.95),s=n.clone().addScaledVector(J,t.H).addScaledVector(r,t.lean),c=(e,t)=>{let n=1-e;return t.set(0,0,0).addScaledVector(i,n*n*n).addScaledVector(a,3*n*n*e).addScaledVector(o,3*n*e*e).addScaledVector(s,e*e*e)},l=[],u=[0];for(let e=0;e<=160;e++)l.push(c(e/160,new O));for(let e=1;e<=160;e++)u.push(u[e-1]+l[e].distanceTo(l[e-1]));let d=u[160],f=e=>{let t=1;for(;t<160&&u[t]<e;)t++;let n=(e-u[t-1])/Math.max(1e-6,u[t]-u[t-1]);return{p:l[t-1].clone().lerp(l[t],n),t:l[t].clone().sub(l[t-1]).normalize()}},p=Math.max(3,Math.round(d/t.ringStep)),m=t.radial,h=Math.max(1,Math.round(Y*(t.rBase+t.rTop)*.5/t.tileW)),g=new O(1,0,0),_=new O,v=null,y=[],b=N(t.seed)()*Y;for(let n=0;n<=p;n++){let r=n/p*d,{p:i,t:a}=f(r);if(!v)g.set(1,0,0).addScaledVector(a,-a.x).normalize();else{let e=new O().crossVectors(v,a),t=Math.asin(Math.min(1,e.length()));t>1e-5&&g.applyAxisAngle(e.normalize(),t)}v=a,_.crossVectors(a,g).normalize();let o=r-.35,s=Math.min(1,Math.max(0,o/t.H)),c=t.rTop+(t.rBase-t.rTop)*(1-s)**1.6;c+=t.rBase*t.flare*Math.exp(-Math.max(0,o)/.45),c+=t.crownBulge*X(.9,1,s),c*=1+.025*Math.sin(o*2.3+b);let l=[],u=Z(.62,1,X(-.2,1.6,o)),x=X(.85,1,s),S=[t.col[0]*u*(1+.1*x),t.col[1]*u*(1+.02*x),t.col[2]*u*(1-.06*x)],C=t.bendScale*s*s;for(let n=0;n<=m;n++){let a=n/m*Y,u=1+t.lobes*Math.exp(-Math.max(0,o)/.35)*(.5+.5*Math.sin(a*5+b))*(.6+.4*Math.sin(a*2+b*1.3)),d=g.clone().multiplyScalar(Math.cos(a)).addScaledVector(_,Math.sin(a)),f=i.clone().addScaledVector(d,c*u);Q[0]=n/m*h*t.tileW,Q[1]=r+t.vOffset,l.push(e.v(f,Q,S,[C,0,-s,t.phase],d))}y.push(l)}for(let t=0;t<p;t++)for(let n=0;n<m;n++)e.quad(y[t][n],y[t][n+1],y[t+1][n+1],y[t+1][n]);let x=f(d),S=x.p.clone().addScaledVector(x.t,t.rTop*.6),C=e.v(S,[0,d+t.vOffset+.3],t.col,[t.bendScale,0,-1,t.phase],x.t),w=y[p];for(let t=0;t<m;t++)e.tri(w[t],w[t+1],C);let T=f(Math.min(d,1)).p,E=f(Math.min(d,2.8)).p;return{top:x.p,axis:x.t,rTop:t.rTop+t.crownBulge,height:t.H,c0:T,c1:E}}function Pe(e,t){let n=new O(Math.cos(t.az),0,Math.sin(t.az)),r=t.w,i=t.h,a=new O(0,-1,0).addScaledVector(n,Math.sin(t.tilt)).normalize();for(let o=0;o<2;o++){let s=t.az+(o===0?Math.PI/2:0)+.3,c=new O(Math.cos(s),0,Math.sin(s)),l=new O().crossVectors(c,a).normalize();l.dot(n)<0&&l.negate(),l.addScaledVector(J,.35).addScaledVector(n,.4).normalize();let u=t.p.clone().addScaledVector(c,-r*.5).addScaledVector(a,i),d=t.p.clone().addScaledVector(c,r*.5).addScaledVector(a,i),f=t.p.clone().addScaledVector(c,-r*.5),p=t.p.clone().addScaledVector(c,r*.5);for(let e of[u,d])e.y<t.floor&&(e.y=t.floor);let m=t.tint,h=e.v(u,G(`dates`,0,0,Q),m,[t.bendW,.25,.1,t.phase],l),g=e.v(d,G(`dates`,1,0,Q),m,[t.bendW,.25,.1,t.phase],l),_=e.v(p,G(`dates`,1,1,Q),m,[t.bendW,.05,0,t.phase],l),v=e.v(f,G(`dates`,0,1,Q),m,[t.bendW,.05,0,t.phase],l);e.quad(h,g,_,v)}}var Fe=e=>{let t=e%8;return t!==2&&t!==5&&t!==7};function Ie(e,t,n,r,i,a,o=1){let s=N(t),c=r.fronds,l=n.top,u=n.axis,d=i?1.12:1;for(let t=0;t<c;t++){let f=c>1?t/(c-1):.5,p=t*be+(s()-.5)*.3,m=Z(r.elHi??1.3,r.elLo??-.3,f**.62)+(s()-.5)*.22,h=r.frondL*o*Z(.55,1,X(0,.3,f))*(.9+.16*s()),g=Z(.45,r.bendHi??2,f**.8)*(.8+.4*s()),_=f<.16,v=s()<.5,y=.92+.14*s(),b=(s()-.5)*1.3,x=.92+.16*s(),S=.36+.2*s(),C=.55+.45*s(),w=s();if(i&&!Fe(t))continue;let T=new O(Math.cos(p),0,Math.sin(p)),E=l.clone().addScaledVector(u,.3-.9*f).addScaledVector(T,n.rTop*.55),D=[y,y,y];_?D=[1.12*y,1.1*y,.86*y]:f>.82&&(D=[1.02*y,.93*y,.72*y]),Ce(e,{p0:E,az:p,el:m,L:h,bend:g,twist:b,wMax:r.wMax*o*(_?.8:1)*x*d,vAng:S,droop:C,regL:_?`pinYoung`:v?`pinB`:`pinA`,regR:_?`pinYoung`:v?`pinA`:`pinB`,segs:i?6:r.segs0||12,across:i?[0,1]:[0,.45,1],ribbon:!i&&r.ribbon!==!1,rachisReg:`rachis`,rachisW:.045*o,tint:D,phase:w,bendW:a,floor:.06})}let f=r.dead;for(let t=0;t<f;t++){let c=s()*Y,f=.6+s()*1.3,p=.9+.2*s(),m=-(.95+s()*.5),h=r.frondL*o*(.55+.25*s()),g=-.15+.3*s(),_=(s()-.5)*1,v=s();if(i&&!Fe(t+3))continue;let y=new O(Math.cos(c),0,Math.sin(c));Ce(e,{p0:l.clone().addScaledVector(u,-f).addScaledVector(y,n.rTop*.85),az:c,el:m,L:h,bend:g,twist:_,wMax:r.wMax*o*.7*d,vAng:-.75,droop:.15,regL:`pinDry`,regR:`pinDry`,segs:i?4:7,across:[0,1],ribbon:!1,rachisReg:`rachisDry`,rachisW:.035,tint:[p,p*.97,p*.94],phase:v,bendW:a*.9,floor:.06})}let p=r.dates||0;for(let t=0;t<p;t++){let r=t/Math.max(1,p)*Y+s()*1.2,o=.35+s()*.45,c=.9+.2*s(),d=.5*(.85+.3*s()),f=.78*(.85+.3*s()),m=.1+.15*s(),h=s();if(i&&t>=2)continue;let g=new O(Math.cos(r),0,Math.sin(r));Pe(e,{p:l.clone().addScaledVector(u,-o).addScaledVector(g,n.rTop+.1),az:r,w:d,h:f,tilt:m,tint:[c,c,c],bendW:a,phase:h,floor:.1})}}function Le(e,t,n,r,i,a){let o=N(t),s=r.fans,c=n.top,l=n.axis,u=i?1.08:1;for(let t=0;t<s;t++){let d=s>1?t/(s-1):.5,f=t*be+(o()-.5)*.3,p=.92+.14*o(),m=Z(1.2,-.42,d**.9)+(o()-.5)*.18,h=Z(1,1.75,d)*(.9+.2*o()),g=r.R*Z(.72,1,X(0,.3,d))*(.9+.15*o())*u,_=3.3+.5*o(),v=.28+.2*o(),y=.28+.15*o(),b=-(.25+.2*o()),x=o(),S=Z(.16,.5,d)*(.8+.4*o()),C=o()<.5;if(i&&!Fe(t))continue;let w=new O(Math.cos(f),0,Math.sin(f)),T=c.clone().addScaledVector(l,.25-.55*d).addScaledVector(w,n.rTop*.4),E=d>.85?[1.04*p,.95*p,.74*p]:d<.15?[1.08*p,1.07*p,.9*p]:[p,p,p];we(e,{p0:T,az:f,el:m,petL:h,petBend:.1+.2*d,petW:.035,petSegs:i?2:4,R:g,span:_,fold:v,droop:i?y*.45+S*.35:y*.45,segDroop:S,mirror:C,sag:.08+.15*d,faceTilt:b,pleat:.2,segmented:!i,angSegs:12,radSegs:3,reg:`fan`,rachisReg:`rachis`,tint:E,phase:x,bendW:a,floor:.06})}for(let t=0;t<13;t++){let s=t/13*Y+o()*.4,d=.25+o()*.7,f=.88+.2*o(),p=-(1.3+o()*.2),m=.55+.3*o(),h=r.R*(.75+.2*o())*u,g=2.3+.5*o(),_=o();if(i&&!Fe(t))continue;let v=new O(Math.cos(s),0,Math.sin(s));we(e,{p0:c.clone().addScaledVector(l,-d).addScaledVector(v,n.rTop+.06),az:s,el:p,petL:m,petBend:0,petW:.03,petSegs:2,R:h,span:g,fold:.75,droop:.2,sag:0,faceTilt:-.15,pleat:0,angSegs:i?5:8,radSegs:i?2:3,reg:`fanDry`,rachisReg:`rachisDry`,tint:[f,f*.97,f*.93],phase:_,bendW:a*.95,floor:.06})}let d=r.skirt,f=Math.max(2,Math.round(d/1.4)),p=i?2:3,m=i?1:3,h=e.mark(),g=o()*Y,_=new O;for(let t=0;t<f;t++){let r=-.3-t*(d-1.55)/(f-1);for(let i=0;i<8;i++){let s=(i+t%2*.5)/8*Y+g+(o()-.5)*.35,u=Y/8*(1.3+.45*o()),d=1.3+.55*o(),f=r-.25*o(),h=.16+.2*o(),v=.04+.07*o(),y=.08+.14*o(),b=.74-.07*t+.22*o(),x=o(),S=o(),C=[b,b*(.95-.02*x),b*(.86+.08*x)],w=[];for(let r=0;r<=p;r++){let i=r/p,o=[];for(let r=0;r<=m;r++){let p=r/m,g=1-Math.abs(p-.5)*2,b=s+(p-.5)*u*(.4+.6*X(0,.45,i)+.15*i),x=n.rTop+.07+.04*t+h*i*i+v*Math.sin(Math.PI*i)*(.4+.6*g);_.copy(c).addScaledVector(l,f-i*d-y*i*g),_.x+=Math.cos(b)*x,_.z+=Math.sin(b)*x,G(`fanDry`,p,Z(.08,1,i),Q);let w=Z(.52,1,X(0,.75,i));o.push(e.v(_,Q,[C[0]*w,C[1]*w,C[2]*w],[a*(.95-.1*t),.06+.06*i,.2*i,S]))}w.push(o)}for(let t=0;t<p;t++)for(let n=0;n<m;n++)e.quad(w[t][n],w[t][n+1],w[t+1][n+1],w[t+1][n])}}for(let t=h.v;t<e.count;t++){let n=e.p[t*3]-c.x,r=e.p[t*3+2]-c.z,i=Math.hypot(n,r)||1;e.n[t*3]=n/i*.95,e.n[t*3+1]=.3,e.n[t*3+2]=r/i*.95}}var Re=[1,1,1];function ze(e,t){let n=N(e.seed*7919+13),r=new Se,i=new Se,a=[],o=new O,s=t?{radial:7,ringStep:1.3}:{radial:14,ringStep:.32};if(e.species===`date`||e.species===`fan`){let c=e.H/10,l=Ne(i,{base:new O(0,0,0),H:e.H,leanDir:new O(1,0,0),lean:e.lean,rBase:e.rBase,rTop:e.rTop,radial:s.radial,ringStep:s.ringStep,tileW:1,flare:e.species===`fan`?.45:.35,lobes:e.species===`fan`?.08:.16,crownBulge:e.species===`date`?.02:0,col:e.species===`fan`?[1,1,1]:Re,bendScale:c,phase:n(),seed:e.seed,vOffset:n()*7});o=l.top.clone(),a.push({x:0,z:0,r:e.rBase*1.15,x0:l.c0.x,z0:l.c0.z,x1:l.c1.x,z1:l.c1.z,h:e.H}),e.species===`date`?Ie(r,e.seed*31+7,l,e,t,c):Le(r,e.seed*31+7,l,e,t,c)}else{let s=e.stems.length,c=n()*Y,l=new O;for(let o=0;o<s;o++){let[,u]=e.stems[o],d=c+o/s*Y+(n()-.5)*.6,f=o===0?.08:.35+.45*n(),p=new O(Math.cos(d),0,Math.sin(d)),m=p.clone().multiplyScalar(f),h=Z(.7,1,Math.min(1,u/2.2))*(.9+.2*n()),g=.15+u*.12,_,v=.13+.05*Math.min(1,u/2)+.02*n();u>.2?(_=Ne(i,{base:m,H:u,leanDir:p,lean:u*(.18+.2*n()),rBase:v,rTop:v*.85,radial:t?6:10,ringStep:t?.8:.28,tileW:1,flare:.3,lobes:.12,crownBulge:.02,col:Re,bendScale:g,phase:n(),seed:e.seed+o*17,vOffset:n()*7}),a.push({x:m.x,z:m.z,r:v*1.1,x0:_.c0.x,z0:_.c0.z,x1:_.c1.x,z1:_.c1.z,h:u})):_={top:m.clone().setY(.12),axis:J.clone().addScaledVector(p,.25).normalize(),rTop:.12},l.add(_.top);let y={fronds:Math.round(Z(15,21,Math.min(1,u/2))),frondL:2.9*h+.4*n(),wMax:.5*h+.1,dead:u>.6?4:0,dates:0,segs0:9,ribbon:!1,elHi:1.32,elLo:u>1?.12:.5,bendHi:u>1?1:.85};Ie(r,e.seed*131+o*977,_,y,t,g,1)}o=l.multiplyScalar(1/s)}let c=r.geometry(),l=i.count?i.geometry():null;return{frond:c,trunk:l,meta:Be(e,c,l,o,a)}}function Be(e,t,r,i,a){let o=new n().setFromBufferAttribute(t.attributes.position);r&&o.union(new n().setFromBufferAttribute(r.attributes.position));let s=new b;o.getBoundingSphere(s);let c=t.attributes.position.array,l=0,u=.5,d=Array(16).fill(99);for(let e=0;e<c.length;e+=3){let t=c[e],n=c[e+1],r=c[e+2];l=Math.max(l,Math.hypot(t-i.x,r-i.z));let a=Math.min(15,Math.floor(Math.hypot(t,r)/u));d[a]=Math.min(d[a],n)}return{id:e.id,species:e.species,height:o.max.y,crownX:i.x,crownZ:i.z,crownY:i.y,crownR:l,stems:a,clearance:d,clearBin:u,sphere:{x:s.center.x,y:s.center.y,z:s.center.z,r:s.radius}}}var Ve=.34,He=`
attribute vec4 aWind;
uniform float uTime;
uniform vec2 uWindDir;
uniform float uWindStrength;
vec3 palmWind(vec3 wp, vec3 base, vec3 wn, vec4 w) {
  float t = uTime;
  vec2 wd = uWindDir;
  float ph = dot(base.xz, vec2(0.071, 0.113));
  float gust = 0.62 + 0.38 * sin(t * 0.37 + dot(base.xz, wd) * 0.045) * sin(t * 0.23 + ph * 1.3);
  float s = uWindStrength * gust;
  vec3 off = vec3(0.0);
  float sway = 0.6 + 0.4 * sin(t * 0.9 + ph);
  off.xz += wd * (w.x * s * 0.22 * sway);
  off.xz += vec2(-wd.y, wd.x) * (w.x * s * 0.06 * sin(t * 0.63 + ph * 1.7));
  float fp = w.w * 6.2831 + ph;
  float bob = sin(t * 1.7 + fp) * 0.6 + sin(t * 2.9 + fp * 1.3) * 0.4;
  off.y += w.y * s * (bob * 0.7 - 0.15);
  off.xz += wd * (w.y * s * (0.55 + 0.3 * sin(t * 1.25 + fp)));
  float fl = sin(t * 9.0 + fp * 3.0 + dot(wp, vec3(1.7, 2.3, 1.1))) + 0.5 * sin(t * 15.0 + fp * 5.0);
  off += wn * (max(w.z, 0.0) * s * 0.06 * fl);
  return off;
}
`,Ue=`
#include <begin_vertex>
{
  mat4 pInst = modelMatrix;
  #ifdef USE_BATCHING
    pInst = modelMatrix * batchingMatrix;
  #endif
  #ifdef USE_INSTANCING
    pInst = pInst * instanceMatrix;
  #endif
  vec3 pWorld = (pInst * vec4(transformed, 1.0)).xyz;
  mat3 pRS = mat3(pInst);
  float pS2 = max(dot(pRS[0], pRS[0]), 1e-6);
  vec3 pN = normalize(pRS * normal);
  vec3 pOff = palmWind(pWorld, pInst[3].xyz, pN, aWind) * sqrt(pS2);
  transformed += (transpose(pRS) * pOff) / pS2;
}
`,We=`
#include <map_fragment>
#ifdef USE_MAP
{
  vec2 pTs = vec2(textureSize(map, 0));
  vec2 pDx = dFdx(vMapUv * pTs), pDy = dFdy(vMapUv * pTs);
  float pLvl = max(0.0, 0.5 * log2(max(max(dot(pDx, pDx), dot(pDy, pDy)), 1e-8)));
  diffuseColor.a = min(1.0, diffuseColor.a * (1.0 + pLvl * ${Ve.toFixed(3)}));
}
#endif
`;function Ge(e,t){e.uniforms.uTime=t.uTime,e.uniforms.uWindDir=t.uWindDir,e.uniforms.uWindStrength=t.uWindStrength,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+He).replace(`#include <begin_vertex>`,Ue)}function Ke(e){let t=M.lights_physical_pars_fragment,n=`reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );`,r=t.includes(n)?t.replace(n,`reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
	{
		float pBack = saturate( dot( - geometryNormal, directLight.direction ) );
		float pFwd = saturate( dot( - geometryViewDir, directLight.direction ) );
		float pF2 = pFwd * pFwd; float pF4 = pF2 * pF2;
		reflectedLight.directDiffuse += directLight.color * BRDF_Lambert( material.diffuseContribution ) * vec3( 1.1, 1.14, 0.62 ) * ( palmTransl * pBack * ( 0.5 + 1.9 * pF4 ) );
	}`):t;e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
float palmTransl;`).replace(`#include <lights_physical_pars_fragment>`,r)}function qe(e,t,n){let r=e.G,i=new E({map:t.map,normalMap:t.normalMap,roughnessMap:t.ormMap,aoMap:t.ormMap,aoMapIntensity:1,roughness:1,metalness:0,side:2,alphaTest:.5,alphaToCoverage:!0,vertexColors:!0,envMapIntensity:.7});i.name=`palmFrond`,i.onBeforeCompile=e=>{Ge(e,r),Ke(e),e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,We).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
#ifdef USE_NORMALMAP
  palmTransl = texture2D( normalMap, vNormalMapUv ).a;
#else
  palmTransl = 0.0;
#endif`).replace(`#include <lights_fragment_end>`,`
#if defined( USE_ENVMAP ) && defined( RE_IndirectDiffuse )
  iblIrradiance += getIBLIrradiance( - geometryNormal ) * vec3( 0.95, 1.05, 0.5 ) * ( palmTransl * 0.8 );
#endif
#include <lights_fragment_end>`)},i.customProgramCacheKey=()=>`palmFrond4`,e.patchMaterial(i);let a=(t,n,r)=>{let i=new E({map:t.map,normalMap:t.normalMap,normalScale:new D(1,1),roughnessMap:t.ormMap,aoMap:t.ormMap,aoMapIntensity:1,roughness:1,metalness:0,vertexColors:!0,envMapIntensity:.8});i.name=n;let a={value:new D(r[0],r[1])};return i.onBeforeCompile=e=>{e.uniforms.uTrunkAge=a,o(e)},i.customProgramCacheKey=()=>`palmTrunk5`,e.patchMaterial(i),i},o=e=>{Ge(e,r),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying float vTrunkT;
varying float vTrunkV;`).replace(`#include <fog_vertex>`,`#include <fog_vertex>
vTrunkT = clamp(-aWind.z, 0.0, 1.0);

{
  vec3 pIP = modelMatrix[3].xyz;
  #ifdef USE_BATCHING
    pIP = (modelMatrix * batchingMatrix)[3].xyz;
  #endif
  vec2 pQ = fract(pIP.xz * vec2(0.1031, 0.1030));
  pQ += dot(pQ, pQ.yx + 33.33);
  float pH = fract((pQ.x + pQ.y) * pQ.x);
  float pV = uv.y;
  // offset in metres (u around, v along); max slope of the slide ~0.15 (8 deg)
  vec3 pOff = vec3(0.14 * sin(pV * 0.6 + pH * 6.2832) + 0.04 * sin(pV * 1.7 + pH * 23.0), pH * 7.0, 0.0);
  #ifdef USE_MAP
    vMapUv += (mapTransform * pOff).xy;
  #endif
  #ifdef USE_NORMALMAP
    vNormalMapUv += (normalMapTransform * pOff).xy;
  #endif
  #ifdef USE_ROUGHNESSMAP
    vRoughnessMapUv += (roughnessMapTransform * pOff).xy;
  #endif
  #ifdef USE_AOMAP
    vAoMapUv += (aoMapTransform * pOff).xy;
  #endif
  vTrunkV = pV + pH * 7.0;
}`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vTrunkT;
varying float vTrunkV;
uniform vec2 uTrunkAge;`).replace(`#include <map_fragment>`,`#include <map_fragment>
{
  float pAge = 1.0 - smoothstep(0.06, 0.5, vTrunkT);
  float pL = dot(diffuseColor.rgb, vec3(0.3, 0.55, 0.15));
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(pL) * vec3(1.06, 1.0, 0.92), pAge * uTrunkAge.x);
  float pBand = sin(vTrunkV * 1.37 + 0.4) * sin(vTrunkV * 0.53 + 2.1);
  diffuseColor.rgb *= 1.0 + 0.1 * pBand;
}`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
normal = normalize(mix(normal, nonPerturbedNormal, (1.0 - smoothstep(0.06, 0.5, vTrunkT)) * uTrunkAge.y));`)},s=a(n.date,`palmTrunkDate`,[.35,.5]),c=a(n.fan,`palmTrunkFan`,[.1,.15]),l=new A({map:t.map,alphaTest:.5,side:2});l.onBeforeCompile=e=>{Ge(e,r),e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,We)},l.customProgramCacheKey=()=>`palmFrondDepth2`;let u=new A;return u.onBeforeCompile=e=>Ge(e,r),u.customProgramCacheKey=()=>`palmTrunkDepth2`,{frond:i,trunkDate:s,trunkFan:c,frondDepth:l,trunkDepth:u}}var Je=new R(4411),$={dateTall:0,dateMid:1,dateShort:2,dateSlender:3,fanTall:4,fanMid:5,youngClump:6,youngPair:7};function Ye(e,t){let n=0;for(let[e,r]of t)n+=r;let r=e*n;for(let[e,n]of t)if((r-=n)<=0)return e;return t[t.length-1][0]}function Xe(e,t,n,r,i,a){let o=i-n,s=a-r,c=o*o+s*s,l=c>0?((e-n)*o+(t-r)*s)/c:0;l=F(l,0,1);let u=n+o*l-e,d=r+s*l-t;return Math.sqrt(u*u+d*d)}async function Ze(e,t,n={}){let r=n.yieldFrame??(()=>null),i=performance.now(),a=async()=>{performance.now()-i>24&&(await r(),i=performance.now())},{hf:o,layout:s,registry:c}=e,l=n.seed??7717,u=(e,t,n)=>I(e,t,l+n*7919),d=s.HERO_TREES.map(e=>{let t=s.HOUSES.find(t=>t.tree===e.id),n=t?Math.max(...t.levels.map(e=>e.outer)):e.r0*2.5,r=t?Math.min(...t.levels.map(e=>e.y)):e.forkY;return{x:e.x,z:e.z,trunk:s.trunkRadiusAt(e,e.groundY??0)+1,outer:n+1.4,lowY:r,forkY:e.forkY,crown:e.crown}}),f=s.EXTRA_TREES.map(e=>({x:e.x,z:e.z,trunk:e.r0*1.75+1.1,forkY:e.forkY,crown:e.crown})),p=s.BRIDGES.map(e=>({ax:e.a[0],az:e.a[2],bx:e.b[0],bz:e.b[2],y:Math.min(e.a[1],e.b[1])-e.sag})),m=s.HOUSES.find(e=>e.kind===`overwater`),h=s.BOARDWALKS.filter(e=>e.platformEnd).map(e=>{let t=e.path[e.path.length-1];return{x:t[0],z:t[1],r:e.platformEnd.r}}),g=s.GATHERINGS.map(e=>({x:e.x,z:e.z,r:e.kind===`linenLounge`?6:4.8})),_=s.WATERFALLS.map(e=>({x:e.pool[0],z:e.pool[2],r:(e.plungeR||4)+2})),v=s.WATERFALLS.map(e=>e.stream),y=Object.values(s.VIEWS).map(e=>({x:e.pos[0],z:e.pos[2]}));y.push({x:s.PLAYER.spawn.x,z:s.PLAYER.spawn.z});let b={hero:42,spawn:32,lounge:30,desert:45,drifter:26,falls:24,shallows:16,originBase:14,bridge:18},x=[];for(let[e,t]of Object.entries(b)){let n=s.VIEWS[e];if(!n)continue;let r=n.yaw*Math.PI/180,i=(n.fov??70)*Math.PI/180,a=Math.atan(Math.tan(i/2)*(16/9));x.push({x:n.pos[0],z:n.pos[2],fx:Math.sin(r),fz:-Math.cos(r),R:t,cosA:Math.cos(a*.62)})}let S=(e,t)=>{for(let n of x){let r=e-n.x,i=t-n.z,a=Math.hypot(r,i);if(!(a<.001||a>n.R)&&(r*n.fx+i*n.fz)/a>n.cosA)return!0}return!1},C=s.HERO_TREES.find(e=>e.id===`origin`),w=s.sunDirection?s.sunDirection([0,0,0]):[-.9,.2,.37],T=Math.hypot(w[0],w[2])||1,E=C?{x:C.x,z:C.z,g:C.groundY??0,r:C.r0*1.75+3,sx:w[0]/T,sz:w[2]/T,tanE:w[1]/T}:null;function D(e,t,n,r,i,a){if(!E)return!1;let o=e-E.x,s=t-E.z,c=o*E.sx+s*E.sz;if(c<2||c>90||Math.abs(o*E.sz-s*E.sx)>E.r+c*.05+i*.85)return!1;let l=c*E.tanE,u=n+a-l,d=n+r-i*.75-l;return u>E.g-.5&&d<E.g+8}let O=[];for(let e of[`rocks`,`architecture`,`trees`]){let t=c?.get(e);if(!t)continue;typeof t.blocked==`function`&&O.push((e,n,r)=>t.blocked(e,n,r));let n=t.footprints??t.kit?.footprints;Array.isArray(n)&&n.length&&O.push((e,t,r)=>{for(let i of n)if(i.r!==void 0&&i.x!==void 0){if(Math.hypot(e-i.x,t-(i.z??0))<i.r+r)return!0}else if(i.min&&i.max&&e>i.min[0]-r&&e<i.max[0]+r&&t>i.min[1]-r&&t<i.max[1]+r)return!0;return!1})}let k=new Map,A=(e,t)=>e*73856093^t*19349663,j=[];function ee(e,t,n,r){let i=Math.floor(e/6),a=Math.floor(t/6);for(let o=i-2;o<=i+2;o++)for(let i=a-2;i<=a+2;i++){let a=k.get(A(o,i));if(a)for(let i of a){let a=Math.hypot(i.x-e,i.z-t),o=r||i.species===`young`?.2:.3;if(a<Math.max(1.5,o*(i.crownR+n)))return!0}}return!1}function M(e){let t=A(Math.floor(e.x/6),Math.floor(e.z/6));k.has(t)||k.set(t,[]),k.get(t).push(e),j.push(e)}let N=[];for(let e=0;e<6;e++)N.push([Math.cos(e/6*Math.PI*2+.3),Math.sin(e/6*Math.PI*2+.3)]);let R=n.stats??{},z=``,B=e=>{let t=z+`:`+e;return R[t]=(R[t]||0)+1,null};function V(e,n,r,i,a,s,c=!1){let l=t[r],b=l.species===`young`;z=l.species;let x=(l.stems[0]?.r??.3)*a,C=Math.cos(i),w=Math.sin(i),T=e+(C*l.crownX+w*l.crownZ)*a,E=n+(-w*l.crownX+C*l.crownZ)*a,k=l.crownR*a,A=l.height*a,j=o.heightAt(e,n);if(j<-.3)return B(`water`);if(D(T,E,j,(l.crownY??l.height*.85)*a,k,A))return B(`sunLine`);if(ee(e,n,k,b))return B(`crowd`);if(o.distToPaths(e,n)<x+1)return B(`path`);for(let t of d){let r=Math.hypot(e-t.x,n-t.z);if(r<t.trunk+x+1.5)return B(`heroTrunk`);if(A>t.lowY-1.2){if(Math.hypot(T-t.x,E-t.z)<t.outer+k*.75)return B(`heroCrown`);if(r<t.outer+.5)return B(`heroDeck`)}}for(let t of f){if(Math.hypot(e-t.x,n-t.z)<t.trunk+x)return B(`extraTrunk`);let r=Math.hypot(T-t.x,E-t.z);if(A>t.forkY-.5?r<t.crown*.72+k*.55:r<t.trunk+k*.6)return B(`extraCrown`)}for(let t of p){if(Xe(e,n,t.ax,t.az,t.bx,t.bz)<x+1.6)return B(`bridgeTrunk`);if(A>t.y-2.5&&Xe(T,E,t.ax,t.az,t.bx,t.bz)<k+1.6)return B(`bridgeCrown`)}if(m){if(Math.hypot(e-m.x,n-m.z)<m.deckR+1.2)return B(`drifterT`);if(Math.hypot(T-m.x,E-m.z)<m.deckR+k*.8)return B(`drifterC`)}for(let t of h)if(Math.hypot(e-t.x,n-t.z)<t.r+x+.8)return B(`platform`);for(let t of g)if(Math.hypot(e-t.x,n-t.z)<t.r)return B(`gathering`);for(let t of _)if(Math.hypot(e-t.x,n-t.z)<t.r)return B(`pool`);for(let t of v)if(o.distToPolyline(e,n,t)<2.4)return B(`stream`);for(let t of y)if(Math.hypot(e-t.x,n-t.z)<2.6+x)return B(`view`);if(!c&&(S(e,n)||S(T,E)))return B(`corridor`);for(let t of O)if(t(e,n,x+.2))return B(`blocker`);if(o.slopeAt(e,n)>25)return B(`slope`);let P=o.groundHeight(e,n)-.06;for(let t=1;t<l.clearance.length;t+=2){let r=Math.min(l.clearance[t],l.clearance[t+1]??99);if(r>20)continue;let i=(t+.5)*l.clearBin*a;if(i>4.5)break;let s=r*a;for(let[t,r]of N){let a=o.heightAt(e+t*i,n+r*i)-P;if(a>s+(b?.3:.16))return B(`buried`);if(s<.3&&a<-.45)return B(`float`);if(a<-.35&&o.heightAt(e+t*i,n+r*i)<-.5&&s<.3)return B(`float2`)}}let F=o.waterSDF(e,n),I=L(10,120,F),R=.9+.18*s,V=u(Math.round(e*10),Math.round(n*10),5)-.5,H=[R*(1+.06*V+.07*I),R*(1+.01*V-.02*I),R*(1-.08*V-.16*I)],U=.86+.24*u(Math.round(e*7),Math.round(n*7),6),W=[U*1.02,U,U*.97],te={x:e,y:P,z:n,rot:i,scale:a,v:r,species:l.species,tintF:H,tintT:W,trunkR:x,crownR:k,crownX:T,crownZ:E,top:A};return M(te),te}function H(e,t,n){let r=1.5,i=o.waterSDF(e+r,t)-o.waterSDF(e-r,t),a=o.waterSDF(e,t+r)-o.waterSDF(e,t-r),s=-i,c=-a;return Math.atan2(-c,s)+(n-.5)*1.3}let U=(e,t)=>23+12*Je.noise2(e*.019+3.1,t*.019-7.7)+5*Je.noise2(e*.055-11,t*.055+2),W=(e,t)=>{let n=1e9;for(let r of v)n=Math.min(n,o.distToPolyline(e,t,r));return n};function te(e,t,n){if(n<-1.5)return 0;if(o.cliffMask(e,t)>.3){let n=W(e,t);return n<11?.72*(1-n/12):0}let r=Math.hypot(e,t);if(r>150)return 0;let i=U(e,t),a;a=n<0?.55:n<3?1:P(1,.7,L(3,Math.max(8,i*.85),n));let s=Je.noise2(e*.034,t*.034)*.6+Je.noise2(e*.09+5.3,t*.09)*.4;a*=F(.55+s*.95,.12,1.35),a*=1-L(i-6,i+6,n);let c=.011*L(i+2,i+12,n)*(1-L(50,105,n))*(1-L(105,145,r));return Math.max(a,c)}function G(e,t,n,r,i,a){let s=Ye(r(4),a);for(let a=0;a<i;a++){let i=r(10+a)*Math.PI*2,c=a===0?0:1.8+r(20+a)*(1.6+a*.9),l=e+Math.cos(i)*c,u=t+Math.sin(i)*c,d=a===0?n:o.waterSDF(l,u),f=r(30+a),p=s;a>0&&s!==`young`&&d<3&&r(40+a)<.35&&(p=`young`);let m;m=p===`young`?f<.6?$.youngClump:$.youngPair:p===`fan`?f<.55?$.fanTall:$.fanMid:d<6?Ye(f,[[$.dateMid,.35],[$.dateShort,.22],[$.dateSlender,.3],[$.dateTall,.13]]):d<60?Ye(f,[[$.dateTall,.36],[$.dateMid,.3],[$.dateSlender,.24],[$.dateShort,.1]]):Ye(f,[[$.dateTall,.38],[$.dateMid,.3],[$.dateSlender,.2],[$.dateShort,.12]]);let h=r(50+a),g=d<14?H(l,u,h):h*Math.PI*2,_=(d>90?.8:.86)+r(60+a)*.28;V(l,u,m,g,_,r(70+a))||(p===`date`&&m!==$.dateShort?V(l,u,$.dateShort,g,_*.95,r(70+a)):p!==`young`&&d<5&&V(l,u,$.youngPair,g,_,r(70+a)))}}{let e=1.5,t=[];for(let n=-150;n<=150;n+=e)for(let r=-80;r<=70;r+=e){let i=o.waterSDF(n,r),a=o.waterSDF(n+e,r),s=o.waterSDF(n,r+e);(i>0!=a>0||i>0!=s>0)&&t.push([n,r])}let n=[];for(let[e,r]of t){let t=!0;for(let i of n)if((i[0]-e)**2+(i[1]-r)**2<12.96){t=!1;break}t&&n.push([e,r])}R.shoreCand=n.length;for(let[e,t]of n){await a();let n=Math.round(e*10),r=Math.round(t*10),i=e=>u(n,r,300+e),s=F(.55+(Je.noise2(e*.034,t*.034)*.6+Je.noise2(e*.09+5.3,t*.09)*.4)*.95,.15,1.3);if(i(0)>1.35*s)continue;let c=o.waterSDF(e+1,t)-o.waterSDF(e-1,t),l=o.waterSDF(e,t+1)-o.waterSDF(e,t-1),d=Math.hypot(c,l)||1,f=.4+i(1)*i(1)*9,p=e+c/d*f,m=t+l/d*f,h=o.waterSDF(p,m);if(R.shoreSeeds=(R.shoreSeeds||0)+1,G(p,m,h,i,2+Math.floor(i(2)*4.2),[[`young`,.3],[`date`,.6],[`fan`,.1]]),i(90)<.8*s){let a=7+i(91)*8,s=e+c/d*a,f=t+l/d*a,p=e=>u(n+17,r-29,500+e);G(s,f,o.waterSDF(s,f),p,1+Math.floor(p(2)*2.5),[[`date`,.78],[`fan`,.22]])}let g=15+i(92)*10,_=e+c/d*g,v=t+l/d*g;if(i(93)<.55*s&&o.waterSDF(_,v)<U(_,v)-3){let e=e=>u(n-41,r+13,600+e);G(_,v,o.waterSDF(_,v),e,1+Math.floor(e(2)*2.2),[[`date`,.72],[`fan`,.28]])}}}for(let e=29;e<84;e++){await a();for(let t=29;t<84;t++){let n=n=>u(e,t,n),r=-340+(e+n(1))*6,i=-340+(t+n(2))*6;if(r*r+i*i>24964&&o.cliffMask(r,i)<.3)continue;let a=o.waterSDF(r,i);if(n(3)>te(r,i,a)*.8)continue;let s=a<U(r,i)+2||o.cliffMask(r,i)>.3,c=a<3.5?[[`young`,.34],[`date`,.56],[`fan`,.1]]:a<15?[[`young`,.08],[`date`,.7],[`fan`,.22]]:s?[[`young`,.03],[`date`,.72],[`fan`,.25]]:[[`date`,.8],[`fan`,.2]];G(r,i,a,n,s?1+Math.floor(n(5)*(a<14?4.2:3.4)):n(5)<.22?2:1,c)}}{let e=[];for(let t=-150;t<=150;t+=7){await a();for(let n=-150;n<=150;n+=7){if(Math.hypot(t,n)>132||o.cliffMask(t,n)>.02)continue;let r=o.waterSDF(t,n);if(r<28||r>90||r<U(t,n)+9||o.distToPaths(t,n)<9||S(t,n))continue;let i=o.heightAt(t,n),a=0;for(let e=0;e<8;e++)a+=o.heightAt(t+Math.cos(e*.785)*11,n+Math.sin(e*.785)*11);let s=(a/8-i)*4+Je.noise2(t*.013+71.3,n*.013-5.1)+.25*u(t,n,900);e.push({x:t,z:n,d:r,score:s})}}e.sort((e,t)=>t.score-e.score);let t=[];for(let n of e){if(t.length>=4)break;t.some(e=>Math.hypot(e.x-n.x,e.z-n.z)<60)||t.push(n)}R.seepGroves=t.map(e=>[Math.round(e.x),Math.round(e.z)]);for(let e=0;e<t.length;e++){let n=t[e],r=t=>u(e+4001,77,700+t);G(n.x,n.z,n.d,r,4+Math.floor(r(2)*4),[[`date`,.72],[`fan`,.28]]);let i=t=>u(e+4001,91,800+t),a=i(1)*Math.PI*2;G(n.x+Math.cos(a)*3.5,n.z+Math.sin(a)*3.5,n.d,i,2+Math.floor(i(2)*2),[[`young`,1]])}}{let e=s.TRAILS.find(e=>e.id===`desertTrail`),t=[];if(e&&e.path.length>=2){let[n,r]=[e.path[e.path.length-2],e.path[e.path.length-1]],i=.3,a=r[0]-n[0],o=r[1]-n[1],s=Math.hypot(a,o)||1;t.push({x:n[0]+a*i-o/s*6,z:n[1]+o*i+a/s*6,vi:$.dateTall,s:1.04,young:!0})}E&&t.push({x:E.x+E.sx*118-E.sz*9,z:E.z+E.sz*118+E.sx*9,vi:$.dateTall,s:1.08,pair:$.dateSlender});let n=0;for(let e of t){n++;let t=null;for(let r=0;r<24&&!t;r++){let i=r*2.39996,a=r===0?0:1.2*Math.sqrt(r);t=V(e.x+Math.cos(i)*a,e.z+Math.sin(i)*a,e.vi,u(n,r,950)*Math.PI*2,e.s,u(n,r,951),!0)}if(t&&(R.composition=(R.composition||0)+1,e.pair!==void 0||e.young))for(let r=0;r<16;r++){let i=u(n,r,952)*Math.PI*2,a=2.6+r*.25,o=e.pair??$.youngPair;if(V(t.x+Math.cos(i)*a,t.z+Math.sin(i)*a,o,u(n,r,953)*Math.PI*2,e.pair===void 0?1:.95,u(n,r,954),!0))break}}}return j.sort((e,t)=>e.x-t.x||e.z-t.z),j}var Qe=8,$e=[6,30,56],et=Qe*$e.length,tt=`
varying vec2 vUv2;
varying vec3 vCol;
varying vec3 vN;
uniform vec2 uUvScale;
void main() {
  vUv2 = uv * uUvScale;
  vCol = color;
  vN = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,nt=`
uniform sampler2D map;
uniform sampler2D nmap;
uniform float uMode;      // 0 albedo, 1 normal
uniform float uOpaque;    // 1 = trunk (ignore alpha)
uniform float uTransl;
varying vec2 vUv2;
varying vec3 vCol;
varying vec3 vN;
void main() {
  vec4 t = texture2D(map, vUv2);
  float a = uOpaque > 0.5 ? 1.0 : t.a;
  if (uOpaque < 0.5) {
    vec2 ts = vec2(textureSize(map, 0));
    vec2 dx = dFdx(vUv2 * ts), dy = dFdy(vUv2 * ts);
    float lvl = max(0.0, 0.5 * log2(max(max(dot(dx, dx), dot(dy, dy)), 1e-8)));
    a = min(1.0, a * (1.0 + lvl * 0.2));
  }
  if (a < 0.02) discard;
  if (uMode < 0.5) {
    float occl = 1.0 - 0.38 * smoothstep(0.33, 0.7, gl_FragCoord.z);
    gl_FragColor = vec4(t.rgb * vCol * occl, a);
  } else {
    vec3 n = normalize(vN) * (gl_FrontFacing ? 1.0 : -1.0);
    float tr = uOpaque > 0.5 ? 0.0 : texture2D(nmap, vUv2).a * uTransl;
    gl_FragColor = vec4(n * 0.5 + 0.5, tr);
  }
}`,rt=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,it=`
uniform sampler2D tSrc;
varying vec2 vUv;
void main() { gl_FragColor = texture2D(tSrc, vUv); }`,at=`
uniform sampler2D tSrc;
uniform sampler2D tMask;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec4 c = textureLod(tSrc, vUv, 0.0);
  float m = textureLod(tMask, vUv, 0.0).a;
  vec3 best = c.rgb; float bd = 1e9;
  for (int y = -6; y <= 6; y += 2) {
    for (int x = -6; x <= 6; x += 2) {
      vec2 o = vec2(float(x), float(y));
      vec2 uv = vUv + o * uTexel;
      float mm = textureLod(tMask, uv, 0.0).a;
      vec3 cc = textureLod(tSrc, uv, 0.0).rgb;
      float d = dot(o, o);
      if (mm > 0.3 && d < bd) { bd = d; best = cc; }
    }
  }
  gl_FragColor = vec4(m > 0.01 ? c.rgb : best, c.a);
}`;function ot(e,t){let n=(t,n,r,i)=>new j({uniforms:{map:{value:t},nmap:{value:e?.normalMap??null},uMode:{value:0},uOpaque:{value:+!!n},uTransl:{value:1},uUvScale:{value:new D(r,r)}},vertexShader:tt,fragmentShader:nt,vertexColors:!0,side:n?0:2,alphaToCoverage:i}),r=n(e?.map??null,!1,1,!0),i=n(e?.map??null,!1,1,!1);i.uniforms.uMode.value=1;let a={date:n(t?.date.map??null,!0,1,!1),fan:n(t?.fan.map??null,!0,1,!1)};if(t)for(let e of[`date`,`fan`])st(a[e],t[e]);let o=new j({uniforms:{tSrc:{value:null}},vertexShader:rt,fragmentShader:it,depthTest:!1,depthWrite:!1}),s=new j({uniforms:{tSrc:{value:null},tMask:{value:null},uTexel:{value:new D(1,1)}},vertexShader:rt,fragmentShader:at,depthTest:!1,depthWrite:!1});return{bakeFrondA:r,bakeFrondN:i,bakeTrunk:a,copyMat:o,dilateMat:s,list:[r,i,a.date,a.fan,o,s]}}function st(e,t){let n=Array.isArray(t.worldSize)?t.worldSize:[t.worldSize??1,t.worldSize??1];e.uniforms.uUvScale.value.set(1/n[0],1/n[1])}function ct(e,t,n){let r=e.mats;for(let e of[r.bakeFrondA,r.bakeFrondN])e.uniforms.map.value=t.map,e.uniforms.nmap.value=t.normalMap;for(let e of[`date`,`fan`]){let i=r.bakeTrunk[e];i.uniforms.map.value=n[e].map,i.uniforms.nmap.value=t.normalMap,st(i,n[e])}}function lt(e,t=null,n=null){let r=ot(t,n),i=new v(4,4,{depthBuffer:!1});return{mats:r,ready:se(e.renderer,r.list,i).finally(()=>i.dispose())}}function ut(n,r,i,s,f=null){let{renderer:p,quality:m}=n,h=m.textureSize>=1024?128:64,g=r.length*et,b=Math.ceil(g/16),x=16*h,C=b*h,w=(t,n,r,i,s)=>new v(t,n,{type:o,format:e,colorSpace:r?c:``,samples:i,depthBuffer:i>0,stencilBuffer:!1,generateMipmaps:s,minFilter:s?a:l,magFilter:l,wrapS:d,wrapT:d,anisotropy:s?4:1}),E=w(h,h,!0,4,!1),k=w(h,h,!1,4,!1),A=w(x,C,!0,0,!1),j=w(x,C,!1,0,!1),ee=w(x,C,!0,0,!0),M=w(x,C,!1,0,!0);f&&ct(f,i,s);let N=f?.mats??ot(i,s),{bakeFrondA:P,bakeFrondN:F,bakeTrunk:I,copyMat:L,dilateMat:R}=N,z=new y,B=new _(void 0,P),V=new _(void 0,I.date);B.frustumCulled=V.frustumCulled=!1,z.add(B,V);let H=new t(-1,1,1,-1,.1,100),U=new _(new T(2,2));U.frustumCulled=!1;let W=new t(-1,1,1,-1,0,1);R.uniforms.tMask.value=A.texture,R.uniforms.uTexel.value.set(1/x,1/C);let te=p.getRenderTarget(),G=p.getClearColor(new u),ne=p.getClearAlpha(),re=p.autoClear;p.autoClear=!1;let ie=(e,t,n)=>{p.setRenderTarget(e),p.setClearColor(t,n),p.clear(!0,!0,!1)},K=(e,t,n,r,i,a,o=L)=>{t.viewport.set(n,r,i,a),o.uniforms.tSrc.value=e.texture,U.material=o,p.setRenderTarget(t),p.render(U,W),t.viewport.set(0,0,t.width,t.height)},ae=new u(.09,.1,.05),oe=new u(.5,.5,1);ie(A,ae,0),ie(j,oe,0);let se=[],ce=new O,q=new O;r.forEach((e,t)=>{let n=e.meta.sphere,r=n.r*1.02;se.push(new S(n.x,n.y,n.z,r)),q.set(n.x,n.y,n.z),B.geometry=e.l0.frond,V.geometry=e.l0.trunk??e.l0.frond,V.visible=!!e.l0.trunk,V.material=e.meta.species===`fan`?I.fan:I.date,Object.assign(H,{left:-r,right:r,top:r,bottom:-r,near:.1,far:r*4+10}),H.updateProjectionMatrix();for(let e=0;e<$e.length;e++){let n=$e[e]*Math.PI/180;for(let i=0;i<Qe;i++){let a=i/Qe*Math.PI*2;ce.set(Math.cos(n)*Math.sin(a),Math.sin(n),Math.cos(n)*Math.cos(a)),H.position.copy(q).addScaledVector(ce,r*2+5),H.up.set(0,1,0),H.lookAt(q),H.updateMatrixWorld();let o=t*et+e*Qe+i,s=o%16*h,c=Math.floor(o/16)*h;for(let e=0;e<2;e++){let t=e===0?E:k;ie(t,e===0?ae:oe,0),B.material=e===0?P:F,I.date.uniforms.uMode.value=e,I.fan.uniforms.uMode.value=e,p.setRenderTarget(t),p.render(z,H),K(t,e===0?A:j,s,c,h,h)}}}}),R.uniforms.tMask.value=A.texture,K(A,ee,0,0,x,C,R),K(j,M,0,0,x,C,R),p.setRenderTarget(te),p.setClearColor(G,ne),p.autoClear=re;for(let e of[E,k,A,j])e.dispose();for(let e of N.list)e.dispose();return U.geometry.dispose(),ee.texture.name=`palmImpostor.albedo`,M.texture.name=`palmImpostor.normal`,n.tex.register(`palmImpostor.albedo`,ee.texture),n.tex.register(`palmImpostor.normal`,M.texture),{albedo:ee.texture,normal:M.texture,targets:[ee,M],grid:new D(16,b),spheres:se,rings:new O(...$e.map(e=>e*Math.PI/180))}}var dt=`
attribute float aImpVariant;
uniform vec4 uImpSphere[NUM_PALM_VARIANTS];
uniform vec3 uLodCamPos;
uniform vec2 uImpFade;
uniform vec3 uImpRings;
varying vec2 vImpUv;
flat varying vec4 vImpFrames;
flat varying vec2 vImpW;
flat varying vec2 vImpRot;
flat varying float vImpA;
`,ft=`
vec3 transformed = position;
vec3 impWorld;
{
  vec3 iT = instanceMatrix[3].xyz;
  float iS = length(instanceMatrix[0].xyz);
  float ic = instanceMatrix[0].x / iS;
  float isn = -instanceMatrix[0].z / iS;
  int vi = int(aImpVariant + 0.5);
  vec4 sph = uImpSphere[vi];
  vec3 cL = sph.xyz * iS;
  vec3 C = iT + vec3(ic * cL.x + isn * cL.z, cL.y, -isn * cL.x + ic * cL.z);
  float R = sph.w * iS;
  float impA = smoothstep(uImpFade.x, uImpFade.y, distance(uLodCamPos, iT));
  vec3 toCam = cameraPosition - C;
  float tl = max(length(toCam), 1e-3);
  toCam /= tl;
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), toCam) + vec3(1e-5, 0.0, 0.0));
  vec3 upv = cross(toCam, right);
  vec2 q = (uv - 0.5) * 2.0 * R;
  impWorld = C + right * q.x + upv * q.y + toCam * min(R * 0.35, tl * 0.25);
  if (impA < 0.002) impWorld = C;
  vec3 lc = vec3(ic * toCam.x - isn * toCam.z, toCam.y, isn * toCam.x + ic * toCam.z);
  float az = atan(lc.x, lc.z);
  if (az < 0.0) az += 6.2831853;
  float kf = az / 6.2831853 * 8.0;
  float k0 = floor(kf);
  float kw = kf - k0;
  float k1 = mod(k0 + 1.0, 8.0);
  k0 = mod(k0, 8.0);
  float el = asin(clamp(lc.y, -1.0, 1.0));
  float rf = el <= uImpRings.x ? 0.0 : (el <= uImpRings.y ? (el - uImpRings.x) / (uImpRings.y - uImpRings.x) : 1.0 + clamp((el - uImpRings.y) / (uImpRings.z - uImpRings.y), 0.0, 1.0));
  float r0 = min(floor(rf), 1.0);
  float rw = clamp(rf - r0, 0.0, 1.0);
  float fb = float(vi) * 24.0;
  vImpFrames = vec4(fb + r0 * 8.0 + k0, fb + r0 * 8.0 + k1, fb + (r0 + 1.0) * 8.0 + k0, fb + (r0 + 1.0) * 8.0 + k1);
  vImpW = vec2(kw, rw);
  vImpRot = vec2(ic, isn);
  vImpA = impA;
  vImpUv = uv;
}
`,pt=`
uniform sampler2D tImpAlbedo;
uniform sampler2D tImpNormal;
uniform vec2 uImpGrid;
varying vec2 vImpUv;
flat varying vec4 vImpFrames;
flat varying vec2 vImpW;
flat varying vec2 vImpRot;
flat varying float vImpA;
vec2 impCell(float f, vec2 uv) {
  vec2 cell = vec2(mod(f, uImpGrid.x), floor(f / uImpGrid.x));
  return (cell + uv) / uImpGrid;
}
vec3 impN;
float impTr;
`,mt=`
{
  vec2 iuv = clamp(vImpUv, 0.004, 0.996);
  vec2 u00 = impCell(vImpFrames.x, iuv), u01 = impCell(vImpFrames.y, iuv);
  vec2 u10 = impCell(vImpFrames.z, iuv), u11 = impCell(vImpFrames.w, iuv);
  vec4 a = mix(mix(texture2D(tImpAlbedo, u00), texture2D(tImpAlbedo, u01), vImpW.x),
               mix(texture2D(tImpAlbedo, u10), texture2D(tImpAlbedo, u11), vImpW.x), vImpW.y);
  vec4 n = mix(mix(texture2D(tImpNormal, u00), texture2D(tImpNormal, u01), vImpW.x),
               mix(texture2D(tImpNormal, u10), texture2D(tImpNormal, u11), vImpW.x), vImpW.y);
  vec2 ts = vec2(textureSize(tImpAlbedo, 0));
  vec2 dx = dFdx(u00 * ts), dy = dFdy(u00 * ts);
  float lvl = max(0.0, 0.5 * log2(max(max(dot(dx, dx), dot(dy, dy)), 1e-8)));
  diffuseColor.rgb *= a.rgb;
  diffuseColor.a = min(1.0, a.a * (1.0 + lvl * ${Ve.toFixed(3)})) * vImpA;
  impN = normalize(n.xyz * 2.0 - 1.0);
  impTr = n.a;
}
`;function ht(e,t,n,r){let i=n.length,a=new E({roughness:.78,metalness:0,alphaTest:.5,alphaToCoverage:!0,envMapIntensity:.6});a.name=`palmImpostor`;let o={tImpAlbedo:{value:t.albedo},tImpNormal:{value:t.normal},uImpGrid:{value:t.grid},uImpSphere:{value:t.spheres},uLodCamPos:{value:new O},uImpFade:{value:new D(r[0],r[1])},uImpRings:{value:t.rings}};a.userData.impUniforms=o,a.defines={NUM_PALM_VARIANTS:t.spheres.length},a.onBeforeCompile=e=>{Object.assign(e.uniforms,o),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
`+dt).replace(`#include <begin_vertex>`,ft).replace(`#include <project_vertex>`,`vec4 mvPosition = viewMatrix * vec4(impWorld, 1.0);
gl_Position = projectionMatrix * mvPosition;`).replace(`#include <worldpos_vertex>`,`vec4 worldPosition = vec4(impWorld, 1.0);`),Ke(e),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
`+pt).replace(`#include <map_fragment>`,mt).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
{
  vec3 nW = vec3(vImpRot.x * impN.x + vImpRot.y * impN.z, impN.y, -vImpRot.y * impN.x + vImpRot.x * impN.z);
  normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
  palmTransl = impTr * 0.45;
}`)},a.customProgramCacheKey=()=>`palmImpostor2`,e.patchMaterial(a);let s=new T(1,1),c=new Float32Array(i),l=new k(s,a,i),d=new C,f=new m,p=new O,h=new O,g=new u;for(let e=0;e<i;e++){let t=n[e];f.setFromAxisAngle(new O(0,1,0),t.rot),d.compose(h.set(t.x,t.y,t.z),f,p.setScalar(t.scale)),l.setMatrixAt(e,d),c[e]=t.v,l.setColorAt(e,g.setRGB(t.tintF[0],t.tintF[1],t.tintF[2]))}return s.setAttribute(`aImpVariant`,new x(c,1)),l.instanceMatrix.needsUpdate=!0,l.instanceColor&&(l.instanceColor.needsUpdate=!0),l.frustumCulled=!1,l.castShadow=!1,l.receiveShadow=!0,l.name=`palmImpostors`,l}async function gt(e){let{scene:t,quality:n,tex:r,collision:i,camera:a}=e,o=performance.now(),s={},c=o,l=e=>{let t=performance.now();s[e]=Math.round(t-c),c=t};e.progress(.02,`Weaving palm fronds`);let d=n.textureSize||1024,f=e.params.has(`floraseq`),p=f?Promise.resolve({atlas:ve(r,Math.min(2048,d*2)),trunkSets:ye(r,d,n.anisotropy||8)}):_e(r,Math.min(2048,d*2),d,n.anisotropy||8),h=f?null:lt(e);l(`start`),await e.yieldFrame();let g=[];for(let t=0;t<xe.length;t++){let n=xe[t],r=ze(n,0);g.push({def:n,l0:r,l1:ze(n,1),meta:r.meta}),e.progress(.05+.2*(t+1)/xe.length,`Growing palms`),await e.yieldFrame()}l(`geo`),e.progress(.3,`Planting palm groves`);let _=await Ze(e,g.map(e=>e.meta),{yieldFrame:e.yieldFrame}),v=_.length;l(`place`);let{atlas:y,trunkSets:b,times:x}=await p;l(`bakeWait`),s.bakeGPU=x;let S=qe(e,y,b),w=(e,t,n,r)=>{let i=0,a=0;for(let t of e)for(let e of[t.g0,t.g1])i+=e.attributes.position.count,a+=e.index.count;let o=new ee(Math.max(1,v),Math.max(3,i),Math.max(3,a),t),s=new Map;for(let t of e)s.set(t.vi,[o.addGeometry(t.g0),o.addGeometry(t.g1)]);return o.customDepthMaterial=n,o.castShadow=!0,o.receiveShadow=!0,o.name=r,{bm:o,ids:s}},T=e=>g.map((e,t)=>({vi:t,g0:e.l0.trunk,g1:e.l1.trunk,fan:e.meta.species===`fan`})).filter(t=>t.g0&&t.fan===e),E=w(g.map((e,t)=>({vi:t,g0:e.l0.frond,g1:e.l1.frond})),S.frond,S.frondDepth,`palmFronds`),D=w(T(!1),S.trunkDate,S.trunkDepth,`palmTrunksDate`),k=w(T(!0),S.trunkFan,S.trunkDepth,`palmTrunksFan`),A=new Float32Array(v),j=new Float32Array(v),M=new Float32Array(v),N=new Int8Array(v).fill(-1),P=new Int32Array(v),F=new Int32Array(v).fill(-1),I=Array(v).fill(null);{let e=new C,t=new m,n=new O,r=new O,i=new u,a=new O(0,1,0);for(let o=0;o<v;o++){let s=_[o];t.setFromAxisAngle(a,s.rot),e.compose(r.set(s.x,s.y,s.z),t,n.setScalar(s.scale)),A[o]=s.x,j[o]=s.y,M[o]=s.z,P[o]=E.bm.addInstance(E.ids.get(s.v)[0]),E.bm.setMatrixAt(P[o],e),E.bm.setColorAt(P[o],i.setRGB(s.tintF[0],s.tintF[1],s.tintF[2]));let c=s.species===`fan`?k:D,l=c.ids.get(s.v);l&&(F[o]=c.bm.addInstance(l[0]),I[o]=c,c.bm.setMatrixAt(F[o],e),c.bm.setColorAt(F[o],i.setRGB(s.tintT[0],s.tintT[1],s.tintT[2])))}}for(let e of[E,D,k])e.bm.computeBoundingBox(),e.bm.computeBoundingSphere(),t.add(e.bm);l(`batch`),e.progress(.75,`Painting distant palms`),await e.yieldFrame();let L=n.treeLeafLOD??1,R=44*L,z=150*L;h&&await h.ready;let B=ht(e,ut(e,g,y,b,h),_,[z-3-14,z-3]);t.add(B);let V=B.material.userData.impUniforms,H=V.uLodCamPos.value;l(`impostor`);let U=0;for(let e of _){let t=Math.cos(e.rot),n=Math.sin(e.rot),r=(r,i)=>e.x+(t*r+n*i)*e.scale,a=(r,i)=>e.z+(-n*r+t*i)*e.scale;for(let t of g[e.v].meta.stems){if(t.r*e.scale<.1)continue;let n=Math.max(.16,t.r*e.scale);i.addCylinder([r(t.x0,t.z0),e.y-.3,a(t.x0,t.z0)],n,1.9,8),t.h*e.scale>1.7&&i.addCylinder([r(t.x1,t.z1),e.y+1.5,a(t.x1,t.z1)],n*.92,1.9,8),U++}}let W=(R-3)**2,te=(R+3)**2,G=(z-3)**2,ne=(z+3)**2,re=(e,t,n)=>e.ids.get(_[t].v)[n];function ie(e,t){let n=I[e];t===2?(E.bm.setVisibleAt(P[e],!1),n&&n.bm.setVisibleAt(F[e],!1)):(E.bm.setGeometryIdAt(P[e],re(E,e,t)),E.bm.setVisibleAt(P[e],!0),n&&(n.bm.setGeometryIdAt(F[e],re(n,e,t)),n.bm.setVisibleAt(F[e],!0))),N[e]=t}let K=e.params.get(`palmsforce`),ae=K===null?-1:parseInt(K,10);ae===2?V.uImpFade.value.set(-2,-1):ae>=0&&V.uImpFade.value.set(1e6,1e6+1);function oe(){let e=a.position.x,t=a.position.y,n=a.position.z;H.set(e,t,n);for(let r=0;r<v;r++){let i=ae;if(i<0){let a=A[r]-e,o=j[r]-t,s=M[r]-n,c=a*a+o*o+s*s,l=N[r];i=c<W?0:c<te?l===0?0:1:c<G?1:c<ne?l===2?2:1:2}i!==N[r]&&ie(r,i)}}oe();let se=e.registry.get(`lighting`)?.staticLight?.shadow?.camera??null,ce=(e,t)=>{let n=e.bm,r=n.onBeforeRender,i=n.onBeforeShadow,o=[];for(let n=0;n<v;n++)t[n]>=0&&(e===E||I[n]===e)&&o.push(n);let s=r=>{for(let i=0;i<o.length;i++){let a=o[i],s=t[a],c=N[a];(c===0||r&&c===2)&&n.setGeometryIdAt(s,re(e,a,1)),r&&c===2&&n.setVisibleAt(s,!0)}},c=r=>{for(let i=0;i<o.length;i++){let a=o[i],s=t[a],c=N[a];c===0?n.setGeometryIdAt(s,re(e,a,0)):r&&c===2&&n.setVisibleAt(s,!1)}};n.onBeforeShadow=function(e,t,n,r,a,o,l){let u=se!==null&&r===se;s(u),i.call(this,e,t,n,r,a,o,l),c(u)},n.onBeforeRender=function(e,t,n,i,o,l){if(n===a){r.call(this,e,t,n,i,o,l);return}s(!1),r.call(this,e,t,n,i,o,l),c(!1)}};ce(E,P),ce(D,F),ce(k,F);let q=new Map,le=(e,t)=>e*92821+t;for(let e of _){let t=le(Math.floor(e.x/8),Math.floor(e.z/8));q.has(t)||q.set(t,[]),q.get(t).push(e)}function ue(e,t,n=0){let r=Math.floor(e/8),i=Math.floor(t/8);for(let a=r-1;a<=r+1;a++)for(let r=i-1;r<=i+1;r++){let i=q.get(le(a,r));if(i){for(let r of i)if(Math.hypot(r.x-e,r.z-t)<r.trunkR+.25+n)return!0}}return!1}let de={};for(let e of _)de[xe[e.v].id]=(de[xe[e.v].id]||0)+1;let fe={count:v,byVariant:de,geometryTris:Object.fromEntries(g.map(e=>[e.def.id,[(e.l0.frond.index.count+(e.l0.trunk?.index.count??0))/3,(e.l1.frond.index.count+(e.l1.trunk?.index.count??0))/3]])),colliders:U,ms:Math.round(performance.now()-o),timings:s};console.log(`[lagoon] palms: ${v} in ${fe.ms} ms ${JSON.stringify(s)} ${JSON.stringify(de)}`),e.progress(1);let pe=e.params.has(`palmsdebug`)?8:0;if(pe){let e=_.filter(e=>e.species===`fan`).map(e=>`${e.x.toFixed(1)},${e.y.toFixed(1)},${e.z.toFixed(1)},${xe[e.v].id===`fanTall`?`T`:`M`}`);for(let t=0;t<e.length;t+=10)console.log(`[lagoon] palms fan `+e.slice(t,t+10).join(` `))}return{update(){if(oe(),pe>0&&--pe===0){let e=[0,0,0];for(let t=0;t<v;t++)e[N[t]]++;console.log(`[lagoon] palms LOD0/LOD1/impostor: ${e.join(`/`)}`)}},order:5,palms:_.map(e=>({x:e.x,y:e.y,z:e.z,trunkR:e.trunkR,crownR:e.crownR,height:e.top,species:e.species,variant:xe[e.v].id})),blocked:ue,stats:fe,meshes:{fronds:E.bm,trunksDate:D.bm,trunksFan:k.bm,impostors:B}}}export{gt as build};