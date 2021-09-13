import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SendPushMessageToSelectedUserDto } from './dto/send-push-message-to-selected-user.dto';
import { PushMessagesService } from './push-messages.service';

@Controller('push-messages')
export class PushMessagesController {
  constructor(private readonly pushMessagesService: PushMessagesService) {}

  @Post(':stId')
  sendPushMessage(
    @Param('stId') stId: string,
    @Body('message') message: SendPushMessageToSelectedUserDto,
  ) {
    return this.pushMessagesService.sendPushMessageToStId(
      stId,
      message.title,
      message.body,
    );
  }
}
