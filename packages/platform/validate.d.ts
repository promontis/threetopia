export interface GeometryMetrics {triangles:number;drawCalls:number;bytes:number;textures:number;textureBytes:number;bounds:{radius:number;minY:number;maxY:number}}
export const BUDGETS:Record<string,{triangles:number;drawCalls:number;bytes:number;textures:number;textureBytes:number}>;
export const MAX_PACKAGE_BYTES:number;
export function validVersion(v:unknown):boolean;
export function validName(n:unknown):boolean;
export function validPath(p:unknown):boolean;
export function versionCompare(a:string,b:string):number;
export function validateManifest(m:any,tile?:any):Promise<string[]>;
export function inspectGLB(input:ArrayBuffer|Uint8Array,role?:string,tile?:any):GeometryMetrics;
