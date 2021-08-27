import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

@Injectable()
export class AdminUserService {
  constructor() {}

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

  public createUser(userData: CreateAdminUserDto) {
    return admin.auth().createUser({ ...userData });
  }
}
