import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SlackService } from 'src/slack/slack.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { GetAdminUsersDto } from './dto/get-admin-users.dto';

@Injectable()
export class AdminUserService {
  constructor(
    @Inject(forwardRef(() => SlackService))
    private readonly slackService: SlackService,
  ) {}

  public findAllAdminUsers(filter: GetAdminUsersDto) {
    return admin.auth().listUsers(filter.limit, filter.pageToken);
  }

  public findUserByEmail(email: string) {
    return admin.auth().getUserByEmail(email);
  }

  public async checkDuplicateEmail(email: string) {
    try {
      const user = await this.findUserByEmail(email);
      if (user) {
        throw new BadRequestException(`${email}은 이미 사용중인 이메일 입니다`);
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  public async sendSlackNotificationToValidateReigstration(
    dto: CreateAdminUserDto,
  ) {
    try {
      const response =
        await this.slackService.sendSlackMessageForNewAdminRegistration(dto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  public createUser(userData: CreateAdminUserDto) {
    return admin.auth().createUser({ ...userData });
  }
}
