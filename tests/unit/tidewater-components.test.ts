import {describe,it,expect,vi} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {gunzipSync} from 'node:zlib';
import {Scene,Mesh,BufferGeometry,MeshStandardMaterial,BufferAttribute} from 'three';
import {createRocks,buildRockGeometry} from '@dgreenheck/tidewater-rocks';
import {createGulls,createGullGeometry} from '@dgreenheck/tidewater-gulls';

const hash=(a:ArrayBufferView)=>createHash('sha256').update(new Uint8Array(a.buffer,a.byteOffset,a.byteLength)).digest('hex');
describe('Tidewater extraction preserves source geometry',()=>{
  it('matches the pre-extraction rock geometry, normals, cavity and indices at every shipped LOD',()=>{
    const fixture=JSON.parse(readFileSync('tests/fixtures/tidewater-geometry.json','utf8'));
    for(const record of fixture.rocks){const g=buildRockGeometry(record.style,record.seed,record.detail);try{for(const name of ['position','normal','ao'])expect(hash(g.attributes[name].array),`${record.style}/${record.detail}/${name}`).toBe(record[name]);expect(hash(g.index!.array)).toBe(record.index);}finally{g.dispose();}}
  });
  it('matches the gull geometry already shipped with the Tidewater map',()=>{
    const base='public/map/lite/tidewater/wildlife/',manifest=JSON.parse(readFileSync(base+'wildlife.json','utf8')),bytes=gunzipSync(readFileSync(base+manifest.geometry)),g=createGullGeometry();
    try {for(const name of ['position','normal','color','side','span']){const field=manifest.gull[name],expected=new Float32Array(bytes.buffer,bytes.byteOffset+field.offset,field.count);expect(Array.from(g.attributes[name].array)).toEqual(Array.from(expected));}}finally{g.dispose();}
  });
});

describe('components are independent and own their resources',()=>{
  it('creates deterministic independent rock groups with their feet on the ground',()=>{
    const a=createRocks({count:3,seed:17}),b=createRocks({count:3,seed:17}),scenes=[new Scene(),new Scene()];scenes[0].add(a.object);scenes[1].add(b.object);
    try {
      expect(a.object.children.map(o=>o.position.toArray())).toEqual(b.object.children.map(o=>o.position.toArray()));
      const first=a.object.children[0] as Mesh<BufferGeometry,MeshStandardMaterial>,other=b.object.children[0] as typeof first;
      expect(first.geometry).not.toBe(other.geometry);expect(first.material).not.toBe(other.material);
      first.geometry.computeBoundingBox();expect(first.position.y+first.geometry.boundingBox!.min.y*first.scale.y).toBeCloseTo(0);
      const geometryDispose=vi.fn(),materialDispose=vi.fn();first.geometry.addEventListener('dispose',geometryDispose);first.material.addEventListener('dispose',materialDispose);
      a.dispose();a.dispose();expect(geometryDispose).toHaveBeenCalledTimes(1);expect(materialDispose).toHaveBeenCalledTimes(1);expect(scenes[0].children).toHaveLength(0);expect(scenes[1].children).toHaveLength(1);expect(b.inspect().disposed).toBe(false);
    } finally {a.dispose();b.dispose();}
  });
  it('animates only on the host clock, permits seeking, and keeps another flock independent after disposal',()=>{
    const a=createGulls(),b=createGulls(),scene=new Scene();scene.add(a.object,b.object);
    try {
      const initial=Array.from(a.object.geometry.attributes.position.array);expect(initial).toEqual(Array.from(b.object.geometry.attributes.position.array));
      a.update(4);expect(Array.from(a.object.geometry.attributes.position.array)).not.toEqual(initial);expect(Array.from(b.object.geometry.attributes.position.array)).toEqual(initial);
      const positions=a.object.geometry.attributes.position as BufferAttribute,version=positions.version;a.update(4);expect(positions.version).toBe(version);
      a.update(0);expect(Array.from(positions.array)).toEqual(initial);
      const release=vi.fn();a.object.material.addEventListener('dispose',release);a.dispose();a.dispose();a.update(10);expect(release).toHaveBeenCalledTimes(1);expect(scene.children).toEqual([b.object]);
      b.update(10);expect(Array.from(b.object.geometry.attributes.position.array)).not.toEqual(initial);expect(b.inspect()).toMatchObject({count:7,triangles:112,drawCalls:1});
    } finally {a.dispose();b.dispose();}
  });
  it('rejects invalid or unbounded geometry and animation options before allocation',()=>{
    for(const options of [{count:NaN},{seed:1.2},{size:0},{detail:6}])expect(()=>createRocks(options)).toThrow(RangeError);
    for(const options of [{count:1e6},{radius:[0,1]},{center:[0,NaN,0]},{flapSpeed:Infinity}])expect(()=>createGulls(options)).toThrow(RangeError);
    const flock=createGulls();try{expect(()=>flock.update(NaN)).toThrow(RangeError);}finally{flock.dispose();}
  });
});
