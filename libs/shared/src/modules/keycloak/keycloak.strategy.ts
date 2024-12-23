import { Strategy } from 'passport-custom'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { KEYCLOAK_STRATEGY_CONFIG_TOKEN, TKeycloakStrategyOptions } from './keycloak.type'

@Injectable()
export class KeyCloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  static key = 'keycloak'

  constructor(
    @Inject(KEYCLOAK_STRATEGY_CONFIG_TOKEN)
    private readonly _options: TKeycloakStrategyOptions,
  ) {
    super()
  }

  async validate(_: Request): Promise<any> {
    return {}
  }
}
