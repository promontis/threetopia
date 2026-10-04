import {describe,expect,it} from 'vitest';
import * as T from 'three';
import {createBlankTile,fitTileView,projectTileBounds} from '../../src/creators/tile-picker';
import {centre,MAP_SCALE,SLOT} from '../../packages/platform/tiles.js';
import {setFrameOffset,framedTarget} from '../../src/tiles/lite/orthographic-frame';
import {disposeObject} from '../../packages/platform/render.js';

describe('creator tile picker',()=>{
  it('draws only an outline above the sea while keeping the whole hex selectable',()=>{
    const tile=createBlankTile({q:-1,r:0,status:'available'});
    const bounds=new T.Box3().setFromObject(tile);
    expect(bounds.max.y).toBeCloseTo(SLOT.floorY*MAP_SCALE,5);
    expect(bounds.max.y).toBeGreaterThan(.5);
    expect(bounds.min.y).toBeCloseTo(bounds.max.y,5);
    expect(tile.geometry.index!.count/3).toBe(6);
    expect((tile.material as T.Material).visible).toBe(false);
    expect(tile.castShadow).toBe(false);
    expect(tile.userData.skipWaterCapture).toBe(true);
    const outline=tile.getObjectByName('Available tile outline') as T.LineSegments;
    expect(outline.geometry.getAttribute('position').count).toBe(12);
    const ray=new T.Raycaster(tile.position.clone().add(new T.Vector3(2,5,1)),new T.Vector3(0,-1,0));
    expect(ray.intersectObject(tile,false)).toHaveLength(1);
    ray.ray.origin.x=tile.position.x+10;
    expect(ray.intersectObject(tile,false)).toHaveLength(0);
    disposeObject(tile);
  });

  for(const [width,height,placement,panelWidth,panelHeight,top,bottom] of [
    [1220,760,'right',310,570,24,24],
    [800,640,'right',310,570,24,24],
    [650,720,'bottom',626,330,24,24],
    [350,700,'bottom',326,320,24,24],
    [800,640,'right',310,436,88,116],
    [350,700,'bottom',326,322,88,116],
  ] as const){
    it(`keeps the entire tile visible beside a ${placement} card at ${width} × ${height}`,()=>{
      const camera=new T.OrthographicCamera(-50*width/height,50*width/height,50,-50,1,360);
      const coordinate={q:-1,r:1},panel={width:panelWidth,height:panelHeight,placement,top,bottom};
      const fitted=fitTileView(camera,coordinate,width,height,panel,5),center=centre(coordinate.q,coordinate.r,MAP_SCALE);
      expect(fitted.target.toArray()).toEqual([center.x,1.4,center.z]);
      camera.zoom=fitted.zoom;setFrameOffset(camera,width,height,fitted.offset);
      let screenCenter:T.Vector3|undefined;
      for(const azimuth of [0,.3,1.5,3,4.7,Math.PI*2])for(const polar of [Math.PI*.20,.85,Math.PI*.36]){
        camera.position.setFromSpherical(new T.Spherical(130,polar,azimuth)).add(fitted.target);
        camera.lookAt(fitted.target);camera.updateMatrixWorld();
        const projected=fitted.target.clone().project(camera);
        if(screenCenter)expect(projected.distanceTo(screenCenter)).toBeLessThan(1e-10);else screenCenter=projected;
        expect(fitTileView(camera,coordinate,width,height,panel,5).zoom).toBe(fitted.zoom);
        const box=projectTileBounds(camera,coordinate,width,height);
        expect(fitted.target.y).toBe(1.4);
        expect(fitted.zoom).toBeGreaterThan(1);
        expect(fitted.zoom).toBeLessThanOrEqual(5);
        expect(box.left).toBeGreaterThanOrEqual(23.99);
        expect(box.top).toBeGreaterThanOrEqual(top-.01);
        expect(box.right).toBeLessThanOrEqual(width-24-(placement==='right'?panelWidth+24:0)+.01);
        expect(box.bottom).toBeLessThanOrEqual(height-bottom-(placement==='bottom'?panelHeight+24:0)+.01);
      }
    });
  }

  it('preserves off-axis framing in video poses without changing the recorded format',()=>{
    const camera=new T.OrthographicCamera(-45,45,30,-30,1,360),target=new T.Vector3(-15,1.4,12);
    camera.position.set(50,90,100).add(target);camera.lookAt(target);camera.zoom=2.4;
    for(const offset of [new T.Vector2(.19,.02),new T.Vector2(0,.3),new T.Vector2()]){
      setFrameOffset(camera,1200,800,offset);camera.updateMatrixWorld();
      const recorded=framedTarget(camera,target),playback=camera.clone();
      playback.clearViewOffset();playback.position.add(recorded.clone().sub(target));playback.lookAt(recorded);playback.updateMatrixWorld();
      for(const point of [target,new T.Vector3(-8,4,15),new T.Vector3(-20,0,9)]){
        expect(point.clone().project(camera).distanceTo(point.clone().project(playback))).toBeLessThan(1e-10);
      }
    }
  });
});
