import * as T from 'three';
import {builtinTile} from '../../../packages/platform/tiles.js';
import {COMPACT_TILE,validateLandmarkMetrics} from '../../../packages/world-map/tile-slot.js';
import type {LandmarkLOD,LandmarkMetrics} from '../../../packages/world-map/tile-slot.js';

/** A creator slot on the shared landscape. Borders are coordinates and a
 * creator tool; they are not separate raised slabs of terrain. */
export function createCompositionSlot(id:string,host?:T.Group){
  const root=host||new T.Group(),slot=new T.Group();root.name=`${id} map tile`;slot.name=`${id} creator slot`;root.add(slot);root.userData.contract=builtinTile(id);
  if(id==='punk')slot.position.y=3.21;
  return {root,slot,config:COMPACT_TILE.map,mount(component:T.Object3D,metrics:LandmarkMetrics,lod:LandmarkLOD='tile'){
    const errors=validateLandmarkMetrics(metrics,lod);if(errors.length)throw Error(errors.join('\n'));
    slot.clear();slot.add(component);
  },dispose(){root.removeFromParent();slot.clear();}};
}
