/**
 * Threetopia's prototype payout policy for one subscriber and one month.
 *
 * 1. The subscriber's creator allocation (800 cents of a €10 subscription) is
 *    split evenly over their explicit, qualifying root selections.
 * 2. Within each root, every verified @threetopia/* contributor shares the
 *    envelope with weight 1 / 2^depth, where depth is the minimum dependency
 *    depth of any of that creator's packages. Packages collapse by payout
 *    account, so splitting a component into more packages earns nothing extra.
 * 3. The subscriber never pays themselves. Roots without any eligible
 *    third-party contributor do not qualify and cannot dilute other roots.
 * 4. If nothing qualifies, the allocation goes to the unallocated reserve.
 *
 * All amounts are integer cents; rounding is deterministic and reconciles exactly.
 */

export interface Dependency { id: string; verified: boolean }
export interface PackageVersion {
  id: string;
  name: string;
  /** Creator payout account. */
  creator: string;
  dependencies: readonly Dependency[];
  /** Eligible for creator revenue (platform-owned packages are not). */
  eligible?: boolean;
}
export type Catalog = ReadonlyMap<string, PackageVersion>;

export interface ContributorLine { account: string; packages: string[]; depth: number; weight: number; cents: number }
export interface RootEnvelope { root: string; cents: number; lines: ContributorLine[] }
export interface Allocation {
  totalCents: number;
  envelopes: RootEnvelope[];
  reserveCents: number;
  excluded: { root: string; reason: string }[];
}

export const SUBSCRIPTION_CENTS = 1000;
export const PLATFORM_SHARE_BPS = 2000;
export const CREATOR_ALLOCATION_CENTS = SUBSCRIPTION_CENTS - (SUBSCRIPTION_CENTS * PLATFORM_SHARE_BPS) / 10000;

export const depthWeight = (depth: number) => 1 / 2 ** depth;

/** Minimum depth of every package reachable from `root` over verified edges only. */
export function verifiedDepths(root: string, catalog: Catalog) {
  const depthOf = new Map<string, number>();
  const queue: [string, number][] = [[root, 0]];
  while (queue.length) {
    const [id, depth] = queue.shift()!;
    if (depthOf.has(id)) continue; // breadth-first: the first visit is the minimum depth
    const pkg = catalog.get(id);
    if (!pkg) continue;
    depthOf.set(id, depth);
    for (const dependency of pkg.dependencies) if (dependency.verified) queue.push([dependency.id, depth + 1]);
  }
  return depthOf;
}

/** Contributors of one root: verified edges only, collapsed per payout account at minimum depth. */
export function contributors(root: string, catalog: Catalog, subscriber: string) {
  const depthOf = verifiedDepths(root, catalog);
  const byAccount = new Map<string, { account: string; packages: string[]; depth: number }>();
  for (const [id, depth] of depthOf) {
    const pkg = catalog.get(id)!;
    if (pkg.eligible === false || pkg.creator === subscriber) continue;
    const entry = byAccount.get(pkg.creator) ?? { account: pkg.creator, packages: [], depth };
    entry.packages.push(id);
    entry.depth = Math.min(entry.depth, depth);
    byAccount.set(pkg.creator, entry);
  }
  return [...byAccount.values()].sort((a, b) => a.depth - b.depth || a.account.localeCompare(b.account));
}

/** Largest-remainder rounding with a deterministic tie-break on key. */
export function splitCents(total: number, parts: readonly { key: string; weight: number }[]) {
  const sum = parts.reduce((s, p) => s + p.weight, 0);
  const exact = parts.map((p) => ({ key: p.key, value: (total * p.weight) / sum }));
  const result = new Map(exact.map((e) => [e.key, Math.floor(e.value)]));
  let rest = total - [...result.values()].reduce((s, v) => s + v, 0);
  const order = [...exact].sort((a, b) => (b.value - Math.floor(b.value)) - (a.value - Math.floor(a.value)) || a.key.localeCompare(b.key));
  for (let i = 0; rest > 0; i = (i + 1) % order.length, rest--) result.set(order[i].key, result.get(order[i].key)! + 1);
  return result;
}

export function allocate(roots: readonly string[], catalog: Catalog, subscriber: string, totalCents = CREATOR_ALLOCATION_CENTS): Allocation {
  const excluded: Allocation['excluded'] = [];
  const qualifying: { root: string; people: ReturnType<typeof contributors> }[] = [];
  for (const root of [...new Set(roots)].sort()) {
    if (!catalog.has(root)) { excluded.push({ root, reason: 'Unknown package' }); continue; }
    const people = contributors(root, catalog, subscriber);
    if (!people.length) { excluded.push({ root, reason: 'No eligible third-party contributor' }); continue; }
    qualifying.push({ root, people });
  }
  if (!qualifying.length) return { totalCents, envelopes: [], reserveCents: totalCents, excluded };
  const envelopeCents = splitCents(totalCents, qualifying.map((q) => ({ key: q.root, weight: 1 })));
  const envelopes = qualifying.map(({ root, people }) => {
    const cents = envelopeCents.get(root)!;
    const weights = people.map((p) => ({ key: p.account, weight: depthWeight(p.depth) }));
    const totalWeight = weights.reduce((s, w) => s + w.weight, 0);
    const amounts = splitCents(cents, weights);
    return {
      root, cents,
      lines: people.map((p) => ({ ...p, weight: depthWeight(p.depth) / totalWeight, cents: amounts.get(p.account)! })),
    };
  });
  return { totalCents, envelopes, reserveCents: 0, excluded };
}
