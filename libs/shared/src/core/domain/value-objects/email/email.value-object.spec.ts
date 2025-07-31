import { describe } from 'vitest';

import { Email } from './email.value-object';

describe('Email - Value Object', () => {
  it.each(['@gmail.com', 'test.com', 'invalid', 'invalid@invalid.'])(
    "shouldn't validate the email %s",
    (email: string) => {
      expect(() => new Email(email)).toThrow(
        new Error('Invalid email address').message,
      );
    },
  );

  it('should instance a email when is valid', () => {
    const newName = 'valid_email@gmail.com';
    const name = new Email(newName);
    expect(name.value).toBe(newName);
  });
});
