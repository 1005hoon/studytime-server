import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Get('/:provider')
  async authWithProvider(
    @Param('provider') provider: string,
    @Query('code') code: string,
  ) {
    const token = await this.authService.createTokenForUser(provider, code);
    return token.access_token;
  }
}
