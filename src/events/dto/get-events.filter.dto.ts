export class GetEventsFilterDto {
  name?: string;
  createdAt?: Date;
  isDeleted?: boolean;
  currentPage: number;
  limit: number;
  count?: boolean;
}
