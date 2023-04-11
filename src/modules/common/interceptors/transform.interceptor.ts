import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { responseMessage } from '../decorators/response.decorator';

interface Response<T> {
  message: string;
  status: boolean;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const message =
      this.reflector.get<string>(responseMessage, context.getHandler()) ?? null;
    return next
      .handle()
      .pipe(map((data) => ({ status: true, message, data })))
      .pipe(
        catchError(map(() => ({ data: null, status: false, message: null }))),
      );
  }
}
