import { Logger } from '@nestjs/common';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { BaseRepository } from './base.repository';

class TestRepository extends BaseRepository {
  public testHandleError(error: any): never {
    return this.handleError(error);
  }
}

describe('BaseRepository', () => {
  let repository: TestRepository;

  beforeEach(() => {
    vi.spyOn(Logger.prototype, 'error').mockImplementation(vi.fn());
    repository = new TestRepository();
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(repository).toBeInstanceOf(TestRepository);
      expect(repository).toBeInstanceOf(BaseRepository);
    });
  });

  describe('handleError', () => {
    it('should throw with database error message when error has code', () => {
      const databaseError = {
        code: 'ER_DUP_ENTRY',
        message: 'Duplicate entry for key',
      };

      expect(() => {
        repository.testHandleError(databaseError);
      }).toThrow('Database error: Duplicate entry for key');
    });

    it('should throw generic error when error has no code', () => {
      const genericError = new Error('Some generic error');

      expect(() => {
        repository.testHandleError(genericError);
      }).toThrow('Unexpected database error');
    });

    it('should handle null error', () => {
      expect(() => {
        repository.testHandleError(null);
      }).toThrow('Unexpected database error');
    });

    it('should handle undefined error', () => {
      expect(() => {
        repository.testHandleError(undefined);
      }).toThrow('Unexpected database error');
    });
  });
});
