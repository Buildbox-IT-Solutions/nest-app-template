import Id from '~/core/domain/value-objects/id.value-object';
import { AbstractUserRepository } from '~/modules/account/application/gateways/repositories/user.repository';
import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';
import { describe, it } from 'vitest';

import { UserInMemoryRepository } from './user.in-memory.repository';

const baseUser: UserEntity = new UserEntity({
  id: new Id('1'),
  name: 'John Doe',
  email: 'john@example.com',
  cpf: '582.353.470-16',
});

describe('UserInMemoryRepository', () => {
  let userRepository: AbstractUserRepository;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
  });

  it('should find a user by cpf', async () => {
    await userRepository.create(baseUser);
    const user = await userRepository.findByCpf(baseUser.cpf);
    expect(user).toEqual(baseUser);
  });

  it('should find a user by email', async () => {
    await userRepository.create(baseUser);
    const user = await userRepository.findByEmail(baseUser.email);
    expect(user).toEqual(baseUser);
  });
});
