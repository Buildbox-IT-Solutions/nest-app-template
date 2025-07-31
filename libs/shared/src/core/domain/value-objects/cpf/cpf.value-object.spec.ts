import { describe } from 'vitest';

import { Cpf } from './cpf.value-object';

describe('CPF Value Object', () => {
  describe('constructor', () => {
    it('should create a valid CPF', () => {
      const validCpf = '529.982.247-25';
      const cpf = new Cpf(validCpf);
      expect(cpf.value).toBe(validCpf);
    });

    it('should create a valid CPF without special characters', () => {
      const validCpf = '52998224725';
      const cpf = new Cpf(validCpf);
      expect(cpf.value).toBe(validCpf);
    });

    it('should throw error if CPF is invalid', () => {
      const invalidCpf = '111.111.111-11';
      expect(() => new Cpf(invalidCpf)).toThrow('Invalid CPF');
    });

    it('should throw error if CPF has invalid format', () => {
      const invalidCpf = '123.456.789';
      expect(() => new Cpf(invalidCpf)).toThrow('Invalid CPF');
    });

    it('should throw error if CPF is empty', () => {
      const invalidCpf = '';
      expect(() => new Cpf(invalidCpf)).toThrow('Invalid CPF');
    });
  });

  describe('value getter', () => {
    it('should return the CPF value', () => {
      const validCpf = '529.982.247-25';
      const cpf = new Cpf(validCpf);
      expect(cpf.value).toBe(validCpf);
    });
  });
});
