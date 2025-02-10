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
    ignores: ['package-lock.json', '.astro/**/*', 'dist/**/*'],
    name: pkgjson.name,
  },
  {
    languageOptions: {
      globals: globals.node,
    },
    name: pkgjson.name,
  },
  withOverride({
    roles: {
      'no-console': 'off'
    }
  })(useESModuleEslintConfig()),
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
