import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {

	catch(exception: any, host: ArgumentsHost) {
	  
		const response = host.switchToHttp().getResponse(); 
		const request = host.switchToHttp().getRequest(); 
    const status =  exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
		const message = exception.message;
	
		const errorResponse = {
		error: exception?.error || null,
      statusCode: status,
		 timestamp: new Date().toISOString(),
		 path: request.url,
        message: typeof message === 'string' ? message : message['message'] || 'Error occurred',
		};
		    const logMessage = `[${errorResponse.timestamp}] ${status} - ${errorResponse.message}\n`;

		fs.appendFileSync('errors.log', logMessage)
    response.status(status).json(errorResponse); 
	}
	
}
