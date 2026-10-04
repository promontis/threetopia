import { expect, test } from '@playwright/test';

test('email alone joins the local waitlist and confirmation requires a deliberate action', async ({ page, request }) => {
  const initialCount = (await (await request.get('/api/creators/count')).json()).count;
  await page.goto('/#beta');
  const form = page.getByRole('form', { name: 'Join the waitlist' });
  await expect(form.getByLabel('Your project')).not.toHaveAttribute('required');
  await expect(form.getByLabel('X handle')).not.toHaveAttribute('required');
  await form.getByLabel('Email', { exact: true }).fill(`waitlist-${crypto.randomUUID()}@example.com`);
  await form.getByRole('button', { name: 'Join the waitlist' }).click();
  await expect(page.getByRole('heading', { name: 'Check your inbox.' })).toBeFocused();
  await expect(page.getByText('Local preview: no email was sent.')).toBeVisible();
  expect((await (await request.get('/api/creators/count')).json()).count).toBe(initialCount);
  await page.getByRole('link', { name: 'Preview confirmation email' }).click();
  const link = page.getByRole('link', { name: 'Confirm my email' });
  const confirmation = await link.getAttribute('href');
  const token = new URL(confirmation!).searchParams.get('token')!;
  // Simulate a mail scanner visiting first; it must still show the form later.
  await request.get(confirmation!);
  await link.click();
  await expect(page.getByRole('button', { name: 'Confirm my email' })).toBeVisible();
  await page.getByRole('button', { name: 'Confirm my email' }).click();
  await expect(page.getByRole('heading', { name: 'You’re on the list.' })).toBeVisible();
  expect((await (await request.get('/api/creators/count')).json()).count).toBe(initialCount + 1);
  await page.goto(`/waitlist/remove?token=${token}`);
  await page.getByRole('button', { name: 'Remove my signup' }).click();
  await expect(page.getByRole('heading', { name: 'You’ve been removed.' })).toBeVisible();
  expect((await (await request.get('/api/creators/count')).json()).count).toBe(initialCount);
});

test('optional fields are validated and a failed submission remains recoverable', async ({ page }) => {
  await page.goto('/#beta');
  const form = page.getByRole('form', { name: 'Join the waitlist' });
  await form.getByLabel('Email', { exact: true }).fill(`waitlist-${crypto.randomUUID()}@example.com`);
  await form.getByLabel('Your project').fill('https://example.com/demo');
  await form.getByLabel('X handle').fill('@invalid handle');
  await form.getByRole('button', { name: 'Join the waitlist' }).click();
  await expect(form.getByLabel('X handle')).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByLabel('X handle')).toBeFocused();
  await form.getByLabel('X handle').fill('@test_maker');
  await page.route('**/api/waitlist', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ message: 'We couldn’t send the confirmation email. Please try again.' }) }));
  await form.getByRole('button', { name: 'Join the waitlist' }).click();
  await expect(form.getByRole('status')).toContainText('We couldn’t send');
  await expect(form.getByLabel('Email', { exact: true })).not.toBeEmpty();
  await expect(form.getByRole('button')).toBeEnabled();
  await page.unroute('**/api/waitlist');
  await form.getByRole('button', { name: 'Join the waitlist' }).click();
  await expect(page.getByRole('heading', { name: 'Check your inbox.' })).toBeVisible();
  await page.getByRole('link', { name: 'Preview confirmation email' }).click();
  await page.getByRole('link', { name: 'remove this signup' }).click();
  await page.getByRole('button', { name: 'Remove my signup' }).click();
  await expect(page.getByRole('heading', { name: 'You’ve been removed.' })).toBeVisible();
});

test('mobile waitlist stays within the viewport and supports keyboard submission', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#beta');
  const form = page.getByRole('form', { name: 'Join the waitlist' });
  for (const input of await form.locator('input:not([name="company"])').all()) {
    const bounds = await input.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  }
  await form.getByLabel('Email', { exact: true }).fill(`waitlist-${crypto.randomUUID()}@example.com`);
  await expect(form.getByRole('button')).toBeEnabled();
  await form.getByLabel('Email', { exact: true }).press('Enter');
  await expect(page.getByRole('heading', { name: 'Check your inbox.' })).toBeFocused();
  await page.getByRole('button', { name: 'Back to the form' }).click();
  await expect(form.getByLabel('Email', { exact: true })).toBeFocused();
});

test('an unavailable integration never shows a signup success', async ({ page }) => {
  await page.route('**/api/waitlist/config', route => route.fulfill({ json: { enabled: false, local: false, siteKey: '' } }));
  await page.goto('/#beta');
  const form = page.getByRole('form', { name: 'Join the waitlist' });
  await expect(form.getByRole('status')).toContainText('The waitlist is not open yet');
  await form.getByLabel('Email', { exact: true }).fill('example@example.com');
  await form.getByRole('button', { name: 'Join the waitlist' }).click();
  await expect(form).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Check your inbox.' })).toBeHidden();
});

test('the live form waits for Turnstile and disables submission when its token expires', async ({ page }) => {
  await page.route('**/api/waitlist/config', route => route.fulfill({ json: { enabled: true, local: false, siteKey: 'fixture-key' } }));
  // A deterministic provider fixture; no request goes to an external provider.
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({
    contentType: 'application/javascript', body: `window.turnstile = {
      render(container, options) {
        for (const [label, callback] of [
          ['Complete test challenge', () => options.callback('verified-test-token')],
          ['Expire test challenge', () => options['expired-callback']()]
        ]) {
          const button = document.createElement('button');
          button.type = 'button'; button.textContent = label; button.onclick = callback;
          container.append(button);
        }
        return 'test-widget';
      }, reset() {}
    };`,
  }));
  await page.route('**/api/waitlist', async route => {
    expect(route.request().postDataJSON().turnstileToken).toBe('verified-test-token');
    await route.fulfill({ json: { message: 'Check your inbox to confirm your email.' } });
  });
  await page.goto('/#beta');
  const form = page.getByRole('form', { name: 'Join the waitlist' });
  const submit = form.getByRole('button', { name: 'Join the waitlist' });
  await form.getByLabel('Email', { exact: true }).fill('example@example.com');
  await expect(submit).toBeDisabled();
  await form.getByRole('button', { name: 'Complete test challenge' }).click();
  await expect(submit).toBeEnabled();
  await form.getByRole('button', { name: 'Expire test challenge' }).click();
  await expect(submit).toBeDisabled();
  await form.getByRole('button', { name: 'Complete test challenge' }).click();
  await submit.click();
  await expect(page.getByRole('heading', { name: 'Check your inbox.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Preview confirmation email' })).toBeHidden();
});
