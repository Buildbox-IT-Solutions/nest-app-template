import { UserEntity } from '@ce-monorepo/shared';
import { IUserEntityProps } from '@ce-monorepo/shared/src/core/domain/entities/user/user.entity.interface';
import { Injectable } from '@nestjs/common';

import { BaseViewMapper } from './base-view.mapper';

@Injectable()
export class UserViewMapper extends BaseViewMapper<UserEntity, IUserEntityProps> {
  fromDto(dto: IUserEntityProps): UserEntity {
    return new UserEntity(dto);
  }

  fromEntity(entity: UserEntity): IUserEntityProps {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt || undefined,
    };
  }
}
