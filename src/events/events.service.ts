import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { paginate } from 'src/utils/pagination/paginator';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';

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
    private readonly filesService: FilesService,
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

  public async getAllEvents() {
    try {
      const result = await this.eventsRepository
        .getEventsWithFilter()
        .getMany();
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

  public async createNewDetail(
    image: Express.Multer.File,
    createDetailDto: CreateEventDetailDto,
  ) {
    let url = '';

    if (image) {
      url = await this.filesService.uploadPublicFile(
        image.buffer,
        image.originalname,
        image.mimetype,
      );
    }

    const detail = await this.eventDetailsRepository.createEventDetial(
      decodeURI(url),
      createDetailDto,
    );

    return detail;
  }
}
