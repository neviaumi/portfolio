import { print } from 'graphql';
import { gql } from 'graphql-tag';
import { fetch } from 'openai/_shims/index';

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

export function getResumeData() {
  return fetch(new URL('/graphql', cmsBaseUrl), {
    body: JSON.stringify({
      query: print(gql`
        query ResumeData {
          resume(relativePath: "resume.json") {
            basics {
              summary
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

export function getKeywordsData() {
  return fetch(new URL('/graphql', cmsBaseUrl), {
    body: JSON.stringify({
      query: print(gql`
        query ResumeData {
          resume(relativePath: "resume.json") {
            skills {
              ... on Skill {
                sections {
                  section
                  description
                  keywords {
                    level
                    name
                  }
                }
              }
            }
            projects {
              name
              description
              keywords
            }
            work {
              ... on Experience {
                id
                works {
                  detailedDescription
                  name
                  keywords
                }
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

export function gerWorkExperienceData() {
  return fetch(new URL('/graphql', cmsBaseUrl), {
    body: JSON.stringify({
      query: print(gql`
        query WorkExperienceData {
          experience(relativePath: "index.md") {
            works {
              name
              description
              period
              keywords
              brief
              role
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
