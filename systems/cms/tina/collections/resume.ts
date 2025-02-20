import type { Collection } from 'tinacms';

const ResumeJSON: Collection = {
  fields: [
    // Basics Section
    {
      fields: [
        {
          description: 'Your full name, e.g. John Doe.',
          label: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          description: 'Your professional title, e.g. Web Developer.',
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          description: 'A link to your profile image in JPEG or PNG format.',
          label: 'Image',
          name: 'image',
          type: 'string',
        },
        {
          description: 'Your primary email address, e.g. thomas@gmail.com.',
          label: 'Email',
          name: 'email',
          type: 'string',
        },
        {
          description:
            'Your contact phone number, e.g. 712-117-2923. Use any format.',
          label: 'Phone',
          name: 'phone',
          type: 'string',
        },
        {
          description:
            'A link to your website or personal homepage, e.g. https://example.com.',
          label: 'URL',
          name: 'url',
          type: 'string',
        },
        {
          description: 'A short 2-3 sentence biography about yourself.',
          label: 'Summary',
          name: 'summary',
          type: 'string',
        },
        {
          description: 'Your address details.',
          fields: [
            {
              description: 'Street address. For multiline addresses, use \\n.',
              label: 'Address',
              name: 'address',
              type: 'string',
            },
            {
              description: 'Your postal code or zip code.',
              label: 'Postal Code',
              name: 'postalCode',
              type: 'string',
            },
            {
              description: 'The city where you live.',
              label: 'City',
              name: 'city',
              type: 'string',
            },
            {
              description:
                'Your country code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN.',
              label: 'Country Code',
              name: 'countryCode',
              type: 'string',
            },
            {
              description: 'The state or region where you live.',
              label: 'Region',
              name: 'region',
              type: 'string',
            },
          ],
          label: 'Location',
          name: 'location',
          type: 'object',
        },
        {
          description: 'Specify any social media networks you are active on.',
          fields: [
            {
              description:
                'The name of the social network, e.g. LinkedIn or Twitter.',
              label: 'Network',
              name: 'network',
              type: 'string',
            },
            {
              description:
                'Your username or handle on the network, e.g. @johndoe.',
              label: 'Username',
              name: 'username',
              type: 'string',
            },
            {
              description: 'A link to your profile on the platform.',
              label: 'URL',
              name: 'url',
              type: 'string',
            },
          ],
          label: 'Profiles',
          list: true,
          name: 'profiles',
          type: 'object',
          ui: {
            itemProps(item: Record<string, any>): {
              key?: string;
              label?: boolean | string;
            } {
              return {
                label: item['network'],
              };
            },
          },
        },
      ],
      label: 'Basics',
      name: 'basics',
      type: 'object',
    },

    // Work Section
    {
      collections: ['experience'],
      label: 'Work',
      name: 'work',
      type: 'reference',
    },
    // Education Section
    {
      fields: [
        {
          description: 'The name of the institution, e.g. MIT.',
          label: 'Institution',
          name: 'institution',
          type: 'string',
        },
        {
          description: 'The website of the institution, if available.',
          label: 'URL',
          name: 'url',
          type: 'string',
        },
        {
          description: 'The field of study, e.g. Computer Science.',
          label: 'Area',
          name: 'area',
          type: 'string',
        },
        {
          description: 'The type of degree or certification, e.g. Bachelor.',
          label: 'Study Type',
          name: 'studyType',
          type: 'string',
        },
        {
          description: 'The date you started studying.',
          label: 'Start Date',
          name: 'startDate',
          type: 'string',
        },
        {
          description: 'The date of completion or graduation.',
          label: 'End Date',
          name: 'endDate',
          type: 'string',
        },
        {
          description: 'Your grade point average, e.g. 3.8/4.0.',
          label: 'Score',
          name: 'score',
          type: 'string',
        },
        {
          description: 'A list of notable courses or subjects studied.',
          label: 'Courses',
          list: true,
          name: 'courses',
          type: 'string',
        },
      ],
      label: 'Education',
      list: true,
      name: 'education',
      type: 'object',
      ui: {
        itemProps(item: Record<string, any>): {
          key?: string;
          label?: boolean | string;
        } {
          return { label: `${item?.['institution']}` };
        },
      },
    },

    // Skills Section
    {
      collections: ['skill'],
      label: 'Skills',
      name: 'skills',
      type: 'reference',
    },

    // Languages Section
    {
      fields: [
        {
          description: 'A language you speak, e.g. English, French.',
          label: 'Language',
          name: 'language',
          type: 'string',
        },
        {
          description: 'Your level of fluency, e.g. Fluent, Beginner.',
          label: 'Fluency',
          name: 'fluency',
          type: 'string',
        },
      ],
      label: 'Languages',
      list: true,
      name: 'languages',
      type: 'object',
      ui: {
        itemProps(item: Record<string, any>): {
          key?: string;
          label?: boolean | string;
        } {
          return { label: `${item?.['language']}` };
        },
      },
    },

    // References Section
    {
      fields: [
        {
          collections: ['references'],
          label: 'References',
          name: 'references',
          type: 'reference',
        },
      ],
      label: 'References from colleague',
      list: true,
      name: 'colleagueReferences',
      type: 'object',
      ui: {
        itemProps: item => {
          // Field values are accessed by item?.<Field name>
          return { label: `${item?.['references']}` };
        },
      },
    },

    // Projects Section
    {
      fields: [
        {
          description: 'The name of the project, e.g. The World Wide Web.',
          label: 'Name',
          name: 'name',
          type: 'string',
        },
        {
          description: 'A short summary of the project or its goals.',
          label: 'Description',
          name: 'description',
          type: 'string',
        },
        {
          description: 'Major features or accomplishments of the project.',
          label: 'Highlights',
          list: true,
          name: 'highlights',
          type: 'string',
        },
        {
          description: 'Technologies or concepts used, e.g. AngularJS, AI.',
          label: 'Keywords',
          list: true,
          name: 'keywords',
          type: 'string',
        },
        {
          description: 'The start date of the project.',
          label: 'Start Date',
          name: 'startDate',
          type: 'string',
        },
        {
          description: 'The completion date of the project.',
          label: 'End Date',
          name: 'endDate',
          type: 'string',
        },
        {
          description: 'A link to the project website or repository.',
          label: 'URL',
          name: 'url',
          type: 'string',
        },
        {
          description: 'Your roles on the project, e.g. Team Lead, Developer.',
          label: 'Roles',
          list: true,
          name: 'roles',
          type: 'string',
        },
        {
          description:
            'Relevant company or agency affiliated with the project.',
          label: 'Entity',
          name: 'entity',
          type: 'string',
        },
        {
          description: 'The type of project, e.g. application, presentation.',
          label: 'Type',
          name: 'type',
          type: 'string',
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

  format: 'json',
  label: 'Resume',
  name: 'resume',
  path: 'content/resume',
  ui: {
    allowedActions: {
      create: true,
      delete: false,
    },
  },
};

export default ResumeJSON;
