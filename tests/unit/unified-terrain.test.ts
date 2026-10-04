import type {Mesh,Material} from 'three';
import {describe,it,expect} from 'vitest';
import {BUILTIN_TILES,builtinTile,canonicalTile,tileContract,verifyTile,hostHeight,centre,corners,MAP_SCALE,tileFootprint} from '../../packages/platform/tiles.js';
import {authoredLandscape} from '../../packages/platform/builtin-tiles.js';
import {reverseEdge} from '../../packages/platform/builtin-tiles.js';
import {createTerrainField,subtractHex,hexDistance} from '../../packages/platform/tile-terrain.js';
import {createHostTile,disposeObject} from '../../packages/platform/render.js';
import {serializeHost,restoreHost} from '../../src/creators/host-geometry';

describe('Unified authored and generated terrain',()=>{
 it('gives every original a separate reproducible host contract',async()=>{
  expect(BUILTIN_TILES.map(t=>t.builtin)).toEqual(['lagoon','tidewater','sakura','punk']);
  for(const t of BUILTIN_TILES){const locked=await tileContract(t.q,t.r,t.variant);expect(locked.version).toBe(3);expect(await verifyTile(locked)).toBe(true);expect(locked.edges).toHaveLength(6);}
 });
 it('preserves landmark ground heights inside Lagoon and Sakura',()=>{
  for(const [id,x,z]of [['lagoon',1.723,1.508],['lagoon',-3.662,.646],['sakura',-5.29,-16.1]] as const){const t=builtinTile(id),c=centre(t.q,t.r,MAP_SCALE);expect(hostHeight(t,(x-c.x)/MAP_SCALE,(z-c.z)/MAP_SCALE)*MAP_SCALE).toBeCloseTo(authoredLandscape.heightAt(x,z),5);}
 });
 it('connects the empty river host to the actual Sakura path and Lagoon water',()=>{
  const tile=canonicalTile(-1,0,'river-meadow'),lagoon=builtinTile('lagoon'),sakura=builtinTile('sakura');
  expect(tile.edges[0]).toEqual(reverseEdge(lagoon.edges[3]));expect(tile.edges[0].ports).toEqual([]);expect(tile.edges[0].waterSpans.length).toBeGreaterThan(0);
  expect(tile.edges[5]).toEqual(reverseEdge(sakura.edges[2]));expect(tile.edges[5].ports).toHaveLength(1);
  const cs=corners(),c=centre(tile.q,tile.r);
  for(const [edge,neighbor]of [[0,lagoon],[5,sakura]] as const){const n=centre(neighbor.q,neighbor.r);
   for(let j=0;j<=72;j++){const a=cs[edge],b=cs[(edge+1)%6],x=a[0]+(b[0]-a[0])*j/72,z=a[1]+(b[1]-a[1])*j/72;expect(hostHeight(tile,x,z)).toBeCloseTo(hostHeight(neighbor,x+c.x-n.x,z+c.z-n.z),4);}
  }
 });
 it('keeps land paths outside the two protected creator build regions',()=>{
  const t=canonicalTile(-1,0,'river-meadow');
  for(const line of tileFootprint(t).routes)for(let i=1;i<line.length;i++){const a=line[i-1],b=line[i];for(const r of t.slot.regions)expect(Math.hypot((a[0]+b[0])/2-r.x,(a[2]+b[2])/2-r.z)).toBeGreaterThan(r.radius+1);}
 });
 it('cuts exact holes for host terrain instead of layering another island underneath',()=>{
  const square=[[-20,-20],[20,-20],[20,20],[-20,20]],pieces=subtractHex(square,{x:0,z:0});
  const area=(p:number[][])=>Math.abs(p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a[0]*b[1]-b[0]*a[1];},0)/2);
  expect(pieces.reduce((n,p)=>n+area(p),0)).toBeCloseTo(1600-3*Math.sqrt(3)*9*9/2,5);
  for(const p of pieces)expect(hexDistance(p.reduce((s,a)=>s+a[0],0)/p.length,p.reduce((s,a)=>s+a[1],0)/p.length)).toBeGreaterThanOrEqual(-1e-7);
 });
 it('uses the active host riverbed, not the previous landscape height',()=>{
  const tile=canonicalTile(-1,0,'river-meadow'),c=centre(-1,0,MAP_SCALE),field=createTerrainField([tile]);
  expect(field.heightAt(c.x,c.z)).toBeCloseTo(hostHeight(tile,0,0,{paths:false})*MAP_SCALE,5);expect(field.heightAt(c.x,c.z)).toBeLessThan(-.8);
  for(const r of tile.slot.regions)expect(field.heightAt(c.x+r.x*MAP_SCALE,c.z+r.z*MAP_SCALE)).toBeCloseTo(.72,2);
 });
 it('preserves shared terrain materials and geometry through the worker transfer',()=>{
  for(const tile of [builtinTile('lagoon'),canonicalTile(-1,0,'river-meadow')]){const source=createHostTile(tile,{map:true,slot:!tile.builtin}),serialized=serializeHost(source),copy=restoreHost(structuredClone(serialized.data));
   expect(copy.userData.contract).toEqual(tile);expect(copy.children.map(m=>m.name)).toEqual(source.children.map(m=>m.name));
   expect(((copy.children[0] as Mesh).material as Material).userData.terrain).toBe(true);expect((copy.children[0] as Mesh).geometry.attributes.position.array).toEqual((source.children[0] as Mesh).geometry.attributes.position.array);
   expect(source.children.some(m=>m.name==='bedrock')).toBe(false);disposeObject(source);disposeObject(copy);
  }
 },15000);
 it('reproduces the exact saved v1/v2 hashes from the shipped 0.3.0 SDK',async()=>{
  const a=await tileContract(-1,0,'river-meadow',0,[],2),b=await tileContract(8,0,'skyport-scifi',2,[],2),c=await tileContract(7,1,'coast-01');
  expect(a.hash).toBe('7782dcfcc4539fdcf212adfa6c1665a576bb8c08d31b2e5333aacb0b8a57bdc7');expect(b.hash).toBe('df4ee0fe6390517f620a41b30729bab7ed3bcfb7fec791ca218e62bede4c7145');expect(c.hash).toBe('ec436c78f8d144c0159d3a4e0367adf8b7133c80fe1d988ea54208488d1d0955');expect(await verifyTile(a)).toBe(true);expect(await verifyTile(b)).toBe(true);
 });
});
