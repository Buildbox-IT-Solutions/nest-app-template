import { UserEntity } from '@ce-monorepo/shared';
import { IUserEntityProps } from '@ce-monorepo/shared/src/core/domain/entities/user/user.entity.interface';

import { BaseViewMapper } from '../base/base-view.mapper.abstract';

export abstract class UserViewMapper extends BaseViewMapper<
  UserEntity,
  IUserEntityProps
> {
  static fromDto(dto: IUserEntityProps): UserEntity {
    return new UserEntity(dto);
  }

  static fromEntity(entity: UserEntity): IUserEntityProps {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt || undefined,
    };
  }

  static toListUsersResponse(dto: IUserEntityProps) {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
    };
  }
}
