import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {gunzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import {build} from 'esbuild';

/** Prove the installed implementation graph resolves without any upstream tree,
 * workspace package or generated publisher bundle being used as a fallback. */
export async function verifyInstalledTidewater(project,creator){
  const installed=join(project,'threetopia_modules',creator);
  const archive=JSON.parse(gunzipSync(await readFile(join(installed,'tidewater-world-tile/source.json.gz'))));
  const key='packages/components/tidewater-world-tile/src/App.js';
  const code=archive.files[key];assert(code,'World composition source must be included.');
  const entry=archive.files['packages/components/tidewater-world-tile/entry.js'];assert(entry);
  const used=new Set();
  const result=await build({stdin:{contents:entry,sourcefile:'entry.js',loader:'js'},bundle:true,write:false,format:'esm',metafile:true,plugins:[{name:'installed-packages-only',setup(plugin){
    plugin.onResolve({filter:/^\.\/src\/App\.js$/},()=>({path:'App.js',namespace:'world-source'}));
    plugin.onLoad({filter:/.*/,namespace:'world-source'},()=>({contents:code,loader:'js'}));
    plugin.onResolve({filter:/^\.\/component-preview\.js$/},()=>({path:join(installed,'tidewater-world-tile/component-preview.js')}));
    plugin.onResolve({filter:/^three(?:\/|$)/},args=>({path:args.path,external:true}));
    plugin.onResolve({filter:/^@(?:threetopia|[^/]+)\/tidewater-/},async args=>{
      const [,slug,...subpath]=args.path.split('/'),dir=join(installed,slug),pkg=JSON.parse(await readFile(join(dir,'package.json'),'utf8'));
      const key=subpath.length?'./'+subpath.join('/') : '.',exported=pkg.exports[key]??pkg.exports['./*']?.replace('*',subpath.join('/'));
      const file=typeof exported==='string'?exported:exported?.import;
      assert(file,`Missing installed export: ${args.path}`);used.add(slug);
      return {path:resolve(dir,file)};
    });
  }}]});
  assert(used.size>=17,`Only ${used.size} installed systems were consumed.`);
  assert(Object.keys(result.metafile.inputs).every(path=>['entry.js','world-source:App.js'].includes(path)||resolve(path).startsWith(installed+'/')),'A module escaped the installed package tree.');
  // A second composition only needs the chosen component closures, not App.
  const boat=JSON.parse(await readFile(join(installed,'tidewater-boat/package.json'),'utf8'));
  assert(!Object.keys(boat.dependencies).some(dep=>dep.endsWith('/tidewater-world-tile')));
  return {packages:[...used].sort(),modules:Object.keys(result.metafile.inputs).length};
}
