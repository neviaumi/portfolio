import { useCodeSortingEslintConfig } from '@busybox/eslint-config-code-sorting';
import { useESModuleEslintConfig } from '@busybox/eslint-config-esm';
import {
  useJSONEslintConfig,
  useMarkdownEslintConfig,
  usePackageJsonEslintConfig,
  useYamlEslintConfig,
} from '@busybox/eslint-config-text-document';
import globals from 'globals';

import pkgjson from './package.json' with { type: 'json' };

export default [
  {
    ignores: ['package-lock.json'],
    name: pkgjson.name,
  },
  {
    languageOptions: {
      globals: globals.node,
    },
    name: pkgjson.name,
  },
  useESModuleEslintConfig(),
  useCodeSortingEslintConfig(),
  useYamlEslintConfig(),
  usePackageJsonEslintConfig(),
  useJSONEslintConfig(),
  useMarkdownEslintConfig(),
];
