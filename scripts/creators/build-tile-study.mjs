import {writeFile} from 'node:fs/promises';
import {TILE_VARIANTS,ORIGINAL_TILES,canonicalTile,compatibleChoices,placementIssue,DIRECTIONS,ring} from '../../packages/platform/tiles.js';
import {edgesMatch} from '../../packages/platform/wang.js';
// A deterministic composition using the same contracts and placement checks
// as Explore. This gallery never inserts reservations into the live registry.
const order=['circuit-deck','neon-docks','sky-terraces','sakura-river','canal-quarter','tidal-wetland','tropical-inlet','sheltered-marina','industrial-docks','coastal-terraces','basalt-coast','alpine-pass','desert-oasis','autumn-woodland','garden-boulevard','open-water'];
let placed=[];
for(const variant of order){
 const occupied=[...ORIGINAL_TILES,...placed],keys=new Set(occupied.map(t=>`${t.q},${t.r}`)),positions=new Map();
 for(const tile of occupied)for(const [dq,dr]of DIRECTIONS){const q=tile.q+dq,r=tile.r+dr;if(!keys.has(`${q},${r}`))positions.set(`${q},${r}`,{q,r});}
 const candidates=[];
 for(const p of positions.values())for(const choice of compatibleChoices(p.q,p.r,placed).filter(c=>c.variant===variant)){
  const tile=canonicalTile(p.q,p.r,variant,choice.rotation,choice.legacyEdges);if(placementIssue(tile,placed))continue;
  // This edge-matching study demonstrates continuous terrain seams. Coastal
  // terminations against open water are valid in Explore but need not replace
  // that stricter example with a vertical shoreline here.
  if(placed.some(n=>{const edge=DIRECTIONS.findIndex(([q,r])=>n.q===tile.q+q&&n.r===tile.r+r);return edge>=0&&!edgesMatch(tile.edges[edge],n.edges[(edge+3)%6]);}))continue;
  const distance=(p.q-.4)**2+(p.q-.4)*p.r+p.r*p.r;
  const region=variant.includes('deck')||variant==='neon-docks'||variant==='sky-terraces'?p.r*1.9:-p.r*.25;
  candidates.push({tile,score:distance+region+choice.rotation*.01});
 }
 candidates.sort((a,b)=>a.score-b.score);if(!candidates.length)throw Error('Cannot fit '+variant);placed.push(candidates[0].tile);console.log(variant,candidates[0].tile.q,candidates[0].tile.r,candidates[0].tile.rotation);
}
await writeFile('src/creators/tile-study.json',JSON.stringify(placed.map(t=>({q:t.q,r:t.r,variant:t.variant,rotation:t.rotation})),null,2)+'\n');
