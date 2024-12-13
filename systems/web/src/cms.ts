import { gql, formatGqlQuery } from './graphql';
function gqlRequest(query: ReturnType<typeof gql>, variables?: any) {
  return fetch('http://localhost:4001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: formatGqlQuery(query),
      variables,
    }),
  }).then(res => res.json());
}

export default { gqlRequest };
