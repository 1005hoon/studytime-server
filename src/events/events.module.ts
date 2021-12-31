import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';

import { EventDetailsRepository } from './event-details.repository';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventDetailsRepository, EventsRepository]),
    FilesModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
