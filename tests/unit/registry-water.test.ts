import {afterEach,describe,it,expect,vi} from 'vitest';
import * as T from 'three';
import {registryWater} from '../../src/creators/registry-water';
import {BOUNDS} from '../../src/tiles/lite/landscape';

class WorkerStub {
  static last:WorkerStub;
  onmessage:any;
  messages:any[]=[];
  constructor(){WorkerStub.last=this;}
  postMessage(message:any){this.messages.push(message);}
  terminate=vi.fn();
  finish(){const job=this.messages.at(-1);this.onmessage({data:{id:job.id,result:{
    bounds:{x:-40,z:-40,width:80,depth:80},size:2,data:new Float32Array(16),
    position:new Float32Array([0,-1,0,1,-1,0,0,-1,1]),normal:new Float32Array([0,1,0,0,1,0,0,1,0]),color:new Float32Array(9),
  }}});}
}
function setup(){
  vi.stubGlobal('Worker',WorkerStub);
  const original=new T.Texture(),scene=new T.Scene(),setTerrainDepth=vi.fn();
  const water=registryWater({scene,landscapeSurface:{grid:[]},ocean:{material:{uniforms:{uGround:{value:original}}},setTerrainDepth}});
  return {water,worker:WorkerStub.last,scene,original,setTerrainDepth};
}
const contract=(variant:string)=>[{q:-1,r:0,variant,rotation:0,legacyEdges:[]}];
afterEach(()=>vi.unstubAllGlobals());

describe('Asynchronous registry water',()=>{
  it('keeps the visible water unchanged until the matching terrain can commit',async()=>{
    const {water,worker,scene,setTerrainDepth}=setup();
    const pending=water.prepare(contract('river'));expect(setTerrainDepth).not.toHaveBeenCalled();
    worker.finish();const commit=await pending;
    expect(setTerrainDepth).not.toHaveBeenCalled();expect(scene.children).toHaveLength(0);
    expect(commit!()).toBe(true);expect(scene.children).toHaveLength(1);expect(setTerrainDepth).toHaveBeenCalledOnce();
    water.dispose();
  });
  it('cannot commit a stale result after switching tiles or cancelling',async()=>{
    const {water,worker,scene,setTerrainDepth}=setup();
    const a=water.prepare(contract('river'));worker.finish();const oldCommit=await a;
    const b=water.prepare(contract('bay'));expect(oldCommit!()).toBe(false);
    const clear=await water.prepare([]);expect(await b).toBeNull();expect(clear!()).toBe(true);
    worker.finish();expect(scene.children).toHaveLength(0);expect(setTerrainDepth).not.toHaveBeenCalled();
    water.dispose();
  });
  it('reuses a cached water field and shelf when revisiting a tile layout',async()=>{
    const {water,worker,scene,setTerrainDepth}=setup();
    for(const variant of ['river','bay']){const pending=water.prepare(contract(variant));worker.finish();(await pending)!();}
    const firstTexture=setTerrainDepth.mock.calls[0][0],before=worker.messages.length;
    (await water.prepare(contract('river')))!();
    expect(worker.messages).toHaveLength(before);expect(scene.children).toHaveLength(1);
    expect(setTerrainDepth.mock.lastCall![0]).toBe(firstTexture);
    water.dispose();
  });
  it('bounds cached GPU resources and releases them when leaving the map',async()=>{
    const {water,worker,scene,original,setTerrainDepth}=setup();const released=vi.fn();
    for(let i=0;i<6;i++){
      const pending=water.prepare(contract(String(i)));worker.finish();(await pending)!();
      setTerrainDepth.mock.lastCall![0].addEventListener('dispose',released);
    }
    expect(released).toHaveBeenCalledTimes(2);expect(scene.children).toHaveLength(1);
    const pending=water.prepare(contract('pending'));water.dispose();expect(await pending).toBeNull();
    expect(released).toHaveBeenCalledTimes(6);expect(scene.children).toHaveLength(0);
    expect(setTerrainDepth).toHaveBeenLastCalledWith(original,BOUNDS);expect(worker.terminate).toHaveBeenCalledOnce();
  });
  it('retains the last valid scene when a bake fails',async()=>{
    const {water,worker,scene,setTerrainDepth}=setup();const pending=water.prepare(contract('river'));worker.finish();(await pending)!();
    const visible=scene.children[0],failed=expect(water.prepare(contract('bad'))).rejects.toThrow('Invalid tile');
    worker.onmessage({data:{id:worker.messages.at(-1).id,error:'Invalid tile'}});await failed;
    expect(scene.children).toEqual([visible]);expect(setTerrainDepth).toHaveBeenCalledOnce();water.dispose();
  });
});
