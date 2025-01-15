import { ApiProperty } from '@nestjs/swagger';

import { IUserEntityDto } from '../../domain/entities/user/user.entity.interface';

export class ListAccounts implements IUserEntityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  active?: boolean;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export class ApiListAccountResponse {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ isArray: true })
  data: ListAccounts;
}
