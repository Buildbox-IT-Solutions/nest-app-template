import { BadRequestException } from '@nestjs/common';
import { AbstractI18nProvider } from '~/core/application/gateways/providers/i18n/i18n.provider.abstract';
import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';
import { UserInMemoryRepository } from '~/modules/account/infra/gateways/repositories/in-memory/user/user.in-memory.repository';
import { describe, it, vi } from 'vitest';

import { AbstractEncrypterProvider } from '../../gateways/providers/encrypter.provider';
import { AbstractUserRepository } from '../../gateways/repositories/user.repository';
import { CreateUserUseCase } from './create-user.use-case';

const baseUserData = {
  name: 'Random Name',
  email: 'email@gmail.com',
  cpf: '582.353.470-16',
  password: '12345',
};

const baseUser = new UserEntity(baseUserData);

describe('Create User UseCase', () => {
  let encrypterProviderHashMock = vi.fn();
  let i18nProviderTMock = vi.fn();
  let encrypterProvider: AbstractEncrypterProvider;
  let userRepository: AbstractUserRepository;
  let i18nProvider: AbstractI18nProvider;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    encrypterProvider = { hash: encrypterProviderHashMock, compare: vi.fn() };
    userRepository = new UserInMemoryRepository();
    i18nProvider = { t: i18nProviderTMock };
    createUserUseCase = new CreateUserUseCase(
      userRepository,
      encrypterProvider,
      i18nProvider,
    );
  });

  it('should throw a error when emails already exists', async () => {
    await userRepository.create(baseUser);
    await expect(() => createUserUseCase.execute(baseUserData)).rejects.toThrow(
      new BadRequestException(),
    );
    expect(i18nProvider.t).toHaveBeenCalledWith('general.ERROR.EMAIL_EXISTS');
  });

  it('should throw a error when cpf already exists', async () => {
    await userRepository.create(baseUser);
    const uniqueUser = new UserEntity({
      ...baseUserData,
      email: 'new_email@gmail.com',
    });

    await expect(() => createUserUseCase.execute(uniqueUser)).rejects.toThrow(
      new BadRequestException(),
    );
    expect(i18nProvider.t).toHaveBeenCalledWith('general.ERROR.CPF_EXISTS');
  });

  it('should create user successfuly', async () => {
    await createUserUseCase.execute(baseUserData);
    const userFound = await userRepository.findByEmail(baseUserData.email);
    expect(encrypterProviderHashMock).toHaveBeenCalledTimes(1);
    expect(userFound.email).toEqual(baseUserData.email);
  });
});
