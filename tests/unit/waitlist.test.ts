import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker, { type Env } from '../../src/server/index.ts';
import { validateSignup } from '../../src/server/validation.ts';

// Exercise the production SQL against SQLite, including UPSERT/RETURNING and
// constraints. Browser tests below use Cloudflare's real local D1 binding.
let sqlite: DatabaseSync;
let env: Env;
beforeEach(() => {
  sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../../migrations/0001_waitlist.sql', import.meta.url), 'utf8'));
  const prepare = (query: string, values: (string | number | null)[] = []) => ({
    bind: (...bound: (string | number | null)[]) => prepare(query, bound),
    first: async () => sqlite.prepare(query).get(...values) ?? null,
    run: async () => sqlite.prepare(query).run(...values),
  });
  env = {
    WAITLIST_DB: { prepare } as unknown as Env['WAITLIST_DB'],
    WAITLIST_LOCAL: 'true',
    WAITLIST_LIMITER: { limit: vi.fn(async () => ({ success: true })) },
    ASSETS: { fetch: vi.fn(async () => new Response('static')) },
  };
});
afterEach(() => { sqlite.close(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
const site = 'http://localhost:5190';
const signup = (data: Record<string, unknown>, origin = site) => worker.fetch(new Request(`${origin}/api/waitlist`, {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1' }, body: JSON.stringify(data),
}), env);
const rows = () => sqlite.prepare('SELECT * FROM waitlist').all();
async function localSignup(data: Record<string, unknown> = {}) {
  const result = await (await signup({ email: 'creator@example.com', ...data })).json() as { previewUrl: string };
  return new URL(result.previewUrl, site).searchParams.get('token')!;
}
const tokenRequest = (token: string, action = 'confirm', method = 'GET') => worker.fetch(new Request(`${site}/waitlist/${action}?token=${token}`, {
  method, ...(method === 'POST' ? { headers: { Origin: site }, body: new URLSearchParams({ token }) } : {}),
}), env);
const production = () => Object.assign(env, {
  WAITLIST_LOCAL: 'false', SITE_URL: 'https://threetopia.example', TURNSTILE_SITE_KEY: 'real-site-key',
  TURNSTILE_SECRET_KEY: 'real-secret-key', WAITLIST_FROM: 'hello@threetopia.example',
  WAITLIST_EMAIL: { send: vi.fn(async () => ({ messageId: 'test-message-id' })) },
});
const verified = () => Response.json({ success: true, hostname: 'threetopia.example', action: 'waitlist' });

describe('waitlist', () => {
  it('accepts an email alone and normalizes optional X handles and profiles', () => {
    expect(validateSignup({ email: ' Creator@Example.com ' }).data).toEqual({ email: 'creator@example.com', projectUrl: null, xHandle: null });
    for (const xHandle of ['@your_name', 'your_name', 'https://x.com/your_name']) {
      expect(validateSignup({ email: 'a@example.com', xHandle, projectUrl: 'https://example.com/demo' }).data?.xHandle).toBe('your_name');
    }
  });
  it('rejects invalid email, executable project URLs and malformed handles without storing anything', async () => {
    const response = await signup({ email: 'broken', projectUrl: 'javascript:alert(1)', xHandle: '@two words' });
    expect(response.status).toBe(422);
    expect(Object.keys((await response.json() as { errors: object }).errors)).toEqual(['email', 'projectUrl', 'xHandle']);
    expect(rows()).toHaveLength(0);
  });
  it('stores a pending signup, hashes the token and confirms only after an explicit POST', async () => {
    const token = await localSignup({ projectUrl: 'https://example.com/demo', xHandle: '@maker' });
    expect(rows()[0]).toMatchObject({ email: 'creator@example.com', project_url: 'https://example.com/demo', x_handle: 'maker', confirmed_at: null });
    expect(rows()[0].token_hash).not.toBe(token);
    expect(await (await tokenRequest(token)).text()).toContain('Confirm my email');
    expect(rows()[0].confirmed_at).toBeNull();
    expect(await (await tokenRequest(token, 'confirm', 'POST')).text()).toContain('You’re on the list.');
    expect(rows()[0].confirmed_at).toEqual(expect.any(Number));
    expect(await (await tokenRequest(token, 'confirm', 'POST')).text()).toContain('You’re on the list.');
  });
  it('deduplicates case-insensitively and never overwrites confirmed details', async () => {
    const token = await localSignup({ xHandle: 'original' });
    await tokenRequest(token, 'confirm', 'POST');
    expect((await signup({ email: 'CREATOR@example.com', xHandle: 'impostor' })).status).toBe(200);
    expect(rows()).toHaveLength(1);
    expect(rows()[0].x_handle).toBe('original');
    expect(rows()[0].send_count).toBe(1);
  });
  it('enforces a resend cooldown and a daily cap, including simultaneous requests', async () => {
    await Promise.all([localSignup(), signup({ email: 'creator@example.com' })]);
    expect(rows()).toHaveLength(1);
    expect(rows()[0].send_count).toBe(1);
    sqlite.prepare('UPDATE waitlist SET last_sent_at = 0, send_count = 5').run();
    expect(await (await signup({ email: 'creator@example.com' })).json()).not.toHaveProperty('previewUrl');
    sqlite.prepare('UPDATE waitlist SET send_window_at = 0').run();
    expect(await (await signup({ email: 'creator@example.com' })).json()).toHaveProperty('previewUrl');
    expect(rows()[0].send_count).toBe(1);
  });
  it('rejects expired tokens and permits removal without a destructive GET', async () => {
    const token = await localSignup();
    sqlite.prepare('UPDATE waitlist SET token_expires_at = 0').run();
    expect(await (await tokenRequest(token, 'confirm', 'POST')).text()).toContain('This link has expired.');
    expect(rows()[0].confirmed_at).toBeNull();
    await tokenRequest(token, 'remove');
    expect(rows()).toHaveLength(1);
    expect(await (await tokenRequest(token, 'remove', 'POST')).text()).toContain('You’ve been removed.');
    expect(rows()).toHaveLength(0);
  });
  it('rejects cross-origin submissions and oversized bodies, and ignores honeypots', async () => {
    const response = await worker.fetch(new Request(`${site}/api/waitlist`, { method: 'POST', headers: { Origin: 'https://elsewhere.example' } }), env);
    expect(response.status).toBe(403);
    expect((await signup({ email: 'a@example.com', xHandle: 'x'.repeat(9000) })).status).toBe(400);
    expect((await signup({ email: 'a@example.com', company: 'bot' })).status).toBe(200);
    expect(rows()).toHaveLength(0);
  });
  it('never enables local bypass or exposes a preview on a public hostname', async () => {
    expect((await signup({ email: 'a@example.com' }, 'https://threetopia.example')).status).toBe(503);
    const config = await worker.fetch(new Request('https://threetopia.example/api/waitlist/config'), env);
    expect(await config.json()).toMatchObject({ enabled: false, local: false });
    const preview = await worker.fetch(new Request('https://threetopia.example/waitlist/preview?token=anything'), env);
    expect(preview.status).toBe(404);
    expect(rows()).toHaveLength(0);
  });
  it('verifies Turnstile hostname and action before sending or storing', async () => {
    production();
    const fetcher = vi.fn(async () => Response.json({ success: true, hostname: 'attacker.example', action: 'waitlist' }));
    vi.stubGlobal('fetch', fetcher);
    expect((await signup({ email: 'a@example.com', turnstileToken: 'token' }, env.SITE_URL)).status).toBe(400);
    fetcher.mockImplementation(async () => Response.json({ success: true, hostname: 'threetopia.example', action: 'wrong-action' }));
    expect((await signup({ email: 'a@example.com', turnstileToken: 'token' }, env.SITE_URL)).status).toBe(400);
    expect(rows()).toHaveLength(0);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
  it('sends the confirmation through Cloudflare and releases the claim after delivery failure', async () => {
    production();
    const send = vi.fn().mockRejectedValueOnce(new Error('Email unavailable')).mockResolvedValueOnce({ messageId: 'test-message-id' });
    env.WAITLIST_EMAIL = { send };
    const fetcher = vi.fn().mockImplementation(async () => verified());
    vi.stubGlobal('fetch', fetcher);
    const data = { email: 'a@example.com', turnstileToken: 'fresh-token', xHandle: '@maker' };
    expect((await signup(data, env.SITE_URL)).status).toBe(503);
    expect(rows()[0].last_sent_at).toBe(0);
    const response = await signup(data, env.SITE_URL);
    expect(response.status).toBe(200);
    expect(await response.json()).not.toHaveProperty('previewUrl');
    const [mail] = send.mock.calls[1];
    expect(mail.to).toBe('a@example.com');
    expect(mail.from).toEqual({ email: 'hello@threetopia.example', name: 'Threetopia' });
    expect(mail.html).toContain('https://threetopia.example/waitlist/confirm?token=');
    expect(mail.text).toContain('/waitlist/remove?token=');
    expect(send).toHaveBeenCalledTimes(2);
    expect(rows()[0].send_count).toBe(1);
  });
  it('rate limits production requests before contacting any provider', async () => {
    production();
    env.WAITLIST_LIMITER.limit = vi.fn(async () => ({ success: false }));
    const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
    expect((await signup({ email: 'a@example.com' }, env.SITE_URL)).status).toBe(429);
    expect(fetcher).not.toHaveBeenCalled();
    expect(rows()).toHaveLength(0);
  });
  it('serves both static page routes and provides no public export endpoint', async () => {
    expect(await (await worker.fetch(new Request(`${site}/world/`), env)).text()).toBe('static');
    expect((await worker.fetch(new Request(`${site}/api/waitlist/export`), env)).status).toBe(404);
  });
  it('counts only confirmed creators, without exposing signup details or counting duplicates', async () => {
    const count = () => worker.fetch(new Request(`${site}/api/creators/count`), env);
    expect(await (await count()).json()).toEqual({ count: 0 });
    const token = await localSignup({ xHandle: 'private_handle', projectUrl: 'https://example.com/private-project' });
    await localSignup({ email: 'pending@example.com' });
    expect(await (await count()).json()).toEqual({ count: 0 });
    await tokenRequest(token, 'confirm', 'POST');
    await signup({ email: 'CREATOR@example.com' });
    const response = await count();
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.json()).toEqual({ count: 1 });
    await tokenRequest(token, 'remove', 'POST');
    expect(await (await count()).json()).toEqual({ count: 0 });
  });
  it('keeps the creator count read-only and reports database failure instead of a false zero', async () => {
    const post = await worker.fetch(new Request(`${site}/api/creators/count`, { method: 'POST' }), env);
    expect(post.status).toBe(405);
    expect(post.headers.get('Allow')).toBe('GET');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    env.WAITLIST_DB.prepare = vi.fn(() => { throw new Error('Database unavailable'); });
    const response = await worker.fetch(new Request(`${site}/api/creators/count`), env);
    expect(response.status).toBe(503);
    expect(await response.json()).not.toHaveProperty('count');
  });
  it('redirects www and HTTP to the canonical origin while preserving the path and query', async () => {
    production();
    for (const origin of ['https://www.threetopia.example', 'http://threetopia.example']) {
      const response = await worker.fetch(new Request(`${origin}/world/?source=link`), env);
      expect(response.status).toBe(308);
      expect(response.headers.get('Location')).toBe('https://threetopia.example/world/?source=link');
    }
  });
});
