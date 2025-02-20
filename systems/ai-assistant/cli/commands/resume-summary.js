import { getHomePageData, getResumeData } from './cms.js';
import {
  loadPortfolioIntoPrompts,
  portfolioSystem,
  prompt,
  readMessageFromPrompt,
} from './open-ai.js';

const portfolioPrompts = [portfolioSystem, await loadPortfolioIntoPrompts()];
const portfolioSummary = await getHomePageData().then(
  data => data.data.page.summary.careerOverview,
);
const currentResumeSummary = await getResumeData().then(
  data => data.data.resume.basics.summary,
);
const prompts = [
  ...portfolioPrompts,
  {
    content: `I need help generating a concise, ATS-optimized **Summary** for my software engineering resume. This summary should highlight my key strengths and accomplishments, while maintaining versatility across a broad range of software engineering roles.

### Objectives:
- Present a professional and engaging tone.
- Highlight technical skills, frameworks, and methodologies I specialize in (e.g., React, Node.js, Agile).
- Emphasize qualitative achievements and avoid mentioning specific figures or results.
- Ensure the summary works across diverse industries (startups to multinational corporations) and roles.
- Limit the result to 3–5 sentences that showcase technical expertise, collaboration, and problem-solving abilities.

### Inputs:
**Portfolio Summary:** 
\`\`\`json
${JSON.stringify(portfolioSummary)}
\`\`\`

**Resume Summary:** ${currentResumeSummary}

### Example Output:
"Experienced and results-driven Software Engineer with over nine years of expertise in backend and frontend development. Skilled in building scalable, efficient applications and leveraging modern frameworks like React and Node.js. Proficient in Agile methodologies and automated testing to ensure software quality and robustness. Passionate about collaborative problem-solving and mentoring, I thrive in dynamic environments, contributing to impactful solutions across startups and multinational corporations."
`,
    role: 'user',
  },
];

console.log(await prompt(prompts).then(readMessageFromPrompt));
