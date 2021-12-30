import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { GetUsersDto } from './dto/get-users.dto';
import { Users } from './entities/Users';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  private getBaseQuery(): SelectQueryBuilder<Users> {
    return this.createQueryBuilder('user').orderBy('user.id', 'DESC');
  }

  public getUserByStId(stId: string) {
    return this.getBaseQuery().andWhere('user.stId = :stId', { stId }).getOne();
  }
  public getUsersWithFilter(filter: GetUsersDto) {
    let query = this.getBaseQuery();

    if (filter.search) {
      query
        .orWhere('user.nickname like :search', { search: `%${filter.search}%` })
        .orWhere('user.email like :search', { search: `%${filter.search}%` })
        .orWhere('user.stId like :search', { search: `%${filter.search}%` });
    }

    return query;
  }
}
