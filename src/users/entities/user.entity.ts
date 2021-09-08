import { Exclude } from 'class-transformer';
import { FcmDevice } from 'src/fcm-device/entities/fcm-device.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { GroupFeed } from './GroupFeed';
// import { GroupMember } from './GroupMember';
// import { UserMission } from './UserMission';

@Index('st_id', ['stId'], { unique: true })
@Index('sns_token', ['snsToken'], { unique: true })
@Entity('users', { schema: 'studytime' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Exclude()
  @Column('varchar', { name: 'password', length: 128 })
  password: string;

  @Column('datetime', { name: 'last_login', nullable: true })
  lastLogin: Date | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { name: 'st_id', unique: true, length: 20 })
  stId: string;

  @Column('varchar', {
    name: 'sns_token',
    nullable: true,
    unique: true,
    length: 64,
  })
  snsToken: string | null;

  @Column('varchar', { name: 'sns_type', nullable: true, length: 1 })
  snsType: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 20 })
  name: string | null;

  @Column('varchar', { name: 'nickname', nullable: true, length: 30 })
  nickname: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 20 })
  phone: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 100 })
  email: string | null;

  @Column('varchar', { name: 'gender', nullable: true, length: 6 })
  gender: string | null;

  @Column('tinyint', { name: 'is_active', width: 1 })
  isActive: boolean;

  @Column('tinyint', { name: 'is_admin', width: 1 })
  isAdmin: boolean;

  @Column('int', { name: 'age' })
  age: number;

  @Column('varchar', { name: 'birthday', nullable: true, length: 10 })
  birthday: string | null;

  @Column('varchar', { name: 'thumbnail', nullable: true, length: 256 })
  thumbnail: string | null;

  @Column('date', { name: 'd_day', nullable: true })
  dDay: string | null;

  @Column('tinyint', { name: 'is_live', width: 1 })
  isLive: boolean;

  @Column('int', { name: 'team_id' })
  teamId: number;

  @Column('varchar', { name: 'd_day_name', nullable: true, length: 20 })
  dDayName: string | null;

  @Column('int', { name: 'group_id', nullable: true })
  groupId: number | null;

  @Column('datetime', { name: 'live_at', nullable: true })
  liveAt: Date | null;

  @Column('int', { name: 'last_leaf_id' })
  lastLeafId: number;

  @Column('varchar', { name: 'last_leaf_name', length: 100 })
  lastLeafName: string;

  @Column('date', { name: 'nickname_changed_date', nullable: true })
  nicknameChangedDate: string | null;

  @OneToMany(() => FcmDevice, (fcmDjangoFcmdevice) => fcmDjangoFcmdevice.user)
  fcmDjangoFcmdevices: FcmDevice[];
}
