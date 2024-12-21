import globals from 'globals';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Customize Playwright rules
      // ...
    },
  },
];

export function usePlaywrightEslintConfig() {
  return {
    languageOptions: {
      globals: globals['shared-node-browser'],
    },
    plugins: {
      playwright,
    },
    files: ['tests/**/*.spec.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  };
}
