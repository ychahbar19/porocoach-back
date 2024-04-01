import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import NestjsLoggerServiceAdapter from './logger/nestjsLoggerServiceAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(NestjsLoggerServiceAdapter));
  await app.listen(3000);
}
bootstrap();
