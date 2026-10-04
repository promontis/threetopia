import './map-frame.css';

const escape = (text: string) => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));

export function mapFrameMarkup(title: string): string {
  return `<section class="map-board" aria-busy="true" data-map-state="loading">
    <div class="map-loading-screen">
      <div class="map-loading-copy" role="status" aria-live="polite" aria-atomic="true">
        <svg class="map-loading-tiles" viewBox="0 0 100 78" fill="none" aria-hidden="true"><path d="m50 9 22 13v25L50 60 28 47V22Z"/><path d="m26 24 22 13v25L26 75 4 62V37Z"/><path d="m74 24 22 13v25L74 75 52 62V37Z"/></svg>
        <h2>Loading the map</h2><p data-map-loading-detail>Preparing your view…</p>
      </div>
      <div class="map-loading-track" aria-hidden="true"><span></span></div>
      <button type="button" class="button secondary" data-map-retry hidden>Try again</button>
    </div>
    <iframe title="${escape(title)}" src="/map-preview/?creator=1" aria-hidden="true" tabindex="-1" inert></iframe>
  </section>`;
}

/** The iframe handshake is independent of the inspector's WebGL warm-up.
 * Reveal only after a frame containing the registry's tiles has been rendered. */
export function mountMapFrame(board: HTMLElement) {
  const frame = board.querySelector<HTMLIFrameElement>('iframe')!;
  const screen = board.querySelector<HTMLElement>('.map-loading-screen')!;
  const title = screen.querySelector('h2')!;
  const detail = screen.querySelector<HTMLElement>('[data-map-loading-detail]')!;
  const retry = screen.querySelector<HTMLButtonElement>('[data-map-retry]')!;
  const abort = new AbortController();
  let connected = false, sent = false, ready = false, failed = false, payload: unknown;
  const slow = setTimeout(() => { if (!ready && !failed) detail.textContent = 'Loading a little longer than usual…'; }, 25_000);
  const timeout = setTimeout(() => fail('The map is taking longer than expected. Please try again.'), 90_000);
  const clearTimers = () => { clearTimeout(slow); clearTimeout(timeout); };
  function fail(message = 'Something interrupted loading. Please try again.') {
    if (ready || abort.signal.aborted) return;
    failed = true; clearTimers(); board.dataset.mapState = 'error'; board.setAttribute('aria-busy','false');
    title.textContent = 'The map couldn’t load'; detail.textContent = message; retry.hidden = false;
  }
  function post() {
    if (!connected || payload === undefined || failed || abort.signal.aborted) return;
    sent = true; frame.contentWindow?.postMessage(payload,location.origin);
  }
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame.contentWindow || failed) return;
    const data = event.data;
    if (data?.type === 'creator:ready') { connected = true; post(); }
    if (data?.type === 'creator:loading' && !ready) {
      const stages: Record<string,string> = {terrain:'Preparing the landscape…', worlds:'Loading worlds…', tiles:'Preparing available tiles…', view:'Finishing your view…'};
      if (stages[data.stage]) detail.textContent = data.stage === 'worlds' && Number.isInteger(data.completed) && Number.isInteger(data.total) && data.total > 0 && data.total <= 1000
        ? `Loading worlds · ${Math.max(0,Math.min(data.total,data.completed))} of ${data.total}` : stages[data.stage];
    }
    if (data?.type === 'creator:loaded' && sent && !ready) {
      ready = true; clearTimers(); board.dataset.mapState = 'ready'; board.setAttribute('aria-busy','false');
      frame.inert = false; frame.removeAttribute('aria-hidden'); frame.removeAttribute('tabindex'); screen.hidden = true;
    }
    if (data?.type === 'creator:load-error' || data?.type === 'creator:tile-error' && !ready) fail();
  },{signal:abort.signal});
  frame.addEventListener('error',() => fail(),{signal:abort.signal});
  retry.addEventListener('click',() => location.reload(),{signal:abort.signal});
  return {frame, send(data: unknown) { payload = data; post(); }, fail, dispose() { abort.abort(); clearTimers(); }};
}
