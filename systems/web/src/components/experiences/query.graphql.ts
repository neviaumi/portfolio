import { gql } from '../../graphql.ts';

export type Work = {
  detailedDescription: string;
  location: string;
  name: string;
  period: string;
  portfolioIntro: string;
  role: string;
  workReferences: {
    references: {
      comments: string;
      id: string;
      name: string;
      profilePicture: string;
      relationship: string;
    };
  }[];
};

export default gql`
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
