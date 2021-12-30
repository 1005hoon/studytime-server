export class GetEventsFilterDto {
  name?: string;
  createdAt?: Date;
  isDeleted?: boolean;
  page: number;
  limit: number;
  count?: boolean;
}
