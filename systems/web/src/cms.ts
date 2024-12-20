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

async function copyAssetsToLocalFolder(src: string) {
  const localDestination = path.join(currentDir, 'assets', src);
  await mkdir(path.parse(localDestination).dir, { recursive: true });
  await writeFile(
    localDestination,
    await fetch(new URL(src, client.apiUrl))
      .then(res => res.arrayBuffer())
      .then(Buffer.from),
  );
}

function locatedFilePathFromLocalFolder(src: string) {
  return path.join(currentDir, 'assets', src);
}

function resolveUrlFromLocalImageFilePath(
  src: string,
  { height, width }: { height: number; width: number },
) {
  return getImage({
    height,
    src: import(
      /* @vite-ignore */
      src
    ),
    width,
  }).then(image => image.src);
}

export default {
  copyAssetsToLocalFolder,
  gqlRequest,
  locatedFilePathFromLocalFolder,
  resolveUrlFromLocalImageFilePath,
};
