import {BufferGeometry, BufferAttribute, DynamicDrawUsage, Mesh, MeshStandardMaterial, DoubleSide, MathUtils} from 'three';
import {createGullGeometry} from './geometry.js';
export {createGullGeometry};
const TAU = Math.PI * 2;

/** Absolute, host-owned time in seconds. No renderer, timers, fetches or scene globals. */
export function createGulls({count = 7, seed = 7, center = [0, 0, 0], spread = [5, 4], radius = [1.6, 3.3], height = [3.6, 5.6], speed = [.45, .65], size = [.36, .44], bob = .4, flapSpeed = .58} = {}) {
  if (!Number.isInteger(count) || count < 1 || count > 256) throw new RangeError('count must be 1–256.');
  if (!Number.isSafeInteger(seed)) throw new RangeError('seed must be an integer.');
  if (!Array.isArray(center) || center.length !== 3 || !center.every(Number.isFinite)) throw new RangeError('center must contain three finite coordinates.');
  if (!Array.isArray(spread) || spread.length !== 2 || !spread.every(v => Number.isFinite(v) && v >= 0)) throw new RangeError('spread must contain two nonnegative distances.');
  for (const [name, range] of Object.entries({radius, height, speed, size})) {
    if (!Array.isArray(range) || range.length !== 2 || !range.every(Number.isFinite) || range[1] < range[0] || name !== 'height' && range[0] <= 0) throw new RangeError(`${name} must be an ordered range${name === 'height' ? '' : ' of positive numbers'}.`);
  }
  if (![bob, flapSpeed].every(v => Number.isFinite(v) && v >= 0)) throw new RangeError('bob and flapSpeed must be nonnegative.');
  const template = createGullGeometry(), vertices = template.attributes.position.count;
  const rest = template.attributes.position.array, colors = template.attributes.color.array, side = template.attributes.side.array, span = template.attributes.span.array;
  const geometry = new BufferGeometry(), flockColors = new Float32Array(colors.length * count), indices = new Uint16Array(template.index.count * count);
  for (let i = 0; i < count; i++) { flockColors.set(colors, i * colors.length); indices.set(template.index.array.map(n => n + i * vertices), i * template.index.count); }
  geometry.setIndex(new BufferAttribute(indices, 1));
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(rest.length * count), 3).setUsage(DynamicDrawUsage));
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(rest.length * count), 3).setUsage(DynamicDrawUsage));
  geometry.setAttribute('color', new BufferAttribute(flockColors, 3)); template.dispose();
  const material = new MeshStandardMaterial({name: 'Native Tidewater gull feathers', vertexColors: true, roughness: .75, side: DoubleSide});
  const object = new Mesh(geometry, material); object.name = 'Native Tidewater seagulls';
  let state = seed >>> 0, last = NaN, disposed = false;
  const random = () => ((state = Math.imul(state ^ (state >>> 15), 2246822519) + 0x6D2B79F5 >>> 0) / 4294967296);
  const sample = range => range[0] + random() * (range[1] - range[0]);
  const birds = Array.from({length: count}, () => ({x: center[0] + (random() - .5) * spread[0], z: center[2] + (random() - .5) * spread[1], radius: sample(radius),
    height: center[1] + sample(height), phase: random() * TAU, speed: sample(speed), flap: random() * 100, dir: random() < .5 ? -1 : 1, scale: sample(size)}));
  function update(time) {
    if (disposed) return;
    if (!Number.isFinite(time)) throw new RangeError('time must be finite seconds.');
    if (last === time) return; last = time;
    const positions = geometry.attributes.position;
    for (let j = 0; j < count; j++) {
      const b = birds[j], th = b.phase + time * b.speed / b.radius * b.dir;
      const px = b.x + Math.cos(th) * b.radius, py = b.height + Math.sin(th * 2 + b.flap) * bob, pz = b.z + Math.sin(th) * b.radius;
      const fx = -Math.sin(th) * b.dir, fz = Math.cos(th) * b.dir, cb = Math.cos(-.45 * b.dir), sb = Math.sin(-.45 * b.dir);
      const clock = time * flapSpeed, gate = MathUtils.smoothstep(Math.sin(clock * .23 + b.flap) * .5 + .5, .55, .8);
      const lift = gate * Math.sin(clock * 3.1 * TAU + b.flap * 7) * .55 + .08;
      for (let i = 0; i < vertices; i++) {
        let x = rest[i * 3], y = rest[i * 3 + 1]; const z = rest[i * 3 + 2];
        if (side[i] !== 0) { const ang = lift * (span[i] * .6 + .4) + span[i] ** 2 * (1 - gate) * -.18; y += Math.abs(x) * Math.sin(ang); x *= Math.cos(ang); }
        const rx = x * cb - y * sb, ry = x * sb + y * cb;
        positions.setXYZ(j * vertices + i, px + (fz * rx + fx * z) * b.scale, py + ry * b.scale, pz + (-fx * rx + fz * z) * b.scale);
      }
    }
    positions.needsUpdate = true; geometry.computeVertexNormals(); geometry.computeBoundingSphere(); geometry.computeBoundingBox();
  }
  update(0);
  return {object, update, inspect: () => ({count, triangles: indices.length / 3, drawCalls: 1, time: last, disposed}),
    dispose() { if (disposed) return; disposed = true; geometry.dispose(); material.dispose(); object.removeFromParent(); }};
}
