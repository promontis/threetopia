import {describe,it,expect} from 'vitest';
import * as T from 'three';
import {canonicalTile,centre,MAP_SCALE} from '../../packages/platform/tiles.js';
import {rotate} from '../../packages/platform/wang-v4.js';
import {designColor} from '../../packages/platform/render-v4.js';
import {createBiomeSampler,blendHostBiomes} from '../../packages/platform/host-biomes.js';
import {createHostTile,disposeObject} from '../../packages/platform/render.js';
import {serializeHost,restoreHost} from '../../src/creators/host-geometry';

const desert=canonicalTile(-1,1,'desert-oasis',2),grass=canonicalTile(0,1,'tropical-inlet',5);
const raw=(tile:any,x:number,z:number)=>designColor(tile,...rotate([x,z],-tile.rotation),24);
const distance=(a:T.Color,b:T.Color)=>Math.hypot(a.r-b.r,a.g-b.g,a.b-b.b);

describe('shared natural biome boundaries',()=>{
  it('joins the reported desert and grass edge with one continuous, varied palette',()=>{
    const sampler=createBiomeSampler([desert,grass]),a=centre(desert.q,desert.r),b=centre(grass.q,grass.r),mid=(a.x+b.x)/2;
    expect(distance(raw(desert,mid-a.x,0),raw(grass,mid-b.x,0))).toBeGreaterThan(.2);
    for(let z=-135;z<=135;z+=15){
      const left=sampler.colorAt(desert,mid-a.x,z,24)!,right=sampler.colorAt(grass,mid-b.x,z,24)!;
      expect(distance(left,right)).toBeLessThan(1e-10);
      const nearLeft=sampler.colorAt(desert,mid-a.x-.1,z,24)!,nearRight=sampler.colorAt(grass,mid-b.x+.1,z,24)!;
      expect(distance(nearLeft,nearRight)).toBeLessThan(.005);
    }
    expect(sampler.colorAt(desert,0,0,24)).toBeNull();expect(sampler.colorAt(grass,0,0,24)).toBeNull();
    expect(createBiomeSampler([grass]).colorAt(grass,-259.807621,0,24)).toBeNull();
  });
  it('has no color seam at three-way junctions, irrespective of input order',()=>{
    const tiles=[canonicalTile(8,0,'desert-oasis'),canonicalTile(9,0,'autumn-woodland',3),canonicalTile(8,1,'alpine-pass',4)];
    const centres=tiles.map(t=>centre(t.q,t.r)),x=centres.reduce((s,c)=>s+c.x,0)/3,z=centres.reduce((s,c)=>s+c.z,0)/3;
    const sampler=createBiomeSampler(tiles),reverse=createBiomeSampler([...tiles].reverse());
    const colors=tiles.map((t,i)=>sampler.colorAt(t,x-centres[i].x,z-centres[i].z,24)!);
    for(let i=0;i<3;i++){
      expect(distance(colors[0],colors[i])).toBeLessThan(1e-10);
      expect(distance(colors[i],reverse.colorAt(tiles[i],x-centres[i].x,z-centres[i].z,24)!)).toBeLessThan(1e-10);
    }
  });
  it('blends both LODs after worker transfer and restores colors when a neighbor is removed',()=>{
    const originals=[desert,grass].map(t=>createHostTile(t,{map:true,lod:true})),hosts=originals.map(h=>restoreHost(structuredClone(serializeHost(h).data)));
    const surfaces=hosts.flatMap(h=>h.children.filter(m=>m.name==='Host terrain') as T.Mesh<T.BufferGeometry>[]);
    const before=surfaces.map(m=>({colors:m.geometry.attributes.color.array.slice(),positions:m.geometry.attributes.position.array.slice(),triangles:m.geometry.index!.count}));
    const meshes=hosts.map(h=>h.children.length),contracts=JSON.stringify(hosts.map(h=>h.userData.contract));
    blendHostBiomes(hosts);
    for(let i=0;i<surfaces.length;i++){
      const g=surfaces[i].geometry;
      expect(g.attributes.color.array.some((n,j)=>Math.abs(n-before[i].colors[j])>.05)).toBe(true);
      expect(g.attributes.position.array).toEqual(before[i].positions);expect(g.index!.count).toBe(before[i].triangles);
    }
    const blended=surfaces.map(m=>m.geometry.attributes.color.array.slice());blendHostBiomes(hosts);
    surfaces.forEach((m,i)=>expect(m.geometry.attributes.color.array).toEqual(blended[i]));
    hosts.forEach(h=>blendHostBiomes([h]));surfaces.forEach((m,i)=>expect(m.geometry.attributes.color.array).toEqual(before[i].colors));
    expect(hosts.map(h=>h.children.length)).toEqual(meshes);expect(JSON.stringify(hosts.map(h=>h.userData.contract))).toBe(contracts);
    [...originals,...hosts].forEach(disposeObject);
  });
  it('samples the same transition in world and map coordinates without tinting built quays',()=>{
    const mapHosts=[desert,grass].map(t=>createHostTile(t,{map:true})),worldHosts=[desert,grass].map(t=>createHostTile(t));
    blendHostBiomes(mapHosts);blendHostBiomes(worldHosts,{map:false});
    for(let k=0;k<2;k++){
      const map=(mapHosts[k].getObjectByName('Host terrain') as T.Mesh).geometry,world=(worldHosts[k].getObjectByName('Host terrain') as T.Mesh).geometry;
      const samples=new Map<string,T.Color>();
      for(let i=0;i<world.attributes.position.count;i++){const p=world.attributes.position;samples.set(`${p.getX(i).toFixed(3)},${p.getZ(i).toFixed(3)}`,new T.Color().fromBufferAttribute(world.attributes.color,i));}
      let checked=0;
      for(let i=0;i<map.attributes.position.count;i++){
        const p=map.attributes.position,c=samples.get(`${(p.getX(i)/MAP_SCALE).toFixed(3)},${(p.getZ(i)/MAP_SCALE).toFixed(3)}`);if(!c)continue;
        expect(distance(new T.Color().fromBufferAttribute(map.attributes.color,i),c)).toBeLessThan(.0001);checked++;
      }
      expect(checked).toBeGreaterThan(100);
    }
    const quay=canonicalTile(0,1,'sheltered-marina');expect(createBiomeSampler([desert,quay]).colorAt(desert,259,0,24)).toBeNull();
    [...mapHosts,...worldHosts].forEach(disposeObject);
  });
});
