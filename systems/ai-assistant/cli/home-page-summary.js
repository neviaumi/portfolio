import * as openAI from './open-ai.js';

const prompts = await openAI.loadPortfolioIntoPrompts().then(prompts => [
  ...prompts,
  {
    content: `Now you got all information about me from the portfolio website.

Do you think the summary on my home page is good enough?

Current summary:
\`\`\`text
I began my career in 2014 as a Web Developer for a small local business, later expanding my experience across diverse environments, from tech startups to multinational corporations. Over the years, I’ve grown technically and reshaped my perspective on work, striving to create balance and purpose in my professional life. Initially, I focused on crafting overengineered solutions that anticipated every possible scenario—even those unlikely to occur. Through experience, I learned that simplicity, combined with automated testing, is key to creating scalable, maintainable systems that can evolve over time. Midway through my journey, I embraced Agile methodology, which introduced an iterative, feedback-driven approach to development. Delivering features incrementally enables faster validation and refinement, avoiding the pitfalls of building a product nobody wants. However, effective Agile relies on transparent communication—teams must uphold the definition of “done,” resist unreasonable timelines, and openly discuss technical concerns with product owners. Throughout my journey, I’ve remained committed to building meaningful solutions that align with business goals, always seeking to combine technical excellence with practical impact.
\`\`\`
`,
    role: 'user',
  },
]);
console.log(await openAI.prompt(prompts).then(openAI.readMessageFromPrompt));
