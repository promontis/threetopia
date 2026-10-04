import { locations, packages, packageById, type Package, type PackageId, type Location } from '../packages/catalog.ts';
import { xrayArtwork } from '../packages/xray-art.ts';

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

export function mountPackageTools(explorer: HTMLElement, xray: HTMLElement) {
  const search = explorer.querySelector<HTMLInputElement>('[data-package-search]')!;
  const filters = explorer.querySelectorAll<HTMLButtonElement>('[data-package-filter]');
  const grid = explorer.querySelector<HTMLElement>('[data-package-grid]')!;
  const detail = explorer.querySelector<HTMLElement>('[data-package-detail]')!;
  const empty = explorer.querySelector<HTMLElement>('[data-package-empty]')!;
  const results = explorer.querySelector<HTMLElement>('[data-package-results]')!;
  const window = xray.querySelector<HTMLElement>('[data-xray-window]')!;
  const locationButtons = xray.querySelectorAll<HTMLButtonElement>('[data-xray-location]');
  const toggle = xray.querySelector<HTMLButtonElement>('[data-xray-toggle]')!;
  const list = xray.querySelector<HTMLElement>('[data-xray-packages]')!;
  const selection = xray.querySelector<HTMLElement>('[data-xray-selection]')!;
  const announcement = xray.querySelector<HTMLElement>('[data-xray-announcement]')!;
  const artwork = xray.querySelector<HTMLElement>('[data-xray-artwork]')!;
  let filter = 'all';
  let selected: PackageId = 'meadow';
  let place: Location = locations[0];
  let inspected: PackageId = 'meadow';
  let exploded = true;

  const thumbnail = (item: Package, className: string) => `<span class="${className} package-image-${item.id}"><img src="${item.image}" alt="" loading="lazy" decoding="async" width="1440" height="810" /></span>`;
  grid.innerHTML = packages.map(item => `<button class="package-tile" type="button" data-package-id="${item.id}" aria-label="Inspect ${escape(item.name)}" aria-pressed="${item.id === selected}">
    ${thumbnail(item, 'package-tile-image')}
    <span class="package-tile-copy"><span class="package-tile-category">${item.category}</span><strong>${escape(item.name)}</strong><span class="package-tile-author">${escape(item.author)}</span></span>
    <span class="package-tile-arrow" aria-hidden="true">↗</span>
  </button>`).join('');
  artwork.innerHTML = xrayArtwork();
  const layers = xray.querySelectorAll<SVGGElement>('[data-xray-layer]');

  function showDetail() {
    const item = packageById(selected);
    grid.querySelectorAll<HTMLButtonElement>('[data-package-id]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.packageId === selected)));
    detail.innerHTML = `<div class="package-detail-copy">
        <p class="package-detail-kind">${item.kind} <span aria-hidden="true">/</span> ${item.category}</p>
        <h3 tabindex="-1">${escape(item.name)}</h3>
        <p class="package-maker"><img src="${item.avatar}" alt="" width="28" height="28" loading="lazy" /><span>${escape(item.author)}</span></p>
        <p class="package-detail-description">${escape(item.description)}</p>
        <a class="package-xray-link" href="#package-xray" data-open-xray>See it in Package X-ray <span aria-hidden="true">↗</span></a>
        <a class="package-source-link" href="${item.source}" target="_blank" rel="noopener noreferrer">View original project <span aria-hidden="true">↗</span></a>
      </div>`;
  }

  function filterPackages() {
    const query = search.value.trim().toLocaleLowerCase();
    const shown = packages.filter(item => (filter === 'all' || item.kind === filter)
      && `${item.name} ${item.author} ${item.category}`.toLocaleLowerCase().includes(query));
    const ids = new Set<PackageId>(shown.map(item => item.id));
    grid.querySelectorAll<HTMLButtonElement>('[data-package-id]').forEach(button => { button.hidden = !ids.has(button.dataset.packageId as PackageId); });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.packageFilter === filter)));
    empty.hidden = shown.length > 0;
    detail.hidden = shown.length === 0;
    results.textContent = `${shown.length} example ${shown.length === 1 ? 'package' : 'packages'}`;
    if (shown.length && !ids.has(selected)) selected = shown[0].id;
    if (shown.length) showDetail();
  }

  function highlight(id: PackageId) {
    layers.forEach(layer => layer.classList.toggle('is-inspected', layer.dataset.xrayLayer === id));
    list.querySelectorAll<HTMLButtonElement>('[data-inspect-package]').forEach(button => button.classList.toggle('is-highlighted', button.dataset.inspectPackage === id));
  }

  function setXrayMode(value: boolean) {
    exploded = value;
    toggle.setAttribute('aria-pressed', String(exploded));
    window.dataset.exploded = String(exploded);
    xray.querySelector<HTMLElement>('[data-xray-view-caption]')!.textContent = exploded ? 'A scene, separated into its packages.' : 'The same packages, together in one scene.';
    announcement.textContent = exploded ? 'Package X-ray on. Packages separated into layers.' : 'Package X-ray off. Packages combined into one scene.';
  }

  function inspect(id: PackageId, announce = true) {
    inspected = id;
    const item = packageById(id);
    list.querySelectorAll<HTMLButtonElement>('[data-inspect-package]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.inspectPackage === id)));
    highlight(id);
    selection.innerHTML = `<span class="xray-selected-label">Selected package</span><strong>${escape(item.name)}</strong>
      <a href="#packages" data-open-explorer>Open in explorer <span aria-hidden="true">↗</span></a>`;
    if (announce) announcement.textContent = `${item.name} by ${item.author} highlighted at ${place.name}.`;
  }

  function showLocation(next: Location, packageId?: PackageId) {
    place = next;
    window.dataset.location = place.id;
    xray.querySelector<HTMLElement>('[data-xray-place]')!.textContent = place.name;
    xray.querySelector<HTMLElement>('[data-xray-position]')!.textContent = `Position ${place.position} · tile ${place.tile}`;
    xray.querySelector<HTMLElement>('[data-xray-count]')!.textContent = `${place.packages.length} packages`;
    locationButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.xrayLocation === place.id)));
    layers.forEach(layer => layer.toggleAttribute('hidden', !place.packages.includes(layer.dataset.xrayLayer as PackageId)));
    list.innerHTML = place.packages.map(id => {
      const item = packageById(id);
      return `<button class="xray-package" type="button" data-inspect-package="${id}" aria-pressed="false" style="--package-color:${item.color}">
        <span class="xray-package-key" aria-hidden="true"></span><span class="xray-package-copy"><strong>${escape(item.name)}</strong><span>${escape(item.author)}</span></span>
        <img src="${item.avatar}" alt="" width="30" height="30" loading="lazy" />
      </button>`;
    }).join('');
    const nextId = packageId && place.packages.includes(packageId) ? packageId : place.packages.includes(inspected) ? inspected : place.packages[0];
    inspect(nextId, false);
    const names = place.packages.map(id => packageById(id).name).join(', ');
    xray.querySelector('[data-xray-art-description]')!.textContent = `${place.name}, an example composition of ${names}. Package X-ray separates these packages into layers.`;
    announcement.textContent = `${place.name}. ${place.packages.length} packages in view: ${names}.`;
  }

  search.disabled = false;
  search.addEventListener('input', filterPackages);
  filters.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => { filter = button.dataset.packageFilter!; filterPackages(); });
  });
  explorer.querySelector('[data-package-clear]')!.addEventListener('click', () => {
    search.value = ''; filter = 'all'; filterPackages(); search.focus();
  });
  grid.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-package-id]');
    if (button) { selected = button.dataset.packageId as PackageId; showDetail(); }
  });
  detail.addEventListener('click', event => {
    if (!(event.target as Element).closest('[data-open-xray]')) return;
    const next = place.packages.includes(selected) ? place : locations.find(location => location.packages.includes(selected))!;
    setXrayMode(true);
    showLocation(next, selected);
    xray.querySelector<HTMLElement>('h2')!.focus({ preventScroll: true });
  });
  locationButtons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => showLocation(locations.find(location => location.id === button.dataset.xrayLocation)!));
  });
  toggle.disabled = false;
  toggle.addEventListener('click', () => setXrayMode(!exploded));
  artwork.addEventListener('click', event => {
    const layer = (event.target as Element).closest<SVGGElement>('[data-xray-layer]');
    if (layer) inspect(layer.dataset.xrayLayer as PackageId);
  });
  artwork.addEventListener('pointerover', event => {
    const layer = (event.target as Element).closest<SVGGElement>('[data-xray-layer]');
    if (layer) highlight(layer.dataset.xrayLayer as PackageId);
  });
  artwork.addEventListener('pointerleave', () => highlight(inspected));
  list.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-inspect-package]');
    if (button) inspect(button.dataset.inspectPackage as PackageId);
  });
  list.addEventListener('pointerover', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-inspect-package]');
    if (button) highlight(button.dataset.inspectPackage as PackageId);
  });
  list.addEventListener('pointerleave', () => highlight(inspected));
  list.addEventListener('focusin', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-inspect-package]');
    if (button) highlight(button.dataset.inspectPackage as PackageId);
  });
  list.addEventListener('focusout', event => {
    if (!(event.relatedTarget instanceof Node) || !list.contains(event.relatedTarget)) highlight(inspected);
  });
  selection.addEventListener('click', event => {
    if (!(event.target as Element).closest('[data-open-explorer]')) return;
    search.value = ''; filter = 'all'; selected = inspected; filterPackages();
    detail.querySelector<HTMLElement>('h3')!.focus({ preventScroll: true });
  });
  showDetail();
  showLocation(place, inspected);
}
