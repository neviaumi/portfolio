import { formatGqlQuery, gql } from './graphql.ts';

const cmsBaseUrl = process.env['TESTS_CMS_BASE_URL'];
if (!cmsBaseUrl) {
  throw new Error('TESTS_CMS_BASE_URL is not defined');
}

function gqlRequest(query: ReturnType<typeof gql>, variables?: unknown) {
  return fetch(new URL('/graphql', cmsBaseUrl), {
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

export default { gqlRequest };
