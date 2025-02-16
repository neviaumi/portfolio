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
    ignores: ['package-lock.json', 'web-components/**/*'],
    name: pkgjson.name,
  },
  {
    languageOptions: {
      globals: globals.node,
    },
    name: pkgjson.name,
  },
  withOverride({
    rules: {
      'no-console': 'off',
    },
  })(useESModuleEslintConfig)(),
  withOverride({
    rules: {
      'perfectionist/sort-classes': [
        'error',
        {
          groups: [
            'index-signature',
            'static-property',
            'static-block',
            ['property', 'accessor-property'],
            ['protected-property', 'protected-accessor-property'],
            ['private-property', 'private-accessor-property'],
            'static-method',
            'constructor',
            ['get-method', 'set-method'],
            'method',
            'protected-method',
            'private-method',
            'unknown',
          ],
        },
      ],
    },
  })(useCodeSortingEslintConfig)(),
  useYamlEslintConfig(),
  usePackageJsonEslintConfig(),
  useTypescriptEslintConfig(),
  useJSONEslintConfig(),
];
