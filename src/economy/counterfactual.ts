import { depthWeight, splitCents, verifiedDepths, type Catalog } from './allocation.ts';

/**
 * What a naive policy that paid every package separately would give each
 * creator. Threetopia does NOT settle this way: the landing page shows it only
 * to explain why packages collapse per payout account (see `allocate`).
 */
export function perPackageCents(root: string, catalog: Catalog, subscriber: string, cents: number) {
  const parts = [...verifiedDepths(root, catalog)]
    .filter(([id]) => { const pkg = catalog.get(id)!; return pkg.eligible !== false && pkg.creator !== subscriber; })
    .map(([id, depth]) => ({ key: id, weight: depthWeight(depth) }));
  const byCreator = new Map<string, number>();
  if (!parts.length) return byCreator;
  for (const [id, amount] of splitCents(cents, parts)) {
    const creator = catalog.get(id)!.creator;
    byCreator.set(creator, (byCreator.get(creator) ?? 0) + amount);
  }
  return byCreator;
}
