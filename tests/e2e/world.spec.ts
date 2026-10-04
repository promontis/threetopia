/// <reference types="@webgpu/types" />
import { expect, test, type Page } from '@playwright/test';

const back = (page: Page) => page.getByRole('link', { name: /Back to Threetopia/ });
const withoutGPU = (page: Page) => page.addInitScript(() => Object.defineProperty(navigator, 'gpu', { value: undefined, configurable: true }));

test('the standalone world contains only loading and game UI and gives a WebGPU fallback', async ({ page }) => {
  await withoutGPU(page);await page.goto('/world/');
  await expect(page.getByRole('heading',{name:'Unable to load world'})).toBeVisible();
  await expect(page.locator('[data-world-status]')).toContainText('This world needs WebGPU');
  await expect(page.getByRole('button',{name:'Try again'})).toBeVisible();
  await expect(page.getByRole('button',{name:/Enter the world/})).toHaveCount(0);
  await expect(page.locator('#home-view, .hero, [data-waitlist], .portal-canvas')).toHaveCount(0);
  await back(page).click();await expect(page.getByRole('link',{name:'Enter',exact:true})).toBeVisible();
});

test('a small screen without JavaScript explains the loading requirement', async ({ browser }) => {
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:568}});
  const page=await context.newPage();
  try{await page.goto('/world/');await expect(page.locator('.explore-no-script')).toBeVisible();
    await expect(page.locator('canvas')).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await back(page).click();await expect(page.getByRole('heading',{name:'A home for Three.js creators.'})).toBeVisible();
  }finally{await context.close();}
});

test('loading a world does not download the landing portal or waitlist modules', async ({page})=>{
  await withoutGPU(page);const requests:string[]=[];
  page.on('request',request=>requests.push(request.url()));await page.goto('/world/');
  await expect(page.locator('#world-view')).toHaveAttribute('data-world-state','error');
  expect(requests.some(url=>/PortalScene|sections\/waitlist|page-views/.test(url))).toBe(false);
});

async function requireGPU(page: Page) {
  await page.goto('/');
  const available = await page.evaluate(async () => !!(await navigator.gpu?.requestAdapter()));
  test.skip(!available, 'Requires a WebGPU adapter; fallback behavior is tested separately.');
}

test('a failed source download offers retry and a working return link', async ({ page }) => {
  await requireGPU(page);
  await page.route('**/world-assets/lagoon/scene.json', route => route.abort());
  await page.goto('/world/');
  await expect(page.locator('#world-view')).toHaveAttribute('data-world-state', 'error', { timeout: 45_000 });
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  await back(page).click(); await expect(page).toHaveURL(/\/$/);
});

test('the centre connects three neighbours, with ocean slots for the next expansion', async ({ page }) => {
  test.setTimeout(240_000);
  await requireGPU(page);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/world/?inspect');
  await expect(page.locator('#world-view')).toHaveAttribute('data-world-state','exploring',{timeout:90_000});
  await expect(page.getByRole('button',{name:/Enter the world/})).toHaveCount(0);
  const read = async () => JSON.parse((await page.locator('[data-world-diagnostics]').textContent())!);
  await page.getByRole('combobox', { name: 'Simulation', exact: true }).selectOption('32');
  for (const [id, label] of [['sakura', 'Sakura'], ['tidewater', 'Tidewater'], ['punk', 'Punk']]) {
    await page.getByRole('combobox', { name: 'Destination', exact: true }).selectOption(id);
    await page.getByRole('button', { name: `Walk to ${label} ↗` }).click();
    await expect.poll(async () => (await read()).region, { timeout: 60_000 }).toBe(id);
    await expect.poll(async () => (await read()).guide, { timeout: 60_000 }).toBe(false);
    const arrival = await read();
    expect(arrival.blocked).toBe(false); expect(arrival.trail).toBeGreaterThan(arrival.trailLength - 3);
    await page.getByRole('button', { name: 'Return to centre ↩' }).click();
    await expect.poll(async () => (await read()).region, { timeout: 60_000 }).toBe('lagoon');
    await expect.poll(async () => (await read()).guide, { timeout: 60_000 }).toBe(false);
    expect((await read()).blocked).toBe(false); expect((await read()).trail).toBeLessThan(3);
  }
  const result = await read();
  expect(result.canvases).toBe(1); expect(result.hexes).toBe(4); expect(result.sharedEdges).toBe(3);
  expect(result.centre).toBe('lagoon'); expect(result.expansionRing).toBe(1); expect(result.oceanSlots).toBe(3);
  expect(result.regionHistory).toEqual(['lagoon', 'sakura', 'lagoon', 'tidewater', 'lagoon', 'punk', 'lagoon']);
  await expect(page.locator('#world-view iframe')).toHaveCount(0);
  await page.getByRole('button', { name: /Map M/ }).click();
  await expect(page.getByRole('dialog', { name: 'World map' })).toBeVisible();
  await expect(page.locator('[data-world-atlas] canvas')).toHaveCount(1);
  await expect(page.locator('[data-world-atlas] .image-map')).toHaveCount(1);
  await page.getByRole('checkbox', { name: 'Tile edges', exact:true }).check();
  await page.getByRole('button', { name: 'Close map' }).click();
  expect(errors).toEqual([]);
});
