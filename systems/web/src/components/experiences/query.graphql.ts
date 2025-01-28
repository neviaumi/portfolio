import { gql } from '../../graphql.ts';

export type Work = {
  brief: string;
  description: string;
  location: string;
  name: string;
  period: string;
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
              brief
              description
              location
              name
              period
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
