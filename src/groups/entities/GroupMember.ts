import { Users } from 'src/users/entities/Users';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('group_member_user_id_8e7249ba_fk_users_id', ['userId'], {})
@Index('group_membe_group_i_c8433b_idx', ['groupId'], {})
@Entity('group_member', { schema: 'studytime' })
export class GroupMember {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @ManyToOne(() => Users, (users) => users.groupMembers, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
