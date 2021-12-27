import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetEventsFilterDto } from './dto/get-events.filter.dto';
import EventDetail from './entities/event-details.entity';
import Event from './entities/events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(EventDetail)
    private readonly eventDetailsRepository: Repository<EventDetail>,
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
}
