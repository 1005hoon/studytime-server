import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { FirebaseAuthGuard } from 'src/authentication/guards/firebase-auth.guard';
import { GetUsersDto } from './dto/get-users.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() getUsersDto: GetUsersDto) {
    try {
      return this.usersService.getUsersWithPagination(getUsersDto);
    } catch (error) {
      return error.message;
    }
  }

  @Patch(':stId')
  async update(@Param('stId') stId: string, @Body() updateUserDto: any) {
    return this.usersService.updateUser(stId, updateUserDto);
  }
}
