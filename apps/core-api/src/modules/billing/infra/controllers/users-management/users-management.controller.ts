import { Controller, Body, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '~/modules/billing/application/use-cases/create-user/create-user.use-case';
import { ListUsersUseCase } from '~/modules/billing/application/use-cases/list-users/list-users.use-case';
import { UserViewMapper } from '~/modules/billing/application/view/user/user-view.mapper';

import { CreateUserDocsDecorator } from './docs/create-user-docs.decorator';
import { ListUsersDocsDecorator } from './docs/list-users-docs.decorator';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Controller({ version: '1', path: 'user-management' })
@ApiTags('Users Management')
export class UserManagementController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Post()
  @CreateUserDocsDecorator()
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.createUserUseCase.execute(createUserRequestDto);
  }

  @Get()
  @ListUsersDocsDecorator()
  async listUsers() {
    const users = await this.listUsersUseCase.execute();
    return users.map((user) => UserViewMapper.toListUsersResponse(user));
  }
}
