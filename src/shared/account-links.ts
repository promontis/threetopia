export const CREATORS_ORIGIN = 'https://creators.threetopia.com';
export const ACCOUNT_ORIGINS = new Set([
  'https://threetopia.com',
  'https://www.threetopia.com',
  'https://docs.threetopia.com',
  CREATORS_ORIGIN,
]);

/** Login may return to our own sites, never an arbitrary URL from a query string. */
export function accountReturnTo(value: string | null, origin = CREATORS_ORIGIN): string {
  const fallback = '/packages/my';
  if (!value || !/^(\/|https:\/\/)/.test(value) || /[\\\u0000-\u001f]/.test(value)) return fallback;
  try {
    const url = new URL(value, origin);
    if (url.username || url.password || (url.origin !== origin && !ACCOUNT_ORIGINS.has(url.origin))) return fallback;
    if (url.origin === origin && /^\/(login|signup)\/?$/.test(url.pathname)) return fallback;
    return url.origin === origin ? url.pathname + url.search + url.hash : url.href;
  } catch { return fallback; }
}

export function accountOrigin(site: string | undefined, page: URL): string {
  return site === 'creators' || ['localhost', '127.0.0.1', '[::1]'].includes(page.hostname)
    ? page.origin : CREATORS_ORIGIN;
}
