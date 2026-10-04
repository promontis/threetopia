import { describe, expect, it } from 'vitest';
import { allocate } from './allocation.ts';
import { perPackageCents } from './counterfactual.ts';
import { catalog, defaultRoots, oceanVariant, rootChoices, scoped, SUBSCRIBER } from './sampleCatalog.ts';

const cents = (roots: string[], variant = catalog) => {
  const result = allocate(roots, variant, SUBSCRIBER);
  return Object.fromEntries(result.envelopes.map((e) => [e.root, Object.fromEntries(e.lines.map((l) => [l.account, l.cents]))]));
};
const total = (roots: string[]) => {
  const result = allocate(roots, catalog, SUBSCRIBER);
  return result.envelopes.reduce((sum, e) => sum + e.lines.reduce((s, l) => s + l.cents, 0), 0) + result.reserveCents;
};

describe('landing-page sample catalog', () => {
  it('defaults to the brief example: Ocean + Road', () => {
    expect(cents(defaultRoots)).toEqual({
      '@threetopia/alex-ocean': { alex: 178, sarah: 89, tom: 89, bob: 44 },
      '@threetopia/john-road': { john: 400 },
    });
  });

  it('gives three roots 267 + 267 + 266 cents', () => {
    const result = allocate([...defaultRoots, scoped('kai-lagoon-village')], catalog, SUBSCRIBER);
    expect(result.envelopes.map((e) => e.cents)).toEqual([267, 267, 266]);
  });

  it('collapses Kai’s village and huts into one share and pays Ocean’s creators inside Kai’s root', () => {
    const [village] = allocate([scoped('kai-lagoon-village')], catalog, SUBSCRIBER).envelopes;
    expect(village.lines.map((l) => [l.account, l.depth])).toEqual([['kai', 0], ['alex', 1], ['sarah', 2], ['tom', 2], ['bob', 3]]);
    expect(village.lines[0].packages).toEqual([scoped('kai-lagoon-village'), scoped('kai-stilt-huts')]);
  });

  it('reconciles every combination of root choices to exactly 800 cents', () => {
    for (let mask = 0; mask < 2 ** rootChoices.length; mask++) {
      const roots = rootChoices.filter((_, i) => mask & (1 << i));
      expect(total(roots)).toBe(800);
    }
  });

  it('does not pay Alex more when Ocean is split into five packages', () => {
    const split = oceanVariant({ split: true });
    expect(cents(defaultRoots, split)).toEqual(cents(defaultRoots));
    const [ocean] = allocate(defaultRoots, split, SUBSCRIBER).envelopes;
    expect(ocean.lines[0]).toMatchObject({ account: 'alex', depth: 0, cents: 178 });
    expect(ocean.lines[0].packages).toHaveLength(5);
    // A per-package policy would have rewarded the split.
    expect(Object.fromEntries(perPackageCents(scoped('alex-ocean'), split, SUBSCRIBER, 400))).toEqual({ alex: 282, tom: 47, sarah: 47, bob: 24 });
  });

  it('ignores a declared but unused dependency', () => {
    expect(cents(defaultRoots, oceanVariant({ padding: true }))).toEqual(cents(defaultRoots));
  });

  it('does not let a self-only root dilute other roots', () => {
    expect(cents([...defaultRoots, scoped('you-sketch')])).toEqual(cents(defaultRoots));
  });
});

describe('per-package counterfactual', () => {
  it('matches the policy when every creator has one package', () => {
    expect(Object.fromEntries(perPackageCents(scoped('alex-ocean'), catalog, SUBSCRIBER, 400))).toEqual({ alex: 178, sarah: 89, tom: 89, bob: 44 });
  });

  it('pays nothing when only the subscriber contributes', () => {
    expect(perPackageCents(scoped('you-sketch'), catalog, SUBSCRIBER, 800).size).toBe(0);
  });
});
