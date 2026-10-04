import {LatestWorker} from './latest-worker';
import {restoreHost} from './host-geometry';
export function createHostLoader(){
 const jobs=new LatestWorker<any,any>(new Worker(new URL('./registry-host.worker.ts',import.meta.url),{type:'module'}));
 return {async load(contract:any,options:any={map:true}){const result=await jobs.run({contract,options});return result?restoreHost(result,options.map):null;},dispose(){jobs.dispose();}};
}
