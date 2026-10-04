import {CatmullRomCurve3,Vector3} from 'three';

/** Shared by the offline road builder and the host's driving animation. */
export const PUNK_ROAD_WIDTH=1.0;
export const PUNK_ROAD_Y=.065;
export const PUNK_CAR_SCALE=.22;
export function createPunkRoad(){
  const points=[[0,-5.45],[3.05,-5.3],[4.65,-3.25],[4.95,-1.1],[4.4,1.3],[2.7,2.4],[0,2.45],[-2.7,2.4],[-4.4,1.3],[-4.95,-1.1],[-4.65,-3.25],[-3.05,-5.3]];
  const curve=new CatmullRomCurve3(points.map(([x,z])=>new Vector3(x,PUNK_ROAD_Y,z)),true,'centripetal');
  curve.arcLengthDivisions=2048;curve.updateArcLengths();return curve;
}
