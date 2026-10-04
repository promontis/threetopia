import type {Color} from 'three';
export function createTileSurface(tile:any):{pathAt:(x:number,z:number)=>number;sand:string;heightAt:(x:number,z:number)=>number;colorAt:(x:number,z:number,y?:number,slope?:number)=>Color};
export function backgroundColor(x:number,z:number,y:number):Color;
