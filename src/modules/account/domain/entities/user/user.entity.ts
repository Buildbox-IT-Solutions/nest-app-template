import BaseEntity from '~/core/domain/entity/base.entity';

import { Cpf } from '../../value-objects/cpf/cpf.value-object';
import { Email } from '../../value-objects/email/email.value-object';
import { Name } from '../../value-objects/name/name.value-object';
import { Password } from '../../value-objects/password/password.value-object';
import { IUserEntityProps } from './user.entity.interface';

export class UserEntity extends BaseEntity {
  private _name: Name;
  private _email: Email;
  private _cpf: Cpf;
  private _password?: Password;
  private _active: boolean = true;

  constructor(props: IUserEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = new Name(props.name);
    this._email = new Email(props.email);
    this._cpf = new Cpf(props.cpf);
    this._active = props.active;
    if (props.password) this._password = new Password(props.password);
  }

  changeName(name: string) {
    const newName = new Name(name);
    this._name = newName;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get name() {
    return this._name.value;
  }

  get email() {
    return this._email.value;
  }

  get cpf() {
    return this._cpf.value;
  }

  get password() {
    return this._password.value;
  }

  get active() {
    return this._active;
  }
}
