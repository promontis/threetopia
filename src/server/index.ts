import type { D1Database, SendEmail } from '@cloudflare/workers-types';
import { confirmationEmail, messagePage } from './messages.ts';
import { hashToken, newToken, validateSignup } from './validation.ts';
import { routeWorld } from './world-routing.ts';

export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  WAITLIST_DB: D1Database;
  WAITLIST_EMAIL?: SendEmail;
  WAITLIST_LIMITER: { limit(input: { key: string }): Promise<{ success: boolean }> };
  WAITLIST_LOCAL?: string;
  SITE_URL?: string;
  WORLD_URL?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  WAITLIST_FROM?: string;
}

const DAY = 86_400_000;
const ACCEPTED = { message: 'Check your inbox to confirm your email. If you’ve already confirmed, you’re on the list.' };
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
const localMode = (request: Request, env: Env) => env.WAITLIST_LOCAL === 'true' && ['localhost', '127.0.0.1', '[::1]'].includes(new URL(request.url).hostname);

function configuration(request: Request, env: Env) {
  if (localMode(request, env)) return { origin: new URL(request.url).origin, local: true };
  try {
    const site = new URL(env.SITE_URL || '');
    if (site.protocol !== 'https:' || site.pathname !== '/' || site.search || site.hash || site.username || site.password) return null;
    if (new URL(request.url).origin !== site.origin) return null;
    if (!env.TURNSTILE_SITE_KEY || !env.TURNSTILE_SECRET_KEY || !env.WAITLIST_EMAIL || !env.WAITLIST_FROM || !env.WAITLIST_LIMITER) return null;
    // Cloudflare's always-pass testing keys must never protect the live form.
    if (/^[123]x00000000000000000000/.test(env.TURNSTILE_SITE_KEY) || /^[123]x00000000000000000000/.test(env.TURNSTILE_SECRET_KEY)) return null;
    return { origin: site.origin, local: false };
  } catch { return null; }
}

async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 8192) { await reader.cancel(); throw new Error('Request too large'); }
    chunks.push(value);
  }
  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(body);
}

async function signup(request: Request, env: Env): Promise<Response> {
  const config = configuration(request, env);
  if (!config) return json({ message: 'The waitlist is not open yet. Please try again soon.' }, 503);
  if (request.headers.get('Origin') !== config.origin) return json({ message: 'Please sign up through the Threetopia website.' }, 403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ message: 'Send the signup as JSON.' }, 415);
  if (!config.local) {
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip || !(await env.WAITLIST_LIMITER.limit({ key: `signup:${ip}` })).success) {
      return json({ message: 'Too many attempts. Please try again in a minute.' }, 429);
    }
  }
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(await readBody(request));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch { return json({ message: 'We couldn’t read your signup. Please check the fields and try again.' }, 400); }
  if (body.company) return json(ACCEPTED); // Honeypot: no insert or email.
  const { data, errors } = validateSignup(body);
  if (!data) return json({ message: 'Please check the highlighted fields.', errors }, 422);

  if (!config.local) {
    if (typeof body.turnstileToken !== 'string' || !body.turnstileToken || body.turnstileToken.length > 2048) {
      return json({ message: 'Please complete the security check and try again.' }, 400);
    }
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', signal: AbortSignal.timeout(8000),
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY!, response: body.turnstileToken, remoteip: request.headers.get('CF-Connecting-IP')! }),
    });
    const verified = await result.json() as { success?: boolean; hostname?: string; action?: string };
    if (!result.ok || !verified.success || verified.hostname !== new URL(config.origin).hostname || verified.action !== 'waitlist') {
      return json({ message: 'The security check expired. Please try again.' }, 400);
    }
  }

  const now = Date.now();
  const token = newToken();
  const tokenHash = await hashToken(token);
  // Atomically claim a delivery. Concurrent submissions cannot send twice; a
  // confirmed signup cannot be overwritten by someone who knows its address.
  const claimed = await env.WAITLIST_DB.prepare(`
    INSERT INTO waitlist (email, project_url, x_handle, created_at, token_hash, token_expires_at, last_sent_at, send_window_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      project_url = excluded.project_url, x_handle = excluded.x_handle,
      token_hash = excluded.token_hash, token_expires_at = excluded.token_expires_at,
      last_sent_at = excluded.last_sent_at,
      send_count = CASE WHEN waitlist.send_window_at <= ? THEN 1 ELSE waitlist.send_count + 1 END,
      send_window_at = CASE WHEN waitlist.send_window_at <= ? THEN excluded.send_window_at ELSE waitlist.send_window_at END
    WHERE waitlist.confirmed_at IS NULL AND waitlist.last_sent_at <= ?
      AND (waitlist.send_count < 5 OR waitlist.send_window_at <= ?)
    RETURNING email
  `).bind(data.email, data.projectUrl, data.xHandle, now, tokenHash, now + DAY, now, now,
    now - DAY, now - DAY, now - 60_000, now - DAY).first();
  if (!claimed) return json(ACCEPTED);

  if (config.local) return json({ ...ACCEPTED, previewUrl: `/waitlist/preview?token=${token}` });
  try {
    await env.WAITLIST_EMAIL!.send({
      from: { email: env.WAITLIST_FROM!, name: 'Threetopia' },
      to: data.email,
      ...confirmationEmail(config.origin, token),
    });
  } catch {
    // Release this delivery only, so a failed email can be retried immediately.
    await env.WAITLIST_DB.prepare('UPDATE waitlist SET last_sent_at = 0, send_count = MAX(0, send_count - 1) WHERE email = ? AND token_hash = ? AND confirmed_at IS NULL').bind(data.email, tokenHash).run();
    return json({ message: 'We couldn’t send the confirmation email. Please try again.' }, 503);
  }
  return json(ACCEPTED);
}

