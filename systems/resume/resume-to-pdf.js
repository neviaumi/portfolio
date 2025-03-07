import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import playwright from 'playwright';
import { createServer } from 'vite';

import { WORKSPACE_ROOT } from './workspace.js';

export async function generateResumeToPDF(pdfPath) {
  const server = await createServer({
    server: {
      port: 8081,
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
  await page.goto(`http://localhost:8081/`, {
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

const isMainExecution =
  import.meta.url === new URL(process.argv[1], 'file://').toString();

if (isMainExecution) {
  const resumePdfFileName = await (async () => {
    const useTailoredResume = process.env['VITE_IS_TAILORED_RESUME']
      ? true
      : false;
    const resumeSource = process.env['VITE_RESUME_SOURCE'];
    if (!useTailoredResume) return 'resume.pdf';
    return fs
      .readFile(path.join(os.tmpdir(), resumeSource), { encoding: 'utf8' })
      .then(JSON.parse)
      .then(({ meta: { id } }) => `${id}.pdf`);
  })();

  await generateResumeToPDF(
    path.join(WORKSPACE_ROOT, 'public', resumePdfFileName),
  );
  console.log(
    `Resume PDF generated at ${path.join('public', resumePdfFileName)}`,
  );
}
