import cms from '../cms.ts';
import { gql } from '../graphql.ts';

const query = gql`
  query Resume {
    resume(relativePath: "resume.json") {
      basics {
        email
        image
        label
        location {
          countryCode
          region
        }
        name
        phone
        profiles {
          network
          url
          username
        }
        summary
        url
      }
      colleagueReferences {
        ... on ResumeColleagueReferences {
          references {
            ... on References {
              comments
              id
              name
              relationship
            }
          }
        }
      }
      education {
        area
        endDate
        institution
        startDate
        studyType
        url
      }
      id
      languages {
        fluency
        language
      }
      projects {
        description
        highlights
        keywords
        name
        url
      }
      skills {
        ... on Skill {
          id
          sections {
            keywords {
              level
              name
            }
            section
          }
        }
      }
      work {
        ... on Experience {
          id
          works {
            resumeSummary
            highlights
            keywords
            location
            name
            period
            role
            url
          }
        }
      }
    }
  }
`;

function transformResumeJSON(input) {
  const output = {
    $schema:
      'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      // Take it out.
      birthday: '1990/10/28',
      email: input.basics.email,
      image: input.basics.image,
      label: input.basics.label,
      location: input.basics.location,
      name: input.basics.name,
      picture: input.basics.image,
      profiles: input.basics.profiles,
      summary: input.basics.summary,
      website: input.basics.url,
    },
    education: input.education.map(
      ({ area, endDate, institution, startDate, studyType, url }) => ({
        area,
        endDate,
        institution,
        startDate,
        studyType,
        url,
      }),
    ),
    languages: input.languages.map(({ fluency, language }) => ({
      fluency,
      language,
    })),
    projects: input.projects.map(
      ({ description, highlights, keywords, name, url }) => ({
        description,
        highlights,
        keywords,
        name,
        url,
      }),
    ),
    references: input.colleagueReferences.map(
      ({ references: { comments, name, relationship } }) => ({
        name: `${name}, ${relationship}`,
        reference: comments,
      }),
    ),
    skills: Object.values(
      input.skills.sections.reduce((acc, { keywords, section }) => {
        keywords.forEach(({ level, name }) => {
          const key = `${section}-${level}`;
          if (!acc[key]) {
            acc[key] = {
              keywords: [],
              level: level,
              name: section,
            };
          }
          acc[key].keywords.push(name);
        });
        return acc;
      }, {}),
    ),
    work: input.work.works.map(
      ({
        highlights,
        keywords,
        location,
        name,
        period,
        resumeSummary,
        role,
        url,
      }) => ({
        company: name,
        endDate: period.split('-')[1].trim(),
        highlights: highlights,
        keywords,
        location,
        position: role,
        startDate: period.split('-')[0].trim(),
        summary: resumeSummary,
        url: url,
        website: url,
      }),
    ),
  };
  return output;
}

export const GET = async () => {
  const response = await cms.gqlRequest(query);
  // Dynamically generate or fetch the JSON
  const result = transformResumeJSON(response.data.resume);

  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
