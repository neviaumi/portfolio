import playwright from 'eslint-plugin-playwright';
import globals from 'globals';

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
    files: ['tests/**/*.spec.ts'],
    languageOptions: {
      globals: globals['shared-node-browser'],
    },
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
    },
  };
}
