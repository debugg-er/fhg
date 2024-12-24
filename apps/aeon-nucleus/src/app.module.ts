import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'

import { ClientExceptionFilter, KeycloakModule, KnexModule, UnknownExceptionFilter } from '@lib/shared'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configuration, TConfigService } from './config/config'
import { DbConnection } from './constant/knex'
import { ExampleModule } from './domain/example/example.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    KeycloakModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TConfigService) => ({
        url: configService.get('KEYCLOAK_URL'),
        realmName: configService.get('KEYCLOAK_REALM_NAME'),
        clientId: configService.get('KEYCLOAK_CLIENT_ID'),
        clientSecret: configService.get('KEYCLOAK_CLIENT_SECRET'),
      }),
    }),
    KnexModule.registerAsync({
      connectionName: DbConnection.SAS_MARIADB,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TConfigService) => ({
        client: 'mysql2',
        connection: {
          uri: configService.get('MARIADB_URI'),
        },
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),

    ExampleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: { exposeDefaultValues: true },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: UnknownExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ClientExceptionFilter,
    },
  ],
})
export class AppModule {}
