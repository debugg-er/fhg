import { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const KEYCLOAK_STRATEGY_CONFIG_TOKEN = Symbol('KEYCLOAK_STRATEGY_CONFIG_TOKEN')

export type TKeycloakStrategyOptions = {
  url: string
  realmName: string
  clientId: string
  clientSecret: string
}

export type KeycloakRegisterAsyncOptions = {
  imports?: ModuleMetadata['imports']
  inject?: FactoryProvider['inject']
  useFactory: (...dependencies: any[]) => TKeycloakStrategyOptions | Promise<TKeycloakStrategyOptions>
}
