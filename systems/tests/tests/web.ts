const TESTS_WEB_BASE_URL = process.env['TESTS_WEB_BASE_URL'];
if (!TESTS_WEB_BASE_URL) {
  throw new Error('TESTS_WEB_BASE_URL is not defined');
}

export const homePage = new URL('/portfolio', TESTS_WEB_BASE_URL);
export const whoAmIPage = new URL('/portfolio/who-am-i', TESTS_WEB_BASE_URL);
export const coreValuesPage = new URL(
  '/portfolio/core-values',
  TESTS_WEB_BASE_URL,
);
export const servicesPage = new URL('/portfolio/services', TESTS_WEB_BASE_URL);
export const experiencesPage = new URL(
  '/portfolio/experiences',
  TESTS_WEB_BASE_URL,
);
export const skillsPage = new URL('/portfolio/skills', TESTS_WEB_BASE_URL);
export const faqPage = new URL('/portfolio/faq', TESTS_WEB_BASE_URL);
