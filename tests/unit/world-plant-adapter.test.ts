import { expect,it } from 'vitest';
import * as THREE from 'three/webgpu';
import { fitCapturedPlants, type CapturedPackage } from '../../src/explore/package-loader.ts';
import { WorldHeight } from '../../src/explore/hex-world.ts';
import { REGIONS } from '../../src/explore/config.ts';

it('anchors original vegetation to the blended terrain and drops out-of-region instances without changing shared source arrays',()=>{
  const mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(1,4,1),new THREE.MeshBasicMaterial(),2);
  mesh.name='forest';
  mesh.setMatrixAt(0,new THREE.Matrix4().makeTranslation(0,22,0));
  mesh.setMatrixAt(1,new THREE.Matrix4().makeTranslation(400,30,0));
  const original=mesh.instanceMatrix.array;
  const pack:CapturedPackage={group:new THREE.Group(),meshes:[mesh],atlas:new THREE.Texture(),collider:null,manifest:{},field:{nx:2,nz:2,step:300,bounds:[-150,-355,150,175],data:new Float32Array([20,20,20,20])}};
  const ground=new WorldHeight();ground.base=()=>10;ground.buildTrails();
  fitCapturedPlants(pack,REGIONS[1],ground);
  expect(mesh.count).toBe(1);
  const matrix=new THREE.Matrix4();mesh.getMatrixAt(0,matrix);
  expect(matrix.elements[13]).toBeCloseTo(12); // preserve the original two-metre root offset
  expect(original[13]).toBe(22);expect(mesh.instanceMatrix.array).not.toBe(original);
  mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();pack.atlas.dispose();
});
