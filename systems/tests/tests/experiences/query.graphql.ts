import cms from '../cms.ts';
import { gql } from '../graphql.ts';

const query = gql`
  query ExperiencesPage {
    page(relativePath: "experiences.md") {
      ... on PageExperiences {
        experiencesRef {
          ... on Experience {
            id
            works {
              detailedDescription
              location
              name
              period
              portfolioIntro
              role
              workReferences {
                references {
                  ... on References {
                    comments
                    id
                    name
                    profilePicture
                    relationship
                  }
                }
              }
            }
          }
        }
        id
        title
      }
    }
  }
`;

export function replicateFrontendCMSQuery() {
  return cms.gqlRequest(query).then(resp => resp.data);
}
