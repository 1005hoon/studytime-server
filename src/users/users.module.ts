import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeArticlesModule } from 'src/cafe-articles/cafe-articles.module';
import { CafeArticle } from 'src/cafe-articles/entities/cafe-article.entity';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, CafeArticle]),
    CafeArticlesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
