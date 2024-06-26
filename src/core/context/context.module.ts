import { Global, Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { v4 } from 'uuid'
import { ContextStorageServiceKey } from "./interfaces/context-storage.interface";
import NestjsClsContextStorageService from "./cls.service";

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? v4(),
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: ContextStorageServiceKey,
      useClass: NestjsClsContextStorageService,
    },
  ],
  exports: [ContextStorageServiceKey],
})
export class ContextModule { }