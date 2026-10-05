import {describe,it,expect} from 'vitest';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {validateRuntime,validateRuntimeFiles} from '../../packages/platform/runtime.js';
import {validateCodeFiles} from '../../packages/platform/code.js';
import {assetOwner} from '../../examples/tidewater/package-layout.mjs';

const root='packages/components/tidewater-world-tile/';
const sha=(value:Buffer)=>createHash('sha1').update(`blob ${value.length}\0`).update(value).digest('hex');
const sourceFiles=(path:string):string[]=>readdirSync(path,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?sourceFiles(path+'/'+entry.name):[path+'/'+entry.name]);
const runtime={format:'iframe-scene-v1',entry:'scene.js',preload:['vendor.js'],style:'scene.css',coverage:'coverage.json',assets:{'sample.ogg':'assets/sample.ogg'},features:['ocean']};
const manifest={runtime,files:['scene.js','vendor.js','scene.css','coverage.json','assets/sample.ogg'].map(path=>({path}))};
const coverage={schemaVersion:1,omitted:[],features:['ocean'],sources:[{path:'src/App.js',sha256:'a'.repeat(64),state:'bundled'}],assets:[{resource:'sample.ogg',file:'assets/sample.ogg'}]};

describe('complete Tidewater conversion',()=>{
  it('accounts for every pinned source, retaining the original app, simulation, gameplay and UI',()=>{
    const snapshot=JSON.parse(readFileSync(root+'source-snapshot.json','utf8'));
    const paths=sourceFiles('packages/world-sources/tidewater/src').map(file=>file.replace('packages/world-sources/tidewater/',''));
    expect(paths.sort()).toEqual(snapshot.files.map((file:any)=>file.path).sort());expect(paths).toHaveLength(130);
    const changed=snapshot.files.filter((file:any)=>sha(readFileSync('packages/world-sources/tidewater/'+file.path))!==file.sha).map((file:any)=>file.path);
    expect(changed.sort()).toEqual(Object.keys(snapshot.adaptations).sort());
  });
  it('retains all original assets, all sound recordings and the pinned UI fonts byte for byte',()=>{
    const assets=JSON.parse(readFileSync(root+'asset-sources.json','utf8'));
    expect(assets.files).toHaveLength(54);expect(assets.files.filter((f:any)=>f.path.endsWith('.ogg'))).toHaveLength(32);
    for(const asset of assets.files)expect(sha(readFileSync(`packages/components/tidewater-${assetOwner(asset.path.slice(7))}/assets/`+asset.path.slice(7))),asset.path).toBe(asset.sha);
    for(const font of JSON.parse(readFileSync(root+'font-sources.json','utf8')))expect(createHash('sha256').update(readFileSync('packages/components/tidewater-ui/assets/'+font.path)).digest('hex')).toBe(font.sha256);
  });
});

describe('complete scene contract',()=>{
  it('requires local bundled code, declared assets and explicit feature coverage',()=>{
    expect(validateRuntime(manifest)).toEqual([]);
    expect(validateRuntime({...manifest,runtime:{...runtime,entry:'https://remote.test/main.js'}})).not.toEqual([]);
    expect(validateRuntime({...manifest,runtime:{...runtime,assets:{'../escape':'scene.js'}}})).not.toEqual([]);
    expect(validateRuntime({...manifest,runtime:{...runtime,preload:['missing.js']}})).not.toEqual([]);
  });
  it('rejects omissions and mismatched asset/feature inventories on both validation paths',()=>{
    const files=new Map([['coverage.json',JSON.stringify(coverage)]]);
    expect(validateRuntimeFiles(manifest,files)).toEqual([]);
    files.set('coverage.json',JSON.stringify({...coverage,omitted:['audio'],features:['village'],assets:[]}));
    expect(validateRuntimeFiles(manifest,files)).toHaveLength(3);
  });
  it('keeps coverage valid when a verified scene is installed under a world content prefix',()=>{
    const prefix='content/scenes/creator/tidewater/';
    const installed={runtime:{...runtime,coverage:prefix+'coverage.json',assets:{'sample.ogg':prefix+'assets/sample.ogg'}}};
    expect(validateRuntimeFiles(installed,new Map([[prefix+'coverage.json',JSON.stringify(coverage)]]))).toEqual([]);
  });
  it('rejects module imports and exports in scripts that execute inside the scene capsule',()=>{
    const result=validateCodeFiles(new Map([['scene.js',"export const scene=1; import 'three';"]]),manifest);
    expect(result.diagnostics.some(d=>d.code==='CODE_RUNTIME_BUNDLE')).toBe(true);
  });
});
