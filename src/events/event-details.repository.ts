import { EntityRepository, Repository } from 'typeorm';
import { CreateEventDetailDto } from './dto/create-event-detail.dto';
import EventDetail from './entities/event-details.entity';

@EntityRepository(EventDetail)
export class EventDetailsRepository extends Repository<EventDetail> {
  private getEventsQuery() {
    return this.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }

  public getEventDetailByEventId(id: number) {
    return this.getEventsQuery()
      .where('e.eventId = :eventId', { eventId: id })
      .getMany();
  }

  public async createEventDetial(imgUrl: string, dto: CreateEventDetailDto) {
    const detail = this.create({
      ...dto,
      imgUrl,
      createdAt: new Date(),
      isDeleted: 0,
    });
    await this.save(detail);
    return detail;
  }
}
