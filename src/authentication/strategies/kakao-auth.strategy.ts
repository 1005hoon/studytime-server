import { Injectable } from '@nestjs/common';
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

  async validate(profile: any) {
    const email = profile._json.kakao_account.email;
    const user = await this.authService.validateUser(email);

    if (!user) {
      return null;
    }

    return user;
  }
}
