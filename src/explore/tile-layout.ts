export interface Axial { q:number; r:number }
export const HEX_RADIUS=400;
export const HEX_WIDTH=Math.sqrt(3)*HEX_RADIUS;
export const HEX_DIRECTIONS=[[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]] as const;
export const hexCenter=(q:number,r:number)=>({x:HEX_WIDTH*(q+r/2),z:HEX_RADIUS*1.5*r});
export const hexDistance=(a:Axial,b:Axial={q:0,r:0})=>Math.max(Math.abs(a.q-b.q),Math.abs(a.r-b.r),Math.abs(a.q+a.r-b.q-b.r));
const round=(n:number)=>Math.round(n*1e6)/1e6;
export function hexCorners(q:number,r:number) {
  const c=hexCenter(q,r);return Array.from({length:6},(_,i)=>{const a=(60*i-30)*Math.PI/180;return{x:round(c.x+HEX_RADIUS*Math.cos(a)),z:round(c.z+HEX_RADIUS*Math.sin(a))};});
}
export function hexRing(radius:number):Axial[] {
  const ring:Axial[]=[];
  for(let q=-radius;q<=radius;q++)for(let r=-radius;r<=radius;r++)if(hexDistance({q,r})===radius)ring.push({q,r});
  return ring.sort((a,b)=>{const x=hexCenter(a.q,a.r),y=hexCenter(b.q,b.r);return Math.atan2(x.z,x.x)-Math.atan2(y.z,y.x);});
}
/** Fill the first incomplete ring around (0,0) before opening a more distant ring.
 * These slots are ocean, not terrain or additional playable levels. */
export function expansionRing(occupied:readonly Axial[]) {
  const used=new Set(occupied.map(p=>`${p.q},${p.r}`));
  for(let radius=1;;radius++) {
    const slots=hexRing(radius).filter(p=>!used.has(`${p.q},${p.r}`));
    if(slots.length)return{radius,slots};
  }
}
