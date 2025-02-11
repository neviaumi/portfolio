import { useCodeSortingEslintConfig } from '@busybox/eslint-config-code-sorting';
import { useESModuleEslintConfig } from '@busybox/eslint-config-esm';
import { useReactEslintConfig } from '@busybox/eslint-config-react';
import {
  useJSONEslintConfig,
  usePackageJsonEslintConfig,
  useYamlEslintConfig,
} from '@busybox/eslint-config-text-document';
import { useTypescriptEslintConfig } from '@busybox/eslint-config-typescript';
import globals from 'globals';

import {
  useGraphQLEslintConfig,
  useTrustCodeFilesAsGraphQLEslintConfig,
} from './eslint-configs/graphql.js';
import { usePlaywrightEslintConfig } from './eslint-configs/playwright.js';
import pkgjson from './package.json' with { type: 'json' };

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
  useCodeSortingEslintConfig(),
  useYamlEslintConfig(),
  usePackageJsonEslintConfig(),
  useJSONEslintConfig(),
  usePlaywrightEslintConfig(),
];
