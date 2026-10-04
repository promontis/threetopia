import puppeteer from '@cloudflare/puppeteer';
import {Buffer} from 'node:buffer';
import type {Env} from './common';
import type {ThumbnailPlan} from './thumbnail-plan';

/** The render browser receives only the snapshot's models and our static assets.
 * It never gets an account cookie, registry credential, or arbitrary network access. */
export async function thumbnailResource(env:Env,plan:ThumbnailPlan,url:URL):Promise<Response>{
  if(url.origin!==env.SITE_URL)return new Response(null,{status:403});
  if(url.pathname==='/api/resolve'){
    const p=plan.packages.find(p=>p.name===url.searchParams.get('name')&&p.version===url.searchParams.get('version'));
    return p?Response.json({manifest:p.manifest}):new Response(null,{status:404});
  }
  const route=url.pathname.match(/^\/api\/packages\/([^/]+)\/versions\/([^/]+)\/files$/);
  if(route){
    const file=plan.files.find(f=>f.packageId===route[1]&&f.version===route[2]&&f.path===url.searchParams.get('path'));
    const object=file?await env.PACKAGES.get(file.key):null;
    return object?new Response(object.body as any,{headers:{'Content-Type':'application/octet-stream'}}):new Response(null,{status:404});
  }
  if(url.pathname==='/map-preview/'||/^\/(assets|map|creators|licenses)\//.test(url.pathname)||url.pathname==='/favicon.svg')return env.ASSETS.fetch(new Request(url));
  return new Response(null,{status:403});
}

export async function renderThumbnail(env:Env,plan:ThumbnailPlan):Promise<Uint8Array>{
  if(!env.THUMBNAIL_BROWSER)throw Error('Thumbnail browser is unavailable.');
  const browser=await puppeteer.launch(env.THUMBNAIL_BROWSER,{keep_alive:180_000});
  try{
    const page=await browser.newPage();await page.setViewport({width:800,height:500,deviceScaleFactor:1});
    await page.setRequestInterception(true);
    page.on('request',request=>{void(async()=>{
      try{
        if(request.url().startsWith('data:')||request.url().startsWith('blob:')){await request.continue();return;}
        if(request.method()!=='GET'){await request.abort();return;}
        const response=await thumbnailResource(env,plan,new URL(request.url()));
        await request.respond({status:response.status,headers:Object.fromEntries(response.headers),body:Buffer.from(await response.arrayBuffer())});
      }catch{if(!request.isInterceptResolutionHandled())await request.abort().catch(()=>{});}
    })();});
    await page.evaluateOnNewDocument(()=>{
      const state=(window as any).__thumbnailRenderer={ready:false,error:false};
      addEventListener('message',event=>{if(event.source!==window||event.origin!==location.origin)return;
        if(event.data?.type==='creator:ready')state.ready=true;
        if(event.data?.type==='creator:load-error')state.error=true;
      });
    });
    await page.goto(`${env.SITE_URL}/map-preview/?creator=1&thumbnail=1`,{waitUntil:'domcontentloaded',timeout:120_000});
    await page.waitForFunction(()=>{const s=(window as any).__thumbnailRenderer;return s?.ready||s?.error;},{timeout:120_000});
    const encoded=await page.evaluate(async({data,tileId})=>{
      if((window as any).__thumbnailRenderer.error)throw Error('The map renderer could not load.');
      return new Promise<string>((resolve,reject)=>{
        const timer=setTimeout(()=>{removeEventListener('message',reply);reject(Error('Tile capture timed out.'));},120_000);
        async function reply(event:MessageEvent){
          if(event.source!==window||event.origin!==location.origin||event.data?.type!=='creator:thumbnail-result'||event.data.id!==1)return;
          clearTimeout(timer);removeEventListener('message',reply);
          const blob=event.data.blob;if(event.data.error||!(blob instanceof Blob)||blob.type!=='image/webp'){reject(Error('Tile capture failed.'));return;}
          const reader=new FileReader();reader.onerror=()=>reject(Error('Could not read the tile image.'));reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.readAsDataURL(blob);
        }
        addEventListener('message',reply);postMessage({type:'creator:thumbnail',id:1,tileId,data},location.origin);
      });
    },{data:plan.data,tileId:plan.tileId});
    const image=new Uint8Array(Buffer.from(encoded,'base64'));
    if(image.length<1000||image.length>3_000_000||String.fromCharCode(...image.slice(8,12))!=='WEBP')throw Error('Invalid tile capture.');
    return image;
  }finally{await browser.close();}
}
