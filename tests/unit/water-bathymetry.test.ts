import {describe,it,expect} from 'vitest';
import {createWaterBathymetry} from '../../src/tiles/lite/water-bathymetry';

describe('Map shoreline field',()=>{
  it('recovers distance and offshore direction on a known straight beach',()=>{
    const size=64,bounds={x:-4,z:-4,width:8,depth:8};
    const field=createWaterBathymetry(x=>-x*.3,bounds,size);
    try {
      const data=field.image.data as Float32Array;
      for(let z=8;z<56;z+=8)for(let x=34;x<60;x+=4){
        const worldX=-4+(x+.5)*8/size,k=(z*size+x)*4;
        expect(data[k]).toBeCloseTo(-worldX*.3,5);
        expect(data[k+1]).toBeCloseTo(1,5);expect(data[k+2]).toBeCloseTo(0,5);
        expect(data[k+3]).toBeCloseTo(worldX,5);
      }
    } finally {field.dispose();}
  });
  it('wraps curved shores without inventing seams, even on a flat underwater shelf',()=>{
    const size=128,bounds={x:-8,z:-8,width:16,depth:16};
    const field=createWaterBathymetry((x,z)=>Math.hypot(x,z)<2?.5:-1,bounds,size);
    try {
      const data=field.image.data as Float32Array;
      for(let i=0;i<24;i++){
        const angle=i*Math.PI/12,px=Math.cos(angle)*4,pz=Math.sin(angle)*4;
        const x=Math.floor((px+8)/16*size),z=Math.floor((pz+8)/16*size),k=(z*size+x)*4;
        expect(data[k+3]).toBeGreaterThan(1.75);expect(data[k+3]).toBeLessThan(2.35);
        expect(data[k+1]*Math.cos(angle)+data[k+2]*Math.sin(angle)).toBeGreaterThan(.85);
      }
      expect(Array.from(data).every(Number.isFinite)).toBe(true);
    } finally {field.dispose();}
  });
  it('keeps an all-water region finite and outside the surf zone',()=>{
    const field=createWaterBathymetry(()=>-10,{x:0,z:0,width:20,depth:20},32);
    try {
      const data=field.image.data as Float32Array;
      for(let i=0;i<data.length;i+=4){expect(data[i]).toBe(-10);expect(data[i+1]).toBe(0);expect(data[i+2]).toBe(0);expect(data[i+3]).toBeGreaterThan(20);}
    } finally {field.dispose();}
  });
});
