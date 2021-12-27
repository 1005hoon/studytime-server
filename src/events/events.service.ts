import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { GetEventsFilterDto } from './dto/get-events.filter.dto';
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

  public async getEventsWithPagination(
    filter: GetEventsFilterDto,
    paginationOption: PaginationOption,
  ) {
    return await paginate(
      this.eventsRepository.getEventsWithFilter(filter),
      paginationOption,
    );
  }

  public async getEventWithDetails(id: number) {
    return this.eventDetailsRepository.getEventDetailByEventId(id);
  }
}
