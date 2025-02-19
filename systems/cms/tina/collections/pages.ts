import type { Collection, Template } from 'tinacms';

const WhoAmIPage: Template = {
  fields: [
    { label: 'Page title', name: 'title', type: 'string' },
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
          type: 'rich-text',
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
  label: 'Who Am I',
  name: 'whoAmI',
};

const CoreValuesPage: Template = {
  fields: [
    { label: 'Page title', name: 'title', type: 'string' },
    {
      label: 'What Are Core Values and Why?',
      name: 'whatAreCoreValues',
      type: 'string',
      ui: {
        component: 'textarea',
      },
    },
    {
      collections: ['coreValue'],
      label: 'Core values',
      name: 'values',
      type: 'reference',
    },
  ],

  label: 'Core Values',
  name: 'coreValues',
};

const ExperiencesPage: Template = {
  fields: [
    { label: 'Page title', name: 'title', type: 'string' },
    {
      collections: ['experience'],
      label: 'Experiences',
      name: 'experiencesRef',
      type: 'reference',
    },
  ],

  label: 'Experiences',
  name: 'experiences',
};

const SkillsPage: Template = {
  fields: [
    { label: 'Page title', name: 'title', type: 'string' },
    {
      collections: ['skill'],
      label: 'Skills',
      name: 'skillsRef',
      type: 'reference',
    },
  ],
  label: 'Skills',
  name: 'skills',
};

const FAQPage: Template = {
  fields: [
    { label: 'Page title', name: 'title', type: 'string' },
    {
      label: 'Introduction',
      name: 'introduction',
      type: 'string',
      ui: {
        component: 'textarea',
      },
    },
    {
      description:
        'Check here: https://www.techinterviewhandbook.org/behavioral-interview-questions/',
      fields: [
        {
          label: 'Question',
          name: 'question',
          type: 'string',
        },
        {
          label: 'Answer',
          name: 'answer',
          type: 'rich-text',
        },
        {
          label: 'Group',
          name: 'group',
          options: [
            '📌 Work Preferences & Ideal Role',
            '🛠 Problem-Solving & Challenges',
            '🚀 Productivity & Time Management',
            '📂 Projects & Experience',
          ],
          type: 'string',
        },
      ],
      label: 'Common behaviour questions',
      list: true,
      name: 'questions',
      type: 'object',
      ui: {
        itemProps: item => {
          // Field values are accessed by item?.<Field name>
          return { label: `${item?.['question']}` };
        },
      },
    },
  ],
  label: 'F & Q',
  name: 'faq',
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
  templates: [
    WhoAmIPage,
    CoreValuesPage,
    ExperiencesPage,
    SkillsPage,
    FAQPage,
    foobar,
  ],
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
};
export default Pages;
