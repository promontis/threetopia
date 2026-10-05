export const CONTRACT_VERSION:number;
export const TILE_RADIUS:number;
export const MAP_SCALE:number;
export const SLOT:{radius:number;height:number;floorY:number;mapRadius:number;mapHeight:number};
export const DIRECTIONS:number[][];
export interface OpenWaterRequirement {id:string;reason:string;oceanConnected:boolean;cells:Array<{q:number;r:number}>}
export interface TileSource {q:number;r:number;title:string;id:string;rotation?:number;requiredOpenWater?:OpenWaterRequirement[]}
export interface WaterProtection {id:string;reason:string;oceanConnected:boolean;source:{id:string;title:string;q:number;r:number}}
export interface TileSlot {q:number;r:number;ring:number;status:string;protection?:WaterProtection}
export const ORIGINAL_TILES:TileSource[];
export interface TileVariant {id:string;family:string;title:string;color:string;relief?:number;seed?:number;ridges?:number;orientation:number;layout?:string;description:string}
export const TILE_VARIANTS:TileVariant[];
export function ring(q:number,r:number):number;
export function centre(q:number,r:number,scale?:number):{x:number;z:number};
export function coordinates(radius:number):Array<{q:number;r:number;ring:number}>;
export function tileSlots(occupied:Array<{q:number;r:number}>,reservations?:Array<{q:number;r:number}>):TileSlot[];
export function protectedWaterTiles(sources?:TileSource[]):Array<{q:number;r:number;protection:WaterProtection}>;
export function waterProtectionAt(q:number,r:number):WaterProtection|undefined;
export function protectedWaterIssue(tile:{q:number;r:number}):string|null;
export function canonicalTile(q:number,r:number,variantId:string,rotation?:number,legacyEdges?:number[],version?:number):any;
export function tileContract(q:number,r:number,variantId:string,rotation?:number,legacyEdges?:number[],version?:number):Promise<any>;
export function verifyTile(tile:any):Promise<boolean>;
export function canonicalJSON(value:any):string;
export function sha256(bytes:string|BufferSource):Promise<string>;
export function corners(radius?:number):number[][];
export function terrainHeight(x:number,z:number,recipe:TileVariant,boundaries?:number[][]):number;

export const LEGACY_VARIANTS:TileVariant[];
export const LAYOUTS:Array<{id:string;title:string;description:string;wet:number[];rivers:number[];regions:number[][];styles:string[]}>;
export const STYLES:Record<string,{title:string;land:string;sand:string;rock:string;path:string}>;
export interface TileChoice {variant:string;rotation:number;legacyEdges:number[]}
export function compatibleChoices(q:number,r:number,tiles?:any[],options?:{lookahead?:boolean}):TileChoice[];
export function placementIssue(tile:any,tiles?:any[],options?:{checkNeighbors?:boolean}):string|null;
export function hostHeight(tile:any,x:number,z:number,options?:{paths?:boolean}):number;
export function contentOrigin(tile:any):{x:number;y:number;z:number};
export function buildContains(tile:any,points:number[][],role?:string):boolean;
export function tileFootprint(tile:any):{channels:number[][][];routes:number[][][]};

export const BUILTIN_TILES:any[];
export function builtinTile(id:string):any;
