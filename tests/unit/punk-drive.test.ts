import {describe,it,expect} from 'vitest';
import {createPunkDrivePose,createPunkDriveRoute} from '../../src/tiles/lite/punk-drive';

describe('Punk driving choreography',()=>{
  const route=createPunkDriveRoute();
  it('loops continuously and samples the same pose independently of frame rate',()=>{
    const a=createPunkDrivePose(),b=createPunkDrivePose();
    for(let time=0;time<route.duration;time+=.05){
      route.sample(time,a);route.sample(time+route.duration,b);
      expect(a.position.distanceTo(b.position)).toBeLessThan(1e-8);
      expect(Math.cos(a.heading-b.heading)).toBeGreaterThan(.999999);
      expect(b.distance-a.distance).toBeCloseTo(route.length,8);
      route.sample(time+1/120,b);
      expect(a.position.distanceTo(b.position)*120).toBeCloseTo(a.speed,1);
      expect(Math.cos(a.heading-b.heading)).toBeGreaterThan(.994);
    }
  });
  it('drifts with countersteer in corners and briefly boosts on the straight',()=>{
    const pose=createPunkDrivePose(),speeds:number[]=[],drifts:number[]=[];
    let boosting=0,countersteering=0;
    for(let time=0;time<route.duration;time+=.05){
      route.sample(time,pose);speeds.push(pose.speed);drifts.push(Math.abs(pose.drift));
      if(Math.abs(pose.drift)>.25&&pose.steer*pose.drift<0)countersteering++;
      if(pose.boost>.8){boosting++;expect(Math.abs(pose.drift)).toBeLessThan(.04);}
    }
    expect(Math.max(...speeds)).toBeGreaterThan(3.4);expect(Math.min(...speeds)).toBe(1.5);
    expect(Math.max(...drifts)).toBeGreaterThan(.3);expect(countersteering).toBeGreaterThan(20);
    expect(boosting).toBeGreaterThan(5);expect(boosting*.05/route.duration).toBeLessThan(.15);
  });
});
