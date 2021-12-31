import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { EventsService } from './events.service';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  getAll(@Query() getEventsDto: GetEventsDto) {
    return this.eventsService.getEventsWithPagination(getEventsDto);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.eventsService.getEventWithDetails(+id);
  }

  @Post('/')
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createNewEvent(createEventDto);

    // return this.eventsService.createEventAndDetails(
    //   event,
    //   popupDto,
    //   bannerDto,
    //   detailDto,
    // );
  }
}
