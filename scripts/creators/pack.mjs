import {spawnSync} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const out=resolve('.context/creator-platform/releases');await mkdir(out,{recursive:true});
for(const folder of ['packages/cli','packages/platform']){const result=spawnSync('npm',['pack','--pack-destination',out],{cwd:folder,encoding:'utf8'});if(result.status!==0)throw Error(result.stderr);console.log(result.stdout.trim());}
