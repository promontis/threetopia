import * as T from 'three';
import {ImprovedNoise} from 'three/addons/math/ImprovedNoise.js';
import {gzipSync} from 'node:zlib';
import {mkdir,writeFile} from 'node:fs/promises';

// Adapted cumulus profiles and light marching from CK42BB/procedural-clouds-threejs
// (MIT, Kingsley). See public/licenses/procedural-clouds-threejs.txt.
const SIZE=96,VARIANTS=3,DEPTH_RANGE=2.5,YAW=.18;
type Puff=readonly [number,number,number,number,number,number];
const densityData=new Uint8Array(SIZE*SIZE*SIZE*VARIANTS);
const noise=new ImprovedNoise();
const smooth=(a:number,b:number,x:number)=>{const t=T.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
for(let variant=0;variant<VARIANTS;variant++){
  const puffs:Puff[]=[
    [-.42,-.27,.02,.39,.24,.37],[.04,-.28,.02,.48,.25,.41],[.51,-.29,-.02,.30,.22,.33],
    [-.19,-.12,.29,.29,.25,.28],[.30,-.08,-.23,.26,.30,.29],
  ];
  const crowns:Puff[][]=[
    [[-.46,-.02,.01,.28,.34,.31],[-.18,.18,-.05,.30,.45,.34],[.29,.06,.06,.32,.37,.36]],
    [[-.45,.12,-.02,.28,.43,.31],[-.06,-.04,.08,.28,.29,.38],[.35,.20,-.07,.27,.44,.31]],
    [[-.40,.23,-.08,.28,.45,.33],[.00,.10,.09,.31,.36,.36],[.46,-.06,.03,.24,.29,.29]],
  ];
  puffs.push(...crowns[variant]);
  // Smaller, offset billows give the silhouette a cauliflower edge;
  // their smooth union avoids individually visible intersecting spheres.
  puffs.slice(3).forEach(([x,y,z,rx,ry,rz],i)=>{
    for(let j=0;j<4;j++){
      const a=j*2.399+i*1.7+variant*.9,h=.12+((j+i)%3)*.31,r=Math.sqrt(1-h*h);
      const size=.13+((i+j+variant)%3)*.02;
      puffs.push([x+Math.cos(a)*rx*r*.94,y+ry*h*.95,z+Math.sin(a)*rz*r*.94,size,size*.95,size]);
    }
  });
  for(let z=1;z<SIZE-1;z++)for(let y=1;y<SIZE-1;y++)for(let x=1;x<SIZE-1;x++){
    const px=(x+.5)/SIZE*2-1,py=(y+.5)/SIZE*2-1,pz=(z+.5)/SIZE*2-1;
    let distance=2;
    for(const [cx,cy,cz,rx,ry,rz] of puffs){
      const dx=(px-cx)/rx,dy=(py-cy)/ry,dz=(pz-cz)/rz;
      const d=(Math.sqrt(dx*dx+dy*dy+dz*dz)-1)*Math.min(rx,ry,rz);
      const h=Math.max(.055-Math.abs(distance-d),0)/.055;
      distance=Math.min(distance,d)-h*h*.055*.25;
    }
    if(distance>.09)continue;
    const seed=variant*13.7;
    // Multi-scale erosion is prefiltered into the density volume instead
    // of evaluating expensive FBM at every view and light-march sample.
    let detail=0;
    for(let octave=0;octave<5;octave++){
      const frequency=4.3*2**octave;
      detail+=noise.noise(px*frequency+seed,py*frequency+19,pz*frequency-11)*(.076/2**octave);
    }
    const density=smooth(.024,-.026,distance+detail)*smooth(-.56,-.40,py);
    densityData[x+SIZE*(y+SIZE*(z+SIZE*variant))]=Math.round(density*255);
  }
}
// Bake optical depth along the fixed map sun as well. This replaces six
// secondary density lookups at every ray step with one paired texture fetch.
const sun=new T.Vector3(-.62,.74,.27).normalize().applyAxisAngle(new T.Vector3(0,1,0),-YAW);
sun.divide(new T.Vector3(1.55,1,1.03)).normalize();
const step=.035,volume=SIZE**3;
const atlas=new Uint8Array(volume*2*4);
function sample(x:number,y:number,z:number,variant:number){
  if(Math.min(x,y,z)<0||Math.max(x,y,z)>=SIZE-1)return 0;
  const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z),fx=x-ix,fy=y-iy,fz=z-iz;
  const at=(dx:number,dy:number,dz:number)=>densityData[ix+dx+SIZE*(iy+dy+SIZE*(iz+dz))+variant*volume];
  return T.MathUtils.lerp(
    T.MathUtils.lerp(T.MathUtils.lerp(at(0,0,0),at(1,0,0),fx),T.MathUtils.lerp(at(0,1,0),at(1,1,0),fx),fy),
    T.MathUtils.lerp(T.MathUtils.lerp(at(0,0,1),at(1,0,1),fx),T.MathUtils.lerp(at(0,1,1),at(1,1,1),fx),fy),fz)/255;
}
for(let variant=0;variant<VARIANTS;variant++)for(let z=0;z<SIZE;z++)for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++){
  const index=x+SIZE*(y+SIZE*z),density=densityData[index+variant*volume];
  if(!density)continue;
  let depth=0;
  for(let i=0;i<80;i++){
    const distance=(i+.5)*step*SIZE*.5;
    const px=x+sun.x*distance,py=y+sun.y*distance,pz=z+sun.z*distance;
    if(Math.min(px,py,pz)<0||Math.max(px,py,pz)>=SIZE-1)break;
    depth+=sample(px,py,pz,variant)*step;
  }
  const target=(index+Math.floor(variant/2)*volume)*4+(variant%2)*2;
  atlas[target]=density;atlas[target+1]=Math.round(Math.min(1,depth/DEPTH_RANGE)*255);
}
const output='public/map/lite/clouds';await mkdir(output,{recursive:true});
const compressed=gzipSync(atlas,{level:9});await writeFile(`${output}/cumulus.bin.gz`,compressed);
console.log(JSON.stringify({size:SIZE,variants:VARIANTS,textureBytes:atlas.byteLength,downloadBytes:compressed.byteLength}));
