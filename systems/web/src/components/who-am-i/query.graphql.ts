import { gql } from '../../graphql.ts';

export default gql`
  query IndexPage($relativePath: String!) {
    page(relativePath: $relativePath) {
      ... on PageWhoAmI {
        title
        coreValues {
          heading
          values {
            ... on CoreValue {
              id
              values {
                icon
                name
                brief
              }
            }
          }
        }
        id
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
        skills {
          ... on Skill {
            id
            sections {
              section
              level
            }
          }
        }
        summary {
          careerOverview
          name
          position
          profilePicture
        }
        references {
          name
          relationship
          profilePicture
          comments
        }
      }
    }
  }
`;
