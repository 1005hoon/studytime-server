import { EntityRepository, Repository } from 'typeorm';
import Event from './entities/events.entity';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {}
