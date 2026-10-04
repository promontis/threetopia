import {describe,it,expect,vi} from 'vitest';
import * as T from 'three';
import {canonicalTile,centre,MAP_SCALE} from '../../packages/platform/tiles.js';
import {createHostTile,disposeObject,setHostDetail} from '../../packages/platform/render.js';
import {createReservedTiles} from '../../src/creators/reserved-tiles';

// Canvas typography is checked in the browser. Keep the actual host geometry here.
vi.mock('../../src/creators/construction-site',()=>({createConstructionSite:()=>{
  const marker=new T.Group(),guide=new T.Group();marker.name='Under construction';guide.name='Reserved build area';guide.visible=false;marker.add(guide);return marker;
}}));
const reservation=()=>({id:'oasis',q:-1,r:1,version:null,contract:canonicalTile(-1,1,'desert-oasis',2)});

describe('reserved registry terrain',()=>{
  it('uses the saved preset and rotation for both the real host and its water, including on selection',async()=>{
    const load=vi.fn(async(contract,options)=>createHostTile(contract,options)),reserved=createReservedTiles(load),tile=reservation(),parent=new T.Group();
    const prepared=(await reserved.prepare([tile]))!;
    expect(load).toHaveBeenCalledWith(tile.contract,{map:true,lod:true});
    expect(prepared.contracts).toEqual([tile.contract]);
    expect(parent.children).toHaveLength(0); // No partial scene before its matching water is ready.
    expect(prepared.commit(parent)).toBe(true);
    const host=reserved.hosts[0],c=centre(-1,1,MAP_SCALE);
    expect(host.position.toArray()).toEqual([c.x,0,c.z]);
    expect(host.getObjectByName('Host terrain')).toBeTruthy();
    expect(host.getObjectByName('Host leaves')).toBeTruthy();
    const savedGeometry=host.getObjectByName('Host terrain');
    const selected=(await reserved.prepare([structuredClone(tile)],tile))!;selected.commit(parent);
    expect(load).toHaveBeenCalledTimes(1);
    expect(parent.children).toEqual([host]); // My tiles reuses the host instead of stacking a second copy.
    expect(host.getObjectByName('Host terrain')).toBe(savedGeometry);
    expect(host.getObjectByName('Reserved build area')!.visible).toBe(true);
    setHostDetail(host,true);
    expect(host.getObjectByName('Under construction')!.visible).toBe(true);
    const overview=(await reserved.prepare([tile]))!;overview.commit(parent);
    expect(host.getObjectByName('Reserved build area')!.visible).toBe(false);
    reserved.dispose();expect(parent.children).toHaveLength(0);
  });

  it.each(['published','released'])('removes the construction host and its resources when %s',async(state)=>{
    const host=new T.Group(),geometry=new T.BoxGeometry(),material=new T.MeshBasicMaterial(),tile=reservation();host.userData.contract=tile.contract;host.add(new T.Mesh(geometry,material));
    const releaseGeometry=vi.spyOn(geometry,'dispose'),releaseMaterial=vi.spyOn(material,'dispose'),parent=new T.Group();
    const reserved=createReservedTiles(async()=>host);
    (await reserved.prepare([tile]))!.commit(parent);
    const next=(await reserved.prepare(state==='released'?[]:[{...tile,version:'1.0.0'}]))!;
    expect(parent.children).toEqual([host]);expect(next.contracts).toEqual([]);
    next.commit(parent);
    expect(parent.children).toHaveLength(0);expect(reserved.hosts).toHaveLength(0);
    expect(releaseGeometry).toHaveBeenCalledTimes(1);expect(releaseMaterial).toHaveBeenCalledTimes(1);
    reserved.dispose();expect(releaseGeometry).toHaveBeenCalledTimes(1);
  });

  it('does not resurrect a reservation after a newer update or disposal',async()=>{
    let finish!:(host:T.Group)=>void;
    const reserved=createReservedTiles(()=>new Promise(resolve=>finish=resolve)),parent=new T.Group();
    const pending=reserved.prepare([reservation()]);
    const newer=(await reserved.prepare([]))!;newer.commit(parent);
    const host=new T.Group(),geometry=new T.BoxGeometry();host.add(new T.Mesh(geometry));const release=vi.spyOn(geometry,'dispose');
    finish(host);
    expect(await pending).toBeNull();expect(parent.children).toHaveLength(0);expect(release).toHaveBeenCalledOnce();
    const obsolete=(await reserved.prepare([]))!;
    await reserved.prepare([]);
    expect(obsolete.commit(parent)).toBe(false);
    reserved.dispose();expect(newer.commit(parent)).toBe(false);
    disposeObject(parent);
  });
});
