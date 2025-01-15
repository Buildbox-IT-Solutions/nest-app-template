import { z } from 'zod';

export class Email {
  private readonly _value: string;

  private static schema = z.string().email({ message: 'Invalid email address' });

  constructor(email: string) {
    this._value = Email.schema.parse(email);
  }

  get value() {
    return this._value;
  }
}
