import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { LoggingMiddleware } from "./middlewares/logging.middleware";
import { HttpErrorFilter } from './filters/http-error.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
	imports: [TasksModule],
 providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes('*');
	}
}
