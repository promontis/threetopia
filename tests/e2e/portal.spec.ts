import { expect, test } from '@playwright/test';

// Portal lifecycle tests isolate the expensive world loader; world.spec.ts exercises the real renderer.
test.beforeEach(async ({ page }) => {
  await page.route('**/api/me', route => route.fulfill({ json: { creator: null } }));
  await page.route('**/src/explore/world.ts', route => route.fulfill({ contentType: 'text/javascript', body: 'export async function mountExplore(){return {setActive(){},dispose(){}};}' }));
});

test('the hero is styled before application JavaScript starts', async ({ page }) => {
  let release!: () => void;
  const startApplication = new Promise<void>((resolve) => { release = resolve; });
  await page.route('**/src/main.ts', async (route) => {
    await startApplication;
    await route.continue();
  });
  try {
    await page.goto('/', { waitUntil: 'commit' });
    const brand = page.locator('.site-header .site-brand-mark');
    // With the entry module held, no JS-injected styles can hide a first-paint flash.
    await expect(brand).toHaveCSS('width', '30px');
    await expect(page.locator('.hero')).toHaveCSS('position', 'relative');
    await expect(page.locator('.site-header')).toHaveCSS('position', 'fixed');
    await expect(page.locator('.portal-canvas')).toHaveCount(0);
    expect(await brand.evaluate((element) => element.getBoundingClientRect().height)).toBeLessThan(50);
  } finally {
    release();
    await page.waitForLoadState('domcontentloaded');
  }
  await expect(page.locator('.hero-entry')).toHaveAttribute('data-portal-state', 'ready');
});

test('the Three.js portal renders, stays clear of the copy and credits, and supports keyboard entry', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  const entry = page.getByRole('link', { name: 'Enter', exact: true });
  await expect(entry).toHaveAttribute('data-portal-state', 'ready');
  await expect(entry).toHaveAttribute('data-portal-view', 'ready');
  await expect(entry.locator('canvas')).toBeVisible();
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1728, height: 800 }, { width: 1200, height: 800 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    const opening = await entry.boundingBox();
    expect(opening!.height / opening!.width).toBeCloseTo(5 / 3, 1);
    await expect.poll(() => page.evaluate(() => {
      const portal = document.querySelector('.hero-entry')!.getBoundingClientRect();
      const others = [...document.querySelectorAll('.hero-copy, .credit-card')];
      return others.every((element) => {
        const box = element.getBoundingClientRect();
        return portal.right <= box.left || portal.left >= box.right || portal.bottom <= box.top || portal.top >= box.bottom;
      });
    })).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await entry.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/world\/$/);
  await expect(page.getByRole('heading', { name: 'Loading world' })).toBeVisible();
  await page.goBack();
  await expect(entry).toBeVisible();
  await expect(entry).not.toHaveClass(/is-entering/);
  expect(errors).toEqual([]);
});

test('the portal remains a working link when WebGL is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === 'webgl2') return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto('/');
  const entry = page.getByRole('link', { name: 'Enter', exact: true });
  await expect(entry).toHaveAttribute('data-portal-state', 'fallback');
  await expect(entry.locator('canvas')).toHaveCount(0);
  await entry.click();
  await expect(page).toHaveURL(/\/world\/$/);
  await expect(page.getByRole('heading', { name: 'Loading world' })).toBeVisible();
});

test('the light rift and navigation still work if the forest view cannot load', async ({ page }) => {
  await page.route('**/portal/forest-path-v2.webp', (route) => route.abort());
  await page.goto('/');
  const entry = page.getByRole('link', { name: 'Enter', exact: true });
  await expect(entry).toHaveAttribute('data-portal-state', 'ready');
  await expect(entry).toHaveAttribute('data-portal-view', 'unavailable');
  await expect(entry.locator('canvas')).toBeVisible();
  await entry.click();
  await expect(page).toHaveURL(/\/world\/$/);
  await expect(page.getByRole('heading', { name: 'Loading world' })).toBeVisible();
});

