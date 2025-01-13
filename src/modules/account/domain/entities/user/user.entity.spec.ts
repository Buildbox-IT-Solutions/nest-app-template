import { describe, it } from 'vitest';

import { UserEntity } from './user.entity';
import { IUserEntityProps } from './user.entity.interface';

const defaultUserProps: IUserEntityProps = {
  name: 'Valid Name',
  email: 'name@gmail.com',
  cpf: '582.353.470-16',
  password: 'password',
  active: true,
};

describe('UserEntity', () => {
  it('should create a user correctly', () => {
    const user = new UserEntity(defaultUserProps);

    expect(user.name).toBe(defaultUserProps.name);
    expect(user.email).toBe(defaultUserProps.email);
    expect(user.cpf).toBe(defaultUserProps.cpf);
    expect(user.active).toBe(defaultUserProps.active);
    expect(user.password).toBe(defaultUserProps.password);
  });

  it('should activate user', () => {
    const userProps = {
      ...defaultUserProps,
      active: false,
    };
    const user = new UserEntity(userProps);

    expect(user.active).toBe(false);
    user.activate();
    expect(user.active).toBe(true);
  });

  it('should deactivate user', () => {
    const userProps = {
      ...defaultUserProps,
      active: true,
    };
    const user = new UserEntity(userProps);

    expect(user.active).toBe(true);
    user.deactivate();
    expect(user.active).toBe(false);
  });

  it('should change name of user', () => {
    const userProps = {
      ...defaultUserProps,
      active: true,
    };
    const user = new UserEntity(userProps);
    const newName = 'New Name';
    user.changeName(newName);
    expect(user.name).toBe(newName);
  });
});
