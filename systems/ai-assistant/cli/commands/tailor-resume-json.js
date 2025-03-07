import _fs from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { scheduler } from 'node:timers/promises';

import * as cms from './cms.js';
import * as openAI from './open-ai.js';
import {
  generateTailoredATSResumePdf,
  generateTailoredResumePdf,
} from './resume.js';
import * as web from './web.js';
import {
  ASSETS_FOLDER,
  getAssetContent,
  getTempDirectory,
  resolveAssetPath,
} from './workspace.js';

const jd = await getAssetContent('jd.txt').then(openAI.processJD);
const jdJson = JSON.parse(jd);
await fs.writeFile(resolveAssetPath(`${jdJson.id}.jd.json`), jd);
const prompts = [
  openAI.jdSystem,
  await openAI.loadPortfolioIntoPrompts(),
  openAI.loadJDIntoPrompts(jd),
  {
    content: `I want to customize my resume based on the provided job description (JD). My resume is structured using the JSON resume format. Please suggest which specific areas I should tailor to align with the job description.
I believe the following sections are the most critical for customization:
1. **Skills**: Highlight the skills that match the job description and ensure they're prominently listed.
2. **Work Experience**: Adjust the description of my roles and responsibilities to focus on experiences that directly match the job description requirements.
3. **Projects**: Tailor the highlights within my project section to emphasize achievements and tasks relevant to the job description.

Please provide recommendations on how to modify these sections for the best alignment with the job description.

`,
    role: 'user',
  },
];

async function generateTailoredSummary() {
  const summary = await cms
    .getResumeData()
    .then(data => data.data.resume.basics.summary);
  return openAI
    .prompt(
      [
        ...prompts,
        {
          content: `Take the following **generic summary** and refine it to align with the priorities and requirements of the provided Job Description (JD). The output must strictly reflect the skills and experience explicitly mentioned in my generic summary while tailoring the tone to highlight their relevance to the JD.

### Objectives:
- Present a professional, engaging, and **truthful** tone.
- Highlight **ONLY** the technical skills, frameworks, tools, and methodologies explicitly mentioned in my generic summary (e.g., React, Node.js, Agile).
- Use my existing skills and strengths from the generic summary as the foundation; no skills, frameworks, or methodologies not mentioned in my experience should appear in the output.
- Tailor the content to align with the priorities and keywords in the JD, but maintain accuracy and specificity to my actual experience.
- Emphasize **qualitative achievements** without inventing specific figures or results.
- Ensure the summary remains applicable to diverse positions (startups to enterprises) and roles, such as individual contributor or leadership roles.
- Limit the result to **3–5 sentences**, focusing on **distinct strengths** such as technical expertise, collaboration, and problem-solving skills, avoiding generic phrases or unnecessary verbosity.

### Inputs:
**Generic Summary**: 
\`\`\`json
    ${JSON.stringify(summary)}
\`\`\`

### Expected Output:
Return the tailored summary in this JSON format:
\`\`\`json
    {
        "summary":"string"
    }
\`\`\`

### Instructions:
1. **Anchor in Generic Summary**:
   - Ensure the tailored summary reflects the tools, skills, and experience provided in the generic summary.
   - Avoid adding skills, frameworks, or methodologies that are not explicitly present in the generic summary.

2. **Professional and Engaging Tone**:
   - Ensure sentences are concise, impactful, and professional.
   - Avoid overly technical jargon or long, convoluted sentences.

3. **Alignment with JD (while retaining accuracy)**:
   - Identify themes and priorities in the JD that align with the strengths and skills from the generic summary.
   - DO NOT fabricate skills, experiences, tools, or frameworks solely to match the JD. The tailored summary should strictly reflect actual expertise.

4. **Highlight Skills and Strengths**:
   - Focus on "transferrable skills" where specific expertise overlaps with JD requirements.
   - Strike a balance between technical skills, problem-solving abilities, and collaboration skills demonstrated in past roles.

5. **Conciseness**:
   - Use 3–5 sentences to summarize key strengths and align them to the JD naturally.
   - Avoid unnecessary redundancy or exaggeration.

### Example Use Case:
Produce a truthful, concise, and tailored summary that helps a hiring manager assess my fit for the JD while accurately reflecting my actual experience and skills.
`,
          role: 'user',
        },
      ],
      {
        response_format: { type: 'json_object' },
      },
    )
    .then(openAI.readMessageFromPrompt)
    .then(JSON.parse)
    .then(({ summary }) => summary);
}

