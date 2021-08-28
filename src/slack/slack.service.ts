import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { AdminUserService } from 'src/admin-user/admin-user.service';
import { CreateAdminUserDto } from 'src/admin-user/dto/create-admin-user.dto';

import { SlackInteractiveMessageActionsEnum } from './enum/slack-interactive-message-action.enum';

@Injectable()
export class SlackService {
  constructor(
    @Inject(forwardRef(() => AdminUserService))
    private readonly adminUserService: AdminUserService,
  ) {}
  private readonly webClient = new WebClient(process.env.SLACK_TOKEN);

  public async sendSlackMessageForNewAdminRegistration(
    dto: CreateAdminUserDto,
  ) {
    try {
      await this.adminUserService.checkDuplicateEmail(dto.email);
    } catch (error) {
      return this.webClient.chat.postMessage({
        channel: '개발',
        text: '동기부여 어드민:',
        attachments: [
          {
            title: `${dto.displayName}님이 어드민 가입을 희망합니다`,
            fallback: `${dto.displayName}님이 어드민 가입을 희망합니다`,
            callback_id: `${dto.email}|${dto.displayName}`,
            color: '#6800ff',
            actions: [
              {
                name: SlackInteractiveMessageActionsEnum.REGISTRATION_APPROVED,
                text: '수락',
                type: 'button',
                style: 'primary',
                value: `${JSON.stringify({ ...dto })}`,
              },
              {
                name: SlackInteractiveMessageActionsEnum.REGISTRATION_DENIED,
                text: '거부',
                style: 'danger',
                type: 'button',
                value: `${JSON.stringify({ email: dto.email })}`,
              },
            ],
          },
        ],
      });
      // throw new BadRequestException(error.message);
    }
  }

  public handleInteractiveMessage(
    channelId,
    ts,
    userName,
    actionName,
    actionPayload,
  ) {
    switch (actionName) {
      case SlackInteractiveMessageActionsEnum.REGISTRATION_APPROVED:
        return this.handleUserRegistrationApproved(
          channelId,
          ts,
          userName,
          actionPayload,
        );
      case SlackInteractiveMessageActionsEnum.REGISTRATION_DENIED:
        return this.handleUserRegistrationDenied(
          channelId,
          ts,
          userName,
          actionPayload,
        );

      default:
        return null;
    }
  }

  private async handleUserRegistrationApproved(channel, ts, userName, payload) {
    const registrationData = JSON.parse(payload);

    try {
      await this.adminUserService.createUser(registrationData);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }

    const attachments = [
      {
        text: `${userName}님이 ${registrationData.email} 계정을 생성했습니다`,
        color: '#1660d0',
      },
    ];

    try {
      const result = await this.webClient.chat.update({
        channel,
        ts,
        attachments,
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  private async handleUserRegistrationDenied(channel, ts, userName, payload) {
    const registrationData = JSON.parse(payload);

    const attachments = [
      {
        text: `${userName}님이 ${registrationData.email} 계정 생성요청을 반려했습니다`,
        color: '#e74c3c',
      },
    ];

    try {
      const result = await this.webClient.chat.update({
        channel,
        ts,
        attachments,
      });

      return result;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
