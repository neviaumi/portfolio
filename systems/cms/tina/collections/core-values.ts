import type { Collection } from 'tinacms';

const CoreValues: Collection = {
  fields: [
    {
      fields: [
        {
          label: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          label: 'Icon',
          name: 'icon',
          type: 'image',
        },
        {
          description:
            'Shorten description to explain what that value referring to',
          label: 'Brief description',
          name: 'brief',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
        {
          description: 'description to explain what that value referring to',
          label: 'Description',
          name: 'description',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
        {
          description: 'Headline of the value',
          label: 'Headline',
          name: 'headline',
          type: 'string',
        },
        {
          description: 'Example in STAR format',
          fields: [
            {
              label: 'Situation',
              name: 'situation',
              type: 'string',
              ui: {
                component: 'textarea',
              },
            },
            {
              label: 'Task',
              name: 'task',
              type: 'string',
              ui: {
                component: 'textarea',
              },
            },
            {
              label: 'Action',
              name: 'action',
              type: 'string',
              ui: {
                component: 'textarea',
              },
            },
            {
              label: 'Result',
              name: 'result',
              type: 'string',
              ui: {
                component: 'textarea',
              },
            },
          ],
          label: 'STAR example',
          name: 'star',
          required: false,
          type: 'object',
        },
        {
          label: 'Footer',
          name: 'footer',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
      ],
      label: 'Values',
      list: true,
      name: 'values',
      type: 'object',
      ui: {
        itemProps: item => {
          // Field values are accessed by item?.<Field name>
          return { label: item?.['name'] };
        },
      },
    },
  ],
  format: 'md',
  label: 'Core Values',
  name: 'coreValue',
  path: 'content/core-values',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
};
export default CoreValues;
