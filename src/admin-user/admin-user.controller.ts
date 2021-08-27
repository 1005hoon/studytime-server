import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/authentication/decorators/current-user.decorator';
import { FirebaseAuthGuard } from 'src/authentication/guards/firebase-auth.guard';
import { AdminUserService } from './admin-user.service';
import { GetAdminUsersDto } from './dto/get-admin-users.dto';

@Controller('admin-users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  findAll(@Query() filter: GetAdminUsersDto) {
    return this.adminUserService.findAllAdminUsers(
      filter.limit,
      filter.pageToken,
    );
  }

  @Get('/test')
  @UseGuards(FirebaseAuthGuard)
  testRoute(@CurrentUser() user) {
    return 'success';
  }
}
