import {readdir, readFile, stat, realpath} from 'node:fs/promises';
import {join, extname} from 'node:path';
import {CODE_EXT, MAX_CODE_BYTES, inspectModule, relativeImport, dependencyName} from '../sdk/code.js';

const excluded = new Set(['node_modules', 'threetopia_modules', 'dist', 'build', 'coverage', 'vendor']);
const assetExt = new Set(['.glb', '.gltf', '.png', '.jpg', '.jpeg', '.webp', '.ktx2', '.hdr', '.mp3', '.wav', '.ogg']);

/** A bounded, offline inventory. Candidate boundaries are evidence for an agent, not an automatic refactor. */
export async function analyze(root) {
  root = await realpath(root);
  const modules = [], assets = [], diagnostics = [], names = new Set();
  let visited = 0, codeBytes = 0, complete = true, pkg = {};
  const issue = (code, file, message, severity = 'warning') => diagnostics.push({code, severity, file, message});
  async function scan(dir, prefix = '') {
    const entries = (await readdir(dir, {withFileTypes: true})).sort((a, b) => a.name.localeCompare(b.name, 'en'));
    for (const entry of entries) {
      if (entry.name.startsWith('.') || excluded.has(entry.name)) continue;
      const file = prefix + entry.name, path = join(dir, entry.name);
      if (++visited > 5000) { complete = false; issue('ANALYZE_LIMIT', file, 'Stopped at 5,000 entries. Analyze a smaller source directory.'); return; }
      if (entry.isSymbolicLink()) { complete = false; issue('ANALYZE_SYMLINK', file, 'Symlink skipped; its source was not inspected.'); continue; }
      if (entry.isDirectory()) { await scan(path, file + '/'); if (visited > 5000) return; continue; }
      if (!entry.isFile()) continue;
      names.add(file);
      if (assetExt.has(extname(file).toLowerCase())) assets.push({file, bytes: (await stat(path)).size});
      if (!CODE_EXT.test(file) || /\.d\.[cm]?ts$/.test(file)) continue;
      const size = (await stat(path)).size;
      if (size > MAX_CODE_BYTES || codeBytes + size > 16 * 1024 * 1024) {
        complete = false; issue('ANALYZE_CODE_LIMIT', file, 'Source exceeds the 2 MiB/module or 16 MiB/scan limit.'); continue;
      }
      codeBytes += size;
      const result = inspectModule(await readFile(path, 'utf8'), file, {sourceType: file.endsWith('.cjs') ? 'commonjs' : 'unambiguous'});
      diagnostics.push(...result.diagnostics);
      modules.push({file, bytes: size, ...result});
    }
  }
  await scan(root);
  if (names.has('package.json')) {
    if ((await stat(join(root, 'package.json'))).size > MAX_CODE_BYTES) issue('ANALYZE_PACKAGE_JSON', 'package.json', 'package.json exceeds the scan limit.', 'error');
    else try { pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8')); if (!pkg || typeof pkg !== 'object' || Array.isArray(pkg)) throw Error(); }
    catch { pkg = {}; issue('ANALYZE_PACKAGE_JSON', 'package.json', 'Could not parse package.json.', 'error'); }
  }
  const byFile = new Map(modules.map(m => [m.file, m]));
  for (const module of modules) for (const imported of module.imports) {
    if (!imported.specifier.startsWith('.')) continue;
    const base = relativeImport(module.file, imported.specifier);
    imported.resolved = base === null ? null : ['', '.js', '.mjs', '.ts', '.tsx', '.jsx', '/index.js', '/index.ts', '/index.tsx'].map(suffix => base + suffix).find(file => names.has(file)) ?? null;
    if (!imported.resolved) issue('ANALYZE_IMPORT', module.file, `Could not resolve ${imported.specifier}; check aliases, generated files or imports outside this source directory.`);
  }
  function closure(entry) {
    const seen = new Set(), signals = new Set(), peers = new Set(), unresolved = [];
    function visit(file) {
      if (seen.has(file)) return; seen.add(file);
      const module = byFile.get(file); if (!module) return;
      for (const s of module.signals) signals.add(s.code);
      for (const i of module.imports) {
        if (i.resolved) visit(i.resolved);
        else if (i.specifier.startsWith('.')) unresolved.push({file, specifier: i.specifier});
        else peers.add(dependencyName(i.specifier));
      }
    }
    visit(entry);
    return {files: [...seen].sort(), signals: [...signals].sort(), externalDependencies: [...peers].sort(), unresolved};
  }
  const candidates = modules.filter(m => m.exports.length && !m.diagnostics.length && !/(?:^|\/)(?:test|tests|__tests__)\/|\.(?:test|spec)\./.test(m.file)).map(module => {
    const graph = closure(module.file);
    const score = (module.exports.some(e => /^(?:create|build)/i.test(e.name)) ? 8 : 0) + (/Geometry|Shapes|Noise|Gulls|BoatModel/.test(module.file) ? 4 : 0) - graph.signals.length * 2 - graph.files.length / 50;
    return {entry: module.file, exports: module.exports, ...graph, score,
      review: graph.signals.length || graph.unresolved.length ? 'Separate host dependencies before extraction.' : 'Test independent instances and preserve attribution before extraction.'};
  }).sort((a, b) => b.score - a.score || a.entry.localeCompare(b.entry)).slice(0, 12).map(({score, ...candidate}) => candidate);
  return {
    schemaVersion: 1, command: 'analyze', valid: !diagnostics.some(d => d.severity === 'error'), complete,
    project: {name: pkg.name ?? null, license: pkg.license ?? null, licenseFiles: [...names].filter(n => /^(?:LICENSE|COPYING|CREDITS|NOTICE)(?:\..*)?$/i.test(n)), dependencies: {...pkg.dependencies, ...pkg.peerDependencies}, upstream: pkg.upstream ?? null},
    summary: {modules: modules.length, assets: assets.length, codeBytes}, candidates, modules, assets, diagnostics,
    workflow: {
      catalogSearched: false, sourceExecuted: false, filesChanged: false,
      next: ['Inventory every source feature and asset; a complete conversion must preserve visuals, simulation, gameplay, audio and controls.', 'Search the real asset catalog for the proposed capabilities.', 'Propose a world-tile composition, a separate map-tile package, and cohesive reusable sub-packages with real dependencies, APIs and provenance.', 'Ask before rewriting source unless the creator has already approved this extraction.', 'Extract, preserve attribution, then verify reuse in the original and a second scene.', 'Run package checks and lifecycle/browser tests. Reserve a tile before creating a world. Push privately for review.'],
      guide: 'https://docs.threetopia.com/conversion.md',
      limitations: ['Static signals and dependency closures are suggestions, not proven component boundaries.', 'Bundler aliases, computed imports, runtime behavior and visual parity require review.', 'Shared-map representations are static GLB; preserve full simulation and gameplay in a complete scene runtime (docs.threetopia.com/scenes.md).'],
    },
  };
}
