import { Body, Controller, Post } from '@nestjs/common';

@Controller('slacks')
export class SlackController {
  @Post()
  test(@Body() body) {
    console.log('hi');
    console.log(body);
    return 'hi';
  }
}
