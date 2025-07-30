/// <reference types='vitest' />
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/core-api',
  plugins: [],
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
      include: ['src/modules/**/*.ts', 'src/common/**/*.ts'],
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
        'src/core/infra/**/*.ts',
        'src/common/utils/**/*.ts',
        'src/modules/**/infra/**/*.ts',
      ],
    },
  },
}));
