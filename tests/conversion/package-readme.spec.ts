import {test,expect} from '@playwright/test';
import {resolve} from 'node:path';

test('package README displays composition code without executing author HTML or unsafe links',async({page})=>{
  await page.goto('/@fs'+resolve('tests/conversion/readme.html'));
  await expect(page.locator('#readme h1')).toHaveText('Package composition');
  await expect(page.locator('#readme pre code')).toHaveText('const ocean = new OceanFFT(renderer);');
  await expect(page.locator('#readme script')).toHaveCount(0);
  await expect(page.locator('#readme a')).toHaveCount(1);
  expect(await page.evaluate(()=>(window as any).readmeAttack)).toBeUndefined();
});
