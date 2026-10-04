import {navigationIssue} from './navigation.js';
import * as previous from './wang-v3.js';
import {DESIGNS,DESIGN_STYLES,DESIGN_VARIANTS} from './tile-designs.js';
import {createDesignTile,designHeight,designFootprint,regionFloor} from './wang-v4.js';
import {DIRECTIONS,ORIGINAL_TILES,ring,MAP_SCALE} from './legacy-tiles.js';
export const STYLES={...previous.STYLES,...DESIGN_STYLES};
export const LAYOUTS=DESIGNS.map(d=>({...d,styles:[d.family]}));
export const WANG_VARIANTS=DESIGN_VARIANTS.map(v=>({...v,color:STYLES[v.family].land}));
export const LEGACY_WANG_VARIANTS=previous.WANG_VARIANTS;
export const createWangTile=(q,r,variant,rotation=0,legacyEdges=[])=>DESIGNS.some(d=>d.id===variant)?createDesignTile(q,r,variant,rotation,legacyEdges):previous.createWangTile(q,r,variant,rotation,legacyEdges);
export const hostHeight=(tile,x,z,options={})=>tile.version>=4?designHeight(tile,x,z,options):previous.hostHeight(tile,x,z,options);
export const tileFootprint=tile=>tile.version>=4?designFootprint(tile):previous.tileFootprint(tile);
export const contentOrigin=previous.contentOrigin;
export function buildContains(tile,points,role='world'){
 if(tile?.version<4)return previous.buildContains(tile,points,role);
 const scale=role==='world'?1:MAP_SCALE,origin=contentOrigin(tile);
 return tile.slot.regions.some(r=>points.every(p=>p[1]/scale+origin.y>=regionFloor(tile,r)-.001&&p[1]/scale+origin.y<=regionFloor(tile,r)+tile.slot.height+.001&&Math.hypot(p[0]/scale+origin.x-r.x,p[2]/scale+origin.z-r.z)<=r.radius+.001));
}
export function edgesMatch(a,b){return a.kind===b.kind&&a.waterY===b.waterY&&a.start===b.end&&a.end===b.start&&a.samples.every((h,i)=>Math.abs(h-b.samples[24-i])<.0001)&&a.ports.length===b.ports.length&&a.ports.every((p,i)=>p.kind===b.ports[b.ports.length-1-i].kind&&p.width===b.ports[b.ports.length-1-i].width&&Math.abs(p.t+b.ports[b.ports.length-1-i].t-1)<.0001&&Math.abs(p.y-b.ports[b.ports.length-1-i].y)<.0001);}
const actual=tiles=>tiles.map(t=>t.contract?(typeof t.contract==='string'?JSON.parse(t.contract):t.contract):t);
const neighboring=(a,b)=>DIRECTIONS.findIndex(([q,r])=>b.q===a.q+q&&b.r===a.r+r),key=t=>`${t.q},${t.r}`;
export function compatibleChoices(q,r,tiles=[],{lookahead=false}={}){
 const all=actual(tiles),neighbors=all.filter(t=>neighboring({q,r},t)>=0),adapters=neighbors.flatMap(t=>t.version===1?[neighboring({q,r},t)]:[]),choices=[];
 for(const v of WANG_VARIANTS)for(let rotation=0;rotation<6;rotation++){
  const tile=createDesignTile(q,r,v.id,rotation,adapters);
  if(neighbors.some(n=>n.version>=2&&!edgesMatch(tile.edges[neighboring(tile,n)],n.edges[neighboring(n,tile)])))continue;
  if(lookahead&&placementIssue(tile,tiles,{checkNeighbors:false}))continue;
  choices.push({variant:v.id,rotation,legacyEdges:tile.legacyEdges});
 }return choices;
}
export function placementIssue(tile,tiles=[],{checkNeighbors=true}={}){
 const waterIssue=navigationIssue(tile,tiles);if(waterIssue)return waterIssue;
 const all=actual(tiles),occupied=new Set([...all,...ORIGINAL_TILES].map(key));
 if(checkNeighbors&&all.some(n=>{const i=neighboring(tile,n);return i>=0&&n.version>=2&&!edgesMatch(tile.edges[i],n.edges[(i+3)%6]);}))return 'This layout does not match the neighboring paths, water or corner heights.';
 for(const [dq,dr]of DIRECTIONS){const q=tile.q+dq,r=tile.r+dr;if(ring(q,r)>99||occupied.has(`${q},${r}`))continue;
  const neighbors=[...all,tile].filter(t=>neighboring({q,r},t)>=0);if(neighbors.filter(t=>t.version>=2).length<2)continue;
  const adapters=neighbors.flatMap(t=>t.version===1?[neighboring({q,r},t)]:[]);
  if(!WANG_VARIANTS.some(v=>Array.from({length:6},(_,rotation)=>createDesignTile(q,r,v.id,rotation,adapters)).some(candidate=>neighbors.every(n=>n.version<2||edgesMatch(candidate.edges[neighboring(candidate,n)],n.edges[neighboring(n,candidate)])))))return 'This placement would leave a neighboring position without a compatible layout. Choose another layout or rotation.';
 }
 return null;
}
