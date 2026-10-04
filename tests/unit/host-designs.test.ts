import {describe,it,expect} from 'vitest';
import {canonicalTile,TILE_VARIANTS,tileContract,verifyTile,hostHeight,buildContains,contentOrigin,DIRECTIONS} from '../../packages/platform/tiles.js';
import {createHostTile,disposeObject,setHostDetail} from '../../packages/platform/render.js';
import {navigationGraph,navigationIssue,exteriorOcean} from '../../packages/platform/navigation.js';
import {serializeHost,restoreHost} from '../../src/creators/host-geometry';
import {rotate,rawHeight} from '../../packages/platform/wang-v4.js';

describe('Version 4 host kit',()=>{
 it('reproduces all new rotations, with region floors in content coordinates',async()=>{
  for(const variant of TILE_VARIANTS)for(let rotation=0;rotation<6;rotation++){
   const tile=await tileContract(8,0,variant.id,rotation);expect(tile.version).toBe(4);expect(await verifyTile(tile)).toBe(true);
   const origin=contentOrigin(tile);
   for(const region of tile.slot.regions){const point=[region.x-origin.x,region.floorY-origin.y,region.z-origin.z];expect(buildContains(tile,[point])).toBe(true);expect(buildContains(tile,[[point[0],point[1]-.1,point[2]]])).toBe(false);}
  }
 });
 it('keeps legacy v2 and v3 contracts valid without migrating them',async()=>{
  for(const version of [2,3]){const tile=await tileContract(8,0,'river-meadow',2,[],version);expect(tile.version).toBe(version);expect(await verifyTile(tile)).toBe(true);}
 });
 it('ships bounded overview geometry, clear plots and bridges only over water',()=>{
  for(const v of TILE_VARIANTS){const tile=canonicalTile(8,0,v.id),root=createHostTile(tile,{map:true,lod:true}),count={tile:0,overview:0};
   root.traverse((o:any)=>{if(o.isMesh){const level=o.userData.hostLOD as 'tile'|'overview';count[level]+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;const p=o.geometry.attributes.position;for(let i=0;i<p.array.length;i++)expect(Number.isFinite(p.array[i])).toBe(true);if(o.name!=='Host terrain')for(let i=0;i<p.count;i++){const x=p.getX(i)/.03,y=p.getY(i)/.03,z=p.getZ(i)/.03;for(const region of tile.slot.regions)if(y>region.floorY+.8)expect(Math.hypot(x-region.x,z-region.z)).toBeGreaterThan(region.radius-.2);}}});
   expect(count.tile).toBeLessThan(115000);expect(count.overview).toBeLessThan(48000);expect(count.overview).toBeLessThan(count.tile);
   for(const prop of root.userData.dressing){const [x,z]=rotate([prop.x,prop.z],tile.rotation);for(const r of tile.slot.regions)expect(Math.hypot(x-r.x,z-r.z)-prop.radius).toBeGreaterThan(r.radius);}
   for(const bridge of root.userData.crossings)expect(bridge.points.some((p:number[])=>rawHeight(tile,p[0],p[2])<5)).toBe(true);
   setHostDetail(root,true);expect(root.children.filter(o=>o.visible).every(o=>o.userData.hostLOD==='overview')).toBe(true);disposeObject(root);
  }
 },30000);
 it('restores LOD visibility, material metadata and masks across the worker boundary',()=>{
  const tile=canonicalTile(8,0,'sakura-river'),root=createHostTile(tile,{map:true,lod:true}),serialized=serializeHost(root),restored=restoreHost(structuredClone(serialized.data));
  expect(restored.children.length).toBe(root.children.length);expect(serialized.data.pathMask.bytes.byteLength).toBe(256*256);setHostDetail(restored,true);
  const terrain:any=restored.children.find(m=>m.name==='Host terrain'&&m.visible);expect(terrain.material.hostPathTexture.image.width).toBe(256);expect(terrain.material.userData.hostSurface.kind).toBe('terrain');
  const leaves:any=restored.children.find(m=>m.name==='Host leaves');expect(leaves.customDepthMaterial).toBeTruthy();disposeObject(restored);disposeObject(root);
 });
});

describe('Protected Tidewater harbor route',()=>{
 it('rejects dry land and isolated ponds directly ahead of the real harbor approach',()=>{
  for(const id of ['alpine-pass','desert-oasis','autumn-woodland','garden-boulevard'])for(let r=0;r<6;r++)expect(navigationIssue(canonicalTile(1,1,id,r))).toMatch(/harbor/);
 });
 it('accepts connected waterways and high floating decks, but not an arbitrary wet boundary',()=>{
  expect(navigationIssue(canonicalTile(1,1,'tropical-inlet',2))).toBe(null);
  expect(navigationIssue(canonicalTile(1,1,'tropical-inlet',0))).toMatch(/harbor/);
  expect(navigationIssue(canonicalTile(1,1,'sakura-river',0))).toBe(null);
  expect(navigationIssue(canonicalTile(1,1,'circuit-deck'))).toBe(null);
  const canal=navigationGraph(canonicalTile(8,0,'canal-quarter'));expect(canal.ports.some(p=>p.edge===0)).toBe(true);expect(canal.ports.some(p=>p.edge===3)).toBe(true);expect(new Set(canal.ports.map(p=>p.component)).size).toBe(1);
 });
 it('distinguishes exterior ocean from an enclosed unoccupied water pocket',()=>{
  const ring=DIRECTIONS.map(([q,r])=>({q:q+8,r})),ocean=exteriorOcean(ring);expect(ocean.has('8,0')).toBe(false);expect(ocean.has('6,0')).toBe(true);
 });
 it('rejects a later reservation that closes the last route around a floating host',()=>{
  const center=canonicalTile(1,1,'circuit-deck'),surrounding=DIRECTIONS.map(([q,r])=>({q:1+q,r:1+r})).filter(t=>!(t.q===1&&t.r===0)).map(t=>canonicalTile(t.q,t.r,'alpine-pass'));
  expect(navigationIssue(center,surrounding)).toMatch(/harbor/);
  expect(navigationIssue(center,surrounding.slice(1))).toBe(null);
  const last=surrounding[0];expect(navigationIssue(last,[center,...surrounding.slice(1)])).toMatch(/harbor/);
 });
});
