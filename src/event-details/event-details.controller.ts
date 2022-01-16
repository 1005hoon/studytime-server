import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { EventDetailsService } from './event-details.service';

@Controller('event-details')
export class EventDetailsController {
  constructor(private readonly detailsService: EventDetailsService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.detailsService.getEventDetailById(+id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateById(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateDetailDto: UpdateDetailDto,
  ) {
    return this.detailsService.updateEventDetailById(
      +id,
      updateDetailDto,
      image,
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id: string) {
    return this.detailsService.deleteEventDetailById(+id);
  }
}
