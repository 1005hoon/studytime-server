import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventDetail from './entities/event-details.entity';
import Event from './entities/events.entity';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventDetail, Event])],
  providers: [EventsService],
})
export class EventsModule {}
