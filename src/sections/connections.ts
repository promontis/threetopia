import type { HexWorldControls } from '../connections/diorama/HexWorld.ts';
import type { Landscape } from '../connections/diorama/model.ts';

/** Show creative freedom inside one fixed set of shared edges. */
export function mountConnections(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('.hex-stage')!;
  let world: HexWorldControls | undefined;
  let active = false, visible = false, loading = false, attempted = false, disposed = false;
  let landscape: Landscape = 'forest';
  const update = () => {
    world?.setActive(active && visible);
    if (!active || !visible || loading || attempted || disposed) return;
    loading = true;
    void import('../connections/diorama/HexWorld.ts').then(({ mountHexWorld }) => {
      if (!active || !visible || disposed) return;
      attempted = true;
      world = mountHexWorld(stage, landscape);
    }).catch(() => { attempted = true; stage.dataset.worldState = 'fallback'; }).finally(() => { loading = false; });
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { rootMargin: '100px' });
  observer.observe(stage);
  import.meta.hot?.dispose(() => { disposed = true; observer.disconnect(); world?.dispose(); });
  const choices = root.querySelectorAll<HTMLButtonElement>('[data-scene-choice]');
  const artwork = root.querySelectorAll<SVGGElement>('[data-scene-art]');
  const description = root.querySelector<SVGDescElement>('[data-map-description]')!;
  const announcement = root.querySelector<HTMLElement>('[data-scene-announcement]')!;

  const select = (scene: Landscape) => {
    if (root.dataset.scene === scene) return;
    root.dataset.scene = scene;
    landscape = scene;
    world?.select(scene);
    choices.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.sceneChoice === scene)));
    artwork.forEach((group) => group.setAttribute('data-active', String(group.dataset.sceneArt === scene)));
    const name = scene[0].toUpperCase() + scene.slice(1);
    description.textContent = `Your ${scene} tile sits between six neighbours. The river and paths continue across the shared edges.`;
    announcement.textContent = `${name} selected. The river and paths stay connected to all six neighbours.`;
  };

  choices.forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', () => select(button.dataset.sceneChoice as Landscape));
  });
  return { setActive(value: boolean) { active = value; update(); } };
}
