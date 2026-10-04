import * as T from 'three';
import {centre,corners,MAP_SCALE,TILE_RADIUS} from '../../packages/platform/tiles.js';
import {MAP_OVERVIEW_OFFSET} from '../tiles/lite/map-overview';

/** A fixed photographic view that includes the complete tile and its content. */
export function frameTileSnapshot(camera:T.OrthographicCamera,tile:{q:number;r:number},host:T.Object3D,width:number,height:number){
  const c=centre(tile.q,tile.r,MAP_SCALE),box=new T.Box3().setFromObject(host);
  const top=Math.max(2.8,Number.isFinite(box.max.y)?box.max.y:2.8);
  const target=new T.Vector3(c.x,top*.4,c.z);
  camera.position.copy(MAP_OVERVIEW_OFFSET).add(target);camera.lookAt(target);camera.updateMatrixWorld();
  const view=new T.Box3();
  for(const [x,z] of corners(TILE_RADIUS*MAP_SCALE))for(const y of [0,top])view.expandByPoint(new T.Vector3(c.x+x,y,c.z+z).applyMatrix4(camera.matrixWorldInverse));
  const center=view.getCenter(new T.Vector3()),size=view.getSize(new T.Vector3());
  // Center the projected silhouette, leaving a little surrounding sea in frame.
  const offset=new T.Vector3(center.x,center.y,0).transformDirection(camera.matrixWorld);
  offset.multiplyScalar(Math.hypot(center.x,center.y));target.add(offset);camera.position.add(offset);
  const span=Math.max(size.y,size.x/(width/height))*1.12;
  camera.clearViewOffset();camera.zoom=1;camera.left=-span*width/height/2;camera.right=-camera.left;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();
  return target;
}
