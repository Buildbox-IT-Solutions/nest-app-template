import baseConfig from '../../eslint.config.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: [
      'vite.config.ts',
      'vite.config.mts',
      'vitest.config.ts',
      'vitest.config.mjs',
    ],
    languageOptions: {
      parserOptions: {
        project: path.resolve(__dirname, 'tsconfig.app.json'),
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*.spec.tsx', '**/*.test.tsx'],
    languageOptions: {
      parserOptions: {
        project: path.resolve(__dirname, 'tsconfig.spec.json'),
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: [
      'vite.config.ts',
      'vite.config.mts',
      'vitest.config.ts',
      'vitest.config.mjs',
    ],
    languageOptions: {
      parserOptions: {
        project: null,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
];
