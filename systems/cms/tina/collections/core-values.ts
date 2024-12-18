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
