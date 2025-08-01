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
import { Either, left, right } from 'fp-ts/lib/Either';
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
  ): Promise<Either<UserRepositoryFailure, UserEntity>> {
    try {
      const userModel = this.userModel.create(UsersMapperRepository.toModel(user));
      const savedUser = await this.userModel.save(userModel);

      return right(UsersMapperRepository.toEntity(savedUser));
    } catch {
      return left(new UserCreationError());
    }
  }

  async findAll(): Promise<Either<UserRepositoryFailure, UserEntity[]>> {
    try {
      const users = await this.userModel.find();

      return right(UsersMapperRepository.toEntityArray(users));
    } catch {
      return left(new UserRepositoryError());
    }
  }

  async findByEmail(
    email: string,
  ): Promise<Either<UserRepositoryFailure, UserEntity | null>> {
    try {
      const user = await this.userModel.findOne({ where: { email } });

      if (!user) {
        return right(null);
      }

      return right(UsersMapperRepository.toEntity(user));
    } catch {
      return left(new UserRepositoryError());
    }
  }

  async createMany(
    users: UserEntity[],
  ): Promise<Either<UserRepositoryFailure, UserEntity[]>> {
    try {
      const userModels = UsersMapperRepository.toModelArray(users);
      const savedUsers = await this.userModel.save(userModels);

      return right(UsersMapperRepository.toEntityArray(savedUsers));
    } catch {
      return left(new UserCreationError());
    }
  }
}
