import { scheduler } from 'node:timers/promises';

import * as openAI from './open-ai.js';

async function disStillAIResponse(results) {
  // Distillation Logic: Prepares the AI prompt to summarize multiple AI responses
  const prompts = [
    {
      content: `You are a career coach AI specialized in analyzing multiple suggestions for job filters and identifying the best possible configuration. Focus on ensuring relevance and confidence, and structure your response effectively.`,
      role: 'system',
    },
    {
      content: `
Here are multiple recommendations for LinkedIn job filters based on my portfolio and preferences:
${JSON.stringify(results, null, 2)}

Your task is to:
1. Analyze and summarize the key points across all suggestions.
2. Highlight the most practical job titles, locations, industries, and keywords.
3. Organize the final filter into clear sections with actionable recommendations.
4. If the suggestions contradict each other, prioritize the most realistic and widely applicable options.

Please provide a well-structured and easy-to-follow summary of the optimized LinkedIn job filter.
    `,
      role: 'user',
    },
  ];

  // Use AI to summarize (simulate response for now)
  return await openAI.prompt(prompts).then(openAI.readMessageFromPrompt);
}
const devPrompts = [
  openAI.portfolioSystem,
  await openAI.loadPortfolioIntoPrompts(),
  {
    content: `Act as a LinkedIn job search assistant. Create a LinkedIn-compatible Boolean search string for **entry-level to mid-level development roles**, factoring in the following updated preferences:

1. **Job Titles**:
   - Include both entry-level and mid-level job titles:
     "Frontend Developer", "Junior Frontend Developer", "Backend Developer", 
     "Junior Backend Developer", "Full Stack Developer", "Junior Full Stack Developer", "Software Engineer".

2. **Skills/Technologies** (Optional in Search String):
   - React, TypeScript, Node.js, JavaScript, Python.  

3. **Exclusions**:
   - Exclude senior and advanced-level positions, such as:
     "Lead", "Architect", "Principal".

---

### Instructions for Boolean:
- Combine the job titles, exclusions, and optional technologies into a concise Boolean search string.
- Ensure it reflects the **entry-to-mid-level scope** appropriately.
- Use logical operators like **OR**, **AND**, and parentheses to ensure compatibility with LinkedIn job searches.
- Avoid overcomplicating the Boolean search, and aim for flexibility while focusing on relevant roles.
`,
    role: 'user',
  },
];

const qaPrompts = [
  openAI.portfolioSystem,
  await openAI.loadPortfolioIntoPrompts(),
  {
    content: `Act as a LinkedIn job search assistant. Generate a Boolean search string for **entry-level QA roles** based only on the candidate's preferred job titles and the exclusion of senior/advanced positions.  
Ignore skills, tools, or programming languages in the search.  

---

### Candidate Details:

1. **Job Titles to Include**:
   - "QA Engineer", "Junior QA Engineer", "QA Analyst", "Software Tester", "QA Tester", 
     "Test Engineer", "Quality Assurance Engineer", "Entry Level QA", "Software QA Engineer".

2. **Exclusions**:
   - Exclude roles with "Senior", "Lead", "Principal", "Advanced", "Sr.", "Lead QA", 
     "Senior Software", or "Lead Software."

---

### Goals for the Boolean Search String:
- Focus solely on entry-level QA job titles and seniority exclusions.
- Do not include skills, tools, or programming languages in the resulting Boolean string.

Provide a Boolean string optimized for LinkedIn job search without any mention of technical skills or tools.
`,
    role: 'user',
  },
];

const devOpsPrompts = [
  openAI.portfolioSystem,
  await openAI.loadPortfolioIntoPrompts(),
  {
    content: `Act as a LinkedIn job search assistant. Create a **Boolean search string** to find entry-level DevOps roles with responsibilities that include **Infrastructure as Code (IaC)**, **CI/CD pipeline configuration**, and **infrastructure automation**.

### Objectives:
1. **Job Titles**:
   - Include broader job titles relevant to entry-level DevOps and related responsibilities:
     - "DevOps Engineer", "Cloud Engineer", "Infrastructure Engineer", "Platform Engineer", "Site Reliability Engineer (SRE)", "Build Engineer", "Release Engineer", and "Automation Engineer".
     - Optional but useful titles: "Junior Engineer", "Entry-Level Engineer", and "Support Engineer".

2. **Primary Focus**:  
   - Ensure the Boolean search captures roles involving:
     - **IaC**: Using tools like Terraform, Pulumi, or CloudFormation.
     - **CI/CD Pipelines**: Configuring and automating integration and delivery workflows.

3. **Keywords/Skills**:
   - Add relevant high-level terms to ensure results reflect the desired responsibilities:
     - "IaC", "Infrastructure as Code", "CI/CD", "continuous integration", "continuous delivery", "automation", "cloud infrastructure", "orchestration", "terraform".
   - Avoid overfitting by keeping keywords at a general level rather than focusing on niche tooling unless explicitly needed.

4. **Exclusions**:
   - Filter out senior/high-level roles and unrelated positions by excluding terms like:
     - "Senior", "Lead", "Principal", "Architect", "Staff Engineer", "Manager", or "Technical Lead".

5. **Goal**:
   - Provide a Boolean search string that is **LinkedIn-compatible** and balances **breadth** (to find more opportunities) and **relevance** (to match IaC/CI/CD-focused responsibilities for less experienced candidates).
   - Keep the search string concise and practical for direct use.

---

### Deliverable:
Generate a Boolean search string to maximize results for **entry-level DevOps roles** while emphasizing tasks like **IaC**, **CI/CD pipelines**, and **infrastructure automation**. Ensure the search captures a wide range of relevant job titles and responsibilities while filtering out senior or unrelated roles.`,
    role: 'user',
  },
];

console.log(`Development search string:`);
console.log('-'.repeat(64));
console.log(
  await Promise.all(
    Array.from({ length: 4 }).map(() =>
      openAI.prompt(devPrompts).then(openAI.readMessageFromPrompt),
    ),
  ).then(disStillAIResponse),
);
await scheduler.wait(60000);

console.log(`Entry QA search string:`);
console.log('-'.repeat(64));
console.log(
  await Promise.all(
    Array.from({ length: 4 }).map(() =>
      openAI.prompt(qaPrompts).then(openAI.readMessageFromPrompt),
    ),
  ).then(disStillAIResponse),
);
await scheduler.wait(60000);

console.log(`Entry Devops search string:`);
console.log('-'.repeat(64));
console.log(
  await Promise.all(
    Array.from({ length: 4 }).map(() =>
      openAI.prompt(devOpsPrompts).then(openAI.readMessageFromPrompt),
    ),
  ).then(disStillAIResponse),
);
await scheduler.wait(60000);
