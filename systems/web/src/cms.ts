import { access, constants, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { client } from '../../cms/tina/__generated__/client.ts';
import { formatGqlQuery, gql } from './graphql.ts';

const currentDir = path.parse(fileURLToPath(import.meta.url)).dir;
console.log(currentDir);
// const cmdEndpoint = import.meta.env.WEB_CMS_ENDPOINT;
// if (!cmdEndpoint) {
//   throw new Error('WEB_CMS_ENDPOINT is not defined');
// }
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

function locatedFromLocalFolder(src: string) {
  return path.join(currentDir, 'assets', src);
}

export default { copyAssetsToLocalFolder, gqlRequest, locatedFromLocalFolder };
