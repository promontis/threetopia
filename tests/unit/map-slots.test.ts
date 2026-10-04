import {describe,it,expect,vi,afterEach} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Group,Mesh,BoxGeometry,MeshStandardMaterial,PointLight,Raycaster,Vector3} from 'three';
import {DESERT_TILE,LANDMARK_BUDGET,tileCentre,tileCorners,tileInward,desertHeightAt,sampledTileHeightAt,validateLandmarkMetrics} from '../../packages/world-map/tile-slot.js';
import type {SampledTileSurface} from '../../packages/world-map/tile-slot.js';
import {createDesertTile,measureLandmark} from '../../packages/world-map/desert-tile.js';
import {loadLandmark} from '../../packages/world-map/landmark.js';

afterEach(()=>vi.unstubAllGlobals());
const data=(name:string)=>new Uint8Array(readFileSync(`public/map/lagoon-lite/${name}`));
const response=(bytes:Uint8Array)=>new Response(bytes as BodyInit);
const nativeFetch=globalThis.fetch;
const nativeSurface=JSON.parse(readFileSync('public/map/lagoon-lite/village-ground.json','utf8')) as SampledTileSurface;
const manifest=JSON.parse(readFileSync('public/map/lagoon-lite/component.json','utf8'));
function mockAssetFetch(bytes:Uint8Array){
  vi.stubGlobal('self',globalThis);
  // Node has no image decoder: read the embedded PNG's dimensions for budget
  // checks here. The browser test decodes and renders the actual texture.
  vi.stubGlobal('createImageBitmap',async(blob:Blob)=>{
    const data=new DataView(await blob.arrayBuffer());
    expect(data.getUint32(0)).toBe(0x89504e47);
    return {width:data.getUint32(16),height:data.getUint32(20),close(){}};
  });
  vi.stubGlobal('fetch',vi.fn(async(url:string,options?:RequestInit)=>String(url).startsWith('blob:')?nativeFetch(url,options):response(bytes)));
}
function jsonGLB(json:unknown){
  const text=new TextEncoder().encode(JSON.stringify(json)),bytes=new Uint8Array(20+Math.ceil(text.length/4)*4),view=new DataView(bytes.buffer);
  view.setUint32(0,0x46546c67,true);view.setUint32(4,2,true);view.setUint32(8,bytes.length,true);view.setUint32(12,bytes.length-20,true);view.setUint32(16,0x4e4f534a,true);bytes.fill(32,20);bytes.set(text,20);return bytes;
}

