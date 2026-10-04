import { describe, expect, it } from 'vitest';
import { checkConnection, connectionExample, type ConnectionKind } from './check.ts';

describe('the connection explainer', () => {
  it.each<ConnectionKind>(['path', 'river', 'portal'])('accepts a compatible %s connection', (kind) => {
    const { outlet, inlet } = connectionExample(kind);
    expect(checkConnection(outlet, inlet).every((check) => check.ok)).toBe(true);
  });
  it.each<[ConnectionKind, string]>([['path', 'Ground level'], ['river', 'Profile'], ['portal', 'Arrival']])(
    'reports the actionable %s mismatch', (kind, name) => {
      const { outlet, inlet } = connectionExample(kind, true);
      const failures = checkConnection(outlet, inlet).filter((check) => !check.ok);
      expect(failures.map((check) => check.name)).toEqual([name]);
      expect(failures[0].fix.length).toBeGreaterThan(0);
    },
  );
  it('rejects a matching-looking connection with a different component version or role', () => {
    const { outlet, inlet } = connectionExample('path');
    inlet.version = 2;
    inlet.role = 'outlet';
    expect(checkConnection(outlet, inlet).filter((check) => !check.ok).map((check) => check.name)).toEqual(['Component', 'Direction']);
  });
  it('checks alignment after rotation, including equivalent negative headings', () => {
    const { outlet, inlet } = connectionExample('river');
    inlet.heading = -90;
    expect(checkConnection(outlet, inlet).every((check) => check.ok)).toBe(true);
    inlet.offset = .5;
    expect(checkConnection(outlet, inlet).find((check) => check.name === 'Alignment')?.ok).toBe(false);
  });
  it('allows portals at different heights but requires the matching destination', () => {
    const { outlet, inlet } = connectionExample('portal');
    inlet.level = 100;
    expect(checkConnection(outlet, inlet).every((check) => check.ok)).toBe(true);
    outlet.target = 'another-world.arrival';
    expect(checkConnection(outlet, inlet).find((check) => check.name === 'Destination')?.ok).toBe(false);
  });
});
