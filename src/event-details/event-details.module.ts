import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventDetailsRepository } from 'src/events/event-details.repository';
import { FilesModule } from 'src/files/files.module';
import { EventDetailsController } from './event-details.controller';
import { EventDetailsService } from './event-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventDetailsRepository]), FilesModule],
  controllers: [EventDetailsController],
  providers: [EventDetailsService],
  exports: [EventDetailsService],
})
export class EventDetailsModule {}
