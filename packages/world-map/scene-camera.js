import {hexCorners} from './index.js';

// One camera orientation, in metres, shared by rendering, labels and fit calculations.
export const MAP_YAW = -20 * Math.PI / 180;
export const MAP_ELEVATION = 45 * Math.PI / 180;
const sy=Math.sin(MAP_YAW),cy=Math.cos(MAP_YAW),se=Math.sin(MAP_ELEVATION),ce=Math.cos(MAP_ELEVATION);
export const CAMERA_DIRECTION = [sy*ce,se,cy*ce];
export function projectScene(x,y,z){return {x:cy*x-sy*z,y:sy*se*x-ce*y+cy*se*z};}
export function unprojectScene(x,y){return {x:cy*x+sy*y/se,z:-sy*x+cy*y/se};}
export function tileFrame(tile){
  const points=hexCorners(tile.q,tile.r).flatMap(([x,z])=>[projectScene(x,tile.minHeight??-12,z),projectScene(x,tile.maxHeight??180,z)]);
  return bounds(points);
}
export function bounds(points){
  const x0=Math.min(...points.map(p=>p.x)),x1=Math.max(...points.map(p=>p.x)),y0=Math.min(...points.map(p=>p.y)),y1=Math.max(...points.map(p=>p.y));
  return {x0,x1,y0,y1,x:(x0+x1)/2,y:(y0+y1)/2,width:x1-x0,height:y1-y0};
}
/** Span is the visible vertical distance. Insets reserve room for map controls. */
export function sceneLimits(tiles,width,height,insets={top:0,right:0,bottom:0,left:0}){
  if(!tiles.length)throw Error('A scene map needs at least one occupied tile.');
  return cameraLimits(tiles.map(tileFrame),width,height,insets);
}
export function cameraLimits(frames,width,height,insets={top:0,right:0,bottom:0,left:0}){
  const aspect=Math.max(1,width)/Math.max(1,height);
  const area=bounds(frames.flatMap(f=>[{x:f.x0,y:f.y0},{x:f.x1,y:f.y1}]));
  const usableWidth=Math.max(.2,1-(insets.left+insets.right)/Math.max(1,width));
  const usableHeight=Math.max(.2,1-(insets.top+insets.bottom)/Math.max(1,height));
  const fit=f=>Math.max(f.height/usableHeight,f.width/aspect/usableWidth)*1.06;
  const minSpan=Math.max(...frames.map(fit)),maxSpan=Math.max(minSpan,fit(area));
  return {minSpan,maxSpan,aspect,area,frames,insets,width,height};
}
export function frameCenter(frame,span,limits){
  const i=limits.insets;
  return {x:frame.x+(i.right-i.left)/limits.width*span*limits.aspect/2,y:frame.y+(i.bottom-i.top)/limits.height*span/2};
}
export function clampSceneView(view,limits){
  const span=Math.max(limits.minSpan,Math.min(limits.maxSpan,view.span));
  const overview=frameCenter(limits.area,span,limits);
  const ratio=limits.maxSpan===limits.minSpan?0:(limits.maxSpan-span)/(limits.maxSpan-limits.minSpan);
  const centers=limits.frames.map(f=>frameCenter(f,span,limits));
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  // At the overview limit panning stops. At tile scale every tile can be centred.
  return {span,x:clamp(view.x,overview.x+(Math.min(...centers.map(c=>c.x))-overview.x)*ratio,overview.x+(Math.max(...centers.map(c=>c.x))-overview.x)*ratio),y:clamp(view.y,overview.y+(Math.min(...centers.map(c=>c.y))-overview.y)*ratio,overview.y+(Math.max(...centers.map(c=>c.y))-overview.y)*ratio)};
}
