import {describe,it,expect} from 'vitest';
import {Vector3} from 'three';
import {createSakuraBoatRoute} from '../../src/tiles/lite/sakura-boat';

describe('Sakura riverboat route',()=>{
  const route=createSakuraBoatRoute();
  it('returns to the same position and heading without a reset or sudden turn',()=>{
    const a=new Vector3(),b=new Vector3(),da=new Vector3(),db=new Vector3();
    for(let t=0;t<route.duration;t+=.1){
      route.sample(t,a,da);route.sample(t+route.duration,b,db);
      expect(a.distanceTo(b)).toBeLessThan(1e-9);
      expect(da.dot(db)).toBeGreaterThan(.999999);
      route.sample(t+1/60,b,db);
      expect(a.distanceTo(b)*60).toBeCloseTo(route.speed,1);
      expect(da.dot(db)).toBeGreaterThan(.998);
    }
  });
  it('travels the river in both directions and makes visible turns at its ends',()=>{
    const p=new Vector3(),d=new Vector3();
    const bounds={north:Infinity,south:-Infinity};
    const bridgeHeadings:number[]=[],turns:number[]=[];
    for(let t=0;t<route.duration;t+=.05){
      route.sample(t,p,d);bounds.north=Math.min(bounds.north,p.z);bounds.south=Math.max(bounds.south,p.z);
      if(Math.abs(p.z+12.25)<.15)bridgeHeadings.push(d.z);
      if((p.z<-23||p.z>-5.5)&&Math.abs(d.x)>.95)turns.push(p.z);
    }
    expect(bounds.north).toBeLessThan(-23.5);expect(bounds.south).toBeGreaterThan(-5);
    expect(Math.min(...bridgeHeadings)).toBeLessThan(-.99);expect(Math.max(...bridgeHeadings)).toBeGreaterThan(.99);
    expect(turns.some(z=>z<-23)).toBe(true);expect(turns.some(z=>z>-5.5)).toBe(true);
  });
});
