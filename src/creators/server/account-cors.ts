import {ACCOUNT_ORIGINS} from '../../shared/account-links';

function accountMethod(path: string) {
  return path === '/api/me' ? 'GET' : path === '/api/auth/logout' ? 'POST' : null;
}

/** Only identity lookup and browser logout are shared with our other websites. */
export function accountPreflight(req: Request): Response | null {
  const method = accountMethod(new URL(req.url).pathname);
  if (req.method !== 'OPTIONS' || !method) return null;
  const origin = req.headers.get('Origin') || '';
  const requestedHeaders = (req.headers.get('Access-Control-Request-Headers') || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  if (!ACCOUNT_ORIGINS.has(origin) || req.headers.get('Access-Control-Request-Method') !== method || requestedHeaders.some(h => h !== 'content-type')) {
    return new Response(null, {status:403, headers:{Vary:'Origin'}});
  }
  return accountCors(req, new Response(null, {status:204, headers:{
    'Access-Control-Allow-Methods':method,
    'Access-Control-Allow-Headers':'Content-Type',
    'Access-Control-Max-Age':'600',
  }}));
}

export function accountCors(req: Request, response: Response): Response {
  const method = accountMethod(new URL(req.url).pathname);
  if (!method) return response;
  response.headers.delete('Access-Control-Allow-Origin');
  response.headers.set('Vary', 'Origin');
  const origin = req.headers.get('Origin') || '';
  if (ACCOUNT_ORIGINS.has(origin) && (req.method === method || req.method === 'OPTIONS')) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}
