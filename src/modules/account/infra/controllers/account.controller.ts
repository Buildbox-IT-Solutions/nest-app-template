import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiDefaultQuery } from '~/common/validations/decorators/api-defaults.decorator';

import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/list-users/list-users.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { CreateAccountDto } from '../dto/create-account.dto';
import { ApiListAccountResponse } from '../dto/list-account.dto';
import {
  UpdateAccountBodyDto,
  UpdateAccountQueryDto,
} from '../dto/update-account.dto';

@ApiDefaultQuery()
@ApiTags('Account')
@Controller('/account')
export class AccountController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
  ) {}

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided details.',
  })
  @ApiBody({
    description: 'The user information to create a new user',
    type: CreateAccountDto,
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post('/')
  async create(@Body() createAccountDto: CreateAccountDto) {
    await this.createUserUseCase.execute(createAccountDto);
  }

  @ApiOperation({
    summary: 'Get all users',
    description: 'Fetch a list of users without pagination.',
  })
  @ApiOkResponse({
    description: 'List of users',
    type: ApiListAccountResponse,
  })
  @Get('/')
  async list() {
    return await this.listUsersUseCase.execute();
  }

  @ApiOperation({
    summary: 'Update user data',
    description: 'Update an existing user with new data.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
  })
  @ApiOkResponse({
    description: 'User data successfully updated',
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiBody({ description: 'User data to update', type: UpdateAccountBodyDto })
  @Put('/:id')
  async update(
    @Param() params: UpdateAccountQueryDto,
    @Body() updateAccountDto: UpdateAccountBodyDto,
  ) {
    return await this.updateUserUseCase.execute({
      ...updateAccountDto,
      id: params.id,
    });
  }
}
