import * as openAi from './open-ai.js';
import { getAssetContent } from './workspace.js';

const jd = await getAssetContent('jd.txt');

// Define the specific job/title of the person conducting the interview
const interviewerPosition = 'Talent Lead'; // Examples: 'Engineering Team', 'CTO', 'HR Manager', etc.

const prompts = [
  openAi.jdSystem,
  await openAi.loadPortfolioIntoPrompts(),
  await openAi.processJD(jd).then(openAi.loadJDIntoPrompts),
  {
    content: `Please generate **up to 4 thoughtful and specific questions**, categorized under appropriate themes, using **simple and clear English**, 
      that I can ask at the end of an interview with a **${interviewerPosition}** (the company representative conducting the interview). 
      
      Your response should:
      
      1. Be tailored to the JD and the company's focus areas (e.g., tech stack, product, or culture).
      2. Address aspects most relevant to the **${interviewerPosition}'s** expertise, responsibilities, or perspective.
      3. Reflect curiosity, critical thinking, and genuine enthusiasm for the position.
      4. Organize questions under the most relevant themes, such as:
         - **Technical Work** (if applicable): Questions about technical challenges and team processes.
         - **Role-Specific**: Questions clarifying role expectations, success factors, or growth opportunities.
         - **Culture and Welfare**: Questions about company culture, inclusivity, employee development, and work-life balance.
         - **Leadership and Management** (if applicable): Questions about decision-making, collaboration, or leadership styles.

      Examples of questions for each theme:
      - **Technical Work**: What are the most significant technical challenges your team is solving right now?  
      - **Role-Specific**: What does success look like for this role, and how is it measured?  
      - **Culture and Welfare**: How does your company support employees’ well-being or career growth?  
      - **Leadership and Management**: Can you share how leadership fosters collaboration across teams?

      Using this structure, **categorize** your response into the relevant themes based on the provided **${interviewerPosition}** and generate a maximum of 4 insightful, specific, and compelling questions.
    `,
    role: 'user',
  },
];

openAi.prompt(prompts).then(openAi.readMessageFromPrompt).then(console.log);
