import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path';

const rootDir = new URL(dirname(import.meta.url)).pathname;

// https://vite.dev/config/
export default defineConfig({
	build: {
	  lib: {
		  entry: [
			  resolve(rootDir, 'src/chat-room.ts'),
			  resolve(rootDir, 'src/job-matcher.ts'),
			  resolve(rootDir, 'index.html'),
		  ],
		  name: 'ai-assistant',
		  formats: ['es'],
	  },
		minify: true,
		sourcemap: true,
	}
})
