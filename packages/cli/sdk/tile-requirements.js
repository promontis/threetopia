import {ORIGINAL_TILES,tileSlots as frontier,ring} from './legacy-tiles.js';

/** Environment requirements belong to their source, outside immutable terrain
 * contracts. Cell offsets move and rotate with that source's placement. */
export function protectedWaterTiles(sources=ORIGINAL_TILES){
  return sources.flatMap(source=>(source.requiredOpenWater||[]).flatMap(requirement=>requirement.cells.map(cell=>{
    let {q,r}=cell;
    for(let i=0;i<((source.rotation||0)%6+6)%6;i++)[q,r]=[-r,q+r];
    return {q:source.q+q,r:source.r+r,protection:{id:`${source.id}:${requirement.id}`,
      reason:requirement.reason,oceanConnected:!!requirement.oceanConnected,
      source:{id:source.id,title:source.title,q:source.q,r:source.r}}};
  })));
}
const water=protectedWaterTiles(),byCoordinate=new Map(water.map(t=>[`${t.q},${t.r}`,t.protection]));
export const waterProtectionAt=(q,r)=>byCoordinate.get(`${q},${r}`);
export function protectedWaterIssue({q,r}){
  const protection=waterProtectionAt(q,r);
  return protection?`Tile (${q}, ${r}): ${protection.reason} This water cannot be reserved or built on.`:null;
}
/** Protected positions never open a frontier, even if a reservation predates
 * the requirement. Retaining that record does not confer building rights. */
export function tileSlots(occupied,reservations=[]){
  const usable=tiles=>tiles.filter(t=>!waterProtectionAt(t.q,t.r));
  const slots=new Map(frontier(usable(occupied),usable(reservations)).map(t=>[`${t.q},${t.r}`,t]));
  for(const t of water)slots.set(`${t.q},${t.r}`,{...t,ring:ring(t.q,t.r),status:'protected'});
  return [...slots.values()].sort((a,b)=>a.ring-b.ring||a.r-b.r||a.q-b.q);
}
