import assert from 'node:assert/strict';
import {mkdtemp, readFile, writeFile, rm, access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {spawn, spawnSync} from 'node:child_process';
import {createServer} from 'node:net';
import {once} from 'node:events';
import {chromium} from '@playwright/test';
import {buildExample} from '../../examples/tidewater/build.mjs';
import {buildFullTidewater} from '../../examples/tidewater/build-full.mjs';
import {tileContract} from '../../packages/platform/index.js';

// Install the actual tarball outside the repository: workspace resolution cannot
// hide missing runtime files or accidental dependencies in the public release.
const metadata = JSON.parse(await readFile('packages/cli/package.json', 'utf8'));
const artifact = resolve(`.context/creator-platform/releases/threetopia-cli-${metadata.version}.tgz`);
await access(artifact);
const root = await mkdtemp(join(tmpdir(), 'threetopia-release-'));
const env = {...process.env, THREETOPIA_HOME: join(root, 'credentials')};
delete env.THREETOPIA_REGISTRY;
delete env.NODE_PATH;
const cli = join(root, 'node_modules/@threetopia/cli/bin/threetopia.js');
let server, browser;
function command(executable, args, status = 0) {
  const result = spawnSync(executable, args, {cwd: root, env, encoding: 'utf8', timeout: 60_000});
  if (result.error) throw result.error;
  assert.equal(result.status, status, `${args.join(' ')}\n${result.stdout}\n${result.stderr}`);
  return result.stdout.trim();
}
const run = (args, status) => command(process.execPath, [cli, ...args], status);
try {
  await writeFile(join(root, 'package.json'), JSON.stringify({private: true, type: 'module'}));
  command('npm', ['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', artifact]);
  assert.equal(run(['--version']), metadata.version);
  const installed = JSON.parse(await readFile(join(root, 'node_modules/@threetopia/cli/package.json'), 'utf8'));
  assert.deepEqual(installed.dependencies, {});
  const full = join(root, 'complete-scene'); await buildFullTidewater(full);
  assert.equal(JSON.parse(run(['check', full, '--json'])).valid, true);
  run(['build', full]);
  const fullPreview = JSON.parse(await readFile(join(full, 'dist-threetopia/preview.json'), 'utf8'));
  assert.equal(fullPreview.manifest.runtime.features.length, 15);

  const tile = await tileContract(8, 0, 'tropical-inlet');
  const projects = await buildExample(join(root, 'projects'), {tile});
  const rocks = projects[0].directory, coast = projects[2].directory;
  const analysis = JSON.parse(run(['analyze', rocks, '--json']));
  assert.equal(analysis.valid, true); assert.equal(analysis.complete, true);
  assert.equal(analysis.summary.modules, 2);
  assert(analysis.candidates.some(candidate => candidate.exports.some(item => item.name === 'createRocks')));
  for (const project of projects) {
    const check = JSON.parse(run(['check', project.directory, '--json']));
    assert.equal(check.valid, true); assert.equal(check.code.executed, false);
  }
  const check = JSON.parse(run(['check', coast, '--json']));
  assert(check.files['world.glb'].asset.triangles > check.files['map.glb'].asset.triangles);
  assert(check.files['map.glb'].asset.triangles > check.files['overview.glb'].asset.triangles);
  run(['build', coast]);
  const built = JSON.parse(await readFile(join(coast, 'dist-threetopia/preview.json'), 'utf8'));
  assert.deepEqual(built.files, check.files);
  for (const file of ['preview.js', 'registry-host.worker.js', 'files/world.glb', 'files/map.glb', 'files/overview.glb']) await access(join(coast, 'dist-threetopia', file));

  const portProbe = createServer(); portProbe.listen(0, '127.0.0.1'); await once(portProbe, 'listening');
  const port = portProbe.address().port; await new Promise(resolve => portProbe.close(resolve));
  server = spawn(process.execPath, [cli, 'preview', coast, '--port', String(port)], {cwd: root, env, stdio: ['ignore', 'pipe', 'pipe']});
  const origin = `http://127.0.0.1:${port}`;
  const ready = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(Error('Installed preview did not start.')), 15_000);
    server.once('error', reject);
    server.once('exit', code => { clearTimeout(timeout); reject(Error(`Installed preview exited: ${code}`)); });
    server.stdout.on('data', data => { if (String(data).includes(origin)) { clearTimeout(timeout); resolve(true); } });
  });
  assert.equal(ready, true);
  browser = await chromium.launch({args: ['--enable-unsafe-swiftshader']});
  const page = await browser.newPage({viewport: {width: 1000, height: 760}, reducedMotion: 'reduce'});
  const errors = [], external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    external.push(url.href); return route.abort();
  });
  for (const mode of ['world', 'map', 'overview']) {
    await page.goto(`${origin}/?mode=${mode}`);
    await page.locator('#preview[data-ready="true"]').waitFor({timeout: 30_000});
    assert.equal(await page.locator('#preview canvas').count(), 1);
    assert.equal(await page.locator('nav a.active').textContent(), mode[0].toUpperCase() + mode.slice(1));
    const metrics = JSON.parse(await page.locator('[data-metrics]').textContent());
    assert.equal(metrics.triangles, check.files[`${mode}.glb`].asset.triangles);
  }
  // Also exercise the bundled host Worker used by world previews. This is a
  // local fixture, not a reservation or permission to publish that coordinate.
  const configPath = join(coast, 'threetopia.json');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  const {exports, ...manifest} = config.manifest;
  config.manifest = {...manifest, kind: 'world', tile, content: {world: exports.world, map: exports.map, overview: exports.overview}};
  await writeFile(configPath, JSON.stringify(config));
  await writeFile(join(coast, 'tile.lock.json'), JSON.stringify(tile));
  assert.equal(JSON.parse(run(['check', coast, '--json'])).valid, true);
  await page.goto(`${origin}/?mode=map`);
  await page.locator('#preview[data-ready="true"]').waitFor({timeout: 45_000});
  assert.equal(await page.getByLabel('Interactive 3D tile preview').count(), 1);
  assert.deepEqual(errors, []); assert.deepEqual(external, []);

  await writeFile(join(rocks, 'index.js'), 'export function broken( {');
  const invalid = JSON.parse(run(['check', rocks, '--json'], 1));
  assert.equal(invalid.valid, false);
  assert(invalid.diagnostics.some(item => item.code === 'CODE_SYNTAX'));
  console.log(`Release ${metadata.version}: clean offline install, analyze, check, build, three asset previews, bundled world host and invalid-code rejection passed.`);
} finally {
  await browser?.close();
  if (server && server.exitCode === null) { const stopped = once(server, 'exit'); server.kill('SIGTERM'); await stopped; }
  await rm(root, {recursive: true, force: true});
}
