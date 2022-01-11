import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { GetEventsDto } from './dto/get-events.dto';
import Event from './entities/events.entity';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {
  private getEventsQuery() {
    return this.createQueryBuilder('event')
      .where('event.is_deleted = :isDeleted', { isDeleted: 0 })
      .orderBy('event.id', 'DESC');
  }

  public getEventsWithFilter(filter?: GetEventsDto) {
    let query = this.getEventsQuery();

    if (!filter) {
      return query;
    }

    if (filter.search) {
      query.andWhere('e.name like :name', { name: `%${filter.search}%` });
    }

    return query;
  }

  public async createEvent(
    @TransactionManager() em: EntityManager,
    name: string,
  ) {
    const event = em.create(Event, {
      name,
      createdAt: new Date(),
      isDeleted: 0,
    });
    await em.save(event);
    return event;
  }
}
