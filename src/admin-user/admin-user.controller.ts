import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/authentication/guards/firebase-auth.guard';
import { AdminUserService } from './admin-user.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { GetAdminUsersDto } from './dto/get-admin-users.dto';

@Controller('admin-users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(@Query() filter: GetAdminUsersDto) {
    return this.adminUserService.findAllAdminUsers({ ...filter });
  }

  @Get('/validation')
  findByEmail(@Query('email') email: string) {
    return this.adminUserService.findUserByEmail(email);
  }

  @Post('/validations')
  create(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.adminUserService.sendSlackNotificationToValidateReigstration(
      createAdminUserDto,
    );
  }

  @Post('/test')
  testSlackNotificationForRegistrationValidation() {
    return 'hi';
  }
}
