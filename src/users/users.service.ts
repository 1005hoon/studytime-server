import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CafeArticlesService } from 'src/cafe-articles/cafe-articles.service';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/Users';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
    private readonly articlesService: CafeArticlesService,
  ) {}

  public async getUsersWithPagination(getUsersDto: GetUsersDto) {
    if (getUsersDto.st_id) {
      return this.usersRepository.getUserByStId(getUsersDto.st_id);
    }

    return paginate(this.usersRepository.getUsersWithFilter(getUsersDto), {
      ...getUsersDto,
    });
  }

  public async updateUser(stId: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUserByStId(stId, updateUserDto);
  }

  public async getAllUsers() {
    return this.usersRepository.find();
  }

  public async getUserByIdWithArticles(stId: string) {
    const user = await this.usersRepository.findOne({ stId });
    const articles = await this.articlesService.getLastFiveArticlesByUserStId(
      stId,
    );

    return { user, articles };
  }

  public async getUserByUserId(id: number) {
    return this.usersRepository.findOne(id);
  }

  public async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      return user;
    }

    throw new NotFoundException(
      `"${email}" 을 사용하는 계정을 찾지 못했습니다. 동기부여 어플리케이션을 통해 회원가입을 진행해주세요.`,
    );
  }

  public async getUserByStId(stId: string) {
    const user = await this.usersRepository.findOne({ stId });
    if (user) {
      return user;
    }
    throw new NotFoundException(
      `"stId: ${stId}"를 사용하는 계정을 찾지 못했습니다`,
    );
  }

  public async createUser(userData: CreateUserDto) {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);
    return user;
  }

  // public async updateUser(user: Users, updateUserDto: UpdateUserDto) {
  //   Object.assign(user, updateUserDto);
  //   return this.usersRepository.save(user);
  // }
}
