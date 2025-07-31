import {
  AbstractI18nProvider,
  AbstractUsersRepository,
  AbstractUseCase,
  UserEntity,
} from '@ce-monorepo/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateUserInputSchema } from './create-user.input';
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
    const validatedInput = CreateUserInputSchema.parse(input);
    const user = await this.usersRepository.findByEmail(validatedInput.email);

    if (user) {
      throw new BadRequestException(
        this.i18nProvider.t('errors.USER.ALREADY_EXISTS'),
      );
    }

    const userToCreate = new UserEntity({
      name: validatedInput.name,
      email: validatedInput.email,
    });

    await this.usersRepository.create(userToCreate);

    return {
      email: userToCreate.email.value,
      name: userToCreate.name,
    };
  }
}
