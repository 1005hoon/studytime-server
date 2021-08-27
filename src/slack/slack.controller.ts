import { Body, Controller, Post } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('slacks')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}
  @Post()
  test(@Body() body) {
    // console.log('--------------------------------');
    // console.log(body);
    // console.log('--------------------------------');
    // console.log(body.payload);

    // console.log('--------------------------------');
    // console.log('PAYLOAD TO JSON');
    // const payloadToJSON = JSON.parse(body.payload);
    // console.log(payloadToJSON);

    // try {
    //   const { actions, channel, user, message_ts, attachments } = payloadToJSON;
    //   console.log('--------------------------------');
    //   console.log('PAYLOAD TO JSON 파싱 성공');
    //   console.log({ actions, channel, user, message_ts, attachments });

    //   console.log(typeof payloadToJSON);

    //   console.log('--------------------------------');
    //   console.log('객체화 하기');
    //   const objectified = { ...payloadToJSON };
    //   console.log(objectified);
    // } catch (error) {
    //   console.log('payload to json 꺼내오기 에러');
    // }

    const payload = {
      ...JSON.parse(body.payload),
    };
    const { actions, channel, user, message_ts, original_message } = payload;

    console.log({
      actions,
      channel,
      user,
      message_ts,
      original_message,
    });

    const { name: actionName, value: actionPayload } = actions[0];
    const userName = user.name;
    const channelName = channel.name;

    console.log('----------------------------');
    console.log(actionName);
    console.log(actionPayload);
    console.log(userName);
    console.log(channelName);
    console.log(original_message);

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
