import { useCodeSortingEslintConfig } from '@busybox/eslint-config-code-sorting';
import { useESModuleEslintConfig } from '@busybox/eslint-config-esm';
import {
  useJSONEslintConfig,
  usePackageJsonEslintConfig,
  useYamlEslintConfig,
} from '@busybox/eslint-config-text-document';
import { useTypescriptEslintConfig } from '@busybox/eslint-config-typescript';
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
  },  withOverride({
    rules: {
      'no-console': 'off',
    },
  })(useESModuleEslintConfig)(),
  useTypescriptEslintConfig(),
  useCodeSortingEslintConfig(),
  useYamlEslintConfig(),
  usePackageJsonEslintConfig(),
  useJSONEslintConfig(),
];
