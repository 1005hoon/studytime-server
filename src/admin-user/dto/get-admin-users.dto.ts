export class GetAdminUsersDto {
  limit = 15;

  /**
   * 다음 조회할 사용자 아이디
   */
  pageToken?: string;
}
