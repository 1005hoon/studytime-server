import * as https from 'https';
import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { messaging, ServiceAccount } from 'firebase-admin';
import { FcmDeviceService } from 'src/fcm-device/fcm-device.service';
import * as FCM from 'fcm-node';
import { UserInboxService } from 'src/user-inbox/user-inbox.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PushMessagesService {
  constructor(
    @Inject('PushApp')
    private readonly pushApp: messaging.Messaging,
    private readonly deviceService: FcmDeviceService,
    private readonly userInboxService: UserInboxService,
    private readonly usersService: UsersService,
  ) {}

  private getUserDeviceIdByUserId(userId: number) {
    return this.deviceService.getDeviceIdByUserId(userId);
  }

  public async sendPushMessageToSelectedUser(
    userId: number,
    title: string,
    body: string,
  ) {
    const { registrationId, name } = await this.getUserDeviceIdByUserId(userId);
    const { stId } = await this.usersService.getUserByUserId(userId);

    const message = {
      data: {
        title,
        body,
      },
      token: registrationId,
    };

    try {
      await this.pushApp.send(message);
      await this.userInboxService.createUserInboxForPushNotification(
        stId,
        title,
        body,
      );

      return `${name}님에게 성공적으로 푸시 메시지를 발송했습니다 :: ${title}`;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
