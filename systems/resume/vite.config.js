import os from 'node:os';
import path from 'node:path';
import { defineConfig } from 'vite';

const tmpDir = os.tmpdir(); // Get the system temp directory

export default defineConfig(() => ({
  appType: 'mpa',
  define: {
    'import.meta.env.VITE_IS_TAILORED_RESUME': JSON.stringify(
      process.env['VITE_IS_TAILORED_RESUME'] ? true : false,
    ),
    'import.meta.env.VITE_RESUME_SOURCE': JSON.stringify(
      process.env['VITE_RESUME_SOURCE']
        ? `@fs/${path.join(os.tmpdir(), process.env['VITE_RESUME_SOURCE'])}`
        : '/resume.json',
    ),
  },
  server: {
    fs: {
      allow: [tmpDir], // Allow access to the temp directory
    },
  },
}));
