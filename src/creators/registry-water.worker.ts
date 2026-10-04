import {createRegistryWaterBaker} from './registry-water-bake';
let bake:ReturnType<typeof createRegistryWaterBaker>|undefined;
self.onmessage=({data})=>{
 if(data.surface){bake=createRegistryWaterBaker();return;}
 try{if(!bake)throw Error('Landscape is not ready.');const result=bake(data.input);self.postMessage({id:data.id,result},{transfer:[result.data.buffer,result.position.buffer,result.normal.buffer,result.color.buffer]});}
 catch(error){self.postMessage({id:data.id,error:(error as Error).message});}
};
