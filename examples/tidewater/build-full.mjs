import {readFile, writeFile, readdir, mkdir, copyFile} from 'node:fs/promises';
import {resolve, join, relative, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {parseArgs} from 'node:util';
import {build} from 'esbuild';
import {fetchTidewaterAssets} from '../../scripts/creators/fetch-tidewater-assets.mjs';
import {checkProject} from '../../packages/cli/lib/project-check.js';
import {owners,entries,name} from './package-layout.mjs';
import {exportMap} from './export-map.mjs';
import {verifyTile} from '../../packages/platform/index.js';

const repo = fileURLToPath(new URL('../../', import.meta.url));
const source = join(repo, 'packages/world-sources/tidewater');
const component = join(repo, 'packages/components/tidewater-world-tile');
const hash = data => createHash('sha256').update(data).digest('hex');
async function files(root) {
  const result = [];
  for (const entry of await readdir(root, {withFileTypes: true})) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const file = join(root, entry.name);
    if (entry.isDirectory()) result.push(...await files(file)); else if (entry.isFile()) result.push(file);
  }
  return result.sort();
}
export async function buildFullTidewater(output, {creator = 'dgreenheck', registry = 'https://creators.threetopia.com', tile} = {}) {
  if (!/^[a-z][a-z0-9-]{2,29}$/.test(creator)) throw Error('Use your lowercase creator handle.');
  if (tile && !await verifyTile(tile)) throw Error('Use the unchanged tile.lock.json from your reserved world.');
  const snapshot = JSON.parse(await readFile(join(component, 'source-snapshot.json'), 'utf8'));
  for (const file of snapshot.files) {
    const data = await readFile(join(source, file.path));
    const actual = createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
    if (actual !== file.sha && !snapshot.adaptations[file.path]) throw Error(`Unreviewed source change: ${file.path}. Update the conversion evidence before claiming parity.`);
  }
  await fetchTidewaterAssets();
  await mkdir(output); // A conversion never overwrites an existing project.
  const included = [], assets = {};
  const add = async (path, data) => { await mkdir(dirname(join(output, path)), {recursive: true}); await writeFile(join(output, path), data); included.push(path); };
  for (const owner of ['audio','debris','whale','ui']) for (const file of await files(join(repo, `packages/components/tidewater-${owner}/assets`))) {
    const resource = relative(join(repo, `packages/components/tidewater-${owner}/assets`), file), path = 'assets/' + resource;
    await add(path, await readFile(file)); assets[resource] = path;
  }
  const libraries = new Set();
  const result = await build({entryPoints: [join(component, 'entry.js')], bundle: true, format: 'iife', target: 'es2022', minify: true, write: false, metafile: true, define: {'import.meta.env': JSON.stringify({BASE_URL: 'https://threetopia.invalid/assets/'})}, legalComments: 'none', plugins: [{name: 'scene-libraries', setup(plugin) {
    plugin.onResolve({filter: /^three(?:\/|$)/}, args => ({path: args.path, namespace: 'scene-library'}));
    plugin.onLoad({filter: /.*/, namespace: 'scene-library'}, async args => {
      libraries.add(args.path);
      const module = await import(args.path === 'three' ? 'three-world/webgpu' : args.path.replace(/^three/, 'three-world'));
      const bindings = Object.keys(module).map(name => name === 'default' ? 'export default library.default;' : `export const ${name} = library.${name};`).join('\n');
      return {contents: `const library=globalThis.__threetopiaLibraries[${JSON.stringify(args.path)}];\n${bindings}`, loader: 'js'};
    });
  }}]});
  await add('scene.js', result.outputFiles[0].contents);
  const names = [...libraries].sort();
  const librarySource = names.map((name, i) => `import * as library${i} from ${JSON.stringify(name === 'three' ? 'three-world/webgpu' : name.replace(/^three/, 'three-world'))};`).join('\n') + '\nglobalThis.__threetopiaLibraries={' + names.map((name, i) => `${JSON.stringify(name)}:library${i}`).join(',') + '};';
  const vendor = await build({stdin: {contents: librarySource, resolveDir: repo}, bundle: true, format: 'iife', target: 'es2022', minify: true, write: false, alias: {three: 'three-world'}, legalComments: 'none'});
  await add('three.js', vendor.outputFiles[0].contents);
  const css = await readFile(join(repo, 'packages/components/tidewater-ui/src/ui/ui.css'), 'utf8');
  await add('scene.css', await readFile(join(component, 'fonts.css'), 'utf8') + '\n' + css + '\n#app canvas{display:block}#fps{position:fixed;top:10px;left:12px;z-index:50;font:500 12px/1.2 "JetBrains Mono",monospace;color:#e8f6ff;background:rgba(8,14,22,.55);padding:5px 9px;border-radius:6px;pointer-events:none;backdrop-filter:blur(8px);letter-spacing:.02em}');
  const metadata = JSON.parse(await readFile(join(source, 'package.json'), 'utf8'));
  const archive = {}, sources = [];
  const inputs = new Set(Object.keys(result.metafile.inputs).map(file => resolve(repo, file)));
  if ([...inputs].some(file => file.startsWith(source + '/src/'))) throw Error('The world composition must consume extracted packages, not the upstream source tree.');
  for (const file of [...await files(join(source, 'src')), ...['entry.js', 'fonts.css', 'component-preview.js'].map(file => join(component, file)), ...['rocks', 'gulls'].flatMap(slug => ['index.js', 'geometry.js'].map(file => join(repo, `packages/components/tidewater-${slug}`, file)))]) {
    const path = relative(repo, file), text = await readFile(file, 'utf8'); archive[path] = text;
    const owner = owners[relative(join(source,'src'),file)];
    const extracted = owner && join(repo, `packages/components/tidewater-${owner}/src`, relative(join(source,'src'),file));
    sources.push({path, sha256: hash(text), state: inputs.has(file) || extracted && inputs.has(extracted) ? 'bundled' : file.endsWith('.css') ? 'stylesheet' : 'retained-source', bytes: Buffer.byteLength(text), ...(owner ? {package:name(owner),module:relative(repo,extracted)} : {})});
  }
  for (const owner of Object.keys(entries)) for (const file of await files(join(repo, `packages/components/tidewater-${owner}/src`))) archive[relative(repo,file)] = await readFile(file,'utf8');
  const features = ['terrain','village','vegetation','debris','ocean','surf','reef','wildlife','sky','lighting','boat','player','post','audio','controls'];
  const coverage = {schemaVersion: 1, upstream: metadata.upstream, scope: 'Complete pinned standalone scene', features, sources, assets: Object.entries(assets).map(([resource, file]) => ({resource, file})), omitted: [],
    evidence: {sourceArchive: 'source.json.gz', renderer: 'Original Three.js r186 WebGPU', runtime: 'Original App.init/frame and AppUI; isolated scene document preserves module state and scene ownership'},
    note: 'Source and asset coverage is checked at build time. Behavioral and visual parity additionally require the full WebGPU browser tests.'};
  await add('coverage.json', JSON.stringify(coverage, null, 2) + '\n');
  await add('source.json.gz', gzipSync(JSON.stringify({format: 'threetopia-source-archive-v1', upstream: metadata.upstream, files: archive}), {level: 9}));
  await add('package-graph.json', JSON.stringify({packages:await Promise.all([...Object.keys(entries),'rocks','gulls','map-tile'].map(async role=>{
    const pkg=JSON.parse(await readFile(join(repo,`packages/components/tidewater-${role}/package.json`),'utf8'));
    return {name:pkg.name.replace('@dgreenheck/',`@${creator}/`),version:pkg.version,dependencies:Object.keys(pkg.dependencies||{}).map(dep=>dep.replace('@dgreenheck/',`@${creator}/`))};
  }))},null,2)+'\n');
  await add('LICENSE', await readFile(join(source, 'LICENSE')));
  await add('CREDITS.md', (await readFile(join(source, 'CREDITS.md'), 'utf8')).replaceAll('(public/', '(assets/') + '\nThe converted package bundles Inter and JetBrains Mono locally. Their OFL licenses are included under assets/fonts/. No font request leaves the package.\n');
  await add('THREE-LICENSE.txt', await readFile(join(repo, 'node_modules/three-world/LICENSE')));
  await add('README.md',(await readFile(join(component,'README.md'),'utf8')).replaceAll('@dgreenheck/',`@${creator}/`));
  for(const file of ['index.js','entry.js','component-preview.js','PROVENANCE.json','src/App.js'])await add(file,(await readFile(join(component,file),'utf8')).replaceAll('@dgreenheck/',`@${creator}/`));
  const packageJson = JSON.parse(await readFile(join(component,'package.json'),'utf8'));
  const dependencies = Object.fromEntries(Object.keys(packageJson.dependencies).map(dep=>[dep.replace('@dgreenheck/',`@${creator}/`),'0.1.0']));
  const {devDependencies,...publicPackage}=packageJson;
  await add('package.json',JSON.stringify({...publicPackage,name:`@${creator}/tidewater-world-tile`,dependencies},null,2)+'\n');
  const content = {};
  if (tile) {
    for (const role of ['world','map','overview']) { content[role]=`content/${role}.glb`;await add(content[role],await exportMap(role,{tile})); }
    await writeFile(join(output,'tile.lock.json'),JSON.stringify(tile,null,2)+'\n');
  }
  const manifest = {schemaVersion: 1, name: `@${creator}/tidewater-world-tile${tile?'':'-preview'}`, version: '0.1.0', kind: tile?'world':'asset', title: 'Tidewater — complete scene', description: 'Complete playable Tidewater composed from reusable system packages, with separate map and overview representations.', license: 'MIT; CC0-1.0 and OFL-1.1 assets (see credits)', changelog: 'Complete scene composed from extracted packages.', dependencies, exports: {component:'index.js',scene: 'scene.js', coverage: 'coverage.json', source: 'source.json.gz'}, ...(tile?{tile,content}:{}), runtime: {format: 'iframe-scene-v1', previewTargets:Object.keys(entries).filter(role=>role!=='world-tile'), entry: 'scene.js', preload: ['three.js'], style: 'scene.css', assets, features, coverage: 'coverage.json'}};
  await writeFile(join(output, 'threetopia.json'), JSON.stringify({registry, manifest, files: included}, null, 2) + '\n');
  const checked = await checkProject(output);
  return {directory: output, name: manifest.name, kind:manifest.kind, previewOnly:!tile, files: included.length, sourceFiles: sources.length, features, bytes: checked.manifest.files.reduce((n, file) => n + file.bytes, 0)};
}
if (resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const {values} = parseArgs({options: {output: {type: 'string', default: '.context/tidewater-full/package'}, creator: {type: 'string', default: 'dgreenheck'}, registry: {type: 'string', default: 'https://creators.threetopia.com'},tile:{type:'string'}}});
  console.log(JSON.stringify(await buildFullTidewater(resolve(values.output), {...values,tile:values.tile?JSON.parse(await readFile(values.tile,'utf8')):undefined}), null, 2));
}
