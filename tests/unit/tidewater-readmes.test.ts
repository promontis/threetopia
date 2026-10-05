import {it,expect} from 'vitest';
import {readFile,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {build} from 'esbuild';

it('resolves every public import used by the twenty package READMEs',async()=>{
  const directories=(await readdir('packages/components')).filter(dir=>dir.startsWith('tidewater-'));
  expect(directories).toHaveLength(20);
  const plugin={name:'workspace-components',setup(plugin:any){plugin.onResolve({filter:/^@dgreenheck\/tidewater-/},async (args:any)=>{const [,slug,...subpath]=args.path.split('/'),dir=resolve('packages/components',slug),pkg=JSON.parse(await readFile(dir+'/package.json','utf8'));const key=subpath.length?'./'+subpath.join('/') : '.',exported=pkg.exports[key]??pkg.exports['./*']?.replace('*',subpath.join('/'));return {path:resolve(dir,typeof exported==='string'?exported:exported.import)};});}};
  for(const directory of directories){
    const text=await readFile(`packages/components/${directory}/README.md`,'utf8');
    for(const block of text.matchAll(/```js\n([\s\S]*?)```/g)){
      await build({stdin:{contents:block[1],loader:'js',resolveDir:resolve('.')},format:'esm',bundle:true,treeShaking:false,write:false,logLevel:'silent',external:['three','three/*'],plugins:[plugin]});
    }
  }
},30_000);
