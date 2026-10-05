import {afterAll,beforeAll,beforeEach,describe,expect,it} from 'vitest';
import {readFileSync} from 'node:fs';
import {getPlatformProxy,unstable_splitSqlQuery} from 'wrangler';
import type {D1Database} from '@cloudflare/workers-types';
import {accountReturnTo,ACCOUNT_ORIGINS,CREATORS_ORIGIN} from '../../src/shared/account-links';
import {accountCors,accountPreflight} from '../../src/creators/server/account-cors';
import {authRoutes} from '../../src/creators/server/auth';
import type {Env} from '../../src/creators/server/common';
import {sha256} from '../../packages/platform/tiles.js';

describe('account return links',()=>{
  it('returns to the original site, docs page or creator filter after sign-in',()=>{
    for(const next of ['https://threetopia.com/#creators','https://docs.threetopia.com/quickstart','/packages?kind=asset&q=water']) expect(accountReturnTo(next)).toBe(next);
    expect(accountReturnTo(CREATORS_ORIGIN+'/tiles/my')).toBe('/tiles/my');
  });
  it('rejects open redirects, credentials in URLs and login loops',()=>{
    for(const next of [null,'https://evil.test','//evil.test','/\\evil.test','javascript:alert(1)','https://docs.threetopia.com.evil.test','https://evil@docs.threetopia.com','/login?next=/login','/signup','https://world.threetopia.com','http://docs.threetopia.com','https://docs.threetopia.com:4430','\nhttps://evil.test']) expect(accountReturnTo(next)).toBe('/packages/my');
  });
});

describe('shared account CORS',()=>{
  it('allows credentialed identity reads for the exact first-party websites only',()=>{
    for(const origin of ACCOUNT_ORIGINS){
      const response=accountCors(new Request(CREATORS_ORIGIN+'/api/me',{headers:{Origin:origin}}),Response.json({creator:null}));
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe(origin);
      expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('true');
      expect(response.headers.get('Vary')).toBe('Origin');
    }
    for(const origin of ['https://untrusted.threetopia.com','https://evil.test','null','http://threetopia.com']){
      const response=accountCors(new Request(CREATORS_ORIGIN+'/api/me',{headers:{Origin:origin}}),Response.json({},{headers:{'Access-Control-Allow-Origin':'*'}}));
      expect(response.headers.has('Access-Control-Allow-Origin')).toBe(false);
      expect(response.headers.has('Access-Control-Allow-Credentials')).toBe(false);
    }
  });
  it('limits preflight access to session reads and logout, without sharing other account APIs',()=>{
    const preflight=(origin='https://threetopia.com',path='/api/auth/logout',method='POST',headers='content-type')=>accountPreflight(new Request(CREATORS_ORIGIN+path,{method:'OPTIONS',headers:{Origin:origin,'Access-Control-Request-Method':method,'Access-Control-Request-Headers':headers}}));
    expect(preflight()?.status).toBe(204);
    expect(preflight('https://docs.threetopia.com','/api/me','GET','')?.status).toBe(204);
    expect(preflight('https://evil.test')?.status).toBe(403);
    expect(preflight('https://threetopia.com','/api/me','POST')?.status).toBe(403);
    expect(preflight('https://threetopia.com','/api/me','GET','authorization')?.status).toBe(403);
    expect(preflight('https://threetopia.com','/api/profile','PATCH')).toBeNull();
    const response=accountCors(new Request(CREATORS_ORIGIN+'/api/tokens',{headers:{Origin:'https://threetopia.com'}}),Response.json({}));
    expect(response.headers.has('Access-Control-Allow-Credentials')).toBe(false);
  });
});

