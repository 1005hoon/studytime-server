import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginationOption } from 'src/utils/pagination/paginator';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetArticleFilterDto } from './dto/get-article-filter.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CafeArticle } from './entities/cafe-article.entity';
import { CafeCategoryEnum } from './enums/cafe-category-filter.enum';

@Injectable()
export class CafeArticlesService {
  private readonly logger = new Logger(CafeArticlesService.name);

  constructor(
    @InjectRepository(CafeArticle)
    private readonly articlesRepository: Repository<CafeArticle>,
  ) {}

  private getBaseQuery(): SelectQueryBuilder<CafeArticle> {
    return this.articlesRepository
      .createQueryBuilder('article')
      .orderBy('article.id', 'DESC');
  }

  private getArticlesWithComments(): SelectQueryBuilder<CafeArticle> {
    return this.getBaseQuery().leftJoinAndSelect(
      'article.cafeReplies',
      'replies',
    );
  }

  private getArticlesWithFilter(
    filter?: GetArticleFilterDto,
  ): SelectQueryBuilder<CafeArticle> {
    let query = this.getBaseQuery();

    if (!filter) {
      return query;
    }

    if (filter.category) {
      const categoryId = CafeCategoryEnum[filter.category];

      query.andWhere('article.categoryId = :categoryId', {
        categoryId,
      });
    }

    if (filter.nickname) {
      query.andWhere('article.nickname = :nickname', {
        nickname: filter.nickname,
      });
    }

    if (filter.stId) {
      query.andWhere('article.stId = :stId', { stId: filter.stId });
    }

    return query;
  }

  public getLastFiveArticlesByUserStId(stId: string) {
    const query = this.getBaseQuery();
    return query.andWhere('article.stId = :stId', { stId }).limit(5).getMany();
  }

  public async getArticlesWithPagination(
    filter: GetArticleFilterDto,
    paginationOption: PaginationOption,
  ) {
    return await paginate(this.getArticlesWithFilter(filter), paginationOption);
  }

  public async getArticleByIdWithReplies(
    id: number,
  ): Promise<CafeArticle | undefined> {
    const query = this.getArticlesWithComments().andWhere('article.id = :id', {
      id,
    });

    return await query.getOne();
  }

  public getArticleById(id: number): Promise<CafeArticle | undefined> {
    return this.articlesRepository.findOne(id);
  }

  public async updateArticle(
    article: CafeArticle,
    updateDto: UpdateArticleDto,
  ): Promise<CafeArticle> {
    Object.assign(article, updateDto);
    return this.articlesRepository.save(article);
  }

  public deleteArticle(article: CafeArticle) {
    Object.assign(article, { isDeleted: true });
    return this.articlesRepository.save(article);
  }
}
