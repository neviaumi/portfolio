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

import { useAstroEslintConfig } from './eslint-configs/astro.js';
import {
  useGraphQLEslintConfig,
  useTrustCodeFilesAsGraphQLEslintConfig,
} from './eslint-configs/graphql.js';
import pkgjson from './package.json' with { type: 'json' };

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
  useESModuleEslintConfig(),
  useTypescriptEslintConfig(),
  useReactEslintConfig(),
  useAstroEslintConfig(),
  useTrustCodeFilesAsGraphQLEslintConfig(),
  useGraphQLEslintConfig(),
  useCodeSortingEslintConfig(),
  useYamlEslintConfig(),
  usePackageJsonEslintConfig(),
  useJSONEslintConfig(),
];
