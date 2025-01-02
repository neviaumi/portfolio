import graphqlPlugin from '@graphql-eslint/eslint-plugin';

import pkgjson from '../package.json' with { type: 'json' };

const configName = `${pkgjson.name}/graphql`;

export function useTrustCodeFilesAsGraphQLEslintConfig() {
  return {
    files: ['**/*.ts', '**/*.tsx'],
    name: configName,
    processor: graphqlPlugin.processor,
  };
}

export function useGraphQLEslintConfig() {
  return {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
      parserOptions: {
        graphQLConfig: {
          documents: '../cms/tina/__generated__/!(schema).gql',
          schema: '../cms/tina/__generated__/schema.gql',
        },
      },
    },
    name: configName,
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      ...graphqlPlugin.configs['flat/operations-recommended'].rules,
      '@graphql-eslint/alphabetize': [
        'error',
        {
          arguments: [
            'FieldDefinition',
            'Field',
            'DirectiveDefinition',
            'Directive',
          ],
          definitions: true,
          fields: [
            'ObjectTypeDefinition',
            'InterfaceTypeDefinition',
            'InputObjectTypeDefinition',
          ],
          selections: ['OperationDefinition', 'FragmentDefinition'],
          values: true,
          variables: true,
        },
      ],
    },
  };
}
