import path from 'node:path';
import playwright from 'playwright';
import { createServer } from 'vite';

const WORKSPACE_ROOT = path.resolve(import.meta.dirname);

async function generateResumeToPDF(pdfPath) {
  const server = await createServer({
    server: {
      host: '0.0.0.0',
      port: 8080,
    },
  });
  await server.listen();

  const browser = await playwright.chromium.launch({
    args: ['--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  // Log browser console messages to Node.js stdout
  page.on('console', msg => {
    console.log(`[BROWSER LOG] ${msg.type()}: ${msg.text()}`);
  });

  // Log uncaught errors in the page
  page.on('pageerror', err => {
    console.error(`[BROWSER PAGE ERROR] ${err.toString()}`);
  });

  // Log network events (helpful for debugging asset loading issues)
  page.on('requestfailed', req => {
    console.error(
      `[NETWORK ERROR] Failed to load: ${req.url()} (${req.failure()?.errorText})`,
    );
  });

  await page.emulateMedia({ media: 'print' });
  await page.goto(`http://localhost:8080/`, {
    waitUntil: 'networkidle',
  });
  // await page.waitForSelector('json-resume'); // Update selector as needed
  await new Promise(resolve => setTimeout(resolve, 4000));
  await page.pdf({
    format: 'a4',
    path: pdfPath,
    preferCSSPageSize: true,
    printBackground: true,
  });

  await browser.close();
  await server.close();
}

await generateResumeToPDF(path.join(WORKSPACE_ROOT, 'public', 'resume.pdf'));
