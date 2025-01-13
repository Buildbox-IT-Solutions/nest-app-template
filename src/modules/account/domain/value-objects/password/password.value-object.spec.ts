import { describe } from 'vitest';

import { Password } from './password.value-object';

describe('Name - Value Object', () => {
  it('should throw a error when password is less than 4 characteres', () => {
    expect(() => new Password('123')).toThrow(
      new Error('password must have at least 4 characters').message,
    );
  });

  it('should instance a password when is valid', () => {
    const validPassword = '123456';
    const password = new Password(validPassword);
    expect(password.value).toBe(validPassword);
  });

  it('should instance a password when is encrypted', () => {
    const encryptedPassword = 'encrypted-password';
    const password = new Password(encryptedPassword, true);
    expect(password.value).toBe(encryptedPassword);
  });
});