describe('Paired host desert tiles',()=>{
  it('shares the normalized footprint and keeps the creator slot flat',()=>{
    for(const representation of ['map','world'] as const){
      const config=DESERT_TILE[representation];expect(config.slotRadius/config.radius).toBe(DESERT_TILE.slotFraction);
      for(let angle=0;angle<Math.PI*2;angle+=.17){
        expect(desertHeightAt(Math.cos(angle)*config.slotRadius,Math.sin(angle)*config.slotRadius,representation)).toBe(config.floorY);
      }
    }
  });
  it('meets all six neighbours at the same height and zero slope',()=>{
    for(const representation of ['map','world'] as const){
      const {radius,floorY}=DESERT_TILE[representation],corners=tileCorners(radius);
      const heights=[desertHeightAt,(x:number,z:number,r:typeof representation)=>sampledTileHeightAt(x,z,nativeSurface,r)];
      for(const heightAt of heights)for(let edge=0;edge<6;edge++){
        const a=corners[edge],b=corners[(edge+1)%6],nx=Math.cos(edge*Math.PI/3),nz=Math.sin(edge*Math.PI/3);
        for(let t=0;t<=1;t+=.025){
          const x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t;
          const opposite=heightAt(x-nx*Math.sqrt(3)*radius,z-nz*Math.sqrt(3)*radius,representation);
          expect(heightAt(x,z,representation)).toBeCloseTo(floorY,8);expect(opposite).toBeCloseTo(floorY,8);
          const eps=radius*.00001,slope=(floorY-heightAt(x-nx*eps,z-nz*eps,representation))/eps;
          expect(Math.abs(slope)).toBeLessThan(.0001);
        }
      }
    }
  });
  it('places neighbours on shared edges and points skirt normals outwards',()=>{
    const east=tileCentre(1,0);expect(east.x).toBeCloseTo(12*Math.sqrt(3));expect(east.z).toBe(0);
    const tile=createDesertTile(),g=tile.terrain.geometry,p=g.attributes.position,n=g.attributes.normal;
    for(let i=0;i<p.count;i++)if(p.getY(i)<.699&&Math.hypot(p.getX(i),p.getZ(i))>11.5)expect(p.getX(i)*n.getX(i)+p.getZ(i)*n.getZ(i)).toBeGreaterThan(0);
    tile.dispose();
  });
  it('preserves the four native islands, terrain heights and water level under one transform',()=>{
    expect(nativeSurface.source.origin).toEqual([-8,0,-2]);
    expect(nativeSurface.waterLevel).toBe(0);
    const tile=createDesertTile({surface:nativeSurface});
    for(const tree of manifest.source.trees){
      const [x,y,z]=tree.mapPosition;
      expect(tile.heightAt(x,z)).toBeCloseTo(tile.config.floorY+y,2);
      expect(tile.heightAt(x,z)).toBeGreaterThan(tile.config.floorY+nativeSurface.waterLevel);
    }
    for(const [ix,iz] of [[32,29],[42,34],[51,48],[29,43]]){
      const x=nativeSurface.x0+ix*nativeSurface.step,z=nativeSurface.z0+iz*nativeSurface.step;
      expect(tile.heightAt(x,z)-tile.config.floorY).toBeCloseTo(nativeSurface.heights[iz*nativeSurface.size+ix],6);
    }
    // Water between the native islands, rather than a decorative rim channel.
    const scale=nativeSurface.source.scale,[ox,,oz]=nativeSurface.source.origin;
    for(const [x,z] of [[-24,3],[0,0],[19,7]])expect(tile.heightAt((x-ox)*scale,(z-oz)*scale)).toBeLessThan(tile.config.floorY+nativeSurface.waterLevel);
    tile.dispose();
  });
  it('clips the broad lagoon to its source banks without coplanar terrain',()=>{
    const tile=createDesertTile({surface:nativeSurface}),water=tile.water!,p=water.geometry.attributes.position,n=water.geometry.attributes.normal;
    expect(p.count/3).toBeGreaterThan(1000);expect(p.count/3).toBeLessThan(4000);
    let area=0,innerArea=0;
    for(let i=0;i<p.count;i+=3){
      const a=new Vector3().fromBufferAttribute(p,i),b=new Vector3().fromBufferAttribute(p,i+1),c=new Vector3().fromBufferAttribute(p,i+2),triangleArea=Math.abs((b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x))/2;
      area+=triangleArea;if(a.clone().add(b).add(c).divideScalar(3).length()<tile.config.slotRadius)innerArea+=triangleArea;
    }
    expect(area).toBeGreaterThan(50);expect(innerArea/area).toBeGreaterThan(.5);
    const ray=new Raycaster(new Vector3(),new Vector3(0,-1,0));tile.root.updateMatrixWorld(true);
    for(let i=0;i<p.count;i++){
      expect(tileInward(p.getX(i),p.getZ(i))).toBeGreaterThan(.01);
      expect(p.getY(i)).toBeCloseTo(p.getY(0),6);expect(p.getY(i)).toBeCloseTo(tile.config.floorY+nativeSurface.waterLevel,6);
      expect(n.getY(i)).toBeGreaterThan(.99);
    }
    for(let i=0;i<p.count;i+=57){
      const centre=new Vector3();for(let j=0;j<3;j++)centre.add(new Vector3().fromBufferAttribute(p,i+j));centre.divideScalar(3);
      ray.ray.origin.set(centre.x,4,centre.z);const hits=ray.intersectObject(tile.terrain);
      // The source basin underneath stays below the water, with no competing
      // coplanar sand surface, even at newly clipped shoreline triangles.
      expect(hits.some(hit=>hit.point.y<centre.y-.00001)).toBe(true);
      expect(hits.some(hit=>Math.abs(hit.point.y-centre.y)<.00001)).toBe(false);
    }
    const disposed=vi.fn();water.geometry.addEventListener('dispose',disposed);tile.dispose();expect(disposed).toHaveBeenCalledOnce();
  });
});

