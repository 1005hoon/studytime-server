import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AdminUserModule } from 'src/admin-user/admin-user.module';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
    AdminUserModule,
  ],
  providers: [FirebaseAuthStrategy, AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
