import {beforeEach, afterEach, describe, it, expect} from 'vitest';
import {mkdtempSync, writeFileSync, mkdirSync, rmSync, readFileSync, symlinkSync, existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {inspectModule, validateCodeFiles} from '../../packages/platform/code.js';
import {starterGLB} from '../../packages/platform/index.js';

const cli = resolve('packages/cli/bin/threetopia.js');
let dir:string;
beforeEach(() => { dir = mkdtempSync(join(tmpdir(), 'threetopia-cli-')); });
afterEach(() => rmSync(dir, {recursive:true,force:true}));
const run = (...args:string[]) => {
  const result = spawnSync(process.execPath,[cli,...args,'--json'],{cwd:dir,encoding:'utf8',env:{...process.env,THREETOPIA_HOME:join(dir,'no-credentials'),THREETOPIA_REGISTRY:'https://creators.threetopia.com'}});
  return {status:result.status, stderr:result.stderr, result:JSON.parse(result.stdout)};
};
function project(code:string, extras:Record<string,string|Uint8Array>={}) {
  const files:Record<string,string|Uint8Array>={'index.js':code,'package.json':JSON.stringify({type:'module',peerDependencies:{three:'>=0.184.0 <0.187.0'}}),...extras};
  for(const [file,data] of Object.entries(files)){mkdirSync(join(dir,file,'..'),{recursive:true});writeFileSync(join(dir,file),data);}
  writeFileSync(join(dir,'threetopia.json'),JSON.stringify({registry:'https://creators.threetopia.com',manifest:{schemaVersion:1,name:'@example/component',version:'1.0.0',kind:'asset',title:'Example component',description:'Test',license:'MIT',changelog:'Initial.',exports:{component:'index.js'},dependencies:{}},files:Object.keys(files)}));
}

describe('current executable CLI',()=>{
  it('reports the packaged version and returns structured option errors',()=>{
    const version=spawnSync(process.execPath,[cli,'--version'],{encoding:'utf8'});
    expect(version.stdout.trim()).toBe(JSON.parse(readFileSync(resolve('packages/cli/package.json'),'utf8')).version);
    const invalid=run('check','--missing');expect(invalid.status).toBe(1);expect(invalid.result).toMatchObject({schemaVersion:1,command:'check',valid:false});expect(invalid.stderr).toBe('');
  });
  it('analyzes TSX and real imports without treating comments as code or editing source',()=>{
    const source="// new THREE.WebGLRenderer(); import './missing.js';\nimport {Group} from 'three';\nexport function createTree():Group { return new Group(); }\nexport const View = () => <div />;";
    writeFileSync(join(dir,'trees.tsx'),source);
    const {status,result}=run('analyze',dir);expect(status).toBe(0);expect(result.summary.modules).toBe(1);
    expect(result.modules[0].imports).toEqual([{specifier:'three',line:2,kind:'static'}]);
    expect(result.candidates[0].signals).toEqual([]);expect(result.workflow).toMatchObject({sourceExecuted:false,filesChanged:false,catalogSearched:false});
    expect(readFileSync(join(dir,'trees.tsx'),'utf8')).toBe(source);
  });
  it('propagates host dependencies through the proposed extraction boundary',()=>{
    writeFileSync(join(dir,'component.js'),"import {start} from './host.js'; export function createScene(){start();}");
    writeFileSync(join(dir,'host.js'),"import * as THREE from 'three'; export function start(){new THREE.WebGLRenderer();requestAnimationFrame(start);}");
    const {result}=run('analyze',dir),candidate=result.candidates.find((c:any)=>c.entry==='component.js');
    expect(candidate.files).toEqual(['component.js','host.js']);expect(candidate.signals).toEqual(expect.arrayContaining(['owns-renderer','owns-loop']));
  });
  it('marks skipped symlinks as an incomplete scan and never follows them',()=>{
    symlinkSync(resolve('packages/world-sources/tidewater'),join(dir,'source'));
    const {result}=run('analyze',dir);expect(result.complete).toBe(false);expect(result.summary.modules).toBe(0);expect(result.diagnostics[0].code).toBe('ANALYZE_SYMLINK');
  });
  it('rejects malformed JavaScript, missing imports and undeclared peers with locations',()=>{
    project('export function broken( {');
    let checked=run('check');expect(checked.status).toBe(1);expect(checked.result.diagnostics).toContainEqual(expect.objectContaining({code:'CODE_SYNTAX',file:'index.js',line:1}));
    writeFileSync(join(dir,'index.js'),"import './missing.js'; import 'missing-peer'; export const x=1;");
    checked=run('check');expect(checked.status).toBe(1);expect(checked.result.diagnostics.map((d:any)=>d.code)).toEqual(expect.arrayContaining(['CODE_IMPORT_MISSING','CODE_PEER_MISSING']));
  });
  it('checks source statically without executing top-level side effects or package scripts',()=>{
    project("import fs from 'node:fs'; fs.writeFileSync('executed','bad'); export const x=1;");
    const checked=run('check');expect(checked.status).toBe(0);expect(checked.result.code).toEqual({modules:1,executed:false});expect(existsSync(join(dir,'executed'))).toBe(false);
  });
  it('checks every GLB and keeps separate metrics for multiple assets',()=>{
    project('export const x=1;',{'one.glb':starterGLB(),'two.glb':starterGLB(2)});
    let checked=run('check');expect(checked.status).toBe(0);expect(checked.result.files['one.glb'].asset.bounds.radius).toBeCloseTo(1.5);expect(checked.result.files['two.glb'].asset.bounds.radius).toBeCloseTo(3);
    writeFileSync(join(dir,'two.glb'),'invalid');checked=run('check');expect(checked.status).toBe(1);expect(checked.result.diagnostics).toContainEqual(expect.objectContaining({code:'GEOMETRY',file:'two.glb'}));
  });
  it('rejects an upload file symlink that leaves the project',()=>{
    project('export const x=1;');rmSync(join(dir,'index.js'));symlinkSync(cli,join(dir,'index.js'));
    const checked=run('check');expect(checked.status).toBe(1);expect(checked.result.diagnostics).toContainEqual(expect.objectContaining({code:'FILE_READ'}));
  });
});

describe('shared code validation',()=>{
  it('catches invalid exports and analyzes type imports without executing them',()=>{
    expect(inspectModule('export {missing};','bad.js').diagnostics[0].code).toBe('CODE_SYNTAX');
    expect(inspectModule("import type {Scene} from 'three'; export const a=1;",'a.ts').imports[0].kind).toBe('type');
  });
  it('requires portable relative imports and a declared ESM package type',()=>{
    const code=validateCodeFiles(new Map([['index.js',"export {x} from '../outside.js';"]]));
    expect(code.diagnostics.map(d=>d.code)).toEqual(expect.arrayContaining(['CODE_IMPORT_MISSING','CODE_MODULE_TYPE']));
  });
  it('accepts declared peers and diagnoses nonliteral dynamic imports as requiring review',()=>{
    const files=new Map([['package.json',JSON.stringify({type:'module',peerDependencies:{three:'^0.186.0'}})],['index.js',"import {Group} from 'three';export async function load(path){return import(path);}export function create(){return new Group();}"]]);
    const result=validateCodeFiles(files);expect(result.diagnostics.every(d=>d.severity==='warning')).toBe(true);expect(result.diagnostics.some(d=>d.message.includes('dynamic-import'))).toBe(true);
  });
});
