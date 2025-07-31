import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ZodError } from 'zod';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const message = 'Operação realizada com sucesso.';
    const timestamp = new Date().toISOString();

    return next.handle().pipe(
      map((data) => {
        const duration = Date.now() - startTime;
        return {
          statusCode,
          message,
          timestamp,
          duration: `${duration}ms`,
          data,
        };
      }),
      catchError((err) => {
        const duration = Date.now() - startTime;

        if (err instanceof ZodError) {
          const errors = err.issues?.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
            code: error.code,
          }));

          const errorResponse = {
            statusCode: 400,
            message: errors?.map((error) => error.message).join(', '),
            timestamp,
            duration: `${duration}ms`,
            data: errors,
          };

          return throwError(() => new BadRequestException(errorResponse));
        }

        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        let errorMessage = err.message;
        const errorData = err.response?.response || null;

        if (err.response && err.response.message) {
          errorMessage = Array.isArray(err.response.message)
            ? err.response.message?.map((msg: string) => msg).join(', ')
            : err.response.message;
        }

        const errorResponse = {
          statusCode,
          message: errorMessage || new InternalServerErrorException().message,
          timestamp,
          duration: `${duration}ms`,
          data: errorData,
        };

        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
