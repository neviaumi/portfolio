import { gql } from '../../graphql.ts';

export default gql`
  query CoreValuesPage {
    page(relativePath: "core-values.md") {
      ... on PageCoreValues {
        id
        title
        values {
          ... on CoreValue {
            id
            values {
              description
              footer
              headline
              icon
              name
              star {
                action
                result
                situation
                task
              }
            }
          }
        }
        whatAreCoreValues
      }
    }
  }
`;
