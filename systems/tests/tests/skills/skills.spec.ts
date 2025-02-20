import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import cms from '../cms.ts';
import { skillsPage } from '../web.ts';
import { replicateFrontendCMSQuery } from './query.graphql.ts';

const cmsData = await replicateFrontendCMSQuery();

test.describe('Skills page flow', () => {
  test('Automatically detectable accessibility issues should be 0', async ({
    page,
  }) => {
    await page.goto(skillsPage.toString());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
  cmsData.page.skillsRef.sections.map(
    (section: {
      description: any;
      keywords: { name: string }[];
      section: string;
    }) => {
      test(`${section.section} should exist and match the structure`, async ({
        page,
      }) => {
        await page.goto(skillsPage.toString());
        const sectionOnPage = page.getByRole('article', {
          name: section.section,
        });
        const calculatedAriaSnapshot = `- article "${section.section}":
${cms.covertRichTextFieldToAriaYml(section.description, 2)}
  - separator
  - list:
${section.keywords.map(({ name }: { name: string }) => `    - listitem: ${name}`).join('\n')}`;
        await expect(sectionOnPage).toMatchAriaSnapshot(calculatedAriaSnapshot);
      });
    },
  );
});
