import {describe,it,expect,vi} from 'vitest';
import {LatestWorker} from '../../src/creators/latest-worker';

class WorkerStub {
  onmessage:any;
  onerror:any;
  messages:Array<{id:number;input:string}>=[];
  postMessage(message:{id:number;input:string}){this.messages.push(message);}
  terminate=vi.fn();
  finish(id:number,result:string){this.onmessage({data:{id,result}});}
}
const setup=()=>{const worker=new WorkerStub();return {worker,jobs:new LatestWorker<string,string>(worker as unknown as Worker)};};

describe('Latest tile worker',()=>{
  it('runs only the newest pending selection after the active bake finishes',async()=>{
    const {worker,jobs}=setup();
    const first=jobs.run('river'),skipped=jobs.run('bay'),latest=jobs.run('skyport');
    expect(await first).toBeNull();expect(await skipped).toBeNull();
    expect(worker.messages.map(m=>m.input)).toEqual(['river']);
    worker.finish(1,'old river');
    expect(worker.messages.map(m=>m.input)).toEqual(['river','skyport']);
    worker.finish(1,'duplicate old result');
    worker.finish(3,'new platform');
    expect(await latest).toBe('new platform');
  });
  it('cancels both running and queued selections without losing a subsequent request',async()=>{
    const {worker,jobs}=setup();const active=jobs.run('river'),queued=jobs.run('bay');
    jobs.cancel();expect(await active).toBeNull();expect(await queued).toBeNull();
    const reopened=jobs.run('island');worker.finish(1,'obsolete');
    expect(worker.messages.map(m=>m.input)).toEqual(['river','island']);
    worker.finish(3,'island');expect(await reopened).toBe('island');
  });
  it('can process a new selection after an individual bake fails',async()=>{
    const {worker,jobs}=setup();const failed=expect(jobs.run('bad')).rejects.toThrow('Invalid tile');
    worker.onmessage({data:{id:1,error:'Invalid tile'}});await failed;
    const next=jobs.run('bay');worker.finish(2,'bay');expect(await next).toBe('bay');
  });
  it('rejects queued and future requests if the worker itself fails to load',async()=>{
    const {worker,jobs}=setup();const first=jobs.run('river');
    const next=expect(jobs.run('bay')).rejects.toThrow('Worker unavailable');
    worker.onerror({message:'Worker unavailable',preventDefault:vi.fn()});
    expect(await first).toBeNull();await next;
    await expect(jobs.run('island')).rejects.toThrow('Worker unavailable');
    expect(worker.terminate).toHaveBeenCalledOnce();
  });
  it('resolves outstanding work and never starts work after disposal',async()=>{
    const {worker,jobs}=setup();const first=jobs.run('river'),next=jobs.run('bay');
    jobs.dispose();expect(await first).toBeNull();expect(await next).toBeNull();
    worker.finish(1,'late');expect(await jobs.run('island')).toBeNull();
    expect(worker.messages).toHaveLength(1);expect(worker.terminate).toHaveBeenCalledOnce();
  });
});
