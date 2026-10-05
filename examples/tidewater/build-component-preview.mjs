import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';

export async function buildComponentPreview(role,add) {
  const entry=fileURLToPath(new URL('./component-preview.js',import.meta.url));
  const result=await build({entryPoints:[entry],bundle:true,format:'iife',target:'es2022',minify:true,write:false,metafile:true,alias:{three:'three-world'},define:{__TIDEWATER_PREVIEW_ROLE__:JSON.stringify(role)},legalComments:'none'});
  await add('THREE-LICENSE.txt',await readFile(new URL('../../node_modules/three-world/LICENSE',import.meta.url)));
  await add('preview/scene.js',result.outputFiles[0].contents);
  await add('preview/scene.css','body{font:14px system-ui;color:#152d36}aside{position:fixed;right:16px;top:16px;width:240px;background:#ffffffed;padding:20px;border-radius:14px;box-shadow:0 8px 40px #24485b22}h1{font-size:18px;margin:0}p,output{font-size:12px;color:#456}label{display:block;margin:16px 0 0}input[type=range]{display:block;width:100%;accent-color:#12758b}select{display:block;width:100%;margin-top:8px}span{font:12px monospace}');
  const assets=role==='map-tile'?{'map.glb':'map.glb','overview.glb':'overview.glb'}:{};
  const sources=await Promise.all(Object.keys(result.metafile.inputs).filter(path=>!path.includes('node_modules/')).map(async path=>({path,sha256:createHash('sha256').update(await readFile(path)).digest('hex'),state:'bundled'})));
  // Resource file paths in coverage are relative to the report's directory.
  await add('preview-coverage.json',JSON.stringify({schemaVersion:1,scope:`Standalone ${role} component preview`,features:[role],sources,assets:Object.entries(assets).map(([resource,file])=>({resource,file})),omitted:[]},null,2)+'\n');
  return {format:'iframe-scene-v1',purpose:'component-preview',entry:'preview/scene.js',style:'preview/scene.css',assets,features:[role],coverage:'preview-coverage.json'};
}
