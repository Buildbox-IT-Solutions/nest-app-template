import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '~shared/core/application/gateways/repositories/base/base.repository';
import { AbstractUsersRepository } from '~shared/core/application/gateways/repositories/users/users.repository.abstract';
import { UserEntity } from '~shared/core/domain/entities/user/user.entity';
import { Repository } from 'typeorm';

import { TypeORMUserModel } from './models/user.model';

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

  async create(user: UserEntity): Promise<UserEntity | null> {
    try {
      const { id, name, email } = user;

      const userModel = this.userModel.create({
        id: id.value,
        name,
        email: email.value,
      });

      const savedUser = await this.userModel.save(userModel);
      return new UserEntity(savedUser);
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userModel.find();
      return users.map((user) => new UserEntity(user));
    } catch (error) {
      this.handleError(error);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      return user ? new UserEntity(user) : null;
    } catch (error) {
      this.handleError(error);
    }
  }
}
