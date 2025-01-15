import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ELocale } from '~/common/enums/locale.enum';

export function ApiDefaultQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'lang',
      description: 'Language for translations (e.g., en, pt)',
      required: false,
      default: ELocale.EN,
      enum: ELocale,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
