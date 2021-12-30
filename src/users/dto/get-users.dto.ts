export class GetUsersDto {
  page: number = 1;
  search?: string;
  count = true;
  limit = 10;
}
