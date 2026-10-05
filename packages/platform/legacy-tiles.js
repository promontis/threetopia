import seams from './seams.json' with {type:'json'};
import {sha256} from './integrity.js';
export {sha256};
/** Canonical host geometry. Creators fill a slot; they never replace this shell. */
export const CONTRACT_VERSION = 1;
export const TILE_RADIUS = 300;
export const MAP_SCALE = .03;
export const SLOT = Object.freeze({ radius: 190, height: 480, floorY: 24, mapRadius: 5.7, mapHeight: 14.4 });
export const DIRECTIONS = [[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]];
export const ORIGINAL_TILES = [
  { q:0,r:0,title:'Lagoon',id:'lagoon' },
  { q:1,r:0,title:'Tidewater',id:'tidewater',requiredOpenWater:[{
    id:'whale',reason:'Kept clear for Tidewater’s whale.',oceanConnected:true,
    // Axial offsets from Tidewater. Together with its own water these cover
    // the entire animated whale, including flippers, tail and a 20 m margin.
    // The wildlife regression test checks the actual rig throughout its route.
    cells:[{q:1,r:0},{q:0,r:1}],
  }] },
  { q:0,r:-1,title:'Sakura',id:'sakura' }, { q:1,r:-1,title:'Punk',id:'punk' },
];
const families = [
  ['dunes','Dunes','#d6bb80',20], ['oasis','Oasis','#c6b87c',12], ['coast','Coast','#cbbf96',9],
  ['pine','Pine coast','#65856c',32], ['meadow','Meadow','#86a869',13], ['highland','Highland','#8c947d',48],
  ['volcanic','Volcanic','#666d76',44], ['canyon','Canyon','#b88463',34], ['tundra','Tundra','#b5c8c6',25],
  ['blossom','Blossom','#afbc87',18], ['wetland','Wetland','#7d9f83',10], ['basalt','Basalt','#788c94',38],
];
export const TILE_VARIANTS = families.flatMap(([family,title,color,relief], fi) => Array.from({length:12},(_,i)=>({
  id:`${family}-${String(i+1).padStart(2,'0')}`, family, title:`${title} ${String(i+1).padStart(2,'0')}`,
  color, relief, seed:fi*97+i*13+7, ridges:2+i%4, orientation:i*Math.PI/6,
  description:['Sheltered terraces','Low rolling banks','Split ridge','Scattered rocky outcrops'][i%4],
})));
export const ring = (q,r) => Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r));
export const centre = (q,r,scale=1) => ({x:Math.sqrt(3)*TILE_RADIUS*(q+r/2)*scale,z:1.5*TILE_RADIUS*r*scale});
export function coordinates(radius){const out=[];for(let q=-radius;q<=radius;q++)for(let r=-radius;r<=radius;r++)if(ring(q,r)<=radius)out.push({q,r,ring:ring(q,r)});return out.sort((a,b)=>a.ring-b.ring||a.r-b.r||a.q-b.q);}
export function tileSlots(occupied, reservations=[]){
  const key=({q,r})=>`${q},${r}`;
  const published=[...ORIGINAL_TILES,...occupied],filled=new Set(published.map(key)),reserved=new Set(reservations.map(key));
  const slots=new Map();
  const add=({q,r})=>{if(ring(q,r)<=99)slots.set(key({q,r}),{q,r,ring:ring(q,r)});};
  // Any free shared edge can grow the world. Reservations block their own
  // position, but only published tiles open neighbors. Keep this frontier
  // sparse: a long branch must not allocate every ocean coordinate around it.
  for(const tile of [...published,...reservations])add(tile);
  for(const {q,r} of published)for(const [dq,dr] of DIRECTIONS)add({q:q+dq,r:r+dr});
  return [...slots.values()].sort((a,b)=>a.ring-b.ring||a.r-b.r||a.q-b.q)
    .map(t=>({...t,status:filled.has(key(t))?'occupied':reserved.has(key(t))?'reserved':'available'}));
}
export function canonicalTile(q,r,variantId){
  if(!Number.isInteger(q)||!Number.isInteger(r)||ring(q,r)>99)throw Error('Invalid tile coordinate.');
  const variant=TILE_VARIANTS.find(t=>t.id===variantId);if(!variant)throw Error('Unknown tile variant.');
  return {version:CONTRACT_VERSION,q,r,variant:variantId,radius:TILE_RADIUS,slot:{...SLOT},mapScale:MAP_SCALE,
    boundaries:boundaryProfiles(q,r),edges:DIRECTIONS.map(([dq,dr])=>[`${q},${r}`,`${q+dq},${r+dr}`].sort().join('|')),recipe:{...variant}};
}
export const canonicalJSON = value => JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
export async function tileContract(q,r,variant){const tile=canonicalTile(q,r,variant);return {...tile,hash:await sha256(canonicalJSON(tile))};}
export async function verifyTile(tile){if(!tile||typeof tile!=='object')return false;try{return canonicalJSON(tile)===canonicalJSON(await tileContract(tile.q,tile.r,tile.variant));}catch{return false;}}
export function corners(radius=TILE_RADIUS){return Array.from({length:6},(_,i)=>{const a=(i*60-30)*Math.PI/180;return [Math.cos(a)*radius,Math.sin(a)*radius];});}
/** Shared edges are flat at the same elevation. Boundary and slot are invariant;
 * only the annular host terrain varies. Heights are in world metres. */
export function terrainHeight(x,z,recipe,boundaries){
  const radius=Math.hypot(x,z),angle=Math.atan2(z,x),edge=Math.max(...DIRECTIONS.map((_,i)=>Math.cos(i*Math.PI/3)*x+Math.sin(i*Math.PI/3)*z));
  const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  const envelope=smooth((radius-SLOT.radius-8)/24)*smooth((TILE_RADIUS*Math.sqrt(3)/2-edge)/25);
  const ridge=.5+.5*Math.sin(angle*recipe.ridges+recipe.orientation+recipe.seed*.2);
  const grain=.5+.5*Math.sin(x*.037+recipe.seed)*Math.cos(z*.043-recipe.seed);
  let seamY=SLOT.floorY;
  if(boundaries){
    const cs=corners();let nearest=Infinity,best=SLOT.floorY;
    for(let i=0;i<6;i++){const a=cs[i],b=cs[(i+1)%6],dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz))),d=Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t);if(d<nearest){nearest=d;const f=t*24,j=Math.min(23,Math.floor(f)),v=boundaries[i];best=v[j]+(v[j+1]-v[j])*(f-j);}}
    const blend=1-smooth(nearest/42);seamY+=blend*(best-SLOT.floorY);
  }
  return seamY+envelope*recipe.relief*(.25+.55*ridge+.2*grain);
}

function boundaryProfiles(q,r){
  const c=centre(q,r),cs=corners(),key=(x,z)=>`${x.toFixed(3)},${z.toFixed(3)}`;
  return cs.map((a,i)=>{const b=cs[(i+1)%6],ka=key(a[0]+c.x,a[1]+c.z),kb=key(b[0]+c.x,b[1]+c.z),edge=seams.edges[[ka,kb].sort().join('|')];if(edge)return ka<kb?[...edge]:[...edge].reverse();const start=seams.vertices[ka]??SLOT.floorY,end=seams.vertices[kb]??SLOT.floorY;return Array.from({length:25},(_,j)=>SLOT.floorY+(start-SLOT.floorY)*Math.max(0,1-j/6)+(end-SLOT.floorY)*Math.max(0,1-(24-j)/6));});
}
