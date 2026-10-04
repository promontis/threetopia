import * as T from 'three';

export const MAP_OVERVIEW_OFFSET=new T.Vector3(12,56,78).normalize().multiplyScalar(130);
const right=new T.Vector3().crossVectors(new T.Vector3(0,1,0),MAP_OVERVIEW_OFFSET).normalize();
const up=new T.Vector3().crossVectors(MAP_OVERVIEW_OFFSET,right).normalize();

export interface MapInsets {right:number;bottom:number}

/** Fit the tile outline into the canvas area left visible by the creator panel. */
export function fitMapOverview(points:readonly T.Vector3[],width:number,height:number,insets:MapInsets={right:0,bottom:0}){
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  for(const point of points){
    const x=point.dot(right),y=point.dot(up);
    minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
  }
  const visibleWidth=Math.max(1,width-insets.right),visibleHeight=Math.max(1,height-insets.bottom);
  const padding=Math.max(12,Math.min(24,Math.min(visibleWidth,visibleHeight)*.015));
  const span=Math.max((maxY-minY)*height/Math.max(1,visibleHeight-padding*2),(maxX-minX)*height/Math.max(1,visibleWidth-padding*2));
  const target=new T.Vector3(0,1.1,0),x=(minX+maxX)/2+insets.right*span/(2*height),y=(minY+maxY)/2-up.y*target.y-insets.bottom*span/(2*height);
  const determinant=right.x*up.z-right.z*up.x;
  target.x=(x*up.z-right.z*y)/determinant;
  target.z=(right.x*y-x*up.x)/determinant;
  return {span,target};
}
