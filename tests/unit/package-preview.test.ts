import {describe,expect,it} from 'vitest';
import {PerspectiveCamera,Vector3} from 'three';
import {assetCameraFit,previewChoices,previewVersions} from '../../src/creators/preview-content';
import {validateRuntime} from '../../packages/platform/runtime.js';

describe('Package preview content',()=>{
  it('distinguishes component demonstrations from complete-scene runtimes',()=>{
    expect(previewChoices({runtime:{purpose:'component-preview',entry:'preview.js'}})[0].label).toBe('Component preview');
    expect(previewChoices({runtime:{entry:'scene.js'}})[0].label).toBe('Complete scene');
    const preview={format:'scene-reference-v1',package:'@dgreenheck/tidewater-world-tile',version:'0.1.0',focus:'ocean'};
    expect(validateRuntime({name:'@dgreenheck/tidewater-ocean',preview})).toEqual([]);
    expect(previewChoices({preview})[0].id).toBe('context');
    for(const bad of [{...preview,version:'latest'},{...preview,package:'https://evil.test'},{...preview,focus:'../script'},{...preview,package:'@dgreenheck/tidewater-ocean'}])expect(validateRuntime({name:'@dgreenheck/tidewater-ocean',preview:bad})).not.toEqual([]);
  });
  it('offers all GLB exports without trying to render code, textures or invalid entries',()=>{
    expect(previewChoices({kind:'asset',exports:{model:'beacon.glb',world_model:'beacon-world.GLB',shader:'water.js',texture:'water.webp',missing:null}})).toEqual([
      {id:'model',label:'Model',file:'beacon.glb'},
      {id:'world_model',label:'World model',file:'beacon-world.GLB'},
    ]);
    expect(previewChoices({kind:'asset',exports:{shader:'water.js'}})).toEqual([]);
  });
  it('starts world previews with map content and preserves all representations',()=>{
    const choices=previewChoices({kind:'world',content:{world:'world.glb',map:'map.glb',overview:'overview.glb'}});
    expect(choices.map(c=>c.id)).toEqual(['map','world','overview']);
    expect(choices.map(c=>c.file)).toEqual(['map.glb','world.glb','overview.glb']);
  });
  it('skips unvalidated uploads and non-3D releases while retaining ready private previews',()=>{
    const model={kind:'asset',exports:{model:'model.glb'}};
    const versions=[
      {version:'4.0.0',state:'uploading',manifest:model},
      {version:'3.0.0',state:'failed',manifest:model},
      {version:'2.1.0',state:'ready',manifest:model},
      {version:'2.0.0',state:'published',manifest:{kind:'asset',exports:{code:'code.js'}}},
      {version:'1.0.0',state:'published',manifest:model},
    ];
    expect(previewVersions(versions).map(v=>v.version)).toEqual(['2.1.0','1.0.0']);
    expect(previewVersions([])).toEqual([]);
  });
});

describe('Asset camera framing',()=>{
  for(const aspect of [.5,1,1.8,3])it(`keeps tall and wide models in frame at aspect ${aspect}, across world and map scales`,()=>{
    for(const scale of [.001,1,1000])for(const size of [[1,5,1],[8,1,3],[2,2,2]]){
      const dimensions=new Vector3(...size).multiplyScalar(scale),radius=dimensions.length()/2,fit=assetCameraFit(radius,aspect);
      const camera=new PerspectiveCamera(35,aspect,fit.near,fit.far);
      camera.position.copy(new Vector3(1,.65,1.45).normalize().multiplyScalar(fit.distance));camera.lookAt(0,0,0);camera.updateMatrixWorld();
      for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1]){
        const corner=new Vector3(dimensions.x*x/2,dimensions.y*y/2,dimensions.z*z/2).project(camera);
        expect(Math.abs(corner.x)).toBeLessThan(.9);expect(Math.abs(corner.y)).toBeLessThan(.9);
        expect(corner.z).toBeGreaterThan(-1);expect(corner.z).toBeLessThan(1);
      }
      expect(fit.minDistance).toBeLessThan(fit.distance);expect(fit.maxDistance).toBeGreaterThan(fit.distance);
    }
  });
});
