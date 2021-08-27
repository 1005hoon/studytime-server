import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { auth } from 'firebase-admin';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const adminUser = await auth().verifyIdToken(token, true);

      if (!adminUser) {
        throw new UnauthorizedException();
      }
      return adminUser;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
