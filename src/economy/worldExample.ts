import type { Catalog, PackageVersion } from './allocation.ts';

/** Fictional creators: one reusable world assembled from five independent packages. */
export const worldExampleRoot = 'world';
const packages: PackageVersion[] = [
  {
    id: worldExampleRoot, name: 'Countryside world', creator: 'alex',
    dependencies: ['grass', 'trees', 'sky', 'water', 'horse'].map(id => ({ id, verified: true })),
  },
  { id: 'grass', name: 'Grass', creator: 'noor', dependencies: [] },
  { id: 'trees', name: 'Trees', creator: 'tom', dependencies: [] },
  { id: 'sky', name: 'Sky', creator: 'sarah', dependencies: [] },
  { id: 'water', name: 'Water', creator: 'john', dependencies: [] },
  { id: 'horse', name: 'Horse', creator: 'kai', dependencies: [] },
];
export const worldExampleCatalog: Catalog = new Map(packages.map(pkg => [pkg.id, pkg]));
