import {describe,it,expect} from 'vitest';
import {makeOceanSpectrum,oceanSpectralDensity,OCEAN_LENGTHS} from '../../src/tiles/lite/ocean-spectrum-data';

describe('Tidewater spectrum for the map',()=>{
  it('is finite, seeded and Hermitian, with no DC or Nyquist displacement',()=>{
    const n=32,data=makeOceanSpectrum(n);expect(data).toEqual(makeOceanSpectrum(n));expect(data.every(Number.isFinite)).toBe(true);
    for(let c=0;c<4;c++)for(let y=0;y<n;y++)for(let x=0;x<n;x++){
      const i=(c*n*n+y*n+x)*4,mirror=(c*n*n+(n-y)%n*n+(n-x)%n)*4;
      expect(data[i+2]).toBe(data[mirror]);expect(data[i+3]).toBe(-data[mirror+1]);
      if(x===0||y===0||(x===n/2&&y===n/2))expect(data[i]**2+data[i+1]**2).toBe(0);
    }
  });
  it('partitions wave energy into distinct bands and favours downwind waves',()=>{
    const n=64,data=makeOceanSpectrum(n);
    for(let c=0;c<4;c++){
      const dk=2*Math.PI/OCEAN_LENGTHS[c],low=c===0?.0001:dk*6,high=c===3?Infinity:2*Math.PI/OCEAN_LENGTHS[c+1]*6;let energy=0;
      for(let y=0;y<n;y++)for(let x=0;x<n;x++){
        const k=Math.hypot(x-n/2,y-n/2)*dk,i=(c*n*n+y*n+x)*4,power=data[i]**2+data[i+1]**2;
        if(k<low||k>=high)expect(power).toBe(0);energy+=power;
      }
      expect(energy).toBeGreaterThan(0);
    }
    const angle=25*Math.PI/180;
    expect(oceanSpectralDensity(.12,angle)).toBeGreaterThan(oceanSpectralDensity(.12,angle+Math.PI)*5);
    expect(oceanSpectralDensity(0,angle)).toBe(0);
  });
});
