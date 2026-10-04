// Authored terrain source. Rendered through individual host contracts, never as a shared island mesh.
const PUNK_ACCESS = { approach: { x: -1.8041071509290307, z: -9.234415682341485 }, shore: { x: -0.4, y: 0.8, z: -11.2 } };
const BOUNDS = { x: -25, z: -31, width: 56, depth: 49 };
const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;
function random(seed = 73) {
  return () => {
    seed |= 0;
    seed = seed + 1831565813 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hash(x, z) {
  const n = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function noise(x, z) {
  const ix = Math.floor(x), iz = Math.floor(z), u = smooth(0, 1, x - ix), v = smooth(0, 1, z - iz);
  return mix(mix(hash(ix, iz), hash(ix + 1, iz), u), mix(hash(ix, iz + 1), hash(ix + 1, iz + 1), u), v);
}
function sourceHeight(s, x, z) {
  const gx = Math.max(0, Math.min(s.size - 1, (x - s.x0) / s.step)), gz = Math.max(0, Math.min(s.size - 1, (z - s.z0) / s.step)), ix = Math.min(s.size - 2, Math.floor(gx)), iz = Math.min(s.size - 2, Math.floor(gz));
  return mix(mix(s.heights[iz * s.size + ix], s.heights[iz * s.size + ix + 1], gx - ix), mix(s.heights[(iz + 1) * s.size + ix], s.heights[(iz + 1) * s.size + ix + 1], gx - ix), gz - iz);
}
const distanceToSegment = (x, z, a, b) => {
  const dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (dx * dx + dz * dz)));
  return Math.hypot(x - a[0] - t * dx, z - a[1] - t * dz);
};
const paths = [[-5.4, 6.8], [1.7, 6.7], [6.1, 4.4], [7.2, -0.8], [6.5, -5.9], [3, -7.1], [0.6, -8.4], [-3.4, -10.2], [-5.5, -11.9], [-13.4, -11.9], [-13.1, -6.5], [-8.8, -3.2], [-7.4, 2.6], [-5.4, 6.8]];
const riverX = (z) => -9.69 + Math.sin((z + 12.25) * 0.35) * 0.65 + smooth(-11, -5, z) * 4.8;
function createLandscapeSampler(lagoon, accessLanding = true) {
  function pathAt(x, z) {
    let d = Infinity;
    for (let i = 1; i < paths.length; i++) d = Math.min(d, distanceToSegment(x, z, paths[i - 1], paths[i]));
    d = Math.min(d, distanceToSegment(x, z, [6.5, -5.9], [13.7, -6.5]));
    if (accessLanding) d = Math.min(d, distanceToSegment(x, z, [PUNK_ACCESS.approach.x, PUNK_ACCESS.approach.z], [PUNK_ACCESS.shore.x, PUNK_ACCESS.shore.z]), Math.hypot(x - PUNK_ACCESS.shore.x, z - PUNK_ACCESS.shore.z) - 0.35);
    return 1 - smooth(0.36, 0.95, d);
  }
  function heightAt(x, z) {
    const n = (noise(x * 0.58, z * 0.58) - 0.5) * 0.38 + (noise(x * 1.5, z * 1.5) - 0.5) * 0.1;
    const fields = [[0, 0, 8.25], [-7.79, -13.5, 8.8], [7.79, -13.5, 9], [15.59, 0, 8.9]].map(([cx, cz, r]) => r - Math.hypot(x - cx, z - cz));
    let shore = Math.max(...fields) + (noise(x * 0.32, z * 0.32) - 0.5) * 1.5;
    let y = mix(-2.8, 0.72, smooth(-2, 1.8, shore)) - 7.2 * (1 - smooth(-9, -2, shore)) + n * smooth(-0.1, 2, shore);
    if (y < -0.35) {
      const d = -y;
      y = -mix(0.35 + (d - 0.35) * 0.72, d, smooth(3.5, 10, d));
    }
    const hill = 2.3 * Math.exp(-(((x + 10) / 5.5) ** 2 + ((z + 20) / 3.5) ** 2)) + 1.15 * Math.exp(-(((x + 15) / 2.8) ** 2 + ((z + 14) / 5) ** 2));
    y += hill * smooth(0.5, 3.2, shore);
    const lr = Math.hypot(x, z * 0.97), rootDistance = Math.min(...[[-3.662, 0.646], [-0.431, -0.862], [1.723, 1.508], [4.093, -1.077]].map(([a, b]) => Math.hypot(x - a, z - b)));
    const native = sourceHeight(lagoon, x, z) - 0.64 * smooth(0.65, 1.5, rootDistance);
    y = mix(y, native, 1 - smooth(5.6, 7.15, lr));
    const rx = riverX(z), rd = Math.abs(x - rx), riverWidth = mix(1.18, 1.85, smooth(-18, -7, z));
    const river = (1 - smooth(riverWidth, riverWidth + 1.05, rd)) * smooth(-24, -22, z) * (1 - smooth(-5, -2.5, z));
    y = mix(y, -0.66 + noise(x * 0.8, z * 0.8) * 0.1, river);
    const harbor = smooth(-7.1, -4.8, z) * (1 - smooth(7.2, 10.3, Math.hypot((x - 16) * 0.88, z * 0.8))) * smooth(8.1, 11, x);
    y = mix(y, -1.3, harbor);
    const hover = 1 - smooth(6.05, 7.45, Math.hypot(x - 7.79, (z + 13.5) * 1.06));
    y = mix(y, -1.65, hover);
    const temple = 1 - smooth(1.03, 1.6, Math.max(Math.abs(x + 5.29), Math.abs(z + 16.1)));
    y = mix(y, 0.85, temple);
    const landing = Math.exp(-(((x - 13.67) / 1.05) ** 2 + ((z + 6.69) / 1.15) ** 2));
    y = mix(y, 1.04, landing);
    const teleportLanding = accessLanding ? 1 - smooth(0.95, 1.55, Math.hypot(x - PUNK_ACCESS.shore.x, z - PUNK_ACCESS.shore.z)) : 0;
    y = mix(y, PUNK_ACCESS.shore.y - 0.04, teleportLanding);
    const edge = Math.min(x - BOUNDS.x, z - BOUNDS.z, BOUNDS.x + BOUNDS.width - x, BOUNDS.z + BOUNDS.depth - z);
    return mix(-10, y, smooth(0, 4, edge));
  }
  function grassAt(x, z) {
    const y = heightAt(x, z), r = Math.hypot(x, z), p = pathAt(x, z);
    return smooth(0.22, 0.7, y) * (1 - p) * mix(0.57, 1, noise(x * 0.31, z * 0.31)) * (1 - 0.35 * (1 - smooth(6.2, 8.1, r)));
  }
  return { heightAt, pathAt, grassAt };
}
export {
  BOUNDS,
  createLandscapeSampler,
  mix,
  noise,
  random,
  riverX,
  smooth
};
