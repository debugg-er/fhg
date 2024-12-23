import { IsBooleanString, IsNotEmpty } from 'class-validator'

export class GetExampleByIdRequest {
  @IsNotEmpty()
  @IsBooleanString()
  extend?: string
}
