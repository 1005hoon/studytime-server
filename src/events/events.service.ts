import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
