import { useCodeSortingEslintConfig } from '@busybox/eslint-config-code-sorting';
import { useESModuleEslintConfig } from '@busybox/eslint-config-esm';
import {
  useJSONEslintConfig,
  useMarkdownEslintConfig,
  usePackageJsonEslintConfig,
  useYamlEslintConfig,
} from '@busybox/eslint-config-text-document';
import { useTypescriptEslintConfig } from '@busybox/eslint-config-typescript';
import globals from 'globals';

import pkgjson from './package.json' with { type: 'json' };

function withOverride(overrideConfig) {
  return function createEslintConfigHOC(originalConfigFunc) {
    return function (...args) {
      const originalConfig = originalConfigFunc(...args);
      return {
        ...originalConfig,
        ...overrideConfig,
        rules: {
          ...originalConfig.rules,
          ...overrideConfig.rules,
        },
      };
    };
  };
}

export default [
  {
    ignores: [
      'package-lock.json',
      'tina/tina-lock.json',
      'tina/__generated__/**/*',
    ],
    name: pkgjson.name,
  },
  {
    languageOptions: {
      globals: globals.node,
    },
    name: pkgjson.name,
  },
  useESModuleEslintConfig(),
  useTypescriptEslintConfig(),
  // useTypescriptDefinitionEslintConfig(),
  useCodeSortingEslintConfig(),
  useYamlEslintConfig(),
  usePackageJsonEslintConfig(),
  useJSONEslintConfig(),
  withOverride({
    rules: {
      'markdownlint/md013': 'off',
    },
  })(useMarkdownEslintConfig)(),
];
