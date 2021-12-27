import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventDetail from './entities/event-details.entity';
import Event from './entities/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventDetail, Event])],
})
export class EventsModule {}
