import * as openAI from './open-ai.js';
import { getAssetContent } from './workspace.js';

const hiringManagerMessage = `We’re looking for someone who’s not just a great developer, but also eager to contribute to our vision. If you thrive on solving complex problems, integrating cutting-edge technologies, and working in a fast-moving startup environment, we’d love to hear from you!`;

const prompts = [
  openAI.jdSystem,
  await openAI.loadPortfolioIntoPrompts(),
  await getAssetContent('jd.txt')
    .then(openAI.processJD)
    .then(openAI.loadJDIntoPrompts),
  {
    content: `${hiringManagerMessage ? `The hiring manager for this role has said the following:\n"${hiringManagerMessage}"\n\n` : ''}
Please craft a short, professional introduction message to send via Cord in **plain text format**. Focus on:
- Highlighting one or two specific skills or experiences from my portfolio that directly align with the role.
- Referencing key elements of the company’s mission, product, or values that motivate me to apply.
- Using a tone that is confident and professional, avoiding excessive enthusiasm or generic phrases like "I’m excited."
- Briefly mentioning that my portfolio is available at the following link: https://neviaumi.github.io/portfolio?utm_source=cord and highlighting what they can explore there (e.g., projects, relevant experiences).
- Offering my availability for a follow-up conversation or call.

Please ensure the output is in plain text without Markdown or formatting syntax, as Cord does not support styled text. Respond with the formatted message directly.`,
    role: 'user',
  },
];

console.log(await openAI.prompt(prompts).then(openAI.readMessageFromPrompt));
