import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Users } from './entities/Users';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  private getBaseQuery(): SelectQueryBuilder<Users> {
    return this.createQueryBuilder('user').orderBy('user.id', 'DESC');
  }

  public getUsersWithFilter() {
    let query = this.getBaseQuery();

    return query;
  }
}
