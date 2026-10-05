import {sha256} from './integrity.js';
import {validateRuntime, runtimeMime} from './runtime.js';

// This function is serialized into an opaque-origin sandbox. Keep it independent
// of the parent module: no account credentials, DOM or network access cross over.
function frameBootstrap(channel) {
  const send = (type, detail) => parent.postMessage({channel, type, detail}, '*');
  let loaded = false;
  addEventListener('message', async event => {
    if (event.source !== parent || event.data?.channel !== channel) return;
    const message = event.data;
    if (message.type === 'load' && !loaded) {
      loaded = true;
      const assets = new Map(message.assets.map(({path, bytes, mime}) => [path, URL.createObjectURL(new Blob([bytes], {type: mime}))]));
      const fetchBlob = fetch.bind(globalThis);
      globalThis.fetch = (input, options) => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
        const prefix = 'https://threetopia.invalid/assets/';
        const name = url.startsWith(prefix) ? url.slice(prefix.length) : null;
        const target = name === null ? url : assets.get(name);
        if (!target || !target.startsWith('blob:')) return Promise.reject(Error(`Undeclared scene resource: ${name ?? url}`));
        return fetchBlob(target, options);
      };
      const values = new Map(Object.entries(message.preferences || {}));
      Object.defineProperty(globalThis, 'localStorage', {value: {
        getItem: key => values.get(String(key)) ?? null,
        setItem(key, value) { values.set(String(key), String(value)); send('preferences', Object.fromEntries(values)); },
        removeItem(key) { values.delete(String(key)); send('preferences', Object.fromEntries(values)); },
        clear() { values.clear(); send('preferences', {}); },
      }});
      globalThis.__threetopiaHost = {
        previewFocus: message.focus,
        progress: (value, message) => send('progress', {value, message}),
        ready: detail => send('ready', detail), error: message => send('error', message),
      };
      let css = message.css;
      for (const [path, url] of assets) css = css.replaceAll(`@asset(${path})`, url);
      const style = document.createElement('style'); style.textContent = css; document.head.append(style);
      for (const code of message.code) { const script = document.createElement('script'); script.textContent = code; document.body.append(script); }
    } else if (message.type === 'dispose') {
      try { await globalThis.__threetopiaRuntime?.dispose(); } finally { send('disposed'); }
    } else if (['pause', 'resume', 'reset'].includes(message.type)) globalThis.__threetopiaRuntime?.[message.type]?.();
  });
  addEventListener('error', event => send('error', event.message));
  addEventListener('unhandledrejection', event => send('error', event.reason?.message || String(event.reason)));
  send('boot');
}

/** Mount a complete, self-contained scene. loadFile may read private registry
 * files in the parent; only verified package bytes enter the isolated frame. */
export async function mountScene(element, {manifest, loadFile, signal, focus, onProgress = () => {}}) {
  const errors = validateRuntime(manifest);
  if (!manifest.runtime || errors.length) throw Error(errors.join(' ') || 'No complete scene runtime.');
  if(focus && !manifest.runtime.previewTargets?.includes(focus)) throw Error('This scene does not provide the requested component preview.');
  signal?.throwIfAborted();
  const runtime = manifest.runtime, descriptors = new Map(manifest.files.map(file => [file.path, file]));
  const cache = new Map();
  async function read(path) {
    if (cache.has(path)) return cache.get(path);
    const bytes = new Uint8Array(await loadFile(path)), expected = descriptors.get(path);
    signal?.throwIfAborted();
    if (bytes.length !== expected.bytes || await sha256(bytes) !== expected.sha256) throw Error(`Scene integrity check failed: ${path}`);
    cache.set(path, bytes); return bytes;
  }
  const scripts = [...(runtime.preload || []), runtime.entry];
  const paths = [...new Set([...scripts, runtime.style, ...Object.values(runtime.assets)])];
  let index = 0;
  await Promise.all(Array.from({length: 4}, async () => { while (index < paths.length) await read(paths[index++]); }));
  const assets = Object.entries(runtime.assets).map(([path, file]) => ({path, bytes: cache.get(file).slice().buffer, mime: runtimeMime(path)}));
  const code = scripts.map(file => new TextDecoder().decode(cache.get(file))), css = new TextDecoder().decode(cache.get(runtime.style));
  cache.clear();
  const channel = crypto.randomUUID(), frame = document.createElement('iframe');
  frame.title = `${manifest.title} — complete scene`;
  frame.setAttribute('sandbox', 'allow-scripts allow-pointer-lock allow-downloads');
  frame.setAttribute('allow', 'autoplay; fullscreen'); frame.referrerPolicy = 'no-referrer';
  Object.assign(frame.style, {border: '0', width: '100%', height: '100%', display: 'block', background: '#000'});
  const storageKey = `threetopia.scene.${manifest.name}${focus?'.'+focus:''}`;
  let preferences = {}; try { preferences = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch {}
  const send = type => frame.contentWindow?.postMessage({channel, type}, '*');
  let disposed = false, removeTimer, timeout, listener, abortListener;
  const remove = () => { clearTimeout(removeTimer); clearTimeout(timeout); removeEventListener('message', listener); frame.remove(); signal?.removeEventListener('abort', abortListener); };
  const cleanup = Object.assign(() => {
    if (disposed) return; disposed = true; send('dispose'); frame.hidden = true;
    removeTimer = setTimeout(remove, 1500);
  }, {reset: () => send('reset'), pause: () => send('pause'), resume: () => send('resume'), frame});
  const ready = new Promise((resolve, reject) => {
    timeout = setTimeout(() => { cleanup(); reject(Error('Scene initialization timed out. WebGPU shader compilation may require a more capable GPU.')); }, 300_000);
    listener = event => {
      if (event.source !== frame.contentWindow || event.data?.channel !== channel) return;
      const {type, detail} = event.data;
      if (disposed && type !== 'disposed') return;
      if (type === 'boot') frame.contentWindow.postMessage({channel, type: 'load', code, css, assets, preferences, focus}, '*', assets.map(asset => asset.bytes));
      if (type === 'progress') onProgress(detail);
      if (type === 'ready') {
        const missing = runtime.features.filter(feature => detail?.features?.[feature] !== true);
        if (missing.length) { cleanup(); reject(Error(`Incomplete scene: ${missing.join(', ')}`)); return; }
        clearTimeout(timeout); element.dataset.ready = 'true'; resolve(cleanup);
      }
      if (type === 'error') { clearTimeout(timeout); cleanup(); element.dataset.ready = 'false'; element.textContent = `Scene error: ${String(detail)}`; reject(Error(String(detail))); }
      if (type === 'disposed') remove();
      if (type === 'preferences' && detail && typeof detail === 'object' && Object.keys(detail).length <= 32 && Object.values(detail).every(value => typeof value === 'string') && JSON.stringify(detail).length <= 16384) {
        try { localStorage.setItem(storageKey, JSON.stringify(detail)); } catch {}
      }
    };
    addEventListener('message', listener);
    abortListener = () => { cleanup(); reject(signal.reason); };
    signal?.addEventListener('abort', abortListener, {once: true});
  });
  frame.srcdoc = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' blob:; style-src 'unsafe-inline'; connect-src blob:; img-src blob: data:; font-src blob:; media-src blob:; worker-src blob:; base-uri 'none'; form-action 'none'"><style>html,body,#app{width:100%;height:100%;margin:0;overflow:hidden;background:#000}</style><div id="app"></div><div id="fps"></div><script>(${frameBootstrap.toString()})(${JSON.stringify(channel)})<\/script>`;
  element.replaceChildren(frame);
  return ready;
}
