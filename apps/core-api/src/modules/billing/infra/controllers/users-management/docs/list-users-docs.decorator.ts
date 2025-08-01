import { ApiResponseWrapper } from '@ce-monorepo/shared';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function ListUsersDocsDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'List all users',
      description: 'List all users',
    }),
    ApiResponseWrapper({
      status: HttpStatus.OK,
      description: 'Users listed successfully',
      dataSchema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    }),
  );
}
