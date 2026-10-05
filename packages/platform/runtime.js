/** Structural validation for complete scene runtimes. It never evaluates code. */
export function validateRuntime(manifest) {
  const r = manifest.runtime, errors = [];
  const p = manifest.preview;
  if(p!==undefined && (!p || p.format!=='scene-reference-v1' || !/^@[a-z][a-z0-9-]{2,29}\/[a-z][a-z0-9-]{1,59}$/.test(p.package) || !/^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/.test(p.version) || !/^[a-z][a-z0-9-]{0,49}$/.test(p.focus) || p.package===manifest.name || r)) errors.push('Preview references require another scoped package, an exact version and a focus ID; they cannot also declare a runtime.');
  if (r === undefined) return errors;
  const files = new Set((Array.isArray(manifest.files) ? manifest.files : []).filter(file => file && typeof file.path === 'string').map(file => file.path));
  const path = value => typeof value === 'string' && /^[a-zA-Z0-9_./-]+$/.test(value) && value.length <= 180 && !value.startsWith('/') && !value.split('/').some(p => !p || p === '.' || p === '..');
  if (!r || typeof r !== 'object' || Array.isArray(r) || r.format !== 'iframe-scene-v1') return ['runtime.format must be iframe-scene-v1.'];
  if (!path(r.entry) || !r.entry.endsWith('.js') || !files.has(r.entry)) errors.push('Runtime entry must be an included, bundled JavaScript file.');
  if (r.preload !== undefined && (!Array.isArray(r.preload) || r.preload.length > 8 || new Set(r.preload).size !== r.preload.length || r.preload.some(file => !path(file) || !file.endsWith('.js') || !files.has(file) || file === r.entry))) errors.push('Runtime preloads must name up to eight unique included JavaScript bundles.');
  if (!path(r.style) || !r.style.endsWith('.css') || !files.has(r.style)) errors.push('Runtime style must be an included CSS file.');
  if (!r.assets || typeof r.assets !== 'object' || Array.isArray(r.assets) || Object.keys(r.assets).length > 120 || Object.entries(r.assets).some(([key, file]) => !path(key) || !path(file) || !files.has(file))) errors.push('Runtime assets must map safe relative resource names to included files (maximum 120).');
  if (!Array.isArray(r.features) || !r.features.length || r.features.length > 64 || new Set(r.features).size !== r.features.length || r.features.some(v => typeof v !== 'string' || !/^[a-z][a-z0-9-]{0,49}$/.test(v))) errors.push('Declare unique runtime feature IDs (maximum 64).');
  if (!path(r.coverage) || !r.coverage.endsWith('.json') || !files.has(r.coverage)) errors.push('Include the scene conversion coverage report.');
  if(r.purpose!==undefined && !['scene','component-preview'].includes(r.purpose)) errors.push('Runtime purpose must be scene or component-preview.');
  if(r.previewTargets!==undefined && (!Array.isArray(r.previewTargets) || r.previewTargets.length>64 || new Set(r.previewTargets).size!==r.previewTargets.length || r.previewTargets.some(v=>typeof v!=='string'||!/^[a-z][a-z0-9-]{0,49}$/.test(v)))) errors.push('Preview targets must be unique focus IDs (maximum 64).');
  return errors;
}

export function runtimeMime(path) {
  return ({ogg:'audio/ogg',mp3:'audio/mpeg',wav:'audio/wav',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',webp:'image/webp',ttf:'font/ttf',woff:'font/woff',woff2:'font/woff2',json:'application/json',glb:'model/gltf-binary'})[path.split('.').pop()] || 'application/octet-stream';
}

export function validateRuntimeFiles(manifest, files) {
  if (!manifest.runtime) return [];
  const errors = [];
  try {
    const raw = files.get(manifest.runtime.coverage), coverage = JSON.parse(typeof raw === 'string' ? raw : new TextDecoder().decode(raw));
    if (coverage.schemaVersion !== 1 || !Array.isArray(coverage.omitted) || coverage.omitted.length) errors.push('A complete scene coverage report must explicitly list no omitted features.');
    if (!Array.isArray(coverage.sources) || !coverage.sources.length || coverage.sources.some(source => typeof source.path !== 'string' || !/^[a-f0-9]{64}$/.test(source.sha256) || !['bundled','stylesheet','retained-source'].includes(source.state))) errors.push('Scene coverage must account for every source file with its SHA-256 and disposition.');
    if (JSON.stringify([...(coverage.features || [])].sort()) !== JSON.stringify([...manifest.runtime.features].sort())) errors.push('Runtime features and conversion coverage must agree.');
    const base = manifest.runtime.coverage.slice(0, manifest.runtime.coverage.lastIndexOf('/') + 1);
    const resources = new Map((coverage.assets || []).map(asset => [asset.resource, base + asset.file]));
    if (resources.size !== Object.keys(manifest.runtime.assets).length || Object.entries(manifest.runtime.assets).some(([name, path]) => resources.get(name) !== path)) errors.push('Conversion coverage must account for every runtime asset.');
  } catch { errors.push('Include a readable JSON conversion coverage report.'); }
  return errors;
}
