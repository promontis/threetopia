import type { RegionId } from './config.ts';
import type { WalkingTrail, WorldHeight } from './hex-world.ts';

export interface GuideLeg {trail:WalkingTrail;direction:1|-1}
/** Route between neighbouring levels through the central tile, following existing paths. */
export function planJourney(world:WorldHeight,x:number,z:number,destination:RegionId):GuideLeg[] {
  const nearest=world.nearest(x,z),current=nearest.trail!;
  if(destination==='lagoon')return[{trail:current,direction:-1}];
  const target=world.trails.get(destination)!;
  if(current===target&&nearest.along>target.length-3)return[{trail:current,direction:-1}];
  if(current!==target&&nearest.along>2)return[{trail:current,direction:-1},{trail:target,direction:1}];
  return[{trail:target,direction:1}];
}
