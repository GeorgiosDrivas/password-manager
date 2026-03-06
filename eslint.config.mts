import js from '@eslint/js';
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

const config = [
  {
    ignores: ['node_modules/**', '.next/**', 'prisma/generated/**', 'src/generated/**', 'auth.ts'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...next,
  prettier,

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/incompatible-library': 'off',
    },
  },
];

export default config;
