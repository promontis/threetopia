const sites = [
  { id: 'home', label: 'Home', origin: 'https://threetopia.com', path: '/' },
  { id: 'creators', label: 'Creators', origin: 'https://creators.threetopia.com', path: '/packages/my' },
  { id: 'docs', label: 'Docs', origin: 'https://docs.threetopia.com', path: '/' },
  { id: 'map', label: 'World', origin: 'https://world.threetopia.com', path: '/' },
];

/** Shared initial HTML for the landing, creator app and generated docs.
 * Actions are trusted markup supplied by the host page, never user content.
 */
export function siteNavigation(current, { actions = '' } = {}) {
  return `<header class="site-header" data-site="${current}">
    <a class="site-brand" href="${current === 'home' ? '/' : 'https://threetopia.com/'}" aria-label="Threetopia home">
      <svg class="site-brand-mark" viewBox="0 0 64 64" aria-hidden="true"><use href="/brand-mark.svg#mark"/></svg>
      <span>threetopia</span>
    </a>
    <nav class="site-nav" aria-label="Threetopia">
      ${sites.map(site => `<a class="site-nav-link" href="${site.id === current ? site.path : site.origin + site.path}"${site.id === current ? ` aria-current="location"${current === 'creators' ? ' data-nav' : ''}` : ''}>${site.label}${site.id === 'map' ? '<svg class="site-nav-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8"/></svg>' : ''}</a>`).join('')}
    </nav>
    <div class="site-actions" data-site-actions>${actions}<div class="site-account-control" data-site-account><a class="site-sign-in" href="${current === 'creators' ? '' : 'https://creators.threetopia.com'}/login">Sign in</a><a class="site-cta" href="${current === 'creators' ? '' : 'https://creators.threetopia.com'}/signup">Sign up</a></div></div>
  </header>`;
}
