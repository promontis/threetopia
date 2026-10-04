import {auth,body,cookie,fail,json,local,profile,sameOrigin,accountOrigin,token,uuid,type Env,type Creator} from './common';
import {sha256} from '../../../packages/platform/tiles.js';
const DAY=86400000;
export async function authRoutes(req:Request,env:Env,path:string):Promise<Response|null>{
  if(path==='/api/me'&&req.method==='GET'){const a=await auth(req,env,false);return json({creator:a?profile(a.user):null});}
  if(path==='/api/auth/start'&&req.method==='POST'){
    sameOrigin(req);const {email:raw}=await body(req),email=typeof raw==='string'?raw.trim().toLowerCase():'';
    if(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email))fail(422,'Enter a valid email address.');
    if(!local(req,env)&&(!env.AUTH_EMAIL||!env.AUTH_LIMITER||!(await env.AUTH_LIMITER.limit({key:`login:${req.headers.get('CF-Connecting-IP')||'unknown'}`})).success))fail(429,'Please wait a minute before trying again.');
    const now=Date.now(),id=uuid();
    const recent=await env.DB.prepare('SELECT COUNT(*) AS n,MAX(created_at) AS last FROM challenges WHERE email=? AND created_at>?').bind(email,now-DAY).first<{n:number;last:number}>();
    if(recent&&(recent.n>=10||recent.last>now-60000))fail(429,'A code was requested recently. Check your inbox or try again later.');
    const code=String(crypto.getRandomValues(new Uint32Array(1))[0]%100000000).padStart(8,'0');
    await env.DB.prepare('INSERT INTO challenges(id,email,code_hash,expires_at,created_at) VALUES(?,?,?,?,?)').bind(id,email,await sha256(`${id}:${code}`),now+10*60000,now).run();
    if(local(req,env))return json({challenge:id,expiresIn:600,developmentCode:code});
    try{await env.AUTH_EMAIL!.send({from:{email:env.AUTH_FROM,name:'Threetopia'},to:email,subject:'Your Threetopia sign-in code',text:`Your Threetopia sign-in code is ${code}. It expires in 10 minutes.\n\nOnly enter this code at https://creators.threetopia.com. If you did not request it, ignore this email.`,html:`<p>Your Threetopia sign-in code:</p><p style="font:32px monospace;letter-spacing:5px"><strong>${code}</strong></p><p>Expires in 10 minutes. Only enter it at <a href="https://creators.threetopia.com">creators.threetopia.com</a>.</p><p>If you did not request this code, ignore this email.</p>`});}
    catch{await env.DB.prepare('DELETE FROM challenges WHERE id=?').bind(id).run();return fail(503,'We could not send a code. Please try again shortly.');}
    return json({challenge:id,expiresIn:600});
  }
  if(path==='/api/auth/verify'&&req.method==='POST'){
    sameOrigin(req);const {challenge,code}=await body(req);if(typeof challenge!=='string'||typeof code!=='string'||!/^\d{8}$/.test(code))fail(400,'Enter the eight-digit code.');
    const row=await env.DB.prepare('UPDATE challenges SET attempts=attempts+1 WHERE id=? AND consumed_at IS NULL AND expires_at>? AND attempts<5 RETURNING email,code_hash').bind(challenge,Date.now()).first<{email:string;code_hash:string}>();
    if(!row||row.code_hash!==await sha256(`${challenge}:${code}`))fail(401,'The code is invalid or expired. Request a new code if needed.');
    const consumed=await env.DB.prepare('UPDATE challenges SET consumed_at=? WHERE id=? AND consumed_at IS NULL RETURNING id').bind(Date.now(),challenge).first();if(!consumed)fail(401,'This code has already been used.');
    await env.DB.prepare('INSERT INTO creators(id,email,created_at) VALUES(?,?,?) ON CONFLICT(email) DO NOTHING').bind(uuid(),row.email,Date.now()).run();
    const user=(await env.DB.prepare('SELECT * FROM creators WHERE email=?').bind(row.email).first<Creator>())!;
    const secret=token();await env.DB.prepare('INSERT INTO credentials(hash,creator_id,kind,label,created_at,expires_at,last_used_at) VALUES(?,?,?,?,?,?,?)').bind(await sha256(secret),user.id,'session','Browser session',Date.now(),Date.now()+7*DAY,Date.now()).run();
    return json({creator:profile(user)},200,{'Set-Cookie':cookie(req,secret)});
  }
  if(path==='/api/profile'&&req.method==='PATCH'){
    const a=(await auth(req,env))!,b=await body(req);
    if(typeof b.displayName!=='string'||b.displayName.trim().length<2||b.displayName.length>60)fail(422,'Your display name must contain 2–60 characters.');
    const handle=String(b.handle||'');if(!/^[a-z][a-z0-9-]{2,29}$/.test(handle)||(['threetopia','admin','support','api','docs','creators','system'].includes(handle)&&a.user.handle!==handle))fail(422,'Choose a handle with 3–30 lowercase letters, numbers and hyphens.');
    if(a.user.handle&&a.user.handle!==handle)fail(409,'Handles are permanent because they identify your packages.');
    let changed;try{changed=await env.DB.prepare('UPDATE creators SET handle=?,display_name=? WHERE id=? AND (handle IS NULL OR handle=?) RETURNING id').bind(handle,b.displayName.trim(),a.user.id,handle).first();}catch{return fail(409,'This handle is already taken.');}
    if(!changed)fail(409,'Your handle has already been set and cannot change.');
    return json({creator:profile({...a.user,handle,display_name:b.displayName.trim()})});
  }
  if(path==='/api/auth/logout'&&req.method==='POST'){const a=await auth(req,env,false);if(a?.kind!=='cli')accountOrigin(req);if(a)await env.DB.prepare('DELETE FROM credentials WHERE hash=?').bind(a.hash).run();return json({ok:true},200,{'Set-Cookie':cookie(req,'',0)});}
  if(path==='/api/auth/device'&&req.method==='POST'){
    await body(req);
    if(!local(req,env)&&!(await env.AUTH_LIMITER.limit({key:`device:${req.headers.get('CF-Connecting-IP')||'unknown'}`})).success)fail(429,'Too many login attempts.');
    const secret=token(),userCode=token().slice(0,8).toUpperCase(),now=Date.now();
    await env.DB.prepare('INSERT INTO devices(hash,user_code,expires_at,created_at) VALUES(?,?,?,?)').bind(await sha256(secret),userCode,now+600000,now).run();
    return json({deviceCode:secret,userCode,verificationUri:`${new URL(req.url).origin}/device?code=${userCode}`,expiresIn:600,interval:3});
  }
  if(path==='/api/auth/device/poll'&&req.method==='POST'){
    const {deviceCode}=await body(req);if(typeof deviceCode!=='string'||!/^[a-f0-9]{64}$/.test(deviceCode))fail(400,'Invalid device code.');
    const hash=await sha256(deviceCode),d=await env.DB.prepare('SELECT * FROM devices WHERE hash=? AND expires_at>?').bind(hash,Date.now()).first<any>();
    if(!d||d.status==='consumed')fail(410,'Login request has expired.');if(d.status==='denied')fail(403,'Login request was denied.');if(d.status==='pending')return json({status:'pending'},202);
    const claimed=await env.DB.prepare("UPDATE devices SET status='consumed' WHERE hash=? AND status='approved' RETURNING creator_id").bind(hash).first<any>();if(!claimed)fail(410,'Login request has already been used.');
    const secret=token();await env.DB.prepare('INSERT INTO credentials(hash,creator_id,kind,label,created_at,expires_at,last_used_at) VALUES(?,?,?,?,?,?,?)').bind(await sha256(secret),claimed.creator_id,'cli','Threetopia CLI',Date.now(),Date.now()+90*DAY,Date.now()).run();
    return json({status:'approved',accessToken:secret,expiresIn:90*86400,creator:profile((await env.DB.prepare('SELECT * FROM creators WHERE id=?').bind(claimed.creator_id).first<Creator>())!)});
  }
  if(path==='/api/auth/device/approve'&&req.method==='POST'){
    const a=(await auth(req,env))!;if(a.kind!=='session')fail(403,'Approve this login in your browser.');if(!a.user.handle)fail(409,'Choose a creator handle first.');
    const {userCode,approve}=await body(req);if(typeof userCode!=='string'||!/^[A-F0-9]{8}$/.test(userCode))fail(400,'Invalid code.');
    const changed=await env.DB.prepare("UPDATE devices SET creator_id=?,status=? WHERE user_code=? AND status='pending' AND expires_at>? RETURNING hash").bind(a.user.id,approve===true?'approved':'denied',userCode,Date.now()).first();
    if(!changed)fail(410,'This login request is no longer active.');return json({ok:true});
  }
  if(path==='/api/tokens'&&req.method==='GET'){const a=(await auth(req,env))!;return json({tokens:(await env.DB.prepare("SELECT substr(hash,1,16) AS id,label,created_at,expires_at FROM credentials WHERE creator_id=? AND kind='cli' AND expires_at>? ORDER BY created_at DESC").bind(a.user.id,Date.now()).all()).results});}
  const revoke=path.match(/^\/api\/tokens\/([a-f0-9]{16})$/);if(revoke&&req.method==='DELETE'){const a=(await auth(req,env))!;await env.DB.prepare("DELETE FROM credentials WHERE creator_id=? AND kind='cli' AND substr(hash,1,16)=?").bind(a.user.id,revoke[1]).run();return json({ok:true});}
  return null;
}
