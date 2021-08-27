import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CafeArticlesModule } from './cafe-articles/cafe-articles.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { SlackModule } from './slack/slack.module';

import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        FIREBASE_ADMIN_TYPE: Joi.string().required(),
        FIREBASE_ADMIN_ID: Joi.string().required(),
        FIREBASE_ADMIN_PRIVATE_KEY_ID: Joi.string().required(),
        FIREBASE_ADMIN_PRIVATE_KEY: Joi.string().required(),
        FIREBASE_ADMIN_CLIENT_EMAIL: Joi.string().required(),
        FIREBASE_ADMIN_CLIENT_ID: Joi.string().required(),
        FIREBASE_ADMIN_AUTH_URI: Joi.string().required(),
        FIREBASE_ADMIN_TOKEN_URI: Joi.string().required(),
        FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL: Joi.string().required(),
        FIREBASE_ADMIN_CLIENT_X509_CERT_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    CafeArticlesModule,
    UsersModule,
    AuthenticationModule,
    AdminUserModule,
    SlackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
