import type {AtlasTile} from './index.js';
import type {ImageTileMap} from './image-format.js';
import type {Frame,Insets,SceneLimits} from './scene-camera.js';
export function imageTileFrame(tile:AtlasTile,map:ImageTileMap):Frame & {id:string};
export function imageLimits(tiles:AtlasTile[],maps:Map<string,ImageTileMap>,width:number,height:number,insets?:Insets):SceneLimits;
