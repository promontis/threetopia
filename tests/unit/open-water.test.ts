import {describe,expect,it} from 'vitest';
import * as T from 'three';
import {canonicalTile,compatibleChoices,placementIssue,hostHeight,tileFootprint,buildContains,centre,MAP_SCALE,DIRECTIONS,corners} from '../../packages/platform/tiles.js';
import {createHostTile,disposeObject} from '../../packages/platform/render.js';
import {navigationGraph,navigationIssue} from '../../packages/platform/navigation.js';
import {createTerrainField} from '../../packages/platform/tile-terrain.js';
import {hexInset} from '../../packages/platform/wang-v4.js';
import {serializeHost,restoreHost} from '../../src/creators/host-geometry';

describe('Open water host',()=>{
  it('keeps the entire hex submerged, including the water-level build area',()=>{
    for(let rotation=0;rotation<6;rotation++){
      const tile=canonicalTile(8,0,'open-water',rotation);
      for(const value of Object.values(tile.slot.origin) as number[])expect(value).toBeCloseTo(0,5);
      expect(buildContains(tile,[[0,0,0],[180,1,0],[0,1,180]])).toBe(true);
      expect(buildContains(tile,[[191,0,0]])).toBe(false);
      expect(tileFootprint(tile)).toEqual({channels:[],routes:[]});
      for(let x=-300;x<=300;x+=10)for(let z=-300;z<=300;z+=10){
        if(hexInset(x,z)>=0)expect(hostHeight(tile,x,z)).toBeCloseTo(-40,5);
      }
      for(const edge of tile.edges){
        expect(edge.kind).toBe('sea');
        expect(edge.samples).toEqual(Array(25).fill(-40));
        expect(edge.ports).toEqual([]);
      }
    }
  });

  it('connects to sea edges and excludes dry native adapters from available choices',()=>{
    const sea=canonicalTile(8,0,'open-water');
    for(const [dq,dr] of DIRECTIONS){
      const choices=compatibleChoices(8+dq,dr,[sea]);
      expect(choices.filter(c=>c.variant==='open-water')).toHaveLength(6);
      expect(choices.some(c=>c.variant==='autumn-woodland')).toBe(false);
    }
    const coast=canonicalTile(8,0,'tropical-inlet');
    expect(placementIssue(canonicalTile(9,0,'open-water'),[coast])).toBe(null);
    for(const [q,r] of [[0,1],[8,0],[9,0]]){
      const tile=canonicalTile(q,r,'open-water');
      expect(compatibleChoices(q,r,[],{lookahead:true}).some(c=>c.variant==='open-water')).toBe(true);
      expect(placementIssue(tile)).toBe(null);
      for(let x=-300;x<=300;x+=10)for(let z=-300;z<=300;z+=10){
        if(hexInset(x,z)>=0)expect(hostHeight(tile,x,z)).toBeLessThan(0);
      }
    }
    expect(compatibleChoices(-1,0).some(c=>c.variant==='open-water')).toBe(false);
    expect(placementIssue(canonicalTile(-1,0,'open-water'))).toMatch(/submerged edges/);
  });

  it('keeps all six sea edges navigable outside protected habitat',()=>{
    const graph=navigationGraph(canonicalTile(8,0,'open-water'));
    expect(new Set(graph.ports.map(p=>p.edge)).size).toBe(6);
    expect(new Set(graph.ports.map(p=>p.component)).size).toBe(1);
    expect(navigationIssue(canonicalTile(9,0,'open-water'))).toBe(null);
  });

  it('offers fully submerged water beside an unprotected tropical coast',()=>{
    const coast=canonicalTile(8,0,'tropical-inlet',5),before=JSON.stringify(coast);
    const choices=compatibleChoices(9,0,[coast],{lookahead:true}).filter(c=>c.variant==='open-water');
    expect(choices).toHaveLength(6);
    for(const choice of choices){
      const tile=canonicalTile(9,0,choice.variant,choice.rotation,choice.legacyEdges);
      expect(placementIssue(tile,[coast])).toBe(null);
      expect(placementIssue(coast,[tile])).toBe(null);
      expect(navigationIssue(tile,[coast])).toBe(null);
      for(let x=-300;x<=300;x+=10)for(let z=-300;z<=300;z+=10){
        if(hexInset(x,z)>=0)expect(hostHeight(tile,x,z)).toBeLessThan(0);
      }
    }
    expect(JSON.stringify(coast)).toBe(before);
    expect(compatibleChoices(9,0,[canonicalTile(8,0,'tropical-inlet',2)]).some(c=>c.variant==='open-water')).toBe(false);
    expect(compatibleChoices(9,0,[canonicalTile(8,0,'sakura-river')]).some(c=>c.variant==='open-water')).toBe(false);
  });

  it('closes the exposed coastal face down to the seabed in map and world previews',()=>{
    const coast=canonicalTile(0,1,'tropical-inlet',5),cs=corners(),z=cs[0][1]+(cs[1][1]-cs[0][1])*.8;
    for(const map of [false,true]){
      const scale=map?MAP_SCALE:1,host=createHostTile(coast,{map}),copy=restoreHost(structuredClone(serializeHost(host).data),map);
      for(const root of [host,copy]){
        root.updateMatrixWorld(true);
        for(const y of [8,-30]){
          const ray=new T.Raycaster(new T.Vector3((cs[0][0]+20)*scale,y*scale,z*scale),new T.Vector3(-1,0,0));
          const hits=ray.intersectObject(root,true);
          expect(hits.length).toBeGreaterThan(0);
          expect(hits[0].distance).toBeCloseTo(20*scale,3);
        }
      }
      disposeObject(copy);disposeObject(host);
    }
  });

  it('renders only a submerged seabed at world and map scales, including worker previews',()=>{
    const tile=canonicalTile(8,0,'open-water');
    for(const map of [false,true]){
      const host=createHostTile(tile,{map,lod:map}),copy=restoreHost(structuredClone(serializeHost(host).data),map),mapScale=map?MAP_SCALE:1;
      expect(host.userData.dressing).toEqual([]);
      expect(host.userData.crossings).toEqual([]);
      for(const root of [host,copy]){
        expect(root.children.every(m=>m.name==='Host terrain')).toBe(true);
        const bounds=new T.Box3().setFromObject(root);
        expect(bounds.max.y).toBeCloseTo(-40*mapScale,5);
        expect(bounds.min.y).toBeCloseTo(bounds.max.y,5);
      }
      disposeObject(copy);disposeObject(host);
    }
  });

  it('keeps the shared terrain and surrounding apron below the ocean',()=>{
    const tile=canonicalTile(1,1,'open-water'),c=centre(tile.q,tile.r,MAP_SCALE),field=createTerrainField([tile]);
    expect(field.heightAt(c.x,c.z)).toBeCloseTo(-40*MAP_SCALE,5);
    for(let x=-10;x<=10;x+=.5)for(let z=-10;z<=10;z+=.5){
      expect(field.heightAt(c.x+x,c.z+z)).toBeLessThan(0);
    }
  });
});
