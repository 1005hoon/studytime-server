export class GetUsersDto {
  page: number = 1;
  search?: string;
  st_id?: string;
  count = true;
  limit = 10;
}
