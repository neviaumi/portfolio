import { getKeywordsData } from './cms.js';
import {
  loadPortfolioIntoPrompts,
  portfolioSystem,
  prompt,
  readMessageFromPrompt,
} from './open-ai.js';

const existingSkills = await fetch(
  'https://neviaumi.github.io/resume.json/resume.base.json',
)
  .then(res => res.json())
  .then(data => data.skills);

const keywordData = await getKeywordsData().then(data => data.data.resume);
const cmsDefinedKeywords = {
  projects: keywordData.projects,
  skills: keywordData.skills.sections,
  works: keywordData.work.works,
};

const prompts = [
  portfolioSystem,
  await loadPortfolioIntoPrompts(),
  {
    content: `I currently have raw skill data from two sources: my resume and portfolio. Below are the raw data sources:

  Here is the keyword data from my resume:
  \`\`\`json
  ${JSON.stringify(existingSkills, null, 2)}
  \`\`\`

  Here is the keyword data from my portfolio:
  \`\`\`json
  ${JSON.stringify(cmsDefinedKeywords, null, 2)}
  \`\`\`

  I also have the following skill level definitions:

  - **Programming Language / Framework / Library**:
    - **Master**: I can confidently work on features independently without needing extensive research, while following best practices.
    - **Intermediate**: I can work on features independently with some research but need an experienced teammate to review my code.

  - **Architecture Components (Queues, Databases, etc.)**:
    - **Master**: In addition to integrating components in code, I can also set up optimized configurations and deploy them to production.
    - **Intermediate**: I can integrate components from application code and understand integration patterns, along with a basic development setup.

  - **Protocols (REST, HTTP, GraphQL, etc.)**:
    - **Master**: I understand best practices, can defend against security attacks, and handle performance tuning.
    - **Intermediate**: I can integrate the protocol into applications and understand how it works.

  - **Workflow**:
    - **Master**: I can explain theory and real-world applications in technical discussions while handling execution independently.
    - **Intermediate**: I understand theoretical concepts and have practical execution experience.

  ### Task Requirements:

  Here's what I need your help with:
  
  1. **Unify the keywords** from the two sources (my resume and portfolio) into a **single structure**.
  2. Ensure consistent categorization and **assign a skill level** to each keyword using the provided definitions.
  3. Group the keywords into **broader domain** under each skill where relevant. For example:
     - The specific tool \`PostgreSQL\` should fall under the broader domain \`Relational Database\`.
     - The specific tool \`RabbitMQ\` should fall under the broader domain \`Message Broker\`.

  ### Grouping and Sections:

  Once unified, **group the skills** into the following five sections. Each keyword can now have **three fields** (\`name\`, \`level\`, and \`domain\`) in the final output:

    - **Backend Developer**:
      This should include keywords/tools related to backend technologies like Node.js, databases (PostgreSQL, MongoDB), APIs (REST, GraphQL), queuing systems (RabbitMQ), Microservices, etc. Sub-groups might include categories like:
        - Relational Database
        - NoSQL Database
        - Message Broker
        - API Protocols
      
    - **Web Frontend Development**:
      Include frontend frameworks/libraries like React, Astro, and tools for styling (CSS, TailwindCSS, Styled Components). Sub-groups might include categories like:
        - Frontend Frameworks
        - Styling
        - Design Tools

    - **Automated Testing**:
      Include all testing concepts and tools, such as Jest, Playwright, Cypress, Unit Testing, Integration Testing, etc. Sub-groups might include categories like:
        - Testing Frameworks
        - Testing Concepts

    - **Infrastructure**:
      Include deployment and CI/CD tools like Docker, GitHub Actions, AWS, Pulumi, CI/CD platforms, and cloud services. Sub-groups might include categories like:
        - Cloud Platforms
        - CI/CD Pipelines
        - Containerization

    - **Agile Team Collaborate**:
      This section should list team collaboration and soft skills such as Agile, Scrum, Retrospectives, etc. Sub-groups can include:
        - Team Collaboration
        - Development Practices
        - Team Workflows

  The **final JSON structure** should look like this:

  \`\`\`json
  {
    "sections": [
      {
        "name": "<Section Name>",
        "keywords": [
          {
            "name": "<Skill Name>",
            "level": "<Skill Level>",
            "domain": "<Domain>"
          }
        ]
      }
    ]
  }
  \`\`\`

  Please make sure the output adheres to this JSON format. Categorize and assign domain where it makes sense to maintain clarity. Keywords without a relevant sub-group (e.g., Microservices) should have \`null\` as the sub-group value.

  `,
    role: 'user',
  },
];

