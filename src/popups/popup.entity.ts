import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('popup', { schema: 'studytime' })
export class Popup {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: false, length: 20 })
  title: string;

  @Column('varchar', { name: 'screen', nullable: true, length: 20 })
  screen: string | null;

  @Column('int', { name: 'target_id', nullable: true })
  targetId: number | null;

  @Column('varchar', { name: 'img_url', length: 256 })
  imgUrl: string;

  @Column('varchar', { name: 'url', nullable: true, length: 256 })
  url: string | null;

  @Column('tinyint', { name: 'use_yn', width: 1 })
  useYn: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('tinyint', { name: 'is_deleted', width: 1 })
  isDeleted: number;

  @Column('varchar', { name: 'description', length: 256 })
  description: string;
}
