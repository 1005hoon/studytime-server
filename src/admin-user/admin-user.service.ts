import { Injectable, NotFoundException } from '@nestjs/common';
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

  public sendSlackNotificationToValidateReigstration(dto: CreateAdminUserDto) {
    return this.slackService.sendSlackMessageForNewAdminRegistration(dto);
  }

  public createUser(userData: CreateAdminUserDto) {
    return this.slackService.postTextMessage('a', 'b');
  }
}
