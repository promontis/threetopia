import * as T from 'three';
import {riverX,smooth} from './landscape';
import {MAP_TILES,mapCentre} from './layout';
import {deformMapMesh,MAP_BOAT_BOB} from './materials';

const origin=mapCentre(MAP_TILES.find(tile=>tile.id==='sakura')!);
// Both GLBs retain their authored vertex positions. Share one pivot even
// though the overview mesh omits the long, thin tip at the front of the boat.
export const SAKURA_BOAT_ANCHOR={x:-1.5,z:3.893};
export const SAKURA_BOAT_SCALE=.75;

function addHullWaterMask(boat:T.Mesh,time:{value:number}){
  const section=boat.userData.waterMask as {y:number;outline:number[][]}|undefined;if(!section)return;
  const geometry=new T.BufferGeometry(),indices:number[]=[];
  geometry.setAttribute('position',new T.Float32BufferAttribute(section.outline.flatMap(([x,z])=>[x,section.y,z]),3));
  for(let i=1;i<section.outline.length-1;i++)indices.push(0,i,i+1);geometry.setIndex(indices);
  // Draw only depth, after the wooden interior and before the transparent
  // river. The cap follows the exact hull opening and adds no visible surface.
  const material=new T.MeshBasicMaterial({colorWrite:false,depthWrite:true,transparent:true,side:T.DoubleSide});material.forceSinglePass=true;
  const mask=new T.Mesh(geometry,material);mask.name='Sakura hull water exclusion';mask.renderOrder=-2;
  mask.userData.skipWaterCapture=true;mask.raycast=()=>{};
  deformMapMesh(mask,time,'sakura-hull-water-mask-v1',MAP_BOAT_BOB);boat.add(mask);
}

/** A closed, arc-length-parametrised journey through the actual riverbed. */
export function createSakuraBoatRoute(){
  const north=-23,south=-5.5,radius=.6,points:T.Vector3[]=[];
  const lane=(z:number,side:number)=>{
    // Both directions use the same opening between the bridge's centre and
    // eastern piles. Keep the entire hull straight while it passes beneath it.
    const bridge=smooth(-17,-14.5,z)*(1-smooth(-10.3,-7,z));
    return new T.Vector3(T.MathUtils.lerp(riverX(z)+side*radius,origin.x-1.4,bridge),0,z);
  };
  for(let z=south;z>north;z-=.4)points.push(lane(z,-1));
  for(let i=0;i<=12;i++){
    const angle=Math.PI+i*Math.PI/12;
    points.push(new T.Vector3(riverX(north)+radius*Math.cos(angle),0,north+radius*Math.sin(angle)));
  }
  for(let z=north+.4;z<south;z+=.4)points.push(lane(z,1));
  for(let i=0;i<12;i++){
    const angle=i*Math.PI/12;
    points.push(new T.Vector3(riverX(south)+radius*Math.cos(angle),0,south+radius*Math.sin(angle)));
  }
  const curve=new T.CatmullRomCurve3(points,true,'centripetal');
  curve.arcLengthDivisions=2048;curve.updateArcLengths();
  const speed=.24,duration=curve.getLength()/speed;
  return {duration,speed,sample(seconds:number,position:T.Vector3,forward:T.Vector3){
    // Start just south of the bridge. Wrapping distance also wraps the tangent,
    // so neither the boat's position nor its heading snaps between journeys.
    const phase=((seconds/duration+.13)%1+1)%1;
    curve.getPointAt(phase,position);curve.getTangentAt(phase,forward);
  }};
}

/** Host-owned transforms keep rendering, picking and both LODs in step. */
export function createSakuraBoatMotion(roots:readonly T.Object3D[],time:{value:number}){
  const boats:T.Mesh[]=[],route=createSakuraBoatRoute();
  for(const root of roots)root.traverse(object=>{
    if((object as T.Mesh).isMesh&&object.userData.role==='boat'){
      object.scale.setScalar(SAKURA_BOAT_SCALE);boats.push(object as T.Mesh);addHullWaterMask(object as T.Mesh,time);
    }
  });
  const position=new T.Vector3(),forward=new T.Vector3();
  function update(){
    route.sample(time.value,position,forward);
    // The native bow faces -Z. Rotate around its common authored pivot, not
    // the tile origin. Scale the pivot offset too, keeping the smaller hull
    // centred on its route and its base at the waterline through every turn.
    const heading=Math.atan2(-forward.x,-forward.z),c=Math.cos(heading),s=Math.sin(heading);
    const {x,z}=SAKURA_BOAT_ANCHOR;
    for(const boat of boats){
      boat.rotation.y=heading;
      boat.position.set(position.x-origin.x-(x*c+z*s)*SAKURA_BOAT_SCALE,-(boat.userData.waterline??0)*SAKURA_BOAT_SCALE,position.z-origin.z+(x*s-z*c)*SAKURA_BOAT_SCALE);
    }
  }
  update();
  return {update,position,forward,duration:route.duration};
}
