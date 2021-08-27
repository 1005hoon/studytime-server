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
              name: 'register',
              text: '계정생성',
              type: 'button',
              value: `${JSON.stringify(dto)}`,
            },
            {
              name: 'no',
              text: 'No',
              type: 'button',
              value: 'bad',
            },
          ],
        },
      ],
    });
  }

  postTextMessage(channel: string, text: string) {
    // return this.webClient.chat.postMessage({ channel, text });
    return this.webClient.chat.postMessage({
      text: 'Would you like to play a game?',
      channel: '개발',
      attachments: [
        {
          text: 'Choose a game to play',
          fallback: 'You are unable to choose a game',
          callback_id: 'wopr_game',
          color: '#3AA3E3',
          actions: [
            {
              name: 'game',
              text: 'Chess',
              type: 'button',
              value: 'chess',
            },
            {
              name: 'game',
              text: "Falken's Maze",
              type: 'button',
              value: 'maze',
            },
            {
              name: 'game',
              text: 'Thermonuclear War',
              style: 'danger',
              type: 'button',
              value: 'war',
              confirm: {
                title: 'Are you sure?',
                text: "Wouldn't you prefer a good game of chess?",
                ok_text: 'Yes',
                dismiss_text: 'No',
              },
            },
          ],
        },
      ],
    });
  }
}
