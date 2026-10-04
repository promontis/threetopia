import {
  AdditiveBlending, BufferGeometry, Float32BufferAttribute, Group, Mesh, PerspectiveCamera,
  PlaneGeometry, Points, Scene, ShaderMaterial, SRGBColorSpace, TextureLoader,
  Vector2, WebGLRenderer,
} from 'three';
import { surfaceVertex, surfaceFragment, particlesVertex, particlesFragment } from './shaders.ts';
import { createPortalLabel } from './labelTexture.ts';

export interface PortalControls {
  approach(): void;
  setActive(active: boolean): void;
}

/** Small, independent WebGL scene. The destination world remains static. */
export function mountPortal(entry: HTMLAnchorElement): PortalControls | undefined {
  const canvas = document.createElement('canvas');
  canvas.className = 'portal-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  // Retain the last frame while paused or while the browser recomposites on scroll.
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'low-power' });
  if (!context) { entry.dataset.portalState = 'fallback'; return; }

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setClearColor(0x000000, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, .1, 20);
  camera.position.z = 6.35;
  const gate = new Group();
  scene.add(gate);

  const labelElement = entry.querySelector<HTMLElement>('.portal-label');
  const label = labelElement ? createPortalLabel(labelElement) : null;
  const uniforms = {
    uTime: { value: 0 }, uHover: { value: 0 }, uDpr: { value: 1 }, uPixelScale: { value: 1 },
    uEnter: { value: 0 }, uSpread: { value: 1 }, uApproach: { value: 0 },
    uPointer: { value: new Vector2() },
    uSceneMap: { value: null as ReturnType<TextureLoader['load']> | null },
    uSceneReady: { value: 0 },
    uSceneScale: { value: new Vector2(.81, .94) },
    uLabelMap: { value: label?.texture ?? null },
    uLabelSize: { value: new Vector2(1, .25) },
    uHasLabel: { value: label ? 1 : 0 },
  };
  const surface = new Mesh(new PlaneGeometry(3.4, 3.4), new ShaderMaterial({
    uniforms, vertexShader: surfaceVertex, fragmentShader: surfaceFragment,
    transparent: true, depthWrite: false,
  }));
  surface.position.z = .055;
  surface.renderOrder = 1;
  gate.add(surface);

  const compact = window.matchMedia('(max-width: 760px), (pointer: coarse)');
  const count = compact.matches ? 1600 : 4200;
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    seeds.set([(i * .618034) % 1, (i * .754878) % 1, (i * .569841) % 1, i / count], i * 4);
  }
  const particles = new Points(
    new BufferGeometry().setAttribute('position', new Float32BufferAttribute(new Float32Array(count * 3), 3)).setAttribute('aSeed', new Float32BufferAttribute(seeds, 4)),
    new ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: AdditiveBlending,
      vertexShader: particlesVertex, fragmentShader: particlesFragment,
    }),
  );
  particles.frustumCulled = false; // Positions are displaced entirely on the GPU.
  particles.renderOrder = 2;
  gate.add(particles);
  entry.prepend(canvas);

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const approachDuration = 220;
  // One slow clock keeps the energy, lettering and particles moving together.
  const ambientSpeed = .3;
  const events = new AbortController();
  const { signal } = events;
  let visible = true, viewActive = true, pageActive = true, disposed = false, frame = 0, last = 0, time = 0;
  let hover = 0, pointerX = 0, pointerY = 0, entryStarted = 0;
  let pointerInside = false;
  let previousSize = 0, previousDpr = 0;
  let viewSettled = false, labelSettled = !label;
  const pointer = new Vector2();

  const draw = () => {
    uniforms.uTime.value = motion.matches ? 0 : time;
    const approach = entryStarted ? Math.min((performance.now() - entryStarted) / approachDuration, 1) : 0;
    uniforms.uEnter.value = approach * approach * (3 - 2 * approach);
    uniforms.uHover.value += (hover - uniforms.uHover.value) * (motion.matches ? 1 : .14);
    uniforms.uApproach.value = motion.matches ? 0 : uniforms.uHover.value;
    gate.scale.setScalar(1 + uniforms.uApproach.value * .065 + uniforms.uEnter.value * .12);
    const pointerEase = motion.matches ? 1 : .09;
    gate.rotation.y += ((motion.matches ? -.06 : -.06 + pointerX * .09) - gate.rotation.y) * pointerEase;
    gate.rotation.x += ((motion.matches ? .015 : .015 - pointerY * .055) - gate.rotation.x) * pointerEase;
    uniforms.uPointer.value.lerp(pointer.set(motion.matches ? 0 : pointerX, motion.matches ? 0 : pointerY), pointerEase);
    renderer.render(scene, camera);
  };
  const tick = (now: number) => {
    if (disposed || !pageActive || !viewActive) return;
    if (now - last >= 1000 / (entryStarted ? 60 : 30)) {
      time += Math.min((now - last) / 1000, .05) * ambientSpeed;
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const update = () => {
    cancelAnimationFrame(frame);
    if (disposed || !pageActive || !viewActive || !visible || document.hidden) return;
    draw();
    if (!motion.matches) { last = performance.now(); frame = requestAnimationFrame(tick); }
  };
  const resizeRenderer = () => {
    if (disposed || !viewActive || !pageActive) return;
    const size = canvas.clientWidth;
    const dpr = Math.min(window.devicePixelRatio, compact.matches ? 1.5 : 1.75);
    uniforms.uSpread.value = compact.matches ? .65 : 1;
    if (!size || (size === previousSize && dpr === previousDpr)) return;
    previousSize = size;
    previousDpr = dpr;
    uniforms.uDpr.value = dpr;
    uniforms.uPixelScale.value = Math.max(.8, Math.min(size / 600, 1.25));
    if (label && labelElement) {
      // Keep the small lettering readable on mobile, in the opening's own plane.
      const fontSize = parseFloat(getComputedStyle(labelElement).fontSize);
      const worldPerPixel = 2 * Math.tan(camera.fov * Math.PI / 360) * (camera.position.z - surface.position.z) / size;
      uniforms.uLabelSize.value.set(label.widthPerEm * fontSize * worldPerPixel, label.heightPerEm * fontSize * worldPerPixel);
    }
    renderer.setDrawingBufferSize(size, size, dpr);
    // Resizing clears the buffer; repaint even if currently just outside the view.
    draw();
    update();
  };
  const resize = new ResizeObserver(resizeRenderer);
  resize.observe(entry);
  const visibility = new IntersectionObserver(([item]) => { visible = item.isIntersecting; update(); }, { rootMargin: '96px' });
  visibility.observe(canvas);
  document.addEventListener('visibilitychange', update, { signal });
  motion.addEventListener('change', update, { signal });
  const updateInteraction = () => {
    hover = pointerInside || entry.matches(':focus-visible') || entryStarted ? 1 : 0;
    update();
  };
  entry.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    updateInteraction();
  }, { signal });
  entry.addEventListener('pointerleave', () => {
    pointerInside = false;
    pointerX = pointerY = 0;
    updateInteraction();
  }, { signal });
  entry.addEventListener('focus', updateInteraction, { signal });
  entry.addEventListener('blur', updateInteraction, { signal });
  entry.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const rect = entry.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width * 2 - 1;
    pointerY = (event.clientY - rect.top) / rect.height * 2 - 1;
  }, { signal });

  const resetEntry = () => {
    entryStarted = 0;
    pointerInside = false;
    pointerX = pointerY = 0;
    hover = entry.matches(':focus-visible') ? 1 : 0;
    // A retained drawing buffer must never show the end of the previous passage.
    uniforms.uEnter.value = 0;
    uniforms.uHover.value = hover;
    uniforms.uApproach.value = motion.matches ? 0 : hover;
    uniforms.uPointer.value.set(0, 0);
    gate.scale.setScalar(1 + uniforms.uApproach.value * .065);
    gate.rotation.set(.015, -.06, 0);
    entry.classList.remove('is-entering');
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    events.abort();
    resetEntry();
    cancelAnimationFrame(frame);
    resize.disconnect();
    visibility.disconnect();
    scene.traverse((object) => {
      if (object instanceof Mesh || object instanceof Points) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    renderer.dispose();
    destination.dispose();
    label?.dispose();
    canvas.remove();
    delete entry.dataset.portalLabel;
    delete entry.dataset.portalView;
    entry.dataset.portalState = 'fallback';
  };
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    dispose();
  }, { signal });
  window.addEventListener('pagehide', () => {
    pageActive = false;
    cancelAnimationFrame(frame);
    resetEntry();
    if (viewActive) draw();
    // Keep the clean canvas intact for browser snapshots/BFCache. The browser
    // releases this document's GPU resources when it actually unloads it.
  }, { signal });
  const restore = () => {
    if (disposed || pageActive) return;
    pageActive = true;
    resetEntry();
    resizeRenderer();
    update();
  };
  // pagereveal runs before the incoming snapshot/first paint in supporting
  // browsers. pageshow covers browsers without that event.
  window.addEventListener('pagereveal', restore, { signal });
  window.addEventListener('pageshow', restore, { signal });
  import.meta.hot?.dispose(dispose);
  const reveal = () => {
    if (disposed || !viewActive || !pageActive || !viewSettled || !labelSettled) return;
    draw();
    // Only replace the fallback after the texture, lettering and first frame
    // are ready, so returning home cannot reveal a half-initialized portal.
    if (label) entry.dataset.portalLabel = 'integrated';
    entry.dataset.portalState = 'ready';
    update();
  };
  // A concept view within the opening; the destination page remains coming soon.
  const destination = new TextureLoader().load('/portal/forest-path-v2.webp', (texture) => {
    if (disposed) { texture.dispose(); return; }
    const aspect = texture.image.width / texture.image.height;
    const openingAspect = .62 / 1.08;
    uniforms.uSceneScale.value.set(Math.min(1, openingAspect / aspect) * .94, Math.min(1, aspect / openingAspect) * .94);
    uniforms.uSceneReady.value = 1;
    viewSettled = true;
    entry.dataset.portalView = 'ready';
    // A loaded image must also repaint a reduced-motion portal.
    reveal();
  }, undefined, () => {
    if (!disposed) { viewSettled = true; entry.dataset.portalView = 'unavailable'; reveal(); }
  });
  destination.colorSpace = SRGBColorSpace;
  uniforms.uSceneMap.value = destination;
  resizeRenderer();
  if (label) {
    void label.ready.then(() => { labelSettled = true; reveal(); });
  }
  return {
    approach() {
      if (disposed || !viewActive || motion.matches) return;
      hover = 1;
      entryStarted = performance.now();
      entry.classList.add('is-entering');
      update();
    },
    setActive(active) {
      if (disposed || (viewActive === active && !entryStarted)) return;
      viewActive = active;
      cancelAnimationFrame(frame);
      resetEntry();
      if (active) {
        resizeRenderer();
        // Repaint the retained canvas before the covering view fades away.
        reveal();
        update();
      }
    },
  };
}
