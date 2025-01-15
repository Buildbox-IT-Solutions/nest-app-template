import { Injectable } from '@nestjs/common';
import AbstractUseCase from '~/core/application/use-cases/use-case.abstract';
import { AbstractUserRepository } from '~/modules/account/application/gateways/repositories/user.repository';
import { IUserEntityDto } from '~/modules/account/domain/entities/user/user.entity.interface';
import { UserMapper } from '~/modules/account/domain/mappers/user.mapper';

@Injectable()
export class ListUsersUseCase implements AbstractUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(): Promise<IUserEntityDto[]> {
    const users = await this.userRepository.findAll();
    const usersMapped = users.map((user) => UserMapper.toDTO(user));
    return usersMapped;
  }
}
