import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CafeArticlesService } from 'src/cafe-articles/cafe-articles.service';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly articlesService: CafeArticlesService,
  ) {}

  private getBaseQuery(): SelectQueryBuilder<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'DESC');
  }

  private getUsersWithFilter(filter?: GetUsersFilterDto) {
    let query = this.getBaseQuery();

    if (!filter) {
      return query;
    }

    if (filter.isActive) {
      query.andWhere('user.isActive = :isActive', {
        isActive: filter.isActive,
      });
    }

    return query;
  }

  public async getUserByIdWithArticles(stId: string) {
    const user = await this.usersRepository.findOne({ stId });
    const articles = await this.articlesService.getLastFiveArticlesByUserStId(
      stId,
    );

    return { user, articles };
  }

  public searchUserWithFilter(search: string) {
    let query = this.getBaseQuery();
    return query
      .where('user.nickname like :search', { search: `%${search}%` })
      .orWhere('user.email like :search', { search: `%${search}%` })
      .select([
        'user.id',
        'user.nickname',
        'user.email',
        'user.thumbnail',
        'user.stId',
      ])
      .getMany();
  }

  public async getUserByUserId(id: number) {
    return this.usersRepository.findOne(id);
  }

  public async getUsersWithPagination(
    filter: GetUsersFilterDto,
    paginationOption: PaginationOption,
  ) {
    return await paginate(this.getUsersWithFilter(filter), paginationOption);
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

  public async updateUser(user: User, updateUserDto: UpdateUserDto) {
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}