async function generateTailoredProject() {
  const projects = await cms
    .getResumeData()
    .then(data => data.data.resume.projects)
    .then(project => project.slice(0, 2));
  let projectPrompts = [...prompts];
  const tailoredProjects = [];
  for (const project of projects) {
    projectPrompts = await openAI.prompt(
      [
        ...projectPrompts,
        {
          content: `Take the following **project** from my resume and refine its description to align with the priorities and requirements of the provided Job Description (JD). The refined description must strictly reflect the actual technical details, tools, and achievements mentioned in the input data. Do not fabricate additional skills, tools, or accomplishments that are not part of the provided project.

### Objectives:
- Present the project in a concise and professional format.
- Highlight key contributions, tools, technologies, or outcomes explicitly mentioned in the input data, emphasizing relevance to the JD where applicable.
- Ensure the description is restricted to **2–3 sentences**, focusing only on the key contributions and impact of the project.

### Inputs:
**Project**:
\`\`\`json
${JSON.stringify(project)}
\`\`\`

### Instructions:
1. **Truthful Refinement**:
   - Refine the project description using only the details provided in the input.
   - Do not invent tools, technologies, or achievements that do not exist in the input data.
2. **Professional Tone**:
   - Write in a clear, concise, and professional tone, highlighting key contributions and impact.
3. **JD Alignment (While Accurate)**:
   - Emphasize parts of the project that align with the JD, but only if they are already part of the input data.
4. **Conciseness**:
   - Keep the description to 2–3 impactful sentences that are easy to read and highly focused.

### Expected Output:
Return the refined project in this JSON format:
\`\`\`json
{
  "highlights": "Array<string>",
  "description": "string"
}
\`\`\`
`,
          role: 'user',
        },
      ],
      {
        response_format: { type: 'json_object' },
      },
    );
    tailoredProjects.push(
      JSON.parse(openAI.readMessageFromPrompt(projectPrompts)),
    );
  }
  return tailoredProjects;
}

async function generateTailoredWork() {
  const works = await cms
    .gerWorkExperienceData()
    .then(data => data.data.experience.works)
    .then(works => works.slice(0, 4));
  let workPrompts = [...prompts];
  const tailoredWorks = [];
  for (const work of works) {
    workPrompts = await openAI.prompt(
      [
        ...workPrompts,
        {
          content: `Take the following **work experience entry** and refine it to align with the requirements and priorities of the provided Job Description (JD). The refined output must strictly reflect the responsibilities, achievements, and tools mentioned in the input. Do not fabricate or add anything that isn't explicitly included in the provided data.

### Objectives:
- Present the work experience entry in a **concise and professional** format.
- Highlight the responsibilities, tools, technologies, and outcomes mentioned in the original role, emphasizing their relevance to the JD.
- Ensure all refinements are based solely on the provided input, without inventing additional tools, frameworks, or achievements.
- Ensure the output follows these specific limitations:
  - Limit the **summary** to **3–5 sentences**, focusing on key contributions, impact, and technical expertise.
  - Default to a maximum of **3 impactful highlights**, but include up to **4 highlights only if necessary** to fully capture the role's alignment with the JD.

### Inputs:
**Work Experience Entry**:
\`\`\`json
${JSON.stringify(work)}
\`\`\`

### Instructions:
1. **Truthful Refinement**:
   - Base the refinement strictly on the provided input for this single work experience entry.
   - Do not add skills, tools, or achievements that are not explicitly mentioned in the input data.
2. **Professional and Concise Tone**:
   - Present the content in a professional, polished tone.
   - Ensure the sentences are concise and impactful.
3. **Summary Refinement**:
   - Write a **professional and concise summary** of the work experience.
   - Ensure the summary is **3–5 sentences long**, focusing on:
     - Core responsibilities and the impact of the role.
     - Technical expertise, tools, and relevant methodologies.
     - Alignment with priorities outlined in the JD (e.g., problem-solving, collaboration, scalability).
   - Avoid generic phrases or verbosity; the summary should be polished and clear.
4. **Highlight Selection**:
   - Highlight up to **3 key achievements or contributions** that are most relevant to the JD.
   - If required to fully describe the scope of the role, include a **4th highlight**, but only when it is critical for alignment with the JD.
   - Each highlight should feature **tools, technologies, responsibilities, or outcomes**, presented as concise one-liner bullet points (impact-focused).
5. **Alignment with JD**:
   - Prioritize aspects of the role that correspond to **critical keywords** or responsibilities in the JD.
   - Highlight tools, technologies, frameworks, or methodologies mentioned both in the input and the JD.
   - For transferable skills, explain their relevance where functional overlap exists (e.g., React for Vue.js, PostgreSQL for MySQL).
6. **Professional and Clear Tone**:
   - Ensure the output maintains a polished, professional tone.
   - Avoid technical jargon or convoluted language; focus on clarity and impact.


### Expected Output:
Return the refined work experience entry in this JSON format:
\`\`\`json
{
  "summary": "string",
  "highlights": "Array<string>"
}
\`\`\`
`,
          role: 'user',
        },
      ],
      {
        response_format: { type: 'json_object' },
      },
    );
    tailoredWorks.push(JSON.parse(openAI.readMessageFromPrompt(workPrompts)));
  }
  return tailoredWorks;
}

