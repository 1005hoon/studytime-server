import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { PopupsRepository } from './popups.repository';

@Injectable()
export class PopupsService {
  constructor(
    @InjectRepository(PopupsRepository)
    private readonly popupsRepository: PopupsRepository,
    private readonly filesService: FilesService,
  ) {}
}
