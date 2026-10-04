import {afterAll, beforeAll, beforeEach, describe, expect, it} from 'vitest';
import {readFileSync} from 'node:fs';
import {getPlatformProxy, unstable_splitSqlQuery, type PlatformProxy} from 'wrangler';
import type {D1Database} from '@cloudflare/workers-types';
import {catalogHref, catalogReturnHref, parseCatalogQuery, validateDiscovery} from '../../src/creators/package-discovery';
import {searchCatalog, searchCreators} from '../../src/creators/server/catalog';
import {registryRoutes} from '../../src/creators/server/registry';
import type {Env} from '../../src/creators/server/common';
import {sha256} from '../../packages/platform/tiles.js';

let platform: PlatformProxy<{DB: D1Database}>, db: D1Database, backfill: any;
const run = (sql: string, ...values: (string | number | null)[]) => db.prepare(sql).bind(...values).run();
const search = (query = '') => searchCatalog(db, new URLSearchParams(query));
const manifest = (title: string, description = 'Reusable 3D models', license = 'MIT') => JSON.stringify({title, description, license});
async function add(id: string, data: {title?: string; description?: string; kind?: string; category?: string; tags?: string[]; owner?: string; state?: string; license?: string; time?: number} = {}) {
  const owner = data.owner || 'alice', title = data.title || id;
  const values = [id, owner, `@${owner}/${id}`, data.kind || 'asset', title, data.description || '', data.time || 100, data.time || 100, data.category || '', JSON.stringify(data.tags || [])];
  await db.batch([
    db.prepare('INSERT INTO packages(id,creator_id,name,kind,title,description,created_at,updated_at,category,tags) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(...values),
    db.prepare('INSERT INTO versions(id,package_id,version,state,manifest,created_at,published_at) VALUES(?,?,?,?,?,?,?)')
      .bind(`${id}-v1`, id, '1.0.0', data.state || 'published', manifest(title, data.description, data.license), data.time || 100, data.state && data.state !== 'published' ? null : data.time || 100),
  ]);
}

beforeAll(async () => {
  platform = await getPlatformProxy<{DB: D1Database}>({configPath: 'tests/fixtures/catalog.wrangler.json', persist: false, remoteBindings: false, envFiles: []});
  db = platform.env.DB;
  const migrate = async (file: string) => db.batch(unstable_splitSqlQuery(readFileSync(file, 'utf8')).map(sql => db.prepare(sql)));
  await migrate('migrations-creators/0001_platform.sql');
  await run("INSERT INTO creators VALUES('original','original@example.test','original','Original maker',1)");
  await run("INSERT INTO packages(id,creator_id,name,kind,title,created_at,updated_at) VALUES('legacy','original','@original/legacy','asset','Legacy',1,1)");
  await run("INSERT INTO versions(id,package_id,version,state,manifest,created_at,published_at) VALUES('legacy-v1','legacy','1.0.0','published',?,1,2)", manifest('Legacy', 'A lighthouse by the sea', 'CC0-1.0'));
  await migrate('migrations-creators/0002_package_discovery.sql');
  backfill = await search('q=light');
}, 60_000);
afterAll(async () => { await platform?.dispose(); });
beforeEach(async () => {
  await db.batch(['installations','files','dependencies','versions','packages','credentials','creators'].map(table => db.prepare(`DELETE FROM ${table}`)));
  await run("INSERT INTO creators VALUES('alice','alice@example.test','alice','Alice Fields',1),('bob','bob@example.test','bob','Bób Rivers',1)");
  await add('rocks', {title: 'Coastal rocks', description: 'Basalt cliffs for a tropical shoreline', category: 'nature', tags: ['coastal', 'low poly'], time: 200});
  await add('beacon', {title: 'Coastal beacon', description: 'One material, no textures. A lighthouse.', category: 'architecture', tags: ['coastal'], time: 100});
  await add('river', {title: 'River village', kind: 'world', owner: 'bob', category: 'environments', tags: ['coastal', 'water'], license: 'CC0-1.0', time: 300});
  await add('private', {title: 'Secret forest', state: 'ready', category: 'nature', tags: ['secret'], license: 'PRIVATE'});
  await add('archived', {title: 'Old forest', category: 'nature', tags: ['hidden'], license: 'HIDDEN'});
  await run("UPDATE packages SET archived=1 WHERE id='archived'");
});

describe('D1 public package search', () => {
  it('backfills previously published packages and their licenses into the real FTS index', () => {
    expect(backfill.packages.map((p: any) => p.id)).toEqual(['legacy']);
    expect(backfill.facets.license[0].value).toBe('CC0-1.0');
  });
  it('searches descriptions, normalized creator names, namespaced names and tags with word prefixes', async () => {
    for (const [q, ids] of [['basalt trop', ['rocks']], ['bob', ['river']], ['@alice/beac', ['beacon']], ['low pol', ['rocks']], ['lighth', ['beacon']]] as const) {
      expect((await search('q=' + encodeURIComponent(q))).packages.map(p => p.id)).toEqual(ids);
    }
  });
  it('keeps draft and archived data out of results, counts, facets and creator suggestions', async () => {
    const data = await search();
    expect(data.total).toBe(3);
    expect(data.facets.license.map(f => f.value).sort()).toEqual(['CC0-1.0', 'MIT']);
    expect(data.facets.tag.some(f => ['secret','hidden'].includes(f.value))).toBe(false);
    expect((await search('q=secret')).total).toBe(0);
  });
  it('combines filters with OR within a facet and AND between facets', async () => {
    const data = await search('kind=asset&category=nature&category=architecture&tag=coastal&license=MIT&creator=alice');
    expect(data.packages.map(p => p.id).sort()).toEqual(['beacon', 'rocks']);
    expect((await search('kind=world&license=MIT')).total).toBe(0);
  });
  it('returns alternative facet counts and retains impossible selected filters for removal', async () => {
    const data = await search('kind=world&category=nature');
    expect(data.total).toBe(0);
    expect(data.facets.kind.find(f => f.value === 'asset')?.count).toBe(1);
    expect(data.facets.category.find(f => f.value === 'environments')?.count).toBe(1);
    expect(data.facets.category.find(f => f.value === 'nature')?.count).toBe(0);
  });
  it('treats FTS operators, quotes, wildcard characters and SQL syntax as bounded text', async () => {
    for (const q of ['" OR *', 'beacon); DROP TABLE packages; --', '***', '%_', '"', 'NOT']) {
      const data = await search('q=' + encodeURIComponent(q));
      expect(data.total).toBe(0);
    }
    expect((await search()).total).toBe(3);
  });
  it('paginates past 200 packages without duplicates and clamps invalid pages', async () => {
    const statements = Array.from({length: 215}, (_, i) => {
      const id = `extra-${String(i).padStart(3, '0')}`;
      return [db.prepare('INSERT INTO packages(id,creator_id,name,kind,title,created_at,updated_at) VALUES(?,?,?,?,?,?,?)').bind(id,'alice',`@alice/${id}`,'asset',id,1,1),
        db.prepare('INSERT INTO versions(id,package_id,version,state,manifest,created_at,published_at) VALUES(?,?,?,?,?,?,?)').bind(`${id}-v1`,id,'1.0.0','published',manifest(id),1,1)];
    }).flat();
    await db.batch(statements);
    const pages = await Promise.all([1,2,3,4].map(page => search(`sort=name&perPage=60&page=${page}`)));
    expect(pages[0].total).toBe(218);
    expect(new Set(pages.flatMap(page => page.packages.map(p => p.id))).size).toBe(218);
    expect((await search('page=999999&perPage=99999')).page).toBe(4);
    expect((await search('page=-2&perPage=nope')).page).toBe(1);
  });
  it('ranks title matches ahead of description matches', async () => {
    await add('title', {title: 'Lighthouse'});
    expect((await search('q=lighthouse')).packages.map(p => p.id)).toEqual(['title', 'beacon']);
  });
  it('does not change public metadata, versions or update order when a private version is uploaded', async () => {
    await run("INSERT INTO versions VALUES('draft','beacon','2.0.0','uploading',?,NULL,9999,NULL)", manifest('Secret replacement', 'classified', 'SECRET'));
    await run("UPDATE packages SET updated_at=9999 WHERE id='beacon'");
    const data = await search();
    expect(data.packages.map(p => p.id)).toEqual(['river', 'rocks', 'beacon']);
    expect(data.packages[2].latest_version).toBe('1.0.0');
    expect((await search('q=classified')).total).toBe(0);
    await run("UPDATE versions SET state='published',published_at=9999 WHERE id='draft'");
    expect((await search('q=classified')).packages[0].latest_version).toBe('2.0.0');
    expect((await search('q=lighthouse')).total).toBe(0);
  });
  it('tracks metadata changes, profile changes, archiving and unarchiving immediately', async () => {
    await run("UPDATE packages SET tags='[\"volcanic\"]',category='environments' WHERE id='rocks'");
    expect((await search('q=volcanic&category=environments')).total).toBe(1);
    expect((await search('tag=low+poly')).total).toBe(0);
    await run("UPDATE creators SET display_name='New Studio' WHERE id='alice'");
    expect((await search('q=new studio')).total).toBe(2);
    await run("UPDATE packages SET archived=1 WHERE id='rocks'");
    expect((await search('q=volcanic')).total).toBe(0);
    await run("UPDATE packages SET archived=0 WHERE id='rocks'");
    expect((await search('q=volcanic')).total).toBe(1);
  });
  it('sorts by distinct active installing creators, not downloads or project count', async () => {
    await run("INSERT INTO installations VALUES('alice','a','beacon','1.0.0',1,NULL),('alice','b','beacon','1.0.0',1,NULL),('bob','c','beacon','1.0.0',1,NULL)");
    expect((await search('sort=popular')).packages[0]).toMatchObject({id:'beacon', installers:2});
    await run("UPDATE installations SET removed_at=2 WHERE creator_id='alice'");
    expect((await search('q=beacon')).packages[0].installers).toBe(1);
    await run('DELETE FROM installations');
    expect((await search('q=beacon')).packages[0].installers).toBe(0);
  });
  it('finds creators beyond the first facet page using public data only', async () => {
    await db.batch(Array.from({length:65},(_,index)=>{
      const id = 'maker'+String(index).padStart(2,'0');
      return [db.prepare('INSERT INTO creators VALUES(?,?,?,?,1)').bind(id,`${id}@example.test`,id,id),
        db.prepare('INSERT INTO packages(id,creator_id,name,kind,title,created_at,updated_at) VALUES(?,?,?,?,?,1,1)').bind(id,id,`@${id}/asset`,'asset','Test model'),
        db.prepare('INSERT INTO versions(id,package_id,version,state,manifest,created_at,published_at) VALUES(?,?,?,?,?,1,1)').bind(id,id,'1.0.0','published',manifest('Test model'))];
    }).flat());
    expect((await search()).facets.creator.some(f=>f.value==='maker64')).toBe(false);
    const results = await searchCreators(db, new URLSearchParams('creatorSearch=maker64'));
    expect(results.creators.map(f => f.value)).toEqual(['maker64']);
    expect((await searchCreators(db, new URLSearchParams('creatorSearch=%'))).creators).toHaveLength(0);
  });
  it('allows only the authenticated owner to update discovery without mutating versions', async () => {
    const id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    await add(id, {title: 'Editable'});
    const secret = 'a'.repeat(64);
    await run("INSERT INTO credentials VALUES(?,'alice','cli','Test',1,?,1)", await sha256(secret), Date.now()+60_000);
    const env = {DB: db} as Env;
    const request = (token?: string, metadata = {category:'nature', tags:['Trees','low poly']}) => new Request(`https://creators.threetopia.com/api/packages/${id}`, {method:'PATCH', headers:{'Content-Type':'application/json', ...(token ? {Authorization:`Bearer ${token}`} : {})}, body:JSON.stringify(metadata)});
    await expect(registryRoutes(request(),env,`/api/packages/${id}`)).rejects.toMatchObject({status:403});
    const otherSecret='b'.repeat(64);
    await run("INSERT INTO credentials VALUES(?,'bob','cli','Test',1,?,1)",await sha256(otherSecret),Date.now()+60_000);
    await expect(registryRoutes(request(otherSecret),env,`/api/packages/${id}`)).rejects.toMatchObject({status:403});
    await expect(registryRoutes(request(secret,{category:'invalid',tags:[]}),env,`/api/packages/${id}`)).rejects.toMatchObject({status:422});
    const response = await registryRoutes(request(secret),env,`/api/packages/${id}`);
    expect(await response!.json()).toEqual({category:'nature', tags:['trees','low poly']});
    expect((await search('q=trees')).packages[0].id).toBe(id);
    expect((await db.prepare('SELECT manifest FROM versions WHERE package_id=?').bind(id).first<any>()).manifest).toBe(manifest('Editable'));
  });
});

describe('Catalog URL and metadata contract', () => {
  it('round-trips combined filters and rejects unsafe return paths', () => {
    const query = parseCatalogQuery(new URLSearchParams('q=coastal&kind=world&kind=asset&tag=low+poly&creator=@Alice&page=3&sort=popular'));
    expect(parseCatalogQuery(new URL(catalogHref(query),'https://example.test').searchParams)).toEqual(query);
    expect(catalogReturnHref('?from='+encodeURIComponent(catalogHref(query)))).toBe(catalogHref(query));
    for (const path of ['https://evil.test', '//evil.test', '/packages/my', '/packages/../settings']) expect(catalogReturnHref('?from='+encodeURIComponent(path))).toBeNull();
  });
  it('bounds requests and rejects invalid metadata while normalizing useful tags', () => {
    expect(validateDiscovery({category:'nature',tags:['Trees','trees',' Low poly ']})).toEqual({category:'nature',tags:['trees','low poly']});
    for (const value of [{category:'nonsense'}, {tags:'forest'}, {tags:['<script>']}, {tags:Array(11).fill('x')}, {tags:['a'.repeat(31)]}]) expect(()=>validateDiscovery(value)).toThrow();
    const parsed = parseCatalogQuery(new URLSearchParams('q='+'a'.repeat(2000)+'&sort=DROP&page=999999&perPage=99999'));
    expect(parsed.q.length).toBe(160);expect(parsed.perPage).toBe(60);expect(parsed.sort).toBe('relevance');
  });
});
