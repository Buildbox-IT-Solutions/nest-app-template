import { BaseMapper } from '~/core/domain/mapper/base.mapper';
import Id from '~/core/domain/value-objects/id.value-object';

import { UserEntity } from '../entities/user/user.entity';
import { IUserEntityDto } from '../entities/user/user.entity.interface';

export abstract class UserMapper extends BaseMapper<UserEntity, IUserEntityDto> {
  static toDTO(entity: UserEntity): IUserEntityDto {
    return {
      id: entity.id.value,
      name: entity.name,
      email: entity.email,
      cpf: entity.cpf,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toEntity(dto: IUserEntityDto): UserEntity {
    return new UserEntity({
      id: new Id(dto.id),
      name: dto.name,
      email: dto.email,
      cpf: dto.cpf,
      active: dto.active,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
  }
}
