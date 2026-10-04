import type {D1Database,R2Bucket,SendEmail,Queue} from '@cloudflare/workers-types';
import type {ThumbnailJob} from './thumbnail-plan';
import {sha256} from '../../../packages/platform/tiles.js';
import {ACCOUNT_ORIGINS} from '../../shared/account-links';
export interface Env {DB:D1Database;PACKAGES:R2Bucket;ASSETS:{fetch(r:Request):Promise<Response>};AUTH_EMAIL?:SendEmail;AUTH_LIMITER:{limit(v:{key:string}):Promise<{success:boolean}>};SITE_URL:string;AUTH_LOCAL?:string;AUTH_FROM:string;THUMBNAIL_QUEUE?:Queue<ThumbnailJob>;THUMBNAIL_BROWSER?:Parameters<typeof import('@cloudflare/puppeteer').default.launch>[0];}
export type Creator={id:string;email:string;handle:string|null;display_name:string;created_at:number};
export type Auth={user:Creator;hash:string;kind:string};
export class HttpError extends Error {status:number;details:unknown;constructor(status:number,message:string,details?:unknown){super(message);this.status=status;this.details=details;}}
export function fail(status:number,message:string,details?:unknown):never{throw new HttpError(status,message,details);}
export const json=(v:unknown,status=200,headers:Record<string,string>={})=>Response.json(v,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
export const token=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('');
export const uuid=()=>crypto.randomUUID();
export const local=(req:Request,env:Env)=>String(env.AUTH_LOCAL)==='true'&&['localhost','127.0.0.1','[::1]'].includes(new URL(req.url).hostname);
export async function bytes(req:Request,max:number){const reader=req.body?.getReader();if(!reader)return new Uint8Array();const chunks:Uint8Array[]=[];let n=0;while(true){const {value,done}=await reader.read();if(done)break;n+=value.length;if(n>max){await reader.cancel();fail(413,'Request is too large.');}chunks.push(value);}const out=new Uint8Array(n);let i=0;for(const c of chunks){out.set(c,i);i+=c.length;}return out;}
export async function body(req:Request){if(!req.headers.get('Content-Type')?.startsWith('application/json'))fail(415,'Send JSON.');try{const v=JSON.parse(new TextDecoder().decode(await bytes(req,128*1024)));if(!v||typeof v!=='object'||Array.isArray(v))fail(400,'Expected an object.');return v;}catch(e){if(e instanceof HttpError)throw e;return fail(400,'Invalid JSON.');}}
export function sameOrigin(req:Request){if(req.headers.get('Origin')!==new URL(req.url).origin)fail(403,'Use the creator website for this action.');}
export function accountOrigin(req:Request){if(!ACCOUNT_ORIGINS.has(req.headers.get('Origin')||''))sameOrigin(req);}
export async function auth(req:Request,env:Env,required=true):Promise<Auth|null>{
  const bearer=req.headers.get('Authorization')?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
  const cookie=req.headers.get('Cookie')?.match(/(?:^|;\s*)tt_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  const secret=bearer||cookie;
  if(!secret){if(required)fail(401,'Log in to Threetopia first.');return null;}
  const hash=await sha256(secret),row=await env.DB.prepare('SELECT c.*, k.kind FROM credentials k JOIN creators c ON c.id=k.creator_id WHERE k.hash=? AND k.expires_at>?').bind(hash,Date.now()).first<Creator&{kind:string}>();
  if(!row||row.kind!==(bearer?'cli':'session')){if(required)fail(401,'Your session has expired. Log in again.');return null;}
  if(!bearer&&!['GET','HEAD','OPTIONS'].includes(req.method)){
    if(new URL(req.url).pathname==='/api/auth/logout')accountOrigin(req);else sameOrigin(req);
  }
  return {user:row,hash,kind:row.kind};
}
export async function requireCreator(req:Request,env:Env){const a=(await auth(req,env))!;if(!a.user.handle)fail(409,'Choose your creator handle at /profile before continuing.');return a;}
export const profile=(u:Creator)=>({id:u.id,handle:u.handle,displayName:u.display_name,email:u.email,createdAt:u.created_at});
export async function ownPackage(env:Env,id:string,user:Creator){const p=await env.DB.prepare('SELECT * FROM packages WHERE id=? AND creator_id=?').bind(id,user.id).first<any>();if(!p)fail(404,'Package not found.');return p;}
export const cookie=(req:Request,value:string,maxAge=604800)=>`tt_session=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${new URL(req.url).protocol==='https:'?'; Secure':''}`;
