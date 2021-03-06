import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { paginate } from 'src/utils/pagination/paginator';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';

import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDetailsRepository } from './event-details.repository';
import { EventsRepository } from './events.repository';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
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
      throw new HttpException(error, error.status);
    }
  }

  public async getAllEvents() {
    try {
      const result = await this.eventsRepository
        .getEventsWithFilter()
        .getMany();
      return result;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async getEventWithDetails(id: number) {
    try {
      const event = await this.eventsRepository.findOne(id);
      if (!event) {
        throw new NotFoundException(
          `${id}에 해당하는 이벤트를 찾지 못했습니다`,
        );
      }
      if (event.isDeleted) {
        throw new HttpException(
          `${event.name}에 해당하는 이벤트가 존재하지 않습니다`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const details = await this.eventDetailsRepository.getEventDetailByEventId(
        id,
      );

      return {
        event,
        details,
      };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async createNewEvent(dto: CreateEventDto) {
    const event = this.eventsRepository.create({
      ...dto,
      isDeleted: 0,
      inProgress: true,
      createdAt: new Date(),
    });
    try {
      await this.eventsRepository.save(event);
      return event;
    } catch (error) {
      throw new HttpException(error, error.status);
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

  public async updateEventById(id: number, dto: UpdateEventDto) {
    try {
      const event = await this.eventsRepository.findOne(id);

      if (!event) {
        throw new NotFoundException(
          `${id}에 해당하는 이벤트를 찾을 수 없습니다`,
        );
      }

      await this.eventsRepository.update(id, { ...dto });
      const updatedEvent = await this.eventsRepository.findOne(id);
      return updatedEvent;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async deleteEventById(id: number) {
    try {
      const event = await this.eventsRepository.findOne(id);

      if (!event) {
        throw new NotFoundException(
          `${id}에 해당하는 이벤트를 찾을 수 없습니다`,
        );
      }

      await this.eventsRepository.deleteEvent(event);
      await this.eventDetailsRepository.deleteEventDetailByEventId(id);
    } catch (error) {
      console.error(error);

      throw new HttpException(error, error.status);
    }
  }
}
