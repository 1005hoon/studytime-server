import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';
import { CreateEventDto } from './dto/create-event.dto';
import EventDetail from './entities/event-details.entity';

@EntityRepository(EventDetail)
export class EventDetailsRepository extends Repository<EventDetail> {
  private getEventsQuery() {
    return this.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }

  public getEventDetailByEventId(id: number) {
    return this.getEventsQuery()
      .where('e.eventId = :eventId', { eventId: id })
      .getMany();
  }

  public async createEventDetial(img_url: string, dto: CreateEventDetailDto) {
    const detail = this.create({
      ...dto,
      img_url,
      createdAt: new Date(),
      isDeleted: 0,
    });
    await this.save(detail);
    return detail;
  }
}
