import { Module } from '@nestjs/common';
import { AbstractI18nProvider } from '~/core/application/gateways/providers/i18n/i18n.provider.abstract';
import { i18nProvider } from '~/core/infra/gateways/providers/i18n/i18n.provider';
import { PrismaService } from '~/core/infra/gateways/repositories/prisma/connection/prisma.service';
import { AbstractNotificationFacade } from '~/modules/notification/application/facade/notification.facade.abstract';
import { NotificationFacade } from '~/modules/notification/infra/facade/notification.facade';

import { AbstractEncrypterProvider } from '../application/gateways/providers/encrypter.provider';
import { AbstractUserRepository } from '../application/gateways/repositories/user.repository';
import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users/list-users.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user/update-user.use-case';
import { AccountController } from './controllers/account.controller';
import { EncrypterProvider } from './gateways/providers/encrypter.provider';
import { UserRepository } from './gateways/repositories/prisma/user.repository';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    UpdateUserUseCase,
    {
      provide: AbstractI18nProvider,
      useClass: i18nProvider,
    },
    {
      provide: AbstractEncrypterProvider,
      useClass: EncrypterProvider,
    },
    {
      provide: AbstractUserRepository,
      useClass: UserRepository,
    },
    {
      provide: AbstractNotificationFacade,
      useClass: NotificationFacade,
    },
    PrismaService,
  ],
})
export class AccountModule {}
