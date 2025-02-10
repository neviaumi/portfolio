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

export async function loadPortfolioIntoPrompts() {
  const [homePage, skillPage, experiencePage, faqPage, coreValuePage] =
    await Promise.all([
      loadHomePage(),
      loadSkillPage(),
      loadExperiencePage(),
      loadFAQPage(),
      loadCoreValuePage(),
    ]);
  return [
    {
      content: `You will receive the content of a portfolio website in html format. 
Please process the html and understand it. Afterward, i will ask you questions and you get the answers from that content.`,
      role: 'system',
    },
    {
      content: `Here is the html content from home page:
\`\`\`html
${homePage}
\`\`\``,
      role: 'user',
    },
    {
      content: `Here is the html content from skills page:
\`\`\`html
${skillPage}
\`\`\``,
      role: 'user',
    },
    {
      content: `Here is the html content from experience page:
\`\`\`html
${experiencePage}
\`\`\``,
      role: 'user',
    },
    {
      content: `Here is the html content from core-value page:
\`\`\`html
${coreValuePage}
\`\`\``,
      role: 'user',
    },
    {
      content: `Here is the html content from FAQ page:
\`\`\`html
${faqPage}
\`\`\``,
      role: 'user',
    },
  ];
}
