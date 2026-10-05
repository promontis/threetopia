import {Group, Mesh, MeshStandardMaterial} from 'three';
import {buildRockGeometry, ROCK_STYLES} from './geometry.js';
export {buildRockGeometry, ROCK_STYLES};

/** Metres, Y up, base at y=0. The caller owns scene placement. */
export function createRocks({seed = 17, count = 5, spread = 12, size = 1, detail = 2, color = '#89938a'} = {}) {
  if (!Number.isInteger(count) || count < 1 || count > 128) throw new RangeError('count must be 1–128.');
  if (!Number.isSafeInteger(seed)) throw new RangeError('seed must be an integer.');
  if (!Number.isFinite(spread) || spread < 0 || !Number.isFinite(size) || size <= 0) throw new RangeError('spread must be nonnegative and size must be positive.');
  if (!Number.isInteger(detail) || detail < 0 || detail > 4) throw new RangeError('detail must be 0–4.');
  const object = new Group(); object.name = 'Tidewater rocks';
  const material = new MeshStandardMaterial({color, roughness: .95});
  let state = seed >>> 0, disposed = false;
  const random = () => ((state = Math.imul(state ^ (state >>> 15), 2246822519) + 0x6D2B79F5 >>> 0) / 4294967296);
  for (let i = 0; i < count; i++) {
    const geometry = buildRockGeometry(i % 4, seed + i * 29, detail);
    geometry.computeBoundingBox();
    const mesh = new Mesh(geometry, material), scale = size * (.7 + random() * .6);
    mesh.name = `${ROCK_STYLES[i % 4].name}-${i}`;
    mesh.scale.setScalar(scale); mesh.rotation.y = random() * Math.PI * 2;
    mesh.position.set((random() - .5) * spread, -geometry.boundingBox.min.y * scale, (random() - .5) * spread);
    mesh.castShadow = mesh.receiveShadow = true; object.add(mesh);
  }
  return {
    object,
    inspect: () => ({triangles: count * 20 * 4 ** detail, drawCalls: count, disposed}),
    dispose() {
      if (disposed) return; disposed = true;
      for (const mesh of object.children) mesh.geometry.dispose();
      material.dispose(); object.removeFromParent();
    },
  };
}
