import { Controller, Get, Query } from '@nestjs/common'

import { GetExampleByIdRequest } from './dto/request/get-example.request.dto'
import { ExampleService } from './example.service'
import { EXAMPLE_ENDPOINT } from '../../constant/endpoint'

@Controller(EXAMPLE_ENDPOINT.BASE)
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get(EXAMPLE_ENDPOINT.GET_EXAMPLE)
  getHello(@Query() dto: GetExampleByIdRequest) {
    return this.exampleService.getExample(dto)
  }
}
