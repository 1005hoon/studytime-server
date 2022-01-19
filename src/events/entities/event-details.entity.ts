import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_detail', { schema: 'studytime' })
class EventDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'event_id' })
  eventId: number;

  @Column('varchar', { name: 'type', nullable: true, length: 20 })
  type: string | null;

  @Column('varchar', { name: 'img_url', length: 256 })
  imgUrl: string;

  @Column('varchar', { name: 'url1', length: 256 })
  url1: string;

  @Column('varchar', { name: 'url2', length: 256 })
  url2: string;

  @Column('varchar', { name: 'url_button_name1', length: 50 })
  urlButtonName1: string;

  @Column('varchar', { name: 'url_button_name2', length: 50 })
  urlButtonName2: string;

  @Column('varchar', { name: 'description', length: 256 })
  description: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('tinyint', { name: 'is_deleted', width: 1 })
  isDeleted: number;
}

export default EventDetail;
