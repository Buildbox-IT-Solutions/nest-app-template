import { UserEntity } from '../entities/user/user.entity';
import { IUserEntityProps } from '../entities/user/user.entity.interface';
import { BaseMapper } from './base.mapper';

export abstract class UserMapper extends BaseMapper<UserEntity, IUserEntityProps> {
  static toDTO(entity: UserEntity): IUserEntityProps {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt || undefined,
    };
  }

  static toEntity(dto: IUserEntityProps): UserEntity {
    return new UserEntity(dto);
  }
}
