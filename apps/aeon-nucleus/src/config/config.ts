import * as dotenv from 'dotenv'
import { z } from 'zod'
import { ConfigService } from '@nestjs/config'

dotenv.config()

const appConfigSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  KEYCLOAK_URL: z.string().min(1),
  KEYCLOAK_REALM_NAME: z.string().min(1),
  KEYCLOAK_CLIENT_ID: z.string().min(1),
  KEYCLOAK_CLIENT_SECRET: z.string().min(1),
})

export type AppConfig = z.infer<typeof appConfigSchema>

export function configuration(): AppConfig {
  return appConfigSchema.parse(process.env)
}

export type TConfigService = ConfigService<AppConfig, true>
