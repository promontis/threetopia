import type {Mesh} from 'three';
import {describe,it,expect} from 'vitest';
import {LAYOUTS,TILE_VARIANTS,canonicalTile,tileContract,verifyTile,compatibleChoices,placementIssue,hostHeight,buildContains,contentOrigin,DIRECTIONS,centre,corners,starterGLB,inspectGLB} from '../../packages/platform/index.js';
import {createHostTile,disposeObject} from '../../packages/platform/render.js';
import study from '../../src/creators/tile-study.json';
describe('Wang hosts',()=>{
 it('offers fifteen distinct designs, including three floating hosts',()=>{expect(LAYOUTS).toHaveLength(15);expect(TILE_VARIANTS).toHaveLength(15);expect(new Set(TILE_VARIANTS.map(v=>v.layout)).size).toBe(15);expect(TILE_VARIANTS.some(v=>v.family==='scifi')).toBe(true);});
 it('keeps v1 contracts reproducible and rejects rehashed v2 edits',async()=>{const old=await tileContract(-1,0,'coast-01');expect(old.version).toBe(1);expect(await verifyTile(old)).toBe(true);const tile=await tileContract(7,0,'river-blossom',2);expect(await verifyTile(tile)).toBe(true);tile.rotation=3;expect(await verifyTile(tile)).toBe(false);});
 it('has matching edge profiles and path positions throughout the connected study',()=>{
   const tiles=study.map(t=>canonicalTile(t.q,t.r,t.variant,t.rotation));expect(new Set(tiles.map(t=>t.recipe.layout)).size).toBe(15);
   for(const a of tiles){expect(placementIssue(a,tiles.filter(t=>t!==a))).toBe(null);const ac=centre(a.q,a.r);
    for(const [i,[dq,dr]]of DIRECTIONS.entries()){const b=tiles.find(t=>t.q===a.q+dq&&t.r===a.r+dr);if(!b)continue;expect(a.boundaries[i]).toEqual([...b.boundaries[(i+3)%6]].reverse());const bc=centre(b.q,b.r),cs=corners();
     for(let j=0;j<=48;j++){const p=cs[i].map((v,k)=>v+(cs[(i+1)%6][k]-v)*j/48);expect(hostHeight(a,p[0],p[1])).toBeCloseTo(hostHeight(b,p[0]+ac.x-bc.x,p[1]+ac.z-bc.z),4);}
    }
   }
 });
 it('filters incompatible river rotations and shore corners',()=>{const neighbor=canonicalTile(8,0,'river-blossom'),options=compatibleChoices(9,0,[neighbor]);expect(options.some(c=>c.variant==='sakura-river'&&c.rotation===0)).toBe(true);expect(options.some(c=>c.variant==='autumn-woodland')).toBe(false);expect(placementIssue(canonicalTile(9,0,'commons-meadow'),[neighbor])).toMatch(/neighbor/);});
 it('rejects a locally matching placement that would close an unfillable hole',()=>{const a=canonicalTile(9,0,'river-meadow'),b=canonicalTile(8,1,'river-meadow',1);expect(placementIssue(b,[a])).toMatch(/without a compatible/);expect(compatibleChoices(8,1,[a],{lookahead:true}).some(c=>c.variant===b.variant&&c.rotation===b.rotation)).toBe(false);});
 it('adapts legacy neighbor edges without modifying their contracts',()=>{const a=canonicalTile(8,0,'coast-01'),choice=compatibleChoices(9,0,[a]).find(c=>c.variant==='tropical-inlet')!,b=canonicalTile(9,0,choice.variant,choice.rotation,choice.legacyEdges);expect(b.boundaries[3]).toEqual([...a.boundaries[0]].reverse());expect(b.boundaries[2][24]).toBe(b.boundaries[3][0]);});
 it('rejects an actual GLB triangle spanning separate dry banks',()=>{const t=canonicalTile(8,0,'river-meadow'),bytes=starterGLB(),dv=new DataView(bytes.buffer),jsonSize=dv.getUint32(12,true),g=JSON.parse(new TextDecoder().decode(bytes.slice(20,20+jsonSize))),a=g.accessors[0],start=28+jsonSize+(g.bufferViews[a.bufferView].byteOffset||0),o=contentOrigin(t),b=t.slot.regions[1],points=[[0,0,0],[(b.x-o.x)*.03,0,(b.z-o.z)*.03],[(b.x-o.x+1)*.03,0,(b.z-o.z)*.03]];for(let i=0;i<3;i++)for(let j=0;j<3;j++)dv.setFloat32(start+i*12+j*4,points[i][j],true);expect(()=>inspectGLB(bytes,'map',t)).toThrow(/protected river/);});
 it('carves rivers and pools below water, keeping each build region dry',()=>{for(const id of ['sakura-river','canal-quarter','tidal-wetland']){const tile=canonicalTile(8,0,id);expect(hostHeight(tile,0,0)).toBeLessThan(0);for(const b of tile.slot.regions)expect(hostHeight(tile,b.x,b.z)).toBeCloseTo(b.floorY,3);}const oasis=canonicalTile(8,0,'oasis-dunes');expect(hostHeight(oasis,122,0)).toBeLessThan(0);});
 it('locks convex build areas in rotated map and world coordinates',()=>{const t=canonicalTile(8,0,'river-meadow',2),o=contentOrigin(t);expect(buildContains(t,[[0,0,0],[1,1,0],[0,1,1]])).toBe(true);const b=t.slot.regions[1];expect(buildContains(t,[[0,0,0],[b.x-o.x,0,b.z-o.z],[b.x-o.x+1,1,b.z-o.z]])).toBe(false);expect(()=>inspectGLB(starterGLB(),'map',t)).not.toThrow();expect(()=>inspectGLB(starterGLB(2),'map',t)).toThrow(/build area/);});
 it('keeps the higher-detail map hosts bounded and uses world-scale geometry',()=>{
   for(const spec of study){const tile=canonicalTile(spec.q,spec.r,spec.variant,spec.rotation),map=createHostTile(tile,{map:true});let calls=0,triangles=0;map.traverse((o:any)=>{if(o.isMesh){calls++;triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;expect(Array.from(o.geometry.attributes.position.array as Float32Array).every(Number.isFinite)).toBe(true);}});expect(calls).toBeLessThanOrEqual(11);expect(triangles).toBeLessThan(115000);expect(map.userData.contract).toBe(tile);disposeObject(map);}
   const tile=canonicalTile(8,0,'river-meadow'),world=createHostTile(tile);expect(world.userData.contract).toBe(tile);const geometry=(world.children[0] as Mesh).geometry;geometry.computeBoundingBox();expect(geometry.boundingBox!.max.z).toBeCloseTo(300,3);disposeObject(world);
 },30000);
});
