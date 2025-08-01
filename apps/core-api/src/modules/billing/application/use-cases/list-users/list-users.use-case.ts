import {
  AbstractI18nProvider,
  AbstractUsersRepository,
  AbstractUseCase,
  UserMapper,
} from '@ce-monorepo/shared';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { isLeft } from 'fp-ts/lib/Either';

import { IListUsersUseCaseOutput } from './list-users.interface';

@Injectable()
export class ListUsersUseCase extends AbstractUseCase<
  void,
  IListUsersUseCaseOutput
> {
  constructor(
    private readonly i18nProvider: AbstractI18nProvider,
    private readonly usersRepository: AbstractUsersRepository,
  ) {
    super();
  }

  async execute(): Promise<IListUsersUseCaseOutput> {
    const usersResult = await this.usersRepository.findAll();

    if (isLeft(usersResult)) {
      throw new InternalServerErrorException(
        this.i18nProvider.t('errors.REPOSITORY.FAILED_TO_FETCH_USERS'),
      );
    }

    return usersResult.right.map((user) => UserMapper.toDTO(user));
  }
}
