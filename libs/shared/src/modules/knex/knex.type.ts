import type { Knex } from 'knex'
import { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const KNEX_CONFIG_TOKEN = Symbol('KEYCLOAK_STRATEGY_CONFIG_TOKEN')

export type TKnexOptions = Knex.Config

export type KnexRegisterAsyncOptions = {
  connectionName: string
  imports?: ModuleMetadata['imports']
  inject?: FactoryProvider['inject']
  useFactory: (...dependencies: any[]) => TKnexOptions | Promise<TKnexOptions>
}
