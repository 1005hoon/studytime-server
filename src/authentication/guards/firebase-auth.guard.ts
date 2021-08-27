import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (info) {
      console.log(info);
    }

    if (err !== null && err.status !== 401) {
      throw new UnauthorizedException(err.message);
    }

    if (err || !user) {
      throw new UnauthorizedException('요청 처리를 위한 권한이 없습니다');
    }

    return user;
  }
}
