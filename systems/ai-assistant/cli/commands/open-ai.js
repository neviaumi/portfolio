import OpenAI from 'openai';

import {
  loadCoreValuePage,
  loadExperiencePage,
  loadFAQPage,
  loadHomePage,
  loadSkillPage,
} from './web.js';

const apiKey = process.env['OPENAI_API_KEY'];

if (!apiKey) {
  throw new Error('OPENAI_API_KEY have to set in env');
}

const client = new OpenAI({
  apiKey,
});

export const portfolioSystem = {
  content: `You are being provided the HTML content of a personal portfolio website, divided into the following sections: 
- Home Page: Highlights key professional details and a broad introduction. 
- Skills Page: Lists and describes technical and soft skills, along with proficiency levels. 
- Experience Page: Details professional work experience, projects, and significant accomplishments. 
- Core Value Page: Features personal values and professional principles. 
- FAQ Page: Answers common questions about the professional’s work approach, availability, and more.

Process the content carefully. Once all sections are provided, confirm your readiness to assist. 

### Format Your Response in Markdown (MD):
- Use **headings** (e.g., \`#\`, \`##\`, etc.) for organization.
- Highlight important points using **bold** or *italics*.
- Use bullet points (\`-\`) or numbered lists (\`1.\`, \`2.\`) when relevant.
- Ensure your response is **professional, concise, and clear**.

Once all sections are provided, respond with a confirmation and your readiness to assist further using Markdown format.`,
  role: 'system',
};

export const jdSystem = {
  content: `You are a helpful assistant designed to process both portfolio content and job descriptions (JDs) to aid in:
1. Preparing tailored responses for job applications and interviews.
2. Generating interview introduction speeches, cover letters, and follow-up messages.
3. Aligning the user's skills, experiences, and values with the specific requirements of the job description.
You will receive a user-provided portfolio and a processed JD, structured into sections (e.g., Title, Responsibilities, Qualifications, etc.). Use both inputs to provide highly relevant and personalized assistance.`,
  role: 'system',
};

export async function prompt(messages, options) {
  const chatCompletion = await client.chat.completions.create(
    Object.assign(
      {
        messages: messages,
        model: 'gpt-4o-mini',
      },
      options ? options : undefined,
    ),
  );
  return [...messages, chatCompletion.choices[0].message];
}

export function readMessageFromPrompt(prompts) {
  const lastPrompt = prompts.slice(-1)[0];
  if (lastPrompt.role !== 'assistant') {
    throw new Error('The last prompt should be from the assistant');
  }
  return lastPrompt.content;
}

