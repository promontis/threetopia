export const BOUNDS:{x:number;z:number;width:number;depth:number};
export function smooth(a:number,b:number,x:number):number;
export function mix(a:number,b:number,t:number):number;
export function noise(x:number,z:number):number;
export function random(seed?:number):()=>number;
export function riverX(z:number):number;
export function createLandscapeSampler(source:any,accessLanding?:boolean):{heightAt:(x:number,z:number)=>number;pathAt:(x:number,z:number)=>number;grassAt:(x:number,z:number)=>number};
