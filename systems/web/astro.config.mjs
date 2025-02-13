import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  base: 'portfolio',
  integrations: [
    react({ include: ['**/react/*'] }),
    sitemap(),
    AstroPWA({
      manifest: {
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            sizes: '512x512',
            src: 'icons/512.png',
            type: 'image/png',
          },
          {
            sizes: '192x192',
            src: 'icons/192.png',
            type: 'image/png',
          },
        ],

        name: 'David Portfolio',
        short_name: 'Portfolio',
        start_url: 'https://neviaumi.github.io/portfolio/',
        theme_color: '#ffffff',
        workbox: { navigateFallback: '/portfolio/404' },
      },
      registerType: 'autoUpdate',
    }),
  ],
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
