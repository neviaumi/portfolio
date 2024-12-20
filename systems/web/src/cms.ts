import { getImage } from 'astro:assets';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { client } from '../../cms/tina/__generated__/client.ts';
import { formatGqlQuery, gql } from './graphql.ts';

const currentDir = path.parse(fileURLToPath(import.meta.url)).dir;

function gqlRequest(query: ReturnType<typeof gql>, variables?: any) {
  return client.request(
    {
      query: formatGqlQuery(query),
      variables,
    },
    {},
  );
}

async function copyAssetToPublicFolder(src: string) {
  const localDestination = path.join(currentDir, '../', 'public', src);
  await mkdir(path.parse(localDestination).dir, { recursive: true });
  await writeFile(
    localDestination,
    await fetch(new URL(src, client.apiUrl))
      .then(res => res.arrayBuffer())
      .then(Buffer.from),
  );
}

export default {
  copyAssetToPublicFolder,
  gqlRequest,
};
