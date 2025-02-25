import * as openAi from './open-ai.js';
import { getAssetContent } from './workspace.js';

const jd = getAssetContent('jd.txt');
const prompts = [
  openAi.jdSystem,
  await openAi.loadPortfolioIntoPrompts(),
  await openAi.processJD(jd).then(openAi.loadJDIntoPrompts),
  {
    content: `
      I will share my draft introduction with you in the next prompt. 
      Please review and rewrite it using **simple and clear English**, and ensure it is no longer than **150-200 words**. Avoid difficult words or overly technical details. The language should be easy for a non-native English speaker to understand.

      Rewrite the introduction based on:
      - The Job Description (JD)
      - My Portfolio
      - Common software engineering job interview tips

      Below are simple tips to help you format my self-introduction:

      **"Tell me about yourself" or "Give me a quick introduction"** is usually the first question asked in a software engineering job interview. 
      A good answer is short, straightforward, and focused on the job.

      **Goals of the self-introduction:**
      1. Give a good first impression. Confident and straightforward answers matter.
      2. Show how your skills match the role and the company.
      3. Explain your career growth and why you're a good fit for this job.

      **Key Structure for the Introduction**:
      - How you got started (interested in coding, programming, or software).
      - Why you enjoy this type of work (e.g., web development, building tools, solving problems).
      - How your past studies, jobs, or projects help you do well in this role.

      **Keep It Short and Effective**:
      1. Highlight **important details**: Past jobs, internships, or big projects.
      2. Focus on **specific skills** that the job needs.
      3. Share one or two *big achievements* (e.g., measurable results or recognition).
      4. Skip overly technical details unless the interviewer asks.

      **Tips to Show Value**:  
      - Tell the interviewer why your skills make you the right fit for this job.  
      - Stay polite and confident without overexplaining.  
    `,
    role: 'user',
  },
];

openAi
  .withFeedbackLoop(openAi.prompt)(prompts)
  .then(openAi.readMessageFromPrompt)
  .then(console.log);
