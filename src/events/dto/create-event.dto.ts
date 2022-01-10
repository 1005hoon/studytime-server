import { IsNotEmpty, IsString } from 'class-validator';

export enum EventTypeEnum {
  POPUP = '팝업',
  BANNER = '배너',
  DETAIL = '상세',
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
