import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventDetail from './entities/event-details.entity';
import Event from './entities/events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventDetail, Event])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
