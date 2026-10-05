import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {owners,entries,name,assetOwner} from '../../examples/tidewater/package-layout.mjs';
import {rewriteImports} from '../../scripts/creators/extract-tidewater-packages.mjs';
import {inspectModule} from '../../packages/platform/code.js';
const read=(path:string)=>readFileSync(path,'utf8');
const metadata=(role:string)=>JSON.parse(read(`packages/components/tidewater-${role}/package.json`));

describe('Tidewater compositions and extracted packages',()=>{
  it('owns all 130 original files exactly once and preserves implementations except module specifiers',()=>{
    const snapshot=JSON.parse(read('packages/components/tidewater-world-tile/source-snapshot.json'));
    expect(Object.keys(owners).sort()).toEqual(snapshot.files.map((f:any)=>f.path.slice(4)).sort());
    for(const [path,role] of Object.entries(owners)){
      const original=read('packages/world-sources/tidewater/src/'+path);
      const extracted=read(`packages/components/tidewater-${role}/src/${path}`);
      expect(extracted,path).toBe(path.endsWith('.js')?rewriteImports(original,path).text:original);
      expect(extracted).not.toContain('source-tidewater');
    }
  });
  it('declares actual cross-package imports and has an acyclic installable graph of 20 packages',()=>{
    const roles=[...Object.keys(entries),'rocks','gulls','map-tile'];expect(roles).toHaveLength(20);
    const packages=new Map(roles.map(role=>[name(role),metadata(role)])),done=new Set<string>();
    const visit=(key:string,trail:string[])=>{expect(trail,key).not.toContain(key);if(done.has(key))return;const pkg=packages.get(key);expect(pkg,key).toBeDefined();for(const dep of Object.keys(pkg.dependencies||{}))visit(dep,[...trail,key]);done.add(key);};
    visit(name('world-tile'),[]);expect(done.size).toBe(20);
    for(const [file,role] of Object.entries(owners))if(file.endsWith('.js')){
      const module=inspectModule(read(`packages/components/tidewater-${role}/src/${file}`),file),pkg=metadata(role);
      expect(module.diagnostics,file).toEqual([]);
      for(const dep of module.imports.filter(i=>i.specifier.startsWith('@dgreenheck/')))expect(pkg.dependencies,`${file}: ${dep.specifier}`).toHaveProperty(dep.specifier.split('/').slice(0,2).join('/'));
    }
    expect(metadata('map-tile').dependencies).toHaveProperty(name('boat'));
    expect(metadata('world-tile').dependencies).toHaveProperty(name('map-tile'));
  });
  it('keeps reusable original assets with their owning system rather than only the world bundle',()=>{
    const assets=JSON.parse(read('packages/components/tidewater-world-tile/asset-sources.json'));
    const systems=new Set();
    for(const f of assets.files){const key=f.path.slice(7),role=assetOwner(key);systems.add(role);expect(readFileSync(`packages/components/tidewater-${role}/assets/${key}`).length).toBe(f.size);}
    expect([...systems].sort()).toEqual(['audio','debris','whale']);
  });
});
