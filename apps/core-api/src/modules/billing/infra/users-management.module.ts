import {
  AbstractI18nProvider,
  AbstractUsersRepository,
  TypeORMUsersRepository,
  TypeORMUserModel,
  i18nProvider,
} from '@ce-monorepo/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { UserManagementController } from './controllers/users-management/users-management.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeORMUserModel])],
  controllers: [UserManagementController],
  providers: [
    {
      provide: AbstractI18nProvider,
      useClass: i18nProvider,
    },
    {
      provide: AbstractUsersRepository,
      useClass: TypeORMUsersRepository,
    },
    CreateUserUseCase,
  ],
})
export class UsersManagementModule {}
