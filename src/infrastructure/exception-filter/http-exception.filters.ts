import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    console.log(JSON.stringify(exception))
    // tslint:disable-next-line:no-string-literal
    const message = typeof exception === 'object' ? (exception['response']  ? exception['response']['message'] : exception.message) : exception;
    response
      .status(status)
      .json({
        status,
        data: null,
        errors: message,
      });
  }
}
