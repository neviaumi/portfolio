const TESTS_WEB_BASE_URL = process.env['TESTS_WEB_BASE_URL'];
if (!TESTS_WEB_BASE_URL) {
  throw new Error('TESTS_WEB_BASE_URL is not defined');
}

export const whoAmIPage = new URL('/portfolio/who-am-i', TESTS_WEB_BASE_URL);
