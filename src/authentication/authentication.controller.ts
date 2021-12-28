import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Get('/:provider')
  async authWithProvider(
    //   @Param('provider') provider: string
    @Param('provider') provider: string,
    @Query('code') code: string,
  ) {
    const token = await this.authService.createTokenForUser(provider, code);
    console.log(token);
  }
}
