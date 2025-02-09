import { gql } from '../../graphql.ts';

export default gql`
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
