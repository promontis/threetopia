import * as T from 'three';
import {tileInward} from '../../../packages/world-map/tile-slot.js';
import {MAP_TILES,COMPOSITION_RADIUS,mapCentre,type MapTileId} from './layout';

/** Pick visible landmarks first, then the terrain/water within a tile. The
 * shared ocean outside occupied tiles is never a selectable world. */
export function mountTileSelection(canvas:HTMLCanvasElement,camera:T.Camera,terrain:T.Object3D,targets:Array<{root:T.Object3D;id:MapTileId}>,select:(id:MapTileId)=>void,signal:AbortSignal){
  const raycaster=new T.Raycaster(),ndc=new T.Vector2(),water=new T.Plane(new T.Vector3(0,1,0),0),waterPoint=new T.Vector3();
  const owners=new Map(targets.map(t=>[t.root,t.id])),objects=[...owners.keys(),terrain];
  const footprints=MAP_TILES.map(tile=>({...mapCentre(tile),id:tile.id}));
  const pointers=new Set<number>();
  let press:{id:number;x:number;y:number;dragged:boolean}|undefined;
  let clicked:MapTileId|undefined;

  function pick(x:number,y:number){
    const rect=canvas.getBoundingClientRect();
    ndc.set((x-rect.left)/rect.width*2-1,1-(y-rect.top)/rect.height*2);
    camera.updateMatrixWorld();objects.forEach(o=>o.updateWorldMatrix(true,true));raycaster.setFromCamera(ndc,camera);
    const hit=raycaster.intersectObjects(objects,true)[0],sea=raycaster.ray.intersectPlane(water,waterPoint);
    // The seabed is below the selectable water surface. Keep the surface point
    // under the cursor instead of selecting a different tile behind it.
    if(hit&&(!sea||hit.distance<=raycaster.ray.origin.distanceTo(sea))){
      for(let object:T.Object3D|null=hit.object;object;object=object.parent){const id=owners.get(object);if(id)return id;}
    }
    const point=hit&&(!sea||hit.distance<=raycaster.ray.origin.distanceTo(sea))?hit.point:sea;
    return point?footprints.find(t=>tileInward(point.x-t.x,point.z-t.z,COMPOSITION_RADIUS)>=0)?.id:undefined;
  }

  canvas.addEventListener('pointerdown',event=>{
    clicked=undefined;
    pointers.add(event.pointerId);
    if(pointers.size>1){if(press)press.dragged=true;return;}
    if(event.button===0&&event.isPrimary)press={id:event.pointerId,x:event.clientX,y:event.clientY,dragged:false};
  },{signal});
  canvas.addEventListener('pointermove',event=>{
    if(press?.id===event.pointerId&&Math.hypot(event.clientX-press.x,event.clientY-press.y)>6)press.dragged=true;
  },{signal});
  canvas.addEventListener('pointerup',event=>{
    const click=press?.id===event.pointerId&&!press.dragged&&Math.hypot(event.clientX-press.x,event.clientY-press.y)<=6&&pointers.size===1&&event.button===0&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.shiftKey;
    pointers.delete(event.pointerId);if(press?.id===event.pointerId)press=undefined;
    clicked=click?pick(event.clientX,event.clientY):undefined;
  },{signal});
  // Open on the completed click, not pointerup: otherwise that same click can
  // land on the newly opened dialog's backdrop and immediately dismiss it.
  canvas.addEventListener('click',()=>{const id=clicked;clicked=undefined;if(id)select(id);},{signal});
  canvas.addEventListener('pointercancel',event=>{pointers.delete(event.pointerId);if(press?.id===event.pointerId)press=undefined;},{signal});
  canvas.addEventListener('wheel',()=>{if(press)press.dragged=true;},{signal,passive:true});
  window.addEventListener('blur',()=>{pointers.clear();press=undefined;clicked=undefined;},{signal});
}
