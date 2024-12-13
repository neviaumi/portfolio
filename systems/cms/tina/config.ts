import { defineConfig } from 'tinacms';

import page from './collections/page.ts';
import post from './collections/post.ts';

export const config = defineConfig({
  build: {
    outputFolder: 'admin', // within the public folder
    publicFolder: 'public', // The public asset folder for your framework
  },
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [page, post],
  },
});

export default config;
