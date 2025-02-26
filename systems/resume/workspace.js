import path from 'node:path';

export const WORKSPACE_ROOT = path.join(path.resolve(import.meta.dirname)),
  PUBLIC_FOLDER = path.join(WORKSPACE_ROOT, 'public');
