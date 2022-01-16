import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsDto } from './dto/get-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
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
  @UseGuards(JwtAuthGuard)
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createNewEvent(createEventDto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.updateEventById(+id, updateEventDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEventById(+id);
  }
}
