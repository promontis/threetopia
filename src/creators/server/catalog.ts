import type {D1Database, D1PreparedStatement} from '@cloudflare/workers-types';
import {FILTER_KEYS, categoryLabel, parseCatalogQuery, type CatalogQuery, type CatalogResponse, type Facet, type FilterKey} from '../package-discovery';

type SQL = {sql: string; values: (string | number)[]};
const placeholders = (values: unknown[]) => values.map(() => '?').join(',');

/** FTS operators and punctuation are treated as text, never query syntax. */
export function fullTextQuery(input: string): string {
  return [...new Set(input.normalize('NFC').match(/[\p{L}\p{N}]+/gu) || [])]
    .slice(0, 16).map(word => `"${word.slice(0, 80)}"*`).join(' AND ');
}

function selection(query: CatalogQuery, ignore?: FilterKey): SQL {
  const match = fullTextQuery(query.q), where: string[] = [], values: (string | number)[] = [];
  const from = 'FROM package_catalog pc' + (match ? ' JOIN package_search ON package_search.rowid=pc.rowid' : '');
  if (match) { where.push('package_search MATCH ?'); values.push(match); }
  else if (query.q) where.push('0');
  for (const key of FILTER_KEYS) {
    if (key === ignore || !query[key].length) continue;
    where.push(key === 'tag'
      ? `pc.id IN (SELECT package_id FROM package_catalog_tags WHERE tag IN (${placeholders(query[key])}))`
      : `pc.${key === 'creator' ? 'handle' : key} IN (${placeholders(query[key])})`);
    values.push(...query[key]);
  }
  return {sql: from + ' WHERE ' + (where.join(' AND ') || '1'), values};
}

export function catalogRowsSQL(query: CatalogQuery): SQL {
  const selected = selection(query), match = !!fullTextQuery(query.q);
  const orders = {
    relevance: match ? 'bm25(package_search,10,8,1,4,5),pc.installers DESC,pc.updated_at DESC' : 'pc.updated_at DESC',
    updated: 'pc.updated_at DESC', newest: 'pc.created_at DESC',
    popular: 'pc.installers DESC,pc.updated_at DESC', name: 'pc.title COLLATE NOCASE',
  };
  return {sql: `SELECT pc.*,'published' AS state ${selected.sql} ORDER BY ${orders[query.sort]},pc.id LIMIT ? OFFSET ?`,
    values: [...selected.values, query.perPage, (query.page - 1) * query.perPage]};
}

export function catalogCountSQL(query: CatalogQuery): SQL {
  const selected = selection(query);
  return {...selected, sql: 'SELECT COUNT(*) AS total ' + selected.sql};
}

/** Counts ignore only their own facet, so selecting one option never hides alternatives. */
export function catalogFacetSQL(query: CatalogQuery, key: FilterKey, creatorSearch = ''): SQL {
  const selected = selection(query, key);
  const expression = key === 'creator' ? 'pc.handle' : key === 'tag' ? 'ct.tag' : `pc.${key}`;
  const label = key === 'creator' ? "COALESCE(NULLIF(pc.display_name,''),pc.handle)" : expression;
  if (key === 'tag') selected.sql = selected.sql.replace(' WHERE ', ' JOIN package_catalog_tags ct ON ct.package_id=pc.id WHERE ');
  if (key === 'creator' && creatorSearch.trim()) {
    const term = '%' + creatorSearch.trim().replace(/^@/, '').slice(0, 80).replace(/[\\%_]/g, '\\$&') + '%';
    selected.sql += " AND (pc.handle LIKE ? ESCAPE '\\' OR pc.display_name LIKE ? ESCAPE '\\')";
    selected.values.push(term, term);
  }
  // Keep chosen values visible, even when they fall outside the most-used tags/licenses.
  const chosen = query[key];
  const preferred = chosen.length ? `${expression} IN (${placeholders(chosen)}) DESC,` : '';
  return {sql: `SELECT ${expression} AS value,${label} AS label,COUNT(*) AS count ${selected.sql}
    GROUP BY ${expression} ORDER BY ${preferred}count DESC,value COLLATE NOCASE LIMIT ${key === 'tag' ? 20 : 60}`,
    values: [...selected.values, ...chosen]};
}

const prepare = (db: D1Database, query: SQL): D1PreparedStatement => db.prepare(query.sql).bind(...query.values);

export async function searchCatalog(db: D1Database, params: URLSearchParams): Promise<CatalogResponse> {
  const query = parseCatalogQuery(params);
  // D1 batch gives counts, facets and this page one consistent read snapshot.
  const [count, page, ...groups] = await db.batch([
    prepare(db, catalogCountSQL(query)), prepare(db, catalogRowsSQL(query)),
    ...FILTER_KEYS.map(key => prepare(db, catalogFacetSQL(query, key))),
  ]);
  const total = Number((count.results[0] as {total: number}).total), pages = Math.max(1, Math.ceil(total / query.perPage));
  let rows = page.results as any[];
  if (query.page > pages) {
    query.page = pages;
    rows = (await prepare(db, catalogRowsSQL(query)).all()).results;
  }
  const facets = Object.fromEntries(FILTER_KEYS.map((key, index) => {
    const values = groups[index].results as Facet[];
    // A selected filter can legitimately have zero matches; it must remain removable.
    for (const value of query[key]) if (!values.some(facet => facet.value === value)) values.push({value, label: value, count: 0});
    if (key === 'category') values.forEach(facet => facet.label = categoryLabel(facet.value));
    if (key === 'kind') values.forEach(facet => facet.label = facet.value === 'asset' ? 'Assets' : facet.value === 'world' ? 'Worlds' : facet.value);
    return [key, values];
  })) as CatalogResponse['facets'];
  return {packages: rows.map(row => ({...row, tags: JSON.parse(row.tags)})), total, pages,
    page: query.page, perPage: query.perPage, facets};
}

export async function searchCreators(db: D1Database, params: URLSearchParams) {
  const query = parseCatalogQuery(params), search = params.get('creatorSearch') || '';
  const rows = await prepare(db, catalogFacetSQL(query, 'creator', search)).all<Facet>();
  return {creators: rows.results};
}
