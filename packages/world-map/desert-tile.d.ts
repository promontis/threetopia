import type {Group,Mesh,LineLoop,Object3D,Texture} from 'three';
import type {TileRepresentation,TileDimensions,LandmarkMetrics,LandmarkLOD,SampledTileSurface} from './tile-slot.js';
export interface DesertTile {
  root:Group;terrain:Mesh;slot:Group;guide:LineLoop;water:Mesh|null;config:TileDimensions;representation:TileRepresentation;
  heightAt(x:number,z:number):number;
  mount(component:Object3D,metrics:LandmarkMetrics,lod?:LandmarkLOD):void;
  /** Disposes only host resources; the caller owns creator resources. */
  dispose():void;
}
export function createDesertTile(options?:{representation?:TileRepresentation;seed?:number;surface?:SampledTileSurface;waveTextures?:Texture[];time?:{value:number};compact?:boolean;biome?:'desert'|'coast'|'valley'|'city';sharedEdges?:number[]}):DesertTile;
export function measureLandmark(root:Object3D,bytes:number):LandmarkMetrics;
