import { ApiResponseWrapper } from '@ce-monorepo/shared';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function CreateUserDocsDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user',
      description: 'Create a new user',
    }),
    ApiResponseWrapper({
      status: HttpStatus.CREATED,
      description: 'User created successfully',
      dataSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
      },
    }),
  );
}
