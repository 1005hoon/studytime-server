import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeArticlesController } from './cafe-articles.controller';
import { CafeArticlesService } from './cafe-articles.service';
import { CafeArticle } from './entities/cafe-article.entity';
import { CafeCategory } from './entities/cafe-category.entity';
import { CafeReply } from './entities/cafe-reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CafeArticle, CafeCategory, CafeReply])],
  controllers: [CafeArticlesController],
  providers: [CafeArticlesService],
  exports: [CafeArticlesService],
})
export class CafeArticlesModule {}
