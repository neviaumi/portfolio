import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';

import pkgjson from '../package.json' with { type: 'json' };

export function useAstroEslintConfig() {
  return {
    files: ['**/*.astro'],
    languageOptions: { parser: astroEslintParser },
    name: pkgjson.name,
    plugins: {
      astro: eslintPluginAstro,
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules, // Recommended config applied to all files
    },
  };
}
