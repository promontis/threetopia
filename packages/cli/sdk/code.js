import {parse} from './syntax.js';

export const CODE_EXT = /\.(?:[cm]?js|jsx|[cm]?ts|tsx)$/i;
export const JAVASCRIPT_EXT = /\.(?:[cm]?js)$/i;
export const MAX_CODE_BYTES = 2 * 1024 * 1024;
const decoder = new TextDecoder();
const text = value => typeof value === 'string' ? value : decoder.decode(value);
const diagnostic = (code, message, file, line, severity = 'error') => ({code, severity, file, ...(line ? {line} : {}), message});
const nameOf = node => node?.name ?? node?.value;
const memberName = node => node?.type === 'Identifier' ? node.name : node?.type === 'MemberExpression' || node?.type === 'OptionalMemberExpression' ? `${memberName(node.object)}.${nameOf(node.property)}` : '';

/** Parse only. This module is shared with the Worker and never evaluates source. */
export function inspectModule(source, file, {sourceType = 'module', sourceLanguages = true} = {}) {
  const imports = [], exports = [], signals = [], diagnostics = [];
  const addSignal = (code, node) => {
    if (!signals.some(s => s.code === code)) signals.push({code, line: node.loc?.start.line ?? 1});
  };
  const plugins = sourceLanguages ? [...(/\.[cm]?tsx?$/i.test(file) ? ['typescript'] : []), ...(/\.[jt]sx$/i.test(file) ? ['jsx'] : [])] : [];
  let ast;
  try {
    ast = parse(source, {sourceType, plugins, attachComment: false, createImportExpressions: true});
  } catch (error) {
    return {imports, exports, signals, diagnostics: [diagnostic('CODE_SYNTAX', error.message, file, error.loc?.line)]};
  }
  function walk(node, functionDepth = 0) {
    if (!node || typeof node.type !== 'string') return;
    const callable = /Function|Method/.test(node.type);
    const depth = functionDepth + Number(callable);
    if (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration' || node.type === 'ExportNamedDeclaration' && node.source) {
      imports.push({specifier: node.source.value, line: node.loc.start.line, kind: node.importKind === 'type' || node.exportKind === 'type' ? 'type' : 'static'});
      if (/\b(?:Globals|Engine|WorldLayout)\b/.test(node.source.value)) addSignal('host-state', node);
      if (/^three\/(?:webgpu|tsl)/.test(node.source.value)) addSignal('gpu-shaders', node);
    }
    if (node.type === 'ExportNamedDeclaration') {
      if (node.declaration?.id) exports.push({name: nameOf(node.declaration.id), line: node.loc.start.line});
      for (const d of node.declaration?.declarations ?? []) if (d.id.type === 'Identifier') exports.push({name: d.id.name, line: node.loc.start.line});
      for (const s of node.specifiers ?? []) exports.push({name: nameOf(s.exported), line: node.loc.start.line});
    }
    if (node.type === 'ExportDefaultDeclaration') exports.push({name: 'default', line: node.loc.start.line});
    if (node.type === 'ExportAllDeclaration') exports.push({name: '*', line: node.loc.start.line});
    if (node.type === 'ImportExpression') {
      if (node.source.type === 'StringLiteral') imports.push({specifier: node.source.value, line: node.loc.start.line, kind: 'dynamic'});
      else addSignal('dynamic-import', node);
    }
    if (node.type === 'CallExpression' || node.type === 'NewExpression') {
      const callee = memberName(node.callee);
      if (callee === 'require') {
        if (node.arguments[0]?.type === 'StringLiteral') imports.push({specifier: node.arguments[0].value, line: node.loc.start.line, kind: 'require'});
        else addSignal('dynamic-import', node);
      }
      if (/(?:^|\.)(?:WebGLRenderer|WebGPURenderer)$/.test(callee)) addSignal('owns-renderer', node);
      if (/(?:^|\.)(?:requestAnimationFrame|setAnimationLoop|setInterval)$/.test(callee)) addSignal('owns-loop', node);
      if (/^(?:fetch|.*\.load|.*\.loadAsync)$/.test(callee)) addSignal('loads-assets', node);
      if (callee === 'Math.random') addSignal('unseeded-random', node);
      if (node.type === 'NewExpression' && depth === 0) addSignal('shared-mutable-state', node);
    }
    if (node.type === 'MemberExpression' && /^(?:window|document)\./.test(memberName(node))) addSignal('browser-dom', node);
    for (const [key, child] of Object.entries(node)) {
      if (['loc', 'extra', 'comments', 'tokens'].includes(key)) continue;
      if (Array.isArray(child)) for (const entry of child) walk(entry, depth);
      else if (child && typeof child === 'object') walk(child, depth);
    }
  }
  walk(ast.program);
  return {imports, exports, signals, diagnostics};
}

