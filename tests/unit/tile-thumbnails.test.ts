import {describe,it,expect} from 'vitest';
import * as T from 'three';
import {canonicalTile,centre,corners,TILE_RADIUS,MAP_SCALE} from '../../packages/platform/tiles.js';
import {tileThumbnailContext,tileThumbnailKey} from '../../src/creators/tile-thumbnail-key';
import {frameTileSnapshot} from '../../src/creators/tile-snapshot';

const tile=(id:string,q=-1,r=1)=>({id,q,r,contract:canonicalTile(q,r,'desert-oasis',2),version:null as string|null,packageId:null as string|null});
describe('tile photographs',()=>{
  it('reuses photos across registry ordering and private draft metadata changes',async()=>{
    const own=tile('own'),neighbor=tile('neighbor',-2,1),key=await tileThumbnailKey(own,{tiles:[own,neighbor]});
    expect(await tileThumbnailKey(own,{tiles:[neighbor,{...own,packageId:'draft',title:'Renamed draft'}]})).toBe(key);
  });
  it('refreshes after a changed preset, rotation or published neighbor',async()=>{
    const own=tile('own'),neighbor=tile('neighbor',-2,1),key=await tileThumbnailKey(own,{tiles:[own,neighbor]});
    for(const contract of [canonicalTile(-1,1,'desert-oasis',1),canonicalTile(-1,1,'tropical-inlet',2)])expect(await tileThumbnailKey({...own,contract},{tiles:[{...own,contract},neighbor]})).not.toBe(key);
    expect(await tileThumbnailKey(own,{tiles:[own,{...neighbor,version:'1.0.0',packageId:'world'}]})).not.toBe(key);
    expect(await tileThumbnailKey(own,{tiles:[own]})).not.toBe(key);
  });
  it('ignores distant registry changes while retaining nearby shoreline hosts',async()=>{
    const own=tile('own'),neighbor=tile('neighbor',-2,1),far=tile('far',8,0);
    const data={tiles:[own,neighbor,far]},context=tileThumbnailContext(own,data);
    expect(context.tiles).toEqual([own,neighbor]);expect(context.slots).toHaveLength(2);
    expect(await tileThumbnailKey(own,data)).toBe(await tileThumbnailKey(own,{tiles:[neighbor,own]}));
  });
  for(const height of [2.8,6,16])it(`frames the entire tile and ${height}-unit content without clipping`,()=>{
    const own=tile('own'),c=centre(own.q,own.r,MAP_SCALE),camera=new T.OrthographicCamera(-30,30,30,-30,1,360);
    const root=new T.Group(),mesh=new T.Mesh(new T.BoxGeometry(4,height,4));root.position.set(c.x,0,c.z);mesh.position.y=height/2;root.add(mesh);
    const target=frameTileSnapshot(camera,own,root,800,500);camera.lookAt(target);camera.updateMatrixWorld();
    for(const [x,z] of corners(TILE_RADIUS*MAP_SCALE))for(const y of [0,height]){
      const p=new T.Vector3(c.x+x,y,c.z+z).project(camera);
      expect(Math.abs(p.x)).toBeLessThan(.91);expect(Math.abs(p.y)).toBeLessThan(.91);expect(Math.abs(p.z)).toBeLessThan(1);
    }
    mesh.geometry.dispose();(mesh.material as T.Material).dispose();
  });
});
