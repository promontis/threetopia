import {test,expect} from '@playwright/test';

test('the whale stays whole across raised and lowered waterlines at its actual optical depth',async({page})=>{
  await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:20_000});
  await page.locator('[data-map-tile="tidewater"]').click();await page.keyboard.press('Escape');
  const result=await page.evaluate(async()=>{
    const url=performance.getEntriesByType('resource').map(e=>e.name).find(n=>/\/(?:three\/build\/three\.module|deps\/three)\.js(?:\?|$)/.test(n))!;
    const T=await import(url),w=(window as any).worldTiles,whale=w.wildlife.whale,water=w.ocean;
    const uniforms=water.material.uniforms,clock=uniforms.uTime;
    clock.value=0;water.spectrum.strength.value=0;uniforms.uSurf.value=0;uniforms.uFoam.value=0;uniforms.uReflections.value=0;
    whale.castShadow=false;
    const settle=async()=>{water.markDirty();w.controls.dispatchEvent({type:'change'});await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);};
    const decode=(v:number)=>{const e=(v>>10)&31,m=v&1023;return ((v&32768)?-1:1)*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);};
    const read=()=>{const target=w.post.target,raw=new Uint16Array(target.width*target.height*4);w.renderer.readRenderTargetPixels(target,0,0,target.width,target.height,raw);return raw;};
    const ray=new T.Raycaster(),submergedRay=new T.Raycaster(),ndc=new T.Vector2(),entry=new T.Vector3(),direction=new T.Vector3(),results=[];
    for(const level of [-.2,0,.25]){
      water.mesh.position.y=level;await settle();uniforms.uWhaleSurface.value=0;await settle();
      const visible=read();whale.visible=false;await settle();const hidden=read();whale.visible=true;await settle();
      const width=w.post.target.width,height=w.post.target.height,centre=whale.position.clone().project(w.camera);
      const cx=(centre.x*.5+.5)*width,cy=(-centre.y*.5+.5)*height;
      let hits=0,visibleHits=0,misses=0,ghosts=0;
      for(let y=Math.max(0,Math.floor(cy-150));y<Math.min(height,cy+150);y+=3)for(let x=Math.max(0,Math.floor(cx-180));x<Math.min(width,cx+180);x+=3){
        ndc.set((x+.5)/width*2-1,1-(y+.5)/height*2);ray.setFromCamera(ndc,w.camera);
        const surfaceDistance=(level-ray.ray.origin.y)/ray.ray.direction.y;
        entry.copy(ray.ray.origin).addScaledVector(ray.ray.direction,surfaceDistance);
        const eta=1/1.333;direction.copy(ray.ray.direction);direction.set(direction.x*eta,-Math.sqrt(1-eta*eta*(1-direction.y*direction.y)),direction.z*eta);
        submergedRay.set(entry,direction);
        // Independent CPU intersections with the real animated triangles.
        // Above-water hits use the camera ray; underwater hits obey Snell's law.
        const dry=ray.intersectObject(whale,false)[0],wet=submergedRay.intersectObject(whale,false)[0];
        const expected=!!(dry&&dry.distance<surfaceDistance)||!!wet;
        const index=((height-1-y)*width+x)*4;
        const difference=Math.abs(decode(visible[index])-decode(hidden[index]))+Math.abs(decode(visible[index+1])-decode(hidden[index+1]))+Math.abs(decode(visible[index+2])-decode(hidden[index+2]));
        if(expected){hits++;if(difference>.012)visibleHits++;}else{misses++;if(difference>.025)ghosts++;}
      }
      results.push({level,hits,coverage:visibleHits/hits,ghostRate:ghosts/misses});
    }
    return {results,water:water.inspect(),restored:whale.layers.mask===1&&w.renderer.clippingPlanes.length===0};
  });
  console.log(JSON.stringify(result.results));
  for(const sample of result.results){expect(sample.hits).toBeGreaterThan(300);expect(sample.coverage).toBeGreaterThan(.9);expect(sample.ghostRate).toBeLessThan(.015);}
  expect(result.water.swimmerResolution).toEqual([256,256]);expect(result.water.swimmerBytes).toBeLessThan(1024*1024);
  expect(result.restored).toBe(true);expect(errors).toEqual([]);
});
