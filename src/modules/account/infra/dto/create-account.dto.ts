import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from '~/common/validations/decorators/cpf.decorator';
import { ICreateUserInput } from '~/modules/account/application/use-cases/create-user/create-user.dto';
import { IsEmail, MinLength } from 'class-validator';

export class CreateAccountDto implements ICreateUserInput {
  @ApiProperty()
  @IsEmail({}, { message: 'validation.EMAIL_INVALID' })
  email: string;

  @ApiProperty()
  @IsCPF({ message: 'validation.CPF_INVALID' })
  cpf: string;

  @ApiProperty()
  @MinLength(4, { message: 'validation.PASSWORD_INVALID' })
  password: string;

  @ApiProperty()
  @MinLength(4, { message: 'validation.NAME_INVALID' })
  name: string;
}
