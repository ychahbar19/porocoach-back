import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger, LoggerKey } from 'src/core/logger/interfaces/logger.interface';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(LoggerKey) private logger: Logger,
  ) { }

  @Get()
  getHello(): string {

    return this.appService.getHello();
  }
}