async function generateTailoredSkills() {
  const keywords = await cms.getKeywordsData().then(({ data: { resume } }) => {
    return Array.from(
      new Set(
        [
          resume.projects.flatMap(project => project.keywords),
          resume.skills.sections.flatMap(section =>
            section.keywords.map(keyword => keyword.name),
          ),
          resume.work.works.flatMap(project => project.keywords),
        ].flat(),
      ),
    );
  });
  return await openAI
    .prompt(
      [
        ...prompts,
        {
          content: `Using the following existing keywords:
\`\`\`json
${JSON.stringify(keywords, null, 2)}
\`\`\`
Please suggest which specific skills I should tailor and highlight to best align with the provided job description (JD). When no exact match is found for certain skills in the JD, suggest the \`closest alternatives\` based on functional similarity from my existing experience.

### Important Considerations:
1. **Exact Match First**: 
   - Highlight keywords from my existing skills if they exactly match those appearing in the provided JD.
   - For example: 
     - \`Node.js\` and \`NodeJS\` are considered the same, so if the JD mentions \`NodeJS\` and I have \`Node.js\`, it is a match.

2. **Closest Functional Similarities**:
   - If I do not possess a skill exactly matching a JD requirement, suggest existing skills that could act as similar or transferrable alternatives based on my current keywords. Examples include:
     - If the JD mentions \`Vue\` and I lack it, \`React\` or \`Angular\` can be highlighted as alternatives because they are similar frontend frameworks.
     - If the JD mentions relational databases like \`MySQL\` and I don’t have it, then \`PostgreSQL\` (if it exists in my skills) should be highlighted instead.

3. **JD-Specific Relevance**:
   - Focus on skills that improve alignment with the JD’s requirements or responsibilities. For instance:
     - Highlight only the skills that are essential or desirable for the role.
   - Avoid including unrelated skills that do not provide clear alignment with the JD.

4. **Prioritization**:
   - First, prioritize **required** skills from the JD.
   - Next, include **optional** or secondary skills that still demonstrate strong alignment.

### Expected Output:
Please return the output in the following schema:
\`\`\`javascript
{
  "highlighted": Array<string>
}
\`\`\`

### Notes:
- Use concise reasoning when suggesting alternatives (e.g., "Highlighting React as the closest match to Vue due to its functional similarity as a frontend framework").
- Omit skills that are irrelevant to the JD or not present in my existing skillset.

`,
          role: 'user',
        },
      ],
      { response_format: { type: 'json_object' } },
    )
    .then(openAI.readMessageFromPrompt)
    .then(JSON.parse)
    .then(({ highlighted }) => highlighted.map(String));
}

const defaultResume = await web.loadResumeJSON();

defaultResume.basics.summary = await generateTailoredSummary();
defaultResume.basics.label = `${jdJson.company} - ${jdJson.title}`;
await scheduler.wait(5000);
defaultResume.meta = {
  highlightedKeywords: await generateTailoredSkills(),
  id: jdJson.id,
};
await scheduler.wait(5000);

await generateTailoredWork().then(works =>
  works.forEach((tailoredWork, index) => {
    defaultResume.work[index] = Object.assign(
      defaultResume.work[index],
      tailoredWork,
    );
  }),
);
await scheduler.wait(5000);

await generateTailoredProject().then(projects =>
  projects.forEach((tailoredProject, index) => {
    defaultResume.projects[index] = Object.assign(
      defaultResume.projects[index],
      tailoredProject,
    );
  }),
);
await scheduler.wait(5000);

await fs.writeFile(
  path.join(getTempDirectory(), `${jdJson.id}.json`),
  JSON.stringify(defaultResume, null, 2),
);

await generateTailoredATSResumePdf(jdJson.id).then(data =>
  pipeline(
    data,
    _fs.createWriteStream(resolveAssetPath(`ats-${jdJson.id}.pdf`)),
  ),
);

await generateTailoredResumePdf(jdJson.id).then(data =>
  pipeline(data, _fs.createWriteStream(resolveAssetPath(`${jdJson.id}.pdf`))),
);

console.log(`Check file named with ${jdJson.id} on ${ASSETS_FOLDER}`);
