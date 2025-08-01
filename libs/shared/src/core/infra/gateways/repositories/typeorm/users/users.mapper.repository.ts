import { BaseMapperRepository } from '~shared/core/application/gateways/repositories/base/base.mapper.repository';
import { UserEntity } from '~shared/core/domain/entities/user/user.entity';

import { TypeORMUserModel } from '../_models/user.model';

export abstract class UsersMapperRepository extends BaseMapperRepository<
  TypeORMUserModel,
  UserEntity
> {
  static toEntity(model: TypeORMUserModel): UserEntity {
    return new UserEntity({
      id: model.id,
      name: model.name,
      email: model.email,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }

  static toEntityArray(models: TypeORMUserModel[]): UserEntity[] {
    return models.map((model) => this.toEntity(model));
  }

  static toModel(entity: UserEntity): Partial<TypeORMUserModel> {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt || undefined,
    };
  }

  static toModelArray(entities: UserEntity[]): Partial<TypeORMUserModel>[] {
    return entities.map((entity) => this.toModel(entity));
  }
}
