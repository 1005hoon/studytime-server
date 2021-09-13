import { HttpException, Inject, Injectable } from '@nestjs/common';
import { messaging } from 'firebase-admin';
import { FcmDeviceService } from 'src/fcm-device/fcm-device.service';
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

  private async getDeviceIdByStId(stId: string) {
    const { id } = await this.usersService.getUserByStId(stId);
    return this.getUserDeviceIdByUserId(id);
  }

  public async sendPushMessageToStId(
    stId: string,
    title: string,
    body: string,
  ) {
    const { registrationId, name } = await this.getDeviceIdByStId(stId);

    const message = {
      data: { title, body },
      token: registrationId,
    };

    try {
      await this.pushApp.send(message);
      await this.userInboxService.createUserInboxForPushNotification(
        stId,
        title,
        body,
      );

      return `"${title}" 메시지를 ${name}님에게 발송했습니다`;
    } catch (error) {
      if (error.code === 'messaging/invalid-payload') {
        throw new HttpException(
          `잘못된 메시지 포맷입니다. 제목 또는 내용을 입력했는지 확인해주세요`,
          400,
        );
      } else {
        throw new HttpException(error.message, 400);
      }
    }
  }
}
