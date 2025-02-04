import { gql } from '../../graphql.ts';

export default gql`
  query SkillsPage {
    page(relativePath: "skills.md") {
      ... on PageSkills {
        id
        skillsRef {
          ... on Skill {
            id
            sections {
              description
              section
              tags
            }
          }
        }
        title
      }
    }
  }
`;
