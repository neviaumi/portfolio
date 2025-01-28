import type { Collection } from 'tinacms';

const References: Collection = {
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
  label: 'References',
  name: 'references',
  path: 'content/references',
  // ui: {
  //   allowedActions: {
  //     create: false,
  //     delete: false,
  //   },
  // },
};

export default References;
