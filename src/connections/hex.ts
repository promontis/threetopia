/** A local contract demonstration. It does not load or validate scene geometry. */
export type EdgeKind = 'meadow' | 'path' | 'river';
export type NeighbourIssue = 'none' | 'profile' | 'height' | 'scale' | 'flow';
export interface HexEdge {
  kind: EdgeKind;
  profile: string;
  width: number;
  /** Heights along the boundary, clockwise around its own tile. */
  heights: [number, number, number];
  waterLevel?: number;
  flow?: 'in' | 'out';
}
export interface HexTile {
  id: string;
  radius: number;
  metresPerUnit: number;
  edges: HexEdge[];
}
export interface EdgeCheck {
  direction: number;
  source: HexEdge;
  target: HexEdge;
  neighbour: HexTile;
  issues: string[];
}

export const directions = [
  { name: 'East', short: 'E', q: 1, r: 0 },
  { name: 'South-east', short: 'SE', q: 0, r: 1 },
  { name: 'South-west', short: 'SW', q: -1, r: 1 },
  { name: 'West', short: 'W', q: -1, r: 0 },
  { name: 'North-west', short: 'NW', q: 0, r: -1 },
  { name: 'North-east', short: 'NE', q: 1, r: -1 },
] as const;

const same = (a: number, b: number) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < .001;
const wrap = (value: number) => ((value % 6) + 6) % 6;
const profiles: Record<string, { kind: EdgeKind; width: number }> = {
  'meadow@1': { kind: 'meadow', width: 0 },
  'path-3m@1': { kind: 'path', width: 3 },
  'river-6m@1': { kind: 'river', width: 6 },
};
export const oppositeEdge = (direction: number) => wrap(direction + 3);

export function rotatedEdge(tile: HexTile, direction: number, turns: number): HexEdge {
  if (!Number.isInteger(turns) || !Number.isInteger(direction) || tile.edges.length !== 6) {
    throw new Error('A hex tile has six edges and rotates in whole 60° steps.');
  }
  return tile.edges[wrap(direction - turns)];
}

export function checkHexPlacement(tile: HexTile, neighbours: HexTile[], turns = 0): EdgeCheck[] {
  if (neighbours.length !== 6 || neighbours.some((neighbour) => neighbour.edges.length !== 6)) {
    throw new Error('This example needs all six neighbours, each with six edges.');
  }
  return directions.map((_, direction) => {
    const source = rotatedEdge(tile, direction, turns);
    const neighbour = neighbours[direction];
    const target = neighbour.edges[oppositeEdge(direction)];
    const issues: string[] = [];
    if (!same(tile.radius, 50) || !same(neighbour.radius, 50)) {
      issues.push('Use the same tile size: 50 m from the centre to each corner.');
    }
    if (!same(tile.metresPerUnit, 1) || !same(neighbour.metresPerUnit, 1)) {
      issues.push('Use 1 metre per unit in both tiles.');
    }
    if (source.kind !== target.kind || source.profile !== target.profile) {
      issues.push(`Use ${source.profile} on the neighbour’s facing edge, or choose a transition tile.`);
    }
    for (const boundary of [source, target]) {
      const profile = Object.hasOwn(profiles, boundary.profile) ? profiles[boundary.profile] : undefined;
      if (!profile || profile.kind !== boundary.kind || !same(profile.width, boundary.width)) {
        issues.push(`Use the declared kind and width from the shared ${boundary.profile} profile.`);
        break;
      }
    }
    // Opposite edges run in opposite directions: compare the reversed samples.
    if (source.heights.some((height, index) => !same(height, target.heights[2 - index]))) {
      issues.push('Match the full boundary height profile, including both corners.');
    }
    if (source.kind === 'river' && target.kind === 'river') {
      if (source.waterLevel === undefined || target.waterLevel === undefined || !same(source.waterLevel, target.waterLevel)) {
        issues.push('Use the same water level at the shared edge.');
      }
      if (!((source.flow === 'in' && target.flow === 'out') || (source.flow === 'out' && target.flow === 'in'))) {
        issues.push('Connect river outflow to inflow at the shared edge.');
      }
    }
    // A tile cannot declare two different heights for its own shared corner.
    for (const candidate of [tile, neighbour]) {
      if (candidate.edges.some((edge, index) => !same(edge.heights[2], candidate.edges[(index + 1) % 6].heights[0]))) {
        issues.push(`Make the corner heights consistent inside ${candidate.id}.`);
      }
    }
    return { direction, source, target, neighbour, issues };
  });
}

function edge(kind: EdgeKind, flow?: 'in' | 'out'): HexEdge {
  return {
    kind, profile: kind === 'meadow' ? 'meadow@1' : kind === 'path' ? 'path-3m@1' : 'river-6m@1',
    width: kind === 'meadow' ? 0 : kind === 'path' ? 3 : 6,
    heights: kind === 'river' ? [0, -1.5, 0] : [0, 0, 0],
    ...(kind === 'river' ? { waterLevel: -.5, flow: flow ?? 'out' } : {}),
  };
}

export function hexExample(issue: NeighbourIssue = 'none') {
  const tile: HexTile = {
    id: 'forest', radius: 50, metresPerUnit: 1,
    edges: [edge('path'), edge('meadow'), edge('river', 'out'), edge('meadow'), edge('path'), edge('river', 'in')],
  };
  const names = ['village', 'meadow', 'wetlands', 'woodland', 'hills', 'river valley'];
  const neighbours = directions.map((_, direction): HexTile => {
    const boundary = tile.edges[direction];
    const edges = Array.from({ length: 6 }, () => edge('meadow'));
    edges[oppositeEdge(direction)] = { ...boundary, heights: [...boundary.heights].reverse() as HexEdge['heights'], ...(boundary.flow ? { flow: boundary.flow === 'in' ? 'out' : 'in' } : {}) };
    return { id: names[direction], radius: 50, metresPerUnit: 1, edges };
  });
  if (issue === 'profile') neighbours[5].edges[oppositeEdge(5)] = edge('meadow');
  if (issue === 'height') neighbours[0].edges[oppositeEdge(0)].heights[1] = 1;
  if (issue === 'scale') neighbours[0].radius = 40;
  if (issue === 'flow') neighbours[5].edges[oppositeEdge(5)].flow = 'in';
  return { tile, neighbours };
}
