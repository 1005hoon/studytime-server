import { Body, Controller, Post } from '@nestjs/common';

@Controller('slacks')
export class SlackController {
  @Post()
  test(@Body() body) {
    return body;
  }
}
