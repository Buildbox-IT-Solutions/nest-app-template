import { beforeEach, describe, expect, it } from 'vitest';

import { UserEntity } from '../../entities/user/user.entity';
import { Id } from '../../value-objects/id/id.value-object';
import { UserMapper } from './user.mapper';

describe('UserMapper', () => {
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

  describe('toDTO', () => {
    it('should convert entity to DTO', () => {
      const dto = UserMapper.toDTO(entity);

      expect(dto).toEqual({
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

      const dto = UserMapper.toDTO(entity);

      expect(dto.deletedAt).toBeNull();
    });
  });

  describe('toEntity', () => {
    it('should convert DTO to entity', () => {
      const dto = {
        id: new Id().value,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
        deletedAt: new Date('2023-01-03'),
      };

      const entity = UserMapper.toEntity(dto);

      expect(entity).toBeInstanceOf(UserEntity);
      expect(entity.id.value).toBe(dto.id);
      expect(entity.name).toBe(dto.name);
      expect(entity.email.value).toBe(dto.email);
      expect(entity.createdAt).toBe(dto.createdAt);
      expect(entity.updatedAt).toBe(dto.updatedAt);
      expect(entity.deletedAt).toBe(dto.deletedAt);
    });
  });
});
