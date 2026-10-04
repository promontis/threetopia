// Dan Greenheck's Tidewater OceanFFT.js (MIT), adapted to a compact map.
// These are its Horvath/JONSWAP, TMA and directional-spreading equations.
// Original source and license: packages/world-sources/tidewater/.
export const OCEAN_FFT_SIZE=256;
export const OCEAN_SCALE=.16;
export const OCEAN_LENGTHS=[733,157,33.3,7.1] as const;
export const OCEAN_PERIODS=OCEAN_LENGTHS.map(length=>length*OCEAN_SCALE);
// Miniature sea state: let the rolling swell read at map distance, while the
// shortest cascades retain surface texture without dominating every pixel.
export const OCEAN_GAINS=[1.45,1.1,.65,.4] as const;
const TAU=Math.PI*2,G=9.81;
type WaveSystem={scale:number;wind:number;angle:number;fetch:number;spread:number;swell:number;fade:number};
const systems:WaveSystem[]=[
  {scale:1,wind:7,angle:25,fetch:120,spread:.85,swell:.05,fade:.01},
  {scale:.48,wind:6,angle:5,fetch:1200,spread:1,swell:.9,fade:.1},
];
function pcg(value:number){const state=(Math.imul(value,747796405)+2891336453)>>>0,word=Math.imul((state>>>((state>>>28)+4))^state,277803737);return ((word>>>22)^word)>>>0;}
const unit=(seed:number)=>((pcg(seed)>>>8)+.5)/16777216;

export function oceanSpectralDensity(k:number,theta:number){
  if(k===0)return 0;
  const depth=500,kd=Math.min(k*depth,20),omega=Math.sqrt(G*k*Math.tanh(kd)),omegaH=omega*Math.sqrt(depth/G);
  const tma=omegaH<=1?.5*omegaH**2:omegaH<2?1-.5*(2-omegaH)**2:1;
  let energy=0;
  for(const system of systems){
    const fetch=system.fetch*1000,alpha=.076*(G*fetch/system.wind**2)**(-.22),peak=22*(system.wind*fetch/G**2)**(-.33);
    const sigma=omega<=peak?.07:.09,r=Math.exp(-(((omega-peak)/(sigma*peak))**2)/2);
    const jonswap=system.scale*tma*alpha*G**2/omega**5*Math.exp(-1.25*(peak/omega)**4)*3.3**r;
    const ratio=omega/peak,spread=(omega>peak?9.77*ratio**(-2.5):6.97*ratio**5)+Math.tanh(Math.min(ratio,20))*16*system.swell**2;
    const normalization=spread<5?-.000564*spread**4+.00776*spread**3-.044*spread**2+.192*spread+.163:
      -4.80e-8*spread**4+1.07e-5*spread**3-9.53e-4*spread**2+.059*spread+.393;
    const angle=theta-system.angle*Math.PI/180,cos=Math.cos(angle);
    const direction=(1-system.spread)*cos**2*2/Math.PI*(cos>0?1:0)+system.spread*normalization*Math.abs(Math.cos(angle/2))**(spread*2);
    energy+=jonswap*direction*Math.exp(-(system.fade**2)*k*k);
  }
  const derivative=.5*G*(depth*k/Math.cosh(kd)**2+Math.tanh(kd))/omega;
  return Math.max(0,energy)*derivative/k;
}

/** h0(k), conjugate(h0(-k)), packed into a vertical four-cascade atlas.
 * Generated once. Every subsequent simulation step runs on the GPU. */
export function makeOceanSpectrum(size=OCEAN_FFT_SIZE){
  const data=new Float32Array(size*size*OCEAN_LENGTHS.length*4),half=size/2;
  for(let c=0;c<OCEAN_LENGTHS.length;c++){
    const dk=TAU/OCEAN_LENGTHS[c],low=c===0?.0001:dk*6,high=c===OCEAN_LENGTHS.length-1?Infinity:TAU/OCEAN_LENGTHS[c+1]*6;
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){
      const kx=(x-half)*dk,kz=(y-half)*dk,k=Math.hypot(kx,kz);
      // Band boundaries do not overlap. Zero the self-conjugate Nyquist axes
      // so differentiation cannot introduce an imaginary spatial residual.
      if(x===0||y===0||k<low||k>=high)continue;
      const index=c*size*size+y*size+x,amplitude=.5*Math.sqrt(oceanSpectralDensity(k,Math.atan2(kz,kx))*dk*dk);
      const seed=index*4+1337*7919,radius=Math.sqrt(-2*Math.log(unit(seed))),angle=TAU*unit(seed+1);
      data[index*4]=radius*Math.cos(angle)*amplitude;data[index*4+1]=radius*Math.sin(angle)*amplitude;
    }
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){
      const index=(c*size*size+y*size+x)*4,mirror=(c*size*size+(size-y)%size*size+(size-x)%size)*4;
      data[index+2]=data[mirror];data[index+3]=-data[mirror+1];
    }
  }
  return data;
}
