import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { FilesModule } from 'src/files/files.module';
import { PopupsController } from './popups.controller';
import { PopupsRepository } from './popups.repository';
import { PopupsService } from './popups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PopupsRepository]),
    FilesModule,
    EventsModule,
  ],
  controllers: [PopupsController],
  providers: [PopupsService],
})
export class PopupsModule {}
