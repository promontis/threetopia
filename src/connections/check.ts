/** Small, local model for the landing-page explainer, not the production SDK. */
export type ConnectionKind = 'path' | 'river' | 'portal';

export interface ConnectionPort {
  id: string;
  kind: ConnectionKind;
  version: number;
  role: 'inlet' | 'outlet';
  profile: string;
  width: number;
  level: number;
  heading: number;
  offset: number;
  clearance: number;
  target?: string;
}

export interface ConnectionCheck {
  name: string;
  ok: boolean;
  detail: string;
  fix: string;
}

export const componentNames: Record<ConnectionKind, string> = {
  path: 'PathConnector', river: 'RiverConnector', portal: 'PortalConnector',
};
const same = (a: number, b: number) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < .01;
const metres = (value: number) => `${Number(value.toFixed(2))} m`;

export function checkConnection(outlet: ConnectionPort, inlet: ConnectionPort): ConnectionCheck[] {
  const opposite = ((inlet.heading - outlet.heading) % 360 + 360) % 360;
  const checks: ConnectionCheck[] = [
    {
      name: 'Component', ok: outlet.kind === inlet.kind && outlet.version === inlet.version,
      detail: outlet.kind === inlet.kind && outlet.version === inlet.version
        ? `${componentNames[outlet.kind]} · v${outlet.version}`
        : `${componentNames[outlet.kind]}@${outlet.version} ≠ ${componentNames[inlet.kind]}@${inlet.version}`,
      fix: 'Use the same connector type and version at both ends.',
    },
    {
      name: 'Direction', ok: outlet.role === 'outlet' && inlet.role === 'inlet',
      detail: `${outlet.role} → ${inlet.role}`,
      fix: 'Pair an outlet with an inlet.',
    },
    {
      name: 'Profile', ok: outlet.profile === inlet.profile && outlet.width > 0 && same(outlet.width, inlet.width),
      detail: `${metres(outlet.width)} ↔ ${metres(inlet.width)} opening`,
      fix: `Use the ${outlet.profile} profile at the inlet.`,
    },
  ];
  if (outlet.kind === 'portal') {
    checks.push(
      { name: 'Destination', ok: outlet.target === inlet.id, detail: inlet.id, fix: 'Link the portal to its destination inlet.' },
      { name: 'Arrival', ok: Number.isFinite(inlet.clearance) && inlet.clearance >= 2.2,
        detail: inlet.clearance >= 2.2 ? 'Arrival zone is clear' : 'Arrival zone is blocked',
        fix: 'Clear the arrival zone before connecting this portal.' },
    );
  } else {
    checks.push(
      { name: 'Alignment', ok: same(opposite, 180) && same(outlet.offset, inlet.offset),
        detail: same(opposite, 180) && same(outlet.offset, inlet.offset) ? 'Facing each other · centered' : 'Ports do not line up',
        fix: 'Align the port centers and turn the inlet to face the outlet.' },
      { name: outlet.kind === 'river' ? 'Water level' : 'Ground level', ok: same(outlet.level, inlet.level),
        detail: `${metres(outlet.level)} ↔ ${metres(inlet.level)}`,
        fix: `Set the inlet level to ${metres(outlet.level)}.` },
    );
  }
  return checks;
}

export function connectionExample(kind: ConnectionKind, mismatch = false) {
  const width = kind === 'path' ? 3 : kind === 'river' ? 6 : 2.4;
  const base = { kind, version: 1, profile: `${kind}-${width}m`, width, level: 0, heading: 90, offset: 0, clearance: 2.4 };
  const outlet: ConnectionPort = { ...base, id: `forest.${kind}-out`, role: 'outlet', target: `coast.${kind}-in` };
  const inlet: ConnectionPort = { ...base, id: `coast.${kind}-in`, role: 'inlet', heading: 270 };
  if (kind === 'portal') inlet.level = 18;
  if (mismatch) {
    if (kind === 'path') inlet.level = 1;
    if (kind === 'river') { inlet.width = 4; inlet.profile = 'river-4m'; }
    if (kind === 'portal') inlet.clearance = 1;
  }
  return { outlet, inlet };
}
