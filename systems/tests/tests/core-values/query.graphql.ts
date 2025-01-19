import cms from '../cms.ts';
import { gql } from '../graphql.ts';

const query = gql`
  query CoreValuesPage {
    page(relativePath: "core-values.md") {
      ... on PageCoreValues {
        id
        title
        values {
          ... on CoreValue {
            id
            values {
              description
              footer
              headline
              icon
              name
              star {
                action
                result
                situation
                task
              }
            }
          }
        }
        whatAreCoreValues
      }
    }
  }
`;

export function replicateFrontendCMSQuery() {
  return cms.gqlRequest(query).then(resp => resp.data);
}
