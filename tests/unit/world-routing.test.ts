import {describe,it,expect,vi} from 'vitest';
import {routeWorld} from '../../src/server/world-routing.ts';

const site='https://threetopia.com',world='https://world.threetopia.com';
const assets={fetch:vi.fn(async(r:Request)=>new Response(new URL(r.url).pathname))};
const route=(url:string,method='GET')=>routeWorld(new Request(url,{method}),assets,site,world);
describe('the world subdomain',()=>{
  it('serves the standalone world at its root without redirecting to marketing',async()=>{
    expect(await (await route(world+'/'))!.text()).toBe('/world/');
    expect(await route(site+'/')).toBeNull();
    expect(await route('http://127.0.0.1:55010/world/')).toBeNull();
  });
  it('canonicalises old links while preserving destinations and diagnostics',async()=>{
    for(const origin of [site,'https://www.threetopia.com',world])for(const path of ['/world','/world/','/world/index.html']){
      const response=(await route(origin+path+'?destination=sakura&inspect'))!;
      expect(response.status).toBe(308);expect(response.headers.get('Location')).toBe(world+'/?destination=sakura&inspect');
    }
    expect((await route(world+'/index.html'))!.headers.get('Location')).toBe(world+'/');
    expect((await route('http://world.threetopia.com/?inspect'))!.headers.get('Location')).toBe(world+'/?inspect');
  });
  it('leaves map and scene assets intact and excludes the marketing APIs',async()=>{
    for(const path of ['/world-assets/lagoon/scene.json','/atlas/','/assets/world.js'])expect(await route(world+path)).toBeNull();
    for(const path of ['/api/waitlist','/api/creators/count','/waitlist/confirm'])expect((await route(world+path))!.status).toBe(404);
    expect((await route(world+'/','POST'))!.status).toBe(405);
    expect(await (await route(world+'/','HEAD'))!.text()).toBe('/world/');
  });
});
