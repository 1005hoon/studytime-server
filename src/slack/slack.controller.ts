import { Body, Controller, Post } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('slacks')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}
  @Post()
  test(@Body() body) {
    const { actions, user, channel, original_message } = body.payload;

    const { name: actionName, value: actionPayload } = actions[0];
    const userName = user.name;
    const channelId = channel.id;
    const { ts, attachments } = original_message;

    return this.slackService.handleInteractiveMessage(
      channelId,
      ts,
      userName,
      actionName,
      actionPayload,
      attachments,
    );
  }
}
