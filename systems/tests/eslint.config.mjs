import { useCodeSortingEslintConfig } from '@busybox/eslint-config-code-sorting';
import { useESModuleEslintConfig } from '@busybox/eslint-config-esm';
import { useReactEslintConfig } from '@busybox/eslint-config-react';
import {
  useJSONEslintConfig,
  useMarkdownEslintConfig,
  usePackageJsonEslintConfig,
  useYamlEslintConfig,
} from '@busybox/eslint-config-text-document';
import { useTypescriptEslintConfig } from '@busybox/eslint-config-typescript';
import {usePlaywrightEslintConfig} from "./eslint-configs/playwright.js"
import globals from 'globals';

import {
  useGraphQLEslintConfig,
  useTrustCodeFilesAsGraphQLEslintConfig,
} from './eslint-configs/graphql.js';
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
      'playwright-report/**/*',
      'test-results/**/*',
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
  useReactEslintConfig(),
  useTrustCodeFilesAsGraphQLEslintConfig(),
  useGraphQLEslintConfig(),
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
  usePlaywrightEslintConfig(),
];
