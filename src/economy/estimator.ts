import { allocate, CREATOR_ALLOCATION_CENTS, SUBSCRIPTION_CENTS, type ContributorLine, type PackageVersion } from './allocation.ts';

/**
 * Illustrative creator-earnings arithmetic for the landing page.
 *
 * It runs the real allocation policy on a synthetic month instead of repeating
 * its maths: S subscribers who each pick the same root among N qualifying roots.
 * The policy is linear in the amount, so S identical subscribers equal a single
 * allocation of S × 800 cents, up to per-subscriber cent rounding.
 */

/** Where the creator's package sits in the root that subscribers pick. */
export type Position =
  /** You publish the root; `dependencies` other verified creators sit at depth 1. */
  | { kind: 'root'; dependencies: number }
  /** Your package sits at `depth` under another creator's root, next to `others` more creators at depth 1. */
  | { kind: 'dependency'; depth: number; others: number };

export interface EstimateInput { subscribers: number; rootsPerSubscriber: number; position: Position }

export interface Estimate {
  subscribers: number;
  rootsPerSubscriber: number;
  /** One subscriber's envelope for this root, before cent rounding. */
  envelopeCents: number;
  /** All root envelopes these subscribers fund this month. */
  rootCents: number;
  /** Your normalised weight inside the root. */
  share: number;
  yourCents: number;
  /** Everyone sharing the root, including you (account `ESTIMATE_CREATOR`). */
  lines: ContributorLine[];
}

export const ESTIMATE_CREATOR = 'creator';
export const ESTIMATE_HOST = 'host';

const whole = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.floor(Number.isFinite(value) ? value : min)));

/** Gross, platform and creator totals for a month of paid subscriptions. */
export function monthlyPool(subscribers: number) {
  const count = whole(subscribers, 0, Number.MAX_SAFE_INTEGER);
  const grossCents = count * SUBSCRIPTION_CENTS;
  const creatorCents = count * CREATOR_ALLOCATION_CENTS;
  return { grossCents, platformCents: grossCents - creatorCents, creatorCents };
}

export function estimateEarnings(input: EstimateInput): Estimate {
  const subscribers = whole(input.subscribers, 0, 10_000_000);
  const rootsPerSubscriber = whole(input.rootsPerSubscriber, 1, 1000);
  const list: PackageVersion[] = [];
  const add = (id: string, creator: string, dependencies: string[] = []) =>
    list.push({ id, name: id, creator, dependencies: dependencies.map((d) => ({ id: d, verified: true })) });
  const others = (count: number) => Array.from({ length: whole(count, 0, 100) }, (_, i) => {
    add(`other-${i}`, `other-creator-${i}`);
    return `other-${i}`;
  });

  const { position } = input;
  if (position.kind === 'root') add('root', ESTIMATE_CREATOR, others(position.dependencies));
  else {
    // The host's own packages lead down to yours; they collapse into the host's share at depth 0.
    add('yours', ESTIMATE_CREATOR);
    let below = 'yours';
    for (let depth = whole(position.depth, 1, 16) - 1; depth >= 1; depth--) {
      add(`host-${depth}`, ESTIMATE_HOST, [below]);
      below = `host-${depth}`;
    }
    add('root', ESTIMATE_HOST, [below, ...others(position.others)]);
  }
  // The subscribers' other roots, each by a different creator so that they qualify.
  const otherRoots = Array.from({ length: rootsPerSubscriber - 1 }, (_, i) => {
    add(`z-root-${i}`, `z-creator-${i}`);
    return `z-root-${i}`;
  });

  const result = allocate(['root', ...otherRoots], new Map(list.map((p) => [p.id, p])), 'subscriber', subscribers * CREATOR_ALLOCATION_CENTS);
  const envelope = result.envelopes.find((e) => e.root === 'root')!;
  const yours = envelope.lines.find((l) => l.account === ESTIMATE_CREATOR)!;
  return {
    subscribers, rootsPerSubscriber,
    envelopeCents: CREATOR_ALLOCATION_CENTS / rootsPerSubscriber,
    rootCents: envelope.cents,
    share: yours.weight,
    yourCents: yours.cents,
    lines: envelope.lines,
  };
}
