import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmDevice } from './entities/fcm-device.entity';
import { FcmDeviceController } from './fcm-device.controller';
import { FcmDeviceService } from './fcm-device.service';

@Module({
  imports: [TypeOrmModule.forFeature([FcmDevice])],
  controllers: [FcmDeviceController],
  providers: [FcmDeviceService],
  exports: [FcmDeviceService],
})
export class FcmDeviceModule {}
