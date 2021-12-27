import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetEventsFilterDto } from './dto/get-events.filter.dto';
import EventDetail from './entities/event-details.entity';
import Event from './entities/events.entity';
import { EventDetailsRepository } from './event-details.repository';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsRepository)
    private readonly eventsRepository: EventsRepository,
    @InjectRepository(EventDetailsRepository)
    private readonly eventDetailsRepository: EventDetailsRepository,
  ) {}

  private getEventsQuery(): SelectQueryBuilder<Event> {
    return this.eventsRepository
      .createQueryBuilder('event')
      .orderBy('event.id', 'DESC');
  }

  private getEventsWithFilter(filter: GetEventsFilterDto) {
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

  public async getEventsWithPagination(
    filter: GetEventsFilterDto,
    paginationOption: PaginationOption,
  ) {
    return await paginate(this.getEventsWithFilter(filter), paginationOption);
  }

  public async getEventWithDetails(id: number) {
    return this.eventDetailsRepository.findOne();
  }
}
