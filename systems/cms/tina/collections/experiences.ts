import type { Collection } from 'tinacms';

const Experiences: Collection = {
  fields: [
    {
      fields: [
        {
          description: 'Company name',
          label: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          description: 'The role you working on that company ',
          label: 'Role',
          name: 'role',
          type: 'string',
        },
        {
          description:
            'Shorten description to explain what you working on this role',
          label: 'Brief description',
          name: 'brief',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
      ],
      label: 'Work experiences',
      list: true,
      name: 'works',
      type: 'object',
      ui: {
        itemProps: item => {
          // Field values are accessed by item?.<Field name>
          return { label: `${item?.['role']} in ${item?.['name']}` };
        },
      },
    },
    {
      fields: [
        {
          description: 'Project name',
          label: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          description:
            'Shorten description to explain what you working on this project',
          label: 'Brief description',
          name: 'brief',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
      ],
      label: 'Projects',
      list: true,
      name: 'projects',
      type: 'object',
      ui: {
        itemProps: item => {
          // Field values are accessed by item?.<Field name>
          return { label: `${item?.['name']}` };
        },
      },
    },
  ],
  format: 'md',
  label: 'Experiences',
  name: 'experience',
  path: 'content/experiences',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
};
export default Experiences;
