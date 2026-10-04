import { allocate } from '../economy/allocation.ts';
import { catalog, creators, rootChoices, SUBSCRIBER } from '../economy/sampleCatalog.ts';

const euro = (cents: number) => `€${(cents / 100).toFixed(2)}`;
const short = (id: string) => id.replace('@threetopia/', '');

/** Interactive split of one subscriber's €8, computed by the tested allocation policy. */
export function mountCalculator(root: HTMLElement) {
  const chips = root.querySelector<HTMLElement>('[data-chips]')!;
  const bars = root.querySelector<HTMLElement>('[data-bars]')!;
  const foot = root.querySelector<HTMLElement>('[data-foot]')!;
  const selected = new Set(['@threetopia/alex-ocean', '@threetopia/john-road']);

  for (const id of rootChoices) {
    const pkg = catalog.get(id)!;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    button.dataset.root = id;
    button.innerHTML = `<i style="background:${creators[pkg.creator].color}"></i>${pkg.name} <small>${creators[pkg.creator].name}</small>`;
    button.addEventListener('click', () => {
      if (selected.has(id)) selected.delete(id); else selected.add(id);
      render();
    });
    chips.append(button);
  }

  function render() {
    for (const chip of chips.querySelectorAll<HTMLButtonElement>('.chip')) chip.setAttribute('aria-pressed', String(selected.has(chip.dataset.root!)));
    const result = allocate([...selected], catalog, SUBSCRIBER);
    bars.replaceChildren();
    for (const envelope of result.envelopes) {
      const row = document.createElement('div');
      row.className = 'root-row';
      const pkg = catalog.get(envelope.root)!;
      row.innerHTML = `<header><span class="root-name">${pkg.name}<small>${short(envelope.root)}</small></span><span class="root-cents">${euro(envelope.cents)}</span></header>`;
      const bar = document.createElement('div');
      bar.className = 'bar';
      const lines = document.createElement('div');
      lines.className = 'lines';
      for (const line of envelope.lines) {
        const person = creators[line.account];
        const segment = document.createElement('span');
        segment.style.flexGrow = String(line.cents);
        segment.style.background = person.color;
        segment.title = `${person.name}: ${euro(line.cents)} (depth ${line.depth})`;
        segment.textContent = line.cents >= 60 ? person.name : '';
        bar.append(segment);
        const item = document.createElement('span');
        item.innerHTML = `${person.name} <b>${euro(line.cents)}</b> <em>d${line.depth} · ${(line.weight * 100).toFixed(1)}%</em>`;
        lines.append(item);
      }
      row.append(bar, lines);
      bars.append(row);
    }
    if (!result.envelopes.length) {
      const reserve = document.createElement('p');
      reserve.className = 'reserve';
      reserve.textContent = selected.size
        ? `None of these roots has another creator to pay, so your ${euro(result.reserveCents)} goes to the unallocated creator reserve.`
        : `Pick at least one root. Until then your ${euro(result.reserveCents)} sits in the unallocated creator reserve.`;
      bars.append(reserve);
    }
    const distributed = result.envelopes.reduce((sum, e) => sum + e.lines.reduce((s, l) => s + l.cents, 0), 0);
    const skipped = result.excluded.map((e) => catalog.get(e.root)?.name ?? short(e.root));
    foot.innerHTML = `Distributed <b>${euro(distributed)}</b> + reserve <b>${euro(result.reserveCents)}</b> = <b>${euro(distributed + result.reserveCents)}</b>`
      + (skipped.length ? ` · ${skipped.join(', ')} ${skipped.length > 1 ? "don't" : "doesn't"} qualify: no third-party creator to pay.` : '');
  }
  render();
}
