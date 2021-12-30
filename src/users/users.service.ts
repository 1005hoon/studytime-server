import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CafeArticlesService } from 'src/cafe-articles/cafe-articles.service';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/Users';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
    // @InjectRepository(Users)
    // private readonly usersRepository: Repository<Users>,
    private readonly articlesService: CafeArticlesService,
  ) {}

  private getBaseQuery(): SelectQueryBuilder<Users> {
    return this.usersRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'DESC');
  }

  private getUsersWithFilter(filter?: GetUsersFilterDto) {
    let query = this.getBaseQuery();

    if (!filter) {
      return query;
    }

    // if (filter.isActive) {
    //   query.andWhere('user.isActive = :isActive', {
    //     isActive: filter.isActive,
    //   });
    // }

    return query;
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

  private searchUserWithFilter(search: string) {
    let query = this.getBaseQuery();
    return query
      .orWhere('user.nickname like :search', { search: `%${search}%` })
      .orWhere('user.email like :search', { search: `%${search}%` })
      .orWhere('user.stId like :search', { search: `%${search}%` });
  }

  public async getUserByUserId(id: number) {
    return this.usersRepository.findOne(id);
  }

  public async getUsersWithPagination(paginationOption: PaginationOption) {
    return await paginate(
      this.usersRepository.getUsersWithFilter(),
      paginationOption,
    );
  }

  public async searchUsersWithPagination(
    search: string,
    paginationOption: PaginationOption,
  ) {
    return await paginate(this.searchUserWithFilter(search), paginationOption);
  }
  public async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (user) {
      return user;
    }

    throw new NotFoundException(
      `"email: ${email}" 을 사용하는 계정을 찾지 못했습니다. `,
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

  public async updateUser(user: Users, updateUserDto: UpdateUserDto) {
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}
