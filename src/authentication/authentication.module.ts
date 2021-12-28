import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';
import { KakaoStrategy } from './strategies/kakao-auth.strategy';

@Module({
  imports: [UsersModule],
  providers: [AuthenticationService, KakaoStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
