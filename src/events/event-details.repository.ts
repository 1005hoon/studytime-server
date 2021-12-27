import { EntityRepository, Repository } from 'typeorm';
import EventDetail from './entities/event-details.entity';

@EntityRepository(EventDetail)
export class EventDetailsRepository extends Repository<EventDetail> {}
