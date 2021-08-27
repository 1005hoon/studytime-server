import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminUserService } from 'src/admin-user/admin-user.service';
import { RegisterDto } from './dto/register.dto';
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
}