describe('browser and CLI session handling',()=>{
  let platform:Awaited<ReturnType<typeof getPlatformProxy<{DB:D1Database}>>>;
  let env:Env,db:D1Database;
  const browserToken='a'.repeat(64),cliToken='b'.repeat(64);
  const request=(path:string,origin:string|undefined=CREATORS_ORIGIN,method='POST',secret=browserToken)=>new Request(CREATORS_ORIGIN+path,{method,headers:{...(origin?{Origin:origin}:{}),'Content-Type':'application/json',Cookie:'tt_session='+secret},...(method==='GET'?{}:{body:'{}'})});
  beforeAll(async()=>{
    platform=await getPlatformProxy<{DB:D1Database}>({configPath:'tests/fixtures/account.wrangler.json',persist:false,remoteBindings:false,envFiles:[]});
    db=platform.env.DB;
    for(const file of ['0001_platform.sql','0004_managed_namespaces.sql'])await db.batch(unstable_splitSqlQuery(readFileSync('migrations-creators/'+file,'utf8')).map(sql=>db.prepare(sql)));
    env={DB:db} as Env;
  },60_000);
  afterAll(async()=>{await platform?.dispose();});
  beforeEach(async()=>{
    await db.batch(['DELETE FROM credentials','DELETE FROM challenges','DELETE FROM creators'].map(sql=>db.prepare(sql)));
    await db.prepare("INSERT INTO creators VALUES('maker','maker@example.test','maker','Map Maker',1)").run();
    for(const [secret,kind] of [[browserToken,'session'],[cliToken,'cli']]) await db.prepare("INSERT INTO credentials VALUES(?,'maker',?,'Test',1,?,1)").bind(await sha256(secret),kind,Date.now()+60000).run();
  });
  it('returns the same signed-in identity on each website without widening cookie scope',async()=>{
    for(const origin of ACCOUNT_ORIGINS){
      const req=request('/api/me',origin,'GET'),response=accountCors(req,(await authRoutes(req,env,'/api/me'))!);
      expect((await response.json() as any).creator.handle).toBe('maker');
      expect(response.headers.get('Cache-Control')).toBe('no-store');
    }
  });
  it('revokes the browser session from Docs while preserving connected CLI sessions',async()=>{
    const req=request('/api/auth/logout','https://docs.threetopia.com');
    const response=(await authRoutes(req,env,'/api/auth/logout'))!;
    expect(response.status).toBe(200);
    expect(response.headers.get('Set-Cookie')).toMatch(/Max-Age=0; Secure/);
    expect(response.headers.get('Set-Cookie')).not.toContain('Domain=');
    expect(await db.prepare('SELECT kind FROM credentials').all()).toMatchObject({results:[{kind:'cli'}]});
    const me=(await authRoutes(request('/api/me',CREATORS_ORIGIN,'GET'),env,'/api/me'))!;
    expect(await me.json()).toEqual({creator:null});
  });
  it('rejects logout from unrelated sites without deleting the session',async()=>{
    await expect(authRoutes(request('/api/auth/logout','https://evil.test'),env,'/api/auth/logout')).rejects.toMatchObject({status:403});
    expect((await db.prepare('SELECT kind FROM credentials').all()).results).toHaveLength(2);
  });
  it('allows logout after expiration and repeated logout',async()=>{
    const req=request('/api/auth/logout','https://threetopia.com','POST','c'.repeat(64));
    expect((await authRoutes(req,env,'/api/auth/logout'))?.status).toBe(200);
  });
  it('keeps CLI logout working without a browser Origin header',async()=>{
    const req=new Request(CREATORS_ORIGIN+'/api/auth/logout',{method:'POST',headers:{Authorization:'Bearer '+cliToken}});
    expect((await authRoutes(req,env,'/api/auth/logout'))?.status).toBe(200);
    expect((await db.prepare('SELECT kind FROM credentials').all()).results).toEqual([{kind:'session'}]);
  });
  it('still requires the creator origin for profile edits and requesting sign-in codes',async()=>{
    for(const [path,method] of [['/api/profile','PATCH'],['/api/auth/start','POST']]) await expect(authRoutes(request(path,'https://threetopia.com',method),env,path)).rejects.toMatchObject({status:403});
  });
});
