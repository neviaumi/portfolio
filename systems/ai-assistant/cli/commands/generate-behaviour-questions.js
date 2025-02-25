import * as openAi from './open-ai.js';
import { getAssetContent } from './workspace.js';

const jd = await getAssetContent('jd.txt');
const prompts = [
  openAi.jdSystem,
  await openAi.loadPortfolioIntoPrompts(),
  await openAi.processJD(jd).then(openAi.loadJDIntoPrompts),
  {
    content: `I am preparing for behavioral interviews and need your assistance to create a focused preparation.

Here’s what I would like you to do:
1. Generate **8 behavioral interview questions** based on the provided job description (JD).
2. For **each question**, suggest an **example of how to answer** it based on my portfolio.
3. For **each question**, provide an **angle or strategy** that I can use to structure and present my answers effectively, keeping the key evaluation criteria in mind.

### Key Behavioral Interview Focus Areas:
- **Motivation**: Demonstrate passion for impactful work.
- **Proactiveness**: Showcase initiative and ability to solve problems creatively.
- **Handling Ambiguity**: Comfort in unstructured environments and ownership of tasks.
- **Perseverance**: Ability to overcome challenges and blockers.
- **Conflict Resolution**: Managing challenging relationships and building consensus.
- **Empathy**: Understanding the perspective of others.
- **Growth Mindset**: Awareness of strengths, weaknesses, and continuous improvement efforts.
- **Communication**: Storytelling with clarity and impact.

Below is a reference for how behavioral interviews are generally structured, alongside some example questions and focus areas:

\`\`\`text
### Behavioral Interviews Overview:
Behavioral interviews often revolve around evaluating company values. Interviews assess if candidates embody traits like:
- Motivation: What drives you?
- Proactiveness, Ambiguity, Perseverance, and Conflict resolution.
- Empathy, Growth, and Communication.

To evaluate these, questions often dig into detailed past experiences. Common questions include:
- **Motivation**: What project are you most proud of and why?
- **Proactiveness**: Tell me about a time you took initiative outside your responsibilities.
- **Conflict**: Can you describe a situation where you disagreed with a coworker?
- **Growth**: Describe a mistake you made and lessons learned.
- **Ambiguity**: Tell me about an ambiguous task or project you worked on.

Responses are typically judged based on their scope and impact.
- **Junior Engineers**: Focused impact on a small team or task.
- **Senior Engineers**: Impact that influences the team or its focus areas.
- **Staff Engineers**: Impact at an organizational or multi-team level.

Examples:
**Motivation**:
   Example Question: What project are you most proud of and why?
   Example Junior Response: Building a feature that solved a key pain point for my team.
   Senior: Creating a system that improved team efficiency across several projects.
   Staff: Leading cross-team collaboration to solve organization-wide problems.

**Proactiveness**:
   Example Question: Can you tell me about a time you proactively solved a problem?
   Response for Junior: Suggested a tooling fix that saved hours of repetitive work.
   Senior: Designed and implemented a workflow upgrade for the entire dev team.
   Staff: Proposed strategic changes adopted across departments.

By structuring responses to highlight behaviors and their impact, candidates can better align with the position.

\`\`\`

### Note:
Use my portfolio material wherever possible to support the generated questions, answers, and strategic angles. Ensure everything you generate aligns well with the job description and position seniority.`,
    role: 'user',
  },
];

openAi.prompt(prompts).then(openAi.readMessageFromPrompt).then(console.log);
