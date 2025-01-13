import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    exclude: ['./dist'],
    globals: true,
    root: './',
    alias: {
      '~': new URL('./src/', import.meta.url).pathname,
    },
    passWithNoTests: true,
    coverage: {
      include: ['src/modules/**/*.ts', 'src/core/**/*.ts'],
      exclude: ['**/*.facade.ts'],
      all: false,
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
    tsconfigPaths(),
  ],
});
