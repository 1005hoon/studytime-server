import { forwardRef, Module } from '@nestjs/common';
import { AdminUserModule } from 'src/admin-user/admin-user.module';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

@Module({
  imports: [forwardRef(() => AdminUserModule)],
  controllers: [SlackController],
  providers: [SlackService],
  exports: [SlackService],
})
export class SlackModule {}
