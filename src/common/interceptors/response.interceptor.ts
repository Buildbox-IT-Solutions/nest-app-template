import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ZodError } from 'zod';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const message = this.i18n.t('general.SUCCESS.DEFAULT');

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message,
        data,
      })),
      catchError((err) => {
        let statusCode = err instanceof HttpException ? err.getStatus() : 500;
        let errorMessage = err.message;

        if (err.response && err.response.message) {
          errorMessage = Array.isArray(err.response.message)
            ? err.response.message?.map((msg: string) => this.i18n.t(msg)).join(', ')
            : err.response.message;
        }

        if (err instanceof ZodError) {
          let zodErrorMessages = err.errors?.map((error) => error.message);
          errorMessage = zodErrorMessages.join(', ');
          statusCode = 400;
        }

        const errorResponse = {
          statusCode,
          message: errorMessage || new InternalServerErrorException(),
          error: err.name || 'Error',
          timestamp: new Date().toISOString(),
        };

        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
