import { z } from 'zod';

export class Password {
  private readonly _value: string;

  private static schema = z
    .string()
    .min(4, { message: 'password must have at least 4 characters' });

  constructor(password: string, isEncrypted = false) {
    if (!isEncrypted) {
      this._value = Password.schema.parse(password);
    }

    this._value = password;
  }

  get value() {
    return this._value;
  }
}
