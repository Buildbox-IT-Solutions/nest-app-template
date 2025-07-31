import { CpfValidator } from '~shared/common/validations/cpf/cpf.validator';
import { z } from 'zod';

export class Cpf {
  private readonly _value: string;

  private static schema = z.string().refine(
    (cpf) => {
      const validator = new CpfValidator();
      return validator.validate(cpf);
    },
    { message: 'Invalid CPF' },
  );

  constructor(cpf: string) {
    this._value = Cpf.schema.parse(cpf);
  }

  get value() {
    return this._value;
  }
}
