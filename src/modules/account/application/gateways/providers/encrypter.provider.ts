import { Password } from '~/modules/account/domain/value-objects/password/password.value-object';

export abstract class AbstractEncrypterProvider {
  abstract compare(password: Password, userPassword: string): Promise<boolean>;
  abstract hash(password: Password, salt: number): Promise<string>;
}
