import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {projectScene} from '../../packages/world-map/scene-camera.js';
import {projectMap,validateImageMap} from '../../packages/world-map/image-format.js';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
describe('the walking world is the map source',()=>{
  it('keeps all four captures on the recorded source revision',()=>{
    const manifest=read('public/map/renders/manifest.json'),hash=createHash('sha256');
    for(const path of manifest.inputs){hash.update(path);hash.update(readFileSync(path));}
    expect(hash.digest('hex'),'Run pnpm map:capture after changing the walking world').toBe(manifest.revision);
    for(const id of manifest.tiles)expect(read(`public/map/tiles/${id}.json`).capture.revision).toBe(manifest.revision);
  });
  it('projects every source landmark and player height through the capture camera',()=>{
    for(const id of ['lagoon','sakura','tidewater','punk']){
      const source=read(`public/atlas/scenes/${id}.json`),map=read(`public/map/tiles/${id}.json`);
      expect(map.capture.source).toEqual(source.source);expect(map.landmarks).toHaveLength(source.landmarks.length);
      for(const l of source.landmarks){const p=projectScene(l.position[0],l.position[1],l.position[2]);expect(map.landmarks.find((m:any)=>m.id===l.id).position).toEqual([p.x,p.y]);}
    }
    expect(projectMap(40,-80,25)).toEqual(projectScene(40,25,-80));
    expect(projectMap(40,-80,25).y).toBeLessThan(projectMap(40,-80).y);
  });
  it('refuses a capture with a different camera or missing derivation information',()=>{
    const map=read('public/map/tiles/lagoon.json');map.capture.camera.elevation=60;
    expect(validateImageMap(map).join()).toContain('shared orthographic camera');
    map.capture.camera.elevation=45;map.capture.revision='untracked';
    expect(validateImageMap(map).join()).toContain('source, revision');
  });
});
