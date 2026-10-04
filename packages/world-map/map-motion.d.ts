export const MAP_FPS:30;
export function motionEnabled(state:{motion:boolean;reduced:boolean;hidden:boolean;mini:boolean}):boolean;
export function advanceMapTime(time:number,elapsedMs:number,active:boolean):number;
export function mapPixelRatio(width:number,height:number,deviceRatio?:number,mini?:boolean):number;
export function componentBounds(component:{position:readonly number[];size:readonly number[];anchor:readonly number[]},centre:{x:number;y:number},exploded?:boolean):{x:number;y:number;width:number;height:number};

export function componentMotion(component:{animation?:{kind:string;duration:number;delay?:number;travel:number[];rotate?:number}},time:number):{x:number;y:number;rotation:number;opacity:number};