describe('One bounded creator component',()=>{
  it('checks both generated GLBs, including decoded geometry and provenance',async()=>{
    expect(manifest.bounds.radius).toBeGreaterThan(0);expect(manifest.bounds.height).toBeGreaterThan(0);
    expect(manifest.source.triangles).toBe(2444193);
    expect(manifest.source.trees.map((t:{id:string})=>t.id)).toEqual(['origin','nest','perch','canopy']);
    expect(manifest.source.bridges.map((b:{from:string,to:string})=>[b.from,b.to])).toEqual([['origin.L1','nest.L1'],['nest.L1','perch.L1'],['perch.L1','canopy.L1']]);
    expect(manifest.source.leafCards).toBe(72306);
    const toMap=(p:number[])=>p.map((v,i)=>(v-nativeSurface.source.origin[i])*nativeSurface.source.scale);
    for(const tree of manifest.source.trees)expect(tree.mapPosition).toEqual(toMap(tree.position));
    for(const bridge of manifest.source.bridges){expect(bridge.mapA).toEqual(toMap(bridge.a));expect(bridge.mapB).toEqual(toMap(bridge.b));}
    for(const lod of manifest.lods){
      const bytes=data(lod.url);expect(createHash('sha256').update(bytes).digest('hex')).toBe(lod.sha256);
      mockAssetFetch(bytes);
      const asset=await loadLandmark('http://localhost/'+lod.url,lod.level);
      expect(asset.metrics.triangles).toBe(lod.triangles);expect(asset.metrics.drawCalls).toBe(2);
      expect(asset.metrics.bytes).toBe(bytes.length);expect(validateLandmarkMetrics(asset.metrics,lod.level)).toEqual([]);
      expect(asset.metrics.textures).toBe(1);expect(asset.metrics.textureBytes).toBe(lod.textureSize**2*4*4/3);
      expect(asset.metrics.radius).toBeLessThanOrEqual(manifest.bounds.radius+.002);expect(asset.metrics.radius).toBeGreaterThan(6);
      expect(lod.reduction).toBeCloseTo(1-lod.triangles/manifest.source.triangles);
      expect(lod.reduction).toBeGreaterThan(lod.level==='tile'?.95:.98);
      expect(lod.parts.reduce((sum:number,part:{sourceBoards?:number})=>sum+(part.sourceBoards??0),0)).toBe(5216);
      expect(lod.parts.some((part:{name:string})=>part.name==='connections.west:plank')).toBe(true);
      expect(asset.metrics.maxY).toBeLessThanOrEqual(manifest.bounds.height+.002);
      // Quantization and simplification must not reintroduce coincident faces
      // (including split vertices with different normals), or ground overlays.
      asset.root.traverse(object=>{
        if(!(object as Mesh).isMesh)return;
        const g=(object as Mesh).geometry,p=g.attributes.position,index=g.index!.array,seen=new Set<string>();
        const a=new Vector3(),b=new Vector3(),c=new Vector3(),ab=new Vector3(),ac=new Vector3();
        for(let i=0;i<index.length;i+=3){
          a.fromBufferAttribute(p,index[i]);b.fromBufferAttribute(p,index[i+1]);c.fromBufferAttribute(p,index[i+2]);
          const key=[a,b,c].map(v=>v.toArray().join(',')).sort().join(';');
          expect(seen.has(key)).toBe(false);seen.add(key);
          expect(Math.max(a.y,b.y,c.y)).toBeGreaterThan(0);
          expect(ab.subVectors(b,a).cross(ac.subVectors(c,a)).lengthSq()).toBeGreaterThan(1e-16);
        }
      });
      // Sample the actual decoded decks along all three spans at both LODs.
      // Small offsets allow native gaps between boards, but no missing stretch
      // may be hidden by a plausible-looking source manifest.
      asset.root.updateMatrixWorld(true);
      const structure=asset.root.children.find(o=>o.userData.role==='structure')!;
      const ray=new Raycaster(new Vector3(),new Vector3(0,-1,0)),scale=nativeSurface.source.scale;
      for(const bridge of manifest.source.bridges){
        const a=new Vector3(...bridge.mapA),b=new Vector3(...bridge.mapB),direction=b.clone().sub(a).setY(0).normalize();
        for(let step=1;step<10;step++){
          const t=step/10,point=a.clone().lerp(b,t),expectedY=point.y-4*t*(1-t)*bridge.sag*scale;
          const covered=[-.012,0,.012].some(offset=>{
            ray.ray.origin.set(point.x+direction.x*offset,4,point.z+direction.z*offset);
            return ray.intersectObject(structure).some(hit=>Math.abs(hit.point.y-expectedY)<.035);
          });
          expect(covered,`${lod.level} ${bridge.id} at ${t}`).toBe(true);
        }
      }
      const tile=createDesertTile();tile.mount(asset.root,asset.metrics,lod.level);
      expect(tile.slot.children).toHaveLength(1);expect(()=>tile.mount(new Group(),asset.metrics,lod.level)).toThrow(/exactly one/);
      asset.dispose();tile.dispose();
    }
  });
  it('measures transformed geometry again when mounting, independently of tile placement',()=>{
    const component=new Group(),mesh=new Mesh(new BoxGeometry(2,2,2),new MeshStandardMaterial());mesh.position.y=1;component.add(mesh);
    const metrics=measureLandmark(component,2048),tile=createDesertTile();tile.root.position.set(1000,300,500);
    component.scale.setScalar(12);expect(()=>tile.mount(component,metrics)).toThrow(/slot radius/);
    component.scale.setScalar(1);tile.mount(component,metrics);expect(measureLandmark(component,2048)).toEqual(metrics);
    component.add(new PointLight());expect(validateLandmarkMetrics(measureLandmark(component,2048))).toContain('The host owns lights and cameras.');
    mesh.geometry.dispose();(mesh.material as MeshStandardMaterial).dispose();tile.dispose();
  });
  it('rejects NaN, excess counts, out-of-slot geometry and excess GPU textures',()=>{
    const valid={triangles:2500,drawCalls:2,bytes:50000,radius:7,minY:0,maxY:10,textureBytes:0,textures:0,forbiddenNodes:0};
    for(const change of [{triangles:LANDMARK_BUDGET.tile.triangles+1},{triangles:NaN},{drawCalls:5},{bytes:LANDMARK_BUDGET.tile.bytes+1},{radius:7.5},{minY:-1},{maxY:16},{textureBytes:3*1024*1024},{textures:3}])expect(validateLandmarkMetrics({...valid,...change}).length).toBeGreaterThan(0);
    expect(validateLandmarkMetrics({...valid,triangles:LANDMARK_BUDGET.overview.triangles+1},'overview').length).toBeGreaterThan(0);
  });
  it('stops an oversized download instead of accepting a small declared manifest size',async()=>{
    const cancel=vi.fn();vi.stubGlobal('fetch',async()=>new Response(new ReadableStream({start(controller){controller.enqueue(new Uint8Array(LANDMARK_BUDGET.tile.bytes+1));},cancel})));
    await expect(loadLandmark('http://localhost/large.glb')).rejects.toThrow(/exceeds/);expect(cancel).toHaveBeenCalledOnce();
  });
  it('rejects external assets and embedded scene systems before parsing',async()=>{
    for(const extra of [{buffers:[{uri:'large.bin'}]},{images:[{uri:'large.png'}]},{animations:[{}]},{cameras:[{}]},{skins:[{}]},{materials:[{alphaMode:'BLEND'}]}]){
      const fetch=vi.fn(async()=>response(jsonGLB({asset:{version:'2.0'},...extra})));vi.stubGlobal('fetch',fetch);
      await expect(loadLandmark('http://localhost/invalid.glb')).rejects.toThrow();expect(fetch).toHaveBeenCalledOnce();
    }
  });
});
