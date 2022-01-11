import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { paginate } from 'src/utils/pagination/paginator';
import { CreatePopupDto } from './create-popup.dto';
import { GetPopupsDto } from './get-popups.dto';
import { PopupsRepository } from './popups.repository';

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
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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
}
