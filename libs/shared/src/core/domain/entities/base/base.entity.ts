import { BasePrimaryKey, Id } from '../../value-objects/id/id.value-object';
import { IBaseEntityInterface } from './base.entity.interface';

export class BaseEntity {
  private _id: BasePrimaryKey;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor(
    { id, createdAt, updatedAt, deletedAt }: IBaseEntityInterface,
    private readonly IdConstructor: new (value?: string) => BasePrimaryKey = Id,
  ) {
    this._id = id || new this.IdConstructor();
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
    this._deletedAt = deletedAt || null;
  }

  changeUpdatedAt() {
    this.updatedAt = new Date();
  }

  get id(): BasePrimaryKey {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  set deletedAt(deletedAt: Date | null) {
    this._deletedAt = deletedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }
}
