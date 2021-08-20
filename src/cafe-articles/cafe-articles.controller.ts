import { Controller, Get } from '@nestjs/common';
import { CafeArticlesService } from './cafe-articles.service';

@Controller('cafe-articles')
export class CafeArticlesController {
  constructor(private readonly articlesService: CafeArticlesService) {}

  @Get()
  getArticles() {
    return this.articlesService.getAllArticles();
  }
}
