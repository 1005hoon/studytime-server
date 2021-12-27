import { EntityRepository, Repository } from 'typeorm';
import { GetEventsFilterDto } from './dto/get-events.filter.dto';
import Event from './entities/events.entity';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {
  private getEventsQuery() {
    return this.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }

  public getEventsWithFilter(filter: GetEventsFilterDto) {
    let query = this.getEventsQuery();

    if (!filter) {
      return query;
    }

    if (filter.isDeleted) {
      query.andWhere('event.isDeleted = :isDeleted', {
        isDeleted: filter.isDeleted,
      });
    }

    if (filter.name) {
      query.andWhere('event.name like :name', { name: `%${filter.name}%` });
    }

    return query;
  }
}
