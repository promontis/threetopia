import { HUB_REGION } from './config.ts';
import type { buildHexTopology, WorldHeight } from './hex-world.ts';
import { expansionRing, hexCenter, hexCorners } from './tile-layout.ts';

export function worldMap(topology:ReturnType<typeof buildHexTopology>,height:WorldHeight) {
  const expansion=expansionRing(topology.cells),slots=expansion.slots.map(p=>({...p,center:hexCenter(p.q,p.r),corners:hexCorners(p.q,p.r)}));
  const corners=[...topology.cells,...slots].flatMap(c=>c.corners),padding=65;
  const minX=Math.min(...corners.map(p=>p.x))-padding,minZ=Math.min(...corners.map(p=>p.z))-padding;
  const bounds=[minX,minZ,Math.max(...corners.map(p=>p.x))+padding-minX,Math.max(...corners.map(p=>p.z))+padding-minZ];
  const oceanSlots=slots.map(cell=>`<g data-expansion-slot="${cell.q},${cell.r}"><polygon points="${cell.corners.map(p=>`${p.x},${p.z}`).join(' ')}" fill="none" stroke="#84aaa8" stroke-width="3" stroke-dasharray="14 13"/><text x="${cell.center.x}" y="${cell.center.z-12}" text-anchor="middle" font-size="60" fill="#8faaa6">∿</text><text x="${cell.center.x}" y="${cell.center.z+55}" text-anchor="middle" font-size="33" fill="#6d9594">Ocean · room to grow</text><title>Unoccupied ocean in expansion ring ${expansion.radius}</title></g>`).join('');
  const land=topology.cells.map(cell=>`<polygon data-world-tile="${cell.region.id}" points="${cell.corners.map(p=>`${p.x},${p.z}`).join(' ')}" fill="${cell.region.color}" fill-opacity=".7" stroke="${cell.region.id===HUB_REGION?'#81734a':'#eee8d4'}" stroke-width="${cell.region.id===HUB_REGION?7:5}"><title>${cell.region.title} — ${cell.region.id===HUB_REGION?'central level':'neighbour of Lagoon'}, one Wang tile</title></polygon>`).join('');
  const connections=topology.sharedEdges.map(edge=>{const[a,b]=edge.endpoints;return`<g data-wang-edge="${edge.signature}"><path d="M${a.x},${a.z}L${b.x},${b.z}" stroke="#82734a" stroke-width="7" opacity=".7"/><circle cx="${(a.x+b.x)/2}" cy="${(a.z+b.z)/2}" r="11" fill="#fff8e9" stroke="#82734a" stroke-width="4"/><title>Walkable connection to Lagoon</title></g>`;}).join('');
  const paths=[...height.trails.values()].map(trail=>`<polyline data-map-trail="${trail.id}" points="${trail.route.map(p=>`${p.x},${p.z}`).join(' ')}" fill="none" stroke="#695f43" stroke-width="5" stroke-dasharray="12 8"/>`).join('');
  const labels=topology.cells.map(cell=>`<text x="${cell.center.x}" y="${cell.center.z-110}" text-anchor="middle" font-size="54" font-family="Georgia" fill="#394737">${cell.region.short}</text><text x="${cell.center.x}" y="${cell.center.z-48}" text-anchor="middle" font-size="32" fill="#555d49">${cell.region.id===HUB_REGION?'CENTRE · START HERE':'1 level · 1 tile'}</text>`).join('');
  return `<svg viewBox="${bounds.join(' ')}" role="img" aria-label="Lagoon at the centre, three neighbouring level tiles and ocean around them. Free ocean slots show the next expansion ring.">${oceanSlots}${land}${connections}${paths}${labels}<circle data-player-map cx="0" cy="0" r="16" fill="#fffbed" stroke="#42634b" stroke-width="6"/></svg>`;
}
