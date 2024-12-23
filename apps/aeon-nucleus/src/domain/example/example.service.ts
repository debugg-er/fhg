import { plainToInstance } from 'class-transformer'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { GetExampleByIdRequest } from './dto/request/get-example.request.dto'
import { GetExampleByIdResponse } from './dto/response/get-example.response.dto'
import { ExampleError } from './example.error'
import { TConfigService } from '../../config/config'

@Injectable()
export class ExampleService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: TConfigService,
  ) {}

  getExample(dto: GetExampleByIdRequest) {
    if (dto.extend === 'true') {
      throw new ExampleError.NotFoundExampleError()
    }
    return plainToInstance(GetExampleByIdResponse, {
      message: this.configService.get('NODE_ENV'),
    })
  }
}
