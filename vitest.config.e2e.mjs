import { mergeConfig } from 'vitest/config';
import vitestConfig from './vitest.config.mjs';

export default mergeConfig(vitestConfig, {
  test: {
    name: 'e2e',
    include: ['./__e2e__/**/*.e2e-spec.ts'],
    exclude: ['./src/', 'src/**/*.spec.ts']
  },
});
