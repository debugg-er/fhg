import { Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    console.error(exception)

    response.status(500).json({
      code: 'InternalServerError',
      message: 'Internal server error',
    })
  }
}
