import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { stringify } from 'qs';
import { AdminUserService } from 'src/admin-user/admin-user.service';
import { RegisterDto } from './dto/register.dto';

import axios from 'axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly adminUserService: AdminUserService) {}

  public async register(registrationData: RegisterDto) {
    try {
      const newUser = await this.adminUserService.createUser(registrationData);
      return newUser;
    } catch (error) {
      throw new BadRequestException(
        `회원 생성중 에러가 발생했습니다: ${error.message}`,
      );
    }
  }

  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.adminUserService.findUserByEmail(email);
      console.log(user);
      const isPasswordMatching = await bcrypt.compare(
        password,
        user.passwordHash,
      );

      if (!isPasswordMatching) {
        console.log(`isPasswordMatching: ${isPasswordMatching}`);
        throw new BadRequestException('잘못된 아이디 또는 비밀번호입니다');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async createTokenForUser(provider: string, code: string) {
    try {
      const { data } = await axios.post(
        `${process.env.OAUTH_KAKAO_BASE_HOST}/oauth/token`,
        stringify({
          code,
          grant_type: 'authorization_code',
          client_id: process.env.OAUTH_KAKAO_CLIENT_ID,
          client_secret: process.env.OAUTH_KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.OAUTH_KAKAO_REDIRECT_URI,
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
}
