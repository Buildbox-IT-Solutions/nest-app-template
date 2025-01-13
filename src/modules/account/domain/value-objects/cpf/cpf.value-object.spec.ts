import { describe } from 'vitest';

import { Cpf } from './cpf.value-object';

describe('Cpf - Value Object', () => {
  test.each([null, undefined, '', '11111111111'])(
    "shouldn't validate the cpf %s",
    function (cpf: string) {
      expect(() => new Cpf(cpf)).toThrow(new Error('Invalid cpf')?.message);
    },
  );

  it('should instance a cpf when is valid', () => {
    const validCpf = '582.353.470-16';
    const cpf = new Cpf(validCpf);
    expect(cpf.value).toBe(validCpf);
  });
});
