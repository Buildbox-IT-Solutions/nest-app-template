import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';
import { UserInMemoryRepository } from '~/modules/account/infra/gateways/repositories/in-memory/user/user.in-memory.repository';
import { beforeEach, describe, it } from 'vitest';

import { AbstractUserRepository } from '../../gateways/repositories/user.repository';
import { ListUsersUseCase } from './list-users.use-case';

const baseUserData = {
  name: 'Random Name',
  email: 'email@gmail.com',
  cpf: '582.353.470-16',
  password: '12345',
};

const baseUser = new UserEntity(baseUserData);

describe('List Users UseCase', () => {
  let listUsersUseCase: ListUsersUseCase;
  let userRepository: AbstractUserRepository;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    listUsersUseCase = new ListUsersUseCase(userRepository);
  });

  it('should all users correctly', async () => {
    const secondUser = new UserEntity({
      cpf: '504.985.700-70',
      email: 'second@gmail.com',
      name: 'Second User',
      password: '12345',
    });
    await userRepository.create(baseUser);
    await userRepository.create(secondUser);

    const usersList = await listUsersUseCase.execute();
    expect(usersList.length).toEqual(2);
    expect(usersList[0].id).toEqual(baseUser.id.value);
    expect(usersList[1].id).toEqual(secondUser.id.value);
  });
});