test('reduced motion keeps the portal still and skips the passage animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    const original = WebGL2RenderingContext.prototype.drawElements;
    const calls = { count: 0 };
    Object.assign(window, { portalDraws: calls });
    WebGL2RenderingContext.prototype.drawElements = function (...args) {
      if ((this.canvas as HTMLCanvasElement).classList.contains('portal-canvas')) calls.count++;
      return Reflect.apply(original, this, args);
    };
  });
  await page.goto('/');
  const entry = page.getByRole('link', { name: 'Enter', exact: true });
  await expect(entry).toHaveAttribute('data-portal-state', 'ready');
  await expect(entry).toHaveAttribute('data-portal-view', 'ready');
  const draws = () => page.evaluate(() => (window as unknown as { portalDraws: { count: number } }).portalDraws.count);
  await expect.poll(draws).toBeGreaterThan(0);
  // Let layout observers settle, then verify there is no background render loop.
  await page.waitForTimeout(150);
  const before = await draws();
  await page.waitForTimeout(150);
  expect(await draws()).toBe(before);
  await entry.click();
  await expect(page).toHaveURL(/\/world\/$/);
});

test('scrolling past the portal keeps its visible edge drawing and resumes without a blank frame', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    const original = WebGL2RenderingContext.prototype.drawElements;
    const calls = { count: 0 };
    Object.assign(window, { portalDraws: calls });
    WebGL2RenderingContext.prototype.drawElements = function (...args) {
      if ((this.canvas as HTMLCanvasElement).classList.contains('portal-canvas')) calls.count++;
      return Reflect.apply(original, this, args);
    };
  });
  await page.goto('/');
  const entry = page.getByRole('link', { name: 'Enter', exact: true });
  await expect(entry).toHaveAttribute('data-portal-state', 'ready');
  const canvas = entry.locator('canvas');
  const draws = () => page.evaluate(() => (window as unknown as { portalDraws: { count: number } }).portalDraws.count);
  const edgeScroll = await entry.evaluate((element) => element.getBoundingClientRect().bottom + scrollY + 2);
  const canvasBottom = await canvas.evaluate((element) => element.getBoundingClientRect().bottom + scrollY);
  await page.evaluate((top) => scrollTo({ top, behavior: 'instant' }), edgeScroll);
  await expect(entry).not.toBeInViewport();
  await expect(canvas).toBeInViewport();
  // Wait for the visibility observer, then check the still-visible rim animates.
  await page.waitForTimeout(100);
  const atEdge = await draws();
  await expect.poll(draws).toBeGreaterThan(atEdge);

  await page.evaluate((top) => scrollTo({ top, behavior: 'instant' }), canvasBottom + 200);
  await page.waitForTimeout(100);
  const offscreen = await draws();
  await page.waitForTimeout(100);
  expect(await draws()).toBe(offscreen);
  const retainedPixels = await canvas.evaluate((element: HTMLCanvasElement) => {
    const gl = element.getContext('webgl2')!;
    const pixels = new Uint8Array(element.width * element.height * 4);
    gl.readPixels(0, 0, element.width, element.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    return pixels.some((value, index) => index % 4 === 3 && value > 0);
  });
  expect(retainedPixels).toBe(true);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(draws).toBeGreaterThan(offscreen);
  await expect(entry).toHaveAttribute('data-portal-state', 'ready');
});

test('entry navigates to a standalone world document and browser back returns to the landing', async ({page})=>{
  await page.goto('/');
  const entry=page.getByRole('link',{name:'Enter',exact:true});
  await expect(entry).toHaveAttribute('data-portal-state','ready');
  await entry.click();
  await expect(page).toHaveURL(/\/world\/$/);
  await expect(page.locator('#home-view')).toHaveCount(0);
  await expect(page.getByRole('button',{name:/Enter the world/})).toHaveCount(0);
  await page.goBack();
  await expect(page.getByRole('heading',{name:'A home for Three.js creators.'})).toBeVisible();
  await expect(entry).toHaveAttribute('data-portal-state','ready');
});
