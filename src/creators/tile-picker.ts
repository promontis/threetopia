import * as T from 'three';
import {centre,corners,MAP_SCALE,SLOT,TILE_RADIUS} from '../../packages/platform/tiles.js';

export interface PickerPanel {width:number;height:number;placement:'right'|'bottom';top?:number;bottom?:number}
export interface TileCoordinate {q:number;r:number}
const radius=TILE_RADIUS*MAP_SCALE;
const floor=SLOT.floorY*MAP_SCALE;
const focusHeight=1.4;

/** Available places have only an outline; an invisible face keeps the whole hex clickable. */
export function createBlankTile(tile:TileCoordinate&{status:'available'},drawnEdges=new Set<string>()){
  const c=centre(tile.q,tile.r,MAP_SCALE);
  const geometry=new T.CircleGeometry(radius,6,Math.PI/6).rotateX(-Math.PI/2);
  const mesh=new T.Mesh(geometry,new T.MeshBasicMaterial({visible:false}));
  mesh.name='Available tile';mesh.position.set(c.x,floor,c.z);
  mesh.userData={ghost:true,skipWaterCapture:true,...tile};
  const vertices=corners(radius).map(([x,z])=>new T.Vector3(x,0,z)),segments:T.Vector3[]=[];
  const key=(p:T.Vector3)=>`${Math.round((p.x+c.x)*1e5)},${Math.round((p.z+c.z)*1e5)}`;
  for(let i=0;i<6;i++){
    const a=vertices[i],b=vertices[(i+1)%6],edge=[key(a),key(b)].sort().join('|');
    if(!drawnEdges.has(edge)){drawnEdges.add(edge);segments.push(a,b);}
  }
  const outline=new T.LineSegments(new T.BufferGeometry().setFromPoints(segments),new T.LineBasicMaterial({color:'#d6eee8',transparent:true,opacity:.7,depthWrite:false,toneMapped:false}));
  outline.name='Available tile outline';outline.renderOrder=2;mesh.add(outline);
  return mesh;
}

// Include the terrain rim, with room for the tallest host variant, in the fit.
function tilePoints({q,r}:TileCoordinate){
  const c=centre(q,r,MAP_SCALE);
  return corners(radius).flatMap(([x,z])=>[0,focusHeight*2].map(y=>new T.Vector3(c.x+x,y,c.z+z)));
}

export const tileOverviewPoints=(tiles:TileCoordinate[])=>tiles.flatMap(({q,r})=>{
  const c=centre(q,r,MAP_SCALE);
  return corners(radius).map(([x,z])=>new T.Vector3(c.x+x,floor,c.z+z));
});

export function projectTileBounds(camera:T.OrthographicCamera,tile:TileCoordinate,width:number,height:number){
  camera.updateMatrixWorld();
  const points=tilePoints(tile).map(p=>p.project(camera));
  return {
    left:(Math.min(...points.map(p=>p.x))*.5+.5)*width,
    right:(Math.max(...points.map(p=>p.x))*.5+.5)*width,
    top:(.5-Math.max(...points.map(p=>p.y))*.5)*height,
    bottom:(.5-Math.min(...points.map(p=>p.y))*.5)*height,
  };
}

/** Keep the true tile center as the orbit pivot; frame beside the inspector.
 * A rotation-invariant bound fits every azimuth and tilt at one fixed zoom. */
export function fitTileView(camera:T.OrthographicCamera,tile:TileCoordinate,width:number,height:number,panel:PickerPanel,maxZoom:number){
  const c=centre(tile.q,tile.r,MAP_SCALE),pivot=new T.Vector3(c.x,focusHeight,c.z);
  const margin=24,gap=24,top=panel.top??margin,bottom=panel.bottom??margin,pixels=height/(camera.top-camera.bottom);
  const availableWidth=Math.max(120,width-margin*2-(panel.placement==='right'?panel.width+gap:0));
  const availableHeight=Math.max(24,height-top-bottom-(panel.placement==='bottom'?panel.height+gap:0));
  const diameter=2*Math.hypot(radius,focusHeight);
  const zoom=Math.max(.01,Math.min(maxZoom,availableWidth/(diameter*pixels),availableHeight/(diameter*pixels)));
  const screenX=margin+availableWidth/2,screenY=top+availableHeight/2;
  return {target:pivot,zoom,offset:new T.Vector2(.5-screenX/width,.5-screenY/height)};
}
