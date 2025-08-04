import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '~shared/core/application/gateways/repositories/base/base.repository';
import { AbstractUsersRepository } from '~shared/core/application/gateways/repositories/users/users.repository.abstract';
import {
  UserCreationError,
  UserRepositoryError,
  UserRepositoryFailure,
} from '~shared/core/application/gateways/repositories/users/users.repository.errors';
import { UserEntity } from '~shared/core/domain/entities/user/user.entity';
import * as Either from 'effect/Either';
import { Repository } from 'typeorm';

import { TypeORMUserModel } from '../_models/user.model';
import { UsersMapperRepository } from './users.mapper.repository';

@Injectable()
export class TypeORMUsersRepository
  extends BaseRepository
  implements AbstractUsersRepository
{
  constructor(
    @InjectRepository(TypeORMUserModel)
    private readonly userModel: Repository<TypeORMUserModel>,
  ) {
    super();
  }

  async create(
    user: UserEntity,
  ): Promise<Either.Either<UserEntity, UserRepositoryFailure>> {
    try {
      const userModel = this.userModel.create(UsersMapperRepository.toModel(user));
      const savedUser = await this.userModel.save(userModel);

      return Either.right(UsersMapperRepository.toEntity(savedUser));
    } catch {
      return Either.left(new UserCreationError());
    }
  }

  async findAll(): Promise<Either.Either<UserEntity[], UserRepositoryFailure>> {
    try {
      const users = await this.userModel.find();

      return Either.right(UsersMapperRepository.toEntityArray(users));
    } catch {
      return Either.left(new UserRepositoryError());
    }
  }

  async findByEmail(
    email: string,
  ): Promise<Either.Either<UserEntity | null, UserRepositoryFailure>> {
    try {
      const user = await this.userModel.findOne({ where: { email } });

      if (!user) {
        return Either.right(null);
      }

      return Either.right(UsersMapperRepository.toEntity(user));
    } catch {
      return Either.left(new UserRepositoryError());
    }
  }

  async createMany(
    users: UserEntity[],
  ): Promise<Either.Either<UserEntity[], UserRepositoryFailure>> {
    try {
      const userModels = UsersMapperRepository.toModelArray(users);
      const savedUsers = await this.userModel.save(userModels);

      return Either.right(UsersMapperRepository.toEntityArray(savedUsers));
    } catch {
      return Either.left(new UserCreationError());
    }
  }
}
