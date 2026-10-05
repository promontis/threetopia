import {describe,it,expect} from 'vitest';
import {ORIGINAL_TILES,TILE_VARIANTS,protectedWaterTiles,waterProtectionAt,tileSlots,compatibleChoices,placementIssue,canonicalTile,tileContract,verifyTile,DIRECTIONS} from '../../packages/platform/tiles.js';
import {navigationIssue} from '../../packages/platform/navigation.js';

describe('Tidewater-owned open water',()=>{
  it('derives protected coordinates and their reason from the source placement',()=>{
    const tidewater=ORIGINAL_TILES.find(t=>t.id==='tidewater')!;
    expect(tidewater.requiredOpenWater?.[0].cells).toEqual([{q:1,r:0},{q:0,r:1}]);
    expect(protectedWaterTiles().map(({q,r})=>[q,r])).toEqual([[2,0],[1,1]]);
    expect(waterProtectionAt(1,1)?.source).toEqual({id:'tidewater',title:'Tidewater',q:1,r:0});
    expect(protectedWaterTiles([{...tidewater,q:8,r:3,rotation:1}]).map(({q,r})=>[q,r])).toEqual([[8,4],[7,4]]);
    expect(protectedWaterTiles([])).toEqual([]);
    expect(waterProtectionAt(0,1)).toBeUndefined();
  });
  it('blocks every design and rotation, including buildable open water and floating hosts',()=>{
    for(const {q,r} of protectedWaterTiles()){
      expect(compatibleChoices(q,r)).toEqual([]);
      expect(compatibleChoices(q,r,[],{lookahead:true})).toEqual([]);
      for(const design of TILE_VARIANTS)for(let rotation=0;rotation<6;rotation++)expect(placementIssue(canonicalTile(q,r,design.id,rotation))).toMatch(/Tidewater’s whale/);
    }
  });
  it('retains old contracts without giving their reservations building rights or opening neighbors',async()=>{
    const old=await tileContract(2,0,'open-water',1),before=JSON.stringify(old);
    const slots=tileSlots([old],[{q:1,r:1}]);
    expect(slots.filter(s=>s.status==='protected')).toHaveLength(2);
    expect(slots.some(s=>s.q===3&&s.r===0)).toBe(false);
    expect(await verifyTile(old)).toBe(true);expect(JSON.stringify(old)).toBe(before);
    const coast=canonicalTile(0,1,'tropical-inlet',5);
    expect(placementIssue(coast,[old,{contract:JSON.stringify(canonicalTile(1,1,'open-water'))}])).toBe(null);
  });
  it('rejects the final tile of an enclosing ring, even with a canal or buildable water exit',()=>{
    const habitat=protectedWaterTiles(),occupied=new Set([...habitat,...ORIGINAL_TILES].map(t=>`${t.q},${t.r}`)),boundary=new Map<string,{q:number;r:number}>();
    for(const tile of habitat)for(const [dq,dr] of DIRECTIONS){const q=tile.q+dq,r=tile.r+dr;if(!occupied.has(`${q},${r}`))boundary.set(`${q},${r}`,{q,r});}
    const ring=[...boundary.values()].map(t=>canonicalTile(t.q,t.r,'alpine-pass'));
    const [last,...rest]=ring;
    expect(navigationIssue(last,rest)).toMatch(/whale.*open ocean/);
    expect(navigationIssue(last,rest.slice(1))).toBe(null);
    for(const variant of ['canal-quarter','open-water','circuit-deck'])expect(navigationIssue(canonicalTile(last.q,last.r,variant),rest)).toMatch(/encloses/);
  });
});
