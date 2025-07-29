import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
