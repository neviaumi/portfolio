import { formatGqlQuery, gql } from './graphql.ts';

const cmsEndpoint = process.env['TESTS_CMS_ENDPOINT'];
if (!cmsEndpoint) {
  throw new Error('TESTS_CMS_ENDPOINT is not defined');
}

function gqlRequest(query: ReturnType<typeof gql>, variables?: unknown) {
  return fetch(cmsEndpoint!, {
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
