import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  async kakaoAuthCallback(@CurrentUser() user: User) {
    return user;
  }
}
