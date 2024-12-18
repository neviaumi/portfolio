import path from 'node:path';
// eslint-disable-next-line n/no-extraneous-import
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  // ...
  publicDir: path.join(process.cwd(), 'public'),
});
