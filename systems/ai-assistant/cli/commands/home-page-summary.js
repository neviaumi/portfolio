import { getHomePageData } from './cms.js';
import * as openAI from './open-ai.js';

const currentSummary = await getHomePageData().then(
  data => data.data.page.summary.careerOverview,
);

const prompts = [
  openAI.portfolioSystem,
  await openAI.loadPortfolioIntoPrompts(),
  {
    content: `You now have all the information about me based on my portfolio website. I need your help crafting a professional, engaging, and well-structured home page summary for my portfolio.

Here is the current home page summary:
\`\`\`text
${currentSummary}
\`\`\`

### Key Objectives:
1. Start by describing my current career status honestly but professionally, using an optimistic and resilient tone. Avoid overly negative language like "series of bad moves" or "zugzwang phase," as I want to inspire confidence and show self-awareness.
2. Include concise information about what readers can expect from my portfolio website:
   - The showcase of my skills and experiences.
   - The integration of an AI assistant to help users quickly find relevant information.
3. End with a confident career overview that highlights my expertise, values, and the kind of opportunities I am looking for.

### Additional Context:
I am currently unemployed but open to any development opportunity, aiming to regain traction in my career. I’m willing to accept £25,000 annually as a starting salary, but this point should not dominate the narrative—showing my value should take priority. Flexibility in salary can be mentioned subtly later in the summary.

Your response should be clear, professional, and tailor the message for a first impression to employers, collaborators, or other visitors. Keep the tone positive while showcasing my strengths and readiness for new challenges.

The result should be a final summary that inspires trust, demonstrates my value, and invites opportunities.

Let me know if you need further clarification or refinement.`,
    role: 'user',
  },
];

console.log(await openAI.prompt(prompts).then(openAI.readMessageFromPrompt));
