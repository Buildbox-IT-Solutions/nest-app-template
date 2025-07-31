import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    type: String,
    description: 'User name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    type: String,
    description: 'User email',
    required: true,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email!: string;
}
