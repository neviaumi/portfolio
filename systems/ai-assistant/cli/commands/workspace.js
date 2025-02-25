import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const getTempDirectory = (...args) => os.tmpdir(...args);
export const WORKSPACE_ROOT = path.join(
    path.resolve(import.meta.dirname),
    '../',
  ),
  ASSETS_FOLDER = path.join(WORKSPACE_ROOT, 'assets');

export function getAssetContent(assetName) {
  return fs.readFile(path.join(ASSETS_FOLDER, assetName), 'utf8');
}

export function resolveAssetPath(assetName) {
  return path.join(ASSETS_FOLDER, assetName);
}
