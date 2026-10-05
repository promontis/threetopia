import {test,expect} from '@playwright/test';

for(const role of ['ocean','audio'])test(`${role} preview settings change the running component`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`/?focus=${role}`);
  await expect(page.locator('#preview')).toHaveAttribute('data-ready','true',{timeout:300_000});
  const frame=page.frames().find(f=>f!==page.mainFrame())!;
  await expect(frame.locator('body')).toHaveAttribute('data-preview-focus',role);
  const label=role==='ocean'?'Wind speed':'Master volume';
  const slider=frame.locator('.tw-page:not([hidden])').getByRole('slider',{name:label,exact:true});
  const before=await frame.evaluate(role=>role==='ocean'?(window as any).__app.fft.local.windSpeed:(window as any).__app.audio.volume,role);
  await slider.focus();await slider.press('ArrowRight');
  await expect.poll(()=>frame.evaluate(role=>role==='ocean'?(window as any).__app.fft.local.windSpeed:(window as any).__app.audio.volume,role)).toBeGreaterThan(before);
  if(role==='audio'){
    await frame.getByRole('button',{name:'Enable audio',exact:true}).click();
    await expect.poll(()=>frame.evaluate(()=>(window as any).__app.audio.ctx.state)).toBe('running');
    await frame.locator('.tw-page:not([hidden])').getByRole('switch',{name:'Mute',exact:true}).click();
    expect(await frame.evaluate(()=>(window as any).__app.audio.muted)).toBe(true);
  }
  expect(errors).toEqual([]);
  await page.screenshot({path:`.context/tidewater-${role}-settings.png`});
  await frame.evaluate(async()=>{await (window as any).__threetopiaRuntime.dispose();});
});
