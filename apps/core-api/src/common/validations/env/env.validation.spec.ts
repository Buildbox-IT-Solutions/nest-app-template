import 'reflect-metadata';
import { EEnvironment } from '@ce-monorepo/shared';

import { validate } from './env.validation';

describe('Environment Variables Validation', () => {
  const validConfig = {
    PORT: '3000',
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
    ENVIRONMENT: EEnvironment.LOCAL,
  };

  it('should validate correct environment variables', () => {
    expect(() => validate(validConfig)).not.toThrow();
  });

  it('should validate when PORT is not provided (optional)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { PORT: _, ...configWithoutPort } = { ...validConfig };

    expect(() => validate(configWithoutPort)).not.toThrow();
  });

  it('should throw error when required string fields are missing', () => {
    const requiredFields = ['DATABASE_URL', 'ENVIRONMENT'];

    for (const field of requiredFields) {
      const invalidConfig = { ...validConfig };
      delete invalidConfig[field as keyof typeof invalidConfig];

      expect(() => validate(invalidConfig)).toThrow();
    }
  });
});
