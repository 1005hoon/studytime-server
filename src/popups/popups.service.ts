import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { paginate } from 'src/utils/pagination/paginator';
import { CreatePopupDto } from './create-popup.dto';
import { GetPopupsDto } from './get-popups.dto';
import { PopupsRepository } from './popups.repository';
import { UpdatePopupDto } from './update-popup.dto';

@Injectable()
export class PopupsService {
  constructor(
    @InjectRepository(PopupsRepository)
    private readonly popupsRepository: PopupsRepository,
    private readonly filesService: FilesService,
  ) {}

  public async getAllPopupsWithPagination(dto: GetPopupsDto) {
    try {
      const popups = await paginate(
        this.popupsRepository.getPopupsWithFilter(),
        {
          ...dto,
        },
      );

      return popups;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async getPopupById(id: number) {
    try {
      const popup = await this.popupsRepository.findOne(id);

      if (!popup || popup.isDeleted === 1) {
        throw new NotFoundException(`${id}에 해당하는 팝업을 찾지 못했습니다`);
      }

      return popup;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  public async createNewPopup(image: Express.Multer.File, dto: CreatePopupDto) {
    let url = '';

    if (image) {
      url = await this.filesService.uploadPublicFile(
        image.buffer,
        image.originalname,
        image.mimetype,
      );
    }

    const popup = await this.popupsRepository.createNewPopupAndDisableRest(
      dto,
      url,
    );

    return popup;
  }

  public async updatePopupById(
    id: number,
    image: Express.Multer.File,
    dto: UpdatePopupDto,
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

      return this.popupsRepository.updatePopup(id, {
        ...dto,
        imgUrl: url === '' ? dto.imgUrl : url,
      });
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
