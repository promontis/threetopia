import {readFileSync,writeFileSync} from 'node:fs';
import {createLandscapeSampler} from '../../src/tiles/lite/landscape';
import {ORIGINAL_TILES,centre,corners,MAP_SCALE} from '../../packages/platform/tiles.js';
const sampler=createLandscapeSampler(JSON.parse(readFileSync('public/map/lagoon-lite/village-ground.json','utf8'))),edges:Record<string,number[]>={},vertices:Record<string,number>={};
const key=(x:number,z:number)=>`${x.toFixed(3)},${z.toFixed(3)}`;
for(const tile of ORIGINAL_TILES){const c=centre(tile.q,tile.r),cs=corners();for(let i=0;i<6;i++){const a=cs[i].map((v:number,j:number)=>v+(j===0?c.x:c.z)),b=cs[(i+1)%6].map((v:number,j:number)=>v+(j===0?c.x:c.z)),ka=key(...a as [number,number]),kb=key(...b as [number,number]),samples=Array.from({length:25},(_,j)=>sampler.heightAt((a[0]+(b[0]-a[0])*j/24)*MAP_SCALE,(a[1]+(b[1]-a[1])*j/24)*MAP_SCALE)/MAP_SCALE);vertices[ka]=samples[0];vertices[kb]=samples[24];edges[[ka,kb].sort().join('|')]=ka<kb?samples:samples.reverse();}}
writeFileSync('packages/platform/seams.json',JSON.stringify({edges,vertices})+'\n');
