import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractI18nProvider } from '~/core/application/gateways/providers/i18n/i18n.provider.abstract';
import AbstractUseCase from '~/core/application/use-cases/use-case.abstract';
import { UserEntity } from '~/modules/account/domain/entities/user/user.entity';
import { Password } from '~/modules/account/domain/value-objects/password/password.value-object';

import { AbstractEncrypterProvider } from '../../gateways/providers/encrypter.provider';
import { AbstractUserRepository } from '../../gateways/repositories/user.repository';
import { ICreateUserInput } from './create-user.dto';

@Injectable()
export class CreateUserUseCase implements AbstractUseCase {
  constructor(
    private userRepository: AbstractUserRepository,
    private encrypterProvider: AbstractEncrypterProvider,
    private i18nProvider: AbstractI18nProvider,
  ) {}

  async execute(input: ICreateUserInput): Promise<void> {
    const foundUser = await this.userRepository.findByEmail(input.email);
    if (foundUser)
      throw new BadRequestException(
        this.i18nProvider.t('general.ERROR.EMAIL_EXISTS'),
      );
    const existingCpf = await this.userRepository.findByCpf(input.cpf);
    if (existingCpf)
      throw new BadRequestException(this.i18nProvider.t('general.ERROR.CPF_EXISTS'));

    const passwordToHash = new Password(input.password);
    const passwordHashed = await this.encrypterProvider.hash(passwordToHash, 8);
    const userToCreate = new UserEntity({
      cpf: input.cpf,
      email: input.email,
      password: passwordHashed,
      name: input.name,
    });

    await this.userRepository.create(userToCreate);
  }
}
