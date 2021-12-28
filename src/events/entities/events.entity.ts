import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event', { schema: 'studytime' })
class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('tinyint', { name: 'is_deleted', width: 1 })
  isDeleted: number;
}

export default Event;
