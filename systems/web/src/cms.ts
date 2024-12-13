import { formatGqlQuery, gql } from './graphql.ts';

function gqlRequest(query: ReturnType<typeof gql>, variables?: any) {
  return fetch('http://localhost:4001/graphql', {
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
