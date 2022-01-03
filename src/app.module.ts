import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CafeArticlesModule } from './cafe-articles/cafe-articles.module';
// import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
// import { AdminUserModule } from './admin-user/admin-user.module';
// import { SlackModule } from './slack/slack.module';
// import { PushMessagesModule } from './push-messages/push-messages.module';
// import { FcmDeviceModule } from './fcm-device/fcm-device.module';
// import { UserInboxModule } from './user-inbox/user-inbox.module';
import { EventsModule } from './events/events.module';

import * as Joi from '@hapi/joi';
import { GroupsModule } from './groups/groups.module';
import { FilesModule } from './files/files.module';

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

        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        OAUTH_KAKAO_BASE_HOST: Joi.string().required(),
        OAUTH_KAKAO_CLIENT_ID: Joi.string().required(),
        OAUTH_KAKAO_CLIENT_SECRET: Joi.string().required(),
        OAUTH_KAKAO_REDIRECT_URI: Joi.string().required(),

        AWS_REGION: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),

        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        // PUSH_APP_PROJECT_ID: Joi.string().required(),
        // PUSH_APP_CLIENT_EMAIL: Joi.string().required(),
        // PUSH_APP_PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    CafeArticlesModule,
    EventsModule,
    AuthenticationModule,
    GroupsModule,
    FilesModule,
    // UsersModule,
    // SlackModule,
    // AdminUserModule,
    // PushMessagesModule,
    // FcmDeviceModule,
    // UserInboxModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
