import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ApiResponseOptions {
  status: number;
  description: string;
  dataSchema?: SchemaObject & Partial<ReferenceObject>;
  isArray?: boolean;
}

export function ApiResponseWrapper(options: ApiResponseOptions) {
  const { status, description, dataSchema, isArray = false } = options;

  const schema: SchemaObject & Partial<ReferenceObject> = {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        example: status,
      },
      message: {
        type: 'string',
        example: description,
      },
      timestamp: {
        type: 'string',
        format: 'date-time',
        example: new Date().toISOString(),
      },
      ...(dataSchema &&
        Object.keys(dataSchema).length > 0 && {
          data: isArray
            ? {
                type: 'array',
                items: dataSchema,
              }
            : dataSchema,
        }),
    },
  };

  return applyDecorators(
    ApiExtraModels(dataSchema as unknown as any),
    ApiResponse({
      status,
      description,
      schema,
    }),
  );
}
