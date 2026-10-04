import source from './lagoon-ground.json' with {type:'json'};
import {createLandscapeSampler} from './authored-landscape.js';
import {ORIGINAL_TILES,centre,corners,MAP_SCALE,canonicalTile as legacyTile} from './legacy-tiles.js';
export const authoredLandscape=createLandscapeSampler(source);
const cs=corners(),cache=new Map(),families={lagoon:'coast',sakura:'blossom',tidewater:'coast',punk:'scifi'};
const round=x=>Math.round(x*1e6)/1e6;
/** Original showcases are authored host tiles, with the same edge/slot contract
 * as generated hosts. Their recognizable terrain is an authored recipe. */
export function builtinTile(id){
 if(cache.has(id))return cache.get(id);
 const spec=ORIGINAL_TILES.find(t=>t.id===id);if(!spec)throw Error('Unknown original tile.');
 const {q,r}=spec,c=centre(q,r,MAP_SCALE),boundaries=legacyTile(q,r,'coast-01').boundaries;
 const edges=boundaries.map((samples,i)=>{
  const a=cs[i],b=cs[(i+1)%6],paths=[];
  for(let j=1;j<24;j++){const t=j/24,x=c.x+(a[0]+(b[0]-a[0])*t)*MAP_SCALE,z=c.z+(a[1]+(b[1]-a[1])*t)*MAP_SCALE;
   if(samples[j]>8&&authoredLandscape.pathAt(x,z)>.45)paths.push({j,strength:authoredLandscape.pathAt(x,z)});
  }
  const ports=[];
  for(const p of paths){if(paths.some(v=>v.j===p.j-1))continue;const run=paths.filter(v=>v.j>=p.j&&v.j<(paths.find(v=>v.j>p.j&&!paths.some(w=>w.j===v.j-1))?.j??25));const best=run.sort((a,b)=>b.strength-a.strength||Math.abs(a.j-12)-Math.abs(b.j-12))[0];ports.push({kind:'path',t:best.j/24,width:22,y:best.strength? samples[best.j]:24});}
  const wet=[];let start=-1;
  for(let j=0;j<=25;j++){if(j<25&&samples[j]<0){if(start<0)start=j;}else if(start>=0){wet.push({start:start/24,end:(j-1)/24});start=-1;}}
  return {kind:'authored',start:samples[0]>0?'land':'water',end:samples[24]>0?'land':'water',samples:[...samples],waterY:0,ports,waterSpans:wet};
 });
 const tile={version:3,builtin:id,q,r,variant:`authored-${id}`,rotation:0,legacyEdges:[],radius:300,mapScale:MAP_SCALE,
  recipe:{id:`authored-${id}`,title:spec.title,layout:'authored',family:families[id],description:`Original ${spec.title} host terrain and its creator content.`},
  slot:{origin:{x:0,y:0,z:0},regions:[{x:0,z:0,radius:250}],radius:250,height:540,floorY:0,mapRadius:7.5,mapHeight:16.2},edges,boundaries,
  connections:{path:'authored',water:'authored',waterY:0}};
 cache.set(id,tile);return tile;
}
export const BUILTIN_TILES=ORIGINAL_TILES.map(t=>builtinTile(t.id));
export function reverseEdge(edge){return {...edge,start:edge.end,end:edge.start,samples:[...edge.samples].reverse(),ports:[...edge.ports].reverse().map(p=>({...p,t:round(1-p.t)})),...(edge.waterSpans?{waterSpans:[...edge.waterSpans].reverse().map(s=>({start:round(1-s.end),end:round(1-s.start)}))}:{})};}
export function authoredSample(tile,x,z){const c=centre(tile.q,tile.r,MAP_SCALE),wx=c.x+x*MAP_SCALE,wz=c.z+z*MAP_SCALE;return {height:authoredLandscape.heightAt(wx,wz)/MAP_SCALE,path:authoredLandscape.pathAt(wx,wz),grass:authoredLandscape.grassAt(wx,wz)};}
