import { describe, expect, it } from 'vitest';
import { allocate, CREATOR_ALLOCATION_CENTS, splitCents, type Catalog, type PackageVersion } from './allocation.ts';
import { catalog, SUBSCRIBER } from './sampleCatalog.ts';

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
const build = (list: PackageVersion[]): Catalog => new Map(list.map((p) => [p.id, p]));
const p = (id: string, creator: string, deps: (string | [string, boolean])[] = [], eligible?: boolean): PackageVersion => ({
  id, name: id, creator, eligible, dependencies: deps.map((d) => (Array.isArray(d) ? { id: d[0], verified: d[1] } : { id: d, verified: true })),
});

describe('creator allocation', () => {
  it('reserves exactly 800 of 1000 cents for creators', () => {
    expect(CREATOR_ALLOCATION_CENTS).toBe(800);
  });

  it('splits Ocean + Road into two €4 envelopes and Ocean by depth (brief example)', () => {
    const result = allocate(['@threetopia/alex-ocean', '@threetopia/john-road'], catalog, SUBSCRIBER);
    expect(result.envelopes.map((e) => e.cents)).toEqual([400, 400]);
    const ocean = result.envelopes[0];
    expect(Object.fromEntries(ocean.lines.map((l) => [l.account, l.cents]))).toEqual({ alex: 178, sarah: 89, tom: 89, bob: 44 });
    expect(ocean.lines.map((l) => l.depth)).toEqual([0, 1, 1, 2]);
    expect(result.envelopes[1].lines).toEqual([{ account: 'john', packages: ['@threetopia/john-road'], depth: 0, weight: 1, cents: 400 }]);
    expect(sum(result.envelopes.flatMap((e) => e.lines.map((l) => l.cents)))).toBe(800);
  });

  it('always distributes exactly 800 cents, whatever the number of roots', () => {
    for (const count of [1, 3, 4, 7, 20]) {
      const list = Array.from({ length: count }, (_, i) => p(`root-${i}`, `creator-${i}`));
      const result = allocate(list.map((r) => r.id), build(list), 'subscriber');
      expect(result.envelopes).toHaveLength(count);
      expect(sum(result.envelopes.map((e) => e.cents))).toBe(800);
      expect(Math.max(...result.envelopes.map((e) => e.cents)) - Math.min(...result.envelopes.map((e) => e.cents))).toBeLessThanOrEqual(1);
    }
  });

  it('does not pay more for splitting one creator into many packages', () => {
    const split = build([
      p('ocean', 'alex', ['core', 'foam', 'reflections', 'utils']),
      p('core', 'alex'), p('foam', 'alex'), p('reflections', 'alex'), p('utils', 'alex'),
    ]);
    const result = allocate(['ocean'], split, 'subscriber');
    expect(result.envelopes[0].lines).toHaveLength(1);
    expect(result.envelopes[0].lines[0]).toMatchObject({ account: 'alex', depth: 0, cents: 800 });
  });

  it('counts a creator reached through several paths once, at minimum depth', () => {
    const graph = build([p('root', 'a', ['x', 'y']), p('x', 'b', ['z']), p('y', 'c'), p('z', 'c')]);
    const lines = allocate(['root'], graph, 'subscriber').envelopes[0].lines;
    expect(lines.find((l) => l.account === 'c')).toMatchObject({ depth: 1, packages: ['y', 'z'] });
  });

  it('never pays the subscriber, and self-only roots do not dilute other roots', () => {
    const result = allocate(['@threetopia/you-sketch', '@threetopia/john-road'], catalog, SUBSCRIBER);
    expect(result.excluded).toEqual([{ root: '@threetopia/you-sketch', reason: 'No eligible third-party contributor' }]);
    expect(result.envelopes).toHaveLength(1);
    expect(result.envelopes[0].cents).toBe(800);
    const terrain = allocate(['@threetopia/you-terrain'], catalog, SUBSCRIBER).envelopes[0];
    expect(terrain.lines).toEqual([{ account: 'sarah', packages: ['@threetopia/sarah-noise'], depth: 1, weight: 1, cents: 800 }]);
  });

  it('puts everything in the reserve when no root qualifies', () => {
    const result = allocate(['@threetopia/you-sketch'], catalog, SUBSCRIBER);
    expect(result.envelopes).toEqual([]);
    expect(result.reserveCents).toBe(800);
  });

  it('ignores unverified and ineligible dependencies', () => {
    const graph = build([p('root', 'a', [['padding', false], 'platform']), p('padding', 'friend'), p('platform', 'threetopia', [], false)]);
    const lines = allocate(['root'], graph, 'subscriber').envelopes[0].lines;
    expect(lines.map((l) => l.account)).toEqual(['a']);
  });

  it('rounds deterministically with largest remainders', () => {
    const shares = splitCents(100, [{ key: 'b', weight: 1 }, { key: 'a', weight: 1 }, { key: 'c', weight: 1 }]);
    expect([...shares.entries()].sort()).toEqual([['a', 34], ['b', 33], ['c', 33]]);
  });
});
