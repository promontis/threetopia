import {describe,expect,it} from 'vitest';
import * as T from 'three';
import {fitMapOverview,MAP_OVERVIEW_OFFSET} from '../../src/tiles/lite/map-overview';
import {tileOverviewPoints} from '../../src/creators/tile-picker';
import {tileSlots} from '../../packages/platform/tiles.js';

describe('creator map overview limit',()=>{
  for(const [width,height,insets] of [[1462,980,{right:340,bottom:0}],[430,563,{right:0,bottom:248}]] as const){
    it(`keeps the outline in the visible area beside the panel at ${width} × ${height}`,()=>{
      const points=tileOverviewPoints(tileSlots([])),{span,target}=fitMapOverview(points,width,height,insets);
      const camera=new T.OrthographicCamera(-span*width/height/2,span*width/height/2,span/2,-span/2,1,360);
      camera.position.copy(MAP_OVERVIEW_OFFSET).add(target);camera.lookAt(target);camera.updateMatrixWorld();
      const projected=points.map(p=>p.clone().project(camera)).map(p=>({x:(p.x+1)*width/2,y:(1-p.y)*height/2}));
      for(const point of projected){expect(point.x).toBeGreaterThan(0);expect(point.x).toBeLessThan(width-insets.right);expect(point.y).toBeGreaterThan(0);expect(point.y).toBeLessThan(height-insets.bottom);}
      expect(Math.min(...projected.map(p=>p.x))+Math.max(...projected.map(p=>p.x))).toBeCloseTo(width-insets.right,6);
      expect(Math.min(...projected.map(p=>p.y))+Math.max(...projected.map(p=>p.y))).toBeCloseTo(height-insets.bottom,6);
    });
  }
  for(const [name,worlds] of [
    ['original worlds',[]],
    ['a world expanded to one side',[{q:2,r:0},{q:3,r:0},{q:4,r:0}]],
  ] as const){
    for(const [width,height] of [[2048,1030],[1362,930],[430,610]]){
      it(`fits ${name} tightly at ${width} × ${height}`,()=>{
        const points=tileOverviewPoints(tileSlots([...worlds]));
        const {span,target}=fitMapOverview(points,width,height);
        const camera=new T.OrthographicCamera(-span*width/height/2,span*width/height/2,span/2,-span/2,1,360);
        camera.position.copy(MAP_OVERVIEW_OFFSET).add(target);camera.lookAt(target);camera.updateMatrixWorld();
        const projected=points.map(p=>p.clone().project(camera));
        const left=Math.min(...projected.map(p=>p.x)),right=Math.max(...projected.map(p=>p.x));
        const bottom=Math.min(...projected.map(p=>p.y)),top=Math.max(...projected.map(p=>p.y));
        expect(left).toBeGreaterThan(-1);expect(right).toBeLessThan(1);
        expect(bottom).toBeGreaterThan(-1);expect(top).toBeLessThan(1);
        expect(Math.max(right-left,top-bottom)).toBeGreaterThan(1.87);
        expect(left+right).toBeCloseTo(0,6);expect(bottom+top).toBeCloseTo(0,6);
      });
    }
  }
});
