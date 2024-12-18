import type { Collection, Template } from 'tinacms';

const WhoAmIPage: Template = {
  fields: [
    {
      fields: [
        {
          description: 'What your name?',
          label: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          description: 'What your position in the team is?',
          label: 'Position',
          name: 'position',
          type: 'string',
        },
        {
          description: 'Use Github profile picture link here',
          label: 'Profile picture',
          name: 'profilePicture',
          type: 'string',
        },
        {
          label: 'Career overview',
          name: 'careerOverview',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
      ],
      label: 'Summary',
      name: 'summary',
      type: 'object',
    },
    {
      fields: [
        {
          description: 'Section heading',
          label: 'Heading',
          name: 'heading',
          type: 'string',
        },
        {
          collections: ['coreValue'],
          label: 'Core values',
          name: 'values',
          type: 'reference',
        },
      ],
      label: 'Core values',
      name: 'coreValues',
      type: 'object',
    },
    {
      collections: ['experience'],
      label: 'Experiences',
      name: 'experiences',
      type: 'reference',
    },
    {
      collections: ['skill'],
      label: 'Skills',
      name: 'skills',
      type: 'reference',
    },
    {
      fields: [
        {
          label: 'Referrer name',
          name: 'name',
          type: 'string',
        },
        {
          description:
            'Your referrer profile pictures, may be from LinkedIn, Github...etc.',
          label: 'Profile Picture',
          name: 'profilePicture',
          type: 'string',
        },
        {
          label: 'relationship',
          name: 'relationship',
          type: 'string',
        },
        {
          label: 'Comments',
          name: 'comments',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
      ],
      label: 'Recommends from co-workers',
      list: true,
      name: 'references',
      type: 'object',
      ui: {
        itemProps: item => {
          // Field values are accessed by item?.<Field name>
          return { label: `${item?.['name']}, ${item?.['relationship']}` };
        },
      },
    },
  ],
  label: 'Who Am I',
  name: 'whoAmI',
};

const foobar: Template = {
  fields: [
    {
      label: 'Unused',
      name: 'unused',
      type: 'string',
      ui: {
        component: 'textarea',
      },
    },
  ],
  label: 'Foobar',
  name: 'foobar',
};

const Pages: Collection = {
  format: 'md',
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  templates: [WhoAmIPage, foobar],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
};
export default Pages;
