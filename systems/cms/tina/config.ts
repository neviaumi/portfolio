import { defineConfig } from 'tinacms';

import CoreValues from './collections/core-values.ts';
import Experiences from './collections/experiences.ts';
import Pages from './collections/pages.ts';
import References from './collections/refernces.ts';
import Resume from './collections/resume.ts';
import Skills from './collections/skills.ts';

export const config = defineConfig({
  build: {
    host: '0.0.0.0',
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
    collections: [CoreValues, Experiences, Skills, References, Resume, Pages],
  },
});

export default config;
