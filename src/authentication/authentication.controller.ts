import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Users } from 'src/users/entities/Users';
import { __PROD__ } from 'src/utils/constants';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { TokenVerificationDto } from './dto/token-verification.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@CurrentUser() user: Users) {
    if (__PROD__ && !user.isAdmin) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @UseGuards(KakaoAuthGuard)
  @Get('/kakao')
  async kakaoAuthCallback(@Req() req: Request, @CurrentUser() user: Users) {
    const accessCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    req.res.setHeader('Set-Cookie', [accessCookie]);
    return user;
  }

  @Post('google')
  async googleAuthCallback(
    @Body() tokenData: TokenVerificationDto,
    @Req() req: Request,
  ) {
    const user = await this.authService.authWithGoogleOAuth(tokenData.token);
    const accessCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    req.res.setHeader('Set-Cookie', [accessCookie]);
    return user;
  }
}
