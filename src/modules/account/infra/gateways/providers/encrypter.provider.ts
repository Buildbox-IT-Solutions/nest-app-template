import { Injectable } from '@nestjs/common';
import { AbstractEncrypterProvider } from '~/modules/account/application/gateways/providers/encrypter.provider';
import { Password } from '~/modules/account/domain/value-objects/password/password.value-object';
import { compare, hash } from 'bcrypt';

@Injectable()
export class EncrypterProvider implements AbstractEncrypterProvider {
  public async compare(password: Password, userPassword: string): Promise<boolean> {
    return compare(password.value, userPassword);
  }

  hash(password: Password, salt: number): Promise<string> {
    return hash(password.value, salt);
  }
}
