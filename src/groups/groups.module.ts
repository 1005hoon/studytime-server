import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupFeed } from './entities/GroupFeed';
import { GroupMaster } from './entities/GroupMaster';
import { GroupMember } from './entities/GroupMember';
import { GroupMissionMaster } from './entities/GroupMissionMaster';
import { GroupPost } from './entities/GroupPost';
import { GroupTag } from './entities/GroupTag';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupFeed,
      GroupMaster,
      GroupMember,
      GroupMissionMaster,
      GroupPost,
      GroupTag,
    ]),
  ],
})
export class GroupsModule {}
