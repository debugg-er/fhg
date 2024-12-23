import { DynamicModule } from '@nestjs/common'

import { KeyCloakStrategy } from './keycloak.strategy'
import { KEYCLOAK_STRATEGY_CONFIG_TOKEN, KeycloakRegisterAsyncOptions } from './keycloak.type'

export class KeycloakModule {
  static registerAsync(options: KeycloakRegisterAsyncOptions): DynamicModule {
    return {
      global: true,
      module: this,
      imports: options.imports,
      providers: [
        {
          provide: KEYCLOAK_STRATEGY_CONFIG_TOKEN,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        KeyCloakStrategy,
      ],
    }
  }
}
