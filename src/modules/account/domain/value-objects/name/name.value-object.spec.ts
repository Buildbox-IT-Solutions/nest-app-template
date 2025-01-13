import { describe } from 'vitest';

import { Name } from './name.value-object';

describe('Name - Value Object', () => {
  it('should throw a error when name is invalid', () => {
    expect(() => new Name('Invalid')).toThrow(new Error('Invalid name'));
  });

  it('should instance a name when is valid', () => {
    const newName = 'Valid name';
    const name = new Name(newName);
    expect(name.value).toBe(newName);
  });
});
