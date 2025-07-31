import { v7 as uuidV7 } from 'uuid';
import { ZodError } from 'zod';

import { Id } from './id.value-object';

describe('Id Value Object', () => {
  describe('constructor', () => {
    it('should create a new UUID v7 when no id is provided', () => {
      const id = new Id();
      expect(id.value).toMatch(
        /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      );
    });

    it('should accept a valid UUID v7', () => {
      const validUUID = uuidV7();
      const id = new Id(validUUID);
      expect(id.value).toBe(validUUID);
    });

    it('should throw error when UUID version is not 7', () => {
      const invalidUUID = '01892790-1111-6333-8000-000000000000'; // version 6
      expect(() => new Id(invalidUUID)).toThrow(ZodError);
    });

    it('should throw error when UUID format is invalid', () => {
      const invalidUUID = 'invalid-uuid';
      expect(() => new Id(invalidUUID)).toThrow(ZodError);
    });

    it('should throw error when timestamp is in the future', () => {
      const futureUUID = 'FFFFFFFF-1111-7333-8000-000000000000'; // max timestamp
      expect(() => new Id(futureUUID)).toThrow(ZodError);
    });
  });

  describe('value getter', () => {
    it('should return the id string', () => {
      const validUUID = uuidV7();
      const id = new Id(validUUID);
      expect(id.value).toBe(validUUID);
    });
  });
});