const jobDescriptionSchema = {
  // Copy from https://raw.githubusercontent.com/jsonresume/resume-schema/refs/heads/master/job-schema.json
  $schema: 'http://json-schema.org/draft-04/schema#',
  additionalProperties: true,
  definitions: {
    iso8601: {
      description: `The standardized date format.
Each section after the year is optional. Examples:
- "2023-06-29" (full date)
- "2022-12" (year and month)
- "2023" (just the year).`,
      pattern:
        '^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$',
      type: 'string',
    },
  },
  properties: {
    company: {
      description: `The company or organization hiring for this role.
Example: "Microsoft".`,
      type: 'string',
    },
    date: {
      $ref: '#/definitions/iso8601',
    },
    description: {
      description: `A general overview of the job. It explains the main responsibilities, goals, and requirements.
Example: "A role focusing on building robust, scalable web applications."`,
      type: 'string',
    },
    experience: {
      description: `The level of experience required for the job.
Examples: "Junior", "Mid-Level", "Senior".`,
      type: 'string',
    },
    location: {
      additionalProperties: true,
      description: `Details about the job's physical location.`,
      properties: {
        address: {
          description: `The full address for the job location.
Use "\\n" for multiple address lines.
Example:
"1234 Main Street\\nHinterhaus 5th Floor".`,
          type: 'string',
        },
        city: {
          description:
            "The city where the job is located. Example: 'San Francisco'.",
          type: 'string',
        },
        countryCode: {
          description: `The ISO-3166-1 ALPHA-2 country code for the location.
Example: "US", "IN", or "AU".`,
          type: 'string',
        },
        postalCode: {
          description:
            "The postal or ZIP code of the job location. Example: '94016'.",
          type: 'string',
        },
        region: {
          description: `A regional designation such as a state, province, or comparable area.
Examples: "California", "Ontario".`,
          type: 'string',
        },
      },
      type: 'object',
    },
    meta: {
      additionalProperties: true,
      description: `Metadata about this job description and schema.`,
      properties: {
        canonical: {
          description: `A URL pointing to the official version of the job description.
Example: "https://example.com/job/software-engineer".`,
          type: 'string',
        },
        lastModified: {
          description: `The date when the job description was last updated, in ISO-8601 format.
Example: "2023-06-01T10:00:00Z".`,
          type: 'string',
        },
        version: {
          description: `The schema or job description version, following semantic versioning.
Example: "v1.0.0".`,
          type: 'string',
        },
      },
      type: 'object',
    },
    qualifications: {
      additionalItems: false,
      description: `A list of required or preferred qualifications for the role.`,
      items: {
        description: `Each qualification should be listed as a separate string.
Example: "Bachelor's degree in Computer Science".`,
        type: 'string',
      },
      type: 'array',
    },
    remote: {
      description: `The level of remote work availability.
Must be one of:
- "Full" (fully remote),
- "Hybrid" (partially in-office and remote), or
- "None" (in-office only).`,
      enum: ['Full', 'Hybrid', 'None'],
      type: 'string',
    },
    responsibilities: {
      additionalItems: false,
      description: `A list of the key tasks and responsibilities for the role.`,
      items: {
        description: `Each responsibility should be listed as a separate string.
Example: "Develop scalable web applications."`,
        type: 'string',
      },
      type: 'array',
    },
    salary: {
      description: `The salary or salary range for the position, typically in text format.
Example: "$80,000 - $100,000".`,
      type: 'string',
    },
    skills: {
      additionalItems: false,
      description: `A list of professional skills required for the job. Optionally includes details such as the skill name, proficiency level, and related keywords.`,
      items: {
        additionalProperties: true,
        properties: {
          keywords: {
            additionalItems: false,
            description: `Related technologies, tools, or concepts associated with the skill.`,
            items: {
              description: `A single keyword or technology related to the skill.
Example: "React", "Node.js".`,
              type: 'string',
            },
            type: 'array',
          },
          level: {
            description: `The level of proficiency required for this skill.
Examples: "Beginner", "Intermediate", "Expert".`,
            type: 'string',
          },
          name: {
            description: `The name of the skill.
Example: "JavaScript Development".`,
            type: 'string',
          },
        },
        type: 'object',
      },
      type: 'array',
    },
    title: {
      description: `The job title as mentioned in the job description.
Example: "Software Engineer".`,
      type: 'string',
    },
    type: {
      description: `The type of employment.
Examples: "Full-time", "Part-time", or "Contract".`,
      type: 'string',
    },
  },
  title: 'Job Description Schema',
  type: 'object',
};

