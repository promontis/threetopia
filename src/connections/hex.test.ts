import { describe, expect, it } from 'vitest';
import { checkHexPlacement, hexExample, oppositeEdge, rotatedEdge, type NeighbourIssue } from './hex.ts';

const failures = (issue: NeighbourIssue = 'none', turns = 0) => {
  const { tile, neighbours } = hexExample(issue);
  return checkHexPlacement(tile, neighbours, turns).filter((check) => check.issues.length);
};

describe('hex boundary declarations', () => {
  it('checks all six neighbours in the compatible example', () => {
    const { tile, neighbours } = hexExample();
    expect(checkHexPlacement(tile, neighbours)).toHaveLength(6);
    expect(failures()).toEqual([]);
  });

  it.each([
    ['profile', 5, 'transition tile'],
    ['height', 0, 'boundary height'],
    ['scale', 0, 'same tile size'],
    ['flow', 5, 'outflow to inflow'],
  ] as const)('locates a %s mismatch without rejecting unrelated edges', (issue, direction, reason) => {
    const result = failures(issue);
    expect(result).toHaveLength(1);
    expect(result[0].direction).toBe(direction);
    expect(result[0].issues.join(' ')).toContain(reason);
  });

  it('rotates edge positions in 60 degree steps without mutating the scene', () => {
    const { tile, neighbours } = hexExample();
    const before = structuredClone(tile);
    expect(rotatedEdge(tile, 0, 1)).toBe(tile.edges[5]);
    expect(rotatedEdge(tile, 0, -1)).toBe(tile.edges[1]);
    expect(checkHexPlacement(tile, neighbours, 1).some((check) => check.issues.length)).toBe(true);
    expect(failures('none', 6)).toEqual([]);
    expect(failures('none', -6)).toEqual([]);
    expect(checkHexPlacement(tile, neighbours, -1)).toEqual(checkHexPlacement(tile, neighbours, 5));
    expect(tile).toEqual(before);
  });

  it('compares opposite profiles in reverse order, including their end corners', () => {
    const { tile, neighbours } = hexExample();
    const village = neighbours[0];
    const opposite = oppositeEdge(0);
    tile.edges[0].heights = [0, 1, 2];
    tile.edges[1].heights[0] = 2; // The shared corner inside the forest.
    village.edges[opposite].heights = [2, 1, 0];
    village.edges[opposite - 1].heights[2] = 2; // Its matching corner inside the village.
    expect(checkHexPlacement(tile, neighbours)[0].issues).toEqual([]);
    village.edges[opposite].heights = [0, 1, 2];
    expect(checkHexPlacement(tile, neighbours)[0].issues.join(' ')).toContain('boundary height');
  });

  it('rejects contradictory corners even if the facing edge matches', () => {
    const { tile, neighbours } = hexExample();
    neighbours[0].edges[2].heights[2] = 4;
    expect(checkHexPlacement(tile, neighbours)[0].issues).toContain('Make the corner heights consistent inside village.');
  });

  it('requires the shared profile width even when both sides declare the same wrong width', () => {
    const { tile, neighbours } = hexExample();
    tile.edges[0].width = 7;
    neighbours[0].edges[3].width = 7;
    expect(checkHexPlacement(tile, neighbours)[0].issues.join(' ')).toContain('kind and width');
  });

  it('requires compatible water levels and opposite flow directions', () => {
    const { tile, neighbours } = hexExample();
    neighbours[5].edges[2].waterLevel = 2;
    let issues = checkHexPlacement(tile, neighbours)[5].issues;
    expect(issues).toContain('Use the same water level at the shared edge.');
    delete neighbours[5].edges[2].waterLevel;
    delete neighbours[5].edges[2].flow;
    issues = checkHexPlacement(tile, neighbours)[5].issues;
    expect(issues).toContain('Use the same water level at the shared edge.');
    expect(issues).toContain('Connect river outflow to inflow at the shared edge.');
  });

  it('rejects invalid scale, non-finite heights and unknown profile versions', () => {
    const { tile, neighbours } = hexExample();
    neighbours[0].metresPerUnit = .01;
    neighbours[1].radius = NaN;
    neighbours[2].edges[5].heights[1] = Infinity;
    neighbours[3].edges[0].profile = 'meadow@2';
    const checks = checkHexPlacement(tile, neighbours);
    expect(checks[0].issues.join(' ')).toContain('1 metre per unit');
    expect(checks[1].issues.join(' ')).toContain('same tile size');
    expect(checks[2].issues.join(' ')).toContain('boundary height');
    expect(checks[3].issues.join(' ')).toContain('shared meadow@2 profile');
  });

  it('rejects incomplete neighbourhoods and non-hex rotations', () => {
    const { tile, neighbours } = hexExample();
    expect(() => checkHexPlacement(tile, neighbours.slice(0, 5))).toThrow('six neighbours');
    expect(() => checkHexPlacement(tile, neighbours, .5)).toThrow('60°');
    tile.edges.pop();
    expect(() => checkHexPlacement(tile, neighbours)).toThrow('six edges');
  });
});
