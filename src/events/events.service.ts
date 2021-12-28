import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { getConnection } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
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

  public async createEventAndDetails(
    eventName: string,
    popupDto: CreateEventDto,
    bannerDto: CreateEventDto,
    detailDto: CreateEventDto,
  ) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const event = await this.eventsRepository.createEvent(
        queryRunner.manager,
        eventName,
      );

      await this.eventDetailsRepository.createEventDetial(
        queryRunner.manager,
        event.id,
        popupDto,
      );
      await this.eventDetailsRepository.createEventDetial(
        queryRunner.manager,
        event.id,
        bannerDto,
      );
      await this.eventDetailsRepository.createEventDetial(
        queryRunner.manager,
        event.id,
        detailDto,
      );

      await queryRunner.commitTransaction();

      return event;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 500);
    } finally {
      await queryRunner.release();
    }
  }
}
