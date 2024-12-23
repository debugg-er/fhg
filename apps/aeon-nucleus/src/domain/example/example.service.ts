import { plainToInstance } from 'class-transformer'
import { Knex } from 'knex'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { InjectKnex } from '@lib/shared'

import { GetExampleByIdRequest } from './dto/request/get-example.request.dto'
import { GetExampleByIdResponse } from './dto/response/get-example.response.dto'
import { ExampleError } from './example.error'
import { TConfigService } from '../../config/config'
import { DbConnection } from '../../constant/knex'

@Injectable()
export class ExampleService {
  constructor(
    @Inject(ConfigService)
    private readonly configService: TConfigService,
    @InjectKnex(DbConnection.SAS_MARIADB)
    private readonly sasMariadb: Knex,
  ) {
    sasMariadb('benefit_service_list').limit(1).then(console.log)
  }

  getExample(dto: GetExampleByIdRequest) {
    if (dto.extend === 'true') {
      throw new ExampleError.NotFoundExampleError()
    }

    return plainToInstance(GetExampleByIdResponse, {
      message: this.configService.get('NODE_ENV'),
    })
  }
}
