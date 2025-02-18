import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';

const rootDir = new URL(dirname(import.meta.url)).pathname;

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(rootDir, 'src/portfolio-chat-room.element.ts'),
        resolve(rootDir, 'src/portfolio-chat-room-fab.element.ts'),
        resolve(rootDir, 'index.html'),
      ],
      formats: ['es'],
      name: 'ai-assistant',
    },
    minify: true,
    sourcemap: true,
  },
});
