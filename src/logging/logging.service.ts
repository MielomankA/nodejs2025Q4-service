import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  customLog(message: string, context?: string, meta?: Record<string, unknown>) {
    const metaString = meta ? JSON.stringify(meta) : '';
    this.log(`${message} ${metaString}`, context);
  }
}
