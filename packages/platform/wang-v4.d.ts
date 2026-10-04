export function createDesignTile(q:number,r:number,id:string,rotation?:number,legacyEdges?:number[]):any;
export function rotate(p:number[],r:number):[number,number];
export function rawHeight(tile:any,x:number,z:number):number;
export function designHeight(tile:any,x:number,z:number,options?:{paths?:boolean}):number;
export function designFootprint(tile:any):{channels:number[][][];routes:number[][][]};
export function waterDistance(tile:any,x:number,z:number):number;
export function hexInset(x:number,z:number):number;
