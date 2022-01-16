import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDetailsRepository } from 'src/events/event-details.repository';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { CreateEventDetailDto } from 'src/events/dto/create-event-detail.dto';

@Injectable()
export class EventDetailsService {
  constructor(
    @InjectRepository(EventDetailsRepository)
    private readonly detailsRepository: EventDetailsRepository,
    private readonly filesService: FilesService,
  ) {}

  public async getEventDetailById(id: number) {
    try {
      const detail = await this.detailsRepository.findOne(id);
      if (!detail) {
        throw new HttpException(
          `${id}에 해당하는 이벤트 디테일 정보를 찾지 못했습니다`,
          HttpStatus.NOT_FOUND,
        );
      }
      return detail;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async createEventDetail(
    image: Express.Multer.File,
    dto: CreateEventDetailDto,
  ) {
    let url = '';

    if (image) {
      url = await this.filesService.uploadPublicFile(
        image.buffer,
        image.originalname,
        image.mimetype,
      );
    }

    const detail = await this.detailsRepository.createEventDetial(
      decodeURI(url),
      dto,
    );

    return detail;
  }

  public async updateEventDetailById(
    id: number,
    dto: UpdateDetailDto,
    image?: Express.Multer.File,
  ) {
    let url = '';

    try {
      if (image) {
        url = await this.filesService.uploadPublicFile(
          image.buffer,
          image.originalname,
          image.mimetype,
        );
      }

      await this.detailsRepository.update(id, {
        ...dto,
        imgUrl: url === '' ? dto.imgUrl : url,
      });
      const updatedDetail = await this.detailsRepository.findOne(id);
      return updatedDetail;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async deleteEventDetailById(id: number) {
    try {
      await this.detailsRepository.deleteEventDetailById(id);
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