async function tokenPage(request: Request, env: Env, path: string): Promise<Response> {
  if (path === '/waitlist/preview' && !localMode(request, env)) return new Response('Not found', { status: 404 });
  if (!['GET', 'POST'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, POST' } });
  const url = new URL(request.url);
  if (request.method === 'POST' && request.headers.get('Origin') !== url.origin) return new Response('Forbidden', { status: 403 });
  const token = request.method === 'POST' ? new URLSearchParams(await readBody(request)).get('token') : url.searchParams.get('token');
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return messagePage('This link isn’t valid.', 'Return to the form to request a new confirmation email.');
  const tokenHash = await hashToken(token);
  const row = await env.WAITLIST_DB.prepare('SELECT confirmed_at, token_expires_at FROM waitlist WHERE token_hash = ?').bind(tokenHash).first<{ confirmed_at: number | null; token_expires_at: number }>();
  if (!row) return messagePage('This link is no longer active.', 'Your signup may have been removed, or a newer email has replaced this link.');
  if (path === '/waitlist/preview') {
    return new Response(confirmationEmail(url.origin, token).html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'" } });
  }
  if (path === '/waitlist/remove') {
    if (request.method === 'GET') return messagePage('Leave the waitlist?', 'This will remove your email, project link and X handle from the Threetopia waitlist.', { path, token, label: 'Remove my signup' });
    await env.WAITLIST_DB.prepare('DELETE FROM waitlist WHERE token_hash = ?').bind(tokenHash).run();
    return messagePage('You’ve been removed.', 'Your signup details have been deleted. You can join again whenever you like.');
  }
  if (row.confirmed_at) return messagePage('You’re on the list.', 'We’ll email you when the first shared world is ready for its first creators.');
  if (row.token_expires_at <= Date.now()) return messagePage('This link has expired.', 'Confirmation links last 24 hours. Return to the form and sign up again for a fresh email.');
  // GET only displays the confirmation. Email security scanners cannot opt a
  // visitor in (or remove them) just by following a link.
  if (request.method === 'GET') return messagePage('Join the first creators.', 'Confirm your email to get an invite when the first shared world is ready.', { path, token, label: 'Confirm my email' });
  const updated = await env.WAITLIST_DB.prepare('UPDATE waitlist SET confirmed_at = ? WHERE token_hash = ? AND confirmed_at IS NULL AND token_expires_at > ? RETURNING email').bind(Date.now(), tokenHash, Date.now()).first();
  return updated
    ? messagePage('You’re on the list.', 'We’ll email you when the first shared world is ready for its first creators.')
    : messagePage('This link has expired.', 'Return to the form to request a new confirmation email.');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    try {
      if(path==='/docs'||path.startsWith('/docs/'))return Response.redirect('https://docs.threetopia.com/'+path.replace(/^\/docs\/?/,''),308);
      if(env.SITE_URL&&env.WORLD_URL){
        const world=await routeWorld(request,env.ASSETS,env.SITE_URL,env.WORLD_URL);
        if(world)return world;
      }
      if (env.SITE_URL) {
        const canonical = new URL(env.SITE_URL);
        if (url.hostname === `www.${canonical.hostname}` || (url.hostname === canonical.hostname && url.protocol === 'http:')) {
          return Response.redirect(`${canonical.origin}${path}${url.search}`, 308);
        }
      }
      if (path === '/api/waitlist/config' && request.method === 'GET') {
        const config = configuration(request, env);
        return json({ enabled: !!config, local: !!config?.local, siteKey: config?.local ? '' : env.TURNSTILE_SITE_KEY || '' });
      }
      if (path === '/api/creators/count') {
        if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET' } });
        const result = await env.WAITLIST_DB.prepare('SELECT COUNT(*) AS count FROM waitlist WHERE confirmed_at IS NOT NULL').first<{ count: number }>();
        if (!result) throw new Error('Creator count unavailable');
        return json({ count: result.count });
      }
      if (path === '/api/waitlist') {
        return request.method === 'POST' ? await signup(request, env) : new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
      }
      if (['/waitlist/confirm', '/waitlist/remove', '/waitlist/preview'].includes(path)) return await tokenPage(request, env, path);
      if (path.startsWith('/api/') || path.startsWith('/waitlist/')) return new Response('Not found', { status: 404 });
      return env.ASSETS.fetch(request);
    } catch {
      // Never log request bodies, email addresses, tokens or provider responses.
      console.error('Waitlist request failed');
      return path.startsWith('/api/')
        ? json({ message: 'Something went wrong. Please try again in a moment.' }, 503)
        : messagePage('Please try again.', 'We couldn’t update your signup just now. Please reopen the link in a moment.');
    }
  },
};
