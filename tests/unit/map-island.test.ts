import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {Raycaster,Vector3} from 'three';
import {BOUNDS,createLandscapeSampler,riverX} from '../../src/tiles/lite/landscape';
import {MAP_TILES,mapCentre,sharedEdges,COMPOSITION_RADIUS,PUNK_ACCESS} from '../../src/tiles/lite/layout';
import {createHoverCity} from '../../src/tiles/lite/hover-city';
import {createPunkRoad,PUNK_ROAD_WIDTH} from '../../src/tiles/lite/punk-route';
import {tileCorners} from '../../packages/world-map/tile-slot.js';

const surface=JSON.parse(readFileSync('public/map/lagoon-lite/village-ground.json','utf8'));
const sampler=createLandscapeSampler(surface);
describe('Continuous island map',()=>{
  it('keeps the river open all the way into the tropical lagoon',()=>{
    for(let z=-22;z<=-4;z+=.25)expect(sampler.heightAt(riverX(z),z)).toBeLessThan(-.15);
    expect(sampler.heightAt(0,0)).toBeLessThan(-.15);
    expect(sampler.heightAt(3,1)).toBeLessThan(-.25);
  });
  it('keeps the pier landing dry and both boats and the hover platform over water',()=>{
    expect(sampler.heightAt(13.67,-6.69)).toBeGreaterThan(.95);
    expect(sampler.heightAt(13.67,-6.69)).toBeLessThan(1.1);
    expect(sampler.heightAt(13.67,2.8)).toBeLessThan(-.8);
    expect(sampler.heightAt(18.1,1.2)).toBeLessThan(-.8);
    expect(sampler.heightAt(-9.29,-9.2)).toBeLessThan(-.4);
    expect(sampler.heightAt(7.79,-13.5)).toBeLessThan(-1.4);
  });
  it('grounds the shore teleporter and keeps the arrival pad attached outside the racing road',()=>{
    const time={value:0},hover=createHoverCity(time),ray=new Raycaster();
    const {shore,arrival,origin,padRadius}=PUNK_ACCESS;
    const surfaceAt=(x:number,z:number)=>{
      ray.set(new Vector3(x,15,z),new Vector3(0,-1,0));
      const hits=ray.intersectObject(hover.teleports.bases);
      expect(hits.length).toBeGreaterThan(0);
      return hits[0].point.y;
    };
    try{
      for(let i=0;i<24;i++){
        const a=i*Math.PI/12,x=shore.x+Math.cos(a)*padRadius,z=shore.z+Math.sin(a)*padRadius;
        expect(sampler.heightAt(x,z)).toBeGreaterThan(.7);
        expect(Math.abs(shore.y-sampler.heightAt(x,z))).toBeLessThan(.08);
      }
      const road=createPunkRoad();
      for(let i=0;i<720;i++){
        const p=road.getPointAt(i/720);
        expect(Math.hypot(p.x-arrival.x,p.z-arrival.z)-padRadius-PUNK_ROAD_WIDTH/2).toBeGreaterThan(.1);
      }
      let shoreY=0,arrivalY=0;
      for(const t of [0,1.75,3.5,5.25,7]){
        time.value=t;hover.update();hover.root.updateMatrixWorld(true);
        const source=surfaceAt(shore.x,shore.z),destination=surfaceAt(origin.x+arrival.x,origin.z+arrival.z);
        if(t===0){shoreY=source;arrivalY=destination;}
        expect(source).toBeCloseTo(shoreY,5);
        expect(destination).toBeCloseTo(arrivalY+hover.offset,5);
        expect(source-shore.y).toBeGreaterThan(.1);expect(source-shore.y).toBeLessThan(.16);
        expect(destination-hover.deckY-hover.offset).toBeGreaterThan(.1);expect(destination-hover.deckY-hover.offset).toBeLessThan(.16);
        expect(hover.teleports.glow.material.uniforms.uTime).toBe(time);
      }
      expect(hover.root.getObjectByName('Stairs from Sakura to Punk')).toBeUndefined();
    }finally{hover.dispose();}
  });
  it('has no discontinuity across any of the five shared tile edges',()=>{
    const corners=tileCorners(COMPOSITION_RADIUS);
    for(const tile of MAP_TILES){const c=mapCentre(tile);for(const edge of sharedEdges(tile)){
      const a=corners[edge],b=corners[(edge+1)%6],nx=Math.cos(edge*Math.PI/3),nz=Math.sin(edge*Math.PI/3);
      for(let i=0;i<=24;i++){const t=i/24,x=c.x+a.x+(b.x-a.x)*t,z=c.z+a.z+(b.z-a.z)*t;
        expect(Math.abs(sampler.heightAt(x+nx*.0001,z+nz*.0001)-sampler.heightAt(x-nx*.0001,z-nz*.0001))).toBeLessThan(.004);
      }
    }}
  });
  it('matches the deep ocean at every boundary of the depth texture',()=>{
    for(let i=0;i<=50;i++){
      const x=BOUNDS.x+BOUNDS.width*i/50,z=BOUNDS.z+BOUNDS.depth*i/50;
      for(const p of [[x,BOUNDS.z],[x,BOUNDS.z+BOUNDS.depth],[BOUNDS.x,z],[BOUNDS.x+BOUNDS.width,z]])expect(sampler.heightAt(...p as [number,number])).toBe(-10);
    }
  });
});
