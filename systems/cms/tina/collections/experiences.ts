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
          description: 'Company website',
          label: 'Company website',
          name: 'url',
          type: 'string',
        },
        {
          description:
            'A professionally concise summary of your experience for this role, focusing on main responsibilities, accomplishments, and measurable outcomes for resume use.',
          label: 'Resume Summary',
          name: 'resumeSummary',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
        {
          description:
            'A concise introduction of your role tailored for the portfolio homepage. This should highlight your main activities in an engaging and creative manner.',
          label: 'Portfolio Introduction',
          name: 'portfolioIntro',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
        {
          description:
            'A comprehensive explanation of your work in this role. Include key responsibilities, projects, achievements, challenges, and the work environment. Focus on providing a rich, in-depth narrative.',
          label: 'Detailed Description',
          name: 'detailedDescription',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
        {
          description:
            'A list of tools, techniques, or areas relevant to this experiences.',
          label: 'Highlights',
          list: true,
          name: 'highlights',
          type: 'string',
        },
        {
          description:
            'A list of tools, techniques, or areas relevant to this experiences.',
          label: 'Keywords',
          list: true,
          name: 'keywords',
          type: 'string',
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
