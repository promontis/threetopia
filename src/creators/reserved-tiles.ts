import * as T from 'three';
import {centre,MAP_SCALE} from '../../packages/platform/tiles.js';
import {disposeObject} from '../../packages/platform/render.js';
import {softenMapShadows} from '../tiles/lite/shadows';
import {createConstructionSite} from './construction-site';
import type {TileCoordinate} from './tile-picker';

type Reservation={id:string;version?:string|null;contract:any;q:number;r:number};
type LoadHost=(contract:any,options:any)=>Promise<T.Group|null>;

/** Cache actual reserved hosts, then commit them with the matching water field. */
export function createReservedTiles(load:LoadHost){
  const cache=new Map<string,T.Group>();let active:T.Group[]=[],revision=0,disposed=false;
  return {
    get hosts(){return active;},
    async prepare(tiles:Reservation[],selected?:TileCoordinate){
      const ticket=++revision,next=new Map<string,T.Group>();
      for(const tile of tiles){
        if(tile.version||!tile.contract)continue;
        const key=JSON.stringify([tile.id,tile.contract]);
        let host=cache.get(key);
        if(!host){
          const loaded=await load(tile.contract,{map:true,lod:true});
          if(!loaded||disposed||ticket!==revision){if(loaded)disposeObject(loaded);return null;}
          host=loaded;const c=centre(tile.q,tile.r,MAP_SCALE);host.position.set(c.x,0,c.z);
          host.name=`Reserved: ${tile.contract.recipe.title}`;host.userData.reservationId=tile.id;
          host.add(createConstructionSite(tile.contract));softenMapShadows(host);cache.set(key,host);
        }
        next.set(key,host);
      }
      if(disposed||ticket!==revision)return null;
      const hosts=[...next.values()];
      return {hosts,contracts:hosts.map(host=>host.userData.contract),commit(parent:T.Group){
        if(disposed||ticket!==revision)return false;
        for(const [key,host] of cache)if(!next.has(key)){disposeObject(host);cache.delete(key);}
        for(const host of hosts){
          const guide=host.getObjectByName('Reserved build area'),tile=host.userData.contract;
          if(guide)guide.visible=tile.q===selected?.q&&tile.r===selected?.r;
          if(host.parent!==parent)parent.add(host);
        }
        active=hosts;return true;
      }};
    },
    dispose(){disposed=true;revision++;for(const host of cache.values())disposeObject(host);cache.clear();active=[];},
  };
}
