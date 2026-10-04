export type MapPair=[number,number];
export interface LayerPlacement {position:MapPair;size:MapPair;anchor:MapPair}
export interface ImageLayer extends LayerPlacement {src:string;preview?:string;crop?:[number,number,number,number]}
export interface ComponentMetadata {id:string;label:string;opacity?:number;order?:number}
export interface ImageAnimation {kind:'float'|'sail'|'drift'|'petals'|'sway';duration:number;travel:MapPair;rotate?:number;delay?:number}
export interface MapEffect {kind:'cloud'|'waterfall'|'ripple'|'light'|'foliage';speed?:number;seed?:number;color?:string;travel?:MapPair;grounded?:boolean;isolated?:boolean}
export type ImageComponent = ComponentMetadata & (
  (ImageLayer & {animation?:ImageAnimation;effect?:MapEffect & {kind:'waterfall'|'ripple'|'light'|'foliage'}}) |
  (LayerPlacement & {effect:MapEffect & {kind:'cloud'};src?:never;animation?:never})
);
export interface ImageLandmark {id:string;label:string;position:MapPair}
export interface ImageTileMap {version:2;kind:'image-tile';origin:'tile-centre';radius:400;capture?:{kind:'world-render';revision:string;source:{kind:'runtime';id:string};camera:{yaw:-20;elevation:45;projection:'orthographic'}};terrain:ImageLayer;components:ImageComponent[];landmarks:ImageLandmark[]}
export const IMAGE_MAP_BUDGET:Readonly<{jsonBytes:65536;components:32;landmarks:32;assetBytes:2097152}>;
export function projectMap(x:number,z:number,height?:number):{x:number;y:number};
export function unprojectMap(x:number,y:number):{x:number;z:number};
export function validateImageMap(map:unknown):string[];
export function defineImageMap<T extends ImageTileMap>(map:T):T;
export function starterImageMap(src?:string):ImageTileMap;
