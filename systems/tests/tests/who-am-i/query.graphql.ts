import cms from '../cms.ts';
import { gql } from '../graphql.ts';

const query = gql`
  query WhoAmIPage {
    page(relativePath: "who-am-i.md") {
      ... on PageWhoAmI {
        coreValues {
          heading
          values {
            ... on CoreValue {
              id
              values {
                brief
                headline
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
  return cms.gqlRequest(query).then(resp => resp.data);
}
