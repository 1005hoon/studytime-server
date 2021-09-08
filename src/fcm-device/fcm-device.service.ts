import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FcmDevice } from './entities/fcm-device.entity';

@Injectable()
export class FcmDeviceService {
  constructor(
    @InjectRepository(FcmDevice)
    private readonly fcmDeviceRepository: Repository<FcmDevice>,
  ) {}

  public getDeviceIdByUserId(userId: number) {
    return this.fcmDeviceRepository.findOne({ userId });
  }
}
