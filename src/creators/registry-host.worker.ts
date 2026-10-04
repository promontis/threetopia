import {createHostTile,disposeObject} from '../../packages/platform/render.js';
import {serializeHost} from './host-geometry';
self.onmessage=({data:{id,input}})=>{
 try{const root=createHostTile(input.contract,input.options),result=serializeHost(root);self.postMessage({id,result:result.data},{transfer:result.transfer});disposeObject(root);}
 catch(error){self.postMessage({id,error:(error as Error).message});}
};
