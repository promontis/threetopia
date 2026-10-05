import {spawn} from 'node:child_process';
import {mkdir, mkdtemp, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {createServer} from 'node:net';

await mkdir('.context/creator-platform', {recursive: true});
const root = await mkdtemp(resolve('.context/creator-platform/test-'));
const socket = createServer();
await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
const port = socket.address().port; await new Promise(resolve => socket.close(resolve));
const origin = `http://127.0.0.1:${port}`, config = join(root, 'wrangler.json'), state = join(root, 'state');
await writeFile(config, JSON.stringify({name:'threetopia-cli-test',main:resolve('src/creators/server/index.ts'),compatibility_date:'2026-10-01',compatibility_flags:['nodejs_compat'],vars:{SITE_URL:origin,AUTH_LOCAL:'true',AUTH_FROM:'test@example.test'},d1_databases:[{binding:'DB',database_name:'cli-test',database_id:'cli-test',migrations_dir:resolve('migrations-creators')}],r2_buckets:[{binding:'PACKAGES',bucket_name:'cli-test'}]}));
const wrangler = resolve('node_modules/wrangler/bin/wrangler.js');
function run(args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {env:{...process.env,WRANGLER_SEND_METRICS:'false',...env},stdio:['ignore','pipe','pipe']});
    let output = ''; child.stdout.on('data', b => { output += b; }); child.stderr.on('data', b => { output += b; });
    child.on('error', reject); child.on('close', code => code === 0 ? (console.log(output.trim()), resolve()) : reject(Error(output)));
  });
}
await run([wrangler,'d1','migrations','apply','DB','--local','--config',config,'--persist-to',state]);
const server = spawn(process.execPath,[wrangler,'dev','--local','--config',config,'--persist-to',state,'--ip','127.0.0.1','--port',String(port),'--inspector-port','0'],{env:{...process.env,WRANGLER_SEND_METRICS:'false'},stdio:['ignore','pipe','pipe']});
let logs = '';for(const stream of [server.stdout,server.stderr])stream.on('data',b=>{logs=(logs+b).slice(-12000);});
const stopped = new Promise(resolve => server.on('close', resolve));
const cleanup = () => server.kill('SIGTERM');process.once('SIGINT',cleanup);process.once('SIGTERM',cleanup);
try {
  const deadline=Date.now()+45_000;
  while(true){try{const r=await fetch(origin+'/api/health',{signal:AbortSignal.timeout(500)});if(r.ok)break;}catch{}
    if(server.exitCode!==null||Date.now()>deadline)throw Error('Local registry did not start.\n'+logs);
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  await run([resolve('scripts/creators/integration-test.mjs')],{THREETOPIA_TEST_ORIGIN:origin,THREETOPIA_TEST_WRANGLER_CONFIG:config,THREETOPIA_TEST_STATE:state});
  await run([resolve('scripts/creators/concurrency-test.mjs')]);
} finally { cleanup(); await stopped; process.removeListener('SIGINT',cleanup);process.removeListener('SIGTERM',cleanup); }
