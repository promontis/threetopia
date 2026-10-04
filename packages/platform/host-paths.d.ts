import type {MeshStandardMaterial,DataTexture} from 'three';
export function bakeHostPaths(tile:any,size?:number):{bytes:Uint8Array;size:number};
export function pathTexture(data:{bytes:Uint8Array;size:number}):DataTexture;
export function applyHostPaths(material:MeshStandardMaterial,texture:DataTexture,options?:{finish?:string;pathColor?:string;sand?:string}):void;
