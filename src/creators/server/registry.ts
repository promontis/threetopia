import {validateCodeFiles, JAVASCRIPT_EXT} from '../../../packages/platform/code.js';
import {validateRuntimeFiles} from '../../../packages/platform/runtime.js';
import {navigationIssue,PROTECTED_WATER_ACCESS} from '../../../packages/platform/navigation.js';
import {auth,body,bytes,fail,json,ownPackage,requireCreator,uuid,type Env} from './common';
import {tileSlots,TILE_VARIANTS,ORIGINAL_TILES,BUILTIN_TILES,tileContract,sha256,compatibleChoices,placementIssue,waterProtectionAt,protectedWaterIssue} from '../../../packages/platform/tiles.js';
import {validateManifest,inspectGLB,validVersion,validName,versionCompare} from '../../../packages/platform/validate.js';
import {searchCatalog,searchCreators} from './catalog';
import {validateDiscovery} from '../package-discovery';
import {tilePhotos} from './thumbnails';
import {requireNamespace} from './namespaces';
function discovery(value:any){try{return validateDiscovery(value);}catch(error){return fail(422,(error as Error).message);}}
const parse=(v:any)=>({...v,manifest:v.manifest?JSON.parse(v.manifest):undefined,report:v.report?JSON.parse(v.report):undefined,contract:v.contract?JSON.parse(v.contract):undefined});
export async function tileState(env:Env){
  // Only unused reservations expire. Packages retain their immutable tile.
  await env.DB.prepare('DELETE FROM tiles WHERE created_at<? AND id NOT IN (SELECT tile_id FROM packages WHERE tile_id IS NOT NULL)').bind(Date.now()-7*86400000).run();
  const tiles=(await env.DB.prepare(`SELECT t.id,t.q,t.r,t.variant,t.contract,t.creator_id,c.handle,c.display_name,p.id AS package_id,p.name,p.title,
    (SELECT v.version FROM versions v WHERE v.package_id=p.id AND v.state='published' ORDER BY v.published_at DESC LIMIT 1) AS published_version
    FROM tiles t JOIN creators c ON c.id=t.creator_id LEFT JOIN packages p ON p.tile_id=t.id`).all<any>()).results;
  return {tiles,slots:tileSlots(tiles.filter(t=>t.published_version),tiles.filter(t=>!t.published_version))};
}
export async function registryRoutes(req:Request,env:Env,path:string):Promise<Response|null>{
  const url=new URL(req.url),method=req.method;
  if(path==='/api/namespaces'&&method==='GET'){
    const {user}=await requireCreator(req,env);
    const rows=(await env.DB.prepare('SELECT namespace,reason FROM managed_namespaces WHERE creator_id=? ORDER BY namespace').bind(user.id).all()).results;
    return json({owner:user.handle,namespaces:[{namespace:user.handle,reason:'Own creator handle'},...rows]});
  }
  if(path==='/api/tiles'&&method==='GET'){
    const {tiles,slots}=await tileState(env),a=await auth(req,env,false),photos=await tilePhotos(env,a?.user.id);
    return json({protectedWaterAccess:[PROTECTED_WATER_ACCESS],original:ORIGINAL_TILES.map(t=>({...t,contract:BUILTIN_TILES.find(c=>c.builtin===t.id)})),slots:slots.map(s=>({...s,...(s.status==='available'?{choices:compatibleChoices(s.q,s.r,tiles,{lookahead:true})}:{})})),tiles:tiles.map(t=>({id:t.id,q:t.q,r:t.r,variant:t.variant,contract:JSON.parse(t.contract),protection:waterProtectionAt(t.q,t.r),creator:{handle:t.handle,displayName:t.display_name},packageId:t.published_version||a?.user.id===t.creator_id?t.package_id:null,name:t.published_version||a?.user.id===t.creator_id?t.name:null,title:t.published_version?t.title:null,version:t.published_version,mine:a?.user.id===t.creator_id,thumbnail:photos.get(t.id)})),variants:TILE_VARIANTS});
  }
  if(path==='/api/tiles/reserve'&&method==='POST'){
    const {user}=await requireCreator(req,env),{q,r,variant,rotation=0}=await body(req),{slots,tiles}=await tileState(env);
    const protection=protectedWaterIssue({q,r});if(protection)fail(409,protection);
    const protectedIds=JSON.stringify(tiles.filter(t=>waterProtectionAt(t.q,t.r)).map(t=>t.id));
    const current=await env.DB.prepare('SELECT COUNT(*) AS n FROM tiles WHERE creator_id=? AND id NOT IN (SELECT tile_id FROM packages WHERE tile_id IS NOT NULL) AND id NOT IN (SELECT value FROM json_each(?))').bind(user.id,protectedIds).first<{n:number}>();
    if((current?.n||0)>=2)fail(409,'Use or release your existing reservations before selecting another tile.');
    if(!slots.some(s=>s.q===q&&s.r===r&&s.status==='available'))fail(409,'Choose a free tile that shares an edge with a published world.');
    const choice=compatibleChoices(q,r,tiles).find(c=>c.variant===variant&&c.rotation===rotation);if(!choice)fail(422,'Choose a compatible layout and rotation for this position.');
    const contract=await tileContract(q,r,variant,rotation,choice.legacyEdges),issue=placementIssue(contract,tiles);if(issue)fail(409,issue);
    const id=uuid();let inserted;try{inserted=await env.DB.prepare(`INSERT INTO tiles(id,creator_id,q,r,variant,contract,created_at) SELECT ?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM tiles)=? AND NOT EXISTS(SELECT 1 FROM tiles WHERE id NOT IN (SELECT value FROM json_each(?))) AND (SELECT COUNT(*) FROM tiles WHERE creator_id=? AND id NOT IN (SELECT tile_id FROM packages WHERE tile_id IS NOT NULL) AND id NOT IN (SELECT value FROM json_each(?)))<2 RETURNING id`).bind(id,user.id,q,r,variant,JSON.stringify(contract),Date.now(),tiles.length,JSON.stringify(tiles.map(t=>t.id)),user.id,protectedIds).first();}catch{return fail(409,'Another creator just reserved this tile. Choose a different position.');}
    if(!inserted)fail(409,'The tile neighborhood changed. Refresh the map and select a compatible layout.');
    return json({id,contract,expiresAt:Date.now()+7*86400000},201);
  }
  const tm=path.match(/^\/api\/tiles\/([a-f0-9-]+)$/);
  if(tm){const {user}=await requireCreator(req,env),t=await env.DB.prepare('SELECT * FROM tiles WHERE id=? AND creator_id=?').bind(tm[1],user.id).first<any>();if(!t)fail(404,'Reservation not found.');
    if(method==='GET')return json({...parse(t),protection:waterProtectionAt(t.q,t.r)});
    if(method==='DELETE'){const inUse=await env.DB.prepare('SELECT id FROM packages WHERE tile_id=?').bind(t.id).first();if(inUse)fail(409,'This tile belongs to a world package. Delete the unpublished package first.');await env.DB.prepare('DELETE FROM tiles WHERE id=? AND creator_id=?').bind(t.id,user.id).run();return json({ok:true});}
  }
  if(path==='/api/packages'&&method==='GET'){
    if(url.searchParams.get('mine')!=='1')return json(await searchCatalog(env.DB,url.searchParams));
    const mine=url.searchParams.get('mine')==='1',a=mine?await requireCreator(req,env):null,query=(url.searchParams.get('q')||'').slice(0,100),kind=url.searchParams.get('kind')||'';
    const rows=(await env.DB.prepare(`SELECT p.*,c.handle,c.display_name,
      (SELECT version FROM versions v WHERE v.package_id=p.id ${mine?'':"AND v.state='published'"} ORDER BY v.created_at DESC LIMIT 1) AS latest_version,
      (SELECT state FROM versions v WHERE v.package_id=p.id ${mine?'':"AND v.state='published'"} ORDER BY v.created_at DESC LIMIT 1) AS state,
      (SELECT COUNT(DISTINCT creator_id) FROM installations i WHERE i.package_id=p.id AND i.removed_at IS NULL) AS installers
      FROM packages p JOIN creators c ON p.creator_id=c.id WHERE ${mine?'p.creator_id=?':"EXISTS(SELECT 1 FROM versions v WHERE v.package_id=p.id AND v.state='published') AND p.archived=0"}
      AND (p.name LIKE ? ESCAPE '\\' OR p.title LIKE ? ESCAPE '\\') AND (?='' OR p.kind=?) ORDER BY p.updated_at DESC LIMIT 200`).bind(...(mine?[a!.user.id]:[]),`%${query.replace(/[\\%_]/g,'\\$&')}%`,`%${query.replace(/[\\%_]/g,'\\$&')}%`,kind,kind).all()).results;
    return json({packages:rows});
  }
  if(path==='/api/packages/creators'&&method==='GET')return json(await searchCreators(env.DB,url.searchParams));
  if(path==='/api/packages'&&method==='POST'){
    const {user}=await requireCreator(req,env),b=await body(req);
    const metadata=discovery(b);
    if(!validName(b.name))fail(422,'Use a scoped package name.');
    await requireNamespace(env,user,b.name.slice(1).split('/')[0]);
    if(!['asset','world'].includes(b.kind)||typeof b.title!=='string'||b.title.length<2||b.title.length>100)fail(422,'Choose asset or world and a title of 2–100 characters.');
    if(typeof (b.description??'')!=='string'||(b.description||'').length>1000)fail(422,'Description is too long.');
    if((await env.DB.prepare('SELECT COUNT(*) AS n FROM packages WHERE creator_id=?').bind(user.id).first<{n:number}>())!.n>=50)fail(409,'Your account has reached its 50-package limit.');
    let tile:any=null;
    if(b.kind==='world'){tile=await env.DB.prepare('SELECT * FROM tiles WHERE id=? AND creator_id=?').bind(b.tileId||'',user.id).first<any>();if(!tile)fail(422,'Choose and reserve a tile before creating a world package.');const issue=protectedWaterIssue(tile);if(issue)fail(409,issue);}
    else if(b.tileId)fail(422,'Asset packages do not occupy a tile.');
    const id=uuid();try{await env.DB.prepare('INSERT INTO packages(id,creator_id,name,kind,title,description,tile_id,created_at,updated_at,category,tags) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind(id,user.id,b.name,b.kind,b.title,b.description||'',tile?.id||null,Date.now(),Date.now(),metadata.category,JSON.stringify(metadata.tags)).run();}catch{return fail(409,'This name or tile is already used by another package.');}
    return json({id,name:b.name,kind:b.kind,tile:tile?JSON.parse(tile.contract):null,tileId:tile?.id||null},201);
  }
  if(path==='/api/resolve'&&method==='GET'){
    const name=url.searchParams.get('name'),wanted=url.searchParams.get('version')||'latest';if(!validName(name))fail(400,'Use a scoped package name.');
    const p=await env.DB.prepare("SELECT p.*,c.handle,c.display_name FROM packages p JOIN creators c ON c.id=p.creator_id WHERE name=? AND archived=0").bind(name).first<any>();if(!p)fail(404,'Published package not found.');
    const versions=(await env.DB.prepare("SELECT * FROM versions WHERE package_id=? AND state='published'").bind(p.id).all<any>()).results.sort((a,b)=>versionCompare(b.version,a.version));
    const v=wanted==='latest'?versions[0]:versions.find(v=>v.version===wanted);if(!v)fail(404,'Published version not found.');
    return json({package:p,...parse(v),files:(await env.DB.prepare('SELECT path,bytes,sha256 FROM files WHERE version_id=? AND uploaded=1').bind(v.id).all()).results});
  }
  const pm=path.match(/^\/api\/packages\/([a-f0-9-]+)(?:\/(.*))?$/);
  if(!pm)return null;
  const [,id,action='']=pm;
  const p=await env.DB.prepare('SELECT p.*,c.handle,c.display_name FROM packages p JOIN creators c ON c.id=p.creator_id WHERE p.id=?').bind(id).first<any>();if(!p)fail(404,'Package not found.');
  const a=await auth(req,env,false),owner=a?.user.id===p.creator_id;
  const isPublic=!p.archived&&!!await env.DB.prepare("SELECT id FROM versions WHERE package_id=? AND state='published' LIMIT 1").bind(id).first();
  if(!owner&&!isPublic)fail(404,'Package not found.');
  if(action===''&&method==='GET'){
    const versions=(await env.DB.prepare(`SELECT * FROM versions WHERE package_id=? ${owner?'':"AND state='published'"}`).bind(id).all<any>()).results.sort((a,b)=>versionCompare(b.version,a.version)).map(parse);
    const tile=p.tile_id?await env.DB.prepare('SELECT id,contract FROM tiles WHERE id=?').bind(p.tile_id).first<any>():null;
    const installers=owner?(await env.DB.prepare(`SELECT c.handle,c.display_name,i.version,MAX(i.installed_at) AS installed_at,COUNT(*) AS projects FROM installations i JOIN creators c ON c.id=i.creator_id WHERE i.package_id=? AND i.removed_at IS NULL GROUP BY c.id,i.version ORDER BY installed_at DESC`).bind(id).all()).results:undefined;
    return json({package:p,versions,tile:tile?parse(tile):null,installers,owner});
  }
  if(action==='install'&&method==='POST'){
    const {user}=await requireCreator(req,env),{version,projectId}=await body(req);
    if(typeof projectId!=='string'||! /^[a-f0-9-]{36}$/.test(projectId)||!validVersion(version))fail(422,'Provide a project UUID and exact version.');
    if(!await env.DB.prepare("SELECT id FROM versions WHERE package_id=? AND version=? AND state='published'").bind(id,version).first())fail(404,'Published version not found.');
    await env.DB.prepare('INSERT INTO installations(creator_id,project_id,package_id,version,installed_at) VALUES(?,?,?,?,?) ON CONFLICT(creator_id,project_id,package_id) DO UPDATE SET version=excluded.version,installed_at=excluded.installed_at,removed_at=NULL').bind(user.id,projectId,id,version,Date.now()).run();return json({ok:true});
  }
  if(action==='install'&&method==='DELETE'){
    const {user}=await requireCreator(req,env),{projectId}=await body(req);await env.DB.prepare('UPDATE installations SET removed_at=? WHERE creator_id=? AND project_id=? AND package_id=?').bind(Date.now(),user.id,projectId||'',id).run();return json({ok:true});
  }
  const vm=action.match(/^versions\/([^/]+)(?:\/(.*))?$/);
  if(vm){const [,version,sub='']=vm,v=await env.DB.prepare('SELECT * FROM versions WHERE package_id=? AND version=?').bind(id,version).first<any>();if(!v||(!owner&&v.state!=='published'))fail(404,'Version not found.');
    if(sub==='files'&&method==='GET'){
      const f=await env.DB.prepare('SELECT * FROM files WHERE version_id=? AND path=? AND uploaded=1').bind(v.id,url.searchParams.get('path')||'').first<any>();if(!f)fail(404,'File not found.');
      const object=await env.PACKAGES.get(f.object_key);if(!object)fail(404,'File not found.');
      return new Response(object.body as any,{headers:{'Content-Type':'application/octet-stream','Content-Disposition':`attachment; filename="${f.path.split('/').pop()}"`,'Content-Security-Policy':"default-src 'none'; sandbox",'X-Content-Type-Options':'nosniff','ETag':`"${f.sha256}"`,'Cache-Control':v.state==='published'?'public, max-age=31536000, immutable':'private, no-store','Access-Control-Allow-Origin':'*'}});
    }
    if(!owner)fail(403,'You do not own this package.');
    if(sub==='files'&&method==='PUT'){
      if(!['uploading','rejected'].includes(v.state))fail(409,'Validated versions are immutable. Create a new version.');
      const f=await env.DB.prepare('SELECT * FROM files WHERE version_id=? AND path=?').bind(v.id,url.searchParams.get('path')||'').first<any>();if(!f)fail(404,'File was not declared in the manifest.');
      const data=await bytes(req,f.bytes);if(data.length!==f.bytes||await sha256(data)!==f.sha256)fail(422,'File size or SHA-256 does not match the manifest.');
      await env.PACKAGES.put(f.object_key,data,{httpMetadata:{contentType:'application/octet-stream'}});
      const written=await env.DB.prepare('UPDATE files SET uploaded=1 WHERE version_id=? AND path=? RETURNING path').bind(v.id,f.path).first();if(!written){await env.PACKAGES.delete(f.object_key);fail(409,'This draft was deleted during upload.');}return json({ok:true});
    }
    if(sub==='validate'&&method==='POST'){
      if(!['uploading','rejected'].includes(v.state))return json({state:v.state,report:JSON.parse(v.report||'{}')});
      const manifest=JSON.parse(v.manifest),files=(await env.DB.prepare('SELECT * FROM files WHERE version_id=?').bind(v.id).all<any>()).results,errors:string[]=[],metrics:Record<string,unknown>={};
      const codeFiles=new Map<string,Uint8Array>(files.filter(f=>f.uploaded).map(f=>[f.path,new Uint8Array()]));
      for(const f of files){if(!f.uploaded){errors.push(`Upload ${f.path}.`);continue;}const roles=manifest.kind==='world'?Object.entries(manifest.content).filter(([,path])=>path===f.path).map(([role])=>role):f.path.endsWith('.glb')?['asset']:[];
        const isCode=JAVASCRIPT_EXT.test(f.path)||f.path==='package.json'||f.path===manifest.runtime?.coverage;if(!roles.length&&!isCode)continue;const object=await env.PACKAGES.get(f.object_key);if(!object){errors.push(`${f.path} is missing.`);continue;}
        const data=await object.arrayBuffer();if(isCode)codeFiles.set(f.path,new Uint8Array(data));for(const role of roles)try{metrics[role]=inspectGLB(data,role,manifest.tile);}catch(error){errors.push(`${f.path}: ${(error as Error).message}`);}
      }
      const code=validateCodeFiles(codeFiles,manifest);errors.push(...code.diagnostics.filter(d=>d.severity==='error').map(d=>`${d.file}: ${d.message}`));
      errors.push(...validateRuntimeFiles(manifest,codeFiles));
      const report={errors,metrics,code:{modules:code.modules,executed:false,diagnostics:code.diagnostics},validatedAt:Date.now()},state=errors.length?'rejected':'ready';
      const updated=await env.DB.prepare("UPDATE versions SET state=?,report=? WHERE id=? AND state IN ('uploading','rejected') RETURNING id").bind(state,JSON.stringify(report),v.id).first();if(!updated)fail(409,'This version changed during validation. Refresh its status.');return json({state,report},errors.length?422:200);
    }
    if(sub==='publish'&&method==='POST'){
      if(v.state==='published')return json({state:'published'});if(v.state!=='ready')fail(409,'Validate this version before publishing.');
      const snapshot=await tileState(env);if(p.tile_id){const tile=snapshot.tiles.find(t=>t.id===p.tile_id);if(!tile)fail(409,'The world tile is no longer reserved.');const issue=navigationIssue(JSON.parse(tile.contract),snapshot.tiles);if(issue)fail(409,issue);}
      const result=await env.DB.batch([env.DB.prepare("UPDATE versions SET state='published',published_at=? WHERE id=? AND state='ready' AND (SELECT COUNT(*) FROM tiles)=? AND NOT EXISTS(SELECT 1 FROM tiles WHERE id NOT IN (SELECT value FROM json_each(?))) RETURNING id").bind(Date.now(),v.id,snapshot.tiles.length,JSON.stringify(snapshot.tiles.map(t=>t.id))),env.DB.prepare("UPDATE packages SET updated_at=?,title=?,description=? WHERE id=? AND EXISTS(SELECT id FROM versions WHERE id=? AND state='published')").bind(Date.now(),JSON.parse(v.manifest).title,JSON.parse(v.manifest).description,id,v.id)]);
      if(!result[0].results.length)fail(409,'The version changed before it could be published.');
      return json({state:'published',tileId:p.tile_id});
    }
    if(sub===''&&method==='DELETE'){
      if(v.state==='published')fail(409,'Published versions are immutable. Publish a new version.');
      const files=(await env.DB.prepare('SELECT object_key FROM files WHERE version_id=?').bind(v.id).all<any>()).results;
      const removed=await env.DB.prepare("DELETE FROM versions WHERE id=? AND state!='published' RETURNING id").bind(v.id).first();if(!removed)fail(409,'This version was published or deleted. Published files cannot be removed.');if(files.length)await env.PACKAGES.delete(files.map(f=>f.object_key));return json({ok:true});
    }
  }
  if(!owner)fail(403,'You do not own this package.');
  if(action===''&&method==='PATCH'){
    const input=await body(req),metadata=discovery({category:input.category??p.category,tags:input.tags??JSON.parse(p.tags)});
    await env.DB.prepare('UPDATE packages SET category=?,tags=? WHERE id=? AND creator_id=?').bind(metadata.category,JSON.stringify(metadata.tags),id,a!.user.id).run();
    return json(metadata);
  }
  if(action==='versions'&&method==='POST'){
    const manifest=await body(req),tile=p.tile_id?JSON.parse((await env.DB.prepare('SELECT contract FROM tiles WHERE id=?').bind(p.tile_id).first<any>()).contract):undefined;
    if(tile){const issue=protectedWaterIssue(tile);if(issue)fail(409,issue);}
    const errors=await validateManifest(manifest,tile);if(manifest.name!==p.name||manifest.kind!==p.kind)errors.push('Package identity and kind cannot change.');
    if(errors.length)fail(422,'Package manifest is invalid.',errors);
    const deps:any[]=[];
    for(const [name,version] of Object.entries(manifest.dependencies||{})){
      const dep=await env.DB.prepare("SELECT p.id FROM packages p JOIN versions v ON v.package_id=p.id WHERE p.name=? AND p.kind='asset' AND p.archived=0 AND v.version=? AND v.state='published'").bind(name,version as string).first<any>();if(!dep)fail(422,`Dependency ${name}@${version} must be a published asset package.`);deps.push({id:dep.id,version});
    }
    const usage=await env.DB.prepare('SELECT COALESCE(SUM(f.bytes),0) AS bytes,COUNT(DISTINCT v.id) AS versions FROM packages p JOIN versions v ON v.package_id=p.id JOIN files f ON f.version_id=v.id WHERE p.creator_id=?').bind(a!.user.id).first<any>();
    if(usage.bytes+manifest.files.reduce((n:number,f:any)=>n+f.bytes,0)>2*1024**3||usage.versions>=500)fail(409,'Account storage quota reached. Remove unused draft versions.');
    const vid=uuid();try{await env.DB.batch([
      env.DB.prepare("INSERT INTO versions(id,package_id,version,state,manifest,created_at) VALUES(?,?,?,'uploading',?,?)").bind(vid,id,manifest.version,JSON.stringify(manifest),Date.now()),
      ...manifest.files.map((f:any)=>env.DB.prepare('INSERT INTO files(version_id,path,bytes,sha256,object_key) VALUES(?,?,?,?,?)').bind(vid,f.path,f.bytes,f.sha256,`${a!.user.id}/${id}/${vid}/${f.sha256}/${f.path}`)),
      ...deps.map(d=>env.DB.prepare('INSERT INTO dependencies(version_id,package_id,version) VALUES(?,?,?)').bind(vid,d.id,d.version)),
      env.DB.prepare('UPDATE packages SET updated_at=? WHERE id=?').bind(Date.now(),id),
    ]);}catch{return fail(409,'This version already exists. Use a new version, or remove the unpublished version first.');}
    return json({id:vid,version:manifest.version,state:'uploading'},201);
  }
  if(action===''&&method==='DELETE'){
    if(isPublic)fail(409,'Published packages cannot be deleted. Existing installations must remain reproducible.');
    const files=(await env.DB.prepare('SELECT f.object_key FROM files f JOIN versions v ON v.id=f.version_id WHERE v.package_id=?').bind(id).all<any>()).results;
    const removed=await env.DB.batch([env.DB.prepare("DELETE FROM versions WHERE package_id=? AND state!='published'").bind(id),env.DB.prepare("DELETE FROM packages WHERE id=? AND NOT EXISTS(SELECT id FROM versions WHERE package_id=? AND state='published') RETURNING id").bind(id,id)]);if(!removed[1].results.length)fail(409,'This package was published and cannot be deleted.');
    if(p.tile_id)await env.DB.prepare('UPDATE tiles SET created_at=? WHERE id=?').bind(Date.now(),p.tile_id).run();
    for(let i=0;i<files.length;i+=500)await env.PACKAGES.delete(files.slice(i,i+500).map(f=>f.object_key));return json({ok:true});
  }
  return null;
}
