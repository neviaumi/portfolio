import type { Collection } from 'tinacms';

const Skills: Collection = {
  fields: [
    {
      fields: [
        {
          description:
            'Skill section name, E.G Backend Development, Frontend Development, DevOps, etc.',
          label: 'Section',
          name: 'section',
          type: 'string',
        },
        {
          description: 'Skill level, E.G 1-10',
          label: 'Level',
          name: 'level',
          type: 'number',
        },
        {
          label: 'Description',
          name: 'description',
          type: 'rich-text',
        },
        {
          description:
            'A list of tools, techniques, or areas relevant to this skill.',
          fields: [
            {
              description: 'The name of the skill, e.g. Web Development.',
              label: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              description:
                'The proficiency level, e.g. Beginner, Intermediate, Master.',
              label: 'Level',
              name: 'level',
              options: ['Beginner', 'Intermediate', 'Master'],
              type: 'string',
            },
            {
              description:
                'The domain or category of the skill, e.g. Programming Language, Framework, etc.',
              label: 'Domain',
              name: 'domain',
              options: [
                'Architectural Concepts',
                'Programming Language',
                'Caching',
                'Framework',
                'Relational Database',
                'NoSQL Database',
                'Message Broker',
                'API Protocols',
                'Cloud Platforms',
                'Frontend Frameworks',
                'Styling',
                'Design Tools',
                'Testing Frameworks',
                'Testing Concepts',
                'Containerization', // New: Docker, Kubernetes, etc.
                'CI/CD Pipelines', // New: Continuous Integration/Delivery practices
                'Infrastructure as Code', // New: Tools like Terraform, CloudFormation
                'Development Practices', // New: General development workflows
                'Team Collaboration', // New: Tools and skills like Jira, Slack
                'Team Workflows', // New: Agile, Scrum methodologies
              ],
              type: 'string',
            },
          ],
          label: 'Keywords',
          list: true,
          name: 'keywords',
          type: 'object',
          ui: {
            itemProps(item: Record<string, any>): {
              key?: string;
              label?: boolean | string;
            } {
              return { label: item['name'] };
            },
          },
        },
      ],
      label: 'Skill section',
      list: true,
      name: 'sections',
      type: 'object',
      ui: {
        itemProps: item => {
          // Field values are accessed by item?.<Field name>
          return { label: `${item?.['section']}` };
        },
      },
    },
  ],
  format: 'json',
  label: 'Skills',
  name: 'skill',
  path: 'content/skills',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
};

export default Skills;
