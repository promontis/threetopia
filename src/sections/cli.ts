/**
 * The CLI section plays an illustrative terminal session: commands are typed,
 * their output appears line by line, and the whole thing loops while visible.
 * With reduced motion (or without JS timing) the full session is shown at once.
 */

type Line = { text: string; kind?: 'cmd' | 'ok' | 'bad' | 'dim' | 'plain' | 'blank' };

const html = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Proposed workflow. The production CLI is still in development. */
export const SESSION: Line[] = [
  { text: 'threetopia check', kind: 'cmd' },
  { text: '  Tile forest · (0, 0) · rotation 0°', kind: 'dim' },
  { text: '  ✓ Size & scale · 50 m · 1 unit = 1 m', kind: 'ok' },
  { text: '  × East ground · forest 0 m / village 1 m', kind: 'bad' },
  { text: '  Placement blocked.', kind: 'bad' },
  { text: '  Fix: use the shared path-3m border mesh.', kind: 'dim' },
  { text: '', kind: 'blank' },
  { text: '  # After updating the village boundary', kind: 'dim' },
  { text: 'threetopia check', kind: 'cmd' },
  { text: '  ✓ All 6 boundary profiles', kind: 'ok' },
  { text: '  ✓ Declared heights, corners & water', kind: 'ok' },
  { text: '  ✓ Asset manifest & collider references', kind: 'ok' },
  { text: '  Ready to preview.', kind: 'ok' },
  { text: '', kind: 'blank' },
  { text: 'threetopia preview', kind: 'cmd' },
  { text: '  Open forest with its six neighbours.', kind: 'dim' },
  { text: '  # Inspect seams, collisions & frame cost', kind: 'dim' },
  { text: '', kind: 'blank' },
  { text: 'threetopia publish', kind: 'cmd' },
  { text: '  ✓ Published forest@0.1.0.', kind: 'ok' },
];

function render(line: Line, partial?: string) {
  const text = html(partial ?? line.text);
  switch (line.kind) {
    case 'cmd': return `<span class="prompt">$</span> ${text}`;
    case 'ok': return `<span class="ok">${text}</span>`;
    case 'bad': return `<span class="bad">${text}</span>`;
    case 'dim': return `<span class="dim">${text}</span>`;
    case 'blank': return '';
    default: return text;
  }
}

/** CLI and packages section. */
export function mountCli(root: HTMLElement) {
  const outEl = root.querySelector<HTMLElement>('[data-terminal-out]');
  const boxEl = root.querySelector<HTMLElement>('[data-terminal]');
  if (!outEl || !boxEl) return;
  const out: HTMLElement = outEl, box: HTMLElement = boxEl;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const all = () => { out.innerHTML = SESSION.map((l) => render(l)).join('\n'); box.classList.add('is-done'); };
  if (reduced) { all(); return; }

  let visible = false, viewActive = true, playing = false, playback = 0;
  const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

  async function play(id: number) {
    const active = () => playing && id === playback;
    box.classList.remove('is-done');
    while (active()) {
      const done: string[] = [];
      out.innerHTML = '<span class="prompt">$</span> <span class="caret"></span>';
      for (const line of SESSION) {
        if (!active()) return;
        if (line.kind === 'cmd') {
          for (let i = 1; i <= line.text.length; i++) {
            if (!active()) return;
            out.innerHTML = [...done, render(line, line.text.slice(0, i)) + '<span class="caret"></span>'].join('\n');
            await wait(22 + Math.random() * 40);
          }
          await wait(380);
          done.push(render(line));
        } else {
          done.push(render(line));
          out.innerHTML = [...done, '<span class="caret"></span>'].join('\n');
          await wait(line.kind === 'blank' ? 500 : 110 + Math.random() * 90);
        }
      }
      if (!active()) return;
      out.innerHTML = [...done, '<span class="prompt">$</span> <span class="caret"></span>'].join('\n');
      box.classList.add('is-done');
      await wait(6500);
      if (active()) box.classList.remove('is-done');
    }
  }

  const update = () => {
    const next = visible && viewActive;
    if (playing === next) return;
    playing = next;
    // Invalidate the old run without leaving an unresolved timing promise.
    playback++;
    if (playing) void play(playback);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }, { threshold: 0.35 });
  observer.observe(box);
  import.meta.hot?.dispose(() => { observer.disconnect(); playing = false; playback++; });
  return { setActive(active: boolean) { viewActive = active; update(); } };
}
