import { EntityRepository, Repository } from 'typeorm';
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
}
