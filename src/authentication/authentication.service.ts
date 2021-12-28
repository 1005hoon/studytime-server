import axios from 'axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { stringify } from 'qs';
import { KakaoToken } from './interfaces/kakao-token.interface';
import { UsersService } from 'src/users/users.service';
import { KakaoUser } from './interfaces/kakao-user.interface';

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);
  constructor(private readonly userService: UsersService) {}

  public async createTokenForUser(provider: string, code: string) {
    const queryString = stringify({
      code,
      grant_type: 'authorization_code',
      client_id: process.env.OAUTH_KAKAO_CLIENT_ID,
      client_secret: process.env.OAUTH_KAKAO_CLIENT_SECRET,
      redirect_uri: process.env.OAUTH_KAKAO_REDIRECT_URI,
    });

    try {
      const { data } = await axios.post<KakaoToken>(
        `${process.env.OAUTH_KAKAO_BASE_HOST}/oauth/token`,
        queryString,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return data.access_token;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 500);
    }
  }

  async authenticate(token: string) {
    try {
      const { data } = await axios.get<KakaoUser>(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 500);
    }
  }

  private validateAdmin() {}
}
