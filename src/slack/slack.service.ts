import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { AdminUserService } from 'src/admin-user/admin-user.service';
import { CreateAdminUserDto } from 'src/admin-user/dto/create-admin-user.dto';
import { CafeArticlesService } from 'src/cafe-articles/cafe-articles.service';

import { SlackInteractiveMessageActionsEnum } from './enum/slack-interactive-message-action.enum';

@Injectable()
export class SlackService {
  private readonly webClient = new WebClient(
    'xoxb-2413318567399-2421345482774-H0izBsk1ZAbq5YqVVG2cIdBM',
  );
  constructor(
    @Inject(forwardRef(() => AdminUserService))
    private readonly adminUserService: AdminUserService,
  ) {}

  public sendSlackMessageForNewAdminRegistration(dto: CreateAdminUserDto) {
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
              name: 'registration',
              text: '수락',
              type: 'button',
              style: 'primary',
              value: `${JSON.stringify(dto)}`,
            },
            {
              name: 'registration',
              text: '거부',
              style: 'danger',
              type: 'button',
              value: '',
            },
          ],
        },
      ],
    });
  }

  public handleInteractiveMessage(
    channelId,
    ts,
    userName,
    actionName,
    actionPayload,
    attachments,
  ) {
    switch (actionName) {
      case SlackInteractiveMessageActionsEnum.REGISTRATION:
        return this.handleUserRegistrationInteractiveMessage(
          channelId,
          ts,
          userName,
          actionPayload,
        );

      default:
        null;
    }
  }

  private async handleUserRegistrationInteractiveMessage(
    channel,
    ts,
    userName,
    payload,
  ) {
    const registrationData = JSON.parse(payload);
    if (!payload) {
      const attachments = [
        {
          text: `${userName}님이 ${registrationData.email} 계정 생성요청을 반려했습니다`,
          color: '#e74c3c',
        },
      ];
      return this.webClient.chat.update({ channel, ts, attachments });
    }

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

    return this.webClient.chat.update({ channel, ts, attachments });
  }
}
