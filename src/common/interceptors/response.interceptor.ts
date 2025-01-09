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
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    const httpMethod = context.switchToHttp().getRequest().method;

    const getSuccessMessage = (method: string): string => {
      switch (method) {
        case 'GET':
          return 'Data retrieved successfully';
        case 'POST':
          return 'Data created successfully';
        case 'PATCH':
        case 'PUT':
          return 'Data updated successfully';
        case 'DELETE':
          return 'Data deleted successfully';
        default:
          return 'Operation completed successfully';
      }
    };

    const message = getSuccessMessage(httpMethod);

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message,
        data,
      })),
      catchError((err) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        const errorResponse = {
          statusCode,
          message: err.message || new InternalServerErrorException(),
          error: err.name || 'Error',
          timestamp: new Date().toISOString(),
        };

        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
