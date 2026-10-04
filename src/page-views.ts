type View = 'home' | 'world';
interface ViewHooks {
  homeVisibility(visible: boolean): void;
  enterWorld(): void;
}

const viewForPath = (pathname: string): View | null => pathname === '/' ? 'home' : /^\/world\/?$/.test(pathname) ? 'world' : null;
const titles = { home: 'Threetopia — a home for Three.js creators', world: 'Threetopia — one connected world' };
const descriptions = {
  home: 'A home for Three.js creators. From shaders and components to entire worlds. Publish your work, build on what others have made, and bring it together in a shared world.',
  world: "Walk from Lagoon Tree Village through Sakura River Valley and Tidewater to Threejs-Punk in one connected world.",
};

/** Both views already exist. Navigation changes visibility/history, never the document. */
export function mountPageViews(hooks: ViewHooks) {
  const root = document.documentElement;
  const home = document.getElementById('home-view')!;
  const world = document.getElementById('world-view')!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const { signal } = events;
  let current = viewForPath(location.pathname) ?? 'home';
  let animation: Animation | undefined;
  let lastHomeFocus: HTMLElement | null = null;

  const metadata = () => {
    root.dataset.view = current;
    document.title = titles[current];
    document.querySelector('meta[name="description"]')?.setAttribute('content', descriptions[current]);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', current === 'world' ? '#faf8f4' : '#f4efe6');
  };
  const settle = () => {
    animation?.cancel();
    animation = undefined;
    home.classList.toggle('is-covered', current === 'world');
    world.hidden = current === 'home';
    delete root.dataset.switchingView;
    hooks.homeVisibility(current === 'home');
  };

  const show = (next: View, focus = true) => {
    if (next === current) return;
    // Reversing midway starts at the existing opacity instead of flashing a
    // fully opaque layer. A cancelled animation cannot settle a newer route.
    const fromOpacity = world.hidden ? 0 : Number(getComputedStyle(world).opacity);
    animation?.cancel();
    animation = undefined;
    if (next === 'world') {
      const focused = document.activeElement;
      lastHomeFocus = focused instanceof HTMLElement && home.contains(focused) ? focused : null;
      home.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach((dialog) => dialog.close());
      world.scrollTop = 0;
      hooks.enterWorld();
    }
    current = next;
    metadata();
    home.classList.remove('is-covered');
    home.inert = next === 'world';
    home.setAttribute('aria-hidden', String(next === 'world'));
    world.hidden = false;
    world.inert = next === 'home';
    world.setAttribute('aria-hidden', String(next === 'home'));
    if (next === 'home') hooks.homeVisibility(true);
    if (focus) {
      const target = next === 'world' ? world.querySelector<HTMLElement>('h1') : lastHomeFocus ?? home.querySelector<HTMLElement>('.hero-entry');
      target?.focus({ preventScroll: true });
    }
    if (motion.matches || typeof world.animate !== 'function') { settle(); return; }
    root.dataset.switchingView = '';
    const activeAnimation = world.animate([{ opacity: fromOpacity }, { opacity: next === 'world' ? 1 : 0 }], {
      duration: 380, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'both',
    });
    animation = activeAnimation;
    void activeAnimation.finished.then(() => {
      if (animation === activeAnimation) settle();
    }).catch(() => { /* A newer navigation replaced this fade. */ });
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    const next = url.origin === location.origin ? viewForPath(url.pathname) : null;
    if (!next || next === current) return;
    event.preventDefault();
    history.pushState(null, '', url);
    show(next);
  }, { signal });
  window.addEventListener('popstate', () => {
    const next = viewForPath(location.pathname);
    if (next) show(next);
  }, { signal });
  motion.addEventListener('change', () => { if (motion.matches) settle(); }, { signal });
  window.addEventListener('pagehide', settle, { signal });
  window.addEventListener('pageshow', () => hooks.homeVisibility(current === 'home'), { signal });

  metadata();
  home.inert = current === 'world';
  home.setAttribute('aria-hidden', String(current === 'world'));
  world.inert = current === 'home';
  world.setAttribute('aria-hidden', String(current === 'home'));
  settle();
  // Direct /world/ loads also retain the prepared homepage, with no portal
  // renderer allocated until that view is opened for the first time.
  home.hidden = false;

  import.meta.hot?.dispose(() => { animation?.cancel(); events.abort(); });
}
