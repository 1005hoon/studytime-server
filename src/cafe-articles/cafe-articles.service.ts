import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CafeArticle } from './entities/cafe-article.entity';

@Injectable()
export class CafeArticlesService {
  constructor(
    @InjectRepository(CafeArticle)
    private readonly articlesRepository: Repository<CafeArticle>,
  ) {}

  getAllArticles() {
    return this.articlesRepository.find();
  }

  getArticleById(id: number) {
    return this.articlesRepository.findOne(id);
  }
}
