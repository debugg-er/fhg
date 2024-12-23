import { Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class ClientExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    console.error(exception)

    const errorResponse = exception.getResponse()
    response.status(status).json({
      code: exception.constructor.name,
      ...(typeof errorResponse === 'object' ? errorResponse : {}),
    })
  }
}
