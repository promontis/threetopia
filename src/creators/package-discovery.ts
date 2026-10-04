/** Shared URL and listing metadata contract for the catalog, registry and creator editor. */
export const PACKAGE_CATEGORIES = [
  ['nature', 'Nature & vegetation'],
  ['architecture', 'Architecture'],
  ['props', 'Props & objects'],
  ['characters', 'Characters & wildlife'],
  ['vehicles', 'Vehicles'],
  ['materials', 'Materials & textures'],
  ['effects', 'Lighting & effects'],
  ['audio', 'Audio'],
  ['tools', 'Tools & utilities'],
  ['environments', 'Environments'],
] as const;

export const CATALOG_SORTS = [
  ['relevance', 'Best match'], ['updated', 'Recently updated'], ['newest', 'Newest'],
  ['popular', 'Most installed'], ['name', 'Name: A–Z'],
] as const;
export type CatalogSort = typeof CATALOG_SORTS[number][0];
export const FILTER_KEYS = ['kind', 'category', 'creator', 'license', 'tag'] as const;
export type FilterKey = typeof FILTER_KEYS[number];
export type CatalogQuery = Record<FilterKey, string[]> & {q: string; sort: CatalogSort; page: number; perPage: number};
export type Facet = {value: string; label: string; count: number};
export type CatalogPackage = {
  id: string; name: string; title: string; description: string; kind: 'asset' | 'world';
  handle: string; display_name: string; category: string; tags: string[]; license: string;
  latest_version: string; installers: number; updated_at: number; created_at: number; state: 'published';
};
export type CatalogResponse = {
  packages: CatalogPackage[]; total: number; page: number; perPage: number; pages: number;
  facets: Record<FilterKey, Facet[]>;
};

const boundedInteger = (value: string | null, fallback: number, max: number) =>
  value && /^\d+$/.test(value) ? Math.max(1, Math.min(max, Number(value))) : fallback;

export function parseCatalogQuery(params: URLSearchParams): CatalogQuery {
  const filters = Object.fromEntries(FILTER_KEYS.map(key => [key,
    [...new Set(params.getAll(key).map(value => {
      const clean = value.trim().slice(0, 100);
      return key === 'license' ? clean : (key === 'creator' ? clean.replace(/^@/, '') : clean).toLowerCase();
    }).filter(Boolean))].slice(0, 10).sort(),
  ])) as Record<FilterKey, string[]>;
  const q = (params.get('q') || '').trim().replace(/\s+/g, ' ').slice(0, 160);
  const sort = params.get('sort') as CatalogSort;
  return {...filters, q, sort: CATALOG_SORTS.some(([value]) => value === sort) ? sort : q ? 'relevance' : 'updated',
    page: boundedInteger(params.get('page'), 1, 10_000), perPage: boundedInteger(params.get('perPage'), 24, 60)};
}

export function catalogParams(query: CatalogQuery): URLSearchParams {
  const params = new URLSearchParams();
  if (query.q) params.set('q', query.q);
  for (const key of FILTER_KEYS) for (const value of query[key]) params.append(key, value);
  if (query.sort !== (query.q ? 'relevance' : 'updated')) params.set('sort', query.sort);
  if (query.page > 1) params.set('page', String(query.page));
  if (query.perPage !== 24) params.set('perPage', String(query.perPage));
  return params;
}

export function catalogHref(query: CatalogQuery): string {
  const search = catalogParams(query).toString();
  return '/packages' + (search ? `?${search}` : '');
}

export function catalogReturnHref(search: string): string | null {
  const from = new URLSearchParams(search).get('from');
  if (!from || !/^\/packages(?:\?|$)/.test(from)) return null;
  return catalogHref(parseCatalogQuery(new URLSearchParams(from.split('?')[1] || '')));
}

export const categoryLabel = (id: string) => PACKAGE_CATEGORIES.find(([value]) => value === id)?.[1]
  || (id === 'uncategorized' || !id ? 'Uncategorized' : id);

/** Listing metadata can be edited without changing immutable package versions. */
export function validateDiscovery(value: {category?: unknown; tags?: unknown}): {category: string; tags: string[]} {
  const category = value.category ?? '';
  if (typeof category !== 'string' || category !== '' && !PACKAGE_CATEGORIES.some(([id]) => id === category)) {
    throw new Error('Choose a valid package category.');
  }
  const tags = value.tags ?? [];
  if (!Array.isArray(tags) || tags.length > 10 || tags.some(tag => typeof tag !== 'string'
      || !/^[\p{L}\p{N}][\p{L}\p{N} -]{0,29}$/u.test(tag.trim()))) {
    throw new Error('Use up to 10 tags of 1–30 letters, numbers, spaces or hyphens.');
  }
  return {category, tags: [...new Set((tags as string[]).map(tag => tag.trim().toLowerCase().replace(/\s+/g, ' ')))]};
}
