import type { Collection } from 'tinacms';

const Page: Collection = {
  fields: [
    {
      isBody: true,
      label: 'Main Content',
      name: 'body',
      type: 'rich-text',
    },
  ],
  format: 'mdx',
  label: 'Page Content',
  name: 'page',
  path: 'content/page',
};
export default Page;
