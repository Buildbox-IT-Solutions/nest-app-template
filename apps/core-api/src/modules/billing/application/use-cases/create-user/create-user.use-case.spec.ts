import {
  AbstractI18nProvider,
  AbstractUsersRepository,
  UserEntity,
} from '@ce-monorepo/shared';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as Either from 'effect/Either';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockI18nProvider: AbstractI18nProvider;
  let mockUsersRepository: AbstractUsersRepository;

  beforeEach(() => {
    mockI18nProvider = {
      t: vi.fn((key: string) => key),
    };

    mockUsersRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findAll: vi.fn(),
    };

    useCase = new CreateUserUseCase(mockI18nProvider, mockUsersRepository);
  });

  describe('execute', () => {
    const validInput = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    it('should create user successfully', async () => {
      vi.spyOn(mockUsersRepository, 'findByEmail').mockResolvedValue(
        Either.right(null),
      );
      vi.spyOn(mockUsersRepository, 'create').mockResolvedValue(
        Either.right(new UserEntity(validInput)),
      );

      const result = await useCase.execute(validInput);

      expect(result).toEqual({
        email: 'john@example.com',
        name: 'John Doe',
      });
      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        'john@example.com',
      );
      expect(mockUsersRepository.create).toHaveBeenCalledWith(
        expect.any(UserEntity),
      );
    });

    it('should throw BadRequestException when user already exists', async () => {
      const existingUser = new UserEntity(validInput);
      vi.spyOn(mockUsersRepository, 'findByEmail').mockResolvedValue(
        Either.right(existingUser),
      );

      await expect(useCase.execute(validInput)).rejects.toThrow(BadRequestException);
      expect(mockI18nProvider.t).toHaveBeenCalledWith('errors.USER.ALREADY_EXISTS');
    });

    it('should throw InternalServerErrorException when findByEmail fails', async () => {
      vi.spyOn(mockUsersRepository, 'findByEmail').mockResolvedValue(
        Either.left(new Error('DB Error')),
      );

      await expect(useCase.execute(validInput)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockI18nProvider.t).toHaveBeenCalledWith(
        'errors.REPOSITORY.FAILED_TO_FIND_USER',
      );
    });

    it('should throw InternalServerErrorException when create fails', async () => {
      vi.spyOn(mockUsersRepository, 'findByEmail').mockResolvedValue(
        Either.right(null),
      );
      vi.spyOn(mockUsersRepository, 'create').mockResolvedValue(
        Either.left(new Error('DB Error')),
      );

      await expect(useCase.execute(validInput)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockI18nProvider.t).toHaveBeenCalledWith(
        'errors.REPOSITORY.FAILED_TO_CREATE_USER',
      );
    });
  });
});
