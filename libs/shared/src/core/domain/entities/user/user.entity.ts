import { Email } from '../../value-objects/email/email.value-object';
import { Id } from '../../value-objects/id/id.value-object';
import { BaseEntity } from '../base/base.entity';
import { IUserEntityProps } from './user.entity.interface';

export class UserEntity extends BaseEntity {
  private _name: string;
  private _email: Email;

  constructor(props: IUserEntityProps) {
    super({
      id: new Id(props.id),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    this._name = props.name;
    this._email = new Email(props.email);
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  changeEmail(email: string) {
    this._email = new Email(email);
  }
}
