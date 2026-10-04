export function mountCreators(root: HTMLElement) {
  const tally = root.querySelector<HTMLElement>('[data-creators-tally]')!;
  const number = root.querySelector<HTMLElement>('[data-creators-count]')!;
  const label = root.querySelector<HTMLElement>('[data-creators-label]')!;
  const note = root.querySelector<HTMLElement>('[data-creators-note]')!;
  const events = new AbortController();
  let visible = false;
  let loading = false;
  let lastAttempt = 0;

  async function refresh() {
    if (!visible || document.hidden || loading || Date.now() - lastAttempt < 60_000) return;
    loading = true;
    lastAttempt = Date.now();
    tally.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/api/creators/count', {
        signal: AbortSignal.any([events.signal, AbortSignal.timeout(8000)]),
      });
      if (!response.ok) throw new Error('Count unavailable');
      const { count } = await response.json() as { count: unknown };
      if (typeof count !== 'number' || !Number.isSafeInteger(count) || count < 0) throw new Error('Invalid count');
      number.textContent = count.toLocaleString('en-US');
      label.textContent = `${count === 1 ? 'creator' : 'creators'} on the waitlist`;
      note.textContent = count === 0 ? 'Be one of the first.' : '';
      note.hidden = count > 0;
    } catch {
      if (events.signal.aborted) return;
      // An unavailable count is not an empty community.
      number.textContent = '—';
      label.textContent = 'creators on the waitlist';
      note.textContent = 'Count unavailable. You can still join.';
      note.hidden = false;
    } finally {
      tally.setAttribute('aria-busy', 'false');
      loading = false;
    }
  }

  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    void refresh();
  }, { rootMargin: '150px' });
  observer.observe(root);
  const timer = window.setInterval(() => { void refresh(); }, 60_000);
  window.addEventListener('focus', () => { void refresh(); }, { signal: events.signal });
  document.addEventListener('visibilitychange', () => { void refresh(); }, { signal: events.signal });
  import.meta.hot?.dispose(() => {
    observer.disconnect();
    clearInterval(timer);
    events.abort();
  });
}
