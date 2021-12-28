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

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);
  constructor(private readonly userService: UsersService) {}

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

  public async;
}
