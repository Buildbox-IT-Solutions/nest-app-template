import {
  AbstractI18nProvider,
  AbstractUsersRepository,
  UserEntity,
  UserMapper,
} from '@ce-monorepo/shared';
import { InternalServerErrorException } from '@nestjs/common';
import { left, right } from 'fp-ts/lib/Either';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { ListUsersUseCase } from './list-users.use-case';

describe('ListUsersUseCase', () => {
  let useCase: ListUsersUseCase;
  let mockI18nProvider: AbstractI18nProvider;
  let mockUsersRepository: AbstractUsersRepository;

  beforeEach(() => {
    mockI18nProvider = {
      t: vi.fn((key: string) => key),
    };

    mockUsersRepository = {
      findAll: vi.fn(),
      create: vi.fn(),
      findByEmail: vi.fn(),
    };

    useCase = new ListUsersUseCase(mockI18nProvider, mockUsersRepository);
  });

  describe('execute', () => {
    it('should return users list successfully', async () => {
      const users = [
        new UserEntity({ name: 'John Doe', email: 'john@example.com' }),
        new UserEntity({ name: 'Jane Smith', email: 'jane@example.com' }),
      ];

      vi.spyOn(mockUsersRepository, 'findAll').mockResolvedValue(right(users));

      const result = await useCase.execute();

      expect(result).toEqual([
        UserMapper.toDTO(users[0]),
        UserMapper.toDTO(users[1]),
      ]);
      expect(mockUsersRepository.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no users exist', async () => {
      vi.spyOn(mockUsersRepository, 'findAll').mockResolvedValue(right([]));

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(mockUsersRepository.findAll).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when findAll fails', async () => {
      vi.spyOn(mockUsersRepository, 'findAll').mockResolvedValue(
        left(new Error('DB Error')),
      );

      await expect(useCase.execute()).rejects.toThrow(InternalServerErrorException);
      expect(mockI18nProvider.t).toHaveBeenCalledWith(
        'errors.REPOSITORY.FAILED_TO_FETCH_USERS',
      );
    });
  });
});
