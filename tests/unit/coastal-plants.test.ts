import {it,expect} from 'vitest';
import {Vector3} from 'three/webgpu';
// @ts-expect-error The pinned upstream instance store is JavaScript-only.
import {VegInstances} from '../../packages/world-sources/tidewater/src/world/vegetation/InstanceLOD.js';
import {fitTidewaterPlants} from '../../src/explore/landscape.js';

it('grounds source plants on the joined coast and removes flooded and path instances',()=>{
  const inst=new VegInstances([0,10,20].map(x=>({x,y:9.85,z:0,s:1.3,sy:.8,yaw:.7,seed:.2,la:.7,l:.8,H:13})));
  const original=inst.matrices.slice();let far:any;
  const type={inst,far:{fill:(value:any)=>{far=value;}}};
  const tide={group:{position:new Vector3(100,0,200)},vegetation:{types:[type]},terrain:{heightAt:()=>10}};
  const ground={base:(x:number)=>x===110?-4:6,nearest:(x:number)=>({distance:x===120?2:30})};
  fitTidewaterPlants(tide,ground);
  expect(type.inst.count).toBe(1);expect(type.inst.py[0]).toBeCloseTo(5.85);
  expect(type.inst.matrices[13]).toBeCloseTo(5.85);expect(far).toBe(type.inst);
  // Shape, rotation, source LOD data and root offset survive re-grounding.
  expect(Array.from(type.inst.matrices.slice(0,12))).toEqual(Array.from(original.slice(0,12)));
  expect(type.inst.iDat[2]).toBe(13);expect(inst.matrices).toEqual(original);
});
