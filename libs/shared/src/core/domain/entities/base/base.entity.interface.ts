import { BasePrimaryKey } from '../../value-objects/id/id.value-object';

export interface IBaseEntityInterface {
  id?: BasePrimaryKey;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
