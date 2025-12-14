import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const startTime = Date.now();

    this.logger.customLog('Incoming request', HttpLoggingInterceptor.name, {
      method: request.method,
      url: request.url,
      query: request.query,
      body: request.body,
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.customLog(
          'Outgoing response',
          HttpLoggingInterceptor.name,
          {
            statusCode: response.statusCode,
            durationMs: Date.now() - startTime,
          },
        );
      }),
    );
  }
}
