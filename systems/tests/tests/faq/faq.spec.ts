import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import cms from '../cms.ts';
import { sanitise } from '../test-helper.ts';
import { faqPage } from '../web.ts';
import { replicateFrontendCMSQuery } from './query.graphql.ts';

const cmsData = await replicateFrontendCMSQuery();
test.describe('FAQ page flow', () => {
  test('Automatically detectable accessibility issues should be 0', async ({
    page,
  }) => {
    await page.goto(faqPage.toString());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
  cmsData.page.questions.map((question: { answer: any; question: string }) => {
    test(`${question.question} should exist and match the structure`, async ({
      page,
    }) => {
      await page.goto(faqPage.toString());
      const questionOnPage = page.getByRole('article', {
        name: question.question,
      });
      const calculatedAriaSnapshot = `- article "${question.question}":
  - heading "${sanitise(question.question)}" [level=3]
${cms.covertRichTextFieldToAriaYml(question.answer, 2)}`;
      await expect(questionOnPage).toMatchAriaSnapshot(calculatedAriaSnapshot);
    });
  });
});
