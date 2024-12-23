import { Inject } from '@nestjs/common'

import { getKnexConnectionToken } from './knex.util'

export const InjectKnex = (connectionName: string) => Inject(getKnexConnectionToken(connectionName))
