import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationResult } from 'src/utils/pagination/paginator';
import { CafeArticlesService } from './cafe-articles.service';
import { GetArticleFilterDto } from './dto/get-article-filter.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CafeArticle } from './entities/cafe-article.entity';

@Controller('cafe-articles')
export class CafeArticlesController {
  constructor(private readonly articlesService: CafeArticlesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query() filter: GetArticleFilterDto,
  ): Promise<PaginationResult<CafeArticle>> {
    return this.articlesService.getArticlesWithPagination(filter, {
      count: true,
      currentPage: filter.page,
      limit: 10,
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<CafeArticle> {
    const article = await this.articlesService.getArticleByIdWithReplies(id);
    if (!article) {
      throw new NotFoundException(
        `"id: ${id}"에 해당하는 글이 존재하지 않습니다`,
      );
    }
    return article;
  }

  @Patch(':id')
  // @UseGuards()
  async update(
    // @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<CafeArticle> {
    const article = await this.articlesService.getArticleById(id);

    if (!article) {
      throw new NotFoundException(
        `"id: ${id}"에 해당하는 글이 존재하지 않습니다`,
      );
    }

    return this.articlesService.updateArticle(article, updateArticleDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.getArticleById(id);

    if (!article) {
      throw new NotFoundException(
        `"id: ${id}"에 해당하는 글이 존재하지 않습니다`,
      );
    }

    return this.articlesService.deleteArticle(article);
  }
}
