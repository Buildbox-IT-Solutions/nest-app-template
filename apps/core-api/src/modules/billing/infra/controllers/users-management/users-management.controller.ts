import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '~/modules/billing/application/use-cases/create-user/create-user.use-case';

import { CreateUserDocsDecorator } from './docs/create-user-docs.decorator';
import { CreateUserRequestDto } from './dto/create-user.dto';

@Controller({ version: '1', path: 'user-management' })
@ApiTags('Users Management')
export class UserManagementController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @CreateUserDocsDecorator()
  async createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.createUserUseCase.execute(createUserRequestDto);
  }
}
