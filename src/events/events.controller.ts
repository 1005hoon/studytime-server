import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsFilterDto } from './dto/get-events.filter.dto';
import { EventsService } from './events.service';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  getAll(@Query() filter: GetEventsFilterDto) {
    return this.eventsService.getEventsWithPagination(filter, {
      count: true,
      page: filter.page || 1,
      limit: filter.limit || 10,
    });
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.eventsService.getEventWithDetails(+id);
  }

  @Post('/')
  createEvent(
    @Body('event') event: string,
    @Body('popup') popupDto: CreateEventDto,
    @Body('banner') bannerDto: CreateEventDto,
    @Body('detail') detailDto: CreateEventDto,
  ) {
    return this.eventsService.createEventAndDetails(
      event,
      popupDto,
      bannerDto,
      detailDto,
    );
  }
}
