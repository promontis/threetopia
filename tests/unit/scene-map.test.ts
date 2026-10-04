import {describe,it,expect} from 'vitest';
import {readFileSync,mkdtempSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {hexCorners,validateWorld,validateSceneMap,starterSceneMap} from '../../packages/world-map/index.js';
import {projectScene,unprojectScene,sceneLimits,frameCenter,clampSceneView,tileFrame} from '../../packages/world-map/scene-camera.js';
import {REGIONS} from '../../src/explore/config.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const registry=read('public/atlas/registry.json');
const tiles=registry.tiles.map((t:any)=>{const m=read('public'+t.sceneMap);return {...t,minHeight:m.bounds.minY,maxHeight:m.bounds.maxY};});
describe('bounded real-scene camera',()=>{
  it('fits every occupied tile at the outer limit and every whole tile at the inner limit, on wide and tall screens',()=>{
    for(const [width,height] of [[1440,960],[390,844],[2560,720],[844,390]]){
      const insets={top:80,right:30,bottom:100,left:30},limits=sceneLimits(tiles,width,height,insets);
      const verify=(selected:typeof tiles,span:number,center:{x:number;y:number})=>{
        for(const t of selected)for(const [x,z] of hexCorners(t.q,t.r))for(const y of [t.minHeight,t.maxHeight]){
          const p=projectScene(x,y,z),px=width/2+(p.x-center.x)*height/span,py=height/2+(p.y-center.y)*height/span;
          expect(px).toBeGreaterThanOrEqual(insets.left);expect(px).toBeLessThanOrEqual(width-insets.right);
          expect(py).toBeGreaterThanOrEqual(insets.top);expect(py).toBeLessThanOrEqual(height-insets.bottom);
        }
      };
      verify(tiles,limits.maxSpan,frameCenter(limits.area,limits.maxSpan,limits));
      for(const tile of tiles)verify([tile],limits.minSpan,frameCenter(tileFrame(tile),limits.minSpan,limits));
    }
  });
  it('clamps repeated zoom and pan input, including a registry with only one tile',()=>{
    for(const occupied of [tiles,[tiles[0]]]){
      const l=sceneLimits(occupied,1440,900);let v={x:1e8,y:-1e8,span:1e10};
      for(let i=0;i<100;i++)v=clampSceneView({...v,span:v.span*2},l);
      expect(v.span).toBe(l.maxSpan);expect(v.x).toBeCloseTo(l.area.x);expect(v.y).toBeCloseTo(l.area.y);
      for(let i=0;i<100;i++)v=clampSceneView({...v,span:v.span/2},l);
      expect(v.span).toBe(l.minSpan);
      if(occupied.length===1)expect(l.minSpan).toBe(l.maxSpan);
    }
  });
  it('grows only when occupied tiles grow and keeps coordinate projection reversible',()=>{
    const a=sceneLimits(tiles,1440,960),b=sceneLimits([...tiles,{q:2,r:-1,maxHeight:180}],1440,960);
    expect(b.maxSpan).toBeGreaterThan(a.maxSpan);expect(b.minSpan).toBe(a.minSpan);
    for(const [x,z] of [[0,0],[-400,600],[2000,-1234]]){const p=projectScene(x,0,z),v=unprojectScene(p.x,p.y);expect(v.x).toBeCloseTo(x,8);expect(v.z).toBeCloseTo(z,8);}
  });
});
describe('actual asset contract',()=>{
  it('ties the four map adapters, tile coordinates and landmarks to the world registry',()=>{
    for(const tile of tiles){const map=read('public'+tile.sceneMap),world=read(`public/atlas/scenes/${tile.id}.world.json`),region=REGIONS.find(r=>r.id===tile.id)!;
      expect(validateWorld(world,map,registry),tile.id).toEqual([]);expect(map.source).toEqual({kind:'runtime',id:region.id});expect(world.tile).toEqual(region.tile?{q:region.tile.q,r:region.tile.r}:null);
    }
  });
  it('rejects invented map-only scenes, invalid bounds, duplicate landmarks and remote code',()=>{
    const map=starterSceneMap(),world={version:1,id:'test-world',title:'Test',tile:{q:0,r:0},edges:Array(6).fill('open-sea'),map:'map.json',scene:{kind:'gltf',url:'assets/different.glb'}};
    expect(validateWorld(world,map).join()).toContain('same actual scene');
    expect(validateWorld({...world,scene:{url:'assets/world.glb',kind:'gltf'}},map)).toEqual([]);
    for(const source of [{kind:'gltf',url:'../outside.glb'},{kind:'gltf',url:'https://example.com/world.glb'},{kind:'script',url:'code.js'}])expect(validateSceneMap({...map,source}).length).toBeGreaterThan(0);
    expect(validateSceneMap({...map,bounds:{minY:100,maxY:0}}).join()).toContain('bounds');
    expect(validateSceneMap({...map,landmarks:[...map.landmarks,...map.landmarks]}).join()).toContain('unique');
    expect(validateSceneMap({...map,omit:[null]}).join()).toContain('omit');
  });
  it('builds a portable real-geometry preview and catches missing, oversized and out-of-bounds assets',()=>{
    const root=mkdtempSync(join(tmpdir(),'threetopia-scene-')),project=join(root,'harbour');
    const run=(...args:string[])=>spawnSync(process.execPath,[resolve('packages/cli/bin/legacy.js'),...args],{encoding:'utf8'});
    try{
      expect(run('create',project,'--format','scene').status).toBe(0);const map=read(join(project,'map.json'));expect(map.version).toBe(3);
      const original=readFileSync(join(project,'assets/world.glb'));expect(original.toString('utf8',0,4)).toBe('glTF');
      expect(run('build',project).status).toBe(0);
      for(const file of ['assets/world.glb','scene-renderer.js','scene-camera.js','gltf-scene.js','three.webgpu.js','three.core.js','three.tsl.js','addons/loaders/GLTFLoader.js','addons/utils/SkeletonUtils.js'])expect(existsSync(join(project,'dist-map',file)),file).toBe(true);
      expect(readFileSync(join(project,'dist-map/assets/world.glb'))).toEqual(original);
      map.bounds.maxY=1;writeFileSync(join(project,'map.json'),JSON.stringify(map));expect(run('check',project).status).not.toBe(0);
      map.bounds.maxY=100;writeFileSync(join(project,'map.json'),JSON.stringify(map));writeFileSync(join(project,'assets/world.glb'),Buffer.alloc(64*1024*1024+1));expect(run('check',project).stderr).toContain('64 MiB');
      rmSync(join(project,'assets/world.glb'));expect(run('check',project).status).not.toBe(0);
    }finally{rmSync(root,{recursive:true,force:true});}
  });
});
