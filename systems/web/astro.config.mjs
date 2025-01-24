import react from '@astrojs/react';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  base: 'portfolio',
  integrations: [react({ include: ['**/react/*'] })],
  site: 'https://neviaumi.github.io/',
  vite: {
    preview: {
      allowedHosts: ['localhost', 'web'],
    },
    server: {
      allowedHosts: ['localhost', 'web'],
    },
    ssr: {
      noExternal: /@mui\/.*?/,
    },
  },
});
