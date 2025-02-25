import * as openAi from './open-ai.js';
import { getAssetContent } from './workspace.js';

const jd = await getAssetContent('jd.txt');
const prompts = [
  openAi.jdSystem,
  await openAi.loadPortfolioIntoPrompts(),
  await openAi.processJD(jd).then(openAi.loadJDIntoPrompts),
  {
    content: `I will share my draft self-introduction in the next prompt. 
      Please review and rewrite it using **simple and clear English**, keeping the introduction within **150–200 words**. 
      Do **not include questions at the end** in the word count limit—they are additional and should not affect the length of the main introduction.

      **Important Notes:**
      - Do not include phrases like "Thank you for the opportunity" or "I’m excited." These do not add value and should be removed.
      - Focus on confident and straightforward language while keeping the tone friendly and approachable.
      - At the end, include 3–4 meaningful questions to ask the interviewer that demonstrate curiosity about the role, team, or company.

      **Goals of the self-introduction:**
      1. Start with a short **agenda-setting statement** to explain the structure of your response.
         Example:  
         - "To begin, I’d like to briefly share my skills and experience that are most relevant to the role specified in the JD, followed by how I’ve stayed active during my career break."
      2. Highlight **key skills and achievements** that fit the role requirements.
         Example:
         - "I have over 7 years of experience with the Node.js ecosystem, focusing on scalable RESTful APIs hosted on AWS."
      3. Share specific details about **notable achievements** or projects.
         Example:
         - "I’ve worked on legacy systems and greenfield projects and am experienced in SQL database design to optimize data performance."
      4. If applicable, include information about your **career break** and how you’ve stayed engaged with the industry.
         Example:
         - "During my career break, I took on freelance projects and created a personal portfolio website that features an AI-driven content assistant."

      **Structure for Rewriting:**
      - **Step 1:** Start with a confident agenda-setting statement.
      - **Step 2:** Summarize your skills and experience, focusing on measurable achievements and technologies.
      - **Step 3:** Briefly mention any recent projects or activities (e.g., freelance work, personal development, etc.).
      - **Step 4:** End the introduction (within 150–200 words) and add 3–4 meaningful questions for the interviewer separately.

      **Key Note:** Treat questions separately from the word limit, and ensure they are meaningful enough to spark discussion while inviting the hiring manager to introduce their team or company.
`,
    role: 'user',
  },
];

openAi
  .withFeedbackLoop(openAi.prompt)(prompts)
  .then(openAi.readMessageFromPrompt)
  .then(console.log);
