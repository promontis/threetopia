import { expect, test } from '@playwright/test';

test('the explorer searches creators, combines filters and recovers from no results', async ({ page }) => {
  await page.goto('/#packages');
  const explorer = page.locator('#packages');
  const search = explorer.getByRole('searchbox', { name: 'Search packages or creators' });
  const cards = explorer.locator('[data-package-id]:visible');
  await expect(cards).toHaveCount(6);
  await explorer.getByRole('button', { name: 'Scenes', exact: true }).click();
  await expect(cards).toHaveCount(4);
  await search.fill('Dan Greenheck');
  await expect(cards).toHaveCount(1);
  await expect(explorer.getByRole('heading', { level: 3 })).toHaveText('Tidewater');
  await expect(explorer.getByRole('link', { name: 'View original project' })).toHaveAttribute('href', 'https://dgreenheck.github.io/tidewater/');
  await search.fill('Brian');
  await expect(explorer.getByText('No packages found.', { exact: true })).toBeVisible();
  await expect(explorer.locator('[data-package-detail]')).toBeHidden();
  await explorer.getByRole('button', { name: 'Clear search & filters' }).click();
  await expect(search).toBeFocused();
  await expect(cards).toHaveCount(6);
  await expect(explorer.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await search.fill('vegetation');
  await expect(cards).toHaveCount(1);
  await expect(explorer.getByRole('heading', { level: 3 })).toHaveText('Meadow grass');
});

test('a package opens a relevant X-ray location and can be found again in the explorer', async ({ page }) => {
  await page.goto('/#packages');
  const explorer = page.locator('#packages');
  const xray = page.locator('#package-xray');
  await explorer.getByRole('button', { name: 'Inspect Sakura River Valley', exact: true }).click();
  await explorer.getByRole('link', { name: 'See it in Package X-ray' }).click();
  await expect(page).toHaveURL(/#package-xray$/);
  await expect(xray.locator('[data-xray-place]')).toHaveText('Sakura garden');
  await expect(xray.locator('[data-xray-count]')).toHaveText('4 packages');
  await expect(xray.locator('[data-xray-layer]:visible')).toHaveCount(4);
  await expect(xray.locator('[data-inspect-package="sakura"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(xray.locator('[data-xray-layer="sakura"]')).toBeVisible();
  await expect(xray.locator('[data-xray-layer="punk"]')).toBeHidden();
  await xray.locator('[data-inspect-package="birds"]').click();
  await expect(xray.getByRole('status')).toContainText('Little Birds by Brian Gruber highlighted');
  await xray.getByRole('link', { name: 'Open in explorer' }).click();
  await expect(page).toHaveURL(/#packages$/);
  await expect(explorer.getByRole('heading', { level: 3 })).toHaveText('Little Birds');
  await expect(explorer.getByRole('button', { name: 'Inspect Little Birds', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('X-ray updates the visible composition and supports keyboard selection and merging', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#package-xray');
  const xray = page.locator('#package-xray');
  const city = xray.getByRole('button', { name: 'City canal', exact: true });
  await city.focus();
  await page.keyboard.press('Enter');
  await expect(city).toBeFocused();
  await expect(xray.locator('[data-xray-position]')).toContainText('112, 1, 46');
  await expect(xray.locator('[data-inspect-package]')).toHaveCount(3);
  await expect(xray.locator('[data-xray-layer]:visible')).toHaveCount(3);
  await expect(xray.locator('[data-xray-layer="meadow"]')).toBeHidden();
  await expect(xray.locator('[data-xray-layer="punk"]')).toBeVisible();
  const coast = xray.locator('[data-inspect-package="tidewater"]');
  await coast.focus();
  await page.keyboard.press('Enter');
  await expect(coast).toHaveAttribute('aria-pressed', 'true');
  await expect(xray.locator('[data-xray-layer="tidewater"]')).toHaveClass(/is-inspected/);
  const toggle = xray.getByRole('button', { name: 'X-ray', exact: true });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(xray.locator('[data-xray-layer="tidewater"]')).toHaveCSS('transform', 'none');
  await expect(xray.locator('[data-xray-view-caption]')).toContainText('together in one scene');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(xray.locator('[data-xray-layer="tidewater"]')).not.toHaveCSS('transform', 'none');
  await xray.locator('[data-xray-layer="birds"] > use').first().click();
  await expect(xray.locator('[data-inspect-package="birds"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(xray.locator('[data-xray-selection]')).toContainText('Little Birds');
});

test('both package previews fit a narrow screen and have no broken images or script errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#packages');
  for (const selector of ['.explorer-toolbar', '.package-browser-grid', '.package-detail', '.xray-window', '.xray-viewport', '.xray-inspector']) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    const bounds = await element.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  }
  await page.locator('#package-xray').getByRole('button', { name: 'Tree village', exact: true }).click();
  await expect(page.locator('[data-xray-place]')).toHaveText('Tree village');
  for (const image of await page.locator('#packages img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
