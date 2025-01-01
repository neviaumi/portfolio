import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { whoAmIPage } from '../web.ts';
import { replicateFrontendCMSQuery } from './query.graphql.ts';

test.describe('Who am i / Home page flow', () => {
  test('Automatically detectable accessibility issues should be 0', async ({
    page,
  }) => {
    await page.goto(whoAmIPage.toString());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });

  test('Have title configurate in place', async ({ page }) => {
    await page.goto(whoAmIPage.toString());
    await expect(page).toHaveTitle('Who am I');
  });

  test('Have summary section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(whoAmIPage.toString());
    const summarySection = page.locator('section[title="Summary"]');
    const summarySectionData = cmsData.page.summary;
    await expect(summarySection)
      .toMatchAriaSnapshot(`- img "${summarySectionData.name}"
- text: ${summarySectionData.name} ${summarySectionData.position}
- paragraph: ${summarySectionData.careerOverview.replaceAll('\n', ' ')}`);
  });
  test('Have core-values section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(whoAmIPage.toString());
    const coreValuesSection = page.locator('section[title="Core values"]');
    const coreValuesSectionData = cmsData.page.coreValues;
    await expect(coreValuesSection)
      .toMatchAriaSnapshot(`- paragraph: Core Values
- paragraph: ${coreValuesSectionData.heading}
- list:
  - listitem "${coreValuesSectionData.values.values[0].name}":
    - text: ${coreValuesSectionData.values.values[0].name}
    - paragraph: ${coreValuesSectionData.values.values[0].brief.replaceAll('\n', ' ')}
  - listitem "${coreValuesSectionData.values.values[1].name}":
    - text: ${coreValuesSectionData.values.values[1].name}
    - paragraph: ${coreValuesSectionData.values.values[1].brief.replaceAll('\n', ' ')}
  - listitem "${coreValuesSectionData.values.values[2].name}":
    - text: ${coreValuesSectionData.values.values[2].name}
    - paragraph: ${coreValuesSectionData.values.values[2].brief.replaceAll('\n', ' ')}
  - listitem "${coreValuesSectionData.values.values[3].name}":
    - text: ${coreValuesSectionData.values.values[3].name}
    - paragraph: ${coreValuesSectionData.values.values[3].brief.replaceAll('\n', ' ')}`);
  });
  test('Have skills section in document', async ({ page }) => {
    await page.goto(whoAmIPage.toString());
    const skillsSection = page.locator('section[title="Skills Radar"]');
    await expect(skillsSection).toMatchAriaSnapshot(`- text: Skills Radar`);
  });
  test('Have Experiences section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(whoAmIPage.toString());
    const experiencesSection = page.locator('section[title="Experiences"]');
    const experiencesSectionData = cmsData.page.experiences;
    await expect(experiencesSection).toMatchAriaSnapshot(
      `- text: Experiences
- list:
  - listitem "${experiencesSectionData.works[0].name}":
    - text: ${experiencesSectionData.works[0].name} ${experiencesSectionData.works[0].role}
    - paragraph: Contributed to the development of a personal nance super-app, focusing on backend performance, integration, and user experience improvements.
  - listitem "${experiencesSectionData.works[1].name}":
    - text: ${experiencesSectionData.works[1].name} ${experiencesSectionData.works[1].role}
    - paragraph: Developed an Access Control System to help partners manage tool access, focusing on frontend performance and design consistency.
  - listitem "${experiencesSectionData.works[2].name}":
    - text: ${experiencesSectionData.works[2].name} ${experiencesSectionData.works[2].role}
    - paragraph: Developed a registration system for companies using our digital wallet platform, contributing to both front-end and back- end functionality while enhancing team skills and system reliability.
  - listitem "${experiencesSectionData.works[3].name}":
    - text: ${experiencesSectionData.works[3].name} ${experiencesSectionData.works[3].role}
    - paragraph: Developed internal SSO for seamless staff login, boosting productivity. Built a messaging platform for WebPush, In-App, and SMS notications, enhancing communication and streamlining internal operations with improved HR access management.`,
    );
  });
  test('Have Recommends from co-workers section in document', async ({
    page,
  }) => {
    await page.goto(whoAmIPage.toString());
    const referencesSection = page.locator(
      'section[title="Recommends from co-workers"]',
    );
    await expect(referencesSection).toBeVisible();
    // TODO: resolve snapshot mismatch when content contain multiple-lines
    // const cmsData = await replicateFrontendCMSQuery();
    // const referencesSectionData = cmsData.page.references;
    // expect(referencesSection).toMatchAriaSnapshot(``);
  });
});
