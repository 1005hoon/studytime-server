import { Module } from '@nestjs/common';
import { PushMessagesService } from './push-messages.service';
import { PushMessagesController } from './push-messages.controller';
import { FcmDeviceModule } from 'src/fcm-device/fcm-device.module';
import * as admin from 'firebase-admin';

import { UserInboxModule } from 'src/user-inbox/user-inbox.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [FcmDeviceModule, UserInboxModule, UsersModule],
  providers: [
    PushMessagesService,
    {
      provide: 'PushApp',
      useFactory: () => {
        const pushApp = admin.initializeApp(
          {
            credential: admin.credential.cert({
              projectId: process.env.PUSH_APP_PROJECT_ID,
              clientEmail: process.env.PUSH_APP_CLIENT_EMAIL,
              privateKey: `${process.env.PUSH_APP_PRIVATE_KEY}`.replace(
                /\\n/g,
                '\n',
              ),
            }),
          },
          'push_admin',
        );
        return admin.messaging(pushApp);
      },
    },
  ],
  controllers: [PushMessagesController],
})
export class PushMessagesModule {}
