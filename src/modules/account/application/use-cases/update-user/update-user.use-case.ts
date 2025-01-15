import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractI18nProvider } from '~/core/application/gateways/providers/i18n/i18n.provider.abstract';
import AbstractUseCase from '~/core/application/use-cases/use-case.abstract';
import { AbstractNotificationFacade } from '~/modules/notification/application/facade/notification.facade.abstract';

import { AbstractUserRepository } from '../../gateways/repositories/user.repository';
import { IUpdateUserInput } from './update-user.dto';

@Injectable()
export class UpdateUserUseCase implements AbstractUseCase {
  constructor(
    private userRepository: AbstractUserRepository,
    private i18nProvider: AbstractI18nProvider,
    private notificationFacade: AbstractNotificationFacade,
  ) {}

  async execute(input: IUpdateUserInput): Promise<any> {
    const userFound = await this.userRepository.findById(input.id);
    if (!userFound)
      throw new BadRequestException(
        this.i18nProvider.t('general.ERROR.USER_NOT_FOUND'),
      );
    userFound.changeName(input.name);
    await this.userRepository.update(userFound);
    await this.notificationFacade.sendMessage('Updated');
  }
}
