import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { sanitise } from '../test-helper.ts';
import { homePage, whoAmIPage } from '../web.ts';
import { replicateFrontendCMSQuery } from './query.graphql.ts';

[
  {
    pageUrl: whoAmIPage,
    suite: 'Who am i page flow',
  },
  {
    pageUrl: homePage,
    suite: 'Home page flow',
  },
].forEach(({ pageUrl, suite }) => {
  test.describe(`${suite}`, () => {
    test('Automatically detectable accessibility issues should be 0', async ({
      page,
    }) => {
      await page.goto(pageUrl.toString());

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Have title configurate in place', async ({ page }) => {
      await page.goto(pageUrl.toString());
      await expect(page).toHaveTitle('Who am I');
    });

    test('Have summary section in document', async ({ page }) => {
      const cmsData = await replicateFrontendCMSQuery();
      await page.goto(pageUrl.toString());
      const summarySection = page.locator('section[title="Summary"]');
      const summarySectionData = cmsData.page.summary;
      await expect(summarySection)
        .toMatchAriaSnapshot(`- img "${summarySectionData.name}"
- text: ${summarySectionData.name} ${summarySectionData.position}
- paragraph: ${summarySectionData.careerOverview.replaceAll('\n', ' ')}`);
    });
    test('Have core-values section in document', async ({ page }) => {
      const cmsData = await replicateFrontendCMSQuery();
      await page.goto(pageUrl.toString());
      const coreValuesSection = page.locator('section[title="Core values"]');
      const coreValuesSectionData = cmsData.page.coreValues;
      const cmsValues = coreValuesSectionData.values.values;
      await expect(coreValuesSection)
        .toMatchAriaSnapshot(`- heading "Core Values" [level=1]
- heading "${coreValuesSectionData.heading}" [level=2]
- list:
  - listitem "${coreValuesSectionData.values.values[0].name}":
    - link "${[cmsValues[0].name, cmsValues[0].headline, cmsValues[0].brief.replaceAll('\n', ' ')].join(' ')}":
      - text: ${[cmsValues[0].name, cmsValues[0].headline].join(' ')}
      - paragraph: ${cmsValues[0].brief.replaceAll('\n', ' ')}
  - listitem "${coreValuesSectionData.values.values[1].name}":
    - link "${[cmsValues[1].name, cmsValues[1].headline, cmsValues[1].brief.replaceAll('\n', ' ')].join(' ')}":
      - text: ${[cmsValues[1].name, cmsValues[1].headline].join(' ')}
      - paragraph: ${cmsValues[1].brief.replaceAll('\n', ' ')}
  - listitem "${coreValuesSectionData.values.values[2].name}":
    - link "${[cmsValues[2].name, cmsValues[2].headline, cmsValues[2].brief.replaceAll('\n', ' ')].join(' ')}":
      - text: ${[cmsValues[2].name, cmsValues[2].headline].join(' ')}
      - paragraph: ${cmsValues[2].brief.replaceAll('\n', ' ')}
  - listitem "${coreValuesSectionData.values.values[3].name}":
    - link "${[cmsValues[3].name, cmsValues[3].headline, cmsValues[3].brief.replaceAll('\n', ' ')].join(' ')}":
      - text: ${[cmsValues[3].name, cmsValues[3].headline].join(' ')}
      - paragraph: ${cmsValues[3].brief.replaceAll('\n', ' ')}`);
    });
    test('Have skills section in document', async ({ page }) => {
      await page.goto(pageUrl.toString());
      const skillsSection = page.locator('section[title="Skills Radar"]');
      await expect(skillsSection).toMatchAriaSnapshot(`- text: Skills Radar`);
    });
    test('Have Experiences section in document', async ({ page }) => {
      const cmsData = await replicateFrontendCMSQuery();
      await page.goto(pageUrl.toString());
      const experiencesSection = page.locator('section[title="Experiences"]');
      const experiencesSectionData = cmsData.page.experiences;
      await expect(experiencesSection).toMatchAriaSnapshot(
        `- text: Experiences
- list:
${experiencesSectionData.works
  .slice(0, 4)
  .map((work: any) => {
    return `  - listitem "${work.name}":
    - link "${[work.name, work.role, work.brief].join(' ')}":
      - text: ${work.name} ${work.role}
      - paragraph: ${work.brief}`;
  })
  .join('\n')}`,
      );
    });
    test('Have Recommends from co-workers section in document', async ({
      page,
    }) => {
      await page.goto(pageUrl.toString());
      const referencesSection = page.locator(
        'section[title="Recommends from co-workers"]',
      );
      const cmsData = await replicateFrontendCMSQuery();
      const referencesSectionData = cmsData.page.workReferences.map(
        (ref: any) => ref.references,
      );
      await expect(referencesSection)
        .toMatchAriaSnapshot(`- text: Recommends from co-workers
- list:
  - listitem "${referencesSectionData[0].name}":
    - img "${referencesSectionData[0].name}"
    - text: ${[referencesSectionData[0].name, referencesSectionData[0].relationship].join(' ')}
    - paragraph: ${sanitise(referencesSectionData[0].comments)}
  - listitem "${referencesSectionData[1].name}":
    - img "${referencesSectionData[1].name}"
    - text: ${[referencesSectionData[1].name, referencesSectionData[1].relationship].join(' ')}
    - paragraph: ${sanitise(referencesSectionData[1].comments)}
  - listitem "${referencesSectionData[2].name}":
    - img "${referencesSectionData[2].name}"
    - text: ${[referencesSectionData[2].name, referencesSectionData[2].relationship].join(' ')}
    - paragraph: ${sanitise(referencesSectionData[2].comments)}
  - listitem "${referencesSectionData[3].name}":
    - img "${referencesSectionData[3].name}"
    - text: ${[referencesSectionData[3].name, referencesSectionData[3].relationship].join(' ')}
    - paragraph: ${sanitise(referencesSectionData[3].comments)}
          `);
    });
  });
});
