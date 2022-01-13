import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { UpdatePopupDto } from './update-popup.dto';
import { CreatePopupDto } from './create-popup.dto';
import { Popup } from './popup.entity';

@EntityRepository(Popup)
export class PopupsRepository extends Repository<Popup> {
  private logger = new Logger('POPUP REPOSITORY');
  private getBaseQuery(): SelectQueryBuilder<Popup> {
    return this.createQueryBuilder('popup')
      .where('popup.is_deleted = :isDeleted', { isDeleted: 0 })
      .orderBy('popup.id', 'DESC');
  }

  public getPopupsWithFilter() {
    let query = this.getBaseQuery();

    return query;
  }

  private async disablePopups() {
    await this.createQueryBuilder('popup')
      .update(Popup)
      .set({ useYn: 0 })
      .execute();
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
      await this.disablePopups();
      await this.save(popup);
      return popup;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updatePopup(id: number, dto: UpdatePopupDto) {
    const availabilityChange = +dto.useYn;
    try {
      if (availabilityChange) {
        await this.disablePopups();
      }

      const updateResult = await this.update(id, { ...dto });

      if (updateResult.affected === 1) {
        return this.findOne(id);
      }

      throw new HttpException(
        `${id}에 해당하는 팝업이 존재하지 않습니다`,
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}
