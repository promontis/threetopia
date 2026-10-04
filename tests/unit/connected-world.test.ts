import { describe, expect, it } from 'vitest';
import { buildHexTopology, edgeContract, edgeHeightAt, tileAt, worldLandWeight, WorldHeight, sourceWeight } from '../../src/explore/hex-world.ts';
import { HEX_RADIUS, REGIONS, SPAWN, TRAILS, inPunkStreets, type RegionDefinition } from '../../src/explore/config.ts';
import { expansionRing, hexCenter, hexDistance, hexRing } from '../../src/explore/tile-layout.ts';
import { planJourney } from '../../src/explore/journey.ts';
import { edgeWeight, sampleHeightfield } from '../../src/explore/heightfield.ts';

const makeWorld=()=>{const world=new WorldHeight();world.buildTrails();return world;};

describe('a central level with neighbours and an ocean frontier',()=>{
  it('contains each complete source footprint in one large tile around Lagoon',()=>{
    const {cells,sharedEdges}=buildHexTopology();
    expect(cells).toHaveLength(4);expect(cells.map(c=>c.region.id)).toEqual(REGIONS.map(r=>r.id));
    expect(HEX_RADIUS).toBeGreaterThanOrEqual(400);
    expect(REGIONS[0].tile).toMatchObject({q:0,r:0});
    for(const cell of cells){
      const {origin,bounds,id}=cell.region;
      expect(hexDistance(cell)).toBe(id==='lagoon'?0:1);
      for(const x of [bounds[0],bounds[2]])for(const z of [bounds[1],bounds[3]])expect(tileAt(x+origin[0],z+origin[2])?.region.id).toBe(id);
    }
    expect(sharedEdges).toHaveLength(3);
    for(const edge of sharedEdges)expect(edge.tiles).toContain('lagoon');
    for(const branch of TRAILS)for(const point of branch.points)expect(['lagoon',branch.id]).toContain(tileAt(point.x,point.z)?.region.id);
  });
  it('fills the first ring before offering the next ring, without creating filler terrain',()=>{
    const occupied=REGIONS.map(r=>r.tile),first=expansionRing(occupied);
    expect(first.radius).toBe(1);expect(first.slots).toHaveLength(3);
    const world=makeWorld();
    for(const slot of first.slots){
      expect(hexDistance(slot)).toBe(1);const p=hexCenter(slot.q,slot.r);
      expect(tileAt(p.x,p.z)).toBeUndefined();expect(world.base(p.x,p.z)).toBe(-12);
    }
    expect(expansionRing([...occupied,first.slots[0],{q:2,r:0}]).radius).toBe(1);
    const next=expansionRing([{q:0,r:0},...hexRing(1)]);
    expect(next.radius).toBe(2);expect(next.slots).toHaveLength(12);
    for(const slot of next.slots)expect(hexDistance(slot)).toBe(2);
  });
  it('gives neighbouring tiles the same edge profile, in either orientation',()=>{
    const {cells,edges,sharedEdges}=buildHexTopology(),usage=new Map<string,number>();
    for(const cell of cells)for(const edge of cell.edges){expect(edge).toBe(edges.get(edge.key));usage.set(edge.key,(usage.get(edge.key)||0)+1);}
    expect(edges.size).toBe(21);expect(sharedEdges).toHaveLength(3);
    expect([...usage.values()].filter(n=>n===2)).toHaveLength(3);expect(Math.max(...usage.values())).toBe(2);
    for(const edge of edges.values())expect(edgeContract(edge.endpoints[1],edge.endpoints[0],edge.signature).heights).toEqual(edge.heights);
    for(const edge of edges.values())if(edge.tiles.length===1){expect(edge.signature).toBe('open-sea');expect(edge.heights.every(h=>h===-12)).toBe(true);}
  });
  it('rejects neighbouring Wang edge mismatches and duplicate tile occupancy',()=>{
    const regions=structuredClone(REGIONS) as RegionDefinition[];
    regions[1].tile.edges=['open-sea','open-sea','open-sea','open-sea','open-sea','open-sea'];
    expect(()=>buildHexTopology(regions)).toThrow('Wang edge mismatch');
    expect(()=>buildHexTopology([REGIONS[0],REGIONS[0]])).toThrow('Two levels occupy');
  });
  it('joins physical ground and the walking port across all three radial edges',()=>{
    const world=makeWorld();
    for(const edge of buildHexTopology().sharedEdges){
      const [a,b]=edge.endpoints,length=Math.hypot(b.x-a.x,b.z-a.z),nx=-(b.z-a.z)/length,nz=(b.x-a.x)/length;
      expect(edge.pathWidth).toBe(2.8);expect(edge.waterLevel).toBe(0);
      for(const t of [.1,.25,.5,.75,.9]){
        const x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,y=edgeHeightAt(edge,t);
        expect(world.base(x-nx*.0001,z-nz*.0001)).toBeCloseTo(y,5);expect(world.base(x+nx*.0001,z+nz*.0001)).toBeCloseTo(y,5);
      }
      const x=(a.x+b.x)/2,z=(a.z+b.z)/2;
      expect(world.nearest(x,z).distance).toBeLessThan(.00001);
      expect(world.floorAt(x-nx*.0001,z-nz*.0001)).toBeCloseTo(world.floorAt(x+nx*.0001,z+nz*.0001),4);
      expect(world.floorAt(x,z)).toBeCloseTo(2.48,4);
    }
  });
  it('surrounds the cluster with sea and keeps the city street width local to the city',()=>{
    for(const r of REGIONS){const p=hexCenter(r.tile.q,r.tile.r);expect(worldLandWeight(p.x,p.z)).toBe(1);}
    const world=makeWorld();
    for(const p of [{x:1500,z:0},{x:0,z:1500},{x:-1500,z:0},{x:0,z:-1500}]){expect(worldLandWeight(p.x,p.z)).toBe(0);expect(world.base(p.x,p.z)).toBe(-12);}
    expect(inPunkStreets(SPAWN.x,SPAWN.z)).toBe(false);
    const punk=REGIONS[3];expect(inPunkStreets(punk.origin[0]-138,punk.origin[2]+34.2)).toBe(true);
  });
  it('continues Tidewater’s bay into the ocean instead of enclosing its source rectangle',()=>{
    const world=makeWorld(),r=REGIONS.find(r=>r.id==='tidewater')!;
    for(const x of [-80,0,80]){
      const wx=x+r.origin[0],wz=200+r.origin[2];
      expect(tileAt(wx,wz)?.region.id).toBe('tidewater');
      expect(world.base(wx,wz)).toBeLessThan(-1);
    }
  });
  it('preserves source interiors and rounds off their rectangular margins',()=>{
    for(const r of REGIONS){
      const [x0,z0,x1,z1]=r.bounds;
      expect(sourceWeight(r,(x0+x1)/2,(z0+z1)/2)).toBe(1);
      expect(sourceWeight(r,x0,z0)).toBe(0);
      expect(sourceWeight(r,x0+15,z0+15)).toBeLessThan(sourceWeight(r,x0+40,z0+40));
    }
  });
  it('samples source heights bilinearly and clamps at package borders',()=>{
    const field={data:new Float32Array([0,10,20,30]),nx:2,nz:2,step:1,bounds:[0,0,1,1] as [number,number,number,number]};
    expect(sampleHeightfield(field,.5,.5)).toBe(15);expect(sampleHeightfield(field,-10,10)).toBe(20);
    expect(edgeWeight([-100,-100,100,100],100,0)).toBe(0);expect(edgeWeight([-100,-100,100,100],0,0)).toBe(1);
  });
  it('builds three continuous branches from the centre with walkable grades',()=>{
    const world=new WorldHeight();world.tidewater={heightAt:(x:number,z:number)=>Math.sin(x*.03)*12+Math.cos(z*.02)*4};world.buildTrails();
    expect(world.trails.size).toBe(3);
    for(const trail of world.trails.values()){
      expect(trail.length).toBeGreaterThan(800);expect(trail.route[0]).toMatchObject({x:SPAWN.x,z:SPAWN.z});
      for(let i=1;i<trail.route.length;i++){
        const a=trail.route[i-1],b=trail.route[i];expect(b.distance).toBeGreaterThan(a.distance);
        expect(Math.abs(b.y-a.y)/(b.distance-a.distance)).toBeLessThanOrEqual(.400001);
        const mid=trail.pointAt((a.distance+b.distance)/2);
        expect(['lagoon',trail.id]).toContain(tileAt(mid.x,mid.z)?.region.id);
        expect(world.nearest(mid.x,mid.z).distance).toBeLessThan(.0001);
        expect(world.floorAt(mid.x,mid.z)).toBeGreaterThanOrEqual((a.y+b.y)/2-.00001);
      }
    }
  });
  it('takes a direct branch from the centre, returns along it, and routes between neighbours through the centre',()=>{
    const world=makeWorld();
    for(const [id,trail] of world.trails){
      const outward=planJourney(world,SPAWN.x,SPAWN.z,id);
      expect(outward.map(l=>[l.trail.id,l.direction])).toEqual([[id,1]]);
      const end=trail.route.at(-1)!;
      expect(planJourney(world,end.x,end.z,id).map(l=>[l.trail.id,l.direction])).toEqual([[id,-1]]);
      expect(planJourney(world,end.x,end.z,'lagoon').map(l=>[l.trail.id,l.direction])).toEqual([[id,-1]]);
      for(const other of world.trails.keys())if(other!==id)expect(planJourney(world,end.x,end.z,other).map(l=>[l.trail.id,l.direction])).toEqual([[id,-1],[other,1]]);
    }
  });
});
