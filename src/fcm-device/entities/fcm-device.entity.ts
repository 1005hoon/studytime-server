import { Users } from 'src/users/entities/Users';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('fcm_django_fcmdevice_device_id_a9406c36', ['deviceId'], {})
@Index('fcm_django_fcmdevice_user_id_6cdfc0a2_fk_users_id', ['userId'], {})
@Entity('fcm_django_fcmdevice', { schema: 'studytime' })
export class FcmDevice {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('tinyint', { name: 'active', width: 1 })
  active: boolean;

  @Column('datetime', { name: 'date_created', nullable: true })
  dateCreated: Date | null;

  @Column('varchar', { name: 'device_id', nullable: true, length: 150 })
  deviceId: string | null;

  @Column('longtext', { name: 'registration_id' })
  registrationId: string;

  @Column('varchar', { name: 'type', length: 10 })
  type: string;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  // @ManyToOne(() => Users, (users) => users.fcmDjangoFcmdevices, {
  //   onDelete: 'RESTRICT',
  //   onUpdate: 'RESTRICT',
  // })
  // @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  // user: Users;
}