export function relativeImport(file, specifier) {
  if (!specifier.startsWith('./') && !specifier.startsWith('../')) return null;
  const parts = file.split('/').slice(0, -1);
  for (const part of specifier.split('/')) {
    if (part === '.' || !part) continue;
    if (part === '..') { if (!parts.length) return null; parts.pop(); }
    else parts.push(part);
  }
  return parts.join('/');
}

export const dependencyName = specifier => specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];

/** Validate the distributed module graph, never a creator's installation scripts. */
export function validateCodeFiles(files, manifest = {}) {
  const diagnostics = [], modules = {};
  let pkg = {};
  if (files.has('package.json')) {
    try { pkg = JSON.parse(text(files.get('package.json'))); if (!pkg || Array.isArray(pkg) || typeof pkg !== 'object') throw Error(); }
    catch { diagnostics.push(diagnostic('CODE_PACKAGE_JSON', 'package.json must contain a JSON object.', 'package.json')); pkg = {}; }
  }
  const peers = {...pkg.dependencies, ...pkg.peerDependencies, ...manifest.dependencies};
  let total = 0;
  for (const [file, bytes] of files) {
    if (!JAVASCRIPT_EXT.test(file)) continue;
    const source = text(bytes), size = new TextEncoder().encode(source).length;
    total += size;
    if (size > MAX_CODE_BYTES || total > 8 * 1024 * 1024) {
      diagnostics.push(diagnostic('CODE_SIZE', 'Code is limited to 2 MiB per module and 8 MiB per package.', file)); continue;
    }
    const result = inspectModule(source, file, {sourceLanguages: false, sourceType: file.endsWith('.cjs') ? 'commonjs' : 'module'});
    modules[file] = result;
    diagnostics.push(...result.diagnostics);
    if ([manifest.runtime?.entry, ...(Array.isArray(manifest.runtime?.preload) ? manifest.runtime.preload : [])].includes(file) && (result.imports.length || result.exports.length || result.signals.some(s => s.code === 'dynamic-import'))) {
      diagnostics.push(diagnostic('CODE_RUNTIME_BUNDLE', 'Scene runtime scripts must be self-contained classic bundles without imports, require() or module exports.', file));
    }
    if (file.endsWith('.js') && (result.exports.length || result.imports.some(i => i.kind === 'static')) && pkg.type !== 'module') {
      diagnostics.push(diagnostic('CODE_MODULE_TYPE', 'Include package.json with "type": "module" for .js module exports, or use .mjs.', file));
    }
    for (const item of result.imports.filter(i => i.kind !== 'type')) {
      const {specifier, line} = item;
      if (specifier.startsWith('.')) {
        const target = relativeImport(file, specifier);
        if (!target || !files.has(target)) diagnostics.push(diagnostic('CODE_IMPORT_MISSING', `Include the exact imported file ${specifier}; imports must stay inside the package.`, file, line));
        else if (/\.(?:[cm]?ts|tsx|jsx)$/.test(target)) diagnostics.push(diagnostic('CODE_BUILD_REQUIRED', `Compile ${specifier} to JavaScript before distributing it.`, file, line));
      } else if (!peers[dependencyName(specifier)] && !specifier.startsWith('node:')) {
        diagnostics.push(diagnostic('CODE_PEER_MISSING', `Declare ${dependencyName(specifier)} in the included package.json dependencies or peerDependencies.`, file, line));
      }
    }
    for (const signal of result.signals) diagnostics.push(diagnostic('CODE_REVIEW', `Review ${signal.code}: syntax checks do not prove component isolation or runtime behavior.`, file, signal.line, 'warning'));
  }
  for (const file of Object.values(manifest.exports ?? {})) if (typeof file === 'string' && /\.(?:tsx?|jsx|mts|cts)$/.test(file) && !file.endsWith('.d.ts')) {
    diagnostics.push(diagnostic('CODE_BUILD_REQUIRED', 'Export compiled JavaScript; TypeScript declarations may accompany it.', file));
  }
  return {diagnostics, modules: Object.keys(modules).length, executed: false};
}
