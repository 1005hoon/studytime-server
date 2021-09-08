import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('user_inbox_st_id_be32869b', ['stId'], {})
@Entity('user_inbox', { schema: 'studytime' })
export class UserInbox {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { name: 'title', length: 40 })
  title: string;

  @Column('longtext', { name: 'content' })
  content: string;

  @Column('int', { name: 'inbox_type_id' })
  inboxTypeId: number;

  @Column('varchar', { name: 'st_id', length: 20 })
  stId: string;

  @Column('tinyint', { name: 'is_content', width: 1 })
  isContent: boolean;
}
