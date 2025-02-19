import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { formatGqlQuery, gql } from './graphql.ts';

export { TinaMarkdown as RichTextMarkdown } from 'tinacms/dist/rich-text';

const currentDir = path.parse(fileURLToPath(import.meta.url)).dir;
const cmsBaseURL = process.env['WEB_CMS_BASE_URL'];
if (!cmsBaseURL) {
  throw new Error('WEB_CMS_BASE_URL is not defined');
}

function gqlRequest(query: ReturnType<typeof gql>, variables?: any) {
  return fetch(new URL('/graphql', cmsBaseURL), {
    body: JSON.stringify({
      query: formatGqlQuery(query),
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async res => {
    return res.json();
  });
}

async function copyAssetToPublicFolder(src: string) {
  const localDestination = path.join(currentDir, '../', 'public', src);
  await mkdir(path.parse(localDestination).dir, { recursive: true });
  await writeFile(
    localDestination,
    await fetch(new URL(src, cmsBaseURL))
      .then(res => res.arrayBuffer())
      .then(Buffer.from),
  );
}

export default {
  copyAssetToPublicFolder,
  gqlRequest,
};
