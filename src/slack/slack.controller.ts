import { Body, Controller, Post } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('slacks')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}
  @Post()
  test(@Body() body) {
    const payload = {
      ...JSON.parse(body.payload),
    };
    const { actions, channel, user, message_ts } = payload;

    const { name: actionName, value: actionPayload } = actions[0];

    const userName = user.name;
    const channelId = channel.id;

    return this.slackService.handleInteractiveMessage(
      channelId,
      message_ts,
      userName,
      actionName,
      actionPayload,
    );
  }
}
