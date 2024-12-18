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
