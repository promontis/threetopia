export const PROTECTED_WATER_ACCESS:{id:string;source:{q:number;r:number};edge:number;t:number;width:number;depth:number;clearance:number};
export function navigationGraph(tile:any):{ports:Array<{edge:number;t:number;component:number}>;componentAt:(x:number,z:number)=>number};
export function navigationIssue(candidate:any,rows?:any[]):string|null;
export function exteriorOcean(tiles:Array<{q:number;r:number}>):Set<string>;