const attempts = [];

for (let i = 0; i < 8; i++) {
  await prompt(prompts, {
    response_format: { type: 'json_object' },
  })
    .then(readMessageFromPrompt)
    .then(JSON.parse)
    .then(result => {
      attempts.push(result);
    });
}

await prompt(
  [
    {
      content: `You are a highly skilled and precise JSON data processor. Your role is to consolidate and unify multiple JSON objects containing skill data while adhering to the following rules:

### Rules:
1. **Section Consolidation**:
   - Combine all matching sections across multiple JSON objects (e.g., "Backend Developer", "Web Frontend Development").
   - Ensure sections do not duplicate and all related skills are merged under the correct section.

2. **Keyword Deduplication**:
   - A keyword is considered **duplicate** if:
     - Its \`name\`, \`level\`, and \`domain\` fields are identical.
   - If duplicates exist with conflicting \`level\` values (e.g., "Master" and "Intermediate"):
     - Retain the keyword with the **higher skill level** ("Master" > "Intermediate").
   - If duplicates exist with conflicting \`domain\` values:
     - Retain the most specific or common \`domain\`, based on context.

3. **Output Structure**:
   - Ensure that all skills are grouped under the correct section and maintain this final JSON structure:
   \`\`\`json
   {
     "sections": [
       {
         "name": "<Section Name>",
         "keywords": [
           {
             "name": "<Skill Name>",
             "level": "<Skill Level>",
             "domain": "<Domain>"
           }
         ]
       }
     ]
   }
   \`\`\`

4. **Preserve Hierarchies and Consistency**:
   - Handle hierarchies like "domain" intelligently to retain clear categorizations under each section (e.g., \`PostgreSQL\` -> "Relational Database").

You must always follow these rules and ensure the output is a single, deduplicated, and consistent JSON object.`,
      role: 'system',
    },
    {
      content: `Here are 8 separate JSON objects that contain my previous skill data attempts. I need you to summarize and consolidate them into a single, unified JSON output while following the rules provided in your System prompt.

### Input JSON Objects:
\`\`\`json
${JSON.stringify(attempts, null, 2)}
\`\`\`

### Task:

1. **Section Consolidation**:
   - Combine identical sections (e.g., "Backend Developer", "Web Frontend Development") from all attempts.

2. **Keyword Deduplication**:
   - Ensure no duplicate keywords exist.
   - Handle conflicts in **level** by retaining the higher level: "Master" > "Intermediate".
   - Handle conflicts in **domain** intelligently by retaining the most specific or consistent value.

3. **Final Output Format**:
   - Organize the skills into sections exactly as in the input.
   - Maintain the correct structure:
   \`\`\`json
   {
     "sections": [
       {
         "name": "<Section Name>",
         "keywords": [
           {
             "name": "<Skill Name>",
             "level": "<Skill Level>",
             "domain": "<Domain>"
           }
         ]
       }
     ]
   }
   \`\`\`

Please consolidate and provide the final summary JSON.`,
      role: 'user',
    },
  ],
  {
    response_format: { type: 'json_object' },
  },
)
  .then(readMessageFromPrompt)
  .then(console.log);
