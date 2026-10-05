import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
import {resolve,join,dirname,posix} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {parse} from '../../packages/platform/syntax.js';
import {owners,entries,descriptions,name} from '../../examples/tidewater/package-layout.mjs';

import {packageReadme} from '../../examples/tidewater/readmes.mjs';

const repo=fileURLToPath(new URL('../../',import.meta.url));
const original=join(repo,'packages/world-sources/tidewater');
export function rewriteImports(text,file) {
  const role=owners[file],dependencies=new Set(),edits=[];
  const ast=parse(text,{sourceType:'module'});
  for(const node of ast.program.body){
    if(!['ImportDeclaration','ExportNamedDeclaration','ExportAllDeclaration'].includes(node.type)||!node.source)continue;
    const specifier=node.source.value;
    if(specifier.startsWith('.')){
      const target=posix.normalize(posix.join(posix.dirname(file),specifier)),targetRole=owners[target];
      if(!targetRole)throw Error(`Unmapped source import ${file}: ${specifier}`);
      if(targetRole!==role){dependencies.add(name(targetRole));edits.push({start:node.source.start,end:node.source.end,value:JSON.stringify(`${name(targetRole)}/${target}`)});}
    } else if(specifier.startsWith('@dgreenheck/tidewater-'))dependencies.add(specifier.split('/').slice(0,2).join('/'));
  }
  for(const edit of edits.sort((a,b)=>b.start-a.start))text=text.slice(0,edit.start)+edit.value+text.slice(edit.end);
  return {text,dependencies:[...dependencies].sort()};
}
export async function extractPackages() {
  const license=await readFile(join(original,'LICENSE'));
  for(const role of Object.keys(entries)){
    const root=join(repo,`packages/components/tidewater-${role}`),dependencies=new Set(),sources=[];
    for(const [file,owner]of Object.entries(owners).filter(([,owner])=>owner===role)){
      const raw=await readFile(join(original,'src',file),'utf8');
      const changed=file.endsWith('.js')?rewriteImports(raw,file):{text:raw,dependencies:[]};
      changed.dependencies.forEach(dep=>dependencies.add(dep));
      const target=join(root,'src',file);await mkdir(dirname(target),{recursive:true});await writeFile(target,changed.text);
      sources.push({original:'src/'+file,file:'src/'+file,sha256:createHash('sha256').update(raw).digest('hex'),adaptation:'Only cross-package import specifiers rewritten; original implementation retained.'});
    }
    if(role==='world-tile')dependencies.add(name('map-tile'));
    const metadata={name:name(role),version:'0.1.0',private:true,type:'module',description:descriptions[role],license:'MIT',
      exports:{'.':'./index.js','./*':'./src/*',...(role==='world-tile'?{'./entry':'./entry.js'}:{})},
      files:['src','assets','index.js','LICENSE','PROVENANCE.json','README.md',...(role==='world-tile'?['entry.js','component-preview.js']:[])],
      dependencies:Object.fromEntries([...dependencies].sort().map(dep=>[dep,'workspace:*'])),peerDependencies:{three:'0.186.0'},devDependencies:{three:'0.186.0'},
      threetopia:{role:role==='world-tile'?'world-tile':'component',sourceRevision:'d32799fcd85b79fb2fde3c4254f9d3805edecee3'}};
    await writeFile(join(root,'index.js'),entries[role].map(file=>`export * from './src/${file}';`).join('\n')+'\n');
    await writeFile(join(root,'package.json'),JSON.stringify(metadata,null,2)+'\n');await writeFile(join(root,'LICENSE'),license);
    await writeFile(join(root,'PROVENANCE.json'),JSON.stringify({upstream:JSON.parse(await readFile(join(original,'package.json'),'utf8')).upstream,sources},null,2)+'\n');
    await writeFile(join(root,'README.md'),await packageReadme(role,[...dependencies].sort()));
  }
  for(const role of ['rocks','gulls','map-tile']){const root=join(repo,`packages/components/tidewater-${role}`);const pkg=JSON.parse(await readFile(join(root,'package.json'),'utf8'));await writeFile(join(root,'README.md'),await packageReadme(role,Object.keys(pkg.dependencies||{})));}
  console.log(`Extracted ${Object.keys(entries).length-1} system packages and the world composition; ${Object.keys(owners).length} original source files accounted for.`);
}
if(resolve(process.argv[1]||'')===fileURLToPath(import.meta.url))await extractPackages();