export async function processJD(jobDescription) {
  // Define the prompt for OpenAI
  const messages = [
    {
      content: `You are a helpful assistant that processes job descriptions (JDs) into a structured JSON object.
The response must strictly adhere to the following structure:
\`\`\`json
{
  "message": "string", // A clear and actionable summary of the processing result. Must be detailed enough for a CLI output. Examples:
                       // - "Processed successfully. Schema is complete."
                       // - "Processed with warnings. Missing fields: 'company', 'salary'."
                       // - "Error. Missing critical fields like 'title', 'company'. Job description too incomplete."
  "status": "ok | warning | error", // Indicates status: 'ok' for complete JDs, 'warning' for incomplete but usable JDs, 'error' for invalid/unusable JDs.
  "missingFields": ["field1", "field2"], // List of missing or null fields, including optional fields.
  "fieldValidation": { 
    "fieldName": "ok | missing | invalid" // Detailed validation for each field based on its presence and validity.
  },
  "schema": {} // The final structured job description strictly following the schema below. Use 'null' for missing fields.
}
\`\`\`

### Schema Description:
\`\`\`json
${JSON.stringify(jobDescriptionSchema, null, 2)}
\`\`\`

### Behavior Guidelines:

1. **Message Formatting (CLI-Friendly)**:
   - The "message" field must provide descriptive, actionable feedback for use in CLI outputs.
   - Recommended formats:
     - **For "ok" status**:
       - "All fields are present and correctly processed. Schema is complete."
       - "Processed successfully for role 'Software Engineer' at 'TechCorp'. All fields are complete."
     - **For "warning" status**:
       - "Processed successfully, but the following optional fields are missing: salary, location.address."
       - "Processed with warnings: Critical fields missing: 'company', 'title'. Add these for a complete schema."
       - "Missing 3 fields: title, company, salary. Schema generated with placeholders."
     - **For "error" status**:
       - "Error: Unable to process the job description. Missing critical fields: 'title', 'company', 'description'."
       - "Error: JD is too incomplete to generate a schema. Provide at least 'title' and 'company'."

2. **Core Field Analysis**:
   - Identify "critical fields" (e.g., 'title', 'company', 'description', 'location'). Missing critical fields should trigger:
     - Status: "warning" if it's still usable.
     - Status: "error" if the JD is too incomplete to process.

3. **Validation Output**:
   - If some fields are missing or invalid:
     - Use the "missingFields" array to list all of them.
     - For more granular feedback, populate "fieldValidation" with a status for each field (e.g., "ok", "missing", or "invalid").

4. **Schema Generation**:
   - Even if some fields are missing, generate a valid schema filled with placeholder values ('null') for missing fields.
   - Examples:
     - For a usable JD: Generate the schema and highlight missing fields in the message.
     - For incomplete/invalid JD: Return an empty or partially-filled schema with an error message.

5. **Professional and Actionable Responses**:
   - Always provide suggestions for improvement in the message for "warning" or "error" statuses.
     - Example: "Consider adding responsibilities and qualifications to make the JD more complete."
   - Use professional tone and make feedback specific to the given JD.

6. **Dynamic Feedback**:
   - Tailor the message dynamically based on the input JD:
     - Highlight missing fields by name.
     - Reference job title or company if available to provide context in the message, e.g.,:
       - "Processed successfully for the role 'Full Stack Developer'. Missing optional fields: salary, experience."`,
      role: 'system',
    },
    {
      content: `Job Description
\`\`\`text
${jobDescription}
\`\`\`
`,
      role: 'user',
    },
  ];

  // Call the OpenAI API to process the JD
  const transformedJD = await prompt(messages, {
    response_format: { type: 'json_object' },
  })
    .then(readMessageFromPrompt)
    .then(JSON.parse);

  console.log(transformedJD.message);

  // Extract the response and return it
  return JSON.stringify(transformedJD.schema, null, 2);
}

export async function loadPortfolioIntoPrompts() {
  const [homePage, skillPage, experiencePage, faqPage, coreValuePage] =
    await Promise.all([
      loadHomePage(),
      loadSkillPage(),
      loadExperiencePage(),
      loadFAQPage(),
      loadCoreValuePage(),
    ]);
  return {
    content: `Here is the HTML content from the Home Page:
\`\`\`html
${homePage}
\`\`\`
Here is the HTML content from the Skills Page:
\`\`\`html
${skillPage}
\`\`\`
Here is the HTML content from the Experience Page:
\`\`\`html
${experiencePage}
\`\`\`
Here is the HTML content from the Core Value Page:
\`\`\`html
${coreValuePage}
\`\`\`
Here is the HTML content from the FAQ Page:
\`\`\`html
${faqPage}
\`\`\`

Please confirm once you have processed the entire portfolio content.`,
    role: 'user',
  };
}

export function loadJDIntoPrompts(transformedJD) {
  return {
    content: `Here is the structured Job Description (JD):
\`\`\`json
${transformedJD}
\`\`\`
Please use this JD in combination with my portfolio to assist with job-related tasks.`,
    role: 'user',
  };
}
