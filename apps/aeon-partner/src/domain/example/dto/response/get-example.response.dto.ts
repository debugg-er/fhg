import { Exclude, Expose } from 'class-transformer'

import { TExampleMessage } from '../../example.type'

@Exclude()
export class GetExampleByIdResponse {
  @Expose()
  message?: TExampleMessage
}
