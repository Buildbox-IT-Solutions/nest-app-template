import { UserEntity } from '@ce-monorepo/shared';
import { Id } from '@ce-monorepo/shared';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserViewMapper } from './user-view.mapper';

describe('UserViewMapper', () => {
  let entity: UserEntity;

  beforeEach(() => {
    entity = new UserEntity({
      id: new Id().value,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-02'),
      deletedAt: new Date('2023-01-03'),
    });
  });

  describe('fromDto', () => {
    it('should convert DTO to entity', () => {
      const dto = {
        id: new Id().value,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
        deletedAt: new Date('2023-01-03'),
      };

      const result = UserViewMapper.fromDto(dto);

      expect(result).toBeInstanceOf(UserEntity);
      expect(result.id.value).toBe(dto.id);
      expect(result.name).toBe(dto.name);
      expect(result.email.value).toBe(dto.email);
      expect(result.createdAt).toBe(dto.createdAt);
      expect(result.updatedAt).toBe(dto.updatedAt);
      expect(result.deletedAt).toBe(dto.deletedAt);
    });
  });

  describe('fromEntity', () => {
    it('should convert entity to DTO', () => {
      const result = UserViewMapper.fromEntity(entity);

      expect(result).toEqual({
        id: entity.id.value,
        name: entity.name,
        email: entity.email.value,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt,
      });
    });

    it('should handle null deletedAt', () => {
      entity.deletedAt = null;

      const result = UserViewMapper.fromEntity(entity);

      expect(result.deletedAt).toBeUndefined();
    });
  });

  describe('toListUsersResponse', () => {
    it('should convert DTO to list response', () => {
      const dto = {
        id: new Id().value,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
        deletedAt: new Date('2023-01-03'),
      };

      const result = UserViewMapper.toListUsersResponse(dto);

      expect(result).toEqual({
        id: dto.id,
        name: dto.name,
        email: dto.email,
      });
    });
  });
});
