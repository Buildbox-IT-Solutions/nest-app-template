import { ApiProperty } from '@nestjs/swagger';
import { IUpdateUserInput } from '~/modules/account/application/use-cases/update-user/update-user.dto';
import { IsUUID, MinLength } from 'class-validator';

export class UpdateAccountBodyDto implements Omit<IUpdateUserInput, 'id'> {
  @ApiProperty()
  @MinLength(4, { message: 'validation.NAME_INVALID' })
  name: string;
}

export class UpdateAccountQueryDto implements Omit<IUpdateUserInput, 'name'> {
  @IsUUID(4, { message: 'validation.UUID_INVALID' })
  id: string;
}
