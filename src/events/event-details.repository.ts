import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import EventDetail from './entities/event-details.entity';

@EntityRepository(EventDetail)
export class EventDetailsRepository extends Repository<EventDetail> {
  private getEventsQuery() {
    return this.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }

  public getEventDetailByEventId(id: number) {
    return (
      this.getEventsQuery()
        // .where('e.eventId = :eventId', { eventId: id })
        .getMany()
    );
  }

  public async createEventDetial(
    @TransactionManager() em: EntityManager,
    eventId: number,
    dto: CreateEventDto,
  ) {
    const detail = em.create(EventDetail, {
      eventId,
      isDeleted: 0,
      createdAt: new Date(),
      ...dto,
    });
    await em.save(detail);
    return detail;
  }
}
