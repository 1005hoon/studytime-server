import { forwardRef, Module } from '@nestjs/common';
import { SlackModule } from 'src/slack/slack.module';
import { SlackService } from 'src/slack/slack.service';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';

@Module({
  imports: [forwardRef(() => SlackModule)],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
