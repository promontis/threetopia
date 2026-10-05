import type {Color,Group} from 'three';
export function createBiomeSampler(tiles:any[]):{
  colorAt(tile:any,x:number,z:number,height:number):Color|null;
  signatureFor(tile:any):string;
};
export function blendHostBiomes(roots:Group[],options?:{map?:boolean}):void;
