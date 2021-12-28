import axios from 'axios';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { stringify } from 'qs';
import { KakaoToken } from './interfaces/kakao-token.interface';
import { UsersService } from 'src/users/users.service';
import { KakaoUser } from './interfaces/kakao-user.interface';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  public async validateUser(email: string) {
    if (!email) {
      throw new HttpException(
        '이메일을 조회할 수 없습니다. 로그인 시 이메일 정보 제공 약관을 선택해주세요.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  // public getCookieWithJwtAccessToken(user: User) {
  //   const token = this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
  //     expiresIn: `${this.configService.get(
  //       'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
  //     )}s`,
  //   });
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
  //   )}`;
  // }

  // public getCookieWithJwtRefreshToken(userId: number) {
  //   const payload: TokenPayload = { userId };
  //   const token = this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  //     expiresIn: `${this.configService.get(
  //       'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //     )}s`,
  //   });
  //   const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //   )}`;
  //   return {
  //     cookie,
  //     token,
  //   };
  // }

  // public getCookiesForLogOut() {
  //   return [
  //     'Authentication=; HttpOnly; Path=/; Max-Age=0',
  //     'Refresh=; HttpOnly; Path=/; Max-Age=0',
  //   ];
  // }

  // public async getUserFromAuthenticationToken(token: string) {
  //   const payload: TokenPayload = this.jwtService.verify(token, {
  //     secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
  //   });
  //   if (payload.userId) {
  //     return this.usersService.getById(payload.userId);
  //   }
  // }
}
