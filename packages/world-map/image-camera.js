import {hexCenter,hexCorners} from './index.js';
import {projectMap} from './image-format.js';
import {componentBounds} from './map-motion.js';
import {bounds,cameraLimits} from './scene-camera.js';

/** Fit the complete art and anchored moving objects; free clouds are atmosphere. */
export function imageTileFrame(tile,map){
  const c=hexCenter(tile.q,tile.r),center=projectMap(c.x,c.z);
  const points=hexCorners(tile.q,tile.r).map(([x,z])=>projectMap(x,z));
  for(const layer of [map.terrain,...map.components.filter(c=>!c.effect)]){
    const b=componentBounds(layer,center),travel=layer.animation?.travel??[0,0];
    const angle=Math.abs(layer.animation?.rotate??0)*Math.PI/180;
    const pad=Math.hypot(b.width,b.height)*Math.sin(angle);
    points.push({x:b.x-b.width/2+Math.min(0,travel[0])-pad,y:b.y-b.height/2+Math.min(0,travel[1])-pad},
      {x:b.x+b.width/2+Math.max(0,travel[0])+pad,y:b.y+b.height/2+Math.max(0,travel[1])+pad});
  }
  return {...bounds(points),id:tile.id};
}
export function imageLimits(tiles,maps,width,height,insets){
  return cameraLimits(tiles.map(tile=>imageTileFrame(tile,maps.get(tile.id))),width,height,insets);
}
