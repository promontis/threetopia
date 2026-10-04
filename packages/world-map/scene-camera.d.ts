export const MAP_YAW:number,MAP_ELEVATION:number,CAMERA_DIRECTION:number[];
export interface Frame {x0:number;x1:number;y0:number;y1:number;x:number;y:number;width:number;height:number}
export interface Insets {top:number;right:number;bottom:number;left:number}
export interface SceneLimits {minSpan:number;maxSpan:number;aspect:number;area:Frame;frames:Frame[];insets:Insets;width:number;height:number}
export function projectScene(x:number,y:number,z:number):{x:number;y:number};
export function unprojectScene(x:number,y:number):{x:number;z:number};
export function tileFrame(tile:{q:number;r:number;minHeight?:number;maxHeight?:number}):Frame;
export function sceneLimits(tiles:{q:number;r:number;minHeight?:number;maxHeight?:number}[],width:number,height:number,insets?:Insets):SceneLimits;
export function frameCenter(frame:Frame,span:number,limits:SceneLimits):{x:number;y:number};
export function clampSceneView(view:{x:number;y:number;span:number},limits:SceneLimits):{x:number;y:number;span:number};

export function bounds(points:{x:number;y:number}[]):Frame;
export function cameraLimits(frames:Frame[],width:number,height:number,insets?:Insets):SceneLimits;
