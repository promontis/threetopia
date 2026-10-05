import {describe,it,expect} from 'vitest';
import {requireNamespace} from '../../src/creators/server/namespaces';
import type {Creator,Env} from '../../src/creators/server/common';

describe('managed package namespaces',()=>{
  const owner={id:'owner-id',handle:'promontis'} as Creator;
  const other={id:'other-id',handle:'another'} as Creator;
  const grants=new Map<string,string>();
  const env={DB:{prepare:()=>({bind:(namespace:string)=>({first:async()=>grants.has(namespace)?{creator_id:grants.get(namespace)}:null})})}} as unknown as Env;
  it('requires an explicit grant to publish under a different creator name',async()=>{
    grants.clear();
    await expect(requireNamespace(env,owner,'promontis')).resolves.toBeUndefined();
    await expect(requireNamespace(env,owner,'dgreenheck')).rejects.toMatchObject({status:403});
    grants.set('dgreenheck',owner.id);
    await expect(requireNamespace(env,owner,'dgreenheck')).resolves.toBeUndefined();
    await expect(requireNamespace(env,other,'dgreenheck')).rejects.toMatchObject({status:403});
  });
  it('revokes the previous manager when a namespace is transferred',async()=>{
    grants.set('dgreenheck',other.id);
    await expect(requireNamespace(env,owner,'dgreenheck')).rejects.toMatchObject({status:403});
    await expect(requireNamespace(env,other,'dgreenheck')).resolves.toBeUndefined();
    // A legacy handle never overrides an explicit reassignment.
    await expect(requireNamespace(env,{...owner,handle:'dgreenheck'},'dgreenheck')).rejects.toMatchObject({status:403});
  });
});
