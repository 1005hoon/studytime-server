import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthenticationService) {
    super({
      clientID: process.env.OAUTH_KAKAO_CLIENT_ID,
      clientSecret: process.env.OAUTH_KAKAO_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_KAKAO_REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const email = profile._json.kakao_account.email;
    try {
      const user = await this.authService.validateUser(email);
      return user;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
