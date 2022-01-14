import { UpdateDetailDto } from 'src/event-details/dto/update-detail.dto';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';

import EventDetail from './entities/event-details.entity';

@EntityRepository(EventDetail)
export class EventDetailsRepository extends Repository<EventDetail> {
  private getEventDetailQuery() {
    return this.createQueryBuilder('detail')
      .where('detail.is_deleted = :isDeleted', { isDeleted: 0 })
      .orderBy('detail.id', 'DESC');
  }

  public getEventDetailByEventId(id: number) {
    return this.getEventDetailQuery()
      .andWhere('detail.eventId = :eventId', { eventId: id })
      .getMany();
  }

  public async createEventDetial(imgUrl: string, dto: CreateEventDetailDto) {
    const detail = this.create({
      ...dto,
      imgUrl,
      createdAt: new Date(),
      isDeleted: 0,
    });
    await this.save(detail);
    return detail;
  }

  public deleteEventDetailByEventId(eventId: number) {
    return this.createQueryBuilder('detail')
      .update(EventDetail)
      .set({ isDeleted: 1 })
      .where('event_id = :eventId', { eventId })
      .execute();
  }

  public deleteEventDetailById(id: number) {
    return this.createQueryBuilder('detail')
      .update(EventDetail)
      .set({ isDeleted: 1 })
      .where('id = :id', { id })
      .execute();
  }
}
