import { Users } from 'src/users/entities/Users';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('group_feed_user_id_30968815_fk_users_id', ['userId'], {})
@Entity('group_feed', { schema: 'studytime' })
export class GroupFeed {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('int', { name: 'feed_type' })
  feedType: number;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @ManyToOne(() => Users, (users) => users.groupFeeds, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
