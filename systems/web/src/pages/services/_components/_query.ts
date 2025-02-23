import { gql } from '../../../graphql.ts';

export default gql`
  query ServicePage {
    page(relativePath: "services.md") {
      ... on PageServices {
        gigs {
          link
          thumbnail
          title
        }
        id
        overview
        title
      }
    }
  }
`;
