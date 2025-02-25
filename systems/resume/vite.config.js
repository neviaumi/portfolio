import os from 'node:os';
import path from 'node:path';
import { defineConfig } from 'vite';

const tmpDir = os.tmpdir(); // Get the system temp directory

const useTailoredResume = process.env['VITE_IS_TAILORED_RESUME'] ? true : false;

export default defineConfig(() => ({
  appType: 'mpa',
  define: {
    'import.meta.env.VITE_IS_TAILORED_RESUME':
      JSON.stringify(useTailoredResume),
    'import.meta.env.VITE_RESUME_SOURCE': JSON.stringify(
      process.env['VITE_RESUME_SOURCE']
        ? useTailoredResume
          ? `@fs/${path.join(os.tmpdir(), process.env['VITE_RESUME_SOURCE'])}`
          : process.env['VITE_RESUME_SOURCE']
        : 'https://neviaumi.github.io/portfolio/resume.json',
    ),
  },
  server: {
    fs: {
      allow: [tmpDir], // Allow access to the temp directory
    },
  },
}));
