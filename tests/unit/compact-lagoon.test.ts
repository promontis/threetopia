import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {LAGOON_TILE,APOTHEM,edges,insideTile,edgeCoordinates,compactHeight,connectionHeight,neighbourHeight} from '../../src/tiles/lagoon/layout.ts';
import {sampleHeightfield,type Heightfield} from '../../src/explore/heightfield.ts';

const manifest=JSON.parse(readFileSync('public/world-assets/lagoon/scene.json','utf8'));
const h=manifest.heightfield,bytes=gunzipSync(readFileSync('public/world-assets/lagoon/'+manifest.buffers[h.buffer]));
const raw=new Uint16Array(bytes.buffer,bytes.byteOffset+h.offset,h.length);
const field:Heightfield={...h,data:Float32Array.from(raw,v=>v*h.decode.scale[0]+h.decode.min[0])};

describe('Compact Lagoon source tile',()=>{
  it('puts the boundary around the village without scaling the source buildings',()=>{
    expect(LAGOON_TILE.radius).toBeLessThanOrEqual(110);
    expect((LAGOON_TILE.radius/400)**2).toBeLessThan(.08);
    // All five houses and ten tree roots retain the source terrain beneath them.
    for(const [x,z] of [[-42,4],[-12,-10],[8,12],[30,-12],[37,10],[-86,-24],[-30,-33],[62,16],[0,45],[40,-36],[-78,37]]){
      const tx=x-LAGOON_TILE.sourceCenter.x,tz=z-LAGOON_TILE.sourceCenter.z;
      expect(insideTile(tx,tz,LAGOON_TILE.shoreBlend),`Source root ${x},${z}`).toBe(true);
      expect(compactHeight(field,tx,tz)).toBeCloseTo(sampleHeightfield(field,x,z),5);
    }
  });
  it('joins three neighbours over continuous broad ground with matching heights and slopes',()=>{
    const joins=edges.filter(e=>e.connected);expect(joins.map(e=>e.id)).toEqual([0,2,4]);
    for(const e of joins)for(let u=-LAGOON_TILE.radius/2;u<=LAGOON_TILE.radius/2;u+=.5){
      const x=e.nx*APOTHEM-e.nz*u,z=e.nz*APOTHEM+e.nx*u;
      expect(edgeCoordinates(x,z,e).inward).toBeCloseTo(0,8);
      const height=compactHeight(field,x,z);
      expect(height).toBeCloseTo(neighbourHeight(0,-u),5);
      const gradient=(height-compactHeight(field,x-e.nx*.01,z-e.nz*.01))/.01;
      expect(Math.abs(gradient)).toBeLessThan(.01);
      if(Math.abs(u)<=20)expect(height).toBeCloseTo(2.4,5);
    }
  });
  it('ends unconnected edges and corners below the shared sea',()=>{
    for(const e of edges.filter(e=>!e.connected))expect(compactHeight(field,e.nx*APOTHEM,e.nz*APOTHEM)).toBe(LAGOON_TILE.seabed);
    for(const e of edges)expect(compactHeight(field,e.a.x,e.a.z)).toBeCloseTo(LAGOON_TILE.seabed,6);
    expect(connectionHeight(52.5)).toBe(LAGOON_TILE.seabed);
    expect(compactHeight(field,500,500)).toBe(LAGOON_TILE.seabed);
  });
});
