import { Module } from '@nestjs/common';
import { SlackService } from 'src/slack/slack.service';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';

@Module({
  controllers: [AdminUserController],
  providers: [AdminUserService, SlackService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
