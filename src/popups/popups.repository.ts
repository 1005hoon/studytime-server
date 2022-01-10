import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Popup } from './popup.entity';

@EntityRepository(Popup)
export class PopupsRepository extends Repository<Popup> {
  private getBaseQuery(): SelectQueryBuilder<Popup> {
    return this.createQueryBuilder('popup')
      .orderBy('popup.id', 'DESC')
      .where('popup.isDeleted = :isDeleted', { isDeleted: 0 });
  }

  public getPopupsWithFilter() {
    let query = this.getBaseQuery();

    return query;
  }
}
