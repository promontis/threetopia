import {test,expect} from '@playwright/test';
import {execFile,spawn,type ChildProcess} from 'node:child_process';
import {promisify} from 'node:util';
import {mkdtemp,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
let root:string,server:ChildProcess;
test.beforeAll(async()=>{
  test.setTimeout(120_000);
  await mkdir('.context/tidewater-preview-tests',{recursive:true});root=await mkdtemp(resolve('.context/tidewater-preview-tests/run-'));
  await promisify(execFile)(process.execPath,['examples/tidewater/build-packages.mjs','--output',join(root,'prepared')]);
});
test.afterEach(async()=>{if(server&&server.exitCode===null){const stopped=new Promise(resolve=>server.once('exit',resolve));server.kill('SIGTERM');await stopped;}});
for(const role of ['rocks','gulls','map-tile'])test(`standalone ${role} preview applies settings and renders geometry`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  server=spawn(process.execPath,['packages/cli/bin/threetopia.js','preview',join(root,'prepared','tidewater-'+role),'--port','55201'],{stdio:'ignore'});
  await expect.poll(async()=>{try{return (await fetch('http://127.0.0.1:55201/')).status;}catch{return 0;}}).toBe(200);
  await page.goto('http://127.0.0.1:55201/');await expect(page.locator('#preview')).toHaveAttribute('data-ready','true',{timeout:30_000});
  const frame=page.frames().find(frame=>frame!==page.mainFrame())!;
  if(role==='map-tile'){
    await frame.getByLabel('Representation',{exact:true}).selectOption('overview');
    await expect.poll(()=>frame.evaluate(()=>(window as any).__threetopiaRuntime.inspect().settings.representation)).toBe('overview');
  }else{
    const before=await frame.evaluate(()=>(window as any).__threetopiaRuntime.inspect().settings.count);
    await frame.getByRole('slider',{name:'Count',exact:true}).focus();await page.keyboard.press('ArrowRight');
    await expect.poll(()=>frame.evaluate(()=>(window as any).__threetopiaRuntime.inspect().settings.count)).toBe(before+1);
    expect(await frame.evaluate(()=>(window as any).__threetopiaRuntime.inspect().metrics.triangles)).toBeGreaterThan(0);
  }
  await frame.getByRole('checkbox',{name:'Wireframe'}).check();
  expect(await frame.evaluate(()=>(window as any).__threetopiaRuntime.inspect().settings.wireframe)).toBe(true);
  await frame.getByRole('checkbox',{name:'Wireframe'}).uncheck();
  expect(errors).toEqual([]);await page.screenshot({path:`.context/tidewater-${role}-preview.png`});
});
