import { AbstractBaseRepository } from '~/core/application/gateways/repositories/base.repository';
import Id from '~/core/domain/value-objects/id.value-object';
import { describe, it } from 'vitest';

import { BaseInMemoryRepository } from './in-memory.repository.base';

interface User {
  id: Id;
  name: string;
  email: string;
}

const baseUser = {
  id: new Id('1'),
  name: 'John Doe',
  email: 'john@example.com',
};

describe('InMemoryRepository', () => {
  let userRepository: AbstractBaseRepository<User>;

  beforeEach(() => {
    userRepository = new BaseInMemoryRepository<User>();
  });

  it('should create a user', async () => {
    await userRepository.create(baseUser);
    const user = await userRepository.findById(baseUser.id.value);
    expect(user).toEqual(baseUser);
  });

  it('should throw a error when user already exists on creation', async () => {
    await userRepository.create(baseUser);
    await expect(() => userRepository.create(baseUser)).rejects.toThrow(
      new Error(`Entity with id "${baseUser.id.value}" already exists.`),
    );
  });

  it('should find a user by ID', async () => {
    await userRepository.create(baseUser);
    const user = await userRepository.findById(baseUser.id.value);
    expect(user).toEqual(baseUser);
  });

  it('should return undefined when search a non-existing user', async () => {
    const nonExistingId = 'non-existing-id';
    const user = await userRepository.findById(nonExistingId);
    expect(user).toBeUndefined();
  });

  it('should update a user', async () => {
    await userRepository.create(baseUser);
    const userToUpdate = {
      ...baseUser,
      name: 'John Smith',
    };
    await userRepository.update(userToUpdate);
    const userUpdated = await userRepository.findById(userToUpdate.id.value);
    expect(userUpdated).toEqual(userToUpdate);
  });

  it('should delete a user', async () => {
    await userRepository.create(baseUser);
    await userRepository.delete(baseUser.id.value);
    const userFound = await userRepository.findById(baseUser.id.value);
    expect(userFound).toBeUndefined();
  });

  it('should throw a error when deleting a non-existing user', async () => {
    const nonExistingId = 'non-existing-id';
    await expect(() => userRepository.delete(nonExistingId)).rejects.toThrow(
      new Error(`Entity with id "${nonExistingId}" not found.`),
    );
  });
});
