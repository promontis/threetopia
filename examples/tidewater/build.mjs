import {mkdir, readFile, writeFile, copyFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {Group} from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {createRocks} from '@dgreenheck/tidewater-rocks';
import {createGulls} from '@dgreenheck/tidewater-gulls';
import {checkProject} from '../../packages/cli/lib/project-check.js';
import {inspectGLB, verifyTile} from '../../packages/platform/index.js';

const repo = fileURLToPath(new URL('../../', import.meta.url));
// GLTFExporter only needs Blob -> ArrayBuffer here. No browser or GPU is needed.
class ExportFileReader {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.(); }, error => this.onerror?.(error)); }
}

async function glb(object) {
  const previous = globalThis.FileReader;
  globalThis.FileReader ??= ExportFileReader;
  try { object.updateMatrixWorld(true); return new Uint8Array(await new GLTFExporter().parseAsync(object, {binary: true})); }
  finally { if (previous === undefined) delete globalThis.FileReader; }
}

function composition(detail) {
  const rocks = createRocks({count: detail === 'overview' ? 2 : 3, spread: 3, detail: detail === 'world' ? 3 : detail === 'map' ? 2 : 1});
  const gulls = createGulls({count: detail === 'overview' ? 3 : 7, spread: [1, 1], radius: [1, 2], height: [2.4, 4]});
  const object = new Group(); object.name = 'Tidewater coastal study'; object.add(rocks.object, gulls.object);
  if (detail === 'world') object.scale.setScalar(1 / .03);
  return {object, dispose() { rocks.dispose(); gulls.dispose(); }};
}

/** Local, reviewable package projects. No reservation, upload or publication. */
export async function buildExample(output, {creator = 'example', registry = 'https://creators.threetopia.com', tile} = {}) {
  if (!/^[a-z][a-z0-9-]{2,29}$/.test(creator)) throw Error('Use a creator handle with 3–30 lowercase letters, numbers or hyphens.');
  if (tile && !await verifyTile(tile)) throw Error('Use an unchanged tile.lock.json from your reserved world.');
  await mkdir(output, {recursive: true});
  const projects = [];
  for (const slug of ['tidewater-rocks', 'tidewater-gulls', 'tidewater-coast']) {
    const dir = join(output, slug); await mkdir(dir); // Never overwrite a creator's project.
    const files = [], exports = {}, dependencies = {};
    const component = slug !== 'tidewater-coast';
    const add = async (file, data) => { await writeFile(join(dir, file), data); files.push(file); };
    if (component) {
      const source = join(repo, 'packages/components', slug);
      for (const file of ['index.js', 'geometry.js', 'index.d.ts', 'LICENSE', 'PROVENANCE.json', 'README.md']) { await copyFile(join(source, file), join(dir, file)); files.push(file); }
      const metadata = JSON.parse(await readFile(join(source, 'package.json'), 'utf8'));
      delete metadata.devDependencies;
      await add('package.json', JSON.stringify({...metadata, name: `@${creator}/${slug}`}, null, 2) + '\n');
      const instance = slug === 'tidewater-rocks' ? createRocks({count: 3, spread: 3}) : createGulls({spread: [1, 1], radius: [1, 2], height: [2.4, 4]});
      try { await add('model.glb', await glb(instance.object)); } finally { instance.dispose(); }
      Object.assign(exports, {component: 'index.js', types: 'index.d.ts', model: 'model.glb'});
    } else {
      for (const role of ['world', 'map', 'overview']) {
        const instance = composition(role);
        try {
          if (tile) instance.object.scale.multiplyScalar(Math.min(1, (tile.slot.regions?.[0]?.radius ?? tile.slot.radius) * .75 / 85));
          const data = await glb(instance.object); inspectGLB(data, role, tile);
          await add(`${role}.glb`, data);
        } finally { instance.dispose(); }
        exports[role] = `${role}.glb`;
      }
      for (const slug of ['tidewater-rocks', 'tidewater-gulls']) dependencies[`@${creator}/${slug}`] = '0.1.0';
      await add('LICENSE', await readFile(join(repo, 'packages/world-sources/tidewater/LICENSE')));
      await add('README.md', '# Tidewater coastal study\n\nA composition of the extracted rocks and gulls. GLBs are static snapshots at time=0; animation remains in the explicit component export. See the component packages for provenance and their MIT license. These are asset exports, not a reserved world.\n');
    }
    const manifest = {schemaVersion: 1, name: `@${creator}/${slug}`, version: '0.1.0', kind: 'asset', title: slug.replaceAll('-', ' '), description: 'Local Tidewater extraction example; source by Dan Greenheck.', license: 'MIT', changelog: 'Extracted reusable components with static preview exports.', exports, dependencies};
    await writeFile(join(dir, 'threetopia.json'), JSON.stringify({registry, manifest, files}, null, 2) + '\n');
    const checked = await checkProject(dir);
    projects.push({directory: dir, name: manifest.name, metrics: checked.fileMetrics});
  }
  return projects;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const {values} = parseArgs({options: {output: {type: 'string', default: '.context/tidewater-packages'}, creator: {type: 'string', default: 'example'}, registry: {type: 'string', default: 'https://creators.threetopia.com'}, tile: {type: 'string'}}});
  const projects = await buildExample(resolve(values.output), {...values, tile: values.tile ? JSON.parse(await readFile(values.tile, 'utf8')) : undefined});
  console.log(JSON.stringify({projects}, null, 2));
}
