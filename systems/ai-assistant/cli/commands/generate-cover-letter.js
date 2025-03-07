import * as openAi from './open-ai.js';
import { getAssetContent } from './workspace.js';

const jd = await getAssetContent('jd.txt');
const prompts = [
  openAi.jdSystem,
  await openAi.loadPortfolioIntoPrompts(),
  await openAi.processJD(jd).then(openAi.loadJDIntoPrompts),
  {
    content: `I will share my draft cover letter in the next prompt. 
      Please review and rewrite it using **simple and clear English** 
`,
    role: 'user',
  },
];

openAi
  .withFeedbackLoop(openAi.prompt)(prompts)
  .then(openAi.readMessageFromPrompt)
  .then(console.log);
