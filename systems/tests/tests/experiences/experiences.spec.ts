import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { sanitise } from '../test-helper.ts';
import { experiencesPage } from '../web.ts';
import { replicateFrontendCMSQuery } from './query.graphql.ts';

test.describe('Experiences page flow', () => {
  test('Automatically detectable accessibility issues should be 0', async ({
    page,
  }) => {
    await page.goto(experiencesPage.toString());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Have Timeline section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(experiencesPage.toString());
    const timelineSection = page.locator('section[title="Work Timeline"]');
    const timelineSectionData = cmsData.page.experiencesRef.works;
    await expect(timelineSection).toMatchAriaSnapshot(`- list:
${timelineSectionData
  .map((work: any, index: number) =>
    index < 4
      ? `  - listitem:
    - paragraph: ${work.period}
    - link "${work.role} at ${work.name}":
      - paragraph: ${work.role} at ${work.name}`
      : `  - listitem:
    - paragraph: ${work.period}
    - paragraph: ${work.role} at ${work.name}`,
  )
  .join('\n')}`);
  });

  test('Have Work details section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(experiencesPage.toString());
    const workDetailsSection = page.locator('article[title="Work Details"]');
    const workDetailsSectionData = cmsData.page.experiencesRef.works;
    await expect(workDetailsSection).toMatchAriaSnapshot(
      `- article "Work Details":
${workDetailsSectionData
  .slice(0, 4)
  .filter((work: any) => work.detailedDescription)
  .map((work: any) =>
    !work.workReferences
      ? `  - heading "${work.role} at ${work.name}" [level=2]
  - heading "${work.period}, ${work.location}" [level=3]
  - paragraph: ${sanitise(work.detailedDescription)}`
      : `  - heading "${work.role} at ${work.name}" [level=2]
  - heading "${work.period}, ${work.location}" [level=3]
  - paragraph: ${sanitise(work.detailedDescription)}
  - article:
    - separator
${work.workReferences
  .map((ref: any) => {
    return `    - img "${ref.references.name}"
    - text: ${ref.references.name} ${ref.references.relationship}`;
  })
  .join('\n')}`,
  )
  .join('\n')}`,
    );
  });
});
