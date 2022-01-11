import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { CreatePopupDto } from './create-popup.dto';
import { Popup } from './popup.entity';

@EntityRepository(Popup)
export class PopupsRepository extends Repository<Popup> {
  private logger = new Logger('POPUP REPOSITORY');
  private getBaseQuery(): SelectQueryBuilder<Popup> {
    return this.createQueryBuilder('popup')
      .orderBy('popup.id', 'DESC')
      .where('popup.is_deleted = :isDeleted', { isDeleted: 0 });
  }

  public getPopupsWithFilter() {
    let query = this.getBaseQuery();

    return query;
  }

  public async createNewPopupAndDisableRest(dto: CreatePopupDto, url: string) {
    const popup = this.create({
      ...dto,
      targetId: +dto.targetId,
      useYn: 1,
      imgUrl: url,
      createdAt: new Date(),
      isDeleted: 0,
    });

    try {
      await this.getBaseQuery().update().set({ useYn: 0 }).execute();
      await this.save(popup);
      return popup;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
