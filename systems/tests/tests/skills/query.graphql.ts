import cms from '../cms.ts';
import { gql } from '../graphql.ts';

const query = gql`
  query SkillsPage {
    page(relativePath: "skills.md") {
      ... on PageSkills {
        id
        skillsRef {
          ... on Skill {
            id
            sections {
              description
              keywords {
                name
              }
              section
            }
          }
        }
        title
      }
    }
  }
`;

export function replicateFrontendCMSQuery() {
  return cms.gqlRequest(query).then(resp => resp.data);
}
