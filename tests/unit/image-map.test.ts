import {describe,it,expect} from 'vitest';
import {readFileSync,statSync,mkdtempSync,rmSync,writeFileSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {validateImageMap,starterImageMap,projectMap,unprojectMap,IMAGE_MAP_BUDGET} from '../../packages/world-map/image-format.js';
import {imageLimits,imageTileFrame} from '../../packages/world-map/image-camera.js';
import {frameCenter,clampSceneView} from '../../packages/world-map/scene-camera.js';
import {validateMap} from '../../packages/world-map/index.js';
import {motionEnabled,advanceMapTime,mapPixelRatio,componentBounds,componentMotion} from '../../packages/world-map/map-motion.js';
const read=(p:string)=>JSON.parse(readFileSync(p,'utf8'));
const registry=read('public/atlas/registry.json');
const cli=resolve('packages/cli/bin/legacy.js');
const run=(...args:string[])=>spawnSync(process.execPath,[cli,...args],{encoding:'utf8'});

describe('independent image tile contract',()=>{
  it('ships four source renders with registered component passes and no invented landmarks',()=>{
    const terrain=new Set();let components=0;
    for(const tile of registry.tiles){
      const map=read('public'+tile.imageMap);expect(validateImageMap(map),tile.id).toEqual([]);expect(validateMap(map)).toEqual([]);
      expect(map.capture.kind).toBe('world-render');expect(map.capture.source.id).toBe(tile.id);terrain.add(map.terrain.src);
      for(const layer of [map.terrain,...map.components]){
        expect(layer.src).toMatch(/^\/map\/renders\//);
        for(const path of [layer.src,layer.preview].filter(Boolean))expect(statSync('public'+path).size).toBeLessThan(IMAGE_MAP_BUDGET.assetBytes);
        expect(layer.position).toEqual(map.terrain.position);expect(layer.size).toEqual(map.terrain.size);expect(layer.anchor).toEqual(map.terrain.anchor);
      }
      components+=map.components.length;
    }
    expect(terrain.size).toBe(4);expect(components).toBeGreaterThanOrEqual(5);
    // The source Sakura scene has a river, not the illustrated map's three invented falls.
    expect(read('public/map/tiles/sakura.json').components.some((c:any)=>c.effect?.kind==='waterfall')).toBe(false);
  });
  it('uses a reversible shared projection for player and tile coordinates',()=>{
    for(const [x,z] of [[0,0],[692.8203,0],[-346.4102,600],[-346.4102,-600],[4800,-8200]]){const p=projectMap(x,z),v=unprojectMap(p.x,p.y);expect(v.x).toBeCloseTo(x,8);expect(v.z).toBeCloseTo(z,8);}
  });
  it('rejects malformed image maps, escaping/remote images and unbounded motion',()=>{
    expect(validateImageMap(null)).toEqual(['An image map is required.']);
    for(const path of ['../private.png','https://example.com/art.png','//example.com/art.png','data:image/png,aaaa','thing.js']){const m=starterImageMap(path);expect(validateImageMap(m).join()).toContain('local PNG');}
    const m=starterImageMap() as any;m.components=[{...m.terrain,id:'tree',label:'Tree',animation:{kind:'sway',duration:0,travel:[Infinity,1000]}}];expect(validateImageMap(m).join()).toContain('invalid animation');
    m.components[0].animation={kind:'script',duration:10,travel:[0,0]};expect(validateImageMap(m).join()).toContain('invalid animation');
  });
  it('enforces layer IDs, anchor bounds and component/image-map budgets',()=>{
    const m=read('public/map/tiles/punk.json');m.components.push({...m.components[0]});m.terrain.anchor=[-.5,2];expect(validateImageMap(m).join()).toContain('unique');expect(validateImageMap(m).join()).toContain('anchor');
    m.components=Array(33).fill(m.components[0]);expect(validateImageMap(m).join()).toContain('32 separate');
    m.notes='x'.repeat(65537);expect(validateImageMap(m).join()).toContain('64 KiB');
  });
  it('rejects invalid effect programs, image crops and procedural cloud images',()=>{
    const map=read('public/map/tiles/lagoon.json'),fall=map.components.find((c:any)=>c.effect?.kind==='waterfall');
    fall.crop=[.8,.2,.4,.3];expect(validateImageMap(map).join()).toContain('crop');
    fall.crop=[0,0,1,1];fall.effect.speed=100;expect(validateImageMap(map).join()).toContain('invalid effect');
    fall.effect={kind:'script',speed:1};expect(validateImageMap(map).join()).toContain('invalid effect');
    fall.effect={kind:'cloud'};expect(validateImageMap(map).join()).toContain('omit src');
    map.components=[null];expect(validateImageMap(map).join()).toContain('must be an object');
  });
});

describe('map animation lifetime and alignment',()=>{
  it('freezes every motion source for pause, reduced motion, hidden tabs and minimaps',()=>{
    const enabled={motion:true,reduced:false,hidden:false,mini:false};expect(motionEnabled(enabled)).toBe(true);
    for(const flag of [{motion:false},{reduced:true},{hidden:true},{mini:true}]){const active=motionEnabled({...enabled,...flag});expect(active).toBe(false);expect(advanceMapTime(12,900000,active)).toBe(12);}
    expect(advanceMapTime(12,900000,true)).toBeCloseTo(12.1);expect(advanceMapTime(12,33,true)).toBeCloseTo(12.033);
  });
  it('keeps the composition within the pixel budget, also at wide Retina sizes',()=>{
    for(const [w,h,dpr] of [[390,844,3],[1440,960,2],[3840,2160,2]]){const ratio=mapPixelRatio(w,h,dpr);expect(w*h*ratio*ratio).toBeLessThanOrEqual(2100000.01);expect(ratio).toBeLessThanOrEqual(1.35);}
    expect(mapPixelRatio(240,180,3,true)).toBe(1);
  });
  it('anchors effects in tile-local art coordinates',()=>{
    const c={position:[20,-10],size:[100,80],anchor:[.5,.9]},centre={x:820,y:-104};
    expect(componentBounds(c,centre)).toEqual({x:840,y:-146,width:100,height:80});
    expect(componentBounds(c,centre,true).y).toBe(-276);
  });
});


describe('illustrated camera limits and creator workflow',()=>{
  const maps=new Map<string,any>(registry.tiles.map((t:any)=>[t.id,read('public'+t.imageMap)]));
  it('fits whole art tiles and their moving objects on portrait and landscape screens',()=>{
    for(const [w,h] of [[1440,960],[390,844],[844,390]]){
      const insets={top:78,right:75,bottom:100,left:38},l=imageLimits(registry.tiles,maps,w,h,insets);
      const check=(f:any,span:number,c:any)=>{for(const x of [f.x0,f.x1])for(const y of [f.y0,f.y1]){
        const px=w/2+(x-c.x)*h/span,py=h/2+(y-c.y)*h/span;
        expect(px).toBeGreaterThanOrEqual(insets.left);expect(px).toBeLessThanOrEqual(w-insets.right);expect(py).toBeGreaterThanOrEqual(insets.top);expect(py).toBeLessThanOrEqual(h-insets.bottom);
      }};
      for(const f of l.frames){check(f,l.maxSpan,frameCenter(l.area,l.maxSpan,l));check(f,l.minSpan,frameCenter(f,l.minSpan,l));}
      expect(clampSceneView({x:1e9,y:1e9,span:1e9},l)).toEqual({...frameCenter(l.area,l.maxSpan,l),span:l.maxSpan});
      expect(clampSceneView({x:0,y:0,span:.001},l).span).toBe(l.minSpan);
    }
  });
  it('drives bounded sprite motion from one clock while roots remain anchored',()=>{
    for(const kind of ['sway','sail','float','drift','petals'] as const)for(const t of [0,1,50,100000]){
      const component={...starterImageMap().terrain,id:'example',label:'Example',animation:{kind,duration:12,travel:[20,8] as [number,number],rotate:4}};
      const m=componentMotion(component,t),a=component.animation;
      expect(Math.abs(m.x)).toBeLessThanOrEqual(Math.abs(a.travel[0]));expect(Math.abs(m.y)).toBeLessThanOrEqual(Math.abs(a.travel[1]));
      expect(Math.abs(m.rotation)).toBeLessThanOrEqual(Math.abs(a.rotate??0)*Math.PI/180+.00001);
      expect(m.opacity).toBeGreaterThanOrEqual(0);expect(m.opacity).toBeLessThanOrEqual(1);
      if(a.kind==='sway')expect([m.x,m.y]).toEqual([0,0]);
    }
  });
  it('supports explicit image imports and rejects missing and oversized images',()=>{
    const root=mkdtempSync(join(tmpdir(),'threetopia-images-')),project=join(root,'coral-map');
    try{
      expect(run('create',project,'--format','image').status).toBe(0);const map=read(join(project,'map.json'));expect(map.kind).toBe('image-tile');
      expect(run('build',project).status).toBe(0);expect(existsSync(join(project,'dist-map/map-atmosphere.js'))).toBe(true);
      const html=readFileSync(join(project,'dist-map/index.html'),'utf8');expect(html).toContain('ImageAtlasRenderer');expect(html).not.toContain("import {SceneAtlasRenderer}");
      writeFileSync(join(project,'assets/landscape.webp'),Buffer.alloc(IMAGE_MAP_BUDGET.assetBytes+1));expect(run('check',project).stderr).toContain('2 MiB');
      rmSync(join(project,'assets/landscape.webp'));expect(run('check',project).status).not.toBe(0);
    }finally{rmSync(root,{recursive:true,force:true});}
  });
});
