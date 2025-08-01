/// <reference types='vitest' />
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/shared',
  plugins: [],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '~shared': resolve(__dirname, './src'),
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
      include: ['src/core/**/*.ts', 'src/common/**/*.ts', 'src/modules/**/*.ts'],
      exclude: [
        '**/*.facade.ts',
        '**/*.decorator.ts',
        '**/*.enum.ts',
        '**/*.interface.ts',
        '**/*.consumer.ts',
        '**/*.interceptor.ts',
        '**/*.abstract.ts',
        '**/*.provider.ts',
        '**/*.controller.ts',
        '**/*.dto.ts',
        '**/*.module.ts',
        '**/*.module.ts',
        '**/*.input.ts',
        'src/core/infra/**/*.ts',
        'src/common/utils/**/*.ts',
        'src/modules/**/infra/**/*.ts',
        '**/*.errors.ts',
      ],
    },
  },
}));
