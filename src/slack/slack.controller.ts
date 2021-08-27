import { Body, Controller, Post } from '@nestjs/common';

@Controller('slacks')
export class SlackController {
  @Post()
  test(@Body() body) {
    console.log('이거 왜안됨');
    console.log(body);
    return 'hi';
  }
}
