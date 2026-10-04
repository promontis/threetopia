import {accountOrigin, accountReturnTo} from './account-links';

export interface SiteAccountUser { id: string; displayName: string; handle: string | null; email: string }
interface AccountOptions {
  loadSession?: boolean;
  onSessionChange?: (creator: SiteAccountUser | null) => void;
  onLogout?: () => void;
}
const esc = (text: string) => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const chevron = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none"><path d="m4 6 4 4 4-4"/></svg>';

export function mountSiteAccount(options: AccountOptions = {}) {
  const root = document.querySelector<HTMLElement>('[data-site-account]')!;
  const site = root.closest<HTMLElement>('[data-site]')?.dataset.site;
  const origin = accountOrigin(site, new URL(location.href));
  const href = (path: string) => origin === location.origin ? path : origin + path;
  const nav = site === 'creators' ? ' data-nav' : '';
  let creator: SiteAccountUser | null = null, request = 0, signingOut = false;

  function close(returnFocus = false) {
    const trigger = root.querySelector<HTMLButtonElement>('[data-account-trigger]');
    const panel = root.querySelector<HTMLElement>('[data-account-panel]');
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    trigger?.setAttribute('aria-expanded', 'false');
    if (returnFocus) trigger?.focus();
  }

  function render() {
    if (!creator) {
      const page = new URL(location.href);
      const next = site === 'creators'
        ? accountReturnTo(/^\/(login|signup)$/.test(page.pathname) ? page.searchParams.get('next') : page.pathname + page.search + page.hash, origin)
        : page.href;
      const query = '?next=' + encodeURIComponent(next);
      root.innerHTML = `<a class="site-sign-in" href="${esc(href('/login' + query))}"${nav}>Sign in</a><a class="site-cta" href="${esc(href('/signup' + query))}"${nav}>Sign up</a>`;
      return;
    }
    const name = creator.displayName || creator.handle || 'Your account';
    const initial = (creator.displayName || creator.handle || creator.email || '?')[0].toUpperCase();
    root.innerHTML = `<button type="button" class="site-account" data-account-trigger aria-label="Account menu" aria-expanded="false" aria-controls="site-account-panel"><span class="site-account-name">${esc(creator.handle ? '@' + creator.handle : name)}</span><span class="site-account-avatar" aria-hidden="true">${esc(initial)}</span>${chevron}</button>
      <div class="site-account-panel" id="site-account-panel" data-account-panel hidden>
        <div class="site-account-identity"><strong>${esc(name)}</strong><span>${esc(creator.email)}</span></div>
        <nav class="site-account-links" aria-label="Account">
          <a href="${href('/profile')}"${nav}>Profile</a><a href="${href('/settings')}"${nav}>Settings</a>
          <div class="site-account-divider"></div>
          <a href="${href('/packages/my')}"${nav}>My packages</a><a href="${href('/tiles/my')}"${nav}>My tiles</a>
          <div class="site-account-divider"></div>
          <button type="button" data-account-logout>Log out <span aria-hidden="true">↗</span></button>
        </nav>
        <p class="site-account-error" data-account-error role="alert" hidden></p>
      </div>`;
  }

  function setCreator(value: SiteAccountUser | null) {
    ++request; // A session lookup started before login/logout must not restore old state.
    if (creator && JSON.stringify(creator) === JSON.stringify(value)) return;
    creator = value;
    render();
  }

  async function refresh() {
    if (signingOut) return;
    const current = ++request;
    try {
      const response = await fetch(origin + '/api/me', {credentials:'include', cache:'no-store', signal:AbortSignal.timeout(8000)});
      if (!response.ok) return;
      const data = await response.json() as {creator: SiteAccountUser | null};
      if (current !== request) return;
      const changed = JSON.stringify(creator) !== JSON.stringify(data.creator);
      setCreator(data.creator);
      if (changed) options.onSessionChange?.(data.creator);
    } catch { /* Keep working sign-in links when the registry is temporarily unavailable. */ }
  }

  async function logout() {
    if (signingOut) return;
    signingOut = true;
    ++request;
    const button = root.querySelector<HTMLButtonElement>('[data-account-logout]');
    if (button) { button.disabled = true; button.textContent = 'Logging out…'; }
    try {
      const response = await fetch(origin + '/api/auth/logout', {method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:'{}', signal:AbortSignal.timeout(8000)});
      if (!response.ok) throw Error('Could not log out. Please try again.');
      setCreator(null);
      root.querySelector<HTMLAnchorElement>('a')?.focus();
      options.onLogout?.();
    } finally {
      signingOut = false;
      if (button?.isConnected) { button.disabled = false; button.innerHTML = 'Log out <span aria-hidden="true">↗</span>'; }
    }
  }

  root.addEventListener('click', event => {
    const target = event.target as Element;
    const trigger = target.closest<HTMLButtonElement>('[data-account-trigger]');
    if (trigger) {
      const panel = root.querySelector<HTMLElement>('[data-account-panel]')!;
      panel.hidden = !panel.hidden;
      trigger.setAttribute('aria-expanded', String(!panel.hidden));
    } else if (target.closest('[data-account-logout]')) {
      const error = root.querySelector<HTMLElement>('[data-account-error]')!;
      error.hidden = true;
      void logout().catch(() => { error.textContent = 'Could not log out. Please try again.'; error.hidden = false; });
    } else if (target.closest('a')) close();
  });
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape') { close(true); return; }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    const panel = root.querySelector<HTMLElement>('[data-account-panel]');
    if (!panel) return;
    event.preventDefault();
    panel.hidden = false;
    root.querySelector('[data-account-trigger]')?.setAttribute('aria-expanded','true');
    const items = Array.from(panel.querySelectorAll<HTMLElement>('a,button:not(:disabled)'));
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + (event.key === 'ArrowDown' ? 1 : index < 0 ? 0 : -1) + items.length) % items.length]?.focus();
  });
  document.addEventListener('pointerdown', event => { if (!root.contains(event.target as Node)) close(); });
  document.addEventListener('focusin', event => { if (!root.contains(event.target as Node)) close(); });
  window.addEventListener('popstate', () => { close(); if (!creator) render(); });
  window.addEventListener('pageshow', event => { if (event.persisted) void refresh(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) void refresh(); });
  render();
  if (options.loadSession !== false) void refresh();
  return {setCreator, refresh, logout};
}
