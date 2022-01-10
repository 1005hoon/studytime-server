export class GetEventsDto {
  page: number = 1;
  count = true;
  limit = 10;
  search?: string;
}
