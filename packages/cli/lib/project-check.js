import {readFile, realpath} from 'node:fs/promises';
import {join, resolve, relative, sep} from 'node:path';
import {validateManifest, inspectGLB, validPath, sha256, verifyTile} from '../sdk/index.js';
import {validateCodeFiles} from '../sdk/code.js';
import {validateRuntimeFiles} from '../sdk/runtime.js';

export class CheckError extends Error {
  constructor(diagnostics) { super(diagnostics.filter(d => d.severity === 'error').map(d => `${d.file ? d.file + ': ' : ''}${d.message}`).join('\n')); this.diagnostics = diagnostics; }
}
const issue = (code, message, file) => ({code, severity: 'error', ...(file ? {file} : {}), message});
export async function readProjectFile(root, path) {
  if (!validPath(path)) throw Error(`Unsafe file path: ${path}`);
  const actual = await realpath(resolve(root, path)), base = await realpath(root), rel = relative(base, actual);
  if (!rel || rel === '..' || rel.startsWith('..' + sep) || rel.startsWith(sep)) throw Error('Files and symlinks must stay inside the project.');
  return new Uint8Array(await readFile(actual));
}

export async function checkProject(root, registry) {
  const diagnostics = [], files = new Map(), report = {}, fileMetrics = {};
  let cfg;
  try { cfg = JSON.parse(new TextDecoder().decode(await readProjectFile(root, 'threetopia.json'))); }
  catch (e) { throw new CheckError([issue('PROJECT_READ', e.message, 'threetopia.json')]); }
  if (!cfg || typeof cfg !== 'object' || !cfg.manifest || !Array.isArray(cfg.files)) throw new CheckError([issue('PROJECT_FORMAT', 'Expected a manifest object and a files array.', 'threetopia.json')]);
  if (registry && cfg.registry !== registry) throw new CheckError([issue('PROJECT_REGISTRY', `This project uses ${cfg.registry}. Use --registry ${cfg.registry}`, 'threetopia.json')]);
  const manifest = structuredClone(cfg.manifest); manifest.files = [];
  for (const path of cfg.files) {
    try {
      const data = await readProjectFile(root, path); files.set(path, data);
      manifest.files.push({path, bytes: data.length, sha256: await sha256(data)});
    } catch (e) { diagnostics.push(issue('FILE_READ', e.message, typeof path === 'string' ? path : 'threetopia.json')); }
  }
  if (manifest.kind === 'world') {
    try {
      manifest.tile = JSON.parse(new TextDecoder().decode(await readProjectFile(root, 'tile.lock.json')));
      if (!await verifyTile(manifest.tile)) throw Error('The host tile was modified. Restore tile.lock.json from your reservation.');
    } catch (e) { diagnostics.push(issue('TILE_LOCK', e.message, 'tile.lock.json')); }
  }
  for (const message of await validateManifest(manifest)) diagnostics.push(issue('MANIFEST', message, 'threetopia.json'));
  if (!diagnostics.length) for (const [path, data] of files) {
    const roles = manifest.kind === 'world' ? Object.entries(manifest.content).filter(([,p]) => p === path).map(([r]) => r) : path.endsWith('.glb') ? ['asset'] : [];
    for (const role of roles) {
      try { const metrics = inspectGLB(data, role, manifest.tile); (fileMetrics[path] ??= {})[role] = metrics; report[role] ??= metrics; }
      catch (e) { diagnostics.push(issue('GEOMETRY', e.message, path)); }
    }
  }
  const code = validateCodeFiles(files, manifest); diagnostics.push(...code.diagnostics);
  if (!diagnostics.some(d => d.severity === 'error')) for (const message of validateRuntimeFiles(manifest, files)) diagnostics.push(issue('SCENE_COVERAGE', message, manifest.runtime.coverage));
  if (diagnostics.some(d => d.severity === 'error')) throw new CheckError(diagnostics);
  return {cfg, manifest, files, report, fileMetrics, diagnostics, code: {modules: code.modules, executed: false}};
}
