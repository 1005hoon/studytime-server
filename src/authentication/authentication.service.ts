import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './interfaces/token-payload.interface';

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly jwtService: JwtService,
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

  public getCookieWithJwtAccessToken(userId: number): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}d`,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }
}
