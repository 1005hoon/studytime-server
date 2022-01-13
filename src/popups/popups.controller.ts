import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { EventsService } from 'src/events/events.service';
import { CreatePopupDto } from './create-popup.dto';
import { GetPopupsDto } from './get-popups.dto';
import { PopupsService } from './popups.service';

@Controller('popups')
export class PopupsController {
  constructor(
    private readonly popupsService: PopupsService,
    private readonly eventsService: EventsService,
  ) {}

  @Get('/')
  async getAll(@Query() dto: GetPopupsDto) {
    const popups = await this.popupsService.getAllPopupsWithPagination(dto);
    const events = await this.eventsService.getAllEvents();

    return {
      popups,
      events,
    };
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.popupsService.getPopupById(+id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createPopup(
    @UploadedFile() image: Express.Multer.File,
    @Body() createPopupDto: CreatePopupDto,
  ) {
    return this.popupsService.createNewPopup(image, createPopupDto);
  }
}
