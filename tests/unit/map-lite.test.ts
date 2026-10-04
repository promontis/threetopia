import {describe,it,expect,vi,afterEach} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Mesh,Vector3} from 'three';
import {MAP_TILES,COMPOSITION_RADIUS,mapCentre,sharedEdges} from '../../src/tiles/lite/layout';
import {COMPACT_TILE,DESERT_TILE,tileCorners,validateLandmarkMetrics} from '../../packages/world-map/tile-slot.js';
import type {SampledTileSurface,LandmarkLOD} from '../../packages/world-map/tile-slot.js';
import {createDesertTile} from '../../packages/world-map/desert-tile.js';
import {loadLandmark} from '../../packages/world-map/landmark.js';

const nativeFetch=globalThis.fetch;
afterEach(()=>vi.unstubAllGlobals());
const read=(path:string)=>JSON.parse(readFileSync('public'+path,'utf8'));
const manifest=(tile:typeof MAP_TILES[number])=>read(tile.manifest);
const surface=(tile:typeof MAP_TILES[number]):SampledTileSurface|undefined=>{
  const m=manifest(tile);return m.surface?read(tile.manifest.replace('component.json',m.surface)):undefined;
};

describe('Compact native world tiles',()=>{
  it('forms a compact cluster with five matching joins and unchanged creator slots',()=>{
    expect(MAP_TILES.map(t=>t.id).sort()).toEqual(['lagoon','punk','sakura','tidewater']);
    expect(COMPOSITION_RADIUS).toBe(DESERT_TILE.map.radius*.75);
    for(const mode of ['map','world'] as const){
      expect(COMPACT_TILE[mode].slotRadius).toBe(DESERT_TILE[mode].slotRadius);
      expect(COMPACT_TILE[mode].slotHeight).toBe(DESERT_TILE[mode].slotHeight);
    }
    expect(MAP_TILES.reduce((n,t)=>n+sharedEdges(t).length,0)).toBe(10);
    for(const tile of MAP_TILES){
      const centre=mapCentre(tile),corners=tileCorners(COMPOSITION_RADIUS);
      for(const edge of sharedEdges(tile)){
        const neighbour=MAP_TILES.find(other=>{
          const c=mapCentre(other);return Math.hypot(c.x-centre.x-Math.cos(edge*Math.PI/3)*Math.sqrt(3)*COMPOSITION_RADIUS,c.z-centre.z-Math.sin(edge*Math.PI/3)*Math.sqrt(3)*COMPOSITION_RADIUS)<1e-8;
        })!;
        expect(neighbour).toBeTruthy();expect(sharedEdges(neighbour)).toContain((edge+3)%6);
        const a=corners[edge],b=corners[(edge+1)%6],c=mapCentre(neighbour),d=corners[(edge+3)%6],e=corners[(edge+4)%6];
        expect(Math.hypot(a.x+centre.x-e.x-c.x,a.z+centre.z-e.z-c.z)).toBeLessThan(1e-8);
        expect(Math.hypot(b.x+centre.x-d.x-c.x,b.z+centre.z-d.z-c.z)).toBeLessThan(1e-8);
      }
    }
  });

  it('meets at a flat, equal-coloured rim without internal skirt faces',()=>{
    let sharedColour:number[]|undefined;
    for(const definition of MAP_TILES){
      const options={compact:true,biome:definition.biome,surface:surface(definition)},joins=sharedEdges(definition);
      const full=createDesertTile(options),tile=createDesertTile({...options,sharedEdges:joins});
      expect(full.terrain.geometry.attributes.position.count-tile.terrain.geometry.attributes.position.count).toBe(joins.length*12);
      const corners=tileCorners(COMPOSITION_RADIUS),p=tile.terrain.geometry.attributes.position,c=tile.terrain.geometry.attributes.color;
      for(const edge of joins){
        const a=corners[edge],b=corners[(edge+1)%6];
        for(let i=0;i<=20;i++){
          const t=i/20,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;
          expect(tile.heightAt(x,z)).toBeCloseTo(tile.config.floorY,8);
          expect(tile.heightAt(x-Math.cos(edge*Math.PI/3)*.001,z-Math.sin(edge*Math.PI/3)*.001)).toBeCloseTo(tile.config.floorY,8);
        }
      }
      // All six corner vertices are the identical host colour, even at water.
      const colours:number[][]=[];
      for(const corner of corners){const i=Array.from({length:p.count},(_,i)=>i).find(i=>Math.hypot(p.getX(i)-corner.x,p.getZ(i)-corner.z)<1e-5&&Math.abs(p.getY(i)-.7)<1e-5)!;colours.push([c.getX(i),c.getY(i),c.getZ(i)]);}
      colours.forEach(colour=>expect(colour).toEqual(colours[0]));
      if(sharedColour)expect(colours[0]).toEqual(sharedColour);else sharedColour=colours[0];
      if(options.surface&&definition.id!=='lagoon'){
        const m=manifest(definition);expect(options.surface.source.scale).toBe(m.source.scale);expect(options.surface.source.origin).toEqual(m.source.origin);
      }
      full.dispose();tile.dispose();
    }
  });

  for(const definition of MAP_TILES.filter(t=>t.id!=='lagoon'))for(const level of ['tile','overview'] as const){
    it(`${definition.title} ${level} loads within measured budgets and without collapsed or coincident faces`,async()=>{
      const m=manifest(definition),lod=m.lods.find((l:{level:LandmarkLOD})=>l.level===level);
      const bytes=new Uint8Array(readFileSync('public'+definition.manifest.replace('component.json',lod.url)));
      vi.stubGlobal('self',globalThis);
      vi.stubGlobal('createImageBitmap',async(blob:Blob)=>{const data=new DataView(await blob.arrayBuffer());return {width:data.getUint32(16),height:data.getUint32(20),close(){}};});
      vi.stubGlobal('fetch',async(url:string,options?:RequestInit)=>String(url).startsWith('blob:')?nativeFetch(url,options):new Response(bytes as BodyInit));
      const asset=await loadLandmark('http://localhost/'+lod.url,level);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(lod.sha256);
      expect(asset.metrics.triangles).toBe(lod.triangles);expect(asset.metrics.drawCalls).toBe(lod.drawCalls);expect(asset.metrics.bytes).toBe(lod.bytes);
      expect(validateLandmarkMetrics(asset.metrics,level)).toEqual([]);
      expect(asset.metrics.radius).toBeLessThanOrEqual(m.bounds.radius+.002);
      expect(asset.metrics.maxY).toBeLessThanOrEqual(m.bounds.height+.002);
      expect(m.source.triangles).toBeGreaterThan(asset.metrics.triangles);
      expect(m.source.objects.length).toBeGreaterThan(1);
      let invalid=0;const roles:string[]=[];
      asset.root.traverse(object=>{
        const mesh=object as Mesh;if(!mesh.isMesh)return;roles.push(mesh.userData.role);
        const g=mesh.geometry,p=g.attributes.position,idx=g.index!.array,seen=new Set<string>(),a=new Vector3(),b=new Vector3(),c=new Vector3();
        for(let j=0;j<idx.length;j+=3){
          a.fromBufferAttribute(p,idx[j]);b.fromBufferAttribute(p,idx[j+1]);c.fromBufferAttribute(p,idx[j+2]);
          const key=[a,b,c].map(v=>v.toArray().join(',')).sort().join(';');
          if(seen.has(key)||Math.max(a.y,b.y,c.y)<=0||b.clone().sub(a).cross(c.clone().sub(a)).lengthSq()<1e-16)invalid++;
          seen.add(key);
        }
      });
      expect(invalid).toBe(0);
      if(definition.id==='sakura')expect(roles).toContain('foliage');
      if(definition.id==='punk')expect(roles).toContain('lights');
      if(definition.id==='punk'){
        // Original glass masks and wheel pivots are shipped inside the measured
        // GLB. Neither interiors nor vehicle animation may add hidden meshes.
        const structure=asset.root.children.find(o=>o.userData.role==='structure') as Mesh;
        const g=structure.geometry,surface=g.attributes._surface;
        expect(surface.count).toBe(g.attributes.position.count);
        expect(Array.from({length:surface.count},(_,i)=>surface.getX(i)).some(x=>x>.5)).toBe(true);
        for(let i=0;i<surface.count;i++){
          expect([0,1,2]).toContain(surface.getX(i));
          expect(surface.getY(i)).toBeGreaterThanOrEqual(0);expect(surface.getY(i)).toBeLessThanOrEqual(1);
          expect(surface.getZ(i)).toBeGreaterThanOrEqual(0);expect(surface.getZ(i)).toBeLessThanOrEqual(1);
        }
        const vehicle=asset.root.children.find(o=>o.userData.role==='car') as Mesh;
        const wheel=vehicle.geometry.attributes._wheel,drive=vehicle.geometry.attributes._drive,pivots=new Set<string>();
        for(let i=0;i<drive.count;i++)if(drive.getX(i)>0)pivots.add([wheel.getX(i),wheel.getY(i),wheel.getZ(i)].join(','));
        expect(pivots.size).toBe(4);expect(m.driving.forward).toEqual([0,0,1]);
        expect(m.interiors.mode).toBe('native-facades');expect(m.signs).toHaveLength(9);
        const atlasBytes=m.interiors.textures.reduce((sum:number,t:{url:string;bytes:number;sha256:string})=>{
          const data=readFileSync('public'+definition.manifest.replace('component.json',t.url));
          expect(data.length).toBe(t.bytes);expect(createHash('sha256').update(data).digest('hex')).toBe(t.sha256);return sum+data.length;
        },0);
        expect(validateLandmarkMetrics({...asset.metrics,bytes:asset.metrics.bytes+atlasBytes,textures:2,textureBytes:m.interiors.textureBytes},level)).toEqual([]);
      }
      const tile=createDesertTile({compact:true});tile.mount(asset.root,asset.metrics,level);expect(tile.slot.children).toHaveLength(1);
      asset.dispose();tile.dispose();
    });
  }
});
