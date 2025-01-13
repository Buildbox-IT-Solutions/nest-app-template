import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { z } from 'zod';

export class Cpf {
  private readonly _value: string;

  private static schema = z
    .string({
      required_error: 'Invalid cpf',
      invalid_type_error: 'Invalid cpf',
    })
    .refine((cpf) => cpfValidator.isValid(cpf), { message: 'Invalid cpf' });

  constructor(cpf: string) {
    this._value = Cpf.schema.parse(cpf);
  }

  get value() {
    return this._value;
  }
}
