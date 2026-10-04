import * as T from 'three';

/** Bake the host's actual coastline once. R is bed height, GB point offshore,
 * A is shore distance in map metres. This keeps surf fronts attached to the
 * coast, including river bends, without tracing the terrain every frame. */
export function createWaterBathymetry(heightAt:(x:number,z:number)=>number,bounds:{x:number;z:number;width:number;depth:number},size=512){
  const data=new Float32Array(size*size*4),distance=new Float32Array(size*size);
  const dx=bounds.width/size,dz=bounds.depth/size,diagonal=Math.hypot(dx,dz);
  for(let z=0;z<size;z++)for(let x=0;x<size;x++){
    const i=z*size+x,h=heightAt(bounds.x+(x+.5)*dx,bounds.z+(z+.5)*dz);
    data[i*4]=h;distance[i]=h>=0?0:1000;
  }
  // Two-pass eight-neighbour distance transform; no shoreline meshes or
  // per-frame simulations. Submerged flat shelves also get a valid distance.
  for(let z=0;z<size;z++)for(let x=0;x<size;x++){
    const i=z*size+x;let d=distance[i];
    if(x>0)d=Math.min(d,distance[i-1]+dx);
    if(z>0){d=Math.min(d,distance[i-size]+dz);if(x>0)d=Math.min(d,distance[i-size-1]+diagonal);if(x<size-1)d=Math.min(d,distance[i-size+1]+diagonal);}
    distance[i]=d;
  }
  for(let z=size-1;z>=0;z--)for(let x=size-1;x>=0;x--){
    const i=z*size+x;let d=distance[i];
    if(x<size-1)d=Math.min(d,distance[i+1]+dx);
    if(z<size-1){d=Math.min(d,distance[i+size]+dz);if(x>0)d=Math.min(d,distance[i+size-1]+diagonal);if(x<size-1)d=Math.min(d,distance[i+size+1]+diagonal);}
    distance[i]=d;
  }
  for(let z=0;z<size;z++)for(let x=0;x<size;x++){
    const i=z*size+x,k=i*4;
    const gx=(distance[z*size+Math.min(size-1,x+1)]-distance[z*size+Math.max(0,x-1)])/(2*dx);
    const gz=(distance[Math.min(size-1,z+1)*size+x]-distance[Math.max(0,z-1)*size+x])/(2*dz),length=Math.max(.001,Math.hypot(gx,gz));
    data[k+1]=gx/length;data[k+2]=gz/length;data[k+3]=Math.max(0,distance[i]-.5*Math.min(dx,dz));
  }
  const texture=new T.DataTexture(data,size,size,T.RGBAFormat,T.FloatType);
  texture.name='Island depth and shore-distance field';texture.minFilter=texture.magFilter=T.LinearFilter;texture.needsUpdate=true;
  return texture;
}
