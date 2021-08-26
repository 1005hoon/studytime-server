import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() filter: GetUsersFilterDto) {
    return this.usersService.getUsersWithPagination(filter, {
      count: true,
      currentPage: filter.page,
      limit: filter.limit,
    });
  }

  @Get(':stId')
  findById(@Param('stId') stId: string) {
    return this.usersService.getUserByIdWithArticles(stId);
  }

  @Patch(':stId')
  async update(
    @Param('stId') stId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.getUserByStId(stId);

    if (!user) {
      throw new NotFoundException(
        `"stId: ${stId}"를 사용하는 계정을 찾지 못했습니다`,
      );
    }

    return this.usersService.updateUser(user, updateUserDto);
  }
}
