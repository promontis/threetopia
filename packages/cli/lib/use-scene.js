import {mkdir, writeFile, lstat} from 'node:fs/promises';
import {join} from 'node:path';
import {validateRuntime} from '../sdk/runtime.js';
import {sha256,validPath,validName} from '../sdk/index.js';
import {readProjectFile} from './project-check.js';

export async function useScene(root, config, installed, exportName = 'scene') {
  const manifest = installed.manifest, errors = validateRuntime(manifest);
  if (!validName(manifest.name) || !manifest.runtime || errors.length || manifest.exports?.[exportName] !== manifest.runtime.entry) throw Error('Choose the exported complete scene from an installed runtime package.');
  if(manifest.runtime.purpose==='component-preview')throw Error('A component demonstration cannot be used as a complete scene.');
  const r=manifest.runtime;
  const runtimeFiles=new Set([r.entry,...(r.preload||[]),r.style,r.coverage,...Object.values(r.assets),'source.json.gz','package-graph.json','README.md','LICENSE','CREDITS.md','THREE-LICENSE.txt']);
  const prefix = `content/scenes/${manifest.name.slice(1)}/`;
  // Verify the entire installed version before writing any file into the project.
  const verified = await Promise.all(installed.files.map(async file => {
    const data = await readProjectFile(root, `${installed.directory}/${file.path}`);
    if (data.length !== file.bytes || await sha256(data) !== file.sha256) throw Error(`Installed scene was modified: ${file.path}. Reinstall the published version.`);
    if (!validPath(prefix + file.path)) throw Error('The installed scene path is too long or unsafe.');
    return {path: prefix + file.path, original:file.path, data};
  }));
  // Development modules stay in threetopia_modules with their own package.json.
  // Embedding a bundled scene requires only runtime files and its evidence.
  const files=verified.filter(file=>runtimeFiles.has(file.original));
  for (const file of files) {
    let directory = root;
    for (const segment of file.path.split('/').slice(0,-1)) {
      directory = join(directory,segment);
      try { const entry=await lstat(directory); if(entry.isSymbolicLink()||!entry.isDirectory())throw Error('Scene destinations must be directories inside the project, without symlinks.'); }
      catch(error) { if(error.code!=='ENOENT')throw error;await mkdir(directory); }
    }
    const target=join(root,file.path);
    try { if((await lstat(target)).isSymbolicLink())throw Error('Do not overwrite a scene file through a symlink.'); } catch(error) { if(error.code!=='ENOENT')throw error; }
    await writeFile(target,file.data);
  }
  config.manifest.runtime = {...r, entry: prefix + r.entry, style: prefix + r.style, coverage: prefix + r.coverage,
    preload: (r.preload || []).map(file => prefix + file), assets: Object.fromEntries(Object.entries(r.assets).map(([name, file]) => [name, prefix + file]))};
  if (config.manifest.kind === 'asset') config.manifest.exports = {...config.manifest.exports, scene: prefix + r.entry};
  config.files = [...new Set([...config.files, ...files.map(file => file.path)])];
  await writeFile(join(root, 'threetopia.json'), JSON.stringify(config, null, 2) + '\n');
}
