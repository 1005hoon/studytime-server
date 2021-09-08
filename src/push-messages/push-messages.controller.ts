import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SendPushMessageToSelectedUserDto } from './dto/send-push-message-to-selected-user.dto';
import { PushMessagesService } from './push-messages.service';

@Controller('push-messages')
export class PushMessagesController {
  constructor(private readonly pushMessagesService: PushMessagesService) {}

  @Post('users/:userId')
  test(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() message: SendPushMessageToSelectedUserDto,
  ) {
    return this.pushMessagesService.sendPushMessageToSelectedUser(
      userId,
      message.title,
      message.body,
    );
  }
}
