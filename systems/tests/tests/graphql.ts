import { print } from 'graphql';
import { gql } from 'graphql-tag';

export { gql } from 'graphql-tag';

export function formatGqlQuery(query: ReturnType<typeof gql>) {
  return print(query);
}
