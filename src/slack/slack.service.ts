import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { CreateAdminUserDto } from 'src/admin-user/dto/create-admin-user.dto';

@Injectable()
export class SlackService {
  private readonly webClient = new WebClient(
    'xoxb-2413318567399-2421345482774-H0izBsk1ZAbq5YqVVG2cIdBM',
  );

  public sendSlackMessageForNewAdminRegistration(dto: CreateAdminUserDto) {
    return this.webClient.chat.postMessage({
      channel: '개발',
      text: '동기부여 어드민:',
      attachments: [
        {
          title: `${dto.displayName}님이 어드민 가입을 희망합니다`,
          fallback: `${dto.displayName}님이 어드민 가입을 희망합니다`,
          callback_id: `${dto.email}|${dto.displayName}`,
          color: '#3aa3e3',
          actions: [
            {
              name: 'registration',
              text: '계정생성',
              type: 'button',
              style: 'primary',
              value: `${JSON.stringify(dto)}`,
            },
            {
              name: 'registration',
              text: '요청삭제',
              style: 'danger',
              type: 'button',
              value: null,
            },
          ],
        },
      ],
    });
  }
}
