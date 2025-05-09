import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { servicesPage } from '../web.ts';

test.describe('Services page flow', () => {
  test('Automatically detectable accessibility issues should be 0', async ({
    page,
  }) => {
    await page.goto(servicesPage.toString());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
