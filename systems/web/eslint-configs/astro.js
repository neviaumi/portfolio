import astroEslintParser from 'astro-eslint-parser';
import eslintPluginAstro from 'eslint-plugin-astro';

import pkgjson from '../package.json' with { type: 'json' };

const configName = `${pkgjson.name}/astro`;

export function useAstroEslintConfig() {
  return {
    files: ['**/*.astro'],
    languageOptions: { parser: astroEslintParser },
    name: configName,
    plugins: {
      astro: eslintPluginAstro,
    },
    rules: {
      ...eslintPluginAstro.configs['flat/recommended'].find(
        config => config.name === 'astro/recommended',
      ).rules, // Recommended config applied to all files
    },
  };
}
