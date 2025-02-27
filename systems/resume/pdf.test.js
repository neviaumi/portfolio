import { createRequire } from 'node:module';
import { expect, it } from 'vitest';

import { PUBLIC_FOLDER } from './workspace.js';

process.getBuiltinModule = createRequire(import.meta.url);

function withFromAsync(_Array) {
  _Array.fromAsync = async function fromAsync(iterable) {
    const result = [];
    for await (const item of iterable) {
      result.push(item);
    }
    return result;
  };
  return _Array;
}

it('Test PDF content', async () => {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const document = await getDocument(`${PUBLIC_FOLDER}/resume.pdf`).promise;
  const fullText = (
    await withFromAsync(Array).fromAsync(
      Array.from({ length: document.numPages }).map(async (_, i) => {
        return document
          .getPage(i + 1)
          .then(page => page.getTextContent())
          .then(textContent =>
            textContent.items.map(item => item.str).join(' '),
          );
      }),
    )
  ).join('\n');
  expect(fullText.length).toBeGreaterThan(0);
});

it('Test ATS Resume PDF content', async () => {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const document = await getDocument(`${PUBLIC_FOLDER}/ats-resume.pdf`).promise;
  const fullText = (
    await withFromAsync(Array).fromAsync(
      Array.from({ length: document.numPages }).map(async (_, i) => {
        return document
          .getPage(i + 1)
          .then(page => page.getTextContent())
          .then(textContent =>
            textContent.items.map(item => item.str).join('\n'),
          );
      }),
    )
  ).join('\n\n');
  console.log(fullText);
  expect(fullText.length).toBeGreaterThan(0);
});
