import './package-catalog.css';
import {CATALOG_SORTS, FILTER_KEYS, PACKAGE_CATEGORIES, catalogHref, catalogParams, categoryLabel, parseCatalogQuery,
  type CatalogPackage, type CatalogQuery, type CatalogResponse, type Facet, type FilterKey} from './package-discovery';

const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const paths: Record<string, string> = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  filter: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  asset: '<path d="m12 3 9 5v8l-9 5-9-5V8l9-5Zm0 9 9-4M12 12 3 8m9 4v9M7.5 5.5l9 5v5"/>',
  world: '<path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z"/><path d="m3 16 6-7 5 5 3-4 4 6"/>',
  arrow: '<path d="M6 18 18 6M6 6h12v12"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  left: '<path d="m14 6-6 6 6 6"/>', right: '<path d="m10 6 6 6-6 6"/>',
};
const svg = (name: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.asset}</svg>`;
const filterLabel = (key: FilterKey, value: string) => key === 'kind' ? value === 'asset' ? 'Assets' : value === 'world' ? 'Worlds' : value
  : key === 'category' ? categoryLabel(value) : key === 'creator' ? '@' + value : value;
const number = (value: number) => value.toLocaleString('en');
const packageCount = (value: number) => `${number(value)} package${value === 1 ? '' : 's'}`;
const countFilters = (query: CatalogQuery) => FILTER_KEYS.reduce((total, key) => total + query[key].length, 0);

function card(pkg: CatalogPackage, query: CatalogQuery): string {
  const detail = `/packages/${encodeURIComponent(pkg.id)}?from=${encodeURIComponent(catalogHref(query))}`;
  const date = new Intl.DateTimeFormat('en', {month: 'short', day: 'numeric', year: 'numeric'}).format(pkg.updated_at);
  return `<article class="catalog-card">
    <a href="${esc(detail)}" data-nav class="catalog-card-link">
      <div class="catalog-card-top"><span class="catalog-package-icon">${svg(pkg.kind)}</span><span>${pkg.kind === 'world' ? 'World' : 'Asset'}</span><span class="catalog-version">v${esc(pkg.latest_version)}</span></div>
      <h2>${esc(pkg.title)} ${svg('arrow')}</h2><p class="catalog-package-name">${esc(pkg.name)}</p>
      <p class="catalog-description">${esc(pkg.description || 'No description provided.')}</p>
    </a>
    <div class="catalog-card-tags">${pkg.category !== 'uncategorized' ? `<button type="button" data-add-filter="category" data-value="${esc(pkg.category)}">${esc(categoryLabel(pkg.category))}</button>` : ''}${pkg.tags.slice(0, 3).map(tag => `<button type="button" data-add-filter="tag" data-value="${esc(tag)}">${esc(tag)}</button>`).join('')}</div>
    <div class="catalog-card-license"><span>${esc(pkg.license)}</span><time datetime="${new Date(pkg.updated_at).toISOString()}" title="Last published update">Updated ${date}</time></div>
    <footer><button type="button" class="catalog-by" data-add-filter="creator" data-value="${esc(pkg.handle)}" title="Packages by ${esc(pkg.display_name || pkg.handle)}"><span class="catalog-avatar" aria-hidden="true">${esc((pkg.display_name || pkg.handle).slice(0, 1).toUpperCase())}</span>@${esc(pkg.handle)}</button><span class="catalog-installs" title="${number(pkg.installers)} creators with an active CLI installation">${svg('download')}${number(pkg.installers)}<span class="catalog-sr-only"> creators installed</span></span></footer>
  </article>`;
}

export function discoveryFields(category = '', tags: string[] = []): string {
  return `<label>Category<select name="category"><option value="">Choose a category</option>${PACKAGE_CATEGORIES.map(([value,label]) => `<option value="${value}"${category === value ? ' selected' : ''}>${label}</option>`).join('')}</select></label>
    <label>Tags<input name="tags" value="${esc(tags.join(', '))}" placeholder="e.g. coastal, low poly, rocks" maxlength="318" aria-describedby="package-tags-help"></label><p class="fine" id="package-tags-help">Separate tags with commas. Up to 10 tags, 30 characters each.</p>`;
}

export function mountPackageCatalog(root: HTMLElement, request: (path: string, signal: AbortSignal) => Promise<any>): () => void {
  let query = parseCatalogQuery(new URLSearchParams(location.search));
  let response: CatalogResponse | null = null, controller: AbortController | null = null, creatorController: AbortController | null = null;
  let revision = 0, creatorRevision = 0, disposed = false, searchTimer: ReturnType<typeof setTimeout> | undefined, creatorTimer: ReturnType<typeof setTimeout> | undefined;
  let editingSearch = false, customSort = new URLSearchParams(location.search).has('sort');
  history.replaceState(history.state, '', catalogHref(query));
  root.innerHTML = `<div class="catalog-search-area"><form class="catalog-search" role="search">
      ${svg('search')}<label class="catalog-sr-only" for="package-search">Search packages</label><input id="package-search" name="q" type="search" placeholder="Search packages, creators, or tags…" value="${esc(query.q)}" maxlength="160" autocomplete="off" spellcheck="false" aria-describedby="catalog-search-help"><kbd aria-hidden="true">/</kbd><button type="submit" class="primary">Search</button>
    </form><p class="catalog-search-help" id="catalog-search-help">Search names, descriptions, creators and tags.</p></div>
    <div class="catalog-toolbar"><button type="button" class="catalog-filter-toggle" aria-expanded="false" aria-controls="package-filters">${svg('filter')}Filters <span data-filter-count></span></button><p class="catalog-status" id="catalog-status" role="status" aria-live="polite" aria-atomic="true">Finding packages…</p><label class="catalog-sort">Sort by <select aria-label="Sort packages">${CATALOG_SORTS.map(([value,label]) => `<option value="${value}"${query.sort === value ? ' selected' : ''}>${label}</option>`).join('')}</select></label></div>
    <div class="catalog-active" aria-label="Active filters" hidden></div>
    <div class="catalog-layout"><div class="catalog-filter-column"><aside class="catalog-filters" id="package-filters" aria-label="Filter packages">
      <div class="catalog-filter-heading"><h2>Filters</h2><button type="button" data-reset-filters hidden>Clear all</button></div>
      <fieldset data-facet="kind"><legend>Package type</legend><div data-options></div></fieldset>
      <fieldset data-facet="category"><legend>Category</legend><div data-options></div></fieldset>
      <fieldset data-facet="creator"><legend>Creator</legend><label class="catalog-sr-only" for="creator-search">Find a creator</label><div class="catalog-creator-search">${svg('search')}<input id="creator-search" type="search" placeholder="Find a creator…" maxlength="80" autocomplete="off" spellcheck="false"></div><div class="catalog-creator-options" data-options></div></fieldset>
      <fieldset data-facet="license"><legend>License</legend><div data-options></div></fieldset>
      <fieldset data-facet="tag"><legend>Tags</legend><div class="catalog-tag-options" data-options></div></fieldset>
    </aside></div><section class="catalog-results" aria-label="Package results" aria-busy="true"><div class="catalog-grid"></div><nav class="catalog-pagination" aria-label="Package pages"></nav></section></div>`;

  const input = root.querySelector<HTMLInputElement>('#package-search')!;
  const creatorInput = root.querySelector<HTMLInputElement>('#creator-search')!;
  const sort = root.querySelector<HTMLSelectElement>('.catalog-sort select')!;
  const status = root.querySelector<HTMLElement>('.catalog-status')!;
  const resultArea = root.querySelector<HTMLElement>('.catalog-results')!;
  const grid = root.querySelector<HTMLElement>('.catalog-grid')!;
  const pages = root.querySelector<HTMLElement>('.catalog-pagination')!;
  const active = root.querySelector<HTMLElement>('.catalog-active')!;
  const toggle = root.querySelector<HTMLButtonElement>('.catalog-filter-toggle')!;

  function checkbox(key: FilterKey, facet: Facet): string {
    return `<label class="catalog-filter-option"><input type="checkbox" data-filter="${key}" value="${esc(facet.value)}"${query[key].includes(facet.value) ? ' checked' : ''}><span>${esc(key === 'creator' ? '@' + facet.value : facet.label)}</span><small>${number(facet.count)}</small></label>`;
  }
  function drawOptions(key: FilterKey, facets: Facet[]) {
    const field = root.querySelector<HTMLElement>(`[data-facet="${key}"]`)!;
    const focused = document.activeElement as HTMLInputElement | null;
    const focusValue = focused?.dataset.filter === key ? focused.value : null;
    let values = facets;
    if (key === 'kind') values = ['asset','world'].map(value => facets.find(f => f.value === value) || {value, label: value === 'asset' ? 'Assets' : 'Worlds', count: 0});
    if (key === 'category') values = [...facets].sort((a,b) => a.label.localeCompare(b.label));
    field.hidden = !values.length && (key === 'tag' || key === 'license');
    const target = field.querySelector<HTMLElement>('[data-options]')!;
    target.innerHTML = values.length ? values.map(f => checkbox(key, f)).join('') : `<p class="catalog-facet-empty">${key === 'creator' ? 'No creators found.' : 'No matching categories.'}</p>`;
    if (focusValue !== null) Array.from(target.querySelectorAll<HTMLInputElement>('input')).find(el => el.value === focusValue)?.focus({preventScroll:true});
  }
  function drawFilters() {
    for (const key of FILTER_KEYS) if (key !== 'creator' || !creatorInput.value) drawOptions(key, response?.facets[key] || []);
    if (creatorInput.value) void findCreators();
  }
  function drawActive() {
    const focused = document.activeElement;
    const focusedChip = focused instanceof HTMLButtonElement && active.contains(focused)
      ? Array.from(active.querySelectorAll('button')).indexOf(focused) : -1;
    const count = countFilters(query);
    root.querySelector<HTMLElement>('[data-filter-count]')!.textContent = count ? String(count) : '';
    root.querySelector<HTMLButtonElement>('[data-reset-filters]')!.hidden = !count;
    active.hidden = !count && !query.q;
    active.innerHTML = `${query.q ? `<button type="button" class="catalog-chip" data-clear-query aria-label="Remove search: ${esc(query.q)}"><span>“${esc(query.q)}”</span>${svg('close')}</button>` : ''}${FILTER_KEYS.flatMap(key => query[key].map(value => `<button type="button" class="catalog-chip" data-remove-filter="${key}" data-value="${esc(value)}" aria-label="Remove ${esc(key)} filter: ${esc(filterLabel(key,value))}"><span>${esc(filterLabel(key,value))}</span>${svg('close')}</button>`)).join('')}${count || query.q ? '<button class="catalog-reset" type="button" data-reset-all>Clear all</button>' : ''}`;
    sort.value = query.sort;
    if (focusedChip >= 0) (active.querySelectorAll<HTMLButtonElement>('button')[focusedChip] || input).focus({preventScroll:true});
  }
  function drawResults(data: CatalogResponse) {
    status.textContent = query.q ? `${packageCount(data.total)} for “${query.q}”` : packageCount(data.total);
    if (data.packages.length) grid.innerHTML = data.packages.map(pkg => card(pkg, query)).join('');
    else grid.innerHTML = `<div class="catalog-empty">${svg('search')}<h2>${query.q || countFilters(query) ? 'No matching packages' : 'No published packages yet'}</h2><p>${query.q || countFilters(query) ? 'Try a broader search or remove a filter to see more packages.' : 'Published assets and worlds will appear here.'}</p>${query.q || countFilters(query) ? '<button type="button" class="button secondary" data-reset-all>Clear search & filters</button>' : ''}</div>`;
    pages.innerHTML = data.pages > 1 ? `<p>Showing ${number((data.page-1)*data.perPage+1)}–${number(Math.min(data.total,data.page*data.perPage))} of ${number(data.total)}</p><div><button type="button" data-page="${data.page-1}" aria-label="Previous page"${data.page <= 1 ? ' disabled' : ''}>${svg('left')}</button><span>Page ${number(data.page)} of ${number(data.pages)}</span><button type="button" data-page="${data.page+1}" aria-label="Next page"${data.page >= data.pages ? ' disabled' : ''}>${svg('right')}</button></div>` : '';
  }
  async function load() {
    const current = ++revision;
    controller?.abort(); controller = new AbortController();
    creatorController?.abort(); ++creatorRevision;
    resultArea.setAttribute('aria-busy','true'); grid.inert = pages.inert = true;
    status.textContent = 'Searching…'; drawActive();
    if (!response) grid.innerHTML = Array.from({length: 6}, () => '<div class="catalog-skeleton" aria-hidden="true"><i></i><i></i><i></i><i></i></div>').join('');
    try {
      const data = await request('/packages?' + catalogParams(query), controller.signal) as CatalogResponse;
      if (disposed || current !== revision) return;
      response = data;
      if (data.page !== query.page) { query.page = data.page; history.replaceState(history.state,'',catalogHref(query)); }
      drawFilters(); drawResults(data);
    } catch (error) {
      if (disposed || current !== revision || controller.signal.aborted) return;
      status.textContent = 'Search unavailable';
      grid.innerHTML = `<div class="catalog-empty" role="alert"><h2>We couldn’t load packages</h2><p>${esc((error as Error).message)}</p><button type="button" class="button secondary" data-retry-search>Try again</button></div>`;
      pages.innerHTML = '';
    } finally {
      if (!disposed && current === revision) { resultArea.setAttribute('aria-busy','false'); grid.inert = pages.inert = false; }
    }
  }
  async function findCreators() {
    const current = ++creatorRevision, searchRevision = revision;
    creatorController?.abort(); creatorController = new AbortController();
    const params = catalogParams(query); params.set('creatorSearch', creatorInput.value);
    try {
      const data = await request('/packages/creators?' + params, creatorController.signal);
      if (!disposed && current === creatorRevision && searchRevision === revision) drawOptions('creator', data.creators);
    } catch {
      if (!disposed && current === creatorRevision && !creatorController.signal.aborted) root.querySelector('[data-facet="creator"] [data-options]')!.innerHTML = '<p class="catalog-facet-empty" role="status">Couldn’t find creators. Try again.</p>';
    }
  }
  function commit(replace = false) {
    clearTimeout(searchTimer);
    const url = catalogHref(query);
    if (location.pathname + location.search !== url) history[replace ? 'replaceState' : 'pushState'](history.state,'',url);
    void load();
  }
  function readSearch() {
    const normalized = input.value.trim().replace(/\s+/g,' ');
    if (normalized !== query.q) { query.q = normalized; if (!customSort) query.sort = query.q ? 'relevance' : 'updated'; }
  }
  function changeFilter(key: FilterKey, value: string, selected: boolean) {
    readSearch(); query.page = 1; editingSearch = false;
    query[key] = selected ? [...new Set([...query[key], value])].slice(0,10) : query[key].filter(v => v !== value);
    query[key].sort(); commit();
  }
  input.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { readSearch(); query.page = 1; commit(editingSearch); editingSearch = true; }, 280);
  });
  input.addEventListener('blur', () => editingSearch = false);
  root.querySelector('form')!.addEventListener('submit', event => { event.preventDefault(); readSearch(); query.page = 1; commit(editingSearch); editingSearch = false; });
  sort.addEventListener('change', () => { readSearch(); query.sort = sort.value as CatalogQuery['sort']; customSort = true; query.page = 1; editingSearch = false; commit(); });
  creatorInput.addEventListener('input', () => { clearTimeout(creatorTimer); creatorTimer = setTimeout(() => void findCreators(), 250); });
  root.addEventListener('change', event => {
    const field = event.target as HTMLInputElement;
    if (field.dataset.filter) changeFilter(field.dataset.filter as FilterKey, field.value, field.checked);
  });
  root.addEventListener('click', event => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
    if (!button) return;
    if (button.hasAttribute('data-reset-all') || button.hasAttribute('data-reset-filters')) {
      const keepSearch = button.hasAttribute('data-reset-filters');
      for (const key of FILTER_KEYS) query[key] = [];
      if (!keepSearch) { input.value = ''; query.q = ''; if (!customSort) query.sort = 'updated'; }
      else readSearch();
      creatorInput.value = ''; query.page = 1; editingSearch = false; commit();
    } else if (button.hasAttribute('data-clear-query')) {
      input.value = ''; readSearch(); query.page = 1; editingSearch = false; commit(); input.focus();
    } else if (button.dataset.addFilter) changeFilter(button.dataset.addFilter as FilterKey, button.dataset.value!, true);
    else if (button.dataset.removeFilter) changeFilter(button.dataset.removeFilter as FilterKey, button.dataset.value!, false);
    else if (button.dataset.page) { readSearch(); query.page = Number(button.dataset.page); editingSearch = false; commit(); root.scrollIntoView({block:'start'}); }
    else if (button.hasAttribute('data-retry-search')) void load();
    else if (button === toggle) { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded',String(open)); root.classList.toggle('catalog-filters-open',open); }
  });
  const shortcut = (event: KeyboardEvent) => {
    if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || (event.target as HTMLElement).closest('input,textarea,select,[contenteditable="true"]')) return;
    event.preventDefault(); input.focus();
  };
  document.addEventListener('keydown', shortcut);
  drawFilters(); void load();
  return () => { disposed = true; ++revision; ++creatorRevision; controller?.abort(); creatorController?.abort(); clearTimeout(searchTimer); clearTimeout(creatorTimer); document.removeEventListener('keydown',shortcut); };
}
