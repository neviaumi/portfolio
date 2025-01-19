import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { sanitise } from '../test-helper.ts';
import { coreValuesPage } from '../web.ts';
import { replicateFrontendCMSQuery } from './query.graphql.ts';

test.describe('Core values page flow', () => {
  test('Automatically detectable accessibility issues should be 0', async ({
    page,
  }) => {
    await page.goto(coreValuesPage.toString());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
  test('Have title configurate in place', async ({ page }) => {
    await page.goto(coreValuesPage.toString());
    await expect(page).toHaveTitle('Core Values');
  });
  test('Have what is core values section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(coreValuesPage.toString());
    const headingSection = page.locator('section[title="Heading"]');
    const headingSectionData = cmsData.page.whatAreCoreValues;
    await expect(headingSection).toMatchAriaSnapshot(
      `- text: What Are Core Values and Why?
- paragraph: "${sanitise(headingSectionData)}"`,
    );
  });
  test('Have Evolution section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(coreValuesPage.toString());
    const evolutionSection = page.locator('section[title="Evolution"]');
    const evolutionSectionData = cmsData.page.values.values.find(
      (value: { name: string }) => value.name === 'Evolution',
    );
    await expect(evolutionSection)
      .toMatchAriaSnapshot(`- heading "${evolutionSectionData.name}" [level=1]
- heading "${evolutionSectionData.headline}" [level=2]
- paragraph: ${sanitise(evolutionSectionData.description)}
- heading "Situation" [level=3]
- paragraph: ${sanitise(evolutionSectionData.star.situation)}
- heading "Task" [level=3]
- paragraph: ${sanitise(evolutionSectionData.star.task)}
- heading "Action" [level=3]
- paragraph: ${sanitise(evolutionSectionData.star.action)}
- heading "Result" [level=3]
- paragraph: ${sanitise(evolutionSectionData.star.result)}
- paragraph: ${sanitise(evolutionSectionData.footer)}`);
  });
  test('Have Interactive section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(coreValuesPage.toString());
    const interactiveSection = page.locator('section[title="Interactive"]');
    const interactiveSectionData = cmsData.page.values.values.find(
      (value: { name: string }) => value.name === 'Interactive',
    );
    await expect(interactiveSection)
      .toMatchAriaSnapshot(`- heading "${interactiveSectionData.name}" [level=1]
- heading "${interactiveSectionData.headline}" [level=2]
- paragraph: ${sanitise(interactiveSectionData.description)}`);
  });
  test('Have Communication section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(coreValuesPage.toString());
    const communicationSection = page.locator('section[title="Communication"]');
    const communicationSectionData = cmsData.page.values.values.find(
      (value: { name: string }) => value.name === 'Communication',
    );
    await expect(communicationSection)
      .toMatchAriaSnapshot(`- heading "${communicationSectionData.name}" [level=1]
- heading "${communicationSectionData.headline}" [level=2]
- paragraph: ${sanitise(communicationSectionData.description)}`);
  });
  test('Have Flexible section in document', async ({ page }) => {
    const cmsData = await replicateFrontendCMSQuery();
    await page.goto(coreValuesPage.toString());
    const flexibleSection = page.locator('section[title="Flexible"]');
    const flexibleSectionData = cmsData.page.values.values.find(
      (value: { name: string }) => value.name === 'Flexible',
    );
    await expect(flexibleSection)
      .toMatchAriaSnapshot(`- heading "${flexibleSectionData.name}" [level=1]
- heading "${flexibleSectionData.headline}" [level=2]
- paragraph: ${sanitise(flexibleSectionData.description)}`);
  });
});
