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
    console.log('PAYLOAD TO JSON');
    const payloadToJSON = JSON.parse(body.payload);
    console.log(payloadToJSON);
    console.log('--------------------------------');
    console.log('PAYLOAD TO Object');
    const payloadToObject = payloadToJSON.toObject();
    console.log(payloadToObject);

    try {
      const { actions, channel, user, message_ts, attachments } = payloadToJSON;
      console.log('--------------------------------');
      console.log('PAYLOAD TO JSON 파싱 성공');
      console.log({ actions, channel, user, message_ts, attachments });
    } catch (error) {
      console.log('payload to json 꺼내오기 에러');
    }

    try {
      const { actions, channel, user, message_ts, attachments } =
        payloadToObject;
      console.log('--------------------------------');
      console.log('PAYLOAD TO Object 파싱 성공');
      console.log({ actions, channel, user, message_ts, attachments });
    } catch (error) {
      console.log('payload to object 꺼내오기 에러');
    }

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
