import { Expose } from 'class-transformer';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginationOption {
  limit?: number;
  page: number;
  count?: boolean;
}

export class PaginationResult<T> {
  constructor(partial: Partial<PaginationResult<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  first: number;

  @Expose()
  last: number;

  @Expose()
  limit: number;

  @Expose()
  count: number;

  @Expose()
  data: T[];
}

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOption,
) {
  const offset = (options.page - 1) * options.limit;
  const data = await queryBuilder.limit(options.limit).offset(offset).getMany();

  return new PaginationResult({
    first: offset + 1,
    last: offset + data.length,
    limit: options.limit,
    count: options.count ? await queryBuilder.getCount() : null,
    data,
  });
}
