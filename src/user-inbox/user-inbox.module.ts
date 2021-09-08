import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInbox } from './entities/user-inbox.entity';
import { UserInboxService } from './user-inbox.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInbox])],
  providers: [UserInboxService],
  exports: [UserInboxService],
})
export class UserInboxModule {}
