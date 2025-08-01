import {
  AbstractI18nProvider,
  AbstractUsersRepository,
  AbstractUseCase,
  UserEntity,
} from '@ce-monorepo/shared';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { isLeft } from 'fp-ts/lib/Either';

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

    const existingUserResult = await this.usersRepository.findByEmail(
      validatedInput.email,
    );

    if (isLeft(existingUserResult)) {
      throw new InternalServerErrorException(
        this.i18nProvider.t('errors.REPOSITORY.FAILED_TO_FIND_USER'),
      );
    }

    if (existingUserResult.right) {
      throw new BadRequestException(
        this.i18nProvider.t('errors.USER.ALREADY_EXISTS'),
      );
    }

    const userToCreate = new UserEntity({
      name: validatedInput.name,
      email: validatedInput.email,
    });

    const createUserResult = await this.usersRepository.create(userToCreate);

    if (isLeft(createUserResult)) {
      throw new InternalServerErrorException(
        this.i18nProvider.t('errors.REPOSITORY.FAILED_TO_CREATE_USER'),
      );
    }

    return {
      email: userToCreate.email.value,
      name: userToCreate.name,
    };
  }
}
