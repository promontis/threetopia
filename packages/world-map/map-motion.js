/** Shared time/quality rules. Stopped clocks never catch up on returning to the map. */
export const MAP_FPS = 30;
export function motionEnabled({motion,reduced,hidden,mini}) {
  return !!motion && !reduced && !hidden && !mini;
}
export function advanceMapTime(time,elapsedMs,active) {
  return active ? time + Math.max(0,Math.min(elapsedMs,100))/1000 : time;
}
export function mapPixelRatio(width,height,deviceRatio=1,mini=false) {
  // The single composition stays under 2.1 million pixels, including on Retina.
  return Math.min(mini?1:1.35,deviceRatio,Math.sqrt(2100000/Math.max(1,width*height)));
}
export function componentBounds(component,centre,exploded=false) {
  return {x:centre.x+component.position[0]+(.5-component.anchor[0])*component.size[0],
    y:centre.y+component.position[1]+(.5-component.anchor[1])*component.size[1]-(exploded?130:0),
    width:component.size[0],height:component.size[1]};
}

/** One scene clock drives all sprites, around their declared anchor. */
export function componentMotion(component,time) {
  const a=component.animation;
  if(!a)return {x:0,y:0,rotation:0,opacity:1};
  const cycle=Math.max(0,time-(a.delay??0))/a.duration;
  const phase=cycle%1;
  if(a.kind==='sway')return {x:0,y:0,rotation:Math.sin(cycle*Math.PI*2)*(a.rotate??0)*Math.PI/180,opacity:1};
  const amount=a.kind==='petals'?phase:(1-Math.cos(cycle*Math.PI))/2;
  return {x:a.travel[0]*amount,y:a.travel[1]*amount,rotation:(a.rotate??0)*amount*Math.PI/180,
    opacity:a.kind==='petals'?Math.min(1,phase/.15,(1-phase)/.2):1};
}
