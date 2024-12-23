import * as knex from 'knex'
import { DynamicModule } from '@nestjs/common'

import { KNEX_CONFIG_TOKEN, KnexRegisterAsyncOptions } from './knex.type'
import { getKnexConnectionToken } from './knex.util'

export class KnexModule {
  static registerAsync(options: KnexRegisterAsyncOptions): DynamicModule {
    return {
      global: true,
      module: this,
      imports: options.imports,
      providers: [
        {
          provide: KNEX_CONFIG_TOKEN,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        {
          provide: getKnexConnectionToken(options.connectionName),
          inject: [KNEX_CONFIG_TOKEN],
          useFactory: (config) => {
            const db = knex(config)
            db.on('query', (query) => {
              const { sql = '', bindings = [] } = query
              console.log(`QUERY: ${sql}; PARAMS: [${bindings.map((p) => String(p))}]`)
            })
            return db
          },
        },
      ],
      exports: [getKnexConnectionToken(options.connectionName)],
    }
  }
}
