import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap, map } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {

		let runtime: number;

	const start = Date.now();

		return next.handle().pipe(
			
		tap(() => {
			const end = Date.now()
			runtime =  end - start;
		
		}),
			map((response) => {
			
			return {
				tasks: response.tasks,
				apiVersion: '1.0',
				executionTime: `${runtime}ms`,
			};
			
      })
    );
  }
}