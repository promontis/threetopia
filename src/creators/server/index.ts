import {authRoutes} from './auth';
import {accountCors,accountPreflight} from './account-cors';
import {registryRoutes} from './registry';
import {HttpError,json,local,type Env} from './common';
import {canonicalCreatorPath} from '../routes';
import {dispatchThumbnails,processThumbnail,thumbnailRoutes} from './thumbnails';
import {renderThumbnail} from './thumbnail-render';
import type {ThumbnailJob} from './thumbnail-plan';
import type {ExecutionContext,MessageBatch} from '@cloudflare/workers-types';
export default {
  async scheduled(event:{cron?:string},env:Env){
    if(event.cron==='17 3 * * *'){const now=Date.now();await env.DB.batch([env.DB.prepare('DELETE FROM challenges WHERE expires_at<?').bind(now-86400000),env.DB.prepare('DELETE FROM devices WHERE expires_at<?').bind(now),env.DB.prepare('DELETE FROM credentials WHERE expires_at<?').bind(now),env.DB.prepare('DELETE FROM tiles WHERE created_at<? AND id NOT IN (SELECT tile_id FROM packages WHERE tile_id IS NOT NULL)').bind(now-7*86400000)]);}
    await dispatchThumbnails(env);
  },
  async queue(batch:MessageBatch<ThumbnailJob>,env:Env){
    for(const message of batch.messages){try{await processThumbnail(env,message.body,renderThumbnail);message.ack();}catch(error){console.error('Tile thumbnail queue failed',error instanceof Error?error.message:'Queue error');message.retry({delaySeconds:60});}}
  },
  async fetch(req:Request,env:Env,ctx?:ExecutionContext):Promise<Response>{
    const url=new URL(req.url),path=url.pathname;
    const canonicalPath=canonicalCreatorPath(path);
    if(canonicalPath!==path&&(req.method==='GET'||req.method==='HEAD')){url.pathname=canonicalPath;return Response.redirect(url.href,308);}
    if(!path.startsWith('/api/'))return env.ASSETS.fetch(req);
    if(!local(req,env)&&url.origin!==env.SITE_URL)return json({message:'Unknown registry origin.'},403);
    const preflight=accountPreflight(req);if(preflight)return preflight;
    if(req.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, HEAD','Access-Control-Allow-Headers':'Content-Type'}});
    try{
      let response:Response|null=null;
      if(path==='/api/health'&&req.method==='GET')response=json({name:'Threetopia Creator Registry',schemaVersion:1,docs:'https://docs.threetopia.com',tiles:144,auth:'email-code',local:local(req,env)});
      response??=await authRoutes(req,env,path);
      response??=await thumbnailRoutes(req,env,path);
      response??=await registryRoutes(req,env,path);
      response??=json({message:'Endpoint not found.'},404);
      // Reads also recover an existing outbox entry if a deploy, queue send or cron
      // rollout interrupted dispatch. Rendering always stays in the queue consumer.
      const thumbnailRecovery=req.method==='GET'&&(path==='/api/tiles'||path==='/api/tiles/thumbnails');
      if((thumbnailRecovery||!['GET','HEAD','OPTIONS'].includes(req.method))&&response.ok&&ctx)ctx.waitUntil(dispatchThumbnails(env).catch(()=>console.error('Thumbnail dispatch delayed; a later request or scheduled retry will recover.')));
      if(req.method==='GET')response.headers.set('Access-Control-Allow-Origin','*');
      return accountCors(req,response);
    }catch(error){
      if(error instanceof HttpError)return accountCors(req,json({message:error.message,...(error.details?{details:error.details}:{})},error.status));
      console.error('Creator registry request failed',error instanceof Error?error.name:'Error');
      return accountCors(req,json({message:'The registry could not complete this request. Please try again.'},503));
    }
  },
};
