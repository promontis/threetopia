import * as T from 'three';

export {createWaterSpectrum} from './ocean-fft';
import {OCEAN_PERIODS} from './ocean-spectrum-data';
export const WAVE_PERIOD=OCEAN_PERIODS[0],RIPPLE_PERIOD=OCEAN_PERIODS[2];
function seeded(seed:number){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}

/** One tiny static, mipmapped lookup for Tidewater-style gusts, bubbly foam
 * and seabed detail. Based on its SeaDetail.js / FoamTexture.js patterns.
 * No downloaded normal maps, animation atlases or per-frame CPU generation. */
export function createWaterPatterns(){
  const size=256,random=seeded(1203),lattice=Float32Array.from({length:256*256},random);
  const wrap=(n:number,m:number)=>(n%m+m)%m;
  function noise(x:number,y:number,period:number){
    const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
    const at=(dx:number,dy:number)=>lattice[wrap(iy+dy,period)*256+wrap(ix+dx,period)];
    return T.MathUtils.lerp(T.MathUtils.lerp(at(0,0),at(1,0),u),T.MathUtils.lerp(at(0,1),at(1,1),u),v);
  }
  function fbm(u:number,v:number,base:number){let sum=0,amplitude=.5,weight=0;for(let i=0;i<4;i++){const p=base*2**i;sum+=noise(u*p,v*p,p)*amplitude;weight+=amplitude;amplitude*=.5;}return sum/weight;}
  function cells(u:number,v:number,period:number){
    const x=u*period,y=v*period,ix=Math.floor(x),iy=Math.floor(y);let nearest=10,next=10;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
      const cx=wrap(ix+dx,period),cy=wrap(iy+dy,period),a=lattice[cy*256+cx],b=lattice[cx*256+cy+71];
      const d=(ix+dx+.12+.76*a-x)**2+(iy+dy+.12+.76*b-y)**2;
      if(d<nearest){next=nearest;nearest=d;}else next=Math.min(next,d);
    }
    return [Math.sqrt(nearest),Math.sqrt(next)-Math.sqrt(nearest)];
  }
  const data=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const u=(x+.5)/size,v=(y+.5)/size,n=fbm(u,v,4),warp=(n-.5)*.12;
    const a=cells(u+warp,v-warp,19),b=cells(u-warp+.31,v+warp+.71,43),k=(y*size+x)*4;
    const foam=T.MathUtils.clamp(fbm(u+warp,v-warp,8)*1.35-Math.max(0,.28-a[0])*1.6-Math.max(0,.22-b[0])*.8,0,1);
    data[k]=n*255;data[k+1]=foam*255;data[k+2]=Math.pow(1-T.MathUtils.clamp(a[1]*5,0,1),3)*255;data[k+3]=fbm(u+.43,v+.23,5)*255;
  }
  const texture=new T.DataTexture(data,size,size,T.RGBAFormat);
  texture.name='Sea gusts, foam lace and seabed detail';texture.wrapS=texture.wrapT=T.RepeatWrapping;
  texture.minFilter=T.LinearMipmapLinearFilter;texture.magFilter=T.LinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;
  return texture;
}
