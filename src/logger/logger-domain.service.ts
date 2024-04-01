import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { INQUIRER } from "@nestjs/core";
import ContextStorageService, { ContextStorageServiceKey } from "src/core/context/interfaces/context-storage.interface";
import { LogData } from "src/core/logger/interfaces/logData.inteface";
import { Logger, LoggerBaseKey } from "src/core/logger/interfaces/logger.interface";
import { LogLevel } from "src/core/logger/logger.constant";

@Injectable({ scope: Scope.TRANSIENT })
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export default class LoggerDomainService implements Logger {
  private sourceClass: string | undefined;
  private organization: string | undefined;
  private context: string | undefined;
  private app: string | undefined;

  public constructor(
    @Inject(LoggerBaseKey) private logger: Logger,
    configService: ConfigService,
    @Inject(INQUIRER) parentClass: object,
    @Inject(ContextStorageServiceKey)
    private contextStorageService: ContextStorageService,
  ) {
    // Set the source class from the parent class
    this.sourceClass = parentClass?.constructor?.name;

    // Set the organization, context and app from the environment variables
    this.organization = configService.get<string>('ORGANIZATION');
    this.context = configService.get<string>('CONTEXT');
    this.app = configService.get<string>('APP');
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ) {
    return this.logger.log(level, message, this.getLogData(data), profile);
  }

  public debug(message: string, data?: LogData, profile?: string) {
    return this.logger.debug(message, this.getLogData(data), profile);
  }

  public info(message: string, data?: LogData, profile?: string) {
    return this.logger.info(message, this.getLogData(data), profile);
  }

  public warn(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.warn(message, this.getLogData(data), profile);
  }

  public error(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.error(message, this.getLogData(data), profile);
  }

  public fatal(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.fatal(message, this.getLogData(data), profile);
  }

  public emergency(message: string | Error, data?: LogData, profile?: string) {
    return this.logger.emergency(message, this.getLogData(data), profile);
  }

  private getLogData(data?: LogData): LogData {
    return {
      ...data,
      organization: data?.organization || this.organization,
      context: data?.context || this.context,
      app: data?.app || this.app,
      sourceClass: data?.sourceClass || this.sourceClass,
      correlationId:
        data?.correlationId || this.contextStorageService.getContextId(),
    };
  }

  public startProfile(id: string) {
    this.logger.startProfile(id);
  }
}