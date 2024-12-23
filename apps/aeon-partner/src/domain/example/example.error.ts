import { NotFoundException } from '@nestjs/common'

export namespace ExampleError {
  export class NotFoundExampleError extends NotFoundException {
    constructor() {
      super('Example not found!')
    }
  }
}
