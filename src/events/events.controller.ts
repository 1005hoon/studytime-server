import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetEventsFilterDto } from './dto/get-events.filter.dto';
import { EventsService } from './events.service';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  getAll(@Query() filter: GetEventsFilterDto) {
    return this.eventsService.getEventsWithPagination(filter, {
      count: true,
      currentPage: filter.currentPage || 1,
      limit: filter.limit || 10,
    });
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.eventsService.getEventWithDetails(+id);
  }
}
