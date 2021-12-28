import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Get('/auth/:provider')
  async authWithProvider(
    @Param('provider') provider: string,
    @Res() res: Response,
  ) {
    const authUrl = this.authService.getAuthUrl(provider);
    return authUrl;
  }
}
