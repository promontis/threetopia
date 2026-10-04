import { expect, test, type Page } from '@playwright/test';

async function observeWorld(page: Page) {
  await page.addInitScript(() => {
    const probe = { draws:0 };
    Object.assign(window,{hexProbe:probe});
    const draw = WebGL2RenderingContext.prototype.drawElements;
    WebGL2RenderingContext.prototype.drawElements = function (...args) {
      if((this.canvas as HTMLCanvasElement).classList.contains('hex-world-canvas'))probe.draws++;
      return Reflect.apply(draw,this,args);
    };
  });
  return () => page.evaluate(() => (window as unknown as {hexProbe:{draws:number}}).hexProbe.draws);
}

test('the maquette loads near the section, resumes after returning from World and pauses offscreen', async ({page}) => {
  const draws=await observeWorld(page);
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.hero-entry')).toHaveAttribute('data-portal-state','ready');
  await expect(page.locator('.hex-world-canvas')).toHaveCount(0);
  await page.locator('#tech').scrollIntoViewIfNeeded();
  await expect(page.locator('.hex-stage')).toHaveAttribute('data-world-state','ready');
  const started=await draws();
  await expect.poll(draws).toBeGreaterThan(started);
  // World is a separate document. Returning must restart or restore the
  // homepage renderer; an element handle from before navigation is invalid.
  await page.locator('.hero-entry').evaluate((entry:HTMLAnchorElement)=>entry.click());
  await expect(page).toHaveURL(/\/world\/$/);
  await expect(page.locator('.hex-world-canvas')).toHaveCount(0);
  await page.goBack();
  await expect(page.locator('.hex-stage')).toHaveAttribute('data-world-state','ready');
  const returned=await draws();
  await expect.poll(draws).toBeGreaterThan(returned);
  await page.locator('#beta').scrollIntoViewIfNeeded();
  await expect(page.locator('.hex-stage')).not.toBeInViewport();
  await page.waitForTimeout(150);
  const offscreen=await draws();
  await page.waitForTimeout(180);
  expect(await draws()).toBe(offscreen);
  expect(errors).toEqual([]);
});

test('reduced motion renders a still maquette and updates it when choosing another landscape', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  const draws=await observeWorld(page);
  await page.goto('/#tech');
  const stage=page.locator('.hex-stage');
  await expect(stage).toHaveAttribute('data-world-state','ready');
  await page.waitForTimeout(150);
  const before=await draws();
  await page.waitForTimeout(180);
  expect(await draws()).toBe(before);
  await page.locator('[data-scene-choice="garden"]').click();
  await expect(stage).toHaveAttribute('data-rendered-scene','garden');
  expect(await draws()).toBeGreaterThan(before);
  const after=await draws();
  await page.waitForTimeout(180);
  expect(await draws()).toBe(after);
});

test('without WebGL the static map and landscape choices remain usable', async ({page}) => {
  await page.addInitScript(()=>{
    const original=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]) {
      return type==='webgl2'?null:Reflect.apply(original,this,[type,...args]);
    } as typeof original;
  });
  await page.goto('/#tech');
  const lab=page.locator('[data-connection-lab]');
  await expect(lab.locator('.hex-stage')).toHaveAttribute('data-world-state','fallback');
  await expect(lab.locator('.hex-map')).toBeVisible();
  await expect(lab.locator('canvas')).toHaveCount(0);
  await lab.getByRole('button',{name:'Village',exact:true}).click();
  await expect(lab.locator('[data-scene-art="village"]')).toHaveCSS('opacity','1');
  await expect(lab.getByRole('status')).toContainText('Village selected.');
});
