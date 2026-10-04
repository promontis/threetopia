import { describe, expect, it } from 'vitest';
import { allocate, CREATOR_ALLOCATION_CENTS, type PackageVersion } from './allocation.ts';
import { ESTIMATE_CREATOR, estimateEarnings, monthlyPool } from './estimator.ts';

describe('monthly pool', () => {
  it('reproduces the brief’s 1,000-subscriber example', () => {
    expect(monthlyPool(1000)).toEqual({ grossCents: 1_000_000, platformCents: 200_000, creatorCents: 800_000 });
  });
});

describe('creator earnings estimate', () => {
  it('pays a dependency-free water root €500 for 500 subscribers with 8 roots each', () => {
    const estimate = estimateEarnings({ subscribers: 500, rootsPerSubscriber: 8, position: { kind: 'root', dependencies: 0 } });
    expect(estimate.envelopeCents).toBe(100);
    expect(estimate.rootCents).toBe(50_000);
    expect(estimate.share).toBe(1);
    expect(estimate.yourCents).toBe(50_000);
  });

  it('shares the same €500 with verified dependencies instead of adding money', () => {
    const estimate = estimateEarnings({ subscribers: 500, rootsPerSubscriber: 8, position: { kind: 'root', dependencies: 2 } });
    expect(estimate.rootCents).toBe(50_000);
    expect(estimate.yourCents).toBe(25_000); // weight 1 of 1 + ½ + ½
    expect(estimate.lines.reduce((sum, l) => sum + l.cents, 0)).toBe(50_000);
  });

  it('weights a dependency by its depth under someone else’s root', () => {
    const estimate = estimateEarnings({ subscribers: 500, rootsPerSubscriber: 8, position: { kind: 'dependency', depth: 2, others: 1 } });
    // Host 1, one other creator ½, you ¼ → you get ¼ / 1.75 of €500.
    expect(estimate.share).toBeCloseTo(0.25 / 1.75);
    expect(estimate.yourCents).toBe(7143);
    expect(estimate.lines.map((l) => [l.account, l.depth])).toEqual([['host', 0], ['other-creator-0', 1], [ESTIMATE_CREATOR, 2]]);
  });

  it('agrees with settling each subscriber separately, up to one cent per subscriber', () => {
    const subscribers = 37, roots = 3;
    const estimate = estimateEarnings({ subscribers, rootsPerSubscriber: roots, position: { kind: 'root', dependencies: 1 } });
    const list: PackageVersion[] = [
      { id: 'root', name: 'root', creator: ESTIMATE_CREATOR, dependencies: [{ id: 'dep', verified: true }] },
      { id: 'dep', name: 'dep', creator: 'other', dependencies: [] },
      { id: 'a', name: 'a', creator: 'a', dependencies: [] },
      { id: 'b', name: 'b', creator: 'b', dependencies: [] },
    ];
    const one = allocate(['root', 'a', 'b'], new Map(list.map((p) => [p.id, p])), 'subscriber');
    const perSubscriber = one.envelopes.find((e) => e.root === 'root')!.lines.find((l) => l.account === ESTIMATE_CREATOR)!.cents;
    expect(Math.abs(estimate.yourCents - perSubscriber * subscribers)).toBeLessThanOrEqual(subscribers);
    expect(CREATOR_ALLOCATION_CENTS / roots).toBeCloseTo(estimate.envelopeCents);
  });

  it('handles zero subscribers and clamps nonsense input', () => {
    expect(estimateEarnings({ subscribers: 0, rootsPerSubscriber: 8, position: { kind: 'root', dependencies: 0 } }).yourCents).toBe(0);
    const clamped = estimateEarnings({ subscribers: -5, rootsPerSubscriber: 0, position: { kind: 'dependency', depth: 0, others: -1 } });
    expect(clamped).toMatchObject({ subscribers: 0, rootsPerSubscriber: 1, yourCents: 0 });
    expect(clamped.lines.find((l) => l.account === ESTIMATE_CREATOR)?.depth).toBe(1);
  });
});
