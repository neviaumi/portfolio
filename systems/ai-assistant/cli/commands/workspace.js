import fs from 'node:fs/promises';
import path from 'node:path';

export const WORKSPACE_ROOT = path.join(
    path.resolve(import.meta.dirname),
    '../',
  ),
  ASSETS_FOLDER = path.join(WORKSPACE_ROOT, 'assets');

export function getAssetContent(assetName) {
  return fs.readFile(path.join(ASSETS_FOLDER, assetName), 'utf8');
}
