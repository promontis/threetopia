// The aperture and the sparks share a gently tapered, upright silhouette.
const riftShape = /* glsl */ `
  const vec2 RIFT = vec2(.62, 1.08);
  float riftWidth(float y) {
    return RIFT.x * pow(max(1.0 - y * y, 0.0), .60) * (1.0 - .045 * y);
  }
  float riftCenter(float y, float time) {
    return sin(y * 2.3 + time * .12) * .012 * (1.0 - y * y);
  }
  vec2 riftPoint(float angle, float time) {
    float y = sin(angle);
    return vec2(sign(cos(angle)) * riftWidth(y) + riftCenter(y, time), y * RIFT.y);
  }
`;

export const surfaceVertex = /* glsl */ `
  varying vec2 vPosition;
  void main() {
    vPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const surfaceFragment = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform float uApproach;
  uniform float uEnter;
  uniform sampler2D uSceneMap;
  uniform float uSceneReady;
  uniform vec2 uSceneScale;
  uniform vec2 uPointer;
  uniform sampler2D uLabelMap;
  uniform vec2 uLabelSize;
  uniform float uHasLabel;
  varying vec2 vPosition;
  ${riftShape}

  float apertureDistance(vec2 p, float time) {
    float y = p.y / RIFT.y;
    if (abs(y) >= 1.0) return length(vec2(p.x, abs(p.y) - RIFT.y));
    float slope = (riftWidth(y + .002) - riftWidth(y - .002)) / (.004 * RIFT.y);
    return (abs(p.x - riftCenter(y, time)) - riftWidth(y)) / sqrt(1.0 + slope * slope);
  }

  void main() {
    vec2 p = vPosition;
    float t = uTime;
    float distance = apertureDistance(p, t);
    float aa = max(length(fwidth(p)) * .7071, .001);
    float inside = 1.0 - smoothstep(-.022, .008, distance);
    vec2 q = p / RIFT;
    float a = atan(q.y, q.x);
    float rimRefraction = smoothstep(-.15, .0, distance);

    // A little atmospheric depth softens the view without hiding the path.
    vec2 sceneUV = q * .5 * uSceneScale * (1.0 - uApproach * .055 - uEnter * .28) + .5;
    sceneUV += uPointer * vec2(-.012, -.009);
    sceneUV += vec2(sin(a * 9.0 - t * .7), cos(a * 7.0 + t * .5)) * rimRefraction * .002;
    vec3 viewColor = texture2D(uSceneMap, sceneUV).rgb;
    float luminance = dot(viewColor, vec3(.2126, .7152, .0722));
    viewColor = mix(vec3(luminance), viewColor, .96) * (.97 + uHover * .07);
    float mist = exp(-dot((p - vec2(.12, .38)) / vec2(.5, .55), (p - vec2(.12, .38)) / vec2(.5, .55))) * .035;
    viewColor = mix(viewColor, vec3(.56, .65, .70), mist);
    vec3 color = viewColor;
    float alpha = inside * uSceneReady;

    // Open ribbons continue past each tip and cross there. Varying their
    // thickness and light gives the rim volume instead of concentric outlines.
    float core = 0.0;
    float bloom = 0.0;
    for (int i = 0; i < 4; i++) {
      float index = float(i);
      float phase = index * 1.91;
      float height = RIFT.y + sin(phase + t * .14) * (.035 + index * .012);
      float y = p.y / height;
      float shape = 1.0 - y * y;
      float curve = sign(shape) * pow(abs(shape), .60);
      float fade = 1.0 - smoothstep(1.0, 1.22, abs(y));
      float width = RIFT.x + sin(index * 2.1) * .06;
      float center = sin(y * 2.6 + phase + t * .16) * (.022 + index * .011);
      center += sin(y * 5.2 - phase - t * .11) * .008;
      float slope = width * .60 * pow(max(abs(shape), .004), -.40) * -2.0 * y / height;
      for (int side = 0; side < 2; side++) {
        float direction = float(side) * 2.0 - 1.0;
        float x = direction * width * curve * (1.0 - .045 * y) + center;
        float d = abs(p.x - x) / sqrt(1.0 + slope * slope);
        float surge = .5 + .5 * sin(y * 4.0 + phase + float(side) * 2.4 - t * .22);
        float hot = pow(surge, 3.0);
        float thickness = (i == 0 ? .005 + hot * .009 : .0015 + hot * .0018) * (.3 + fade * .7);
        float light = (i == 0 ? 1.2 : .5) * (.25 + hot * 1.4) * fade;
        core += exp(-pow(d / (thickness + aa * .58), 2.0)) * light;
        bloom += exp(-pow(d / (.029 + hot * .018), 2.0)) * light;
      }
    }
    // Local, analytic bloom keeps the canvas transparent and needs no blur pass.
    float edgeGlow = exp(-pow(distance / .026, 2.0)) * .16;
    float broadGlow = exp(-pow(distance / (.092 + uHover * .035), 2.0)) * (.08 + uHover * .07);
    float power = 1.0 + uHover * .65 + uEnter * .8;
    float emission = (core * 2.1 + bloom * .28 + edgeGlow + broadGlow) * power;
    float lightAlpha = 1.0 - exp(-emission);
    vec3 lightColor = mix(vec3(.82, .90, 1.0), vec3(1.0), min(core + bloom * .3, 1.0));
    float combinedAlpha = lightAlpha + alpha * (1.0 - lightAlpha);
    color = (lightColor * lightAlpha + color * alpha * (1.0 - lightAlpha)) / max(combinedAlpha, .0001);
    alpha = combinedAlpha;

    // Small lettering shares the opening's perspective and remains in its center.
    vec2 labelUV = p / uLabelSize + .5;
    if (uHasLabel > .5 && all(greaterThan(labelUV, vec2(0.0))) && all(lessThan(labelUV, vec2(1.0)))) {
      vec2 glyph = texture2D(uLabelMap, labelUV).rg;
      float fade = 1.0 - smoothstep(0.0, .35, uEnter);
      color *= 1.0 - glyph.g * (.62 - uHover * .2) * fade;
      color = mix(color, vec3(.94, .97, 1.0), max(glyph.r, glyph.g * uHover * .22) * fade);
      alpha = max(alpha, (glyph.r * .98 + glyph.g * .14) * fade);
    }
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;

export const particlesVertex = /* glsl */ `
  uniform float uTime;
  uniform float uDpr;
  uniform float uPixelScale;
  uniform float uHover;
  uniform float uApproach;
  uniform float uEnter;
  uniform float uSpread;
  attribute vec4 aSeed;
  varying float vAlpha;
  varying float vTint;
  varying float vStar;
  ${riftShape}

  void main() {
    float life = fract(aSeed.y + uTime * (.065 + aSeed.z * .045));
    float angle = aSeed.x * 6.2831853 + uTime * (.07 + aSeed.z * .025);
    vec2 normal = normalize(vec2(cos(angle) * 1.3, sin(angle)));
    vec2 edge = riftPoint(angle, uTime);
    float z;
    float brightness;
    vec2 p;
    if (aSeed.w < .36) {
      // Small sparks travel along the ribbons, mostly outside the opening.
      p = edge + normal * (sin(angle * 3.0 + aSeed.y * 6.28) * .022 + life * .062);
      z = .08 + aSeed.y * .035;
      brightness = .85;
    } else if (aSeed.w < .90) {
      // A loose cloud dissolves into the surrounding landscape.
      float drift = pow(life, .85) * (.09 + aSeed.z * .32) * uSpread * (1.0 - uApproach * .28);
      p = edge + normal * (.014 + drift);
      p.x += sin(life * 6.0 + aSeed.x * 19.0) * life * .045;
      p.y += sin(life * 3.0 + aSeed.y * 12.0) * life * .055;
      z = sin(life * 3.14159) * .22 + .1;
      brightness = .86;
    } else if (aSeed.w < .985) {
      // Irregular wisps at the top and bottom, between the crossing ribbons.
      float end = aSeed.x < .5 ? -1.0 : 1.0;
      p = vec2(sin(life * 5.0 + aSeed.x * 22.0) * (.035 + life * .075), end * (1.04 + life * .36 * uSpread));
      z = .12;
      brightness = .82;
    } else {
      p = edge * sqrt(aSeed.y) * .75;
      z = .07;
      brightness = .18;
    }
    z += uEnter * life * 2.5;
    vec4 viewPosition = modelViewMatrix * vec4(p, z, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    vStar = step(.983, aSeed.z);
    float size = mix(1.5, 5.3, pow(aSeed.z, 3.0)) + vStar * 5.0;
    gl_PointSize = min(24.0, size * uDpr * uPixelScale * (1.0 + uApproach * .1) * 6.35 / -viewPosition.z);
    vAlpha = smoothstep(0.0, .12, life) * (1.0 - smoothstep(.60, 1.0, life));
    float shimmer = .68 + .32 * pow(.5 + .5 * sin(aSeed.x * 67.0 + uTime * (1.4 + aSeed.z * 2.0)), 2.0);
    vAlpha *= brightness * shimmer * (1.0 + uHover * .4 + uEnter);
    vTint = aSeed.x;
  }
`;

export const particlesFragment = /* glsl */ `
  varying float vAlpha;
  varying float vTint;
  varying float vStar;
  void main() {
    vec2 p = gl_PointCoord - .5;
    float d = length(p) * 2.0;
    float core = exp(-d * d * 14.0);
    float halo = exp(-d * d * 3.5) * .32;
    float crossGlow = (exp(-abs(p.x) * 55.0) + exp(-abs(p.y) * 55.0)) * exp(-d * 4.0) * vStar * .23;
    vec3 tint = mix(vec3(.87, .93, 1.0), vec3(1.0, .99, .96), vTint);
    gl_FragColor = vec4(mix(tint, vec3(1.0), core), (core + halo + crossGlow) * vAlpha);
    #include <colorspace_fragment>
  }
`;
