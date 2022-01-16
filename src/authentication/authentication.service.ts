import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './interfaces/token-payload.interface';
import { __PROD__ } from 'src/utils/constants';
import { Auth, google } from 'googleapis';

@Injectable()
export class AuthenticationService {
  googleOAuthClient: Auth.OAuth2Client;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    const clientID = this.configService.get('GOOGLE_OAUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET');
    this.googleOAuthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  public async validateUser(email: string) {
    if (!email) {
      throw new HttpException(
        '이메일을 조회할 수 없습니다. 로그인 시 이메일 정보 제공 약관을 선택해주세요.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.getUserByEmail(email);

    if (!user.isAdmin) {
      throw new HttpException(
        '관리자 권한이 없습니다. 담당자에게 문의하세요',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  public async authWithGoogleOAuth(token: string) {
    const tokenInfo = await this.googleOAuthClient.getTokenInfo(token);
    const email = tokenInfo.email;

    const user = await this.userService.getUserByEmail(email);

    if (!user.isAdmin) {
      throw new HttpException(
        '관리자 권한이 없습니다. 담당자에게 문의하세요',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  public getCookieWithJwtAccessToken(userId: number): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}d`,
    });

    return `Authentication=${token}; HttpOnly; ${
      __PROD__ && 'SameSite=None; Secure=True'
    };  Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}d`;
  }

  public getCookieForLogout(): string {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }
}
