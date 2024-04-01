import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import * as morgan from 'morgan';
import { Logger, LoggerBaseKey, LoggerKey } from 'src/core/logger/interfaces/logger.interface';
import LoggerDomainService from './logger-domain.service';
import { WinstonLogger, WinstonLoggerTransportsKey } from './winston.logger';
import { ConfigService } from '@nestjs/config';
import NestjsLoggerServiceAdapter from './nestjsLoggerServiceAdapter';
import ConsoleTransport from './transports/console.transport';
import FileTransport from './transports/file.transport';
import SlackTransport from './transports/slack.transport';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: LoggerBaseKey,
      useClass: WinstonLogger,
    },
    {
      provide: LoggerKey,
      useClass: LoggerDomainService,
    },
    {
      provide: NestjsLoggerServiceAdapter,
      useFactory: (logger: Logger) => new NestjsLoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },

    {
      provide: WinstonLoggerTransportsKey,
      useFactory: () => {
        const transports = [];

        transports.push(ConsoleTransport.createColorize() as never);

        transports.push(FileTransport.create() as never);

        return transports;
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerKey, NestjsLoggerServiceAdapter],
})
export class LoggerModule implements NestModule {
  public constructor(
    @Inject(LoggerKey) private logger: Logger,
    private configService: ConfigService,
  ) {
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(this.configService.get('isProduction') ? 'combined' : 'dev', {
          stream: {
            write: (message: string) => {
              this.logger.debug(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
