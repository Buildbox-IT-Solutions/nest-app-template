import { mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config.mjs';

export default mergeConfig(vitestConfig, {
  test: {
    name: 'e2e',
    include: ['**/*.e2e-spec.ts'],
    exclude: ['**/*.spec.ts']
  },
});
