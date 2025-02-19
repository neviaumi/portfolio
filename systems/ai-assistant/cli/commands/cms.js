import { print } from 'graphql';
import { gql } from 'graphql-tag';

const cmsBaseUrl = 'http://localhost:4001';
export function getHomePageData() {
  return fetch(new URL('/graphql', cmsBaseUrl), {
    body: JSON.stringify({
      query: print(gql`
        query WhoAmIPage {
          page(relativePath: "who-am-i.md") {
            ... on PageWhoAmI {
              id
              summary {
                careerOverview
                name
                position
                profilePicture
              }
            }
          }
        }
      `),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => res.json());
}
