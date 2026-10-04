import {test,expect} from '@playwright/test';

test('GPU ocean FFT matches a direct Fourier sum in all four cascades and replays exactly',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1280,height:900});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.bringToFront();await page.goto('/map/lite/');await expect(page.locator('.tile-canvas')).toHaveAttribute('data-ready','true',{timeout:20_000});
  const result=await page.evaluate(async()=>{
    const url='/src/tiles/lite/ocean-spectrum-data.ts';
    const {makeOceanSpectrum,OCEAN_FFT_SIZE:n,OCEAN_SCALE:scale,OCEAN_LENGTHS:lengths,OCEAN_GAINS:gains}=await import(url);
    const w=(window as any).worldTiles,spectrum=w.ocean.spectrum,clock=w.ocean.material.uniforms.uTime,seed=makeOceanSpectrum(),saved=clock.value;
    const decode=(v:number)=>{const e=(v>>10)&31,m=v&1023;return ((v&32768)?-1:1)*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);};
    const read=(target:any,c:number,x:number,y:number)=>{const raw=new Uint16Array(4);w.renderer.readRenderTargetPixels(target,x,y,1,1,raw,undefined,c);return Array.from(raw,decode);};
    clock.value=3.25;const passes=spectrum.update(w.renderer);let maxError=0;
    for(let c=0;c<4;c++)for(const [px,py] of [[0,0],[37,89]]){
      let height=0,dx=0,dz=0,dyx=0,dyz=0,dxx=0,dzz=0,dxz=0;
      for(let y=0;y<n;y++)for(let x=0;x<n;x++){
        const i=(c*n*n+y*n+x)*4,kx=(x-n/2)*2*Math.PI/lengths[c],kz=(y-n/2)*2*Math.PI/lengths[c],k=Math.hypot(kx,kz);if(!k)continue;
        const phase=Math.sqrt(9.81*k*Math.tanh(Math.min(k*500,20)))*3.25*.75,cs=Math.cos(phase),sn=Math.sin(phase);
        const hr=seed[i]*cs-seed[i+1]*sn+seed[i+2]*cs+seed[i+3]*sn,hi=seed[i]*sn+seed[i+1]*cs-seed[i+2]*sn+seed[i+3]*cs;
        const angle=2*Math.PI*((x-n/2)*px+(y-n/2)*py)/n,a=hr*Math.cos(angle)-hi*Math.sin(angle),b=-hi*Math.cos(angle)-hr*Math.sin(angle);
        height+=a;dx+=kx/k*b;dz+=kz/k*b;dyx+=kx*b;dyz+=kz*b;dxx-=kx*kx/k*a;dzz-=kz*kz/k*a;dxz-=kx*kz/k*a;
      }
      const gain=gains[c],J=(1+.9*dxx*gain)*(1+.9*dzz*gain)-(.9*dxz*gain)**2;
      const expected=[dx*.9*scale*gain,height*scale*gain,dz*.9*scale*gain,1-J,dyx*gain,dyz*gain,dxx*.9*gain,dzz*.9*gain];
      const actual=[...read(spectrum.displacement,c,px,py),...read(spectrum.target,c,px,py)];
      actual.forEach((v,i)=>{maxError=Math.max(maxError,Math.abs(v-expected[i]));});
    }
    const before=read(spectrum.displacement,0,37,89),idle=spectrum.update(w.renderer);
    clock.value=7.5;spectrum.update(w.renderer);const moving=read(spectrum.displacement,0,37,89);
    clock.value=3.25;spectrum.update(w.renderer);const replay=read(spectrum.displacement,0,37,89);
    clock.value=saved;spectrum.update(w.renderer);w.ocean.markDirty();w.controls.dispatchEvent({type:'change'});
    return {maxError,passes,idle,before,moving,replay,inspect:spectrum.inspect()};
  });
  expect(result.maxError).toBeLessThan(.001);expect(result.passes).toBe(19);expect(result.idle).toBe(0);
  expect(result.moving).not.toEqual(result.before);expect(result.replay).toEqual(result.before);
  expect(result.inspect.bands).toBe(4);expect(result.inspect.bytes).toBeLessThan(27*1024*1024);
  expect(errors).toEqual([]);
});
