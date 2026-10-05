import {it,expect} from 'vitest';
import {Group,Mesh,BoxGeometry,MeshBasicMaterial} from 'three';
import {createMapTile} from '@dgreenheck/tidewater-map-tile';
import {exportMap} from '../../examples/tidewater/export-map.mjs';
import {inspectGLB,tileContract} from '../../packages/platform/index.js';

it('keeps map instances independent and leaves caller-owned landmark resources alive',()=>{
  const landmark=new Group(),geometry=new BoxGeometry(),material=new MeshBasicMaterial();landmark.add(new Mesh(geometry,material));
  let releases=0;geometry.addEventListener('dispose',()=>releases++);
  const a=createMapTile({landmark,seed:17}),b=createMapTile({landmark,seed:23});
  const positions=b.object.children.map(object=>object.position.toArray());a.update(13);a.object.position.x=123;a.dispose();a.dispose();b.update(29);
  expect(landmark.children).toHaveLength(1);expect(releases).toBe(0);
  expect(b.object.position.x).toBe(0);expect(b.object.children.map(object=>object.position.toArray())).toEqual(positions);
  b.dispose();geometry.dispose();material.dispose();expect(releases).toBe(1);
});

it('exports a recognisable native map and cheaper overview inside real tile budgets',async()=>{
  const tile=await tileContract(8,0,'tropical-inlet');
  const map=inspectGLB(await exportMap('map',{tile}),'map',tile),overview=inspectGLB(await exportMap('overview',{tile}),'overview',tile);
  expect(map.triangles).toBeGreaterThan(10_000);expect(overview.triangles).toBeLessThan(map.triangles);
  expect(map.drawCalls).toBe(1);expect(overview.drawCalls).toBe(1);expect(overview.bytes).toBeLessThan(map.bytes);
});
