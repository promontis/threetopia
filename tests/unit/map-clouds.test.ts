import {describe,it,expect,vi,afterEach} from 'vitest';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createMapClouds} from '../../src/tiles/lite/clouds';

describe('map cloud volumes',()=>{
  afterEach(()=>vi.unstubAllGlobals());
  it('pauses and scrubs deterministically with the map recording clock',()=>{
    const time={value:0},clouds=createMapClouds(time);
    const start=Array.from(clouds.mesh.instanceMatrix.array),version=clouds.mesh.instanceMatrix.version;
    clouds.update();expect(Array.from(clouds.mesh.instanceMatrix.array)).toEqual(start);
    expect(clouds.mesh.instanceMatrix.version).toBe(version);
    time.value=60;clouds.update();const later=Array.from(clouds.mesh.instanceMatrix.array);
    expect(later).not.toEqual(start);expect(later.every(Number.isFinite)).toBe(true);
    clouds.update(1);expect(Array.from(clouds.mesh.instanceMatrix.array)).toEqual(later);
    expect(clouds.mesh.material.uniforms.uOpacity.value).toBeLessThan(.4);
    time.value=0;clouds.update();expect(Array.from(clouds.mesh.instanceMatrix.array)).toEqual(start);
    expect(clouds.inspect()).toEqual({banks:6,drawCalls:1,triangles:72,textures:1});
    expect(clouds.mesh.material.uniforms.uTime).toBe(time);
    expect(clouds.mesh.castShadow).toBe(false);expect(clouds.mesh.material.depthWrite).toBe(false);
    clouds.dispose();
  });

  it.each(['compressed','inflated'])('loads the baked volumes when the host serves %s bytes',async encoding=>{
    const compressed=readFileSync(new URL('../../public/map/lite/clouds/cumulus.bin.gz',import.meta.url));
    const data=new Uint8Array(encoding==='compressed'?compressed:gunzipSync(compressed));
    vi.stubGlobal('fetch',vi.fn(async()=>new Response(data)));
    const clouds=createMapClouds({value:0});
    try{
      await clouds.load();
      const {data,width,height,depth}=clouds.mesh.material.uniforms.uDensity.value.image;
      // Stay below WebGL2's minimum guaranteed 3D texture dimension (256).
      expect([width,height,depth]).toEqual([96,96,192]);
      expect(data.byteLength).toBe(width*height*depth*4);
      const fields=new Set<string>();
      for(let variant=0;variant<3;variant++){
        let occupied=0,shadowed=0;const signature:number[]=[];
        for(let i=0;i<96**3;i++){
          const p=(i+Math.floor(variant/2)*96**3)*4+(variant%2)*2;
          if(data[p]>32)occupied++;
          if(data[p]>32&&data[p+1]>16)shadowed++;
          if(i%107===0)signature.push(data[p]);
        }
        expect(occupied).toBeGreaterThan(40_000);
        expect(shadowed).toBeGreaterThan(10_000);
        fields.add(signature.join(','));
      }
      expect(fields.size).toBe(3);
    }finally{clouds.dispose();}
  });

  it('rejects a truncated volume before uploading it to the GPU',async()=>{
    vi.stubGlobal('fetch',vi.fn(async()=>new Response(new Uint8Array(32))));
    const clouds=createMapClouds({value:0});
    try{await expect(clouds.load()).rejects.toThrow('Invalid cloud volume');}
    finally{clouds.dispose();}
  });
});
