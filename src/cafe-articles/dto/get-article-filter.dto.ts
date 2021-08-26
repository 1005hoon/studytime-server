import { CafeCategoryEnum } from '../enums/cafe-category-filter.enum';

export class GetArticleFilterDto {
  createdAt?: Date;
  stId?: string;
  nickname?: string;
  category?: CafeCategoryEnum;
  limit = 15;
  page = 1;
}
