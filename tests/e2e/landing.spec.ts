import { expect, test } from '@playwright/test';

// This server runs the landing Worker. Creator account APIs have their own
// Worker; the shared header receives an explicit signed-out session here.
test.beforeEach(async ({ page }) => {
  await page.route('**/api/me', route => route.fulfill({ json: { creator: null } }));
});

test('renders the page without errors and shows the hero', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${m.text()} (${m.location().url})`); });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A home for Three.js creators.');
  await expect(page.locator('.hero-figure img')).toBeVisible();
  await expect(page.locator('#core h2')).toHaveText('Let our projects join in one world');
  await expect(page.locator('#how').getByRole('heading', { level: 3 })).toHaveText(['Share a component', 'Build a place']);
  await expect(page.locator('#earn')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Threetopia' }).getByRole('link')).toHaveText(['Home', 'Creators', 'Docs', 'World']);
  await page.locator('.hero').getByRole('link', { name: 'Join the waitlist' }).click();
  await expect(page.locator('#beta')).toBeInViewport();
  await expect(page.locator('#beta').getByRole('link', { name: 'Get in touch on X' })).toHaveAttribute('href', 'https://x.com/promontis');
  expect(errors).toEqual([]);
});

test('creator credits open original previews, credit their sources and return keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const projects = ['Tidewater', 'Threejs-Punk', 'Lagoon Tree Village', 'Sakura River Valley', 'Little Birds', 'Meadow grass'];
  for (const project of projects) {
    const trigger = page.locator('.hero').getByRole('button', { name: new RegExp(project.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: project, exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Close creator details' })).toBeFocused();
    for (const image of await dialog.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await expect(dialog.locator('.creator-profile')).toHaveAttribute('href', /^https:\/\/x\.com\//);
    if (project === 'Threejs-Punk') await expect(dialog.getByRole('link', { name: 'Sunag on X' })).toHaveAttribute('href', 'https://x.com/sea3dformat');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
});

test('changing the scene keeps the shared paths and river in place', async ({ page }) => {
  await page.goto('/#tech');
  const lab = page.locator('[data-connection-lab]');
  await expect(lab.locator('.hex-stage')).toHaveAttribute('data-world-state', 'ready');
  const originalCanvas = await lab.locator('.hex-world-canvas').elementHandle();
  const routes = await lab.locator('[data-shared-routes]').elementHandle();
  const originalRoutes = await routes!.evaluate((element) => element.innerHTML);
  await expect(lab.getByRole('button')).toHaveCount(3);
  await expect(lab.getByRole('button', { name: 'Check neighbours' })).toHaveCount(0);
  for (const name of ['Village', 'Garden', 'Forest']) {
    const choice = lab.getByRole('button', { name, exact: true });
    await choice.click();
    await expect(choice).toHaveAttribute('aria-pressed', 'true');
    await expect(lab.locator('button[aria-pressed="true"]')).toHaveCount(1);
    await expect(lab.getByRole('status')).toHaveText(`${name} selected. The river and paths stay connected to all six neighbours.`);
    await expect(lab.locator(`[data-scene-art="${name.toLowerCase()}"]`)).toHaveCSS('opacity', '1');
    expect(await routes!.evaluate((element) => element.isConnected && element.innerHTML)).toBe(originalRoutes);
    await expect(lab.locator('.hex-stage')).toHaveAttribute('data-rendered-scene', name.toLowerCase());
    expect(await originalCanvas!.evaluate((canvas) => canvas.isConnected && document.querySelector('.hex-world-canvas') === canvas)).toBe(true);
  }
  const details = page.locator('.connection-details');
  await expect(details.locator('p')).toBeHidden();
  await details.locator('summary').click();
  await expect(details.locator('p')).toBeVisible();
  await expect(details).toContainText('planned CLI');
});

test('scene choices work by keyboard without moving focus', async ({ page }) => {
  await page.goto('/#tech');
  const lab = page.locator('[data-connection-lab]');
  await lab.getByRole('button', { name: 'Forest', exact: true }).focus();
  await page.keyboard.press('Tab');
  const village = lab.getByRole('button', { name: 'Village', exact: true });
  await expect(village).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(village).toHaveAttribute('aria-pressed', 'true');
  await expect(village).toBeFocused();
  await page.keyboard.press('Tab');
  const garden = lab.getByRole('button', { name: 'Garden', exact: true });
  await page.keyboard.press('Space');
  await expect(garden).toHaveAttribute('aria-pressed', 'true');
  await expect(garden).toBeFocused();
});

test('the creators section uses the real count, handles zero and links to the signup', async ({ page }) => {
  let count = 0;
  await page.route('**/api/creators/count', route => route.fulfill({ json: { count } }));
  await page.goto('/#creators');
  const creators = page.locator('#creators');
  await expect(page.locator('#revenue-proposal')).toHaveCount(0);
  await expect(creators.locator('[data-creators-count]')).toHaveText('0');
  await expect(creators).toContainText('Be one of the first.');
  count = 1;
  await page.reload();
  await expect(creators.locator('[data-creators-count]')).toHaveText('1');
  await expect(creators.locator('[data-creators-label]')).toHaveText('creator on the waitlist');
  count = 1204;
  await page.reload();
  await expect(creators.locator('[data-creators-count]')).toHaveText('1,204');
  await expect(creators.locator('[data-creators-label]')).toHaveText('creators on the waitlist');
  await creators.getByRole('link', { name: 'Join the creators' }).click();
  await expect(page.getByRole('form', { name: 'Join the waitlist' })).toBeInViewport();
});

test('an unavailable creator count never appears as zero and leaves signup accessible', async ({ page }) => {
  await page.route('**/api/creators/count', route => route.fulfill({ status: 503, json: { message: 'Unavailable' } }));
  await page.goto('/#creators');
  const creators = page.locator('#creators');
  await expect(creators.getByRole('status')).toHaveAttribute('aria-busy', 'false');
  await expect(creators.locator('[data-creators-count]')).toHaveText('—');
  await expect(creators).toContainText('Count unavailable. You can still join.');
  await expect(creators.getByRole('link', { name: 'Join the creators' })).toBeVisible();
});

test('mobile layout has no horizontal overflow and keeps the copy readable', async ({ browser }, info) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.hero-entry')).toHaveAttribute('data-portal-state', /^(ready|fallback)$/);
  await page.screenshot({ path: info.outputPath('mobile.png'), scale: 'css' });
  const birds = page.getByRole('button', { name: 'Little Birds by Brian Gruber', exact: true });
  await expect(birds).toBeInViewport();
  await birds.click();
  const dialog = page.getByRole('dialog', { name: 'Little Birds', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.creator-preview img')).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  await dialog.getByRole('button', { name: 'Close creator details' }).click();
  await expect(dialog).not.toBeVisible();
  const lab = page.locator('[data-connection-lab]');
  await lab.getByRole('button', { name: 'Garden', exact: true }).click();
  await expect(lab.getByRole('status')).toContainText('Garden selected.');
  await expect(lab.locator('[data-scene-art="garden"]')).toHaveCSS('opacity', '1');
  for (const selector of ['.intro-layout', '.connection-lab', '.contribution-options', '.terminal', '.creators-layout', '.creators-tally', '.world-answers', '.invitation-layout']) {
    const bounds = await page.locator(selector).boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  }
  await context.close();
});

test('the CLI terminal demonstrates a rejected placement and resumes after scrolling away', async ({ page }) => {
  await page.goto('/');
  await page.locator('#tech').scrollIntoViewIfNeeded();
  await expect(page.locator('#tech h2')).toHaveText('How the scenes connect');
  const terminal = page.locator('[data-terminal]');
  await terminal.scrollIntoViewIfNeeded();
  await expect(terminal.locator('[data-terminal-out]')).toContainText('Placement blocked.', { timeout: 10_000 });
  await page.locator('#core').scrollIntoViewIfNeeded();
  await expect(terminal).not.toBeInViewport();
  await terminal.scrollIntoViewIfNeeded();
  await expect(terminal.locator('[data-terminal-out]')).toContainText('Ready to preview.', { timeout: 20_000 });
});

test('reduced motion shows the whole CLI session at once', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-terminal-out]')).toContainText('Placement blocked.');
  await expect(page.locator('[data-terminal-out]')).toContainText('Published forest@0.1.0.');
  await context.close();
});
