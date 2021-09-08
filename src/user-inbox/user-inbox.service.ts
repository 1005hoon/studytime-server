import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInbox } from './entities/user-inbox.entity';

@Injectable()
export class UserInboxService {
  constructor(
    @InjectRepository(UserInbox)
    private readonly userInboxRepository: Repository<UserInbox>,
  ) {}

  public async createUserInboxForPushNotification(
    stId: string,
    title: string,
    content: string,
  ) {
    const message = this.userInboxRepository.create({
      stId,
      title,
      content,
      isContent: true,
      inboxTypeId: 0,
      createdAt: new Date(),
    });
    try {
      await this.userInboxRepository.save(message);
      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
