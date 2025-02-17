import * as openAI from './open-ai.js';

const prompts = await openAI.loadPortfolioIntoPrompts().then(prompt => [
  openAI.portfolioSystem,
  prompt,
  {
    content: `Now you got all information about me from the portfolio website.

Do you think the summary on my home page is good enough?
`,
    role: 'user',
  },
]);
console.log(await openAI.prompt(prompts).then(openAI.readMessageFromPrompt));
