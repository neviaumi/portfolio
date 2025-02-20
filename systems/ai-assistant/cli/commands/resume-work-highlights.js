import { gerWorkExperienceData } from './cms.js';
import {
  loadPortfolioIntoPrompts,
  portfolioSystem,
  prompt,
  readMessageFromPrompt,
} from './open-ai.js';

const portfolioPrompts = [portfolioSystem, await loadPortfolioIntoPrompts()];
const works = await gerWorkExperienceData()
  .then(data => data.data.experience.works)
  .then(works => works[0]);

const prompts = [
  ...portfolioPrompts,
  {
    content: `I need help creating a concise **Work Summary** and **Resume Highlights** for a resume. Please follow these instructions carefully.

### Work Experience:
\`\`\`json
${JSON.stringify(works, null, 2)}
\`\`\`

### Requirements:

1. **Work Summary**:
   - Write a concise summary (maximum 2–3 sentences, ~50 words). 
   - Focus on my key responsibilities and the role I played in achieving results.
   - Avoid overly generic terms like "helped" or "assisted"—use action-driven language to highlight responsibility and performance instead.

2. **Resume Highlights**:
   - Provide 2–3 bullet points that summarize **specific accomplishments** in this role.
   - Each bullet point must:
     - Start with an action verb (e.g., Designed, Developed, Optimized).
     - Focus on **demonstrating impact** (e.g., "improved processing workflows," "enhanced accessibility"), without relying on unverifiable or made-up numerical figures.
     - Use **qualitative descriptors** (e.g., "significant," "notable," "marked improvement") if there are no exact figures available for results.
     - Mention relevant tools, technologies, or skills used, if applicable.
   - Be concise and professional (maximum 1–2 lines per bullet point).

### Example Format for Highlights:

- Designed and implemented [X feature or system], using [Y tools/technologies], improving [area of impact, e.g., system performance or user experience].
- Optimized [specific process/task], resulting in notable improvements to [e.g., productivity, reliability, user satisfaction].

### Tone and Style:
- The output should suit a professional software engineering resume: brief, result-oriented, and free of redundant over-explanation.

### Deliverable:
#### Work Summary:
[Provide 2–3 concise sentences summarizing my responsibilities.]

#### Resume Highlights:
[Provide 2–3 concise, impact-driven bullet points.]`,
    role: 'user',
  },
];

console.log(await prompt(prompts).then(readMessageFromPrompt));
