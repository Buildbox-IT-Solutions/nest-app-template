import {
  AbstractI18nProvider,
  AbstractUsersRepository,
  AbstractUseCase,
  UserEntity,
} from '@ce-monorepo/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

import {
  ICreateUserUseCaseInput,
  ICreateUserUseCaseOutput,
} from './create-user.interface';

@Injectable()
export class CreateUserUseCase extends AbstractUseCase<
  ICreateUserUseCaseInput,
  ICreateUserUseCaseOutput
> {
  constructor(
    private readonly i18nProvider: AbstractI18nProvider,
    private readonly usersRepository: AbstractUsersRepository,
  ) {
    super();
  }

  async execute(input: ICreateUserUseCaseInput): Promise<ICreateUserUseCaseOutput> {
    const userToCreate = new UserEntity({
      name: input.name,
      email: input.email,
    });

    const user = await this.usersRepository.findByEmail(input.email);

    if (user) {
      throw new BadRequestException(
        this.i18nProvider.t('general.USER.ALREADY_EXISTS'),
      );
    }

    await this.usersRepository.create(userToCreate);

    return {
      email: userToCreate.email.value,
      name: userToCreate.name,
    };
  }
}
