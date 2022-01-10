import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from 'src/events/events.service';
import { GetPopupsDto } from './get-popups.dto';
import { PopupsService } from './popups.service';

@Controller('popups')
export class PopupsController {
  constructor(
    private readonly popupsService: PopupsService,
    private readonly eventsService: EventsService,
  ) {}

  @Get('')
  async getAll(@Query() dto: GetPopupsDto) {
    const popups = await this.popupsService.getAllPopupsWithPagination(dto);
    const events = await this.eventsService.getAllEvents();

    return {
      popups,
      events,
    };
  }
}
