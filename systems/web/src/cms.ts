import { formatGqlQuery, gql } from './graphql.ts';

const cmdEndpoint = import.meta.env.WEB_CMS_ENDPOINT;
if (!cmdEndpoint) {
  throw new Error('WEB_CMS_ENDPOINT is not defined');
}
function gqlRequest(query: ReturnType<typeof gql>, variables?: any) {
  return fetch(cmdEndpoint, {
    body: JSON.stringify({
      query: formatGqlQuery(query),
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => res.json());
}

export default { gqlRequest };
