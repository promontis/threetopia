import type { Catalog, PackageVersion } from './allocation.ts';

/**
 * Illustrative packages from the Threetopia brief, using the same creators as the
 * world on this page. Creators, versions and amounts are examples, not traction.
 *
 * Creator colours were checked with a categorical palette validator against the
 * card surface (#fbf8f2): rows that touch in the flow diagram clear CVD ΔE 8 and
 * normal-vision ΔE 15. Every mark is also labelled by name.
 */
export const creators: Record<string, { name: string; color: string }> = {
  alex: { name: 'Alex', color: '#2a66a6' },
  tom: { name: 'Tom', color: '#16a088' },
  bob: { name: 'Bob', color: '#8176d8' },
  sarah: { name: 'Sarah', color: '#c99012' },
  john: { name: 'John', color: '#9c3e14' },
  kai: { name: 'Kai', color: '#e0666e' },
  noor: { name: 'Noor', color: '#943c7c' },
  michel: { name: 'Michel', color: '#5b7428' },
  mia: { name: 'Mia', color: '#9a968c' },
  you: { name: 'You', color: '#8a8f86' },
};

export const scoped = (id: string) => `@threetopia/${id}`;
export const unscoped = (id: string) => id.replace('@threetopia/', '');

const pkg = (id: string, name: string, creator: string, dependencies: string[] = []): PackageVersion =>
  ({ id: scoped(id), name, creator, dependencies: dependencies.map((d) => ({ id: scoped(d), verified: true })) });

export const packages: PackageVersion[] = [
  // The brief's worked example.
  pkg('alex-ocean', 'Ocean', 'alex', ['tom-waves', 'sarah-noise']),
  pkg('tom-waves', 'Waves', 'tom', ['bob-fft']),
  pkg('bob-fft', 'FFT', 'bob'),
  pkg('sarah-noise', 'Noise', 'sarah'),
  pkg('john-road', 'Road', 'john'),
  // A recipe that builds on another root: Kai's two packages collapse into one share.
  pkg('kai-lagoon-village', 'Lagoon Village', 'kai', ['kai-stilt-huts', 'alex-ocean']),
  pkg('kai-stilt-huts', 'Stilt Huts', 'kai'),
  pkg('noor-tulips', 'Tulips', 'noor', ['sarah-noise']),
  pkg('meadow-grass', 'Meadow Grass', 'michel'),
  // The subscriber's own work: never pays the subscriber.
  pkg('you-terrain', 'Your Terrain', 'you', ['sarah-noise']),
  pkg('you-sketch', 'Your Sketch', 'you'),
  // Only referenced by the anti-gaming variants below.
  pkg('alex-core', 'Ocean Core', 'alex'),
  pkg('alex-foam', 'Ocean Foam', 'alex'),
  pkg('alex-reflections', 'Ocean Reflections', 'alex'),
  pkg('alex-utils', 'Ocean Utils', 'alex'),
  pkg('mia-sparkles', 'Sparkles', 'mia'),
];

/** Display versions (the allocation policy doesn't need them). */
export const versions: Record<string, string> = {
  'alex-ocean': '1.4.0', 'tom-waves': '2.1.0', 'bob-fft': '0.9.3', 'sarah-noise': '3.0.1', 'john-road': '2.0.1',
  'kai-lagoon-village': '1.0.0', 'kai-stilt-huts': '1.2.0', 'noor-tulips': '0.6.0', 'meadow-grass': '1.1.0',
  'you-terrain': '0.1.0', 'you-sketch': '0.0.3', 'alex-core': '1.4.0', 'alex-foam': '1.4.0', 'alex-reflections': '1.4.0',
  'alex-utils': '1.4.0', 'mia-sparkles': '0.2.0',
};

/** Selectable roots in the flow diagram, in display order. */
export const rootChoices = ['alex-ocean', 'john-road', 'kai-lagoon-village', 'noor-tulips', 'meadow-grass', 'you-terrain', 'you-sketch'].map(scoped);

/** The brief's example selection: Michel (here: you) adds Ocean and Road. */
export const defaultRoots = ['alex-ocean', 'john-road'].map(scoped);

export const catalog: Catalog = new Map(packages.map((p) => [p.id, p]));
export const SUBSCRIBER = 'you';

export const SPLIT_PACKAGES = ['alex-core', 'alex-foam', 'alex-reflections', 'alex-utils'].map(scoped);
export const PADDING_PACKAGE = scoped('mia-sparkles');

/**
 * Ocean as Alex might try to game it.
 * - `split`: Alex refactors Ocean into core/foam/reflections/utils packages.
 * - `padding`: Alex lists Mia's package in `dependencies` but never imports it,
 *   so publish verification marks the edge unverified.
 */
export function oceanVariant({ split = false, padding = false }: { split?: boolean; padding?: boolean }): Catalog {
  const next = new Map(catalog);
  const ocean = catalog.get(scoped('alex-ocean'))!;
  next.set(ocean.id, {
    ...ocean,
    dependencies: [
      ...(split ? SPLIT_PACKAGES.map((id) => ({ id, verified: true })) : []),
      ...ocean.dependencies,
      ...(padding ? [{ id: PADDING_PACKAGE, verified: false }] : []),
    ],
  });
  return next;
}
