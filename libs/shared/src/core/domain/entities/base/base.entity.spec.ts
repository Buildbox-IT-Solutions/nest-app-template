import { describe, expect, it, beforeEach } from 'vitest';

import { Id } from '../../value-objects/id/id.value-object';
import { BaseEntity } from './base.entity';

describe('BaseEntity', () => {
  let baseEntity: BaseEntity;
  let mockDate: Date;
  let mockId: Id;

  beforeEach(() => {
    mockDate = new Date();
    mockId = new Id();
    baseEntity = new BaseEntity({
      id: mockId,
      createdAt: mockDate,
      updatedAt: mockDate,
      deletedAt: null,
    });
  });

  describe('constructor', () => {
    it('should create an instance with provided values', () => {
      expect(baseEntity.id).toBe(mockId);
      expect(baseEntity.createdAt).toBe(mockDate);
      expect(baseEntity.updatedAt).toBe(mockDate);
      expect(baseEntity.deletedAt).toBeNull();
    });

    it('should create an instance with default values when no parameters are provided', () => {
      const entity = new BaseEntity({});

      expect(entity.id).toBeInstanceOf(Id);
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.updatedAt).toBeInstanceOf(Date);
      expect(entity.deletedAt).toBeNull();
    });
  });

  describe('getters and setters', () => {
    it('should get id correctly', () => {
      expect(baseEntity.id).toBe(mockId);
    });

    it('should get createdAt correctly', () => {
      expect(baseEntity.createdAt).toBe(mockDate);
    });

    it('should get and set updatedAt correctly', () => {
      const newDate = new Date();
      baseEntity.updatedAt = newDate;
      expect(baseEntity.updatedAt).toBe(newDate);
    });

    it('should get and set deletedAt correctly', () => {
      const newDate = new Date();
      baseEntity.deletedAt = newDate;
      expect(baseEntity.deletedAt).toBe(newDate);

      baseEntity.deletedAt = null;
      expect(baseEntity.deletedAt).toBeNull();
    });
  });
});
