export const BUILTIN_TILES:any[];
export function builtinTile(id:string):any;
export const authoredLandscape:ReturnType<typeof import('./authored-landscape.js').createLandscapeSampler>;
export function authoredSample(tile:any,x:number,z:number):{height:number;path:number;grass:number};
export function reverseEdge(edge:any):any;
