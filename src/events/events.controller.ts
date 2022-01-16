import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';
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
