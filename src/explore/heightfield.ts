export interface Heightfield {
  data:Float32Array; nx:number; nz:number; step:number;
  bounds:[number,number,number,number];
}
export const clamp = (value:number,min:number,max:number) => Math.max(min,Math.min(max,value));
export const smooth = (a:number,b:number,value:number) => {const t=clamp((value-a)/(b-a),0,1);return t*t*(3-2*t);};
export const lerp = (a:number,b:number,t:number) => a+(b-a)*t;

export function sampleHeightfield(field:Heightfield,x:number,z:number):number {
  const fx=clamp((x-field.bounds[0])/field.step,0,field.nx-1),fz=clamp((z-field.bounds[1])/field.step,0,field.nz-1);
  const ix=Math.min(field.nx-2,Math.floor(fx)),iz=Math.min(field.nz-2,Math.floor(fz));
  const u=fx-ix,v=fz-iz,i=iz*field.nx+ix;
  return lerp(lerp(field.data[i],field.data[i+1],u),lerp(field.data[i+field.nx],field.data[i+field.nx+1],u),v);
}

export function edgeWeight(bounds:readonly number[],x:number,z:number,blend=45):number {
  const inside=Math.min(x-bounds[0],bounds[2]-x,z-bounds[1],bounds[3]-z);
  return smooth(0,blend,inside);
}

export async function fetchBytes(url:string,signal?:AbortSignal):Promise<ArrayBuffer> {
  const response=await fetch(url,{signal});
  if(!response.ok)throw new Error(`Could not load ${url} (${response.status})`);
  const bytes=await response.arrayBuffer();
  // Some hosts transparently decode gzip assets; use the signature, not their URL.
  const header=new Uint8Array(bytes,0,Math.min(bytes.byteLength,2));
  if(header[0]===31&&header[1]===139) return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  return bytes;
}

export function nearestSegment(x:number,z:number,a:{x:number;z:number},b:{x:number;z:number}) {
  const dx=b.x-a.x,dz=b.z-a.z;
  const t=clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz||1),0,1);
  return {t,distance:Math.hypot(x-a.x-dx*t,z-a.z-dz*t)};
}
