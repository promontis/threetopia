import {mountPreview} from './preview';
import {mountAssetPreview} from './asset-preview';
import {previewChoices} from './preview-content';
import {mountScene} from '../../packages/platform/scene.js';
import {mountSceneReference} from './scene-reference';

async function main() {
  const params = new URLSearchParams(location.search);
  const data = await (await fetch('./preview.json')).json(), manifest = data.manifest;
  const choices = previewChoices(manifest);
  const choice = choices.find(item => item.id === params.get('mode')) ?? choices[0];
  if (!choice) throw Error('Add a static GLB export to preview this code package.');
  document.title = `${manifest.title} · Threetopia preview`;
  document.querySelector('h1')!.textContent = manifest.title;
  document.querySelector('small')!.textContent = `${manifest.kind === 'asset' ? 'Reusable asset' : 'Fixed host tile'} · Drag to orbit · Scroll to zoom`;
  for (const item of choices) {
    const link = document.createElement('a');
    link.href = `?mode=${encodeURIComponent(item.id)}`;
    link.textContent = item.label;
    link.classList.toggle('active', item === choice);
    document.querySelector('nav')!.append(link);
  }
  const controller = new AbortController();
  addEventListener('pagehide', () => controller.abort(), {once: true});
  const load = async () => {
    const response = await fetch(`./files/${choice.file}`, {signal: controller.signal});
    if (!response.ok) throw Error('Preview file missing.');
    return response.arrayBuffer();
  };
  const element = document.querySelector<HTMLElement>('#preview')!;
  if(choice.id==='context') {
    document.querySelector('small')!.textContent='Component preview in Tidewater · Settings inside the scene';
    document.querySelector('details')!.hidden=true;
    await mountSceneReference(element,manifest,data.registry,controller.signal);
  } else if (choice.id === 'scene' && manifest.runtime) {
    document.querySelector('small')!.textContent = manifest.runtime.purpose==='component-preview'?'Component preview · Drag to orbit · Settings inside':'Complete playable scene · Original controls';
    const detail = document.querySelector('details')!; detail.hidden = true;
    await mountScene(element, {manifest, focus:params.get('focus')||undefined, signal: controller.signal, loadFile: async file => {
      const response = await fetch(`./files/${file}`, {signal: controller.signal});
      if (!response.ok) throw Error(`Scene file missing: ${file}`);
      return response.arrayBuffer();
    }});
  } else if (manifest.kind === 'asset') await mountAssetPreview(element, load, controller.signal);
  else await mountPreview(element, {contract: manifest.tile, mode: choice.id, load, signal: controller.signal});
  const role = manifest.kind === 'asset' ? 'asset' : choice.id;
  document.querySelector('[data-metrics]')!.textContent = JSON.stringify(data.files?.[choice.file]?.[role] ?? data.report[role] ?? {}, null, 2);
  element.dataset.ready = 'true';
}
main().catch(error => { document.querySelector('#preview')!.textContent = error.message; });
