import cms from '../cms.ts';
import { gql } from '../graphql.ts';

const query = gql`
  query IndexPage($relativePath: String!) {
    page(relativePath: $relativePath) {
      ... on PageWhoAmI {
        coreValues {
          heading
          values {
            ... on CoreValue {
              id
              values {
                brief
                icon
                name
              }
            }
          }
        }
        experiences {
          ... on Experience {
            id
            works {
              brief
              name
              role
            }
          }
        }
        id
        references {
          comments
          name
          profilePicture
          relationship
        }
        skills {
          ... on Skill {
            id
            sections {
              level
              section
            }
          }
        }
        summary {
          careerOverview
          name
          position
          profilePicture
        }
        title
      }
    }
  }
`;

export function replicateFrontendCMSQuery() {
  return cms
    .gqlRequest(query, {
      relativePath: 'who-am-i.md',
    })
    .then(resp => resp.data);
}
