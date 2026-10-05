import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {assetOwner} from '../../examples/tidewater/package-layout.mjs';

const root = fileURLToPath(new URL('../../packages/components/tidewater-world-tile/', import.meta.url));
const source = JSON.parse(await readFile(root + 'asset-sources.json', 'utf8'));
const gitHash = bytes => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
export async function fetchTidewaterAssets() {
  let cursor = 0;
  await Promise.all(Array.from({length: 4}, async () => {
    while (cursor < source.files.length) {
      const file = source.files[cursor++], resource = file.path.slice(7);
      const path = resolve(root, '..', `tidewater-${assetOwner(resource)}`, 'assets', resource);
      try { const existing = await readFile(path); if (gitHash(existing) === file.sha) continue; } catch {}
      const url = `https://raw.githubusercontent.com/dgreenheck/tidewater/${source.revision}/${file.path}`;
      const response = await fetch(url, {signal: AbortSignal.timeout(90_000)});
      if (!response.ok) throw Error(`Asset download failed: ${file.path} (${response.status})`);
      const data = new Uint8Array(await response.arrayBuffer());
      if (data.length !== file.size || gitHash(data) !== file.sha) throw Error(`Upstream asset integrity mismatch: ${file.path}`);
      await mkdir(dirname(path), {recursive: true}); await writeFile(path, data);
    }
  }));
  console.log(`Verified all ${source.files.length} pinned Tidewater asset files (${(source.files.reduce((n, f) => n + f.size, 0) / 1048576).toFixed(1)} MiB).`);
}
if (resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) await fetchTidewaterAssets();
