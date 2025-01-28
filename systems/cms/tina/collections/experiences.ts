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
          description: 'The role you working on that company',
          label: 'Role',
          name: 'role',
          type: 'string',
        },
        {
          description: 'Data range you have service in this company',
          label: 'Period',
          name: 'period',
          type: 'string',
        },
        {
          description:
            'The country office located , it on-site / hybird ...etc.',
          label: 'Location',
          name: 'location',
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
        {
          description:
            'Description to explain what you working on, what the work environment in company look like...etc.',
          label: 'Description',
          name: 'description',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
        {
          fields: [
            {
              collections: ['references'],
              label: 'References',
              name: 'references',
              type: 'reference',
            },
          ],
          label: 'Recommends from co-workers',
          list: true,
          name: 'workReferences',
          type: 'object',
          ui: {
            itemProps: item => {
              // Field values are accessed by item?.<Field name>
              return { label: `${item?.['references']}` };
            },
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
