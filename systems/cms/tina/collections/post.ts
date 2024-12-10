import type { Collection } from "tinacms";

const Posts: Collection = {
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
    },
    {
      isBody: true,
      label: "Blog Post Body",
      name: "body",
      type: "rich-text",
    },
  ],
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  ui: {
    router: ({ document }) => {
      return `/posts/${document._sys.filename}`;
    },
  },
};
export default Posts;
