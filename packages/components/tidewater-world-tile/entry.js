// The complete pinned App and UI run here, in their own scene document. No
// renderer, ocean, wildlife, post-processing or gameplay subsystem is replaced.
import '@dgreenheck/tidewater-core/core/TSLPatches.js';
import {App} from './src/App.js';
import {UI} from '@dgreenheck/tidewater-ui/ui/UI.js';
import {AppUI} from '@dgreenheck/tidewater-ui/ui/AppUI.js';
import {G} from '@dgreenheck/tidewater-core/core/Globals.js';
import {WORLD} from '@dgreenheck/tidewater-core/world/WorldLayout.js';
import {BANK} from '@dgreenheck/tidewater-audio/audio/soundBank.js';
import {mountComponentPreview} from './component-preview.js';

const host = globalThis.__threetopiaHost;
document.body.insertAdjacentHTML('beforeend', '<div id="loader" role="status"><div class="loader-inner"><div class="loader-title">TIDEWATER</div><div class="loader-sub">WebGPU ocean simulation</div><div class="loader-bar"><div class="loader-fill"></div></div><div class="loader-status">Initializing…</div></div></div>');
const ui = new UI(), app = new App();
window.__ui = ui;
let disposed = false, paused = false, ready = false;
const featureObjects = {
  terrain: ['terrain', 'terrainData', 'terrainGPU', 'rocks'],
  village: ['village', 'colliders'], vegetation: ['vegetation'], debris: ['debris'],
  ocean: ['fft', 'surface', 'waterMaterial', 'oceanLOD', 'seaDetail', 'query'],
  surf: ['shore', 'shoreSim', 'surfFoam', 'breakers', 'spray'],
  reef: ['reef', 'caustics', 'marineSnow'], wildlife: ['wildlife', 'whale'],
  sky: ['atmosphere', 'sky', 'clouds', 'environment', 'haze'],
  lighting: ['sun', 'csm', 'localLights'],
  boat: ['boat', 'boatCtl', 'boatSpray', 'wake'], player: ['player', 'fly', 'input'],
  post: ['sceneRenderer', 'underwater', 'post'], audio: ['audio'], controls: ['ui'],
};
function inspect() {
  return {ready, paused, disposed, time: G.time.value, night: G.night.value, underwater: G.cameraUnderwater.value, frame: app.engine?.frame ?? 0,
    features: Object.fromEntries(Object.entries(featureObjects).map(([key, names]) => [key, names.every(name => !!app[name])])),
    whaleReady: !!app.whale?.ready, debrisReady: !!app.debris?.scanned?.ready,
    audioFiles: Object.keys(BANK).length, audioDecoded: app.audio?._buffers.size ?? 0,
    player: app.player ? {mode: app.player.mode, position: app.player.position.toArray()} : null,
    renderer: app.renderer ? {webgpu: app.renderer.backend.isWebGPUBackend === true, calls: app.renderer.info.render.calls, triangles: app.renderer.info.render.triangles} : null};
}
function pause() { paused = true; app.renderer?.setAnimationLoop(null); app.audio?.ctx?.suspend(); }
function resume() {
  if (disposed || !ready) return;
  paused = false;
  if (app.audio?.ctx) void app.audio.resume();
  app.start();
}
function reset() {
  if (!ready) return;
  app.freeCam = false; app.player.mode = 'walk'; app.player.position.copy(WORLD.spawn.position);
  app.player.position.y = app.terrainData.heightAt(app.player.position.x, app.player.position.z);
  app.player.velocity.set(0, 0, 0); app.player.yaw = WORLD.spawn.yaw; app.player.pitch = -.05;
}
async function dispose() {
  if (disposed) return; disposed = true; pause();
  app.audio?.dispose();
  // All per-scene module globals, listeners and generated CPU resources belong
  // to this document; destroying its frame releases them as one owned scope.
  if (app.renderer) {
    try { await app.renderer.backend.device.queue.onSubmittedWorkDone(); } catch {}
    app.renderer.dispose(); app.renderer.backend.device?.destroy();
  }
}
globalThis.__threetopiaRuntime = {inspect, pause, resume, reset, dispose};
addEventListener('pagehide', () => { void dispose(); }, {once: true});
app.init((progress, message) => { ui.setLoading(progress, message); host.progress(progress, message); }).then(async () => {
  await app.debris.scanned.promise;
  if (!app.debris.scanned.ready || !app.whale?.ready) throw Error('The complete scene requires the original debris and whale assets.');
  app.ui = new AppUI(app, ui); ready = true;
  const missing = Object.entries(inspect().features).filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) throw Error(`Scene conversion is incomplete: ${missing.join(', ')}`);
  app.renderer.domElement.setAttribute('aria-label', 'Complete Tidewater scene');
  ui.setLoading(1, 'Ready'); await ui.hideLoader();
  if (!paused) app.start();
  if(host.previewFocus)mountComponentPreview(host.previewFocus,app,ui);
  else ui.showStartOverlay(() => { app.input.requestLock(); void app.audio.resume(); });
  host.ready(inspect());
}).catch(error => { ui.setLoading(null, 'Error: ' + error.message); host.error(error.message); });
