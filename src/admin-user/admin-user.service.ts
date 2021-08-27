import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SlackService } from 'src/slack/slack.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

@Injectable()
export class AdminUserService {
  constructor(private readonly slackService: SlackService) {}

  public findAllAdminUsers(limit?: number, pageToken?: string) {
    return admin.auth().listUsers(limit, pageToken);
  }

  public async findUserByEmail(email: string) {
    const user = await admin.auth().getUserByEmail(email);

    if (user) {
      return user;
    }

    throw new NotFoundException(
      `${email}로 등록된 어드민 유저를 조회하지 못했습니다`,
    );
  }

  public async sendSlackNotificationToValidateReigstration(
    dto: CreateAdminUserDto,
  ) {
    try {
      const response =
        await this.slackService.sendSlackMessageForNewAdminRegistration(dto);
      return response.ok;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  public createUser(userData: CreateAdminUserDto) {
    return userData;
    // return this.slackService.postTextMessage('a', 'b');
  }
}
