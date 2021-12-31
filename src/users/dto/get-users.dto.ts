export class GetUsersDto {
  page: number = 1;
  count = true;
  limit = 10;
  search?: string;
  st_id?: string;
}
