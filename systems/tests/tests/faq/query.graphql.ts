import cms from '../cms.ts';
import { gql } from '../graphql.ts';

const query = gql`
  query FAQPage {
    page(relativePath: "faq.md") {
      ... on PageFaq {
        id
        questions {
          answer
          group
          question
        }
        title
      }
    }
  }
`;

export function replicateFrontendCMSQuery() {
  return cms.gqlRequest(query).then(resp => resp.data);
}
