import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'src/utils/pagination/paginator';

import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsDto } from './dto/get-events.dto';
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

  public async getEventsWithPagination(getEventsDto: GetEventsDto) {
    try {
      const result = await paginate(
        this.eventsRepository.getEventsWithFilter(getEventsDto),
        {
          ...getEventsDto,
        },
      );
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getEventWithDetails(id: number) {
    try {
      const event = await this.eventsRepository.findOne(id);
      const details = await this.eventDetailsRepository.getEventDetailByEventId(
        id,
      );

      return {
        event,
        details,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async createNewEvent(dto: CreateEventDto) {
    const event = this.eventsRepository.create({
      ...dto,
      isDeleted: 0,
      createdAt: new Date(),
    });
    try {
      await this.eventsRepository.save(event);
      return event;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // public async createEventAndDetails(
  //   eventName: string,
  //   popupDto: CreateEventDto,
  //   bannerDto: CreateEventDto,
  //   detailDto: CreateEventDto,
  // ) {
  //   const queryRunner = getConnection().createQueryRunner();
  //   await queryRunner.startTransaction();

  //   try {
  //     const event = await this.eventsRepository.createEvent(
  //       queryRunner.manager,
  //       eventName,
  //     );

  //     await this.eventDetailsRepository.createEventDetial(
  //       queryRunner.manager,
  //       event.id,
  //       popupDto,
  //     );
  //     await this.eventDetailsRepository.createEventDetial(
  //       queryRunner.manager,
  //       event.id,
  //       bannerDto,
  //     );
  //     await this.eventDetailsRepository.createEventDetial(
  //       queryRunner.manager,
  //       event.id,
  //       detailDto,
  //     );

  //     await queryRunner.commitTransaction();

  //     return event;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw new HttpException(error, 500);
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
