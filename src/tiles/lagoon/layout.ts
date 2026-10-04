import { lerp, smooth, sampleHeightfield, type Heightfield } from '../../explore/heightfield.ts';

/** A proposal tile, in metres. Source geometry keeps its original 1:1 scale. */
export const LAGOON_TILE = {
  radius: 105,
  sourceCenter: { x: -12, z: 3 },
  connectedEdges: [0, 2, 4],
  shoreBlend: 14,
  seabed: -6,
} as const;
export const APOTHEM = Math.sqrt(3) / 2 * LAGOON_TILE.radius;
export const corners = Array.from({ length: 6 }, (_, i) => {
  const a = (i * 60 - 30) * Math.PI / 180;
  return { x: Math.cos(a) * LAGOON_TILE.radius, z: Math.sin(a) * LAGOON_TILE.radius };
});
export const edges = corners.map((a, i) => {
  const b = corners[(i + 1) % 6], angle = i * Math.PI / 3;
  return { id: i, a, b, nx: Math.cos(angle), nz: Math.sin(angle), connected: LAGOON_TILE.connectedEdges.includes(i as 0 | 2 | 4) };
});
export function edgeCoordinates(x: number, z: number, edge: typeof edges[number]) {
  return { inward: APOTHEM - x * edge.nx - z * edge.nz, along: -x * edge.nz + z * edge.nx };
}
export function insideTile(x: number, z: number, margin = 0) {
  return edges.every(e => edgeCoordinates(x, z, e).inward >= margin - 1e-7);
}
/** An even profile: neighbouring tiles can reverse their edge and still match.
 * Forty metres of level ground, then a beach into the shared sea at both ends. */
export function connectionHeight(along: number) {
  return lerp(2.4, LAGOON_TILE.seabed, smooth(20, 34, Math.abs(along)));
}
export function compactHeight(field: Heightfield, x: number, z: number) {
  const source = sampleHeightfield(field, x + LAGOON_TILE.sourceCenter.x, z + LAGOON_TILE.sourceCenter.z);
  const nearest = edges.map(e => ({ ...e, ...edgeCoordinates(x, z, e) })).sort((a, b) => a.inward - b.inward)[0];
  if (nearest.inward < -1e-6) return LAGOON_TILE.seabed;
  const rim = nearest.connected ? connectionHeight(nearest.along) : LAGOON_TILE.seabed;
  // The interior is untouched; only the last fourteen metres become the edge contract.
  return lerp(rim, source, smooth(0, LAGOON_TILE.shoreBlend, nearest.inward));
}
/** Short sample pieces belonging to neighbouring tiles, not additional worlds. */
export function neighbourHeight(outward: number, along: number) {
  return lerp(connectionHeight(along), LAGOON_TILE.seabed, smooth(17, 37, outward));
}
