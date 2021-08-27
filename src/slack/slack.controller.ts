import { Body, Controller, Post } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('slacks')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}
  @Post()
  test(@Body() body) {
    console.log('--------------------------------');
    console.log(body);
    console.log('--------------------------------');
    console.log(body.payload);
    console.log('--------------------------------');
    console.log('PAYLOAD TO OBJECT');
    const payloadToObject = body.payload.toObject();
    console.log(payloadToObject);
    console.log('--------------------------------');
    console.log('PAYLOAD TO JSON');
    const payloadToJSON = body.payload.toJSON();
    console.log(payloadToJSON);

    // const { name: actionName, value: actionPayload } = actions[0];
    // const userName = user.name;
    // const channelId = channel.id;
    // const { ts, attachments } = original_message;

    // return this.slackService.handleInteractiveMessage(
    //   channelId,
    //   ts,
    //   userName,
    //   actionName,
    //   actionPayload,
    //   attachments,
    // );
    return 'hi';
  }
}
