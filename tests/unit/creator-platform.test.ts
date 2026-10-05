import {describe,it,expect} from 'vitest';
import {LEGACY_VARIANTS,tileContract,verifyTile,terrainHeight,centre,corners,tileSlots,sha256,starterGLB,inspectGLB,validateManifest} from '../../packages/platform/index.js';
const TILE_VARIANTS=LEGACY_VARIANTS.filter(v=>!v.layout);
function editGLB(bytes:Uint8Array,change:(json:any)=>void){const dv=new DataView(bytes.buffer,bytes.byteOffset),size=dv.getUint32(12,true),g=JSON.parse(new TextDecoder().decode(bytes.slice(20,20+size)));change(g);const text=new TextEncoder().encode(JSON.stringify(g)),n=Math.ceil(text.length/4)*4,bin=bytes.slice(20+size),out=new Uint8Array(20+n+bin.length),v=new DataView(out.buffer);out.set(bytes.slice(0,20));v.setUint32(8,out.length,true);v.setUint32(12,n,true);out.fill(32,20,20+n);out.set(text,20);out.set(bin,20+n);return out;}
describe('creator contracts',()=>{
  it('has 144 distinct terrain recipes with identical protected slots',async()=>{expect(new Set(TILE_VARIANTS.map(t=>t.id)).size).toBe(144);const heights=new Set();for(const v of TILE_VARIANTS){const t=await tileContract(-1,0,v.id);expect(await verifyTile(t)).toBe(true);expect(terrainHeight(0,0,t.recipe,t.boundaries)).toBe(24);heights.add(terrainHeight(220,8,t.recipe,t.boundaries).toFixed(5));}expect(heights.size).toBeGreaterThan(130);});
  it('rejects a modified shell even with a newly computed hash',async()=>{const t=await tileContract(-1,0,'coast-01');t.slot.radius=900;const {hash,...rest}=t;t.hash=await sha256(JSON.stringify(rest));expect(await verifyTile(t)).toBe(false);});
  it('all variants match shared boundary heights across adjacent positions',async()=>{const a=await tileContract(-1,0,'coast-01'),b=await tileContract(-2,0,'volcanic-12'),ac=centre(-1,0),bc=centre(-2,0),cs=corners();for(let j=0;j<=24;j++){const p=cs[3].map((x,i)=>x+(cs[4][i]-x)*j/24);const ay=terrainHeight(p[0],p[1],a.recipe,a.boundaries),by=terrainHeight(p[0]+ac.x-bc.x,p[1]+ac.z-bc.z,b.recipe,b.boundaries);expect(ay).toBeCloseTo(by,4);}});
  it('opens every shared edge around the original worlds, including outer-ring positions',()=>{
    const slots=tileSlots([]),available=slots.filter(s=>s.status==='available');
    expect(new Set(available.map(s=>`${s.q},${s.r}`))).toEqual(new Set(['-1,0','-1,1','0,1','-1,-1','0,-2','1,-2','2,-2','2,-1']));
    expect(slots.filter(s=>s.status==='protected')).toHaveLength(2);
    expect(slots.filter(s=>s.status==='occupied')).toHaveLength(4);
    expect(slots.some(s=>s.q===-2&&s.r===0)).toBe(false);
  });
  it('opens neighbors after publication while inner-ring gaps remain available',()=>{
    const reserved=tileSlots([],[{q:2,r:-1}]);
    expect(reserved.find(s=>s.q===2&&s.r===-1)?.status).toBe('reserved');
    expect(reserved.some(s=>s.q===3&&s.r===-1)).toBe(false);
    const published=tileSlots([{q:2,r:-1}]);
    expect(published.find(s=>s.q===3&&s.r===-1)?.status).toBe('available');
    expect(published.find(s=>s.q===-1&&s.r===0)?.status).toBe('available');
  });
  it('keeps a long connected frontier sparse and inside the supported coordinate range',()=>{
    const branch=Array.from({length:98},(_,i)=>({q:i+2,r:0})),slots=tileSlots(branch);
    expect(slots.some(s=>s.q===99&&s.r===-1&&s.status==='available')).toBe(true);
    expect(slots.every(s=>s.ring<=99)).toBe(true);
    expect(slots.length).toBeLessThan(400);
    expect(new Set(slots.map(s=>`${s.q},${s.r}`)).size).toBe(slots.length);
  });
});
describe('uploaded geometry validation',()=>{
  it('measures real triangles and fits both representations',()=>{expect(inspectGLB(starterGLB(),'map').drawCalls).toBe(1);expect(inspectGLB(starterGLB(33.333333),'world').bounds.radius).toBeCloseTo(50);});
  it('rejects out-of-slot vertices even when accessor bounds lie',()=>{const invalid=editGLB(starterGLB(100),g=>{g.accessors[0].min=[0,0,0];g.accessors[0].max=[1,1,1];});expect(()=>inspectGLB(invalid,'map')).toThrow(/leaves its slot/);});
  it('includes scene transforms and forbids hidden/moving geometry',()=>{expect(()=>inspectGLB(editGLB(starterGLB(),g=>g.nodes[0].translation=[20,0,0]),'map')).toThrow(/slot/);expect(()=>inspectGLB(editGLB(starterGLB(),g=>g.animations=[{}]),'map')).toThrow(/animation/);expect(()=>inspectGLB(editGLB(starterGLB(),g=>g.nodes.push({mesh:0})),'map')).toThrow(/unused/);});
  it('rejects projective matrices that could bypass slot bounds',()=>{const m=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,.001];expect(()=>inspectGLB(editGLB(starterGLB(),g=>g.nodes[0].matrix=m),'map')).toThrow(/affine/);});
  it('rejects sheared matrices that glTF loaders decompose differently',()=>{const m=[1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1];expect(()=>inspectGLB(editGLB(starterGLB(),g=>g.nodes[0].matrix=m),'map')).toThrow(/TRS/);});
  it('rejects external data and tampered GLB lengths',()=>{expect(()=>inspectGLB(editGLB(starterGLB(),g=>g.buffers[0].uri='https://example.com/a.bin'))).toThrow(/self-contained/);const g=starterGLB();g[8]=0;expect(()=>inspectGLB(g)).toThrow(/complete/);});
  it('requires both map LODs, a changelog and a valid immutable tile',async()=>{const data=starterGLB(),m={schemaVersion:1,name:'@maker/lagoon',version:'1.0.0',kind:'world',title:'Lagoon',description:'',license:'MIT',changelog:'Initial.',tile:await tileContract(-1,0,'coast-01'),content:{world:'model.glb',map:'model.glb',overview:'model.glb'},files:[{path:'model.glb',bytes:data.length,sha256:await sha256(data)}]};expect(await validateManifest(m)).toEqual([]);expect((await validateManifest({...m,content:{world:'model.glb'},changelog:''})).join(' ')).toMatch(/map.*overview/);expect((await validateManifest({...m,files:[{...m.files[0],path:'../model.glb'}]})).join(' ')).toMatch(/safe/);});
});
