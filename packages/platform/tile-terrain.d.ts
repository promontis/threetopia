export function hexDistance(x:number,z:number):number;
export function createTerrainField(contracts:any[],cache?:Map<string,Float32Array>):{hosts:Array<{tile:any;c:{x:number;z:number};sample:(x:number,z:number)=>number}>;heightAt:(x:number,z:number)=>number};
export function subtractHex(polygon:number[][],centre:{x:number;z:number}):number[][][];
