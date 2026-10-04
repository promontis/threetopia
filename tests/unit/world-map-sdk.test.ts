import {describe,it,expect} from 'vitest';
import {readFileSync,mkdtempSync,rmSync,writeFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {validateMap,validateWorld,starterMap,availableSlots,MAP_BUDGET,hexCenter} from '../../packages/world-map/index.js';
import {REGIONS} from '../../src/explore/config.ts';
import {buildHexTopology} from '../../src/explore/hex-world.ts';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const registry=read('public/atlas/registry.json');
const cli=resolve('packages/cli/bin/legacy.js');
const run=(...args:string[])=>spawnSync(process.execPath,[cli,...args],{encoding:'utf8'});

describe('creator map contract',()=>{
  it('validates every shipped map and keeps its registry aligned with the playable world',()=>{
    for(const tile of registry.tiles){
      const map=read(`public${tile.map}`),world=read(`public/atlas/maps/${tile.id}.world.json`),region=REGIONS.find(r=>r.id===tile.id)!;
      expect(validateWorld(world,map,registry),tile.id).toEqual([]);
      expect(tile).toMatchObject({q:region.tile.q,r:region.tile.r,edges:[...region.tile.edges]});
      expect(map.distant.indices.length).toBeLessThan(map.terrain.indices.length/2);
      expect(JSON.stringify(map).length).toBeLessThan(MAP_BUDGET.bytes);
    }
  });
  it('rejects absent representations, invalid triangles, NaN and out-of-bounds terrain',()=>{
    expect(validateMap(undefined)).toContain('A map representation is required.');
    let m=starterMap();m.terrain.indices[0]=1e6;expect(validateMap(m).join()).toContain('invalid vertex');
    m=starterMap();m.terrain.positions[0]=NaN;expect(validateMap(m).join()).toContain('finite positions');
    m=starterMap();m.terrain.positions[0]=1000;expect(validateMap(m).join()).toContain('tile bounds');
  });
  it('enforces size and detail budgets and unique creator landmarks',()=>{
    const m=starterMap();m.landmarks.push({...m.landmarks[0]});expect(validateMap(m).join()).toContain('duplicate landmark');
    m.landmarks.pop();m.distant=m.terrain;expect(validateMap(m).join()).toContain('at most half');
    const big=starterMap();big.props=Array(401).fill(big.props[0]);expect(validateMap(big).join()).toContain('400 map props');
    (big as any).extra='x'.repeat(MAP_BUDGET.bytes);expect(validateMap(big).join()).toContain('256 KiB');
  });
  it('offers the first incomplete ring and rejects occupied or disconnected placement',()=>{
    const slots=availableSlots(registry.tiles);expect(slots).toHaveLength(3);expect(slots.every(s=>s.ring===1)).toBe(true);
    const world={version:1,id:'test-world',title:'Test',tile:{q:0,r:0},edges:Array(6).fill('open-sea'),map:'map.json'};
    expect(validateWorld(world,starterMap(),registry).join()).toContain('occupied');
    world.tile={q:slots[0].q,r:slots[0].r};expect(validateWorld(world,starterMap(),registry).join()).toContain('matching shore-path');
    world.edges[slots[0].neighbours[0].side]='shore-path';expect(validateWorld(world,starterMap(),registry).join()).toContain('does not match');
  });
  it('joins the baked relief meshes and map paths at the actual shared Wang edges',()=>{
    for(const edge of buildHexTopology().sharedEdges){
      const samples=edge.tiles.map(id=>{const t=registry.tiles.find((t:any)=>t.id===id),c=hexCenter(t.q,t.r),m=read(`public${t.map}`);const [a,b]=edge.endpoints,dx=b.x-a.x,dz=b.z-a.z;
        const points=[];for(let i=0;i<m.terrain.positions.length;i+=3){const x=m.terrain.positions[i]+c.x,z=m.terrain.positions[i+2]+c.z,cross=Math.abs((x-a.x)*dz-(z-a.z)*dx)/Math.hypot(dx,dz);const u=((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz);if(cross<.002&&u>=-.001&&u<=1.001)points.push([+u.toFixed(4),m.terrain.positions[i+1]]);}
        const p=m.paths.flatMap((p:any)=>[p.points[0],p.points.at(-1)]).map((p:any)=>[p[0]+c.x,p[2]+c.z]);expect(p.some((p:any)=>Math.hypot(p[0]-(a.x+b.x)/2,p[1]-(a.z+b.z)/2)<.1)).toBe(true);
        return [...new Map(points.map(p=>[p[0],p[1]])).entries()].sort((a,b)=>a[0]-b[0]);
      });expect(samples[0]).toEqual(samples[1]);
    }
  });
});

describe('the executable creator workflow',()=>{
  it('creates, checks and builds a self-contained preview while protecting existing work',()=>{
    const root=mkdtempSync(join(tmpdir(),'threetopia-cli-')),project=join(root,'coral-garden');
    try{
      expect(run('create',project,'--tile','1,-1').status).toBe(0);
      expect(run('check',project).status).toBe(0);expect(read(join(project,'map.json')).source).toEqual(read(join(project,'world.json')).scene);
      const before=readFileSync(join(project,'map.json'),'utf8');expect(run('create',project).status).not.toBe(0);expect(readFileSync(join(project,'map.json'),'utf8')).toBe(before);
      expect(run('build',project).status).toBe(0);for(const name of ['index.html','world.json','map.json','scene-renderer.js','scene-renderer.css','gltf-scene.js','scene-camera.js','index.js','assets/world.glb','three.webgpu.js'])expect(existsSync(join(project,'dist-map',name)),name).toBe(true);
      const manifest=read(join(project,'world.json'));delete manifest.map;writeFileSync(join(project,'world.json'),JSON.stringify(manifest));
      const fail=run('check',project);expect(fail.status).not.toBe(0);expect(fail.stderr).toContain('must declare a map');expect(run('build',project).status).not.toBe(0);
    }finally{rmSync(root,{recursive:true,force:true});}
  });
  it('explains neighbour coordination and refuses directory traversal',()=>{
    const root=mkdtempSync(join(tmpdir(),'threetopia-cli-')),project=join(root,'coral-garden');
    try{
      const args=['--registry','public/atlas/registry.json'];expect(run('create',project,'--tile','1,-1','--connect','SW',...args).status).toBe(0);
      const fail=run('check',project,...args);expect(fail.status).not.toBe(0);expect(fail.stderr).toContain('Coordinate both sides');
      const manifest=read(join(project,'world.json'));manifest.map='../outside.json';writeFileSync(join(project,'world.json'),JSON.stringify(manifest));
      expect(run('check',project).stderr).toContain('stay inside');
    }finally{rmSync(root,{recursive:true,force:true});}
  });
});
