import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { paginate } from 'src/utils/pagination/paginator';
import { PopupsRepository } from './popups.repository';

@Injectable()
export class PopupsService {
  constructor(
    @InjectRepository(PopupsRepository)
    private readonly popupsRepository: PopupsRepository,
    private readonly filesService: FilesService,
  ) {}

  public async getAllPopupsWithPagination() {
    try {
      const result = await paginate(
        this.popupsRepository.getPopupsWithFilter(),
        {
          page: 1,
          count: true,
          limit: 10,
        },
      );
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
