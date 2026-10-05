import {fail, type Creator, type Env} from './common';

export async function requireNamespace(env:Env, user:Creator, namespace:string) {
  const grant=await env.DB.prepare('SELECT creator_id FROM managed_namespaces WHERE namespace=?').bind(namespace).first<{creator_id:string}>();
  if(grant ? grant.creator_id!==user.id : namespace!==user.handle) fail(403,'This namespace is not managed by your account. Use your own handle or an explicitly assigned namespace.');
}
