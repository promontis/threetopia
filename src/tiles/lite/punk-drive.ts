import {MathUtils,Vector3} from 'three';
import {createPunkRoad,PUNK_CAR_SCALE} from './punk-route';

export interface PunkDrivePose {
  position:Vector3;forward:Vector3;heading:number;steer:number;
  drift:number;boost:number;speed:number;distance:number;
}
export const createPunkDrivePose=():PunkDrivePose=>({position:new Vector3(),forward:new Vector3(),heading:0,steer:0,drift:0,boost:0,speed:0,distance:0});

/** Distance-indexed speed profile: smooth boosts without frame-rate-dependent
 * integration. Both LODs, wheel rotation and pause use this same map clock. */
export function createPunkDriveRoute(){
  const curve=createPunkRoad(),length=curve.getLength(),steps=2048,start=.53;
  const times=new Float64Array(steps+1),before=new Vector3(),after=new Vector3();
  const wrap=(n:number)=>((n%1)+1)%1;
  const boostAt=(phase:number)=>{
    const distance=Math.abs(wrap(phase-.53+.5)-.5);
    return 1-MathUtils.smoothstep(distance,.017,.079);
  };
  const speedAt=(phase:number)=>1.5+2*boostAt(phase);
  for(let i=1;i<=steps;i++)times[i]=times[i-1]+length/steps/speedAt(wrap(start+(i-.5)/steps));
  const duration=times[steps];
  function sample(time:number,out:PunkDrivePose){
    const laps=Math.floor(time/duration),local=time-laps*duration;
    let low=0,high=steps;
    while(high-low>1){const mid=(low+high)>>1;if(times[mid]<=local)low=mid;else high=mid;}
    const progress=(low+(local-times[low])/(times[high]-times[low]))/steps,phase=wrap(start+progress);
    curve.getPointAt(phase,out.position);curve.getTangentAt(phase,out.forward);
    const step=.006;
    curve.getTangentAt(wrap(phase-step),before);curve.getTangentAt(wrap(phase+step),after);
    const curvature=Math.atan2(before.z*after.x-before.x*after.z,before.dot(after))/(2*step*length);
    out.boost=boostAt(phase);out.speed=speedAt(phase);out.distance=(laps+progress)*length;
    out.drift=Math.sign(curvature)*.34*MathUtils.smoothstep(Math.abs(curvature),.17,.48)*(1-out.boost);
    out.heading=Math.atan2(out.forward.x,out.forward.z)+out.drift;
    out.steer=MathUtils.clamp(Math.atan(2.96318*PUNK_CAR_SCALE*curvature)-out.drift*1.65,-.55,.55);
    return out;
  }
  return {duration,length,sample};
}
