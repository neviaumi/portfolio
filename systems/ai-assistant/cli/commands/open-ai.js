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

export async function processJD(rawJobDescription) {
  // Define the prompt for OpenAI
  const messages = [
    {
      content: `You are a helpful assistant that processes job descriptions (JDs) into a structured format. 
Given a raw text job description, your output should be grouped into the following sections:
1. Title: The job title mentioned in the JD.
2. Responsibilities: The list of specific role-related tasks and goals.
3. Qualifications: Key qualifications, requirements, or skills the candidate should have.
4. Company Info: Information about the company culture, goals, or additional context.
5. Other: Any other details that don’t fit into the categories above but might still be important.

If a section is not explicitly mentioned, infer where appropriate or leave it empty. Make sure your output is clean and easy to process. Answer only with the structured JD format without adding anything extra.`,
      role: 'system',
    },
    {
      content: `Here is the Job Description (JD):
${rawJobDescription}
Please extract and format the content as described.`,
      role: 'user',
    },
  ];

  // Call the OpenAI API to process the JD
  const transformedJD = await prompt(messages);

  // Extract the response and return it
  return readMessageFromPrompt(transformedJD);
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
\`\`\`text
${transformedJD}
\`\`\`
Please use this JD in combination with my portfolio to assist with job-related tasks.`,
    role: 'user',
  };
}
