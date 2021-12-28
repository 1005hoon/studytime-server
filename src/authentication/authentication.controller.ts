import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  async kakaoAuthCallback(@Req() req: Request, @CurrentUser() user: User) {
    const accessCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    req.res.setHeader('Set-Cookie', [accessCookie]);
    return user;
  }
}
