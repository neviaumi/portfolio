import { expect, test } from '@playwright/test';

import { whoAmIPage } from '../web.ts';
import { replicateFrontendCMSQuery } from './query.graphql.ts';

test.describe('Who am i / Home page flow', () => {
  test('API call', async ({ page }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await replicateFrontendCMSQuery();
    await page.goto(whoAmIPage.toString());
    await expect(page).toHaveTitle('Who am I');
  });
});
